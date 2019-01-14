<?
namespace App\Http\Middleware;

use Closure;
use App\AdminLog;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class OperationLog
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Response
     */
    protected $response;

    /**
     * @param Request $request
     */
    public function setRequest($request)
    {
        $this->request = $request;
    }

    /**
     * @param Response $response
     */
    public function setResponse($response)
    {
        $this->response = $response;
    }

    /**
     * @param string $raw
     */
    protected function escape($raw)
    {
        return preg_replace('/\s/', "\\s", $raw);
    }

    /**
     * @param string $text
     * @return string
     */
    public function interpolate($text)
    {
        $variables = explode(" ",$text);

        foreach( $variables as $variable ) {
            $matches = [];
            preg_match("/{\s*(.+?)\s*}(\r?\n)?/", $variable, $matches);
            if( isset($matches[1]) ) {
                $value = $this->escape($this->resolveVariable($matches[0], $matches[1]));
                $text = str_replace($matches[0], $value, $text);
            }
        }
        return $text;
    }

    /**
     * @param $raw
     * @param $variable
     * @return string
     */
    public function resolveVariable($raw, $variable)
    {
        $method = str_replace([
            "remoteAddr",
            "scheme",
            "port",
            "queryString",
            "remoteUser",
            "referrer",
            'body'
        ], [
            "ip",
            "getScheme",
            "getPort",
            "getQueryString",
            "getUser",
            "referer",
            "getContent"
        ],camel_case($variable));

        $server_var = str_replace([
            "ACCEPT",
            "ACCEPT_CHARSET",
            "ACCEPT_ENCODING",
            "ACCEPT_LANGUAGE",
            "HOST",
            "REFERER",
            "USER_AGENT",
        ], [
            "HTTP_ACCEPT",
            "HTTP_ACCEPT_CHARSET",
            "HTTP_ACCEPT_ENCODING",
            "HTTP_ACCEPT_LANGUAGE",
            "HTTP_HOST",
            "HTTP_REFERER",
            "HTTP_USER_AGENT"
        ], strtoupper(str_replace("-","_", $variable)) );

        if( method_exists($this->request, $method) ) {
            return $this->request->$method();
        } elseif( isset($_SERVER[$server_var]) ) {
            return $this->request->server($server_var);
        } else {
            $matches = [];
            preg_match("/([-\w]{2,})(?:\[([^\]]+)\])?/", $variable, $matches);

            if( count($matches) == 2 ) {
                switch($matches[0]) {
                case "date":
                    $matches[] = "clf";
                    break;
                case "admin":
                    return $this->username();
                case "action":
                    return $this->request->route()->getActionName();
                case "permission":
                    return $this->permission();
                }
            }

            if( is_array($matches) && count($matches) == 3 ) {
                list($line, $var, $option) = $matches;

                switch(strtolower($var)) {
                    case "date":

                        $formats = [
                            "clf"=>Carbon::now()->format("d/M/Y:H:i:s O"),
                            "iso"=>Carbon::now()->toIso8601String(),
                            "web"=>Carbon::now()->toRfc1123String()
                        ];

                        return isset($formats[$option]) ? $formats[$option] : Carbon::now()->format($option);

                    case "req":
                    case "header":
                        return $this->request->header(strtolower($option));
                    case "server":
                        return $this->request->server($option);
                    case "map":
                        return $this->action($option);
                    default;
                        return $raw;
                }
            }
        }

        return $raw;
    }

    /**
     * Get Admin User
     * @return mixed
     */
    public function getUser()
    {
        $token = JWTAuth::setRequest($this->request)->getToken();
        try {
            $user = JWTAuth::toUser($token);
        } catch (\Throwable $th) {
            $user = null;
        }
        return $user;
    }

    /**
     * Is filter
     * @param string $action
     * @return bool
     */
    public function except($action)
    {
        $patterns = config("operation.filter");
        return str_is($patterns, $action);
    }

    /**
     * Current username
     * @return string|null
     */
    protected function username() {
        if ($user = $this->getUser()) {
            return $user->username;
        }
    }

    /**
     * Current permission
     * @return string
     */
    protected function permission() {
        $name = $this->request->route()->getName();
        if ($name) {
            $permission = Permission::where('name', $name)->first();
            if ($permission) return $permission->show_name;
        }
    }

    /**
     * Map action
     * @param string $key
     * @return mixed
     */
    public function action($option){
        $actions = config("operation.action");
        $action = $this->request->route()->getActionName();

        if (isset($actions[$action])) {
            $data = $actions[$action];
            switch ($option) {
                case 'name':
                    return array_get($data, $option);
                case 'params':
                    $assoc = array_get($data, $option, []);
                    return join(',', array_map(function ($v, $k) {
                        if ($input = $this->request->get($k)) {
                            return sprintf('%s=%s', $v, $input);
                        }
                    }, $assoc, array_keys($assoc)));
            }
        }
    }

    /**
     * Create operation log
     * @return \App\AdminLog
     */
    public function createLogs() {
        $action    = $this->request->route()->getActionName();
        $routeName = $this->request->route()->getName();

        $attributes = [
            'action'     => $action,
            'permission' => $routeName,
            'ip'         => $this->request->ip(),
            'uri'        => $this->request->path(),
            'data'       => $this->request->all(),
            'resp'       => $this->response->content(),
            'admin'      => $this->username(),
        ];

        //format decryption
        $format = config('operation.format');
        $attributes['decryption'] = $this->interpolate($format);

        return AdminLog::create($attributes);
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $this->setRequest($request);
        return tap($next($request), function ($resp) {
            $this->setResponse($resp);

            //filter some action
            $action = $this->request->route()->getActionName();
            if (!$this->except($action)) {
                $this->createLogs();
            }
        });
    }
}
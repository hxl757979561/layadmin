<?php  
  
namespace App\Api\Controllers;  
  
use App\Http\Controllers\Controller;  
use Dingo\Api\Http\Request;
use Dingo\Api\Routing\Helpers;
  
class BaseController extends Controller
{  
    use Helpers;

    //分页默认值
    const defaultStart = 1;
    const defaultLimit = 10;
  
    /**** 
     * BaseController constructor. 
     */  
    public function __construct()  
    {  
        app()->isLocal() && \DB::enableQueryLog();
    }


    /**
     * layui 分页查询
     * @param Request $request
     * @param \Illuminate\Database\Query\Builder $query
     * @return Illuminate\Support\Collection
     */
    public function layuiPagination($request, $query)
    {
        $page = $request->get('page', self::defaultStart);
        $pageSize = $request->get('limit', self::defaultLimit);

        if (--$page < 0) $page = 0;
        return $query->skip($page * $pageSize)->take($pageSize)->get();
    }


    /**
     * layui 模糊查询
     * @param array $kv
     * @param \Illuminate\Database\Query\Builder $query
     * @return \Illuminate\Database\Query\Builder
     */
    public function layuiWhere($kv, $query)
    {
        return $query->where(function ($query) use ($kv) {
            $kv = array_diff_key(
                $kv,
                array_filter($kv, 'blank')
            );
            foreach ($kv as $k => $v) {
                $query->orWhere($k, 'like', "%{$v}%");
            }
        });
    }
}  
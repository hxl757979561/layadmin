<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException as ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Services\ErrCode, Services\ErrReply;

class Handler extends ExceptionHandler implements ErrCode
{
    use ErrReply;

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        TokenInvalidException::class,
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        //验证请求
        if ($exception instanceof ValidationException){
            /** @var ValidationException $exception */
            
            $alert = $exception->validator->errors()->first();
            return $this->errReply($alert);
        }

        //令牌无效
        if ($exception instanceof TokenInvalidException){
            /** @var TokenInvalidException $exception */

            $err = $exception->getMessage();
            return $this->errReply($err);
        }
        
        //查找失败
        if ($exception instanceof ModelNotFoundException){
            /** @var ModelNotFoundException $exception */

            $err = str_before($exception->getMessage() ,'[');
            return $this->errReply($err);
        }

        //页面找不到
        if ($exception instanceof NotFoundHttpException){
            /** @var NotFoundHttpException $exception */
            
            //自定义404页面
            //return Response()->view('404', [], 404);
        }
        return parent::render($request, $exception);
    }

    /**
     * Reply error page or ajax or app
     * @param string $err
     * @return \Illuminate\Http\Response
     */
    protected function errReply(string $err)
    {
        if (request()->ajax()){
            return self::errFailed($err);
        }   
        return self::errBack($err);
    }
}

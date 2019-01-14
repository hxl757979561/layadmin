<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Services\ErrCode, Services\ErrReply;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\Permission\Exceptions\PermissionDoesNotExist;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use App\Exceptions\PermissionException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class HandlerServiceProvider extends ServiceProvider implements ErrCode
{
    use ErrReply;

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        app("Dingo\Api\Exception\Handler")->register(function(ValidationException $exception){
            $alert = $exception->validator->errors()->first();
            return self::errFailed($alert);
        });

        app("Dingo\Api\Exception\Handler")->register(function(ModelNotFoundException $exception){
            return self::errFailed("无法操作该数据!");
        });

        app("Dingo\Api\Exception\Handler")->register(function(PermissionException $exception){
            return self::errFailed("权限不足,无法进行操作!");
        });

        app("Dingo\Api\Exception\Handler")->register(function(PermissionDoesNotExist $exception){
            return self::errFailed("无法操作该权限!");
        });
        
        app("Dingo\Api\Exception\Handler")->register(function(RoleDoesNotExist $exception){
            return self::errFailed("无法操作该角色!");
        });
        
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

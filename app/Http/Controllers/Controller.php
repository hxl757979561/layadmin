<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Services\ErrReply, Services\ErrCode;

class Controller extends BaseController implements ErrCode
{
    use ErrReply;
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * 获取当前控制器与方法
     * @return array
     */
    public function getCurrentAction()
    {
        $action = \Route::current()->getActionName();
        list($class, $method) = explode('@', $action);
        return ['controller' => $class, 'method' => $method];
    }

}

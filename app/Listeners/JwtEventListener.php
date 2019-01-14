<?php

namespace App\Listeners;

use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Services\ErrReply, Services\ErrCode;

class JwtEventListener implements ErrCode
{
    use ErrReply;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * 注册订阅监听
     *
     * @param \Illuminate\Events\Dispatcher  $events
     * @return void
     */
    public function subscribe($events)
    {
        $events->listen([
            "tymon.jwt.absent",
            "tymon.jwt.expired",
            "tymon.jwt.invalid",
            "tymon.jwt.user_not_found"
        ], "App\Listeners\JwtEventListener@JwtInvalid");
    }

    /**
     * 拦截登录无效事件
     * @param Array $payload
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function JwtInvalid($payload=null)
    {
        return self::errExpire("用户登录已失效!");
    }
}

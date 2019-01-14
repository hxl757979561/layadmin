<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class ChangeAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //重新设定指定的Model
        config(['jwt.user' => '\App\Admin']);                          
        config(['auth.providers.users.model' => \App\Admin::class]);

        return $next($request);
    }
}
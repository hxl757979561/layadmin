<?php

namespace App\Http\Middleware;

use Closure;
use App\Admin;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\PermissionException;

/**
 * Administrator
 */
class RequisiteAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /** @var Admin $user */
        $user = Auth::user();
        throw_unless($user->isAdmin(), PermissionException::class, "Missing Admin Permissions!");
        return $next($request);
    }
}
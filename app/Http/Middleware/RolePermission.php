<?php

namespace App\Http\Middleware;

use Closure;
use App\Admin;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\PermissionException;
use Illuminate\Support\Facades\Route;

/**
 * Role Permission
 */
class RolePermission
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

        $permissionName = $request->route()->getName();
        if (blank($permissionName)) {
            throw new \RuntimeException("Route Missing Permission Name!");
        }
        if ($user->cannot($permissionName)) {
            throw new PermissionException("Missing Role Permissions!");
        }
        return $next($request);
    }
}

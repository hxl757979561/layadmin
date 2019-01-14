<?php

namespace App\Http\Resources;

use App\Admin;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Services\ErrCode;

class UserList extends ResourceCollection implements ErrCode
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $this->collection->map(function (Admin $admin) {
            if (!$admin->isAdmin()) {
                $role_name = $admin->roles()->pluck("show_name")->implode(',');
                $admin['role_name'] = $role_name;
            }
        });
        return [
            'code'  => self::errNormal,
            'msg'   => '请求成功',
            'data'  => $this->collection,
            'count' => Admin::count()
        ];
    }
}

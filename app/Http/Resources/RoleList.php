<?php

namespace App\Http\Resources;

use App\Client;
use App\Roles;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Spatie\Permission\Contracts\Role;
use Services\ErrCode;

class RoleList extends ResourceCollection implements ErrCode
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'code'   => self::errNormal,
            'msg'    => '请求成功',
            'data'   => $this->collection,
            'count'  => Roles::count(),
            'name'   => $request->get('name',''),
            'email'  => $request->get('email',''),
            'status' => $request->get('status',0),
        ];
    }
}

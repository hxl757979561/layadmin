<?php

namespace App\Http\Resources;

use App\Client;
use App\Permissions;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Spatie\Permission\Contracts\Role;
use Services\ErrCode;

class PermissionList extends ResourceCollection implements ErrCode
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
            'code'  => self::errNormal,
            'msg'   => '请求成功',
            'data'  => $this->collection,
            'count' => Permissions::count(),
            'name'  => $request->get('name','')
        ];
    }
}

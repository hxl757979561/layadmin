<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Permissions extends Authenticatable
{
    const status_on = 1;
    const status_off= 0;
    public static $status_text = [
        self::status_on  => "开启",
        self::status_off => "关闭",
    ];

    protected $table = 'permissions';
    protected $primaryKey = 'id';
    protected $guarded = [];
}

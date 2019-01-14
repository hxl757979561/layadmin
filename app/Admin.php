<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasRoles;

    const status_verify = 0;    //待审核
    const status_passed = 1;    //审核通过
    const status_banned = 2;    //用户封禁
    public static $status_text = [
        self::status_verify => "待审核",
        self::status_passed => "审核通过",
        self::status_banned => "用户封禁",
    ];

    protected $table = 'admins';
    protected $primaryKey = 'id';
    protected $guarded = [];
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * Administrator
     * @return bool
     */
    public function isAdmin(){
        return ($this->getKey() == static::first()->getKey());
    }
}
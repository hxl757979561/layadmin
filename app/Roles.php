<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class Roles extends Authenticatable
{
    //Administrator role
    const adminRole = "Admin";

    protected $table = 'roles';
    protected $primaryKey = 'id';
    protected $guarded = [];
}

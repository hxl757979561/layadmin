<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AdminLog extends Model
{
    protected $table = "admin_logs";
    protected $primaryKey = 'id';
    protected $guarded = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
     protected $casts = [
        'data' => 'object',
     ];
}

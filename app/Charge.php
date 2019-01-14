<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;
Class Charge extends Model
{
    const Charge = "Charge";

    protected $table = 'charge';
    protected $primaryKey = 'id';
    protected $guarded = [];
    const status_nocheck = 0;    //待审核
    const status_nopay = 1;    //待付款
    const status_banned = 2;    //已冻结
    const status_paying = 3;    //付款中
    const status_payed = 4;    //已付款
    const status_rejected = 5;    //已驳回
    const status_watching = 6;    //观察中
    public static $status_text = [
        self::status_nocheck => "待审核",
        self::status_nopay => "待付款",
        self::status_banned => "已冻结",
        self::status_paying => "付款中",
        self::status_payed => "已付款",
        self::status_rejected => "已驳回",
        self::status_watching => "观察中",
    ];
}
?>
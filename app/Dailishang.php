<?php 
namespace App;

use Illuminate\Database\Eloquent\Model;
class Dailishang extends Model
{
       //Administrator role
       const Dailishang = "Dailishang";

       protected $table = 'dailishang';
       protected $primaryKey = 'id';
       protected $guarded = [];
       protected $hidden = [
              'commission_level1_today','commission_level1_thismonth','commission_level1_total',
              'commission_level2_today','commission_level2_thismonth','commission_level2_total',
              'commission_level3_today','commission_level3_thismonth','commission_level3_total',
              'commission_daili1_today','commission_daili1_thismonth','commission_daili1_total',
              'commission_daili2_today','commission_daili2_thismonth','commission_daili2_total',
              'agent_channel_id','agent_fee_premonth','agent_id','auth','is_agent','password',
              'wuxian_channel_id','wuxian_is_channel'
       ];
       const status_normal = 0;    //正常
       const status_week = 7;    //冻结7天
       const status_month = 30;    //冻结30天
       const status_banned = -1;    //永久冻结
       public static $status_text = [
           self::status_normal => "正常",
           self::status_week => "冻结7天",
           self::status_month => "冻结30天",
           self::status_banned => "永久冻结",
       ];

       //电话号码进行处理
       public function getPhoneAttribute($value)
       {
              return $this->attributes['phone'] = substr($value,0,3).'****'.substr($value,-4);
       }
       //字段存储时候进行转换
       public function setSexAttribute($value)
       {
       if( $value == '男' )
              $this->attributes['sex'] = 1;
       else
              $this->attributes['sex'] = 0;
       }
       public function hide(array $fields)
       {
           $this->withoutFields = $fields;
           return $this;
       }   
}
?>
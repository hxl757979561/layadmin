<?php 
namespace App\Http\Resources;

use App\Charge;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Services\ErrCode;
class DailishangCharge extends ResourceCollection implements ErrCode
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
            'count'  => Charge::count(),
        ];
    }
}
?>
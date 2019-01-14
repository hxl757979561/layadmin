<?php 
namespace App\Api\Controllers;

use App\Dailishang;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\DailishangList as DailishangListResource;
use Overtrue\EasySms\EasySms;
use App\Charge;
use App\Http\Resources\DailishangCharge;
use Illuminate\Support\Facades\DB;
class DailishangController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }
    //代理商列表
    public function list(Request $request)
    {
        $where = $request->only([
            "youxi_id", "phone","daili_name"
        ]);
        $query = Dailishang::latest();
        $this->layuiWhere($where, $query);       
        $lists = $this->layuiPagination($request, $query);
        return new DailishangListResource($lists);
    }
    /**
     * @param Request $request
     */
    public function edit(Request $request)
    {
        $rules = [
            'id' => [
                "bail",
                "nullable",
                "sometimes",
                Rule::exists(Dailishang::getModel()->getTable(), "id")
            ],        
            'status'  => [
                "bail",
                "required",
                Rule::in([
                    Dailishang::status_normal,
                    Dailishang::status_week,
                    Dailishang::status_month,
                    Dailishang::status_banned,
                ])
            ]
        ];
        $id       = $request->get('id');      
        $youxi_id = $request->get('youxi_id');      
        $status   = $request->get('status');
       
        $data = compact([
            'status'
        ]);

        $found = Dailishang::where('youxi_id', $youxi_id)->first();
        if($id = $request->get('id')){
            if ($found && $id != $found->getKey()) {
                return self::errFailed("代理商信息错误!");
            }
            $user = Dailishang::findOrFail($id);
            //更新用户信息
            Dailishang::whereKey($id)->update($data);
        }
        return self::errNormal("状态操作成功!");
    }
    /**
     * @param Request $request
     */
    public function register(Request $request)
    {
        $rules = [
            'youxi_id'  => "required|distinct|integer",
            'daili_name'=> "required|alpha_dash",
            'password'  => "required",
        ];

        $attributes = [
            'youxi_id'   => "游戏ID",
            'daili_name' => "昵称",
            'phone'      => "代理ID",
            'password'   => "登录密码",
        ];
        $this->validate($request, $rules, [], $attributes);

        $youxi_id   = $request->get('youxi_id');
        $daili_name = $request->get('daili_name');
        $phone      = $request->get('phone');
        $password   = $request->get('password');

        $data = compact([
            'youxi_id','daili_name', 'phone'
        ]);
        blank($password) || $data['password'] = bcrypt($password);

        $found = Dailishang::orwhere('youxi_id', $youxi_id)->orwhere('phone',$phone)->first();
        if ($found) return self::errFailed("已有该代理账号!");
        $user = Dailishang::create($data);
        return self::errNormal("添加用户成功!");
    }
    //代理商提现列表
    public function charge(Request $request)
    {
        $where = $request->only([
            "youxi_id", "daili_phone","daili_name","paytype"
        ]);
        $query = Charge::latest();
        $this->layuiWhere($where, $query)->sum('commission');       
        $lists = $this->layuiPagination($request, $query);
        //dump(DB::getQueryLog());
        return new DailishangCharge($lists);
    }
    /**
     * @param Request $request
     */
    public function chargeedit(Request $request)
    {
        $rules = [
            'id' => [
                "bail",
                "nullable",
                "sometimes",
                Rule::exists(Charge::getModel()->getTable(), "id")
            ],        
            'status'  => [
                "bail",
                "required",
                Rule::in([
                    Charge::status_nocheck,
                    Charge::status_nopay,
                    Charge::status_banned,
                    Charge::status_paying,
                    Charge::status_payed,
                    Charge::status_rejected,
                    Charge::status_watching,
                ])
            ]
        ];
        $id       = $request->get('id');      
        $youxi_id = $request->get('youxi_id');      
        $status   = $request->get('status');
        $user =  $request->user();
        $check_admin = $user['id'];
        $check_time = time();
        
        if($status >= 5)
        {
            $data = compact([
                'status','check_admin','check_time'
            ]);
        }
        else
        {
            $paytime = time();
            $data = compact([
                'status','check_admin','check_time','paytime'
            ]);
        }        
        $found = Charge::where('youxi_id', $youxi_id)->first();
        if($id = $request->get('id')){
            if ($found && $id != $found->getKey()) {
                return self::errFailed("提现信息错误!");
            }
            $user = Charge::findOrFail($id);
            //更新用户信息
            Charge::whereKey($id)->update($data);
        }
        return self::errNormal("提现状态操作成功!");
    }
}
?>
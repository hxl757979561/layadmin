<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChargeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charge', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('youxi_id')->default(0)->comment('代理商游戏ID');
            $table->string('daili_name')->comment('代理商昵称');
            $table->integer('daili_id')->default(0)->comment('代理商编号ID');
            $table->string('daili_phone',11)->comment('代理商ID');
            $table->decimal('commission',20,2)->default(0.00)->comment('代理商提现金额');
            $table->decimal('commission_after',20,2)->default(0.00)->comment('代理商提现后金额');
            $table->string('number')->nullable()->comment('收款账号');
            $table->smallInteger('paytype')->default(0)->comment('支付方式');
            $table->string('username')->nullable()->comment('收款人');
            $table->string('bank_open_name')->nullable()->comment('开户行名称');
            $table->string('remark')->nullable()->comment('备注信息');
            $table->smallInteger('status')->default(0)->comment('提现状态：0 待处理、1 待付款、2 已冻结、3 处理中、4 已结账、5 已驳回、6 观察中');
            $table->integer('check_admin')->default(0)->comment('操作人ID');
            $table->integer('check_time')->default(0)->comment('操作时间');
            $table->integer('paytime')->default(0)->comment('支付时间');
            $table->integer('alipay_payno')->default(0)->comment('支付宝合并支付订单号');
            $table->smallInteger('reason')->default(0)->nullable()->comment('驳回/冻结原因：1 姓名错误，2 账号错误，3 姓名和帐号不符合，4 玩家作弊');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('charge');
    }
}

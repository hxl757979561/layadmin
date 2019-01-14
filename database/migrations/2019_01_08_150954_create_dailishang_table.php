<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDailishangTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dailishang', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('ppid')->default(0)->comment('上上级代理编号');
            $table->string('pp_daili_name')->phcomment('上上级代理昵称')->nullable();
            $table->integer('pid')->default(0)->comment('上级代理编号');
            $table->string('p_daili_name')->comment('上级代理昵称')->nullable();
            $table->integer('youxi_id')->default(0)->comment('代理游戏ID');
            $table->string('phone',11)->comment('代理电话');
            $table->string('daili_name')->comment('代理昵称');
            $table->integer('regtime')->default(0)->comment('注册时间');
            $table->integer('logintime')->default(0)->comment('最近登录后台时间');
            $table->integer('status')->default(0)->comment('代理商状态');
            $table->integer('status_time')->default(0)->comment('代理商冻结时间');
            $table->integer('son_daili_num')->default(0)->comment('下级代理数');
            $table->integer('son_num')->default(0)->comment('下级玩家数');
            $table->string('password')->comment('代理商后台登录密码');
            $table->string('auth')->comment('代理商后台登录标识')->nullable();
            $table->decimal('commission_live',20,2)->default(0.00)->comment('代理可提现金额');
            $table->decimal('commission_get',20,2)->default(0.00)->comment('已提现金额');
            $table->decimal('commission_total',20,2)->default(0.00)->comment('代理总佣金');
            $table->decimal('commission_today',20,2)->default(0.00)->comment('今日佣金');    
            $table->decimal('commission_yesterday',20,2)->default(0.00)->comment('昨日佣金');    
            $table->decimal('commission_thismonth',20,2)->default(0.00)->comment('本月佣金');    
            $table->decimal('commission_premonth',20,2)->default(0.00)->comment('上月佣金');
            $table->decimal('fee_today',20,2)->default(0.00)->comment('今日手续费');
            $table->decimal('commission_level1_today',20,2)->default(0.00)->comment('直属玩家今日佣金');
            $table->decimal('commission_level1_thismonth',20,2)->default(0.00)->comment('直属玩家本月佣金');
            $table->decimal('commission_level1_total',20,2)->default(0.00)->comment('直属玩家总佣金');
            $table->decimal('commission_level2_today',20,2)->default(0.00)->comment('下级玩家今日佣金');
            $table->decimal('commission_level2_thismonth',20,2)->default(0.00)->comment('下级玩家本月佣金');
            $table->decimal('commission_level2_total',20,2)->default(0.00)->comment('下级玩家总佣金');
            $table->decimal('commission_level3_today',20,2)->default(0.00)->comment('下下级玩家今日佣金');
            $table->decimal('commission_level3_thismonth',20,2)->default(0.00)->comment('下下级玩家本月佣金');
            $table->decimal('commission_level3_total',20,2)->default(0.00)->comment('下下级玩家总佣金');
            $table->decimal('commission_daili1_today',20,2)->default(0.00)->comment('下级代理今日佣金');
            $table->decimal('commission_daili1_thismonth',20,2)->default(0.00)->comment('下级代理本月佣金');
            $table->decimal('commission_daili1_total',20,2)->default(0.00)->comment('下级代理总佣金');
            $table->decimal('commission_daili2_today',20,2)->default(0.00)->comment('下级代理今日佣金');
            $table->decimal('commission_daili2_thismonth',20,2)->default(0.00)->comment('下下级代理本月佣金');
            $table->decimal('commission_daili2_total',20,2)->default(0.00)->comment('下下级代理总佣金');
            $table->integer('wuxian_is_channel')->default(0)->comment('是否是区代');
            $table->integer('wuxian_level')->default(1)->comment('区代等级');
            $table->integer('wuxian_channel_id')->default(0)->comment('区代编号');
            $table->decimal('wuxian_fee_today',20,2)->default(0)->comment('今日区代佣金');
            $table->decimal('wuxian_fee_thismonth',20,2)->default(0)->comment('本月区代佣金');
            $table->decimal('wuxian_fee_premonth',20,2)->default(0)->comment('上月区代佣金');
            $table->decimal('wuxian_fee_total',20,2)->default(0)->comment('区代总佣金');
            $table->integer('wuxian_time')->default(0)->comment('开通区代时间');
            $table->integer('is_agent')->default(0)->comment('是否有下级区代');
            $table->integer('agent_channel_id')->default(0)->comment('总代编号');
            $table->integer('agent_id')->default(0)->comment('上级区代编号');
            $table->decimal('agent_fee_today',20,2)->default(0)->comment('今日总代佣金');
            $table->decimal('agent_fee_thismonth',20,2)->default(0)->comment('本月总代佣金');
            $table->decimal('agent_fee_premonth',20,2)->default(0)->comment('上月总代佣金');
            $table->decimal('agent_fee_total',20,2)->default(0)->comment('总代总佣金');
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
        Schema::dropIfExists('dailishang');
    }
}

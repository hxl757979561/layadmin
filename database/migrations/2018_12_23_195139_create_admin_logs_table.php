<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('admin')->nullable()->comment("管理员账号");
            $table->string('permission')->nullable()->comment("权限名称");
            $table->string('action')->comment("请求动作");
            $table->string('decryption')->nullable()->comment("详细信息");
            $table->text('data')->nullable()->comment("请求数据");
            $table->text('resp')->nullable()->comment("应答数据");
            $table->string('uri', 128)->comment("请求URI地址");
            $table->string('ip', 20)->comment("请求IP地址");
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
        Schema::dropIfExists('admin_logs');
    }
}

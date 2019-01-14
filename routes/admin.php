<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "admin" middleware group. Now create something great!
|
*/

Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function (Dingo\Api\Routing\Router $api) {
    $api->group(['namespace' => 'App\Api\Controllers','middleware' => ['admin']], function (Dingo\Api\Routing\Router $api) {
        $api->post('user/login', 'AuthController@authenticate');  //登录授权
        $api->get('verify/image', 'HomeController@verifyImage');  //图形验证码

        //超级管理员
        $api->group(['middleware' => ['jwt.auth', 'auth.admin']], function (Dingo\Api\Routing\Router $api) {
            //管理员列表
            $api->get('user/lists', 'AuthController@userList');     //获取管理员列表
            $api->post('user/changeStatus', 'AuthController@changeAdminStatus');    //更改管理员状态
            $api->post('user/delete', 'AuthController@userDelete');
            //角色权限列表
            $api->get('roles/lists', 'AuthController@roleList');
            $api->post('roles/add', 'AuthController@roleAdd');
            $api->post('roles/delete', 'AuthController@roleDelete');
            $api->post('roles/allRoles', 'AuthController@allRoles');
            $api->get('permissions/lists', 'AuthController@permissionList');
            $api->post('permissions/add', 'AuthController@permissionAdd');
            $api->post('permissions/delete', 'AuthController@permissionDelete');
            $api->post('permissions/allPermission', 'AuthController@allPermission');
            $api->post('permissions/changeStatus', 'AuthController@changePermissionStatus');
            //添加管理员
            $api->post('user/register', 'AuthController@register');
        });

        //普通管理
        $api->group(['middleware' => ['jwt.auth']], function(Dingo\api\Routing\Router $api) {
            $api->get('menus', 'MenuController@menuList');
            $api->get('user/self', 'AuthController@AuthenticatedUser'); //获取用户信息
            $api->post('user/passwd', 'AuthController@changePasswd');   //修改用户密码
            $api->post('user/logout', 'AuthController@logout');         //用户退出登录
        });
        //权限控制
        $api->group(['middleware' => ['jwt.auth','auth.role']], function (Dingo\Api\Routing\Router $api) {
            $api->get('dailishang/list','DailishangController@list')->name('dailishanglist');
            $api->post('dailishang/edit', 'DailishangController@edit')->name('dailishangedit');
            $api->post('dailishang/register', 'DailishangController@register')->name('dailishangregister');
            $api->post('dailishang/getverifyCode', 'DailishangController@getverifyCode')->name('dailishanggetverifyCode');
            $api->get('dailishang/charge','DailishangController@charge')->name('dailishangcharge');
            $api->post('dailishang/chargeedit', 'DailishangController@chargeedit')->name('dailishangchargeedit');

        });

    });
});

<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Admin;
use App\Roles;
use App\Permissions;

class SystemTest extends TestCase
{
    /**
     * 初始化系统
     * @return void
     */
    public function testInstall()
    {
        $master_guard = "web";
        $admin_guard  = "admin";

        $data = [   
            "username" => "admin",
            "password" => bcrypt("admin666"),
            "email"    => "admin@admin.com",
            "phone"    => "17666666666",
            "status"   => "1",
        ];

        //创建超级管理员
        $user = Admin::create($data);
        $this->assertNotNull($user);

        $data = [
            'name'      => Roles::adminRole,
            'show_name' => "普通管理员",
            'guard_name'=> $master_guard,
        ];
        //创建普通管理角色 AuthServiceProvider Policies
        $role = Role::create($data);
        $this->assertNotNull($role);

        //创建管理菜单
        $root  = [
            'name'      => "sys_master",
            'show_name' => "系统设置",
            'guard_name'=> $admin_guard,
            'status'    => 0,
            'visible'   => 0,
            'parent_id' => 0,
            'icon'      => 'layui-icon-set',
            'jump'      => '#'
        ];
        $sys_root = Permission::create($root);
        $this->assertNotNull($sys_root);

        $data = [
            [
                'name'      => "sys_user",
                'show_name' => "用户管理",
                'guard_name'=> $admin_guard,
                'status'    => 0,
                'visible'   => 0,
                'parent_id' => $sys_root->getKey(),
                'jump'      => 'setting/user/user'
            ],
            [
                'name'      => "sys_role",
                'show_name' => "角色管理",
                'guard_name'=> $admin_guard,
                'status'    => 0,
                'visible'   => 0,
                'parent_id' => $sys_root->getKey(),
                'jump'      => 'setting/user/role'
            ],
            [
                'name'      => "sys_permission",
                'show_name' => "权限管理",
                'guard_name'=> $admin_guard,
                'status'    => 0,
                'visible'   => 0,
                'parent_id' => $sys_root->getKey(),
                'jump'      => 'setting/user/permission'
            ],
        ];
        foreach ($data as $item) {
            $this->assertNotNull(Permission::create($item));
        }

        //创建个人中心菜单
        $root = [
            'name'      => "self_center",
            'show_name' => "个人中心",
            'guard_name'=> $master_guard,
            'status'    => 1,
            'visible'   => 1,
            'parent_id' => 0,
            'icon'      => 'layui-icon-friends',
            'jump'      => '#'
        ];
        $self_root = Permission::create($root);
        $this->assertNotNull($self_root);

        $data = [
            [
                'name'      => "self_passwd",
                'show_name' => "修改密码",
                'guard_name'=> $master_guard,
                'status'    => 1,
                'visible'   => 1,
                'parent_id' => $self_root->getKey(),
                'jump'      => 'setting/user/password'
            ],
        ];
        foreach ($data as $item) {
            $this->assertNotNull(Permission::create($item));
        }


    }
}

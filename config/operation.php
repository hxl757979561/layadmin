<?php

return [
    /**
     * An array of pattern matching for filtering,
     * matching the name of the action at the time of the request
     * action name example: xxxxController@xxxMethod
     */
    'filter' => [
        "*List",
        "*Form",
        "*@all*",
        "*@logout",
        //"*@authenticate",
        "*@AuthenticatedUser",
        "*@verifyImage",
    ],

    /**
     * Maps Action Information
     */
    'action' => [
        'AuthController@authenticate' => [
            'name'   => '用户登录',
            'params' => [
                'username' => "用户名",
                'password' => "用户密码",
            ]
        ]
    ],

    /**
     * Description field format
     */
    'format' => "管理员[{admin}] 操作权限[{permission}] {map[name]} {map[params]}",

];

/// <reference path="../../typings/global.d.ts" />

layui.define(function(exports) {
    var $ = layui.$,
        layer = layui.layer,
        laytpl = layui.laytpl,
        setter = layui.setter,
        view = layui.view,
        admin = layui.admin;

    //公共业务的逻辑处理可以写在此处，切换任何页面都会执行

    //退出
    admin.events.logout = function() {
        admin.req({
            url: "/api/user/logout",
            type: "post",
            done: function(res) {
                admin.exit();
            }
        });
    };
    exports("common", {});
});

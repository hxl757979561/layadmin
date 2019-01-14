/// <reference path="../../typings/global.d.ts" />

layui.define(["form", "admin"], function(exports) {
    var $ = layui.$,
        form = layui.form,
        layer = layui.layer,
        admin = layui.admin,
        setter = layui.setter,
        router = layui.router(),
        search = router.search;

    var $body = $("body");

    //自定义验证
    form.verify({
        username: function(value) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return "用户名不能有特殊字符";
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return "用户名首尾不能出现下划线'_'";
            }
        },
        password: [/^[\S]{6,16}$/, "密码必须6到16位，且不能出现空格"]
    });

    form.render();
    //登录提交
    form.on("submit(LAY-user-login-submit)", function(obj) {
        admin.req({
            method: "POST",
            url: "/api/user/login",
            data: obj.field,
            done: function(res) {
                //请求成功后，写入 token
                layui.data(setter.tableName, {
                    key: setter.request.tokenName,
                    value: res.data.access_token,
                });

                layer.msg(
                    "登录成功,即将转入管理页面!",
                    {
                        offset: "15px",
                        icon: 1,
                        time: 1000
                    },
                    function() {
                        location.hash = search.redirect
                            ? decodeURIComponent(search.redirect)
                            : "/";
                    }
                );
            },
            success: function(res) {
				if(res.code != 0)
				{
					//更新验证码
					$("#LAY-user-get-vercode").click();
				}
            }
        });
    });

    //更换图形验证码
    $body.on("click", "#LAY-user-get-vercode", function() {
        this.src = "/api/verify/image?t=" + new Date().getTime();
    });
    $("#LAY-user-get-vercode").click();
    //验证码框触发登录
    $body.on("keydown", "#LAY-user-login-vercode", function(e) {
        if (e.keyCode === 13) {
            $("#LAY-user-login-submit").click();
        }
    });

    exports("user", {});
});

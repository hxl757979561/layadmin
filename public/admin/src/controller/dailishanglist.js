/// <reference path="../../typings/global.d.ts" />

layui.define(["table", "form" , "treetable"], function(exports) {
    var $ = layui.$,
        admin = layui.admin,
        view = layui.view,
        table = layui.table,
        setter = layui.setter,
        form = layui.form,
        treetable = layui.treetable;

    var local = layui.data(setter.tableName);
    var token = local[setter.request.tokenName];

    //代理列表管理
    table.render({
        elem: "#LAY-user-back-manage",
        url: "/api/dailishang/list",
        where: { token : token },
        page: true,
        cols: [
            [
                { type: "checkbox", fixed: "left" },
                { field: "id", width: 80, title: "ID", sort: true },
                { field: "phone", width: 110,title: "代理ID" },
                { field: "daili_name", title: "昵称" },
                { field: "youxi_id", title: "游戏ID" },
                { field: "p_daili_name", title: "推荐人" },
                { field: "son_daili_num", title: "下级数量" , sort: true },
                { field: "created_at",title: "注册时间" , sort: true },
                { 
                    field: "status",
                    title: "用户状态",
                    templet: "#buttonTpl",
                    minWidth: 80,
                    align: "center"
                },
                { field: "son_num", title: "玩家数" , sort: true },
                { field: "p_daili_name", title: "推荐人" },
                { field: "commission_today", title: "今日佣金", sort: true },
                { field: "commission_thismonth", title: "本月佣金", sort: true },
                { field: "commission_premonth", title: "上月佣金", sort: true },
                { field: "commission_total", title: "总佣金", sort: true }, 
                {
                    title: "操作",
                    width: 150,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-dailishanglist-admin"
                }               
            ]
        ],
        text: {
            none: "无数据"
        }
    });

    //监听搜索
    form.on("submit(LAY-user-back-search)", function(data) {
        var field = data.field;
        table.reload("LAY-user-back-manage", {
            where: field
        });
    });

    //监听工具条
    table.on("tool(LAY-user-back-manage)", function(obj) {
        var data = obj.data;
        if (obj.event === "edit") {
            admin.popup({
                title: "编辑代理商状态",
                area: ["450px", "550px"],
                resize: false,
                id: "popup-user-mod",
                success: function(layero, index) {
                    view(this.id)
                        .render("setting/dailishang/dailishangeditform", data)
                        .done(function() {
                            form.render(null, "layuiadmin-form-admin");
                            form.on("submit(LAY-user-back-submit)", function(data) {
                                layer.confirm(
                                "确定要修改选定的代理状态吗?", {
                                    btn: ['确认修改', '我再想想'],
                                    yes: function (confirm) {
                                        admin.req({
                                            url: "/api/dailishang/edit",
                                            type: "POST",
                                            data: data.field,
                                            done : function(res) {
                                                alert(res.msg);
                                                layui.table.reload("LAY-user-back-manage"); //重载表格
                                                layer.close(confirm);     //执行关闭
                                                layer.close(index);     //执行关闭
                                            }
                                        });
                                    }
                                }
                            );
                        });
                    });
                }
            });
        }
    });
    exports("dailishanglist", {
        

    });
});

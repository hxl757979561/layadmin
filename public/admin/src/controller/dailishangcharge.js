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
        url: "/api/dailishang/charge",
        where: { token : token },
        page: true,
        cols: [
            [
                { type: "checkbox", fixed: "left" },
                { field: "id", width: 80, title: "编号", sort: true },
                { field: "daili_name", title: "代理昵称" },
                { field: "username", title: "姓名" },
                { field: "daili_phone", title: "代理ID" },
                { field: "youxi_id", title: "游戏ID" },
                { 
                    field: "paytype", 
                    title: "支付方式",
                    templet: "#paytypebuttonTpl",
                    minWidth: 80,
                    align: "center"
                },
                { field: "number", title: "账号" },
                { field: "remark", title: "备注" },
                { field: "commission", title: "提现金额" },               
                { field: "created_at",title: "提现时间" },
                { field: "updated_at",title: "处理时间" },
                { 
                    field: "status",
                    title: "提现状态",
                    templet: "#buttonTpl",
                    minWidth: 80,
                    align: "center"
                },               
                {
                    title: "操作",
                    width: 150,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-dailishangcharge-admin"
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
                title: "编辑提现记录状态",
                area: ["450px", "550px"],
                resize: false,
                id: "popup-user-mod",
                success: function(layero, index) {
                    view(this.id)
                        .render("setting/dailishang/chargeditform", data)
                        .done(function() {
                            form.render(null, "layuiadmin-form-admin");
                            form.on("submit(LAY-user-back-submit)", function(data) {
                                layer.confirm(
                                "确定要修改选定的提现状态吗?", {
                                    btn: ['确认修改', '我再想想'],
                                    yes: function (confirm) {
                                        admin.req({
                                            url: "/api/dailishang/chargeedit",
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
    exports("dailishangcharge", {
        

    });
});

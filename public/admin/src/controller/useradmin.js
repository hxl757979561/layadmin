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

    //管理员管理
    table.render({
        elem: "#LAY-user-back-manage",
        url: "/api/user/lists",
        where: { token : token },
        page: true,
        cols: [
            [
                { type: "checkbox", fixed: "left" },
                { field: "id", width: 80, title: "ID", sort: true },
                { field: "username", title: "登录名" },
                { field: "email", title: "邮箱" },
                { field: "phone", title: "手机" },
                { field: "role_name", title: "角色" },
                { field: "created_at", title: "创建时间", sort: true },
                {
                    field: "status",
                    title: "用户状态",
                    templet: "#buttonTpl",
                    minWidth: 80,
                    align: "center"
                },
                {
                    title: "操作",
                    width: 150,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-useradmin-admin"
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
                title: "编辑管理用户",
                area: ["450px", "550px"],
                resize: false,
                id: "popup-user-mod",
                success: function(layero, index) {
                    view(this.id)
                        .render("setting/user/userform", data)
                        .done(function() {
                            form.render(null, "layuiadmin-form-admin");
                            form.on("submit(LAY-user-back-submit)", function(data) {
                                admin.req({
                                    url: "/api/user/register",
                                    type: "POST",
                                    data: data.field,
                                    done : function(res) {
                                        layui.table.reload("LAY-user-back-manage"); //重载表格
                                        layer.close(index);     //执行关闭
                                    }
                                });
                            });
                        });
                }
            });
        }

        if (obj.event === "del") {
            layer.confirm(
                "确定要删除选定的用户吗?", {
                    btn: ['确认删除', '我再想想'],
                    yes: function (index) {
                        admin.req({
                            url: "/api/user/delete",
                            type: "POST",
                            data: { list: [data] },
                            success: function (res) {
                                layer.close(index);
                                if (res.code === 0) {
                                    obj.del();
                                }
                            }
                        });
                    }
                }
            );
        } 
    });

    
    //角色管理
    table.render({
        elem: "#LAY-user-back-role",
        url: "/api/roles/lists",
        where: { token : token },
        page: true,
        cols: [
            [
                { type: "checkbox", fixed: "left" },
                { field: "id", width: 80, title: "ID", sort: true },
                { field: "show_name", title: "角色名称" },
                { field: "name", title: "角色标识" },
                {
                    title: "操作",
                    width: 150,
                    align: "center",
                    fixed: "right",
                    toolbar: "#table-role-admin"
                }
            ]
        ],
        text: {
            none: "无数据"
        }
    });

    //监听工具条
    table.on("tool(LAY-user-back-role)", function(obj) {
        var data = obj.data;
        if (obj.event === "edit") {
            admin.popup({
                title: "编辑角色",
                area: ["660px", "768px"],
                id: "popup-role-edit",
                success: function(layero, index) {
                    view(this.id)
                        .render("/setting/user/roleform", data)
                        .done(function() {
                            form.render(null, "layuiadmin-form-role");
                            form.on("submit(LAY-user-role-submit)", function(data) {
                                admin.req({
                                    url: "/api/roles/add",
                                    type: "POST",
                                    data: data.field,
                                    done : function(res) {
                                        layui.table.reload("LAY-user-back-role");
                                        layer.close(index);     //执行关闭
                                    }
                                });
                            });
                        });
                }
            });
        }

        if (obj.event === "del") {
            layer.confirm(
                "确定要删除此角色吗?", {
                    btn: ['确认删除', '我再想想'],
                    yes: function (index) {
                        admin.req({
                            url: "/api/roles/delete",
                            type: "POST",
                            data: { list: [data] },
                            success: function (res) {
                                layer.close(index);
                                if (res.code === 0) {
                                    obj.del();
                                }
                            }
                        });
                    }
                }
            );
        } 
    });


    //权限管理
    var permissionReload = function(){
        treetable.render({
            elem: "#user-back-permission",
            url: "/api/permissions/lists",
            treeSpid : 0,
            treeColIndex: 2,
            treeIdName: "id",
            treePidName: "parent_id",
            where: { token : token },
            page: true,
            cols: [
                [
                    { type: "checkbox", fixed: "left" },
                    { field: "id", width: 80, title: "ID" },
                    { field: "show_name", title: "权限名称" },
                    { field: "name", title: "权限标识" },
                    {
                        field: "visible",
                        title: "菜单显示",
                        templet: "#visibleTpl",
                        minWidth: 50,
                        align: "center"
                    },
                    {
                        title: "操作",
                        width: 150,
                        align: "center",
                        fixed: "right",
                        toolbar: "#table-permission-admin"
                    }
                ]
            ],
            text: {
                none: "无数据"
            }
        });
    };

    table.on("tool(user-back-permission)", function(obj) {
        var data = obj.data;
        if (obj.event === "edit") {
            admin.popup({
                title: "编辑权限",
                area: ["650px", "600px"],
                resize: false,
                id: "popup-permission-edit",
                success: function(layero, index) {
                    view(this.id)
                        .render("/setting/user/permissionform", data)
                        .done(function() {
                            form.render(null, "admin-form-permission");
                            form.on("submit(user-permission-submit)", function(data) {
                                admin.req({
                                    url: "/api/permissions/add",
                                    type: "POST",
                                    data: data.field,
                                    done : function(res) {
                                        permissionReload();
                                        layer.close(index);
                                    }
                                });
                            });
                        });
                }
            });
        }

        if (obj.event === "del") {
            layer.confirm(
                "确定要删除此权限吗?", {
                    btn: ['确认删除', '我再想想'],
                    yes: function (index) {
                        admin.req({
                            url: "/api/permissions/delete",
                            type: "POST",
                            data: { list: [data] },
                            success: function (res) {
                                layer.close(index);
                                if (res.code === 0) {
                                    obj.del();
                                }
                            }
                        });
                    }
                }
            );
        } 
    });    

    exports("useradmin", {
        permissionReload : permissionReload,

    });
});

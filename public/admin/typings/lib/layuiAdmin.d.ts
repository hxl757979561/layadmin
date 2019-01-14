/// <reference path="layui.d.ts" />

declare module layui {
    interface AdminEvent {
        refresh();          //刷新当前右侧区域
        closeThisTabs();    //关闭当前标签页
        closeOtherTabs();   //关闭其它标签页
        closeAllTabs();     //关闭全部标签页
    }

    interface LayAdmin {
        /**
         * Ajax 请求，用法同 $.ajax(options)，只是该方法会进行错误处理和 token 的自动传递
         * @param settings 
         */
        req(settings: JQueryAjaxSettings);

        /**
         * 获取屏幕类型，根据当前屏幕大小，返回 0 - 3 的值
         * 0: 低于768px的屏幕
         * 1：768px到992px之间的屏幕
         * 2：992px到1200px之间的屏幕
         * 3：高于1200px的屏幕
         */
        screen(): number;

        /**
         * 清除本地 token，并跳转到登入页
         */
        exit(): void;

        /**
         * 侧边伸缩。status 为 null：收缩；status为 “spread”：展开
         * @param status 
         */
        sideFlexible(status?: string);

        /**
         * 事件监听，下文会有讲解
         * @param eventName 
         * @param callback 
         * @example
         * hash
         * 监听路由地址改变
         * // 下述中的 xxx 可随意定义，不可与已经定义的 hash 事件同名，否则会覆盖上一事件
         * admin.on('hash(xxx)', function(router){
         *   console.log(router); //得到路由信息
         * });
         * 
         * side
         * 监听侧边伸缩
         * // 下述中的 xxx 可随意定义，不可与已经定义的 side 事件同名，否则会覆盖上一事件
         * admin.on('side(xxx)', function(obj){
         *   console.log(obj.status); //得到伸缩状态：spread 为展开状态，其它值为收缩状态
         * });
         */
        on(eventName: string, callback: Function);

        /**
         * 弹出一个 layuiAdmin 主题风格的 layer 层，参数 options 跟 layer.open(options) 完全相同
         * @param options 
         */
        popup(options: LayerOptions);

        /**
         * 在屏幕右侧呼出一个面板层。options 同上。
         * @param options 
         * @example
         * admin.popupRight({
         *   id: 'LAY-popup-right-new1' //定义唯一ID，防止重复弹出
         *   ,success: function(){
         *     //将 views 目录下的某视图文件内容渲染给该面板
         *     layui.view(this.id).render('视图文件所在路径');
         *   }
         * });
         */
        popupRight(options: LayerOptions);

        /**
         * 窗口 resize 事件处理，我们推荐你使用该方法取代 jQuery 的 resize 事件，以避免多页面标签下可能存在的冲突。
         * @param callback 
         */
        resize(callback);

        /**
         * 
         */
        events: AdminEvent;
    }

    interface LayView {
        render(views: string, params?: object): LayView;    //请求模板文件渲染
        parse(html: string | object, refresh: Boolean, callback?: Function): LayView;   //解析模板
        send(views: string, data?: object): LayView;        //直接渲染字符
        refresh(callback: Function): LayView;               //局部刷新模板

        then(callback: Function): LayView;                  //视图请求成功后的回调
        done(callback: Function): LayView;                  //视图渲染完毕后的回调
    }

    export let admin: LayAdmin;
    export let view: (id: string) => LayView;
}
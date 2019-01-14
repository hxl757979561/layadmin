declare module layui {
    type LayerCallbackSuccess = null | ((layero: JQuery, index: number) => void);
    type LayerCallbackYes = null | ((index: number, layero: JQuery) => boolean | void);
    type LayerCallbackCancel = null | ((index: number, layero: JQuery) => boolean | void);
    type LayerCallbackEnd = null | (() => void);
    type LayerCallbackFull = null | ((layero: JQuery) => void);
    type LayerCallbackMin = null | ((layero: JQuery) => void);
    type LayerCallbackRestore = null | ((layero: JQuery) => void);
    type LayerCallbackPrompt = null | ((value: string, index: number, elem: JQuery) => void);

    /**
     * Layer options
     */
    interface LayerOptions {
        type?: number;
        title?: string | boolean | string[];
        content?: string | HTMLElement | JQuery | string[];
        skin?: string;
        area?: string | string[];
        offset?: number | string | string[];
        icon?: number;
        btn?: string | string[];
        closeBtn?: string | boolean;
        shade?: string | boolean | (number | string)[];
        shadeClose?: boolean;
        time?: number;
        id?: string;
        anim?: number;
        isOutAnim?: boolean;
        maxmin?: boolean;
        fixed?: boolean;
        resize?: boolean;
        resizing?: Function;
        scrollbar?: boolean;
        maxWidth?: number;
        zIndex?: number;
        move?: string | boolean | HTMLElement;
        moveType?: boolean;
        moveOut?: boolean;
        moveEnd?: null | (() => void);
        tips?: number | (number | string)[];
        tipsMore?: boolean;
        success?: LayerCallbackSuccess;
        yes?: LayerCallbackYes;
        btn2?: LayerCallbackYes;
        btn3?: LayerCallbackYes;
        cancel?: LayerCallbackCancel;
        end?: LayerCallbackEnd;
        full?: LayerCallbackFull;
        min?: LayerCallbackMin;
        restore?: LayerCallbackRestore;
    }

    interface LayerConfigOptions extends LayerOptions {
        path?: string;
        extend?: string[];
    }

    interface LayerPromptOptions extends LayerOptions {
        formType?: number;
        value?: string;
        maxlength?: number;
        area?: string[];
    }

    interface LayerTabOptions extends LayerOptions {
        tab: ({ title: string, content: string })[];
    }

    interface LayerPhotosOptions extends LayerOptions {
        photos: LayerPhotosData | string;
        tab?: (pic: LayerPhotosDataItem, layero: JQuery) => void;
    }

    interface LayerPhotosData {
        title: string;
        id: number;
        start?: number;
        data: LayerPhotosDataItem[];
    }

    interface LayerPhotosDataItem {
        alt: string;
        pid?: number;
        src: string;
        thumb: string;
    }

    /**
     * Layer object
     */
    interface Layer {
        /**
         * 初始化全局配置
         * @param {LayerConfigOptions} options;
         */
        config(options: LayerConfigOptions): void;
        /**
         * 初始化就绪
         * @param {string} path
         * @param {Function} callback
         */
        ready(path: string, callback: () => void): void;
        /**
         * 初始化就绪
         * @param {Function} callback
         */
        ready(callback: () => void): void;
        /**
         * 原始核心方法
         * @param {LayerOptions} options
         */
        open(options?: LayerOptions): number;
        /**
         * 普通信息框
         * @param {string} content
         * @param {LayerOptions} options
         * @param {Function} yes
         */
        alert(content: string, options?: LayerOptions, yes?: LayerCallbackYes): number;
        /**
         * 普通信息框
         * @param {string} content
         * @param {Function} yes
         */
        alert(content: string, yes?: LayerCallbackYes): number;

        confirm(content: string, options?: LayerOptions, yes?: LayerCallbackYes, cancel?: LayerCallbackCancel): number;

        confirm(content: string, yes?: LayerCallbackYes, cancel?: LayerCallbackCancel): number;

        msg(content: string, options?: LayerOptions, end?: LayerCallbackEnd): number;

        msg(content: string, end?: LayerCallbackEnd): number;

        load(icon?: number, options?: LayerOptions): number;

        tips(content: string, follow: string | this, options?: LayerOptions): number;

        close(index: number): void;

        closeAll(type?: 'dialog' | 'page' | 'iframe' | 'loading' | 'tips'): void;

        style(index: number, cssStyle: { [key: string]: string | number }): void;

        title(title: string, index: number): void;

        getChildFrame(selector: string, index: number): JQuery;

        getFrameIndex(windowName: string): number;

        iframeAuto(index: number): void;

        iframeSrc(index: number, url: string): void;

        setTop(layero: JQuery): void;

        full(): void;

        min(): void;

        restore(): void;

        prompt(options?: LayerPromptOptions, yes?: LayerCallbackPrompt): number;

        prompt(yes?: LayerCallbackPrompt): number;

        tab(options: LayerTabOptions): number;

        photos(options: LayerPhotosOptions): number;
    }

    interface TabOption {
        title?: string;
        content?: string;
        id?: string;
        attr?: string;
    }

    interface Element {
        /**
         * 用于新增一个Tab选项 
         * @example element.tabAdd('demo', {
         *   title: '选项卡的标题'
         *   ,content: '选项卡的内容' //支持传入html
         *   ,id: '选项卡标题的lay-id属性值'
         *   });
         * @param filter    tab元素的 lay-filter="value" 过滤器的值（value） 
         * @param options 设定可选值的对象，目前支持的选项如下述示例：
         */
        tabAdd(filter: string, options: TabOption): void;
        /**
         * 用于删除指定的Tab选项 
         * @param filter ab元素的 lay-filter="value" 过滤器的值（value） 
         * @param layid 选项卡标题列表的 属性 lay-id 的值
         * @example element.tabDelete('demo', 'xxx'); //删除 lay-id="xxx" 的这一项  
         */
        tabDelete(filter: string, layid: string): void;

        /**
         * 用于外部切换到指定的Tab项上，参数同上，如： 
         * @example element.tabChange('demo', 'layid'); //切换到 lay-id="yyy" 的这一项
         * @param filter 
         * @param layid 
         */
        tabChange(filter: string, layid: string): void;

        /**
         * 用于绑定自定义 Tab 元素（即非 layui 自带的 tab 结构）。该方法为 layui 2.1.6 新增 
         * @param options 设定可选值的对象，目前支持的选项如下述示例：
         * @example //HTML
         *    <ul id="tabHeader">
         *   <li>标题1</li>
         *   <li>标题2</li>
         *   <li>标题3</li>
         *   </ul>
         *   <div id="tabBody">
         *   <div class="xxx">内容1</div>
         *   <div class="xxx">内容2</div>
         *   <div class="xxx">内容4</div>
         *   </div>
         *               
         *   //JavaScript              
         *   element.tab({
         *   headerElem: '#tabHeader>li' //指定tab头元素项
         *   ,bodyElem: '#tabBody>.xxx' //指定tab主体元素项
         *   });
         */
        tab(options: { headerElem?: string, bodyElem?: string });

        /**
         * 用于动态改变进度条百分比： 
         * @param filter 
         * @param percent 
         * @example element.progress('demo', '30%');
         */
        progress(filter: string, percent: string);

        /**
         * 初始化元素操作
         * @param type 
         * @param filter 
         */
        init(type?: string, filter?: string): void;

        /**
         * 事件监听 语法：element.on('event(过滤器值)', callback);
         * @param filter 
         * @param callback 
         * @example element模块在Layui事件机制中注册了element模块事件，所以当你使用layui.onevent()自定义模块事件时，请勿占用element名。目前element模块所支持的事件如下表：
         *   event	描述
         *   tab	监听Tab选项卡切换事件
         *   默认情况下，事件所监听的是全部的元素，但如果你只想监听某一个元素，使用事件过滤器即可。
         * @example 
         * 监听选项卡切换
         * Tab选项卡点击切换时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * codelayui.code
         * element.on('tab(filter)', function(data){
         *   console.log(this); //当前Tab标题所在的原始DOM元素
         *   console.log(data.index); //得到当前Tab的所在下标
         *   console.log(data.elem); //得到当前的Tab大容器
         * });
         *       
         * 监听选项卡删除
         * Tab选项卡被删除时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * codelayui.code
         * element.on('tabDelete(filter)', function(data){
         *   console.log(this); //当前Tab标题所在的原始DOM元素
         *   console.log(data.index); //得到当前Tab的所在下标
         *   console.log(data.elem); //得到当前的Tab大容器
         * });
         *       
         * 注：该事件为 layui 2.1.6 新增
         * 
         * 监听导航菜单的点击
         * 当点击导航父级菜单和二级菜单时触发，回调函数返回所点击的菜单DOM对象：
         * 
         * codelayui.code
         * element.on('nav(filter)', function(elem){
         *   console.log(elem); //得到当前点击的DOM对象
         * });
         *       
         * 监听折叠面板
         * 当折叠面板点击展开或收缩时触发，回调函数返回一个object参数，携带三个成员：
         * 
         * codelayui.code
         * element.on('collapse(filter)', function(data){
         *   console.log(data.show); //得到当前面板的展开状态，true或者false
         *   console.log(data.title); //得到当前点击面板的标题区域DOM对象
         *   console.log(data.content); //得到当前点击面板的内容区域DOM对象
         * });
         *       
         * 动态操作进度条
         * 你肯定不仅仅是满足于进度条的初始化显示，通常情况下你需要动态改变它的进度值，element模块提供了这样的基础方法：element.progress(filter, percent);。
         * 
         * 例子layui.code
         * <div class="layui-progress layui-progress-big" lay-filter="demo" lay-showPercent="true">
         *   <div class="layui-progress-bar" lay-percent="0%"></div>
         * </div>
         *  
         * 上述是一个已经设置了过滤器（lay-filter="demo"）的进度条
         * 现在你只需要在某个事件或者语句中执行方法：element.progress('demo', '50%');
         * 即可改变进度
         * 如果你需要进度条更直观的例子 建议浏览：进度条演示页面
         */
        on(filter: string, callback: (data: any) => any): void;

        /**
         * 跟表单元素一样，很多时候你的页面元素可能是动态生成的，这时element的相关功能将不会对其有效，你必须手工执行 element.init(type, filter) 方法即可。注意：2.1.6 开始，可以用 element.render(type, filter); 方法替代
         * @param type 为表单的type类型，可选。默认对全部类型的表单进行一次更新。可局部刷新的type如下表
         * @example 参数（type）值	描述
         *   tab	重新对tab选项卡进行初始化渲染
         *   nav	重新对导航进行渲染
         *   breadcrumb	重新对面包屑进行渲染
         *   progress	重新对进度条进行渲染
         *   collapse	重新对折叠面板进行渲染
         * example: 
         *   element.init(); //更新全部  2.1.6 可用 element.render() 方法替代
         *    element.render('nav'); //重新对导航进行渲染。注：layui 2.1.6 版本新增
         *   //……  
         * @param filter 为元素的 lay-filter="" 的值。你可以借助该参数，完成指定元素的局部更新。
         * @example 【HTML】
         *   <div class="layui-nav" lay-filter="test1">
         *   …
         *   </div>
         *   
         *   <div class="layui-nav" lay-filter="test2">
         *   …
         *   </div>
         *       
         *   【JavaScript】
         *   //比如当你对导航动态插入了二级菜单，这时你需要重新去对它进行渲染
         *   element.render('nav', 'test1'); //对 lay-filter="test1" 所在导航重新渲染。注：layui 2.1.6 版本新增
         *   //……      
         */
        render(type?: string, filter?: string): void;
    }

    interface flowLoadOptions {
        elem?: string;       //指定列表容器的选择器
        scrollElem?:	string; //滚动条所在元素选择器，默认document。如果你不是通过窗口滚动来触发流加载，而是页面中的某一个容器的滚动条，那么通过该参数指定即可。
        isAuto?:	boolean;	//是否自动加载。默认true。如果设为false，点会在列表底部生成一个“加载更多”的button，则只能点击它才会加载下一页数据。
        end?: string;        //用于显示末页内容，可传入任意HTML字符。默认为：没有更多了
        /**
         * @example JavaScript片段layui.code
         *   layui.each(res.data, function(index, item){
         *   lis.push('<li><img lay-src="'+ item.src +'"></li>');
         *   });   
         */
        isLazyimg?: boolean; //是否开启图片懒加载。默认false。如果设为true，则只会对在可视区域的图片进行按需加载。但与此同时，在拼接列表字符的时候，你不能给列表中的img元素赋值src，必须要用lay-src取代，如：
        mb: number;	        //与底部的临界距离，默认50。即当滚动条与底部产生该距离时，触发加载。注意：只有在isAuto为true时有效。额，等等。。mb=margin-bottom，可不是骂人的呀。
        
        /**
         * 到达临界点触发加载的回调。信息流最重要的一个存在。携带两个参数：
         * @example JavaScript片段layui.code
         *   done: function(page, next){
         *   //请注意：layui 1.0.5 之前的版本是从第2页开始返回，也就是说你的第一页数据并非done来触发加载
         *   （为之前这个愚蠢的设计表示抱歉）
         *   //从 layui 1.0.5 的版本开始，page是从1开始返回，初始时即会执行一次done回调。
         *   //console.log(page) //获得当前页
         *   
         *   //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
         *   //只有当前页小于总页数的情况下，才会继续出现加载更多
         *   next('列表HTML片段', page < res.pages); 
         *   }
         */
        done: (page: number, next: Function) => void;
    }

    interface flowImgOptions {
        elem?: string;          //指定开启懒加载的img元素选择器，如 elem: '.demo img' 或 elem: 'img.load'
        scrollElem?: string;    //滚动条所在元素选择器，默认document。如果你不是通过窗口滚动来触发流加载，而是页面中的某一个容器的滚动条，那么通过该参数指定即可。
    }

    interface LayFlow {
        /**
         * 信息流
         * @param options 
         * @example 信息流即异步逐页渲染列表元素，这是你页面已经存在的一段列表，你页面初始时只显示了6个
         * HTMLlayui.code
         * <ul id="demo">
         *   <li>1</li>
         *   <li>2</li>
         *   ……
         *   <li>6</li>
         * </ul>
         *       
         * 你想通过加载更多来显示余下列表，那么你只需要执行方法：flow.load(options) 即可
         * 
         * JavaScriptlayui.code
         * layui.use('flow', function(){
         *   var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
         *   var flow = layui.flow;
         *   flow.load({
         *     elem: '#demo' //指定列表容器
         *     ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
         *       var lis = [];
         *       //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
         *       $.get('/api/list?page='+page, function(res){
         *         //假设你的列表返回在data集合中
         *         layui.each(res.data, function(index, item){
         *           lis.push('<li>'+ item.title +'</li>');
         *         }); 
         *         
         *         //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
         *         //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
         *         next(lis.join(''), page < res.pages);    
         *       });
         *     }
         *   });
         * });
         *       
         * 上述是一个比较简单的例子，以下是信息流完整的参数支撑（即options对象），它们将有助于你更灵活地应对各种场景
         */
        load(options: flowLoadOptions): this;

        /**
         * 图片懒加载
         * 应该说比当前市面上任何一个懒加载的实现都更为强劲和轻量，她用不足80行代码巧妙地提供了一个始终加载当前屏图片的高性能方案（无论上滑还是下滑）。对你的网站因为图片可能带来的压力，可做出很好的应对。
         * @param options 
         * @example codelayui.code
         *   layui.use('flow', function(){
         *   var flow = layui.flow;
         *   //当你执行这样一个方法时，即对页面中的全部带有lay-src的img元素开启了懒加载（当然你也可以指定相关img）
         *   flow.lazyimg(); 
         *   });
         *       
         *   如上所述，它只会针对以下img元素有效：
         *
         *   HTMLlayui.code
         *   <img lay-src="aaa.jpg"> 
         *   <img src="bbb.jpg" alt="該图不会懒加载">
         *   <img lay-src="ccc.jpg">      
         *   图片懒加载的使用极其简单，其参数（options对象）可支持的key如下表所示：
         */
        lazyimg(options: flowImgOptions): any;
    }

    interface LayFormData {
        elem?: HTMLElement;
        othis?: any;
        value?: string;
        form?: any;
        field?: any;
    }

    /**
     * 预设元素属性
     * @example 
     * 事实上在使用表单时，你的一半精力可能会在元素本身上。所以我们把一些基础属性的配置恰恰安放在了标签本身上。如：
     * 
     * codelayui.code
     * <input type="text" lay-verify="email">
     * <input type="checkbox" checked lay-skin="switch" lay-filter="encrypt" title="是否加密">
     * <button lay-submit>提交</button>
     *       
     * 上述的lay-verify、lay-skin、lay-filter、lay-submit神马的都是我们所说的预设的元素属性，他们可以使得一些交互操作交由form模块内部、或者你来借助form提供的JS接口精确控制。目前我们可支持的属性如下表所示：
     * 
     * 属性名	属性值	说明
     * title	任意字符	设定元素名称，一般用于checkbox、radio框
     * lay-skin	switch（开关风格） primary（原始风格）	定义元素的风格，目前只对 checkbox 元素有效，可将其转变为开关样式
     * lay-ignore	任意字符或不设值	是否忽略元素美化处理。设置后，将不会对该元素进行初始化渲染，即保留系统风格
     * lay-filter	任意字符	事件过滤器，主要用于事件的精确匹配，跟选择器是比较类似的。其实它并不私属于form模块，它在 layui 的很多基于事件的接口中都会应用到。
     * lay-verify	required（必填项）
     * phone（手机号）
     * email（邮箱）
     * url（网址）
     * number（数字）
     * date（日期）
     * identity（身份证）
     * 自定义值	同时支持多条规则的验证，格式：lay-verify="验证A|验证B" 
     * 如：lay-verify="required|phone|number" 
     * 
     * 另外，除了我们内置的校验规则，你还可以给他设定任意的值，比如lay-verify="pass"，那么你就需要借助form.verify()方法对pass进行一个校验规则的定义。详见表单验证
     * lay-verType	tips（吸附层）
     * alert（对话框）
     * msg（默认）	用于定义异常提示层模式。注意：该功能为 layui 2.2.0 新增
     * lay-submit	无需填写值	绑定触发提交的元素，如button
     */
    interface Form {
        /**
         * 事件监听
         * 语法：form.on('event(过滤器值)', callback);
         * @param event form模块在 layui 事件机制中注册了专属事件，所以当你使用layui.onevent()自定义模块事件时，请勿占用form名。form支持的事件如下：
         * @example 
         *  event	描述
         *   select	监听select下拉选择事件
         *   checkbox	监听checkbox复选框勾选事件
         *   switch	监听checkbox复选框开关事件
         *   radio	监听radio单选框事件
         *   submit	监听表单提交事件
         * 
         * 默认情况下，事件所监听的是全部的form模块元素，但如果你只想监听某一个元素，使用事件过滤器即可。
         *   如：<select lay-filter="test"></select>
         * @example
         * 监听select选择
         * 下拉选择框被选中时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * 语法layui.code
         * form.on('select(filter)', function(data){
         *   console.log(data.elem); //得到select原始DOM对象
         *   console.log(data.value); //得到被选中的值
         *   console.log(data.othis); //得到美化后的DOM对象
         * });      
         *       
         * 请注意：如果你想监听所有的select，去掉过滤器(filter)即可。下面将不再对此进行备注。
         * 
         * 监听checkbox复选
         * 复选框点击勾选时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * 语法layui.code
         * form.on('checkbox(filter)', function(data){
         *   console.log(data.elem); //得到checkbox原始DOM对象
         *   console.log(data.elem.checked); //是否被选中，true或者false
         *   console.log(data.value); //复选框value值，也可以通过data.elem.value得到
         *   console.log(data.othis); //得到美化后的DOM对象
         * });        
         *       
         * 监听switch开关
         * 开关被点击时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * 语法layui.code
         * form.on('switch(filter)', function(data){
         *   console.log(data.elem); //得到checkbox原始DOM对象
         *   console.log(data.elem.checked); //开关是否开启，true或者false
         *   console.log(data.value); //开关value值，也可以通过data.elem.value得到
         *   console.log(data.othis); //得到美化后的DOM对象
         * });  
         *       
         * 监听radio单选
         * radio单选框被点击时触发，回调函数返回一个object参数，携带两个成员：
         * 
         * 语法layui.code
         * form.on('radio(filter)', function(data){
         *   console.log(data.elem); //得到radio原始DOM对象
         *   console.log(data.value); //被点击的radio的value值
         * });  
         *       
         * 监听submit提交
         * 按钮点击或者表单被执行提交时触发，其中回调函数只有在验证全部通过后才会进入，回调返回三个成员：
         * 
         * 语法layui.code
         * form.on('submit(*)', function(data){
         *   console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
         *   console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
         *   console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
         *   return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
         * });
         *       
         * 再次温馨提示：上述的submit(*)中的 * 号为事件过滤器的值，是在你绑定执行提交的元素时设定的，如：
         * 
         * codelayui.code
         * <button lay-submit lay-filter="*">提交</button>     
         *       
         * 你可以把*号换成任意的值，如：lay-filter="go"，但监听事件时也要改成 form.on('submit(go)', callback);
         * @param callback 
         */
        on(event: string, callback: (data: LayFormData) => any): void;

        /**
         * 更新渲染
         * 有些时候，你的有些表单元素可能是动态插入的。这时 form 模块 的自动化渲染是会对其失效的。虽然我们没有双向绑定机制（因为我们叫经典模块化框架，偷笑.gif） 但没有关系，你只需要执行 form.render(type, filter); 方法即可。
         * @param type  为表单的 type 类型，可选。默认对全部类型的表单进行一次更新。可局部刷新的 type 如下表：
         * @example 
         *   参数（type）值	    描述
         *   select	        刷新select选择框渲染
         *   checkbox	    刷新checkbox复选框（含开关）渲染
         *   radio	        刷新radio单选框框渲染
         * example
         *   例子layui.code
         *   form.render(); //更新全部
         *   form.render('select'); //刷新select选择框渲染
         *   //……
         * @param filter 为 class="layui-form" 所在元素的 lay-filter="" 的值。你可以借助该参数，对表单完成局部更新。
         * @example
         *  【HTML】
         * <div class="layui-form" lay-filter="test1">
         *   …
         * </div>
         *  
         * <div class="layui-form" lay-filter="test2">
         *   …
         * </div>
         *       
         * 【JavaScript】
         * form.render(null, 'test1'); //更新 lay-filter="test1" 所在容器内的全部表单状态
         * form.render('select', 'test2'); //更新 lay-filter="test2" 所在容器内的全部 select 状态
         * //……
         */
        render(type?: string, filter?: string): this;

        /**
         * 表单验证
         * 
         * 我们对表单的验证进行了非常巧妙的支持，大多数时候你只需要在表单元素上加上 lay-verify="" 属性值即可。如：
         * codelayui.code
         * <input type="text" lay-verify="email"> 
         *  
         * 还同时支持多条规则的验证，如下：
         * <input type="text" lay-verify="required|phone|number">
         *       
         * 上述对输入框定义了一个邮箱规则的校验，它会在 form 模块内部完成。目前我们内置的校验支持见上文的：预设元素属性
         * 
         * 除了内置的校验规则外，你还可以自定义验证规则，通常对于比较复杂的校验，这是非常有必要的。
         * 
         * @example
         * 语法layui.code
         * form.verify({
         *   username: function(value, item){ //value：表单的值、item：表单的DOM对象
         *     if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
         *       return '用户名不能有特殊字符';
         *     }
         *     if(/(^\_)|(\__)|(\_+$)/.test(value)){
         *       return '用户名首尾不能出现下划线\'_\'';
         *     }
         *     if(/^\d+\d+\d$/.test(value)){
         *       return '用户名不能全为数字';
         *     }
         *   }
         *   
         *   //我们既支持上述函数式的方式，也支持下述数组的形式
         *   //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
         *   ,pass: [
         *     /^[\S]{6,12}$/
         *     ,'密码必须6到12位，且不能出现空格'
         *   ] 
         * });      
         *       
         * 当你自定义了类似上面的验证规则后，你只需要把 key 赋值给输入框的 lay-verify 属性即可：
         * 
         * codelayui.code
         * <input type="text" lay-verify="username" placeholder="请输入用户名">
         * <input type="password" lay-verify="pass" placeholder="请输入密码">
         * @param config 
         */
        verify(config: object): this;

        /**
         * 表单初始赋值
         * 语法：form.val('lay-filter的值', object);
         * 
         * 用于给指定表单集合的元素初始赋值。该方法为 layui 2.3.0 新增
         * @example
         * codelayui.code
         * //formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
         * form.val("formTest", {
         *   "username": "贤心" // "name": "value"
         *   ,"sex": "女"
         *   ,"auth": 3
         *   ,"check[write]": true
         *   ,"open": false
         *   ,"desc": "我爱layui"
         * })
         *       
         * 第二个参数的键值是元素对应的 name 和 value。
         * @param filter 
         * @param object 
         */
        val(filter, object): void
    }

    interface EditOption {
        /**
         * @example
         * tool: [
         *   'strong' //加粗
         *   ,'italic' //斜体
         *   ,'underline' //下划线
         *   ,'del' //删除线
         *   ,'|' //分割线
         *   ,'left' //左对齐
         *   ,'center' //居中对齐
         *   ,'right' //右对齐
         *   ,'link' //超链接
         *   ,'unlink' //清除链接
         *   ,'face' //表情
         *   ,'image' //插入图片
         *   ,'help' //帮助
         * ]
         */
        tool?: string[];        //重新定制编辑器工具栏，如： tool: ['link', 'unlink', 'face']
        hideTool?: string[];    //不显示编辑器工具栏，一般用于隐藏默认配置的工具bar
        height?: Number;        //设定编辑器的初始高度
        /**
         * 插入图片接口
         * @example
         * layedit.set({
         *   uploadImage: {
         *     url: ''      //接口url
         *     ,type: ''    //默认post
         *   }
         * });
         * //注意：layedit.set 一定要放在 build 前面，否则配置全局接口将无效。
         * layedit.build('demo'); //建立编辑器
         * 
         * 也就是说LayEdit并不提供服务端的图片接受，但你需要在图片上传成功后对LayEdit返回如下格式的JSON信息：
         * {
         *   "code": 0 //0表示成功，其它失败
         *   ,"msg": "" //提示信息 //一般上传失败后返回
         *   ,"data": {
         *     "src": "图片路径"
         *     ,"title": "图片名称" //可选
         *   }
         * }
         */
        uploadImage?: Object;   //设定图片上传接口，如：uploadImage: {url: '/upload/', type: 'post'}
    }

    /**
     * 跟那些过往的编辑器一样，你需要放置一个标签（一般为textarea文本域）作为编辑器的目标元素，然后调用 layedit.build('id') 即可，如下所示
     * @example
     * <textarea id="demo" style="display: none;"></textarea>
     * <script>
     * layui.use('layedit', function(){
     *   var layedit = layui.layedit;
     *   layedit.build('demo'); //建立编辑器
     * });
     * </script>
     */
    interface LayEdit {
        /**
         * 用于建立编辑器的核心方法 
         * index：即该方法返回的索引 
         * @example
         * 在建立编辑器的方法 layedit.build(id, options) 的第二个参数（options）中，允许我们对编辑器进行一些设置，如：
         * layedit.build('id', {
         *   height: 180 //设置编辑器高度
         * });
         * @example
         * 自定义工具Bar
         * 通过下述方式可自定义编辑器的工具Bar
         * layedit.build('id', {
         *   tool: ['left', 'center', 'right', '|', 'face']
         * });
         * @param id 实例元素（一般为textarea）的id值 
         * @param options 编辑器的可配置项，下文会做进一步介绍
         */
        build(id: string, options?: EditOption): number;

        /**
         * 设置编辑器的全局属性 
         * @param options 即上述build方法的options
         */
        set(options: EditOption);
        
        /**
         * 获得编辑器的内容 
         * @param index 即执行layedit.build返回的值
         */
        getContent(index: number): any;

        /**
         * 获得编辑器的纯文本内容 
         * @param index 即执行layedit.build返回的值
         */
        getText(index: number): string;

        /**
         * 用于同步编辑器内容到textarea（一般用于异步提交） 
         * @param index 即执行layedit.build返回的值
         */
        sync(index: number): void;

        /**
         * 获取编辑器选中的文本
         * @param index 即执行layedit.build返回的值
         */
        getSelection(index: number): string;
    }

    interface PageOptions {
        /**
         * 指向存放分页的容器，值可以是容器ID、DOM对象。如： 
         * 1. elem: 'id' 注意：这里不能加 # 号 
         * 2. elem: document.getElementById('id')
         */
        elem: string | Object;
        /**
         * 数据总数。一般通过服务端得到
         */
        count?: number;
        /**
         * 每页显示的条数。laypage将会借助 count 和 limit 计算出分页数。默认为:10
         */
        limit?: number;
        /**
         * 每页条数的选择项。如果 layout 参数开启了 limit，则会出现每页条数的select选择框,默认为:[10, 20, 30, 40, 50]
         */
        limits?: number[];
        /**
         * 起始页。一般用于刷新类型的跳页以及HASH跳页。如：
         * @example
         * //开启location.hash的记录
         * laypage.render({
         *   elem: 'test1'
         *   ,count: 500
         *   ,curr: location.hash.replace('#!fenye=', '') //获取起始页
         *   ,hash: 'fenye' //自定义hash值
         * });          
         */
        curr?: number;
        /**
         * 连续出现的页码个数,默认:5
         */
        groups?: number;
        /**
         * 自定义“上一页”的内容，支持传入普通文本和HTML
         * 默认:上一页
         */
        prev?: string;
        /**
         * 自定义“下一页”的内容，同上
         * 默认:下一页
         */
        next?: string;
        /**
         * 自定义“首页”的内容
         * 默认:1
         */
        first?: string;
        /**
         * 自定义“尾页”的内容
         * 默认:总页数
         */
        last?: string;
        /**
         * 自定义排版。可选值有：count（总条目输区域）、prev（上一页区域）、page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）
         * 默认为:['prev', 'page', 'next']
         */
        layout?: ['count' | 'prev' | 'page' | 'next' | 'limit' | 'skip'];
        /**
         * 自定义主题。支持传入：颜色值，或任意普通字符。如： 
         * @example
         * 1. theme: '#c00' 
         * 2. theme: 'xxx' //将会生成 class="layui-laypage-xxx" 的CSS类，以便自定义主题
         */
        theme?: string;
        /**
         * 开启location.hash，并自定义 hash 值。如果开启，在触发分页时，会自动对url追加：#!hash值={curr} 利用这个，可以在页面载入时就定位到指定页
         * 默认为:false
         */
        hash?: string | boolean;
        /**
         * 切换分页的回调
         * 当分页被切换时触发，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
         * @example
         * laypage.render({
         *   elem: 'test1'
         *   ,count: 70 //数据总数，从服务端得到
         *   ,jump: function(obj, first){
         *     //obj包含了当前分页的所有参数，比如：
         *     console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
         *     console.log(obj.limit); //得到每页显示的条数
         *     
         *     //首次不执行
         *     if(!first){
         *       //do something
         *     }
         *   }
         * })
         */
        jump?: (obj: PageOptions, first: boolean) => void;
    }

    interface LayPage {
        render(options: PageOptions): any;
    }

    /**
     * 与一般的字符拼接不同的是，laytpl 的模板可与数据分离，集中把逻辑处理放在 View 层，提升代码可维护性，尤其是针对大量模板渲染的情况。
     * @example
     * layui.use('laytpl', function(){
     *   var laytpl = layui.laytpl;
     *   
     *   //直接解析字符
     *   laytpl('{{ d.name }}是一位公猿').render({
     *     name: '贤心'
     *   }, function(string){
     *     console.log(string); //贤心是一位公猿
     *   });
     *   
     *   //你也可以采用下述同步写法，将 render 方法的回调函数剔除，可直接返回渲染好的字符
     *   var string =  laytpl('{{ d.name }}是一位公猿').render({
     *     name: '贤心'
     *   });
     *   console.log(string);  //贤心是一位公猿
     *   
     *   //如果模板较大，你也可以采用数据的写法，这样会比较直观一些
     *   laytpl([
     *     '{{ d.name }}是一位公猿'
     *     ,'其它字符 {{ d.content }}  其它字符'
     *   ].join(''))
     * });
     * @example
     * 你也可以将模板存储在页面或其它任意位置：
     * //第一步：编写模版。你可以使用一个script标签存放模板，如：
     * <script id="demo" type="text/html">
     *   <h3>{{ d.title }}</h3>
     *   <ul>
     *   {{#  layui.each(d.list, function(index, item){ }}
     *     <li>
     *       <span>{{ item.modname }}</span>
     *       <span>{{ item.alias }}：</span>
     *       <span>{{ item.site || '' }}</span>
     *     </li>
     *   {{#  }); }}
     *   {{#  if(d.list.length === 0){ }}
     *     无数据
     *   {{#  } }} 
     *   </ul>
     * </script>
     *  
     * //第二步：建立视图。用于呈现渲染结果。
     * <div id="view"></div>
     *  
     * //第三步：渲染模版
     * var data = { //数据
     *   "title":"Layui常用模块"
     *   ,"list":[{"modname":"弹层","alias":"layer","site":"layer.layui.com"},{"modname":"表单","alias":"form"}]
     * }
     * var getTpl = demo.innerHTML
     * ,view = document.getElementById('view');
     * laytpl(getTpl).render(data, function(html){
     *   view.innerHTML = html;
     * }); 
     */
    interface LayTpl {
        /**
         * 如果模版默认的 {{ }} 分隔符与你的其它模板（一般是服务端模板）存在冲突，你也可以重新定义分隔符：
         * @param param0 
         */
        config({ open, close }: { open: string, close: string }): void;

        /**
         * @example
         * laytpl.config({
         *   open: '<%',
         *   close: '%>'
         * });
         *  
         * //分割符将必须采用上述定义的
         * laytpl([
         *   '<%# var type = "公"; %>' //JS 表达式
         *   ,'<% d.name %>是一位<% type %>猿。'
         * ].join('')).render({
         *   name: '贤心'
         * }, function(string){
         *   console.log(string); //贤心是一位公猿
         * });
         * @param data 
         * @param callback 
         */
        render(data: Object, callback: Function): any;
    }

    interface DateParam {
        year?: number;
        month?: number;
        date?: number;
        hours?: number;
        minutes?: number;
        seconds?: number;
    }

    interface DateOption {
        /**
         * 必填项，用于绑定执行日期渲染的元素，值一般为选择器，或DOM对象
         * @example laydate.render({ 
         *   elem: '#test' //或 elem: document.getElementById('test')、elem: lay('#test') 等
         *   });
         */
        elem : string | HTMLElement;
        /**
         * 控件选择类型
         * @example
         * 用于单独提供不同的选择器类型，可选值如下表：
         * type可选值	名称	用途
         * year	年选择器	只提供年列表选择
         * month	年月选择器	只提供年、月选择
         * date	日期选择器	可选择：年、月、日。type默认值，一般可不填
         * time	时间选择器	只提供时、分、秒选择
         * datetime	日期时间选择器	可选择：年、月、日、时、分、秒
         * codelayui.code
         * //年选择器
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'year'
         * });
         *  
         * //年月选择器
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'month'
         * });
         *  
         * //日期选择器
         * laydate.render({ 
         *   elem: '#test'
         *   //,type: 'date' //默认，可不填
         * });
         *  
         * //时间选择器
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'time'
         * });
         *  
         * //日期时间选择器
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'datetime'
         * });
         *
         */
        type?: 'year' | 'month' | 'date' | 'time' | 'datetime';
        /**
         * 开启左右面板范围选择
         * 默认值：false
         * 如果设置 true，将默认采用 “ - ” 分割。 你也可以直接设置 分割字符。五种选择器类型均支持左右面板的范围选择。
         * @example
         * //年范围选择
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'year'
         *   ,range: true //或 range: '~' 来自定义分割字符
         * });
         *  
         * //年月范围选择
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'month'
         *   ,range: true //或 range: '~' 来自定义分割字符
         * });
         *  
         * //日期范围选择
         * laydate.render({ 
         *   elem: '#test'
         *   ,range: true //或 range: '~' 来自定义分割字符
         * });
         *  
         * //时间范围选择
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'time'
         *   ,range: true //或 range: '~' 来自定义分割字符
         * });
         *  
         * //日期时间范围选择
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'datetime'
         *   ,range: true //或 range: '~' 来自定义分割字符
         * });
         */
        range?: string | boolean;
        /**
         * 自定义格式
         * 默认值：yyyy-MM-dd
         * 通过日期时间各自的格式符和长度，来设定一个你所需要的日期格式。layDate 支持的格式如下：
         * @example
         * 格式符	说明
         * yyyy	年份，至少四位数。如果不足四位，则前面补零
         * y	年份，不限制位数，即不管年份多少位，前面均不补零
         * MM	月份，至少两位数。如果不足两位，则前面补零。
         * M	月份，允许一位数。
         * dd	日期，至少两位数。如果不足两位，则前面补零。
         * d	日期，允许一位数。
         * HH	小时，至少两位数。如果不足两位，则前面补零。
         * H	小时，允许一位数。
         * mm	分钟，至少两位数。如果不足两位，则前面补零。
         * m	分钟，允许一位数。
         * ss	秒数，至少两位数。如果不足两位，则前面补零。
         * s	秒数，允许一位数。
         * 通过上述不同的格式符组合成一段日期时间字符串，可任意排版，如下所示：
         * 
         * 格式	                示例值
         * yyyy-MM-dd HH:mm:ss	2017-08-18 20:08:08
         * yyyy年MM月dd日   HH时mm分ss秒	2017年08月18日 20时08分08秒
         * yyyyMMdd	    20170818
         * dd/MM/yyyy	18/08/2017
         * yyyy年M月	2017年8月
         * M月d日	    8月18日
         * 北京时间：HH点mm分	北京时间：20点08分
         * yyyy年的M月某天晚上，大概H点	2017年的8月某天晚上，大概20点
         * codelayui.code
         * //自定义日期格式
         * laydate.render({ 
         *   elem: '#test'
         *   ,format: 'yyyy年MM月dd日' //可任意组合
         * }); 
         */
        format?: string;
        /**
         * 初始值
         * 支持传入符合format参数设定的日期格式字符，或者 new Date()
         * @example
         * //传入符合format格式的字符给初始值
         * laydate.render({ 
         *   elem: '#test'
         *   ,value: '2018-08-18' //必须遵循format参数设定的格式
         * });
         *  
         * //传入Date对象给初始值
         * laydate.render({ 
         *   elem: '#test'
         *   ,value: new Date(1534766888000) //参数即为：2018-08-20 20:08:08 的时间戳
         * });
         */
        value?: string | Date;
        /**
         * 初始值填充
         * 默认值：true
         * 用于控制是否自动向元素填充初始值（需配合 value 参数使用）
         * @example
         * laydate.render({
         *   elem: '#test'
         *   ,value: '2017-09-10'
         *   ,isInitValue: false //是否允许填充初始值，默认为 true
         * });
         * 注意：该参数为 layui 2.3.0 新增。
         */
        isInitValue?: boolean;
        /**
         * 最大/小范围内的日期时间值
         * 默认值：min: '1900-1-1'、max: '2099-12-31'
         * 设定有限范围内的日期或时间值，不在范围内的将不可选中。这两个参数的赋值非常灵活，主要有以下几种情况：
         * @example
         * 1.	如果值为字符类型，则：年月日必须用 -（中划线）分割、时分秒必须用 :（半角冒号）号分割。这里并非遵循 format 设定的格式
         * 2.	如果值为整数类型，且数字＜86400000，则数字代表天数，如：min: -7，即代表最小日期在7天前，正数代表若干天后
         * 3.	如果值为整数类型，且数字 ≥ 86400000，则数字代表时间戳，如：max: 4073558400000，即代表最大日期在：公元3000年1月1日
         * 示例layui.code
         * //日期有效范围只限定在：2017年
         * laydate.render({ 
         *   elem: '#test'
         *   ,min: '2017-1-1'
         *   ,max: '2017-12-31'
         * });
         *  
         * //日期有效范围限定在：过去一周到未来一周
         * laydate.render({ 
         *   elem: '#test'
         *   ,min: -7 //7天前
         *   ,max: 7 //7天后
         * });
         *  
         * //日期时间有效范围的设定: 
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'datetime'
         *   ,min: '2017-8-11 12:30:00'
         *   ,max: '2017-8-18 12:30:00'
         * });
         *  
         * //时间有效范围设定在: 上午九点半到下午五点半
         * laydate.render({ 
         *   elem: '#test'
         *   ,type: 'time'
         *   ,min: '09:30:00'
         *   ,max: '17:30:00'
         * });   
         * 毫不保留地说，min和max参数是两个非常强大的存在，合理运用，可帮助用户在日期与时间的选择上带来更为友好的约束与体验。
         */
        min?: string;
        max?: string;
        /**
         * 自定义弹出控件的事件
         * 默认值：focus，如果绑定的元素非输入框，则默认事件为：click
         * @example
         * //自定义事件
         * laydate.render({ 
         *   elem: '#test'
         *   ,trigger: 'click' //采用click弹出
         * });
         */
        trigger?: string;
        /**
         * 默认显示
         * 默认值：false
         * @example
         * 如果设置: true，则控件默认显示在绑定元素的区域。通常用于外部事件调用控件，如：
         * codelayui.code
         * //默认显示
         * laydate.render({
         *   elem: '#test'
         *   ,show: true //直接显示
         * });
         *       
         * //外部事件调用
         * lay('#test1').on('click', function(e){ //假设 test1 是一个按钮
         *   laydate.render({
         *     elem: '#test'
         *     ,show: true //直接显示
         *     ,closeStop: '#test1' //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
         *   });
         * });
         */
        show?: boolean;
        /**
         * 定位方式
         * 默认值：absolute
         * @example
         * 用于设定控件的定位方式，有以下三种可选值：
         * position 可选值	说明
         * abolute	绝对定位，始终吸附在绑定元素周围。默认值
         * fixed	固定定位，初始吸附在绑定元素周围，不随浏览器滚动条所左右。一般用于在固定定位的弹层中使用。
         * static	静态定位，控件将直接嵌套在指定容器中。 
         * 注意：请勿与 show 参数的概念搞混淆。show为 true 时，控件仍然是采用绝对或固定定位。而这里是直接嵌套显示
         * 下面是一个直接嵌套显示的例子：
         * 
         * 2018年8月
         * 重置现在确定
         *  
         * codelayui.code
         * 【HTML】
         * <span id="testView"></span>
         * <div id="test2"></div>
         *  
         * 【JS】:      
         * //嵌套在指定容器中
         * laydate.render({
         *   elem: '#test2'
         *   ,position: 'static'
         *   ,change: function(value, date){ //监听日期被切换
         *     lay('#testView').html(value);
         *   }
         * });
         */
        position?: string;
        /**
         * 层叠顺序
         * 默认值：66666666
         * @example
         * 一般用于解决与其它元素的互相被遮掩的问题。如果 position 参数设为 static 时，该参数无效。
         * codelayui.code
         * //设定控件的层叠顺序
         * laydate.render({
         *   elem: '#test'
         *   ,zIndex: 99999999
         * });
         */
        zIndex?: number;
        /**
         * 是否显示底部栏
         * 默认值：true
         * @example
         * 如果设置 false，将不会显示控件的底部栏区域
         * codelayui.code
         * //不显示底部栏
         * laydate.render({
         *   elem: '#test'
         *   ,showBottom: false
         * });
         */
        showBottom?: boolean;
        /**
         * 工具按钮
         * @example
         * ['clear', 'now', 'confirm']
         * //只显示清空和确认
         * laydate.render({
         *   elem: '#test'
         *   ,btns: ['clear', 'confirm']
         * });
         */
        btns?: string[];
        /**
         * 语言
         * 默认值：cn
         * @example
         * 我们内置了两种语言版本：cn（中文版）、en（国际版，即英文版）。这里并没有开放自定义文字，是为了避免繁琐的配置。
         * codelayui.code
         * //国际版
         * laydate.render({
         *   elem: '#test'
         *   ,lang: 'en'
         * });
         */
        lang?: 'cn' | 'en';
        /**
         * 主题
         * 默认值：default
         * @example
         * 我们内置了多种主题，theme的可选值有：default（默认简约）、molv（墨绿背景）、#颜色值（自定义颜色背景）、grid（格子主题）
         * codelayui.code
         * //墨绿背景主题
         * laydate.render({
         *   elem: '#test'
         *   ,theme: 'molv'
         * });
         *  
         * //自定义背景色主题 - 非常实用
         * laydate.render({
         *   elem: '#test'
         *   ,theme: '#393D49'
         * });
         *  
         * //格子主题
         * laydate.render({
         *   elem: '#test'
         *   ,theme: 'grid'
         * });
         *       
         * 另外，你还可以传入其它字符，如：theme: 'xxx'，那么控件将会多出一个 class="laydate-theme-xxx" 的CSS类，以便于你单独定制主题。
         */
        theme?: string | 'default' | 'molv' | 'grid';
        /**
         * 是否显示公历节日
         * 默认值：false
         * @example
         * 我们内置了一些我国通用的公历重要节日，通过设置 true 来开启。国际版不会显示。
         * codelayui.code
         * //允许显示公历节日
         * laydate.render({
         *   elem: '#test'
         *   ,calendar: true
         * });
         */
        calendar?: boolean;
        /**
         * 标注重要日子
         * 默认值：无
         * @example
         * calendar 参数所代表的公历节日更多情况下是一个摆设。因此，我们还需要自定义标注重要日子，比如结婚纪念日？日程等？它分为以下两种：
         * 标注	            格式	            说明
         * 每年的日期	{'0-9-18': '国耻'}	0 即代表每一年
         * 每月的日期	{'0-0-15': '中旬'}	0-0 即代表每年每月（layui 2.1.1/layDate 5.0.4 新增）
         * 特定的日期	{'2017-8-21': '发布')	-
         * 可同时设定多个，如：
         * 
         * codelayui.code
         * //标注重要日子
         * var ins1 = laydate.render({
         *   elem: '#test'
         *   ,mark: {
         *     '0-10-14': '生日'
         *     ,'0-12-31': '跨年' //每年12月31日
         *     ,'0-0-10': '工资' //每个月10号
         *     ,'2017-8-15': '' //具体日期
         *     ,'2017-8-20': '预发' //如果为空字符，则默认显示数字+徽章
         *     ,'2017-8-21': '发布'
         *   }
         *   ,done: function(value, date){
         *     if(date.year === 2017 && date.month === 8 && date.date === 15){ //点击2017年8月15日，弹出提示语
         *       ins1.hint('中国人民抗日战争胜利72周年');
         *     }
         *   }
         * });   
         * 非常实用的存在，是时候利用它制作你的日程表了。
         */
        mark?: Object;
        /**
         * 控件初始打开的回调
         * @example
         * 控件在打开时触发，回调返回一个参数：初始的日期时间对象
         * laydate.render({
         *   elem: '#test'
         *   ,ready: function(date){
         *     console.log(date); //得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
         *   }
         * });
         */
        ready?: (date: DateParam) => void;
        /**
         * 日期时间被切换后的回调
         * 年月日时间被切换时都会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
         * @example
         * laydate.render({
         *   elem: '#test'
         *   ,change: function(value, date, endDate){
         *     console.log(value); //得到日期生成的值，如：2017-08-18
         *     console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
         *     console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
         *   }
         * });
         */
        change?: (value: string, date: DateParam, endDate?: DateParam) => void;
        /**
         * 控件选择完毕后的回调
         * 点击日期、清空、现在、确定均会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
         * @example
         * laydate.render({
         *   elem: '#test'
         *   ,done: function(value, date, endDate){
         *     console.log(value); //得到日期生成的值，如：2017-08-18
         *     console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
         *     console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
         *   }
         * });
         */
        done?: (value: string, date: DateParam, endDate?: DateParam) => void;
    }

    interface LayDate {
        /**
         * @example
         * 这是一个最简单的示例：   
         * yyyy-MM-dd
         *  对应的代码如下：
         * 在 layui 模块中使用layui.code
         * <!DOCTYPE html>
         * <html>
         * <head>
         *   <meta charset="utf-8">
         *   <title>layDate快速使用</title>
         *   <link rel="stylesheet" href="/static/build/layui.css" media="all">
         * </head>
         * <body>
         *  
         * <div class="layui-inline"> <!-- 注意：这一层元素并不是必须的 -->
         *   <input type="text" class="layui-input" id="test1">
         * </div>
         *  
         * <script src="/static/build/layui.js"></script>
         * <script>
         * layui.use('laydate', function(){
         *   var laydate = layui.laydate;
         *   
         *   //执行一个laydate实例
         *   laydate.render({
         *     elem: '#test1' //指定元素
         *   });
         * });
         * </script>
         * </body>
         * </html>
         *       
         * 作为独立组件使用layui.code
         * <!DOCTYPE html>
         * <html>
         * <head>
         *   <meta charset="utf-8">
         *   <title>使用 layDate 独立版</title>
         * </head>
         * <body>
         *  
         * <input type="text" id="test1">
         *  
         * <script src="laydate.js"></script>
         * <script>
         * //执行一个laydate实例
         * laydate.render({
         *   elem: '#test1' //指定元素
         * });
         * </script>
         * </body>
         * </html>
         *       
         * 除了在组件加载方式有一些小小的不同，其它都完全类似
         * @example
         * 弹出控件提示
         * 事实上，执行核心方法 laydate.render(options) 会返回一个当前实例对象。其中包含一些成员属性和方法，比如：hint方法
         * var ins1 = laydate.render({
         *   elem: '#test'
         *   ,change: function(value, date, endDate){
         *     ins1.hint(value); //在控件上弹出value值
         *   }
         * });
         * @param options 
         */
        render(options: DateOption): any;
        set(options: DateOption): void;
        /**
         * 获取指定年月的最后一天，month默认为当前月，year默认为当前年。如： 
         * var endDate1 = laydate.         * (10); //得到31 
         * var endDate2 = laydate.         * (2, 2080); //得到29
         * @param month 
         * @param year 
         */
        getEndDate(month: number, year?: number): number;
    }

    /**
     * 目前 rate 组件提供了以下基础参数，你可根据实际场景进行相应的设置
     */
    interface RateOption {
        elem: string| object;   //指向容器选择器
        length?: number;        //评分组件中具体星星的个数。个数当然是整数啦，残缺的星星很可怜的，所以设置了小数点的组件我们会默认向下取整,默认为:5
        value?: number;         //评分的初始值,默认为:0
        theme?: string;         //主题颜色。我们默认的组件颜色是#FFB800，你可以根据自身喜好来更改组件的颜色，以适用不同场景,默认为:FFB800
        half?: boolean;         //设定组件是否可以选择半星,默认为: false
        text?: boolean;         //是否显示评分对应的内容,默认为:f alse
        readonly?: boolean;     //是否只读，即只用于展示而不可点,默认为: false
        /**
         * 通过 setText 函数，在组件初次渲染和点击后时产生回调。我们默认文本以星级显示，你可以根据自己设定的文字来替换我们的默认文本，如 “讨厌” “喜欢” 。若用户选择分数而没有设定对应文字的情况下，系统会使用我们的默认文本
         * @example
         * rate.render({
         *   elem: '#test1'
         *   ,setText: function(value){
         *     var arrs = {
         *       '1': '极差'
         *       ,'2': '差'
         *       ,'3': '中等'
         *       ,'4': '好'
         *     };
         *     this.span.text(arrs[value] || ( value + "星"));
         *   }
         * });
         * 当你点击 3 星时，文本内容是中等，点击 5 星时，由于没有设定对应文字，所以文本会显示 5 星
         */
        setText?: (value: number) => void;

        /**
         * 点击产生的回调
         * 通过 choose 实现函数，在组件被点击后触发，回调分数，用户可根据分数来设置效果，比如出现弹出层
         * @example
         * rate.render({
         *   elem: '#test1'
         *   ,choose: function(value){
         *     if(value > 4) alert( '么么哒' )
         *   }
         * });
         * 那么当你点击 5 星或更高星级时，页面就会弹出“么么哒”啦，你可根据相应需求在 choose 里完善你的代码
         */
        choose?: (value: number) => void;
    } 

    /**
     * rate 组件可以用来进行展示或评价，你只需要通过更改参数设定来开启你想要的功能，如下是一个最基本的例子：
     * @example
     * <!DOCTYPE html>
     * <html>
     * <head>
     *   <meta charset="utf-8">
     *   <title>评分组件</title>
     *   <link rel="stylesheet" href="../src/css/layui.css">
     * </head>
     * <body>
     *   <div id="test1"></div>
     *   <script src="../src/layui.js"></script>
     *   <script>
     *   layui.use('rate', function(){
     *     var rate = layui.rate;
     *    
     *     //渲染
     *     var ins1 = rate.render({
     *       elem: '#test1'  //绑定元素
     *     });
     *   });
     *   </script>
     * </body>
     * </html>
     * @example
     * 如若你设置分数，我们会根据你是否开启半星功能，来做一个具体的规范：
     * 关闭半星功能:
     * 小数值大于 0.5 ：分数向上取整，如 3.6 分，则系统自动更改为 4 分
     * 小数值小于等于 0.5 ：分数向下取整，如 3.2 分，则系统自动更改为 3 分
     * 如果在关闭半星功能的情况下开启了文本，你会发现你的分数也相应的变成了整数
     * 开启半星功能:
     * 不论你的小数值是 0.1 还是 0.9，都统一规划为 0.5，在文本开启的情况下，你可以看见你的分数并没有发生变化
    */
    interface LayRate {
        /**
         * 评分重置
         * @param value 
         */
        setvalue(value: number): void;
    }

    interface TableCols {
        /**
         * （必填项）设定字段名。字段名的设定非常重要，且是表格数据列的唯一标识
         */
        field: String;
        /**
         * （必填项）设定标题名称
         */
        title: String;
        /**
         * 设定列宽（默认自动分配）。支持填写：数字、百分比。请结合实际情况，对不同列做不同设定。注意：如果是 layui 2.2.0 之前的版本，列宽必须设定一个固定数字,示例:200/30%
         */
        width?: Number | String;
        /**
         * （layui 2.2.1 新增）局部定义当前常规单元格的最小宽度（默认：60），一般用于列宽自动分配的情况。其优先级高于基础参数中的 cellMinWidth,
         */
        minWidth?: Number;
        /**
         * 设定列类型。可选值有：normal（常规列，无需设定）、checkbox（复选框列）、space（空列）、numbers（序号列）。注意：该参数为 layui 2.2.0 新增。而如果是之前的版本，复选框列采用 checkbox: true、空列采用 space: true
         */
        type?: String;
        /**
         * 是否全选状态（默认：false）。必须复选框列开启后才有效，如果设置 true，则表示复选框默认全部选中
         */
        LAY_CHECKED?: Boolean;
        /**
         * 固定列。可选值有：left（固定在左）、right（固定在右）。一旦设定，对应的列将会被固定在左或右，不随滚动条而滚动。 注意：如果是固定在左，该列必须放在表头最前面；如果是固定在右，该列必须放在表头最后面。
         */
        fixed?: String;
        /**
         * 是否允许排序（默认：false）。如果设置 true，则在对应的表头显示排序icon，从而对列开启排序功能。注意：不推荐对值同时存在“数字和普通字符”的列开启排序，因为会进入字典序比对。比如：'贤心' > '2' > '100'，这可能并不是你想要的结果，但字典序排列算法（ASCII码比对）就是如此。
         */
        sort?: Boolean;
        /**
         * 是否禁用拖拽列宽（默认：false）。默认情况下会根据列类型（type）来决定是否禁用，如复选框列，会自动禁用。而其它普通列，默认允许拖拽列宽，当然你也可以设置 true 来禁用该功能。
         */
        unresize?: Boolean;
        /**
         * 单元格编辑类型（默认不开启）目前只支持：text（输入框）
         */
        edit?: String;
        /**
         * 自定义单元格点击事件名，以便在 tool 事件中完成对该单元格的业务处理
         */
        event?: String;
        /**
         * 自定义单元格样式。即传入 CSS 样式	background-color: #5FB878; color: #fff;
         */
        style?: String;
        /**
         * 单元格排列方式。可选值有：left（默认）、center（居中）、right（居右）
         */
        align?: String;
        /**
         * 单元格所占列数（默认：1）。一般用于多级表头
         */
        colspan?: Number;
        /**
         * 单元格所占行数（默认：1）。一般用于多级表头
         */
        rowspan?: Number;
        /**
         * 自定义列模板，模板遵循 laytpl 语法。这是一个非常实用的功能，你可借助它实现逻辑处理，以及将原始数据转化成其它格式，如时间戳转化为日期字符等	详见自定义模板
         * 类型：String，默认值：无
         * @example
         * 在默认情况下，单元格的内容是完全按照数据接口返回的content原样输出的，如果你想对某列的单元格添加链接等其它元素，你可以借助该参数来轻松实现。这是一个非常实用且强大的功能，你的表格内容会因此而丰富多样。
         * 
         * templet 提供了三种使用方式，请结合实际场景选择最合适的一种：
         * 如果自定义模版的字符量太大，我们推荐你采用【方式一】；
         * 如果自定义模板的字符量适中，或者想更方便地调用外部方法，我们推荐你采用【方式二】；
         * 如果自定义模板的字符量很小，我们推荐你采用【方式三】
         * 方式一：绑定模版选择器。
         * 
         * codelayui.code
         * table.render({
         *   cols: [[
         *     {field:'title', title: '文章标题', width: 200, templet: '#titleTpl'} //这里的templet值是模板元素的选择器
         *     ,{field:'id', title:'ID', width:100}
         *   ]]
         * });
         *  
         * 等价于：
         * <th lay-data="{field:'title', width: 200, templet: '#titleTpl'}">文章标题</th>
         * <th lay-data="{field:'id', width:100}">ID</th>
         *       
         * 下述是templet对应的模板，它可以存放在页面的任意位置。模板遵循于 laytpl 语法，可读取到返回的所有数据
         * 
         * HTMLlayui.code
         * <script type="text/html" id="titleTpl">
         *   <a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a>
         * </script>
         *  
         * 注意：上述的 {{d.id}}、{{d.title}} 是动态内容，它对应数据接口返回的字段名。除此之外，你还可以读取到以下额外字段：
         *      序号：{{ d.LAY_INDEX }} （该额外字段为 layui 2.2.0 新增）
         *  
         * 由于模板遵循 laytpl 语法（建议细读 laytpl文档 ），因此在模板中你可以写任意脚本语句（如 if else/for等）：
         * <script type="text/html" id="titleTpl">
         *   {{#  if(d.id < 100){ }}
         *     <a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a>
         *   {{#  } else { }}
         *     {{d.title}}(普通用户)
         *   {{#  } }}
         * </script>
         *       
         * 方式二：函数转义。自 layui 2.2.5 开始，templet 开始支持函数形式，函数返回一个参数 d，包含接口返回的所有字段和数据。如下所示：
         * 
         * codelayui.code
         * table.render({
         *   cols: [[
         *     {field:'title', title: '文章标题', width: 200
         *       ,templet: function(d){
         *         return 'ID：'+ d.id +'，标题：<span style="color: #c00;">'+ d.title +'</span>'
         *       }
         *     }
         *     ,{field:'id', title:'ID', width:100}
         *   ]]
         * });    
         *       
         * 方式三：直接赋值模版字符。事实上，templet 也可以直接是一段 html 内容，如：
         * 
         * codelayui.code
         *        
         * templet: '<div><a href="/detail/{{d.id}}" class="layui-table-link">{{d.title}}</a></div>'
         *  
         * 注意：这里一定要被一层 <div></div> 包裹，否则无法读取到模板
         *       
         * toolbar - 绑定列工具条
         * 类型：String，默认值：无
         * 
         * 通常你需要在表格的每一行加上 查看、编辑、删除 这样类似的操作按钮，而 tool 参数就是为此而生，你因此可以非常便捷地实现各种操作功能。tool 参数和 templet 参数的使用方式完全类似，通常接受的是一个选择器，也可以是一段HTML字符。
         * 
         * codelayui.code
         * table.render({
         *   cols: [[
         *     {field:'id', title:'ID', width:100}
         *     ,{fixed: 'right', width:150, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
         *   ]]
         * });
         *  
         * 等价于：
         * <th lay-data="{field:'id', width:100}">ID</th>
         * <th lay-data="{fixed: 'right', width:150, align:'center', toolbar: '#barDemo'}"></th>
         *       
         * 下述是 toolbar 对应的模板，它可以存放在页面的任意位置：
         * 
         * HTMLlayui.code
         * <script type="text/html" id="barDemo">
         *   <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
         *   <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
         *   <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
         *   
         *   <!-- 这里同样支持 laytpl 语法，如： -->
         *   {{#  if(d.auth > 2){ }}
         *     <a class="layui-btn layui-btn-xs" lay-event="check">审核</a>
         *   {{#  } }}
         * </script>
         *  
         * 注意：属性 lay-event="" 是模板的关键所在，值可随意定义。
         *       
         * 接下来我们可以借助 table模块的工具条事件，完成不同的操作功能：
         * 
         *  codelayui.code
         * //监听工具条
         * table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
         *   var data = obj.data; //获得当前行数据
         *   var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
         *   var tr = obj.tr; //获得当前行 tr 的DOM对象
         *  
         *   if(layEvent === 'detail'){ //查看
         *     //do somehing
         *   } else if(layEvent === 'del'){ //删除
         *     layer.confirm('真的删除行么', function(index){
         *       obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
         *       layer.close(index);
         *       //向服务端发送删除指令
         *     });
         *   } else if(layEvent === 'edit'){ //编辑
         *     //do something
         *     
         *     //同步更新缓存对应的值
         *     obj.update({
         *       username: '123'
         *       ,title: 'xxx'
         *     });
         *   }
         * });
         *       
         */
        templet?: String;
        /**
         * 绑定列工具条。设定后，可在每行列中出现一些自定义的操作性按钮	详见列工具条
         * 类型：String，默认值：无
         * @example
         * 通常你需要在表格的每一行加上 查看、编辑、删除 这样类似的操作按钮，而 tool 参数就是为此而生，你因此可以非常便捷地实现各种操作功能。tool 参数和 templet 参数的使用方式完全类似，通常接受的是一个选择器，也可以是一段HTML字符。
         * 
         * codelayui.code
         * table.render({
         *   cols: [[
         *     {field:'id', title:'ID', width:100}
         *     ,{fixed: 'right', width:150, align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
         *   ]]
         * });
         *  
         * 等价于：
         * <th lay-data="{field:'id', width:100}">ID</th>
         * <th lay-data="{fixed: 'right', width:150, align:'center', toolbar: '#barDemo'}"></th>
         *       
         * 下述是 toolbar 对应的模板，它可以存放在页面的任意位置：
         * 
         * HTMLlayui.code
         * <script type="text/html" id="barDemo">
         *   <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
         *   <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
         *   <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
         *   
         *   <!-- 这里同样支持 laytpl 语法，如： -->
         *   {{#  if(d.auth > 2){ }}
         *     <a class="layui-btn layui-btn-xs" lay-event="check">审核</a>
         *   {{#  } }}
         * </script>
         *  
         * 注意：属性 lay-event="" 是模板的关键所在，值可随意定义。
         *       
         * 接下来我们可以借助 table模块的工具条事件，完成不同的操作功能：
         * 
         *  codelayui.code
         * //监听工具条
         * table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
         *   var data = obj.data; //获得当前行数据
         *   var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
         *   var tr = obj.tr; //获得当前行 tr 的DOM对象
         *  
         *   if(layEvent === 'detail'){ //查看
         *     //do somehing
         *   } else if(layEvent === 'del'){ //删除
         *     layer.confirm('真的删除行么', function(index){
         *       obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
         *       layer.close(index);
         *       //向服务端发送删除指令
         *     });
         *   } else if(layEvent === 'edit'){ //编辑
         *     //do something
         *     
         *     //同步更新缓存对应的值
         *     obj.update({
         *       username: '123'
         *       ,title: 'xxx'
         *     });
         *   }
         * }); 
         */
        toolbar?: String;
    }

    interface TableOption {
        /**
         * 指定原始 table 容器的选择器或 DOM，方法渲染方式必填,默认:'#demo'
         */
        elem?: string|object;
        /**
         * 设置表头。值是一个二维数组。方法渲染方式必填
         */
        cols?:	TableCols[][];
        /**
         * 异步数据接口相关参数。其中 url 参数为必填项	详见异步接口
         * 异步数据接口
         * @example
         * 数据的异步请求由以下几个参数组成：
         * 参数名	功能
         * url	接口地址。默认会自动传递两个参数：?page=1&limit=30（该参数可通过 request 自定义） 
         * page 代表当前页码、limit 代表每页数据量
         * method	接口http请求类型，默认：get
         * where	接口的其它参数。如：where: {token: 'sasasas', id: 123}
         * contentType	发送到服务端的内容编码类型。如果你要发送 json 内容，可以设置：contentType: 'application/json'
         * headers	接口的请求头。如：headers: {token: 'sasasas'}。注：该参数为 layui 2.2.6 开始新增
         * request	用于对分页请求的参数：page、limit重新设定名称，如：
         * codelayui.code
         * request: {
         *   pageName: 'curr' //页码的参数名称，默认：page
         *   ,limitName: 'nums' //每页数据量的参数名，默认：limit
         * }              
         *               
         * 那么请求数据时的参数将会变为：?curr=1&nums=30
         * response	用于对返回的数据格式的自定义，如：
         * codelayui.code
         * response: {
         *   statusName: 'status' //数据状态的字段名称，默认：code
         *   ,statusCode: 200 //成功的状态码，默认：0
         *   ,msgName: 'hint' //状态信息的字段名称，默认：msg
         *   ,countName: 'total' //数据总数的字段名称，默认：count
         *   ,dataName: 'rows' //数据列表的字段名称，默认：data
         * }      
         *               
         * 你接口返回的数据格式，比如遵循 response 对应的字段名称。比如上面对应的格式为：
         * 接口返回的数据格式layui.code
         * {
         *   status: 200,
         *   hint: "",
         *   total: 1000,
         *   rows: []
         * } 
         *               
         * 下面是默认接受的数据格式：
         * 默认接受的数据格式layui.code
         * {
         *   code: 0,
         *   msg: "",
         *   count: 1000,
         *   data: []
         * } 
         *               
         * 接口参考：/demo/table/user/
         * 
         * 注意：request 和 response 参数均为 layui 2.1.0 版本新增
         * 
         * 调用示例：
         * 
         * codelayui.code
         * //“方法级渲染”配置方式
         * table.render({ //其它参数在此省略
         *   url: '/api/data/'
         *   //where: {token: 'sasasas', id: 123} //如果无需传递额外参数，可不加该参数
         *   //method: 'post' //如果无需自定义HTTP类型，可不加该参数
         *   //request: {} //如果无需自定义请求参数，可不加该参数
         *   //response: {} //如果无需自定义数据响应名称，可不加该参数
         * }); 
         *  
         * 等价于（“自动化渲染”配置方式）
         * <table class="layui-table" lay-data="{url:'/api/data/'}" lay-filter="test"> …… </table>
      
         */
        url?: string;
        /**
         * 设定容器宽度。table容器的默认宽度是跟随它的父元素铺满，你也可以设定一个固定值，当容器中的内容超出了该宽度时，会自动出现横向滚动条
         */
        width?: Number;
        /**
         * 设定容器高度	详见height
         * @example
         * 可选值	    说明	        示例
         * 不填写	    默认情况。高度随数据列表而适应，表格容器不会出现纵向滚动条	-
         * 固定值	    设定一个数字，用于定义容器高度，当容器中的内容超出了该高度时，会自动出现纵向滚动条	height: 315
         * full-差值	高度将始终铺满，无论浏览器尺寸如何。这是一个特定的语法格式，其中 full 是固定的，而 差值 则是一个数值，这需要你来预估，比如：表格容器距离浏览器顶部和底部的距离“和” PS：该功能为 layui 2.1.0 版本中新增	height: 'full-20'
         * 
         * //“方法级渲染”配置方式
         * table.render({ //其它参数在此省略
         *   height: 315 //固定值
         * }); 
         * table.render({ //其它参数在此省略
         *   height: 'full-20' //高度最大化减去差值
         * }); 
         *  
         * 等价于（“自动化渲染”配置方式）
         * <table class="layui-table" lay-data="{height:315}" lay-filter="test"> …… </table>
         * <table class="layui-table" lay-data="{height:'full-20'}" lay-filter="test"> …… </table>
         */
        height?: Number|String;
        /**
         * （layui 2.2.1 新增）全局定义所有常规单元格的最小宽度（默认：60），一般用于列宽自动分配的情况。其优先级低于表头参数中的 minWidth
         */
        cellMinWidth?: Number;
        /**
         * 数据渲染完的回调。你可以借此做一些其它的操作	详见done回调
         * 无论是异步请求数据，还是直接赋值数据，都会触发该回调。你可以利用该回调做一些表格以外元素的渲染。
         * @example
         * table.render({ //其它参数在此省略
         *   done: function(res, curr, count){
         *     //如果是异步请求数据方式，res即为你接口返回的信息。
         *     //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
         *     console.log(res);
         *     //得到当前页码
         *     console.log(curr); 
         *     //得到数据总量
         *     console.log(count);
         *   }
         * });
         */
        done?: (res, curr: Number, count: Number) => any;
        /**
         * 直接赋值数据。既适用于只展示一页数据，也非常适用于对一段已知数据进行多页展示。	[{}, {}, {}, {}, …]
         */
        data?: Array<object>;
        /**
         * 开启分页（默认：false） 注：从 layui 2.2.0 开始，支持传入一个对象，里面可包含 laypage 组件所有支持的参数（jump、elem除外）	{theme: '#c00'}
         */
        page?: Boolean|Object;
        /**
         * 每页显示的条数（默认：10）。值务必对应 limits 参数的选项。优先级低于 page 参数中的 limit 参数
         */
        limit?: Number;
        /**
         * 每页条数的选择项，默认：[10,20,30,40,50,60,70,80,90],优先级低于 page 参数中的 limits 参数
         */
        limits?: Number[];
        /**
         * 是否显示加载条（默认：true）。如果设置 false，则在切换分页时，不会出现加载条。该参数只适用于 url 参数开启的方式	
         */
        loading?: Boolean;
        /**
         * 自定义文本，如空数据时的异常提示等。注：layui 2.2.5 开始新增。	详见自定义文本
         * table 模块会内置一些默认的文本信息，如果想修改，你可以设置以下参数达到目的。
         * @example
         * table.render({ //其它参数在此省略
         *   text: {
         *     none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
         *   }
         * });
         */
        text?: Object;
        /**
         * 初始排序状态。用于在数据表格渲染完毕时，默认按某个字段排序。注：该参数为 layui 2.1.1 新增	详见初始排序
         * 用于在数据表格渲染完毕时，默认按某个字段排序。注：该参数为 layui 2.1.1 新增
         * @example
         * //“方法级渲染”配置方式
         * table.render({ //其它参数在此省略
         *   initSort: {
         *     field: 'id' //排序字段，对应 cols 设定的各字段名
         *     ,type: 'desc' //排序方式  asc: 升序、desc: 降序、null: 默认排序
         *   }
         * });
         *  
         * 等价于（“自动化渲染”配置方式）
         * <table class="layui-table" lay-data="{initSort:{field:'id', type:'desc'}}" lay-filter="test"> …… </table>
         */
        initSort?: Object;
        /**
         * 设定容器唯一ID。注意：从 layui 2.2.0 开始，该参数等价于 <table id="test"></table> 中的 id 值。id值是对表格的数据操作方法上是必要的传递条件，它是表格容器的索引。你在下文也将会见识它的存在。
         */
        id?: String;
        /**
         * 设定表格各种外观、尺寸等
         * 控制表格外观的主要由以下参数组成：
         * @example
         * 参数名	可选值	备注
         * skin	line （行边框风格）  row （列边框风格） nob （无边框风格）	用于设定表格风格，若使用默认风格不设置该属性即可
         * even	true/false	若不开启隔行背景，不设置该参数即可
         * size	sm （小尺寸） 
         * lg （大尺寸）	用于设定表格尺寸，若使用默认尺寸不设置该属性即可
         * 
         * //“方法级渲染”配置方式
         * table.render({ //其它参数在此省略
         *   skin: 'line' //行边框风格
         *   ,even: true //开启隔行背景
         *   ,size: 'sm' //小尺寸的表格
         * }); 
         *  
         * 等价于（“自动化渲染”配置方式）
         * <table class="layui-table" lay-data="{skin:'line', even:true, size:'sm'}" lay-filter="test"> …… </table>
         */
        skin?: string;
    }

    /**
     * 创建一个table实例最简单的方式是，在页面放置一个元素 <table id="test"></table>，然后通过 table.render() 方法指定该容器，如下所示：
     * @example
     * <!DOCTYPE html>
     * <html>
     * <head>
     *  <meta charset="utf-8">
     *  <title>table模块快速使用</title>
     *  <link rel="stylesheet" href="/layui/css/layui.css" media="all">
     * </head>
     * <body>
     * 
     * <table id="demo" lay-filter="test"></table>
     * 
     * <script src="/layui/layui.js"></script>
     * <script>
     * layui.use('table', function(){
     *  var table = layui.table;
     *  
     *  //第一个实例
     *  table.render({
     *    elem: '#demo'
     *    ,height: 315
     *    ,url: '/demo/table/user/' //数据接口
     *    ,page: true //开启分页
     *    ,cols: [[ //表头
     *      {field: 'id', title: 'ID', width:80, sort: true, fixed: 'left'}
     *      ,{field: 'username', title: '用户名', width:80}
     *      ,{field: 'sex', title: '性别', width:80, sort: true}
     *      ,{field: 'city', title: '城市', width:80} 
     *      ,{field: 'sign', title: '签名', width: 177}
     *      ,{field: 'experience', title: '积分', width: 80, sort: true}
     *      ,{field: 'score', title: '评分', width: 80, sort: true}
     *      ,{field: 'classify', title: '职业', width: 80}
     *      ,{field: 'wealth', title: '财富', width: 135, sort: true}
     *    ]]
     *  });
     *  
     * });
     * </script>
     * </body>
     * </html>
     * 一切都并不会陌生：绑定容器、设置数据接口、在表头设定对应的字段，剩下的…就交给 layui 吧。你的牛刀是否早已饥渴难耐？那么不妨现在就去小试一波吧。数据接口可参考：返回的数据，规则在下文也有讲解。
     * 在上述“快速使用”的介绍中，你已经初步见证了 table 模块的信手拈来，但其使用方式并不止那一种。我们为了满足各种情况下的需求，对 table 模块做了三种初始化的支持，你可按照个人喜好和实际情况灵活使用。
     *
     *   方式	机制	适用场景
     *   01.	方法渲染	用JS方法的配置完成渲染	（推荐）无需写过多的 HTML，在 JS 中指定原始元素，再设定各项参数即可。
     *   02.	自动渲染	HTML配置，自动渲染	无需写过多 JS，可专注于 HTML 表头部分
     *   03.	转换静态表格	转化一段已有的表格元素	无需配置数据接口，在JS中指定表格元素，并简单地给表头加上自定义属性即可
     * 
     * @example
     * 方法渲染
     * 其实这是“自动化渲染”的手动模式，本质类似，只是“方法级渲染”将基础参数的设定放在了JS代码中，且原始的 table 标签只需要一个 选择器：
     * 
     * HTMLlayui.code
     *           
     * <table id="demo" lay-filter="test"></table>
     *     
     * JavaScriptlayui.code
     * var table = layui.table;
     *  
     * //执行渲染
     * table.render({
     *   elem: '#demo' //指定原始表格元素选择器（推荐id选择器）
     *   ,height: 315 //容器高度
     *   ,cols: [{}] //设置表头
     *   //,…… //更多参数参考右侧目录：基本参数选项
     * });
     *     
     * 事实上我们更推荐采用“方法级渲染”的做法，其最大的优势在于你可以脱离HTML文件，而专注于JS本身。尤其对于项目的频繁改动及发布，其便捷性会体现得更为明显。而究竟它与“自动化渲染”的方式谁更简单，也只能由各位猿猿们自行体味了。
     * 
     * 备注：table.render()方法返回一个对象：var tableIns = table.render(options)，可用于对当前表格进行“重载”等操作，详见目录：表格重载
     * @example
     * 自动渲染
     * 所谓的自动渲染，即：在一段 table 容器中配置好相应的参数，由 table 模块内部自动对其完成渲染，而无需你写初始的渲染方法。其特点在上文也有阐述。你需要关注的是以下三点： 
     * 1) 带有 class="layui-table" 的 <table> 标签。 
     * 2) 对标签设置属性 lay-data="" 用于配置一些基础参数 
     * 3) 在 <th> 标签中设置属性lay-data=""用于配置表头信息
     * 
     * 按照上述的规范写好table原始容器后，只要你加载了layui 的 table 模块，就会自动对其建立动态的数据表格。下面是一个示例：
     * 
     * codelayui.code
     * <table class="layui-table" lay-data="{height:315, url:'/demo/table/user/', page:true, id:'test'}" lay-filter="test">
     *   <thead>
     *     <tr>
     *       <th lay-data="{field:'id', width:80, sort: true}">ID</th>
     *       <th lay-data="{field:'username', width:80}">用户名</th>
     *       <th lay-data="{field:'sex', width:80, sort: true}">性别</th>
     *       <th lay-data="{field:'city'}">城市</th>
     *       <th lay-data="{field:'sign'}">签名</th>
     *       <th lay-data="{field:'experience', sort: true}">积分</th>
     *       <th lay-data="{field:'score', sort: true}">评分</th>
     *       <th lay-data="{field:'classify'}">职业</th>
     *       <th lay-data="{field:'wealth', sort: true}">财富</th>
     *     </tr>
     *   </thead>
     * </table>
     * @example
     * 转换静态表格
     * 假设你的页面已经存在了一段有内容的表格，它由原始的table标签组成，这时你需要赋予它一些动态元素，比如拖拽调整列宽？比如排序等等？那么你同样可以很轻松地去实现。如下所示：
     * 昵称	积分	签名
     * 贤心1	66	人生就像是一场修行a
     * 贤心2	88	人生就像是一场修行b
     * 贤心3	33	人生就像是一场修行c
     * 通过上面的小例子，你已经初步见识了这一功能的实际意义。尝试在你的静态表格的 th 标签中加上 lay-data="" 属性，代码如下：
     * 
     * HTMLlayui.code
     * <table lay-filter="demo">
     *   <thead>
     *     <tr>
     *       <th lay-data="{field:'username', width:100}">昵称</th>
     *       <th lay-data="{field:'experience', width:80, sort:true}">积分</th>
     *       <th lay-data="{field:'sign'}">签名</th>
     *     </tr> 
     *   </thead>
     *   <tbody>
     *     <tr>
     *       <td>贤心1</td>
     *       <td>66</td>
     *       <td>人生就像是一场修行a</td>
     *     </tr>
     *     <tr>
     *       <td>贤心2</td>
     *       <td>88</td>
     *       <td>人生就像是一场修行b</td>
     *     </tr>
     *     <tr>
     *       <td>贤心3</td>
     *       <td>33</td>
     *       <td>人生就像是一场修行c</td>
     *     </tr>
     *   </tbody>
     * </table>
     *     
     * 然后执行用于转换表格的JS方法，就可以达到目的了：
     * 
     * JavaScriptlayui.code
     * var table = layui.table;
     *  
     * //转换静态表格
     * table.init('demo', {
     *   height: 315 //设置高度
     *   ,limit: 10 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
     *   //支持所有基础参数
     * }); 
     *     
     * 在前面的“方法渲染”和“自动渲染”两种方式中，你的数据都来源于异步的接口，这可能并不利于所谓的seo（当然是针对于前台页面）。而在这里，你的数据已和页面同步输出，却仍然可以转换成动态表格
     */
    interface LayTable {
        render(): void;
        reload(options: TableOption): void;
        //遍历表头
        eachCols(callback: (i: Number, item: any) => void): void;
        //请求Loading
        loading(): void;
    }

    interface TreeOption {
        elem: string;       //指定元素的选择器
        skin?: string;	    //风格定义
        /**
         * 点击节点的回调
         * 很多时候我们并不只是单纯地展现一个树形菜单，而是要进行目标选择后的结果渲染。譬如选择节点A，我们希望看到节点A的结果。如果你对该节点设置了href属性，则直接跳转即可。但很多时候我们还可能需要获取节点的其它参数来渲染出选择节点后的结果，这就需要我们的click回调。
         * @example
         * 
         * 语法layui.code
         * layui.tree({
         *   elem: '#demo'
         *   ,nodes: [{ //节点数据
         *     name: '节点A'
         *     ,children: [{
         *       name: '节点A1'
         *     }]
         *   }, {
         *     name: '节点B'
         *     ,children: [{
         *       name: '节点B1'
         *       ,alias: 'bb' //可选
         *       ,id: '123' //可选
         *     }, {
         *       name: '节点B2'
         *     }]
         *   }] 
         *   ,click: function(node){
         *     console.log(node) //node即为当前点击的节点数据
         *   }  
         * });
         *  
         * //我们假设你点击的是上述的节点B1，那么click回调返回的参数如下
         * 点击节点得到的node值layui.code
         * {
         *   "name": "节点B1"
         *   ,"alias": "bb"
         *   ,"id": "123"
         * }
         *       
         */
        click?: (node) => void;   //点击节点的回调，详细介绍见下文
        href?: string;     //节点链接（可选），未设则不会跳转
        target?: string;    //节点打开方式（即a的target值），必须href设定后才有效
        /**
         * 参数nodes是整个树形菜单渲染的关键，其所接受的格式如下
         * @example
         * 参数	    类型	    描述
         * name	    string	    节点名称
         * spread	boolean	    是否展开状态（默认false）
         * href	    string	    节点链接（可选），未设则不会跳转
         * children	object	    同nodes节点，可无限延伸。如：
         * 
         * codelayui.code
         * children: [{
         *   name: '子节点'
         *   ,spread: true //展开
         *   ,children: [{
         *     name: '子子节点'
         *     ,children: [……]
         *   }]
         * }, {……}]       
         *             
         * 自定义参数	-	除了上述必要键外，你还可以给每条节点传入自定义参数，如：alias、id等。那么在触发click回调时，就会把节点所拥有的参数都返回给你。
         * 这是nodes节点一个较为完整的例子
         * 
         * 节点数据格式layui.code
         * [ //节点
         *   {
         *     name: '常用文件夹'
         *     ,id: 1
         *     ,alias: 'changyong'
         *     ,children: [
         *       {
         *         name: '所有未读'
         *         ,id: 11
         *         ,href: 'http://www.layui.com/'
         *         ,alias: 'weidu'
         *       }, {
         *         name: '置顶邮件'
         *         ,id: 12
         *       }, {
         *         name: '标签邮件'
         *         ,id: 13
         *       }
         *     ]
         *   }, {
         *     name: '我的邮箱'
         *     ,id: 2
         *     ,spread: true
         *     ,children: [
         *       {
         *         name: 'QQ邮箱'
         *         ,id: 21
         *         ,spread: true
         *         ,children: [
         *           {
         *             name: '收件箱'
         *             ,id: 211
         *             ,children: [
         *               {
         *                 name: '所有未读'
         *                 ,id: 2111
         *               }, {
         *                 name: '置顶邮件'
         *                 ,id: 2112
         *               }, {
         *                 name: '标签邮件'
         *                 ,id: 2113
         *               }
         *             ]
         *           }, {
         *             name: '已发出的邮件'
         *             ,id: 212
         *           }, {
         *             name: '垃圾邮件'
         *             ,id: 213
         *           }
         *         ]
         *       }, {
         *         name: '阿里云邮'
         *         ,id: 22
         *         ,children: [
         *           {
         *             name: '收件箱'
         *             ,id: 221
         *           }, {
         *             name: '已发出的邮件'
         *             ,id: 222
         *           }, {
         *             name: '垃圾邮件'
         *             ,id: 223
         *           }
         *         ]
         *       }
         *     ]
         *   }
         * ]      
         *       
         */
        nodes?: object;     //节点数据，详细格式见下表
    }

    /**
     * 假设你的页面任意位置有这样一个元素
     * <ul id="demo"></ul>
     * layui.tree({
     *   elem: '#demo' //传入元素选择器
     *   ,nodes: [{ //节点
     *     name: '父节点1'
     *     ,children: [{
     *       name: '子节点11'
     *     },{
     *       name: '子节点12'
     *     }]
     *   },{
     *     name: '父节点2（可以点左侧箭头，也可以双击标题）'
     *     ,children: [{
     *       name: '子节点21'
     *       ,children: [{
     *     name: '子节点211'
     *       }]
     *     }]
     *   }]
     * });
     */
    interface LayTree {
    }

    interface ChooseObj {
        //预览
        preview: (callback: (index, file, result) => void) => void;
        //上传
        upload: (index, file) => void;
        //追加文件到队列
        pushFile: () => void;
        //重置文件
        resetFile: (index, file, filename) => void;
    }

    interface UploadOption {
        /**
         * 指向容器选择器，如：elem: '#id'。也可以是DOM对象	string/object
         */
        elem: string|object;
        /**
         * 服务端上传接口，返回的数据规范请详见下文
         * 设定一个 URL 地址给 url 参数，用来告诉 upload 模块的服务端上传接口。像你平时使用Ajax一样。如：
         * @example
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/' //必填项
         *   ,method: ''  //可选项。HTTP类型，默认post
         *   ,data: {} //可选项。额外的参数，如：{id: 123, abc: 'xxx'}
         * });      
         *       
         * 该接口返回的相应信息（response）必须是一个标准的 JSON 格式，如：
         * 
         * Responselayui.code
         * {
         *   "code": 0
         *   ,"msg": ""
         *   ,"data": {
         *     "src": "http://cdn.layui.com/123.jpg"
         *   }
         * }       
         *       
         * 注意1：你不一定非得按照上述格式返回，只要是合法的 JSON 字符即可。其响应信息会转化成JS对象传递给 done 回调。 
         * 注意2：如果上传后，出现文件下载框（一般为ie下），那么你需要在服务端对response的header设置 Content-Type: text/html
         */
        url?: string;
        /**
         * 上传接口的 HTTP 类型
         */
        method?: string;
        /**
         * 请求上传接口的额外参数。如：data: {id: 'xxx'}
         * 从 layui 2.2.6 开始，支持动态值，如:
         *  codelayui.code
         *  data: {
         *    id: function(){
         *         return $('#id').val();
         *    }
         *  } 
         */
        data?: object;
        /**
         * 接口的请求头。如：headers: {token: 'sasasas'}。注：该参数为 layui 2.2.6 开始新增
         */
        headers?: object;
        /**
         * 指定允许上传时校验的文件类型，可选值有：images（图片）、file（所有文件）、video（视频）、audio（音频）	默认为:images
         */
        accept?: string;
        /**
         * 规定打开文件选择框时，筛选出的文件类型，值为用逗号隔开的 MIME 类型列表。如： 
         * acceptMime: 'image/*'（只显示图片文件） 
         * acceptMime: 'image/jpg, image/png'（只显示 jpg 和 png 文件） 
         * 注：该参数为 layui 2.2.6 开始新增,默认为:images
         */
        acceptMime?: string;
        /**
         * 允许上传的文件后缀。一般结合 accept 参数类设定。假设 accept 为 file 类型时，那么你设置 exts: 'zip|rar|7z' 即代表只允许上传压缩格式的文件。如果 accept 未设定，那么限制的就是图片的文件格式,默认为: jpg|png|gif|bmp|jpeg
         */
        exts?: string;
        /**
         * 是否选完文件后自动上传。如果设定 false，那么需要设置 bindAction 参数来指向一个其它按钮提交上传,默认为: true
         */
        auto?: boolean;
        /**
         * 指向一个按钮触发上传，一般配合 auto: false 来使用。值为选择器或DOM对象，如：bindAction: '#btn'	string/object	-
         */
        bindAction?: string|object;
        /**
         * 设定文件域的字段名,默认为:file
         */
        field?: string;
        /**
         * 设置文件最大可允许上传的大小，单位 KB。不支持ie8/9, 默认为:0（即不限制）
         */
        size?: number;
        /**
         * 是否允许多文件上传。设置 true即可开启。不支持ie8/9, 默认为: false
         */
        multiple?: boolean;
        /**
         * 设置同时可上传的文件数量，一般配合 multiple 参数出现。
         * 注意：该参数为 layui 2.2.3 开始新增,默认为: 0（即不限制）
         */
        number?: number;
        /**
         * 是否接受拖拽的文件上传，设置 false 可禁用。不支持ie8/9,默认为: true
         */
        drag?: boolean;
        /**
         * 选择文件后的回调函数。返回一个object参数，详见下文
         * 在文件被选择后触发，该回调会在 before 回调之前。一般用于非自动上传（即 auto: false ）的场景，比如预览图片等。
         * @example
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/'
         *   ,auto: false //选择文件后不自动上传
         *   ,bindAction: '#testListAction' //指向一个按钮触发上传
         *   ,choose: function(obj){
         *     //将每次选择的文件追加到文件队列
         *     var files = obj.pushFile();
         *     
         *     //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
         *     obj.preview(function(index, file, result){
         *       console.log(index); //得到文件索引
         *       console.log(file); //得到文件对象
         *       console.log(result); //得到文件base64编码，比如图片
         *       
         *       //这里还可以做一些 append 文件列表 DOM 的操作
         *       
         *       //obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
         *       //delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
         *     });
         *   }
         * });      
         *       
         * 事实上这是一个非常实用的存在，可轻松应对复杂的列表文件上传管理。具体可移步到 示例 页面，里面有一个文件列表的小例子。
         */
        choose?: (obj: ChooseObj) => void;
        /**
         * 文件提交上传前的回调。返回一个object参数（同上），详见下文
         * 在 choose 回调之后、done/error 回调之前触发。返回的参数完全类似 choose 回调。一般用于上传完毕前的loading、图片预览等。
         * @example
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/'
         *   ,before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
         *     layer.load(); //上传loading
         *   }
         *   ,done: function(res, index, upload){
         *     layer.closeAll('loading'); //关闭loading
         *   }
         *   ,error: function(index, upload){
         *     layer.closeAll('loading'); //关闭loading
         *   }
         * });
         */
        before?: (obj: ChooseObj) => void;
        /**
         * 执行上传请求后的回调。返回三个参数，分别为：res（服务端响应信息）、index（当前文件的索引）、upload（重新上传的方法，一般在文件上传失败后使用）。详见下文
         * @example
         * 在上传接口请求完毕后触发，但文件不一定是上传成功的，只是接口的响应状态正常（200）。回调返回三个参数，分别为：服务端响应信息、当前文件的索引、重新上传的方法
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/'
         *   ,done: function(res, index, upload){
         *     //假设code=0代表上传成功
         *     if(res.code == 0){
         *       //do something （比如将res返回的图片链接保存到表单的隐藏域）
         *     }
         *     
         *     //获取当前触发上传的元素，一般用于 elem 绑定 class 的情况，注意：此乃 layui 2.1.0 新增
         *     var item = this.item;
         *     
         *     //文件保存失败
         *     //do something
         *   }
         * });
         */
        done?: (res, index, upload) => void;
        /**
         * 执行上传请求出现异常的回调（一般为网络异常、URL 404等）。返回两个参数，分别为：index（当前文件的索引）、upload（重新上传的方法）。详见下文
         * 当请求上传时出现异常时触发（如网络异常、404/500等）。回调返回三个参数，分别为：当前文件的索引、重新上传的方法
         * @example
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/'
         *   ,error: function(index, upload){
         *     //当上传失败时，你可以生成一个“重新上传”的按钮，点击该按钮时，执行 upload() 方法即可实现重新上传
         *   }
         * });      
         *       
         */
        error?: (index, upload) => void;

        /**
         * 只有当开启多文件时（即 multiple: true），该回调才会被触发。回调返回一个 object 类型的参数，包含一些状态数据：
         * @example
         * upload.render({
         *   elem: '#id'
         *   ,url: '/api/upload/'
         *   ,multiple: true
         *   ,allDone: function(obj){ //当文件全部被提交后，才触发
         *     console.log(obj.total); //得到总文件数
         *     console.log(obj.successful); //请求成功的文件数
         *     console.log(obj.aborted); //请求失败的文件数
         *   }
         *   ,done: function(res, index, upload){ //每个文件提交一次触发一次。详见“请求成功的回调”
         *   
         *   }
         * });
         */
        allDone?: (obj: { total: number, successful: number, aborted: number }) => void;
    }

    interface LayUpload {
        msg(content: string);       //异常提示
        isFile(): boolean;          //判断绑定元素是否为文件域本身
        preview(callback: (index: Number, file: any, result: any) => void)
        upload(files?: [], type?: string)
    }

    interface CarouselOption {
        width: string;      //'600px'
        height: string;     //'280px'
        full: false;        //是否全屏
        arrow: string       //切换箭头默认显示状态：hover/always/none
        indicator: string;  //指示器位置：inside/outside/none
        autoplay: boolean;  //是否自动切换
        interval: number;   //自动切换的时间间隔，不能低于800ms
        anim: string;       //动画类型：default/updown/fade
        trigger: string;    //指示器的触发方式：click/hover
        index: number;      //初始开始的索引
    }

    interface LayCarousel {
        render(): void;         //轮播渲染
        reload(options: CarouselOption): void;    //重置轮播
        prevIndex(): number;    //获取上一个等待条目的索引
        nextIndex(): number;    //获取下一个等待条目的索引
        addIndex(num?: number): void;   //索引递增
        subIndex(num?: number): void;   //索引递减
        autoplay(): void;               //自动轮播
        arrow(): void;                  //箭头
        indicator(): void;              //指示器
        slide(type: string ,num: number): void;    //滑动切换
    }

    interface LayOptions {
        dir?: string;
        version?: boolean;    //一般用于更新模块缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
        debug?: boolean;     //用于开启调试模式，默认false，如果设为true，则JS模块的节点会保留在页面
        base?: string;       //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
        host?: string;       //静态资源host
    }

    /**
     * 使用特定模块
     * @param mods 
     * @param callback 
     */
    export function use(mods: string | string[], callback: (...args: any[]) => any): any;
    /**
     * 定义模块
     * @param deps 
     * @param factory 
     */
    export function define(deps: string | string[], factory: (exports: any) => void): any;
    /**
     * 获取节点的style属性值
     * @param node 
     * @param name 
     */
    export function getStyle(node: Element, name: string): string;

    /**
     * 重新执行模块的工厂函数
     * @param modName 
     */
    export function factory(modName: string)

    export function config(options: LayOptions): any;

    /**
     * 拓展模块
     * @param options 
     */
    export function extend(options: any): any;

    /**
     * 遍历
     * @param obj 
     * @param callback 
     * 返回 true 则停止遍历
     */
    export function each(obj: any, callback: (key, item) => boolean): any;

    interface dataRouter {
        path: string[];
        search: any;
        hash: string;
    }

    /**
     * 路由解析
     * @param hash 
     */
    export function router(hash: string): dataRouter;

    interface dataSetting {
        key: string;
        value: string;
        remove: boolean;
    }
    /**
     * 本地持久性存储
     * @param table 
     * @param settings  如果settings为null，则删除表
     * @param storage 
     */
    export function data(table?: string, settings?: dataSetting, storage?: Storage);

    /**
     * 本地会话性存储
     * @param table 
     * @param settings 
     */
    export function sessionData(table?: string, settings?: dataSetting);

    interface LayDevice {
        os: string;
        ie: string | boolean;
        weixin: string | boolean;
        android: boolean;
        ios: boolean;
    }
    /**
     * 设备信息
     * @param key 
     */
    export function device(key?: string): LayDevice;

    /**
     * 提示
     */
    export function hint();

    /**
     * 阻止事件冒泡
     * @param e 
     */
    export function stope(e);

    /**
     * 	自定义模块事件，属于比较高级的应用。有兴趣的同学可以阅读layui.js源码以及form模块
     * @param modName 
     * @param events 
     * @param callback 
     */
    export function onevent(modName: string, events: string, callback: Function);

    /**
     * 执行自定义模块事件，搭配onevent使用
     * @param modName 
     * @param events 
     * @param params 
     */
    export function event(modName: string, events: string, params?: any);

    //变量导出
    export let jquery : JQueryStatic;
    export let $ : JQueryStatic;

    export let layer: Layer;
    export let element: Element;    //element模块的实例 返回的element变量为该实例的对象，携带一些用于元素操作的基础方法
    export let form: Form;
    export let laydate: LayDate;
    export let laypage: LayPage;
    export let carousel: {
        on (events, callback) : any;
        set (options: CarouselOption) : any;
        render(options: CarouselOption): LayCarousel;
    };
    export let layedit: LayEdit;
    export let laytpl: (tpl: string) => LayTpl;
    export let flow: LayFlow;
    export let rate: {
        set (options: RateOption) : any;
        on (events, callback) : any;
        render(options?: RateOption): LayRate;
    }
    export let table: {
        set (options: TableOption) : any;
        /**
         * 事件监听
         * @example
         * 语法：table.on('event(filter)', callback); 注：event为内置事件名，filter为容器lay-filter设定的值 
         * table模块在Layui事件机制中注册了专属事件，如果你使用layui.onevent()自定义模块事件，请勿占用table名。目前所支持的所有事件见下文
         * 
         * 默认情况下，事件所监听的是全部的table模块容器，但如果你只想监听某一个容器，使用事件过滤器即可。 
         * 假设原始容器为：<table class="layui-table" lay-filter="test"></table> 那么你的事件监听写法如下：
         * 
         * codelayui.code
         * //以复选框事件为例
         * table.on('checkbox(test)', function(obj){
         *   console.log(obj)
         * });
         *       
         * 监听复选框选择
         * 点击复选框时触发，回调函数返回一个object参数，携带的成员如下：
         * 
         * codelayui.code
         * table.on('checkbox(test)', function(obj){
         *   console.log(obj.checked); //当前是否选中状态
         *   console.log(obj.data); //选中行的相关数据
         *   console.log(obj.type); //如果触发的是全选，则为：all，如果触发的是单选，则为：one
         * });
         *       
         * 监听单元格编辑
         * 单元格被编辑，且值发生改变时触发，回调函数返回一个object参数，携带的成员如下：
         * 
         * codelayui.code
         * table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
         *   console.log(obj.value); //得到修改后的值
         *   console.log(obj.field); //当前编辑的字段名
         *   console.log(obj.data); //所在行的所有相关数据  
         * });
         *       
         * 监听工具条点击
         * 具体用法见：绑定工具条
         * 
         * 监听排序切换
         * 点击表头排序时触发，回调函数返回一个object参数，携带的成员如下：
         * 
         * codelayui.code
         * table.on('sort(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
         *   console.log(obj.field); //当前排序的字段名
         *   console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
         *   console.log(this); //当前排序的 th 对象
         *   
         *   //尽管我们的 table 自带排序功能，但并没有请求服务端。
         *   //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
         *   table.reload('idTest', {
         *     initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
         *     ,where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
         *       field: obj.field //排序字段
         *       ,order: obj.type //排序方式
         *     }
         *   });
         * });
         */
        on (events, callback) : any
        
        init(filter: string, settings: TabOption): any;
        render(options: TableOption): LayTable;
        
        /**
         * 表格重载
         * 很多时候，你需要对表格进行重载。比如数据全局搜索。以下方法可以帮你轻松实现这类需求（可任选一种）。
         * 语法	说明	适用场景
         * table.reload(ID, options)	参数 ID 即为基础参数id对应的值，见：设定容器唯一ID 
         * 参数 options 即为各项基础参数 
         * 注意：该方法为 2.1.0 版本中新增	所有渲染方式
         * tableIns.reload(options)	对象 tableIns 来源于 table.render() 方法的实例 
         * 参数 options 即为各项基础参数	仅限方法级渲染
         * @example
         * 示例1：自动化渲染的重载layui.code
         * 【HTML】
         * <table class="layui-table" lay-data="{id: 'idTest'}"> …… </table>
         *  
         * 【JS】
         * table.reload('idTest', {
         *   url: '/api/table/search'
         *   ,where: {} //设定异步数据接口的额外参数
         *   //,height: 300
         * });
         * @example
         * 示例2：方法级渲染的重载layui.code
         * //所获得的 tableIns 即为当前容器的实例
         * var tableIns = table.render({
         *   elem: '#id'
         *   ,cols: [] //设置表头
         *   ,url: '/api/data' //设置异步接口
         *   ,id: 'idTest'
         * }); 
         *  
         * //这里以搜索为例
         * tableIns.reload({
         *   where: { //设定异步数据接口的额外参数，任意设
         *     aaaaaa: 'xxx'
         *     ,bbb: 'yyy'
         *     //…
         *   }
         *   ,page: {
         *     curr: 1 //重新从第 1 页开始
         *   }
         * });
         * //上述方法等价于
         * table.reload('idTest', {
         *   where: { //设定异步数据接口的额外参数，任意设
         *     aaaaaa: 'xxx'
         *     ,bbb: 'yyy'
         *     //…
         *   }
         *   ,page: {
         *     curr: 1 //重新从第 1 页开始
         *   }
         * });
         *       
         * 注意：这里的表格重载是指对表格重新进行渲染，包括数据请求和基础参数的读取
         */
        reload(id: string, options: TabOption);
        /**
         * 获取选中行
         * 获取表格选中行（下文会有详细介绍）。id即为id参数对应的值
         * 该方法可获取到表格所有的选中行相关数据 
         * 语法：table.checkStatus('idTest') idTest为基础参数id对应的值（见：设定容器唯一ID），如：
         * @example
         * 渲染方式layui.code
         * 【自动化渲染】
         * <table class="layui-table" lay-data="{id: 'idTest'}"> …… </table>
         *  
         * 【方法渲染】
         * table.render({ //其它参数省略
         *   id: 'idTest'
         * });
         *       
         * 调用layui.code
         * var checkStatus = table.checkStatus('idTest'); //test即为基础参数id对应的值
         *  
         * console.log(checkStatus.data) //获取选中行的数据
         * console.log(checkStatus.data.length) //获取选中行数量，可作为是否有选中行的条件
         * console.log(checkStatus.isAll ) //表格是否全选
         */
        checkStatus(id: string): { data: Array<any>, isAll: boolean };
    }

    export let tree: (options: TreeOption) => LayTree;

    export let upload: {
        set (options: UploadOption) : any;
        on (events, callback) : any;
        render(options?: UploadOption): LayUpload;
    };

}

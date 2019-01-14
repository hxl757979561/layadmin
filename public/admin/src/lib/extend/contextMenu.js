layui.define("jquery",function(t){"use strict";var n,e,i,o=layui.jquery;window,n=document,e=o,(i=function(t,n){this.init(t,n)}).prototype={init:function(t,n){this.ele=t,this.defaults={menu:[{text:"菜单一",callback:function(t){}},{text:"菜单二",callback:function(t){}}],target:function(t){},width:100,itemHeight:28,bgColor:"#fff",color:"#333",fontSize:14,hoverBgColor:"#f5f5f5",hoverColor:"#fff"},this.opts=e.extend(!0,{},this.defaults,n),this.random=(new Date).getTime()+parseInt(1e3*Math.random()),this.eventBind()},renderMenu:function(){var t=this,n="#uiContextMenu_"+this.random;if(!(e(n).length>0)){t=this;var i='<ul class="ul-context-menu" id="uiContextMenu_'+this.random+'">';e.each(this.opts.menu,function(t,n){n.icon?i+='<li class="ui-context-menu-item"><a href="javascript:void(0);"><i class="layui-icon">'+n.icon+'</i><span style="margin-left: 10px;">'+n.text+"</span></a></li>":i+='<li class="ui-context-menu-item"><a href="javascript:void(0);"><span>'+n.text+"</span></a></li>"}),i+="</ul>",e("body").append(i).find(".ul-context-menu").hide(),this.initStyle(n),e(n).on("click",".ui-context-menu-item",function(n){t.menuItemClick(e(this)),n.stopPropagation()})}},initStyle:function(t){var n=this.opts;e(t).css({width:n.width,backgroundColor:n.bgColor}).find(".ui-context-menu-item a").css({color:n.color,fontSize:n.fontSize,height:n.itemHeight,lineHeight:n.itemHeight+"px"}).hover(function(){e(this).css({backgroundColor:n.hoverBgColor,color:n.hoverColor})},function(){e(this).css({backgroundColor:n.bgColor,color:n.color})})},menuItemClick:function(t){var n=this,e=t.index();t.parent(".ul-context-menu").hide(),n.opts.menu[e].callback&&"function"==typeof n.opts.menu[e].callback&&n.opts.menu[e].callback(t)},setPosition:function(t){var n=this.opts,i=n.menu.length*n.itemHeight+12,c=n.width,u=o(window).width(),s=o(window).height(),l=t.clientX,a=t.clientY,r=t.clientX+2,h=t.clientY+2;u-l<c-2&&(r=u-c),s-a<i-2&&(h=s-i),e(".ul-context-menu").hide(),e("#uiContextMenu_"+this.random).css({left:r,top:h}).show()},eventBind:function(){var t=this;this.ele.on("contextmenu",function(n){n.preventDefault(),t.renderMenu(),t.setPosition(n),t.opts.target&&"function"==typeof t.opts.target&&t.opts.target(e(this))}),e(n).on("click",function(){e(".ul-context-menu").hide()})}},e.fn.contextMenu=function(t){return new i(this,t),this},t("contextMenu")});
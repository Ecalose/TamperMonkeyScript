// ==UserScript==
// @name         小红书优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2024.12.17
// @author       WhiteSevs
// @description  屏蔽登录弹窗、屏蔽广告、优化评论浏览、优化图片浏览、允许复制、禁止唤醒App、禁止唤醒弹窗、修复正确跳转等
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAx9JREFUWEfNl09MU0EQxn/beFTDDRI41FAMcNGbBw62oPEGid6UULxg1EhEEzExgdBEEzRqlKDxZCHgDZJ6U8TWAyaQGIsHMQLSA0S8VYQT2NXp9tnX0vKnpi2TNH1vd3bmm5lv9+0o0kQ73SXsc7QCx1EcjU9rnOl6O3pXRNAqCjqCIsB6LKQioYh9rbK/6MMnWojFHgElO3KwWyUBBD1q9q3fWvoPgHY1dIHu2a3N3PRVt5ob98naOABdVd+K5nluxnJc5dBe9TU4qHS128lvRzDnOufoH4iyETukihJ9EnSH0i5PAFRj7oH8z0r9UmlXw0fQZrsVWhQRKcFCEepvQo0DcNXrQgeechDtbQAVpbCyBiurqUmqqYSD+2FyOnPyZE50ln7A4vKWCc5egvIyCA3DzV4YeZ00UlEGQ/eN88670HsjOTczZ8bbvXCiDqbC8HkeBkahuhLE5sBICqDdAzh9yjh1n4OlZZgdTxqcDEPfIAw9SI1aMjg1DVrDpe5tAIRewOJ36LyXzIAgv+IFz1ljXN5FJAOjrwwIcd583YwfO2L0JHvW2qqGjKXYnAExJkYfDyYBaGWibmyDGhe0t/z9bikDSMQO4NZlEO5YJTggfHCBf8SUIo0TqQCEPB8C0Ddg6m5xQIj4xAcXu+DLPASHjY5/1BDUDkAyWF6amXjCkcYLW5Sg1gWBZ3C7H6Y+mWdJ48y35LiQ0HvGGLHzIFsJLAJLSSQzssYmmzMg0TVfM9vMqqMYkcwIejEiv59rhliy3URP2H6n3/zXJsbsO+ipz+huCUCQSb2E3eJQRNL+ZsIQS/a1ALQIKDtCxu0i4EUs8GPvk7YEXFPbNrvAmj5ZJ3dB49wSYbTlUIgqANJFzoFfq4aE8izBiC0h49iEmctagszUyevoHvgYFf1zXEwA6PBeuJLVXwUe5pVp2Yyr2HmVaMUW8tYNZXWuI6xrT6IxcbeiHYVtTCT62ZDf1pp5ekB1FaYU2qfmgvGLQWpzKi0adOfxlhxF0ZGxObUiT7RqbjRNoJ0oVZIzINMNy5Eehtg7NvCrSChqz/IfgUZkW/BhLsQAAAAASUVORK5CYII=
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://www.xiaohongshu.com/*
// @require      https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.5.5/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.4.8/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@1.9.5/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.2.8/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/viewerjs@1.11.7/dist/viewer.min.js
// @resource     ViewerCSS  https://fastly.jsdelivr.net/npm/viewerjs@1.11.7/dist/viewer.min.css
// @connect      edith.xiaohongshu.com
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (x, F, me, ie, fe) {
  'use strict';

  var re=typeof GM_deleteValue<"u"?GM_deleteValue:void 0,Y=typeof GM_getResourceText<"u"?GM_getResourceText:void 0,P=typeof GM_getValue<"u"?GM_getValue:void 0,U=typeof GM_info<"u"?GM_info:void 0,pe=typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0,O=typeof GM_setValue<"u"?GM_setValue:void 0,he=typeof GM_unregisterMenuCommand<"u"?GM_unregisterMenuCommand:void 0,ge=typeof GM_xmlhttpRequest<"u"?GM_xmlhttpRequest:void 0,_=typeof unsafeWindow<"u"?unsafeWindow:void 0,xe=window;const be={ElementPlus:{keyName:"ElementPlusResourceCSS",url:"https://fastly.jsdelivr.net/npm/element-plus@latest/dist/index.min.css"},Viewer:{keyName:"ViewerCSS",url:"https://fastly.jsdelivr.net/npm/viewerjs@latest/dist/viewer.min.css"},Hljs:{keyName:"HljsCSS",url:"https://fastly.jsdelivr.net/npm/highlight.js@latest/styles/github-dark.min.css"}},y={addBlockCSS(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(o=>{Array.isArray(o)?t=t.concat(o):t.push(o);}),v(`${t.join(`,
`)}{display: none !important;}`)},setGMResourceCSS(e){let t=typeof Y=="function"?Y(e.keyName):"";typeof t=="string"&&t?v(t):y.loadStyleLink(e.url);},async loadStyleLink(e){let t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=e,h.ready(()=>{document.head.appendChild(t);});},async loadScript(e){let t=document.createElement("script");return t.src=e,new Promise(o=>{t.onload=()=>{o(null);},(document.head||document.documentElement).appendChild(t);})},fixUrl(e){return e=e.trim(),e.match(/^http(s|):\/\//i)||(e.startsWith("/")||(e+="/"),e=window.location.origin+e),e},fixHttps(e){if(e.startsWith("https://")||!e.startsWith("http://"))return e;let t=new URL(e);return t.protocol="https:",t.toString()}},_e="小红书优化",f=F.noConflict(),h=me.noConflict(),ee=ie,we=fe,a=new f.Log(U,_.console||xe.console);var ne;const z=((ne=U==null?void 0:U.script)==null?void 0:ne.name)||_e,le=!1;a.config({debug:le,logMaxCount:1e3,autoClearConsole:!0,tag:!0});x.config(Object.defineProperties({html:!0,autoClose:!0,showClose:!1},{position:{get(){return m.getValue("qmsg-config-position","bottom")}},maxNums:{get(){return m.getValue("qmsg-config-maxnums",5)}},showReverse:{get(){return m.getValue("qmsg-config-showreverse",!0)}},zIndex:{get(){let e=F.getMaxZIndex(),t=ie.config.InstanceUtils.getPopsMaxZIndex().zIndex;return F.getMaxValue(e,t)+100}}}));const se=new f.GM_Menu({GM_getValue:P,GM_setValue:O,GM_registerMenuCommand:pe,GM_unregisterMenuCommand:he}),I=new f.Httpx(ge);I.interceptors.response.use(void 0,e=>(a.error("拦截器-请求错误",e),e.type==="onabort"?x.warning("请求取消"):e.type==="onerror"?x.error("请求异常"):e.type==="ontimeout"?x.error("请求超时"):x.error("其它错误"),e));I.config({logDetails:le});_.Object.defineProperty,_.Function.prototype.apply,_.Function.prototype.call,_.Element.prototype.appendChild,_.setTimeout;const v=f.addStyle.bind(f);document.querySelector.bind(document);const ve=document.querySelectorAll.bind(document),S="GM_Panel",ye="data-init",H="data-key",j="data-default-value",ke="data-init-more-value",k="data-storage-api",g=function(e,t,o,i,r,n){let s={text:e,type:"switch",description:r,attributes:{},props:{},getValue(){return !!this.props[k].get(t,o)},callback(l,u){let c=!!u;a.success(`${c?"开启":"关闭"} ${e}`),this.props[k].set(t,c);},afterAddToUListCallBack:n};return Reflect.set(s.attributes,H,t),Reflect.set(s.attributes,j,o),Reflect.set(s.props,k,{get(l,u){return m.getValue(l,u)},set(l,u){m.setValue(l,u);}}),s},Me={id:"little-red-book-panel-config-home",title:"主页",forms:[{text:"",type:"forms",forms:[{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("劫持点击事件","little-red-book-repariClick",!0,void 0,"可阻止点击跳转至下载页面")]}]}]}]},Se={id:"little-red-book-panel-config-note",title:"笔记",forms:[{text:"",type:"forms",forms:[{text:"视频笔记",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("优化视频描述","little-red-book-optimizeVideoNoteDesc",!0,void 0,"让视频描述可以滚动显示更多"),g("【屏蔽】作者热门笔记","little-red-book-shieldAuthorHotNote",!0,void 0,"建议开启"),g("【屏蔽】热门推荐","little-red-book-shieldHotRecommendNote",!0,void 0,"建议开启")]}]}]},{text:"",type:"forms",forms:[{text:"功能",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("优化评论浏览","little-red-book-optimizeCommentBrowsing",!0,void 0,"加载评论，未登录最多查看1页评论(注：楼中楼评论已失效，api无法获取楼中楼评论，需要请求头X-T、X-S、X-B3-Traceid)"),g("优化图片浏览","little-red-book-optimizeImageBrowsing",!0,void 0,"更方便的浏览图片"),g("允许复制","little-red-book-allowCopy",!0,void 0,"可以复制笔记的内容")]}]},{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("劫持webpack-弹窗","little-red-book-hijack-webpack-mask",!0,void 0,"如：打开App弹窗、登录弹窗"),g("劫持webpack-唤醒App","little-red-book-hijack-webpack-scheme",!0,void 0,"禁止跳转商店小红书详情页/小红书")]}]}]}]},G=function(e,t,o,i,r,n){let s=[];typeof i=="function"?s=i():s=i;let l={text:e,type:"select",description:n,attributes:{},props:{},getValue(){return this.props[k].get(t,o)},callback(u,c,d){let p=c;a.info(`选择：${d}`),this.props[k].set(t,p),typeof r=="function"&&r(u,p,d);},data:s};return Reflect.set(l.attributes,H,t),Reflect.set(l.attributes,j,o),Reflect.set(l.props,k,{get(u,c){return m.getValue(u,c)},set(u,c){m.setValue(u,c);}}),l},Ce={id:"xhs-panel-config-common",title:"通用",forms:[{text:"",type:"forms",forms:[{text:"功能",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("允许复制","pc-xhs-allowCopy",!0,void 0,"可以选择文字并复制"),g("新标签页打开文章","pc-xhs-open-blank-article",!1,void 0,"点击文章不会在本页展开，会打开新标签页")]}]},{text:"搜索",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("新标签页打开-搜索按钮","pc-xhs-search-open-blank-btn",!1,void 0,"点击右边的搜索按钮直接新标签页打开搜索内容"),g("新标签页打开-回车键","pc-xhs-search-open-blank-keyboard-enter",!1,void 0,"按下回车键直接新标签页打开搜索内容")]}]},{text:"屏蔽",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("【屏蔽】广告","pc-xhs-shieldAd",!0,void 0,"屏蔽元素"),g("【屏蔽】登录弹窗","pc-xhs-shield-login-dialog",!0,void 0,"屏蔽会自动弹出的登录弹窗"),g("【屏蔽】选择文字弹出的搜索提示","pc-xhs-shield-select-text-search-position",!1,void 0,"屏蔽元素"),g("【屏蔽】顶部工具栏","pc-xhs-shield-topToolbar",!1,void 0,"屏蔽元素")]}]},{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("劫持Vue","pc-xhs-hook-vue",!0,void 0,"恢复__vue__属性")]}]},{text:"Toast配置",type:"deepMenu",forms:[{text:"",type:"forms",forms:[G("Toast位置","qmsg-config-position","bottom",[{value:"topleft",text:"左上角"},{value:"top",text:"顶部"},{value:"topright",text:"右上角"},{value:"left",text:"左边"},{value:"center",text:"中间"},{value:"right",text:"右边"},{value:"bottomleft",text:"左下角"},{value:"bottom",text:"底部"},{value:"bottomright",text:"右下角"}],(e,t,o)=>{a.info("设置当前Qmsg弹出位置"+o);},"Toast显示在页面九宫格的位置"),G("最多显示的数量","qmsg-config-maxnums",3,[{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"}],void 0,"限制Toast显示的数量"),g("逆序弹出","qmsg-config-showreverse",!1,void 0,"修改Toast弹出的顺序")]}]}]}]},Te=function(e,t,o,i,r,n,s,l,u){let c={text:e,type:"slider",description:l,attributes:{},props:{},getValue(){return this.props[k].get(t,o)},getToolTipContent(d){return typeof s=="function"?s(d):`${d}`},callback(d,p){typeof n=="function"&&n(d,p)||this.props[k].set(t,p);},min:i,max:r,step:u};return Reflect.set(c.attributes,H,t),Reflect.set(c.attributes,j,o),Reflect.set(c.props,k,{get(d,p){return m.getValue(d,p)},set(d,p){m.setValue(d,p);}}),c},Ve={id:"xhs-panel-config-article",title:"笔记",forms:[{type:"forms",text:"功能",forms:[g("显示发布、修改的绝对时间","pc-xhs-article-showPubsliushTime",!1,void 0,"")]},{text:"笔记宽屏",type:"forms",forms:[g("启用","pc-xhs-article-fullWidth",!1,void 0,`让笔记占据宽屏，当页面可视宽度>=960px时才会触发该功能，当前页面可视宽度: ${window.innerWidth}px`),Te("占据范围","pc-xhs-article-fullWidth-widthSize",90,30,100,(e,t)=>{let o=document.querySelector("#noteContainer");if(!o){a.error("未找到笔记容器");return}o.style.width=`${t}vw`;},e=>`${e}%，默认：90%`,"调整笔记页面占据的页面范围")]}]},Ee={id:"little-red-book-panel-config-common",title:"通用",forms:[{text:"",type:"forms",forms:[{text:"Toast配置",type:"deepMenu",forms:[{text:"",type:"forms",forms:[G("Toast位置","qmsg-config-position","bottom",[{value:"topleft",text:"左上角"},{value:"top",text:"顶部"},{value:"topright",text:"右上角"},{value:"left",text:"左边"},{value:"center",text:"中间"},{value:"right",text:"右边"},{value:"bottomleft",text:"左下角"},{value:"bottom",text:"底部"},{value:"bottomright",text:"右下角"}],(e,t,o)=>{a.info("设置当前Qmsg弹出位置"+o);},"Toast显示在页面九宫格的位置"),G("最多显示的数量","qmsg-config-maxnums",3,[{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"}],void 0,"限制Toast显示的数量"),g("逆序弹出","qmsg-config-showreverse",!1,void 0,"修改Toast弹出的顺序")]}]}]},{text:"",type:"forms",forms:[{text:"屏蔽",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("【屏蔽】广告","little-red-book-shieldAd",!0,void 0,"如：App内打开"),g("【屏蔽】底部搜索发现","little-red-book-shieldBottomSearchFind",!0,void 0,"建议开启"),g("【屏蔽】底部工具栏","little-red-book-shieldBottomToorBar",!0,void 0,"建议开启")]}]},{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[g("劫持Vue","little-red-book-hijack-vue",!0,void 0,"恢复__vue__属性")]}]}]}]},N={setting:{get width(){return window.innerWidth<550?"88vw":"550px"},get height(){return window.innerHeight<450?"70vh":"450px"}},settingBig:{get width(){return window.innerWidth<800?"92vw":"800px"},get height(){return window.innerHeight<600?"80vh":"600px"}},info:{get width(){return "350px"},get height(){return "250px"}}},m={$data:{__data:null,__oneSuccessExecMenu:null,__onceExec:null,__listenData:null,get data(){return m.$data.__data==null&&(m.$data.__data=new f.Dictionary),m.$data.__data},get oneSuccessExecMenu(){return m.$data.__oneSuccessExecMenu==null&&(m.$data.__oneSuccessExecMenu=new f.Dictionary),m.$data.__oneSuccessExecMenu},get onceExec(){return m.$data.__onceExec==null&&(m.$data.__onceExec=new f.Dictionary),m.$data.__onceExec},get scriptName(){return z},key:S,attributeKeyName:H,attributeDefaultValueName:j},$listener:{get listenData(){return m.$data.__listenData==null&&(m.$data.__listenData=new f.Dictionary),m.$data.__listenData}},init(){this.initPanelDefaultValue(),this.initExtensionsMenu();},isTopWindow(){return _.top===_.self},initExtensionsMenu(){_.top===_.self&&se.add([{key:"show_pops_panel_setting",text:"⚙ 移动端-设置",autoReload:!1,isStoreValue:!1,showText(e){return e},callback:()=>{this.showPanel();}},{key:"show_pops_panel_setting",text:"⚙ PC-设置",autoReload:!1,isStoreValue:!1,showText(e){return e},callback:()=>{this.showPCPanel();}}]);},initPanelDefaultValue(){let e=this;function t(r){if(!r.attributes)return;let n={},s=r.attributes[H];s!=null&&(n[s]=r.attributes[j]);let l=r.attributes[ye];if(typeof l=="function"){let d=l();if(typeof d=="boolean"&&!d)return}let u=r.attributes[ke];u&&typeof u=="object"&&Object.assign(n,u);let c=Object.keys(n);if(!c.length){a.warn(["请先配置键",r]);return}c.forEach(d=>{let p=n[d];e.$data.data.has(d)&&a.warn("请检查该key(已存在): "+d),e.$data.data.set(d,p);});}function o(r){for(let n=0;n<r.length;n++){let s=r[n];t(s);let l=s.forms;l&&Array.isArray(l)&&o(l);}}let i=this.getPanelContentConfig().concat(this.getPCPanelContentConfig());for(let r=0;r<i.length;r++){let n=i[r];if(!n.forms)continue;let s=n.forms;s&&Array.isArray(s)&&o(s);}},setValue(e,t){let o=P(S,{}),i=o[e];o[e]=t,O(S,o),this.$listener.listenData.has(e)&&this.$listener.listenData.get(e).callback(e,i,t);},getValue(e,t){let i=P(S,{})[e];return i??(this.$data.data.has(e)?this.$data.data.get(e):t)},deleteValue(e){let t=P(S,{}),o=t[e];Reflect.deleteProperty(t,e),O(S,t),this.$listener.listenData.has(e)&&this.$listener.listenData.get(e).callback(e,o,void 0);},addValueChangeListener(e,t){let o=Math.random();return this.$listener.listenData.set(e,{id:o,key:e,callback:t}),o},removeValueChangeListener(e){let t=null;for(const[o,i]of this.$listener.listenData.entries())if(i.id===e){t=o;break}typeof t=="string"?this.$listener.listenData.delete(t):console.warn("没有找到对应的监听器");},triggerMenuValueChange(e,t,o){if(this.$listener.listenData.has(e)){let i=this.$listener.listenData.get(e);if(typeof i.callback=="function"){let r=this.getValue(e),n=r,s=r;typeof t<"u"&&arguments.length>1&&(n=t),typeof o<"u"&&arguments.length>2&&(s=o),i.callback(e,s,n);}}},hasKey(e){let t=P(S,{});return e in t},execMenu(e,t,o=!1){if(!(typeof e=="string"||typeof e=="object"&&Array.isArray(e)))throw new TypeError("key 必须是字符串或者字符串数组");let i=[];typeof e=="object"&&Array.isArray(e)?i=[...e]:i.push(e);let r;for(let n=0;n<i.length;n++){const s=i[n];if(!this.$data.data.has(s)){a.warn(`${e} 键不存在`);return}let l=m.getValue(s);if(o&&(l=!l),!l)break;r=l;}r&&t(r);},execMenuOnce(e,t,o,i){if(typeof e!="string")throw new TypeError("key 必须是字符串");if(!this.$data.data.has(e)){a.warn(`${e} 键不存在`);return}if(this.$data.oneSuccessExecMenu.has(e))return;this.$data.oneSuccessExecMenu.set(e,1);let r=()=>{let c=m.getValue(e);return typeof o=="function"?o(e,c):c},n=[],s=c=>{let d=r(),p=[];if(c instanceof HTMLStyleElement?p=[c]:Array.isArray(c)&&(p=[...c.filter(b=>b!=null&&b instanceof HTMLStyleElement)]),d)n=n.concat(p);else for(let b=0;b<p.length;b++)p[b].remove(),p.splice(b,1),b--;},l=c=>{let d=[];if(c){let p=t(c,s);p instanceof HTMLStyleElement?d=[p]:Array.isArray(p)&&(d=[...p.filter(b=>b!=null&&b instanceof HTMLStyleElement)]);}for(let p=0;p<n.length;p++)n[p].remove(),n.splice(p,1),p--;n=[...d];};this.addValueChangeListener(e,(c,d,p)=>{let b=p;typeof i=="function"&&(b=i(c,p,d)),l(b);});let u=r();u&&l(u);},execInheritMenuOnce(e,t,o,i){let r=this;const n=(s,l)=>{let u=r.getValue(s),c=r.getValue(l);if(typeof i=="function"){let d=i(u,c);if(d!==void 0)return d}return u};this.execMenuOnce(e,o,()=>n(e,t),()=>n(e,t)),this.execMenuOnce(t,()=>{},()=>!1,()=>(this.triggerMenuValueChange(e),!1));},onceExec(e,t){if(typeof e!="string")throw new TypeError("key 必须是字符串");this.$data.onceExec.has(e)||(t(),this.$data.onceExec.set(e,1));},showPanel(){ee.panel({title:{text:`${z}-移动端设置`,position:"center",html:!1,style:""},content:this.getPanelContentConfig(),mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1}},width:N.setting.width,height:N.setting.height,drag:!0,only:!0});},showPCPanel(){ee.panel({title:{text:`${z}-设置`,position:"center",html:!1,style:""},content:this.getPCPanelContentConfig(),mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1}},width:N.setting.width,height:N.setting.height,drag:!0,only:!0});},getPanelContentConfig(){return [Ee,Me,Se]},getPCPanelContentConfig(){return [Ce,Ve]}},K={webpackChunkranchi(){let e;Object.defineProperty(_,"webpackChunkranchi",{get(){return e},set(o){e=o;const i=e.push;e.push=function(...r){return r[0][0],typeof r[0][1]=="object"&&Object.keys(r[0][1]).forEach((n,s)=>{if(typeof r[0][1][n]=="function"&&r[0][1][n].toString().includes("是否打开小红书App?")&&m.getValue("little-red-book-hijack-webpack-mask"))a.success(["成功劫持各种弹窗/遮罩层："+n]),r[0][1][n]=function(){};else if(typeof r[0][1][n]=="function"&&r[0][1][n].toString().startsWith("function(e,n,t){t.d(n,{Z:function(){return y}});")&&r[0][1][n].toString().includes("jumpToApp")&&m.getValue("little-red-book-hijack-webpack-scheme")){let l=r[0][1][n];r[0][1][n]=function(...u){a.success(["成功劫持scheme唤醒",u]);let c=u[2].d;u[2].d=function(...d){var p;if(d.length===2&&typeof((p=d[1])==null?void 0:p.Z)=="function"){let b=d[1].Z;b.toString()==="function(){return y}"&&(d[1].Z=function(...T){let V=b.call(this,...T);return typeof V=="function"&&V.toString().includes("jumpToApp")?function(){return {jumpToApp(E){var w;if(a.success(["拦截唤醒",E]),(w=E.deeplink)!=null&&w.startsWith("xhsdiscover://user/")){let M=`https://www.xiaohongshu.com/user/profile/${E.deeplink.replace(/^xhsdiscover:\/\/user\//,"")}`;window.open(M,"_blank");}}}}:V});}c.call(this,...d);},l.call(this,...u);};}}),i.call(this,...r)};}});},webPackVue(){let e=_.Function.prototype.apply,t=!1;_.Function.prototype.apply=function(...o){var r,n,s,l,u,c;const i=e.call(this,...o);if(!t&&o.length===2&&((r=o[0])!=null&&r.addRoute)&&((n=o[0])!=null&&n.currentRoute)&&((s=o[0])!=null&&s.getRoutes)&&((l=o[0])!=null&&l.hasRoute)&&((u=o[0])!=null&&u.install)&&((c=o[0])!=null&&c.removeRoute)){t=!0;let d=o[1][0];a.success(["成功劫持vue，version版本：",d.version]),d.mixin({mounted:function(){this.$el.__Ivue__=this;}});}return i};}},$e=`/* 用户主页 */\r
/* 底部的-App内打开 */\r
.launch-app-container.bottom-bar,\r
/* 顶部的-打开看看 */\r
.main-container > .scroll-view-container > .launch-app-container:first-child,\r
/* 底部的-打开小红书看更多精彩内容 */\r
.bottom-launch-app-tip.show-bottom-bar {\r
  display: none !important;\r
}\r
`,X={isArticle(){return globalThis.location.pathname.startsWith("/discovery/item/")||globalThis.location.pathname.startsWith("/explore/")},isUserHome(){return globalThis.location.pathname.startsWith("/user/profile/")},isHome(){return globalThis.location.href==="https://www.xiaohongshu.com/"||globalThis.location.href==="https://www.xiaohongshu.com"},isSearch(){return globalThis.location.pathname.startsWith("/search_result/")}},te="https://edith.xiaohongshu.com",q={async getPageInfo(e,t="",o="",i="jpg,webp"){const r="/api/sns/web/v2/comment/page",n={note_id:e,cursor:t,top_comment_id:o,image_formats:i},s=r+"?"+f.toSearchParamsStr(n);let l=await I.get(`${te}${s}`,{headers:{Accept:"application/json, text/plain, */*","User-Agent":f.getRandomPCUA(),Origin:"https://www.xiaohongshu.com",Referer:"https://www.xiaohongshu.com/"}});if(!l.status)return;let u=f.toJSON(l.data.responseText);if(a.info(["获取页信息",u]),u.code===0||u.success)return u.data;if(u.code===-101)return;x.error(u.msg);},async getLzlPageInfo(e="",t="",o=10,i="",r="jpg,webp,avif",n=""){const s="/api/sns/web/v2/comment/sub/page";let l={note_id:e,root_comment_id:t,num:o,cursor:i,image_formats:r,top_comment_id:n};s+""+f.toSearchParamsStr(l);let u=`${te}${s}?${f.toSearchParamsStr(l)}`,c=await I.get(u,{headers:{Accept:"application/json, text/plain, */*","User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",Host:"edith.xiaohongshu.com",Origin:"https://www.xiaohongshu.com",Referer:"https://www.xiaohongshu.com/"},onerror(){}});if(!c.status){c.data.status===406&&f.isNotNull(c.data.responseText)?f.toJSON(c.data.responseText).code==-1?x.error("获取楼中楼信息失败，验证x-s、x-t、x-s-common失败"):x.error("获取楼中楼信息失败"):x.error("请求异常"),a.error(["获取楼中楼信息失败",c]);return}let d=f.toJSON(c.data.responseText);if(a.info(["获取楼中楼页信息",d]),d.code===0||d.success)return d.data;x.error(d.msg);},async getSearchRecommend(e){let t=await I.get(`https://edith.xiaohongshu.com/api/sns/web/v1/search/recommend?keyword=${e}`,{fetch:!0});if(!t.status)return;let o=f.toJSON(t.data.responseText);if(o.success||o.code===1e3)return o.data.sug_items}},B={allowCopy(){return a.info("允许复制"),v(`
        *{
            -webkit-user-select: unset;
            user-select: unset;
        }
        `)},blockBottomSearchFind(){return a.info("屏蔽底部搜索发现"),y.addBlockCSS(".hotlist-container",".safe-area-bottom.margin-placeholder")},blockBottomToorBar(){return a.info("屏蔽底部工具栏"),y.addBlockCSS(".engage-bar-container")},blockAuthorHotNote(){return a.info("屏蔽视频笔记的作者热门笔记"),y.addBlockCSS(".user-notes-box.user-notes-clo-layout-container")},blockHotRecommendNote(){return a.info("屏蔽视频笔记的热门推荐"),y.addBlockCSS("#new-note-view-container .recommend-box")}},Ae={optimizeVideoNoteDesc(){return a.info("优化视频笔记的描述（可滚动）"),v(`
    .author-box .author-desc-wrapper .author-desc{
      max-height: 70px !important;
      overflow: auto !important;
    }
    /* 展开按钮 */
    .author-box .author-desc-wrapper .author-desc .author-desc-trigger{
      display: none !important;
    }`)}},Pe=`/* 底部的App内打开 */\r
.bottom-button-box,\r
/* 顶部的打开看看 */\r
.nav-bar-box {\r
  display: none !important;\r
}\r
`,Q={init(){v(Pe),(m.getValue("little-red-book-hijack-webpack-mask")||m.getValue("little-red-book-hijack-webpack-scheme"))&&(a.info("劫持webpack"),K.webpackChunkranchi()),m.execMenuOnce("little-red-book-shieldBottomSearchFind",()=>B.blockBottomSearchFind()),m.execMenuOnce("little-red-book-shieldBottomToorBar",()=>B.blockBottomToorBar()),m.execMenuOnce("little-red-book-optimizeImageBrowsing",()=>{Q.optimizeImageBrowsing();}),m.execMenuOnce("little-red-book-optimizeVideoNoteDesc",()=>Ae.optimizeVideoNoteDesc()),m.execMenuOnce("little-red-book-shieldAuthorHotNote",()=>B.blockAuthorHotNote()),m.execMenuOnce("little-red-book-shieldHotRecommendNote",()=>B.blockHotRecommendNote()),h.ready(function(){m.execMenu("little-red-book-optimizeCommentBrowsing",()=>{Q.optimizeCommentBrowsing();});});},optimizeCommentBrowsing(){a.info("优化评论浏览");const e={QmsgLoading:void 0,scrollFunc:void 0,noteData:{},commentData:{},emojiMap:{},emojiNameList:[],currentCursor:void 0,commentContainer:void 0,init(){var t;this.emojiMap=((t=f.toJSON(_.localStorage.getItem("redmoji")))==null?void 0:t.redmojiMap)||{},this.emojiNameList=Object.keys(this.emojiMap),this.scrollFunc=new f.LockFunction(this.scrollEvent,this),e.noteData=_.__INITIAL_STATE__.noteData.data.noteData,e.commentData=_.__INITIAL_STATE__.noteData.data.commentData,a.info(["笔记数据",e.noteData]),a.info(["评论数据",e.commentData]);},getCommentHTML(t){return `
				<div class="little-red-book-comments-avatar">
						<a target="_blank" href="/user/profile/${t.user_id}">
							<img src="${t.user_avatar}" crossorigin="anonymous">
						</a>
				</div>
				<div class="little-red-book-comments-content-wrapper">
					<div class="little-red-book-comments-author-wrapper">
						<div class="little-red-book-comments-author">
							<a href="/user/profile/${t.user_id}" class="little-red-book-comments-author-name" target="_blank">
								${t.user_nickname}
							</a>
						</div>
						<div class="little-red-book-comments-content">
							${t.content}
						</div>
						<div class="little-red-book-comments-info">
							<div class="little-red-book-comments-info-date">
								<span class="little-red-book-comments-create-time">${f.formatTime(t.create_time)}</span>
								<span class="little-red-book-comments-location">${t.ip_location}</span>
							</div>
						</div>
					</div>
				</div>
            `},getCommentElement(t){var V,E;let o=t.content,i=t.create_time||parseInt(t.time),r=t.id,n=t.ip_location||t.ipLocation,s=t.sub_comment_has_more,l=parseInt(t.sub_comment_count)||0,u=t.sub_comment_cursor,c=t.sub_comments||t.subComments,d=(t.user_info||t.user).image,p=(t.user_info||t.user).nickname,b=((V=t==null?void 0:t.user_info)==null?void 0:V.user_id)||((E=t==null?void 0:t.user)==null?void 0:E.userId);o=e.converContent(o);let T=h.createElement("div",{className:"little-red-book-comments-item",innerHTML:`
					<div class="little-red-book-comments-parent">
					${e.getCommentHTML({user_id:b,user_avatar:d,user_nickname:p,content:o,create_time:i,ip_location:n})}
					</div>
					`});if(s&&Array.isArray(c)&&(c.forEach(w=>{let L=h.createElement("div",{className:"little-red-book-comments-reply-container",innerHTML:e.getCommentHTML({user_id:w.user_info.user_id,user_avatar:w.user_info.image,user_nickname:w.user_info.nickname,content:e.converContent(w.content),create_time:w.create_time,ip_location:w.ip_location})});T.appendChild(L);}),l!==c.length)){let w=l-c.length,L=u,M=h.createElement("div",{className:"little-red-book-comments-reply-show-more",innerText:`展开 ${w} 条回复`});async function J(){let ue=x.loading("加载中，请稍后..."),R=await q.getLzlPageInfo(e.noteData.id,r,10,L,void 0);ue.close(),R&&(L=R.cursor,w=w-R.comments.length,M.innerText=`展开 ${w} 条回复`,R.comments.forEach($=>{let de=h.createElement("div",{className:"little-red-book-comments-reply-container",innerHTML:e.getCommentHTML({user_id:$.user_info.user_id,user_avatar:$.user_info.image,user_nickname:$.user_info.nickname,content:e.converContent($.content),create_time:$.create_time,ip_location:$.ip_location})});h.before(M,de);}),R.has_more||(h.off(M,"click",void 0,J,{capture:!0}),M.remove()));}h.on(M,"click",void 0,J,{capture:!0}),T.appendChild(M);}return T},converContent(t){return e.emojiNameList.forEach(o=>{t.includes(o)&&(t=t.replaceAll(o,`<img class="little-red-book-note-content-emoji" crossorigin="anonymous" src="${e.emojiMap[o]}">`));}),t},async scrollEvent(){if(!f.isNearBottom(window.innerHeight/3))return;this.QmsgLoading==null&&(this.QmsgLoading=x.loading("加载中，请稍后..."));let t=await q.getPageInfo(e.noteData.id,e.currentCursor);if(this.QmsgLoading&&(this.QmsgLoading.close(),this.QmsgLoading=void 0),!!t&&(e.currentCursor=t.cursor,t.comments.forEach(o=>{let i=e.getCommentElement(o);e.commentContainer.appendChild(i);}),!t.has_more)){x.info("已加载全部评论"),e.removeScrollEventListener();return}},addSrollEventListener(){a.success("添加滚动监听事件"),h.on(document,"scroll",void 0,e.scrollFunc.run,{capture:!0,once:!1,passive:!0});},removeScrollEventListener(){a.success("移除滚动监听事件"),h.off(document,"scroll",void 0,e.scrollFunc.run,{capture:!0});}};f.waitNode(".narmal-note-container").then(async()=>{a.info("优化评论浏览-笔记元素出现");let t=document.querySelector(".note-view-container"),o=x.loading("获取评论中，请稍后..."),i=h.createElement("div",{className:"little-red-book-comments-container",innerHTML:`
                <style>
                    .little-red-book-comments-parent {
                        position: relative;
                        display: flex;
                        padding: 8px;
                        width: 100%;
                    }
                    
                    .little-red-book-comments-reply-container {
                        position: relative;
                        display: flex;
                        padding: 8px;
                        width: 100%;
                        padding-left: 52px;
                    }
                    .little-red-book-comments-container {
                        background: #fff;
                        position: relative;
                        padding: 8px 8px;
                    }
                    
                    .little-red-book-comments-item {
                        position: relative;
                    }
                    
                    .little-red-book-comments-avatar {
                        flex: 0 0 auto;
                    }
                    
                    .little-red-book-comments-avatar img {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        border-radius: 100%;
                        border: 1px solid rgba(0,0,0,0.08);
                        object-fit: cover;
                        width: 40px;
                        height: 40px;
                    }
                    .little-red-book-comments-content-wrapper {
                        margin-left: 12px;
                        display: flex;
                        flex-direction: column;
                        font-size: 14px;
                        flex-grow: 1;
                    }
                    
                    .little-red-book-comments-author {display: flex;justify-content: space-between;align-items: center;}
                    
                    a.little-red-book-comments-author-name {
                        line-height: 18px;
                        color: rgba(51,51,51,0.6);
                    }
                    
                    .little-red-book-comments-content {
                        margin-top: 4px;
                        line-height: 140%;
                        color: #333;
                    }
                    
                    .little-red-book-comments-info {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        font-size: 12px;
                        line-height: 16px;
                        color: rgba(51,51,51,0.6);
                    }
                    
                    .little-red-book-comments-info-date {
                        margin: 8px 0;
                    }
                    
                    span.little-red-book-comments-location {
                        margin-left: 4px;
                        line-height: 120%;
                    }
                    img.little-red-book-note-content-emoji {
                        margin: 0 1px;
                        height: 16px;
                        transform: translateY(2px);
                        position: relative;
                    }
                    .little-red-book-comments-reply-container .little-red-book-comments-avatar img {
                        width: 24px;
                        height: 24px;
                    }
                    .little-red-book-comments-total{
                        font-size: 14px;
                        color: rgba(51,51,51,0.6);
                        margin-left: 8px;
                        margin-bottom: 12px;
                    }
                    .little-red-book-comments-reply-show-more {
                    padding-left: calc(52px + 24px + 12px);
                    height: 32px;
                    line-height: 32px;
                    color: #13386c;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 14px;
                    }
                </style>
          `});e.commentContainer=i,e.init();let r=h.createElement("div",{className:"little-red-book-comments-total",innerHTML:`共 ${e.noteData.comments} 条评论`});i.appendChild(r);let n=await q.getPageInfo(e.noteData.id);await f.sleep(800),n?(e.currentCursor=n.cursor,n.comments.forEach(s=>{let l=e.getCommentElement(s);i.appendChild(l);}),n.has_more&&e.addSrollEventListener()):e.commentData&&e.commentData.comments&&(a.info("从固定的评论中加载"),e.commentData.comments.forEach(s=>{let l=e.getCommentElement(s);i.appendChild(l);})),o.close(),h.append(t,i);});},optimizeImageBrowsing(){a.info("优化图片浏览"),y.setGMResourceCSS(be.Viewer);function e(t=[],o=0){let i="";t.forEach(s=>{i+=`<li><img data-src="${s}" loading="lazy"></li>`;});let r=h.createElement("ul",{innerHTML:i}),n=new we(r,{inline:!1,url:"data-src",zIndex:f.getMaxZIndex()+100,hidden:()=>{n.destroy();}});o=o<0?0:o,n.view(o),n.zoomTo(1),n.show();}h.on(document,"click",".note-image-box",function(t){let o=t.target,i=o.querySelector("img"),r=[],n=[];o.closest(".onix-carousel-item")?n=Array.from(o.closest(".onix-carousel-item").parentElement.querySelectorAll("img")):n=[i];let s=n.findIndex(l=>l==i);n.forEach(l=>{let u=l.getAttribute("src")||l.getAttribute("data-src")||l.getAttribute("alt");u&&r.push(u);}),a.success(["点击浏览图片👉",r[s]]),e(r,s);});}},ae={init(){h.ready(()=>{m.execMenuOnce("little-red-book-repariClick",()=>{ae.repariClick();});});},repariClick(){a.info("修复正确的点击跳转"),h.on(document,"click",void 0,function(e){var o,i,r,n,s;let t=e.target;if(a.info(["点击的按钮元素",t]),(o=t==null?void 0:t.className)!=null&&o.includes("follow-btn"))a.success("点击-关注按钮");else if(t!=null&&t.closest("button.reds-button.message-btn"))a.success("点击-私信按钮");else if(t!=null&&t.closest("div.reds-tab-item"))a.success("点击-笔记/收藏按钮");else if(t!=null&&t.closest("section.reds-note-card")){a.success("点击-笔记卡片");let l=t==null?void 0:t.closest("section.reds-note-card");l.getAttribute("id")||((n=(r=(i=f.toJSON(l.getAttribute("impression")))==null?void 0:i.noteTarget)==null?void 0:r.value)==null?void 0:n.noteId)?window.open(`https://www.xiaohongshu.com/discovery/item/${(s=t==null?void 0:t.closest("section.reds-note-card"))==null?void 0:s.getAttribute("id")}`,"_blank"):x.error("获取笔记note_id失败");}return f.preventEvent(e),!1},{capture:!0});}},Z={init(){m.execMenu("little-red-book-hijack-vue",()=>{a.info("劫持页面的Vue"),K.webPackVue();}),m.execMenuOnce("little-red-book-shieldAd",()=>(a.info("注入默认屏蔽CSS"),v($e))),m.execMenuOnce("little-red-book-allowCopy",()=>Z.allowCopy()),X.isArticle()?Q.init():X.isUserHome()&&ae.init();},allowCopy(){return a.info("允许复制文字"),v(`
        *{
            -webkit-user-select: unset;
            user-select: unset;
        }
        `)}},Le="",Re={init(){m.execMenuOnce("pc-xhs-shieldAd",()=>v(Le)),m.execMenuOnce("pc-xhs-shield-select-text-search-position",()=>this.blockSelectTextVisibleSearchPosition()),m.execMenuOnce("pc-xhs-shield-topToolbar",()=>this.blockTopToolbar()),h.ready(()=>{m.execMenuOnce("pc-xhs-shield-login-dialog",()=>{this.blockLoginContainer();});});},blockLoginContainer(){a.info("添加屏蔽登录弹窗CSS，监听登录弹窗出现"),y.addBlockCSS(".login-container"),f.mutationObserver(document.body,{config:{subtree:!0,childList:!0},callback:()=>{let e=document.querySelector(".login-container .icon-btn-wrapper");e&&(e.click(),a.success("登录弹窗出现，关闭"));}});},blockSelectTextVisibleSearchPosition(){return a.info("屏蔽选择文字弹出的搜索提示"),y.addBlockCSS(".search-position")},blockTopToolbar(){return a.info("【屏蔽】顶部工具栏"),[y.addBlockCSS("#headerContainer"),v(`
			/* 主内容去除padding */
			#mfContainer{
				padding-top: 0 !important;
			}
			.outer-link-container{
				margin-top: 0 !important;
				height: 100vh !important;
				padding: 30px 0;
			}
			#noteContainer{
				height: 100%;
			}
			`)]}},Ie={getSearchUrl(e){return `https://www.xiaohongshu.com/search_result?keyword=${e}&source=web_explore_feed`}},A={getVue(e){if(e!=null)return e.__vue__||e.__Ivue__||e.__IVue__},getVue3(e){if(e!=null)return e.__vueParentComponent},waitVuePropToSet(e,t){if(!Array.isArray(t)){A.waitVuePropToSet(e,[t]);return}function o(){let i=null;return typeof e=="string"?i=document.querySelector(e):typeof e=="function"?i=e():e instanceof HTMLElement&&(i=e),i}t.forEach(i=>{typeof i.msg=="string"&&a.info(i.msg);function r(){let n=o();if(n==null)return !1;let s=A.getVue(n);return s==null?!1:!!i.check(s)}f.waitVueByInterval(()=>o(),r,250,1e4).then(n=>{if(!n){typeof i.failWait=="function"&&i.failWait(!0);return}let s=o(),l=A.getVue(s);if(l==null){typeof i.failWait=="function"&&i.failWait(!1);return}i.set(l);});});},watchVuePropChange(e,t,o,i,r){let n=f.assign({immediate:!0,deep:!1},i||{});return new Promise(s=>{A.waitVuePropToSet(e,{check(l){return typeof(l==null?void 0:l.$watch)=="function"},set(l){let u=null;typeof t=="function"?u=l.$watch(()=>t(l),(c,d)=>{o(l,c,d);},n):u=l.$watch(t,(c,d)=>{o(l,c,d);},n),s(u);},failWait:r});})},goToUrl(e,t,o=!1){if(e==null){x.error("跳转Url: $vueNode为空"),a.error("跳转Url: $vueNode为空："+t);return}let i=A.getVue(e);if(i==null){x.error("获取vue属性失败",{consoleLogContent:!0});return}let r=i.$router,n=!0;if(a.info("即将跳转URL："+t),o&&(n=!1),n)window.open(t,"_blank");else {if(t.startsWith("http")||t.startsWith("//")){t.startsWith("//")&&(t=window.location.protocol+t);let s=new URL(t);if(s.origin===window.location.origin)t=s.pathname+s.search+s.hash;else {a.info("不同域名，直接本页打开，不用Router："+t),window.location.href=t;return}}a.info("$router push跳转Url："+t),r.push(t);}},hookGestureReturnByVueRouter(e){function t(){a.success("触发popstate事件"),i(!0);}function o(){a.success("监听地址改变"),e.vueInstance.$router.history.push(e.hash),h.on(_,"popstate",t);}async function i(r=!1){if(h.off(_,"popstate",t),!e.callback(r))for(;;)if(e.vueInstance.$router.history.current.hash===e.hash)a.info("后退！"),e.vueInstance.$router.back(),await f.sleep(250);else return}return o(),{resumeBack:i}}},oe={init(){(m.getValue("pc-xhs-search-open-blank-btn")||m.getValue("pc-xhs-search-open-blank-keyboard-enter"))&&this.optimizationSearch(),m.execMenuOnce("pc-xhs-article-fullWidth",()=>this.fullWidth());},optimizationSearch(){function e(t,o=!0){{let i=document.querySelector("#search-input");if(i){let r=i.value,n=Ie.getSearchUrl(r);a.info("搜索内容: "+r),window.open(n,o?"_blank":"_self");}else x.error("未找到搜索的输入框");}}f.waitNode("#search-input").then(t=>{t.placeholder="搜索小红书",m.execMenu("pc-xhs-search-open-blank-keyboard-enter",()=>{h.listenKeyboard(t,"keydown",(o,i,r,n)=>{o==="Enter"&&!r.length&&(a.info("按下回车键"),f.preventEvent(n),t.blur(),e());});});}),f.waitNode("#search-input + .input-button .search-icon").then(t=>{m.execMenu("pc-xhs-search-open-blank-btn",()=>{h.on(t,"click",o=>{f.preventEvent(o),a.info("点击搜索按钮"),e();},{capture:!0});});});},fullWidth(){a.info("笔记宽屏");let e=m.getValue("pc-xhs-article-fullWidth-widthSize",90);return v(`
		.main-container .main-content{
			padding-left: 0 !important;
		}
		.outer-link-container{
			width: 100vw !important;
		}
		/* 隐藏左侧工具栏 */
		.main-container .side-bar{
			display: none !important;
		}
		#noteContainer{
			width: ${e}vw;
		}
		`)},transformPublishTime(){a.info("转换笔记发布时间");let e=new f.LockFunction(()=>{ve(".note-content:not([data-edit-date])").forEach(t=>{var l,u;let o=A.getVue(t);if(!o)return;let i=(u=(l=o==null?void 0:o._)==null?void 0:l.props)==null?void 0:u.note;if(i==null)return;let r=i.time,n=i.lastUpdateTime,s=i.ipLocation;if(typeof r=="number"){let c=[];c.push(`发布：${f.formatTime(r)}`),typeof n=="number"&&c.push(`修改：${f.formatTime(n)}`),typeof s=="string"&&f.isNotNull(s)&&c.push(s);let d=t.querySelector(".date");h.html(d,c.join("<br>")),t.setAttribute("data-edit-date","");}});});f.mutationObserver(document,{config:{subtree:!0,childList:!0},callback:()=>{e.run();}});}},W={init(){m.execMenuOnce("pc-xhs-hook-vue",()=>{K.webPackVue();}),m.execMenuOnce("pc-xhs-allowCopy",()=>{W.allowPCCopy();}),m.execMenuOnce("pc-xhs-open-blank-article",()=>{W.openBlankArticle();}),Re.init(),m.execMenuOnce("pc-xhs-article-showPubsliushTime",()=>{oe.transformPublishTime();}),X.isArticle()&&(a.info("Router: 笔记页面"),oe.init());},allowPCCopy(){a.success("允许复制文字"),h.on(_,"copy",void 0,function(e){f.preventEvent(e);let t=_.getSelection();return t?f.setClip(t.toString()):a.error("未选中任何内容"),!1},{capture:!0});},openBlankArticle(){a.success("新标签页打开文章"),h.on(document,"click",".feeds-container .note-item",function(e){f.preventEvent(e);let o=e.target.querySelector("a.cover[href]");o&&o.href?(a.info("跳转文章: "+o.href),window.open(o.href,"_blank")):x.error("未找到文章链接");},{capture:!0});}};v(`
.qmsg svg.animate-turn {
    fill: none;
}
`);m.init();let ce=f.isPhone(),D="change_env_set",C=P(D);se.add({key:D,text:`⚙ 自动: ${ce?"移动端":"PC端"}`,autoReload:!1,isStoreValue:!1,showText(e){return C==null?e:e+` 手动: ${C==1?"移动端":C==2?"PC端":"未知"}`},callback:()=>{let e=[0,1,2],t=window.prompt(`请输入当前脚本环境判定

自动判断: 0
移动端: 1
PC端: 2`,"0");if(!t)return;let o=parseInt(t);if(isNaN(o)){x.error("输入的不是规范的数字");return}if(!e.includes(o)){x.error("输入的值必须是0或1或2");return}o==0?re(D):O(D,o);}});C!=null?(a.info(`手动判定为${C===1?"移动端":"PC端"}`),C==1?Z.init():C==2?W.init():(x.error("意外，手动判定的值不在范围内"),re(D))):ce?(a.info("自动判定为移动端"),Z.init()):(a.info("自动判定为PC端"),W.init());

})(Qmsg, Utils, DOMUtils, pops, Viewer);
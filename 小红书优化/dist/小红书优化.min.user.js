// ==UserScript==
// @name         小红书优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2024.5.6
// @author       WhiteSevs
// @description  屏蔽登录弹窗、屏蔽广告、优化评论浏览、优化图片浏览、允许复制、禁止唤醒App、禁止唤醒弹窗、修复正确跳转等
// @icon         https://fe-video-qc.xhscdn.com/fe-platform/ed8fe781ce9e16c1bfac2cd962f0721edabe2e49.ico
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://www.xiaohongshu.com/*
// @require      https://update.greasyfork.org/scripts/449471/1360565/Viewer.js
// @require      https://update.greasyfork.org/scripts/462234/1322684/Message.js
// @require      https://update.greasyfork.org/scripts/456485/1371568/pops.js
// @require      https://update.greasyfork.org/scripts/455186/1371570/WhiteSevsUtils.js
// @require      https://update.greasyfork.org/scripts/465772/1360574/DOMUtils.js
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.26/dist/vue.global.prod.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.3.1/dist/index.iife.min.js
// @require      data:application/javascript,window.ElementPlusIconsVue%3DElementPlusIconsVue%3B
// @resource     ElementPlusResourceCSS  https://cdn.jsdelivr.net/npm/element-plus@2.7.2/dist/index.min.css
// @connect      edith.xiaohongshu.com
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  var _=typeof GM_addStyle<"u"?GM_addStyle:void 0,Y=typeof GM_deleteValue<"u"?GM_deleteValue:void 0,V=typeof GM_getValue<"u"?GM_getValue:void 0,D=typeof GM_info<"u"?GM_info:void 0,re=typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0,H=typeof GM_setValue<"u"?GM_setValue:void 0,se=typeof GM_unregisterMenuCommand<"u"?GM_unregisterMenuCommand:void 0,ae=typeof GM_xmlhttpRequest<"u"?GM_xmlhttpRequest:void 0,d=typeof unsafeWindow<"u"?unsafeWindow:void 0,k=window;const ce="小红书优化";var Z;const u=(Z=k.Utils||d.Utils)==null?void 0:Z.noConflict();var K;const m=(K=k.DOMUtils||d.DOMUtils)==null?void 0:K.noConflict(),Q=k.pops||d.pops,f=k.Qmsg||d.Qmsg,ue=k.Viewer||d.Viewer;k.showdown||d.showdown;const n=new u.Log(D,d.console||k.console);var J;const j=((J=D==null?void 0:D.script)==null?void 0:J.name)||ce,ee=!1;n.config({debug:ee,logMaxCount:2e4,autoClearConsole:!0,tag:!0});f.config({position:"bottom",html:!0,maxNums:5,autoClose:!0,showClose:!1,showReverse:!0});const te=new u.GM_Menu({GM_getValue:V,GM_setValue:H,GM_registerMenuCommand:re,GM_unregisterMenuCommand:se}),B=new u.Httpx(ae);B.config({logDetails:ee,onabort(){f.warning("请求取消");},ontimeout(){f.error("请求超时");},onerror(t){f.error("请求异常"),n.error(["httpx-onerror 请求异常",t]);}});d.Object.defineProperty,d.Function.prototype.apply,d.Function.prototype.call,d.Element.prototype.appendChild,d.setTimeout;const S="GM_Panel",G="data-key",R="data-default-value",p=function(t,e,o,l,r){let i={text:t,type:"switch",description:r,attributes:{},getValue(){return !!c.getValue(e,o)},callback(s,a){n.success(`${a?"开启":"关闭"} ${t}`),c.setValue(e,!!a);},afterAddToUListCallBack:void 0};return i.attributes[G]=e,i.attributes[R]=!!o,i},de={id:"little-red-book-panel-config-shield",title:"屏蔽",forms:[{text:"功能",type:"forms",forms:[p("【屏蔽】广告","little-red-book-shieldAd",!0,void 0,"如：App内打开"),p("【屏蔽】底部搜索发现","little-red-book-shieldBottomSearchFind",!0,void 0,"建议开启"),p("【屏蔽】底部工具栏","little-red-book-shieldBottomToorBar",!0,void 0,"建议开启")]}]},me={id:"little-red-book-panel-config-home",title:"主页",forms:[{text:"劫持/拦截",type:"forms",forms:[p("劫持点击事件","little-red-book-repariClick",!0,void 0,"可阻止点击跳转至下载页面")]}]},pe={id:"little-red-book-panel-config-note",title:"笔记",forms:[{text:"功能",type:"forms",forms:[p("优化评论浏览","little-red-book-optimizeCommentBrowsing",!0,void 0,"加载评论，未登录最多查看1页评论(包括楼中楼的)"),p("优化图片浏览","little-red-book-optimizeImageBrowsing",!0,void 0,"更方便的浏览图片"),p("允许复制","little-red-book-allowCopy",!0,void 0,"可以复制笔记的内容")]},{text:"视频笔记",type:"forms",forms:[p("优化视频描述","little-red-book-optimizeVideoNoteDesc",!0,void 0,"让视频描述可以滚动显示更多"),p("【屏蔽】作者热门笔记","little-red-book-shieldAuthorHotNote",!0,void 0,"建议开启"),p("【屏蔽】热门推荐","little-red-book-shieldHotRecommendNote",!0,void 0,"建议开启")]},{text:"劫持/拦截",type:"forms",forms:[p("劫持webpack-弹窗","little-red-book-hijack-webpack-mask",!0,void 0,"如：打开App弹窗、登录弹窗"),p("劫持webpack-唤醒App","little-red-book-hijack-webpack-scheme",!0,void 0,"禁止跳转商店小红书详情页/小红书")]}]},he={id:"little-red-book-panel-config-other",title:"其它",forms:[{text:"劫持/拦截",type:"forms",forms:[p("劫持Vue","little-red-book-hijack-vue",!1,void 0,"恢复__vue__属性")]}]},fe={id:"xhs-panel-config-common",title:"通用",forms:[{text:"功能",type:"forms",forms:[p("允许复制","pc-xhs-allowCopy",!0,void 0,"可以选择文字并复制"),p("新标签页打开文章","pc-xhs-open-blank-article",!1,void 0,"点击文章不会在本页展开，会打开新标签页")]},{text:"劫持/拦截",type:"forms",forms:[p("劫持Vue","pc-xhs-hook-vue",!1,void 0,"恢复__vue__属性")]}]},ge={id:"xhs-panel-config-shield",title:"屏蔽",forms:[{text:"功能",type:"forms",forms:[p("【屏蔽】广告","pc-xhs-shieldAd",!0,void 0,"屏蔽屏蔽屏蔽屏蔽"),p("【屏蔽】登录弹窗","pc-xhs-shield-login-dialog",!0,void 0,"屏蔽自动跳出的需要登录的弹窗"),p("【屏蔽】选择文字弹出的搜索提示","pc-xhs-shield-select-text-search-position",!1,void 0,"屏蔽选择文字弹出的搜索提示")]}]},c={$data:{data:new u.Dictionary,scriptName:j,key:S,attributeKeyName:G,attributeDefaultValueName:R},$listener:{listenData:new u.Dictionary},init(){this.initPanelDefaultValue(),this.initExtensionsMenu();},initExtensionsMenu(){d.top===d.self&&te.add([{key:"show_pops_panel_setting",text:"⚙ 设置",autoReload:!1,isStoreValue:!1,showText(t){return t},callback:()=>{this.showPanel();}},{key:"show_pops_panel_setting",text:"⚙ PC-设置",autoReload:!1,isStoreValue:!1,showText(t){return t},callback:()=>{this.showPCPanel();}}]);},initPanelDefaultValue(){let t=this;function e(l){if(!l.attributes)return;let r=l.attributes[G],i=l.attributes[R];if(r==null){n.warn(["请先配置键",l]);return}t.$data.data.has(r)&&n.warn("请检查该key(已存在): "+r),t.$data.data.set(r,i);}let o=this.getPanelContentConfig().concat(this.getPCPanelContentConfig());for(let l=0;l<o.length;l++){let r=o[l];if(!r.forms)continue;let i=r.forms;for(let s=0;s<i.length;s++){let a=i[s];if(a.forms){let h=a.forms;for(let b=0;b<h.length;b++)e(h[b]);}else e(a);}}},setValue(t,e){let o=V(S,{}),l=o[t];o[t]=e,H(S,o),this.$listener.listenData.has(t)&&this.$listener.listenData.get(t).callback(t,l,e);},getValue(t,e){let l=V(S,{})[t];return l??(this.$data.data.has(t)?this.$data.data.get(t):e)},deleteValue(t){let e=V(S,{}),o=e[t];Reflect.deleteProperty(e,t),H(S,e),this.$listener.listenData.has(t)&&this.$listener.listenData.get(t).callback(t,o,void 0);},addValueChangeListener(t,e){let o=Math.random();return this.$listener.listenData.set(t,{id:o,key:t,callback:e}),o},removeValueChangeListener(t){let e=null;for(const[o,l]of this.$listener.listenData.entries())if(l.id===t)break;this.$listener.listenData.delete(e);},execMenu(t,e){if(typeof t!="string")throw new TypeError("key 必须是字符串");let o=c.getValue(t);o&&e(o);},showPanel(){let{isMobile:t,UIWidth:e,UIHeight:o}=this.getEnvInfo();Q.panel({title:{text:`${j}-设置`,position:"center",html:!1,style:""},content:this.getPanelContentConfig(),mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1}},isMobile:t,width:e,height:o,drag:!0,only:!0});},showPCPanel(){let{isMobile:t,UIWidth:e,UIHeight:o}=this.getEnvInfo();Q.panel({title:{text:`${j}-设置`,position:"center",html:!1,style:""},content:this.getPCPanelContentConfig(),mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1}},isMobile:t,width:e,height:o,drag:!0,only:!0});},getEnvInfo(){let t=!1,e="92dvw",o="80dvh";return window.outerWidth<550&&(t=!0),{isMobile:t,UIWidth:e,UIHeight:o}},getPanelContentConfig(){return [de,me,pe,he]},getPCPanelContentConfig(){return [fe,ge]}},W={webpackChunkranchi(){let t;Object.defineProperty(d,"webpackChunkranchi",{get(){return t},set(o){t=o;const l=t.push;t.push=function(...r){return r[0][0],typeof r[0][1]=="object"&&Object.keys(r[0][1]).forEach((i,s)=>{if(typeof r[0][1][i]=="function"&&r[0][1][i].toString().includes("是否打开小红书App?")&&c.getValue("little-red-book-hijack-webpack-mask"))n.success(["成功劫持各种弹窗/遮罩层："+i]),r[0][1][i]=function(){};else if(typeof r[0][1][i]=="function"&&r[0][1][i].toString().startsWith("function(e,n,t){t.d(n,{Z:function(){return y}});")&&r[0][1][i].toString().includes("jumpToApp")&&c.getValue("little-red-book-hijack-webpack-scheme")){let a=r[0][1][i];r[0][1][i]=function(...h){n.success(["成功劫持scheme唤醒",h]);let b=h[2].d;h[2].d=function(...w){var I;if(w.length===2&&typeof((I=w[1])==null?void 0:I.Z)=="function"){let L=w[1].Z;L.toString()==="function(){return y}"&&(w[1].Z=function(...T){let C=L.call(this,...T);return typeof C=="function"&&C.toString().includes("jumpToApp")?function(){return {jumpToApp(y){var g;if(n.success(["拦截唤醒",y]),(g=y.deeplink)!=null&&g.startsWith("xhsdiscover://user/")){let v=`https://www.xiaohongshu.com/user/profile/${y.deeplink.replace(/^xhsdiscover:\/\/user\//,"")}`;window.open(v,"_blank");}}}}:C});}b.call(this,...w);},a.call(this,...h);};}}),l.call(this,...r)};}});},webPackVue(){let t=d.Function.prototype.apply,e=!1;d.Function.prototype.apply=function(...o){var r,i,s,a,h,b;const l=t.call(this,...o);if(!e&&o.length===2&&((r=o[0])!=null&&r.addRoute)&&((i=o[0])!=null&&i.currentRoute)&&((s=o[0])!=null&&s.getRoutes)&&((a=o[0])!=null&&a.hasRoute)&&((h=o[0])!=null&&h.install)&&((b=o[0])!=null&&b.removeRoute)){e=!0;let w=o[1][0];n.success(["成功劫持vue，version版本：",w.version]),w.mixin({mounted:function(){this.$el.__Ivue__=this;}});}return l};}},be=`/* 底部的App内打开 */\r
.bottom-button-box,\r
/* 顶部的打开看看 */\r
.nav-bar-box,\r
/* 首页-顶部的打开看看 */\r
.launch-app-container {\r
  display: none !important;\r
}\r
`,q={isNotePage(){return globalThis.location.pathname.startsWith("/discovery/item/")},isUserHomePage(){return globalThis.location.pathname.startsWith("/user/profile/")},isHomePage(){return globalThis.location.href==="https://www.xiaohongshu.com/"||globalThis.location.href==="https://www.xiaohongshu.com"},isSearchPage(){return globalThis.location.pathname.startsWith("/search_result/")}},U={async getPageInfo(t,e="",o="",l="jpg,webp"){let r=await B.get(`https://edith.xiaohongshu.com/api/sns/web/v2/comment/page?note_id=${t}&cursor=${e}&top_comment_id=${o}&image_formats=${l}`,{headers:{Accept:"application/json, text/plain, */*","User-Agent":u.getRandomPCUA(),Origin:"https://www.xiaohongshu.com",Referer:"https://www.xiaohongshu.com/","X-T":Date.now()}});if(!r.status)return;let i=u.toJSON(r.data.responseText);if(n.info(["获取页信息",i]),i.code===0||i.success)return i.data;if(i.code===-101)return;f.error(i.msg);},async getLzlPageInfo(t="",e="",o=10,l="",r="jpg,webp"){let i=await B.get(`https://edith.xiaohongshu.com/api/sns/web/v2/comment/sub/page?note_id=${t}&root_comment_id=${e}&num=${o}&cursor=${l}&image_formats=${r}`,{headers:{Accept:"application/json, text/plain, */*","User-Agent":u.getRandomPCUA(),Origin:"https://www.xiaohongshu.com",Referer:"https://www.xiaohongshu.com/","X-T":Date.now()}});if(!i.status)return;let s=u.toJSON(i.data.responseText);if(n.info(["获取楼中楼页信息",s]),s.code===0||s.success)return s.data;f.error(s.msg);}},$={allowCopy(){n.info("允许复制"),_(`
        *{
            -webkit-user-select: unset;
            user-select: unset;
        }
        `);},shieldBottomSearchFind(){n.info("屏蔽底部搜索发现"),_(`
        .hotlist-container,
        /* 一大块空白区域 */
        .safe-area-bottom.margin-placeholder{
            display: none !important;
        }
        `);},shieldBottomToorBar(){n.info("屏蔽底部工具栏"),_(`
        .engage-bar-container{
            display: none !important;
        }`);},shieldAuthorHotNote(){n.info("屏蔽视频笔记的作者热门笔记"),_(`
        .user-notes-box.user-notes-clo-layout-container{
            display: none !important;
        }`);},shieldHotRecommendNote(){n.info("屏蔽视频笔记的热门推荐"),_(`
        #new-note-view-container .recommend-box{
            display: none !important;
        }`);}},_e={init(){},optimizeVideoNoteDesc(){n.info("优化视频笔记的描述（可滚动）"),_(`
    .author-box .author-desc-wrapper .author-desc{
      max-height: 70px !important;
      overflow: auto !important;
    }
    /* 展开按钮 */
    .author-box .author-desc-wrapper .author-desc .author-desc-trigger{
      display: none !important;
    }`);}},z={init(){(c.getValue("little-red-book-hijack-webpack-mask")||c.getValue("little-red-book-hijack-webpack-scheme"))&&(n.info("劫持webpack"),W.webpackChunkranchi()),c.execMenu("little-red-book-shieldBottomSearchFind",()=>{$.shieldBottomSearchFind();}),c.execMenu("little-red-book-shieldBottomToorBar",()=>{$.shieldBottomToorBar();}),c.execMenu("little-red-book-optimizeImageBrowsing",()=>{z.optimizeImageBrowsing();}),c.execMenu("little-red-book-optimizeVideoNoteDesc",()=>{_e.optimizeVideoNoteDesc();}),c.execMenu("little-red-book-shieldAuthorHotNote",()=>{$.shieldAuthorHotNote();}),c.execMenu("little-red-book-shieldHotRecommendNote",()=>{$.shieldHotRecommendNote();}),m.ready(function(){c.execMenu("little-red-book-optimizeCommentBrowsing",()=>{z.optimizeCommentBrowsing();});});},optimizeCommentBrowsing(){n.info("优化评论浏览");const t={QmsgLoading:void 0,scrollFunc:void 0,noteData:{},commentData:{},emojiMap:{},emojiNameList:[],currentCursor:void 0,commentContainer:void 0,init(){var e;this.emojiMap=((e=u.toJSON(d.localStorage.getItem("redmoji")))==null?void 0:e.redmojiMap)||{},this.emojiNameList=Object.keys(this.emojiMap),this.scrollFunc=new u.LockFunction(this.scrollEvent,this),t.noteData=d.__INITIAL_STATE__.noteData.data.noteData,t.commentData=d.__INITIAL_STATE__.noteData.data.commentData,n.info(["笔记数据",t.noteData]),n.info(["评论数据",t.commentData]);},getCommentHTML(e){return `
            <div class="little-red-book-comments-avatar">
                    <a target="_blank" href="/user/profile/${e.user_id}">
                        <img src="${e.user_avatar}" crossorigin="anonymous">
                    </a>
              </div>
              <div class="little-red-book-comments-content-wrapper">
                <div class="little-red-book-comments-author-wrapper">
                    <div class="little-red-book-comments-author">
                        <a href="/user/profile/${e.user_id}" class="little-red-book-comments-author-name" target="_blank">
                            ${e.user_nickname}
                        </a>
                    </div>
                    <div class="little-red-book-comments-content">
                        ${e.content}
                    </div>
                    <div class="little-red-book-comments-info">
                        <div class="little-red-book-comments-info-date">
                            <span class="little-red-book-comments-create-time">${u.formatTime(e.create_time)}</span>
                            <span class="little-red-book-comments-location">${e.ip_location}</span>
                        </div>
                    </div>
                </div>
              </div>
            `},getCommentElement(e){var C,y;let o=e.content,l=e.create_time||parseInt(e.time),r=e.id,i=e.ip_location||e.ipLocation,s=e.sub_comment_has_more,a=parseInt(e.sub_comment_count)||0,h=e.sub_comment_cursor,b=e.sub_comments||e.subComments,w=(e.user_info||e.user).image,I=(e.user_info||e.user).nickname,L=((C=e==null?void 0:e.user_info)==null?void 0:C.user_id)||((y=e==null?void 0:e.user)==null?void 0:y.userId);o=t.converContent(o);let T=m.createElement("div",{className:"little-red-book-comments-item",innerHTML:`
            <div class="little-red-book-comments-parent">
              ${t.getCommentHTML({user_id:L,user_avatar:w,user_nickname:I,content:o,create_time:l,ip_location:i})}
            </div>
              `});if(s&&Array.isArray(b)&&(b.forEach(g=>{let E=m.createElement("div",{className:"little-red-book-comments-reply-container",innerHTML:t.getCommentHTML({user_id:g.user_info.user_id,user_avatar:g.user_info.image,user_nickname:g.user_info.nickname,content:t.converContent(g.content),create_time:g.create_time,ip_location:g.ip_location})});T.appendChild(E);}),a!==b.length)){let g=a-b.length,E=h,v=m.createElement("div",{className:"little-red-book-comments-reply-show-more",innerText:`展开 ${g} 条回复`});async function X(){let ne=f.loading("加载中，请稍后..."),P=await U.getLzlPageInfo(t.noteData.id,r,10,E,void 0);ne.close(),P&&(E=P.cursor,g=g-P.comments.length,v.innerText=`展开 ${g} 条回复`,P.comments.forEach(M=>{let le=m.createElement("div",{className:"little-red-book-comments-reply-container",innerHTML:t.getCommentHTML({user_id:M.user_info.user_id,user_avatar:M.user_info.image,user_nickname:M.user_info.nickname,content:t.converContent(M.content),create_time:M.create_time,ip_location:M.ip_location})});m.before(v,le);}),P.has_more||(m.off(v,"click",void 0,X,{capture:!0}),v.remove()));}m.on(v,"click",void 0,X,{capture:!0}),T.appendChild(v);}return T},converContent(e){return t.emojiNameList.forEach(o=>{e.includes(o)&&(e=e.replaceAll(o,`<img class="little-red-book-note-content-emoji" crossorigin="anonymous" src="${t.emojiMap[o]}">`));}),e},async scrollEvent(){if(!u.isNearBottom(window.innerHeight/3))return;this.QmsgLoading==null&&(this.QmsgLoading=f.loading("加载中，请稍后..."));let e=await U.getPageInfo(t.noteData.id,t.currentCursor);if(this.QmsgLoading&&(this.QmsgLoading.close(),this.QmsgLoading=void 0),!!e&&(t.currentCursor=e.cursor,e.comments.forEach(o=>{let l=t.getCommentElement(o);t.commentContainer.appendChild(l);}),!e.has_more)){f.info("已加载全部评论"),t.removeScrollEventListener();return}},addSrollEventListener(){n.success("添加滚动监听事件"),m.on(document,"scroll",void 0,t.scrollFunc.run,{capture:!0,once:!1,passive:!0});},removeScrollEventListener(){n.success("移除滚动监听事件"),m.off(document,"scroll",void 0,t.scrollFunc.run,{capture:!0});}};u.waitNode(".narmal-note-container").then(async()=>{n.info("优化评论浏览-笔记元素出现");let e=document.querySelector(".note-view-container"),o=f.loading("获取评论中，请稍后..."),l=m.createElement("div",{className:"little-red-book-comments-container",innerHTML:`
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
          `});t.commentContainer=l,t.init();let r=m.createElement("div",{className:"little-red-book-comments-total",innerHTML:`共 ${t.noteData.comments} 条评论`});l.appendChild(r);let i=await U.getPageInfo(t.noteData.id);await u.sleep(800),i?(t.currentCursor=i.cursor,i.comments.forEach(s=>{let a=t.getCommentElement(s);l.appendChild(a);}),i.has_more&&t.addSrollEventListener()):t.commentData&&t.commentData.comments&&(n.info("从固定的评论中加载"),t.commentData.comments.forEach(s=>{let a=t.getCommentElement(s);l.appendChild(a);})),o.close(),m.append(e,l);});},optimizeImageBrowsing(){n.info("优化图片浏览");function t(e=[],o=0){let l="";e.forEach(s=>{l+=`<li><img data-src="${s}" loading="lazy"></li>`;});let r=m.createElement("ul",{innerHTML:l}),i=new ue(r,{inline:!1,url:"data-src",zIndex:u.getMaxZIndex()+100,hidden:()=>{i.destroy();}});o=o<0?0:o,i.view(o),i.zoomTo(1),i.show();}m.on(document,"click",".note-image-box",function(e){let o=e.target,l=o.querySelector("img"),r=[],i=[];o.closest(".onix-carousel-item")?i=Array.from(o.closest(".onix-carousel-item").parentElement.querySelectorAll("img")):i=[l];let s=i.findIndex(a=>a==l);i.forEach(a=>{let h=a.getAttribute("src")||a.getAttribute("data-src")||a.getAttribute("alt");h&&r.push(h);}),n.success(["点击浏览图片👉",r[s]]),t(r,s);});}},oe={init(){m.ready(()=>{c.execMenu("little-red-book-repariClick",()=>{oe.repariClick();});});},repariClick(){n.info("修复正确的点击跳转"),m.on(document,"click",void 0,function(t){var o,l,r,i,s;let e=t.target;if(n.info(["点击的按钮元素",e]),(o=e==null?void 0:e.className)!=null&&o.includes("follow-btn"))n.success("点击-关注按钮");else if(e!=null&&e.closest("button.reds-button.message-btn"))n.success("点击-私信按钮");else if(e!=null&&e.closest("div.reds-tab-item"))n.success("点击-笔记/收藏按钮");else if(e!=null&&e.closest("section.reds-note-card")){n.success("点击-笔记卡片");let a=e==null?void 0:e.closest("section.reds-note-card");a.getAttribute("id")||((i=(r=(l=u.toJSON(a.getAttribute("impression")))==null?void 0:l.noteTarget)==null?void 0:r.value)==null?void 0:i.noteId)?window.open(`https://www.xiaohongshu.com/discovery/item/${(s=e==null?void 0:e.closest("section.reds-note-card"))==null?void 0:s.getAttribute("id")}`,"_blank"):f.error("获取笔记note_id失败");}return u.preventEvent(t),!1},{capture:!0});}},F={init(){c.execMenu("little-red-book-hijack-vue",()=>{n.info("劫持页面的Vue"),W.webPackVue();}),c.execMenu("little-red-book-shieldAd",()=>{n.info("注入默认屏蔽CSS"),_(be);}),c.execMenu("little-red-book-allowCopy",()=>{F.allowCopy();}),q.isNotePage()?z.init():q.isUserHomePage()&&oe.init();},allowCopy(){n.info("允许复制文字"),_(`
        *{
            -webkit-user-select: unset;
            user-select: unset;
        }
        `);}},we="",O={init(){c.execMenu("pc-xhs-shieldAd",()=>{_(we);}),c.execMenu("pc-xhs-shield-select-text-search-position",()=>{O.shieldSelectTextVisibleSearchPosition();}),m.ready(()=>{c.execMenu("pc-xhs-shield-login-dialog",()=>{O.shieldLoginContainer();});});},shieldLoginContainer(){n.success("添加屏蔽登录弹窗CSS，监听登录弹窗出现"),_(`
        /* 登录弹窗 */
        .login-container{
            display: none !important;
        }
        `),u.mutationObserver(document.body,{config:{subtree:!0,childList:!0},callback:()=>{let t=document.querySelector(".login-container .icon-btn-wrapper");t&&(t.click(),n.success("登录弹窗出现，关闭"));}});},shieldSelectTextVisibleSearchPosition(){n.success("屏蔽选择文字弹出的搜索提示"),_(`
        .search-position{
            display: none !important;
        }
        `);}},N={init(){O.init(),c.execMenu("pc-xhs-allowCopy",()=>{N.allowPCCopy();}),c.execMenu("pc-xhs-hook-vue",()=>{W.webPackVue();}),c.execMenu("pc-xhs-open-blank-article",()=>{N.openBlankArticle();});},allowPCCopy(){n.success("允许复制文字"),m.on(d,"copy",void 0,function(t){u.preventEvent(t);let e=d.getSelection();return e?u.setClip(e.toString()):n.error("未选中任何内容"),!1},{capture:!0});},openBlankArticle(){n.success("新标签页打开文章"),m.on(document,"click",".feeds-container .note-item",function(t){u.preventEvent(t);let o=t.target.querySelector("a[href]");o&&o.href?(n.info("跳转文章: "+o.href),window.open(o.href,"_blank")):f.error("未找到文章链接");},{capture:!0});}};_(`
.qmsg svg.animate-turn {
    fill: none;
}
`);c.init();let ie=u.isPhone(),A="change_env_set",x=V(A);te.add({key:A,text:`⚙ 自动: ${ie?"移动端":"PC端"}`,autoReload:!1,isStoreValue:!1,showText(t){return x==null?t:t+` 手动: ${x==1?"移动端":x==2?"PC端":"未知"}`},callback:()=>{let t=[0,1,2],e=window.prompt(`请输入当前脚本环境判定
1. 自动判断: 0
2. 移动端: 1
3. PC端: 2`,"0");if(!e)return;let o=parseInt(e);if(isNaN(o)){f.error("输入的不是规范的数字");return}if(!t.includes(o)){f.error("输入的值必须是0或1或2");return}o==0?Y(A):H(A,o);}});x!=null?(n.info(`手动判定为${x===1?"移动端":"PC端"}`),x==1?F.init():x==2?N.init():(f.error("意外，手动判定的值不在范围内"),Y(A))):ie?(n.info("自动判定为移动端"),F.init()):(n.info("自动判定为PC端"),N.init());

})();
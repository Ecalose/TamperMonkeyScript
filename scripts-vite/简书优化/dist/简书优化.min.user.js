// ==UserScript==
// @name         简书优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2025.11.1
// @author       WhiteSevs
// @description  支持手机端和PC端、屏蔽广告、优化浏览体验、重定向链接、全文居中、自动展开全文、允许复制文字、劫持唤醒/跳转App、自定义屏蔽元素等
// @license      GPL-3.0-only
// @icon         data:image/png;base64,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
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*.jianshu.com/*
// @match        *://*.jianshu.io/*
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@86be74b83fca4fa47521cded28377b35e1d7d2ac/lib/CoverUMD/index.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.9.6/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.7.4/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@2.6.1/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.6.0/dist/index.umd.min.js
// @connect      *
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_setValues
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (w, I, K, le) {
	'use strict';

	const Me=`.download-app-guidance,\r
.call-app-btn,\r
.collapse-tips,\r
.note-graceful-button,\r
.app-open,\r
.header-wrap,\r
.recommend-wrap.recommend-ad,\r
.call-app-Ad-bottom,\r
#recommended-notes p.top-title span.more,\r
#homepage .modal,\r
button.index_call-app-btn,\r
span.note__flow__download,\r
.download-guide,\r
#footer,\r
.comment-open-app-btn-wrap,\r
.nav.navbar-nav + div,\r
.self-flow-ad,\r
#free-reward-panel,\r
div[id*='AdFive'],\r
#index-aside-download-qrbox,\r
.baidu-app-download-2eIkf_1,\r
/* 底部的"小礼物走一走，来简书关注我"、赞赏支持和更多精彩内容，就在简书APP */\r
div[role="main"] > div > section:first-child > div:nth-last-child(2),\r
/* 它的内部是script标签，可能影响部分评论之间的高度问题 */\r
div.adad_container ,\r
/* 顶部导航栏的【下载App】 */\r
#__next nav a[href*="navbar-app"] {\r
  display: none !important;\r
}\r
body.reader-day-mode.normal-size {\r
  overflow: auto !important;\r
}\r
.collapse-free-content {\r
  height: auto !important;\r
}\r
.copyright {\r
  color: #000 !important;\r
}\r
#note-show .content .show-content-free .collapse-free-content:after {\r
  background-image: none !important;\r
}\r
footer > div > div {\r
  justify-content: center;\r
}\r
/* 修复底部最后编辑于：。。。在某些套壳浏览器上的错位问题 */\r
#note-show .content .show-content-free .note-meta-time {\r
  margin-top: 0px !important;\r
}\r
`;var X=typeof GM_deleteValue<"u"?GM_deleteValue:void 0,me=typeof GM_getResourceText<"u"?GM_getResourceText:void 0,ee=typeof GM_getValue<"u"?GM_getValue:void 0,Q=typeof GM_info<"u"?GM_info:void 0,ne=typeof GM_listValues<"u"?GM_listValues:void 0,ke=typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0,ce=typeof GM_setValue<"u"?GM_setValue:void 0,ye=typeof GM_setValues<"u"?GM_setValues:void 0,Ve=typeof GM_unregisterMenuCommand<"u"?GM_unregisterMenuCommand:void 0,Ee=typeof GM_xmlhttpRequest<"u"?GM_xmlhttpRequest:void 0,F=typeof unsafeWindow<"u"?unsafeWindow:void 0,$e=window;const oe="GM_Panel",Re="data-init",ae="data-key",ie="data-default-value",Ae="data-init-more-value",Le="data-plugin-search-config",te="data-storage-api",q={get width(){return globalThis.innerWidth},get height(){return globalThis.innerHeight}},B={setting:{get width(){return q.width<550?"88vw":q.width<700?"550px":"700px"},get height(){return q.height<450?"70vh":q.height<550?"450px":"550px"}},settingMiddle:{get width(){return q.width<350?"88vw":"350px"}},info:{get width(){return q.width<350?"88vw":"350px"},get height(){return q.height<250?"88vh":"250px"}}};class De{storageKey;listenerData;constructor(t){if(typeof t=="string"){const n=t.trim();if(n=="")throw new Error("key参数不能为空字符串");this.storageKey=n;}else throw new Error("key参数类型错误，必须是字符串");this.listenerData=new K.Dictionary,this.getLocalValue=this.getLocalValue.bind(this),this.set=this.set.bind(this),this.get=this.get.bind(this),this.getAll=this.getAll.bind(this),this.delete=this.delete.bind(this),this.has=this.has.bind(this),this.keys=this.keys.bind(this),this.values=this.values.bind(this),this.clear=this.clear.bind(this),this.addValueChangeListener=this.addValueChangeListener.bind(this),this.removeValueChangeListener=this.removeValueChangeListener.bind(this),this.triggerValueChangeListener=this.triggerValueChangeListener.bind(this);}getLocalValue(){let t=ee(this.storageKey);return t==null&&(t={},this.setLocalValue(t)),t}setLocalValue(t){ce(this.storageKey,t);}set(t,n){const o=this.get(t),a=this.getLocalValue();Reflect.set(a,t,n),this.setLocalValue(a),this.triggerValueChangeListener(t,o,n);}get(t,n){const o=this.getLocalValue();return Reflect.get(o,t)??n}getAll(){return this.getLocalValue()}delete(t){const n=this.get(t),o=this.getLocalValue();Reflect.deleteProperty(o,t),this.setLocalValue(o),this.triggerValueChangeListener(t,n,void 0);}has(t){const n=this.getLocalValue();return Reflect.has(n,t)}keys(){const t=this.getLocalValue();return Reflect.ownKeys(t)}values(){const t=this.getLocalValue();return Reflect.ownKeys(t).map(n=>Reflect.get(t,n))}clear(){X(this.storageKey);}addValueChangeListener(t,n){const o=Math.random(),a=this.listenerData.get(t)||[];return a.push({id:o,key:t,callback:n}),this.listenerData.set(t,a),o}removeValueChangeListener(t){let n=false;for(const[o,a]of this.listenerData.entries()){for(let r=0;r<a.length;r++){const i=a[r];(typeof t=="string"&&i.key===t||typeof t=="number"&&i.id===t)&&(a.splice(r,1),r--,n=true);}this.listenerData.set(o,a);}return n}async triggerValueChangeListener(...t){const[n,o,a]=t;if(!this.listenerData.has(n))return;let r=this.listenerData.get(n);for(let i=0;i<r.length;i++){const x=r[i];if(typeof x.callback=="function"){let c=this.get(n),l,g;typeof o<"u"&&t.length>=2?g=o:g=c,typeof a<"u"&&t.length>2?l=a:l=c,await x.callback(n,g,l);}}}}const G=new De(oe),L={waitRemove(...e){e.forEach(t=>{typeof t=="string"&&I.waitNodeList(t).then(n=>{n.forEach(o=>o.remove());});});},createBlockCSSNode(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(n=>{Array.isArray(n)?t=t.concat(n):t.push(n);}),I.createElement("style",{type:"text/css",innerHTML:`${t.join(`,
`)}{display: none !important;}`})},addBlockCSS(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(n=>{Array.isArray(n)?t=t.concat(n):t.push(n);}),se(`${t.join(`,
`)}{display: none !important;}`)},setGMResourceCSS(e){const t=typeof me=="function"?me(e.keyName):null;return typeof t=="string"&&t?se(t):L.loadStyleLink(e.url)},async loadStyleLink(e){let t=document.createElement("link");return t.rel="stylesheet",t.type="text/css",t.href=e,new Promise(n=>{I.ready(()=>{document.head.appendChild(t),n(t);});})},async loadScript(e){let t=document.createElement("script");return t.src=e,new Promise(n=>{t.onload=()=>{n(null);},(document.head||document.documentElement).appendChild(t);})},fixUrl(e){return e=e.trim(),e.startsWith("data:")||e.match(/^http(s|):\/\//i)?e:e.startsWith("//")?(e.startsWith("///")||(e=window.location.protocol+e),e):(e.startsWith("/")||(e+="/"),e=window.location.origin+e,e)},fixHttps(e){if(e.startsWith("https://")||!e.startsWith("http://"))return e;try{let t=new URL(e);return t.protocol="https:",t.toString()}catch{return e}},lockScroll(...e){let t=document.createElement("style");t.innerHTML=`
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;let n=[document.documentElement,document.body].concat(...e||[]);return n.forEach(o=>{o.classList.add("pops-overflow-hidden-important");}),(document.head||document.documentElement).appendChild(t),{recovery(){n.forEach(o=>{o.classList.remove("pops-overflow-hidden-important");}),t.remove();}}},async getClipboardText(){function e(o){navigator.clipboard.readText().then(a=>{o(a);}).catch(a=>{p.error("读取剪贴板内容失败👉",a),o("");});}function t(o){navigator.permissions.query({name:"clipboard-read"}).then(a=>{e(o);}).catch(a=>{p.error("申请剪贴板权限失败，尝试直接读取👉",a.message??a.name??a.stack),e(o);});}function n(){return !(typeof navigator?.clipboard?.readText!="function"||typeof navigator?.permissions?.query!="function")}return new Promise(o=>{if(!n()){o("");return}document.hasFocus()?t(o):window.addEventListener("focus",()=>{t(o);},{once:true});})},escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/©/g,"&copy;").replace(/®/g,"&reg;").replace(/™/g,"&trade;").replace(/→/g,"&rarr;").replace(/←/g,"&larr;").replace(/↑/g,"&uarr;").replace(/↓/g,"&darr;").replace(/—/g,"&mdash;").replace(/–/g,"&ndash;").replace(/…/g,"&hellip;").replace(/ /g,"&nbsp;").replace(/\r\n/g,"<br>").replace(/\r/g,"<br>").replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},interval(e,t,n=5e3){let o,a=n-t,r=t,i=async x=>{let c=await e(x);if(typeof c=="boolean"&&!c||x){b.workerClearTimeout(o);return}if(r+=t,r>a){i(true);return}o=b.workerSetTimeout(()=>{i(false);},t);};i(false);},findParentNode(e,t,n){if(n){let o=I.closest(e,n);if(o)return o.querySelector(t)}else return I.matches(e,t)?e:I.closest(e,t)},toStr(e){const t="__undefined__placeholder__replaced__str__";return JSON.stringify(e,(o,a)=>a===void 0?t:a,2).replace(new RegExp(`"${t}"`,"g"),"undefined")}},re={$data:{__contentConfig:null,get contentConfig(){return this.__contentConfig==null&&(this.__contentConfig=new b.Dictionary),this.__contentConfig},__defaultBottomContentConfig:[]},addContentConfig(e){Array.isArray(e)||(e=[e]);let t=this.$data.contentConfig.keys().length;this.$data.contentConfig.set(t,e);},getAllContentConfig(){return this.$data.contentConfig.values().flat()},getConfig(e=0){return this.$data.contentConfig.get(e)??[]},getDefaultBottomContentConfig(){if(this.$data.__defaultBottomContentConfig.length)return this.$data.__defaultBottomContentConfig;let e=false,t;const n=(r,i)=>{typeof i!="string"&&(i=L.toStr(i));const x=new Blob([i]),c=globalThis.URL.createObjectURL(x);d.createElement("a",{href:c,download:r}).click(),b.workerSetTimeout(()=>{globalThis.URL.revokeObjectURL(c);},500);},o=()=>{const r=k=>{const f=N.alert({title:{text:"请选择导入方式",position:"center"},content:{text:`
            <div class="btn-control" data-mode="local">本地导入</div>
            <div class="btn-control" data-mode="network">网络导入</div>
            <div class="btn-control" data-mode="clipboard">剪贴板导入</div>`,html:true},btn:{ok:{enable:false},close:{enable:true,callback(E,C){E.close();}}},drag:true,mask:{enable:true},width:B.info.width,height:B.info.height,style:`
          .btn-control{
              display: inline-block;
              margin: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              cursor: pointer;
          }
          .btn-control:hover{
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
          }`}),m=f.$shadowRoot.querySelector(".btn-control[data-mode='local']"),V=f.$shadowRoot.querySelector(".btn-control[data-mode='network']"),O=f.$shadowRoot.querySelector(".btn-control[data-mode='clipboard']"),R=async E=>{confirm("是否清空脚本存储的配置？（如果点击取消按钮，则仅做配置覆盖处理）")&&(typeof ne=="function"?typeof X=="function"?(ne().forEach(s=>{X(s);}),w.success("已清空脚本存储的配置")):w.error("不支持GM_deleteValue函数，无法执行删除脚本配置"):w.error("不支持GM_listValues函数，无法清空脚本存储的配置")),typeof ye=="function"?ye(E):Object.keys(E).forEach(s=>{const u=E[s];ce(s,u);}),w.success("配置导入完毕");},D=E=>new Promise(async C=>{const S=b.toJSON(E);Object.keys(S).length===0?w.warning("解析为空配置，不导入"):await R(S),C(true);});d.on(m,"click",E=>{d.preventEvent(E),f.close();const C=d.createElement("input",{type:"file",accept:".json"});d.on(C,["propertychange","input"],S=>{if(!C.files?.length)return;const s=C.files[0],u=new FileReader;u.onload=()=>{D(u.result);},u.readAsText(s,"UTF-8");}),C.click();}),d.on(V,"click",E=>{d.preventEvent(E),f.close();const C=N.prompt({title:{text:"网络导入",position:"center"},content:{text:"",placeholder:"请填写URL",focus:true},btn:{close:{enable:true,callback(u,A){u.close();}},ok:{text:"导入",callback:async(u,A)=>{const M=u.text;if(b.isNull(M)){w.error("请填入完整的url");return}const h=w.loading("正在获取配置..."),y=await fe.get(M,{allowInterceptConfig:false});if(h.close(),!y.status){p.error(y),w.error("获取配置失败",{consoleLogContent:true});return}await D(y.data.responseText)&&u.close();}},cancel:{enable:false}},drag:true,mask:{enable:true},width:B.info.width,height:"auto"}),S=C.$shadowRoot.querySelector("input"),s=C.$shadowRoot.querySelector(".pops-prompt-btn-ok");d.on(S,["input","propertychange"],u=>{d.val(S)===""?d.attr(s,"disabled","true"):d.removeAttr(s,"disabled");}),d.listenKeyboard(S,"keydown",(u,A,M)=>{u==="Enter"&&M.length===0&&d.val(S)!==""&&d.trigger(s,"click");}),d.trigger(S,"input");}),d.on(O,"click",async E=>{d.preventEvent(E),f.close();let C=await L.getClipboardText();if(C.trim()===""){w.warning("获取到的剪贴板内容为空");return}await D(C);});},i=(k=`${de}_panel-setting-${b.formatTime(Date.now(),"yyyy_MM_dd_HH_mm_ss")}.json`,f)=>{const m=N.alert({title:{text:"请选择导出方式",position:"center"},content:{text:`
            <div class="btn-control" data-mode="export-to-file">导出至文件</div>
            <div class="btn-control" data-mode="export-to-clipboard">导出至剪贴板</div>
            `,html:true},btn:{ok:{enable:false},close:{enable:true,callback(R,D){R.close();}}},drag:true,mask:{enable:true},width:B.info.width,height:B.info.height,style:`
          .btn-control{
              display: inline-block;
              margin: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              cursor: pointer;
          }
          .btn-control:hover{
            color: #409eff;
            border-color: #c6e2ff;
            background-color: #ecf5ff;
          }`}),V=m.$shadowRoot.querySelector(".btn-control[data-mode='export-to-file']"),O=m.$shadowRoot.querySelector(".btn-control[data-mode='export-to-clipboard']");d.on(V,"click",R=>{d.preventEvent(R);try{n(k,f),m.close();}catch(D){w.error(D.toString(),{consoleLogContent:true});}}),d.on(O,"click",async R=>{await b.copy(f)?(w.success("复制成功"),m.close()):w.error("复制失败");});},c=N.confirm({title:{text:"配置",position:"center"},content:{text:`
            <textarea name="config-value" id="config" readonly></textarea>
          `,html:true},btn:{ok:{enable:true,type:"primary",text:"导入",callback(k,f){r();}},cancel:{enable:true,text:"导出",callback(k,f){i(void 0,g);}}},width:q.width<450?"90vw":"450px",height:"auto",style:`
          .pops-content textarea {
            --textarea-bd-color: #dcdfe6;
            display: inline-block;
            resize: vertical;
            padding: 5px 15px;
            margin: 0;
            line-height: normal;
            box-sizing: border-box;
            color: #606266;
            border: 0;
            border-radius: 0;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background: none;
            width: 100%;
            height: 100%;
            appearance: none;
            resize: none;
          }
          .pops-content textarea{
            height: 500px;
          }
          .pops-content textarea:focus {
            --textarea-bd-color: #3677f0;
          }
          .pops-content textarea:hover {
            --textarea-bd-color: #c0c4cc;
          }
        `}).$shadowRoot.querySelector("textarea"),l={};if(typeof ne=="function")ne().forEach(f=>{const m=ee(f);Reflect.set(l,f,m);});else {w.warning("不支持函数GM_listValues，仅导出菜单配置");const k=ee(oe);Reflect.set(l,oe,k);}const g=L.toStr(l);c.value=g;},a=()=>{let r=Q?.script?.supportURL||Q?.script?.namespace;typeof r=="string"&&b.isNotNull(r)&&window.open(r,"_blank");};return [{id:"script-version",title:`版本：${Q?.script?.version||"未知"}`,isBottom:true,forms:[],clickFirstCallback(){return  false},afterRender(r){new Ie(r.$asideLiElement).on("tap",function(x){clearTimeout(t),t=void 0,e?(e=false,o()):(t=setTimeout(()=>{e=false,a();},200),e=true);});}}]},setDefaultBottomContentConfig(e){this.$data.__defaultBottomContentConfig=e;}},Te={$data:{__menuOption:[{key:"show_pops_panel_setting",text:"⚙ 设置",autoReload:false,isStoreValue:false,showText(e){return e},callback:()=>{v.showPanel(re.getConfig(0));}}],get menuOption(){return this.__menuOption}},init(){this.initExtensionsMenu();},initExtensionsMenu(){v.isTopWindow()&&ve.add(this.$data.menuOption);},addMenuOption(e){Array.isArray(e)||(e=[e]),this.$data.menuOption.push(...e);},updateMenuOption(e){Array.isArray(e)||(e=[e]),e.forEach(t=>{let n=this.$data.menuOption.findIndex(o=>o.key===t.key);n!==-1&&(this.$data.menuOption[n]=t);});},getMenuOption(e=0){return this.$data.menuOption[e]},deleteMenuOption(e=0){this.$data.menuOption.splice(e,1);}},v={$data:{__contentConfigInitDefaultValue:null,__onceExecMenuData:null,__urlChangeReloadMenuExecOnce:null,__onceExecData:null,__panelConfig:{},$panel:null,panelContent:[],get contentConfigInitDefaultValue(){return this.__contentConfigInitDefaultValue==null&&(this.__contentConfigInitDefaultValue=new b.Dictionary),this.__contentConfigInitDefaultValue},contentConfigInitDisabledKeys:[],get onceExecMenuData(){return this.__onceExecMenuData==null&&(this.__onceExecMenuData=new b.Dictionary),this.__onceExecMenuData},get urlChangeReloadMenuExecOnce(){return this.__urlChangeReloadMenuExecOnce==null&&(this.__urlChangeReloadMenuExecOnce=new b.Dictionary),this.__urlChangeReloadMenuExecOnce},get onceExecData(){return this.__onceExecData==null&&(this.__onceExecData=new b.Dictionary),this.__onceExecData},get scriptName(){return de},get panelConfig(){return this.__panelConfig},set panelConfig(e){this.__panelConfig=e;},key:oe,attributeKeyName:ae,attributeDefaultValueName:ie},init(){this.initContentDefaultValue(),Te.init();},isTopWindow(){return F.top===F.self},initContentDefaultValue(){const e=o=>{if(!o.attributes||o.type==="button"||o.type==="forms"||o.type==="deepMenu")return;const a=o.attributes;let r=a[Re];if(typeof r=="function"){let l=r();if(typeof l=="boolean"&&!l)return}let i=new Map,x=a[ae];if(x!=null){const l=a[ie];i.set(x,l);}let c=a[Ae];if(typeof c=="object"&&c&&Object.keys(c).forEach(l=>{const g=c[l];i.set(l,g);}),!i.size){p.warn(["请先配置键",o]);return}if(o.type==="switch"){let l=typeof o.disabled=="function"?o.disabled():o.disabled;typeof l=="boolean"&&l&&this.$data.contentConfigInitDisabledKeys.push(...i.keys());}for(const[l,g]of i.entries())this.setDefaultValue(l,g);},t=o=>{for(let a=0;a<o.length;a++){let r=o[a];e(r);let i=r.forms;i&&Array.isArray(i)&&t(i);}},n=[...re.getAllContentConfig()];for(let o=0;o<n.length;o++){let a=n[o];if(!a.forms)continue;const r=a.forms;r&&Array.isArray(r)&&t(r);}this.$data.contentConfigInitDisabledKeys=[...new Set(this.$data.contentConfigInitDisabledKeys)];},setDefaultValue(e,t){this.$data.contentConfigInitDefaultValue.has(e)&&p.warn("请检查该key(已存在): "+e),this.$data.contentConfigInitDefaultValue.set(e,t);},getDefaultValue(e){return this.$data.contentConfigInitDefaultValue.get(e)},setValue(e,t){G.set(e,t);},getValue(e,t){const n=G.get(e);return n??(this.$data.contentConfigInitDefaultValue.has(e)?this.$data.contentConfigInitDefaultValue.get(e):t)},deleteValue(e){G.delete(e);},hasKey(e){return G.has(e)},addValueChangeListener(e,t){return G.addValueChangeListener(e,(o,a,r)=>{t(e,r,a);})},removeValueChangeListener(e){G.removeValueChangeListener(e);},triggerMenuValueChange(e,t,n){G.triggerValueChangeListener(e,n,t);},async exec(e,t,n,o=true){const a=this;let r;typeof e=="string"||Array.isArray(e)?r=()=>e:r=e;let i=false;const x=r();let c=[];Array.isArray(x)?(i=true,c=x):c.push(x);const l=c.find(s=>!this.$data.contentConfigInitDefaultValue.has(s));if(l){p.warn(`${l} 键不存在`);return}const g=JSON.stringify(c);if(o&&this.$data.onceExecMenuData.has(g))return this.$data.onceExecMenuData.get(g);let k=[];const f=[];let m=[];const V=(s,u)=>{let A=[],M=[],h=[];if(Array.isArray(u))h=h.concat(u);else if(typeof u=="object"&&u!=null)if(u instanceof Element)h.push(u);else {const{$css:y,destory:_}=u;y!=null&&(Array.isArray(y)?h=h.concat(y):h.push(y)),typeof _=="function"&&h.push(_);}else h.push(u);for(const y of h)if(y!=null){if(y instanceof Element){A.push(y);continue}if(typeof y=="function"){m.push(y);continue}}s?(k=k.concat(A),m=m.concat(M)):(R(),D());},O=s=>!!this.getValue(s),R=()=>{for(let s=0;s<k.length;s++)k[s]?.remove(),k.splice(s,1),s--;},D=()=>{for(let s=0;s<m.length;s++){const u=m[s];u(),m.splice(s,1),s--;}},E=()=>{let s=false;return typeof n=="function"?s=n(c):s=c.every(u=>O(u)),s},C=async s=>{if(E()){const A=c.map(h=>this.getValue(h)),M=await t({value:i?A:A[0],addStoreValue:(...h)=>V(true,h)});V(true,M);}else V(false,[]);};o&&c.forEach(s=>{const u=this.addValueChangeListener(s,(A,M,h)=>C());f.push(u);}),await C();const S={reload(){this.clearStoreStyleElements(),this.destory(),C();},clear(){this.clearStoreStyleElements(),this.destory(),this.removeValueChangeListener(),this.clearOnceExecMenuData();},clearStoreStyleElements:()=>R(),destory(){return D()},removeValueChangeListener:()=>{f.forEach(s=>{this.removeValueChangeListener(s);});},clearOnceExecMenuData(){o&&a.$data.onceExecMenuData.delete(g);}};return this.$data.onceExecMenuData.set(g,S),S},async execMenu(e,t,n=false,o=false){return await this.exec(e,async a=>await t(a),a=>a.every(i=>{let x=!!this.getValue(i);return v.$data.contentConfigInitDisabledKeys.includes(i)&&(x=false,p.warn(`.execMenu${o?"Once":""} ${i} 被禁用`)),n&&(x=!x),x}),o)},async execMenuOnce(e,t,n=false,o=false){const a=await this.execMenu(e,t,n,true);if(o&&a){const r=()=>{a.reload();};this.removeUrlChangeWithExecMenuOnceListener(e),this.addUrlChangeWithExecMenuOnceListener(e,r);}return a},deleteExecMenuOnce(e){return e=this.transformKey(e),this.$data.onceExecMenuData.delete(e),this.$data.urlChangeReloadMenuExecOnce.delete(e),G.removeValueChangeListener(e)},onceExec(e,t){if(e=this.transformKey(e),typeof e!="string")throw new TypeError("key 必须是字符串");this.$data.onceExecData.has(e)||(t(),this.$data.onceExecData.set(e,1));},deleteOnceExec(e){e=this.transformKey(e),this.$data.onceExecData.delete(e);},addUrlChangeWithExecMenuOnceListener(e,t){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.set(e,t);},removeUrlChangeWithExecMenuOnceListener(e){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.delete(e);},hasUrlChangeWithExecMenuOnceListener(e){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.has(e)},async triggerUrlChangeWithExecMenuOnceEvent(e){const t=this.$data.urlChangeReloadMenuExecOnce.values();for(const n of t)await n(e);},showPanel(e,t=`${de}-设置`,n=false,o=false){this.$data.$panel=null,this.$data.panelContent=[];let a=e.findIndex(i=>(typeof i.isBottom=="function"?i.isBottom():!!i.isBottom)&&i.id==="script-version")!==-1;!n&&!a&&e.push(...re.getDefaultBottomContentConfig());let r=N.panel({title:{text:t,position:"center",html:false,style:""},content:e,btn:{close:{enable:true,callback:(i,x)=>{i.close(),this.$data.$panel=null;}}},mask:{enable:true,clickEvent:{toClose:true,toHide:false},clickCallBack:(i,x)=>{i(),this.$data.$panel=null;}},width:B.setting.width,height:B.setting.height,drag:true,only:true,...this.$data.panelConfig});this.$data.$panel=r,this.$data.panelContent=e,o||this.registerConfigSearch({$panel:r,content:e});},registerConfigSearch(e){const{$panel:t,content:n}=e,o=async(f,m)=>{if(f==null)return;const V=await m(f);return V&&typeof V.isFind=="boolean"&&V.isFind?V.data:await o(V.data,m)},a=(f,m)=>{const V=new IntersectionObserver(O=>{O.forEach(R=>{R.isIntersecting&&(m?.(),V.disconnect());});},{root:null,threshold:1});V.observe(f),f.scrollIntoView({behavior:"smooth",block:"center"});},r=f=>{const m="pops-flashing";d.animationend(f,()=>{f.classList.remove(m);}),f.classList.add(m);},i=f=>{if(f.type==="dblclick"&&k)return;d.preventEvent(f),c=null;const m=N.alert({title:{text:"搜索配置",position:"center"},content:{text:`
						<div class="search-wrapper">
							<input class="search-config-text" name="search-config" type="text" placeholder="请输入需要搜素的配置名称">
						</div>
						<div class="search-result-wrapper"></div>
					`,html:true},btn:{ok:{enable:false}},mask:{clickEvent:{toClose:true}},width:B.settingMiddle.width,height:"auto",drag:true,style:`
					${N.config.cssText.panelCSS}

					.search-wrapper{
						border-bottom: 1px solid rgb(235, 238, 245, 1);
					}
					.pops-content:has(.search-result-wrapper:empty) .search-wrapper{
						border-bottom: 0;
					}
					.search-config-text{
						width: 100%;
						border: 0;
						height: 32px;
						padding: 0px 10px;
						outline: none;
					}
					.search-result-wrapper{
						max-height: 400px;
						overflow: auto;
					}
					.search-result-item{
						cursor: pointer;
						padding: 5px 10px;
						display: flex;
						flex-direction: column;
					}
					.search-result-item:hover{
						background-color: #D8F1FD;
					}
					.search-result-item-path{
						display: flex;
    					align-items: center;
					}
					.search-result-item-description{
						font-size: 0.8em;
						color: #6c6c6c;
					}
					${e.searchDialogStyle??""}
				`});m.$shadowRoot.querySelector(".search-wrapper");const V=m.$shadowRoot.querySelector(".search-config-text"),O=m.$shadowRoot.querySelector(".search-result-wrapper");V.focus();const R=()=>{d.empty(O);},D=C=>{const S=b.queryProperty(C,u=>u?.next?{isFind:false,data:u.next}:{isFind:true,data:u}),s=d.createElement("div",{className:"search-result-item",innerHTML:`
							<div class="search-result-item-path">${S.matchedData?.path}</div>
							<div class="search-result-item-description">${S.matchedData?.description??""}</div>
						`});return d.on(s,"click",u=>{const M=t.$shadowRoot.querySelectorAll("aside.pops-panel-aside .pops-panel-aside-top-container li")[C.index];if(!M){w.error(`左侧项下标${C.index}不存在`);return}M.scrollIntoView({behavior:"smooth",block:"center"}),M.click(),o(C.next,async h=>{if(h?.next){const y=await d.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll(".pops-panel-deepMenu-nav-item")).find(_=>{const P=Reflect.get(_,"__formConfig__");return typeof P=="object"&&P!=null&&P.text===h.name}),2500);if(y)y.click();else return w.error("未找到对应的二级菜单"),{isFind:true,data:h};return {isFind:false,data:h.next}}else {const y=await d.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll("li:not(.pops-panel-deepMenu-nav-item)")).find(_=>Reflect.get(_,"__formConfig__")===h.matchedData?.formConfig),2500);if(y){a(y);const _=y.closest(".pops-panel-forms-fold[data-fold-enable]");_&&(_.querySelector(".pops-panel-forms-fold-container").click(),await b.sleep(500)),a(y,()=>{r(y);});}else w.error("未找到对应的菜单项");return {isFind:true,data:h}}});}),s},E=C=>{const S=new RegExp(C,"i"),s=[],u=(M,h)=>{for(let y=0;y<M.length;y++){const _=M[y],P=_.forms;if(P&&Array.isArray(P)){const j=b.deepClone(h);if(_.type==="deepMenu"){const H=b.queryProperty(j,W=>W?.next?{isFind:false,data:W.next}:{isFind:true,data:W});H.next={name:_.text};}u(P,j);}else {let j,H;if(_.type==="own"){const T=Reflect.get(_.attributes||{},Le);T&&(typeof T.text=="string"&&(j=T.text),typeof T.desc=="string"&&(H=T.desc));}else j=Reflect.get(_,"text"),H=Reflect.get(_,"description");const W=[j,H],pe=W.findIndex(T=>{if(typeof T=="string")return T.match(S)});if(pe!==-1){const T=b.deepClone(h),he=b.queryProperty(T,U=>U?.next?{isFind:false,data:U.next}:{isFind:true,data:U});he.next={name:j,matchedData:{path:"",formConfig:_,matchedText:W[pe],description:H}};const ge=[];b.queryProperty(T,U=>{const ue=U?.name;return typeof ue=="string"&&ue.trim()!==""&&ge.push(ue),U?.next?{isFind:false,data:U.next}:{isFind:true,data:U}});const Se=ge.join(L.escapeHtml(" - "));he.next.matchedData.path=Se,s.push(T);}}}};for(let M=0;M<n.length;M++){const h=n[M];if(!h.forms||h.isBottom&&h.id==="script-version")continue;const y=h.forms;if(y&&Array.isArray(y)){let _=h.title;typeof _=="function"&&(_=_()),u(y,{index:M,name:_});}}const A=document.createDocumentFragment();for(const M of s){let h=D(M);A.appendChild(h);}R(),O.append(A);};d.on(V,"input",b.debounce(C=>{d.preventEvent(C);let S=d.val(V).trim();if(S===""){R();return}E(S);},200));};t.$shadowRoot.querySelectorAll("aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)").forEach(f=>{d.on(f,"dblclick",i);});let c=null,l=false,g,k=false;d.on(t.$shadowRoot,"touchend","aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)",(f,m)=>{k=true,clearTimeout(g),g=void 0,l&&c===m?(l=false,c=null,i(f)):(g=setTimeout(()=>{l=false;},200),l=true,c=m);},{capture:true}),t.$shadowRoot.appendChild(d.createElement("style",{type:"text/css",textContent:`
					.pops-flashing{
						animation: double-blink 1.5s ease-in-out;
					}
					@keyframes double-blink {
						 0% {
							background-color: initial;
						}
						25% {
							background-color: yellow;
						}
						50% {
							background-color: initial;
						}
						75% {
							background-color: yellow;
						}
						100% {
							background-color: initial;
						}
					}
				`}));},transformKey(e){if(Array.isArray(e)){const t=e.sort();return JSON.stringify(t)}else return e}},z={qmsg_config_position:{key:"qmsg-config-position",defaultValue:"bottom"},qmsg_config_maxnums:{key:"qmsg-config-maxnums",defaultValue:3},qmsg_config_showreverse:{key:"qmsg-config-showreverse",defaultValue:false}},b=K.noConflict(),d=I.noConflict(),N=le,p=new b.Log(Q,F.console||$e.console),de=Q?.script?.name||void 0,Ie=le.config.Utils.AnyTouch(),Oe=false;p.config({debug:false,logMaxCount:250,autoClearConsole:true,tag:true});w.config({isHTML:true,autoClose:true,showClose:false,consoleLogContent(e){const t=e.setting.type;if(t==="loading")return  false;const n=e.setting.content;return t==="warning"?p.warn(n):t==="error"?p.error(n):p.info(n),true},get position(){return v.getValue(z.qmsg_config_position.key,z.qmsg_config_position.defaultValue)},get maxNums(){return v.getValue(z.qmsg_config_maxnums.key,z.qmsg_config_maxnums.defaultValue)},get showReverse(){return v.getValue(z.qmsg_config_showreverse.key,z.qmsg_config_showreverse.defaultValue)},get zIndex(){let e=K.getMaxZIndex(),t=le.config.InstanceUtils.getPopsMaxZIndex().zIndex;return K.getMaxValue(e,t)+100}});N.GlobalConfig.setGlobalConfig({zIndex:()=>{const e=K.getMaxZIndex(void 0,void 0,n=>{if(n?.classList?.contains("qmsg-shadow-container")||n?.closest("qmsg")&&n.getRootNode()instanceof ShadowRoot)return  false}),t=le.config.InstanceUtils.getPopsMaxZIndex().zIndex;return K.getMaxValue(e,t)+100},mask:{enable:true,clickEvent:{toClose:false,toHide:false}},drag:true});const ve=new b.GM_Menu({GM_getValue:ee,GM_setValue:ce,GM_registerMenuCommand:ke,GM_unregisterMenuCommand:Ve}),fe=new b.Httpx({xmlHttpRequest:Ee,logDetails:Oe});fe.interceptors.request.use(e=>e);fe.interceptors.response.use(void 0,e=>(p.error("拦截器-请求错误",e),e.type==="onabort"?w.warning("请求取消",{consoleLogContent:true}):e.type==="onerror"?w.error("请求异常",{consoleLogContent:true}):e.type==="ontimeout"?w.error("请求超时",{consoleLogContent:true}):w.error("其它错误",{consoleLogContent:true}),e));F.Object.defineProperty,F.Function.prototype.apply,F.Function.prototype.call,F.Element.prototype.appendChild,F.setTimeout;const se=d.addStyle.bind(d);I.selector.bind(I);I.selectorAll.bind(I);new b.GM_Cookie;const Pe={isGoWild(){return window.location.pathname==="/go-wild"}},xe=function(e=""){d.waitNodeList(e).then(t=>{t.forEach(n=>n.remove());});},Z={init(){this.addCSS(),v.execMenu("JianShuAutoJumpRedirect_PC",()=>{this.jumpRedirect();}),v.execMenu("JianShuRemoveClipboardHijacking",()=>{this.removeClipboardHijacking();}),v.execMenu("JianShuAutoExpandFullText",()=>{this.autoExpandFullText();}),v.execMenu("JianShuArticleCenter",()=>this.articleCenter()),v.execMenu("JianShuShieldRelatedArticles",()=>this.blockRelatedArticles()),v.execMenu("jianshu-shieldClientDialog",()=>{this.blockClientDialog();}),v.execMenuOnce("JianShuShieldUserComments",()=>this.blockUserComments()),v.execMenuOnce("JianShuShieldRecommendedReading",()=>this.blockRecommendedReading()),v.execMenuOnce("jianshu-shieldTopNav",()=>this.blockTopNav()),v.execMenuOnce("jianshu-shieldBottomToolbar",()=>this.blockBottomToolbar());},addCSS(){return p.info("添加屏蔽CSS"),se(Me)},articleCenter(){p.info("全文居中");let e=[];return e.push(L.addBlockCSS("div[role=main] aside","div._3Pnjry"),se(`
			div[role=main] aside,
			div._3Pnjry{
				display: none !important;
			}
			div._gp-ck{
				width: 100% !important;
			}`)),xe("div[role=main] aside"),xe("div._3Pnjry"),d.waitNodeList("div._gp-ck").then(t=>{t.forEach(n=>{n.style.width="100%";});}),e},removeClipboardHijacking(){p.info("去除剪贴板劫持");const e=t=>{t.stopPropagation();};window.addEventListener("copy",e,true),document.addEventListener("copy",e,true);},autoExpandFullText(){d.waitNode('div#homepage div[class*="dialog-"]').then(e=>{e.style.visibility="hidden",p.info("自动展开全文"),b.mutationObserver(e,{callback:t=>{t.length!=0&&t.forEach(n=>{n.target.style.display!="none"&&(p.success("自动展开全文-自动点击"),document.querySelector('div#homepage div[class*="dialog-"] .cancel')?.click());});},config:{childList:false,attributes:true,characterData:true,subtree:true}});});},jumpRedirect(){if(Pe.isGoWild()){p.success("去除简书拦截其它网址的url并自动跳转"),window.stop();let e=window.location.href.replace(window.location.origin+"/","");e=decodeURIComponent(e);let t=e.replace(/^go-wild\?ac=2&url=/gi,"").replace(/^https:\/\/link.zhihu.com\/\?target\=/gi,"");window.location.href=t;}},blockRelatedArticles(){return p.info("屏蔽相关文章"),L.addBlockCSS('div[role="main"] > div > section:nth-child(2)')},blockClientDialog(){p.info("【屏蔽】客户端弹窗"),L.addBlockCSS('div:has(>div[class*="-mask"]:not([class*="-mask-hidden"]) + div[tabindex="-1"][role="dialog"])'),d.waitNode('div[class*="-mask"]:not([class*="-mask-hidden"]) + div[tabindex="-1"][role="dialog"]').then(e=>{p.success("弹窗出现"),b.waitPropertyByInterval(e,()=>b.getReactInstance(e)?.reactInternalInstance?.return?.return?.memoizedProps?.onClose,250,1e4).then(()=>{b.getReactInstance(e).reactInternalInstance.return.return.memoizedProps.onClose(new Event("click")),p.success("调用函数关闭弹窗");});});},blockUserComments(){return p.info("屏蔽评论区"),L.addBlockCSS("div#note-page-comment")},blockRecommendedReading(){return p.info("屏蔽底部推荐阅读"),L.addBlockCSS('div[role="main"] > div > section:last-child')},blockTopNav(){return p.info("【屏蔽】顶部导航栏"),L.addBlockCSS("header")},blockBottomToolbar(){return p.info("【屏蔽】底部工具栏"),L.addBlockCSS("footer")}},be={init(){this.addCSS(),v.execMenu("JianShuAutoJumpRedirect_Mobile",()=>{Z.jumpRedirect();}),v.execMenu("JianShuHijackSchemeScriptLabel_Mobile",()=>{this.handlePrototype();}),v.execMenu("JianShuRemoveClipboardHijacking_Mobile",()=>{Z.removeClipboardHijacking();}),v.execMenu("JianShuAutoExpandFullText_Mobile",()=>{Z.autoExpandFullText();}),v.execMenuOnce("JianShuremoveFooterRecommendRead",()=>this.blockeFooterRecommendRead()),v.execMenu("JianShuShieldUserCommentsMobile",()=>this.blockUserComments());},addCSS(){Z.addCSS();},blockeFooterRecommendRead(){return p.info("屏蔽底部推荐阅读"),L.addBlockCSS("#recommended-notes")},handlePrototype(){p.info("处理原型添加script标签");let e=Node.prototype.appendChild;F.Node.prototype.appendChild=function(t){let n=["img"];return t.src&&!t.src.includes("jianshu.io")&&!n.includes(t.localName)?(p.success(["禁止添加的元素",t]),null):e.call(this,t)};},blockUserComments(){return p.info("屏蔽评论区"),L.addBlockCSS("#comment-main")}},_e={$data:{__storeApiFn:null,get storeApiValue(){return this.__storeApiFn||(this.__storeApiFn=new K.Dictionary),this.__storeApiFn}},getStorageApi(e){if(this.hasStorageApi(e))return this.$data.storeApiValue.get(e)},hasStorageApi(e){return this.$data.storeApiValue.has(e)},setStorageApi(e,t){this.$data.storeApiValue.set(e,t);},initComponentsStorageApi(e,t,n){let o;this.hasStorageApi(e)?o=this.getStorageApi(e):o=n,this.setComponentsStorageApiProperty(t,o);},setComponentsStorageApiProperty(e,t){Reflect.set(e.props,te,t);}},$=function(e,t,n,o,a,r,i,x){const c={text:e,type:"switch",description:a,disabled:i,attributes:{},props:{},getValue(){return this.props[te].get(t,n)},callback(l,g){const k=!!g;p.success(`${k?"开启":"关闭"} ${e}`),this.props[te].set(t,k);},afterAddToUListCallBack:r};return Reflect.set(c.attributes,ae,t),Reflect.set(c.attributes,ie,n),_e.initComponentsStorageApi("switch",c,{get(l,g){return v.getValue(l,g)},set(l,g){v.setValue(l,g);}}),c},Fe={id:"jianshu-panel-config-mobile",title:"移动端",forms:[{text:"",type:"forms",forms:[{text:"功能",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("自动展开全文","JianShuAutoExpandFullText_Mobile",true),$("重定向链接","JianShuAutoJumpRedirect_Mobile",true,void 0,"自动跳转简书拦截的Url链接")]}]},{text:"屏蔽",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("【屏蔽】底部推荐阅读","JianShuremoveFooterRecommendRead",false),$("【屏蔽】评论区","JianShuShieldUserCommentsMobile",false)]}]},{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("拦截-剪贴板","JianShuRemoveClipboardHijacking_Mobile",true,void 0,"去除禁止复制"),$("劫持-唤醒/跳转App","JianShuHijackSchemeScriptLabel_Mobile",true,void 0,"去除简书唤醒调用App")]}]}]}]},Ce=function(e,t,n,o,a,r,i){let x=[];typeof o=="function"?x=o():x=o;const c={text:e,type:"select",description:r,attributes:{},props:{},getValue(){return this.props[te].get(t,n)},callback(l,g,k){const f=g;if(p.info(`选择：${k}`),typeof a=="function"&&a(l,f,k))return;this.props[te].set(t,f);},data:x};return Reflect.set(c.attributes,ae,t),Reflect.set(c.attributes,ie,n),_e.initComponentsStorageApi("select",c,{get(l,g){return v.getValue(l,g)},set(l,g){v.setValue(l,g);}}),c},Ue={id:"jianshu-panel-common",title:"通用",forms:[{text:"Toast配置",type:"forms",forms:[Ce("Toast位置","qmsg-config-position","bottom",[{value:"topleft",text:"左上角"},{value:"top",text:"顶部"},{value:"topright",text:"右上角"},{value:"left",text:"左边"},{value:"center",text:"中间"},{value:"right",text:"右边"},{value:"bottomleft",text:"左下角"},{value:"bottom",text:"底部"},{value:"bottomright",text:"右下角"}],(e,t,n)=>{p.info("设置当前Qmsg弹出位置"+n);},"Toast显示在页面九宫格的位置"),Ce("最多显示的数量","qmsg-config-maxnums",3,[{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"}],void 0,"限制Toast显示的数量"),$("逆序弹出","qmsg-config-showreverse",false,void 0,"修改Toast弹出的顺序")]}]},Ge={id:"jianshu-panel-config-pc",title:"桌面端",forms:[{text:"",type:"forms",forms:[{text:"功能",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("全文居中","JianShuArticleCenter",true),$("自动展开全文","JianShuAutoExpandFullText",true),$("重定向链接","JianShuAutoJumpRedirect_PC",true,void 0,"自动跳转简书拦截的Url链接")]}]},{text:"屏蔽",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("【屏蔽】底部推荐阅读","JianShuShieldRecommendedReading",false),$("【屏蔽】评论区","JianShuShieldUserComments",false),$("【屏蔽】相关文章","JianShuShieldRelatedArticles",false),$("【屏蔽】客户端弹窗","jianshu-shieldClientDialog",true,void 0,"弹出的【扫码安装简书客户端 畅享全文阅读体验】"),$("【屏蔽】顶部导航栏","jianshu-shieldTopNav",false),$("【屏蔽】底部工具栏","jianshu-shieldBottomToolbar",false,void 0,"屏蔽掉底部悬浮的评论输入框、评论、点赞...")]}]},{text:"劫持/拦截",type:"deepMenu",forms:[{text:"",type:"forms",forms:[$("拦截-剪贴板","JianShuRemoveClipboardHijacking",true,void 0,"去除禁止复制")]}]}]}]};re.addContentConfig([Ue,Ge,Fe]);v.init();let we=b.isPhone(),Y="change_env_set",J=ee(Y);ve.add({key:Y,text:`⚙ 自动: ${we?"移动端":"PC端"}`,autoReload:false,isStoreValue:false,showText(e){return J==null?e:e+` 手动: ${J==1?"移动端":J==2?"PC端":"未知"}`},callback:()=>{let e=[0,1,2],t=window.prompt(`请输入当前脚本环境判定

自动判断: 0
移动端: 1
PC端: 2`,"0");if(!t)return;let n=parseInt(t);if(isNaN(n)){w.error("输入的不是规范的数字");return}if(!e.includes(n)){w.error("输入的值必须是0或1或2");return}n==0?X(Y):ce(Y,n);}});J!=null?(p.info(`手动判定为${J===1?"移动端":"PC端"}`),J==1?be.init():J==2?Z.init():(w.error("意外，手动判定的值不在范围内"),X(Y))):we?(p.info("自动判定为移动端"),be.init()):(p.info("自动判定为PC端"),Z.init());

})(Qmsg, DOMUtils, Utils, pops);
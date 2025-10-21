// ==UserScript==
// @name         网页调试
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2025.10.21
// @author       WhiteSevs
// @description  内置多种网页调试工具，包括：Eruda、vConsole、PageSpy、Chii，可在设置菜单中进行详细配置
// @license      GPL-3.0-only
// @icon         data:image/png;base64,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
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*/*
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@86be74b83fca4fa47521cded28377b35e1d7d2ac/lib/CoverUMD/index.js
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@734ba267afee2a5995d15dc419e754a19532cbf4/lib/Eruda/index.js
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@9f63667d501ec8df5bdb4af680f37793f393754f/lib/VConsole/index.js
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@b2f37e0ef04aafbccbdbd52733f795c2076acd87/lib/PageSpy/index.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.9.4/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.7.4/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@2.6.0/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.5.0/dist/index.umd.min.js
// @resource     Resource_erudaBenchmark       https://fastly.jsdelivr.net/npm/eruda-benchmark@2.0.1
// @resource     Resource_erudaCode            https://fastly.jsdelivr.net/npm/eruda-code@2.2.0
// @resource     Resource_erudaFeatures        https://fastly.jsdelivr.net/npm/eruda-features@2.1.0
// @resource     Resource_erudaGeolocation     https://fastly.jsdelivr.net/gh/WhiteSevs/eruda-geolocation@38b60386bcb6280de4cccac7b31169a2abdb2edf/eruda-geolocation.js
// @resource     Resource_erudaMonitor         https://fastly.jsdelivr.net/npm/eruda-monitor@1.1.2
// @resource     Resource_erudaOrientation     https://fastly.jsdelivr.net/npm/eruda-orientation@2.1.1
// @resource     Resource_erudaOutlinePlugin   https://fastly.jsdelivr.net/npm/eruda-outline-plugin@0.0.5
// @resource     Resource_erudaPixel           https://fastly.jsdelivr.net/npm/eruda-pixel@1.0.13
// @resource     Resource_erudaTiming          https://fastly.jsdelivr.net/npm/eruda-timing@2.0.1
// @resource     Resource_erudaTouches         https://fastly.jsdelivr.net/npm/eruda-touches@2.1.0
// @resource     Resource_erudaVue             https://fastly.jsdelivr.net/npm/eruda-vue@1.1.1
// @resource     Resource_vConsoleVueDevtools  https://fastly.jsdelivr.net/npm/vue-vconsole-devtools@1.0.9
// @connect      *
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_setValues
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function (A, B, X, he) {
  'use strict';

  var ve=typeof GM_deleteValue<"u"?GM_deleteValue:void 0,I=typeof GM_getResourceText<"u"?GM_getResourceText:void 0,se=typeof GM_getValue<"u"?GM_getValue:void 0,le=typeof GM_info<"u"?GM_info:void 0,pe=typeof GM_listValues<"u"?GM_listValues:void 0,Te=typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0,Ee=typeof GM_setClipboard<"u"?GM_setClipboard:void 0,_e=typeof GM_setValue<"u"?GM_setValue:void 0,we=typeof GM_setValues<"u"?GM_setValues:void 0,De=typeof GM_unregisterMenuCommand<"u"?GM_unregisterMenuCommand:void 0,Le=typeof GM_xmlhttpRequest<"u"?GM_xmlhttpRequest:void 0,W=typeof unsafeWindow<"u"?unsafeWindow:void 0,Me=window;const re={waitRemove(...e){e.forEach(a=>{typeof a=="string"&&B.waitNodeList(a).then(o=>{o.forEach(n=>n.remove());});});},createBlockCSSNode(...e){let a=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(o=>{Array.isArray(o)?a=a.concat(o):a.push(o);}),B.createElement("style",{type:"text/css",innerHTML:`${a.join(`,
`)}{display: none !important;}`})},addBlockCSS(...e){let a=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(o=>{Array.isArray(o)?a=a.concat(o):a.push(o);}),Se(`${a.join(`,
`)}{display: none !important;}`)},setGMResourceCSS(e){const a=typeof I=="function"?I(e.keyName):null;return typeof a=="string"&&a?Se(a):re.loadStyleLink(e.url)},async loadStyleLink(e){let a=document.createElement("link");return a.rel="stylesheet",a.type="text/css",a.href=e,new Promise(o=>{B.ready(()=>{document.head.appendChild(a),o(a);});})},async loadScript(e){let a=document.createElement("script");return a.src=e,new Promise(o=>{a.onload=()=>{o(null);},(document.head||document.documentElement).appendChild(a);})},fixUrl(e){return e=e.trim(),e.startsWith("data:")||e.match(/^http(s|):\/\//i)?e:e.startsWith("//")?(e.startsWith("///")||(e=window.location.protocol+e),e):(e.startsWith("/")||(e+="/"),e=window.location.origin+e,e)},fixHttps(e){if(e.startsWith("https://")||!e.startsWith("http://"))return e;try{let a=new URL(e);return a.protocol="https:",a.toString()}catch{return e}},lockScroll(...e){let a=document.createElement("style");a.innerHTML=`
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;let o=[document.documentElement,document.body].concat(...e||[]);return o.forEach(n=>{n.classList.add("pops-overflow-hidden-important");}),(document.head||document.documentElement).appendChild(a),{recovery(){o.forEach(n=>{n.classList.remove("pops-overflow-hidden-important");}),a.remove();}}},async getClipboardText(){function e(n){navigator.clipboard.readText().then(r=>{n(r);}).catch(r=>{N.error("读取剪贴板内容失败👉",r),n("");});}function a(n){navigator.permissions.query({name:"clipboard-read"}).then(r=>{e(n);}).catch(r=>{N.error("申请剪贴板权限失败，尝试直接读取👉",r.message??r.name??r.stack),e(n);});}function o(){return !(typeof navigator?.clipboard?.readText!="function"||typeof navigator?.permissions?.query!="function")}return new Promise(n=>{if(!o()){n("");return}document.hasFocus()?a(n):window.addEventListener("focus",()=>{a(n);},{once:true});})},escapeHtml(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/©/g,"&copy;").replace(/®/g,"&reg;").replace(/™/g,"&trade;").replace(/→/g,"&rarr;").replace(/←/g,"&larr;").replace(/↑/g,"&uarr;").replace(/↓/g,"&darr;").replace(/—/g,"&mdash;").replace(/–/g,"&ndash;").replace(/…/g,"&hellip;").replace(/ /g,"&nbsp;").replace(/\r\n/g,"<br>").replace(/\r/g,"<br>").replace(/\n/g,"<br>").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},interval(e,a,o=5e3){let n,r=o-a,s=a,i=async f=>{let c=await e(f);if(typeof c=="boolean"&&!c||f){S.workerClearTimeout(n);return}if(s+=a,s>r){i(true);return}n=S.workerSetTimeout(()=>{i(false);},a);};i(false);},findParentNode(e,a,o){if(o){let n=B.closest(e,o);if(n)return n.querySelector(a)}else return B.matches(e,a)?e:B.closest(e,a)},toStr(e){const a="__undefined__placeholder__replaced__str__";return JSON.stringify(e,(n,r)=>r===void 0?a:r,2).replace(new RegExp(`"${a}"`,"g"),"undefined")}},ee={qmsg_config_position:{key:"qmsg-config-position",defaultValue:"bottom"},qmsg_config_maxnums:{key:"qmsg-config-maxnums",defaultValue:3},qmsg_config_showreverse:{key:"qmsg-config-showreverse",defaultValue:false}},S=X.noConflict(),C=B.noConflict(),q=he,N=new S.Log(le,W.console||Me.console);let be=le?.script?.name||void 0;const Ae=he.config.Utils.AnyTouch(),Pe=false;N.config({debug:false,logMaxCount:250,autoClearConsole:true,tag:true});A.config({isHTML:true,autoClose:true,showClose:false,consoleLogContent(e){const a=e.getSetting().type;if(a==="loading")return  false;const o=e.getSetting().content;return a==="warning"?N.warn(o):a==="error"?N.error(o):N.info(o),true},get position(){return l.getValue(ee.qmsg_config_position.key,ee.qmsg_config_position.defaultValue)},get maxNums(){return l.getValue(ee.qmsg_config_maxnums.key,ee.qmsg_config_maxnums.defaultValue)},get showReverse(){return l.getValue(ee.qmsg_config_showreverse.key,ee.qmsg_config_showreverse.defaultValue)},get zIndex(){let e=X.getMaxZIndex(),a=he.config.InstanceUtils.getPopsMaxZIndex().zIndex;return X.getMaxValue(e,a)+100}});q.GlobalConfig.setGlobalConfig({zIndex:()=>{let e=X.getMaxZIndex(void 0,void 0,o=>{if(o?.classList?.contains("qmsg-shadow-container")||o?.closest("qmsg")&&o.getRootNode()instanceof ShadowRoot)return  false}),a=he.config.InstanceUtils.getPopsMaxZIndex().zIndex;return X.getMaxValue(e,a)+100},mask:{enable:true,clickEvent:{toClose:false,toHide:false}},drag:true});const te=new S.GM_Menu({GM_getValue:se,GM_setValue:_e,GM_registerMenuCommand:Te,GM_unregisterMenuCommand:De}),Ce=new S.Httpx({xmlHttpRequest:Le,logDetails:Pe});Ce.interceptors.request.use(e=>e);Ce.interceptors.response.use(void 0,e=>(N.error("拦截器-请求错误",e),e.type==="onabort"?A.warning("请求取消",{consoleLogContent:true}):e.type==="onerror"?A.error("请求异常",{consoleLogContent:true}):e.type==="ontimeout"?A.error("请求超时",{consoleLogContent:true}):A.error("其它错误",{consoleLogContent:true}),e));W.Object.defineProperty,W.Function.prototype.apply,W.Function.prototype.call,W.Element.prototype.appendChild,W.setTimeout;const Se=C.addStyle.bind(C);B.selector.bind(B);B.selectorAll.bind(B);new S.GM_Cookie;const ge="GM_Panel",Re="data-init",ae="data-key",oe="data-default-value",Ie="data-init-more-value",z="data-storage-api",H={followBrowserSize:false,get width(){return H.followBrowserSize?globalThis.outerWidth:globalThis.innerWidth},get height(){return H.followBrowserSize?globalThis.outerHeight:globalThis.innerHeight}},F={setting:{get width(){return H.width<550?"88vw":H.width<700?"550px":"700px"},get height(){return H.height<450?"70vh":H.height<550?"450px":"550px"}},settingMiddle:{get width(){return H.width<350?"88vw":"350px"}},info:{get width(){return H.width<350?"88vw":"350px"},get height(){return H.height<250?"88vh":"250px"}}};class Oe{storageKey;listenerData;constructor(a){if(typeof a=="string"){const o=a.trim();if(o=="")throw new Error("key参数不能为空字符串");this.storageKey=o;}else throw new Error("key参数类型错误，必须是字符串");this.listenerData=new X.Dictionary,this.getLocalValue=this.getLocalValue.bind(this),this.set=this.set.bind(this),this.get=this.get.bind(this),this.getAll=this.getAll.bind(this),this.delete=this.delete.bind(this),this.has=this.has.bind(this),this.keys=this.keys.bind(this),this.values=this.values.bind(this),this.clear=this.clear.bind(this),this.addValueChangeListener=this.addValueChangeListener.bind(this),this.removeValueChangeListener=this.removeValueChangeListener.bind(this),this.triggerValueChangeListener=this.triggerValueChangeListener.bind(this);}getLocalValue(){let a=se(this.storageKey);return a==null&&(a={},this.setLocalValue(a)),a}setLocalValue(a){_e(this.storageKey,a);}set(a,o){const n=this.get(a),r=this.getLocalValue();Reflect.set(r,a,o),this.setLocalValue(r),this.triggerValueChangeListener(a,n,o);}get(a,o){const n=this.getLocalValue();return Reflect.get(n,a)??o}getAll(){return this.getLocalValue()}delete(a){const o=this.get(a),n=this.getLocalValue();Reflect.deleteProperty(n,a),this.setLocalValue(n),this.triggerValueChangeListener(a,o,void 0);}has(a){const o=this.getLocalValue();return Reflect.has(o,a)}keys(){const a=this.getLocalValue();return Reflect.ownKeys(a)}values(){const a=this.getLocalValue();return Reflect.ownKeys(a).map(o=>Reflect.get(a,o))}clear(){ve(this.storageKey);}addValueChangeListener(a,o){const n=Math.random(),r=this.listenerData.get(a)||[];return r.push({id:n,key:a,callback:o}),this.listenerData.set(a,r),n}removeValueChangeListener(a){let o=false;for(const[n,r]of this.listenerData.entries()){for(let s=0;s<r.length;s++){const i=r[s];(typeof a=="string"&&i.key===a||typeof a=="number"&&i.id===a)&&(r.splice(s,1),s--,o=true);}this.listenerData.set(n,r);}return o}async triggerValueChangeListener(...a){const[o,n,r]=a;if(!this.listenerData.has(o))return;let s=this.listenerData.get(o);for(let i=0;i<s.length;i++){const f=s[i];if(typeof f.callback=="function"){let c=this.get(o),d,u;typeof n<"u"&&a.length>=2?u=n:u=c,typeof r<"u"&&a.length>2?d=r:d=c,await f.callback(o,u,d);}}}}const Z=new Oe(ge),fe={$data:{__contentConfig:null,get contentConfig(){return this.__contentConfig==null&&(this.__contentConfig=new S.Dictionary),this.__contentConfig},__defaultBottomContentConfig:[]},addContentConfig(e){Array.isArray(e)||(e=[e]);let a=this.$data.contentConfig.keys().length;this.$data.contentConfig.set(a,e);},getAllContentConfig(){return this.$data.contentConfig.values().flat()},getConfig(e=0){return this.$data.contentConfig.get(e)??[]},getDefaultBottomContentConfig(){if(this.$data.__defaultBottomContentConfig.length)return this.$data.__defaultBottomContentConfig;let e=false,a;const o=(s,i)=>{typeof i!="string"&&(i=re.toStr(i));const f=new Blob([i]),c=globalThis.URL.createObjectURL(f);C.createElement("a",{href:c,download:s}).click(),S.workerSetTimeout(()=>{globalThis.URL.revokeObjectURL(c);},500);},n=()=>{const s=m=>{const g=q.alert({title:{text:"请选择导入方式",position:"center"},content:{text:`
            <div class="btn-control" data-mode="local">本地导入</div>
            <div class="btn-control" data-mode="network">网络导入</div>
            <div class="btn-control" data-mode="clipboard">剪贴板导入</div>`,html:true},btn:{ok:{enable:false},close:{enable:true,callback(R,h){R.close();}}},drag:true,mask:{enable:true},width:F.info.width,height:F.info.height,style:`
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
          }`}),v=g.$shadowRoot.querySelector(".btn-control[data-mode='local']"),w=g.$shadowRoot.querySelector(".btn-control[data-mode='network']"),L=g.$shadowRoot.querySelector(".btn-control[data-mode='clipboard']"),$=async R=>{confirm("是否清空脚本存储的配置？（如果点击取消按钮，则仅做配置覆盖处理）")&&(typeof pe=="function"?typeof ve=="function"?(pe().forEach(_=>{ve(_);}),A.success("已清空脚本存储的配置")):A.error("不支持GM_deleteValue函数，无法执行删除脚本配置"):A.error("不支持GM_listValues函数，无法清空脚本存储的配置")),typeof we=="function"?we(R):Object.keys(R).forEach(_=>{const b=R[_];_e(_,b);}),A.success("配置导入完毕");},M=R=>new Promise(async h=>{const p=S.toJSON(R);Object.keys(p).length===0?A.warning("解析为空配置，不导入"):await $(p),h(true);});C.on(v,"click",R=>{C.preventEvent(R),g.close();const h=C.createElement("input",{type:"file",accept:".json"});C.on(h,["propertychange","input"],p=>{if(!h.files?.length)return;const _=h.files[0],b=new FileReader;b.onload=()=>{M(b.result);},b.readAsText(_,"UTF-8");}),h.click();}),C.on(w,"click",R=>{C.preventEvent(R),g.close();const h=q.prompt({title:{text:"网络导入",position:"center"},content:{text:"",placeholder:"请填写URL",focus:true},btn:{close:{enable:true,callback(b,P){b.close();}},ok:{text:"导入",callback:async(b,P)=>{const E=b.text;if(S.isNull(E)){A.error("请填入完整的url");return}const k=A.loading("正在获取配置..."),x=await Ce.get(E,{allowInterceptConfig:false});if(k.close(),!x.status){N.error(x),A.error("获取配置失败",{consoleLogContent:true});return}await M(x.data.responseText)&&b.close();}},cancel:{enable:false}},drag:true,mask:{enable:true},width:F.info.width,height:"auto"}),p=h.$shadowRoot.querySelector("input"),_=h.$shadowRoot.querySelector(".pops-prompt-btn-ok");C.on(p,["input","propertychange"],b=>{C.val(p)===""?C.attr(_,"disabled","true"):C.removeAttr(_,"disabled");}),C.listenKeyboard(p,"keydown",(b,P,E)=>{b==="Enter"&&E.length===0&&C.val(p)!==""&&C.trigger(_,"click");}),C.trigger(p,"input");}),C.on(L,"click",async R=>{C.preventEvent(R),g.close();let h=await re.getClipboardText();if(h.trim()===""){A.warning("获取到的剪贴板内容为空");return}await M(h);});},i=(m=`${be}_panel-setting-${S.formatTime(Date.now(),"yyyy_MM_dd_HH_mm_ss")}.json`,g)=>{const v=q.alert({title:{text:"请选择导出方式",position:"center"},content:{text:`
            <div class="btn-control" data-mode="export-to-file">导出至文件</div>
            <div class="btn-control" data-mode="export-to-clipboard">导出至剪贴板</div>
            `,html:true},btn:{ok:{enable:false},close:{enable:true,callback($,M){$.close();}}},drag:true,mask:{enable:true},width:F.info.width,height:F.info.height,style:`
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
          }`}),w=v.$shadowRoot.querySelector(".btn-control[data-mode='export-to-file']"),L=v.$shadowRoot.querySelector(".btn-control[data-mode='export-to-clipboard']");C.on(w,"click",$=>{C.preventEvent($);try{o(m,g),v.close();}catch(M){A.error(M.toString(),{consoleLogContent:true});}}),C.on(L,"click",async $=>{await S.copy(g)?(A.success("复制成功"),v.close()):A.error("复制失败");});},c=q.confirm({title:{text:"配置",position:"center"},content:{text:`
            <textarea name="config-value" id="config" readonly></textarea>
          `,html:true},btn:{ok:{enable:true,type:"primary",text:"导入",callback(m,g){s();}},cancel:{enable:true,text:"导出",callback(m,g){i(void 0,u);}}},width:H.width<450?"90vw":"450px",height:"auto",style:`
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
        `}).$shadowRoot.querySelector("textarea"),d={};if(typeof pe=="function")pe().forEach(g=>{const v=se(g);Reflect.set(d,g,v);});else {A.warning("不支持函数GM_listValues，仅导出菜单配置");const m=se(ge);Reflect.set(d,ge,m);}const u=re.toStr(d);c.value=u;},r=()=>{let s=le?.script?.supportURL||le?.script?.namespace;typeof s=="string"&&S.isNotNull(s)&&window.open(s,"_blank");};return [{id:"script-version",title:`版本：${le?.script?.version||"未知"}`,isBottom:true,forms:[],clickFirstCallback(){return  false},afterRender(s){new Ae(s.$asideLiElement).on("tap",function(f){clearTimeout(a),a=void 0,e?(e=false,n()):(a=setTimeout(()=>{e=false,r();},200),e=true);});}}]},setDefaultBottomContentConfig(e){this.$data.__defaultBottomContentConfig=e;}},Ne={$data:{__menuOption:[{key:"show_pops_panel_setting",text:"⚙ 设置",autoReload:false,isStoreValue:false,showText(e){return e},callback:()=>{l.showPanel(fe.getConfig(0));}}],get menuOption(){return this.__menuOption}},init(){this.initExtensionsMenu();},initExtensionsMenu(){l.isTopWindow()&&te.add(this.$data.menuOption);},addMenuOption(e){Array.isArray(e)||(e=[e]),this.$data.menuOption.push(...e);},updateMenuOption(e){Array.isArray(e)||(e=[e]),e.forEach(a=>{let o=this.$data.menuOption.findIndex(n=>n.key===a.key);o!==-1&&(this.$data.menuOption[o]=a);});},getMenuOption(e=0){return this.$data.menuOption[e]},deleteMenuOption(e=0){this.$data.menuOption.splice(e,1);}},l={$data:{__contentConfigInitDefaultValue:null,__onceExecMenuData:null,__urlChangeReloadMenuExecOnce:null,__onceExecData:null,__panelConfig:{},$panel:null,panelContent:[],get contentConfigInitDefaultValue(){return this.__contentConfigInitDefaultValue==null&&(this.__contentConfigInitDefaultValue=new S.Dictionary),this.__contentConfigInitDefaultValue},contentConfigInitDisabledKeys:[],get onceExecMenuData(){return this.__onceExecMenuData==null&&(this.__onceExecMenuData=new S.Dictionary),this.__onceExecMenuData},get urlChangeReloadMenuExecOnce(){return this.__urlChangeReloadMenuExecOnce==null&&(this.__urlChangeReloadMenuExecOnce=new S.Dictionary),this.__urlChangeReloadMenuExecOnce},get onceExecData(){return this.__onceExecData==null&&(this.__onceExecData=new S.Dictionary),this.__onceExecData},get scriptName(){return be},get panelConfig(){return this.__panelConfig},set panelConfig(e){this.__panelConfig=e;},key:ge,attributeKeyName:ae,attributeDefaultValueName:oe},init(){this.initContentDefaultValue(),Ne.init();},isTopWindow(){return W.top===W.self},initContentDefaultValue(){const e=n=>{if(!n.attributes||n.type==="button"||n.type==="forms"||n.type==="deepMenu")return;const r=n.attributes;let s=r[Re];if(typeof s=="function"){let d=s();if(typeof d=="boolean"&&!d)return}let i=new Map,f=r[ae];if(f!=null){const d=r[oe];i.set(f,d);}let c=r[Ie];if(typeof c=="object"&&c&&Object.keys(c).forEach(d=>{i.set(d,c[d]);}),!i.size){N.warn(["请先配置键",n]);return}if(n.type==="switch"){let d=typeof n.disabled=="function"?n.disabled():n.disabled;typeof d=="boolean"&&d&&this.$data.contentConfigInitDisabledKeys.push(...i.keys());}for(const[d,u]of i.entries())this.setDefaultValue(d,u);},a=n=>{for(let r=0;r<n.length;r++){let s=n[r];e(s);let i=s.forms;i&&Array.isArray(i)&&a(i);}},o=[...fe.getAllContentConfig()];for(let n=0;n<o.length;n++){let r=o[n];if(!r.forms)continue;const s=r.forms;s&&Array.isArray(s)&&a(s);}this.$data.contentConfigInitDisabledKeys=[...new Set(this.$data.contentConfigInitDisabledKeys)];},setDefaultValue(e,a){this.$data.contentConfigInitDefaultValue.has(e)&&N.warn("请检查该key(已存在): "+e),this.$data.contentConfigInitDefaultValue.set(e,a);},getDefaultValue(e){return this.$data.contentConfigInitDefaultValue.get(e)},setValue(e,a){Z.set(e,a);},getValue(e,a){const o=Z.get(e);return o??(this.$data.contentConfigInitDefaultValue.has(e)?this.$data.contentConfigInitDefaultValue.get(e):a)},deleteValue(e){Z.delete(e);},hasKey(e){return Z.has(e)},addValueChangeListener(e,a){return Z.addValueChangeListener(e,(n,r,s)=>{a(e,s,r);})},removeValueChangeListener(e){Z.removeValueChangeListener(e);},triggerMenuValueChange(e,a,o){Z.triggerValueChangeListener(e,o,a);},async exec(e,a,o,n=true){const r=this;let s;typeof e=="string"||Array.isArray(e)?s=()=>e:s=e;let i=false;const f=s();let c=[];Array.isArray(f)?(i=true,c=f):c.push(f);const d=c.find(_=>!this.$data.contentConfigInitDefaultValue.has(_));if(d){N.warn(`${d} 键不存在`);return}const u=JSON.stringify(c);if(n&&this.$data.onceExecMenuData.has(u))return this.$data.onceExecMenuData.get(u);let m=[];const g=[];let v=[];const w=(_,b)=>{let P=[],E=[],k=[];if(Array.isArray(b))k=k.concat(b);else if(typeof b=="object"&&b!=null)if(b instanceof Element)k.push(b);else {const{$css:x,destory:D}=b;x!=null&&(Array.isArray(x)?k=k.concat(x):k.push(x)),typeof D=="function"&&k.push(D);}else k.push(b);for(const x of k)if(x!=null){if(x instanceof Element){P.push(x);continue}if(typeof x=="function"){v.push(x);continue}}_?(m=m.concat(P),v=v.concat(E)):($(),M());},L=_=>!!this.getValue(_),$=()=>{for(let _=0;_<m.length;_++)m[_]?.remove(),m.splice(_,1),_--;},M=()=>{for(let _=0;_<v.length;_++){const b=v[_];b(),v.splice(_,1),_--;}},R=()=>{let _=false;return typeof o=="function"?_=o(c):_=c.every(b=>L(b)),_},h=async _=>{if(R()){const P=c.map(k=>this.getValue(k)),E=await a({value:i?P:P[0],addStoreValue:(...k)=>w(true,k)});w(true,E);}else w(false,[]);};n&&c.forEach(_=>{const b=this.addValueChangeListener(_,(P,E,k)=>h());g.push(b);}),await h();const p={reload(){this.clearStoreStyleElements(),this.destory(),h();},clear(){this.clearStoreStyleElements(),this.destory(),this.removeValueChangeListener(),this.clearOnceExecMenuData();},clearStoreStyleElements:()=>$(),destory(){return M()},removeValueChangeListener:()=>{g.forEach(_=>{this.removeValueChangeListener(_);});},clearOnceExecMenuData(){n&&r.$data.onceExecMenuData.delete(u);}};return this.$data.onceExecMenuData.set(u,p),p},async execMenu(e,a,o=false,n=false){return await this.exec(e,async r=>await a(r),r=>r.every(i=>{let f=!!this.getValue(i);return l.$data.contentConfigInitDisabledKeys.includes(i)&&(f=false,N.warn(`.execMenu${n?"Once":""} ${i} 被禁用`)),o&&(f=!f),f}),n)},async execMenuOnce(e,a,o=false,n=false){const r=await this.execMenu(e,a,o,true);if(n&&r){const s=()=>{r.reload();};this.removeUrlChangeWithExecMenuOnceListener(e),this.addUrlChangeWithExecMenuOnceListener(e,s);}return r},deleteExecMenuOnce(e){return e=this.transformKey(e),this.$data.onceExecMenuData.delete(e),this.$data.urlChangeReloadMenuExecOnce.delete(e),Z.removeValueChangeListener(e)},onceExec(e,a){if(e=this.transformKey(e),typeof e!="string")throw new TypeError("key 必须是字符串");this.$data.onceExecData.has(e)||(a(),this.$data.onceExecData.set(e,1));},deleteOnceExec(e){e=this.transformKey(e),this.$data.onceExecData.delete(e);},addUrlChangeWithExecMenuOnceListener(e,a){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.set(e,a);},removeUrlChangeWithExecMenuOnceListener(e){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.delete(e);},hasUrlChangeWithExecMenuOnceListener(e){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.has(e)},async triggerUrlChangeWithExecMenuOnceEvent(e){const a=this.$data.urlChangeReloadMenuExecOnce.values();for(const o of a)await o(e);},showPanel(e,a=`${be}-设置`,o=false,n=false){this.$data.$panel=null,this.$data.panelContent=[];let r=e.findIndex(i=>(typeof i.isBottom=="function"?i.isBottom():!!i.isBottom)&&i.id==="script-version")!==-1;!o&&!r&&e.push(...fe.getDefaultBottomContentConfig());let s=q.panel({title:{text:a,position:"center",html:false,style:""},content:e,btn:{close:{enable:true,callback:(i,f)=>{i.close(),this.$data.$panel=null;}}},mask:{enable:true,clickEvent:{toClose:true,toHide:false},clickCallBack:(i,f)=>{i(),this.$data.$panel=null;}},width:F.setting.width,height:F.setting.height,drag:true,only:true,...this.$data.panelConfig});this.$data.$panel=s,this.$data.panelContent=e,n||this.registerConfigSearch({$panel:s,content:e});},registerConfigSearch(e){const{$panel:a,content:o}=e,n=async(g,v)=>{if(g==null)return;const w=await v(g);return w&&typeof w.isFind=="boolean"&&w.isFind?w.data:await n(w.data,v)},r=(g,v)=>{const w=new IntersectionObserver(L=>{L.forEach($=>{$.isIntersecting&&(v?.(),w.disconnect());});},{root:null,threshold:1});w.observe(g),g.scrollIntoView({behavior:"smooth",block:"center"});},s=g=>{const v="pops-flashing";C.animationend(g,()=>{g.classList.remove(v);}),g.classList.add(v);},i=g=>{if(g.type==="dblclick"&&m)return;C.preventEvent(g),c=null;const v=q.alert({title:{text:"搜索配置",position:"center"},content:{text:`
						<div class="search-wrapper">
							<input class="search-config-text" name="search-config" type="text" placeholder="请输入需要搜素的配置名称">
						</div>
						<div class="search-result-wrapper"></div>
					`,html:true},btn:{ok:{enable:false}},mask:{clickEvent:{toClose:true}},width:F.settingMiddle.width,height:"auto",drag:true,style:`
					${q.config.cssText.panelCSS}

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
				`});v.$shadowRoot.querySelector(".search-wrapper");const w=v.$shadowRoot.querySelector(".search-config-text"),L=v.$shadowRoot.querySelector(".search-result-wrapper");w.focus();const $=()=>{C.empty(L);},M=h=>{const p=S.queryProperty(h,b=>b?.next?{isFind:false,data:b.next}:{isFind:true,data:b}),_=C.createElement("div",{className:"search-result-item",innerHTML:`
							<div class="search-result-item-path">${p.matchedData?.path}</div>
							<div class="search-result-item-description">${p.matchedData?.description??""}</div>
						`});return C.on(_,"click",b=>{const E=a.$shadowRoot.querySelectorAll("aside.pops-panel-aside .pops-panel-aside-top-container li")[h.index];if(!E){A.error(`左侧项下标${h.index}不存在`);return}E.scrollIntoView({behavior:"smooth",block:"center"}),E.click(),n(h.next,async k=>{if(k?.next){const x=await C.waitNode(()=>Array.from(a.$shadowRoot.querySelectorAll(".pops-panel-deepMenu-nav-item")).find(D=>{const j=Reflect.get(D,"__formConfig__");return typeof j=="object"&&j!=null&&j.text===k.name}),2500);if(x)x.click();else return A.error("未找到对应的二级菜单"),{isFind:true,data:k};return {isFind:false,data:k.next}}else {const x=await C.waitNode(()=>Array.from(a.$shadowRoot.querySelectorAll("li:not(.pops-panel-deepMenu-nav-item)")).find(D=>Reflect.get(D,"__formConfig__")===k.matchedData?.formConfig),2500);if(x){r(x);const D=x.closest(".pops-panel-forms-fold[data-fold-enable]");D&&(D.querySelector(".pops-panel-forms-fold-container").click(),await S.sleep(500)),r(x,()=>{s(x);});}else A.error("未找到对应的菜单项");return {isFind:true,data:k}}});}),_},R=h=>{const p=new RegExp(h,"i"),_=[],b=(E,k)=>{for(let x=0;x<E.length;x++){const D=E[x],j=D.forms;if(j&&Array.isArray(j)){const ne=S.deepClone(k);if(D.type==="deepMenu"){const de=S.queryProperty(ne,Y=>Y?.next?{isFind:false,data:Y.next}:{isFind:true,data:Y});de.next={name:D.text};}b(j,ne);}else {const ne=Reflect.get(D,"text"),de=Reflect.get(D,"description"),Y=[ne,de],Ve=Y.findIndex(Q=>{if(typeof Q=="string")return Q.match(p)});if(Ve!==-1){const Q=S.deepClone(k),ke=S.queryProperty(Q,J=>J?.next?{isFind:false,data:J.next}:{isFind:true,data:J});ke.next={name:ne,matchedData:{path:"",formConfig:D,matchedText:Y[Ve],description:de}};const xe=[];S.queryProperty(Q,J=>{const ye=J?.name;return typeof ye=="string"&&ye.trim()!==""&&xe.push(ye),J?.next?{isFind:false,data:J.next}:{isFind:true,data:J}});const $e=xe.join(re.escapeHtml(" - "));ke.next.matchedData.path=$e,_.push(Q);}}}};for(let E=0;E<o.length;E++){const k=o[E];if(!k.forms||k.isBottom&&k.id==="script-version")continue;const x=k.forms;if(x&&Array.isArray(x)){let D=k.title;typeof D=="function"&&(D=D()),b(x,{index:E,name:D});}}const P=document.createDocumentFragment();for(const E of _){let k=M(E);P.appendChild(k);}$(),L.append(P);};C.on(w,"input",S.debounce(h=>{C.preventEvent(h);let p=C.val(w).trim();if(p===""){$();return}R(p);},200));};a.$shadowRoot.querySelectorAll("aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)").forEach(g=>{C.on(g,"dblclick",i);});let c=null,d=false,u,m=false;C.on(a.$shadowRoot,"touchend","aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)",(g,v)=>{m=true,clearTimeout(u),u=void 0,d&&c===v?(d=false,c=null,i(g)):(u=setTimeout(()=>{d=false;},200),d=true,c=v);},{capture:true}),a.$shadowRoot.appendChild(C.createElement("style",{type:"text/css",textContent:`
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
				`}));},transformKey(e){if(Array.isArray(e)){const a=e.sort();return JSON.stringify(a)}else return e}},U=W,V=U.console,Ue=Ee||S.copy.bind(S),G={evalPlugin:(...e)=>{if(e.length===0)return;const a=e.join(`
`);return U.eval(`
(()=>{
	try{
		var exports=void 0;
	}catch(error){
		console.warn(error);
	}

	try{
		var module=void 0;
	}catch(error){
		console.warn(error);
	}

	try{
		var define=void 0;
	}catch(error){
		console.warn(error);
	}
		
	${a}
		
})()
`)}},Ge=`{
  "eruda": {
    "version": "3.4.3",
    "plugin": {
      "eruda-monitor": "1.1.2",
      "eruda-features": "2.1.0",
      "eruda-timing": "2.0.1",
      "eruda-code": "2.2.0",
      "eruda-benchmark": "2.0.1",
      "eruda-orientation": "2.1.1",
      "eruda-vue": "1.1.1",
      "eruda-touches": "2.1.0",
      "eruda-outline-plugin": "0.0.5",
      "eruda-pixel": "1.0.13"
    }
  },
  "vconsole": {
    "version": "3.15.1",
    "plugin": {
      "vue-vconsole-devtools": "1.0.9"
    }
  },
  "@huolala-tech/page-spy-browser": {
    "version": "2.2.8"
  }
}`,O=JSON.parse(Ge),T={eruda:{version:O.eruda.version,homeUrl:"https://github.com/liriliri/eruda",settingDocUrl:"https://github.com/liriliri/eruda/blob/master/README.md"},vConsole:{version:O.vconsole.version,homeUrl:"https://github.com/Tencent/vConsole",settingDocUrl:"https://github.com/Tencent/vConsole/blob/dev/README_CN.md"},pageSpy:{version:O["@huolala-tech/page-spy-browser"].version,homeUrl:"https://github.com/HuolalaTech/page-spy-web",settingDocUrl:"https://github.com/HuolalaTech/page-spy-web/blob/main/README_ZH.md",defaultConfig:{api:"pagespy.jikejishu.com",cliennOrigin:"https://pagespy.jikejishu.com"}},chii:{settingDocUrl:"https://github.com/liriliri/chii/blob/master/README_CN.md",defaultConfig:{url:"https://chii.liriliri.io/",scriptJs:"//chii.liriliri.io/target.js"}}},t={debugTool:{key:"currentDebug",defaultValue:"eruda"},allowRunInIframe:{key:"allowRunInIframe",defaultValue:false},autoLoadDebugTool:{key:"autoLoadDebugTool",defaultValue:true},eruda_auto_open_panel:{key:"eruda-auto-open-panel",defaultValue:false},eruda_default_show_panel_name:{key:"eruda-default-show-panel-name",defaultValue:"console"},eruda_panel_console:{key:"eruda-panel-console",defaultValue:true},eruda_panel_elements:{key:"eruda-panel-elements",defaultValue:true},eruda_panel_network:{key:"eruda-panel-network",defaultValue:true},eruda_panel_resources:{key:"eruda-panel-resources",defaultValue:true},eruda_panel_sources:{key:"eruda-panel-sources",defaultValue:true},eruda_panel_info:{key:"eruda-panel-info",defaultValue:true},eruda_panel_snippets:{key:"eruda-panel-snippets",defaultValue:true},eruda_plugin_Resource_erudaMonitor:{key:"eruda_plugin_Resource_erudaMonitor",defaultValue:false,resource:"Resource_erudaMonitor"},eruda_plugin_Resource_erudaFeatures:{key:"eruda_plugin_Resource_erudaFeatures",defaultValue:false,resource:"Resource_erudaFeatures"},eruda_plugin_Resource_erudaTiming:{key:"eruda_plugin_Resource_erudaTiming",defaultValue:false,resource:"Resource_erudaTiming"},eruda_plugin_Resource_erudaCode:{key:"eruda_plugin_Resource_erudaCode",defaultValue:false,resource:"Resource_erudaCode"},eruda_plugin_Resource_erudaBenchmark:{key:"eruda_plugin_Resource_erudaBenchmark",defaultValue:false,resource:"Resource_erudaBenchmark"},eruda_plugin_Resource_erudaGeolocation:{key:"eruda_plugin_Resource_erudaGeolocation",defaultValue:false,resource:"Resource_erudaGeolocation"},eruda_plugin_Resource_erudaOrientation:{key:"eruda_plugin_Resource_erudaOrientation",defaultValue:false,resource:"Resource_erudaOrientation"},eruda_plugin_Resource_erudaVue:{key:"eruda_plugin_Resource_erudaVue",defaultValue:false,resource:"Resource_erudaVue"},eruda_plugin_Resource_erudaTouches:{key:"eruda_plugin_Resource_erudaTouches",defaultValue:false,resource:"Resource_erudaTouches"},eruda_plugin_Resource_erudaOutlinePlugin:{key:"eruda_plugin_Resource_erudaOutlinePlugin",defaultValue:false,resource:"Resource_erudaOutlinePlugin"},eruda_plugin_Resource_erudaPixel:{key:"eruda_plugin_Resource_erudaPixel",defaultValue:false,resource:"Resource_erudaPixel"},vconsole_auto_open_panel:{key:"vconsole-auto-open-panel",defaultValue:false},vconsole_default_show_panel_name:{key:"vconsole-default-show-panel-name",defaultValue:"default"},vConsole_panel_system:{key:"vConsole-panel-system",defaultValue:true},vConsole_panel_network:{key:"vConsole-panel-network",defaultValue:true},vConsole_panel_element:{key:"vConsole-panel-element",defaultValue:true},vConsole_panel_storage:{key:"vConsole-panel-storage",defaultValue:true},vConsole_theme:{key:"vConsole-theme",defaultValue:"light"},vconsole_disableLogScrolling:{key:"vconsole-disableLogScrolling",defaultValue:false},vconsole_showTimestamps:{key:"vconsole-showTimestamps",defaultValue:false},vconsole_maxLogNumber:{key:"vconsole-maxLogNumber",defaultValue:1e3},vconsole_maxNetworkNumber:{key:"vconsole-maxNetworkNumber",defaultValue:1e3},vConsole_storage_defaultStorages_cookies:{key:"vConsole-storage-defaultStorages-cookies",defaultValue:true},vConsole_storage_defaultStorages_localStorage:{key:"vConsole-storage-defaultStorages-localStorage",defaultValue:true},vConsole_storage_defaultStorages_sessionStorage:{key:"vConsole-storage-defaultStorages-sessionStorage",defaultValue:true},vConsole_plugin_Resource_vConsole_Stats:{key:"vConsole_plugin_Resource_vConsole_Stats",defaultValue:false},vConsole_plugin_Resource_vConsole_ExportLog:{key:"vConsole_plugin_Resource_vConsole_ExportLog",defaultValue:false},vConsole_plugin_Resource_vConsoleVueDevtools:{key:"vConsole_plugin_Resource_vConsoleVueDevtools",defaultValue:false,resource:"Resource_vConsoleVueDevtools"},pagespy_disable_run_in_debug_client:{key:"pagespy-disable-run-in-debug-client",defaultValue:true},pagespy_api:{key:"pagespy-api",defaultValue:T.pageSpy.defaultConfig.api},pagespy_clientOrigin:{key:"pagespy-clientOrigin",defaultValue:T.pageSpy.defaultConfig.cliennOrigin},pagespy_project:{key:"pagespy-project",defaultValue:"default"},pagespy_title:{key:"pagespy-title",defaultValue:"--"},pagespy_autoRender:{key:"pagespy-autoRender",defaultValue:true},pagespy_enableSSL:{key:"pagespy-enableSSL",defaultValue:true},pagespy_offline:{key:"pagespy-offline",defaultValue:false},pagespy_serializeData:{key:"pagespy-serializeData",defaultValue:false},pagespy_useSecret:{key:"pagespy-useSecret",defaultValue:false},pagespy_messageCapacity:{key:"pagespy-messageCapacity",defaultValue:1e3},chii_script_embedded:{key:"chii-script-embedded",defaultValue:true},chii_disable_run_in_debug_url:{key:"chii-disable-run-in-debug-url",defaultValue:true},chii_check_script_load:{key:"chii-check-script-load",defaultValue:true},chii_debug_url:{key:"chii-debug-url",defaultValue:T.chii.defaultConfig.url},chii_target_js:{key:"chii-target-js",defaultValue:T.chii.defaultConfig.scriptJs},chii_embedded_height_enable:{key:"chii-embedded-height-enable",defaultValue:false},chii_embedded_height:{key:"chii-embedded-height",defaultValue:parseInt((window.innerHeight/2).toString())}},He=()=>{initEruda("Eruda",U);let e=U.Eruda||globalThis.Eruda;if(!e){alert("调试工具【eruda】注册全局失败，请反馈开发者");return}let a=[];if(l.getValue(t.eruda_panel_console.key)&&a.push("console"),l.getValue(t.eruda_panel_elements.key)&&a.push("elements"),l.getValue(t.eruda_panel_network.key)&&a.push("network"),l.getValue(t.eruda_panel_resources.key)&&a.push("resources"),l.getValue(t.eruda_panel_sources.key)&&a.push("sources"),l.getValue(t.eruda_panel_info.key)&&a.push("info"),l.getValue(t.eruda_panel_snippets.key)&&a.push("snippets"),T.eruda.version=e.version,e.init({tool:a}),V.log(`eruda当前版本：${e.version}`),V.log(`eruda项目地址：${T.eruda.homeUrl}`),V.log("eruda的全局变量名: Eruda"),l.getValue(t.eruda_plugin_Resource_erudaMonitor.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaMonitor.resource)),e.add(erudaMonitor);}catch(o){V.error("插件【eruda-monitor】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaFeatures.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaFeatures.resource)),e.add(erudaFeatures);}catch(o){V.error("插件【eruda-features】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaTiming.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaTiming.resource)),e.add(erudaTiming);}catch(o){V.error("插件【eruda-timing】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaCode.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaCode.resource)),e.add(erudaCode);}catch(o){V.error("插件【eruda-code】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaBenchmark.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaBenchmark.resource)),e.add(erudaBenchmark);}catch(o){V.error("插件【eruda-benchmark】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaGeolocation.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaGeolocation.resource)),e.add(erudaGeolocation);}catch(o){V.error("插件【eruda-geolocation】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaOrientation.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaOrientation.resource)),e.add(erudaOrientation);}catch(o){V.error("插件【eruda-orientation】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaTouches.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaTouches.resource)),e.add(erudaTouches);}catch(o){V.error("插件【eruda-touches】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaOutlinePlugin.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaOutlinePlugin.resource)),e.add(erudaOutlinePlugin);}catch(o){V.error("插件【eruda-outline-plugin】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaPixel.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaPixel.resource)),e.add(erudaPixel);}catch(o){V.error("插件【eruda-pixel】加载失败，原因：",o);}if(l.getValue(t.eruda_plugin_Resource_erudaVue.key))try{G.evalPlugin(I(t.eruda_plugin_Resource_erudaVue.resource)),e.add(erudaVue);}catch(o){V.error("插件【eruda-vue】加载失败，原因：",o);}if(l.getValue(t.eruda_auto_open_panel.key)){let o=l.getValue(t.eruda_default_show_panel_name.key,t.eruda_default_show_panel_name.defaultValue);e.show(),setTimeout(()=>{e.show(o);},250);}},Be=(e,a)=>{const o=function(){var r=0,s="vConsole-Plugin-Stats-Position";function i(){return se(s,{top:0,left:0})}function f(h,p){_e(s,{left:h,top:p});}var c=document.createElement("div");let d=i();c.style.cssText=`position:fixed;top:${d.top}px;left:${d.left}px;cursor:pointer;opacity:0.9;z-index:10000`,c.addEventListener("click",function(h){h.preventDefault(),m(++r%c.children.length);},{capture:true});function u(h){return c.appendChild(h.dom),h}function m(h){for(var p=0;p<c.children.length;p++)c.children[p].style.display=p===h?"block":"none";r=h;}function g(){q.config.InstanceUtils.drag(c,{dragElement:c,limit:true,extraDistance:2,moveCallBack(h,p,_){f(p,_);}});}var v=(performance||Date).now(),w=v,L=0,$=u(new o.Panel("FPS","#0ff","#002")),M=u(new o.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var R=u(new o.Panel("MB","#f08","#201"));return m(0),g(),{REVISION:16,dom:c,addPanel:u,showPanel:m,begin:function(){v=(performance||Date).now();},end:function(){L++;var h=(performance||Date).now();if(M.update(h-v,200),h>=w+1e3&&($.update(L*1e3/(h-w),100),w=h,L=0,R)){var p=performance.memory;R.update(p.usedJSHeapSize/1048576,p.jsHeapSizeLimit/1048576);}return h},update:function(){v=this.end();},domElement:c,setMode:m}};o.Panel=function(r,s,i){var f=1/0,c=0,d=Math.round,u=d(window.devicePixelRatio||1),m=80*u,g=48*u,v=3*u,w=2*u,L=3*u,$=15*u,M=74*u,R=30*u,h=document.createElement("canvas");h.width=m,h.height=g,h.style.cssText="width:80px;height:48px";var p=h.getContext("2d");return p.font="bold "+9*u+"px Helvetica,Arial,sans-serif",p.textBaseline="top",p.fillStyle=i,p.fillRect(0,0,m,g),p.fillStyle=s,p.fillText(r,v,w),p.fillRect(L,$,M,R),p.fillStyle=i,p.globalAlpha=.9,p.fillRect(L,$,M,R),{dom:h,update:function(_,b){f=Math.min(f,_),c=Math.max(c,_),p.fillStyle=i,p.globalAlpha=1,p.fillRect(0,0,m,$),p.fillStyle=s,p.fillText(d(_)+" "+r+" ("+d(f)+"-"+d(c)+")",v,w),p.drawImage(h,L+u,$,M-u,R,L,$,M-u,R),p.fillRect(L+M-u,$,u,R),p.fillStyle=i,p.globalAlpha=.9,p.fillRect(L+M-u,$,u,d((1-_/b)*R));}}};class n{vConsole;VConsole;dom;requestID;stats;constructor(s,i){return this.vConsole=s,this.VConsole=i,this.dom=null,this.requestID=null,this.stats=null,this.init()}init(){this.addStyle();const s=new this.VConsole.VConsolePlugin("Stats","Stats");return s.on("ready",()=>{document.querySelectorAll(".vc-stats-buttons").forEach(i=>{i.addEventListener("click",f=>{const c=f.target.dataset.type;if(c.toString()==="2"&&!(self.performance&&self.performance.memory)){V.error("浏览器不支持window.performance或者window.performance.memory");return}this.changePanel(c);});});}),s.on("renderTab",i=>{i(`
                <div class="vc-stats-buttons">
                    <div class="vc-button-container">
                        <button class="vc-stats-button" data-type="0">show FPS</button>
                        <div class="vc-description">
                        <span>最后一秒渲染的帧。数字越高越好</span>
                        </div>
                    </div>
                    <div class="vc-button-container">
                        <button class="vc-stats-button" data-type="1">show MS</button>
                        <div class="vc-description">
                        <span>渲染帧所需的毫秒数。数字越低越好</span>
                        </div>
                    </div>
                    <div class="vc-button-container">
                        <button class="vc-stats-button" data-type="2">show MB</button>
                        <div class="vc-description">
                        <span>内存分配(MB)</span>
                        <a class="vc-link" href="https://caniuse.com/mdn-api_performance_memory" target="_blank">performance.memory兼容性查看</a>
                        <span>Chrome启用方式: --enable-precise-memory-info</span>
                        </div>
                    </div>
                </div>`);}),s.on("addTool",i=>{const f=[{name:"Show Stats",onClick:this.show},{name:"Close Stats",onClick:this.close}];i(f);}),this.vConsole.addPlugin(s),s}addStyle=s=>{s==null&&(s=document.head||document.body||document.documentElement);const i=document.createElement("style");i.setAttribute("type","text/css"),i.innerHTML=`
            .vc-stats-button{
                margin: 10px 10px;
                background-color: #fbf9fe;
                padding: 2px 4px;
                cursor: pointer;
                border-radius: 4px;
                border: 1px solid;
            }
            .vc-button-container{
                display: flex;
                align-items: center;
            }
            .vc-description{
                display: flex;
                flex-direction: column;
            }
            .vc-description a.vc-link{
                color: blue;
            }`,s.appendChild(i);};show=()=>{this.stats||(this.stats=new o,this.stats.showPanel(1),this.dom=this.stats.dom,document.body.appendChild(this.dom),this.requestID=requestAnimationFrame(this.loop));};changePanel=s=>{this.stats||this.show(),this.stats.setMode(Number(s));};loop=()=>{this.stats.update(),this.requestID=requestAnimationFrame(this.loop);};close=()=>{this.requestID&&cancelAnimationFrame(this.requestID),this.dom&&document.body.removeChild(this.dom),this.stats=null,this.requestID=null,this.dom=null;}}return new n(e,a)},Fe=(e,a)=>{class o{vConsole;VConsole;$;dom;logItemSelector;constructor(r,s,i){return this.vConsole=r,this.VConsole=s,this.$=r.$,this.dom=null,this.logItemSelector=i||".vc-content #__vc_plug_default .vc-log-row",this.init()}init(){const r=new this.VConsole.VConsolePlugin("exportLog","exportLog");return r.on("ready",()=>{V.log("[vConsole-exportlog-plugin] -- load");}),r.on("renderTab",s=>{s('<div class="vconsole-exportlog"></div>');}),r.on("addTool",s=>{const i=[{name:"exportLogs",onClick:this.export},{name:"copyLogs",onClick:this.copyText}];s(i);}),this.vConsole.addPlugin(r),r}funDownload=(r,s)=>{var i=document.createElement("a");i.download=s,i.style.display="none";var f=new Blob([r]);i.href=URL.createObjectURL(f),document.body.appendChild(i),i.click(),document.body.removeChild(i);};getAllLogContent=()=>{let r=document.querySelectorAll(this.logItemSelector),s="";for(let i=0;i<r.length;i++){const f=r[i];s+=`${f.textContent}
`;}return s};export=()=>{let r=this.getAllLogContent();this.funDownload(r,`${new Date().toLocaleDateString()+" "+new Date().toLocaleTimeString()}.log`);};copyText=()=>{let r=this.getAllLogContent();S.copy(r);}}return new o(e,a)},qe=()=>{initVConsole("VConsole",U);let e=U.VConsole||globalThis.VConsole;if(!e){alert("调试工具【vConsole】注册全局失败，请反馈开发者");return}let a=[];l.getValue(t.vConsole_panel_system.key)&&a.push("system"),l.getValue(t.eruda_panel_network.key)&&a.push("network"),l.getValue(t.eruda_panel_elements.key)&&a.push("element"),l.getValue(t.vConsole_panel_storage.key)&&a.push("storage"),l.getValue(t.vConsole_theme.key)==="auto"?S.isThemeDark():l.getValue(t.vConsole_theme.key);let o=[];l.getValue(t.vConsole_storage_defaultStorages_cookies.key)&&o.push("cookies"),l.getValue(t.vConsole_storage_defaultStorages_localStorage.key)&&o.push("localStorage"),l.getValue(t.vConsole_storage_defaultStorages_sessionStorage.key)&&o.push("sessionStorage");let n=new e({defaultPlugins:a,theme:"light",onReady(){l.getValue(t.vconsole_auto_open_panel.key)&&n.show();},disableLogScrolling:l.getValue(t.vconsole_disableLogScrolling.key),log:{maxLogNumber:l.getValue(t.vconsole_maxLogNumber.key,t.vconsole_maxLogNumber.defaultValue),showTimestamps:l.getValue(t.vconsole_showTimestamps.key),maxNetworkNumber:l.getValue(t.vconsole_maxNetworkNumber.key,t.vconsole_maxNetworkNumber.defaultValue)},storage:{defaultStorages:o}});if(T.vConsole.version=n.version,U.vConsole=n,V.log(`VConsole当前版本：${n.version}`),V.log(`VConsole项目地址：${T.vConsole.homeUrl}`),V.log("VConsole的实例化的全局变量名: vConsole"),l.getValue(t.vConsole_plugin_Resource_vConsole_Stats.key))try{Be(n,e);}catch(r){V.error("插件【vconsole-stats-plugin】加载失败，原因：",r);}if(l.getValue(t.vConsole_plugin_Resource_vConsole_ExportLog.key))try{Fe(n,e);}catch(r){V.error("插件【vconsole-outputlog-plugin】加载失败，原因：",r);}if(l.getValue(t.vConsole_plugin_Resource_vConsoleVueDevtools.key))try{G.evalPlugin(I(t.vConsole_plugin_Resource_vConsoleVueDevtools.resource)),U.vueVconsoleDevtools.initPlugin(n);}catch(r){V.error("插件【vconsole-vue-devtools-plugin】加载失败，原因：",r);}if(l.getValue(t.vconsole_auto_open_panel.key)){let r=l.getValue(t.vconsole_default_show_panel_name.key,t.vconsole_default_show_panel_name.defaultValue);n.show(),setTimeout(()=>{n.showPlugin(r);},250);}},je=()=>{let e=l.getValue(t.pagespy_api.key,t.pagespy_api.defaultValue),a=l.getValue(t.pagespy_clientOrigin.key,t.pagespy_clientOrigin.defaultValue);if(l.getValue(t.pagespy_disable_run_in_debug_client.key)){if(window.location.hostname.includes(e)){V.log("禁止在调试端运行 ==> hostname包含api");return}if(window.location.origin.includes(a)){V.log("禁止在调试端运行 ==> origin包含clientOrigin");return}}let o=new initPageSpy(U);if(!o){alert("调试工具【PageSpy】获取失败，请反馈开发者");return}let n=new o({api:e,clientOrigin:a,project:l.getValue(t.pagespy_project.key,t.pagespy_project.defaultValue),title:l.getValue(t.pagespy_title.key,t.pagespy_title.defaultValue),autoRender:l.getValue(t.pagespy_autoRender.key,t.pagespy_autoRender.defaultValue),enableSSL:l.getValue(t.pagespy_enableSSL.key,t.pagespy_enableSSL.defaultValue),offline:l.getValue(t.pagespy_offline.key,t.pagespy_offline.defaultValue),serializeData:l.getValue(t.pagespy_serializeData.key,t.pagespy_serializeData.defaultValue),useSecret:l.getValue(t.pagespy_useSecret.key,t.pagespy_useSecret.defaultValue),messageCapacity:l.getValue(t.pagespy_messageCapacity.key,t.pagespy_messageCapacity.defaultValue)});U.$pageSpy=n,V.log(n),T.pageSpy.version=U.$pageSpy.version,V.log("PageSpy全局变量：$pageSpy");},We={$data:{get key(){return t.chii_embedded_height.key},winHeight:parseInt(window.innerHeight.toString()),get winHalfHeight(){return t.chii_embedded_height.defaultValue}},init(){let e=this.$data.winHalfHeight;this.isExistGMLocalHeight()?e=this.getGMLocalHeight():this.setGMLocalHeight(e),this.setLocalHeight(e);},getLocalHeight(){let e=Number(globalThis.localStorage.getItem(this.$data.key));return isNaN(e)?null:e},setLocalHeight(e){if(typeof e!="number")throw V.log(e),new TypeError(`${this.$data.key}的值必须是number`);let a=e.toString();globalThis.localStorage.setItem(this.$data.key,a);let o=this.getLocalHeight();(!o||o.toString()!==a)&&(globalThis.localStorage[this.$data.key]=a);},isExistGMLocalHeight(){return typeof this.getGMLocalHeight()=="number"},getGMLocalHeight(){return l.getValue(this.$data.key)},setGMLocalHeight(e){if(typeof e!="number")throw V.log(e),new TypeError(`${this.$data.key}的值必须是number`);l.setValue(this.$data.key,e);}},Ke=()=>{let e=l.getValue(t.chii_debug_url.key,t.chii_debug_url.defaultValue);if(window.location.href.startsWith(e)&&l.getValue(t.chii_check_script_load.key,t.chii_disable_run_in_debug_url.defaultValue)){V.log("禁止在调试端运行 ==> href包含debugUrl");return}if(l.execMenu(t.chii_embedded_height_enable.key,()=>{We.init();}),l.getValue(t.chii_check_script_load.key)){let r=function(s){s.target===n&&(globalThis.alert(`调试工具【Chii】脚本加载失败
      可能原因1：CSP策略阻止了加载第三方域的js文件
      可能原因2：目标js无效`),U.removeEventListener("error",r,{capture:true}));};U.addEventListener("error",r,{capture:true});}let a=l.getValue(t.chii_target_js.key,t.chii_target_js.defaultValue),o=l.getValue(t.chii_script_embedded.key,t.chii_script_embedded.defaultValue),n=document.createElement("script");n.src=a,n.setAttribute("type","application/javascript"),o&&n.setAttribute("embedded","true"),(document.head||document.body||document.documentElement).appendChild(n);},ie={$data:{isLoadDebugTool:false,loadDebugToolName:void 0,iframeUrlList:[]},$ele:{hideDebugToolCSSNode:void 0},handleToolWithIframe(){if(l.isTopWindow())return  true;if(!l.getValue(t.allowRunInIframe.key))return  false;this.$data.iframeUrlList.push(window.location.href);try{top.console.log("iframe信息："+window.location.href);}catch(e){V.error(e);}return te.add({key:"iframeUrl",text:window.location.href,autoReload:false,isStoreValue:false,showText(e){return e},callback(){Ue(window.location.href,"text");}}),true},execDebugTool(){let e=l.getValue(t.debugTool.key);e=e.toString().toLowerCase(),V.log(`网页调试：当前使用的调试工具【${e}】`),e==="vconsole"?(this.$data.isLoadDebugTool=true,this.$data.loadDebugToolName="vconsole",qe()):e==="pagespy"?(this.$data.isLoadDebugTool=true,this.$data.loadDebugToolName="pagespy",je()):e==="eruda"?(this.$data.isLoadDebugTool=true,this.$data.loadDebugToolName="eruda",He()):e==="chii"?(this.$data.isLoadDebugTool=true,this.$data.loadDebugToolName="chii",Ke()):V.error("当前未配置该调试工具的运行");},registerDebugToolMenuControls(){if(!l.isTopWindow()){V.warn("不在iframe内重复添加菜单按钮");return}let e={key:"debug_tool_show_hide_control",text:"☯ 加载并显示调试工具",autoReload:false,isStoreValue:false,showText(o){return o},callback:o=>{a();}};const a=o=>{ie.$data.isLoadDebugTool?ie.$ele.hideDebugToolCSSNode?(this.showCurrentDebugTool(),e.text="🌑 隐藏调试工具",te.update(e)):(this.hideCurrentDebugTool(),e.text="🌕 显示调试工具",te.update(e)):(this.showCurrentDebugTool(),e.text="🌑 隐藏调试工具",te.update(e));};te.add(e);},isInjectDebugToolHideCSS(){return !!(this.$ele.hideDebugToolCSSNode&&document.documentElement.contains(this.$ele.hideDebugToolCSSNode))},createDebugToolHideCSS(){let e=document.createElement("style");return e.setAttribute("type","text/css"),e.setAttribute("data-from","hide-debug-tool"),e.innerHTML=`
		/* Eruda的按钮 */
        #eruda{
            display: none !important;
        }
		/* vConsole的按钮 */
        #__vconsole{
            display: none !important;
        }
		/* PageSpy的按钮 */
        #__pageSpy{
            display: none !important;
        }
		/* Chii的面板 */
        .__chobitsu-hide__ > iframe,
        .__chobitsu-hide__:has(iframe){
            display: none !important;
        }
        `,e},hideCurrentDebugTool(){this.$ele.hideDebugToolCSSNode==null&&(V.log("未创建隐藏【调试工具】的style元素 => 创建元素"),this.$ele.hideDebugToolCSSNode=this.createDebugToolHideCSS()),this.isInjectDebugToolHideCSS()||(V.log("页面不存在隐藏【调试工具】的style元素 => 添加元素"),document.documentElement.appendChild(this.$ele.hideDebugToolCSSNode));},showCurrentDebugTool(){this.$ele.hideDebugToolCSSNode&&(V.log("页面存在隐藏【调试工具】的style元素 => 移除元素"),document.documentElement.removeChild(this.$ele.hideDebugToolCSSNode),this.$ele.hideDebugToolCSSNode=void 0),this.$data.isLoadDebugTool||(V.log("尚未运行【调试工具】 => 运行调试工具"),this.execDebugTool());}},ze={init(){ie.handleToolWithIframe()&&(l.getValue(t.autoLoadDebugTool.key)?ie.execDebugTool():ie.registerDebugToolMenuControls());}},me={$data:{__storeApiFn:null,get storeApiValue(){return this.__storeApiFn||(this.__storeApiFn=new X.Dictionary),this.__storeApiFn}},getStorageApi(e){if(this.hasStorageApi(e))return this.$data.storeApiValue.get(e)},hasStorageApi(e){return this.$data.storeApiValue.has(e)},setStorageApi(e,a){this.$data.storeApiValue.set(e,a);},initComponentsStorageApi(e,a,o){let n;this.hasStorageApi(e)?n=this.getStorageApi(e):n=o,this.setComponentsStorageApiProperty(a,n);},setComponentsStorageApiProperty(e,a){Reflect.set(e.props,z,a);}},ue=function(e,a,o,n,r,s,i){let f=[];typeof n=="function"?f=n():f=n;let c={text:e,type:"select",description:s,attributes:{},props:{},getValue(){return this.props[z].get(a,o)},callback(d,u,m){let g=u;N.info(`选择：${m}`),this.props[z].set(a,g);},data:f};return Reflect.set(c.attributes,ae,a),Reflect.set(c.attributes,oe,o),me.initComponentsStorageApi("select",c,{get(d,u){return l.getValue(d,u)},set(d,u){l.setValue(d,u);}}),c},y=function(e,a,o,n,r,s,i,f){let c={text:e,type:"switch",description:r,disabled:i,attributes:{},props:{},getValue(){return this.props[z].get(a,o)},callback(d,u){let m=!!u;if(N.success(`${m?"开启":"关闭"} ${e}`),typeof n=="function"&&n(d,m))return;this.props[z].set(a,m);},afterAddToUListCallBack:s};return Reflect.set(c.attributes,ae,a),Reflect.set(c.attributes,oe,o),me.initComponentsStorageApi("switch",c,{get(d,u){return l.getValue(d,u)},set(d,u){l.setValue(d,u);}}),c},Je={id:"debug-panel-config-all",title:"总设置",headerTitle:"总设置",forms:[{text:"功能",type:"forms",forms:[ue("调试工具",t.debugTool.key,t.debugTool.defaultValue,[{value:"eruda",text:"Eruda"},{value:"vconsole",text:"VConsole"},{value:"pagespy",text:"PageSpy"},{value:"chii",text:"Chii"}],void 0,void 0),y("允许在iframe内加载",t.allowRunInIframe.key,t.allowRunInIframe.defaultValue,void 0,"如果指定本脚本的容器并没有在iframe内执行本脚本，那么该功能将不会生效"),y("主动加载调试工具",t.autoLoadDebugTool.key,t.autoLoadDebugTool.defaultValue,void 0,"关闭后将会在脚本菜单注册按钮，有3种状态【加载并显示调试工具】、【隐藏调试工具】、【显示调试工具】")]},{type:"forms",text:"其它设置",forms:[y("面板尺寸跟随浏览器窗口尺寸","panel-ui-size-follow-browser-window",false,void 0,"如果开启，设置面板的宽高将使用outerWidth和outerHeight获取，如果关闭，则使用innerWidth和innerHeight获取")]}]},ce=function(e,a,o,n,r,s,i,f,c,d){let u={text:e,type:"button",attributes:{},props:{},description:a,buttonIcon:n,buttonIsRightIcon:r,buttonIconIsLoading:s,buttonType:i,buttonText:o,callback(m){typeof f=="function"&&f(m);},afterAddToUListCallBack:c};return Reflect.set(u.attributes,Re,()=>{u.disable=!!(typeof d=="function"?d():d);}),u},Ze={id:"debug-panel-config-eruda",title:"Eruda",headerTitle:`<a href='${T.eruda.settingDocUrl}' target='_blank'>Eruda设置</a>`,forms:[{text:"功能",type:"forms",forms:[ce("当前版本","",T.eruda.version,void 0,false,false,"primary",e=>{C.preventEvent(e),window.open(T.eruda.homeUrl,"_blank");}),{type:"own",getLiElementCallBack(e){let a=document.createElement("div");a.className="pops-panel-item-left-text",a.innerHTML=`
                            <p class="pops-panel-item-left-main-text">最新版本</p>
                        `;let o=document.createElement("div");return o.className="pops-panel-item-right-text",o.innerHTML=`
                        <a href="${T.eruda.homeUrl}" target="_blank">
                            <img src="https://img.shields.io/npm/v/eruda/latest.svg?label=eruda" alt="eruda">
                        </a>
                        `,e.appendChild(a),e.appendChild(o),e}},y("自动打开面板",t.eruda_auto_open_panel.key,t.eruda_auto_open_panel.defaultValue,void 0,"加载完毕后自动显示面板内容"),ue("默认展示的面板元素",t.eruda_default_show_panel_name.key,t.eruda_default_show_panel_name.defaultValue,[{text:"Console",value:"console",disable(){return !l.getValue(t.eruda_panel_console.key)}},{text:"Elements",value:"elements",disable(){return !l.getValue(t.eruda_panel_elements.key)}},{text:"Network",value:"network",disable(){return !l.getValue(t.eruda_panel_network.key)}},{text:"Resources",value:"resources",disable(){return !l.getValue(t.eruda_panel_resources.key)}},{text:"Sources",value:"sources",disable(){return !l.getValue(t.eruda_panel_sources.key)}},{text:"Info",value:"info",disable(){return !l.getValue(t.eruda_panel_info.key)}},{text:"Snippets",value:"snippets",disable(){return !l.getValue(t.eruda_panel_snippets.key)}},{text:"Monitor",value:"monitor",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaMonitor.key)}},{text:"Features",value:"features",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaFeatures.key)}},{text:"Timing",value:"timing",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaTiming.key)}},{text:"Code",value:"code",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaCode.key)}},{text:"Benchmark",value:"benchmark",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaBenchmark.key)}},{text:"Geolocation",value:"geolocation",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaGeolocation.key)}},{text:"Orientation",value:"orientation",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaOrientation.key)}},{text:"Touches",value:"touches",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaTouches.key)}},{text:"Outline",value:"outline",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaOutlinePlugin.key)}},{text:"Pixel",value:"pixel",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaPixel.key)}},{text:"Vue",value:"vue",disable(){return !l.getValue(t.eruda_plugin_Resource_erudaVue.key)}},{text:"Settings",value:"settings"}],void 0,"开启【自动打开面板】才会生效")]},{text:"面板",type:"forms",forms:[y("Console",t.eruda_panel_console.key,t.eruda_panel_console.defaultValue,void 0,"控制台"),y("Elements",t.eruda_panel_elements.key,t.eruda_panel_elements.defaultValue,void 0,"元素"),y("Network",t.eruda_panel_network.key,t.eruda_panel_network.defaultValue,void 0,"网络"),y("Resources",t.eruda_panel_resources.key,t.eruda_panel_resources.defaultValue,void 0,"资源"),y("Sources",t.eruda_panel_sources.key,t.eruda_panel_sources.defaultValue,void 0,"源代码"),y("Info",t.eruda_panel_info.key,t.eruda_panel_info.defaultValue,void 0,"信息"),y("Snippets",t.eruda_panel_snippets.key,t.eruda_panel_snippets.defaultValue,void 0,"拓展")]},{text:"插件",type:"forms",forms:[y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-monitor" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-monitor/latest.svg?label=">
                    </a>
                    eruda-monitor
                    `,t.eruda_plugin_Resource_erudaMonitor.key,t.eruda_plugin_Resource_erudaMonitor.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-monitor"]}
						<br>
						展示页面的 fps 和内存信息
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-features" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-features/latest.svg?label=">
                    </a>
                    eruda-features
                    `,t.eruda_plugin_Resource_erudaFeatures.key,t.eruda_plugin_Resource_erudaFeatures.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-features"]}
						<br>
						浏览器特性检测
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-timing" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-timing/latest.svg?label=">
                    </a>
                    eruda-timing
                    `,t.eruda_plugin_Resource_erudaTiming.key,t.eruda_plugin_Resource_erudaTiming.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-timing"]}
						<br>
						展示性能资源数据
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-code" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-code/latest.svg?label=">
                    </a>
                    eruda-code
                    `,t.eruda_plugin_Resource_erudaCode.key,t.eruda_plugin_Resource_erudaCode.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-code"]}
						<br>
						运行 JavaScript 代码
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-benchmark" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-benchmark/latest.svg?label=">
                    </a>
                    eruda-benchmark
                    `,t.eruda_plugin_Resource_erudaBenchmark.key,t.eruda_plugin_Resource_erudaBenchmark.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-benchmark"]}
						<br>
						运行 JavaScript 性能测试
                    `),y("eruda-geolocation",t.eruda_plugin_Resource_erudaGeolocation.key,t.eruda_plugin_Resource_erudaGeolocation.defaultValue,void 0,"测试地理位置接口"),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-orientation" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-orientation/latest.svg?label=">
                    </a>
                    eruda-orientation
                    `,t.eruda_plugin_Resource_erudaOrientation.key,t.eruda_plugin_Resource_erudaOrientation.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-orientation"]}
						<br>
						测试重力感应接口
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-vue" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-vue/latest.svg?label=">
                    </a>
                    eruda-vue
                    `,t.eruda_plugin_Resource_erudaVue.key,t.eruda_plugin_Resource_erudaVue.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-vue"]}
						<br>
						Vue调试工具
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/liriliri/eruda-touches" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-touches/latest.svg?label=">
                    </a>
                    eruda-touches
                    `,t.eruda_plugin_Resource_erudaTouches.key,t.eruda_plugin_Resource_erudaTouches.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-touches"]}
						<br>
						可视化屏幕 Touch 事件触发
                    `),y(`
                    <a class="plugin-anchor" href="https://github.com/pomelo-chuan/eruda-outline-plugin" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-outline-plugin/latest.svg?label=">
                    </a>
                    eruda-outline-plugin
                    `,t.eruda_plugin_Resource_erudaOutlinePlugin.key,t.eruda_plugin_Resource_erudaOutlinePlugin.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-outline-plugin"]}
						<br>
						给页面的元素添加边框
					`),y(`
                    <a class="plugin-anchor" href="https://github.com/Faithree/eruda-pixel" target="_blank">
                        <img src="https://img.shields.io/npm/v/eruda-pixel/latest.svg?label=">
                    </a>
                    eruda-pixel
                    `,t.eruda_plugin_Resource_erudaPixel.key,t.eruda_plugin_Resource_erudaPixel.defaultValue,void 0,`
						v${O.eruda.plugin["eruda-pixel"]}
						<br>
						高精度的UI恢复辅助工具
                    `)]}]},K=function(e,a,o,n,r,s="",i,f,c,d){let u={text:e,type:"input",isNumber:!!i,isPassword:false,attributes:{},props:{},description:n,afterAddToUListCallBack:c,getValue(){return this.props[z].get(a,o)},callback(m,g,v){this.props[z].set(a,g);},placeholder:s};return Reflect.set(u.attributes,ae,a),Reflect.set(u.attributes,oe,o),me.initComponentsStorageApi("input",u,{get(m,g){return l.getValue(m,g)},set(m,g){l.setValue(m,g);}}),u},Xe={id:"debug-panel-config-vconsole",title:"vConsole",headerTitle:`<a href='${T.vConsole.settingDocUrl}' target='_blank'>vConsole设置</a>`,forms:[{text:"功能",type:"forms",forms:[ce("当前版本","",T.vConsole.version,void 0,false,false,"primary",e=>{C.preventEvent(e),window.open(T.vConsole.homeUrl,"_blank");}),{type:"own",getLiElementCallBack(e){let a=document.createElement("div");a.className="pops-panel-item-left-text",a.innerHTML=`
                            <p class="pops-panel-item-left-main-text">最新版本</p>
                        `;let o=document.createElement("div");return o.className="pops-panel-item-right-text",o.innerHTML=`
                        <a href="${T.vConsole.homeUrl}" target="_blank">
                            <img src="https://img.shields.io/npm/v/vconsole/latest.svg?label=vConsole" alt="vConsole">
                        </a>
                        `,e.appendChild(a),e.appendChild(o),e}},y("自动打开面板",t.vconsole_auto_open_panel.key,t.vconsole_auto_open_panel.defaultValue,void 0,"加载完毕后自动显示面板内容"),ue("默认展示的面板元素",t.vconsole_default_show_panel_name.key,t.vconsole_default_show_panel_name.defaultValue,[{text:"Log",value:"default"},{text:"System",value:"system",disable(){return !l.getValue(t.vConsole_panel_system.key)}},{text:"Network",value:"network",disable(){return !l.getValue(t.vConsole_panel_network.key)}},{text:"Element",value:"element",disable(){return !l.getValue(t.vConsole_panel_element.key)}},{text:"Storage",value:"storage",disable(){return !l.getValue(t.vConsole_panel_storage.key)}},{text:"Stats",value:"stats",disable(){return !l.getValue(t.vConsole_plugin_Resource_vConsole_Stats.key)}},{text:"exportLog",value:"exportlog",disable(){return !l.getValue(t.vConsole_plugin_Resource_vConsole_ExportLog.key)}},{text:"Vue",value:"vue",disable(){return !l.getValue(t.vConsole_plugin_Resource_vConsoleVueDevtools.key)}}],void 0,"开启【自动打开面板】才会生效")]},{text:"面板",type:"forms",forms:[y("System",t.vConsole_panel_system.key,t.vConsole_panel_system.defaultValue,void 0,"控制台"),y("Network",t.vConsole_panel_network.key,t.vConsole_panel_network.defaultValue,void 0,"元素"),y("Element",t.vConsole_panel_element.key,t.vConsole_panel_element.defaultValue,void 0,"网络"),y("Storage",t.vConsole_panel_storage.key,t.vConsole_panel_storage.defaultValue,void 0,"资源")]},{text:"配置",type:"forms",forms:[ue("主题",t.vConsole_theme.key,t.vConsole_theme.defaultValue,[{value:"auto",text:"自动"},{value:"light",text:"浅色主题"},{value:"dark",text:"深色主题"}],void 0,void 0),y("禁止Log自动滚动",t.vconsole_disableLogScrolling.key,t.vconsole_disableLogScrolling.defaultValue),y("显示日志的输出时间",t.vconsole_showTimestamps.key,t.vconsole_showTimestamps.defaultValue),K("日志的上限数量",t.vconsole_maxLogNumber.key,t.vconsole_maxLogNumber.defaultValue,"请输入数字",void 0,void 0,true),K("请求记录的上限数量",t.vconsole_maxNetworkNumber.key,t.vconsole_maxNetworkNumber.defaultValue,"请输入数字",void 0,void 0,true)]},{text:"Storage配置",type:"forms",forms:[y("Cookies",t.vConsole_storage_defaultStorages_cookies.key,t.vConsole_storage_defaultStorages_cookies.defaultValue,void 0,"显示Cookies"),y("LocalStorage",t.vConsole_storage_defaultStorages_localStorage.key,t.vConsole_storage_defaultStorages_localStorage.defaultValue,void 0,"显示LocalStorage"),y("SessionStorage",t.vConsole_storage_defaultStorages_sessionStorage.key,t.vConsole_storage_defaultStorages_sessionStorage.defaultValue,void 0,"显示SessionStorage")]},{text:"插件",type:"forms",forms:[y("vconsole-stats-plugin",t.vConsole_plugin_Resource_vConsole_Stats.key,t.vConsole_plugin_Resource_vConsole_Stats.defaultValue,void 0,"A vConsole plugin which can show Stats in front-end."),y("vconsole-outputlog-plugin",t.vConsole_plugin_Resource_vConsole_ExportLog.key,t.vConsole_plugin_Resource_vConsole_ExportLog.defaultValue,void 0,"使用该插件可以复制或下载console中打印的log"),y(`
                        <a class="plugin-anchor" href="https://github.com/Zippowxk/vue-vconsole-devtools" target="_blank">
                            <img src="https://img.shields.io/npm/v/vue-vconsole-devtools/latest.svg?label=">
                        </a>
                        vue-vconsole-devtools
                    `,t.vConsole_plugin_Resource_vConsoleVueDevtools.key,t.vConsole_plugin_Resource_vConsoleVueDevtools.defaultValue,void 0,`
                        v${O.vconsole.plugin["vue-vconsole-devtools"]}
                        <br>
                        Vue-vConsole-devtools 是一款vConsole插件，把Vue.js官方调试工具vue-devtools移植到移动端，可以直接在移动端查看调试Vue.js应用
                    `)]}]},Ye={id:"debug-panel-config-pagespy",title:"PageSpy",headerTitle:`<a href='${T.pageSpy.settingDocUrl}' target='_blank'>PageSpy设置</a>`,forms:[{text:"功能",type:"forms",forms:[ce("注意！隐私保护！","","了解详情",void 0,false,false,"danger",e=>{q.confirm({title:{text:"提示",position:"center"},content:{text:`下面默认配置的${T.pageSpy.defaultConfig.api}是仅供测试使用的，其他人也可以看到你的调试信息，包括Cookie等信息，如果想用，请自己搭建一个调试端`},btn:{reverse:true,position:"end",ok:{text:"前往了解更多",callback(){window.open("https://github.com/HuolalaTech/page-spy-web/wiki/%F0%9F%90%9E-%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94#user-content-testjikejishucom-%E6%98%AF%E5%AE%98%E6%96%B9%E6%8F%90%E4%BE%9B%E7%9A%84%E5%9F%9F%E5%90%8D%E5%90%97%E4%B8%80%E7%9B%B4%E5%8F%AF%E4%BB%A5%E7%94%A8%E5%90%97","_blank");}}},mask:{enable:true},width:F.info.width,height:F.info.height});},void 0),ce("当前版本","",T.pageSpy.version,void 0,false,false,"primary",e=>{C.preventEvent(e),window.open(T.pageSpy.homeUrl,"_blank");}),{type:"own",getLiElementCallBack(e){let a=document.createElement("div");a.className="pops-panel-item-left-text",a.innerHTML=`
                            <p class="pops-panel-item-left-main-text">最新版本</p>
                        `;let o=document.createElement("div");return o.className="pops-panel-item-right-text",o.innerHTML=`
                        <a href="${T.pageSpy.homeUrl}" target="_blank">
                            <img src="https://img.shields.io/npm/v/@huolala-tech/page-spy-browser?label=pagespy" alt="page-spy-browser">
                        </a>
                        `,e.appendChild(a),e.appendChild(o),e}},y("禁止在调试端运行",t.pagespy_disable_run_in_debug_client.key,t.pagespy_disable_run_in_debug_client.defaultValue,void 0,"调试端是下面配置的api/clientOrigin地址")]},{text:"配置",type:"forms",forms:[K("api",t.pagespy_api.key,t.pagespy_api.defaultValue,"",void 0,"服务器地址的 Host"),K("clientOrigin",t.pagespy_clientOrigin.key,t.pagespy_clientOrigin.defaultValue,"",void 0,"服务器地址的 Origin"),K("project",t.pagespy_project.key,t.pagespy_project.defaultValue,void 0,void 0,"项目名称"),K("title",t.pagespy_title.key,t.pagespy_title.defaultValue,void 0,void 0,"自定义标题"),y("autoRender",t.pagespy_autoRender.key,t.pagespy_autoRender.defaultValue,void 0,"自动渲染「圆形白底带 Logo」"),ue("enableSSL",t.pagespy_enableSSL.key,t.pagespy_enableSSL.defaultValue,[{value:null,text:"默认(自动分析)"},{value:true,text:"开启"},{value:false,text:"关闭"}],void 0,"是否https"),y("offline",t.pagespy_offline.key,t.pagespy_offline.defaultValue,void 0,'是否进入 "离线模式"，具体表现为 PageSpy 不会创建房间、建立 WebSocket 连接。'),y("serializeData",t.pagespy_serializeData.key,t.pagespy_serializeData.defaultValue,void 0,"是否允许 SDK 在收集离线日志时，序列化非基本类型的数据，序列化的目的是方便在回放时查看"),y("useSecret",t.pagespy_useSecret.key,t.pagespy_useSecret.defaultValue,void 0,"是否启用权限认证功能。启用后，SDK 会生成 6 位数的随机 “密钥”；调试端进入房间时要求输入对应的密钥"),K("messageCapacity",t.pagespy_messageCapacity.key,t.pagespy_messageCapacity.defaultValue,"调试端进入房间后可以看到之前的数据量的大小",void 0,"指定 SDK 在本地最多缓存多少条数据记录")]}]},Qe=function(e,a,o,n,r,s,i,f,c,d){let u={text:e,type:"slider",description:f,attributes:{},props:{},getValue(){return this.props[z].get(a,o)},getToolTipContent(m){return typeof i=="function"?i(m):`${m}`},callback(m,g){if(typeof s=="function"&&s(m,g))return;this.props[z].set(a,g);},min:n,max:r,step:c};return Reflect.set(u.attributes,ae,a),Reflect.set(u.attributes,oe,o),me.initComponentsStorageApi("slider",u,{get(m,g){return l.getValue(m,g)},set(m,g){l.setValue(m,g);}}),u},et={id:"debug-panel-config-chii",title:"Chii",headerTitle:`<a href='${T.chii.settingDocUrl}' target='_blank'>Chii设置</a>`,forms:[{text:"功能",type:"forms",forms:[ce("调试页面","","前往",void 0,false,false,"primary",e=>{let a=l.getValue("chii-debug-url",T.chii.defaultConfig.url);window.open(a,"_blank");},void 0,()=>!!l.getValue(t.chii_script_embedded.key,t.chii_script_embedded.defaultValue))]},{text:"配置",type:"forms",forms:[y("本页展示",t.chii_script_embedded.key,t.chii_script_embedded.defaultValue,(e,a)=>{let n=e.target.getRootNode().querySelector("li.pops-panel-forms-container-item ul > li > .pops-panel-button button");a?n.setAttribute("disabled","true"):n.removeAttribute("disabled");},"将调试器展示在同一页面中"),y("禁止在调试端运行",t.chii_disable_run_in_debug_url.key,t.chii_disable_run_in_debug_url.defaultValue,void 0,"调试端是下面配置的【调试页面Url】"),y("检测script加载",t.chii_check_script_load.key,t.chii_check_script_load.defaultValue,void 0,"失败会有alert提示弹出"),K("调试页面Url",t.chii_debug_url.key,t.chii_debug_url.defaultValue,"请输入链接Url",void 0,"配置【调试页面】的Url"),K("来源js",t.chii_target_js.key,t.chii_target_js.defaultValue,"请输入目标js文件",void 0,"用于注入页面来进行调试")]},{text:"本页展示的配置",type:"forms",forms:[y("锁定高度",t.chii_embedded_height_enable.key,t.chii_embedded_height_enable.defaultValue,void 0,"开启后将自动覆盖面板高度"),Qe("高度设定",t.chii_embedded_height.key,t.chii_embedded_height.defaultValue,0,parseInt(window.innerHeight.toString()),(e,a)=>{let o=document.querySelector(".__chobitsu-hide__:has(iframe)");o&&(o.style.height=a+"px");},e=>e+"px","可覆盖当前页面Chii面板的高度",1)]}]};fe.addContentConfig([Je,Ze,Xe,Ye,et]);l.$data.panelConfig={style:`
				aside.pops-panel-aside{
					width: 20%;
				}
				.plugin-anchor{
					text-decoration: none;
					display: inline-flex;
    				vertical-align: text-bottom;
				}
			`};l.init();ze.init();H.followBrowserSize=!!l.getValue("panel-ui-size-follow-browser-window",false);

})(Qmsg, DOMUtils, Utils, pops);
// ==UserScript==
// @name         SearchEnginePlus
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2026.7.20
// @author       WhiteSevs
// @description  搜索引擎优化，包含以下搜索引擎：百度搜索、谷歌、Bing
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHPElEQVR4AeyaS3IcNwyGQUoHSJzsoyzkqpwi0kksLW0fwvYhbC/tnETOKVJlLTzZJ6McQB4GHzQ9w2aT3ezHJCVZXYLI5gMEfoDgo8fLN/48AvCNO4A8esCjBxwQgR/fX5/98PbzxZO316+fvP/8wYi8EuXUf/f+j5MDijDIevEpgGKm6LvrsAlyFZz7IE5eSXAXRuSVKKfeh+Mv37+7vgKk/wOMRQBAcFNClUYxQVmpf5zIGSD5LRh4hvxHz2wAsDaCmxILCA0fPANAAXYBlr0sJgOAlZ6oxWXI2i58FCjIGxfCpWgKBZFPImElhQcgvHoEU6PQZJHiSQAgFFbKSRBQTBXeuNuf1y9O3fr500ujl6ev/3759ONaU+jmxen5+sXTn72Tc1FQrF+OoZNXeNmhvGE0ALimqFBdWcMKC9+gmCr9z/NfitaN+/71/PRTA4iBkfMK9TIXjj8cAoRRAKA8rhkrYHm14FqtiYXtfeI/A0P5AGQ6PRjXh6OrpUGoBgC3R4hUN6yGBdPyOe8AuXFfz1MQRNyJ3xxfLAlCFQAEvK7bhxXKYzU5wMMUwqs6IOj0A4SlhhwEALS7AQ/l3eWhlI+VK4GAXHG72nzabhCAHNrezVfedoy6Jca7hpTJTQenQTFVZsp7LwAmmLpci7EGvLmWZ1kL2y0y3oUyNlZroP0L08HpuPsS0Rkpds6QmU8vAF6OXrX5h9XcgGeK6rIW8yW4Hm2OzuKyNE9gtA1VVBHUOMYvKhubLQJgjBNBJbjfxg6Qti8pGjTCp23T9418fSOtfYI7KfGTyqcIQHfuz7c+Mjnv8hskF54Z6DQqEFNBfV+30PsGwcuv+7fxuSIA6l5txgtYH/Fu5TYPgHqA08A2BILbyO/w2VHqpbuKukwWAIRwHFEjHht/+zF6nZxte1ZYxfOaMYdAsFjQmgYiyDtVoCwAx3J80mYYVuZ+7cLRbyaoBq6mI8spByWJInwNCOKkNQ3mxIEsAHqV0wIgiFtJ8rCOQ6ZUUld6Ta3fLKe2smRAgD/7hA6/jfszLpsTB/IA6HyMB9A1uDXvOBQFXcchX3lmN6AS68dj5ECAP/sE9g3Wf9vBJVNgWzwpyQLQxyl7KFLFYgFz/UvWj9umIOzqNNDFbp6uJCG4lsfu+lVk8gD48FPctwbxWMC4L3kDR0EiDzH3SXPkvbTmt2yfPjdX+RYGYDtoLtHBOvGAdhonikLUWB8evZTM+962IyrzHpAMFqOfW4ZsPLUw08Py0b8x1qebBcYoIFLG7s+mx92L1ATpbdPBJAtAycoNN46odmtjgoa9R2RAmGJ9lDX+ercoOgbjNWOThjRIu7CXgQYjKA9Asl0NmSCDJyDonXCRABEIY60fy2389W6RMeLybD7x2LjNUD4LgLlhtNQ4kTNTpsCtBIJvnSbD6o5vgcmYYgU5bl4KnHGbUj4LQK5xX5SnfQ4E0eWLOqgv8lNfS11DzAO2DEBy+Nk492xIyA4IUYfyIShqVJFtxxQNj5ldagWbXZMiAKlbDU2DHccEuKZ8yIOadn2pWT9xfxektUvt65+rKwJwN1+j4Ka9Oalp0vs3tIL0dh6oTK2v9p99Q1UEAFnSeYsXcEChrkREbwSL64N+Lrsrj0vH5XPW1xgz+4aqFwDzAtbiSFYOKCZMVJZmiQXNOk56o5/L0jZj3hmv633L3FD1AoCQ3Xs4EV/xiQqLc9Ynhc8ccnpT5HQpjnmk3hnXjckPAmAXIZ3A5k4QCsuMGWxKW47CLlGeWyTzzikMkz6DANDedmO6JSXfEEL5Ck9o2k9JuXfQeX7R7quurzvEdtn0tyoAYG8gRLtDykT35F4vRLK3NjL9gR/KA3KXizsZCsTdPuWSagBgkftEZeVBrhB47pSgPy7PLVBeeUbTNUZvo5YCYRQAxIO1fr9nDt6Jsv+PwHgDQGBBlNnX9udQBsXpL9H2ua8XqxE/0YEYc8x4Md9RADQdie6SxISmDiCwoNepgWDcEUCAAqEsRBlKowDKSElxXYb5qY0UxmNcxvQ63hQQJgHAoMQE7+ScTQ7vOUIwYeuqBCgQykJWXlJ6ywz+Bra+M570gKBNdHk+/jIWhMkAMCBL0Y1uchBUZ+bkSwl47SnYb42wOvz35SI1H2f8SE+YBUAjHIKuNTYYEOqy0lktmpY9qfZj1wifuZunMSAsAkCjlgGhazRKGBi4LKTKBRG97Q0rS/VdlFB4E/2cbkhxgrD1l+GnFoRFAYjFMjC2vwlkHt/oVFmrl9yQApISCqNU3G8oH9ztZa2H1YBwMACGFJlaD2DeucVAuHcAABzeNQ6E8u8L7yUA40FwxV+S3FsARJ8xnhB/3NGuu797DQBaVINQ+HZw7wGoBaG0iXoQAAyBwH6D1YN2KT0YAFCM6bDWvYZsN1+kXs8r7Deoz9GDAqBRkIMTmy9SQGnKc+mDBCCnaKnsEYASMt9K+b33gLmG+hcAAP//M3yY4QAAAAZJREFUAwDdAc6uB4kUMgAAAABJRU5ErkJggg==
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://ipv6.baidu.com/*
// @match        *://www.baidu.com/*
// @match        *://www1.baidu.com/*
// @match        *://m.baidu.com/*
// @match        *://*.google.com/search*
// @match        *://*.google.com.hk/search*
// @match        *://s.cn.bing.net/search*
// @match        *://www.bing.com/search*
// @match        *://cn.bing.com/search*
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@86be74b83fca4fa47521cded28377b35e1d7d2ac/lib/CoverUMD/index.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.12.2/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@2.0.8/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@4.2.9/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.7.2/dist/index.umd.min.js
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setValue
// @grant        GM_setValues
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function(e,t,n,r){"use strict";var i=Object.create,a=Object.defineProperty,o=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,c=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,u=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=s(t),c=0,u=i.length,d;c<u;c++)d=i[c],!l.call(e,d)&&d!==n&&a(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(r=o(t,d))||r.enumerable});return e},d=(e,t,n)=>(n=e==null?{}:i(c(e)),u(t||!e||!e.__esModule?a(n,`default`,{value:e,enumerable:!0}):n,e));e=d(e),t=d(t),n=d(n),r=d(r);var f=typeof GM_addValueChangeListener<`u`?GM_addValueChangeListener:void 0,p=typeof GM_deleteValue<`u`?GM_deleteValue:void 0,m=typeof GM_getResourceText<`u`?GM_getResourceText:void 0,h=typeof GM_getValue<`u`?GM_getValue:void 0,g=typeof GM_info<`u`?GM_info:void 0,_=typeof GM_listValues<`u`?GM_listValues:void 0,ee=typeof GM_registerMenuCommand<`u`?GM_registerMenuCommand:void 0,v=typeof GM_removeValueChangeListener<`u`?GM_removeValueChangeListener:void 0,y=typeof GM_setValue<`u`?GM_setValue:void 0,b=typeof GM_setValues<`u`?GM_setValues:void 0,te=typeof GM_unregisterMenuCommand<`u`?GM_unregisterMenuCommand:void 0,ne=typeof GM_xmlhttpRequest<`u`?GM_xmlhttpRequest:void 0,x=typeof unsafeWindow<`u`?unsafeWindow:void 0,re=window,ie=class e{__href__;get __href(){return this.__href__||globalThis.location.href}__origin={value:void 0,type:`same`};__protocol={value:void 0,type:`same`};__host={value:void 0,type:`same`,hasPort:!1};__pathname={value:void 0,type:`same`};__searchParams={value:new Set};otherInstResultWithOr=!1;constructor(e){typeof e==`string`&&this.href(e)}href(e){return this.__href__=e,this}origin(e){return this.__origin={value:e,type:`same`},this}originStartsWith(e){return this.__origin={value:e,type:`startsWith`},this}originEndsWith(e){return this.__origin={value:e,type:`endsWith`},this}originIncludes(e){return this.__origin={value:e,type:`includes`},this}originMatch(e){return this.__origin={value:e,type:`match`},this}protocol(e){return this.__protocol={value:e,type:`same`},this}protocolStartsWith(e){return this.__protocol={value:e,type:`startsWith`},this}protocolEndsWith(e){return this.__protocol={value:e,type:`endsWith`},this}protocolIncludes(e){return this.__protocol={value:e,type:`includes`},this}protocolMatch(e){return this.__protocol={value:e,type:`match`},this}host(e){return this.__host={value:e,type:`same`,hasPort:!0},this}hostStartsWith(e){return this.__host={value:e,type:`startsWith`,hasPort:!0},this}hostEndsWith(e){return this.__host={value:e,type:`endsWith`,hasPort:!0},this}hostIncludes(e){return this.__host={value:e,type:`includes`,hasPort:!0},this}hostMatch(e){return this.__host={value:e,type:`match`,hasPort:!0},this}hostName(e){return this.__host={value:e,type:`same`,hasPort:!1},this}hostNameStartsWith(e){return this.__host={value:e,type:`startsWith`,hasPort:!1},this}hostNameEndsWith(e){return this.__host={value:e,type:`endsWith`,hasPort:!1},this}hostNameIncludes(e){return this.__host={value:e,type:`includes`,hasPort:!1},this}hostNameMatch(e){return this.__host={value:e,type:`match`,hasPort:!1},this}pathname(e){return this.__pathname={value:e,type:`same`},this}pathnameStartsWith(e){return this.__pathname={value:e,type:`startsWith`},this}pathnameEndsWith(e){return this.__pathname={value:e,type:`endsWith`},this}pathnameIncludes(e){return this.__pathname={value:e,type:`includes`},this}pathnameMatch(e){return this.__pathname={value:e,type:`match`},this}searchParams(e,t){return this.__searchParams.value.add({name:e,value:t}),this}search(e){return this.__searchParams.value.add({name:``,value:e,type:`same`}),this}searchStartsWith(e){return this.__searchParams.value.add({name:``,value:e,type:`startsWith`}),this}searchEndsWith(e){return this.__searchParams.value.add({name:``,value:e,type:`endsWith`}),this}searchIncludes(e){return this.__searchParams.value.add({name:``,value:e,type:`includes`}),this}searchMatch(e){return this.__searchParams.value.add({name:``,value:e,type:`match`}),this}build(){if(!this.__host.value)throw TypeError(`host or hostName should be required`);let e=`${this.__protocol.value||`https`}://${this.__host.value}${this.__pathname.value||`/`}`;if(this.__searchParams.value.size>0){let t=[];this.__searchParams.value.forEach(e=>{if(typeof e.name==`string`){let n=``;(typeof e.value==`string`||typeof e.value==`number`||typeof e.value==`boolean`)&&(n=e.value.toString()),t.push(`${encodeURIComponent(e.name)}=${encodeURIComponent(n)}`)}}),t.length&&(e+=`?${t.join(`&`)}`)}return e}or(t){this.otherInstResultWithOr=this.otherInstResultWithOr||this.r();let n=new e(t);return n.otherInstResultWithOr=this.otherInstResultWithOr,n}r(){if(this.otherInstResultWithOr)return this.otherInstResultWithOr;let e=new URL(this.__href);return[()=>{if(this.__origin.value)if(this.__origin.type===`same`){if(typeof this.__origin.value==`string`)return e.origin===this.__origin.value;throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`startsWith`){if(typeof this.__origin.value==`string`)return e.origin.startsWith(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`endsWith`){if(typeof this.__origin.value==`string`)return e.origin.endsWith(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`includes`){if(typeof this.__origin.value==`string`)return e.origin.includes(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`match`){if(this.__origin.value instanceof RegExp)return this.__origin.value.test(e.origin);if(typeof this.__origin.value==`string`)return e.origin.match(this.__origin.value);throw TypeError(`origin value should be RegExp or string by type `+this.__origin.type)}else throw TypeError(`origin type should be same or startsWith or endsWith or includes or match`);else return!0},()=>{if(this.__protocol.value)if(this.__protocol.type===`same`){if(typeof this.__protocol.value==`string`)return e.protocol===this.__protocol.value;throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`startsWith`){if(typeof this.__protocol.value==`string`)return e.protocol.startsWith(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`endsWith`){if(typeof this.__protocol.value==`string`)return e.protocol.endsWith(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`includes`){if(typeof this.__protocol.value==`string`)return e.protocol.includes(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`match`){if(this.__protocol.value instanceof RegExp)return this.__protocol.value.test(e.protocol);if(typeof this.__protocol.value==`string`)return e.protocol.match(this.__protocol.value);throw TypeError(`protocol value should be RegExp or string by type `+this.__protocol.type)}else throw TypeError(`protocol type should be same,startsWith,endsWith,includes,match`);else return!0},()=>{if(this.__host.value){let t=this.__host.hasPort?e.host:e.hostname;if(this.__host.type===`same`){if(typeof this.__host.value==`string`)return this.__host.value===t;throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`startsWith`){if(typeof this.__host.value==`string`)return t.startsWith(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`endsWith`){if(typeof this.__host.value==`string`)return t.endsWith(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`includes`){if(typeof this.__host.value==`string`)return t.includes(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`match`){if(this.__host.value instanceof RegExp)return this.__host.value.test(t);if(typeof this.__host.value==`string`)return t.match(this.__host.value);throw TypeError(`host value should be RegExp or string by type `+this.__host.type)}else throw TypeError(`host type should be same,startsWith,endsWith,includes,match`)}else return!0},()=>{if(this.__pathname.value)if(this.__pathname.type===`same`){if(typeof this.__pathname.value==`string`)return e.pathname===this.__pathname.value;throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`startsWith`){if(typeof this.__pathname.value==`string`)return e.pathname.startsWith(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`endsWith`){if(typeof this.__pathname.value==`string`)return e.pathname.endsWith(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`includes`){if(typeof this.__pathname.value==`string`)return e.pathname.includes(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`match`){if(this.__pathname.value instanceof RegExp)return this.__pathname.value.test(e.pathname);if(typeof this.__pathname.value==`string`)return e.pathname.match(this.__pathname.value);throw TypeError(`pathname value should be RegExp or string by type `+this.__pathname.type)}else throw TypeError(`pathname type should be same,startsWith,endsWith,includes,match`);else return!0},()=>{let t=!0,n=[];this.__searchParams.value.forEach(e=>{n.push(e)});for(let r=0;r<n.length;r++){let i=n[r];if(i.type)if(i.type===`same`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search===i.value.toString();throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`startsWith`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.startsWith(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`endsWith`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.endsWith(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`includes`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.includes(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`match`){if(i.value instanceof RegExp)return i.value.test(e.search);if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.match(i.value.toString());throw TypeError(`search value should be RegExp、string、number、boolean by type `+i.type)}else throw TypeError(`search type should be same, startsWith, endsWith, includes, match`);else if(typeof i.name==`string`){let n=i.value;if(n==null||typeof n==`string`||typeof n==`number`||typeof n==`boolean`){if(n=n?.toString(),!e.searchParams.has(i.name,n)){t=!1;break}}else if(n instanceof RegExp){let r=e.searchParams.get(i.name);if(r){if(!n.test(r)){t=!1;break}}else{t=!1;break}}else throw TypeError(`searchParams value should be string, RegExp, boolean, number, null, undefined`)}else if(i.name instanceof RegExp){let n,r;if(e.searchParams.forEach((e,t)=>{!n&&t.match(i.name)&&(n=t,r=e)}),n){let e=i.value;if(e!=null)if(typeof e==`string`||typeof e==`number`||typeof e==`boolean`){if(e=e.toString(),t=e===r,!t)break}else if(e instanceof RegExp)if(r){if(!e.test(r)){t=!1;break}}else{t=!1;break}else throw TypeError(`searchParams value should be string, RegExp, boolean, number, null, undefined`)}else{t=!1;break}}else throw TypeError(`searchParams name should be string or RegExp`)}return t}].every(e=>e())}},S={host(e,t){return S.builder(t).host(e)},hostName(e,t){return S.builder(t).hostName(e)},search(e,t){return S.builder(t).search(e)},seachParams(e,t,n){return S.builder(n).searchParams(e,t)},pathname(e,t){return S.builder(t).pathname(e)},protocol(e,t){return S.builder(t).protocol(e)},builder(e){return new ie(e)}},C={isBaiduSearch(){return S.builder().hostNameMatch(/^(ipv6|www|www1|m).baidu.com$/).pathname(`/s`).r()},isGoogleSearch(){return S.builder().hostNameIncludes(`google.com`).pathname(`/search`).r()},isBingSearch(){return S.builder().hostNameMatch(/.*.bing.(com|net)$/).pathname(`/search`).r()}},w={waitRemove(...t){t.forEach(t=>{typeof t==`string`&&e.default.waitNodeList(t).then(e=>{e.forEach(e=>e.remove())})})},createBlockCSSNode(...t){let n=[];if(t.length!==0&&!(t.length===1&&typeof t[0]==`string`&&t[0].trim()===``))return t.forEach(e=>{Array.isArray(e)?n=n.concat(e):n.push(e)}),e.default.createElement(`style`,{type:`text/css`,innerHTML:`${n.join(`,
`)}{display: none !important;}`})},addBlockCSS(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]==`string`&&e[0].trim()===``)&&(e.forEach(e=>{Array.isArray(e)?t=t.concat(e):t.push(e)}),t=t.map(e=>e.trim()).filter(e=>e!==``),t.length))return G(`${t.join(`,
`)}{display: none !important;}`)},addBlockCSSWithEnd(...e){let t=w.addBlockCSS(...e);return t&&document.documentElement.appendChild(t),t},setGMResourceCSS(e){let t=typeof m==`function`?m(e.keyName):null;return typeof t==`string`&&t?G(t):w.loadStyleLink(e.url)},async loadStyleLink(t){let n=document.createElement(`link`);return n.rel=`stylesheet`,n.type=`text/css`,n.href=t,new Promise(t=>{e.default.onReady(()=>{document.head.appendChild(n),t(n)})})},async loadScript(e){let t=document.createElement(`script`);return t.src=e,new Promise(e=>{t.onload=()=>{e(null)},(document.head||document.documentElement).appendChild(t)})},fixUrl(e){return e=e.trim(),e.startsWith(`data:`)||e.match(/^http(s|):\/\//i)?e:e.startsWith(`//`)?(e.startsWith(`///`)||(e=window.location.protocol+e),e):(e.startsWith(`/`)||(e+=`/`),e=window.location.origin+e,e)},fixHttps(e){if(e.startsWith(`https://`)||!e.startsWith(`http://`))return e;try{let t=new URL(e);return t.protocol=`https:`,t.toString()}catch{return e}},lockScroll(...e){let t=document.createElement(`style`);t.innerHTML=`
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;let n=[document.documentElement,document.body].concat(...e||[]);return n.forEach(e=>{e.classList.add(`pops-overflow-hidden-important`)}),(document.head||document.documentElement).appendChild(t),{recovery(){n.forEach(e=>{e.classList.remove(`pops-overflow-hidden-important`)}),t.remove()}}},async getClipboardText(){function e(e){navigator.clipboard.readText().then(t=>{e(t)}).catch(t=>{B.error(`读取剪贴板内容失败👉`,t),e(``)})}function t(t){navigator.permissions.query({name:`clipboard-read`}).then(()=>{e(t)}).catch(n=>{B.error(`申请剪贴板权限失败，尝试直接读取👉`,n.message??n.name??n.stack),e(t)})}function n(){return!(typeof navigator?.clipboard?.readText!=`function`||typeof navigator?.permissions?.query!=`function`)}return new Promise(e=>{if(!n()){e(``);return}document.hasFocus()?t(e):window.addEventListener(`focus`,()=>{t(e)},{once:!0})})},escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`).replace(/©/g,`&copy;`).replace(/®/g,`&reg;`).replace(/™/g,`&trade;`).replace(/→/g,`&rarr;`).replace(/←/g,`&larr;`).replace(/↑/g,`&uarr;`).replace(/↓/g,`&darr;`).replace(/—/g,`&mdash;`).replace(/–/g,`&ndash;`).replace(/…/g,`&hellip;`).replace(/ /g,`&nbsp;`).replace(/\r\n/g,`<br>`).replace(/\r/g,`<br>`).replace(/\n/g,`<br>`).replace(/\t/g,`&nbsp;&nbsp;&nbsp;&nbsp;`)},interval(e,t,n=5e3){let r,i=n-t,a=t,o=async n=>{let s=await e(n);if(typeof s==`boolean`&&s||n){L.workerClearTimeout(r);return}if(a+=t,a>i){o(!0);return}r=L.workerSetTimeout(()=>{o(!1)},t)};o(!1)},findParentNode(t,n,r){if(r){let i=e.default.closest(t,r);if(i)return i.querySelector(n)}else return e.default.matches(t,n)?t:e.default.closest(t,n)},toStr(e,t=2){let n=`__undefined__placeholder__replaced__str__`+performance.now();return JSON.stringify(e,(e,t)=>t===void 0?n:t,t).replace(RegExp(`"${n}"`,`g`),`undefined`)},isVerticalScreen(){return!globalThis.screen.orientation.type.includes(`landscape`)},isMobileDevice(e=768){return this.isVerticalScreen()?globalThis.innerWidth<e:globalThis.innerHeight<e},isTopWindow(){let e=typeof x==`object`&&x?x:window;return e.top===e.self},formatVideoDuration(e){if(typeof e!=`number`&&(e=parseInt(e)),isNaN(e))return e.toString();let t=function(e){return e<10?`0${e}`:e};if(e<60)return`0:${t(e)}`;if(e>=60&&e<3600)return`${Math.floor(e/60)}:${t(e%60)}`;{let n=Math.floor(e/3600),r=Math.floor(e/60)%60,i=e%60;return`${n}:${t(r)}:${t(i)}`}},formatTimeStamp(e,t){if(typeof e==`number`&&e<0xe8d4a51000){let t=String(Date.now()).length-String(e).length;e*=10**t}let n=e,r=new Date(typeof e==`string`?e.replace(/-/g,`/`):e),i=new Date(t??Date.now()).getTime()-r.getTime(),a=Math.floor(i/(24*3600*1e3));if(a>0)n=a>7?L.formatTime(r.getTime()):a+`天前`;else{let e=i%(24*3600*1e3),t=Math.floor(e/(3600*1e3));if(t>0)n=t+`小时前`;else{let t=e%(3600*1e3),r=Math.floor(t/(60*1e3));if(r>0)n=r+`分钟前`;else{let e=t%(60*1e3);n=Math.round(e/1e3)+`秒前`}}}return n}},T=`GM_Panel`,ae=`data-init`,E=`data-key`,D=`data-default-value`,O=`data-init-more-value`,oe=`data-plugin-search-config`,k=`data-storage-api`,A={followBrowserSize:!1,get width(){return A.followBrowserSize?globalThis.outerWidth:globalThis.innerWidth},get height(){return A.followBrowserSize?globalThis.outerHeight:globalThis.innerHeight}},j={setting:{get width(){return A.width<550?`88vw`:A.width<700?`550px`:`700px`},get height(){return A.height<450?`70vh`:A.height<550?`450px`:`550px`}},settingMiddle:{get width(){return A.width<350?`88vw`:`350px`},get height(){return A.height<450?`88vh`:`450px`}},settingBig:{get width(){return A.width<800?`92vw`:`800px`},get height(){return A.height<600?`80vh`:`600px`}},info:{get width(){return A.width<350?`88vw`:`350px`},get height(){return A.height<250?`88vh`:`250px`}}},M={$data:{__contentConfig:null,get contentConfig(){return this.__contentConfig??=new L.Dictionary,this.__contentConfig},__defaultBottomContentConfig:[]},addContentConfig(e){Array.isArray(e)||(e=[e]);let t=this.$data.contentConfig.keys().length;this.$data.contentConfig.set(t,e)},getAllContentConfig(){return this.$data.contentConfig.values().flat()},getConfig(e=0){return this.$data.contentConfig.get(e)??[]},getDefaultBottomContentConfig(e){if(this.$data.__defaultBottomContentConfig.length)return this.$data.__defaultBottomContentConfig;let t=!1,n,i=(t,n)=>{if(e&&typeof e.translateCallback==`function`)return e.translateCallback(t,n);if(typeof n==`object`&&n)for(let e in n)t=t.replaceAll(`{{${e}}}`,n[e]);return t},a=(e,t)=>{typeof t!=`string`&&(t=w.toStr(t));let n=new Blob([t]),r=globalThis.URL.createObjectURL(n);R.createElement(`a`,{href:r,download:e}).click(),L.workerSetTimeout(()=>{globalThis.URL.revokeObjectURL(r)},500)},o=()=>{let e=e=>{let t=z.alert({title:{text:i(`请选择导入方式`),position:`center`},content:{text:`
            <div class="btn-control" data-mode="local">${i(`本地导入`)}</div>
            <div class="btn-control" data-mode="network">${i(`网络导入`)}</div>
            <div class="btn-control" data-mode="clipboard">${i(`剪贴板导入`)}</div>`,html:!0},btn:{ok:{enable:!1},close:{enable:!0,callback(e){e.close()}}},drag:!0,mask:{enable:!0},width:j.info.width,height:j.info.height,style:`
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
          }`}),n=t.$shadowRoot.querySelector(`.btn-control[data-mode='local']`),a=t.$shadowRoot.querySelector(`.btn-control[data-mode='network']`),o=t.$shadowRoot.querySelector(`.btn-control[data-mode='clipboard']`),s=async t=>{confirm(i(`是否清空脚本存储的配置？（如果点击取消按钮，则仅做配置覆盖处理）`))&&(typeof _==`function`?typeof p==`function`?(_().forEach(e=>{p(e)}),r.default.success(i(`已清空脚本存储的配置`))):r.default.error(i(`不支持GM_deleteValue函数，无法执行删除脚本配置`)):r.default.error(i(`不支持GM_listValues函数，无法清空脚本存储的配置`))),typeof b==`function`?b(t):Object.keys(t).forEach(e=>{let n=t[e];y(e,n)}),r.default.success(i(`配置导入完毕`)),e?.()},c=e=>new Promise(async t=>{let n=L.toJSON(e);Object.keys(n).length===0?r.default.warning(i(`解析为空配置，不导入`)):await s(n),t(!0)});R.on(n,`click`,e=>{R.preventEvent(e),t.close();let n=R.createElement(`input`,{type:`file`,accept:`.json`});R.on(n,[`propertychange`,`input`],()=>{if(!n.files?.length)return;let e=n.files[0],t=new FileReader;t.onload=()=>{c(t.result)},t.readAsText(e,`UTF-8`)}),n.click()}),R.on(a,`click`,e=>{R.preventEvent(e),t.close();let n=z.prompt({title:{text:i(`网络导入`),position:`center`},content:{text:``,placeholder:i(`请填写URL`),focus:!0},btn:{close:{enable:!0,callback(e){e.close()}},ok:{text:i(`导入`),callback:async e=>{let t=e.text;if(L.isNull(t)){r.default.error(i(`请填入完整的url`));return}let n=r.default.loading(i(`正在获取配置...`)),a=await W.get(t,{allowInterceptConfig:!1});if(n.close(),!a.status){B.error(a),r.default.error(i(`获取配置失败`),{consoleLogContent:!0});return}await c(a.data.responseText)&&e.close()}},cancel:{enable:!1}},drag:!0,mask:{enable:!0},width:j.info.width,height:`auto`}),a=n.$shadowRoot.querySelector(`input`),o=n.$shadowRoot.querySelector(`.pops-prompt-btn-ok`);R.on(a,[`input`,`propertychange`],()=>{R.val(a)===``?R.attr(o,`disabled`,`true`):R.removeAttr(o,`disabled`)}),R.onKeyboard(a,`keydown`,(e,t,n)=>{e===`Enter`&&n.length===0&&R.val(a)!==``&&R.emit(o,`click`)}),R.emit(a,`input`)}),R.on(o,`click`,async e=>{R.preventEvent(e),t.close();let n=await w.getClipboardText();if(n.trim()===``){r.default.warning(i(`获取到的剪贴板内容为空`));return}await c(n)})},t=(e=`${V}_panel-setting-${L.formatTime(Date.now(),`yyyy_MM_dd_HH_mm_ss`)}.json`,t)=>{let n=z.alert({title:{text:i(`请选择导出方式`),position:`center`},content:{text:`
            <div class="btn-control" data-mode="export-to-file">${i(`导出至文件`)}</div>
            <div class="btn-control" data-mode="export-to-clipboard">${i(`导出至剪贴板`)}</div>
            `,html:!0},btn:{ok:{enable:!1},close:{enable:!0,callback(e){e.close()}}},drag:!0,mask:{enable:!0},width:j.info.width,height:j.info.height,style:`
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
          }`}),o=n.$shadowRoot.querySelector(`.btn-control[data-mode='export-to-file']`),s=n.$shadowRoot.querySelector(`.btn-control[data-mode='export-to-clipboard']`);R.on(o,`click`,i=>{R.preventEvent(i);try{a(e,t),n.close()}catch(e){r.default.error(e.toString(),{consoleLogContent:!0})}}),R.on(s,`click`,async()=>{await L.copy(t)?(r.default.success(i(`复制成功`)),n.close()):r.default.error(i(`复制失败`))})},n=z.confirm({title:{text:i(`配置`),position:`center`},content:{text:`<textarea name="config-value" id="config" readonly></textarea>`,html:!0},btn:{ok:{enable:!0,type:`primary`,text:i(`导入`),callback(){e()}},cancel:{enable:!0,text:i(`导出`),callback(){t(void 0,s)}}},width:A.width<450?`90vw`:`450px`,height:`auto`,style:`
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
        `}).$shadowRoot.querySelector(`textarea`),o={};if(typeof _==`function`)_().forEach(e=>{let t=h(e);Reflect.set(o,e,t)});else{r.default.warning(i(`不支持函数GM_listValues，仅导出菜单配置`));let e=h(T);Reflect.set(o,T,e)}let s=w.toStr(o);n.value=s},s=()=>{let e=g?.script?.supportURL||g?.script?.namespace;typeof e==`string`&&L.isNotNull(e)&&window.open(e,`_blank`)};return[{id:`script-version`,title:i(`版本：{{version}}`,{version:g?.script?.version||i(`未知`)}),isBottom:!0,views:[],clickFirstCallback(){return!1},afterRender(e){new H(e.$asideLiElement).on(`tap`,function(){clearTimeout(n),n=void 0,t?(t=!1,o()):(n=setTimeout(()=>{t=!1,s()},200),t=!0)})}}]},setDefaultBottomContentConfig(e){this.$data.__defaultBottomContentConfig=e}},se={$data:{__menuOption:[{key:`show_pops_panel_setting`,text:`⚙ 设置`,autoReload:!1,isStoreValue:!1,showText(e){return e},callback:()=>{F.showPanel(M.getConfig(0))}}],get menuOption(){return this.__menuOption}},init(){this.initExtensionsMenu()},initExtensionsMenu(){w.isTopWindow()&&ce.add(this.$data.menuOption)},addMenuOption(e){Array.isArray(e)||(e=[e]),this.$data.menuOption.push(...e)},updateMenuOption(e){Array.isArray(e)||(e=[e]),e.forEach(e=>{let t=this.$data.menuOption.findIndex(t=>t.key===e.key);t!==-1&&(this.$data.menuOption[t]=e)})},getMenuOption(e=0){return this.$data.menuOption[e]},deleteMenuOption(e=0){this.$data.menuOption.splice(e,1)}},N=class{data={storeNodeList:[],destoryFnList:[]};option={};constructor(e){this.option=e}handlerResult(e,t){let n=[],r=[],i=[];if(Array.isArray(t))i=i.concat(t);else{let e=t=>{if(typeof t==`object`&&t)if(t instanceof Element)i.push(t);else if(Array.isArray(t))e(t);else{let{$css:e,destory:n}=t;e!=null&&(Array.isArray(e)?i=i.concat(e):e instanceof Element&&i.push(e)),typeof n==`function`&&i.push(n)}else i.push(t)};e(t)}let a=e=>{if(e!=null){if(e instanceof Element){n.push(e);return}if(typeof e==`function`){r.push(e);return}}};for(let e of i){let t=a(e);if(typeof t==`boolean`&&!t)break;if(Array.isArray(e))for(let t of e){let e=a(t);if(typeof e==`boolean`&&!e)break}}this.clearStoreNodeList(),this.execDestoryFnAndClear(),e&&(this.data.storeNodeList=this.data.storeNodeList.concat(n),this.data.destoryFnList=this.data.destoryFnList.concat(r))}getEnableStatus(e){return!!this.option.getValue(e)}clearStoreNodeList=()=>{for(let e=this.data.storeNodeList.length-1;e>=0;e--)this.data.storeNodeList[e]?.remove(),this.data.storeNodeList.splice(e,1)};execDestoryFnAndClear=()=>{for(let e=this.data.destoryFnList.length-1;e>=0;e--){let t=this.data.destoryFnList[e];t(),this.data.destoryFnList.splice(e,1)}};checkMenuExec(){let e=!1;return e=typeof this.option.checkExec==`function`?this.option.checkExec(this.option.keyList):this.option.keyList.every(e=>this.getEnableStatus(e)),e}},P=new class{storageKey;listenerData;cacheData;callbacks=[];constructor(e){if(typeof e==`string`){let t=e.trim();if(t==``)throw Error(`key can not be empty string`);this.storageKey=t}else throw TypeError(`key must be a string`);this.listenerData=new n.default.Dictionary,this.getLocalValue=this.getLocalValue.bind(this),this.setLocalValue=this.setLocalValue.bind(this),this.destory=this.destory.bind(this),this.set=this.set.bind(this),this.get=this.get.bind(this),this.getAll=this.getAll.bind(this),this.delete=this.delete.bind(this),this.has=this.has.bind(this),this.keys=this.keys.bind(this),this.values=this.values.bind(this),this.clear=this.clear.bind(this),this.addValueChangeListener=this.addValueChangeListener.bind(this),this.removeValueChangeListener=this.removeValueChangeListener.bind(this),this.emitValueChangeListener=this.emitValueChangeListener.bind(this)}[Symbol.dispose](){this.destory()}async[Symbol.asyncDispose](){this.destory()}destory(){this.cacheData=null;for(let e=this.callbacks.length-1;e>=0;e--){let t=this.callbacks[e];t(),this.callbacks.splice(e,1)}}getLocalValue(){if(this.cacheData==null){let e=h(this.storageKey);e??(e={},this.setLocalValue(e)),this.destory(),this.cacheData=e;let t=f(this.storageKey,(e,t,n)=>{this.cacheData=null,this.cacheData=n});return this.callbacks.push(()=>{v(t)}),e}else return this.cacheData}setLocalValue(e){this.cacheData=null,this.cacheData=e,y(this.storageKey,e)}set(e,t){let n=this.get(e),r=this.getLocalValue();Reflect.set(r,e,t),this.setLocalValue(r),this.emitValueChangeListener(e,t,n)}get(e,t){let n=this.getLocalValue();return Reflect.get(n,e)??t}getAll(){return this.getLocalValue()}delete(e){let t=this.get(e),n=this.getLocalValue();Reflect.deleteProperty(n,e),this.setLocalValue(n),this.emitValueChangeListener(e,void 0,t)}has(e){let t=this.getLocalValue();return Reflect.has(t,e)}keys(){let e=this.getLocalValue();return Reflect.ownKeys(e)}values(){let e=this.getLocalValue();return Reflect.ownKeys(e).map(t=>Reflect.get(e,t))}clear(){this.destory(),p(this.storageKey)}addValueChangeListener(e,t){let n=Math.random(),r=this.listenerData.get(e)||[];return r.push({id:n,key:e,callback:t}),this.listenerData.set(e,r),n}removeValueChangeListener(e){let t=!1;for(let[n,r]of this.listenerData.entries()){for(let n=0;n<r.length;n++){let i=r[n];(typeof e==`string`&&i.key===e||typeof e==`number`&&i.id===e)&&(r.splice(n,1),n--,t=!0)}this.listenerData.set(n,r)}return t}async emitValueChangeListener(...e){let[t,n,r]=e;if(!this.listenerData.has(t))return;let i=this.listenerData.get(t);for(let a=0;a<i.length;a++){let o=i[a];if(typeof o.callback==`function`){let i,a;e.length===1||(e.length===2?i=n:e.length===3&&(i=n,a=r)),await o.callback(t,i,a)}}}}(T),F={$data:{__contentConfigInitDefaultValue:null,__onceExecMenuData:null,__urlChangeReloadMenuExecOnce:null,__onceExecData:null,__panelConfig:{},$panel:null,panelContent:[],get contentConfigInitDefaultValue(){return this.__contentConfigInitDefaultValue??=new L.Dictionary,this.__contentConfigInitDefaultValue},contentConfigInitDisabledKeys:[],get onceExecMenuData(){return this.__onceExecMenuData??=new L.Dictionary,this.__onceExecMenuData},get urlChangeReloadMenuExecOnce(){return this.__urlChangeReloadMenuExecOnce??=new L.Dictionary,this.__urlChangeReloadMenuExecOnce},get onceExecData(){return this.__onceExecData??=new L.Dictionary,this.__onceExecData},get scriptName(){return V},get panelConfig(){return this.__panelConfig},set panelConfig(e){this.__panelConfig=e},key:T,attributeKeyName:E,attributeDefaultValueName:D},init(){this.initContentDefaultValue(),se.init()},initContentDefaultValue(){let e=e=>{if(!e.attributes||e.type===`button`||e.type===`container`||e.type===`deepMenu`)return;let t=e.attributes,n=t[ae];if(typeof n==`function`){let e=n();if(typeof e==`boolean`&&!e)return}let r=new Map,i=t[E];if(i!=null){let e=t[D];r.set(i,e)}let a=t[O];if(typeof a==`object`&&a&&Object.keys(a).forEach(e=>{let t=a[e];r.set(e,t)}),!r.size){B.warn(`请先配置键`,e);return}if(e.type===`switch`){let t=typeof e.disabled==`function`?e.disabled():e.disabled;typeof t==`boolean`&&t&&this.$data.contentConfigInitDisabledKeys.push(...r.keys())}for(let[e,t]of r.entries())this.setDefaultValue(e,t)},t=n=>{for(let r=0;r<n.length;r++){let i=n[r];e(i);let a=i.views;a&&Array.isArray(a)&&t(a)}},n=[...M.getAllContentConfig()];for(let e=0;e<n.length;e++){let r=n[e];if(!r.views)continue;let i=r.views;i&&Array.isArray(i)&&t(i)}this.$data.contentConfigInitDisabledKeys=[...new Set(this.$data.contentConfigInitDisabledKeys)]},setDefaultValue(e,t){this.$data.contentConfigInitDefaultValue.has(e)&&B.warn(`该key的默认值已进行初始化，覆盖该默认值: `,{key:e,defaultValue:t,coverDefaultValue:this.$data.contentConfigInitDefaultValue.get(e)}),this.$data.contentConfigInitDefaultValue.set(e,t)},getDefaultValue(e){return this.$data.contentConfigInitDefaultValue.get(e)},setValue(e,t){P.set(e,t)},getValue(e,t){return P.get(e)??(this.$data.contentConfigInitDefaultValue.has(e)?this.$data.contentConfigInitDefaultValue.get(e):t)},deleteValue(e){P.delete(e)},hasKey(e){return P.has(e)},addValueChangeListener(e,t,n){let r=P.addValueChangeListener(e,t);if(n?.immediate||n?.immediateAll){let r=this.getValue(e);n?.immediate?t(e,r,r):n?.immediateAll&&F.emitMenuValueChange(e,r,r)}return r},removeValueChangeListener(e){P.removeValueChangeListener(e)},emitMenuValueChange(e,t,n){P.emitValueChangeListener(e,t,n)},async exec(e,t,n,r=!0){let i;i=typeof e==`string`||Array.isArray(e)?()=>e:e;let a=!1,o=i(),s=[];Array.isArray(o)?(a=!0,s=o):s.push(o);let c=s.find(e=>!this.$data.contentConfigInitDefaultValue.has(e));if(c){B.warn(`${c} 键不存在`);return}let l=JSON.stringify(s);if(r&&this.$data.onceExecMenuData.has(l))return this.$data.onceExecMenuData.get(l);let u=[],d=new N({keyList:s,getValue:e=>!!this.getValue(e),checkExec(e){let t=!1;return t=typeof n==`function`?n(e):e.every(e=>this.getValue(e)),t}}),f=async e=>{let n=d.checkMenuExec(),r=[];if(n){let i=s.map(e=>this.getValue(e));r=await t({key:s,triggerKey:e?.key,value:a?i:i[0],addStoreValue:(...e)=>d.handlerResult(n,e)})}d.handlerResult(n,r)};r&&s.forEach(e=>{let t=this.addValueChangeListener(e,(e,t,n)=>f({key:e,newValue:t,oldValue:n}));u.push(t)}),await f();let p={checkMenuExec:d.checkMenuExec.bind(d),keyList:s,reload(){this.clearStoreNodeList(),this.execDestoryFnAndClear(),f()},clear(){d.clearStoreNodeList(),this.execDestoryFnAndClear(),this.removeValueChangeListener(),this.clearOnceExecMenuData()},clearStoreNodeList:d.clearStoreNodeList.bind(d),execDestoryFnAndClear:d.execDestoryFnAndClear.bind(d),removeValueChangeListener:()=>{u.forEach(e=>{this.removeValueChangeListener(e)})},clearOnceExecMenuData(){r&&F.$data.onceExecMenuData.delete(l)}};return this.$data.onceExecMenuData.set(l,p),p},async execMenu(e,t,n=!1,r=!1){return await this.exec(e,async(...e)=>await t(...e),e=>e.every(e=>{let t=!!this.getValue(e);return F.$data.contentConfigInitDisabledKeys.includes(e)&&(t=!1,B.warn(`.execMenu${r?`Once`:``} ${e} 被禁用`)),n&&(t=!t),t}),r)},async execMenuOnce(e,t,n=!1,r=!1){let i=await this.execMenu(e,t,n,!0);return r&&i&&(this.removeUrlChangeWithExecMenuOnceListener(e),this.addUrlChangeWithExecMenuOnceListener(e,()=>{i.reload()})),i},async execMoreMenu(e,t,n=!1,r=!1,i=!1){let a=await Promise.all(e.map(async([e,t])=>await this.execMenu(e,(...e)=>t(...e),n,r))),o=new N({keyList:e.map(([e])=>e),getValue:e=>!!this.getValue(e)}),s=[],c=(e=!1)=>{if(o.clearStoreNodeList(),o.execDestoryFnAndClear(),e){for(let e of s)this.removeValueChangeListener(e);for(let e of a)e&&this.removeUrlChangeWithExecMenuOnceListener(e.keyList)}},l=()=>{let e=a.every(e=>!e||e.checkMenuExec());if(c(!1),e){let n=t();o.handlerResult(e,n)}};l();for(let e of a)if(e){let t=this.addValueChangeListener(e.keyList[0],()=>{l()});s.push(t),i&&(this.removeUrlChangeWithExecMenuOnceListener(e.keyList),this.addUrlChangeWithExecMenuOnceListener(e.keyList,()=>{e.reload()}))}return{clear(){for(let e of a)e?.clear();this.execDestoryFnAndClear(),this.removeValueChangeListener()},execDestoryFnAndClear(){for(let e of a)e?.execDestoryFnAndClear();c(!1)},removeValueChangeListener(){for(let e of a)e?.removeValueChangeListener();c(!0)}}},async execMoreMenuOnce(e,t,n=!1,r=!1){return await this.execMoreMenu(e,t,n,!0,r)},deleteExecMenuOnce(e){return e=this.transformKey(e),this.$data.onceExecMenuData.delete(e),this.$data.urlChangeReloadMenuExecOnce.delete(e),P.removeValueChangeListener(e)},onceExec(e,t,n=!1){if(e=this.transformKey(e),typeof e!=`string`)throw TypeError(`key 必须是字符串`);this.$data.onceExecData.has(e)||n&&(Array.isArray(e)?e:[e]).findIndex(e=>{if(!F.getValue(e))return!0})!==-1||(t(),this.$data.onceExecData.set(e,1))},deleteOnceExec(e){e=this.transformKey(e),this.$data.onceExecData.delete(e)},addUrlChangeWithExecMenuOnceListener(e,t){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.set(e,t),{off:()=>this.removeUrlChangeWithExecMenuOnceListener(e)}},removeUrlChangeWithExecMenuOnceListener(e){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.delete(e)},hasUrlChangeWithExecMenuOnceListener(e){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.has(e)},async emitUrlChangeWithExecMenuOnceEvent(e){let t=this.$data.urlChangeReloadMenuExecOnce.values();for(let n of t)await n(e)},showPanel(e,t=`${V}-设置`,n=!1,r=!1){this.$data.$panel=null,this.$data.panelContent=[];let i=e.findIndex(e=>(typeof e.isBottom==`function`?e.isBottom():!!e.isBottom)&&e.id===`script-version`)!==-1;!n&&!i&&e.push(...M.getDefaultBottomContentConfig());let a=z.panel({title:{text:t,position:`center`,html:!1,style:``},content:e,btn:{close:{enable:!0,callback:e=>{e.close(),this.$data.$panel=null}}},mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1},clickCallBack:e=>{e(),this.$data.$panel=null}},width:j.setting.width,height:j.setting.height,drag:!0,only:!0,style:`
      .pops-switch-shortcut-wrapper{
        margin-right: 5px;
        display: inline-flex;
      }
      .pops-switch-shortcut-wrapper:hover .pops-bottom-icon{
        cursor: pointer;
      }
      `,...this.$data.panelConfig});return this.$data.$panel=a,this.$data.panelContent=e,r||this.registerConfigSearch({$panel:a,content:e}),{$panel:a,content:e}},registerConfigSearch(e){let{$panel:t,content:n}=e,i=(t,n)=>{if(typeof e.translateCallback==`function`)return e.translateCallback(t,n);if(typeof n==`object`&&n)for(let e in n)t=t.replaceAll(`{{${e}}}`,n[e]);return t},a=async(e,t)=>{if(e==null)return;let n=await t(e);return n&&typeof n.isFind==`boolean`&&n.isFind?n.data:await a(n.data,t)},o=(e,t)=>{let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(t?.(),n.disconnect())})},{root:null,threshold:1});n.observe(e),e.scrollIntoView({behavior:`smooth`,block:`center`})},s=e=>{let t=`pops-flashing`;R.onAnimationend(e,()=>{e.classList.remove(t)}),e.classList.add(t)},c=c=>{if(c.type===`dblclick`&&f)return;R.preventEvent(c);let l=z.alert({title:{text:i(`搜索配置`),position:`center`},content:{text:`
						<div class="search-wrapper">
							<input class="search-config-text" name="search-config" type="text" placeholder="${i(`请输入需要搜素的配置名称`)}">
						</div>
						<div class="search-result-wrapper"></div>
					`,html:!0},btn:{ok:{enable:!1}},mask:{clickEvent:{toClose:!0}},width:j.settingMiddle.width,height:`auto`,drag:!0,style:`
					${z.config.cssText.panelCSS}

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
            flex-wrap: wrap;
					}
					.search-result-item-description{
						font-size: 0.8em;
						color: #6c6c6c;
					}
					${e.searchDialogStyle??``}
				`}),u=l.$shadowRoot.querySelector(`.search-config-text`),d=l.$shadowRoot.querySelector(`.search-result-wrapper`);u.focus();let p=()=>{R.empty(d)},m=e=>{let n=L.queryProperty(e,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e}),c=R.createElement(`div`,{className:`search-result-item`,innerHTML:`
							<div class="search-result-item-path">${n.matchedData?.path}</div>
							<div class="search-result-item-description">${n.matchedData?.description??``}</div>
						`}),l=z.fn.PanelHandlerComponents();return R.on(c,`click`,()=>{let n=t.$shadowRoot.querySelectorAll(`aside.pops-panel-aside .pops-panel-aside-top-container li`)[e.index];if(!n){r.default.error(i(`左侧项下标{{index}}不存在`,{index:e.index}));return}n.scrollIntoView({behavior:`smooth`,block:`center`}),n.click(),a(e.next,async e=>{if(e?.next){let n=await R.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll(`.pops-panel-deepMenu-nav-item`)).find(t=>{let n=Reflect.get(t,l.$data.nodeStoreConfigKey);return typeof n==`object`&&!!n&&n.text===e.name}),2500);if(n)n.click();else return r.default.error(i(`未找到对应的二级菜单`)),{isFind:!0,data:e};return{isFind:!1,data:e.next}}else{let n=await R.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll(`li:not(.pops-panel-deepMenu-nav-item)`)).find(t=>Reflect.get(t,l.$data.nodeStoreConfigKey)===e.matchedData?.formConfig),2500);if(n){o(n);let e=n.closest(`.pops-panel-forms-fold[data-fold-enable]`);e&&(e.querySelector(`.pops-panel-forms-fold-container`).click(),await L.sleep(500)),o(n,()=>{s(n)})}else r.default.error(i(`未找到对应的菜单项`));return{isFind:!0,data:e}}})}),c},h=e=>{let t=new RegExp(e,`i`),r=[],i=(e,n)=>{for(let a=0;a<e.length;a++){let o=e[a],s=o.views;if(s&&Array.isArray(s)){let e=L.deepClone(n);if(o.type===`deepMenu`){let t=L.queryProperty(e,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e});t.next={name:o.text}}i(s,e)}else{let e,i;if(o.type===`own`){let t=Reflect.get(o.attributes||{},oe);t&&(typeof t==`function`&&(t=t()),typeof t.text==`string`&&(e=t.text),typeof t.desc==`string`&&(i=t.desc))}else e=o.text,i=Reflect.get(o,`description`);let a=[e,i],s=a.findIndex(e=>{if(typeof e==`string`)return e.match(t)});if(s!==-1){let t=L.deepClone(n),c=L.queryProperty(t,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e});c.next={name:e,matchedData:{path:``,formConfig:o,matchedText:a[s],description:i}};let l=[];L.queryProperty(t,e=>{let t=e?.name;return typeof t==`string`&&t.trim()!==``&&l.push(t),e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e}});let u=l.join(w.escapeHtml(` - `));c.next.matchedData.path=u,r.push(t)}}}};for(let e=0;e<n.length;e++){let t=n[e];if(!t.views||t.isBottom&&t.id===`script-version`)continue;let r=t.views;if(r&&Array.isArray(r)){let n=t.title;typeof n==`function`&&(n=n()),i(r,{index:e,name:n})}}let a=document.createDocumentFragment();for(let e of r){let t=m(e);a.appendChild(t)}p(),d.append(a)};R.on(u,`input`,L.debounce(e=>{R.preventEvent(e);let t=R.val(u).trim();if(t===``){p();return}h(t)},200))};t.$shadowRoot.querySelectorAll(`aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`).forEach(e=>{R.on(e,`dblclick`,c)});let l=new WeakMap,u=!1,d,f=!1;R.on(t.$shadowRoot,`touchend`,`aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`,(e,t)=>{f=!0,clearTimeout(d),d=void 0,u&&l.has(t)?(u=!1,l.delete(t),c(e)):(d=setTimeout(()=>{u=!1},200),u=!0,l.set(t,e))},{capture:!0}),t.$shadowRoot.appendChild(R.createElement(`style`,{type:`text/css`,textContent:`
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
    		`}))},transformKey(e){if(Array.isArray(e))if(e.length>1){let t=e.sort();return JSON.stringify(t)}else return e[0];else return e},getDynamicValue(e,t){let n=!1,r=t,i=this.addValueChangeListener(e,(e,t)=>{r=t});return{get value(){return n||(n=!0,r=F.getValue(e,t)),r},destory(){F.removeValueChangeListener(i)}}}},I={qmsg_config_position:{key:`qmsg-config-position`,defaultValue:`bottom`},qmsg_config_maxnums:{key:`qmsg-config-maxnums`,defaultValue:3},qmsg_config_showreverse:{key:`qmsg-config-showreverse`,defaultValue:!1},httpx_cookie_manager_enable:{key:`httpx-use-cookie-enable`,defaultValue:!1},httpx_cookie_manager_use_document_cookie:{key:`httpx-use-document-cookie`,defaultValue:!1}},L=n.default.noConflict(),R=e.default.noConflict(),z=t.default,B=new L.Log(g,x.console||re.console),V=g?.script?.name||void 0,H=t.default.fn.Utils.AnyTouch();B.config({debug:!1,logMaxCount:250,autoClearConsole:!0,tag:!0});var U=()=>{let e=t.default.fn.InstanceUtils.getPopsMaxZIndex()?.zIndex??0,n=L.getMaxZIndexNodeInfoFromPoint()[0]?.zIndex??0;return Math.max(100,e,n)};r.default.config({isHTML:!0,autoClose:!0,showClose:!1,consoleLogContent(e){let t=e.setting.type;if(t===`loading`)return!1;let n=e.setting.content;return t===`warning`?B.warn(n):t===`error`?B.error(n):B.info(n),!1},get position(){return F.getValue(I.qmsg_config_position.key,I.qmsg_config_position.defaultValue)},get maxNums(){return F.getValue(I.qmsg_config_maxnums.key,I.qmsg_config_maxnums.defaultValue)},get showReverse(){return F.getValue(I.qmsg_config_showreverse.key,I.qmsg_config_showreverse.defaultValue)},get zIndex(){return U()}}),z.GlobalConfig.setGlobalConfig({zIndex:()=>U(),mask:{enable:!0,clickEvent:{toClose:!1,toHide:!1}},drag:!0});var ce=new L.GM_Menu({GM_getValue:h,GM_setValue:y,GM_registerMenuCommand:ee,GM_unregisterMenuCommand:te}),W=new L.Httpx({xmlHttpRequest:ne,logDetails:!1});W.interceptors.request.use(e=>e),W.interceptors.response.use(e=>e,e=>(B.error(`[Httpx-HttpxRequest.response] 响应错误`,{data:e}),e.type===`onabort`?r.default.warning(`请求取消`,{consoleLogContent:!0}):e.type===`onerror`?r.default.error(`请求异常`,{consoleLogContent:!0}):e.type===`ontimeout`?r.default.error(`请求超时`,{consoleLogContent:!0}):r.default.error(`其它错误`,{consoleLogContent:!0}),e)),x.Object.defineProperty,x.Object.keys,x.Object.values,x.Function.prototype.apply,x.Function.prototype.call,x.Element.prototype.appendChild,x.setTimeout.bind(x),x.clearTimeout.bind(x),x.setInterval.bind(x),x.clearInterval.bind(x);var G=R.addStyle.bind(R),K=e=>{let t=G(e);return document.documentElement.appendChild(t),t},q=w.addBlockCSS.bind(w),J=w.addBlockCSSWithEnd.bind(w);e.default.selector.bind(e.default);var Y=e.default.selectorAll.bind(e.default),X=new L.CookieManagerService({baseCookieHandler:`GM_cookie`});X.isSupportGM_cookie||(X.isSupportCookieStore?X.setOptions({baseCookieHandler:`cookieStore`}):X.setOptions({baseCookieHandler:`document.cookie`})),new L.DocumentCookieHandler;var le={init(){F.execMenuOnce([`baidu-search-optimizationResult-enable`,`baidu-search-optimizationResult-removeAds`,`baidu-search-optimizationResult-redirect`,`baidu-search-optimizationResult-addFavicon`,`baidu-search-optimizationResult-markUnsafeLink`],e=>{let[t,n,r,i,a]=e.value;if(t&&!(!n&&!r&&!i&&!a))return this.searchResultOptimization({removeAds:n,redirect:r,addFavicon:i,markUnsafeLink:a})})},searchResultOptimization(e){B.info(`搜索结果优化`,e);let t=new L.LockFunction(()=>{let t=Y(`#content_left > div:not([data-hijack])`);for(let n of t){if(e.removeAds&&R.selector(`.se_st_footer:contains("广告")`,n)){n.remove();continue}let t=n.querySelector(`a.sc-link[href]`)||n.querySelector(`.c-title a[href]`)||n.querySelector(`a.cosc-title-a[href]`)||n.querySelector(`[class*="c-line-"] > a[href][class^="title_"]`);if(!t)continue;let r=n.getAttribute(`mu`),i=[];typeof r==`string`&&i.push(r);let a=n.querySelector(`.cosc-feedback[data-feedback]`)?.getAttribute(`data-feedback`);if(a){let e=L.toJSON(a);typeof e.url==`string`&&i.push(e.url)}let o=i.find(e=>{try{let t=new URL(e);if(t.hostname===`nourl.ubs.baidu.com`||t.hostname.endsWith(`.lightapp.baidu.com`)||t.hostname===`www.baidu.com`&&t.pathname===`/link`&&t.searchParams.has(`url`))return}catch{}return e});if(!o)continue;n.setAttribute(`data-hijack`,`true`);let s=t.getAttribute(`href`);if(e.redirect&&(t.href=o,n.setAttribute(`data-before-url`,s)),e.addFavicon){let e=R.createElement(`img`);e.className=`website-ico`;try{e.src=`${new URL(o).origin}/favicon.ico`,R.prepend(t,e),R.css(t,{display:`flex`,"align-items":`center`}),R.on(e,`error`,()=>{e.remove()})}catch{}}e.markUnsafeLink&&o.startsWith(`http://`)&&(R.prepend(t,`
                <svg viewBox="0 0 1102 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" style="margin-right: 4px;"><path d="M1079.847385 767.133538l-389.513847-690.845538c-62.621538-101.651692-215.197538-101.769846-277.858461 0l-389.513846 690.806154c-64 103.896615 13.469538 235.441231 138.870154 235.441231H940.898462c125.282462 0 202.909538-131.426462 138.909538-235.401847zM551.384615 877.843692c-35.603692 0-64.590769-27.963077-64.590769-62.345846 0-34.343385 28.987077-62.306462 64.590769-62.306461 35.603692 0 64.590769 27.963077 64.59077 62.306461 0 34.382769-28.987077 62.345846-64.59077 62.345846z m64.59077-249.304615c0 34.343385-28.987077 62.306462-64.59077 62.306461-35.603692 0-64.590769-27.963077-64.590769-62.345846V316.849231c0-34.382769 28.987077-62.345846 64.590769-62.345846 35.603692 0 64.590769 27.963077 64.59077 62.345846v311.650461z" fill="#ED4662" p-id="6187"></path></svg>
              `),R.css(t,{color:`#ecb3b3 !important`,"text-decoration":`line-through !important`}))}}),n=L.mutationObserver(document,{config:{subtree:!0,childList:!0,attributes:!0},immediate:!0,callback:()=>{t.run()}});return[K(`
          img.website-ico{
            width: 1em;
            height: 1em;
            object-fit: contain;
            margin-right: 4px;
          }
          #content_left a.sc-link:has(img.website-ico){
            display: inline-flex !important;
          }
        `),()=>{n.disconnect()},e.removeAds?J(`#content_left > div:has(.ec-tuiguang)`,`#content_left > div:has(.c-recomm-wrap)`):null]}},ue={init(){F.execMenuOnce(`baidu-search-removeRightPanel`,()=>this.removeRightPanel()),F.execMenuOnce(`baidu-search-removeEveryOneSearch`,()=>this.removeEveryOneSearch()),F.execMenuOnce(`baidu-search-removeRelatedSearch`,()=>this.removeRelatedSearch()),F.execMenuOnce(`baidu-search-removeSelectTextDialog`,()=>this.removeSelectTextDialog()),F.execMenuOnce([`baidu-search-showOptimization-enable`,`baidu-search-showOptimization-mode`],e=>{let[t,n]=e.value;if(t&&!L.isNull(n))return this.searchResultShowOptimization(n)}),le.init()},removeRightPanel(){return B.info(`移除右侧栏`),J(`#content_right`)},removeEveryOneSearch(){return B.info(`移除大家都在搜`),J(`.result-op[tpl="recommend_list"]`)},removeRelatedSearch(){return B.info(`移除相关搜索`),J(`.result-molecule:has(#rs_new)`)},removeSelectTextDialog(){return B.info(`移除选中文本弹窗`),J(`#wrapper_wrapper > .selected-search-box`)},searchResultShowOptimization(e){B.info(`搜索结果显示优化: `+e);let t=(e,t)=>`
        #container #content_left{
        & > .c-container,
        & > .new-pmd{
          ${e}
        }

        ${t||``}
      }
      `,n=[K(t(``,`
          /* AI回答结果变成滚动条形式 */
          & .cosc-card-content [class^="fold-content_"]{
            min-height: unset !important;
            overflow: auto !important;
          }
          /* 隐藏展开按钮 */
          & .cosc-card-content [class^="wenda-general-fold-switch_"]{
            display: none !important;
          }
      `))],r=t(`
      & a.cosc-title-a,
      & .c-title a[href],
      & [class*="_sc-title"] a.sc-link,
      & [class*="c-line-"]:has(> a[href][class^="title_"]) {
          position: relative;

          &,
          & span,
          & p.sc-paragraph{
              text-decoration: none !important;
          }

          &:hover:after {
              left: 0;
              width: 100%;
              transition: width 350ms;
          }

          &:after {
              content: "";
              position: absolute;
              border-bottom: 2px solid #3476d2;
              bottom: 0px;
              left: 100%;
              width: 0;
              transition: width 350ms, left 350ms;
              left: 0;
          }
      }
    `),i=`
      #container{
          margin: 0px auto !important;
          width: auto !important;
      }
      #container #content_left{
          width:  100% !important;
          margin: unset;
          justify-self: center;
          float: unset;
      }
      ${t(`
        &{
          width: 100%;
        }
        /* 内容宽度适配 */
        & .c-row .c-span-last[class*="content_"]{
          width: auto;
          float: unset;
        }
      `)}
      /* 顶部输入框居中 */
      .head_wrapper .s_form,
      .input-head-wrapper [class^="head-left_"]{
        width: unset;
        padding: unset;
        justify-self: center;
        margin: 0 auto;
      }
      #s_tab_inner{
        padding: 0 !important;
        justify-self: center;
      }
      #image-search-header [class^="input-container-"]{
        margin: 0 auto !important;
      }

      #header_top_bar{
        margin: 0 auto;
      }
      /* 顶部的搜索结果涉及价格仅作参考，请以商家官网为准 */
      #content_left > div:first-child:not(:has(*)) {
        text-align: center;
      }
      /* 抱歉，未找到相关结果 */
      #container .content_none{
        float: unset;
        margin: 0 auto;
      }
      /* 页码居中 */
      #page [class^="page-inner"]{
        width: min-content !important;
        padding-left: 0px !important;
        margin: 0 auto;
      }
      /* 底部 */
      #foot .foot-inner{
        width: unset !important;
        justify-self: center !important;
      }
      #foot .foot-inner #help{
        margin: 0 !important;
      }

      `,a=t(`
        &{
          padding: 15px 20px;
          margin-top: 0;
          margin-left: 0;
          margin-bottom: 30px;
          border-radius: 8px;
          background-color: #fff;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* AI总结卡片 样式移除 */
        & [class*="card-border"]{
          border: none;
          border-radius: 0px;
        }
        & [class*="card-border"] [class^="baikan-card-header"]{
          background: none;
        }
        /* 标题背景色 */
        & a.sc-link[href],
        & .c-title a[href],
        & [class*="title-box_"],
        & [class*="c-line-"]:has(> a[href][class^="title_"]),
        & [class*="title-container_"]:has(>.cosc-title a.cosc-title-a){
            background-color: #f8f8f8;
            width: 100%;
            max-width: unset;
            margin: 0px -20px;
            padding: 5px 20px;
        }
        /* 标题宽度适配（撑满） */
        & [class*="c-line-"] > a[href][class^="title_"],
        & [class*="title-container_"] >.cosc-title a.cosc-title-a{
          width: 100%;
          max-width: unset;
          display: inline-flex !important;
        }
        /* 标题容器高度适配 */
        & [class*="title-wrapper"] {
          &{
            margin-bottom: 8px;
          }
          & [class*="title-box"],
          & [class*="title-box"] h3.cosc-title{
            margin-bottom: 0px;
            padding-bottom: 0px;
          }
        }

        /* 标题移除省略号 */
        & .c-title a,
        & a.cosc-title-a{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
    `,`
      /* 您要找的是不是 xxx */
      .result-molecule.hit-toptip > .c-gap-bottom-large{
        margin-bottom: 0px;
      }
      /* 没有找到该URL。您可以直接访问 xxx */
      .result-molecule > .hit_top_new.res-border-bottom{
        &,
        & [class*="gap-bottom-small"]{
          margin-bottom: 0px;
          border: 0px;
        }
      }
    `),o=t(`
       & .c-row[class*="source_"]:has(a),
       & .cos-row [class*="source-pc_"]{
          position: relative;
        }
      `,`
      &{
        display: grid;
        grid-gap: 0 20px;
        grid-template-columns: repeat(2, 48%);
        grid-template-areas: "xmain xmain";
        margin: 0 auto;
        position: relative;
        padding-left: 2%;
        float: unset;
        width: 90%;
        max-width: 1400px;
        margin-bottom: 30px;
      }
    `);return n.push(K(a),K(r)),e===`single-center`?n.push(K(i),K(`
        #container #content_left{
          & > div:not(:empty){
            width: 55%;
            justify-self: center;
          }
        }
      `)):e===`double-column-center`?n.push(K(o),K(i),J(`
        #container #content_left{
          &>div:not(:empty){
            max-width: 100%;
          }
        }
        `)):e===`three-column-center`?n.push(K(o),K(i),K(`
        #container #content_left{
          grid-template-columns: repeat(3, 33.3%);
          grid-template-areas: "xmain xmain xmain";
          &>div:not(:empty){
            max-width: 100%;
          }
        }
      `)):e===`four-column-center`?n.push(K(o),K(i),K(`
        #container #content_left{
          grid-template-columns: repeat(4, 25%);
          grid-template-areas: "xmain xmain xmain xmain";
          &>div:not(:empty){
            max-width: 100%;
          }
        }
      `)):B.error(`不支持的搜索结果显示模式: `+e),n}},de={init(){F.execMenuOnce([`google-search-optimizationResult-enable`,`google-search-optimizationResult-openBlank`],e=>{let[t,n]=e.value;if(t&&n)return this.searchResultOptimization({openBlank:n})})},searchResultOptimization(e){B.info(`搜索结果优化`,e);let t=new L.LockFunction(()=>{let t=[...Y(`#rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty):not([data-hijack])`),...Y(`#rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)):not([data-hijack])`)];for(let n of t)e.openBlank&&n.querySelectorAll(`a[href]:not([target='blank_'])`).forEach(e=>{e.setAttribute(`target`,`_blank`)})}),n=L.mutationObserver(document,{config:{subtree:!0,childList:!0},immediate:!0,callback:()=>{t.run()}});return[()=>{n.disconnect()}]}},fe={init(){F.execMenuOnce(`google-search-removeAIOverview`,()=>this.removeAIOverview()),F.execMenuOnce(`google-search-removeRightPanel`,()=>this.removeRightPanel()),F.execMenuOnce(`google-search-removeRelatedSearch`,()=>this.removeRelatedSearch()),F.execMenuOnce(`google-search-removeQuestions`,()=>this.removeQuestions()),F.execMenuOnce([`google-search-showOptimization-enable`,`google-search-showOptimization-mode`],e=>{let[t,n]=e.value;if(t&&!L.isNull(n))return this.searchResultShowOptimization(n)}),de.init()},removeAIOverview(){return B.info(`移除AI概览`),q(`#rcnt > div:not([role='main']):not(:empty):has([data-mcpr])`)},removeRightPanel(){return B.info(`移除右侧栏`),q(`#rhs`)},removeRelatedSearch(){return B.info(`移除用户还搜索了`),q(`#botstuff`)},removeQuestions(){return B.info(`移除相关问题`),q(`#rso > div:not(:empty) > div:has(.related-question-pair)`)},searchResultShowOptimization(e){B.info(`搜索结果显示优化: `+e);let t=[q(`.kp-wholepage-osrp`)],n=`
      #rso:not(:has(>script)),
      #rso:has(>script)>div:not(:empty){
          display: grid;
          grid-template-columns: repeat(2, 48%);
          grid-gap: 0 20px;
          grid-template-areas: "xmain xmain";
          margin: 0 auto;
          position: relative;
          padding-left: 2%;
          float: unset;
          width: 90%;
          max-width: 1400px;
          margin-bottom: 30px;
      }
      /* 高度统一 */
      #rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty),
      #rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)){
          height: -webkit-fill-available;
      }
    `;return t.push(G(`
    #rcnt{
        display: flex !important;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
    }
    [id^="center_"][role="main"]{
        display: flex;
        flex-direction: column;
        justify-self: center;
    }
    /* 隐藏空结果 */
    #rso:not(:has(>script)) > div:empty,
    #rso:not(:has(>script)) > div:not(:has([data-rpos])),
    #rso:has(>script)>div:not(:empty)>div:not(:has(>div)){
        display: none;
    }
    /* 顶部输入框居中 */
    #searchform{
        display: block;
        justify-items: center;

        >div{
            justify-content: unset;
        }

        textarea{
            min-width: 300px;
        }

        button[type="submit"]{
            margin-right: 2em;
        }
    }
    /* 顶部搜索结果选项导航栏居中 */
    [data-st-tgt="fb"] > div:not(:empty){
        display: block !important;
    }
    [data-st-tgt="fb"] > div:not(:empty) [role="navigation"]{
        justify-self: center;
    }
    /* 小提示： 限制此搜索仅展示xxx搜索结果。 详细了解如何按语言过滤搜索结果 */
    [id^="center_"][role="main"] #taw{
      justify-items: center;
    }
    `),G(`
        /* 搜索结果的样式和标题的悬浮样式 */
        #rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty),
        #rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)){
            width: 100% !important;
            padding: 15px 20px;
            margin-top: 0px;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0s;

            &:hover{
                border: 1px solid rgba(0, 0, 0, 0.3);
                box-shadow: 0 0 1px grey;
                -webkit-box-shadow: 0 0 1px grey;
                -moz-box-shadow: 0 0 1px gray;
            }
        }
    `),G(`
        #rso a,
        #rso a h3 {
            text-decoration: none !important;
        }

        #rso a h3 {
            &:hover:after{
                left: 0;
                width: 100%;
                transition: width 350ms;
            }
            &:after{
                content: "";
                position: absolute;
                border-bottom: 2px solid #3476d2;
                bottom: -3px;
                left: 100%;
                width: 0;
                transition: width 350ms, left 350ms;
            }
        }

    `)),e===`single-center`?t.push(G(`
        #rso{
            width: 55%;
            justify-self: center;
        }
      `)):e===`double-column-center`?t.push(G(n)):e===`three-column-center`?t.push(G(n),G(`
        #rso:not(:has(>script)),
        #rso:has(>script)>div:not(:empty){
            grid-template-columns: repeat(3, 33.3%);
            grid-template-areas: "xmain xmain xmain";
        }
      `)):e===`four-column-center`?t.push(G(n),G(`
        #rso:not(:has(>script)),
        #rso:has(>script)>div:not(:empty){
          grid-template-columns: repeat(4, 25%);
          grid-template-areas: "xmain xmain xmain xmain";
        }
      `)):B.error(`不支持的搜索结果显示模式: `+e),t}},pe={init(){F.execMenuOnce(`bing-search-removeAds`,()=>this.removeAds()),F.execMenuOnce(`bing-search-removeInputPrediction`,()=>this.removeInputPrediction()),F.execMenuOnce(`bing-search-bing-search-removeInputHistory`,()=>this.removeInputHistory()),F.execMenuOnce(`bing-search-bing-search-removeInputHistory-relatedToRecentSearches`,()=>this.removeInputHistoryAndRelatedToRecentSearches()),F.execMenuOnce(`bing-search-removeRightMoreSearchResult`,()=>this.removeRightMoreSearchResult()),F.execMenuOnce(`bing-search-removeCopilotSearch`,()=>this.removeCopilotSearch()),F.execMenuOnce(`bing-search-removeBottomFloatingToolbar`,()=>this.removeBottomFloatingToolbar()),F.execMenuOnce(`bing-search-removeOtherUserSearch`,()=>this.removeOtherUserSearch()),F.execMenuOnce([`bing-search-showOptimization-enable`,`bing-search-showOptimization-mode`],e=>{let[t,n]=e.value;if(t&&!L.isNull(n))return this.searchResultShowOptimization(n)})},removeAds(){return J(`#b_bnp_bopc`,`#b_topw:has(.b_ad)`,`#b_results .b_ad`,`#b_results .b_algo:has(.jrwmcyhr)`)},removeInputPrediction(){return B.info(`移除输入预测`),K(`
    #b_header{
      & #sa_ul ~ * {
          display: none !important;
      }

      & #sa_ul {
          width: 100% !important;
      }

      & #sb_form {
          max-width: 600px;
          white-space: nowrap;
          & input.b_searchbox {
              width: 500px;
          }
      }
    }
    `)},removeInputHistory(){return B.info(`移除输入历史记录`),J(`#b_header #sa_ul #sa_hs_block`)},removeInputHistoryAndRelatedToRecentSearches(){return B.info(`移除输入历史记录 - 与最近的搜索相关`),J(`#b_header #sa_ul #sa_sse_block`)},removeRightMoreSearchResult(){return B.info(`移除右侧更多搜索结果`),J(`#b_content aside`)},removeCopilotSearch(){return B.info(`移除Copilot Search`),J(`#b_content .b_ans:has(.cht_container)`,`#b_content .b_ans:has(.answer_container[aria-label*="Copilot 搜索"])`)},removeBottomFloatingToolbar(){return B.info(`移除底部悬浮的工具栏`),J(`#b_bop_cs_sb_place`)},removeOtherUserSearch(){return B.info(`移除其它用户还搜索过`),J(`#b_results .b_ans:has(a[aria-label*="还搜索"])`,`#b_results .b_algo:has(a[aria-label*="还搜索"])`)},searchResultShowOptimization(e){let t=[],n=`
      #b_content {
          & #b_results{
            display: grid;
            grid-template-columns: repeat(2, 48%);
            grid-gap: 0 20px;
            grid-template-areas: "xmain xmain";
            margin: 0 auto;
            position: relative;
            padding-left: 2%;
            float: unset;
            width: 90%;
            max-width: 1400px;
            margin-bottom: 30px;
          }
      }     
    `;return t.push(K(`
      #b_results,
      #b_mcw {
        & .b_ans,
        & .b_algo {
            padding: 15px 20px;
            margin-top: 0;
            margin-left: 0;
            margin-bottom: 30px;
            border-radius: 8px;
            background-color: #fff;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        & .b_ans,
        & .b_algo {
          & .b_vlist2col{
            justify-content: space-between;
          }
        }
        /* xxx的视频 */
        & .b_ans.b_vidAns:has(#serpvidans),
        /* xxx的图片 */
        & .b_ans.b_imgansacf{
            padding: 15px 20px !important;
        }
        /* 页码 */
        & .b_pag{
            justify-self: center;
        }
      }
      /* 顶部的特殊搜索结果卡片宽度溢出适配 */
      #b_mcw #b_wpt_container{
        width: 100% !important;
      }
    `),K(`
      #b_header {
          /* 输入框居中 */
          & #sb_form {
              display: block;
              justify-self: center;
              position: relative;


              /* 仅让输入框居中，左边的logo图标在里面会造成视觉上的不居中 */
              /* 这时候需要让logo移出文档流 */
              & .b_logoArea{
                left: 0;
                position: absolute;
                transform: translateX(-64px);
                margin-left: 0;
                margin-right: 0;
                vertical-align: unset;
                margin-top: 0px;
                place-self: center;
              }
          }

          /* 搜索结果类型居中 */
          & nav.b_scopebar {
              margin: 11px;
              justify-self: center;
          }
      }

      #b_content {
          padding: 0;

          /* 顶部某个网站的快捷功能 */
          & #b_pole{
            justify-items: center;
          }
          /* 约 xxx个结果 居中 */
          & #b_tween {
              text-align: center;
              padding: 0;
              margin: 10px;
          }
          /* 搜索结果居中 */
          & #b_results,
          & #b_mcw {
              display: block;
              justify-self: center;
              max-width: 1400px;
              width: auto;
              margin: 32px 0px 0px 0px !important;
          }
      }
    `)),e===`single-center`||(e===`double-column-center`?t.push(K(n)):e===`three-column-center`?t.push(K(n),J(`
        #b_content {
          & #b_results{
            grid-template-columns: repeat(3, 33.3%);
            grid-template-areas: "xmain xmain xmain";
          }
        }
      `)):e===`four-column-center`&&t.push(K(n),J(`
        #b_content {
          & #b_results{
            grid-template-columns: repeat(4, 25%);
            grid-template-areas: "xmain xmain xmain xmain";
          }
        }
      `))),t}},me={init(){C.isBaiduSearch()?(B.info(`Baidu - 启动`),ue.init()):C.isGoogleSearch()?(B.info(`Google - 启动`),fe.init()):C.isBingSearch()&&(B.info(`Bing - 启动`),pe.init())}},Z=function(e,t,n=!1,i,a,o,s,c,l){if(l&&typeof l.defaultValue==`object`&&l.defaultValue!=null){let n=l.key??t;l.handler.add({key:n,name:e}),l.handler.shortCut.initConfig(n,l.defaultValue)}let u={text:e,type:`switch`,description:a,disabled:s,attributes:{},props:{},getValue(){return this.props[k].get(t,n)},callback(n,r){let a=!!r;B.success(`${a?`开启`:`关闭`} ${e}`),!(typeof i==`function`&&i(n,a))&&(this.props[k].set(t,a),typeof c==`function`&&c(n,a))},afterAddToUListCallBack:(...n)=>{if(o?.(...n),l){let i=l.handler.shortCut,a=l.key??t,[o,s]=n,c=s.target?.querySelector(`.pops-panel-item-left-main-text`);if(!c)return;let u=()=>{let t=l.handler.shortCut.getShowText(a,`暂未录入快捷键`),n=R.createElement(`div`,{className:`pops-switch-shortcut-wrapper`,innerHTML:`
              <i class="pops-bottom-icon" is-loading="false">
                <svg viewBox="0 0 1123 1024" xmlns="http://www.w3.org/2000/svg" data-type="keyboard">
                  <path d="M1014.122186 1024H109.753483A109.753483 109.753483 0 0 1 0 914.246517V392.917471a109.753483 109.753483 0 0 1 109.753483-109.753484h904.368703a109.753483 109.753483 0 0 1 109.753484 109.753484v521.329046a109.753483 109.753483 0 0 1-109.753484 109.753483zM109.753483 370.966774a21.950697 21.950697 0 0 0-21.950696 21.950697v521.329046a21.950697 21.950697 0 0 0 21.950696 21.950696h904.368703a21.950697 21.950697 0 0 0 21.950697-21.950696V392.917471a21.950697 21.950697 0 0 0-21.950697-21.950697z"></path>
                  <path d="M687.056806 891.198285H307.309753a43.901393 43.901393 0 0 1 0-87.802787h379.747053a43.901393 43.901393 0 0 1 0 87.802787zM175.605573 803.395498a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM432.428725 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM690.349411 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM947.172562 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM175.605573 546.572347a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM304.017149 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM432.428725 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM690.349411 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 803.395498a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM175.605573 678.276527a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM304.017149 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM432.428725 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM948.270096 803.395498a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394z"></path>
                  <path d="M881.320472 766.079314H689.251876a43.901393 43.901393 0 0 1 0-87.802787h192.068596a21.950697 21.950697 0 0 0 21.950696-21.950696v-65.85209a43.901393 43.901393 0 0 1 87.802787 0v65.85209a109.753483 109.753483 0 0 1-109.753483 109.753483zM305.114684 502.670954H175.605573a43.901393 43.901393 0 0 1 0-87.802787h129.509111a43.901393 43.901393 0 0 1 0 87.802787zM563.03537 365.4791a43.901393 43.901393 0 0 1-43.901394-43.901394v-105.363344A109.753483 109.753483 0 0 1 628.88746 106.460879h61.461951a21.950697 21.950697 0 0 0 21.950696-21.950697V43.901393a43.901393 43.901393 0 0 1 87.802787 0v40.608789a109.753483 109.753483 0 0 1-109.753483 109.753484h-61.461951a21.950697 21.950697 0 0 0-21.950697 21.950696v105.363344a43.901393 43.901393 0 0 1-43.901393 43.901394z"></path>
                </svg>
              </i>
            `},{style:`margin-right: 5px;display: inline-flex;`}),r=n.querySelector(`.pops-bottom-icon`);R.on(r,`click`,function(e){l.handler.shortCut.deleteOption(a),i.toolTip.offEvent(),i.toolTip.close(),i.toolTip.destory(),n.remove()},{once:!0});let i=z.tooltip({$target:r,content:()=>t,className:`github-tooltip`,isFixed:!0,only:!0});R.empty(c),R.append(c,n,e)};if(z.rightClickMenu({$target:c,only:!0,data:[{text:()=>l.handler.shortCut.hasOption(a)?`修改快捷键`:`添加快捷键`,icon:z.config.iconSVG.keyboard,callback(e,t,n,o){if(i.isWaitKeyboardPress()){r.default.warning(`请先执行当前的录入操作`);return}let s=r.default.loading(`请按下快捷键...`,{showClose:!0,onClose(){i.cancelEnterShortcutKeys()}});i.enterShortcutKeys(a).then(({status:e,option:t,key:n})=>{s.close(),e?(B.success(`录入快捷键`,t),r.default.success(`录入成功`),u()):r.default.error(`快捷键 ${i.translateKeyboardValueToButtonText(t)} 已被 ${n} 占用`)})}}]}),!i.hasOption(a))return;u()}}};return Reflect.set(u.attributes,E,t),Reflect.set(u.attributes,D,n),Q.initComponentsStorageApi(`switch`,u,{get(e,t){return F.getValue(e,t)},set(e,t){F.setValue(e,t)}}),u},Q={$data:{__storeApiFn:null,get storeApiValue(){return this.__storeApiFn||=new n.default.Dictionary,this.__storeApiFn}},getStorageApi(e){if(this.hasStorageApi(e))return this.$data.storeApiValue.get(e)},hasStorageApi(e){return this.$data.storeApiValue.has(e)},setStorageApi(e,t){this.$data.storeApiValue.set(e,t)},initComponentsStorageApi(e,t,n){let r;r=this.hasStorageApi(e)?this.getStorageApi(e):n,this.setComponentsStorageApiProperty(t,r)},setComponentsStorageApiProperty(e,t){Reflect.set(e.props,k,t)}},$=function(e,t,n,r,i,a,o){let s={text:e,type:`select`,description:a,attributes:{},props:{},getValue(){return this.props[k].get(t,n)},callback(e){if(e==null)return;let n=e.value;B.info(`选择：${e.text}`),!(typeof i==`function`&&i(e))&&(this.props[k].set(t,n),typeof o==`function`&&o(e))},data:r};return Reflect.set(s.attributes,E,t),Reflect.set(s.attributes,D,n),Q.initComponentsStorageApi(`select`,s,{get(e,t){return F.getValue(e,t)},set(e,t){F.setValue(e,t)}}),s},he={id:`view-general`,title:`通用`,views:[{text:`Toast配置`,type:`container`,views:[$(`Toast位置`,I.qmsg_config_position.key,I.qmsg_config_position.defaultValue,[{value:`topleft`,text:`左上角`},{value:`top`,text:`顶部`},{value:`topright`,text:`右上角`},{value:`left`,text:`左边`},{value:`center`,text:`中间`},{value:`right`,text:`右边`},{value:`bottomleft`,text:`左下角`},{value:`bottom`,text:`底部`},{value:`bottomright`,text:`右下角`}],e=>{B.info(`设置当前Qmsg弹出位置`+e.text)},`Toast显示在页面九宫格的位置`),$(`最多显示的数量`,I.qmsg_config_maxnums.key,I.qmsg_config_maxnums.defaultValue,[{value:1,text:`1`},{value:2,text:`2`},{value:3,text:`3`},{value:4,text:`4`},{value:5,text:`5`}],void 0,`限制Toast显示的数量`),Z(`逆序弹出`,I.qmsg_config_showreverse.key,I.qmsg_config_showreverse.defaultValue,void 0,`修改Toast弹出的顺序`)]},{text:`Cookie配置`,type:`container`,views:[Z(`启用`,I.httpx_cookie_manager_enable.key,I.httpx_cookie_manager_enable.defaultValue,void 0,`Api请求时会自动使用下面的Cookie设置`),Z(`使用document.cookie`,I.httpx_cookie_manager_use_document_cookie.key,I.httpx_cookie_manager_use_document_cookie.defaultValue,void 0,`会自动根据请求的域名来使用cookie`)]}]},ge={id:`baidu`,title:`百度搜索`,isDefault:C.isBaiduSearch(),views:[{text:`通用`,type:`container`,views:[Z(`移除右侧栏`,`baidu-search-removeRightPanel`,!0),Z(`移除大家都在搜`,`baidu-search-removeEveryOneSearch`,!0),Z(`移除相关搜索`,`baidu-search-removeRelatedSearch`,!0),Z(`移除选中文本弹窗`,`baidu-search-removeSelectTextDialog`,!0)]},{text:`显示模式优化`,type:`container`,views:[Z(`开启`,`baidu-search-showOptimization-enable`,!0),$(`模式`,`baidu-search-showOptimization-mode`,`single-center`,[{text:`无`,value:``},{text:`单列居中`,value:`single-center`},{text:`双列居中`,value:`double-column-center`},{text:`三列居中`,value:`three-column-center`},{text:`四列居中`,value:`four-column-center`}])]},{type:`container`,text:`搜索结果优化`,views:[Z(`启用`,`baidu-search-optimizationResult-enable`,!0,void 0,`开启后下面的功能才会生效`),Z(`移除广告`,`baidu-search-optimizationResult-removeAds`,!0),Z(`链接重定向`,`baidu-search-optimizationResult-redirect`,!0),Z(`添加favicon`,`baidu-search-optimizationResult-addFavicon`,!0),Z(`标识非安全的链接`,`baidu-search-optimizationResult-markUnsafeLink`,!0)]}]},_e={id:`google`,title:`Google搜索`,isDefault:C.isGoogleSearch(),views:[{text:`通用`,type:`container`,views:[Z(`移除AI概览`,`google-search-removeAIOverview`,!1),Z(`移除右侧栏`,`google-search-removeRightPanel`,!0),Z(`移除用户还搜索了`,`google-search-removeRelatedSearch`,!0),Z(`移除相关问题`,`google-search-removeQuestions`,!0)]},{text:`显示模式优化`,type:`container`,views:[Z(`开启`,`google-search-showOptimization-enable`,!0),$(`模式`,`google-search-showOptimization-mode`,`single-center`,[{text:`无`,value:``},{text:`单列居中`,value:`single-center`},{text:`双列居中`,value:`double-column-center`},{text:`三列居中`,value:`three-column-center`},{text:`四列居中`,value:`four-column-center`}])]},{type:`container`,text:`搜索结果优化`,views:[Z(`启用`,`google-search-optimizationResult-enable`,!0),Z(`新标签页打开`,`google-search-optimizationResult-openBlank`,!1)]}]},ve={id:`bing`,title:`Bing搜索`,isDefault:C.isBingSearch(),views:[{text:`通用`,type:`container`,views:[Z(`移除广告`,`bing-search-removeAds`,!0),Z(`移除输入预测`,`bing-search-removeInputPrediction`,!1),Z(`移除输入历史记录`,`bing-search-removeInputHistory`,!1),Z(`移除输入历史记录 - 与最近的搜索相关`,`bing-search-removeInputHistory-relatedToRecentSearches`,!1),Z(`移除右侧更多搜索结果`,`bing-search-removeRightMoreSearchResult`,!0),Z(`移除Copilot Search`,`bing-search-removeCopilotSearch`,!1),Z(`移除底部悬浮的工具栏`,`bing-search-removeBottomFloatingToolbar`,!0),Z(`移除其它用户还搜索过`,`bing-search-removeOtherUserSearch`,!0)]},{text:`显示模式优化`,type:`container`,views:[Z(`开启`,`bing-search-showOptimization-enable`,!0),$(`模式`,`bing-search-showOptimization-mode`,`single-center`,[{text:`无`,value:``},{text:`单列居中`,value:`single-center`},{text:`双列居中`,value:`double-column-center`},{text:`三列居中`,value:`three-column-center`},{text:`四列居中`,value:`four-column-center`}])]}]};M.addContentConfig([he,ge,_e,ve]),F.init(),me.init()})(DOMUtils,pops,Utils,Qmsg);

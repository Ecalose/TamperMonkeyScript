// ==UserScript==
// @name         SearchEnginePlus
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2026.7.11
// @author       WhiteSevs
// @description  搜索引擎优化，包含以下搜索引擎：百度搜索、谷歌
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHPElEQVR4AeyaS3IcNwyGQUoHSJzsoyzkqpwi0kksLW0fwvYhbC/tnETOKVJlLTzZJ6McQB4GHzQ9w2aT3ezHJCVZXYLI5gMEfoDgo8fLN/48AvCNO4A8esCjBxwQgR/fX5/98PbzxZO316+fvP/8wYi8EuXUf/f+j5MDijDIevEpgGKm6LvrsAlyFZz7IE5eSXAXRuSVKKfeh+Mv37+7vgKk/wOMRQBAcFNClUYxQVmpf5zIGSD5LRh4hvxHz2wAsDaCmxILCA0fPANAAXYBlr0sJgOAlZ6oxWXI2i58FCjIGxfCpWgKBZFPImElhQcgvHoEU6PQZJHiSQAgFFbKSRBQTBXeuNuf1y9O3fr500ujl6ev/3759ONaU+jmxen5+sXTn72Tc1FQrF+OoZNXeNmhvGE0ALimqFBdWcMKC9+gmCr9z/NfitaN+/71/PRTA4iBkfMK9TIXjj8cAoRRAKA8rhkrYHm14FqtiYXtfeI/A0P5AGQ6PRjXh6OrpUGoBgC3R4hUN6yGBdPyOe8AuXFfz1MQRNyJ3xxfLAlCFQAEvK7bhxXKYzU5wMMUwqs6IOj0A4SlhhwEALS7AQ/l3eWhlI+VK4GAXHG72nzabhCAHNrezVfedoy6Jca7hpTJTQenQTFVZsp7LwAmmLpci7EGvLmWZ1kL2y0y3oUyNlZroP0L08HpuPsS0Rkpds6QmU8vAF6OXrX5h9XcgGeK6rIW8yW4Hm2OzuKyNE9gtA1VVBHUOMYvKhubLQJgjBNBJbjfxg6Qti8pGjTCp23T9418fSOtfYI7KfGTyqcIQHfuz7c+Mjnv8hskF54Z6DQqEFNBfV+30PsGwcuv+7fxuSIA6l5txgtYH/Fu5TYPgHqA08A2BILbyO/w2VHqpbuKukwWAIRwHFEjHht/+zF6nZxte1ZYxfOaMYdAsFjQmgYiyDtVoCwAx3J80mYYVuZ+7cLRbyaoBq6mI8spByWJInwNCOKkNQ3mxIEsAHqV0wIgiFtJ8rCOQ6ZUUld6Ta3fLKe2smRAgD/7hA6/jfszLpsTB/IA6HyMB9A1uDXvOBQFXcchX3lmN6AS68dj5ECAP/sE9g3Wf9vBJVNgWzwpyQLQxyl7KFLFYgFz/UvWj9umIOzqNNDFbp6uJCG4lsfu+lVk8gD48FPctwbxWMC4L3kDR0EiDzH3SXPkvbTmt2yfPjdX+RYGYDtoLtHBOvGAdhonikLUWB8evZTM+962IyrzHpAMFqOfW4ZsPLUw08Py0b8x1qebBcYoIFLG7s+mx92L1ATpbdPBJAtAycoNN46odmtjgoa9R2RAmGJ9lDX+ercoOgbjNWOThjRIu7CXgQYjKA9Asl0NmSCDJyDonXCRABEIY60fy2389W6RMeLybD7x2LjNUD4LgLlhtNQ4kTNTpsCtBIJvnSbD6o5vgcmYYgU5bl4KnHGbUj4LQK5xX5SnfQ4E0eWLOqgv8lNfS11DzAO2DEBy+Nk492xIyA4IUYfyIShqVJFtxxQNj5ldagWbXZMiAKlbDU2DHccEuKZ8yIOadn2pWT9xfxektUvt65+rKwJwN1+j4Ka9Oalp0vs3tIL0dh6oTK2v9p99Q1UEAFnSeYsXcEChrkREbwSL64N+Lrsrj0vH5XPW1xgz+4aqFwDzAtbiSFYOKCZMVJZmiQXNOk56o5/L0jZj3hmv633L3FD1AoCQ3Xs4EV/xiQqLc9Ynhc8ccnpT5HQpjnmk3hnXjckPAmAXIZ3A5k4QCsuMGWxKW47CLlGeWyTzzikMkz6DANDedmO6JSXfEEL5Ck9o2k9JuXfQeX7R7quurzvEdtn0tyoAYG8gRLtDykT35F4vRLK3NjL9gR/KA3KXizsZCsTdPuWSagBgkftEZeVBrhB47pSgPy7PLVBeeUbTNUZvo5YCYRQAxIO1fr9nDt6Jsv+PwHgDQGBBlNnX9udQBsXpL9H2ua8XqxE/0YEYc8x4Md9RADQdie6SxISmDiCwoNepgWDcEUCAAqEsRBlKowDKSElxXYb5qY0UxmNcxvQ63hQQJgHAoMQE7+ScTQ7vOUIwYeuqBCgQykJWXlJ6ywz+Bra+M570gKBNdHk+/jIWhMkAMCBL0Y1uchBUZ+bkSwl47SnYb42wOvz35SI1H2f8SE+YBUAjHIKuNTYYEOqy0lktmpY9qfZj1wifuZunMSAsAkCjlgGhazRKGBi4LKTKBRG97Q0rS/VdlFB4E/2cbkhxgrD1l+GnFoRFAYjFMjC2vwlkHt/oVFmrl9yQApISCqNU3G8oH9ztZa2H1YBwMACGFJlaD2DeucVAuHcAABzeNQ6E8u8L7yUA40FwxV+S3FsARJ8xnhB/3NGuu797DQBaVINQ+HZw7wGoBaG0iXoQAAyBwH6D1YN2KT0YAFCM6bDWvYZsN1+kXs8r7Deoz9GDAqBRkIMTmy9SQGnKc+mDBCCnaKnsEYASMt9K+b33gLmG+hcAAP//M3yY4QAAAAZJREFUAwDdAc6uB4kUMgAAAABJRU5ErkJggg==
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://ipv6.baidu.com/*
// @match        *://www.baidu.com/*
// @match        *://www1.baidu.com/*
// @match        *://m.baidu.com/*
// @match        *://*.google.com/search*
// @match        *://*.google.com.hk/search*
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@86be74b83fca4fa47521cded28377b35e1d7d2ac/lib/CoverUMD/index.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.12.2/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@2.0.8/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@4.2.8/dist/index.umd.min.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.7.2/dist/index.umd.min.js
// @connect      *
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

(function(e,t,n,r){"use strict";var i=Object.create,a=Object.defineProperty,o=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,c=Object.getPrototypeOf,l=Object.prototype.hasOwnProperty,u=(e,t,n,r)=>{if(t&&typeof t==`object`||typeof t==`function`)for(var i=s(t),c=0,u=i.length,d;c<u;c++)d=i[c],!l.call(e,d)&&d!==n&&a(e,d,{get:(e=>t[e]).bind(null,d),enumerable:!(r=o(t,d))||r.enumerable});return e},d=(e,t,n)=>(n=e==null?{}:i(c(e)),u(t||!e||!e.__esModule?a(n,`default`,{value:e,enumerable:!0}):n,e));e=d(e),t=d(t),n=d(n),r=d(r);var f=typeof GM_addValueChangeListener<`u`?GM_addValueChangeListener:void 0,p=typeof GM_deleteValue<`u`?GM_deleteValue:void 0,m=typeof GM_getResourceText<`u`?GM_getResourceText:void 0,h=typeof GM_getValue<`u`?GM_getValue:void 0,g=typeof GM_info<`u`?GM_info:void 0,_=typeof GM_listValues<`u`?GM_listValues:void 0,ee=typeof GM_registerMenuCommand<`u`?GM_registerMenuCommand:void 0,te=typeof GM_removeValueChangeListener<`u`?GM_removeValueChangeListener:void 0,v=typeof GM_setValue<`u`?GM_setValue:void 0,y=typeof GM_setValues<`u`?GM_setValues:void 0,ne=typeof GM_unregisterMenuCommand<`u`?GM_unregisterMenuCommand:void 0,re=typeof GM_xmlhttpRequest<`u`?GM_xmlhttpRequest:void 0,b=typeof unsafeWindow<`u`?unsafeWindow:void 0,x=window,S=class e{__href__;get __href(){return this.__href__||globalThis.location.href}__origin={value:void 0,type:`same`};__protocol={value:void 0,type:`same`};__host={value:void 0,type:`same`,hasPort:!1};__pathname={value:void 0,type:`same`};__searchParams={value:new Set};otherInstResultWithOr=!1;constructor(e){typeof e==`string`&&this.href(e)}href(e){return this.__href__=e,this}origin(e){return this.__origin={value:e,type:`same`},this}originStartsWith(e){return this.__origin={value:e,type:`startsWith`},this}originEndsWith(e){return this.__origin={value:e,type:`endsWith`},this}originIncludes(e){return this.__origin={value:e,type:`includes`},this}originMatch(e){return this.__origin={value:e,type:`match`},this}protocol(e){return this.__protocol={value:e,type:`same`},this}protocolStartsWith(e){return this.__protocol={value:e,type:`startsWith`},this}protocolEndsWith(e){return this.__protocol={value:e,type:`endsWith`},this}protocolIncludes(e){return this.__protocol={value:e,type:`includes`},this}protocolMatch(e){return this.__protocol={value:e,type:`match`},this}host(e){return this.__host={value:e,type:`same`,hasPort:!0},this}hostStartsWith(e){return this.__host={value:e,type:`startsWith`,hasPort:!0},this}hostEndsWith(e){return this.__host={value:e,type:`endsWith`,hasPort:!0},this}hostIncludes(e){return this.__host={value:e,type:`includes`,hasPort:!0},this}hostMatch(e){return this.__host={value:e,type:`match`,hasPort:!0},this}hostName(e){return this.__host={value:e,type:`same`,hasPort:!1},this}hostNameStartsWith(e){return this.__host={value:e,type:`startsWith`,hasPort:!1},this}hostNameEndsWith(e){return this.__host={value:e,type:`endsWith`,hasPort:!1},this}hostNameIncludes(e){return this.__host={value:e,type:`includes`,hasPort:!1},this}hostNameMatch(e){return this.__host={value:e,type:`match`,hasPort:!1},this}pathname(e){return this.__pathname={value:e,type:`same`},this}pathnameStartsWith(e){return this.__pathname={value:e,type:`startsWith`},this}pathnameEndsWith(e){return this.__pathname={value:e,type:`endsWith`},this}pathnameIncludes(e){return this.__pathname={value:e,type:`includes`},this}pathnameMatch(e){return this.__pathname={value:e,type:`match`},this}searchParams(e,t){return this.__searchParams.value.add({name:e,value:t}),this}search(e){return this.__searchParams.value.add({name:``,value:e,type:`same`}),this}searchStartsWith(e){return this.__searchParams.value.add({name:``,value:e,type:`startsWith`}),this}searchEndsWith(e){return this.__searchParams.value.add({name:``,value:e,type:`endsWith`}),this}searchIncludes(e){return this.__searchParams.value.add({name:``,value:e,type:`includes`}),this}searchMatch(e){return this.__searchParams.value.add({name:``,value:e,type:`match`}),this}build(){if(!this.__host.value)throw TypeError(`host or hostName should be required`);let e=`${this.__protocol.value||`https`}://${this.__host.value}${this.__pathname.value||`/`}`;if(this.__searchParams.value.size>0){let t=[];this.__searchParams.value.forEach(e=>{if(typeof e.name==`string`){let n=``;(typeof e.value==`string`||typeof e.value==`number`||typeof e.value==`boolean`)&&(n=e.value.toString()),t.push(`${encodeURIComponent(e.name)}=${encodeURIComponent(n)}`)}}),t.length&&(e+=`?${t.join(`&`)}`)}return e}or(t){this.otherInstResultWithOr=this.otherInstResultWithOr||this.r();let n=new e(t);return n.otherInstResultWithOr=this.otherInstResultWithOr,n}r(){if(this.otherInstResultWithOr)return this.otherInstResultWithOr;let e=new URL(this.__href);return[()=>{if(this.__origin.value)if(this.__origin.type===`same`){if(typeof this.__origin.value==`string`)return e.origin===this.__origin.value;throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`startsWith`){if(typeof this.__origin.value==`string`)return e.origin.startsWith(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`endsWith`){if(typeof this.__origin.value==`string`)return e.origin.endsWith(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`includes`){if(typeof this.__origin.value==`string`)return e.origin.includes(this.__origin.value);throw TypeError(`origin value should be string by type `+this.__origin.type)}else if(this.__origin.type===`match`){if(this.__origin.value instanceof RegExp)return this.__origin.value.test(e.origin);if(typeof this.__origin.value==`string`)return e.origin.match(this.__origin.value);throw TypeError(`origin value should be RegExp or string by type `+this.__origin.type)}else throw TypeError(`origin type should be same or startsWith or endsWith or includes or match`);else return!0},()=>{if(this.__protocol.value)if(this.__protocol.type===`same`){if(typeof this.__protocol.value==`string`)return e.protocol===this.__protocol.value;throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`startsWith`){if(typeof this.__protocol.value==`string`)return e.protocol.startsWith(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`endsWith`){if(typeof this.__protocol.value==`string`)return e.protocol.endsWith(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`includes`){if(typeof this.__protocol.value==`string`)return e.protocol.includes(this.__protocol.value);throw TypeError(`protocol value should be string by type `+this.__protocol.type)}else if(this.__protocol.type===`match`){if(this.__protocol.value instanceof RegExp)return this.__protocol.value.test(e.protocol);if(typeof this.__protocol.value==`string`)return e.protocol.match(this.__protocol.value);throw TypeError(`protocol value should be RegExp or string by type `+this.__protocol.type)}else throw TypeError(`protocol type should be same,startsWith,endsWith,includes,match`);else return!0},()=>{if(this.__host.value){let t=this.__host.hasPort?e.host:e.hostname;if(this.__host.type===`same`){if(typeof this.__host.value==`string`)return this.__host.value===t;throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`startsWith`){if(typeof this.__host.value==`string`)return t.startsWith(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`endsWith`){if(typeof this.__host.value==`string`)return t.endsWith(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`includes`){if(typeof this.__host.value==`string`)return t.includes(this.__host.value);throw TypeError(`host value should be string by type `+this.__host.type)}else if(this.__host.type===`match`){if(this.__host.value instanceof RegExp)return this.__host.value.test(t);if(typeof this.__host.value==`string`)return t.match(this.__host.value);throw TypeError(`host value should be RegExp or string by type `+this.__host.type)}else throw TypeError(`host type should be same,startsWith,endsWith,includes,match`)}else return!0},()=>{if(this.__pathname.value)if(this.__pathname.type===`same`){if(typeof this.__pathname.value==`string`)return e.pathname===this.__pathname.value;throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`startsWith`){if(typeof this.__pathname.value==`string`)return e.pathname.startsWith(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`endsWith`){if(typeof this.__pathname.value==`string`)return e.pathname.endsWith(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`includes`){if(typeof this.__pathname.value==`string`)return e.pathname.includes(this.__pathname.value);throw TypeError(`pathname value should be string by type `+this.__pathname.type)}else if(this.__pathname.type===`match`){if(this.__pathname.value instanceof RegExp)return this.__pathname.value.test(e.pathname);if(typeof this.__pathname.value==`string`)return e.pathname.match(this.__pathname.value);throw TypeError(`pathname value should be RegExp or string by type `+this.__pathname.type)}else throw TypeError(`pathname type should be same,startsWith,endsWith,includes,match`);else return!0},()=>{let t=!0,n=[];this.__searchParams.value.forEach(e=>{n.push(e)});for(let r=0;r<n.length;r++){let i=n[r];if(i.type)if(i.type===`same`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search===i.value.toString();throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`startsWith`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.startsWith(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`endsWith`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.endsWith(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`includes`){if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.includes(i.value.toString());throw TypeError(`search value should be string、number、boolean by type `+i.type)}else if(i.type===`match`){if(i.value instanceof RegExp)return i.value.test(e.search);if(typeof i.value==`string`||typeof i.value==`number`||typeof i.value==`boolean`)return e.search.match(i.value.toString());throw TypeError(`search value should be RegExp、string、number、boolean by type `+i.type)}else throw TypeError(`search type should be same, startsWith, endsWith, includes, match`);else if(typeof i.name==`string`){let n=i.value;if(n==null||typeof n==`string`||typeof n==`number`||typeof n==`boolean`){if(n=n?.toString(),!e.searchParams.has(i.name,n)){t=!1;break}}else if(n instanceof RegExp){let r=e.searchParams.get(i.name);if(r){if(!n.test(r)){t=!1;break}}else{t=!1;break}}else throw TypeError(`searchParams value should be string, RegExp, boolean, number, null, undefined`)}else if(i.name instanceof RegExp){let n,r;if(e.searchParams.forEach((e,t)=>{!n&&t.match(i.name)&&(n=t,r=e)}),n){let e=i.value;if(e!=null)if(typeof e==`string`||typeof e==`number`||typeof e==`boolean`){if(e=e.toString(),t=e===r,!t)break}else if(e instanceof RegExp)if(r){if(!e.test(r)){t=!1;break}}else{t=!1;break}else throw TypeError(`searchParams value should be string, RegExp, boolean, number, null, undefined`)}else{t=!1;break}}else throw TypeError(`searchParams name should be string or RegExp`)}return t}].every(e=>e())}},C={host(e,t){return C.builder(t).host(e)},hostName(e,t){return C.builder(t).hostName(e)},search(e,t){return C.builder(t).search(e)},seachParams(e,t,n){return C.builder(n).searchParams(e,t)},pathname(e,t){return C.builder(t).pathname(e)},protocol(e,t){return C.builder(t).protocol(e)},builder(e){return new S(e)}},w={isBaiduSearch(){return C.builder().hostNameMatch(/^(ipv6|www|www1|m).baidu.com$/).pathname(`/s`).r()},isGoogleSearch(){return C.builder().hostNameIncludes(`google.com`).pathname(`/search`).r()}},T={waitRemove(...t){t.forEach(t=>{typeof t==`string`&&e.default.waitNodeList(t).then(e=>{e.forEach(e=>e.remove())})})},createBlockCSSNode(...t){let n=[];if(t.length!==0&&!(t.length===1&&typeof t[0]==`string`&&t[0].trim()===``))return t.forEach(e=>{Array.isArray(e)?n=n.concat(e):n.push(e)}),e.default.createElement(`style`,{type:`text/css`,innerHTML:`${n.join(`,
`)}{display: none !important;}`})},addBlockCSS(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]==`string`&&e[0].trim()===``)&&(e.forEach(e=>{Array.isArray(e)?t=t.concat(e):t.push(e)}),t=t.map(e=>e.trim()).filter(e=>e!==``),t.length))return G(`${t.join(`,
`)}{display: none !important;}`)},addBlockCSSWithEnd(...e){let t=T.addBlockCSS(...e);t&&document.documentElement.appendChild(t)},setGMResourceCSS(e){let t=typeof m==`function`?m(e.keyName):null;return typeof t==`string`&&t?G(t):T.loadStyleLink(e.url)},async loadStyleLink(t){let n=document.createElement(`link`);return n.rel=`stylesheet`,n.type=`text/css`,n.href=t,new Promise(t=>{e.default.onReady(()=>{document.head.appendChild(n),t(n)})})},async loadScript(e){let t=document.createElement(`script`);return t.src=e,new Promise(e=>{t.onload=()=>{e(null)},(document.head||document.documentElement).appendChild(t)})},fixUrl(e){return e=e.trim(),e.startsWith(`data:`)||e.match(/^http(s|):\/\//i)?e:e.startsWith(`//`)?(e.startsWith(`///`)||(e=window.location.protocol+e),e):(e.startsWith(`/`)||(e+=`/`),e=window.location.origin+e,e)},fixHttps(e){if(e.startsWith(`https://`)||!e.startsWith(`http://`))return e;try{let t=new URL(e);return t.protocol=`https:`,t.toString()}catch{return e}},lockScroll(...e){let t=document.createElement(`style`);t.innerHTML=`
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;let n=[document.documentElement,document.body].concat(...e||[]);return n.forEach(e=>{e.classList.add(`pops-overflow-hidden-important`)}),(document.head||document.documentElement).appendChild(t),{recovery(){n.forEach(e=>{e.classList.remove(`pops-overflow-hidden-important`)}),t.remove()}}},async getClipboardText(){function e(e){navigator.clipboard.readText().then(t=>{e(t)}).catch(t=>{V.error(`读取剪贴板内容失败👉`,t),e(``)})}function t(t){navigator.permissions.query({name:`clipboard-read`}).then(()=>{e(t)}).catch(n=>{V.error(`申请剪贴板权限失败，尝试直接读取👉`,n.message??n.name??n.stack),e(t)})}function n(){return!(typeof navigator?.clipboard?.readText!=`function`||typeof navigator?.permissions?.query!=`function`)}return new Promise(e=>{if(!n()){e(``);return}document.hasFocus()?t(e):window.addEventListener(`focus`,()=>{t(e)},{once:!0})})},escapeHtml(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`).replace(/©/g,`&copy;`).replace(/®/g,`&reg;`).replace(/™/g,`&trade;`).replace(/→/g,`&rarr;`).replace(/←/g,`&larr;`).replace(/↑/g,`&uarr;`).replace(/↓/g,`&darr;`).replace(/—/g,`&mdash;`).replace(/–/g,`&ndash;`).replace(/…/g,`&hellip;`).replace(/ /g,`&nbsp;`).replace(/\r\n/g,`<br>`).replace(/\r/g,`<br>`).replace(/\n/g,`<br>`).replace(/\t/g,`&nbsp;&nbsp;&nbsp;&nbsp;`)},interval(e,t,n=5e3){let r,i=n-t,a=t,o=async n=>{let s=await e(n);if(typeof s==`boolean`&&s||n){R.workerClearTimeout(r);return}if(a+=t,a>i){o(!0);return}r=R.workerSetTimeout(()=>{o(!1)},t)};o(!1)},findParentNode(t,n,r){if(r){let i=e.default.closest(t,r);if(i)return i.querySelector(n)}else return e.default.matches(t,n)?t:e.default.closest(t,n)},toStr(e,t=2){let n=`__undefined__placeholder__replaced__str__`+performance.now();return JSON.stringify(e,(e,t)=>t===void 0?n:t,t).replace(RegExp(`"${n}"`,`g`),`undefined`)},isVerticalScreen(){return!globalThis.screen.orientation.type.includes(`landscape`)},isMobileDevice(e=768){return this.isVerticalScreen()?globalThis.innerWidth<e:globalThis.innerHeight<e},isTopWindow(){let e=typeof b==`object`&&b?b:window;return e.top===e.self},formatVideoDuration(e){if(typeof e!=`number`&&(e=parseInt(e)),isNaN(e))return e.toString();let t=function(e){return e<10?`0${e}`:e};if(e<60)return`0:${t(e)}`;if(e>=60&&e<3600)return`${Math.floor(e/60)}:${t(e%60)}`;{let n=Math.floor(e/3600),r=Math.floor(e/60)%60,i=e%60;return`${n}:${t(r)}:${t(i)}`}},formatTimeStamp(e,t){if(typeof e==`number`&&e<0xe8d4a51000){let t=String(Date.now()).length-String(e).length;e*=10**t}let n=e,r=new Date(typeof e==`string`?e.replace(/-/g,`/`):e),i=new Date(t??Date.now()).getTime()-r.getTime(),a=Math.floor(i/(24*3600*1e3));if(a>0)n=a>7?R.formatTime(r.getTime()):a+`天前`;else{let e=i%(24*3600*1e3),t=Math.floor(e/(3600*1e3));if(t>0)n=t+`小时前`;else{let t=e%(3600*1e3),r=Math.floor(t/(60*1e3));if(r>0)n=r+`分钟前`;else{let e=t%(60*1e3);n=Math.round(e/1e3)+`秒前`}}}return n}},E=`GM_Panel`,ie=`data-init`,D=`data-key`,O=`data-default-value`,k=`data-init-more-value`,ae=`data-plugin-search-config`,A=`data-storage-api`,j={followBrowserSize:!1,get width(){return j.followBrowserSize?globalThis.outerWidth:globalThis.innerWidth},get height(){return j.followBrowserSize?globalThis.outerHeight:globalThis.innerHeight}},M={setting:{get width(){return j.width<550?`88vw`:j.width<700?`550px`:`700px`},get height(){return j.height<450?`70vh`:j.height<550?`450px`:`550px`}},settingMiddle:{get width(){return j.width<350?`88vw`:`350px`},get height(){return j.height<450?`88vh`:`450px`}},settingBig:{get width(){return j.width<800?`92vw`:`800px`},get height(){return j.height<600?`80vh`:`600px`}},info:{get width(){return j.width<350?`88vw`:`350px`},get height(){return j.height<250?`88vh`:`250px`}}},N={$data:{__contentConfig:null,get contentConfig(){return this.__contentConfig??=new R.Dictionary,this.__contentConfig},__defaultBottomContentConfig:[]},addContentConfig(e){Array.isArray(e)||(e=[e]);let t=this.$data.contentConfig.keys().length;this.$data.contentConfig.set(t,e)},getAllContentConfig(){return this.$data.contentConfig.values().flat()},getConfig(e=0){return this.$data.contentConfig.get(e)??[]},getDefaultBottomContentConfig(e){if(this.$data.__defaultBottomContentConfig.length)return this.$data.__defaultBottomContentConfig;let t=!1,n,i=(t,n)=>{if(e&&typeof e.translateCallback==`function`)return e.translateCallback(t,n);if(typeof n==`object`&&n)for(let e in n)t=t.replaceAll(`{{${e}}}`,n[e]);return t},a=(e,t)=>{typeof t!=`string`&&(t=T.toStr(t));let n=new Blob([t]),r=globalThis.URL.createObjectURL(n);z.createElement(`a`,{href:r,download:e}).click(),R.workerSetTimeout(()=>{globalThis.URL.revokeObjectURL(r)},500)},o=()=>{let e=e=>{let t=B.alert({title:{text:i(`请选择导入方式`),position:`center`},content:{text:`
            <div class="btn-control" data-mode="local">${i(`本地导入`)}</div>
            <div class="btn-control" data-mode="network">${i(`网络导入`)}</div>
            <div class="btn-control" data-mode="clipboard">${i(`剪贴板导入`)}</div>`,html:!0},btn:{ok:{enable:!1},close:{enable:!0,callback(e){e.close()}}},drag:!0,mask:{enable:!0},width:M.info.width,height:M.info.height,style:`
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
          }`}),n=t.$shadowRoot.querySelector(`.btn-control[data-mode='local']`),a=t.$shadowRoot.querySelector(`.btn-control[data-mode='network']`),o=t.$shadowRoot.querySelector(`.btn-control[data-mode='clipboard']`),s=async t=>{confirm(i(`是否清空脚本存储的配置？（如果点击取消按钮，则仅做配置覆盖处理）`))&&(typeof _==`function`?typeof p==`function`?(_().forEach(e=>{p(e)}),r.default.success(i(`已清空脚本存储的配置`))):r.default.error(i(`不支持GM_deleteValue函数，无法执行删除脚本配置`)):r.default.error(i(`不支持GM_listValues函数，无法清空脚本存储的配置`))),typeof y==`function`?y(t):Object.keys(t).forEach(e=>{let n=t[e];v(e,n)}),r.default.success(i(`配置导入完毕`)),e?.()},c=e=>new Promise(async t=>{let n=R.toJSON(e);Object.keys(n).length===0?r.default.warning(i(`解析为空配置，不导入`)):await s(n),t(!0)});z.on(n,`click`,e=>{z.preventEvent(e),t.close();let n=z.createElement(`input`,{type:`file`,accept:`.json`});z.on(n,[`propertychange`,`input`],()=>{if(!n.files?.length)return;let e=n.files[0],t=new FileReader;t.onload=()=>{c(t.result)},t.readAsText(e,`UTF-8`)}),n.click()}),z.on(a,`click`,e=>{z.preventEvent(e),t.close();let n=B.prompt({title:{text:i(`网络导入`),position:`center`},content:{text:``,placeholder:i(`请填写URL`),focus:!0},btn:{close:{enable:!0,callback(e){e.close()}},ok:{text:i(`导入`),callback:async e=>{let t=e.text;if(R.isNull(t)){r.default.error(i(`请填入完整的url`));return}let n=r.default.loading(i(`正在获取配置...`)),a=await W.get(t,{allowInterceptConfig:!1});if(n.close(),!a.status){V.error(a),r.default.error(i(`获取配置失败`),{consoleLogContent:!0});return}await c(a.data.responseText)&&e.close()}},cancel:{enable:!1}},drag:!0,mask:{enable:!0},width:M.info.width,height:`auto`}),a=n.$shadowRoot.querySelector(`input`),o=n.$shadowRoot.querySelector(`.pops-prompt-btn-ok`);z.on(a,[`input`,`propertychange`],()=>{z.val(a)===``?z.attr(o,`disabled`,`true`):z.removeAttr(o,`disabled`)}),z.onKeyboard(a,`keydown`,(e,t,n)=>{e===`Enter`&&n.length===0&&z.val(a)!==``&&z.emit(o,`click`)}),z.emit(a,`input`)}),z.on(o,`click`,async e=>{z.preventEvent(e),t.close();let n=await T.getClipboardText();if(n.trim()===``){r.default.warning(i(`获取到的剪贴板内容为空`));return}await c(n)})},t=(e=`${H}_panel-setting-${R.formatTime(Date.now(),`yyyy_MM_dd_HH_mm_ss`)}.json`,t)=>{let n=B.alert({title:{text:i(`请选择导出方式`),position:`center`},content:{text:`
            <div class="btn-control" data-mode="export-to-file">${i(`导出至文件`)}</div>
            <div class="btn-control" data-mode="export-to-clipboard">${i(`导出至剪贴板`)}</div>
            `,html:!0},btn:{ok:{enable:!1},close:{enable:!0,callback(e){e.close()}}},drag:!0,mask:{enable:!0},width:M.info.width,height:M.info.height,style:`
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
          }`}),o=n.$shadowRoot.querySelector(`.btn-control[data-mode='export-to-file']`),s=n.$shadowRoot.querySelector(`.btn-control[data-mode='export-to-clipboard']`);z.on(o,`click`,i=>{z.preventEvent(i);try{a(e,t),n.close()}catch(e){r.default.error(e.toString(),{consoleLogContent:!0})}}),z.on(s,`click`,async()=>{await R.copy(t)?(r.default.success(i(`复制成功`)),n.close()):r.default.error(i(`复制失败`))})},n=B.confirm({title:{text:i(`配置`),position:`center`},content:{text:`<textarea name="config-value" id="config" readonly></textarea>`,html:!0},btn:{ok:{enable:!0,type:`primary`,text:i(`导入`),callback(){e()}},cancel:{enable:!0,text:i(`导出`),callback(){t(void 0,s)}}},width:j.width<450?`90vw`:`450px`,height:`auto`,style:`
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
        `}).$shadowRoot.querySelector(`textarea`),o={};if(typeof _==`function`)_().forEach(e=>{let t=h(e);Reflect.set(o,e,t)});else{r.default.warning(i(`不支持函数GM_listValues，仅导出菜单配置`));let e=h(E);Reflect.set(o,E,e)}let s=T.toStr(o);n.value=s},s=()=>{let e=g?.script?.supportURL||g?.script?.namespace;typeof e==`string`&&R.isNotNull(e)&&window.open(e,`_blank`)};return[{id:`script-version`,title:i(`版本：{{version}}`,{version:g?.script?.version||i(`未知`)}),isBottom:!0,views:[],clickFirstCallback(){return!1},afterRender(e){new se(e.$asideLiElement).on(`tap`,function(){clearTimeout(n),n=void 0,t?(t=!1,o()):(n=setTimeout(()=>{t=!1,s()},200),t=!0)})}}]},setDefaultBottomContentConfig(e){this.$data.__defaultBottomContentConfig=e}},oe={$data:{__menuOption:[{key:`show_pops_panel_setting`,text:`⚙ 设置`,autoReload:!1,isStoreValue:!1,showText(e){return e},callback:()=>{I.showPanel(N.getConfig(0))}}],get menuOption(){return this.__menuOption}},init(){this.initExtensionsMenu()},initExtensionsMenu(){T.isTopWindow()&&ce.add(this.$data.menuOption)},addMenuOption(e){Array.isArray(e)||(e=[e]),this.$data.menuOption.push(...e)},updateMenuOption(e){Array.isArray(e)||(e=[e]),e.forEach(e=>{let t=this.$data.menuOption.findIndex(t=>t.key===e.key);t!==-1&&(this.$data.menuOption[t]=e)})},getMenuOption(e=0){return this.$data.menuOption[e]},deleteMenuOption(e=0){this.$data.menuOption.splice(e,1)}},P=class{data={storeNodeList:[],destoryFnList:[]};option={};constructor(e){this.option=e}handlerResult(e,t){let n=[],r=[],i=[];if(Array.isArray(t))i=i.concat(t);else{let e=t=>{if(typeof t==`object`&&t)if(t instanceof Element)i.push(t);else if(Array.isArray(t))e(t);else{let{$css:e,destory:n}=t;e!=null&&(Array.isArray(e)?i=i.concat(e):e instanceof Element&&i.push(e)),typeof n==`function`&&i.push(n)}else i.push(t)};e(t)}let a=e=>{if(e!=null){if(e instanceof Element){n.push(e);return}if(typeof e==`function`){r.push(e);return}}};for(let e of i){let t=a(e);if(typeof t==`boolean`&&!t)break;if(Array.isArray(e))for(let t of e){let e=a(t);if(typeof e==`boolean`&&!e)break}}this.clearStoreNodeList(),this.execDestoryFnAndClear(),e&&(this.data.storeNodeList=this.data.storeNodeList.concat(n),this.data.destoryFnList=this.data.destoryFnList.concat(r))}getEnableStatus(e){return!!this.option.getValue(e)}clearStoreNodeList=()=>{for(let e=this.data.storeNodeList.length-1;e>=0;e--)this.data.storeNodeList[e]?.remove(),this.data.storeNodeList.splice(e,1)};execDestoryFnAndClear=()=>{for(let e=this.data.destoryFnList.length-1;e>=0;e--){let t=this.data.destoryFnList[e];t(),this.data.destoryFnList.splice(e,1)}};checkMenuExec(){let e=!1;return e=typeof this.option.checkExec==`function`?this.option.checkExec(this.option.keyList):this.option.keyList.every(e=>this.getEnableStatus(e)),e}},F=new class{storageKey;listenerData;cacheData;callbacks=[];constructor(e){if(typeof e==`string`){let t=e.trim();if(t==``)throw Error(`key can not be empty string`);this.storageKey=t}else throw TypeError(`key must be a string`);this.listenerData=new n.default.Dictionary,this.getLocalValue=this.getLocalValue.bind(this),this.setLocalValue=this.setLocalValue.bind(this),this.destory=this.destory.bind(this),this.set=this.set.bind(this),this.get=this.get.bind(this),this.getAll=this.getAll.bind(this),this.delete=this.delete.bind(this),this.has=this.has.bind(this),this.keys=this.keys.bind(this),this.values=this.values.bind(this),this.clear=this.clear.bind(this),this.addValueChangeListener=this.addValueChangeListener.bind(this),this.removeValueChangeListener=this.removeValueChangeListener.bind(this),this.emitValueChangeListener=this.emitValueChangeListener.bind(this)}[Symbol.dispose](){this.destory()}async[Symbol.asyncDispose](){this.destory()}destory(){this.cacheData=null;for(let e=this.callbacks.length-1;e>=0;e--){let t=this.callbacks[e];t(),this.callbacks.splice(e,1)}}getLocalValue(){if(this.cacheData==null){let e=h(this.storageKey);e??(e={},this.setLocalValue(e)),this.destory(),this.cacheData=e;let t=f(this.storageKey,(e,t,n)=>{this.cacheData=null,this.cacheData=n});return this.callbacks.push(()=>{te(t)}),e}else return this.cacheData}setLocalValue(e){this.cacheData=null,this.cacheData=e,v(this.storageKey,e)}set(e,t){let n=this.get(e),r=this.getLocalValue();Reflect.set(r,e,t),this.setLocalValue(r),this.emitValueChangeListener(e,t,n)}get(e,t){let n=this.getLocalValue();return Reflect.get(n,e)??t}getAll(){return this.getLocalValue()}delete(e){let t=this.get(e),n=this.getLocalValue();Reflect.deleteProperty(n,e),this.setLocalValue(n),this.emitValueChangeListener(e,void 0,t)}has(e){let t=this.getLocalValue();return Reflect.has(t,e)}keys(){let e=this.getLocalValue();return Reflect.ownKeys(e)}values(){let e=this.getLocalValue();return Reflect.ownKeys(e).map(t=>Reflect.get(e,t))}clear(){this.destory(),p(this.storageKey)}addValueChangeListener(e,t){let n=Math.random(),r=this.listenerData.get(e)||[];return r.push({id:n,key:e,callback:t}),this.listenerData.set(e,r),n}removeValueChangeListener(e){let t=!1;for(let[n,r]of this.listenerData.entries()){for(let n=0;n<r.length;n++){let i=r[n];(typeof e==`string`&&i.key===e||typeof e==`number`&&i.id===e)&&(r.splice(n,1),n--,t=!0)}this.listenerData.set(n,r)}return t}async emitValueChangeListener(...e){let[t,n,r]=e;if(!this.listenerData.has(t))return;let i=this.listenerData.get(t);for(let a=0;a<i.length;a++){let o=i[a];if(typeof o.callback==`function`){let i,a;e.length===1||(e.length===2?i=n:e.length===3&&(i=n,a=r)),await o.callback(t,i,a)}}}}(E),I={$data:{__contentConfigInitDefaultValue:null,__onceExecMenuData:null,__urlChangeReloadMenuExecOnce:null,__onceExecData:null,__panelConfig:{},$panel:null,panelContent:[],get contentConfigInitDefaultValue(){return this.__contentConfigInitDefaultValue??=new R.Dictionary,this.__contentConfigInitDefaultValue},contentConfigInitDisabledKeys:[],get onceExecMenuData(){return this.__onceExecMenuData??=new R.Dictionary,this.__onceExecMenuData},get urlChangeReloadMenuExecOnce(){return this.__urlChangeReloadMenuExecOnce??=new R.Dictionary,this.__urlChangeReloadMenuExecOnce},get onceExecData(){return this.__onceExecData??=new R.Dictionary,this.__onceExecData},get scriptName(){return H},get panelConfig(){return this.__panelConfig},set panelConfig(e){this.__panelConfig=e},key:E,attributeKeyName:D,attributeDefaultValueName:O},init(){this.initContentDefaultValue(),oe.init()},initContentDefaultValue(){let e=e=>{if(!e.attributes||e.type===`button`||e.type===`container`||e.type===`deepMenu`)return;let t=e.attributes,n=t[ie];if(typeof n==`function`){let e=n();if(typeof e==`boolean`&&!e)return}let r=new Map,i=t[D];if(i!=null){let e=t[O];r.set(i,e)}let a=t[k];if(typeof a==`object`&&a&&Object.keys(a).forEach(e=>{let t=a[e];r.set(e,t)}),!r.size){V.warn(`请先配置键`,e);return}if(e.type===`switch`){let t=typeof e.disabled==`function`?e.disabled():e.disabled;typeof t==`boolean`&&t&&this.$data.contentConfigInitDisabledKeys.push(...r.keys())}for(let[e,t]of r.entries())this.setDefaultValue(e,t)},t=n=>{for(let r=0;r<n.length;r++){let i=n[r];e(i);let a=i.views;a&&Array.isArray(a)&&t(a)}},n=[...N.getAllContentConfig()];for(let e=0;e<n.length;e++){let r=n[e];if(!r.views)continue;let i=r.views;i&&Array.isArray(i)&&t(i)}this.$data.contentConfigInitDisabledKeys=[...new Set(this.$data.contentConfigInitDisabledKeys)]},setDefaultValue(e,t){this.$data.contentConfigInitDefaultValue.has(e)&&V.warn(`该key的默认值已进行初始化，覆盖该默认值: `,{key:e,defaultValue:t,coverDefaultValue:this.$data.contentConfigInitDefaultValue.get(e)}),this.$data.contentConfigInitDefaultValue.set(e,t)},getDefaultValue(e){return this.$data.contentConfigInitDefaultValue.get(e)},setValue(e,t){F.set(e,t)},getValue(e,t){return F.get(e)??(this.$data.contentConfigInitDefaultValue.has(e)?this.$data.contentConfigInitDefaultValue.get(e):t)},deleteValue(e){F.delete(e)},hasKey(e){return F.has(e)},addValueChangeListener(e,t,n){let r=F.addValueChangeListener(e,t);if(n?.immediate||n?.immediateAll){let r=this.getValue(e);n?.immediate?t(e,r,r):n?.immediateAll&&I.emitMenuValueChange(e,r,r)}return r},removeValueChangeListener(e){F.removeValueChangeListener(e)},emitMenuValueChange(e,t,n){F.emitValueChangeListener(e,t,n)},async exec(e,t,n,r=!0){let i;i=typeof e==`string`||Array.isArray(e)?()=>e:e;let a=!1,o=i(),s=[];Array.isArray(o)?(a=!0,s=o):s.push(o);let c=s.find(e=>!this.$data.contentConfigInitDefaultValue.has(e));if(c){V.warn(`${c} 键不存在`);return}let l=JSON.stringify(s);if(r&&this.$data.onceExecMenuData.has(l))return this.$data.onceExecMenuData.get(l);let u=[],d=new P({keyList:s,getValue:e=>!!this.getValue(e),checkExec(e){let t=!1;return t=typeof n==`function`?n(e):e.every(e=>this.getValue(e)),t}}),f=async e=>{let n=d.checkMenuExec(),r=[];if(n){let i=s.map(e=>this.getValue(e));r=await t({key:s,triggerKey:e?.key,value:a?i:i[0],addStoreValue:(...e)=>d.handlerResult(n,e)})}d.handlerResult(n,r)};r&&s.forEach(e=>{let t=this.addValueChangeListener(e,(e,t,n)=>f({key:e,newValue:t,oldValue:n}));u.push(t)}),await f();let p={checkMenuExec:d.checkMenuExec.bind(d),keyList:s,reload(){this.clearStoreNodeList(),this.execDestoryFnAndClear(),f()},clear(){d.clearStoreNodeList(),this.execDestoryFnAndClear(),this.removeValueChangeListener(),this.clearOnceExecMenuData()},clearStoreNodeList:d.clearStoreNodeList.bind(d),execDestoryFnAndClear:d.execDestoryFnAndClear.bind(d),removeValueChangeListener:()=>{u.forEach(e=>{this.removeValueChangeListener(e)})},clearOnceExecMenuData(){r&&I.$data.onceExecMenuData.delete(l)}};return this.$data.onceExecMenuData.set(l,p),p},async execMenu(e,t,n=!1,r=!1){return await this.exec(e,async(...e)=>await t(...e),e=>e.every(e=>{let t=!!this.getValue(e);return I.$data.contentConfigInitDisabledKeys.includes(e)&&(t=!1,V.warn(`.execMenu${r?`Once`:``} ${e} 被禁用`)),n&&(t=!t),t}),r)},async execMenuOnce(e,t,n=!1,r=!1){let i=await this.execMenu(e,t,n,!0);return r&&i&&(this.removeUrlChangeWithExecMenuOnceListener(e),this.addUrlChangeWithExecMenuOnceListener(e,()=>{i.reload()})),i},async execMoreMenu(e,t,n=!1,r=!1,i=!1){let a=await Promise.all(e.map(async([e,t])=>await this.execMenu(e,(...e)=>t(...e),n,r))),o=new P({keyList:e.map(([e])=>e),getValue:e=>!!this.getValue(e)}),s=[],c=(e=!1)=>{if(o.clearStoreNodeList(),o.execDestoryFnAndClear(),e){for(let e of s)this.removeValueChangeListener(e);for(let e of a)e&&this.removeUrlChangeWithExecMenuOnceListener(e.keyList)}},l=()=>{let e=a.every(e=>!e||e.checkMenuExec());if(c(!1),e){let n=t();o.handlerResult(e,n)}};l();for(let e of a)if(e){let t=this.addValueChangeListener(e.keyList[0],()=>{l()});s.push(t),i&&(this.removeUrlChangeWithExecMenuOnceListener(e.keyList),this.addUrlChangeWithExecMenuOnceListener(e.keyList,()=>{e.reload()}))}return{clear(){for(let e of a)e?.clear();this.execDestoryFnAndClear(),this.removeValueChangeListener()},execDestoryFnAndClear(){for(let e of a)e?.execDestoryFnAndClear();c(!1)},removeValueChangeListener(){for(let e of a)e?.removeValueChangeListener();c(!0)}}},async execMoreMenuOnce(e,t,n=!1,r=!1){return await this.execMoreMenu(e,t,n,!0,r)},deleteExecMenuOnce(e){return e=this.transformKey(e),this.$data.onceExecMenuData.delete(e),this.$data.urlChangeReloadMenuExecOnce.delete(e),F.removeValueChangeListener(e)},onceExec(e,t,n=!1){if(e=this.transformKey(e),typeof e!=`string`)throw TypeError(`key 必须是字符串`);this.$data.onceExecData.has(e)||n&&(Array.isArray(e)?e:[e]).findIndex(e=>{if(!I.getValue(e))return!0})!==-1||(t(),this.$data.onceExecData.set(e,1))},deleteOnceExec(e){e=this.transformKey(e),this.$data.onceExecData.delete(e)},addUrlChangeWithExecMenuOnceListener(e,t){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.set(e,t),{off:()=>this.removeUrlChangeWithExecMenuOnceListener(e)}},removeUrlChangeWithExecMenuOnceListener(e){e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.delete(e)},hasUrlChangeWithExecMenuOnceListener(e){return e=this.transformKey(e),this.$data.urlChangeReloadMenuExecOnce.has(e)},async emitUrlChangeWithExecMenuOnceEvent(e){let t=this.$data.urlChangeReloadMenuExecOnce.values();for(let n of t)await n(e)},showPanel(e,t=`${H}-设置`,n=!1,r=!1){this.$data.$panel=null,this.$data.panelContent=[];let i=e.findIndex(e=>(typeof e.isBottom==`function`?e.isBottom():!!e.isBottom)&&e.id===`script-version`)!==-1;!n&&!i&&e.push(...N.getDefaultBottomContentConfig());let a=B.panel({title:{text:t,position:`center`,html:!1,style:``},content:e,btn:{close:{enable:!0,callback:e=>{e.close(),this.$data.$panel=null}}},mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1},clickCallBack:e=>{e(),this.$data.$panel=null}},width:M.setting.width,height:M.setting.height,drag:!0,only:!0,style:`
      .pops-switch-shortcut-wrapper{
        margin-right: 5px;
        display: inline-flex;
      }
      .pops-switch-shortcut-wrapper:hover .pops-bottom-icon{
        cursor: pointer;
      }
      `,...this.$data.panelConfig});return this.$data.$panel=a,this.$data.panelContent=e,r||this.registerConfigSearch({$panel:a,content:e}),{$panel:a,content:e}},registerConfigSearch(e){let{$panel:t,content:n}=e,i=(t,n)=>{if(typeof e.translateCallback==`function`)return e.translateCallback(t,n);if(typeof n==`object`&&n)for(let e in n)t=t.replaceAll(`{{${e}}}`,n[e]);return t},a=async(e,t)=>{if(e==null)return;let n=await t(e);return n&&typeof n.isFind==`boolean`&&n.isFind?n.data:await a(n.data,t)},o=(e,t)=>{let n=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(t?.(),n.disconnect())})},{root:null,threshold:1});n.observe(e),e.scrollIntoView({behavior:`smooth`,block:`center`})},s=e=>{let t=`pops-flashing`;z.onAnimationend(e,()=>{e.classList.remove(t)}),e.classList.add(t)},c=c=>{if(c.type===`dblclick`&&f)return;z.preventEvent(c);let l=B.alert({title:{text:i(`搜索配置`),position:`center`},content:{text:`
						<div class="search-wrapper">
							<input class="search-config-text" name="search-config" type="text" placeholder="${i(`请输入需要搜素的配置名称`)}">
						</div>
						<div class="search-result-wrapper"></div>
					`,html:!0},btn:{ok:{enable:!1}},mask:{clickEvent:{toClose:!0}},width:M.settingMiddle.width,height:`auto`,drag:!0,style:`
					${B.config.cssText.panelCSS}

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
				`}),u=l.$shadowRoot.querySelector(`.search-config-text`),d=l.$shadowRoot.querySelector(`.search-result-wrapper`);u.focus();let p=()=>{z.empty(d)},m=e=>{let n=R.queryProperty(e,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e}),c=z.createElement(`div`,{className:`search-result-item`,innerHTML:`
							<div class="search-result-item-path">${n.matchedData?.path}</div>
							<div class="search-result-item-description">${n.matchedData?.description??``}</div>
						`}),l=B.fn.PanelHandlerComponents();return z.on(c,`click`,()=>{let n=t.$shadowRoot.querySelectorAll(`aside.pops-panel-aside .pops-panel-aside-top-container li`)[e.index];if(!n){r.default.error(i(`左侧项下标{{index}}不存在`,{index:e.index}));return}n.scrollIntoView({behavior:`smooth`,block:`center`}),n.click(),a(e.next,async e=>{if(e?.next){let n=await z.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll(`.pops-panel-deepMenu-nav-item`)).find(t=>{let n=Reflect.get(t,l.$data.nodeStoreConfigKey);return typeof n==`object`&&!!n&&n.text===e.name}),2500);if(n)n.click();else return r.default.error(i(`未找到对应的二级菜单`)),{isFind:!0,data:e};return{isFind:!1,data:e.next}}else{let n=await z.waitNode(()=>Array.from(t.$shadowRoot.querySelectorAll(`li:not(.pops-panel-deepMenu-nav-item)`)).find(t=>Reflect.get(t,l.$data.nodeStoreConfigKey)===e.matchedData?.formConfig),2500);if(n){o(n);let e=n.closest(`.pops-panel-forms-fold[data-fold-enable]`);e&&(e.querySelector(`.pops-panel-forms-fold-container`).click(),await R.sleep(500)),o(n,()=>{s(n)})}else r.default.error(i(`未找到对应的菜单项`));return{isFind:!0,data:e}}})}),c},h=e=>{let t=new RegExp(e,`i`),r=[],i=(e,n)=>{for(let a=0;a<e.length;a++){let o=e[a],s=o.views;if(s&&Array.isArray(s)){let e=R.deepClone(n);if(o.type===`deepMenu`){let t=R.queryProperty(e,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e});t.next={name:o.text}}i(s,e)}else{let e,i;if(o.type===`own`){let t=Reflect.get(o.attributes||{},ae);t&&(typeof t==`function`&&(t=t()),typeof t.text==`string`&&(e=t.text),typeof t.desc==`string`&&(i=t.desc))}else e=o.text,i=Reflect.get(o,`description`);let a=[e,i],s=a.findIndex(e=>{if(typeof e==`string`)return e.match(t)});if(s!==-1){let t=R.deepClone(n),c=R.queryProperty(t,e=>e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e});c.next={name:e,matchedData:{path:``,formConfig:o,matchedText:a[s],description:i}};let l=[];R.queryProperty(t,e=>{let t=e?.name;return typeof t==`string`&&t.trim()!==``&&l.push(t),e?.next?{isFind:!1,data:e.next}:{isFind:!0,data:e}});let u=l.join(T.escapeHtml(` - `));c.next.matchedData.path=u,r.push(t)}}}};for(let e=0;e<n.length;e++){let t=n[e];if(!t.views||t.isBottom&&t.id===`script-version`)continue;let r=t.views;if(r&&Array.isArray(r)){let n=t.title;typeof n==`function`&&(n=n()),i(r,{index:e,name:n})}}let a=document.createDocumentFragment();for(let e of r){let t=m(e);a.appendChild(t)}p(),d.append(a)};z.on(u,`input`,R.debounce(e=>{z.preventEvent(e);let t=z.val(u).trim();if(t===``){p();return}h(t)},200))};t.$shadowRoot.querySelectorAll(`aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`).forEach(e=>{z.on(e,`dblclick`,c)});let l=new WeakMap,u=!1,d,f=!1;z.on(t.$shadowRoot,`touchend`,`aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`,(e,t)=>{f=!0,clearTimeout(d),d=void 0,u&&l.has(t)?(u=!1,l.delete(t),c(e)):(d=setTimeout(()=>{u=!1},200),u=!0,l.set(t,e))},{capture:!0}),t.$shadowRoot.appendChild(z.createElement(`style`,{type:`text/css`,textContent:`
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
    		`}))},transformKey(e){if(Array.isArray(e))if(e.length>1){let t=e.sort();return JSON.stringify(t)}else return e[0];else return e},getDynamicValue(e,t){let n=!1,r=t,i=this.addValueChangeListener(e,(e,t)=>{r=t});return{get value(){return n||(n=!0,r=I.getValue(e,t)),r},destory(){I.removeValueChangeListener(i)}}}},L={qmsg_config_position:{key:`qmsg-config-position`,defaultValue:`bottom`},qmsg_config_maxnums:{key:`qmsg-config-maxnums`,defaultValue:3},qmsg_config_showreverse:{key:`qmsg-config-showreverse`,defaultValue:!1},httpx_cookie_manager_enable:{key:`httpx-use-cookie-enable`,defaultValue:!1},httpx_cookie_manager_use_document_cookie:{key:`httpx-use-document-cookie`,defaultValue:!1}},R=n.default.noConflict(),z=e.default.noConflict(),B=t.default,V=new R.Log(g,b.console||x.console),H=g?.script?.name||void 0,se=t.default.fn.Utils.AnyTouch();V.config({debug:!1,logMaxCount:250,autoClearConsole:!0,tag:!0});var U=()=>{let e=t.default.fn.InstanceUtils.getPopsMaxZIndex()?.zIndex??0,n=R.getMaxZIndexNodeInfoFromPoint()[0]?.zIndex??0;return Math.max(100,e,n)};r.default.config({isHTML:!0,autoClose:!0,showClose:!1,consoleLogContent(e){let t=e.setting.type;if(t===`loading`)return!1;let n=e.setting.content;return t===`warning`?V.warn(n):t===`error`?V.error(n):V.info(n),!1},get position(){return I.getValue(L.qmsg_config_position.key,L.qmsg_config_position.defaultValue)},get maxNums(){return I.getValue(L.qmsg_config_maxnums.key,L.qmsg_config_maxnums.defaultValue)},get showReverse(){return I.getValue(L.qmsg_config_showreverse.key,L.qmsg_config_showreverse.defaultValue)},get zIndex(){return U()}}),B.GlobalConfig.setGlobalConfig({zIndex:()=>U(),mask:{enable:!0,clickEvent:{toClose:!1,toHide:!1}},drag:!0});var ce=new R.GM_Menu({GM_getValue:h,GM_setValue:v,GM_registerMenuCommand:ee,GM_unregisterMenuCommand:ne}),W=new R.Httpx({xmlHttpRequest:re,logDetails:!1});W.interceptors.request.use(e=>e),W.interceptors.response.use(e=>e,e=>(V.error(`[Httpx-HttpxRequest.response] 响应错误`,{data:e}),e.type===`onabort`?r.default.warning(`请求取消`,{consoleLogContent:!0}):e.type===`onerror`?r.default.error(`请求异常`,{consoleLogContent:!0}):e.type===`ontimeout`?r.default.error(`请求超时`,{consoleLogContent:!0}):r.default.error(`其它错误`,{consoleLogContent:!0}),e)),b.Object.defineProperty,b.Object.keys,b.Object.values,b.Function.prototype.apply,b.Function.prototype.call,b.Element.prototype.appendChild,b.setTimeout.bind(b),b.clearTimeout.bind(b),b.setInterval.bind(b),b.clearInterval.bind(b);var G=z.addStyle.bind(z),K=e=>{let t=G(e);return document.documentElement.appendChild(t),t},q=T.addBlockCSS.bind(T),J=T.addBlockCSSWithEnd.bind(T);e.default.selector.bind(e.default);var Y=e.default.selectorAll.bind(e.default),X=new R.CookieManagerService({baseCookieHandler:`GM_cookie`});X.isSupportGM_cookie||(X.isSupportCookieStore?X.setOptions({baseCookieHandler:`cookieStore`}):X.setOptions({baseCookieHandler:`document.cookie`})),new R.DocumentCookieHandler;var le={init(){I.execMenuOnce([`baidu-search-optimizationResult-enable`,`baidu-search-optimizationResult-removeAds`,`baidu-search-optimizationResult-redirect`],e=>{let[t,n,r]=e.value;if(t&&!(!n&&!r))return this.searchResultShowOptimization({removeAds:n,redirect:r})})},searchResultShowOptimization(e){V.info(`搜索结果优化`,e);let t=new R.LockFunction(()=>{let t=Y(`#content_left > div:not([data-hijack])`);for(let n of t){if(e.removeAds&&z.selector(`.se_st_footer:contains("广告")`,n)){n.remove();continue}let t=n.getAttribute(`mu`);if(!t)continue;let r=n.querySelector(`a.sc-link[href]`)||n.querySelector(`.c-title a[href]`)||n.querySelector(`a.cosc-title-a[href]`);r&&e.redirect&&(r.href=t,n.setAttribute(`data-hijack`,`true`))}}),n=R.mutationObserver(document,{config:{subtree:!0,childList:!0,attributes:!0},immediate:!0,callback:()=>{t.run()}});return[()=>{n.disconnect()},e.removeAds?J(`#content_left > div:has(.ec-tuiguang)`,`#content_left > div:has(.c-recomm-wrap)`):null]}},ue={init(){I.execMenuOnce(`baidu-search-removeRightPanel`,()=>this.removeRightPanel()),I.execMenuOnce(`baidu-search-removeEveryOneSearch`,()=>this.removeEveryOneSearch()),I.execMenuOnce(`baidu-search-removeRelatedSearch`,()=>this.removeRelatedSearch()),I.execMenuOnce([`baidu-search-showOptimization-enable`,`baidu-search-showOptimization-mode`],e=>{let[t,n]=e.value;if(t&&!R.isNull(n))return this.searchResultShowOptimization(n)}),le.init()},removeRightPanel(){return V.info(`移除右侧栏`),J(`#content_right`)},removeEveryOneSearch(){return V.info(`移除大家都在搜`),J(`.result-op[tpl="recommend_list"]`)},removeRelatedSearch(){return V.info(`移除相关搜索`),J(`.result-molecule:has(#rs_new)`)},searchResultShowOptimization(e){V.info(`搜索结果显示优化: `+e);let t=[K(`
      /* AI回答结果变成滚动条形式 */
        #container #content_left .cosc-card-content [class^="fold-content_"]{
          min-height: unset !important;
          overflow: auto !important;
        }
        /* 隐藏展开按钮 */
        #container #content_left .cosc-card-content [class^="wenda-general-fold-switch_"]{
          display: none !important;
        }
      `)],n=`
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
      #container #content_left > .c-container{
          width: 100%;
      }
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
      /* 内容宽度适配 */
      #container #content_left > .c-container .c-row .c-span-last[class*="content_"]{
        width: auto;
        float: unset;
      }
      /* 页码居中 */
      #page [class^="page-inner"]{
        width: min-content !important;
        padding-left: 0px !important;
      }
      /* 底部 */
      #foot .foot-inner{
        width: unset !important;
        justify-self: center !important;
      }
      #foot .foot-inner #help{
        margin: 0 !important;
      }
      `,r=`
      #container #content_left{
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
      #container #content_left .c-row[class*="source_"]:has(a),
      #container #content_left .cos-row [class*="source-pc_"]{
        position: relative;
      }
    `;return t.push(K(`
      #content_left > .c-container{
        padding: 15px 20px 15px 20px;
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
      #content_left > .c-container [class*="card-border"]{
        border: none;
        border-radius: 0px;
      }
      #content_left > .c-container [class*="card-border"] [class^="baikan-card-header"]{
        background: none;
      }
      /* 标题背景色 */
      #content_left > .c-container a.sc-link[href],
      #content_left > .c-container .c-title a[href],
      #content_left > .c-container [class*="title-box_"]{
          background-color: #f8f8f8;
          width: 100%;
          margin: 0px -20px;
          padding: 5px 20px;
      }
      /* 标题移除省略号 */
      #content_left > .c-container .c-title a,
      #content_left > .c-container a.cosc-title-a{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }
    `)),e===`single-center`?t.push(K(n),K(`
        #container #content_left > .c-container {
            width: 55%;
            justify-self: center;
        }
      `)):e===`double-column-center`?t.push(K(r),K(n)):e===`three-column-center`?t.push(K(r),K(n),K(`
        #container #content_left{
          grid-template-columns: repeat(3, 33.3%);
          grid-template-areas: "xmain xmain xmain";
        }
      `)):e===`four-column-center`?t.push(K(r),K(n),K(`
        #container #content_left{
          grid-template-columns: repeat(4, 25%);
          grid-template-areas: "xmain xmain xmain xmain";
        }
      `)):V.error(`不支持的搜索结果显示模式: `+e),t}},de={init(){I.execMenuOnce([`google-search-optimizationResult-enable`,`google-search-optimizationResult-openBlank`],e=>{let[t,n]=e.value;if(t&&n)return this.searchResultShowOptimization({openBlank:n})})},searchResultShowOptimization(e){V.info(`搜索结果优化`,e);let t=new R.LockFunction(()=>{let t=[...Y(`#rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty):not([data-hijack])`),...Y(`#rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)):not([data-hijack])`)];for(let n of t)e.openBlank&&n.querySelectorAll(`a[href]:not([target='blank_'])`).forEach(e=>{e.setAttribute(`target`,`_blank`)})}),n=R.mutationObserver(document,{config:{subtree:!0,childList:!0},immediate:!0,callback:()=>{t.run()}});return[()=>{n.disconnect()}]}},fe={init(){I.execMenuOnce(`google-search-removeRightPanel`,()=>this.removeRightPanel()),I.execMenuOnce(`google-search-removeRelatedSearch`,()=>this.removeRelatedSearch()),I.execMenuOnce(`google-search-removeQuestions`,()=>this.removeQuestions()),I.execMenuOnce([`google-search-showOptimization-enable`,`google-search-showOptimization-mode`],e=>{let[t,n]=e.value;if(t&&!R.isNull(n))return this.searchResultShowOptimization(n)}),de.init()},removeRightPanel(){return V.info(`移除右侧栏`),[q(`#rhs`)]},removeRelatedSearch(){return V.info(`移除用户还搜索了`),q(`#botstuff`)},removeQuestions(){return V.info(`移除相关问题`),q(`#rso > div:not(:empty) > div:has(.related-question-pair)`)},searchResultShowOptimization(e){V.info(`搜索结果显示优化: `+e);let t=[q(`.kp-wholepage-osrp`)],n=`
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
      `)):V.error(`不支持的搜索结果显示模式: `+e),t}},pe={init(){w.isBaiduSearch()?ue.init():w.isGoogleSearch()&&fe.init()}},Z=function(e,t,n=!1,i,a,o,s,c,l){if(l&&typeof l.defaultValue==`object`&&l.defaultValue!=null){let n=l.key??t;l.handler.add({key:n,name:e}),l.handler.shortCut.initConfig(n,l.defaultValue)}let u={text:e,type:`switch`,description:a,disabled:s,attributes:{},props:{},getValue(){return this.props[A].get(t,n)},callback(n,r){let a=!!r;V.success(`${a?`开启`:`关闭`} ${e}`),!(typeof i==`function`&&i(n,a))&&(this.props[A].set(t,a),typeof c==`function`&&c(n,a))},afterAddToUListCallBack:(...n)=>{if(o?.(...n),l){let i=l.handler.shortCut,a=l.key??t,[o,s]=n,c=s.target?.querySelector(`.pops-panel-item-left-main-text`);if(!c)return;let u=()=>{let t=l.handler.shortCut.getShowText(a,`暂未录入快捷键`),n=z.createElement(`div`,{className:`pops-switch-shortcut-wrapper`,innerHTML:`
              <i class="pops-bottom-icon" is-loading="false">
                <svg viewBox="0 0 1123 1024" xmlns="http://www.w3.org/2000/svg" data-type="keyboard">
                  <path d="M1014.122186 1024H109.753483A109.753483 109.753483 0 0 1 0 914.246517V392.917471a109.753483 109.753483 0 0 1 109.753483-109.753484h904.368703a109.753483 109.753483 0 0 1 109.753484 109.753484v521.329046a109.753483 109.753483 0 0 1-109.753484 109.753483zM109.753483 370.966774a21.950697 21.950697 0 0 0-21.950696 21.950697v521.329046a21.950697 21.950697 0 0 0 21.950696 21.950696h904.368703a21.950697 21.950697 0 0 0 21.950697-21.950696V392.917471a21.950697 21.950697 0 0 0-21.950697-21.950697z"></path>
                  <path d="M687.056806 891.198285H307.309753a43.901393 43.901393 0 0 1 0-87.802787h379.747053a43.901393 43.901393 0 0 1 0 87.802787zM175.605573 803.395498a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM432.428725 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM690.349411 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM947.172562 414.868167a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM175.605573 546.572347a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM304.017149 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM432.428725 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM690.349411 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 546.572347a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM818.760986 803.395498a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM175.605573 678.276527a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394zM304.017149 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM432.428725 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM561.937835 678.276527a43.901393 43.901393 0 1 0 43.901393 43.901394 43.901393 43.901393 0 0 0-43.901393-43.901394zM948.270096 803.395498a43.901393 43.901393 0 1 0 43.901394 43.901394 43.901393 43.901393 0 0 0-43.901394-43.901394z"></path>
                  <path d="M881.320472 766.079314H689.251876a43.901393 43.901393 0 0 1 0-87.802787h192.068596a21.950697 21.950697 0 0 0 21.950696-21.950696v-65.85209a43.901393 43.901393 0 0 1 87.802787 0v65.85209a109.753483 109.753483 0 0 1-109.753483 109.753483zM305.114684 502.670954H175.605573a43.901393 43.901393 0 0 1 0-87.802787h129.509111a43.901393 43.901393 0 0 1 0 87.802787zM563.03537 365.4791a43.901393 43.901393 0 0 1-43.901394-43.901394v-105.363344A109.753483 109.753483 0 0 1 628.88746 106.460879h61.461951a21.950697 21.950697 0 0 0 21.950696-21.950697V43.901393a43.901393 43.901393 0 0 1 87.802787 0v40.608789a109.753483 109.753483 0 0 1-109.753483 109.753484h-61.461951a21.950697 21.950697 0 0 0-21.950697 21.950696v105.363344a43.901393 43.901393 0 0 1-43.901393 43.901394z"></path>
                </svg>
              </i>
            `},{style:`margin-right: 5px;display: inline-flex;`}),r=n.querySelector(`.pops-bottom-icon`);z.on(r,`click`,function(e){l.handler.shortCut.deleteOption(a),i.toolTip.offEvent(),i.toolTip.close(),i.toolTip.destory(),n.remove()},{once:!0});let i=B.tooltip({$target:r,content:()=>t,className:`github-tooltip`,isFixed:!0,only:!0});z.empty(c),z.append(c,n,e)};if(B.rightClickMenu({$target:c,only:!0,data:[{text:()=>l.handler.shortCut.hasOption(a)?`修改快捷键`:`添加快捷键`,icon:B.config.iconSVG.keyboard,callback(e,t,n,o){if(i.isWaitKeyboardPress()){r.default.warning(`请先执行当前的录入操作`);return}let s=r.default.loading(`请按下快捷键...`,{showClose:!0,onClose(){i.cancelEnterShortcutKeys()}});i.enterShortcutKeys(a).then(({status:e,option:t,key:n})=>{s.close(),e?(V.success(`录入快捷键`,t),r.default.success(`录入成功`),u()):r.default.error(`快捷键 ${i.translateKeyboardValueToButtonText(t)} 已被 ${n} 占用`)})}}]}),!i.hasOption(a))return;u()}}};return Reflect.set(u.attributes,D,t),Reflect.set(u.attributes,O,n),Q.initComponentsStorageApi(`switch`,u,{get(e,t){return I.getValue(e,t)},set(e,t){I.setValue(e,t)}}),u},Q={$data:{__storeApiFn:null,get storeApiValue(){return this.__storeApiFn||=new n.default.Dictionary,this.__storeApiFn}},getStorageApi(e){if(this.hasStorageApi(e))return this.$data.storeApiValue.get(e)},hasStorageApi(e){return this.$data.storeApiValue.has(e)},setStorageApi(e,t){this.$data.storeApiValue.set(e,t)},initComponentsStorageApi(e,t,n){let r;r=this.hasStorageApi(e)?this.getStorageApi(e):n,this.setComponentsStorageApiProperty(t,r)},setComponentsStorageApiProperty(e,t){Reflect.set(e.props,A,t)}},$=function(e,t,n,r,i,a,o){let s={text:e,type:`select`,description:a,attributes:{},props:{},getValue(){return this.props[A].get(t,n)},callback(e){if(e==null)return;let n=e.value;V.info(`选择：${e.text}`),!(typeof i==`function`&&i(e))&&(this.props[A].set(t,n),typeof o==`function`&&o(e))},data:r};return Reflect.set(s.attributes,D,t),Reflect.set(s.attributes,O,n),Q.initComponentsStorageApi(`select`,s,{get(e,t){return I.getValue(e,t)},set(e,t){I.setValue(e,t)}}),s},me={id:`view-general`,title:`通用`,views:[{text:`Toast配置`,type:`container`,views:[$(`Toast位置`,L.qmsg_config_position.key,L.qmsg_config_position.defaultValue,[{value:`topleft`,text:`左上角`},{value:`top`,text:`顶部`},{value:`topright`,text:`右上角`},{value:`left`,text:`左边`},{value:`center`,text:`中间`},{value:`right`,text:`右边`},{value:`bottomleft`,text:`左下角`},{value:`bottom`,text:`底部`},{value:`bottomright`,text:`右下角`}],e=>{V.info(`设置当前Qmsg弹出位置`+e.text)},`Toast显示在页面九宫格的位置`),$(`最多显示的数量`,L.qmsg_config_maxnums.key,L.qmsg_config_maxnums.defaultValue,[{value:1,text:`1`},{value:2,text:`2`},{value:3,text:`3`},{value:4,text:`4`},{value:5,text:`5`}],void 0,`限制Toast显示的数量`),Z(`逆序弹出`,L.qmsg_config_showreverse.key,L.qmsg_config_showreverse.defaultValue,void 0,`修改Toast弹出的顺序`)]},{text:`Cookie配置`,type:`container`,views:[Z(`启用`,L.httpx_cookie_manager_enable.key,L.httpx_cookie_manager_enable.defaultValue,void 0,`Api请求时会自动使用下面的Cookie设置`),Z(`使用document.cookie`,L.httpx_cookie_manager_use_document_cookie.key,L.httpx_cookie_manager_use_document_cookie.defaultValue,void 0,`会自动根据请求的域名来使用cookie`)]}]},he={id:`baidu`,title:`百度搜索`,isDefault:w.isBaiduSearch(),views:[{text:`通用`,type:`container`,views:[Z(`移除右侧栏`,`baidu-search-removeRightPanel`,!0),Z(`移除大家都在搜`,`baidu-search-removeEveryOneSearch`,!0),Z(`移除相关搜索`,`baidu-search-removeRelatedSearch`,!0)]},{text:`显示模式优化`,type:`container`,views:[Z(`开启`,`baidu-search-showOptimization-enable`,!0),$(`模式`,`baidu-search-showOptimization-mode`,``,[{text:`无`,value:``},{text:`单列居中`,value:`single-center`},{text:`双列居中`,value:`double-column-center`},{text:`三列居中`,value:`three-column-center`},{text:`四列居中`,value:`four-column-center`}])]},{type:`container`,text:`搜索结果优化`,views:[Z(`开启`,`baidu-search-optimizationResult-enable`,!0),Z(`移除广告`,`baidu-search-optimizationResult-removeAds`,!0),Z(`链接重定向`,`baidu-search-optimizationResult-redirect`,!0)]}]},ge={id:`google`,title:`Google搜索`,isDefault:w.isGoogleSearch(),views:[{text:`通用`,type:`container`,views:[Z(`移除右侧栏`,`google-search-removeRightPanel`,!0),Z(`移除用户还搜索了`,`google-search-removeRelatedSearch`,!0),Z(`移除相关问题`,`google-search-removeQuestions`,!0)]},{text:`显示模式优化`,type:`container`,views:[Z(`开启`,`google-search-showOptimization-enable`,!0),$(`模式`,`google-search-showOptimization-mode`,``,[{text:`无`,value:``},{text:`单列居中`,value:`single-center`},{text:`双列居中`,value:`double-column-center`},{text:`三列居中`,value:`three-column-center`},{text:`四列居中`,value:`four-column-center`}])]},{type:`container`,text:`搜索结果优化`,views:[Z(`开启`,`google-search-optimizationResult-enable`,!0),Z(`新标签页打开`,`google-search-optimizationResult-openBlank`,!1)]}]};N.addContentConfig([me,he,ge]),I.init(),pe.init()})(DOMUtils,pops,Utils,Qmsg);

// ==UserScript==
// @name         网盘链接识别
// @namespace    https://greasyfork.org/zh-CN/scripts/445489
// @version      2024.11.24.18
// @author       WhiteSevs
// @description  识别网页中显示的网盘链接，目前包括百度网盘、蓝奏云、天翼云、中国移动云盘(原:和彩云)、阿里云、文叔叔、奶牛快传、123盘、腾讯微云、迅雷网盘、115网盘、夸克网盘、城通网盘(部分)、坚果云、UC网盘、BT磁力，支持蓝奏云、天翼云(需登录)、123盘、奶牛、UC网盘(需登录)、坚果云(需登录)和阿里云盘(需登录，且限制在网盘页面解析)直链获取下载，页面动态监控加载的链接，可自定义规则来识别小众网盘/网赚网盘或其它自定义的链接。
// @license      GPL-3.0-only
// @icon         data:image/png;base64,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
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*/*
// @require      https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require      https://update.greasyfork.org/scripts/465550/1448580/JS-%E5%88%86%E9%A1%B5%E6%8F%92%E4%BB%B6.js
// @require      https://update.greasyfork.org/scripts/456470/1413242/%E7%BD%91%E7%9B%98%E9%93%BE%E6%8E%A5%E8%AF%86%E5%88%AB-%E5%9B%BE%E6%A0%87%E5%BA%93.js
// @require      https://update.greasyfork.org/scripts/486152/1448081/Crypto-JS.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.5.3/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.4.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@1.9.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.2.7/dist/index.umd.js
// @connect      *
// @connect      lanzoub.com
// @connect      lanzouc.com
// @connect      lanzoue.com
// @connect      lanzouf.com
// @connect      lanzoug.com
// @connect      lanzouh.com
// @connect      lanzoui.com
// @connect      lanzouj.com
// @connect      lanzouk.com
// @connect      lanzoul.com
// @connect      lanzoum.com
// @connect      lanzouo.com
// @connect      lanzoup.com
// @connect      lanzouq.com
// @connect      lanzous.com
// @connect      lanzout.com
// @connect      lanzouu.com
// @connect      lanzouv.com
// @connect      lanzouw.com
// @connect      lanzoux.com
// @connect      lanzouy.com
// @connect      lanosso.com
// @connect      lanzn.com
// @connect      lanzog.com
// @connect      lanpw.com
// @connect      lanpv.com
// @connect      lanzv.com
// @connect      wwentua.com
// @connect      ilanzou.com
// @connect      189.cn
// @connect      123pan.com
// @connect      123pan.cn
// @connect      wenshushu.cn
// @connect      jianguoyun.com
// @connect      cowtransfer.com
// @connect      cowcs.com
// @connect      aliyundrive.com
// @connect      baidu.com
// @connect      139.com
// @connect      weiyun.com
// @connect      xunlei.com
// @connect      115.com
// @connect      quark.cn
// @connect      jianguoyun.com
// @connect      uc.cn
// @connect      ctfile.com
// @connect      sharepoint.com
// @grant        GM_deleteValue
// @grant        GM_download
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==
// ==UserScript==
// @name         网盘链接识别
// @namespace    https://greasyfork.org/zh-CN/scripts/445489
// @version      2024.9.18
// @author       WhiteSevs
// @description  识别网页中显示的网盘链接，目前包括百度网盘、蓝奏云、天翼云、中国移动云盘(原:和彩云)、阿里云、文叔叔、奶牛快传、123盘、腾讯微云、迅雷网盘、115网盘、夸克网盘、城通网盘(部分)、坚果云、UC网盘、BT磁力，支持蓝奏云、天翼云(需登录)、123盘、奶牛、UC网盘(需登录)、坚果云(需登录)和阿里云盘(需登录，且限制在网盘页面解析)直链获取下载，页面动态监控加载的链接，可自定义规则来识别小众网盘/网赚网盘或其它自定义的链接。
// @license      GPL-3.0-only
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAACsJJREFUeF7tXW+IHdUVP2c2u8kHIQYL0TRIaK1SgrFFaZsvVkpAo6YR1LJpa9jUd++83SUpSrUNBFRCrVgxNOv+mTOvJBBNmtpamoQG9UNBKLHFDzEtFttKBdOYQENE/Lb75vZd2cVNum/uvXNnZt/MnoGQD+/c8+d3fu+c+2f2PgR+ljQCuKSj5+CBCbDEScAEYAIscQSWePhcAZgASxyBJR4+VwAmQHEIjIyM3DAzM/M1pdSXEfEWALgVANbkaPE0ABwhomdz1GmtSgixHxF3Wg8wC55HxPeVUu8DgP7/jRUrVvxpbGzsY/PQbBK5VwCd9Ha7vVkptRkA9L8yHiKisAxDczaklL8GgAfLsImIryql3gSAqBPnh3nazI0AjUZjbRAEjwLAI3k6aKtLKbUjjuODtvI+cs1m894kSY776Mg49hwAxHkSIRcCSCl10nXy12YMLI9hrxDR/XkoMukQQrQQ8WGTXIGfn0PEZ6IoGvO14U0AKeUJALjH15Ecxr9ARHn2464uCSEOI+K2HHz2VXGUiAZ9lHgRQEp5BgBu9nEgr7FBEGyZmprSZCz8EUIMIuKRwg3ZGfiAiK63E/1/qcwEkFJ+BAArsxrOedzLRPSdnHWmqgvD8EBntj5Ups0UWxeI6NosvmQigBDibUTckMVgAWNKXwHMxSClfBwAtgPA+gLiclX5GhHd6TrImQBhGO5RSu11MHQREY8nSXICEf/R399/bnx8/KLD+CUl2plf3BgEwa1JktyOiN8HgKscAHCuhE4EaDabQ0mSHLBxSCml5weHlFKHWq3WBZsxLHM5AlLKLwLAQwCwCwBWWeLzKBHts5S1fx9ASnkdALxluZPXIiJh6wTLpSMwPDx8U7vd/iEADFtgdTZJko2tVuushawTAZ4EgCdMSpVSW+M4PmaS48/dEZBSWuWgMznfR0R6X8b4WLUA228/Ig5GUXTUaJUFMiMghNiEiK+bFCxbtuxLExMT/zLJ2RLAhnmTRDRiMsif+yMQhuFupdTTaZoQcZfNTqEVAYQQf0TEO1IMXurr69s4OTn5rn94rMEGAYul+Ekiutuky0iAoaGhqwcGBi4ZFD1FRLpK8FMSAkKIHyHiz9PM2bQBIwGklPcBwO9SDH0CAF8hovdKip3NAECj0VgdBMHf05aHSqntcRwfSm0VJjSllD8DgJ90k1NKTcVxbLM8MZnizx0RkFL+BgC6noAi4nNRFD3mSwB96NH1xKnMc3hHfGovbnEoZdweNraAMAxPKaW+0Q1NRFwfRdE7tUe7BwOUUuqTWL3j2u0xHhIZCSCl1K8gdT1pIiKjjh7ErhYujY6OXjM9Pf3ftGBM+TEmT0qpfAzUAukeDsI3P0yAHk6ujWtMABuUaizDBKhxcm1CYwLYoFRjGSZAjZNrExoTwAalGsswAWqcXJvQmAA2KNVYhglQ4+TahMYEsEGpxjK1IYCU8vcAcJvlW8dVTqn+C9+3iGhrHkHUggCmIPIAqhd1mA5qbHw2YWeysehnAWVetGADaMkyzn/Jc6V/dSDAeQBYXTLwvWLOeF5vcrQOBEg9bjYBUPXPTSXaFB8TwIRQj3/OBDC8cNLj+fN2r+oEOE1EX/VBwVTCfHRXYWzBBDDmx7gKMNyF92PfO/pMBPAFKO9Zsyupio7PNz9GAuiAuyzVcrmZo2iA6k4A3/xYEUAb0Xfjtdvt+xBxlVLqeF538jEB8nmrOmt+rAngWvps5ZkA+RDAFu8r5XqBAP9J2f8/R0SfzxrcQuMWgXClxueKVS8QQB8CfbuL48fyOjSZ078IBCg1vsoRYHYSs+BuYN4rgDRbc8CVabMIW5UkwLyZ7O2zAbxR1MWPZVeAeZVH3y5eeHyVJYCr41nlF4sAWf0tetyizwGKDnCx9wHKjs/VHhPgCsR6oS+7JtFHngnABPDhT/XG8hzg8pxxBeAKUL1vsY/HXAG4AvCNJ/M4wC2AW4BPQa3eWG4B3AK4BXAL6F65eCOoelXdyWNuAdwCuAVwC+AWMIcALwN5GejUQisvzHMAngPwHIDnADwH4DlAFw7wPkDlu3x6ADwHyDgHCMPwLqXUJgCYDoLgpampqb9VkSt1JUDW/FgtA6WUvwSAH1yR8Bc7vxSmf9i4Uk8dCeCTHyMBDL8a9j0iOlwlBtSNAL75sSGA/v1Z/TPmCz3/JqIvMAEWDwEppVd+bAhQq3VzDSuAV36YABXfCvYlNBOACbC01s2+35jF6/YLW/aNhysAVwCuAPMRqNpWMFcAx5rsC5ijucLFfePhFsAtgFsAt4AUDviWmMJroKMBjsfxNJABc2RYyeK++VmKc4CevrfPlT9MAEfEZn+cqrR7CR3dcxZnAjhD9unl16XdS5jBPachTAAnuD4Tnr0Bvefu7XMNhwngiljN5JkANUuoazhMAFfEaia/6ATo7+//3Pj4+MWa4VqZcAwEOE9E16UFY7MPkLZu1ro3ENFfK4NYjRwVQtyIiO92CwkR34yiaKMvAY4BwJZuSpRSD8Rx/Nsa4VqZUMIw3KaUSnsr+1dEtM2LAEKIvYi4J4VlB6Mo2lEZ1GrkqBBiEhGbKSE9Q0S7vQggpfwuALyUouRikiTrW63WhRph2/OhSCn1q/qnAeCqlOp8dxzHJ70IMDIycsPMzMw/05QopR6L4/i5nketRg5KKZ8EgCfSQlq+fPnKsbGxj70IoAdLKf8AAJtTmHYmjuNbaoRvT4cyPDx8U7vdPgUAq1Ja86tRFN1lCsS4CtAKwjDcqZTab1DWIiJhMsif+yMgpZwAgGGDpqeISFeJ1MeKADZtQFtRSm2N41ivGvgpCAGb0t8p2ucA4DYi+tDkhhUBZtvA8wDwiFEh4mAURUdNcvy5OwJCiE2I+LrFSKtvv9ZjTYBGo7E2CALdd9ZaODDZ19f3i8nJya6bFBY6WGQeAmEY7lZKPW0BivW334kAs1VAVwBdCWyeSwCg5w2HOvcIvGczgGUuR6DRaKxGRH0Hw0OIuMEGH0TcFUXRmI2sMwFmSXACAO6xNQAAnyilXuysIv4cBMFfoih6x2HskhIdHR29Znp6eo1Saj0iPgAA30qb6S8AzlEiGnQBzboFzFcqpTwDADe7GCpIVm+EHCGiZwvSn6pWCLEfEXcuhu0FbH5ARNe7+pKJALOV4CMAWOlqsCB56sx4w4J0L6h29o2iB8u0mWLrAhFdm8WXzATQxoQQb9v2pizOuYxRSu2I4/igy5isss1m894kSY5nHZ/zuNeI6M6sOr0IoI2GYbhHKbU3qwM5jnulcyx9f476uqoSQrQQ8eEybBlsvOz7G8veBNAONpvNoSRJfgoAaxYRlBeIqJR+3DmHP9w5h089Zi0Yh7N6NUZE+3zt5EKA2TmBfvNE92G9HVw6EYIg2DI1NaVXKIU/QohBRDxSuKGFDexLkuT5VqulSeD95EaAOU+klJ8SQSn1TUS8w9tDOwXepdDOzGdSYRgeUEoNuY7LKH8SEU/29fWdnJiY0LeC5fbkToD5ng0NDV09MDCgSfB1AFiHiOuUUusAINOMtUvUpa8A5pH9cQDYDgDrc8sIgH6vQk+uzyRJcqa/v/9U3kmf72uhBMgRFFZVEAJMgIKArYpaJkBVMlWQn0yAgoCtilomQFUyVZCfTICCgK2KWiZAVTJVkJ9MgIKArYra/wGYigzMiqJYZwAAAABJRU5ErkJggg==
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*/*
// @exclude      /^http(s|)://s1.hdslb.com/.*$/
// @exclude      /^http(s|)://www.bilibili.com/video.*$/
// @exclude      /^http(s|)://message.bilibili.com/.*$/
// @exclude      /^http(s|)://live.bilibili.com/.*$/
// @exclude      /^http(s|)://.*.mail.qq.com/.*$/
// @exclude      /^http(s|)://.*video.qq.com/.*$/
// @exclude      /^http(s|)://.*.vscode-cdn.net/.*$/
// @exclude      /^http(s|)://.*vscode.dev/.*$/
// @exclude      /^http(s|)://cloudgame.ds.163.com/.*$/
// @exclude      /^http(s|)://cloudgame.webapp.163.com/.*$/
// @exclude      /^http(s|)://cg.163.com/.*$/
// @exclude      /^http(s|)://.*.youtube.com/.*$/
// @require      https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require      https://update.greasyfork.org/scripts/456470/1413242/%E7%BD%91%E7%9B%98%E9%93%BE%E6%8E%A5%E8%AF%86%E5%88%AB-%E5%9B%BE%E6%A0%87%E5%BA%93.js
// @require      https://update.greasyfork.org/scripts/486152/1448081/Crypto-JS.js
// @require      https://update.greasyfork.org/scripts/465550/1448580/JS-%E5%88%86%E9%A1%B5%E6%8F%92%E4%BB%B6.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.2.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.2.9/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.3.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@1.6.3/dist/index.umd.js
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
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @grant        GM_download
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_unregisterMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-end
// ==/UserScript==

(function (Qmsg, DOMUtils, Utils, pops) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var _a;
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_download = /* @__PURE__ */ (() => typeof GM_download != "undefined" ? GM_download : void 0)();
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  const HttpxCookieManager = {
    $data: {
      /** 是否启用 */
      get enable() {
        return PopsPanel.getValue("httpx-use-cookie-enable");
      },
      /** 是否使用document.cookie */
      get useDocumentCookie() {
        return PopsPanel.getValue("httpx-use-document-cookie");
      },
      cookieRule: []
    },
    /**
     * 补充cookie末尾分号
     */
    fixCookieSplit(str) {
      if (utils.isNotNull(str) && !str.trim().endsWith(";")) {
        str += ";";
      }
      return str;
    },
    /**
     * 合并两个cookie
     */
    concatCookie(targetCookie, newCookie) {
      if (utils.isNull(targetCookie)) {
        return newCookie;
      }
      targetCookie = targetCookie.trim();
      newCookie = newCookie.trim();
      targetCookie = this.fixCookieSplit(targetCookie);
      if (newCookie.startsWith(";")) {
        newCookie = newCookie.substring(1);
      }
      return targetCookie.concat(newCookie);
    },
    /**
     * 处理cookie
     * @param details
     * @returns
     */
    handle(details) {
      if (details.fetch) {
        return;
      }
      if (!this.$data.enable) {
        return;
      }
      let ownCookie = "";
      let url = details.url;
      if (url.startsWith("//")) {
        url = window.location.protocol + url;
      }
      let urlObj = new URL(url);
      if (this.$data.useDocumentCookie && urlObj.hostname.endsWith(
        window.location.hostname.split(".").slice(-2).join(".")
      )) {
        ownCookie = this.concatCookie(ownCookie, document.cookie.trim());
      }
      for (let index = 0; index < this.$data.cookieRule.length; index++) {
        let rule = this.$data.cookieRule[index];
        if (urlObj.hostname.match(rule.hostname)) {
          let cookie = PopsPanel.getValue(rule.key);
          if (utils.isNull(cookie)) {
            break;
          }
          ownCookie = this.concatCookie(ownCookie, cookie);
        }
      }
      if (utils.isNotNull(ownCookie)) {
        if (details.headers && details.headers["Cookie"]) {
          details.headers.Cookie = this.concatCookie(
            details.headers.Cookie,
            ownCookie
          );
        } else {
          details.headers["Cookie"] = ownCookie;
        }
        log.info(["Httpx => 设置cookie:", details]);
      }
      if (details.headers && details.headers.Cookie != null && utils.isNull(details.headers.Cookie)) {
        delete details.headers.Cookie;
      }
    }
  };
  const GenerateNetDiskConfig = function(key, defaultValue) {
    return {
      KEY: key,
      default: defaultValue,
      get value() {
        return _GM_getValue(this.KEY, this.default);
      },
      set value(newValue) {
        _GM_setValue(this.KEY, newValue);
      }
    };
  };
  const NetDiskConfig = {
    /** Toast */
    toast: {
      /** 位置 */
      position: GenerateNetDiskConfig("qmsg-config-position", "top"),
      /** 同时最多显示的数量 */
      maxnums: GenerateNetDiskConfig("qmsg-config-maxnums", 3),
      /** 逆序弹出 */
      showreverse: GenerateNetDiskConfig("qmsg-config-showreverse", true)
    },
    /** 弹窗 */
    pops: {
      /** 动画 */
      popsAnimation: GenerateNetDiskConfig(
        "popsAnimation",
        "pops-anim-fadein-zoom"
      ),
      /** 点击弹窗遮罩层是否可以关闭弹窗 */
      clickMaskToCloseDialog: GenerateNetDiskConfig(
        "clickMaskToCloseDialog",
        true
      ),
      /** 窗口拖拽 */
      pcDrag: GenerateNetDiskConfig("pcDrag", true),
      /** 限制拖拽距离 */
      pcDragLimit: GenerateNetDiskConfig("pcDragLimit", true),
      /** 亚克力效果 */
      popsAcrylic: GenerateNetDiskConfig("popsAcrylic", false)
    },
    /** 文件弹窗 */
    popsFolder: {
      /** 排序名 */
      "pops-folder-sort-name": GenerateNetDiskConfig(
        "pops-folder-sort-name",
        "fileName"
      ),
      /** 排序规则 */
      "pops-folder-sort-is-desc": GenerateNetDiskConfig(
        "pops-folder-sort-is-desc",
        false
      )
    },
    /** 小图标导航 */
    smallIconNavgiator: {
      /** 点击定位分享码 */
      "pops-netdisk-icon-click-event-find-sharecode": GenerateNetDiskConfig(
        "pops-netdisk-icon-click-event-find-sharecode",
        true
      ),
      /** 选中分享码 */
      "pops-netdisk-icon-click-event-find-sharecode-with-select": GenerateNetDiskConfig(
        "pops-netdisk-icon-click-event-find-sharecode-with-select",
        true
      ),
      /** 循环定位 */
      "pops-netdisk-icon-click-event-loop-find-sharecode": GenerateNetDiskConfig(
        "pops-netdisk-icon-click-event-loop-find-sharecode",
        true
      )
    },
    /** 悬浮按钮 */
    suspension: {
      /** 大小 */
      size: GenerateNetDiskConfig("size", 50),
      /** 透明度 */
      opacity: GenerateNetDiskConfig("opacity", 1),
      /** 背景轮播时间 */
      "randbg-time": GenerateNetDiskConfig("randbg-time", 1500),
      /** 背景显示时间 */
      "randbg-show-time": GenerateNetDiskConfig("randbg-show-time", 1200),
      /** 吸附边缘 */
      "suspended-button-adsorption-edge": GenerateNetDiskConfig(
        "suspended-button-adsorption-edge",
        false
      )
    },
    /** 小窗模式 */
    smallWindow: {
      /** 宽度 */
      "netdisk-ui-small-window-width": GenerateNetDiskConfig(
        "netdisk-ui-small-window-width",
        250
      ),
      /** 高度 */
      "netdisk-ui-small-window-max-height": GenerateNetDiskConfig(
        "netdisk-ui-small-window-max-height",
        200
      )
    },
    /** 历史匹配记录 */
    historyMatch: {
      /** 排序规则 */
      "netdisk-history-match-ordering-rule": GenerateNetDiskConfig(
        "netdisk-history-match-ordering-rule",
        "按 更新时间 - 降序"
      ),
      /** 保存匹配记录 */
      saveMatchNetDisk: GenerateNetDiskConfig("saveMatchNetDisk", false)
    },
    /** 匹配设置 */
    match: {
      /** 匹配类型 */
      pageMatchRange: GenerateNetDiskConfig("pageMatchRange", [
        "innerText",
        "innerHTML"
      ]),
      /** 深入ShadowRoot获取匹配文本 */
      depthQueryWithShadowRoot: GenerateNetDiskConfig(
        "depthQueryWithShadowRoot",
        false
      ),
      /** 匹配剪贴板 */
      readClipboard: GenerateNetDiskConfig("readClipboard", false),
      /** 匹配当前URL */
      allowMatchLocationHref: GenerateNetDiskConfig(
        "allowMatchLocationHref",
        true
      ),
      /** 匹配input标签的内容 */
      toBeMatchedWithInputElementValue: GenerateNetDiskConfig(
        "to-be-matched-inputElementValue",
        false
      ),
      /** 匹配textarea标签的内容 */
      toBeMatchedTextAreaElementValue: GenerateNetDiskConfig(
        "to-be-matched-textAreaElementValue",
        false
      ),
      /** 匹配间隔 */
      delaytime: GenerateNetDiskConfig("delaytime", 0.8),
      /** 添加元素时进行匹配 */
      isAddedNodesToMatch: GenerateNetDiskConfig("isAddedNodesToMatch", false),
      /** 观察器：childList */
      "mutationObserver-childList": GenerateNetDiskConfig(
        "mutationObserver-childList",
        true
      ),
      /** 观察器：characterData */
      "mutationObserver-characterData": GenerateNetDiskConfig(
        "mutationObserver-characterData",
        true
      ),
      /** 观察器：subtree */
      "mutationObserver-subtree": GenerateNetDiskConfig(
        "mutationObserver-subtree",
        true
      )
    },
    /** 功能 */
    function: {
      /** 行为模式 */
      "netdisk-behavior-mode": GenerateNetDiskConfig(
        "netdisk-behavior-mode",
        "suspension_smallwindow"
      ),
      /** 自动输入访问码 */
      autoFillAccessCode: GenerateNetDiskConfig("autoFillAccessCode", true),
      /** 获取重定向后的直链 */
      getTheDirectLinkAfterRedirection: GenerateNetDiskConfig(
        "getTheDirectLinkAfterRedirection",
        false
      )
    },
    /** 分享码相关 */
    aboutShareCode: {
      /** 相同系数 */
      excludeIdenticalSharedCodesCoefficient: GenerateNetDiskConfig(
        "excludeIdenticalSharedCodesCoefficient",
        1
      ),
      /** 排除分享码 */
      excludeIdenticalSharedCodes: GenerateNetDiskConfig(
        "excludeIdenticalSharedCodes",
        false
      )
    }
  };
  const _SCRIPT_NAME_ = "网盘链接识别";
  const isDebug = false;
  const utils = Utils.noConflict();
  const domUtils = DOMUtils.noConflict();
  const __pops = pops;
  const Cryptojs$1 = CryptoJS ?? window.CryptoJS ?? _unsafeWindow.CryptoJS;
  const __DataPaging = DataPaging ?? window.DataPaging ?? _unsafeWindow.DataPaging;
  const log = new utils.Log(
    _GM_info,
    _unsafeWindow.console || _monkeyWindow.console
  );
  const SCRIPT_NAME = ((_a = _GM_info == null ? void 0 : _GM_info.script) == null ? void 0 : _a.name) || _SCRIPT_NAME_;
  const AnyTouch = pops.config.Utils.AnyTouch();
  log.config({
    debug: isDebug,
    logMaxCount: 1e3,
    autoClearConsole: true,
    tag: true
  });
  Qmsg.config(
    Object.defineProperties(
      {
        html: true,
        autoClose: true,
        showClose: false
      },
      {
        position: {
          get() {
            return NetDiskConfig.toast.position.value;
          }
        },
        maxNums: {
          get() {
            return NetDiskConfig.toast.maxnums.value;
          }
        },
        showReverse: {
          get() {
            return NetDiskConfig.toast.showreverse.value;
          }
        },
        zIndex: {
          get() {
            let maxZIndex = Utils.getMaxZIndex(10);
            let popsMaxZIndex = pops.config.InstanceUtils.getPopsMaxZIndex(maxZIndex).zIndex;
            return Utils.getMaxValue(maxZIndex, popsMaxZIndex) + 100;
          }
        }
      }
    )
  );
  const GM_Menu = new utils.GM_Menu({
    GM_getValue: _GM_getValue,
    GM_setValue: _GM_setValue,
    GM_registerMenuCommand: _GM_registerMenuCommand,
    GM_unregisterMenuCommand: _GM_unregisterMenuCommand
  });
  const httpx = new utils.Httpx(_GM_xmlhttpRequest);
  httpx.interceptors.request.use((data) => {
    HttpxCookieManager.handle(data);
    return data;
  });
  httpx.interceptors.response.use(void 0, (data) => {
    log.error(["拦截器-请求错误", data]);
    if (data.type === "onabort") {
      Qmsg.warning("请求取消");
    } else if (data.type === "onerror") {
      Qmsg.error("请求异常");
    } else if (data.type === "ontimeout") {
      Qmsg.error("请求超时");
    } else {
      Qmsg.error("其它错误");
    }
    return data;
  });
  httpx.config({
    logDetails: isDebug,
    headers: {
      "User-Agent": utils.getRandomPCUA()
    }
  });
  ({
    Object: {
      defineProperty: _unsafeWindow.Object.defineProperty
    },
    Function: {
      apply: _unsafeWindow.Function.prototype.apply,
      call: _unsafeWindow.Function.prototype.call
    },
    Element: {
      appendChild: _unsafeWindow.Element.prototype.appendChild
    },
    setTimeout: _unsafeWindow.setTimeout
  });
  const addStyle = utils.addStyle.bind(utils);
  const KEY = "GM_Panel";
  const ATTRIBUTE_INIT = "data-init";
  const ATTRIBUTE_KEY = "data-key";
  const ATTRIBUTE_DEFAULT_VALUE = "data-default-value";
  const ATTRIBUTE_INIT_MORE_VALUE = "data-init-more-value";
  const UISelect = function(text, key, defaultValue, data, callback, description) {
    let selectData = [];
    if (typeof data === "function") {
      selectData = data();
    } else {
      selectData = data;
    }
    let result = {
      text,
      type: "select",
      description,
      attributes: {},
      getValue() {
        return _GM_getValue(key, defaultValue);
      },
      callback(event, isSelectedValue, isSelectedText) {
        log.info(`选择：${isSelectedText}`);
        _GM_setValue(key, isSelectedValue);
      },
      data: selectData
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
    }
    return result;
  };
  const UISwitch = function(text, key, defaultValue, clickCallBack, description) {
    let result = {
      text,
      type: "switch",
      description,
      attributes: {},
      getValue() {
        return Boolean(_GM_getValue(key, defaultValue));
      },
      callback(event, value) {
        log.success(`${value ? "开启" : "关闭"} ${text}`);
        _GM_setValue(key, Boolean(value));
      },
      afterAddToUListCallBack: void 0
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = Boolean(defaultValue);
    }
    return result;
  };
  const NetDiskRuleUtils = {
    /**
     * 参数替换，区分大小写
     *
     * 例如
     * + {#shareCode#} => xxxx
     * + {#accessCode#} => xxxx
     * + {#$1#} => xxxx
     * @param text
     * @param data
     */
    replaceParam(text, data = {}) {
      if (typeof text !== "string") {
        return text;
      }
      Object.keys(data).forEach((key) => {
        let replacedText = data[key];
        if (utils.isNotNull(replacedText)) {
          try {
            text = text.replaceAll(
              `{#encodeURI-${key}#}`,
              encodeURI(replacedText)
            );
          } catch (error) {
            log.error(["encodeURI-替换的文本失败", [replacedText]]);
          }
          try {
            text = text.replaceAll(
              `{#encodeURIComponent-${key}#}`,
              encodeURIComponent(replacedText)
            );
          } catch (error) {
            log.error(["encodeURIComponent-替换的文本失败", [replacedText]]);
          }
          try {
            text = text.replaceAll(
              `{#decodeURI-${key}#}`,
              decodeURI(replacedText)
            );
          } catch (error) {
            log.error(["decodeURI-替换的文本失败", [replacedText]]);
          }
          try {
            text = text.replaceAll(
              `{#decodeURIComponent-${key}#}`,
              decodeURIComponent(replacedText)
            );
          } catch (error) {
            log.error(["encodeURIComponent-替换的文本失败", [replacedText]]);
          }
          text = text.replaceAll(`{#${key}#}`, replacedText);
        }
      });
      return text;
    },
    /**
     * 删除掉所有中文
     * @param text
     */
    replaceChinese(text) {
      return text.replace(/[\u4e00-\u9fa5]/g, "");
    },
    /**
     * 获取已解码的当前url
     * @param decodeUrl 当前url
     */
    getDecodeComponentUrl(decodeUrl = window.location.href) {
      try {
        decodeUrl = decodeURIComponent(decodeUrl);
      } catch (error) {
      }
      return decodeUrl;
    }
  };
  const NetDisk = {
    $flag: {},
    /**
     * 链接字典，识别规则->识别到的访问码|分享码|下标
     */
    linkDict: new utils.Dictionary(),
    /**
     * （临时）链接字典
     */
    tempLinkDict: new utils.Dictionary(),
    /**
     * 用于存储已匹配到的网盘规则名
     * 只有单独的名
     */
    matchLink: /* @__PURE__ */ new Set(),
    /**
     * 是否成功匹配到链接
     */
    hasMatchLink: false,
    /**
     * 剪贴板内容
     */
    clipboardText: "",
    /**
     * 使用该正则判断提取到的shareCode是否正确
     */
    shareCodeNotMatchRegexpList: [
      /(vipstyle|notexist|ajax|file|download|ptqrshow|xy-privacy|comp|web|undefined|1125|unproved|console|account|favicon|setc)/g
    ],
    /**
     * 使用该正则判断提取到的accessCode是否正确
     */
    accessCodeNotMatchRegexpList: [/^(font)/gi],
    /**
     * 当没有accessCode时，使用该正则去除不需要的字符串
     */
    noAccessCodeRegExp: /( |提取码:|\n密码：{#accessCode#}|{#accessCode#}|{#encodeURI-accessCode#}|{#encodeURIComponent-accessCode#}|{#decodeURI-accessCode#}|{#encodeURIComponent-accessCode#}|\?pwd=|&pwd=)/gi,
    /** 各个网盘规则的匹配规则 */
    regular: {},
    /** 各个网盘规则 */
    rule: [],
    /**
     * 初始化
     */
    init() {
      this.initLinkDict();
    },
    /**
     * 初始化字典
     */
    initLinkDict() {
      Object.keys(this.regular).forEach((netDiskName) => {
        this.linkDict.set(netDiskName, new utils.Dictionary());
        this.tempLinkDict.set(netDiskName, new utils.Dictionary());
      });
    },
    /**
     * 处理链接，将匹配到的链接转为参数和密码存入字典中
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称的索引下标
     * @param matchText 正在进行匹配的文本
     */
    handleLink(netDiskName, netDiskIndex, matchText) {
      let shareCode = this.handleShareCode(netDiskName, netDiskIndex, matchText);
      if (utils.isNull(shareCode)) {
        return;
      }
      let accessCode = this.handleAccessCode(
        netDiskName,
        netDiskIndex,
        matchText
      );
      accessCode = this.handleAccessCodeByUserRule(
        netDiskName,
        accessCode,
        matchText
      );
      return {
        shareCode,
        accessCode
      };
    },
    /**
     * 对传入的url进行处理，返回shareCode
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param matchText 正在进行匹配的文本
     */
    handleShareCode(netDiskName, netDiskIndex, matchText) {
      var _a2;
      let netDiskMatchRegular = NetDisk.regular[netDiskName][netDiskIndex];
      let shareCodeMatch = (_a2 = matchText.match(netDiskMatchRegular.shareCode)) == null ? void 0 : _a2.filter((item) => utils.isNotNull(item));
      if (utils.isNull(shareCodeMatch)) {
        log.error([
          `匹配shareCode为空`,
          {
            匹配的文本: matchText,
            规则: netDiskMatchRegular,
            正在使用的规则: netDiskMatchRegular.shareCode,
            网盘名称: netDiskName,
            网盘名称索引下标: netDiskIndex
          }
        ]);
        return;
      }
      let shareCode = shareCodeMatch[0];
      if (netDiskMatchRegular.shareCodeNeedRemoveStr) {
        shareCode = shareCode.replace(
          netDiskMatchRegular.shareCodeNeedRemoveStr,
          ""
        );
      }
      let shareCodeNotMatch = netDiskMatchRegular.shareCodeNotMatch;
      if (shareCodeNotMatch != void 0 && shareCode.match(shareCodeNotMatch)) {
        log.error(`不可能的shareCode => ${shareCode}`);
        return;
      }
      for (const shareCodeNotMatchRegexp of NetDisk.shareCodeNotMatchRegexpList) {
        if (shareCode.match(shareCodeNotMatchRegexp)) {
          log.error(`不可能的shareCode => ${shareCode}`);
          return;
        }
      }
      shareCode = decodeURI(shareCode);
      if (NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodes.value && utils.isSameChars(
        shareCode,
        NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodesCoefficient.value
      )) {
        return;
      }
      if (shareCode.endsWith("http") || shareCode.endsWith("https")) {
        return;
      }
      return shareCode;
    },
    /**
     * 对传入的url进行处理，返回accessCode
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param matchText 正在进行匹配的文本
     * @returns "xxxx" || ""
     */
    handleAccessCode(netDiskName, netDiskIndex, matchText) {
      var _a2;
      let netDiskMatchRegular = this.regular[netDiskName][netDiskIndex];
      let accessCode = "";
      if (!netDiskMatchRegular.checkAccessCode) {
        return "";
      }
      let accessCodeMatch = matchText.match(netDiskMatchRegular.checkAccessCode);
      if (accessCodeMatch) {
        let accessCodeMatchValue = accessCodeMatch[accessCodeMatch.length - 1];
        let accessCodeMatchArray = (_a2 = accessCodeMatchValue.match(netDiskMatchRegular.accessCode)) == null ? void 0 : _a2.filter((item) => utils.isNotNull(item));
        if (utils.isNull(accessCodeMatchArray)) {
          return "";
        }
        if (accessCodeMatchArray.length) {
          accessCode = accessCodeMatchArray[0];
          if (accessCode.startsWith("http")) {
            accessCode = "";
          }
        }
      }
      if (utils.isNotNull(accessCode)) {
        for (const accessCodeNotMatchRegexp of NetDisk.accessCodeNotMatchRegexpList) {
          if (accessCode.match(accessCodeNotMatchRegexp)) {
            accessCode = "";
            break;
          }
        }
        if (netDiskMatchRegular.acceesCodeNotMatch && accessCode.match(netDiskMatchRegular.acceesCodeNotMatch)) {
          accessCode = "";
        }
      }
      return accessCode;
    },
    /**
     * 对accessCode二次处理，使用自定义的访问码规则
     * @param netDiskName 网盘名称
     * @param accessCode 访问码
     * @param matchText 匹配到的文本
     */
    handleAccessCodeByUserRule(netDiskName, accessCode, matchText) {
      let regularList = NetDiskUI.accessCodeRule.getValue();
      let result = accessCode;
      let currentUrl = window.location.href;
      for (let regularIndex = 0; regularIndex < regularList.length; regularIndex++) {
        let rule = regularList[regularIndex];
        let urlRegexp = new RegExp(rule.urlRegexp, "i");
        if (!currentUrl.match(urlRegexp)) {
          continue;
        }
        for (let index = 0; index < rule.netdisk.length; index++) {
          let netDiskRegular = rule.netdisk[index];
          if (netDiskRegular.value === netDiskName) {
            log.success(`使用自定义规则中的提取码 ${netDiskName} ${result}`);
            return rule.accessCode;
          }
        }
      }
      return result;
    },
    /**
     * 获取在弹窗中显示出的链接
     * @param netDiskName 网盘名称，指NetDisk.regular的内部键名
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode 分享码
     * @param accessCode 访问码
     * @param matchText 匹配到的文本
     */
    handleLinkShow(netDiskName, netDiskIndex, shareCode, accessCode, matchText) {
      let netDiskMatchRegular = NetDisk.regular[netDiskName][netDiskIndex];
      if (netDiskMatchRegular == void 0) {
        Qmsg.error("BUG: 获取uiLink规则失败");
        log.error([
          "BUG: 分析参数",
          netDiskName,
          netDiskIndex,
          shareCode,
          accessCode
        ]);
        throw new TypeError("获取uiLink规则失败");
      }
      let uiLink = NetDiskRuleUtils.replaceParam(
        netDiskMatchRegular["uiLinkShow"],
        {
          shareCode
        }
      );
      if (accessCode && accessCode != "") {
        uiLink = NetDiskRuleUtils.replaceParam(uiLink, {
          accessCode
        });
      } else {
        uiLink = uiLink.replace(NetDisk.noAccessCodeRegExp, "");
      }
      if (netDiskMatchRegular.paramMatch) {
        let currentDict = NetDisk.linkDict.get(netDiskName).get(shareCode);
        matchText = matchText ?? (currentDict == null ? void 0 : currentDict.matchText);
        if (utils.isNotNull(matchText)) {
          let paramMatchArray = matchText.match(netDiskMatchRegular.paramMatch);
          let replaceParamData = {};
          if (paramMatchArray) {
            for (let index = 0; index < paramMatchArray.length; index++) {
              replaceParamData[`$${index}`] = paramMatchArray[index];
            }
          }
          uiLink = NetDiskRuleUtils.replaceParam(uiLink, replaceParamData);
        }
      }
      return uiLink;
    },
    /**
     * 获取已匹配到的链接的存储的对象
     * @param accessCode 访问码
     * @param netDiskIndex 下标，默认0
     * @param isForceAccessCode 是否锁定访问码不允许修改，默认false
     * @param matchText 匹配到的文本
     */
    getLinkDickObj(accessCode, netDiskIndex = 0, isForceAccessCode = false, matchText) {
      return {
        accessCode,
        netDiskIndex,
        isForceAccessCode,
        matchText
      };
    }
  };
  const NetDiskUISizeConfig = {
    /**
     * 天翼云需要登录的提示
     */
    tianYiYunLoginTip: {
      PC: {
        width: "30vw",
        height: "280px"
      },
      Mobile: {
        width: "80vw",
        height: "250px"
      }
    },
    /**
     * 坚果云需要登录的提示
     */
    jianGuoYunLoginTip: {
      PC: {
        width: "350px",
        height: "200px"
      },
      Mobile: {
        width: "350px",
        height: "200px"
      }
    },
    /**
     * 设置
     */
    settingView: {
      PC: {
        width: "800px",
        height: "600px"
      },
      Mobile: {
        width: "92vw",
        height: "80vh"
      }
    },
    /**
     * 设置默认值的界面
     */
    setDefaultValueView: {
      PC: {
        width: "350px",
        height: "200px"
      },
      Mobile: {
        width: "350px",
        height: "200px"
      }
    },
    /**
     * (主)网盘链接界面
     */
    mainView: {
      PC: {
        width: "500px",
        height: "100%"
      },
      Mobile: {
        width: "88vw",
        height: "50vh"
      }
    },
    /**
     * (主)网盘链接界面-小窗
     */
    mainViewSmallWindow: {
      PC: {
        width: NetDiskConfig.smallWindow["netdisk-ui-small-window-width"].value + "px",
        height: "auto"
      },
      Mobile: {
        width: NetDiskConfig.smallWindow["netdisk-ui-small-window-width"].value + "px",
        height: "auto"
      }
    },
    /**
     * 单文件直链弹窗
     */
    oneFileStaticView: {
      PC: {
        width: "550px",
        height: "350px"
      },
      Mobile: {
        width: "88vw",
        height: "300px"
      }
    },
    /**
     * 多文件直链弹窗
     */
    moreFileStaticView: {
      PC: {
        width: "700px",
        height: "600px"
      },
      Mobile: {
        width: "88vw",
        height: "500px"
      }
    },
    /**
     * 新密码、错误密码输入弹窗
     */
    inputNewAccessCodeView: {
      PC: {
        width: "400px",
        height: "200px"
      },
      Mobile: {
        width: "88vw",
        height: "160px"
      }
    },
    /**
     * 历史存储记录弹窗
     */
    historyMatchView: {
      PC: {
        width: "50vw",
        height: "65vh"
      },
      Mobile: {
        width: "88vw",
        height: "60vh"
      }
    },
    /**
     * 自定义规则的弹窗
     */
    customRulesView: {
      PC: {
        width: "50vw",
        height: "65vh"
      },
      Mobile: {
        width: "88vw",
        height: "60vh"
      }
    },
    /**
     * 自定义规则的调试视图
     */
    customRuleDebugView: {
      PC: {
        width: "55vw",
        height: "70vh"
      },
      Mobile: {
        width: "88vw",
        height: "70vh"
      }
    },
    /**
     * 主动识别的弹窗
     */
    matchPasteTextView: {
      PC: {
        width: "50vw",
        height: "65vh"
      },
      Mobile: {
        width: "88vw",
        height: "60vh"
      }
    },
    /**
     * 访问码规则弹窗
     */
    accessCodeRuleView: {
      PC: {
        width: "50vw",
        height: "65vh"
      },
      Mobile: {
        width: "88vw",
        height: "60vh"
      }
    },
    /**
     * 访问码规则添加/修改/删除
     */
    accessCodeRuleEditView: {
      PC: {
        width: "44vw",
        height: "50vh"
      },
      Mobile: {
        width: "70vw",
        height: "45vh"
      }
    }
  };
  const NetDiskAutoFillAccessCode_baidu = function(netDiskInfo) {
    if (window.location.hostname === "pan.baidu.com" && window.location.pathname === "/share/init" && window.location.search.startsWith("?surl=")) {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("div.verify-form #accessCode").then(($ele) => {
        var _a2;
        if (!utils.isVisible($ele)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        $ele.value = netDiskInfo.accessCode;
        utils.dispatchEvent($ele, "input");
        (_a2 = document.querySelector("div.verify-form #submitBtn")) == null ? void 0 : _a2.click();
      });
    }
    if (window.location.hostname === "pan.baidu.com" && window.location.pathname === "/wap/init" && window.location.search.startsWith("?surl=")) {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode(
        "div.extractWrap div.extract-content div.extractInputWrap.extract input[type=text]"
      ).then(($input) => {
        var _a2;
        if (!utils.isVisible($input)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        $input.value = netDiskInfo.accessCode;
        utils.dispatchEvent($input, "input");
        (_a2 = document.querySelector(
          "div.extractWrap div.extract-content button.m-button"
        )) == null ? void 0 : _a2.click();
      });
    }
  };
  const NetDiskAutoFillAccessCode_lanzou = function(netDiskInfo) {
    if (window.location.hostname.match(/lanzou[a-z]{1}.com/gi)) {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("#pwd").then(($input) => {
        var _a2, _b;
        if (!utils.isVisible($input)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        $input.value = netDiskInfo.accessCode;
        utils.dispatchEvent($input, "input");
        (_a2 = document.querySelector(
          "#passwddiv div.passwddiv-input > div"
        ) || $input.nextElementSibling) == null ? void 0 : _a2.click();
        (_b = document.querySelector("#sub")) == null ? void 0 : _b.click();
      });
      utils.waitNode("#f_pwd").then((element) => {
        utils.mutationObserver(element, {
          config: {
            attributes: true,
            attributeFilter: ["style"]
          },
          callback: (mutations, observer) => {
            var _a2;
            let inputElement = document.querySelector("#f_pwd #pwd");
            if (!utils.isVisible(inputElement)) {
              log.error("输入框不可见，不输入密码");
              return;
            }
            observer.disconnect();
            log.success("自动填入访问码并关闭观察者");
            Qmsg.success("自动填入访问码");
            inputElement.value = netDiskInfo.accessCode;
            utils.dispatchEvent(inputElement, "input");
            (_a2 = document.querySelector("#f_pwd #sub")) == null ? void 0 : _a2.click();
          }
        });
      });
    }
  };
  const NetDiskAutoFillAccessCode_tianyiyun = function(netDiskInfo) {
    function loopWaitElementShow(targetElement, callback) {
      let loopCount = 0;
      let maxLoopCount = 30;
      let interval = setInterval(() => {
        loopCount++;
        if (loopCount > maxLoopCount) {
          log.error("结束循环检查，退出。");
          clearInterval(interval);
          return;
        }
        if (!utils.isVisible(targetElement)) {
          log.warn(`第 ${loopCount} 次：输入框不可见，不输入密码`);
          return;
        }
        callback();
        clearInterval(interval);
      }, 500);
    }
    if (window.location.hostname === "cloud.189.cn") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("input#code_txt").then((codeTxtElement) => {
        loopWaitElementShow(codeTxtElement, () => {
          Qmsg.success("自动填入访问码");
          let visitBtn = document.querySelector(
            ".btn.btn-primary.visit"
          );
          codeTxtElement.value = netDiskInfo.accessCode;
          codeTxtElement._value = netDiskInfo.accessCode;
          utils.dispatchEvent(codeTxtElement, "input");
          utils.dispatchEvent(visitBtn, "click");
        });
      });
    }
    if (window.location.hostname === "h5.cloud.189.cn") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("input.access-code-input").then((accessInputElement) => {
        loopWaitElementShow(accessInputElement, () => {
          Qmsg.success("自动填入访问码");
          accessInputElement.value = netDiskInfo.accessCode;
          accessInputElement._value = netDiskInfo.accessCode;
          utils.dispatchEvent(accessInputElement, "input");
          utils.dispatchEvent(
            document.querySelector("div.button"),
            "click"
          );
        });
      });
    }
  };
  const NetDiskAutoFillAccessCode_hecaiyun = function(netDiskInfo) {
    if (window.location.hostname === "caiyun.139.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("#token-input").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        document.querySelector("#homepage div.token div.token-form a").click();
      });
      utils.waitNode("#app div.token-form input[type=text]").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        document.querySelector("div.token-form a.btn-token").click();
      });
    }
  };
  const ReactUtils = {
    /**
     * 等待react某个属性并进行设置
     */
    async waitReactPropsToSet($target, propName, needSetList) {
      if (!Array.isArray(needSetList)) {
        this.waitReactPropsToSet($target, propName, [needSetList]);
        return;
      }
      function getTarget() {
        let __target__ = null;
        if (typeof $target === "string") {
          __target__ = document.querySelector($target);
        } else if (typeof $target === "function") {
          __target__ = $target();
        } else if ($target instanceof HTMLElement) {
          __target__ = $target;
        }
        return __target__;
      }
      if (typeof $target === "string") {
        let $ele = await utils.waitNode($target, 1e4);
        if (!$ele) {
          return;
        }
      }
      needSetList.forEach((needSetOption) => {
        if (typeof needSetOption.msg === "string") {
          log.info(needSetOption.msg);
        }
        function checkObj() {
          let target = getTarget();
          if (target == null) {
            return false;
          }
          let targetObj = utils.getReactObj(target);
          if (targetObj == null) {
            return false;
          }
          let targetObjProp = targetObj[propName];
          if (targetObjProp == null) {
            return false;
          }
          let needOwnCheck = needSetOption.check(targetObjProp);
          return Boolean(needOwnCheck);
        }
        utils.waitPropertyByInterval(
          () => {
            return getTarget();
          },
          checkObj,
          250,
          1e4
        ).then(() => {
          let target = getTarget();
          if (target == null) {
            return;
          }
          let targetObj = utils.getReactObj(target);
          if (targetObj == null) {
            return;
          }
          let targetObjProp = targetObj[propName];
          if (targetObjProp == null) {
            return;
          }
          needSetOption.set(targetObjProp);
        });
      });
    }
  };
  const NetDiskAutoFillAccessCode_aliyun = function(netDiskInfo) {
    if (window.location.hostname === "www.aliyundrive.com" || window.location.hostname === "www.alipan.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("#root input.ant-input").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        ReactUtils.waitReactPropsToSet(element, "reactFiber", {
          check(reactInstance) {
            var _a2;
            return typeof ((_a2 = reactInstance == null ? void 0 : reactInstance.memoizedProps) == null ? void 0 : _a2.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.memoizedProps.onChange({
              currentTarget: element,
              target: element
            });
          }
        });
        document.querySelector('#root button[type="submit"]').click();
      });
      utils.waitNode("#root input[name=pwd]").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        ReactUtils.waitReactPropsToSet(element, "reactFiber", {
          check(reactInstance) {
            var _a2;
            return typeof ((_a2 = reactInstance == null ? void 0 : reactInstance.memoizedProps) == null ? void 0 : _a2.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.memoizedProps.onChange({
              currentTarget: element,
              target: element
            });
          }
        });
        document.querySelector('#root button[type="submit"]').click();
      });
    }
  };
  const NetDiskAutoFillAccessCode_123pan = function(netDiskInfo) {
    if (window.location.hostname === "www.123pan.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("#app .ca-fot input.ant-input[type=text]").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        ReactUtils.waitReactPropsToSet(element, "reactProps", {
          check(reactInstance) {
            return typeof (reactInstance == null ? void 0 : reactInstance.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.onChange({
              target: {
                value: netDiskInfo.accessCode
              }
            });
          }
        });
        let $next = element.nextSibling;
        $next == null ? void 0 : $next.click();
      });
      utils.waitNode("#app .appinput input.ant-input[type=text]").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        ReactUtils.waitReactPropsToSet(element, "reactProps", {
          check(reactInstance) {
            return typeof (reactInstance == null ? void 0 : reactInstance.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.onChange({
              target: {
                value: netDiskInfo.accessCode
              }
            });
          }
        });
        let $next = element.nextSibling;
        $next == null ? void 0 : $next.click();
      });
    }
  };
  const NetDiskAutoFillAccessCode_weiyun = function(netDiskInfo) {
    if (window.location.hostname === "share.weiyun.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("#app input.input-txt").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        utils.dispatchEvent(element, "change");
        setTimeout(() => {
          document.querySelector(".form-item button.btn-main").click();
        }, 500);
      });
      utils.waitNode(".input-wrap input.pw-input").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        utils.dispatchEvent(element, "change");
        setTimeout(() => {
          document.querySelector(".pw-btn-wrap button.btn").click();
        }, 500);
      });
    }
  };
  const NetDiskAutoFillAccessCode_xunlei = function(netDiskInfo) {
    if (window.location.hostname === "pan.xunlei.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode(
        "#__layout div.pass-input-wrap input.td-input__inner"
      ).then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        log.error("输入框不可见，不输入密码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        utils.dispatchEvent(element, "change");
        setTimeout(() => {
          document.querySelector(
            "#__layout div.pass-input-wrap button.td-button"
          ).click();
        }, 500);
      });
      utils.waitNode(
        "#__layout div.pass-wrapper input.td-input__inner"
      ).then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        log.error("输入框不可见，不输入密码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        utils.dispatchEvent(element, "change");
        setTimeout(() => {
          document.querySelector(
            "#__layout div.pass-wrapper button.td-button"
          ).click();
        }, 500);
      });
    }
  };
  const NetDiskAutoFillAccessCode_115pan = function(netDiskInfo) {
    if (window.location.hostname === "115.com") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode("input.text").then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        element.value = netDiskInfo.accessCode;
        utils.dispatchEvent(element, "input");
        document.querySelector(
          "#js-share_code div.form-decode div.submit a"
        ).click();
      });
    }
  };
  const NetDiskAutoFillAccessCode_kuake = function(netDiskInfo) {
    if (window.location.hostname === "pan.quark.cn") {
      log.success(["自动填写链接", netDiskInfo]);
      utils.waitNode(
        "#ice-container input.ant-input[class*=ShareReceive]"
      ).then((element) => {
        if (!utils.isVisible(element)) {
          log.error("输入框不可见，不输入密码");
          return;
        }
        Qmsg.success("自动填入访问码");
        ReactUtils.waitReactPropsToSet(element, "reactProps", {
          check(reactInstance) {
            return (reactInstance == null ? void 0 : reactInstance.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.onChange({
              target: {
                value: netDiskInfo.accessCode
              }
            });
          }
        });
        ReactUtils.waitReactPropsToSet(element, "reactEventHandlers", {
          check(reactInstance) {
            return (reactInstance == null ? void 0 : reactInstance.onChange) === "function";
          },
          set(reactInstance) {
            reactInstance.onChange({
              target: {
                value: netDiskInfo.accessCode
              }
            });
          }
        });
      });
    }
  };
  const NetDiskAutoFillAccessCode_chengtong = function(netDiskInfo) {
    log.success(["自动填写链接", netDiskInfo]);
    utils.waitNode("#passcode").then((element) => {
      if (!utils.isVisible(element)) {
        log.error("输入框不可见，不输入密码");
        return;
      }
      Qmsg.success("自动填入访问码");
      element.value = netDiskInfo.accessCode;
      utils.dispatchEvent(element, "input");
      document.querySelector(
        "#main-content .form-group button.btn[type=button]"
      ).click();
    });
  };
  const NetDiskAutoFillAccessCode = {
    key: "tempNetDiskInfo",
    $data: {
      /**
       * 当前的网盘数据
       * @type {?NetDiskAutoFillAccessCodeOption}
       */
      netDiskInfo: null,
      /**
       * 自动输入访问码是否开启
       */
      enable: NetDiskConfig.function.autoFillAccessCode.value
    },
    /**
     * 初始化
     */
    init() {
      this.$data.netDiskInfo = this.getValue();
      if (!this.$data.netDiskInfo) {
        return;
      }
      if (!this.$data.enable) {
        return;
      }
      if (utils.isNull(this.$data.netDiskInfo.accessCode)) {
        return;
      }
      if (this.$data.netDiskInfo.netDiskName === "baidu" && this.$data.netDiskInfo.shareCode.startsWith("1")) {
        if (!window.location.href.includes(
          this.$data.netDiskInfo.shareCode.slice(
            1,
            this.$data.netDiskInfo.shareCode.length
          )
        )) {
          return;
        }
      } else if (
        // 网址路径中不包含shareCode的话，就跳过
        !window.location.href.includes(this.$data.netDiskInfo.shareCode)
      ) {
        return;
      }
      if (this.$data.netDiskInfo.netDiskName in NetDiskAutoFillAccessCode.netDisk) {
        let autoFillFn = NetDiskAutoFillAccessCode.netDisk[this.$data.netDiskInfo.netDiskName];
        if (typeof autoFillFn === "function") {
          autoFillFn(this.$data.netDiskInfo);
        } else {
          log.warn(
            "自动填写访问码失败：" + this.$data.netDiskInfo.netDiskName + "，原因：该网盘未适配"
          );
        }
      } else {
        log.error("网盘名未找到，跳过自动填写：" + this.$data.netDiskInfo);
      }
    },
    netDisk: {
      /**
       * 百度网盘
       */
      baidu: NetDiskAutoFillAccessCode_baidu,
      /**
       * 蓝奏云
       */
      lanzou: NetDiskAutoFillAccessCode_lanzou,
      /**
       * 天翼云
       */
      tianyiyun: NetDiskAutoFillAccessCode_tianyiyun,
      /**
       * 中国移动云盘
       */
      hecaiyun: NetDiskAutoFillAccessCode_hecaiyun,
      /**
       * 阿里云盘
       */
      aliyun: NetDiskAutoFillAccessCode_aliyun,
      /**
       * 文叔叔
       * 暂时没找到有密码的链接
       */
      wenshushu: () => {
      },
      /**
       * 奶牛
       * 暂时没找到有密码的链接
       */
      nainiu: () => {
      },
      /**
       * 123云盘
       */
      _123pan: NetDiskAutoFillAccessCode_123pan,
      /**
       * 腾讯微云
       */
      weiyun: NetDiskAutoFillAccessCode_weiyun,
      /**
       * 迅雷
       */
      xunlei: NetDiskAutoFillAccessCode_xunlei,
      /**
       * 115网盘
       */
      _115pan: NetDiskAutoFillAccessCode_115pan,
      /**
       * 城通网盘
       */
      chengtong: NetDiskAutoFillAccessCode_chengtong,
      /**
       * 夸克网盘
       */
      kuake: NetDiskAutoFillAccessCode_kuake,
      /**
       * 坚果云
       * 暂时没找到有密码的链接
       */
      jianguoyun: () => {
      },
      /**
       * OneDrive
       * 暂时没找到有密码的链接
       */
      onedrive: () => {
      }
    },
    /**
     * 设置值
     * @param {NetDiskAutoFillAccessCodeOption} value
     */
    setValue(value) {
      _GM_setValue(this.key, value);
    },
    /**
     * 获取值
     */
    getValue() {
      return _GM_getValue(this.key);
    }
  };
  const NetDiskAuthorization_Lanzouyx = function() {
    return;
  };
  const NetDiskLocalDataKey = {
    /** 模板 */
    template: {
      matchRange_text: {
        before: (key) => `${key}-text-match-range-before`,
        after: (key) => `${key}-text-match-range-after`
      },
      matchRange_html: {
        before: (key) => `${key}-html-match-range-before`,
        after: (key) => `${key}-html-match-range-after`
      },
      function: {
        enable: (key) => `${key}-enable`,
        checkLinkValidity: (key) => `${key}-check-link-valid`,
        linkClickMode: (key) => `${key}-click-mode`
        // openBlank: (key: string) => `${key}-open-blank`,
        // parseFile: (key: string) => `${key}-parse-file`,
      },
      linkClickMode_openBlank: {
        openBlankWithCopyAccessCode: (key) => `${key}-open-blank-with-copy-accesscode`
      },
      schemeUri: {
        enable: (key) => `${key}-scheme-uri-enable`,
        isForwardLinearChain: (key) => `${key}-scheme-uri-forward-linear-chain`,
        isForwardBlankLink: (key) => `${key}-scheme-uri-forward-blank-link`,
        uri: (key) => `${key}-scheme-uri-uri`
      }
    }
  };
  const NetDiskLocalData = {
    /** innerText的提取码间隔 */
    matchRange_text: {
      /**
       * 提取码间隔前的字符长度
       * @param {string} key
       * @param {number} defaultValue 默认值: 20
       */
      before(key, defaultValue = 20) {
        return parseInt(
          _GM_getValue(
            NetDiskLocalDataKey.template.matchRange_text.before(key),
            defaultValue
          ).toString()
        );
      },
      /**
       * 提取码间隔后的字符长度
       * @param {string} key
       * @param {number} defaultValue 默认值: 10
       */
      after(key, defaultValue = 10) {
        return parseInt(
          _GM_getValue(
            NetDiskLocalDataKey.template.matchRange_text.after(key),
            defaultValue
          ).toString()
        );
      }
    },
    /** innerHTML的提取码间隔 */
    matchRange_html: {
      /**
       * 提取码间隔前的字符长度
       * @param {string} key
       * @param {number} defaultValue 默认值: 100
       */
      before(key, defaultValue = 100) {
        return parseInt(
          _GM_getValue(
            NetDiskLocalDataKey.template.matchRange_html.before(key),
            defaultValue
          ).toString()
        );
      },
      /**
       * 提取码间隔后的字符长度
       * @param {string} key
       * @param {number} defaultValue 默认值: 15
       */
      after(key, defaultValue = 15) {
        return parseInt(
          _GM_getValue(
            NetDiskLocalDataKey.template.matchRange_html.after(key),
            defaultValue
          ).toString()
        );
      }
    },
    /** 功能 */
    function: {
      /**
       * 是否启用该规则
       * @param {string} key
       * @param {boolean} defaultValue
       */
      enable(key, defaultValue = true) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.function.enable(key),
            defaultValue
          )
        );
      },
      /**
       * 点击动作
       * @param key
       * @param [defaultValue="copy"]
       */
      linkClickMode(key, defaultValue = "copy") {
        return _GM_getValue(
          NetDiskLocalDataKey.template.function.linkClickMode(key),
          defaultValue
        );
      },
      /**
       * 是否进行校验链接有效性
       * @param {string} key
       * @param {boolean} [defaultValue=false]
       */
      checkLinkValidity(key, defaultValue = false) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.function.checkLinkValidity(key),
            defaultValue
          )
        );
      }
    },
    linkClickMode_openBlank: {
      /**
       * 跳转时复制访问码
       * @param key
       * @param [defaultValue=false]
       */
      openBlankWithCopyAccessCode(key, defaultValue = false) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.linkClickMode_openBlank.openBlankWithCopyAccessCode(
              key
            ),
            defaultValue
          )
        );
      }
    },
    schemeUri: {
      /**
       * 是否启用
       * @param {string} key
       * @param {boolean} [defaultValue=false]
       */
      enable(key, defaultValue = false) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.schemeUri.enable(key),
            defaultValue
          )
        );
      },
      /**
       * 转发直链（解析出的链接）
       * @param {string} key
       * @param {boolean} [defaultValue=false]
       */
      isForwardLinearChain(key, defaultValue = false) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.schemeUri.isForwardLinearChain(key),
            defaultValue
          )
        );
      },
      /**
       * 转发新标签页链接
       * @param {string} key
       * @param {boolean} [defaultValue=false]
       */
      isForwardBlankLink(key, defaultValue = false) {
        return Boolean(
          _GM_getValue(
            NetDiskLocalDataKey.template.schemeUri.isForwardBlankLink(key),
            defaultValue
          )
        );
      },
      /**
       * Uri链接
       * @param {string} key
       * @param {string} [defaultValue=""]
       */
      uri(key, defaultValue = "") {
        return _GM_getValue(
          NetDiskLocalDataKey.template.schemeUri.uri(key),
          defaultValue
        );
      }
    }
  };
  const NetDiskRule_123pan = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("_123pan"),
        link_innerText: `123pan.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_123pan"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "_123pan"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `123pan.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_123pan"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "_123pan"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /123pan.com\/s\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /123pan.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "123pan.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://123pan.com/s/{#shareCode#}",
        copyUrl: "https://123pan.com/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("_123pan")
      }
    ],
    /** 设置项 */
    setting: {
      name: "123盘",
      key: "_123pan",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: true,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskAuthorization_123pan_Authorization = {
    KEY: "_123pan_User_Authorization",
    set(value) {
      _GM_setValue(this.KEY, value);
    },
    get() {
      return _GM_getValue(this.KEY);
    }
  };
  const NetDiskAuthorization_123pan = function() {
    if (window.location.hostname !== "www.123pan.com") {
      return;
    }
    if (NetDiskLocalData.function.linkClickMode(NetDiskRule_123pan.setting.key) !== "parseFile") {
      return;
    }
    let authorToken = _unsafeWindow.localStorage.getItem("authorToken");
    if (utils.isNull(authorToken)) {
      return;
    }
    authorToken = authorToken.replace(/^\"/, "").replace(/\"$/, "");
    log.success("获取123网盘已登录用户的authorToken值👇");
    log.success(authorToken);
    NetDiskAuthorization_123pan_Authorization.set(authorToken);
  };
  const NetDiskAuthorization = {
    /**
     * 运行于ready
     */
    init() {
      Object.keys(NetDiskAuthorization.netDisk).forEach((keyName) => {
        this.netDisk[keyName]();
      });
    },
    netDisk: {
      /**
       * 123网盘，一般用于>100MB的文件直链获取
       */
      _123pan: NetDiskAuthorization_123pan,
      /**
       * 蓝奏优选
       */
      lanzouyx: NetDiskAuthorization_Lanzouyx
    }
  };
  class NetDiskParseObject {
    constructor() {
      /** 所在规则的下标 */
      __publicField(this, "netDiskIndex", 0);
      /** 分享码 */
      __publicField(this, "shareCode", "");
      /** 提取码 */
      __publicField(this, "accessCode", "");
    }
  }
  class NetDiskParse_Baidu extends NetDiskParseObject {
    /**
     * 入口
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode
     * @param {string} accessCode
     */
    init(netDiskIndex, shareCode, accessCode) {
      log.info([netDiskIndex, shareCode, accessCode]);
      this.netDiskIndex = netDiskIndex;
      this.shareCode = shareCode;
      this.accessCode = accessCode;
      let url = _GM_getValue("baidu-baiduwp-php-url");
      let postForm = _GM_getValue("baidu-baiduwp-php-post-form");
      let enableCopy = _GM_getValue("baidu-baiduwp-php-copy-url");
      if (!url) {
        Qmsg.error("请先在设置中配置百度网盘-网址");
        return void 0;
      }
      if (!postForm) {
        Qmsg.error("请先在设置中配置百度网盘-表单参数");
        return void 0;
      }
      postForm = NetDiskRuleUtils.replaceParam(postForm, {
        shareCode,
        accessCode
      });
      let formElement = document.createElement("form");
      let formData = {};
      let urlParams = new URLSearchParams(postForm);
      formElement.action = url;
      formElement.method = "post";
      formElement.style.display = "none";
      formElement.target = "_blank";
      for (let [key, value] of urlParams) {
        let textAreaElement = document.createElement("textarea");
        textAreaElement.name = key;
        textAreaElement.value = value;
        formElement.appendChild(textAreaElement);
        formData[key] = value;
      }
      log.info(["表单数据", formData]);
      document.body.appendChild(formElement);
      log.info(["访问网址", url]);
      if (enableCopy) {
        NetDiskLinkClickMode.copy(
          "baidu",
          netDiskIndex,
          shareCode,
          accessCode,
          "1.5秒后跳转至解析站"
        );
        setTimeout(() => {
          formElement.submit();
        }, 1500);
      } else {
        formElement.submit();
      }
    }
  }
  const NetDiskFilterScheme = {
    protocol: "jumpwsv",
    pathname: "go",
    /**
     * 处理链接
     * @param {string} name 规则名
     * @param {string} intentData 需要处理的数据
     * @returns {string}
     */
    parseDataToSchemeUri(name, intentData) {
      let isEnable = NetDiskLocalData.schemeUri.enable(name);
      if (!isEnable) {
        return intentData;
      }
      let schemeUri = NetDiskLocalData.schemeUri.uri(name);
      if (utils.isNull(schemeUri)) {
        schemeUri = this.getSchemeUri(this.getIDMSchemeUriOption(intentData));
      }
      if (schemeUri.startsWith(this.protocol)) {
        intentData = intentData.replace(/&/g, "{-and-}");
        intentData = intentData.replace(/#/g, "{-number-}");
      }
      schemeUri = NetDiskRuleUtils.replaceParam(schemeUri, {
        intentData
      });
      return schemeUri;
    },
    /**
     * 是否转发下载链接
     * @param key
     * @returns
     */
    isForwardDownloadLink(key) {
      return NetDiskLocalData.schemeUri.isForwardLinearChain(key);
    },
    /**
     * 是否转发跳转链接
     * @param key
     * @returns
     */
    isForwardBlankLink(key) {
      return NetDiskLocalData.schemeUri.isForwardBlankLink(key);
    },
    /**
     * 获取转发的uri链接
     * @param option
     * @returns
     */
    getSchemeUri(option) {
      return `${this.protocol}://${this.pathname}?package=${option["package"]}&activity=${option["activity"]}&intentAction=${option["intentAction"]}&intentData=${option["intentData"]}&intentExtra=${option["intentExtra"]}`;
    },
    /**
     * 获取idm的intent的配置
     * @param intentData
     * @returns
     */
    getIDMSchemeUriOption(intentData = "") {
      return {
        package: "idm.internet.download.manager.plus",
        activity: "idm.internet.download.manager.UrlHandlerDownloader",
        intentAction: "android.intent.action.VIEW",
        intentData,
        intentExtra: ""
      };
    }
  };
  const NetDiskParse_Lanzou_Config = {
    /* 蓝奏云默认域名 */
    DEFAULT_HOST_NAME: "www.lanzout.com",
    /** 菜单配置项的键名 */
    MENU_KEY: "lanzou-host-name",
    get hostname() {
      return _GM_getValue(this.MENU_KEY, this.DEFAULT_HOST_NAME);
    }
  };
  class NetDiskParse_Lanzou extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      /**
       * 路由
       */
      __publicField(this, "router", {
        default(pathName = "") {
          if (pathName.startsWith("/")) {
            pathName = pathName.replace(/^\//, "");
          }
          return `https://${NetDiskParse_Lanzou_Config.hostname}/${pathName}`;
        },
        tp(pathName = "") {
          if (pathName.startsWith("/")) {
            pathName = pathName.replace(/^\//, "");
          }
          return `https://${NetDiskParse_Lanzou_Config.hostname}/tp/${pathName}`;
        },
        s(pathName = "") {
          if (pathName.startsWith("/")) {
            pathName = pathName.replace(/^\//, "");
          }
          return `https://${NetDiskParse_Lanzou_Config.hostname}/s/${pathName}`;
        }
      });
      __publicField(this, "regexp", {
        unicode: {
          /**
           * 判断该链接是否是中文
           */
          match: /[%\u4e00-\u9fa5]+/g,
          tip: "中文链接",
          isUnicode: false
        },
        /**
         * 蓝奏文件取消分享
         */
        noFile: {
          match: /div>来晚啦...文件取消分享了<\/div>/g,
          tip: "来晚啦...文件取消分享了"
        },
        /**
         * 蓝奏文件链接错误
         */
        noExists: {
          match: /div>文件不存在，或已删除<\/div>/g,
          tip: "文件不存在，或已删除"
        },
        /**
         * 2023-9-19 蓝奏云修改分享规则，需要vip用户才可以分享 apk、ipa 链接
         */
        needVipToShare: {
          match: /class="fbox">非会员.+请先开通会员/gi,
          tip: "该链接为非会员用户分享的文件，目前无法下载"
        },
        /**
         * 蓝奏多文件
         */
        moreFile: {
          match: /<span id=\"filemore\" onclick=\"more\(\);\">/g
        },
        /**
         * 蓝奏设置了密码的单文件请求需要的sign值
         */
        sign: {
          match: /var[\s]*(posign|postsign|vidksek|skdklds)[\s]*=[\s]*'(.+?)';/
        },
        /**
         * 蓝奏文件名
         */
        fileName: {
          match: /<title>(.*)<\/title>/
        },
        /**
         * 蓝奏文件大小
         */
        fileSize: {
          match: /<span class=\"mtt\">\((.*)\)<\/span>/
        },
        /**
         * 蓝奏文件直链host
         */
        loadDownHost: {
          match: /var[\s]*(vkjxld)[\s]*=[\s]*'(.+?)'/i
        },
        /**
         * 蓝奏文件直链
         */
        loadDown: {
          match: /var[\s]*(loaddown|oreferr|spototo|domianload|hyggid)[\s]*=[\s]*'(.+?)'/i
        },
        /**
         * 蓝奏云之苹果使用类型的文件
         */
        appleDown: {
          match: /var[\s]*appitem[\s]*=[\s]*'(.+?)'/i
        },
        /**
         * 蓝奏云文件上传时间
         */
        uploadTime: {
          match: /mt2\"\>时间:<\/span>(.+?)[\s]*<span/i
        }
      });
    }
    /**
     * 入口
     * @param {number} netDiskIndex
     * @param {string} shareCode
     * @param {string} accessCode
     */
    async init(netDiskIndex, shareCode, accessCode) {
      log.info([netDiskIndex, shareCode, accessCode]);
      this.netDiskIndex = netDiskIndex;
      this.shareCode = shareCode;
      this.accessCode = accessCode;
      this.regexp.unicode.isUnicode = Boolean(
        this.shareCode.match(this.regexp.unicode.match)
      );
      if (netDiskIndex === 2) {
        await this.getMoreFile(this.router.s(this.shareCode));
      } else {
        await this.getFileLink();
      }
    }
    /**
     * 获取文件链接
     * @param {boolean} getShareCodeByPageAgain
     * @returns
     */
    async getFileLink(getShareCodeByPageAgain = false) {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i;
      const that = this;
      let url = this.router.default(this.shareCode);
      log.info("蓝奏云-获取文件下载链接" + url);
      let getResp = await httpx.get({
        url,
        headers: {
          Accept: "*/*",
          "User-Agent": utils.getRandomPCUA(),
          Referer: url
        },
        allowInterceptConfig: false,
        onerror() {
        }
      });
      if (!getResp.status) {
        log.error(getResp);
        if (getResp.type === "ontimeout") {
          return;
        }
        if (utils.isNull(getResp.data.responseText)) {
          Qmsg.error("请求异常");
          return;
        }
        if (getResp.data.responseText.includes("div>文件不存在，或者已被删除</div>")) {
          Qmsg.error("文件不存在，或者已被删除");
        } else {
          Qmsg.error("未知情况");
        }
        return;
      }
      let respData = getResp.data;
      if (respData.readyState !== 4) {
        log.error(respData);
        Qmsg.error("请求失败，请重试");
        return;
      }
      if (respData.responseText == void 0) {
        log.error(respData);
        Qmsg.error("获取网页内容为空");
        return;
      }
      if (!that.checkPageCode(respData)) {
        return;
      }
      if (that.isMoreFile(respData)) {
        await that.getMoreFile();
      } else {
        log.info(respData);
        let pageText = respData.responseText;
        if (getShareCodeByPageAgain) {
          let shareCodeNewMatch = pageText.match(
            /var[\s]*link[\s]*=[\s]*\'tp\/(.+?)\';/i
          );
          that.shareCode = shareCodeNewMatch[shareCodeNewMatch.length - 1];
          log.info(`新参数 => ${that.shareCode}`);
        }
        let pageDOM = domUtils.parseHTML(pageText, true, true);
        let pageIframeElement = pageDOM.querySelector('iframe[class^="ifr"]') || pageDOM.querySelector('iframe[class^="n_downlink"]');
        if (pageIframeElement) {
          let iframeUrl = pageIframeElement.getAttribute("src");
          log.error(["该链接需要重新通过iframe地址访问获取信息", iframeUrl]);
          Qmsg.info("正在请求下载信息");
          let fileName = ((_a2 = pageDOM.querySelector("body div.d > div")) == null ? void 0 : _a2.innerText) || ((_b = pageDOM.querySelector("#filenajax")) == null ? void 0 : _b.innerText) || ((_d = (_c = pageDOM.querySelector("title")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.replace(/ - 蓝奏云$/i, ""));
          let fileSize = pageText.match(/文件大小：<\/span>(.+?)<br>/i) || ((_e = pageDOM.querySelector(
            "div.n_box div.n_file div.n_filesize"
          )) == null ? void 0 : _e.innerText) || ((_f = pageDOM.querySelector(
            ".d2 table tr td .fileinfo:nth-child(1) .fileinforight"
          )) == null ? void 0 : _f.innerText);
          let fileUploadTime = pageText.match(/上传时间：<\/span>(.+?)<br>/i) || ((_g = pageDOM.querySelector(
            "#file[class=''] .n_file_info span.n_file_infos"
          )) == null ? void 0 : _g.innerText) || ((_h = pageDOM.querySelector(
            ".d2 table tr td .fileinfo:nth-child(3) .fileinforight"
          )) == null ? void 0 : _h.innerText) || ((_i = pageDOM.querySelector(
            "#file[class='filter'] .n_file_info span.n_file_infos"
          )) == null ? void 0 : _i.innerText);
          if (fileSize) {
            if (Array.isArray(fileSize)) {
              fileSize = fileSize[fileSize.length - 1];
            }
            if (typeof fileSize === "string") {
              fileSize = fileSize.replaceAll("大小：", "");
            }
          } else {
            log.error("解析文件大小信息失败");
          }
          if (fileUploadTime) {
            if (Array.isArray(fileUploadTime)) {
              fileUploadTime = fileUploadTime[fileUploadTime.length - 1];
            }
            if (fileUploadTime.toString().toLowerCase().startsWith("android")) {
              log.error("解析出的文件上传时间信息是Android/xxxx开头");
              fileUploadTime = void 0;
            }
          } else {
            log.error("解析文件上传时间信息失败");
          }
          let downloadUrl = await that.getLinkByIframe(iframeUrl, {
            fileName,
            fileSize,
            // @ts-ignore
            fileUploadTime
          });
          if (downloadUrl) {
            if (NetDiskFilterScheme.isForwardDownloadLink("lanzou")) {
              downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                "lanzou",
                downloadUrl
              );
            }
            NetDiskUI.staticView.oneFile({
              title: "蓝奏云单文件直链",
              fileName,
              fileSize,
              downloadUrl,
              fileUploadTime
            });
          }
        } else {
          await that.getLink(respData);
        }
      }
    }
    /**
     * 页面检查，看看是否存在文件失效情况
     * @param {object} response
     * @returns {boolean}
     * + true 未失效
     * + false 已失效
     */
    checkPageCode(response) {
      const that = this;
      let pageText = response.responseText;
      if (pageText.match(that.regexp.noFile.match)) {
        Qmsg.error(that.regexp.noFile.tip);
        return false;
      }
      if (pageText.match(that.regexp.noExists.match)) {
        Qmsg.error(that.regexp.noExists.tip);
        return false;
      }
      if (pageText.match(that.regexp.needVipToShare.match)) {
        Qmsg.error(that.regexp.needVipToShare.tip);
        return false;
      }
      return true;
    }
    /**
     * 判断是否是多文件的链接
     * @param {object} response
     * @returns {boolean}
     * + true 多文件
     * + false 单文件
     */
    isMoreFile(response) {
      const that = this;
      let pageText = response.responseText;
      if (pageText.match(that.regexp.moreFile.match)) {
        log.info("该链接为多文件");
        return true;
      } else {
        log.info("该链接为单文件");
        return false;
      }
    }
    /**
     * 获取链接
     * @param {object} response
     */
    async getLink(response) {
      const that = this;
      let pageText = response.responseText;
      if (pageText == void 0) {
        log.error("shareCode错误，重新从页面中获取");
        await that.getFileLink(true);
        return;
      }
      let sign = pageText.match(that.regexp.sign.match);
      let postData_p = "";
      let postData_sign = "";
      let fileName = pageText.match(that.regexp.fileName.match);
      let fileSize = pageText.match(that.regexp.fileSize.match) || pageText.match(/<div class="n_filesize">大小：(.+?)<\/div>/i);
      let fileUploadTime = pageText.match(that.regexp.uploadTime.match) || pageText.match(/<span class="n_file_infos">(.+?)<\/span>/i);
      if (fileName) {
        fileName = fileName[fileName.length - 1].trim();
      } else {
        fileName = "";
      }
      if (fileSize) {
        fileSize = fileSize[fileSize.length - 1].trim();
      } else {
        fileSize = "";
      }
      if (fileUploadTime) {
        fileUploadTime = fileUploadTime[fileUploadTime.length - 1].trim();
      }
      if (sign) {
        postData_sign = sign[sign.length - 1];
        log.info(`获取Sign: ${postData_sign}`);
        if (utils.isNotNull(that.accessCode)) {
          log.info("传入参数=>有密码");
          postData_p = that.accessCode;
        } else {
          log.info("传入参数=>无密码");
        }
        let postResp = await httpx.post({
          url: that.router.default("ajaxm.php"),
          responseType: "json",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": utils.getRandomAndroidUA(),
            Referer: that.router.default(that.shareCode)
          },
          data: `action=downprocess&sign=${postData_sign}&p=${postData_p}`
        });
        if (!postResp.status) {
          return;
        }
        let respData = postResp.data;
        log.info(respData);
        if (respData.readyState === 4) {
          let json_data = utils.toJSON(respData.responseText);
          let downloadUrl = `${json_data["dom"]}/file/${json_data["url"]}`;
          if (typeof json_data["url"] === "string" && (json_data["url"].startsWith("http") || json_data["url"].startsWith(json_data["dom"]))) {
            downloadUrl = json_data["url"];
          }
          json_data["zt"];
          if ("密码不正确".indexOf(json_data["inf"]) != -1) {
            Qmsg.error("密码不正确!");
            NetDiskUI.newAccessCodeView(
              void 0,
              "lanzou",
              that.netDiskIndex,
              that.shareCode,
              that.accessCode,
              (userInputAccessCode) => {
                that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
              }
            );
          } else {
            fileName = json_data["inf"] ? json_data["inf"] : fileName;
            downloadUrl = await NetDiskLinkClickModeUtils.getRedirectFinalUrl(
              downloadUrl,
              utils.getRandomAndroidUA()
            );
            log.info(downloadUrl);
            if (NetDiskFilterScheme.isForwardDownloadLink("lanzou")) {
              downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                "lanzou",
                downloadUrl
              );
            }
            NetDiskUI.staticView.oneFile({
              title: "蓝奏云单文件直链",
              fileName,
              fileSize,
              downloadUrl,
              fileUploadTime
            });
          }
        } else {
          Qmsg.error("请求失败，请重试");
        }
      } else {
        let loadDownHost = pageText.match(that.regexp.loadDownHost.match);
        let loadDown = pageText.match(that.regexp.loadDown.match);
        let appleDown = pageText.match(that.regexp.appleDown.match);
        if (utils.isNull(loadDown)) {
          loadDown = pageText.match(/var[\s]*(cppat)[\s]*=[\s]*'(.+?)'/i);
        }
        if (utils.isNull(loadDownHost) && appleDown) {
          appleDown = appleDown[appleDown.length - 1];
          loadDownHost = [appleDown];
          loadDown = [""];
          log.success(["多文件-当前链接猜测为苹果的文件", appleDown]);
        }
        if (utils.isNull(loadDownHost)) {
          Qmsg.error("蓝奏云直链：获取sign的域名失败，请反馈开发者", {
            timeout: 3500
          });
          return;
        }
        if (utils.isNull(loadDown)) {
          Qmsg.error("蓝奏云直链：获取sign失败，请反馈开发者", {
            timeout: 3500
          });
          return;
        }
        let downloadUrl = `${loadDownHost[loadDownHost.length - 1]}${loadDown[loadDown.length - 1]}`;
        log.info([fileName, fileSize, downloadUrl]);
        downloadUrl = await NetDiskLinkClickModeUtils.getRedirectFinalUrl(
          downloadUrl,
          utils.getRandomAndroidUA()
        );
        log.info(downloadUrl);
        if (NetDiskFilterScheme.isForwardDownloadLink("lanzou")) {
          downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
            "lanzou",
            downloadUrl
          );
        }
        NetDiskUI.staticView.oneFile({
          title: "蓝奏云单文件直链",
          fileName,
          fileSize,
          downloadUrl,
          fileUploadTime
        });
      }
    }
    /**
     * 通过iframe的链接来获取单文件直链
     * @param {string} urlPathName url路径
     * @param {{
     * fileName:string,
     * fileSize:string,
     * fileUploadTime:string
     * }} fileInfo 文件信息
     */
    async getLinkByIframe(urlPathName, fileInfo) {
      const that = this;
      log.info([urlPathName, fileInfo]);
      let iFrameUrl = that.router.default(urlPathName);
      let getResp = await httpx.get({
        url: iFrameUrl,
        headers: {
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "User-Agent": utils.getRandomPCUA(),
          Referer: that.router.default(that.shareCode)
        }
      });
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      log.info(respData);
      let pageText = respData.responseText;
      let aihidcmsMatch = pageText.match(/var[\s]*aihidcms[\s]*=[\s]*'(.*)';/i);
      let ciucjdsdcMatch = pageText.match(/var[\s]*ciucjdsdc[\s]*=[\s]*'(.*)';/i);
      let ajaxdataMatch = pageText.match(/var[\s]*ajaxdata[\s]*=[\s]*'(.+)';/i);
      let signMatch = pageText.match(/'sign':[\s]*'(.+)',/i);
      let ajaxUrlMatch = pageText.match(/url[\s]*:[\s]*'(.+)'[\s]*,/);
      let ajaxUrl = "ajaxm.php";
      let aihidcms = "";
      let ciucjdsdc = "";
      let ajaxdata = "";
      let sign = "";
      if (ajaxUrlMatch) {
        ajaxUrl = ajaxUrlMatch[ajaxUrlMatch.length - 1];
      } else {
        Qmsg.error("提取ajaxm.php的具体参数失败，使用默认的" + ajaxUrl);
      }
      if (aihidcmsMatch) {
        aihidcms = aihidcmsMatch[aihidcmsMatch.length - 1];
      } else {
        Qmsg.error("ajaxm.php请求参数 websignkey 获取失败");
        return;
      }
      if (ciucjdsdcMatch) {
        ciucjdsdc = ciucjdsdcMatch[ciucjdsdcMatch.length - 1];
      } else {
        Qmsg.error("ajaxm.php请求参数 websign 获取失败");
        return;
      }
      if (ajaxdataMatch) {
        ajaxdata = ajaxdataMatch[ajaxdataMatch.length - 1];
      } else {
        Qmsg.error("ajaxm.php请求参数 signs 获取失败");
        return;
      }
      if (signMatch) {
        sign = signMatch[signMatch.length - 1];
      } else {
        Qmsg.error("ajaxm.php请求参数 sign 获取失败");
        return;
      }
      let postData = {
        action: "downprocess",
        signs: ajaxdata,
        sign,
        websign: ciucjdsdc,
        websignkey: aihidcms,
        ves: 1,
        kd: 1
      };
      log.success("请求的路径参数：" + ajaxUrlMatch);
      log.success("ajaxm.php的请求参数-> " + postData);
      let postResp = await httpx.post({
        url: that.router.default(ajaxUrl),
        headers: {
          Accept: "application/json, text/javascript, */*",
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: that.router.default(that.shareCode),
          "User-Agent": utils.getRandomPCUA()
        },
        data: utils.toSearchParamsStr(postData)
      });
      if (!postResp.status) {
        return;
      }
      let postRespData = postResp.data;
      log.info(postRespData);
      let jsonData = utils.toJSON(postRespData.responseText);
      let downloadUrl = `${jsonData["dom"]}/file/${jsonData["url"]}`;
      jsonData["zt"];
      log.success(["直链", downloadUrl]);
      if ("密码不正确".indexOf(jsonData["inf"]) != -1) {
        Qmsg.error("密码不正确!");
        NetDiskUI.newAccessCodeView(
          void 0,
          "lanzou",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode,
          (userInputAccessCode) => {
            that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
          }
        );
      } else {
        fileInfo.fileName = utils.isNotNull(jsonData["inf"]) ? jsonData["inf"] : fileInfo.fileName;
        downloadUrl = await NetDiskLinkClickModeUtils.getRedirectFinalUrl(
          downloadUrl,
          utils.getRandomAndroidUA()
        );
        log.info(downloadUrl);
        return downloadUrl;
      }
    }
    /**
     * 多文件获取
     * @param {string} url 链接
     */
    async getMoreFile(url) {
      const that = this;
      if (url == null) {
        url = that.router.default(that.shareCode);
      }
      let getResp = await httpx.get({
        url,
        headers: {
          Accept: "*/*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: url
        }
      });
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      log.info(respData);
      if (respData.readyState !== 4) {
        Qmsg.error("请求失败，请重试");
        return;
      }
      let pageText = respData.responseText;
      let fid = pageText.match(/\'fid\':(.+?),/)[1].replaceAll("'", "");
      let uid = pageText.match(/\'uid\':(.+?),/)[1].replaceAll("'", "");
      let pgs = 1;
      let t_name = pageText.match(/\'t\':(.+?),/)[1];
      let t_rexp = new RegExp(t_name + `[\\s]*=[\\s]*('|")(.+?)('|");`);
      let t = pageText.match(t_rexp)[2];
      let k_name = pageText.match(/\'k\':(.+?),/)[1];
      let k_rexp = new RegExp(k_name + `[\\s]*=[\\s]*('|")(.+?)('|");`);
      let k = pageText.match(k_rexp)[2];
      let lx = that.shareCode.match(that.regexp.unicode.match) ? 1 : 2;
      let postData = `lx=${lx}&fid=${fid}&uid=${uid}&pg=${pgs}&rep=0&t=${t}&k=${k}&up=1&ls=1&pwd=${that.accessCode}`;
      log.info(`多文件请求参数：${postData}`);
      let postResp = await httpx.post({
        url: that.router.default("filemoreajax.php"),
        responseType: "json",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: url
        },
        data: postData
      });
      if (!postResp.status) {
        return;
      }
      let postRespData = postResp.data;
      log.info(postRespData);
      let json_data = utils.toJSON(postRespData.responseText);
      let zt = json_data["zt"];
      let info = json_data["info"];
      if (zt === 4) {
        Qmsg.error(info);
      } else if (zt === 1) {
        let QmsgLoading = Qmsg.loading("获取文件夹成功，解析文件直链中...");
        let folder = json_data["text"];
        let folderList = [];
        log.info(`本链接一共${folder.length}个文件`);
        for (let index = 0; index < folder.length; index++) {
          let folderInfo = folder[index];
          let fileShareCode = folderInfo["id"];
          let fileName = folderInfo["name_all"];
          let fileSize = folderInfo["size"];
          let fileType = folderInfo["icon"];
          let uploadTime = folderInfo["time"];
          folderList.push({
            fileName,
            fileSize,
            fileType,
            createTime: uploadTime,
            latestTime: uploadTime,
            isFolder: false,
            index: 0,
            async clickEvent() {
              let folderDownloadInfo = await that.parseMoreFile(
                fileShareCode,
                fileName,
                fileSize,
                uploadTime
              );
              if (folderDownloadInfo.success) {
                return {
                  autoDownload: true,
                  mode: "aBlank",
                  url: folderDownloadInfo.downloadUrl
                };
              } else {
                log.error(["获取下载信息失败：", folderDownloadInfo]);
                Qmsg.error(folderDownloadInfo.msg);
              }
            }
          });
        }
        QmsgLoading.close();
        NetDiskUI.staticView.moreFile("蓝奏云文件解析", folderList);
      } else if ("密码不正确".indexOf(info) !== -1) {
        Qmsg.error("密码不正确!");
        NetDiskUI.newAccessCodeView(
          void 0,
          "lanzou",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode,
          (userInputAccessCode) => {
            that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
          }
        );
      } else if ("没有了".indexOf(info) !== -1) {
        Qmsg.error("没有文件了");
      } else {
        Qmsg.error("未知错误");
      }
    }
    /**
     * 文件解析并返回html-vip
     * @param {string} paramShareCode 解析多文件获取的shareCode
     * @param {string} fileName 文件名
     * @param {string} fileSize 文件大小
     * @param {string} fileUploadTime 文件上传时间
     * @returns {Promise<{
     * success :boolean,
     * fileName: string,
     * fileSize: string,
     * fileUploadTime: string,
     * downloadUrl?: string,
     * msg: string,
     * }>}
     */
    async parseMoreFile(paramShareCode, fileName, fileSize, fileUploadTime) {
      const that = this;
      let getResp = await httpx.get({
        url: that.router.default(paramShareCode),
        headers: {
          Accept: "*/*",
          "User-Agent": utils.getRandomPCUA(),
          Referer: that.router.default(that.shareCode)
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return {
          success: false,
          fileName,
          fileSize,
          fileUploadTime,
          msg: `解析失败，${getResp.msg}`,
          downloadUrl: void 0
        };
      }
      let respData = getResp.data;
      let pageText = respData.responseText;
      let pageDOM = domUtils.parseHTML(pageText, true, true);
      let pageIframeElement = pageDOM.querySelector('iframe[class^="ifr"]') || pageDOM.querySelector('iframe[class^="n_downlink"]');
      if (!pageIframeElement) {
        return {
          success: false,
          fileName,
          fileSize,
          fileUploadTime,
          msg: `解析iframe链接失败`,
          downloadUrl: void 0
        };
      }
      let iframeUrl = pageIframeElement.getAttribute("src");
      log.error(["该链接需要重新通过iframe地址访问获取信息", iframeUrl]);
      Qmsg.info("正在请求下载信息");
      let downloadUrl = await that.getLinkByIframe(iframeUrl, {
        fileName,
        fileSize,
        fileUploadTime
      });
      if (downloadUrl) {
        if (NetDiskFilterScheme.isForwardDownloadLink("lanzou")) {
          downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
            "lanzou",
            downloadUrl
          );
        }
        return {
          success: true,
          fileName,
          fileSize,
          fileUploadTime,
          msg: "success",
          downloadUrl
        };
      } else {
        return {
          success: false,
          fileName,
          fileSize,
          fileUploadTime,
          msg: `获取下载链接失败`,
          downloadUrl: void 0
        };
      }
    }
  }
  const NetDiskPops = {
    /**
     * 普通信息框
     * @param details 配置
     * @param sizeConfig 大小配置
     */
    alert(details, sizeConfig) {
      details = this.handleDetails(details, sizeConfig);
      return __pops.alert(details);
    },
    /**
     * 询问框
     * @param details 配置
     * @param sizeConfig 大小配置
     */
    confirm(details, sizeConfig) {
      details = this.handleDetails(details, sizeConfig);
      return __pops.confirm(details);
    },
    /**
     * 加载层
     * @param details 配置
     */
    loading(details) {
      if (typeof details["animation"] === "undefined") {
        details["animation"] = NetDiskConfig.pops.popsAnimation.value;
      }
      if (typeof details["forbiddenScroll"] === "undefined") {
        details["forbiddenScroll"] = NetDiskUI.defaultForbiddenScroll;
      }
      return __pops.loading(details);
    },
    /**
     * 输入框
     * @param details 配置
     * @param sizeConfig 大小配置
     */
    prompt(details, sizeConfig) {
      details = this.handleDetails(details, sizeConfig);
      return __pops.prompt(details);
    },
    /**
     * 文件夹
     * @param details 配置
     */
    folder(details, sizeConfig) {
      details = this.handleDetails(details, sizeConfig);
      details["sort"] = {
        name: NetDiskConfig.popsFolder["pops-folder-sort-name"].value,
        isDesc: NetDiskConfig.popsFolder["pops-folder-sort-is-desc"].value,
        // @ts-ignore
        callback(target, event, sortName, sortDesc) {
          NetDiskConfig.popsFolder["pops-folder-sort-name"].value = sortName;
          NetDiskConfig.popsFolder["pops-folder-sort-is-desc"].value = sortDesc;
        }
      };
      return __pops.folder(details);
    },
    /**
     * 菜单面板
     * @param details 配置
     */
    panel(details, sizeConfig) {
      details = this.handleDetails(details, sizeConfig);
      return __pops.panel(details);
    },
    /**
     * 右键菜单
     */
    rightClickMenu(details) {
      details = this.handleDetails(details);
      return __pops.rightClickMenu(details);
    },
    /**
     *
     * @param details
     * @param sizeConfig 大小配置
     */
    handleDetails(details, sizeConfig) {
      details = Object.assign(
        {
          animation: NetDiskConfig.pops.popsAnimation.value,
          drag: NetDiskConfig.pops.pcDrag.value,
          dragLimit: NetDiskConfig.pops.pcDragLimit.value,
          forbiddenScroll: NetDiskUI.defaultForbiddenScroll
        },
        details
      );
      if (sizeConfig != null) {
        details.width = __pops.isPhone() ? sizeConfig.Mobile.width : sizeConfig.PC.width;
        details.height = __pops.isPhone() ? sizeConfig.Mobile.height : sizeConfig.PC.height;
      }
      if (details.mask == null) {
        details.mask = {};
      }
      if (typeof details.mask.enable !== "boolean") {
        details.mask.enable = true;
      }
      if (details.mask.clickEvent == null) {
        details.mask.clickEvent = {};
      }
      if (typeof details.mask.clickEvent.toClose !== "boolean") {
        details.mask.clickEvent.toClose = NetDiskConfig.pops.clickMaskToCloseDialog.value;
      }
      if (NetDiskConfig.pops.popsAcrylic.value) {
        let acrylicCSS = (
          /*css*/
          `
            .pops {
                --acrylic-opacity: 0.7;
                --acrylic-color: rgba(232, 232, 232, var(--acrylic-opacity));
                --acrylic-blur: 30px;
                --acrylic-saturate: 125%;
                --pops-bg-opacity: var(--acrylic-opacity);
            }
            .pops {
                backdrop-filter: blur(var(--acrylic-blur)) saturate(var(--acrylic-saturate));
                background-color: var(--acrylic-color);
            }
            .pops[type-value=panel]{
                --aside-bg-color: rgba(221, 221, 221, var(--acrylic-opacity));
            }
            `
        );
        if (typeof details.style === "string") {
          details.style += acrylicCSS;
        } else {
          details.style = acrylicCSS;
        }
      }
      details.zIndex = () => {
        let maxZIndex = utils.getMaxZIndex(10);
        let popsMaxZIndex = __pops.config.InstanceUtils.getPopsMaxZIndex(maxZIndex).zIndex;
        let zIndex = utils.getMaxValue(maxZIndex, popsMaxZIndex) + 100;
        return zIndex;
      };
      return details;
    }
  };
  const LanZouUtils = {
    LanZouDiskApp: "lanZouY-disk-app",
    EncryptList: [
      "Y",
      "y",
      "0",
      "Z",
      "z",
      "N",
      "n",
      "M",
      "I",
      "6",
      "m",
      "W",
      "w",
      "1",
      "X",
      "x",
      "L",
      "l",
      "K",
      "7",
      "k",
      "i",
      "U",
      "u",
      "2",
      "V",
      "v",
      "J",
      "j",
      "8",
      "G",
      "g",
      "F",
      "S",
      "s",
      "3",
      "T",
      "t",
      "H",
      "h",
      "f",
      "E",
      "e",
      "D",
      "Q",
      "q",
      "4",
      "R",
      "r",
      "9",
      "d",
      "a",
      "C",
      "c",
      "B",
      "O",
      "o",
      "5",
      "P",
      "p",
      "b",
      "A"
    ],
    decodeChar(e) {
      for (let t = 0; t < this.EncryptList.length; t++)
        if (e == this.EncryptList[t]) return t;
      return -1;
    },
    /**
     * shareCode转id
     * @param {string} shareCode
     */
    idEncrypt(shareCode) {
      let t = 1, n = 0;
      if ("" != shareCode && shareCode.length > 4) {
        let r;
        shareCode = shareCode.substring(3, shareCode.length - 1);
        for (let index = 0; index < shareCode.length; index++)
          r = shareCode.charAt(shareCode.length - index - 1), n += this.decodeChar(r) * t, t *= 62;
      }
      return n;
    },
    encrypt(e) {
      const t = Cryptojs.enc.Utf8.parse(this.LanZouDiskApp), n = Cryptojs.enc.Utf8.parse(e), r = Cryptojs.AES.encrypt(n, t, {
        // @ts-ignore
        mode: Cryptojs.mode.ECB,
        // @ts-ignore
        padding: Cryptojs.pad.Pkcs7
      });
      return r;
    },
    /**
     * 用于时间戳转加密字符串
     * @param {any} e
     * @returns
     */
    encryptHex(e) {
      const t = this.encrypt(e, this.LanZouDiskApp);
      return t.ciphertext.toString().toUpperCase();
    }
  };
  class NetDiskParse_Lanzouyx extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      /**
       * 获取的uuid
       */
      __publicField(this, "uuid");
      /**
       * 获取的userId
       **/
      __publicField(this, "userId");
      __publicField(this, "shareCodeId");
    }
    /**
     * 入口
     * @param {number} netDiskIndex
     * @param {string} shareCode
     * @param {string} accessCode
     */
    async init(netDiskIndex, shareCode, accessCode) {
      var _a2, _b, _c, _d;
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      that.shareCodeId = that.getDecodeShareCodeId(shareCode);
      that.uuid = that.getEncodeUUID();
      let linkInfo = await this.recommendList(
        3,
        "Chrome",
        that.uuid,
        2,
        that.getEncodeTimeStamp(),
        that.shareCodeId,
        0,
        1,
        60
      );
      if (!linkInfo) {
        return;
      }
      if (!linkInfo["list"].length) {
        return;
      }
      if ((_b = (_a2 = linkInfo["list"][0]) == null ? void 0 : _a2["map"]) == null ? void 0 : _b["userId"]) {
        that.userId = (_d = (_c = linkInfo["list"][0]) == null ? void 0 : _c["map"]) == null ? void 0 : _d["userId"];
      } else {
        Qmsg.error("解析获取【userId】为空");
        return;
      }
      if (linkInfo["list"][0]["folderIds"] == null) {
        log.success("该链接是 单文件");
        let fileInfo = linkInfo["list"][0]["fileList"][0];
        let folderInfoList = that.parseFolderInfo(
          linkInfo["list"][0]["fileList"],
          0
        );
        let downloadInfo = await folderInfoList[0]["clickEvent"]();
        if (downloadInfo && !Array.isArray(downloadInfo)) {
          let downloadUrl = downloadInfo["url"];
          if (NetDiskFilterScheme.isForwardDownloadLink("lanzouyx")) {
            downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
              "lanzouyx",
              downloadUrl
            );
          }
          NetDiskUI.staticView.oneFile({
            title: "蓝奏云优享单文件直链",
            fileName: fileInfo["fileName"],
            fileSize: fileInfo["fileSize"] * 1024,
            downloadUrl,
            fileUploadTime: utils.formatToTimeStamp(fileInfo["updTime"]),
            fileLatestTime: utils.formatToTimeStamp(fileInfo["updTime"])
          });
        }
      } else {
        log.success("该链接是 多文件");
        Qmsg.info("正在递归文件");
        let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
        let folderInfoList = that.parseFolderInfo(
          linkInfo["list"][0]["fileList"],
          0
        );
        QmsgLoading.close();
        log.info("递归完毕");
        NetDiskUI.staticView.moreFile("蓝奏云优享解析", folderInfoList);
      }
    }
    /**
     * 获取直链弹窗的文件夹信息
     * @param {object} infoList
     * @param {number} index
     */
    parseFolderInfo(infoList, index) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      infoList.forEach((item) => {
        if (item["fileType"] === 2) {
          tempFolderInfoList.push({
            fileName: item["folderName"],
            fileSize: 0,
            fileType: "",
            createTime: new Date(item["updTime"]).getTime(),
            latestTime: new Date(item["updTime"]).getTime(),
            isFolder: true,
            index,
            async clickEvent(event, config) {
              let nowTime = Date.now();
              let timestamp = that.getEncodeTimeStamp(nowTime);
              let folderId = item["folderId"];
              let folderInfo = await that.getFolderInfo(
                3,
                "Chrome",
                that.uuid,
                2,
                timestamp,
                that.shareCodeId,
                folderId,
                1,
                60
              );
              if (folderInfo && folderInfo["list"]) {
                return that.parseFolderInfo(folderInfo["list"], index + 1);
              } else {
                return [];
              }
            }
          });
        } else {
          tempFolderFileInfoList.push({
            fileName: item["fileName"],
            fileSize: item["fileSize"] * 1024,
            fileType: "",
            createTime: new Date(item["updTime"]).getTime(),
            latestTime: new Date(item["updTime"]).getTime(),
            isFolder: false,
            index,
            async clickEvent() {
              let fileId = item["fileId"];
              let userId = item["userId"] || that.userId;
              let uuid = that.uuid;
              if (utils.isNull(userId)) {
                Qmsg.error("获取【userId】为空");
                return;
              }
              if (utils.isNull(uuid)) {
                Qmsg.error("获取【uuid】为空");
                return;
              }
              let downloadUrl = await that.getDownloadFileUrl(
                ...that.getDownloadFileParams(fileId, userId, uuid)
              );
              if (downloadUrl) {
                if (NetDiskFilterScheme.isForwardDownloadLink("lanzouyx")) {
                  downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                    "lanzouyx",
                    downloadUrl
                  );
                }
                return {
                  url: downloadUrl,
                  autoDownload: true,
                  mode: "aBlank"
                };
              }
            }
          });
        }
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      return folderInfoList;
    }
    /**
     * 获取列表信息
     * @param {number} devType
     * @param {string} devModel
     * @param {string} uuid
     * @param {number} extra
     * @param {string} timestamp
     * @param {number|string} shareId
     * @param {number} type
     * @param {number} offset
     * @param {number} limit
     * @returns
     */
    async recommendList(devType = 3, devModel = "Chrome", uuid = "", extra = 2, timestamp = "", shareId = "", type = 0, offset = 1, limit = 60) {
      let postResp = await httpx.post(
        `https://api.ilanzou.com/unproved/recommend/list?devType=${devType}&devModel=${devModel}&uuid=${uuid}&extra=${extra}&timestamp=${timestamp}&shareId=${shareId}&type=${type}&offset=${offset}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Origin: "https://www.ilanzou.com",
            Referer: "https://www.ilanzou.com/",
            "Sec-Fetch-Site": "same-site",
            Host: "api.ilanzou.com",
            "User-Agent": utils.getRandomPCUA()
          },
          responseType: "json"
        }
      );
      if (!postResp.status) {
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.success(["获取链接信息：", data]);
      if (data["code"] !== 200) {
        Qmsg.error("请求链接信息失败");
        return;
      }
      if (!data["list"].length) {
        Qmsg.error("获取链接信息为空");
        return;
      }
      return data;
    }
    /**
     * 获取文件夹信息
     * @param {number} devType
     * @param {string} devModel
     * @param {string} uuid
     * @param {number} extra
     * @param {string} timestamp
     * @param {number|string} shareId
     * @param {number|string} folderId
     * @param {number} offset
     * @param {number} limit
     */
    async getFolderInfo(devType = 6, devModel = "Chrome", uuid = "", extra = 2, timestamp = "", shareId = "", folderId = "", offset = 1, limit = 60) {
      let postResp = await httpx.post(
        `https://api.ilanzou.com/unproved/share/list?devType=${devType}&devModel=${devModel}&uuid=${uuid}&extra=${extra}&timestamp=${timestamp}&shareId=${shareId}&folderId=${folderId}&offset=${offset}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Origin: "https://www.ilanzou.com",
            Referer: "https://www.ilanzou.com/",
            "Sec-Fetch-Site": "same-site",
            Host: "api.ilanzou.com",
            "User-Agent": utils.getRandomPCUA()
          }
        }
      );
      if (!postResp.status) {
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.success(["获取文件列表信息：", data]);
      if (data["code"] === 200) {
        return data;
      } else {
        Qmsg.error(data["msg"]);
      }
    }
    /**
     * 获取下载链接
     */
    async getDownloadFileUrl(downloadId = "", enable = 1, devType = 6, uuid = "", timestamp = "", auth = "") {
      let getResp = await httpx.options(
        `https://api.ilanzou.com/unproved/file/redirect?downloadId=${downloadId}&enable=${enable}&devType=${devType}&uuid=${uuid}&timestamp=${timestamp}&auth=${auth}`,
        {}
      );
      if (!getResp.status) {
        return;
      }
      log.success(getResp);
      if (getResp.data.responseText) {
        let errorData = utils.toJSON(getResp.data.responseText);
        log.error(errorData);
        Qmsg.error(errorData["msg"]);
        return;
      }
      return getResp.data.finalUrl;
    }
    /**
     * 获取加密的uuid
     * @param {number} e
     * @returns
     */
    getEncodeUUID(e = 21) {
      let r = (e2 = 21) => crypto.getRandomValues(new Uint8Array(e2)).reduce(
        (e3, t) => (t &= 63, e3 += t < 36 ? t.toString(36) : t < 62 ? (t - 26).toString(36).toUpperCase() : t > 62 ? "-" : "_", e3),
        ""
      );
      return r(e);
    }
    /**
     * 获取shareCode转换后的id
     */
    getDecodeShareCodeId(shareCode) {
      return LanZouUtils.idEncrypt(shareCode);
    }
    /**
     * 获取加密后的timestamp
     * @param {number} time
     */
    getEncodeTimeStamp(time = Date.now()) {
      return LanZouUtils.encryptHex(time);
    }
    /**
     * 获取下载文件的参数
     * @param {string} fileId 文件id
     * @param {string} userId 用户id
     * @param {?string} uuid 用户登录生成的uuid
     */
    getDownloadFileParams(fileId, userId = "", uuid) {
      const that = this;
      let nowTime = Date.now();
      let downloadId = LanZouUtils.encryptHex(fileId + "|" + userId), enable = 1, devType = 6, timestamp = that.getEncodeTimeStamp(nowTime), auth = LanZouUtils.encryptHex(fileId + "|" + nowTime);
      return [downloadId, enable, devType, uuid, timestamp, auth];
    }
    /**
     * 前往登录
     */
    gotoLogin() {
      NetDiskPops.confirm(
        {
          title: {
            position: "center",
            text: "蓝奏云优享"
          },
          content: {
            text: "必须先在【蓝奏云优享】进行登录，然后登录成功后刷新获取必备的下载参数【uuid】和【userId】。",
            html: false
          },
          btn: {
            reverse: true,
            position: "end",
            ok: {
              text: "前往",
              enable: true,
              callback() {
                window.open("https://www.ilanzou.com", "_blank");
              }
            }
          }
        },
        NetDiskUI.popsStyle.tianYiYunLoginTip
      );
    }
  }
  class NetDiskParse_Tianyiyun extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      __publicField(this, "shareId");
      /* 猜测1是有密码，2是无密码 */
      __publicField(this, "shareMode", 1);
      __publicField(this, "code", {
        ShareNotFoundFlatDir: "抱歉，该文件的分享平铺目录未找到",
        ShareNotFound: "抱歉，您访问的页面地址有误，或者该页面不存在。",
        ShareAuditNotPass: "抱歉，该内容审核不通过",
        FileNotFound: "抱歉，文件不存在",
        ShareExpiredError: "抱歉，您访问的页面地址有误，或者该页面不存在",
        ShareAuditWaiting: "抱歉，该链接处于审核中",
        ShareInfoNotFound: "抱歉，您访问的页面地址有误，或者该页面不存在",
        FileTooLarge: "抱歉，文件太大，不支持下载",
        InvalidSessionKey: "天翼云PC端Cookie未生成，是否前去登录？<br />&nbsp;&nbsp;&nbsp;&nbsp;(注意,需要当前浏览器的UA切换成PC且在登录后要等待进入个人云空间后生成Cookie，不是手机端浏览的个人云空间，那样生成的Cookie无法使用)"
      });
    }
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      let shareInfoData = await that.getShareInfoByCodeV2(shareCode);
      if (!shareInfoData) {
        return;
      }
      log.info(["解析的JSON信息", shareInfoData]);
      if (shareInfoData["needAccessCode"] && utils.isNull(that.accessCode)) {
        Qmsg.error("密码不正确!");
        NetDiskUI.newAccessCodeView(
          void 0,
          "tianyiyun",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode,
          (userInputAccessCode) => {
            that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
          }
        );
        return;
      }
      if ("shareId" in shareInfoData) {
        this.shareId = shareInfoData["shareId"];
      } else {
        this.shareId = await that.getShareId(shareCode, accessCode);
      }
      if ("shareMode" in shareInfoData) {
        this.shareMode = shareInfoData["shareMode"];
      }
      if (this.shareId == null) {
        return;
      }
      if (shareInfoData.isFolder) {
        Qmsg.info("正在递归文件");
        let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
        let fileId = shareInfoData["fileId"];
        let folderInfo = await that.listShareDir(
          shareCode,
          accessCode,
          void 0,
          void 0,
          fileId,
          fileId,
          void 0,
          this.shareId,
          void 0,
          void 0,
          void 0
        );
        if (!folderInfo) {
          QmsgLoading.close();
          return;
        }
        let folderInfoList = that.getFolderInfo(
          shareCode,
          accessCode,
          folderInfo,
          0
        );
        QmsgLoading.close();
        log.info("递归完毕");
        NetDiskUI.staticView.moreFile("天翼云文件解析", folderInfoList);
        return;
      } else {
        let downloadUrl = await that.getDownloadUrl(
          that.shareCode,
          that.accessCode,
          shareInfoData.fileId,
          this.shareId
        );
        if (downloadUrl) {
          if (NetDiskFilterScheme.isForwardDownloadLink("tianyiyun")) {
            downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
              "tianyiyun",
              downloadUrl
            );
          }
          NetDiskUI.staticView.oneFile({
            title: "天翼云单文件直链",
            fileName: shareInfoData.fileName,
            fileSize: utils.formatByteToSize(shareInfoData.fileSize),
            downloadUrl,
            fileUploadTime: shareInfoData.fileCreateDate,
            fileLatestTime: shareInfoData.fileLastOpTime
          });
        }
      }
    }
    /**
     * 获取当前登录用户的信息
     * @returns {Promise<?{
     * encryptAccount: string,
     * icon: string,
     * nickname: string,
     * res_code: string,
     * res_message: string,
     * sessionKey: string,
     * userAccount: string
     * }>}
     */
    async getUserBriefInfo(shareCode) {
      const that = this;
      let getResp = await httpx.get(
        "https://cloud.189.cn/api/portal/v2/getUserBriefInfo.action",
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Referer: "https://cloud.189.cn/web/share?code=" + shareCode,
            "User-Agent": utils.getRandomPCUA()
          },
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      log.info(getResp);
      if (!getResp.status) {
        let errorResultJSON = utils.toJSON(getResp.data.responseText);
        if (errorResultJSON["res_code"] in that.code) {
          Qmsg.error(
            that.code[errorResultJSON["res_code"]]
          );
        } else {
          Qmsg.error("请求异常");
        }
        return;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (data["res_code"] === 0) {
        return data;
      }
    }
    /**
     * 获取分享信息
     * @param {string} shareCode
     * @returns
     */
    async getShareInfoByCodeV2(shareCode) {
      const that = this;
      let postResp = await httpx.post({
        url: "https://cloud.189.cn/api/open/share/getShareInfoByCodeV2.action",
        data: `shareCode=${shareCode}`,
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": utils.getRandomPCUA(),
          "Sign-Type": 1,
          Referer: "https://cloud.189.cn/web/share?code=" + shareCode,
          Origin: "https://cloud.189.cn"
        },
        allowInterceptConfig: false,
        onerror() {
        }
      });
      if (!postResp.status) {
        let errorData = utils.toJSON(postResp.data.responseText);
        log.error(["获取下载参数失败的JSON信息", errorData]);
        if (errorData["res_code"] in that.code) {
          Qmsg.error(that.code[errorData["res_code"]]);
        } else {
          Qmsg.error(errorData["res_message"]);
        }
        return;
      }
      let postData = postResp.data;
      log.info(postData);
      let data = utils.toJSON(postData.responseText);
      if (data["res_code"] == 0) {
        return data;
      } else {
        if (that.code.hasOwnProperty(data["res_code"])) {
          Qmsg.error(that.code[data["res_code"]]);
        } else {
          Qmsg.error("获取FileId失败");
        }
      }
    }
    /**
     * 获取shareId
     * @returns {Promise<?number>}
     */
    async getShareId(shareCode, accessCode) {
      let getResp = await httpx.get({
        url: `https://cloud.189.cn/api/open/share/checkAccessCode.action?shareCode=${shareCode}&accessCode=${accessCode}`,
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Cache-Control": "no-cache",
          "User-Agent": utils.getRandomPCUA(),
          "Sign-Type": 1,
          Referer: `https://cloud.189.cn/web/share?code=${shareCode}`
        },
        responseType: "json"
      });
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      log.info(respData);
      let data = utils.toJSON(respData.responseText);
      if (data["res_code"] === 0 && "shareId" in data) {
        return data["shareId"];
      } else {
        Qmsg.error("获取shareId失败");
        log.info(data);
      }
    }
    /**
     * 获取随机noCache
     * @returns {string}
     */
    getNoCacheValue() {
      let result = "";
      for (let index = 0; index < 17; index++) {
        result += utils.getRandomValue(1, 9);
      }
      return "0." + result;
    }
    /**
     * 获取下载链接
     * @param {string} shareCode
     * @param {string} accessCode
     * @param {number} fileId
     * @param {number} shareId
     * @returns {Promise}
     */
    async getDownloadUrl(shareCode, accessCode, fileId, shareId) {
      const that = this;
      let getResp = await httpx.get({
        url: `https://cloud.189.cn/api/open/file/getFileDownloadUrl.action?fileId=${fileId}&dt=1&shareId=${shareId}`,
        headers: {
          Accept: "application/json;charset=UTF-8",
          "Cache-Control": "no-cache",
          "User-Agent": utils.getRandomPCUA(),
          Referer: `https://cloud.189.cn/web/share?code=${shareCode}`,
          "Sign-Type": 1
        },
        responseType: "json",
        allowInterceptConfig: false,
        onerror() {
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        let errorResultJSON = utils.toJSON(getResp.data.responseText);
        if (errorResultJSON["errorCode"] === "InvalidSessionKey") {
          that.gotoLogin(that.code["InvalidSessionKey"]);
        } else if (errorResultJSON["res_code"] in that.code) {
          Qmsg.error(
            that.code[errorResultJSON["res_code"]]
          );
        } else {
          Qmsg.error("请求异常");
        }
        return;
      }
      let respData = getResp.data;
      let data = utils.toJSON(respData.responseText);
      log.info(data);
      if (data["res_code"] === 0) {
        return data["fileDownloadUrl"];
      } else if ("InvalidSessionKey" === data["res_code"] || "InvalidSessionKey" === data["errorCode"]) {
        that.gotoLogin(that.code["InvalidSessionKey"]);
      } else if (that.code.hasOwnProperty(data["res_code"])) {
        Qmsg.error(that.code[data["res_code"]]);
      } else {
        Qmsg.error("请求失败");
        log.error(respData);
      }
    }
    /**
     * 天翼云登录弹窗
     * @param {string} text 弹窗的显示的内容
     */
    gotoLogin(text = "") {
      NetDiskPops.confirm(
        {
          title: {
            position: "center",
            text: "天翼云"
          },
          content: {
            text,
            html: false
          },
          btn: {
            reverse: true,
            position: "end",
            ok: {
              text: "前往",
              enable: true,
              callback() {
                window.open(
                  "https://cloud.189.cn/api/portal/loginUrl.action?redirectURL=https://cloud.189.cn/web/main",
                  "_blank"
                );
              }
            }
          }
        },
        NetDiskUI.popsStyle.tianYiYunLoginTip
      );
    }
    /**
     * 解析文件夹信息
     */
    async listShareDir(shareCode, accessCode, pageNum = 1, pageSize = 60, fileId, shareDirFileId, isFolder = true, shareId, iconOption = 5, orderBy = "lastOpTime", descending = true) {
      const that = this;
      const getSearParamData = {
        pageNum,
        pageSize,
        fileId,
        shareDirFileId,
        isFolder,
        shareId,
        shareMode: this.shareMode,
        iconOption,
        orderBy,
        descending,
        accessCode
      };
      let getResp = await httpx.get(
        `https://cloud.189.cn/api/open/share/listShareDir.action?${utils.toSearchParamsStr(
        getSearParamData
      )}`,
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Referer: `https://cloud.189.cn/web/share?code=${shareCode}`,
            "Sign-Type": 1,
            "User-Agent": utils.getRandomPCUA()
          },
          responseType: "json",
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      if (!getResp.status) {
        let errorData = utils.toJSON(getResp.data.responseText);
        log.error(["解析文件夹信息失败", errorData]);
        if (errorData["res_code"] in that.code) {
          Qmsg.error(that.code[errorData["res_code"]]);
        } else if ("res_message" in errorData) {
          Qmsg.error(errorData["res_message"]);
        } else {
          Qmsg.error("解析文件夹信息失败");
        }
        return;
      }
      let getData = getResp.data;
      log.info(getData);
      let data = utils.toJSON(getData.responseText);
      if (data["res_code"] == 0) {
        return data["fileListAO"];
      } else {
        if (that.code.hasOwnProperty(data["res_code"])) {
          Qmsg.error(that.code[data["res_code"]]);
        } else {
          Qmsg.error("获取FileId失败");
        }
      }
    }
    /**
     * 获取直链弹窗的文件夹信息
     */
    getFolderInfo(shareCode, accessCode, dirInfo, index = 0) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      dirInfo["folderList"].forEach((folderInfo) => {
        folderInfoList.push({
          fileName: folderInfo["name"],
          fileSize: 0,
          fileType: "",
          createTime: utils.formatToTimeStamp(folderInfo["createDate"]),
          latestTime: utils.formatToTimeStamp(folderInfo["lastOpTime"]),
          isFolder: true,
          index,
          async clickEvent() {
            let _folderInfo_ = await that.listShareDir(
              shareCode,
              accessCode,
              1,
              100,
              folderInfo["id"],
              folderInfo["id"],
              void 0,
              that.shareId,
              void 0,
              void 0,
              void 0
            );
            if (!_folderInfo_) {
              return [];
            }
            return that.getFolderInfo(
              shareCode,
              accessCode,
              _folderInfo_,
              index + 1
            );
          }
        });
      });
      dirInfo["fileList"].forEach((fileInfo) => {
        folderInfoList.push({
          fileName: fileInfo["name"],
          fileSize: fileInfo["size"],
          fileType: "",
          createTime: utils.formatToTimeStamp(fileInfo["createDate"]),
          latestTime: utils.formatToTimeStamp(fileInfo["lastOpTime"]),
          isFolder: false,
          index,
          async clickEvent() {
            let downloadUrl = await that.getDownloadUrl(
              shareCode,
              accessCode,
              fileInfo["id"],
              that.shareId
            );
            if (downloadUrl) {
              if (NetDiskFilterScheme.isForwardDownloadLink("tianyiyun")) {
                downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                  "tianyiyun",
                  downloadUrl
                );
              }
              return {
                autoDownload: true,
                mode: "aBlank",
                url: downloadUrl
              };
            }
          }
        });
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      log.info(["getFolderInfo", folderInfoList]);
      return folderInfoList;
    }
  }
  class NetDiskParse_Wenshushu extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      /**
       * 用于header头x-token
       * @type {string}
       */
      __publicField(this, "token");
      __publicField(this, "code", {
        1004: "no token",
        1008: "您没有权限访问",
        1013: "糟糕，此任务已过期销毁，下次要记得续期",
        1066: "对方设置的下载 / 预览次数已用完",
        1088: "糟糕，您访问的页面不存在"
      });
    }
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      Qmsg.info("正在请求直链中...");
      let token = await this.getWssToken();
      if (!token) {
        return;
      }
      let pidInfo = await this.getPid();
      if (!pidInfo) {
        return;
      }
      await this.getFileNList(pidInfo.bid, pidInfo.pid);
    }
    /**
     * 获取token
     * wss:xxxxxx
     * @returns {Promise<string>}
     */
    async getWssToken() {
      const that = this;
      let postResp = await httpx.post({
        url: "https://www.wenshushu.cn/ap/login/anonymous",
        responseType: "json",
        dataType: "json",
        data: JSON.stringify({
          dev_info: "{}"
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: "https://www.wenshushu.cn/f/" + that.shareCode
        }
      });
      log.success(postResp);
      if (!postResp.status) {
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      if (data["code"] === 0) {
        that.token = data["data"]["token"];
        return data["data"]["token"];
      } else if (data["code"] in that.code) {
        Qmsg.error(that.code[data["code"]]);
      } else {
        Qmsg.error("获取wss失败");
      }
    }
    /**
     * 获取pid
     * @returns {Promise<{bid:string,pid:string}> }
     */
    async getPid() {
      const that = this;
      let postResp = await httpx.post({
        url: "https://www.wenshushu.cn/ap/task/mgrtask",
        dataType: "json",
        responseType: "json",
        data: JSON.stringify({
          tid: that.shareCode,
          password: "",
          ufileid: ""
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: "https://www.wenshushu.cn/f/" + that.shareCode,
          "x-token": that.token
        }
      });
      log.success(postResp);
      if (!postResp.status) {
        return;
      }
      let respData = postResp.data;
      let data = utils.toJSON(respData.responseText);
      if (data["code"] === 0) {
        return {
          bid: data["data"]["boxid"],
          pid: data["data"]["ufileid"]
        };
      } else if (data["code"] in that.code) {
        Qmsg.error(that.code[data["code"]]);
      } else {
        Qmsg.error("获取pid失败");
      }
    }
    /**
     * 获取文件列表信息
     * @param {string} bid
     * @param {string} pid
     * @returns
     */
    async getFileNList(bid, pid) {
      const that = this;
      let postResp = await httpx.post({
        url: "https://www.wenshushu.cn/ap/ufile/nlist",
        dataType: "json",
        responseType: "json",
        data: JSON.stringify({
          start: 0,
          sort: {
            name: "asc"
          },
          bid,
          pid,
          options: {
            uploader: "true"
          },
          size: 50
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: "https://www.wenshushu.cn/f/" + that.shareCode,
          "x-token": that.token
        }
      });
      log.success(postResp);
      if (!postResp.status) {
        return;
      }
      let respData = postResp.data;
      let jsonData = utils.toJSON(respData.responseText);
      if (jsonData["code"] === 0) {
        if (jsonData["data"]["fileList"][0]["type"] === 2) {
          Qmsg.error("该链接为多层级文件嵌套，跳转");
          NetDiskLinkClickMode.openBlank(
            NetDiskLinkClickModeUtils.getBlankUrl(
              "wenshushu",
              that.netDiskIndex,
              that.shareCode,
              that.accessCode
            ),
            "wenshushu",
            that.netDiskIndex,
            that.shareCode,
            that.accessCode
          );
        } else {
          await that.getDownloadUrl(jsonData["data"]["fileList"][0]);
        }
      } else if (jsonData["code"] in that.code) {
        Qmsg.error(that.code[jsonData["code"]]);
      } else {
        Qmsg.error("获取文件信息失败");
      }
    }
    /**
     * 获取下载链接
     * @param {object} data
     * @returns {Promise}
     */
    async getDownloadUrl(data) {
      const that = this;
      let file_name = data.fname;
      let file_size = utils.formatByteToSize(data.size);
      let postResp = await httpx.post({
        url: "https://www.wenshushu.cn/ap/dl/sign",
        dataType: "json",
        responseType: "json",
        data: JSON.stringify({
          ufileid: data.fid,
          consumeCode: 0
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: "https://www.wenshushu.cn/f/" + that.shareCode,
          "x-token": that.token
        }
      });
      if (!postResp.status) {
        return;
      }
      log.success(postResp);
      let respData = postResp.data;
      let jsonData = utils.toJSON(respData.responseText);
      if (jsonData["code"] == 0) {
        let downloadUrl = jsonData["data"]["url"];
        if (downloadUrl === "") {
          Qmsg.error("对方的分享流量不足");
        } else {
          if (NetDiskFilterScheme.isForwardDownloadLink("wenshushu")) {
            downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
              "wenshushu",
              downloadUrl
            );
          }
          NetDiskUI.staticView.oneFile({
            title: "文叔叔单文件直链",
            fileName: file_name,
            fileSize: file_size,
            downloadUrl
          });
        }
      } else if (jsonData["data"] in that.code) {
        Qmsg.error(that.code[jsonData["data"]]);
      } else {
        Qmsg.error("获取下载链接失败");
      }
    }
  }
  class NetDiskParse_123pan extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      __publicField(this, "panelList", []);
      __publicField(this, "Authorization", "");
      __publicField(this, "code", {
        5113: "您今日下载流量已超出10GB限制，购买VIP会员即可体验无限流量下载",
        5103: "分享码错误或者分享地址错误",
        5104: "分享已过期",
        "-1000": "获取出错",
        "-2000": "请求异常",
        "-3000": "请求意外中止",
        "-4000": "请求超时",
        104: "文件已失效"
      });
    }
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      that.panelList = [];
      that.Authorization = NetDiskAuthorization_123pan_Authorization.get();
      let checkLinkValidityStatus = await that.checkLinkValidity();
      if (!checkLinkValidityStatus) {
        return;
      }
      let infoLists = await that.getFiles();
      if (!infoLists) {
        return;
      }
      if (infoLists.length === 1 && infoLists[0]["Type"] == 0) {
        let fileInfo = infoLists[0];
        if (fileInfo["Status"] == 104) {
          Qmsg.error("文件已失效");
          return;
        }
        let downloadUrl = fileInfo["DownloadUrl"];
        let fileSize = "";
        if (downloadUrl === "") {
          let downloadInfo = await that.getFileDownloadInfo(
            fileInfo["Etag"],
            fileInfo["FileId"],
            fileInfo["S3KeyFlag"],
            that.shareCode,
            fileInfo["Size"]
          );
          if (downloadInfo && downloadInfo["code"] === 0) {
            downloadUrl = downloadInfo["data"]["DownloadURL"];
            if (NetDiskFilterScheme.isForwardDownloadLink("_123pan")) {
              downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                "_123pan",
                downloadUrl
              );
            }
            fileSize = utils.formatByteToSize(fileInfo["Size"]);
          } else if (downloadInfo && downloadInfo["code"] === 401) {
            downloadUrl = "javascript:;";
            fileSize = "请登录后下载";
          } else {
            downloadUrl = "javascript:;";
            fileSize = "获取下载链接失败";
          }
        } else {
          if (NetDiskFilterScheme.isForwardDownloadLink("_123pan")) {
            downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
              "_123pan",
              downloadUrl
            );
          }
          fileSize = utils.formatByteToSize(fileInfo["Size"]);
        }
        let fileUploadTime = new Date(fileInfo["CreateAt"]).getTime();
        let fileLatestTime = new Date(fileInfo["UpdateAt"]).getTime();
        fileUploadTime = utils.formatTime(fileUploadTime);
        fileLatestTime = utils.formatTime(fileLatestTime);
        NetDiskUI.staticView.oneFile({
          title: "123盘单文件直链",
          fileName: fileInfo["FileName"],
          fileSize,
          downloadUrl,
          fileUploadTime,
          fileLatestTime
        });
      } else {
        Qmsg.info("正在递归文件");
        let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
        let folderInfoList = that.getFolderInfo(infoLists, 0);
        QmsgLoading.close();
        log.info("递归完毕");
        NetDiskUI.staticView.moreFile("123盘文件解析", folderInfoList);
      }
    }
    /**
     * 校验链接有效性
     * @returns {boolean}
     */
    async checkLinkValidity() {
      const that = this;
      Qmsg.info("正在校验链接有效性");
      let url = `https://www.123pan.com/s/${that.shareCode}`;
      let getResp = await httpx.get({
        url,
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Referer: "https://www.123pan.com"
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return false;
      }
      let respData = getResp.data;
      let g_initialPropsMatch = respData.responseText.match(
        /window.g_initialProps[\s]*=[\s]*\{(.+?)\};/s
      );
      if (g_initialPropsMatch) {
        log.info(g_initialPropsMatch);
        let g_initialProps = utils.toJSON(
          `{${g_initialPropsMatch[g_initialPropsMatch.length - 1]}}`
        );
        log.info(g_initialProps);
        if (g_initialProps.res.code !== 0) {
          Qmsg.error(g_initialProps.res.message);
          return false;
        }
        let HasPwd = g_initialProps.res.data.HasPwd;
        if (HasPwd && (that.accessCode == void 0 || that.accessCode === "")) {
          Qmsg.error("密码缺失!");
          NetDiskUI.newAccessCodeView(
            "密码缺失",
            "_123pan",
            that.netDiskIndex,
            that.shareCode,
            that.accessCode,
            (userInputAccessCode) => {
              that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
            }
          );
        } else {
          return true;
        }
      } else {
        Qmsg.error("校验链接-获取初始化内容失败");
      }
    }
    /**
     * 获取文件
     * @param {number} parentFileId
     * @returns {Promise<?{
     * Category: number,
     * ContentType: string,
     * CreateAt: number,
     * DownloadUrl: string,
     * Etag: string,
     * FileId: number,
     * FileName: string,
     * ParentFileId: number,
     * PunishFlag: number,
     * S3KeyFlag: number,
     * Size: number,
     * Status: number,
     * StorageNode: string,
     * Type: 0|1,
     * UpdateAt: string,
     * }[]>}
     */
    async getFiles(parentFileId = 0) {
      const that = this;
      const getData = {
        limit: 100,
        next: 1,
        orderBy: "share_id",
        orderDirection: "desc",
        shareKey: that.shareCode,
        SharePwd: that.accessCode,
        ParentFileId: parentFileId,
        Page: 1
      };
      let url = `https://www.123pan.com/b/api/share/get?${utils.toSearchParamsStr(
      getData
    )}`;
      let getResp = await httpx.get({
        url,
        headers: {
          Accept: "*/*",
          "User-Agent": utils.getRandomPCUA(),
          Referer: `https://www.123pan.com/s/${that.shareCode}`
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      let json_data = utils.toJSON(respData.responseText);
      if (json_data["code"] === 0) {
        let infoList = json_data["data"]["InfoList"];
        return infoList;
      } else if (json_data["code"] === 5103) {
        NetDiskUI.newAccessCodeView(
          void 0,
          "_123pan",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode,
          (userInputAccessCode) => {
            that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
          }
        );
      } else if (that.code[json_data["code"]]) {
        Qmsg.error(that.code[json_data["code"]]);
      } else if ("message" in json_data) {
        Qmsg.error(json_data["message"]);
      } else {
        Qmsg.error("123盘：未知的JSON格式");
      }
    }
    /**
     * 递归算法使用的请求
     * @param {string} parentFileId
     * @returns {Promise<?{
     * Category: number,
     * ContentType: string,
     * CreateAt: number,
     * DownloadUrl: string,
     * Etag: string,
     * FileId: number,
     * FileName: string,
     * ParentFileId: number,
     * PunishFlag: number,
     * S3KeyFlag: number,
     * Size: number,
     * Status: number,
     * StorageNode: string,
     * Type: 0|1,
     * UpdateAt: string,
     * }[]>}
     */
    async getFilesByRec(parentFileId) {
      const that = this;
      let getResp = await httpx.get({
        url: `https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&shareKey=${that.shareCode}&SharePwd=${that.accessCode}&ParentFileId=${parentFileId}&Page=1`,
        headers: {
          Accept: "*/*",
          "User-Agent": utils.getRandomAndroidUA(),
          Referer: `https://www.123pan.com/s/${that.shareCode}`
        }
      });
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      log.info(respData);
      let jsonData = utils.toJSON(respData.responseText);
      if (jsonData["code"] == 0) {
        return jsonData["data"]["InfoList"];
      }
    }
    /**
     * 获取文件夹信息
     * @param {{
     * Category: number,
     * ContentType: string,
     * CreateAt: number,
     * DownloadUrl: string,
     * Etag: string,
     * FileId: number,
     * FileName: string,
     * ParentFileId: number,
     * PunishFlag: number,
     * S3KeyFlag: number,
     * Size: number,
     * Status: number,
     * StorageNode: string,
     * Type: 0|1,
     * UpdateAt: string,
     * }[]} infoList
     * @returns {Promise<{
     * fileName: string,
     * fileSize: string|number,
     * fileType: ?string,
     * createTime: ?string,
     * latestTime: ?string,
     * isFolder: boolean,
     * index: ?number,
     * clickCallBack: ?(event:Event,_config_: object)=>{}
     * }[]>}
     */
    getFolderInfo(infoList, index) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      infoList.forEach((item) => {
        if (item.Type) {
          tempFolderInfoList.push({
            fileName: item.FileName,
            fileSize: 0,
            fileType: "",
            createTime: new Date(item.CreateAt).getTime(),
            latestTime: new Date(item.UpdateAt).getTime(),
            isFolder: true,
            index,
            async clickEvent() {
              let resultFileInfoList = await that.getFilesByRec(item["FileId"]);
              if (resultFileInfoList) {
                return that.getFolderInfo(resultFileInfoList, index + 1);
              } else {
                return [];
              }
            }
          });
        } else {
          tempFolderFileInfoList.push({
            fileName: item.FileName,
            fileSize: item.Size,
            fileType: "",
            createTime: new Date(item.CreateAt).getTime(),
            latestTime: new Date(item.UpdateAt).getTime(),
            isFolder: false,
            index,
            async clickEvent() {
              if (item.Status == 104) {
                Qmsg.error("文件已失效");
              } else if (!Boolean(item.DownloadUrl)) {
                let downloadInfo = await that.getFileDownloadInfo(
                  item["Etag"],
                  item["FileId"],
                  item["S3KeyFlag"],
                  that.shareCode,
                  item["Size"]
                );
                if (downloadInfo && downloadInfo["code"] === 0) {
                  return {
                    url: downloadInfo["data"]["DownloadURL"],
                    autoDownload: true,
                    mode: "aBlank"
                  };
                } else if (downloadInfo && downloadInfo["code"] === 401) {
                  Qmsg.error("请登录后下载");
                } else {
                  Qmsg.error("获取下载链接失败");
                }
              } else {
                let downloadUrl = item.DownloadUrl;
                if (NetDiskFilterScheme.isForwardDownloadLink("_123pan")) {
                  downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                    "_123pan",
                    downloadUrl
                  );
                }
                return {
                  url: downloadUrl,
                  autoDownload: true,
                  mode: "aBlank"
                };
              }
            }
          });
        }
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      return folderInfoList;
    }
    /**
     * 获取单文件下载链接
     * 123云盘新增了下载验证
     * @param {string} Etag
     * @param {string} FileID
     * @param {string} S3keyFlag
     * @param {string} ShareKey
     * @param {string} Size
     * @returns
     */
    async getFileDownloadInfo(Etag, FileID, S3keyFlag, ShareKey, Size) {
      const that = this;
      let authK_V = that.getFileDownloadAuth();
      let headers = {
        "App-Version": "3",
        Platform: "web",
        "Content-Type": "application/json;charset=UTF-8",
        Host: "www.123pan.com",
        Accept: "*/*",
        "User-Agent": utils.getRandomPCUA(),
        Referer: "https://www.123pan.com/s/" + ShareKey,
        Origin: "https://www.123pan.com"
      };
      if (that.Authorization) {
        Reflect.set(headers, "Authorization", "Bearer " + that.Authorization);
      }
      log.success("获取下载链接加密参数：" + authK_V);
      let postResp = await httpx.post({
        url: `https://www.123pan.com/a/api/share/download/info?${authK_V[0]}=${authK_V[1]}`,
        data: JSON.stringify({
          Etag,
          FileID,
          S3keyFlag,
          ShareKey,
          Size
        }),
        responseType: "json",
        headers
      });
      if (!postResp.status) {
        return;
      }
      let postData = postResp.data;
      let jsonData = utils.toJSON(postData.responseText);
      log.info(jsonData);
      if (jsonData["code"] == 0) {
        jsonData["data"]["DownloadURL"] = await that.decodeDownloadUrl(
          jsonData["data"]["DownloadURL"]
        );
        return jsonData;
      } else {
        return {
          code: jsonData["code"]
        };
      }
    }
    /**
     * 获取单文件下载链接的加密参数
     * 感谢：https://github.com/qaiu/netdisk-fast-download/
     */
    getFileDownloadAuth() {
      function encry_time(param) {
        var param_time, param_other = arguments["length"] > 2 && void 0 !== arguments[2] ? arguments[2] : 8;
        if (0 === arguments["length"]) return void 0;
        "object" === typeof param ? param_time = param : (10 === ("" + param)["length"] && (param = 1e3 * parseInt(param)), param_time = new Date(param));
        var param_timezoneoffset = param + 6e4 * new Date(param)["getTimezoneOffset"](), param_time_n = param_timezoneoffset + 36e5 * param_other;
        return param_time = new Date(param_time_n), {
          y: param_time["getFullYear"](),
          m: param_time["getMonth"]() + 1 < 10 ? "0" + (param_time["getMonth"]() + 1) : param_time["getMonth"]() + 1,
          d: param_time["getDate"]() < 10 ? "0" + param_time["getDate"]() : param_time["getDate"](),
          h: param_time["getHours"]() < 10 ? "0" + param_time["getHours"]() : param_time["getHours"](),
          f: param_time["getMinutes"]() < 10 ? "0" + param_time["getMinutes"]() : param_time["getMinutes"]()
        };
      }
      function encry_join(param) {
        for (var a = arguments["length"] > 1 && void 0 !== arguments[1] ? arguments[1] : 10, funcRun = function() {
          for (var b, c = [], d = 0; d < 256; d++) {
            b = d;
            for (var index = 0; index < 8; index++)
              b = 1 & b ? 3988292384 ^ b >>> 1 : b >>> 1;
            c[d] = b;
          }
          return c;
        }, _funcRun_ = funcRun(), _param = param, _param_1 = -1, _param_0 = 0; _param_0 < _param["length"]; _param_0++)
          _param_1 = _param_1 >>> 8 ^ _funcRun_[255 & (_param_1 ^ _param.charCodeAt(_param_0))];
        return _param_1 = (-1 ^ _param_1) >>> 0, _param_1.toString(a);
      }
      function getSign(urlPath) {
        var param_web = "web";
        var param_type = 3;
        var param_time = Math.round(
          ((/* @__PURE__ */ new Date()).getTime() + 60 * (/* @__PURE__ */ new Date()).getTimezoneOffset() * 1e3 + 288e5) / 1e3
        ).toString();
        var key = "a,d,e,f,g,h,l,m,y,i,j,n,o,p,k,q,r,s,t,u,b,c,v,w,s,z";
        var randomRoundNum = Math["round"](1e7 * Math["random"]());
        var number_split;
        var time_a;
        var time_y;
        var time_m;
        var time_d;
        var time_h;
        var time_f;
        var time_array;
        var time_push;
        for (var number_item in number_split = key.split(","), time_a = encry_time(param_time), // @ts-ignore
        time_y = time_a["y"], // @ts-ignore
        time_m = time_a["m"], // @ts-ignore
        time_d = time_a["d"], // @ts-ignore
        time_h = time_a["h"], // @ts-ignore
        time_f = time_a["f"], time_array = [time_y, time_m, time_d, time_h, time_f].join(""), time_push = [], time_array)
          time_push["push"](number_split[Number(time_array[number_item])]);
        var param_no;
        var param_join_s;
        return (
          // @ts-ignore
          param_no = encry_join(time_push["join"]("")), param_join_s = encry_join(
            ""["concat"](param_time, "|")[
              // @ts-ignore
              "concat"
              // @ts-ignore
            ](randomRoundNum, "|")["concat"](urlPath, "|")["concat"](param_web, "|")[
              // @ts-ignore
              "concat"
              // @ts-ignore
            ](param_type, "|")["concat"](param_no)
          ), [
            param_no,
            ""["concat"](param_time, "-")[
              // @ts-ignore
              "concat"
              // @ts-ignore
            ](randomRoundNum, "-")["concat"](param_join_s)
          ]
        );
      }
      return getSign("/a/api/share/download/info");
    }
    /**
     * 将直链的param参数解析成真正的直链
     * @param {string} url
     */
    async decodeDownloadUrl(url) {
      const that = this;
      if (url === "") {
        return "";
      }
      let decodeURL = new URL(url);
      let params = decodeURL.search.replace(/^\?params=/gi, "");
      params = params.split("&")[0];
      try {
        let newDecodeUrl = decodeURI(atob(params));
        log.info("正在获取重定向直链");
        Qmsg.info("正在获取重定向直链");
        let getResp = await httpx.get({
          url: newDecodeUrl,
          responseType: "json",
          headers: {
            "User-Agent": utils.getRandomAndroidUA(),
            Referer: "https://www.123pan.com/s/" + that.shareCode,
            Origin: "https://www.123pan.com"
          },
          allowInterceptConfig: false,
          onerror: function() {
          }
        });
        log.info(getResp);
        if (!getResp.status && getResp.data.status !== 210) {
          let parseUrl = new URL(newDecodeUrl);
          if (parseUrl.searchParams.has("auto_redirect")) {
            parseUrl.searchParams.set("auto_redirect", "1");
            return parseUrl.toString();
          }
          return newDecodeUrl;
        }
        let respData = getResp.data;
        let resultJSON = utils.toJSON(respData.responseText);
        let newURL = new URL(resultJSON.data.redirect_url);
        newURL.searchParams.set("auto_redirect", "1");
        log.success(resultJSON);
        return newURL.toString();
      } catch (error) {
        log.error(error);
        return url;
      }
    }
  }
  class NetDiskParse_Jianguoyun extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      __publicField(this, "errorCode", {
        UnAuthorized: "请先登录坚果云账号"
      });
    }
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      let downloadParams = await that.getRequestDownloadParams();
      if (!downloadParams) {
        return;
      }
      if (downloadParams["isdir"]) {
        let Qmsg_loading = Qmsg.loading("正在遍历多文件信息...");
        let folderInfo = await that.getFolderInfo(downloadParams["hash"]);
        if (!folderInfo) {
          Qmsg_loading.close();
          return;
        }
        let newFolderInfoList = that.parseMoreFile(
          folderInfo,
          downloadParams["hash"],
          downloadParams["name"]
        );
        Qmsg_loading.close();
        NetDiskUI.staticView.moreFile("坚果云文件解析", newFolderInfoList);
      } else {
        let fileSize = utils.formatByteToSize(downloadParams["size"]);
        let downloadUrl = await that.getFileLink(
          downloadParams.hash,
          downloadParams.name
        );
        if (!downloadUrl) {
          return;
        }
        if (NetDiskFilterScheme.isForwardDownloadLink("jianguoyun")) {
          downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
            "jianguoyun",
            downloadUrl
          );
        }
        log.info(downloadUrl);
        NetDiskUI.staticView.oneFile({
          title: "坚果云盘单文件直链",
          fileName: downloadParams["name"],
          fileSize,
          downloadUrl
        });
      }
    }
    /**
     * 解析多文件信息
     * @param {{
     * mtime: number,
     * relPath: string,
     * size: number,
     * tblUri: ?string,
     * type: "file"|string,
     * }[]} folderInfo
     * @param {string} hash 文件hash值
     * @param {string} fileName 文件名
     * @returns {{
     * fileName: string,
     * fileSize: string|number,
     * fileType: ?string,
     * createTime: ?string,
     * latestTime: ?string,
     * isFolder: boolean,
     * index: ?number,
     * clickCallBack: ?(event:Event,_config_: object)=>{}
     * }[]}
     */
    parseMoreFile(folderInfo, hash = "", fileName = "") {
      const that = this;
      log.info(["解析多文件信息", folderInfo]);
      let folderInfoList = [];
      folderInfo.forEach((item) => {
        let fileName2 = item.relPath;
        if (fileName2.startsWith("/")) {
          fileName2 = fileName2.replace(/^\//, "");
        }
        folderInfoList.push({
          fileName: fileName2,
          fileSize: item["size"],
          fileType: "",
          createTime: item.mtime,
          latestTime: item.mtime,
          isFolder: false,
          index: 0,
          async clickEvent() {
            Qmsg.info("正在获取下载链接...");
            let downloadUrl = await that.getDirLink(
              hash,
              fileName2,
              item["relPath"]
            );
            if (!downloadUrl) {
              return;
            }
            Qmsg.success("获取成功！");
            if (NetDiskFilterScheme.isForwardDownloadLink("jianguoyun")) {
              downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                "jianguoyun",
                downloadUrl
              );
            }
            log.info(downloadUrl);
            return {
              autoDownload: true,
              mode: "aBlank",
              url: downloadUrl
            };
          }
        });
      });
      return folderInfoList;
    }
    /**
     * 获取下载链接所需要的hash值和name
     */
    async getRequestDownloadParams() {
      const that = this;
      log.info("获取hash值");
      Qmsg.info("正在获取请求信息");
      let pageInfoRegexp = /var[\s]*PageInfo[\s]*=[\s]*{([\s\S]+)};/i;
      let formData = new FormData();
      formData.append("pd", that.accessCode);
      let requestDetails = {
        url: `https://www.jianguoyun.com/p/${that.shareCode}`,
        data: that.accessCode === "" ? void 0 : `pd=${that.accessCode}`,
        responseType: "html",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": utils.getRandomPCUA(),
          Referer: `https://www.jianguoyun.com/p/${that.shareCode}`
        }
      };
      let requestResp = void 0;
      if (that.accessCode === "") {
        requestResp = await httpx.get(requestDetails);
      } else {
        requestResp = await httpx.post(requestDetails);
      }
      if (!requestResp.status) {
        return;
      }
      let respData = requestResp.data;
      log.info("请求信息");
      log.info(respData);
      let pageInfoMatch = respData.responseText.match(pageInfoRegexp);
      if (pageInfoMatch) {
        let pageInfo = pageInfoMatch[pageInfoMatch.length - 1];
        pageInfo = `({${pageInfo}})`;
        pageInfo = window.eval(pageInfo);
        log.info(pageInfo);
        let fileName = pageInfo["name"];
        let fileSize = pageInfo["size"];
        let fileHash = pageInfo["hash"];
        let fileNeedsPassword = pageInfo["needsPassword"];
        let fileOwner = pageInfo["owner"];
        let isdir = pageInfo["isdir"];
        let fileErrorCode = pageInfo["errorCode"];
        fileName = decodeURIComponent(fileName);
        log.success("是否是文件夹 ===> " + isdir);
        log.success("hash ===> " + fileHash);
        log.success("name ===> " + fileName);
        log.success("size ===> " + fileSize);
        if (fileNeedsPassword && (that.accessCode == void 0 || that.accessCode === "")) {
          Qmsg.error("密码不正确!");
          NetDiskUI.newAccessCodeView(
            "密码缺失",
            "jianguoyun",
            that.netDiskIndex,
            that.shareCode,
            that.accessCode,
            (userInputAccessCode) => {
              that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
            }
          );
          return;
        }
        if (fileErrorCode === "AuthenticationFailed") {
          Qmsg.error("密码错误");
          NetDiskUI.newAccessCodeView(
            void 0,
            "jianguoyun",
            that.netDiskIndex,
            that.shareCode,
            that.accessCode,
            (userInputAccessCode) => {
              that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
            }
          );
          return;
        }
        if (fileHash === "" || fileHash == void 0) {
          log.error("hash为空，可能文件被撤销分享了");
          Qmsg.error(`文件分享已被撤销`);
          return;
        }
        if (fileSize == void 0 && isdir == false) {
          log.error("无size，可能文件被删除了");
          Qmsg.error(`“${fileName}”文件已被拥有者（“${fileOwner}”）删除`);
          return;
        } else {
          return {
            name: fileName,
            hash: fileHash,
            size: fileSize,
            needsPassword: fileNeedsPassword,
            owner: fileOwner,
            isdir
          };
        }
      } else if (respData.responseText.match("对不起，找不到您指定的文件。")) {
        log.error("啊噢！ (404) 对不起，找不到您指定的文件。");
        Qmsg.error("坚果云: 对不起，找不到您指定的文件。");
      } else if (respData.responseText.match("对不起，您的某些输入不正确。")) {
        log.error("可能该链接不需要访问码或者访问码有问题");
        NetDiskUI.newAccessCodeView(
          void 0,
          "jianguoyun",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode,
          (userInputAccessCode) => {
            that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
          }
        );
      } else {
        log.error("获取PageInfo失败");
        Qmsg.error("坚果云: 获取PageInfo失败");
      }
    }
    /**
     * 获取下载链接
     * @param {string} fileHash 文件hash值
     * @param {string} fileName 文件名
     * @returns {Promise}
     */
    async getFileLink(fileHash = "", fileName = "") {
      var _a2;
      const that = this;
      fileName = encodeURIComponent(fileName);
      let getResp = await httpx.get({
        url: `https://www.jianguoyun.com/d/ajax/fileops/pubFileLink?k=${fileHash}&name=${fileName}&wm=false${that.accessCode === "" ? "" : "&pd=" + that.accessCode}&forwin=1&_=${(/* @__PURE__ */ new Date()).getTime()}`,
        responseType: "json",
        headers: {
          "User-Agent": utils.getRandomPCUA()
        },
        allowInterceptConfig: false,
        onerror: function() {
        }
      });
      if (!getResp.status) {
        if (utils.isNotNull((_a2 = getResp.data) == null ? void 0 : _a2.responseText)) {
          let errorData = utils.toJSON(getResp.data.responseText);
          log.error(["坚果云", errorData]);
          if (errorData["errorCode"] === "UnAuthorized") {
            that.gotoLogin();
          } else {
            Qmsg.error(errorData["detailMsg"]);
          }
        } else {
          Qmsg.error("请求异常");
        }
        return;
      }
      let respData = getResp.data;
      log.info(["请求信息", respData]);
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(["解析JSON", resultJSON]);
      if (resultJSON.hasOwnProperty("errorCode")) {
        Qmsg.error("坚果云: " + resultJSON["detailMsg"]);
        return;
      } else if (resultJSON.hasOwnProperty("url")) {
        return resultJSON["url"];
      } else {
        Qmsg.error("坚果云: 处理下载链接异常");
      }
    }
    /**
     * 获取文件夹下的文件下载链接
     * @param {string} fileHash
     * @param {string} fileName
     * @param {string} filePath
     * @returns {Promise}
     */
    async getDirLink(fileHash = "", fileName = "", filePath = "/") {
      var _a2;
      const that = this;
      fileName = encodeURIComponent(fileName);
      let getResp = await httpx.get({
        url: `https://www.jianguoyun.com/d/ajax/dirops/pubDIRLink?k=${fileHash}&dn=${fileName}&p=${filePath}&forwin=1&_=${(/* @__PURE__ */ new Date()).getTime()}`,
        responseType: "json",
        headers: {
          "User-Agent": utils.getRandomPCUA()
        },
        allowInterceptConfig: false,
        onerror: function() {
        }
      });
      if (!getResp.status) {
        if (utils.isNotNull((_a2 = getResp.data) == null ? void 0 : _a2.responseText)) {
          let errorData = utils.toJSON(getResp.data.responseText);
          log.error(["坚果云", errorData]);
          if (errorData["errorCode"] === "UnAuthorized") {
            that.gotoLogin();
          } else {
            Qmsg.error(errorData["detailMsg"]);
          }
        } else {
          Qmsg.error("请求异常");
        }
        return;
      }
      let respData = getResp.data;
      log.info(["请求信息", respData]);
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(resultJSON);
      if (resultJSON.hasOwnProperty("errorCode")) {
        Qmsg.error("坚果云: " + resultJSON["detailMsg"]);
        return;
      } else if (resultJSON.hasOwnProperty("url")) {
        return resultJSON["url"];
      } else {
        Qmsg.error("坚果云: 处理下载链接异常");
      }
    }
    /**
     * 获取文件夹信息
     * @param {string} hash
     * @returns
     */
    async getFolderInfo(hash = "") {
      let getResp = await httpx.get({
        url: `https://www.jianguoyun.com/d/ajax/dirops/pubDIRBrowse?hash=${hash}&relPath=%2F&_=${(/* @__PURE__ */ new Date()).getTime()}`,
        responseType: "json",
        headers: {
          "User-Agent": utils.getRandomPCUA()
        }
      });
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      log.info(["请求信息", respData]);
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(resultJSON);
      if ("objects" in resultJSON) {
        return resultJSON["objects"];
      } else {
        Qmsg.error("坚果云: 处理多文件信息异常");
      }
    }
    /**
     * 前往登录
     */
    gotoLogin() {
      NetDiskPops.confirm(
        {
          title: {
            text: "提示",
            position: "center"
          },
          content: {
            text: `解析失败，原因：当前尚未登录坚果云，是否前往登录？`
          },
          btn: {
            reverse: true,
            position: "end",
            ok: {
              text: "前往",
              callback: function(_event_) {
                window.open(
                  "https://www.jianguoyun.com/d/login#from=https%3A%2F%2Fwww.jianguoyun.com%2F",
                  "_blank"
                );
              }
            }
          }
        },
        NetDiskUI.popsStyle.jianGuoYunLoginTip
      );
    }
  }
  class NetDiskParse_nainiu extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      __publicField(this, "panelList", []);
      __publicField(this, "panelContent", "");
      __publicField(this, "OK_CODE", "0000");
    }
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      that.panelList = [];
      that.panelContent = "";
      let checkLinkValidityInfo = await that.checkLinkValidity(
        that.shareCode,
        that.accessCode
      );
      if (!checkLinkValidityInfo) {
        return;
      }
      if (checkLinkValidityInfo.isFolder) {
        Qmsg.info("正在递归文件");
        let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
        let firstFolderInfo = await that.getShareFolder(
          checkLinkValidityInfo["data"]["guid"]
        );
        if (!firstFolderInfo) {
          QmsgLoading.close();
          return;
        }
        let firstFileInfo = await that.getShareFiles(
          checkLinkValidityInfo["data"]["guid"]
        );
        if (!firstFileInfo) {
          QmsgLoading.close();
          return;
        }
        let folderInfoList = that.getFolderInfo(
          checkLinkValidityInfo["data"]["guid"],
          firstFolderInfo,
          firstFileInfo,
          0
        );
        QmsgLoading.close();
        log.info("递归完毕");
        NetDiskUI.staticView.moreFile("奶牛快传文件解析", folderInfoList);
      } else {
        let downloadUrl = void 0;
        if (checkLinkValidityInfo["zipDownload"]) {
          downloadUrl = await that.getZipFileDownloadUrl(
            that.shareCode,
            checkLinkValidityInfo["guid"],
            checkLinkValidityInfo["fileName"]
          );
        } else {
          downloadUrl = await that.getDownloadUrl(
            that.shareCode,
            checkLinkValidityInfo["guid"],
            checkLinkValidityInfo["id"]
          );
        }
        if (!downloadUrl) {
          return;
        }
        if (NetDiskFilterScheme.isForwardDownloadLink("nainiu")) {
          downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
            "nainiu",
            downloadUrl
          );
        }
        NetDiskUI.staticView.oneFile({
          title: "奶牛快传单文件直链",
          fileName: checkLinkValidityInfo["fileName"],
          fileType: checkLinkValidityInfo["fileType"],
          fileSize: checkLinkValidityInfo["fileSize"],
          downloadUrl,
          fileUploadTime: checkLinkValidityInfo["fileUploadTime"],
          fileLatestTime: checkLinkValidityInfo["fileLatestTime"],
          clickCallBack: (_fileDetails_) => {
            that.downloadFile(checkLinkValidityInfo["fileName"], downloadUrl);
          }
        });
      }
    }
    /**
     * 校验链接有效性并解析获取信息
     * @param {string} shareCode
     * @param {string} accessCode
     * @param {boolean|object}
     */
    async checkLinkValidity(shareCode, accessCode) {
      const that = this;
      let resultJSON = await that.getShareByUniqueUrl(shareCode);
      if (!resultJSON) {
        return false;
      }
      let code = resultJSON["code"];
      let message = resultJSON["message"];
      if (code !== that.OK_CODE) {
        Qmsg.error(message);
        return false;
      } else {
        let needPassword = resultJSON["data"]["needPassword"];
        let zipDownload = resultJSON["data"]["zipDownload"];
        if (needPassword && utils.isNull(accessCode)) {
          Qmsg.error("密码缺失!");
          NetDiskUI.newAccessCodeView(
            "密码缺失",
            "nainiu",
            that.netDiskIndex,
            that.shareCode,
            that.accessCode,
            (userInputAccessCode) => {
              that.init(that.netDiskIndex, that.shareCode, userInputAccessCode);
            }
          );
          return false;
        } else if (zipDownload) {
          Qmsg.success("该链接为zip单文件");
          return {
            zipDownload,
            guid: resultJSON["data"]["guid"],
            fileSize: utils.formatByteToSize(
              resultJSON["data"]["firstFolder"]["size"]
            ),
            fileName: resultJSON["data"]["firstFolder"]["title"],
            fileUploadTime: utils.formatTime(
              resultJSON["data"]["firstFolder"]["created_at"]
            ),
            fileLatestTime: utils.formatTime(
              resultJSON["data"]["firstFolder"]["updated_at"]
            )
          };
        } else if (resultJSON["data"]["firstFile"] == void 0) {
          Qmsg.success("该链接为文件夹类型");
          return {
            isFolder: true,
            guid: resultJSON["data"]["guid"],
            firstFolder: resultJSON["data"]["firstFolder"],
            data: resultJSON["data"]
          };
        }
        return {
          zipDownload,
          guid: resultJSON["data"]["guid"],
          id: resultJSON["data"]["firstFile"]["id"],
          fileSize: utils.formatByteToSize(
            resultJSON["data"]["firstFile"]["file_info"]["size"]
          ),
          fileName: resultJSON["data"]["firstFile"]["file_info"]["title"],
          fileType: resultJSON["data"]["firstFile"]["file_info"]["format"],
          fileUploadTime: utils.formatTime(
            resultJSON["data"]["firstFile"]["created_at"]
          ),
          fileLatestTime: utils.formatTime(
            resultJSON["data"]["firstFile"]["updated_at"]
          )
        };
      }
    }
    /**
     * 获取直链弹窗的文件夹信息
     * @returns
     */
    getFolderInfo(transferGuid, shareFolderInfoList, shareFileInfoList, index = 0) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      shareFolderInfoList.forEach((folderInfo) => {
        folderInfoList.push({
          fileName: folderInfo["title"],
          fileSize: 0,
          fileType: "",
          createTime: folderInfo["created_at"],
          latestTime: folderInfo["updated_at"],
          isFolder: true,
          index,
          async clickEvent() {
            if (!folderInfo["child_folder_count"] && !folderInfo["content_count"]) {
              return [];
            }
            let childFolderInfo = await that.getShareFolder(
              transferGuid,
              folderInfo["id"]
            );
            if (!childFolderInfo) {
              return [];
            }
            let childFileInfo = await that.getShareFiles(
              transferGuid,
              folderInfo["id"]
            );
            if (!childFileInfo) {
              return [];
            }
            let folderInfoList2 = that.getFolderInfo(
              transferGuid,
              childFolderInfo,
              childFileInfo,
              index + 1
            );
            return folderInfoList2;
          }
        });
      });
      shareFileInfoList.forEach((fileInfo) => {
        let fileName = fileInfo["file_info"]["title"];
        let fileType = fileInfo["file_info"]["format"] ?? "";
        if (Boolean(fileType)) {
          fileName = fileName + "." + fileType;
        }
        folderInfoList.push({
          fileName,
          fileSize: fileInfo["file_info"]["size"],
          fileType,
          createTime: fileInfo["created_at"],
          latestTime: fileInfo["updated_at"],
          isFolder: false,
          index,
          async clickEvent() {
            let downloadUrl = await that.getDownloadUrl(
              that.shareCode,
              transferGuid,
              fileInfo["id"]
            );
            if (!downloadUrl) {
              return;
            }
            if (NetDiskFilterScheme.isForwardDownloadLink("nainiu")) {
              downloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                "nainiu",
                downloadUrl
              );
            }
            that.downloadFile(fileName, downloadUrl);
          }
        });
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      log.info(["getFolderInfo", folderInfoList]);
      return folderInfoList;
    }
    /**
     * 文件解析
     * @param {string} shareCode
     * @param {string} accessCode
     */
    async parseMoreFile(shareCode, accessCode) {
    }
    /**
     * 获取文件夹信息
     * @param {string} transferGuid
     * @param {number} folderId
     * @param {number} page
     * @param {number} size
     * @returns {Promise<?object[]>}
     */
    async getShareFolder(transferGuid, folderId = "", page = 0, size = 100) {
      const that = this;
      let getResp = await httpx.get(
        `https://cowtransfer.com/core/api/transfer/share/folders?transferGuid=${transferGuid}&folderId=${folderId}&page=${page}&size=${size}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": utils.getRandomPCUA(),
            Referer: "https://cowtransfer.com/"
          }
        }
      );
      log.success(getResp);
      if (!getResp.status) {
        return;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (data.code !== that.OK_CODE) {
        Qmsg.error(data["message"]);
        return;
      }
      let folders = data["data"]["folders"];
      if (!Array.isArray(folders)) {
        Qmsg.error("data.folders不是数组");
        return;
      }
      return folders;
    }
    /**
     * 获取文件信息
     * @param {string} transferGuid
     * @param {number} folderId
     * @param {number} page
     * @param {number} size
     * @param {boolean} subContent
     * @returns {Promise<?object[]>}
     */
    async getShareFiles(transferGuid, folderId = "", page = 0, size = 20, subContent = false) {
      const that = this;
      let getResp = await httpx.get(
        `https://cowtransfer.com/core/api/transfer/share/files?transferGuid=${transferGuid}&folderId=${folderId}&page=${page}&size=${size}&subContent=${subContent}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent": utils.getRandomPCUA(),
            Referer: "https://cowtransfer.com/"
          }
        }
      );
      log.success(getResp);
      if (!getResp.status) {
        return;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (data.code !== that.OK_CODE) {
        Qmsg.error(data["message"]);
        return;
      }
      let files = data["data"]["files"];
      if (!Array.isArray(files)) {
        Qmsg.error("data.files不是数组");
        return;
      }
      return files;
    }
    /**
     * 获取分享信息
     * @param {string} shareCode
     * @returns {?{
     * code: string,
     * message: string,
     * data: {zipDownload: boolean,
     * guid:string,
     * fileSize: string,
     * fileName: string,
     * fileUploadTime: number,
     * fileLatestTime: number,
     * } | {
     * zipDownload: boolean,
     * guid:string,
     * id: string,
     * fileSize: string,
     * fileType: string,
     * fileName: string,
     * fileUploadTime: number,
     * fileLatestTime: number,
     * }[]}
     */
    async getShareByUniqueUrl(shareCode) {
      let url = `https://cowtransfer.com/core/api/transfer/share?uniqueUrl=${shareCode}`;
      let getResp = await httpx.get({
        url,
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Referer: "https://cowtransfer.com/s/" + shareCode
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(["转换的JSON", resultJSON]);
      return resultJSON;
    }
    /**
     * 获取下载链接
     * @param {string} shareCode
     * @param {string} guid
     * @param {string} id
     * @returns {?string}
     */
    async getDownloadUrl(shareCode, guid = "", id = "") {
      const that = this;
      let url = `https://cowtransfer.com/core/api/transfer/share/download?transferGuid=${guid}&fileId=${id}`;
      let getResp = await httpx.get({
        url,
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Referer: "https://cowtransfer.com/s/" + shareCode
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(["转换的JSON", resultJSON]);
      if (resultJSON["code"] === that.OK_CODE) {
        return resultJSON["data"]["downloadUrl"];
      } else {
        Qmsg.error(`奶牛快传-获取直链：${resultJSON["message"]}`);
        return;
      }
    }
    /**
     * 获取zip文件的下载链接
     * @param {string} shareCode
     * @param {string} guid
     * @param {string} title 标题
     * @returns {?string}
     */
    async getZipFileDownloadUrl(shareCode, guid = "", title = "") {
      const that = this;
      let url = `https://cowtransfer.com/core/api/transfer/share/download?transferGuid=${guid}&title=${title}`;
      let getResp = await httpx.get({
        url,
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Referer: "https://cowtransfer.com/s/" + shareCode
        }
      });
      log.info(getResp);
      if (!getResp.status) {
        return;
      }
      let respData = getResp.data;
      let resultJSON = utils.toJSON(respData.responseText);
      log.info(["转换的JSON", resultJSON]);
      if (resultJSON["code"] === that.OK_CODE) {
        return resultJSON["data"]["downloadUrl"];
      } else {
        Qmsg.error(`奶牛快传-获取直链：${resultJSON["message"]}`);
        return;
      }
    }
    /**
     * 下载文件
     * @param {string} fileName 文件名
     * @param {string} fileDownloadUrl 下载地址
     */
    async downloadFile(fileName, fileDownloadUrl) {
      const that = this;
      log.info(["下载文件：", fileName, fileDownloadUrl]);
      Qmsg.info(`调用【GM_download】下载：${fileName}`);
      if (typeof _GM_download === "undefined") {
        Qmsg.error("当前脚本环境缺失API 【GM_download】");
        return;
      }
      let abortDownload = void 0;
      let downloadingQmsg = Qmsg.loading("下载中...", {
        showClose: true,
        onClose() {
          if (typeof abortDownload === "function") {
            abortDownload();
          }
        }
      });
      let isDownloadEnd = false;
      let GM_download_Result = _GM_download({
        url: fileDownloadUrl,
        name: fileName,
        headers: {
          Referer: "https://cowtransfer.com/s/" + that.shareCode
        },
        onload() {
          downloadingQmsg.close();
          Qmsg.success(`下载 ${fileName} 已完成`);
        },
        onprogress(details) {
          if (typeof details === "object" && "loaded" in details && "total" in details && !isDownloadEnd) {
            let progressNum = details.loaded / details.total;
            let formatProgressNum = (progressNum * 100).toFixed(2);
            downloadingQmsg.setText(`下载中...${formatProgressNum}%`);
            if (details.loaded === details.total) {
              isDownloadEnd = true;
            }
          }
        },
        onerror(error) {
          downloadingQmsg.close();
          log.error(["下载失败error👉", error]);
          if (typeof error === "object" && error["error"]) {
            Qmsg.error(`下载 ${fileName} 失败或已取消 原因：${error["error"]}`, {
              timeout: 6e3
            });
          } else {
            Qmsg.error(`下载 ${fileName} 失败或已取消`);
          }
        },
        ontimeout() {
          downloadingQmsg.close();
          Qmsg.error(`下载 ${fileName} 请求超时`);
        }
      });
      if (typeof GM_download_Result === "object" && "abort" in GM_download_Result) {
        abortDownload = GM_download_Result["abort"];
      }
    }
  }
  class NetDiskParse_UC extends NetDiskParseObject {
    /**
     * 入口
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode
     * @param {string} accessCode
     * @returns
     */
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      Qmsg.info("检查是否已登录UC网盘");
      let loginStatus = await that.isLogin();
      if (!Boolean(loginStatus)) {
        that.gotoLogin(
          "检测到尚未登录UC网盘，是否前去登录？<br />&nbsp;&nbsp;&nbsp;&nbsp;(注意,需要当前浏览器的UA切换成PC才有登录选项)"
        );
        return;
      }
      let stoken = await that.getStoken(that.shareCode, that.accessCode);
      if (!stoken) {
        return;
      }
      let detail = await that.getDetail(that.shareCode, that.accessCode, stoken);
      if (!detail) {
        Qmsg.error("UC网盘：获取detail失败");
        return;
      }
      if (detail.length === 1 && detail[0].dir == false && detail[0].file_type === 1) {
        let oneFileDetail = detail[0];
        let oneFileDownloadDetail = await that.getDownload(
          that.shareCode,
          stoken,
          oneFileDetail.fid,
          oneFileDetail.share_fid_token
        );
        if (!oneFileDownloadDetail) {
          return;
        }
        if (!oneFileDownloadDetail[0].download_url) {
          Qmsg.error("获取download_url失败");
          return;
        }
        NetDiskUI.staticView.oneFile({
          title: "UC网盘单文件直链",
          fileName: oneFileDownloadDetail[0].file_name,
          fileSize: utils.formatByteToSize(oneFileDownloadDetail[0].size),
          downloadUrl: oneFileDownloadDetail[0].download_url,
          fileUploadTime: utils.formatTime(oneFileDownloadDetail[0].created_at),
          fileLatestTime: utils.formatTime(
            oneFileDownloadDetail[0].last_update_at
          ),
          clickCallBack() {
            that.downloadFile(
              oneFileDownloadDetail[0].file_name,
              oneFileDownloadDetail[0].download_url
            );
          }
        });
      } else {
        Qmsg.info("正在递归文件");
        let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
        let folderInfoList = that.getFolderInfo(detail, stoken, 0);
        QmsgLoading.close();
        log.info("递归完毕");
        NetDiskUI.staticView.moreFile("UC网盘文件解析", folderInfoList);
        return;
      }
    }
    /**
     * 判断是否已登录UC网盘
     * @returns {Promise<?(string|boolean)>}
     */
    async isLogin() {
      let getResp = await httpx.get("https://drive.uc.cn/", {
        headers: {
          "User-Agent": utils.getRandomPCUA()
        }
      });
      log.success(["判断是否已登录UC网盘", getResp]);
      if (!getResp.status) {
        return;
      }
      if (getResp.data.finalUrl === "https://drive.uc.cn/list") {
        return "已登录";
      } else {
        return false;
      }
    }
    /**
     * 下载文件
     * @param {string} fileName 文件名
     * @param {string} downloadUrl 下载链接
     * @return { {
     * abort: Function
     * } }
     */
    downloadFile(fileName, downloadUrl) {
      log.info([`调用【GM_download】下载：`, arguments]);
      Qmsg.info(`调用【GM_download】下载：${fileName}`);
      if (typeof _GM_download === "undefined") {
        Qmsg.error("当前脚本环境缺失API 【GM_download】");
        return;
      }
      let downloadingQmsg = Qmsg.loading("下载中...");
      let isDownloadEnd = false;
      return _GM_download({
        url: downloadUrl,
        name: fileName,
        headers: {
          Referer: "https://drive.uc.cn/"
        },
        onload() {
          downloadingQmsg.close();
          Qmsg.success(`下载 ${fileName} 已完成`);
        },
        onprogress(details) {
          if (typeof details === "object" && "loaded" in details && "total" in details && !isDownloadEnd) {
            let progressNum = details.loaded / details.total;
            let formatProgressNum = (progressNum * 100).toFixed(2);
            downloadingQmsg.setText(`下载中...${formatProgressNum}%`);
            if (details.loaded === details.total) {
              isDownloadEnd = true;
            }
          }
        },
        onerror(error) {
          downloadingQmsg.close();
          log.error(["下载失败error👉", error]);
          if (typeof error === "object" && error["error"]) {
            Qmsg.error(`下载 ${fileName} 失败或已取消 原因：${error["error"]}`, {
              timeout: 6e3
            });
          } else {
            Qmsg.error(`下载 ${fileName} 失败或已取消`);
          }
        },
        ontimeout() {
          downloadingQmsg.close();
          Qmsg.error(`下载 ${fileName} 请求超时`);
        }
      });
    }
    /**
     * 前往登录
     * @param {string} text 弹窗的显示的内容
     */
    gotoLogin(text = "") {
      NetDiskPops.confirm(
        {
          title: {
            position: "center",
            text: "UC网盘"
          },
          content: {
            text,
            html: false
          },
          btn: {
            reverse: true,
            position: "end",
            ok: {
              text: "前往",
              enable: true,
              callback() {
                window.open("https://drive.uc.cn", "_blank");
              }
            }
          }
        },
        NetDiskUI.popsStyle.tianYiYunLoginTip
      );
    }
    /**
     * 获取stoken
     * @param {string} pwd_id 分享码
     * @param {string} passcode 访问码
     * @returns {Promise<?string>}
     */
    async getStoken(pwd_id, passcode) {
      let postResp = await httpx.post(
        "https://pc-api.uc.cn/1/clouddrive/share/sharepage/token?entry=ft&fr=pc&pr=UCBrowser",
        {
          data: JSON.stringify({
            share_for_transfer: true,
            passcode,
            pwd_id
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=UTF-8",
            "User-Agent": utils.getRandomPCUA(),
            Origin: "https://drive.uc.cn",
            Referer: "https://drive.uc.cn/"
          },
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      if (!postResp.status) {
        let errorData = utils.toJSON(postResp.data.responseText);
        log.error(["获取stoken失败JSON信息", errorData]);
        if ("message" in errorData) {
          Qmsg.error(errorData["message"]);
        } else {
          Qmsg.error("请求异常，获取stoken失败");
        }
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.info(["获取stoken：", data]);
      if (data["code"] !== 0) {
        log.error(["获取stoken失败", data]);
        Qmsg.error("获取stoken失败");
        return;
      }
      return data["data"]["stoken"];
    }
    /**
     * 获取stoken
     * @param {string} pwd_id 分享码
     * @param {string} passcode 访问码
     * @param {string} stoken 获取的stoken
     * @param {string} [pdir_fid=0] 父fid，默认为0，如果为文件夹，那么它的fid就是这个值
     * @param {number} [force=0]
     * @param {number} [_page=1]
     * @param {number} [_size=50]
     * @param {number} [_fetch_banner=0]
     * @param {number} [_fetch_share=0]
     * @param {number} [_fetch_total=1]
     */
    async getDetail(pwd_id, passcode, stoken, pdir_fid = 0, force = 0, _page = 1, _size = 50, _fetch_banner = 0, _fetch_share = 0, _fetch_total = 1) {
      let getResp = await httpx.get(
        `https://pc-api.uc.cn/1/clouddrive/transfer_share/detail?pr=UCBrowser&fr=h5&pwd_id=${pwd_id}&__t=${(/* @__PURE__ */ new Date()).getTime()}&passcode=${passcode}&stoken=${encodeURIComponent(
        stoken
      )}&pdir_fid=${pdir_fid}&force=${force}&_page=${_page}&_size=${_size}&_fetch_banner=${_fetch_banner}&_fetch_share=${_fetch_share}&_fetch_total=${_fetch_total}&_sort=${encodeURIComponent(
        "file_type:asc,file_name:asc"
      )}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent": utils.getRandomPCUA(),
            Origin: "https://drive.uc.cn",
            Referer: "https://drive.uc.cn/"
          }
        }
      );
      if (!getResp.status) {
        return;
      }
      let data = utils.toJSON(getResp.data.responseText);
      log.info(["获取detail：", data]);
      if (data["code"] !== 0) {
        log.error(["获取detail失败", data]);
        Qmsg.error("获取detail失败");
        return;
      }
      let metadata = data["metadata"];
      if (metadata && metadata["_total"] && metadata["_total"] > metadata["_size"]) {
        return await this.getDetail(
          pwd_id,
          passcode,
          stoken,
          pdir_fid,
          force,
          _page,
          metadata["_total"],
          _fetch_banner,
          _fetch_share,
          _fetch_total
        );
      }
      return data["data"]["list"];
    }
    /**
     * 获取下载信息
     * @param {string} pwd_id 分享码
     * @param {string} stoken 获取的stoken
     * @param {string} fids 通过获取到的detail获取到的fid
     * @param {string} share_fid_token 通过获取到的detail获取到的share_fid_token
     * @returns {Promise< ?{
     * backup_sign: number,
     * backup_source: boolean,
     * ban: boolean,
     * big_thumbnail: string,
     * category: number,
     * created_at: number,
     * creator_ucid_or_default: string,
     * cur_version_or_default: number,
     * dir: boolean,
     * download_url: string,
     * duration: number,
     * event_extra: {
     *    recent_created_at: number
     * },
     * extra: string,
     * fid: string,
     * file: boolean,
     * file_name: string,
     * file_name_hl_end: number,
     * file_name_hl_start: number,
     * file_source: string,
     * file_type: number,
     * format_type: string,
     * l_created_at: number,
     * l_updated_at: number,
     * last_update_at: number,
     * like: number,
     * md5: string,
     * name_space: number,
     * obj_category: string,
     * offline_source: boolean,
     * operated_at: number,
     * owner_drive_type_or_default: number,
     * owner_ucid: string,
     * pdir_fid: string,
     * preview_url: string,
     * range_size: number,
     * raw_name_space: number,
     * risk_type: number,
     * save_as_source: boolean,
     * share_fid_token: string,
     * size: number,
     * status: number,
     * thumbnail: string,
     * updated_at: number,
     * video_height: number,
     * video_max_resolution: string,
     * video_width: number,
     * _extra: {},
     * } []>}
     */
    async getDownload(pwd_id, stoken, fid, share_fid_token) {
      let postResp = await httpx.post(
        "https://pc-api.uc.cn/1/clouddrive/file/download?entry=ft&fr=pc&pr=UCBrowser",
        {
          data: JSON.stringify({
            fids: [fid],
            pwd_id,
            stoken,
            fids_token: [share_fid_token]
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json;charset=UTF-8",
            "User-Agent": utils.getRandomPCUA(),
            Origin: "https://drive.uc.cn",
            Referer: "https://drive.uc.cn/"
          }
        }
      );
      if (!postResp.status) {
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.info(["获取download：", data]);
      if (data["code"] !== 0) {
        log.error(["获取download失败", data]);
        Qmsg.error("获取download失败");
        return;
      }
      if (data["data"].length === 0) {
        log.error(["获取download detail失败", data]);
        Qmsg.error("获取download detail失败失败");
        return;
      }
      return data["data"];
    }
    /**
     * 获取文件夹信息
     * @param {{
     * backup_sign: number,
     * backup_source: boolean,
     * ban: boolean,
     * category: number,
     * created_at: number,
     * creator_ucid_or_default: string,
     * cur_version_or_default: number,
     * dir: boolean,
     * duration: number,
     * event_extra: {
     *    recent_created_at: number
     * },
     * extra: string,
     * fid: string,
     * file: boolean,
     * file_name: string,
     * file_name_hl_end: number,
     * file_name_hl_start: number,
     * file_source: string,
     * file_struct: {
     *    fir_source: string,
     *    platform_source: string,
     *    sec_source: string,
     *    thi_source: string,
     *    upload_dm: string,
     *    upload_mi: string,
     * },
     * file_type: number,
     * format_type: string,
     * include_items:  number,
     * l_created_at:  number,
     * l_updated_at:  number,
     * last_update_at:  number,
     * like:  number,
     * name_space:  number,
     * offline_source: boolean,
     * operated_at:  number,
     * owner_drive_type_or_default:  number,
     * owner_ucid: string,
     * pdir_fid: string,
     * raw_name_space:  number,
     * risk_type:  number,
     * save_as_source: boolean,
     * share_fid_token: string,
     * size:  number,
     * status:  number,
     * tags: string,
     * updated_at:  number,
     * _extra: {},
     * }[]} infoList
     * @return {Promise<{
     * fileName: string,
     * fileSize: string|number,
     * fileType: ?string,
     * createTime: ?string,
     * latestTime: ?string,
     * isFolder: boolean,
     * index: ?number,
     * clickCallBack: ?(event:Event,_config_: object)=>{}
     * }[]>}
     */
    getFolderInfo(infoList, stoken, index = 0) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      infoList.forEach((item) => {
        if (item.dir == false && item.file_type === 1) {
          tempFolderFileInfoList.push({
            fileName: item.file_name,
            fileSize: item.size,
            fileType: "",
            createTime: item.created_at,
            latestTime: item.updated_at,
            isFolder: false,
            index,
            async clickEvent() {
              let fileDownloadUrl = await that.getDownload(
                that.shareCode,
                stoken,
                item.fid,
                item.share_fid_token
              );
              if (fileDownloadUrl) {
                if (fileDownloadUrl.length) {
                  fileDownloadUrl = fileDownloadUrl[0].download_url;
                } else {
                  fileDownloadUrl = "";
                }
              } else {
                fileDownloadUrl = "";
              }
              if (item.ban) {
                Qmsg.error("文件已被禁止下载");
              } else {
                let schemeDownloadUrl = fileDownloadUrl;
                if (NetDiskFilterScheme.isForwardDownloadLink("uc")) {
                  schemeDownloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                    "uc",
                    schemeDownloadUrl
                  );
                }
                if (schemeDownloadUrl === fileDownloadUrl) {
                  that.downloadFile(item.file_name, fileDownloadUrl);
                } else {
                  return {
                    autoDownload: true,
                    mode: "aBlank",
                    url: fileDownloadUrl
                  };
                }
              }
            }
          });
        } else {
          tempFolderInfoList.push({
            fileName: item.file_name,
            fileSize: item.size,
            fileType: "",
            createTime: item.created_at,
            latestTime: item.updated_at,
            isFolder: true,
            index,
            async clickEvent() {
              if (item.include_items === 0) {
                log.success("里面没有文件");
                return [];
              }
              let newDetail = await that.getDetail(
                that.shareCode,
                that.accessCode,
                stoken,
                item.fid
              );
              if (newDetail) {
                return that.getFolderInfo(newDetail, stoken, index + 1);
              } else {
                return [];
              }
            }
          });
        }
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      log.info(["getFilesInfoByRec", folderInfoList]);
      return folderInfoList;
    }
  }
  class NetDiskParse_Aliyun extends NetDiskParseObject {
    constructor() {
      super(...arguments);
      __publicField(this, "X_Share_Token_Data", {
        expire_time: "2000-01-01T00:00:00.000Z",
        expires_in: 7200,
        share_token: ""
      });
      /**
       * header请求头 X-Device-Id
       */
      __publicField(this, "X_Device_Id", null);
      /**
       * header请求头 X-Canary
       */
      __publicField(this, "X_Canary", "client=web,app=share,version=v2.3.1");
    }
    /**
     * 入口
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode
     * @param {string} accessCode
     * @returns
     */
    async init(netDiskIndex, shareCode, accessCode) {
      const that = this;
      log.info([netDiskIndex, shareCode, accessCode]);
      that.netDiskIndex = netDiskIndex;
      that.shareCode = shareCode;
      that.accessCode = accessCode;
      that.X_Device_Id = that.get_X_Device_Id();
      log.info("生成X_Device_Id：" + that.X_Device_Id);
      if (globalThis.location.hostname !== "www.aliyundrive.com" && globalThis.location.hostname !== "www.alipan.com") {
        let url = NetDiskLinkClickModeUtils.getBlankUrl(
          "aliyun",
          that.netDiskIndex,
          that.shareCode,
          that.accessCode
        );
        let $QmsgErrorTip = Qmsg.error(
          `请在阿里云盘页面解析，<a href="${url}">点我前往</a>`,
          {
            html: true,
            timeout: 1e4
          }
        );
        domUtils.on(
          $QmsgErrorTip.$Qmsg.querySelector("a[href]"),
          "click",
          void 0,
          (event) => {
            utils.preventEvent(event);
            NetDiskLinkClickMode.openBlank(
              url,
              "aliyun",
              that.netDiskIndex,
              that.shareCode,
              that.accessCode
            );
          }
        );
        return;
      }
      let detail = await this.list_by_share(shareCode, "root");
      if (!detail) {
        return;
      }
      Qmsg.info("正在解析链接");
      let QmsgLoading = Qmsg.loading(`正在解析多文件中，请稍后...`);
      let folderInfoList = that.getFolderInfo(detail, 0);
      QmsgLoading.close();
      log.info("解析完毕");
      NetDiskUI.staticView.moreFile("阿里云盘文件解析", folderInfoList);
    }
    /**
     * 弹窗使用-获取文件夹信息
     * @param {{
     * category?: string,
     * domain_id?: string,
     * file_extension?: string,
     * mime_extension?: string,
     * mime_type?: string,
     * punish_flag: number,
     * created_at: string,
     * domain_id: string,
     * drive_id: string,
     * file_id: string,
     * name: string,
     * parent_file_id:string,
     * share_id: string,
     * type: string,
     * updated_at: string,
     * }[]} infoList
     * @return {Promise<{
     * fileName: string,
     * fileSize: string|number,
     * fileType: ?string,
     * createTime: ?string,
     * latestTime: ?string,
     * isFolder: boolean,
     * index: ?number,
     * clickCallBack: ?(event:Event,_config_: object)=>{}
     * }[]>}
     */
    getFolderInfo(infoList, index = 0) {
      const that = this;
      let folderInfoList = [];
      let tempFolderInfoList = [];
      let tempFolderFileInfoList = [];
      infoList.forEach((item) => {
        if (item.type !== "folder") {
          tempFolderFileInfoList.push({
            fileName: item.name,
            fileSize: item.size,
            fileType: item.file_extension,
            createTime: new Date(item.created_at).getTime(),
            latestTime: new Date(item.updated_at).getTime(),
            isFolder: false,
            index,
            async clickEvent() {
              let fileDownloadUrl = await that.get_share_link_download_url(
                item.share_id,
                item.file_id
              );
              if (!fileDownloadUrl) {
                return;
              }
              let schemeDownloadUrl = fileDownloadUrl;
              if (NetDiskFilterScheme.isForwardDownloadLink("aliyun")) {
                schemeDownloadUrl = NetDiskFilterScheme.parseDataToSchemeUri(
                  "aliyun",
                  schemeDownloadUrl
                );
              }
              return {
                autoDownload: true,
                mode: "aBlank",
                url: schemeDownloadUrl
              };
            }
          });
        } else {
          tempFolderInfoList.push({
            fileName: item.name,
            fileSize: 0,
            fileType: "",
            createTime: item.created_at,
            latestTime: item.updated_at,
            isFolder: true,
            index,
            async clickEvent() {
              let newDetail = await that.list_by_share(
                item.share_id,
                item.file_id
              );
              if (newDetail) {
                return that.getFolderInfo(newDetail, index + 1);
              } else {
                return [];
              }
            }
          });
        }
      });
      tempFolderInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      tempFolderFileInfoList.sort(
        (a, b) => a["fileName"].localeCompare(b["fileName"])
      );
      folderInfoList = folderInfoList.concat(tempFolderInfoList);
      folderInfoList = folderInfoList.concat(tempFolderFileInfoList);
      log.info(["getFilesInfoByRec", folderInfoList]);
      return folderInfoList;
    }
    /**
     * 列出文件列表
     * @param {string} share_id
     * @param {string} parent_file_id 父项，根是root
     * @param {"name"} order_by 根据xxx排序
     * @param {"ASC"|"DESC"} order_direction 排序规则(升序/降序)
     * @returns {Promise<{
     * category?: string,
     * domain_id?: string,
     * file_extension?: string,
     * mime_extension?: string,
     * mime_type?: string,
     * punish_flag: number,
     * created_at: string,
     * domain_id: string,
     * drive_id: string,
     * file_id: string,
     * name: string,
     * parent_file_id:string,
     * share_id: string,
     * type: string,
     * updated_at: string,
     * }[]>}
     */
    async list_by_share(share_id, parent_file_id, order_by = "name", order_direction = "DESC") {
      const that = this;
      let postResp = await httpx.post(
        "https://api.aliyundrive.com/adrive/v2/file/list_by_share",
        {
          data: JSON.stringify({
            share_id,
            parent_file_id,
            limit: 20,
            image_thumbnail_process: "image/resize,w_256/format,jpeg",
            image_url_process: "image/resize,w_1920/format,jpeg/interlace,1",
            video_thumbnail_process: "video/snapshot,t_1000,f_jpg,ar_auto,w_256",
            order_by,
            order_direction
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Origin: "https://www.aliyundrive.com",
            Referer: "https://www.aliyundrive.com/",
            "X-Canary": that.X_Canary,
            "X-Device-Id": that.X_Device_Id,
            "X-Share-Token": await that.get_X_Share_Token(
              that.shareCode,
              that.accessCode
            ),
            "User-Agent": utils.getRandomPCUA()
          },
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      if (!postResp.status) {
        that.handle_request_error(postResp);
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.info(["列出文件列表：", data]);
      return data["items"];
    }
    /**
     * 获取文件的下载链接
     * @returns {Promise<string>}
     */
    async get_share_link_download_url(share_id, file_id) {
      const that = this;
      let postResp = await httpx.post(
        "https://api.aliyundrive.com/v2/file/get_share_link_download_url",
        {
          data: JSON.stringify({
            expire_sec: 600,
            file_id,
            share_id
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            Origin: "https://www.aliyundrive.com",
            Referer: "https://www.aliyundrive.com/",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + that.getAuthorization(),
            "X-Share-Token": await that.get_X_Share_Token(
              that.shareCode,
              that.accessCode
            ),
            "User-Agent": utils.getRandomPCUA()
          },
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      if (!postResp.status) {
        that.handle_request_error(postResp);
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.info(["获取文件的下载链接：", data]);
      return data["download_url"];
    }
    /**
     * 处理请求的错误
     * @param {HttpxAsyncResult} postResp
     */
    handle_request_error(postResp) {
      log.error(postResp);
      let errData = utils.toJSON(postResp.data.responseText);
      Qmsg.error(errData["message"]);
    }
    /**
     * 获取用户鉴权值
     * 来源：localStorage => token.access_token
     */
    getAuthorization() {
      let token = _unsafeWindow.localStorage.getItem("token");
      if (utils.isNotNull(token) && token != null) {
        let tokenJSON = utils.toJSON(token);
        let access_token = tokenJSON["access_token"];
        log.success(["获取阿里云盘的access_token：", access_token]);
        return access_token;
      } else {
        log.error("获取access_token失败，请先登录账号！");
        Qmsg.error("获取access_token失败，请先登录账号！");
      }
    }
    /**
     * 获取header请求头 X-Share-Token
     * 来源：localStorage => shareToken.share_token
     */
    async get_X_Share_Token(share_id, share_pwd) {
      const that = this;
      if (/* @__PURE__ */ new Date() < new Date(that.X_Share_Token_Data.expire_time)) {
        return that.X_Share_Token_Data.share_token;
      }
      let postResp = await httpx.post(
        "https://api.aliyundrive.com/v2/share_link/get_share_token",
        {
          data: JSON.stringify({
            share_id,
            share_pwd
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Origin: "https://www.aliyundrive.com",
            Referer: "https://www.aliyundrive.com/",
            "X-Canary": that.X_Canary,
            "X-Device-Id": that.X_Device_Id,
            "User-Agent": utils.getRandomPCUA()
          },
          allowInterceptConfig: false,
          onerror() {
          }
        }
      );
      if (!postResp.status) {
        that.handle_request_error(postResp);
        return;
      }
      let data = utils.toJSON(postResp.data.responseText);
      that.X_Share_Token_Data = data;
      log.info(["获取share_token：", that.X_Share_Token_Data]);
      return that.X_Share_Token_Data["share_token"];
    }
    /**
     * 获取header请求头 X-Device-Id
     */
    get_X_Device_Id() {
      for (var alipan_device_id_pattern = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, alipan_s = [], alipan_l = 0; alipan_l < 256; ++alipan_l)
        alipan_s.push((alipan_l + 256).toString(16).substr(1));
      function alipan_o() {
        return crypto.getRandomValues(new Uint8Array(16));
      }
      var alipan_c = function(args_e) {
        var second_arg = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, devices_id_string = (alipan_s[args_e[second_arg + 0]] + alipan_s[args_e[second_arg + 1]] + alipan_s[args_e[second_arg + 2]] + alipan_s[args_e[second_arg + 3]] + "-" + alipan_s[args_e[second_arg + 4]] + alipan_s[args_e[second_arg + 5]] + "-" + alipan_s[args_e[second_arg + 6]] + alipan_s[args_e[second_arg + 7]] + "-" + alipan_s[args_e[second_arg + 8]] + alipan_s[args_e[second_arg + 9]] + "-" + alipan_s[args_e[second_arg + 10]] + alipan_s[args_e[second_arg + 11]] + alipan_s[args_e[second_arg + 12]] + alipan_s[args_e[second_arg + 13]] + alipan_s[args_e[second_arg + 14]] + alipan_s[args_e[second_arg + 15]]).toLowerCase();
        if (!function(e) {
          return "string" == typeof e && alipan_device_id_pattern.test(e);
        }(devices_id_string))
          throw TypeError("Stringified UUID is invalid");
        return devices_id_string;
      }, alipan_u = function(args_e, args_t, args_n) {
        var randomValue = (args_e = args_e || {}).random || (args_e.rng || alipan_o)();
        if (randomValue[6] = 15 & randomValue[6] | 64, randomValue[8] = 63 & randomValue[8] | 128, args_t) ;
        return alipan_c(randomValue);
      };
      return alipan_u();
    }
  }
  const NetDiskParse = {
    netDisk: {
      /**
       * 百度网盘
       */
      baidu: NetDiskParse_Baidu,
      /**
       * 蓝奏云
       */
      lanzou: NetDiskParse_Lanzou,
      /**
       * 蓝奏云优享
       */
      lanzouyx: NetDiskParse_Lanzouyx,
      /**
       * 天翼云
       * + 开发文档：https://id.dlife.cn/html/api_detail_696.html
       */
      tianyiyun: NetDiskParse_Tianyiyun,
      /**
       * 文叔叔
       */
      wenshushu: NetDiskParse_Wenshushu,
      /**
       * 123盘
       */
      _123pan: NetDiskParse_123pan,
      /**
       * 坚果云
       */
      jianguoyun: NetDiskParse_Jianguoyun,
      /**
       * 奶牛快传
       * 感谢：https://github.com/qaiu/netdisk-fast-download
       */
      nainiu: NetDiskParse_nainiu,
      /**
       * UC网盘
       */
      uc: NetDiskParse_UC,
      /**
       * 阿里云盘
       */
      aliyun: NetDiskParse_Aliyun
    }
  };
  const NetDiskLinkClickModeUtils = {
    /**
     * 判断是否是允许的点击动作
     * @param modeText 点击动作
     */
    isAllowMode(modeText) {
      let mode = [
        "copy",
        "openBlank"
      ];
      return mode.includes(modeText);
    },
    /**
     * 判断是否是允许的扩展点击动作
     * @param modeText 点击动作
     */
    isAllowExtendMode(modeText) {
      let extend_mode = ["parseFile"];
      return extend_mode.includes(modeText);
    },
    /**
     * 获取用于跳转的url
     * @param netDiskName
     * @param netDiskIndex
     * @param shareCode
     * @param accessCode
     */
    getBlankUrl(netDiskName, netDiskIndex, shareCode, accessCode) {
      let regularOption = NetDisk.regular[netDiskName][netDiskIndex];
      let blankUrl = regularOption.blank;
      if (shareCode) {
        blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, {
          shareCode
        });
      }
      if (accessCode && accessCode !== "") {
        blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, {
          accessCode
        });
      } else {
        blankUrl = blankUrl.replace(NetDisk.noAccessCodeRegExp, "");
      }
      let currentDict = NetDisk.linkDict.get(netDiskName).get(shareCode);
      if (regularOption.paramMatch) {
        let paramMatchArray = currentDict.matchText.match(
          regularOption.paramMatch
        );
        let replaceParamData = {};
        for (let index = 0; index < paramMatchArray.length; index++) {
          replaceParamData[`$${index}`] = paramMatchArray[index];
        }
        blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, replaceParamData);
      }
      return blankUrl;
    },
    /**
     * 获取用于复制到剪贴板的网盘信息
     * @param netDiskName
     * @param netDiskIndex
     * @param shareCode
     * @param accessCode
     */
    getCopyUrlInfo(netDiskName, netDiskIndex, shareCode, accessCode) {
      let regularOption = NetDisk.regular[netDiskName][netDiskIndex];
      let copyUrl = regularOption["copyUrl"];
      if (shareCode) {
        copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, {
          shareCode
        });
      }
      if (accessCode && accessCode !== "") {
        copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, {
          accessCode
        });
      } else {
        copyUrl = copyUrl.replace(NetDisk.noAccessCodeRegExp, "");
      }
      let currentDict = NetDisk.linkDict.get(netDiskName).get(shareCode);
      if (regularOption.paramMatch) {
        let paramMatchArray = currentDict.matchText.match(
          regularOption.paramMatch
        );
        let replaceParamData = {};
        for (let index = 0; index < paramMatchArray.length; index++) {
          replaceParamData[`$${index}`] = paramMatchArray[index];
        }
        copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, replaceParamData);
      }
      return copyUrl;
    },
    /**
     * 获取重定向后的直链
     * @param url
     * @param userAgent 用户代理字符串
     */
    async getRedirectFinalUrl(url, userAgent) {
      if (!NetDiskConfig.function.getTheDirectLinkAfterRedirection.value) {
        return url;
      }
      Qmsg.success("获取重定向后的直链");
      log.info("开始获取重定向后的直链");
      let headResp = await httpx.head({
        url,
        headers: {
          "User-Agent": userAgent,
          Referer: window.location.origin
        }
      });
      if (headResp.status) {
        return headResp.data.finalUrl;
      } else {
        return url;
      }
    }
  };
  const NetDiskLinkClickMode = {
    /**
     * 复制到剪贴板
     * @param netDiskName 网盘名
     * @param netDiskIndex 网盘索引
     * @param shareCode 分享码
     * @param accessCode 提取码
     * @param toastText 复制成功的提示的文字
     */
    copy(netDiskName, netDiskIndex, shareCode, accessCode, toastText = "已复制") {
      utils.setClip(
        NetDiskLinkClickModeUtils.getCopyUrlInfo(
          netDiskName,
          netDiskIndex,
          shareCode,
          accessCode
        )
      );
      Qmsg.success(toastText);
    },
    /**
     * 网盘链接解析
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode 分享码
     * @param accessCode 提取码
     */
    async parseFile(netDiskName, netDiskIndex, shareCode, accessCode) {
      Qmsg.info("正在获取直链");
      if (NetDiskParse.netDisk[netDiskName]) {
        let parseObj = new NetDiskParse.netDisk[netDiskName]();
        await parseObj.init(netDiskIndex, shareCode, accessCode);
      } else {
        log.error(`${netDiskName} 不存在解析`);
        Qmsg.error("该链接不存在解析功能");
      }
    },
    /**
     * 新标签页打开
     * @param url 跳转的网址
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘索引
     * @param shareCode 分享码
     * @param accessCode 提取码
     */
    openBlank(url, netDiskName, netDiskIndex, shareCode, accessCode) {
      var _a2;
      log.success(["新标签页打开", [...arguments]]);
      if (NetDiskAutoFillAccessCode.$data.enable) {
        NetDiskAutoFillAccessCode.setValue({
          url,
          netDiskName,
          netDiskIndex,
          shareCode,
          accessCode
        });
      }
      if (NetDiskFilterScheme.isForwardBlankLink(netDiskName)) {
        url = NetDiskFilterScheme.parseDataToSchemeUri(netDiskName, url);
      }
      (_a2 = document.querySelector("meta[name='referrer']")) == null ? void 0 : _a2.setAttribute("content", "no-referrer");
      if (utils.isNotNull(accessCode) && NetDiskLocalData.linkClickMode_openBlank.openBlankWithCopyAccessCode(
        netDiskName
      )) {
        utils.setClip(accessCode).then(() => {
          window.open(url, "_blank");
        });
      } else {
        window.open(url, "_blank");
      }
    },
    /**
     * 将链接转为Scheme格式并打开
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode
     * @param accessCode
     */
    openBlankWithScheme(netDiskName, netDiskIndex, shareCode, accessCode) {
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode
      );
      url = NetDiskFilterScheme.parseDataToSchemeUri(netDiskName, url);
      window.open(url, "_blank");
    }
  };
  const NetDiskCheckLinkValidity_baidu = {
    /**
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode 分享码
     * @param accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        "baidu",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let getResp = await httpx.get(url, {
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Host: "pan.baidu.com",
          Referer: url,
          Origin: "https://pan.baidu.com"
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      let responseText = getResp.data.responseText;
      if (!getResp.status) {
        if (utils.isNull(responseText)) {
          return NetDiskCheckLinkValidity.status.error;
        }
      }
      if (getResp.data.finalUrl.includes("404.html")) {
        return NetDiskCheckLinkValidity.status.error;
      }
      if (responseText.includes("过期时间：")) {
        return NetDiskCheckLinkValidity.status.success;
      } else if (responseText.includes("输入提取")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      } else if (responseText.includes("不存在") || responseText.includes("已失效")) {
        return NetDiskCheckLinkValidity.status.failed;
      } else {
        return NetDiskCheckLinkValidity.status.unknown;
      }
    }
  };
  const NetDiskCheckLinkValidity_lanzou = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        "lanzou",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let urlObj = new URL(url);
      let getResp = await httpx.get(url, {
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Host: urlObj.hostname,
          Origin: urlObj.origin,
          Referer: url
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      if (!getResp.status) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = getResp.data.responseText;
      if (utils.isNull(data)) {
        return NetDiskCheckLinkValidity.status.failed;
      } else if (data.includes("输入密码")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      } else if (data.includes("来晚啦") || data.includes("不存在")) {
        return NetDiskCheckLinkValidity.status.failed;
      } else {
        return NetDiskCheckLinkValidity.status.success;
      }
    }
  };
  const NetDiskCheckLinkValidity_lanzouyx = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let LanZouYX = new NetDiskParse.netDisk.lanzouyx();
      LanZouYX.uuid = LanZouYX.getEncodeUUID();
      LanZouYX.shareCodeId = LanZouYX.getDecodeShareCodeId(shareCode);
      let devType = 3;
      let devModel = "Chrome";
      let extra = 2;
      let timestamp = LanZouYX.getEncodeTimeStamp();
      let type = 0;
      let offset = 1;
      let limit = 60;
      let postResp = await httpx.post(
        `https://api.ilanzou.com/unproved/recommend/list?devType=${devType}&devModel=${devModel}&uuid=${LanZouYX.uuid}&extra=${extra}&timestamp=${timestamp}&shareId=${LanZouYX.shareCodeId}&type=${type}&offset=${offset}&limit=${limit}`,
        {
          headers: {
            Accept: "application/json, text/plain, */*",
            Origin: "https://www.ilanzou.com",
            Referer: "https://www.ilanzou.com/",
            "Sec-Fetch-Site": "same-site",
            Host: "api.ilanzou.com",
            "User-Agent": utils.getRandomPCUA()
          },
          responseType: "json",
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!postResp.status) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(postResp.data.responseText);
      log.success(["获取链接信息：", data]);
      if (data["code"] !== 200) {
        return NetDiskCheckLinkValidity.status.error;
      }
      if (!data["list"].length) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_tianyiyun = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let postResp = await httpx.post(
        "https://api.cloud.189.cn/open/share/getShareInfoByCodeV2.action",
        {
          data: `shareCode=${shareCode}`,
          headers: {
            Accept: "application/json;charset=UTF-8",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": utils.getRandomPCUA(),
            "Sign-Type": 1,
            Referer: "https://cloud.189.cn/web/share?code=" + shareCode,
            Origin: "https://cloud.189.cn"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      let responseText = postResp.data.responseText;
      if (!postResp.status && utils.isNull(responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      if (responseText.includes("ShareInfoNotFound") || responseText.includes("ShareNotFound") || responseText.includes("FileNotFound") || responseText.includes("ShareAuditWaiting") || responseText.includes("ShareExpiredError") || responseText.includes("ShareAuditNotPass")) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      if (responseText.includes("needAccessCode")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_hecaiyun = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let resp = await httpx.post(
        "https://caiyun.139.com/stapi/custom/outlink/brief",
        {
          data: "linkId=" + shareCode,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": utils.getRandomPCUA(),
            Host: "caiyun.139.com",
            Referer: NetDiskLinkClickModeUtils.getBlankUrl(
              "hecaiyun",
              netDiskIndex,
              shareCode,
              accessCode
            ),
            Origin: "https://caiyun.139.com"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!resp.status) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(resp.data.responseText);
      if (data.code == 0) {
        if (data.data.isPasswd === "1") {
          return NetDiskCheckLinkValidity.status.needAccessCode;
        } else {
          return NetDiskCheckLinkValidity.status.success;
        }
      } else {
        return NetDiskCheckLinkValidity.status.failed;
      }
    }
  };
  const NetDiskCheckLinkValidity_aliyun = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      var _a2;
      let postResp = await httpx.post(
        "https://api.aliyundrive.com/adrive/v3/share_link/get_share_by_anonymous?share_id=" + shareCode,
        {
          data: JSON.stringify({
            share_id: shareCode
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "User-Agent": utils.getRandomPCUA(),
            Referer: "https://www.aliyundrive.com/",
            Origin: "https://www.aliyundrive.com"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      let data = utils.toJSON(postResp.data.responseText);
      if (!postResp.status && utils.isNull(data)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      if (data["code"] === "ParamFlowException" || data["code"] === "NotFound.ShareLink" || data["code"] === "ShareLink.Cancelled") {
        return NetDiskCheckLinkValidity.status.failed;
      } else if (data["file_count"] === 0 || ((_a2 = data["file_infos"]) == null ? void 0 : _a2.length) === 0) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_wenshushu = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let postResp = await httpx.post(
        "https://www.wenshushu.cn/ap/task/mgrtask",
        {
          data: JSON.stringify({
            tid: shareCode
          }),
          headers: {
            "Content-Type": "application/json",
            "User-Agent": utils.getRandomPCUA(),
            "x-token": "wss:7pmakczzw6i",
            Host: "www.wenshushu.cn",
            Origin: "https://www.wenshushu.cn",
            Referer: NetDiskLinkClickModeUtils.getBlankUrl(
              "wenshushu",
              netDiskIndex,
              shareCode,
              accessCode
            )
          },
          responseType: "json",
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!postResp.status && utils.isNull(postResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(postResp.data.responseText);
      if (data.code !== 0) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_nainiu = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let getResp = await httpx.get(
        "https://cowtransfer.com/core/api/transfer/share?uniqueUrl=" + shareCode,
        {
          headers: {
            "User-Agent": utils.getRandomPCUA(),
            Host: "cowtransfer.com",
            Origin: "https://cowtransfer.com/",
            Referer: "https://cowtransfer.com/"
          }
        }
      );
      if (!getResp.status && utils.isNull(getResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (data.code != "0000") {
        return NetDiskCheckLinkValidity.status.failed;
      }
      if (data.data.needPassword && data.data.needPassword) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_123pan = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let getResp = await httpx.get(
        "https://www.123pan.com/api/share/info?shareKey=" + shareCode,
        {
          headers: {
            "User-Agent": utils.getRandomPCUA(),
            Host: "www.123pan.com",
            Origin: "https://www.123pan.com/",
            Referer: "https://www.123pan.com/"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          },
          responseType: "json"
        }
      );
      if (!getResp.status && utils.isNull(getResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (getResp.data.responseText.includes("分享页面不存在") || data["code"] !== 0) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      if (data["data"]["HasPwd"]) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_weiyun = {
    /**
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode 分享码
     * @param accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        "weiyun",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let getResp = await httpx.get(url, {
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Host: "share.weiyun.com",
          Origin: "https://share.weiyun.com",
          Referer: url
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      if (!getResp.status && utils.isNull(getResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let respText = getResp.data.responseText;
      if (respText.includes("已删除") || respText.includes("违反相关法规") || respText.includes("已过期") || respText.includes("已经删除") || respText.includes("目录无效")) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      if (respText.includes('"need_pwd":1') || respText.includes('"pwd":"')) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_xunlei = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let postResp = await httpx.post(
        "https://xluser-ssl.xunlei.com/v1/shield/captcha/init",
        {
          data: JSON.stringify({
            client_id: "Xqp0kJBXWhwaTpB6",
            device_id: "925b7631473a13716b791d7f28289cad",
            action: "get:/drive/v1/share",
            meta: {
              package_name: "pan.xunlei.com",
              client_version: "1.45.0",
              captcha_sign: "1.fe2108ad808a74c9ac0243309242726c",
              timestamp: "1645241033384"
            }
          }),
          headers: {
            "User-Agent": utils.getRandomPCUA(),
            Host: "pan.xunlei.com",
            Referer: NetDiskLinkClickModeUtils.getBlankUrl(
              "xunlei",
              netDiskIndex,
              shareCode,
              accessCode
            ),
            Origin: "https://pan.xunlei.com"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!postResp.status && utils.isNull(postResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(postResp.data.responseText);
      let token = data["captcha_token"];
      let getResp = await httpx.get(
        "https://api-pan.xunlei.com/drive/v1/share?share_id=" + shareCode,
        {
          headers: {
            "User-Agent": utils.getRandomPCUA(),
            Host: "pan.xunlei.com",
            Referer: NetDiskLinkClickModeUtils.getBlankUrl(
              "xunlei",
              netDiskIndex,
              shareCode,
              accessCode
            ),
            Origin: "https://pan.xunlei.com",
            "x-captcha-token": token,
            "x-client-id": "Xqp0kJBXWhwaTpB6",
            "x-device-id": "925b7631473a13716b791d7f28289cad"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!getResp.status && utils.isNull(getResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let responseText = getResp.data.responseText;
      if (responseText.includes("NOT_FOUND") || responseText.includes("SENSITIVE_RESOURCE") || responseText.includes("EXPIRED") || responseText.includes("DELETED")) {
        return NetDiskCheckLinkValidity.status.failed;
      } else if (responseText.includes("PASS_CODE_EMPTY")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_115pan = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let getResp = await httpx.get(
        `https://webapi.115.com/share/snap?share_code=${shareCode}&offset=0&limit=20&receive_code=&cid=`,
        {
          headers: {
            Accept: "application/json, text/javascript, */*;",
            "User-Agent": utils.getRandomPCUA(),
            Host: "webapi.115.com",
            Referer: "https://115.com/",
            Origin: "https://115.com"
          },
          allowInterceptConfig: false,
          onerror() {
          },
          ontimeout() {
          }
        }
      );
      if (!getResp.status) {
        if (utils.isNull(getResp.data.responseText)) {
          return NetDiskCheckLinkValidity.status.failed;
        }
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(getResp.data.responseText);
      if (data.state) {
        return NetDiskCheckLinkValidity.status.success;
      }
      if (typeof data.error === "string") {
        if (data.error.includes("访问码")) {
          return NetDiskCheckLinkValidity.status.needAccessCode;
        } else if (data.error.includes("链接") || data.error.includes("分享已取消")) {
          return NetDiskCheckLinkValidity.status.failed;
        }
      }
      return NetDiskCheckLinkValidity.status.unknown;
    }
  };
  const NetDiskCheckLinkValidity_chengtong = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let blankUrl = NetDiskLinkClickModeUtils.getBlankUrl(
        "chengtong",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let blankUrlObj = new URL(blankUrl);
      const path = blankUrlObj.pathname.split("/")[1].trim();
      let url = "";
      if (path === "f" || path === "file") {
        url = `https://webapi.ctfile.com/getfile.php?path=${path}&f=${shareCode}&passcode=${accessCode}&token=0&r=${Math.random()}&ref=`;
      } else if (path === "d" || path === "dir") {
        url = `https://webapi.ctfile.com/getdir.php?path=${path}&d=${shareCode}&folder_id=&passcode=${accessCode}&token=0&r=${Math.random()}&ref=`;
      } else {
        log.warn(["未知path", [netDiskIndex, shareCode, accessCode]]);
        return NetDiskCheckLinkValidity.status.unknown;
      }
      let getResp = await httpx.get(url, {
        headers: {
          Host: "webapi.ctfile.com",
          Origin: "https://url95.ctfile.com",
          Referer: blankUrl,
          Accept: "application/json, text/javascript, */*; q=0.01",
          "User-Agent": utils.getRandomPCUA()
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      let responseText = getResp.data.responseText;
      if (!getResp.status && utils.isNull(responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(responseText);
      if (data["code"] === 200) {
        return NetDiskCheckLinkValidity.status.success;
      }
      if (data["code"] === 401) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      }
      if (data["code"] === 404 || data["code"] === 503) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      return NetDiskCheckLinkValidity.status.unknown;
    }
  };
  const NetDiskCheckLinkValidity_kuake = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let url = "https://drive.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=pc";
      let postResp = await httpx.post(url, {
        data: JSON.stringify({
          pwd_id: shareCode,
          passcode: ""
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=UTF-8",
          "User-Agent": utils.getRandomPCUA(),
          Origin: "https://pan.quark.cn",
          Referer: NetDiskLinkClickModeUtils.getBlankUrl(
            "kuake",
            netDiskIndex,
            shareCode,
            accessCode
          )
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      if (!postResp.status && utils.isNull(postResp.data.responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let data = utils.toJSON(postResp.data.responseText);
      if (data.message.includes("需要提取码")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      } else if (data.message.includes("ok")) {
        return NetDiskCheckLinkValidity.status.success;
      } else {
        return NetDiskCheckLinkValidity.status.failed;
      }
    }
  };
  const NetDiskCheckLinkValidity_jianguoyun = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        "jianguoyun",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let getResp = await httpx.get(url, {
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Host: "www.jianguoyun.com",
          Referer: NetDiskLinkClickModeUtils.getBlankUrl(
            "jianguoyun",
            netDiskIndex,
            shareCode,
            accessCode
          ),
          Origin: "https://www.jianguoyun.com"
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      let responseText = getResp.data.responseText;
      if (!getResp.status && utils.isNull(responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      if (responseText.includes("<h1>啊噢！")) {
        return NetDiskCheckLinkValidity.status.failed;
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_onedrive = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      var _a2, _b, _c, _d;
      let url = NetDiskLinkClickModeUtils.getBlankUrl(
        "onedrive",
        netDiskIndex,
        shareCode,
        accessCode
      );
      let urlObj = new URL(url);
      let getResp = await httpx.get(url, {
        headers: {
          "User-Agent": utils.getRandomPCUA(),
          Host: urlObj.hostname,
          Referer: url,
          Origin: urlObj.origin
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      if (!getResp.status) {
        let status = (_b = (_a2 = getResp.data) == null ? void 0 : _a2.status) == null ? void 0 : _b.toString();
        if (status === "429") {
          return NetDiskCheckLinkValidity.status.error;
        } else if (status === "404") {
          return NetDiskCheckLinkValidity.status.failed;
        }
        return NetDiskCheckLinkValidity.status.error;
      }
      let responseText = getResp.data.responseText;
      if (utils.isNotNull(responseText)) {
        try {
          let respDOM = domUtils.parseHTML(responseText, true, true);
          if ((_d = (_c = respDOM.querySelector("title")) == null ? void 0 : _c.innerHTML) == null ? void 0 : _d.includes("错误")) {
            return NetDiskCheckLinkValidity.status.failed;
          }
        } catch (error) {
        }
      }
      return NetDiskCheckLinkValidity.status.success;
    }
  };
  const NetDiskCheckLinkValidity_uc = {
    /**
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     */
    async init(netDiskIndex, shareCode, accessCode) {
      let resp = await httpx.get("https://drive.uc.cn/s/" + shareCode, {
        headers: {
          "User-Agent": utils.getRandomAndroidUA(),
          Host: "drive.uc.cn",
          Referer: NetDiskLinkClickModeUtils.getBlankUrl(
            "uc",
            netDiskIndex,
            shareCode,
            accessCode
          ),
          Origin: "https://drive.uc.cn"
        },
        allowInterceptConfig: false,
        onerror() {
        },
        ontimeout() {
        }
      });
      let responseText = resp.data.responseText;
      if (!resp.status && utils.isNull(responseText)) {
        return NetDiskCheckLinkValidity.status.error;
      }
      let respDoc = domUtils.parseHTML(responseText, true, true);
      if (respDoc.querySelector(".h5-page-main")) {
        let $h5PageMain = respDoc.querySelector(".h5-page-main");
        let errorText = $h5PageMain.textContent || $h5PageMain.innerText;
        if (errorText.includes("失效") || errorText.includes("不存在") || errorText.includes("违规") || errorText.includes("删除")) {
          return NetDiskCheckLinkValidity.status.failed;
        } else {
          return NetDiskCheckLinkValidity.status.unknown;
        }
      } else if (respDoc.querySelector(".main-body .input-wrap input")) {
        return NetDiskCheckLinkValidity.status.needAccessCode;
      } else {
        return NetDiskCheckLinkValidity.status.success;
      }
    }
  };
  const NetDiskViewConfig = {
    view: {
      "netdisl-small-window-shrink-status": GenerateNetDiskConfig(
        "netdisl-small-window-shrink-status",
        false
      ),
      "netdisk-ui-small-window-position": GenerateNetDiskConfig("netdisk-ui-small-window-position", null)
    }
  };
  const NetDiskView = {
    show() {
      if (NetDiskUI.Alias.uiLinkAlias == null) {
        this.createView();
        this.initViewEvent();
      } else {
        NetDiskUI.Alias.uiLinkAlias.show();
      }
    },
    getCSS() {
      return (
        /*css*/
        `
        .netdisk-url-box{
            border-bottom: 1px solid #e4e6eb;
        }
        .netdisk-url-div{display:flex;align-items:center;width:100%;padding:5px 0px 5px 0px}
        .netdisk-icon{display:contents}
        .netdisk-icon .netdisk-icon-img{
            cursor: pointer;
            width: 28px;
            height: 28px;
            min-width: 28px;
            min-height: 28px;
            font-size: 0.8em;
            margin: 0px 10px;
        }
        .netdisk-url-div .netdisk-icon,
        .netdisk-url-div .netdisk-status{
            flex: 0 0 auto;
        }
        .netdisk-url-div .netdisk-url{
            flex: 1;
        }
        .netdisk-icon .netdisk-icon-img{
            border-radius: 10px;
            box-shadow: 0 .3px .6px rgb(0 0 0 / 6%),0 .7px 1.3px rgb(0 0 0 / 8%),0 1.3px 2.5px rgb(0 0 0 / 10%),0 2.2px 4.5px rgb(0 0 0 / 12%),0 4.2px 8.4px rgb(0 0 0 / 14%),0 10px 20px rgb(0 0 0 / 20%)
        }
        .netdisk-status[data-check-failed]{
            padding: 5px 5px;
        }
        .netdisk-url{padding:5px 5px;}
        .netdisk-url a {
            color: #ff4848!important;
            min-height: 28px;
            overflow-x: hidden;
            overflow-y: auto;
            font-size: 0.8em;
            border: none;
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: 0px;
            word-break: break-word;
            text-align: left;
        }
        .netdisk-status{
            display: none;
        }
        .netdisk-status[data-check-valid]{
            display: flex;
            align-items: center;
            width: 15px;
            height: 15px;
        }
        .netdisk-status[data-check-valid="failed"]{
            color: red;
        }
        .netdisk-status[data-check-valid="error"]{
            cursor: pointer;
        }
        .netdisk-status[data-check-valid="success"]{
            color: green;
        }
        .netdisk-status[data-check-valid="loading"] svg{
            animation: rotating 2s linear infinite;
        }
        .netdisk-url-box:has(.netdisk-status[data-check-valid="failed"]){
            text-decoration: line-through;
        }
        .whitesevPop-whitesevPopSetting :focus-visible{outline-offset:0;outline:0}
        .netdisk-url a[isvisited=true]{color:#8b8888!important}
        .netdisk-url a:active{box-shadow:0 0 0 1px #616161 inset}
        .netdisk-url a:focus-visible{outline:0}
        .whitesevPop-content p[pop]{text-indent:0}
        .whitesevPop-button[type=primary]{border-color:#2d8cf0;background-color:#2d8cf0}
        `
      );
    },
    /**
     * 创建视图
     */
    createView() {
      let viewAddHTML = "";
      NetDiskUI.isMatchedNetDiskIconMap.forEach((netDiskName) => {
        let netDiskDict = NetDisk.linkDict.get(netDiskName);
        let netDiskData = netDiskDict.getItems();
        Object.keys(netDiskData).forEach((shareCode) => {
          let accessCodeDict = netDiskData[shareCode];
          let uiLink = NetDisk.handleLinkShow(
            netDiskName,
            accessCodeDict["netDiskIndex"],
            shareCode,
            accessCodeDict["accessCode"],
            accessCodeDict["matchText"]
          );
          viewAddHTML = viewAddHTML + this.getViewHTML(
            NetDiskUI.src.icon[netDiskName],
            netDiskName,
            accessCodeDict["netDiskIndex"],
            shareCode,
            accessCodeDict["accessCode"],
            uiLink
          );
        });
      });
      let viewHTML = `
            <div class="netdisk-url-box-all">
                ${viewAddHTML}
            </div>`;
      if (NetDiskConfig.function["netdisk-behavior-mode"].value.toLowerCase().includes("smallwindow")) {
        NetDiskUI.Alias.uiLinkAlias = NetDiskPops.alert(
          {
            title: {
              text: "网盘",
              position: "center"
            },
            content: {
              text: viewHTML,
              html: true
            },
            btn: {
              ok: {
                enable: false
              },
              close: {
                callback(event) {
                  if (NetDiskConfig.function["netdisk-behavior-mode"].value.toLowerCase().includes("suspension")) {
                    NetDiskSuspensionConfig.mode.current_suspension_smallwindow_mode.value = "suspension";
                    event.hide();
                    NetDiskUI.suspension.show();
                  } else {
                    NetDiskUI.Alias.uiLinkAlias = void 0;
                    event.close();
                  }
                }
              }
            },
            mask: {
              enable: false
            },
            // @ts-ignore
            animation: "",
            beforeAppendToPageCallBack($shadowRoot, $shadowContainer) {
              let buttonHeaderControl = $shadowRoot.querySelector(
                ".pops-header-control"
              );
              let alertContent = $shadowRoot.querySelector(
                ".pops-alert-content"
              );
              let launchIcon = domUtils.createElement(
                "button",
                {
                  className: "pops-header-control",
                  innerHTML: (
                    /*html*/
                    `
                                <i class="pops-icon">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M290.816 774.144h167.936c12.288 0 20.48 8.192 20.48 20.48s-8.192 20.48-20.48 20.48h-219.136c-12.288 0-20.48-8.192-20.48-20.48v-2.048-206.848c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v163.84l210.944-198.656c8.192-8.192 20.48-8.192 28.672 0s8.192 20.48 0 28.672l-208.896 194.56z m462.848-524.288h-167.936c-12.288 0-20.48-8.192-20.48-20.48s8.192-20.48 20.48-20.48h219.136c12.288 0 20.48 8.192 20.48 20.48v208.896c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-163.84l-210.944 198.656c-8.192 8.192-20.48 8.192-28.672 0s-8.192-20.48 0-28.672l208.896-194.56z m188.416 323.584c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-389.12c0-34.816-26.624-61.44-61.44-61.44h-655.36c-34.816 0-61.44 26.624-61.44 61.44v655.36c0 34.816 26.624 61.44 61.44 61.44h655.36c34.816 0 61.44-26.624 61.44-61.44v-94.208c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v94.208c0 57.344-45.056 102.4-102.4 102.4h-655.36c-57.344 0-102.4-45.056-102.4-102.4v-655.36c0-57.344 45.056-102.4 102.4-102.4h655.36c57.344 0 102.4 45.056 102.4 102.4v389.12z">
                                    </path>
                                </svg>
                                </i>
                                `
                  )
                },
                {
                  type: "launch",
                  "data-header": true
                }
              );
              let shrinkIcon = domUtils.createElement(
                "button",
                {
                  className: "pops-header-control",
                  innerHTML: (
                    /*html*/
                    `
                                <i class="pops-icon">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M618.496 425.984h167.936c12.288 0 20.48 8.192 20.48 20.48s-8.192 20.48-20.48 20.48h-219.136c-12.288 0-20.48-8.192-20.48-20.48v-2.048-206.848c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v163.84l210.944-198.656c8.192-8.192 20.48-8.192 28.672 0s8.192 20.48 0 28.672l-208.896 194.56z m-192.512 172.032h-167.936c-12.288 0-20.48-8.192-20.48-20.48s8.192-20.48 20.48-20.48h219.136c12.288 0 20.48 8.192 20.48 20.48v208.896c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-163.84l-210.944 198.656c-8.192 8.192-20.48 8.192-28.672 0s-8.192-20.48 0-28.672l208.896-194.56z m516.096-24.576c0 12.288-8.192 20.48-20.48 20.48s-20.48-8.192-20.48-20.48v-389.12c0-34.816-26.624-61.44-61.44-61.44h-655.36c-34.816 0-61.44 26.624-61.44 61.44v655.36c0 34.816 26.624 61.44 61.44 61.44h655.36c34.816 0 61.44-26.624 61.44-61.44v-94.208c0-12.288 8.192-20.48 20.48-20.48s20.48 8.192 20.48 20.48v94.208c0 57.344-45.056 102.4-102.4 102.4h-655.36c-57.344 0-102.4-45.056-102.4-102.4v-655.36c0-57.344 45.056-102.4 102.4-102.4h655.36c57.344 0 102.4 45.056 102.4 102.4v389.12z">
                                    </path>
                                </svg>
                                </i>
                                `
                  )
                },
                {
                  type: "shrink",
                  "data-header": true
                }
              );
              domUtils.before(buttonHeaderControl, launchIcon);
              domUtils.before(buttonHeaderControl, shrinkIcon);
              domUtils.on(
                launchIcon,
                "click",
                void 0,
                function() {
                  launchIcon.classList.add("pops-hide-important");
                  shrinkIcon.classList.remove("pops-hide-important");
                  alertContent.classList.remove("pops-hide-important");
                  NetDiskViewConfig.view["netdisl-small-window-shrink-status"].value = false;
                },
                {
                  capture: true
                }
              );
              domUtils.on(
                shrinkIcon,
                "click",
                void 0,
                function() {
                  shrinkIcon.classList.add("pops-hide-important");
                  launchIcon.classList.remove("pops-hide-important");
                  alertContent.classList.add("pops-hide-important");
                  alertContent.classList.add("pops-no-border-important");
                  NetDiskViewConfig.view["netdisl-small-window-shrink-status"].value = true;
                },
                {
                  capture: true
                }
              );
              if (NetDiskViewConfig.view["netdisl-small-window-shrink-status"].value) {
                shrinkIcon.click();
              } else {
                launchIcon.click();
              }
            },
            dragMoveCallBack(moveElement, left, top2) {
              NetDiskViewConfig.view["netdisk-ui-small-window-position"].value = {
                left,
                top: top2
              };
            },
            class: "whitesevPop",
            style: (
              /*css*/
              `
                    ${this.getCSS()}

                    .pops {
                        --container-title-height: 35px;
                        --content-max-height: ${NetDiskConfig.smallWindow["netdisk-ui-small-window-max-height"].value}px;
                        --netdisk-line-space: 8px;
                        --netdisk-icon-size: 24px;
                    }
                    .pops[type-value="alert"]{
                        transform: none;
                    }
                    .pops {
                        max-height: var(--content-max-height);
                    }
                    .pops[type-value=alert] .pops-alert-content{
                        max-height: calc(var(--content-max-height) - var(--container-title-height) - var(--container-bottom-btn-height));
                    }
                    .pops-header-controls button.pops-header-control[type][data-header]{
                        padding: 0px 5px;
                    }
                    .netdisk-url-div{
                        padding: 0px;
                    }
                    .netdisk-icon .netdisk-icon-img{
                        width: var(--netdisk-icon-size);
                        height: var(--netdisk-icon-size);
                        min-width: var(--netdisk-icon-size);
                        min-height: var(--netdisk-icon-size);
                        margin: 0px var(--netdisk-line-space);
                    }
                    .netdisk-status{
                        margin-right: var(--netdisk-line-space);
                    }
                    .netdisk-url{
                        padding: 2px 0px;
                    }
                    `
            )
          },
          NetDiskUI.popsStyle.mainViewSmallWindow
        );
        let smallWindowPosition = NetDiskViewConfig.view["netdisk-ui-small-window-position"].value;
        let popsElement = NetDiskUI.Alias.uiLinkAlias.popsElement;
        if (smallWindowPosition) {
          let viewWidth = domUtils.width(popsElement, true);
          let viewHeight = domUtils.height(popsElement, true);
          let maxWindowLeft = domUtils.width(window);
          let maxWindowTop = domUtils.height(window);
          const { transformLeft, transformTop } = domUtils.getTransform(popsElement);
          let maxLeft = maxWindowLeft - viewWidth + transformLeft;
          let maxTop = maxWindowTop - viewHeight + transformTop;
          let minLeft = 0 + transformLeft;
          let minTop = 0 + transformTop;
          if (smallWindowPosition.top > maxTop) {
            smallWindowPosition.top = maxTop;
          } else if (smallWindowPosition.top < minTop) {
            smallWindowPosition.top = minTop;
          }
          if (smallWindowPosition.left > maxLeft) {
            smallWindowPosition.left = maxLeft;
          } else if (smallWindowPosition.left < minLeft) {
            smallWindowPosition.left = minLeft;
          }
          popsElement.style.transitionDuration = "0s";
          popsElement.style.left = smallWindowPosition["left"] + "px";
          popsElement.style.top = smallWindowPosition["top"] + "px";
          setTimeout(() => {
            popsElement.style.transitionDuration = "0s";
          }, 300);
        }
      } else {
        NetDiskUI.Alias.uiLinkAlias = NetDiskPops.alert(
          {
            title: {
              text: "网盘",
              position: "center"
            },
            content: {
              text: viewHTML,
              html: true
            },
            btn: {
              ok: {
                enable: false
              },
              close: {
                callback(event) {
                  NetDiskUI.Alias.uiLinkAlias = void 0;
                  event.close();
                }
              }
            },
            mask: {
              clickCallBack(originalRun) {
                originalRun();
                NetDiskUI.Alias.uiLinkAlias = void 0;
              }
            },
            class: "whitesevPop",
            style: `
                    ${this.getCSS()}

                    .pops {
                        max-height: ${__pops.isPhone() ? "50vh" : "60vh"};
                    }
                    `
          },
          NetDiskUI.popsStyle.mainView
        );
      }
      NetDiskUI.Alias.uiLinkAlias.popsElement.querySelectorAll(".netdisk-url-box-all .netdisk-url-box").forEach((ele) => {
        let netDiskName = ele.querySelector(".netdisk-link").getAttribute("data-netdisk");
        let netDiskIndex = parseInt(
          ele.querySelector(".netdisk-link").getAttribute("data-netdisk-index")
        );
        let shareCode = ele.querySelector(".netdisk-link").getAttribute("data-sharecode");
        let accessCode = ele.querySelector(".netdisk-link").getAttribute("data-accesscode");
        NetDiskCheckLinkValidity.check(
          ele,
          netDiskName,
          netDiskIndex,
          shareCode,
          accessCode
        );
      });
    },
    /**
     * 初始化事件（在创建视图后）
     */
    initViewEvent() {
      NetDiskUI.setRightClickMenu(
        NetDiskUI.Alias.uiLinkAlias.$shadowRoot,
        ".whitesevPop .netdisk-url a"
      );
      this.registerIconGotoPagePosition(NetDiskUI.Alias.uiLinkAlias.$shadowRoot);
      this.setNetDiskUrlClickEvent(
        NetDiskUI.Alias.uiLinkAlias.$shadowRoot,
        ".netdisk-url a"
      );
      NetDiskUI.setGlobalRightClickMenu(
        NetDiskUI.Alias.uiLinkAlias.$shadowRoot.querySelector(
          ".pops .pops-alert-title > p"
        )
      );
    },
    /**
     * 创建在元素属性上的attribute的数据
     */
    createElementAttributeRuleInfo(data) {
      let result = {
        // 网盘
        "data-netdisk": data.netDisk,
        // 网盘索引
        "data-netdisk-index": data.netDiskIndex,
        // 访问码
        "data-sharecode": data.shareCode,
        // 访问码
        "data-accesscode": data.accessCode
      };
      let resultStr = "";
      Object.keys(result).forEach((key) => {
        resultStr += `${key}="${result[key]}" `;
      });
      return resultStr;
    },
    /**
     * 解析创建在元素属性上的attribute的数据
     */
    praseElementAttributeRuleInfo($ele) {
      let result = {
        /** 网盘名称 */
        netDiskName: $ele.getAttribute("data-netdisk"),
        /** 网盘索引 */
        netDiskIndex: parseInt($ele.getAttribute("data-netdisk-index")),
        /** 分享码 */
        shareCode: $ele.getAttribute("data-sharecode"),
        /** 提取码 */
        accessCode: $ele.getAttribute("data-accesscode")
      };
      if (isNaN(result.netDiskIndex)) {
        log.warn(["元素上的netDiskIndex的值是NaN", $ele]);
        result.netDiskIndex = 0;
      }
      return result;
    },
    /**
     * 获取视图html
     * @param netDiskImgSrc 网盘图标src
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode
     * @param accessCode
     * @param uiLinkText 显示出来的链接文本
     */
    getViewHTML(netDiskImgSrc, netDiskName, netDiskIndex, shareCode, accessCode, uiLinkText) {
      return (
        /*html*/
        `
        <div class="netdisk-url-box">
            <div class="netdisk-url-div">
                <div class="netdisk-icon">
                    <div class="netdisk-icon-img"
                        style="background: url(${netDiskImgSrc}) no-repeat;background-size: 100%;"
						${this.createElementAttributeRuleInfo({
        netDisk: netDiskName,
        netDiskIndex,
        shareCode,
        accessCode
      })}
                    </div>
                </div>
                <div class="netdisk-status">

                </div>
                <div class="netdisk-url">
                    <a  class="netdisk-link"
                        href="javascript:;" 
                        isvisited="false"
						${this.createElementAttributeRuleInfo({
        netDisk: netDiskName,
        netDiskIndex,
        shareCode,
        accessCode
      })}>${uiLinkText}</a>
                </div>
            </div>
        </div>`
      );
    },
    /**
     * 设置网盘链接点击事件
     * @param target
     * @param clickNodeSelector - 元素选择器
     */
    setNetDiskUrlClickEvent(target, clickNodeSelector) {
      function clickEvent(event) {
        event.target.setAttribute("isvisited", "true");
        let $click = event.target;
        const { netDiskName, netDiskIndex, shareCode, accessCode } = NetDiskView.praseElementAttributeRuleInfo($click);
        let linkClickMode = NetDiskLocalData.function.linkClickMode(netDiskName);
        if (linkClickMode === "copy") {
          NetDiskLinkClickMode.copy(
            netDiskName,
            netDiskIndex,
            shareCode,
            accessCode
          );
        } else if (linkClickMode === "openBlank") {
          let url = NetDiskLinkClickModeUtils.getBlankUrl(
            netDiskName,
            netDiskIndex,
            shareCode,
            accessCode
          );
          let isSchemeForward = NetDiskLocalData.schemeUri.isForwardBlankLink(netDiskName);
          if (isSchemeForward) {
            NetDiskLinkClickMode.openBlankWithScheme(
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode
            );
          } else {
            NetDiskLinkClickMode.openBlank(
              url,
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode
            );
          }
        } else if (linkClickMode === "parseFile") {
          NetDiskLinkClickMode.parseFile(
            netDiskName,
            netDiskIndex,
            shareCode,
            accessCode
          );
        } else {
          log.error("未知点击动作：" + linkClickMode);
          Qmsg.error("未知点击动作：" + linkClickMode);
        }
      }
      domUtils.on(target, "click", clickNodeSelector, clickEvent);
    },
    /**
     * 注册右键菜单
     * @param {HTMLElement|Window} target
     * @param {?string} selector
     * @param {{text:string,callback:Function}[]} showTextList 右键菜单的内容
     * @param {string} className className属性
     */
    registerContextMenu(target, selector, showTextList = [], className = "whitesevSuspensionContextMenu") {
      let data = [];
      showTextList.forEach((item) => {
        data.push({
          icon: "",
          iconIsLoading: false,
          text: item.text,
          callback: item.callback
        });
      });
      let detail = {
        target,
        targetSelector: selector,
        data,
        isAnimation: false,
        className,
        only: true
      };
      NetDiskPops.rightClickMenu(detail);
    },
    /**
     * 添加新的链接
     * @param {string} netDiskName 网盘名称
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     * @param {string} matchText 匹配到的文本
     */
    addLinkView(netDiskName, netDiskIndex, shareCode, accessCode, matchText) {
      NetDiskUI.netDiskHistoryMatch.setNetDiskHistoryMatchData(
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode,
        matchText
      );
      if (!NetDiskUI.Alias.uiLinkAlias) {
        return;
      }
      log.info([netDiskName, netDiskIndex, shareCode, accessCode]);
      let icon = NetDiskUI.src.icon[netDiskName];
      let uiLink = NetDisk.handleLinkShow(
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode,
        matchText
      );
      let insertDOM = this.getViewHTML(
        icon,
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode,
        uiLink
      );
      let $urlBoxAll = NetDiskUI.Alias.uiLinkAlias.popsElement.querySelector(
        ".netdisk-url-box-all"
      );
      domUtils.append($urlBoxAll, insertDOM);
      NetDiskCheckLinkValidity.check(
        // @ts-ignore
        $urlBoxAll.children[$urlBoxAll.children.length - 1],
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode
      );
    },
    /**
     * 修改已存在的view
     * @param {string} netDiskName 网盘名称
     * @param {number} netDiskIndex 网盘名称索引下标
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     * @param {string} matchText 匹配到的文本
     */
    changeLinkView(netDiskName, netDiskIndex, shareCode, accessCode, matchText) {
      NetDiskUI.netDiskHistoryMatch.setNetDiskHistoryMatchData(
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode,
        matchText
      );
      if (!NetDiskUI.Alias.uiLinkAlias) {
        return;
      }
      let uiLink = NetDisk.handleLinkShow(
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode,
        matchText
      );
      let needChangeDOM = NetDiskUI.Alias.uiLinkAlias.popsElement.querySelector(
        `.netdisk-url a[data-sharecode='${shareCode}'][data-netdisk-index='${netDiskIndex}']`
      );
      log.info("修改网盘链接视图");
      log.info(needChangeDOM);
      needChangeDOM.setAttribute("data-accesscode", accessCode);
      domUtils.html(needChangeDOM, uiLink);
    },
    /**
     * 设置点击图标按钮导航至该网盘链接所在网页中位置
     */
    registerIconGotoPagePosition(target) {
      let findGenerator = void 0;
      let iterator = void 0;
      let prevSearchShareCode = void 0;
      domUtils.on(
        target,
        "click",
        ".whitesevPop .netdisk-icon .netdisk-icon-img",
        function(event) {
          let $click = event.target;
          let dataSharecode = $click.getAttribute("data-sharecode");
          if (!NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode"].value) {
            return;
          }
          if (typeof dataSharecode !== "string") {
            Qmsg.error("获取data-sharecode属性失败");
            return;
          }
          if (prevSearchShareCode == void 0) {
            prevSearchShareCode = dataSharecode;
          } else if (prevSearchShareCode !== dataSharecode) {
            log.info(
              `上一个搜索：${prevSearchShareCode}，切换至：${dataSharecode}`
            );
            findGenerator = void 0;
            iterator = void 0;
            prevSearchShareCode = dataSharecode;
          }
          if (findGenerator == void 0) {
            findGenerator = utils.findElementsWithText(
              document.documentElement,
              dataSharecode
            );
            iterator = findGenerator.next();
          }
          if (iterator == null ? void 0 : iterator.value) {
            log.success(["定位元素", iterator]);
            if (iterator.value.nodeType === Node.ELEMENT_NODE && iterator.value.getClientRects().length) {
              iterator.value.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "nearest"
              });
              if (NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode-with-select"].value) {
                let elementText = iterator.value.innerText || iterator.value.textContent;
                let childTextNode = void 0;
                let startIndex = void 0;
                let endIndex = void 0;
                if (elementText.includes(dataSharecode)) {
                  let textNodeList = Array.from(
                    iterator.value.childNodes
                  ).filter((ele) => ele.nodeType === Node.TEXT_NODE);
                  for (const textNode of textNodeList) {
                    if (textNode.textContent.includes(
                      dataSharecode
                    )) {
                      childTextNode = textNode;
                      startIndex = textNode.textContent.indexOf(dataSharecode);
                      endIndex = startIndex + dataSharecode.length;
                      break;
                    }
                  }
                }
                try {
                  utils.selectElementText(
                    iterator.value,
                    childTextNode,
                    startIndex,
                    endIndex
                  );
                } catch (error) {
                  log.error(error);
                  utils.selectElementText(iterator.value);
                }
              }
            } else if (iterator.value.nodeType === Node.TEXT_NODE && iterator.value.parentElement.getClientRects().length) {
              if (NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode-with-select"].value) {
                let elementText = iterator.value.textContent || iterator.value.nodeValue;
                let childTextNode = iterator.value;
                let startIndex = elementText.indexOf(dataSharecode);
                let endIndex = startIndex + dataSharecode.length;
                try {
                  utils.selectElementText(
                    iterator.value,
                    childTextNode,
                    startIndex,
                    endIndex
                  );
                } catch (error) {
                  log.error(error);
                  utils.selectElementText(iterator.value.parentElement);
                }
                let selection = globalThis.getSelection();
                if (selection.rangeCount > 0) {
                  let range = selection.getRangeAt(0);
                  let rect = range.getBoundingClientRect();
                  let scrollYOffset = globalThis.scrollY;
                  let position = rect.top + scrollYOffset - globalThis.innerHeight / 2;
                  globalThis.scrollTo({
                    behavior: "smooth",
                    top: position
                  });
                } else {
                  iterator.value.parentElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                  });
                }
              } else {
                try {
                  let range = new Range();
                  range.selectNodeContents(iterator.value);
                  let rect = range.getBoundingClientRect();
                  let scrollYOffset = globalThis.scrollY;
                  let position = rect.top + scrollYOffset - globalThis.innerHeight / 2;
                  globalThis.scrollTo({
                    behavior: "smooth",
                    top: position
                  });
                } catch (error) {
                  log.error(error);
                  iterator.value.parentElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                  });
                }
              }
            } else {
              log.error(["无法定位该元素位置", iterator.value]);
              Qmsg.error(
                `无法定位该元素位置，类型：<${(iterator.value.nodeName || iterator.value.localName || iterator.value.tagName).toLowerCase()}>`,
                {
                  html: false
                }
              );
            }
          }
          iterator = findGenerator.next();
          if (iterator.done) {
            if (!NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-loop-find-sharecode"].value) {
              Qmsg.info("已经定位至最后一个元素了");
              return;
            }
            findGenerator = void 0;
            iterator = void 0;
          }
        }
      );
    }
  };
  const NetDiskCheckLinkValidityStatus = {
    loading: {
      code: 1,
      msg: "验证中",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "loading");
        ele.innerHTML = __pops.config.iconSVG.loading;
      }
    },
    success: {
      code: 200,
      msg: "该链接有效",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "success");
        ele.innerHTML = /*html*/
        `
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
				<path
				fill="currentColor"
				d="M874.119618 149.859922A510.816461 510.816461 0 0 0 511.997 0.00208a509.910462 509.910462 0 0 0-362.119618 149.857842c-199.817789 199.679789-199.817789 524.581447 0 724.260236a509.969462 509.969462 0 0 0 362.119618 149.857842A508.872463 508.872463 0 0 0 874.119618 874.120158c199.836789-199.679789 199.836789-524.581447 0-724.260236zM814.94268 378.210681L470.999043 744.132295a15.359984 15.359984 0 0 1-5.887994 4.095996c-1.751998 1.180999-2.913997 2.362998-5.276994 2.913997a34.499964 34.499964 0 0 1-13.469986 2.914997 45.547952 45.547952 0 0 1-12.897986-2.303998l-4.095996-2.363997a45.291952 45.291952 0 0 1-7.009992-4.095996l-196.902793-193.789796a34.126964 34.126964 0 0 1-10.555989-25.186973c0-9.37399 3.583996-18.74698 9.98399-25.186974a36.429962 36.429962 0 0 1 50.372947 0l169.98382 167.423824L763.389735 330.220732a37.059961 37.059961 0 0 1 50.371947-1.732998 33.647965 33.647965 0 0 1 11.165988 25.186973 35.544963 35.544963 0 0 1-9.98399 24.575974v-0.04z m0 0"></path>
			</svg>
			`;
        NetDiskCheckLinkValidity.setViewAgainCheckClickEvent(ele, checkInfo);
      }
    },
    error: {
      code: -404,
      msg: "网络异常",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "error");
        ele.innerHTML = /*html*/
        `
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
				<path
				fill="currentColor"
				d="M511.808 692.224c-18.048 0-35.136 3.968-50.432 11.392-25.472 12.416-46.528 33.92-57.792 60.032-5.632 14.144-9.024 29.504-9.024 45.952 0 65.152 52.672 117.824 117.248 117.824 65.28 0 117.952-52.672 117.952-117.824 0-64.64-52.672-117.376-117.952-117.376z m0 178.496c-33.408 0-60.608-27.712-60.608-61.12 0-33.472 27.2-60.672 60.608-60.672s61.248 27.2 61.248 60.672c0 33.472-27.776 61.12-61.248 61.12zM286.784 661.632c3.968 3.392 8.512 5.632 12.992 5.632L438.08 523.328c-60.032 14.72-114.432 49.344-155.328 98.624-9.536 11.84-7.872 30.08 4.032 39.68zM622.912 534.656l-43.008 45.312c45.312 13.056 86.72 40.256 117.376 78.208 5.632 6.784 13.568 10.24 22.08 10.24 6.272 0 12.416-2.24 18.176-6.784 11.904-9.6 13.568-27.84 3.392-39.68-31.808-39.104-72.704-69.12-118.016-87.296zM511.808 391.168c17.024 0 33.408 1.216 49.856 3.456l47.68-49.856c-31.744-6.848-64.064-10.24-97.536-10.24-142.784 0-277.12 63.488-367.232 174.656-10.24 11.904-8.576 30.08 3.904 39.68 5.12 4.48 11.328 6.784 18.176 6.784 7.936 0 15.872-3.968 21.568-10.816 79.872-97.536 197.76-153.664 323.584-153.664zM751.616 400.32l-40.256 41.92c47.04 24.96 89.536 60.032 124.096 102.592 10.24 12.48 27.84 14.208 40.256 3.968 11.968-9.6 13.632-27.84 3.968-39.68-36.16-44.8-79.872-81.088-128.064-108.8zM705.152 244.928l42.56-44.672c-73.664-28.992-153.6-44.224-235.904-44.224-196.672 0-380.864 87.872-505.6 239.744-9.6 12.48-7.872 30.08 3.968 40.256 5.632 3.968 11.904 6.208 18.112 6.208 7.936 0 16.448-3.392 22.144-10.176C163.84 292.608 332.096 212.672 511.808 212.672c66.944 0 132.16 10.752 193.344 32.256zM1017.472 395.776c-40.192-49.92-87.296-92.416-139.456-126.976l-39.68 41.344C889.408 343.04 935.36 383.808 973.888 432c9.6 11.904 27.776 13.568 39.68 3.968 11.84-10.176 14.144-27.712 3.904-40.192zM937.408 104.512c-11.328-10.944-29.312-10.496-40.064 0.832L179.008 854.72c-10.816 11.328-10.496 29.248 0.896 40.064 5.44 5.312 12.48 7.872 19.584 7.872 7.488 0 14.848-2.88 20.416-8.704L938.24 144.576c10.88-11.328 10.496-29.248-0.832-40.064z"></path>
			</svg>
			`;
        NetDiskCheckLinkValidity.setViewAgainCheckClickEvent(ele, checkInfo);
      }
    },
    /** 该链接已失效 */
    failed: {
      code: 0,
      msg: "该链接已失效",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "failed");
        ele.innerHTML = /*html*/
        `
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="currentColor"
					d="M549.044706 512l166.189176-166.249412a26.383059 26.383059 0 0 0 0-36.98447 26.383059 26.383059 0 0 0-37.044706 0L512 475.015529l-166.249412-166.249411a26.383059 26.383059 0 0 0-36.98447 0 26.383059 26.383059 0 0 0 0 37.044706L475.015529 512l-166.249411 166.249412a26.383059 26.383059 0 0 0 0 36.98447 26.383059 26.383059 0 0 0 37.044706 0L512 548.984471l166.249412 166.249411a26.383059 26.383059 0 0 0 36.98447 0 26.383059 26.383059 0 0 0 0-37.044706L548.984471 512zM512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z"></path>
			</svg>
			`;
        NetDiskCheckLinkValidity.setViewAgainCheckClickEvent(ele, checkInfo);
      }
    },
    needAccessCode: {
      code: 201,
      msg: "该链接缺失提取码",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "needAccessCode");
        ele.innerHTML = /*html*/
        `
			<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
				<path
				fill="currentColor"
				d="M757.810429 373.751333 325.645708 373.751333l0-83.895759c0-103.694687 81.507362-184.922686 185.559183-184.922686 78.121242 0 146.053424 46.74565 173.062568 119.090329 3.865028 10.352789 15.384385 15.609513 25.742291 11.746532 10.351766-3.866051 15.609513-15.390525 11.744485-25.742291C688.844707 121.877815 606.198405 64.918545 511.204891 64.918545c-61.918211 0-119.246895 23.662933-161.423483 66.63156-41.3692 42.142819-64.151066 98.363262-64.151066 158.305469l0 83.895759-20.007683 0c-60.774155 0-110.042255 49.267077-110.042255 110.042255l0 366.139981c0 60.774155 49.267077 110.042255 110.042255 110.042255l492.187769 0c60.775178 0 110.042255-49.267077 110.042255-110.042255L867.852684 483.793588C867.852684 423.01841 818.585607 373.751333 757.810429 373.751333zM827.837318 849.933569c0 38.674834-31.352055 70.02689-70.02689 70.02689L265.62266 919.960459c-38.674834 0-70.02689-31.352055-70.02689-70.02689L195.59577 483.793588c0-38.674834 31.352055-70.02689 70.02689-70.02689l492.187769 0c38.674834 0 70.02689 31.352055 70.02689 70.02689L827.837318 849.933569z"></path>
				<path
				fill="currentColor"
				d="M509.715981 583.832002c-11.048637 0-20.007683 8.959046-20.007683 20.007683l0 110.042255c0 11.048637 8.958022 20.007683 20.007683 20.007683s20.007683-8.958022 20.007683-20.007683L529.723663 603.839685C529.723663 592.790024 520.765641 583.832002 509.715981 583.832002z"></path>
			</svg>
			`;
        NetDiskCheckLinkValidity.setViewAgainCheckClickEvent(ele, checkInfo);
      }
    },
    unknown: {
      code: -200,
      msg: "未知检查情况",
      setView(ele, checkInfo) {
        NetDiskCheckLinkValidity.setViewCheckValid(ele, "unknown");
        ele.innerHTML = /*html*/
        `
			<svg viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg">
				<path
				fill="currentColor"
				d="M512.473172 1023.995242A511.814852 511.814852 0 0 1 313.545134 40.351073a512.244696 512.244696 0 0 1 398.855715 943.658633 508.815937 508.815937 0 0 1-199.927677 39.985536z m0-943.658634C274.559237 80.336608 80.629391 274.266455 80.629391 512.18039s193.929846 431.843781 431.843781 431.843781 431.843781-193.929846 431.843781-431.843781S751.386745 80.336608 512.473172 80.336608z"></path>
				<path
				fill="currentColor"
				d="M506.475342 716.10662a39.985535 39.985535 0 0 1-39.985536-39.985535v-76.972156c0-79.971071 64.976495-144.947566 144.947566-144.947565a77.971794 77.971794 0 0 0 0-155.943588H445.4974a56.979388 56.979388 0 0 0-56.979387 56.979388 39.985535 39.985535 0 0 1-79.971071 0c0-74.972879 60.977941-136.950458 136.950458-136.950459h164.940333c86.968539 0 157.942864 70.974325 157.942865 157.942865s-69.974687 157.942864-157.942865 157.942864a64.976495 64.976495 0 0 0-64.976494 64.976495v76.972156a39.985535 39.985535 0 0 1-38.985897 39.985535zM505.475703 742.097218a48.982281 48.982281 0 1 0 48.982281 48.982281 48.982281 48.982281 0 0 0-48.982281-48.982281z"></path>
			</svg>
			`;
        NetDiskCheckLinkValidity.setViewAgainCheckClickEvent(ele, checkInfo);
      }
    }
  };
  const NetDiskCheckLinkValidityNetDisk = {
    baidu: NetDiskCheckLinkValidity_baidu,
    lanzou: NetDiskCheckLinkValidity_lanzou,
    lanzouyx: NetDiskCheckLinkValidity_lanzouyx,
    tianyiyun: NetDiskCheckLinkValidity_tianyiyun,
    hecaiyun: NetDiskCheckLinkValidity_hecaiyun,
    aliyun: NetDiskCheckLinkValidity_aliyun,
    wenshushu: NetDiskCheckLinkValidity_wenshushu,
    nainiu: NetDiskCheckLinkValidity_nainiu,
    _123pan: NetDiskCheckLinkValidity_123pan,
    weiyun: NetDiskCheckLinkValidity_weiyun,
    xunlei: NetDiskCheckLinkValidity_xunlei,
    _115pan: NetDiskCheckLinkValidity_115pan,
    chengtong: NetDiskCheckLinkValidity_chengtong,
    kuake: NetDiskCheckLinkValidity_kuake,
    jianguoyun: NetDiskCheckLinkValidity_jianguoyun,
    onedrive: NetDiskCheckLinkValidity_onedrive,
    uc: NetDiskCheckLinkValidity_uc
  };
  const NetDiskCheckLinkValidity = {
    $data: {
      isSubscribing: false,
      subscribe: []
    },
    /**
     * 网盘检查的状态码
     */
    status: NetDiskCheckLinkValidityStatus,
    netDisk: NetDiskCheckLinkValidityNetDisk,
    /**
     * 校验链接的有效性，这里是用于订阅-消费
     * @param {HTMLDivElement} netDiskViewBox
     * @param {string} netDiskName
     * @param {number} netDiskIndex
     * @param {string} shareCode
     * @param {string} accessCode
     */
    async check(netDiskViewBox, netDiskName, netDiskIndex, shareCode, accessCode) {
      this.$data.subscribe.push({
        netDiskViewBox,
        netDiskName,
        netDiskIndex,
        shareCode,
        accessCode
      });
      if (this.$data.isSubscribing) {
        return;
      }
      this.$data.isSubscribing = true;
      for (let index = 0; index < this.$data.subscribe.length; index++) {
        const checkInfo = this.$data.subscribe[index];
        await this.checkLinkValidity(checkInfo, true);
        await utils.sleep(250);
        this.$data.subscribe.splice(index, 1);
        index--;
      }
      this.$data.isSubscribing = false;
    },
    /**
     * 开始校验链接的有效性
     * @param checkInfo
     * @param isForceCheck 是否强制检测
     */
    async checkLinkValidity(checkInfo, isForceCheck) {
      let $netDiskStatus = checkInfo.netDiskViewBox.querySelector(
        ".netdisk-status"
      );
      if (this.isViewCheckValid($netDiskStatus) && !isForceCheck) {
        return;
      }
      let regular = NetDisk.regular[checkInfo.netDiskName][checkInfo.netDiskIndex];
      if (!regular["checkLinkValidity"]) {
        log.error(["未配置checkLinkValidity", checkInfo]);
        return;
      }
      let netDiskCheck = this.netDisk[checkInfo.netDiskName];
      if (!netDiskCheck || netDiskCheck && typeof netDiskCheck.init !== "function") {
        log.error(["没有配置该网盘的校验有效性", checkInfo]);
        return;
      }
      this.status.loading.setView($netDiskStatus, checkInfo);
      let result = await netDiskCheck.init(
        checkInfo.netDiskIndex,
        checkInfo.shareCode,
        checkInfo.accessCode
      );
      if (!result) {
        log.error(["该验证函数的返回值不是有效值", [result, checkInfo]]);
        return;
      }
      result.setView($netDiskStatus, checkInfo);
    },
    /**
     * 添加重复检查的点击事件（只触发一次）
     * @param $ele 目标元素
     * @param checkInfo 检查信息
     */
    setViewAgainCheckClickEvent($ele, checkInfo) {
      domUtils.on(
        $ele,
        "click",
        void 0,
        () => {
          const $netDiskUrlDiv = $ele.closest(".netdisk-url-div");
          const $netDiskLink = $netDiskUrlDiv.querySelector(".netdisk-link");
          const ruleInfo = NetDiskView.praseElementAttributeRuleInfo($netDiskLink);
          let newCheckInfo = {
            netDiskViewBox: $netDiskUrlDiv,
            netDiskName: ruleInfo.netDiskName,
            netDiskIndex: ruleInfo.netDiskIndex,
            shareCode: ruleInfo.shareCode,
            accessCode: ruleInfo.accessCode
          };
          this.checkLinkValidity(newCheckInfo, true);
        },
        { once: true }
      );
    },
    /**
     * 判断元素当前是否处于验证状态且验证是error或未验证状态
     * + true 已验证(成功/需要密码)
     * + false 尚未验证/验证超时/验证网络异常
     * @param {HTMLDivElement} ele
     */
    isViewCheckValid(ele) {
      if (!ele.hasAttribute("data-check-valid")) {
        return false;
      }
      if (ele.getAttribute("data-check-valid") === "error") {
        return false;
      }
      return true;
    },
    /**
     * 设置当前的验证状态
     * @param {HTMLDivElement} ele
     * @param {string} value
     */
    setViewCheckValid(ele, value) {
      ele.setAttribute("data-check-valid", value);
    },
    /**
     * 取消设置当前的验证状态
     * @param {HTMLDivElement} ele
     */
    removeViewCheckValid(ele) {
      ele.removeAttribute("data-check-valid");
    },
    /**
     * 判断状态码是成功的
     * @param {NetDiskCheckLinkValidityStatus} statusInfo
     */
    isStatusSuccess(statusInfo) {
      if (Math.floor(statusInfo.code / 100) === 2) {
        return true;
      }
      return false;
    },
    /**
     * 根据code获取code的名字
     * @param {NetDiskCheckLinkValidityStatus} statusInfo
     */
    getStatusName(statusInfo) {
      for (const statusName of Object.keys(NetDiskCheckLinkValidity.status)) {
        let _statusInfo_ = this.status[statusName];
        if (statusInfo.code === _statusInfo_.code) {
          return statusName;
        }
      }
    }
  };
  const NetDiskRequire = {
    requiredFileMap: /* @__PURE__ */ new Map(),
    /**
     * 网络加载文件
     * @param path
     * @param options
     */
    async file(path, options) {
      if (utils.isNull(path)) {
        log.error(["NetDiskRequire.file的参数path为空", path]);
        return false;
      }
      if (this.requiredFileMap.has(path)) {
        log.warn(["NetDiskRequire.file的参数path已引入过", path]);
        return true;
      }
      let getResp = await httpx.get(path, options);
      if (!getResp.status) {
        return false;
      }
      let jsText = getResp.data.responseText;
      let count = this.requiredFileMap.get(path);
      this.requiredFileMap.set(path, count++);
      log.info(["加载js文件", path]);
      _unsafeWindow.eval(
        `
		let exports = void 0;
		let module = void 0;
		let define = void 0;
		` + jsText
      );
      await utils.sleep(300);
    }
  };
  const NetDiskDebug = {
    /**
     * 对传入的url进行处理，返回shareCode
     * @param {string} matchText 正在进行匹配的文本
     * @param {NetDiskRegularOption} regular 当前执行的规则
     * @param {(logData: NetDiskDebugLogData)=>void} logCallBack 日志回调
     */
    handleShareCode(matchText, regular, logCallBack) {
      var _a2;
      let shareCodeMatch = (_a2 = matchText.match(regular.shareCode)) == null ? void 0 : _a2.filter((item) => utils.isNotNull(item));
      logCallBack({
        status: true,
        msg: [
          `正则: shareCode`,
          "作用: 获取shareCode",
          "结果: ",
          JSON.stringify(shareCodeMatch)
        ]
      });
      if (utils.isNull(shareCodeMatch)) {
        logCallBack({
          status: false,
          msg: `匹配shareCode为空`
        });
        return;
      }
      let shareCode = shareCodeMatch[0];
      logCallBack({
        status: true,
        msg: [`取第一个值: ` + shareCode]
      });
      if (regular.shareCodeNeedRemoveStr) {
        shareCode = shareCode.replace(regular.shareCodeNeedRemoveStr, "");
        logCallBack({
          status: true,
          msg: [
            `正则: shareCodeNeedRemoveStr`,
            "作用: 删除ShareCode前面不需要的字符串",
            `结果: ${shareCode}`
          ]
        });
      }
      let shareCodeNotMatch = regular.shareCodeNotMatch;
      if (shareCodeNotMatch != void 0 && shareCode.match(shareCodeNotMatch)) {
        log.error(`不可能的shareCode => ${shareCode}`);
        logCallBack({
          status: false,
          msg: [
            `正则: shareCodeNotMatch`,
            "作用: 用于判断提取到的shareCode是否是错误的shareCode",
            `结果: true 该shareCode不是正确的`
          ]
        });
        return;
      }
      for (const shareCodeNotMatchRegexp of NetDisk.shareCodeNotMatchRegexpList) {
        if (shareCode.match(shareCodeNotMatchRegexp)) {
          log.error(`不可能的shareCode => ${shareCode}`);
          logCallBack({
            status: false,
            msg: [
              `正则: 内置的shareCodeNotMatchRegexpList`,
              "作用: 使用该正则判断提取到的shareCode是否正确",
              `结果: true 该shareCode不是正确的`
            ]
          });
          return;
        }
      }
      shareCode = decodeURI(shareCode);
      logCallBack({
        status: true,
        msg: ["对shareCode进行解码: " + shareCode]
      });
      if (NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodes.value && utils.isSameChars(
        shareCode,
        NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodesCoefficient.value
      )) {
        logCallBack({
          status: false,
          msg: ["已开启【排除分享码】且该分享码命中该规则"]
        });
        return;
      }
      if (shareCode.endsWith("http") || shareCode.endsWith("https")) {
        logCallBack({
          status: false,
          msg: ["该分享码以http|https结尾"]
        });
        return;
      }
      logCallBack({
        status: true,
        msg: "处理完毕的shareCode: " + shareCode
      });
      return shareCode;
    },
    /**
     * 对传入的url进行处理，返回accessCode
     * @param {string} matchText 正在进行匹配的文本
     * @param {NetDiskRegularOption} regular 当前执行的规则
     * @param {(logData: NetDiskDebugLogData)=>void} logCallBack 日志回调
     */
    handleAccessCode(matchText, regular, logCallBack) {
      var _a2;
      let accessCode = "";
      if (!regular.checkAccessCode) {
        logCallBack({
          status: true,
          msg: "因未配置规则checkAccessCode，默认accessCode的值为空"
        });
        return "";
      }
      let accessCodeMatch = matchText.match(regular.checkAccessCode);
      logCallBack({
        status: true,
        msg: [
          `正则: checkAccessCode`,
          "作用: 用来判断link_innerText或者link_innerHTML匹配到的字符串中是否存在密码",
          `结果: `,
          JSON.stringify(accessCodeMatch)
        ]
      });
      if (accessCodeMatch) {
        let accessCodeMatchValue = accessCodeMatch[accessCodeMatch.length - 1];
        logCallBack({
          status: true,
          msg: "取最后一个值: " + accessCodeMatchValue
        });
        let accessCodeMatchArray = (_a2 = accessCodeMatchValue.match(regular.accessCode)) == null ? void 0 : _a2.filter((item) => utils.isNotNull(item));
        logCallBack({
          status: true,
          msg: [
            `正则: accessCode`,
            "作用: 用来提取link_innerText或者link_innerHTML匹配到的字符串中的密码",
            `结果: `,
            JSON.stringify(accessCodeMatchArray)
          ]
        });
        if (utils.isNull(accessCodeMatchArray)) {
          logCallBack({
            status: true,
            msg: "因↑匹配到的结果为空，默认accessCode的值为空"
          });
          return "";
        }
        if (accessCodeMatchArray.length) {
          accessCode = accessCodeMatchArray[0];
          logCallBack({
            status: true,
            msg: "取第一个值: " + accessCode
          });
          if (accessCode.startsWith("http")) {
            logCallBack({
              status: true,
              msg: "排除不可能的accessCode，重置accessCode的值为空"
            });
            accessCode = "";
          }
        }
      }
      if (utils.isNotNull(accessCode)) {
        for (const accessCodeNotMatchRegexp of NetDisk.accessCodeNotMatchRegexpList) {
          if (accessCode.match(accessCodeNotMatchRegexp)) {
            accessCode = "";
            logCallBack({
              status: true,
              msg: [
                `正则: 内置的accessCodeNotMatchRegexpList`,
                "作用: 使用该正则判断提取到的accessCode是否正确",
                `结果: true 重置accessCode为空`
              ]
            });
            break;
          }
        }
        if (regular.acceesCodeNotMatch && accessCode.match(regular.acceesCodeNotMatch)) {
          accessCode = "";
          logCallBack({
            status: true,
            msg: [
              `正则: acceesCodeNotMatch`,
              "作用: 用于判断提取到的accessCode是否是错误的accessCode",
              `结果: true 重置accessCode为空`
            ]
          });
        }
      }
      logCallBack({
        status: true,
        msg: "处理完毕的accessCode: " + accessCode
      });
      return accessCode;
    },
    /**
     * 获取在弹窗中显示出的链接
     * @param {string} matchText 匹配到的文本
     * @param {NetDiskRegularOption} regular 当前执行的规则
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     * @param {(logData: NetDiskDebugLogData)=>void} logCallBack 日志回调
     */
    handleLinkShow(matchText, regular, shareCode, accessCode, logCallBack) {
      let uiLink = NetDiskRuleUtils.replaceParam(regular["uiLinkShow"], {
        shareCode
      });
      logCallBack({
        status: true,
        msg: [
          `正则: uiLinkShow`,
          "作用: 用于显示在弹窗中的字符串",
          "备注: 对shareCode进行参数替换",
          `结果: ${uiLink}`
        ]
      });
      if (accessCode && accessCode != "") {
        uiLink = NetDiskRuleUtils.replaceParam(uiLink, {
          accessCode
        });
        logCallBack({
          status: true,
          msg: [
            `正则: uiLinkShow`,
            "作用: 用于显示在弹窗中的字符串",
            "备注: 对accessCode进行参数替换",
            `结果: ${uiLink}`
          ]
        });
      } else {
        uiLink = uiLink.replace(NetDisk.noAccessCodeRegExp, "");
        logCallBack({
          status: true,
          msg: [
            `正则: 内置的noAccessCodeRegExp`,
            "作用: 因accessCode为空，使用该正则去除不需要的字符串",
            `结果: ${uiLink}`
          ]
        });
      }
      if (regular.paramMatch) {
        if (utils.isNotNull(matchText)) {
          let paramMatchArray = matchText.match(regular.paramMatch);
          let replaceParamData = {};
          if (paramMatchArray) {
            for (let index = 0; index < paramMatchArray.length; index++) {
              replaceParamData[`$${index}`] = paramMatchArray[index];
            }
          }
          uiLink = NetDiskRuleUtils.replaceParam(uiLink, replaceParamData);
          logCallBack({
            status: true,
            msg: [
              `正则: paramMatch`,
              `作用: 用于对matchText进行提取需要的关键内容，替换关键字：{#$1#}、{#$2#}...`,
              `参数: ` + JSON.stringify(replaceParamData, void 0, 4),
              `结果: ${uiLink}`
            ]
          });
        }
      }
      logCallBack({
        status: true,
        msg: "处理完毕的uiLink: " + uiLink
      });
      return uiLink;
    },
    /**
     * 获取新标签页打开的URL
     * @param {string} matchText 匹配到的文本
     * @param {NetDiskRegularOption} regular 当前执行的规则
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     * @param {(logData: NetDiskDebugLogData)=>void} logCallBack 日志回调
     */
    handleBlank(matchText, regular, shareCode, accessCode, logCallBack) {
      let blankUrl = NetDiskRuleUtils.replaceParam(regular["blank"], {
        shareCode
      });
      logCallBack({
        status: true,
        msg: [
          `正则: blank`,
          "作用: 用于点击跳转的链接",
          "备注: 对shareCode进行参数替换",
          `结果: ${blankUrl}`
        ]
      });
      if (accessCode && accessCode != "") {
        blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, {
          accessCode
        });
        logCallBack({
          status: true,
          msg: [
            `正则: blank`,
            "作用: 用于点击跳转的链接",
            "备注: 对accessCode进行参数替换",
            `结果: ${blankUrl}`
          ]
        });
      } else {
        blankUrl = blankUrl.replace(NetDisk.noAccessCodeRegExp, "");
        logCallBack({
          status: true,
          msg: [
            `正则: 内置的noAccessCodeRegExp`,
            "作用: 因accessCode为空，使用该正则去除不需要的字符串",
            `结果: ${blankUrl}`
          ]
        });
      }
      if (regular.paramMatch) {
        if (utils.isNotNull(matchText)) {
          let paramMatchArray = matchText.match(regular.paramMatch);
          let replaceParamData = {};
          if (paramMatchArray) {
            for (let index = 0; index < paramMatchArray.length; index++) {
              replaceParamData[`$${index}`] = paramMatchArray[index];
            }
          }
          blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, replaceParamData);
          logCallBack({
            status: true,
            msg: [
              `正则: paramMatch`,
              `作用: 用于对matchText进行提取需要的关键内容，替换关键字：{#$1#}、{#$2#}...`,
              `参数: ` + JSON.stringify(replaceParamData, void 0, 4),
              `结果: ${blankUrl}`
            ]
          });
        }
      }
      logCallBack({
        status: true,
        msg: "处理完毕的blank: " + blankUrl
      });
      return blankUrl;
    },
    /**
     * 获取复制到剪贴板的字符串
     * @param {string} matchText 匹配到的文本
     * @param {NetDiskRegularOption} regular 当前执行的规则
     * @param {string} shareCode 分享码
     * @param {string} accessCode 访问码
     * @param {(logData: NetDiskDebugLogData)=>void} logCallBack 日志回调
     */
    handleCopyUrl(matchText, regular, shareCode, accessCode, logCallBack) {
      let copyUrl = NetDiskRuleUtils.replaceParam(regular["copyUrl"], {
        shareCode
      });
      logCallBack({
        status: true,
        msg: [
          `正则: copyUrl`,
          "作用: 用于复制到剪贴板的链接",
          "备注: 对shareCode进行参数替换",
          `结果: ${copyUrl}`
        ]
      });
      if (accessCode && accessCode != "") {
        copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, {
          accessCode
        });
        logCallBack({
          status: true,
          msg: [
            `正则: copyUrl`,
            "作用: 用于复制到剪贴板的链接",
            "备注: 对accessCode进行参数替换",
            `结果: ${copyUrl}`
          ]
        });
      } else {
        copyUrl = copyUrl.replace(NetDisk.noAccessCodeRegExp, "");
        logCallBack({
          status: true,
          msg: [
            `正则: 内置的noAccessCodeRegExp`,
            "作用: 因accessCode为空，使用该正则去除不需要的字符串",
            `结果: ${copyUrl}`
          ]
        });
      }
      if (regular.paramMatch) {
        if (utils.isNotNull(matchText)) {
          let paramMatchArray = matchText.match(regular.paramMatch);
          let replaceParamData = {};
          if (paramMatchArray) {
            for (let index = 0; index < paramMatchArray.length; index++) {
              replaceParamData[`$${index}`] = paramMatchArray[index];
            }
          }
          copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, replaceParamData);
          logCallBack({
            status: true,
            msg: [
              `正则: paramMatch`,
              `作用: 用于对matchText进行提取需要的关键内容，替换关键字：{#$1#}、{#$2#}...`,
              `参数: ` + JSON.stringify(replaceParamData, void 0, 4),
              `结果: ${copyUrl}`
            ]
          });
        }
      }
      logCallBack({
        status: true,
        msg: "处理完毕的copyUrl: " + copyUrl
      });
      return copyUrl;
    }
  };
  const CommonUtils = {
    /**
     * 添加屏蔽CSS
     * @param args
     * @example
     * addBlockCSS("")
     * addBlockCSS("","")
     * addBlockCSS(["",""])
     */
    addBlockCSS(...args) {
      let selectorList = [];
      if (args.length === 0) {
        return;
      }
      if (args.length === 1 && typeof args[0] === "string" && args[0].trim() === "") {
        return;
      }
      args.forEach((selector) => {
        if (Array.isArray(selector)) {
          selectorList = selectorList.concat(selector);
        } else {
          selectorList.push(selector);
        }
      });
      return addStyle(`${selectorList.join(",\n")}{display: none !important;}`);
    },
    /**
     * 设置GM_getResourceText的style内容
     * @param resourceMapData 资源数据
     */
    setGMResourceCSS(resourceMapData) {
      let cssText = typeof _GM_getResourceText === "function" ? _GM_getResourceText(resourceMapData.keyName) : "";
      if (typeof cssText === "string" && cssText) {
        addStyle(cssText);
      } else {
        CommonUtils.addLinkNode(resourceMapData.url);
      }
    },
    /**
     * 添加<link>标签
     * @param url
     */
    async addLinkNode(url) {
      let $link = document.createElement("link");
      $link.rel = "stylesheet";
      $link.type = "text/css";
      $link.href = url;
      domUtils.ready(() => {
        document.head.appendChild($link);
      });
      return $link;
    },
    /**
     * 将url修复，例如只有search的链接/sss/xxx?sss=xxxx
     * @param url 需要修复的链接
     */
    fixUrl(url) {
      url = url.trim();
      if (url.match(/^http(s|):\/\//i)) {
        return url;
      } else {
        if (!url.startsWith("/")) {
          url += "/";
        }
        url = window.location.origin + url;
        return url;
      }
    },
    /**
     * 获取剪贴板文本
     */
    async getClipboardText() {
      function readClipboardText(resolve) {
        navigator.clipboard.readText().then((clipboardText) => {
          resolve(clipboardText);
        }).catch((error) => {
          log.error(["读取剪贴板内容失败👉", error]);
          resolve("");
        });
      }
      function requestPermissionsWithClipboard(resolve) {
        navigator.permissions.query({
          // @ts-ignore
          name: "clipboard-read"
        }).then((permissionStatus) => {
          readClipboardText(resolve);
        }).catch((error) => {
          log.error([
            "申请剪贴板权限失败，尝试直接读取👉",
            error.message ?? error.name ?? error.stack
          ]);
          readClipboardText(resolve);
        });
      }
      function checkClipboardApi() {
        var _a2, _b;
        if (typeof ((_a2 = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a2.readText) !== "function") {
          return false;
        }
        if (typeof ((_b = navigator == null ? void 0 : navigator.permissions) == null ? void 0 : _b.query) !== "function") {
          return false;
        }
        return true;
      }
      return new Promise((resolve) => {
        if (!checkClipboardApi()) {
          resolve("");
          return;
        }
        if (document.hasFocus()) {
          requestPermissionsWithClipboard(resolve);
        } else {
          window.addEventListener(
            "focus",
            () => {
              requestPermissionsWithClipboard(resolve);
            },
            {
              once: true
            }
          );
        }
      });
    }
  };
  const NetDiskWorkerUtils = {
    /**
     * 检索目标元素内所有可访问的ShadowRoot的所有节点的信息
     */
    depthQueryShadowRootAllNode($target) {
      let result = [];
      function queryShadowRoot($ele) {
        let $queryChildNodeList = Array.from($ele.querySelectorAll("*"));
        $queryChildNodeList.forEach(($childNode) => {
          if ($childNode.classList && $childNode.classList.contains("pops-shadow-container")) {
            return;
          }
          let $childNodeShadowRoot = $childNode.shadowRoot;
          if ($childNodeShadowRoot && $childNodeShadowRoot instanceof ShadowRoot) {
            result.push({
              shadowRoot: $childNodeShadowRoot,
              childNode: queryShadowRoot($childNodeShadowRoot)
            });
          }
        });
        return $queryChildNodeList;
      }
      queryShadowRoot($target);
      return result;
    },
    /**
     * 删除某些需要忽略的text或html，如：设置、直链弹窗
     * @param text 需要进行处理的字符串
     * @param isHTML 是否是html属性
     */
    ignoreStrRemove(text, isHTML = false) {
      let ignoreNodeList = [];
      if (ignoreNodeList.length) {
        ignoreNodeList.forEach(($ignore) => {
          if ($ignore == void 0) {
            return;
          }
          if (isHTML) {
            if ($ignore.innerHTML != void 0) {
              text = text.replaceAll($ignore.innerHTML, "");
            }
          } else {
            let text2 = $ignore.innerText || $ignore.textContent;
            if (text2 != void 0) {
              text2 = text2.replaceAll(text2, "");
            }
          }
        });
      }
      return text;
    },
    /**
     * 获取页面上所有文本
     * @param target 目标元素
     * @param isCheckShadowRoot 是否检索ShadowRoot
     */
    getPageText(target = document.documentElement, isCheckShadowRoot) {
      let strList = [];
      strList.push(target.innerText || target.textContent || "");
      if (isCheckShadowRoot) {
        let queryShadowRootAllNodeInfo = this.depthQueryShadowRootAllNode(target);
        if (queryShadowRootAllNodeInfo.length) {
          queryShadowRootAllNodeInfo.forEach((queryShadowRootInfo) => {
            let shadowRootText = queryShadowRootInfo.shadowRoot.textContent;
            if (shadowRootText) {
              strList.push(shadowRootText);
            }
          });
        }
      }
      return strList;
    },
    /**
     * 获取页面上所有超文本
     * @param target 目标元素
     * @param isCheckShadowRoot 是否检索ShadowRoot
     */
    getPageHTML(target = document.documentElement, isCheckShadowRoot) {
      let strList = [];
      strList.push(target.innerHTML);
      if (isCheckShadowRoot) {
        let queryShadowRootAllNodeInfo = this.depthQueryShadowRootAllNode(target);
        if (queryShadowRootAllNodeInfo.length) {
          queryShadowRootAllNodeInfo.forEach((queryShadowRootInfo) => {
            let shadowRootHTML = queryShadowRootInfo.shadowRoot.innerHTML;
            strList.push(shadowRootHTML);
          });
        }
      }
      return strList;
    },
    /**
     * 获取页面上所有input的值
     * @param target 目标元素
     * @param isCheckShadowRoot 是否检索ShadowRoot
     */
    getInputElementValue(target = document.documentElement, isCheckShadowRoot) {
      let result = [];
      Array.from(target.querySelectorAll("input")).forEach(($input) => {
        result.push($input.value);
      });
      if (isCheckShadowRoot) {
        let queryShadowRootAllNodeInfo = this.depthQueryShadowRootAllNode(target);
        if (queryShadowRootAllNodeInfo.length) {
          queryShadowRootAllNodeInfo.forEach((queryShadowRootInfo) => {
            for (let index = 0; index < queryShadowRootInfo.childNode.length; index++) {
              const $childNode = queryShadowRootInfo.childNode[index];
              if ($childNode instanceof HTMLInputElement) {
                result.push($childNode.value);
              }
            }
          });
        }
      }
      return result;
    },
    /**
     * 获取页面上所有textarea的值
     * @param target 目标元素
     * @param isCheckShadowRoot 是否检索ShadowRoot
     */
    getTextAreaElementValue(target = document.documentElement, isCheckShadowRoot) {
      let result = [];
      Array.from(target.querySelectorAll("textarea")).forEach(($textarea) => {
        result.push($textarea.value);
      });
      if (isCheckShadowRoot) {
        let queryShadowRootAllNodeInfo = this.depthQueryShadowRootAllNode(target);
        if (queryShadowRootAllNodeInfo.length) {
          queryShadowRootAllNodeInfo.forEach((queryShadowRootInfo) => {
            for (let index = 0; index < queryShadowRootInfo.childNode.length; index++) {
              const $childNode = queryShadowRootInfo.childNode[index];
              if ($childNode instanceof HTMLTextAreaElement) {
                result.push($childNode.value);
              }
            }
          });
        }
      }
      return result;
    }
  };
  const NetDiskWorker = {
    /** 是否正在匹配中 */
    isHandleMatch: false,
    /** 触发匹配，但是处于匹配中，计数器保存匹配数，等待完成匹配后再执行一次匹配 */
    delayNotMatchCount: 0,
    /** 主动触发监听DOM变化的事件 */
    dispatchMonitorDOMChange: false,
    /** worker的Blob链接 */
    blobUrl: "",
    /** worker对象 */
    GM_matchWorker: void 0,
    init() {
      this.initWorkerBlobLink();
      this.initWorker();
      this.monitorDOMChange();
    },
    /** 初始化Worker的Blob链接 */
    initWorkerBlobLink() {
      const handleMatch = (
        /*js*/
        `
        (() => {
            function ${NetDiskWorker.handleRegularMatch.toString()}

            function ${NetDiskWorker.uniqueArr}
            
            this.addEventListener(
            "message",
            function (event) {
                const data = event.data;
                let matchedList = [];
                ${NetDiskWorker.handleRegularMatch.name}(data,(matchData)=>{
                	matchedList.push(matchData);
                })
                matchedList = ${NetDiskWorker.uniqueArr.name}(matchedList);
                this.postMessage({
					options: data,
					msg: "Match End",
					data: matchedList,
					startTime: data.startTime,
					endTime: Date.now(),
                });
            },
            {
                capture: true,
            }
            );
        })();
  		`
      );
      let blob = new Blob([handleMatch]);
      NetDiskWorker.blobUrl = window.URL.createObjectURL(blob);
      log.info(`Worker Blob Link ===> ${NetDiskWorker.blobUrl}`);
    },
    /**
     * 处理规则匹配
     * @param data 数据
     * @param callback 成功匹配到的回调
     */
    handleRegularMatch(data, callback) {
      const NetDiskRegularNameList = Object.keys(data.regular);
      for (const netDiskName of NetDiskRegularNameList) {
        const netDiskRegular = data.regular[netDiskName];
        for (let index = 0; index < netDiskRegular.length; index++) {
          const netDiskRegularItem = netDiskRegular[index];
          if (netDiskRegularItem["enable"] != null && !netDiskRegularItem["enable"]) {
            continue;
          }
          let matchRegExpList = [];
          if (data.matchTextRange.includes("innerText")) {
            matchRegExpList.push(
              new RegExp(netDiskRegularItem["link_innerText"], "gi")
            );
          }
          if (data.matchTextRange.includes("innerHTML")) {
            matchRegExpList.push(
              new RegExp(netDiskRegularItem["link_innerHTML"], "gi")
            );
          }
          if (!data.matchTextRange.length) {
            console.error(data);
            throw new TypeError("未设置匹配范围");
          }
          if (!matchRegExpList.length) {
            throw new TypeError("未知的匹配范围: " + data.matchTextRange);
          }
          for (let matchRegExpIndex = 0; matchRegExpIndex < matchRegExpList.length; matchRegExpIndex++) {
            const matchRegExp = matchRegExpList[matchRegExpIndex];
            for (let textIndex = 0; textIndex < data.textList.length; textIndex++) {
              const text = data.textList[textIndex];
              let matchData = text.match(matchRegExp);
              if (matchData && matchData.length) {
                callback({
                  netDiskName,
                  netDiskIndex: index,
                  data: matchData
                });
              }
            }
          }
        }
      }
    },
    /**
     * 数组去重
     * @param arr 待去重的数组
     */
    uniqueArr(arr) {
      return arr.filter((obj, index, selfArray) => {
        return index === selfArray.findIndex((item) => {
          return JSON.stringify(item) === JSON.stringify(obj);
        });
      });
    },
    /**
     * 初始化Worker对象
     */
    initWorker() {
      try {
        NetDiskWorker.GM_matchWorker = new Worker(NetDiskWorker.blobUrl);
        NetDiskWorker.GM_matchWorker.onmessage = NetDiskWorker.onMessage;
        NetDiskWorker.GM_matchWorker.onerror = NetDiskWorker.onError;
      } catch (error) {
        log.error([
          "初始化Worker失败，可能页面使用了Content-Security-Policy策略，使用另类方法",
          error.message
        ]);
        NetDiskWorker.GM_matchWorker = {
          postMessage(data) {
            return new Promise((resolve, reject) => {
              let matchedList = [];
              try {
                NetDiskWorker.handleRegularMatch(data, (matchData) => {
                  matchedList.push(matchData);
                });
              } catch (error2) {
                NetDiskWorker.onError(error2);
              } finally {
                matchedList = NetDiskWorker.uniqueArr(matchedList);
                NetDiskWorker.onMessage(
                  new MessageEvent("message", {
                    data: {
                      options: data,
                      msg: "Match End",
                      data: matchedList,
                      startTime: data.startTime,
                      endTime: Date.now()
                    }
                  })
                );
                resolve(null);
              }
            });
          }
        };
      }
    },
    /**
     * 传递数据给worker内进行处理匹配
     * @param message 数据
     * @param options 配置
     */
    postMessage(message, options) {
      NetDiskWorker.GM_matchWorker.postMessage(message, options);
    },
    /**
     * Worker的onmessage
     * 这里的this指向会被修改
     * @param event
     */
    onMessage(event) {
      const data = event.data;
      if (data.data.length) {
        log.success(
          `成功匹配${data.data.length}个，用时${Date.now() - data.startTime}ms`
        );
      }
      if (data.options.from === "PasteText") {
        NetDiskUI.matchPasteText.workerMatchEndCallBack(data);
      }
      if (data.options.from.startsWith("FirstLoad")) {
        NetDiskWorker.delayNotMatchCount++;
      }
      NetDiskWorker.successCallBack(data);
    },
    /**
     * Worker的onerror
     * @param error
     */
    onError(error) {
      NetDiskWorker.errorCallBack(error);
    },
    /**
     * worker处理文件匹配后的回调
     * @param options
     */
    successCallBack(options) {
      if (!options.data.length) {
        NetDiskWorker.matchingEndCallBack();
        return;
      }
      const handleNetDiskList = [];
      for (const matchData of options.data) {
        NetDisk.matchLink.add(matchData.netDiskName);
        let matchLinkSet = /* @__PURE__ */ new Set();
        matchData.data.forEach((item) => {
          matchLinkSet.add(item);
        });
        matchLinkSet.forEach((item) => {
          let handleLink = NetDisk.handleLink(
            matchData.netDiskName,
            matchData.netDiskIndex,
            item
          );
          if (handleLink) {
            handleNetDiskList.push({
              shareCode: handleLink.shareCode,
              accessCode: handleLink.accessCode,
              netDiskName: matchData.netDiskName,
              netDiskIndex: matchData.netDiskIndex,
              matchText: item
            });
          }
        });
      }
      let filterHandleNetDiskList = handleNetDiskList.filter(
        (value, index, selfArray) => {
          let isFind = selfArray.findIndex((obj) => {
            return (
              //JSON.stringify(obj) === JSON.stringify(value)
              obj.accessCode === value.accessCode && obj.netDiskIndex === value.netDiskIndex && obj.netDiskName === value.netDiskName && obj.shareCode === value.shareCode
            );
          }) === index;
          return isFind;
        }
      );
      filterHandleNetDiskList.forEach((item) => {
        if (NetDisk.tempLinkDict.has(item.netDiskName)) {
          let currentTempDict = NetDisk.tempLinkDict.get(item.netDiskName);
          currentTempDict.set(item.shareCode, item);
        }
      });
      filterHandleNetDiskList.forEach((item) => {
        const { shareCode, accessCode, netDiskName, netDiskIndex, matchText } = item;
        const currentRegular = NetDisk.regular[netDiskName][netDiskIndex];
        if (currentRegular.shareCodeExcludeRegular && Array.isArray(currentRegular.shareCodeExcludeRegular)) {
          for (const excludeRegularName of currentRegular.shareCodeExcludeRegular) {
            let excludeDict = NetDisk.linkDict.get(excludeRegularName);
            let currentTempDict = NetDisk.tempLinkDict.get(excludeRegularName);
            if (excludeDict.startsWith(shareCode) || currentTempDict.startsWith(shareCode)) {
              log.warn(
                `${netDiskName}：该分享码【${shareCode}】与已匹配到该分享码的规则【${excludeRegularName}】冲突`
              );
              return;
            }
          }
        }
        const currentDict = NetDisk.linkDict.get(netDiskName);
        NetDisk.hasMatchLink = true;
        if (currentDict.startsWith(shareCode)) {
          let shareCodeDict = currentDict.getStartsWith(shareCode);
          if (typeof shareCodeDict.isForceAccessCode === "boolean" && shareCodeDict.isForceAccessCode) {
            return;
          }
          if (utils.isNotNull(shareCodeDict.accessCode)) {
            return;
          }
          if (utils.isNull(accessCode)) {
            return;
          }
          currentDict.set(
            shareCode,
            NetDisk.getLinkDickObj(accessCode, netDiskIndex, false, matchText)
          );
          NetDiskUI.view.changeLinkView(
            netDiskName,
            netDiskIndex,
            shareCode,
            accessCode,
            matchText
          );
          log.info(
            `该匹配项无密码，设置密码 ${netDiskName} ${netDiskIndex}: ${shareCode}  ===> ${accessCode}`
          );
        } else {
          currentDict.set(
            shareCode,
            NetDisk.getLinkDickObj(accessCode, netDiskIndex, false, matchText)
          );
          NetDiskUI.isMatchedNetDiskIconMap.add(netDiskName);
          NetDiskUI.view.addLinkView(
            netDiskName,
            netDiskIndex,
            shareCode,
            accessCode,
            matchText
          );
          log.success(
            `添加链接 ${netDiskName} ${netDiskIndex}: ${shareCode}  ===> ${accessCode}`
          );
        }
      });
      Object.keys(NetDisk.tempLinkDict.getItems()).forEach((keyName) => {
        NetDisk.tempLinkDict.get(keyName).clear();
      });
      if (NetDisk.hasMatchLink) {
        switch (NetDiskConfig.function["netdisk-behavior-mode"].value) {
          case "suspension_smallwindow".toLowerCase():
            if (NetDiskSuspensionConfig.mode.current_suspension_smallwindow_mode.value === "suspension") {
              NetDiskUI.suspension.show();
            } else {
              NetDiskUI.view.show();
            }
            break;
          case "suspension_window".toLowerCase():
            NetDiskUI.suspension.show();
            break;
          case "smallwindow".toLowerCase():
            NetDiskUI.view.show();
            break;
          default:
            log.error([
              "未知的行为模式：" + NetDiskConfig.function["netdisk-behavior-mode"].value
            ]);
        }
      }
      NetDiskWorker.matchingEndCallBack();
    },
    /**
     * Worker失败回调
     * @param error
     */
    errorCallBack(error) {
      NetDiskWorker.matchingEndCallBack(true);
      log.error(["Worker Error", error]);
    },
    /**
     * 匹配结束回调
     * @param isNow 是否立刻释放锁
     */
    matchingEndCallBack(isNow) {
      if (isNow) {
        NetDiskWorker.isHandleMatch = false;
        if (NetDiskWorker.delayNotMatchCount > 0) {
          NetDiskWorker.delayNotMatchCount = 0;
          NetDiskWorker.dispatchMonitorDOMChange = true;
        }
      } else {
        const delaytime = parseFloat(NetDiskConfig.match.delaytime.value.toString()) * 1e3;
        setTimeout(() => {
          NetDiskWorker.matchingEndCallBack(true);
        }, delaytime);
      }
    },
    /**
     * 监听页面节点内容或节点文本的变动，从而进行匹配网盘链接
     */
    monitorDOMChange() {
      const isAddedNodeToMatch = NetDiskConfig.match.isAddedNodesToMatch.value;
      const readClipboard = NetDiskConfig.match.readClipboard.value;
      const matchRange = NetDiskConfig.match.pageMatchRange.value;
      let isFirstLoad = true;
      let isFirstLoadPageText = true;
      let isFirstLoadPageHTML = true;
      let depthAcquisitionWithShadowRoot = NetDiskConfig.match.depthQueryWithShadowRoot.value;
      async function observeEvent(mutations) {
        if (NetDiskWorker.isHandleMatch) {
          NetDiskWorker.delayNotMatchCount++;
          return;
        }
        if (isAddedNodeToMatch && mutations && mutations.length) {
          let hasAddedNode = false;
          for (let index = 0; index < mutations.length; index++) {
            const mutation = mutations[index];
            if (mutation.addedNodes && mutation.addedNodes instanceof NodeList) {
              if (mutation.addedNodes.length) {
                hasAddedNode = true;
                break;
              }
            }
          }
          if (!hasAddedNode) {
            return;
          }
        }
        NetDiskWorker.isHandleMatch = true;
        const startTime = Date.now();
        if (readClipboard) {
          try {
            NetDisk.clipboardText = await CommonUtils.getClipboardText();
          } catch (error) {
          }
        }
        if (typeof NetDisk.clipboardText !== "string") {
          NetDisk.clipboardText = "";
        }
        const textListToBeMatched = [];
        if (NetDisk.clipboardText.trim() !== "") {
          textListToBeMatched.push(NetDisk.clipboardText);
        }
        if (NetDiskConfig.match.allowMatchLocationHref) {
          textListToBeMatched.push(NetDiskRuleUtils.getDecodeComponentUrl());
        }
        if (NetDiskConfig.match.toBeMatchedWithInputElementValue) {
          textListToBeMatched.push(
            ...NetDiskWorkerUtils.getInputElementValue(
              document.documentElement,
              depthAcquisitionWithShadowRoot
            )
          );
        }
        if (NetDiskConfig.match.toBeMatchedTextAreaElementValue) {
          textListToBeMatched.push(
            ...NetDiskWorkerUtils.getTextAreaElementValue(
              document.documentElement,
              depthAcquisitionWithShadowRoot
            )
          );
        }
        if (isFirstLoad) {
          isFirstLoad = false;
          if (textListToBeMatched.length) {
            NetDiskWorker.postMessage({
              textList: textListToBeMatched,
              matchTextRange: matchRange,
              regular: NetDisk.regular,
              startTime,
              from: "FirstLoad-DOMChange"
            });
            return;
          }
        }
        if (matchRange.includes("innerText")) {
          let pageText = NetDiskWorkerUtils.getPageHTML(
            document.documentElement,
            depthAcquisitionWithShadowRoot
          );
          textListToBeMatched.push(...pageText);
          if (isFirstLoadPageText) {
            isFirstLoadPageText = false;
            NetDiskWorker.postMessage({
              textList: textListToBeMatched,
              matchTextRange: matchRange,
              regular: NetDisk.regular,
              startTime,
              from: "FirstLoad-Text-DOMChange"
            });
            return;
          }
        }
        if (matchRange.includes("innerHTML")) {
          let pageHTML = NetDiskWorkerUtils.getPageHTML(
            document.documentElement,
            depthAcquisitionWithShadowRoot
          );
          textListToBeMatched.push(...pageHTML);
          if (isFirstLoadPageHTML) {
            isFirstLoadPageHTML = false;
            NetDiskWorker.postMessage({
              textList: textListToBeMatched,
              matchTextRange: matchRange,
              regular: NetDisk.regular,
              startTime,
              from: "FirstLoad-HTML-DOMChange"
            });
            return;
          }
        }
        NetDiskWorker.postMessage({
          textList: textListToBeMatched,
          matchTextRange: matchRange,
          regular: NetDisk.regular,
          startTime,
          from: "DOMChange"
        });
      }
      utils.mutationObserver(document.documentElement, {
        callback: observeEvent,
        config: {
          /* 子节点的变动（新增、删除或者更改） */
          childList: NetDiskConfig.match["mutationObserver-childList"].value,
          /* 节点内容或节点文本的变动 */
          characterData: NetDiskConfig.match["mutationObserver-characterData"].value,
          /* 是否将观察器应用于该节点的所有后代节点 */
          subtree: NetDiskConfig.match["mutationObserver-subtree"].value
        }
      });
      let dispatchMonitorDOMChange = NetDiskWorker.dispatchMonitorDOMChange;
      Object.defineProperty(NetDiskWorker, "dispatchMonitorDOMChange", {
        set: function(value) {
          dispatchMonitorDOMChange = value;
          if (value) {
            observeEvent([
              {
                // @ts-ignore
                addedNodes: [document.documentElement]
              }
            ]);
          }
        },
        get: function() {
          return dispatchMonitorDOMChange;
        }
      });
      this.dispatchMonitorDOMChange = true;
    }
  };
  const NetDiskUserRuleDebug = {
    $el: {
      $select: null,
      $log: null,
      $matchText: null,
      $button: null
    },
    /**
     * 重置环境变量
     */
    reset() {
      Object.keys(this.$el).forEach((keyName) => {
        Reflect.deleteProperty(this.$el, keyName);
      });
    },
    /**
     * 设置日志输出
     * @param {"info"|"error"|"success"|"warn"} tag 日志等级
     * @param {...any[]} args
     */
    setLog(tag, ...args) {
      let text = "";
      args.forEach((item) => {
        if (text !== "") {
          text += "\n";
        }
        if (typeof item !== "string") {
          text += JSON.stringify(item, void 0, 4);
        } else {
          text += item;
        }
      });
      let logElement = domUtils.createElement(
        "p",
        {
          innerText: text
        },
        {
          "data-tag": tag
        }
      );
      domUtils.append(this.$el.$log, logElement);
    },
    /**
     * 清空日志
     */
    clearLog() {
      this.$el.$log.innerHTML = "";
    },
    /**
     * 显示调试规则的界面
     * @param ruleJSON
     */
    showUI(ruleJSON) {
      this.reset();
      if (utils.isNull(ruleJSON.regexp)) {
        Qmsg.error("请先配置regexp");
        return;
      }
      let that = this;
      let customRule = NetDiskUserRule.parseRule([ruleJSON]);
      let regexp = customRule[0].rule;
      let dialog = NetDiskPops.confirm(
        {
          title: {
            text: `调试规则 ${ruleJSON.key}`,
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `
                    <div class="custom-rule-container">
                        <textarea class="custom-rule-match-text" placeholder="请输入需要测试匹配的字符串"></textarea>
                        <div class="custom-rule-input-container">
                        <select class="custom-rule-select-regexp"></select>
                        <button class="custom-rule-run-match-button" type="primary" data-icon="" data-righticon="false">
                            <span>执行</span>
                        </button>
                        </div>
                    </div>
                    <div class="custom-rule-match-log">
                        <div>匹配日志↓</div>
                        <div class="custom-rule-match-log-container"></div>
                    </div>
                    `
            ),
            html: true
          },
          btn: {
            ok: {
              enable: false
            }
          },
          style: (
            /*css*/
            `
                .custom-rule-container{
                    display: flex;
                    align-items: center;
                }
                .custom-rule-select-regexp{
                    width: 100%;
                    height: 32px;
                    line-height: 32px;
                    border: 1px solid rgb(184, 184, 184, var(--pops-bd-opacity));
                    border-radius: 5px;
                    text-align: center;
                    outline: 0;
                    background: rgb(255, 255, 255, var(--pops-bg-opacity));
                    box-shadow: none;
                }
                .custom-rule-input-container{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: 5px;
                    width: 30%;
                }
                .custom-rule-select-regexp-item{

                }
                button.custom-rule-run-match-button{
                    margin-top: 5px;
                }
                textarea.custom-rule-match-text{
                    width: 100%;
                    min-height: 70px;
                    outline: none;
                    margin: 0px;
                    background-image: none;
                    background-color: transparent;
                    display: inline-block;
                    resize: vertical;
                    padding: 5px;
                    line-height: 1.5;
                    box-sizing: border-box;
                    border: 1px solid rgb(220, 223, 230);
                    appearance: none;
                }
                .custom-rule-match-log{

                }
                .custom-rule-match-log-container{
                    padding: 5px;
                    background: rgb(229, 229, 229);
                }
                .custom-rule-match-log-container p{
                    margin: 2px 0px;
                    border-bottom: 1px solid #000000;
                }
                .custom-rule-match-log-container p:last-child{
                    border-bottom: 0px;
                    margin-bottom: 0px;
                }
                .custom-rule-match-log-container p[data-tag]{
                
                }
                .custom-rule-match-log-container p[data-tag="info"]{

                }
                .custom-rule-match-log-container p[data-tag="success"]{
                    color: green;
                }
                .custom-rule-match-log-container p[data-tag="warn"]{
                    color: yellow;
                }
                .custom-rule-match-log-container p[data-tag="error"]{
                    color: red;
                }
                `
          )
        },
        NetDiskUI.popsStyle.customRuleDebugView
      );
      this.$el.$select = dialog.$shadowRoot.querySelector(
        ".custom-rule-select-regexp"
      );
      this.$el.$matchText = dialog.$shadowRoot.querySelector(
        ".custom-rule-match-text"
      );
      this.$el.$log = dialog.$shadowRoot.querySelector(
        ".custom-rule-match-log-container"
      );
      this.$el.$button = dialog.$shadowRoot.querySelector(
        ".custom-rule-run-match-button"
      );
      regexp.forEach((regExpItem, index) => {
        this.$el.$select.appendChild(
          domUtils.createElement("option", {
            className: "custom-rule-select-regexp-item",
            innerText: "regexp下标:" + index,
            "data-value": regExpItem
          })
        );
      });
      function logCallBack(logData) {
        if (Array.isArray(logData.msg)) {
          that.setLog(logData.status ? "info" : "error", ...logData.msg);
        } else {
          that.setLog(logData.status ? "info" : "error", logData.msg);
        }
        if (!logData.status) {
          that.setLog("error", "执行完毕");
        }
      }
      function debugRunClickEvent() {
        try {
          if (utils.isNull(that.$el.$matchText.value)) {
            Qmsg.error("请先输入待匹配的字符串");
            return;
          }
          that.clearLog();
          let netDiskName = ruleJSON.key;
          let netDiskIndex = that.$el.$select.selectedIndex;
          let selectRegularOption = that.$el.$select.selectedOptions[netDiskIndex]["data-value"];
          log.info(["当前选中的规则: ", selectRegularOption]);
          let testCustomRule = {};
          testCustomRule[ruleJSON.key] = [selectRegularOption];
          let matchTextList = [];
          NetDiskWorker.handleRegularMatch(
            {
              regular: testCustomRule,
              textList: [that.$el.$matchText.value],
              matchTextRange: ["innerText", "innerHTML"],
              startTime: Date.now(),
              from: "Debug"
            },
            (matchData) => {
              matchTextList.push(...matchData.data);
            }
          );
          if (!matchTextList.length) {
            that.setLog("error", "未成功匹配到数据");
            return;
          }
          matchTextList = NetDiskWorker.uniqueArr(matchTextList);
          that.setLog("info", "成功匹配到的数据 ==> ", matchTextList);
          matchTextList.forEach((matchText, index) => {
            that.setLog("success", "当前处理的字符串: " + matchText);
            that.setLog("success", "当前执行: 对shareCode进行处理获取");
            let shareCode = NetDiskDebug.handleShareCode(
              matchText,
              selectRegularOption,
              logCallBack
            );
            if (utils.isNull(shareCode)) {
              return;
            }
            that.setLog("info", " ");
            that.setLog("info", `================分割线================`);
            that.setLog("info", " ");
            that.setLog("success", "当前执行: 对accessCode进行处理获取");
            let accessCode = NetDiskDebug.handleAccessCode(
              matchText,
              selectRegularOption,
              logCallBack
            );
            that.setLog("info", " ");
            that.setLog("info", `================分割线================`);
            that.setLog("info", " ");
            that.setLog("success", "当前执行: 对uiLinkShow进行处理获取");
            let uiLinkShow = NetDiskDebug.handleLinkShow(
              matchText,
              selectRegularOption,
              shareCode,
              accessCode,
              logCallBack
            );
            that.setLog("info", " ");
            that.setLog("info", `================分割线================`);
            that.setLog("info", " ");
            that.setLog("success", "当前执行: 对blank进行处理获取");
            let blankUrl = NetDiskDebug.handleBlank(
              matchText,
              selectRegularOption,
              shareCode,
              accessCode,
              logCallBack
            );
            that.setLog("info", " ");
            that.setLog("info", `================分割线================`);
            that.setLog("info", " ");
            that.setLog("success", "当前执行: 对copyUrl进行处理获取");
            let copyUrl = NetDiskDebug.handleCopyUrl(
              matchText,
              selectRegularOption,
              shareCode,
              accessCode,
              logCallBack
            );
            that.setLog("success", "执行完毕");
          });
        } catch (error) {
          log.error(error);
          that.setLog(error.toString());
        }
      }
      domUtils.on(that.$el.$button, "click", void 0, debugRunClickEvent);
    }
  };
  const NetDiskUserRule = {
    key: "userRule",
    dataKey: "userRuleData",
    $data: {
      userRule: new utils.Dictionary()
    },
    /**
     * 初始化
     */
    init() {
      if (typeof _GM_getValue(this.dataKey) !== "object") {
        _GM_setValue(this.dataKey, {});
      }
      let userRule = this.parseRule(this.getAllRule());
      userRule.forEach((item) => {
        this.$data.userRule.set(item.setting.key, item);
      });
    },
    getCSS() {
      return (
        /*css*/
        `
        .pops[type-value=confirm] .pops-confirm-content{
            overflow: hidden;
        }
        /* textarea美化 */
        .pops.whitesevPopNetDiskCustomRules[type-value="confirm"] .pops-confirm-content textarea{
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding: 0;
            margin: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            background-image: none;
            background-color: transparent;

            display: inline-block;
            resize: vertical;
            padding: 5px 15px;
            line-height: 1.5;
            box-sizing: border-box;
            border: 1px solid #dcdfe6;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            appearance: none;
            resize: none;
        }
        /* 获得焦点 */
        .pops.whitesevPopNetDiskCustomRules[type-value="confirm"] .pops-confirm-content textarea:focus{
            outline: none;
            border-color: #3677f0;
        }
        /* 提示文字 */
        .pops.whitesevPopNetDiskCustomRules[type-value="confirm"] .pops-confirm-content textarea::placeholder {
            color: #c0c4cc;
        }
        /* 鼠标hover */
        .pops.whitesevPopNetDiskCustomRules[type-value="confirm"] .pops-confirm-content textarea:hover {
            border-color: #c0c4cc;
        }
          `
      );
    },
    /**
     * 把输入的规则字符串解析为规则对象
     */
    parseRuleStrToRule(ruleText) {
      function checkRegExp(ruleRegExp) {
        if (typeof ruleRegExp["link_innerText"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: link_innerText，类型: string"
          };
        }
        if (typeof ruleRegExp["link_innerHTML"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: link_innerHTML，类型: string"
          };
        }
        if (typeof ruleRegExp["shareCode"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: shareCode，类型: string"
          };
        }
        if (typeof ruleRegExp["shareCodeNeedRemoveStr"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: shareCodeNeedRemoveStr，类型: string"
          };
        }
        if (typeof ruleRegExp["uiLinkShow"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: uiLinkShow，类型: string"
          };
        }
        if (typeof ruleRegExp["blank"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: blank，类型: string"
          };
        }
        if (typeof ruleRegExp["copyUrl"] !== "string") {
          return {
            success: false,
            msg: "regexp缺失的键名: copyUrl，类型: string"
          };
        }
        if (typeof ruleRegExp["accessCode"] === "string" && typeof ruleRegExp["checkAccessCode"] !== "string") {
          return {
            success: false,
            msg: "regexp设置了accessCode但是没有设置checkAccessCode"
          };
        }
        if (typeof ruleRegExp["accessCode"] !== "string" && typeof ruleRegExp["checkAccessCode"] === "string") {
          return {
            success: false,
            msg: "regexp设置了checkAccessCode但是没有设置accessCode"
          };
        }
        return {
          success: true,
          msg: "校验rule成功"
        };
      }
      function checkSetting(ruleSetting) {
        if (typeof ruleSetting["name"] !== "string") {
          return {
            success: false,
            msg: "setting缺失的键名: name，类型: string"
          };
        }
        if (typeof ruleSetting["enable"] !== "boolean") {
          return {
            success: false,
            msg: "setting缺失的键名: enable，类型: boolean"
          };
        }
        return {
          success: true,
          msg: "校验setting成功"
        };
      }
      try {
        let ruleJSON = JSON.parse(ruleText);
        if (typeof ruleJSON !== "object") {
          return {
            success: false,
            msg: "该规则不是object类型"
          };
        }
        if (typeof ruleJSON["key"] !== "string") {
          return {
            success: false,
            msg: "缺失的键名: key，类型: string"
          };
        }
        if (typeof ruleJSON["regexp"] !== "object") {
          return {
            success: false,
            msg: "缺失的键名: regexp，类型: object|Arrany"
          };
        }
        if (typeof ruleJSON["setting"] !== "object") {
          return {
            success: false,
            msg: "缺失的键名: setting，类型: object"
          };
        }
        if (Array.isArray(ruleJSON["regexp"])) {
          for (const regexpItem of ruleJSON["regexp"]) {
            let result = checkRegExp(regexpItem);
            if (!result.success) {
              return result;
            }
          }
        } else {
          let result = checkRegExp(ruleJSON["regexp"]);
          if (!result.success) {
            return result;
          }
        }
        let checkSettingResult = checkSetting(ruleJSON["setting"]);
        if (!checkSettingResult.success) {
          return checkSettingResult;
        }
        return {
          success: true,
          msg: "解析成功",
          data: ruleJSON
        };
      } catch (error) {
        log.error(error);
        return {
          success: false,
          msg: error.message
        };
      }
    },
    /**
     * 添加/编辑规则
     * @param isEdit
     * @param ruleKey 当isEdit为true时，传入该值
     */
    showUI(isEdit, ruleKey) {
      const that = this;
      let titleText = "添加";
      if (isEdit) {
        titleText = "编辑";
      }
      titleText += "自定义规则";
      let $ruleInput = null;
      function saveCallBack(event, isDebug2) {
        let ruleText = $ruleInput.value.trim();
        let parseRuleResult = that.parseRuleStrToRule(ruleText);
        if (parseRuleResult.success) {
          let userRule = parseRuleResult.data;
          if (isEdit) {
            that.setRule(ruleKey, userRule);
          } else {
            that.addRule(userRule);
          }
          Qmsg.success("保存成功");
        } else {
          Qmsg.error(parseRuleResult.msg);
        }
      }
      function debugCallBack(event) {
        let ruleText = $ruleInput.value.trim();
        let parseRuleResult = that.parseRuleStrToRule(ruleText);
        if (parseRuleResult.success) {
          let userRule = parseRuleResult.data;
          NetDiskUserRuleDebug.showUI(userRule);
        } else {
          Qmsg.error(parseRuleResult.msg);
        }
      }
      function formatCallBack(event) {
        try {
          let ruleJSON = JSON.parse($ruleInput.value);
          let ruleJSONString = NetDiskUserRule.getFormatRule(ruleJSON);
          $ruleInput.value = ruleJSONString;
          Qmsg.success("格式化成功");
        } catch (error) {
          log.error(error);
          Qmsg.error(error.message, {
            html: true,
            timeout: 3500
          });
        }
      }
      let dialog = NetDiskPops.confirm(
        {
          title: {
            text: titleText,
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `<textarea class="netdisk-custom-rules" placeholder="请输入自定义规则"></textarea>`
            ),
            html: true
          },
          btn: {
            merge: true,
            mergeReverse: false,
            reverse: false,
            position: "space-between",
            ok: {
              text: "保存",
              callback: (eventDetails, event) => {
                saveCallBack();
              }
            },
            cancel: {
              text: "调试",
              callback: (eventDetails, event) => {
                debugCallBack();
              }
            },
            other: {
              enable: true,
              text: "格式化",
              type: "xiaomi-primary",
              callback: (eventDetails, event) => {
                formatCallBack();
              }
            }
          },
          class: "whitesevPopNetDiskCustomRules",
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.customRulesView
      );
      $ruleInput = dialog.$shadowRoot.querySelector("textarea");
      if (isEdit) {
        let rule = this.getRule(ruleKey);
        $ruleInput.value = this.getFormatRule(rule);
      } else {
        $ruleInput.value = this.getTemplateRule();
      }
    },
    /**
     * 上下文环境
     * @param rule
     */
    getBindContext(rule) {
      function setValue(key, value) {
        let localData = _GM_getValue(NetDiskUserRule.dataKey);
        let ruleData = localData[rule.key];
        ruleData[key] = value;
        _GM_setValue(NetDiskUserRule.dataKey, localData);
      }
      function getValue(key, defaultValue) {
        let localData = _GM_getValue(NetDiskUserRule.dataKey);
        let ruleData = localData[rule.key];
        return ruleData[key] ?? defaultValue;
      }
      function deleteValue(key) {
        let localData = _GM_getValue(NetDiskUserRule.dataKey);
        let ruleData = localData[rule.key];
        Reflect.deleteProperty(ruleData, key);
        _GM_setValue(NetDiskUserRule.dataKey, localData);
      }
      return {
        rule,
        NetDiskRequire,
        CryptoJS: Cryptojs$1,
        httpx,
        utils,
        DOMUtils: domUtils,
        window,
        unsafeWindow: _unsafeWindow,
        NetDiskCheckLinkValidity,
        log,
        Qmsg,
        pops: __pops,
        setValue,
        getValue,
        deleteValue
      };
    },
    /**
     * 把用户自定义规则进行转换成脚本规则
     * @param localRule 用户的规则
     */
    parseRule(localRule) {
      function parseUserRuleToScriptRule(userRuleConfig, ruleRegExp) {
        const {
          shareCode,
          shareCodeNeedRemoveStr,
          shareCodeNotMatch,
          checkAccessCode,
          accessCode,
          acceesCodeNotMatch,
          paramMatch,
          ...otherRuleParams
        } = ruleRegExp;
        let netDiskRegularOption = {
          enable: NetDiskLocalData.function.enable(
            userRuleConfig.key,
            Boolean(userRuleConfig.setting.enable)
          ),
          checkLinkValidity: NetDiskLocalData.function.checkLinkValidity(
            userRuleConfig.key,
            Boolean(userRuleConfig.setting.checkLinkValidity)
          ),
          ...otherRuleParams
        };
        if (typeof shareCode === "string") {
          netDiskRegularOption.shareCode = new RegExp(shareCode, "ig");
        }
        if (typeof shareCodeNeedRemoveStr === "string") {
          netDiskRegularOption.shareCodeNeedRemoveStr = new RegExp(
            shareCodeNeedRemoveStr,
            "ig"
          );
        }
        if (typeof shareCodeNotMatch === "string") {
          netDiskRegularOption.shareCodeNotMatch = new RegExp(
            shareCodeNotMatch,
            "ig"
          );
        }
        if (typeof checkAccessCode === "string") {
          netDiskRegularOption.checkAccessCode = new RegExp(
            checkAccessCode,
            "ig"
          );
        }
        if (typeof accessCode === "string") {
          netDiskRegularOption.accessCode = new RegExp(accessCode, "ig");
        }
        if (typeof acceesCodeNotMatch === "string") {
          netDiskRegularOption.acceesCodeNotMatch = new RegExp(
            acceesCodeNotMatch,
            "ig"
          );
        }
        if (typeof paramMatch === "string") {
          netDiskRegularOption.paramMatch = new RegExp(paramMatch, "i");
        }
        return netDiskRegularOption;
      }
      let netDiskRuleConfigList = [];
      for (const userRuleItemConfig of localRule) {
        let netDiskRuleConfig = {
          rule: [],
          setting: {
            name: userRuleItemConfig.setting.name,
            key: userRuleItemConfig.key,
            configurationInterface: {
              matchRange_text: {},
              matchRange_html: {},
              function: {},
              linkClickMode_openBlank: {},
              schemeUri: {},
              ownFormList: []
            }
          },
          isUserRule: true
        };
        const userRuleList = userRuleItemConfig.regexp;
        const ruleKey = userRuleItemConfig.key;
        if (Array.isArray(userRuleList)) {
          userRuleList.forEach((userRuleItem) => {
            netDiskRuleConfig.rule.push(
              parseUserRuleToScriptRule(userRuleItemConfig, userRuleItem)
            );
          });
        } else {
          netDiskRuleConfig.rule.push(
            parseUserRuleToScriptRule(userRuleItemConfig, userRuleList)
          );
        }
        if (userRuleItemConfig.setting) {
          this.initDefaultValue(
            NetDiskLocalDataKey.template.function.enable(ruleKey),
            Boolean(userRuleItemConfig.setting.enable)
          );
          netDiskRuleConfig.setting.configurationInterface.function.enable = Boolean(userRuleItemConfig.setting.enable);
          if (typeof userRuleItemConfig.setting["isBlank"] === "boolean") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.function.linkClickMode(ruleKey),
              "openBlank"
            );
            netDiskRuleConfig.setting.configurationInterface.function.linkClickMode = "openBlank";
          }
          if (typeof userRuleItemConfig.setting.linkClickMode === "string" && NetDiskLinkClickModeUtils.isAllowMode(
            userRuleItemConfig.setting.linkClickMode
          )) {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.function.linkClickMode(ruleKey),
              userRuleItemConfig.setting.linkClickMode
            );
            netDiskRuleConfig.setting.configurationInterface.function.linkClickMode = "openBlank";
          }
          if (typeof userRuleItemConfig.setting.linkClickMode_extend === "object" && Array.isArray(userRuleItemConfig.setting.linkClickMode_extend)) {
            userRuleItemConfig.setting.linkClickMode_extend.forEach(
              (extendMode) => {
                if (NetDiskLinkClickModeUtils.isAllowExtendMode(extendMode)) {
                  if (netDiskRuleConfig.setting.configurationInterface.function.linkClickMode_extend == null) {
                    netDiskRuleConfig.setting.configurationInterface.function.linkClickMode_extend = [];
                  }
                  netDiskRuleConfig.setting.configurationInterface.function.linkClickMode_extend.push(
                    extendMode
                  );
                }
              }
            );
          }
          if (typeof userRuleItemConfig.setting["openBlankWithCopyAccessCode"] === "boolean") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.linkClickMode_openBlank.openBlankWithCopyAccessCode(
                ruleKey
              ),
              Boolean(userRuleItemConfig.setting["openBlankWithCopyAccessCode"])
            );
            netDiskRuleConfig.setting.configurationInterface.linkClickMode_openBlank.openBlankWithCopyAccessCode = Boolean(userRuleItemConfig.setting["openBlankWithCopyAccessCode"]);
          }
          if (typeof userRuleItemConfig.setting["checkLinkValidity"] === "boolean") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.function.checkLinkValidity(ruleKey),
              Boolean(userRuleItemConfig.setting["checkLinkValidity"])
            );
            netDiskRuleConfig.setting.configurationInterface.function.checkLinkValidity = Boolean(userRuleItemConfig.setting["checkLinkValidity"]);
          }
          if (typeof userRuleItemConfig.setting["isForward"] === "boolean") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.schemeUri.enable(ruleKey),
              Boolean(userRuleItemConfig.setting["isForward"])
            );
            netDiskRuleConfig.setting.configurationInterface.schemeUri.enable = Boolean(userRuleItemConfig.setting["isForward"]);
          }
          if (typeof userRuleItemConfig.setting["schemeUri"] === "string") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.schemeUri.uri(ruleKey),
              userRuleItemConfig.setting["schemeUri"]
            );
            netDiskRuleConfig.setting.configurationInterface.schemeUri.uri = userRuleItemConfig.setting["schemeUri"];
          }
          if (typeof userRuleItemConfig.setting["innerTextAccessCodeBeforeMaxRange"] === "number") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.matchRange_text.before(ruleKey),
              userRuleItemConfig.setting["innerTextAccessCodeBeforeMaxRange"]
            );
            netDiskRuleConfig.setting.configurationInterface.matchRange_text.before = userRuleItemConfig.setting["innerTextAccessCodeBeforeMaxRange"];
          }
          if (typeof userRuleItemConfig.setting["innerTextAccessCodeAfterMaxRange"] === "number") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.matchRange_text.after(ruleKey),
              userRuleItemConfig.setting["innerTextAccessCodeAfterMaxRange"]
            );
            netDiskRuleConfig.setting.configurationInterface.matchRange_text.after = userRuleItemConfig.setting["innerTextAccessCodeAfterMaxRange"];
          }
          if (typeof userRuleItemConfig.setting["innerHTMLAccessCodeBeforeMaxRange"] === "number") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.matchRange_html.before(ruleKey),
              userRuleItemConfig.setting["innerHTMLAccessCodeBeforeMaxRange"]
            );
            netDiskRuleConfig.setting.configurationInterface.matchRange_html.before = userRuleItemConfig.setting["innerHTMLAccessCodeBeforeMaxRange"];
          }
          if (typeof userRuleItemConfig.setting["innerHTMLAccessCodeAfterMaxRange"] === "number") {
            this.initDefaultValue(
              NetDiskLocalDataKey.template.matchRange_html.after(ruleKey),
              userRuleItemConfig.setting["innerHTMLAccessCodeAfterMaxRange"]
            );
            netDiskRuleConfig.setting.configurationInterface.matchRange_html.after = userRuleItemConfig.setting["innerHTMLAccessCodeAfterMaxRange"];
          }
        }
        if (typeof userRuleItemConfig.icon === "string") {
          let ruleIcon = userRuleItemConfig.icon;
          NetDiskUI.src.addIcon(ruleKey, ruleIcon);
        }
        const AsyncFunction = Object.getPrototypeOf(
          async function() {
          }
        ).constructor;
        if (typeof userRuleItemConfig.checkLinkValidityFunction === "string") {
          try {
            Reflect.set(NetDiskCheckLinkValidity.netDisk, ruleKey, {
              init: new AsyncFunction(
                "netDiskIndex",
                "shareCode",
                "accessCode",
                userRuleItemConfig.checkLinkValidityFunction
                // 绑定作用域
              ).bind(this.getBindContext(userRuleItemConfig))
            });
          } catch (error) {
            log.error(error);
          }
        }
        if (typeof userRuleItemConfig.AuthorizationFunction === "string") {
          try {
            NetDiskAuthorization.netDisk[ruleKey] = new AsyncFunction(
              userRuleItemConfig.AuthorizationFunction
            ).bind(
              // 绑定作用域
              this.getBindContext(userRuleItemConfig)
            );
          } catch (error) {
            log.error(error);
          }
        }
        if (typeof userRuleItemConfig.AutoFillAccessCodeFunction === "string") {
          try {
            NetDiskAutoFillAccessCode.netDisk[ruleKey] = new AsyncFunction(
              "netDiskInfo",
              userRuleItemConfig.AutoFillAccessCodeFunction
              // 绑定作用域
            ).bind(this.getBindContext(userRuleItemConfig));
          } catch (error) {
            log.error(error);
          }
        }
        if (typeof userRuleItemConfig.parseFunction === "string") {
          try {
            Reflect.set(
              NetDiskParse.netDisk,
              ruleKey,
              new Function(userRuleItemConfig.parseFunction).bind(
                this.getBindContext(userRuleItemConfig)
              )
            );
          } catch (error) {
            log.error(error);
          }
        }
        let findValue = netDiskRuleConfigList.find(
          (item) => item.setting.key === netDiskRuleConfig.setting.key
        );
        if (findValue) {
          findValue.rule = findValue.rule.concat(netDiskRuleConfig.rule);
        } else {
          netDiskRuleConfigList.push(netDiskRuleConfig);
        }
      }
      return netDiskRuleConfigList;
    },
    /**
     * 获取配置
     */
    getNetDiskRuleConfig() {
      return this.$data.userRule.values();
    },
    /**
     * 初始化默认值
     */
    initDefaultValue(key, value) {
      let localValue = _GM_getValue(key);
      if (localValue == null) {
        _GM_setValue(key, value);
      }
    },
    /**
     * 获取模板规则
     * @returns
     */
    getTemplateRule() {
      let templateRule = {
        key: "规则名",
        icon: "图标链接字符串或图片的base64字符串",
        regexp: [
          {
            link_innerText: "",
            link_innerHTML: "",
            shareCode: "",
            shareCodeNeedRemoveStr: "",
            uiLinkShow: "",
            blank: "",
            copyUrl: ""
          }
        ],
        setting: {
          name: "设置界面的名字",
          enable: true,
          linkClickMode: "openBlank",
          openBlankWithCopyAccessCode: true
        }
      };
      return this.getFormatRule(templateRule);
    },
    /**
     * 添加规则
     * @param {NetDiskUserCustomRule} userRule
     */
    addRule(userRule) {
      let localRule = this.getAllRule();
      localRule.push(userRule);
      _GM_setValue(NetDiskUserRule.key, localRule);
    },
    /**
     * 设置规则到本地
     * @param {string} oldRuleKey 旧规则的键名
     * @param {NetDiskUserCustomRule[]|NetDiskUserCustomRule} userRule
     */
    setRule(oldRuleKey, userRule) {
      if (Array.isArray(userRule)) {
        _GM_setValue(NetDiskUserRule.key, userRule);
      } else {
        let localRule = this.getAllRule();
        let findRuleIndex = localRule.findIndex(
          (item) => item.key === oldRuleKey
        );
        if (findRuleIndex !== -1) {
          localRule[findRuleIndex] = null;
          localRule[findRuleIndex] = userRule;
        } else {
          log.error(["覆盖规则失败", userRule]);
          Qmsg.error("覆盖规则失败");
          return false;
        }
        this.setRule(oldRuleKey, localRule);
      }
    },
    /**
     * 删除单条规则
     * @param {string} ruleKey 规则的key名
     */
    deleteRule(ruleKey) {
      let localRule = this.getAllRule();
      let findIndex = localRule.findIndex((rule) => rule.key === ruleKey);
      if (findIndex !== -1) {
        localRule.splice(findIndex, 1);
        this.setRule(ruleKey, localRule);
        return true;
      } else {
        return false;
      }
    },
    /**
     * 清空规则
     */
    clearRule() {
      _GM_deleteValue(NetDiskUserRule.key);
    },
    /**
     * 获取本地所有的规则
     */
    getAllRule() {
      let result = _GM_getValue(
        NetDiskUserRule.key,
        []
      );
      return result;
    },
    /**
     * 获取规则
     */
    getRule(key) {
      let localRule = _GM_getValue(NetDiskUserRule.key, []);
      return localRule.find((item) => item.key === key);
    },
    /**
     * 获取格式化后的规则
     * @param {?NetDiskUserCustomRule} rule
     */
    getFormatRule(rule) {
      return JSON.stringify(rule || this.getAllRule(), void 0, 4);
    }
  };
  const NetDiskRule_baidu = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("baidu"),
        link_innerText: `pan.baidu.com/s/[0-9a-zA-Z-_]{6,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "baidu"
      )}}(密码|访问码|提取码|\\?pwd=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "baidu"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `pan.baidu.com/s/[0-9a-zA-Z-_]{6,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "baidu"
      )}}(密码|访问码|提取码|\\?pwd=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "baidu"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /pan\.baidu\.com\/s\/([0-9a-zA-Z-_]+)/gi,
        shareCodeNeedRemoveStr: /pan\.baidu\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码|pwd=)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "pan.baidu.com/s/{#shareCode#}?pwd={#accessCode#}",
        blank: "https://pan.baidu.com/s/{#shareCode#}?pwd={#accessCode#}",
        copyUrl: "https://pan.baidu.com/s/{#shareCode#}?pwd={#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("baidu")
      },
      {
        enable: NetDiskLocalData.function.enable("baidu"),
        link_innerText: `pan.baidu.com/(share|wap)/init\\?surl=[0-9a-zA-Z-_]{5,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "baidu"
      )}}(密码|访问码|提取码|&pwd=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "baidu"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `pan.baidu.com/(share|wap)/init\\?surl=[0-9a-zA-Z-_]{5,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "baidu"
      )}}(密码|访问码|提取码|&pwd=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "baidu"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /pan\.baidu\.com\/(share|wap)\/init\?surl=([0-9a-zA-Z-_]+)/gi,
        shareCodeNeedRemoveStr: /pan\.baidu\.com\/(share|wap)\/init\?surl=/gi,
        checkAccessCode: /(密码|访问码|提取码|&pwd=)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "pan.baidu.com/share/init?surl={#shareCode#}&pwd={#accessCode#}",
        blank: "https://pan.baidu.com/share/init?surl={#shareCode#}&pwd={#accessCode#}",
        copyUrl: "https://pan.baidu.com/share/init?surl={#shareCode#}&pwd={#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("baidu")
      }
    ],
    /** 设置项 */
    setting: {
      name: "百度网盘",
      key: "baidu",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
        // ownFormList: [
        // 	{
        // 		text: "第三方解析站",
        // 		type: "forms",
        // 		forms: [
        // 			UISwitch(
        // 				"启用解析站",
        // 				"baidu-static-enable",
        // 				false,
        // 				void 0,
        // 				"开源项目：<a href='https://github.com/yuantuo666/baiduwp-php' target='_blank'>https://github.com/yuantuo666/baiduwp-php</a>"
        // 			),
        // 			UISwitch(
        // 				"跳转时复制链接",
        // 				"baidu-baiduwp-php-copy-url",
        // 				false,
        // 				void 0,
        // 				"跳转至解析站时复制百度网盘链接"
        // 			),
        // 			UIInput(
        // 				"网址",
        // 				"baidu-baiduwp-php-url",
        // 				"",
        // 				"解析站的网址Url",
        // 				void 0,
        // 				"使用了baiduwp-php源码的网站，例如：https://www.example.com/"
        // 			),
        // 			UIInput(
        // 				"表单参数",
        // 				"baidu-baiduwp-php-post-form",
        // 				"",
        // 				"解析站的网址Url",
        // 				void 0,
        // 				"POST表单，例如：surl={#shareCode#}&pwd={#accessCode#}&password="
        // 			),
        // 		],
        // 	},
        // ],
      }
    }
  };
  const UIInput = function(text, key, defaultValue, description, changeCallBack, placeholder = "", isNumber, isPassword) {
    let result = {
      text,
      type: "input",
      isNumber: Boolean(isNumber),
      isPassword: Boolean(isPassword),
      attributes: {},
      description,
      getValue() {
        let localValue = _GM_getValue(key, defaultValue);
        return localValue;
      },
      callback(event, value) {
        _GM_setValue(key, value);
      },
      placeholder
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
    }
    return result;
  };
  const NetDiskRule_lanzou = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("lanzou"),
        link_innerText: `(lanzou[a-z]{0,1}|lan[a-z]{2}).com/(tp/|u/|)([a-zA-Z0-9_-]{5,22}|[%0-9a-zA-Z]{4,90}|[\\u4e00-\\u9fa5]{1,20})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "lanzou"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "lanzou"
      )}}[a-zA-Z0-9]{3,6}|)`,
        link_innerHTML: `(lanzou[a-z]{0,1}|lan[a-z]{2}).com/(tp/|u/|)([a-zA-Z0-9_-]{5,22}|[%0-9a-zA-Z]{4,90}|[\\u4e00-\\u9fa5]{1,20})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "lanzou"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "lanzou"
      )}}[a-zA-Z0-9]{3,6}|)`,
        shareCode: /(lanzou[a-z]{0,1}|lan[a-z]{2}).com\/(tp\/|u\/|)([a-zA-Z0-9_\-]{5,22}|[%0-9a-zA-Z]{4,90}|[\u4e00-\u9fa5]{1,20})/gi,
        shareCodeNeedRemoveStr: /(lanzou[a-z]{0,1}|lan[a-z]{2}).com\/(tp\/|u\/|)/gi,
        shareCodeExcludeRegular: ["lanzouyx"],
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{3,})/gi,
        uiLinkShow: `${NetDiskParse_Lanzou_Config.hostname}/{#shareCode#} 提取码: {#accessCode#}`,
        blank: `https://${NetDiskParse_Lanzou_Config.hostname}/{#shareCode#}`,
        copyUrl: `https://${NetDiskParse_Lanzou_Config.hostname}/{#shareCode#}
密码：{#accessCode#}`,
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("lanzou")
      },
      {
        enable: NetDiskLocalData.function.enable("lanzou"),
        link_innerText: `(lanzou[a-z]{0,1}|lan[a-z]{2}).com/s/([a-zA-Z0-9_-]{5,22}|[%0-9a-zA-Z]{4,90}|[\\u4e00-\\u9fa5]{1,20})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "lanzou"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "lanzou"
      )}}[a-zA-Z0-9]{3,6}|)`,
        link_innerHTML: `(lanzou[a-z]{0,1}|lan[a-z]{2}).com/s/([a-zA-Z0-9_-]{5,22}|[%0-9a-zA-Z]{4,90}|[\\u4e00-\\u9fa5]{1,20})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "lanzou"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "lanzou"
      )}}[a-zA-Z0-9]{3,6}|)`,
        shareCode: /(lanzou[a-z]{0,1}|lan[a-z]{2}).com\/s\/([a-zA-Z0-9_\-]{5,22}|[%0-9a-zA-Z]{4,90}|[\u4e00-\u9fa5]{1,20})/gi,
        shareCodeNeedRemoveStr: /(lanzou[a-z]{0,1}|lan[a-z]{2}).com\/s\//gi,
        shareCodeExcludeRegular: ["lanzouyx"],
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{3,})/gi,
        uiLinkShow: `${NetDiskParse_Lanzou_Config.hostname}/s/{#shareCode#} 提取码: {#accessCode#}`,
        blank: `https://${NetDiskParse_Lanzou_Config.hostname}/s/{#shareCode#}`,
        copyUrl: `https://${NetDiskParse_Lanzou_Config.hostname}/s/{#shareCode#}
密码：{#accessCode#}`,
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("lanzou")
      }
    ],
    /** 设置项 */
    setting: {
      name: "蓝奏云",
      key: "lanzou",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: false,
          isForwardBlankLink: false,
          uri: ""
        },
        ownFormList: [
          {
            text: "其它配置",
            type: "forms",
            forms: [
              UIInput(
                "蓝奏云域名",
                NetDiskParse_Lanzou_Config.MENU_KEY,
                NetDiskParse_Lanzou_Config.DEFAULT_HOST_NAME,
                "",
                void 0,
                `例如：${NetDiskParse_Lanzou_Config.DEFAULT_HOST_NAME}`
              )
            ]
          }
        ]
      }
    }
  };
  const NetDiskRule_lanzouyx = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("lanzouyx"),
        link_innerText: `ilanzou.com/s/([a-zA-Z0-9_-]{5,22})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "lanzouyx"
      )}}(密码|访问码|提取码|\\?code=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "lanzouyx"
      )}}[a-zA-Z0-9]{3,6}|)`,
        link_innerHTML: `ilanzou.com/s/([a-zA-Z0-9_-]{5,22})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "lanzouyx"
      )}}(密码|访问码|提取码|\\?code=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "lanzouyx"
      )}}[a-zA-Z0-9]{3,6}|)`,
        shareCode: /ilanzou.com\/s\/([a-zA-Z0-9_\-]{5,22})/gi,
        shareCodeNeedRemoveStr: /ilanzou.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码|\?code=)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{3,})/gi,
        uiLinkShow: `www.ilanzou.com/s/{#shareCode#} 提取码: {#accessCode#}`,
        blank: `https://www.ilanzou.com/s/{#shareCode#}?code={#accessCode#}`,
        copyUrl: `https://www.ilanzou.com/s/{#shareCode#}?code={#accessCode#}`,
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("lanzouyx")
      }
    ],
    /** 设置项 */
    setting: {
      name: "蓝奏云优享",
      key: "lanzouyx",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_tianyiyun = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("tianyiyun"),
        link_innerText: `(cloud.189.cn/web/share\\?code=([0-9a-zA-Z_-]){8,14}|cloud.189.cn/t/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "tianyiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "tianyiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `(cloud.189.cn/web/share\\?code=([0-9a-zA-Z_-]){8,14}|cloud.189.cn/t/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "tianyiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "tianyiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /cloud.189.cn\/web\/share\?code=([0-9a-zA-Z_\-]){8,14}|cloud.189.cn\/t\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /cloud\.189\.cn\/t\/|cloud.189.cn\/web\/share\?code=/gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "cloud.189.cn/t/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://cloud.189.cn/t/{#shareCode#}",
        copyUrl: "https://cloud.189.cn/t/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("tianyiyun")
      }
    ],
    /** 设置项 */
    setting: {
      name: "天翼云",
      key: "tianyiyun",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_hecaiyun = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("hecaiyun"),
        link_innerText: `caiyun.139.com/m/i\\?([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "hecaiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "hecaiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `caiyun.139.com/m/i\\?([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "hecaiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "hecaiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /caiyun\.139\.com\/m\/i\?([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /caiyun\.139\.com\/m\/i\?/gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "caiyun.139.com/m/i?{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://caiyun.139.com/m/i?{#shareCode#}",
        copyUrl: "https://caiyun.139.com/m/i?{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("hecaiyun")
      },
      {
        enable: NetDiskLocalData.function.enable("hecaiyun"),
        link_innerText: `yun.139.com/link/w/i/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "hecaiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "hecaiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `yun.139.com/link/w/i/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "hecaiyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "hecaiyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /yun\.139\.com\/link\/w\/i\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /yun\.139\.com\/link\/w\/i\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "yun.139.com/link/w/i/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://yun.139.com/link/w/i/{#shareCode#}",
        copyUrl: "https://yun.139.com/link/w/i/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("hecaiyun")
      }
    ],
    /** 设置项 */
    setting: {
      name: "中国移动云盘",
      key: "hecaiyun",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_aliyun = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("aliyun"),
        link_innerText: `aliyundrive.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `aliyundrive.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /aliyundrive\.com\/s\/([a-zA-Z0-9_\-]{8,14})/g,
        shareCodeNeedRemoveStr: /aliyundrive\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "aliyundrive.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.aliyundrive.com/s/{#shareCode#}",
        copyUrl: "https://www.aliyundrive.com/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("aliyun")
      },
      {
        enable: NetDiskLocalData.function.enable("aliyun"),
        link_innerText: `aliyundrive.com/t/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `aliyundrive.com/t/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /aliyundrive\.com\/t\/([a-zA-Z0-9_\-]{8,14})/g,
        shareCodeNeedRemoveStr: /aliyundrive\.com\/t\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "aliyundrive.com/t/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.aliyundrive.com/t/{#shareCode#}",
        copyUrl: "https://www.aliyundrive.com/t/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("aliyun")
      },
      {
        enable: NetDiskLocalData.function.enable("aliyun"),
        link_innerText: `alipan.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `alipan.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "aliyun"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "aliyun"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /alipan\.com\/s\/([a-zA-Z0-9_\-]{8,14})/g,
        shareCodeNeedRemoveStr: /alipan\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "alipan.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.alipan.com/s/{#shareCode#}",
        copyUrl: "https://www.alipan.com/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("aliyun")
      }
    ],
    /** 设置项 */
    setting: {
      name: "阿里云",
      key: "aliyun",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: true,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_wenshushu = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("wenshushu"),
        link_innerText: `(wenshushu.cn/f/([a-zA-Z0-9_-]{8,14})|wenshushu.cn/k/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "wenshushu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "wenshushu"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `(wenshushu.cn/f/([a-zA-Z0-9_-]{8,14})|wenshushu.cn/k/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "wenshushu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "wenshushu"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /wenshushu.cn\/f\/([a-zA-Z0-9_-]{8,14})|wenshushu.cn\/k\/([a-zA-Z0-9_-]{8,14})/gi,
        shareCodeNeedRemoveStr: /wenshushu.cn\/f\/|wenshushu.cn\/k\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /[0-9a-zA-Z]{4}/gi,
        uiLinkShow: "www.wenshushu.cn/f/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.wenshushu.cn/f/{#shareCode#}",
        copyUrl: "https://www.wenshushu.cn/f/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("wenshushu")
      },
      {
        enable: NetDiskLocalData.function.enable("wenshushu"),
        link_innerText: `(wss.ink/f/([a-zA-Z0-9_-]{8,14})|ws28.cn/f/([a-zA-Z0-9_-]{8,14})|wss1.cn/f/([a-zA-Z0-9_-]{8,14})|ws59.cn/f/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "wenshushu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "wenshushu"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `(wss.ink/f/([a-zA-Z0-9_-]{8,14})|ws28.cn/f/([a-zA-Z0-9_-]{8,14})|wss1.cn/f/([a-zA-Z0-9_-]{8,14})|ws59.cn/f/([a-zA-Z0-9_-]{8,14}))([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "wenshushu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "wenshushu"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /wss.ink\/f\/([a-zA-Z0-9_-]{8,14})|ws28.cn\/f\/([a-zA-Z0-9_-]{8,14})|wss1.cn\/f\/([a-zA-Z0-9_-]{8,14})|ws59.cn\/f\/([a-zA-Z0-9_-]{8,14})/gi,
        shareCodeNeedRemoveStr: /wss.ink\/f\/|ws28.cn\/f\/|wss1.cn\/f\/|ws59.cn\/f\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /[0-9a-zA-Z]{4}/gi,
        uiLinkShow: "www.wenshushu.cn/f/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.wenshushu.cn/f/{#shareCode#}",
        copyUrl: "https://www.wenshushu.cn/f/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("wenshushu")
      }
    ],
    /** 设置项 */
    setting: {
      name: "文叔叔",
      key: "wenshushu",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: true,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_nainiu = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("nainiu"),
        link_innerText: `cowtransfer.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "nainiu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "nainiu"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `cowtransfer.com/s/([a-zA-Z0-9_-]{8,14})([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "nainiu"
      )}}(密码|访问码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "nainiu"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /cowtransfer.com\/s\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /cowtransfer\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        uiLinkShow: "cowtransfer.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://cowtransfer.com/s/{#shareCode#}",
        copyUrl: "https://cowtransfer.com/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("nainiu")
      }
    ],
    /** 设置项 */
    setting: {
      name: "奶牛",
      key: "nainiu",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: true,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_weiyun = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("weiyun"),
        link_innerText: `weiyun.com/[0-9a-zA-Z-_]{7,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "weiyun"
      )}(访问码|密码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "weiyun"
      )}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `weiyun.com/[0-9a-zA-Z-_]{7,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "weiyun"
      )}(访问码|密码|提取码)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "weiyun"
      )}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /weiyun.com\/([0-9a-zA-Z\-_]{7,24})/gi,
        shareCodeNeedRemoveStr: /weiyun.com\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        uiLinkShow: "share.weiyun.com/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://share.weiyun.com/{#shareCode#}",
        copyUrl: "https://share.weiyun.com/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("weiyun")
      }
    ],
    /** 设置项 */
    setting: {
      name: "微云",
      key: "weiyun",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_xunlei = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("xunlei"),
        link_innerText: `xunlei.com/s/[0-9a-zA-Z-_]{8,30}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "xunlei"
      )}}(\\?pwd=|访问码|提取码|密码|)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "xunlei"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `xunlei.com/s/[0-9a-zA-Z-_]{8,30}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "xunlei"
      )}}(\\?pwd=|访问码|提取码|密码|)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "xunlei"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /xunlei.com\/s\/([0-9a-zA-Z\-_]{8,30})/gi,
        shareCodeNeedRemoveStr: /xunlei.com\/s\//gi,
        checkAccessCode: /(\?pwd=|提取码|密码|访问码)[\s\S]+/g,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "pan.xunlei.com/s/{#shareCode#}?pwd={#accessCode#} 提取码: {#accessCode#}",
        blank: "https://pan.xunlei.com/s/{#shareCode#}?pwd={#accessCode#}",
        copyUrl: "https://pan.xunlei.com/s/{#shareCode#}?pwd={#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("xunlei")
      }
    ],
    /** 设置项 */
    setting: {
      name: "迅雷云盘",
      key: "xunlei",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_115pan = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("_115pan"),
        link_innerText: `115.com/s/[0-9a-zA-Z-_]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_115pan"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "_115pan"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `115.com/s/[0-9a-zA-Z-_]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_115pan"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "_115pan"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /115.com\/s\/([0-9a-zA-Z\-_]{8,24})/gi,
        shareCodeNeedRemoveStr: /115.com\/s\//gi,
        checkAccessCode: /(提取码|密码|\?password=|访问码)[\s\S]+/gi,
        accessCode: /(\?password=|)([0-9a-zA-Z]{4})/i,
        uiLinkShow: "115.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://115.com/s/{#shareCode#}",
        copyUrl: "https://115.com/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("_115pan")
      }
    ],
    /** 设置项 */
    setting: {
      name: "115网盘",
      key: "_115pan",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_chengtong = {
    /** 规则 */
    rule: [
      /* d */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `(ct.ghpym.com|pan.jc-box.com|download.jamcz.com)/d/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `(ct.ghpym.com|pan.jc-box.com|download.jamcz.com)/d/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /(ct.ghpym.com|pan.jc-box.com|download.jamcz.com)\/d\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /(ct.ghpym.com|pan.jc-box.com|download.jamcz.com)\/d\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        paramMatch: /([a-zA-Z0-9\.]+)\/d\//i,
        uiLinkShow: "{#$1#}/d/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://{#$1#}/d/{#shareCode#}",
        copyUrl: "https://{#$1#}/d/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      },
      /* d */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `ctfile.com/d/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `ctfile.com/d/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /ctfile.com\/d\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /ctfile.com\/d\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        uiLinkShow: "url95.ctfile.com/d/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://url95.ctfile.com/d/{#shareCode#}",
        copyUrl: "https://url95.ctfile.com/d/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      },
      /* file */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `(2k.us|u062.com|545c.com|t00y.com)/file/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `(2k.us|u062.com|545c.com|t00y.com)/file/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /(2k.us|u062.com|545c.com|t00y.com)\/file\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /(2k.us|u062.com|545c.com|t00y.com)\/file\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        uiLinkShow: "u062.com/file/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://u062.com/file/{#shareCode#}",
        copyUrl: "https://u062.com/file/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      },
      /* f */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `(pan.jc-box.com|545c.com|down.jc-box.com|download.cx05.cc)/f/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `(pan.jc-box.com|545c.com|down.jc-box.com|download.cx05.cc)/f/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /(pan.jc-box.com|545c.com|down.jc-box.com|download.cx05.cc)\/f\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /(pan.jc-box.com|545c.com|down.jc-box.com|download.cx05.cc)\/f\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        paramMatch: /([0-9a-zA-Z\.+])\/f\//i,
        uiLinkShow: "{#$1#}/f/{#shareCode#} 提取码: {#accessCode#}",
        blank: "http://{#$1#}/f/{#shareCode#}",
        copyUrl: "http://{#$1#}/f/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      },
      /* f */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `(ctfile.com|089u.com)/f/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `(ctfile.com|089u.com)/f/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        shareCode: /(ctfile.com|089u.com)\/f\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /(ctfile.com|089u.com)\/f\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,6})/gi,
        uiLinkShow: "url95.ctfile.com/f/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://url95.ctfile.com/f/{#shareCode#}",
        copyUrl: "https://url95.ctfile.com/f/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      },
      /* dir */
      {
        enable: NetDiskLocalData.function.enable("chengtong"),
        link_innerText: `(089u.com|474b.com)/dir/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "chengtong"
      )}}[0-9a-zA-Z]{4,6}|)`,
        link_innerHTML: `(089u.com|474b.com)/dir/[0-9a-zA-Z-_]{8,26}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "_chengtong"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "chengtong"
      )}}[0-9a-zA-Z]{6}|)`,
        shareCode: /(089u.com|474b.com)\/dir\/([0-9a-zA-Z\-_]{8,26})/gi,
        shareCodeNeedRemoveStr: /(089u.com|474b.com)\/dir\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{6})/gi,
        uiLinkShow: "089u.com/dir/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://089u.com/dir/{#shareCode#}",
        copyUrl: "https://089u.com/dir/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("chengtong")
      }
    ],
    /** 设置项 */
    setting: {
      name: "城通网盘",
      key: "chengtong",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_kuake = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("kuake"),
        link_innerText: `quark.cn/s/[0-9a-zA-Z-_]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "kuake"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "kuake"
      )}}[0-9a-zA-Z]{4}|)`,
        link_innerHTML: `quark.cn/s/[0-9a-zA-Z-_]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "kuake"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "kuake"
      )}}[0-9a-zA-Z]{4}|)`,
        shareCode: /quark.cn\/s\/([0-9a-zA-Z\-_]{8,24})/gi,
        shareCodeNeedRemoveStr: /quark.cn\/s\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "quark.cn/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://pan.quark.cn/s/{#shareCode#}",
        copyUrl: "https://pan.quark.cn/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("kuake")
      }
    ],
    /** 设置项 */
    setting: {
      name: "夸克网盘",
      key: "kuake",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_magnet = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("magnet"),
        link_innerText: `magnet:\\?xt=urn:btih:[0-9a-fA-F]{32,40}`,
        link_innerHTML: `magnet:\\?xt=urn:btih:[0-9a-fA-F]{32,40}`,
        shareCode: /magnet:\?xt=urn:btih:([0-9a-fA-F]{32,40})/gi,
        shareCodeNeedRemoveStr: /magnet:\?xt=urn:btih:/gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4})/gi,
        uiLinkShow: "magnet:?xt=urn:btih:{#shareCode#}",
        blank: "magnet:?xt=urn:btih:{#shareCode#}",
        copyUrl: "magnet:?xt=urn:btih:{#shareCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("magnet")
      }
    ],
    /** 设置项 */
    setting: {
      name: "BT磁力",
      key: "magnet",
      configurationInterface: {
        function: {
          enable: true,
          linkClickMode: "openBlank"
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: true,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_jianguoyun = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("jianguoyun"),
        link_innerText: `jianguoyun.com/p/[0-9a-zA-Z-_]{16,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "jianguoyun"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "jianguoyun"
      )}}[0-9a-zA-Z]+|)`,
        link_innerHTML: `jianguoyun.com/p/[0-9a-zA-Z-_]{16,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "jianguoyun"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "jianguoyun"
      )}}[0-9a-zA-Z]+|)`,
        shareCode: /jianguoyun.com\/p\/([0-9a-zA-Z\-_]{16,24})/gi,
        shareCodeNeedRemoveStr: /jianguoyun.com\/p\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{3,6})/gi,
        uiLinkShow: "jianguoyun.com/p/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.jianguoyun.com/p/{#shareCode#}",
        copyUrl: "https://www.jianguoyun.com/p/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("jianguoyun")
      }
    ],
    /** 设置项 */
    setting: {
      name: "坚果云",
      key: "jianguoyun",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_onedrive = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("onedrive"),
        link_innerText: `[0-9a-zA-Z-_]+.sharepoint.com/[0-9a-zA-Z-_:]+/[0-9a-zA-Z-_:]+/personal/[0-9a-zA-Z-_]+/[0-9a-zA-Z-_]+([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "onedrive"
      )}}(访问码|密码|提取码|\\?password=\\?e=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "onedrive"
      )}}[0-9a-zA-Z]+|)`,
        link_innerHTML: `[0-9a-zA-Z-_]+.sharepoint.com/[0-9a-zA-Z-_:]+/[0-9a-zA-Z-_:]+/personal/[0-9a-zA-Z-_]+/[0-9a-zA-Z-_]+([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "onedrive"
      )}}(访问码|密码|提取码|\\?password=\\?e=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "onedrive"
      )}}[0-9a-zA-Z]+|)`,
        shareCode: /[0-9a-zA-Z-_]+\/[0-9a-zA-Z-_:]+\/[0-9a-zA-Z-_:]+\/personal\/[0-9a-zA-Z-_]+\/([0-9a-zA-Z\-_]+)/gi,
        shareCodeNeedRemoveStr: /[0-9a-zA-Z-_]+\/[0-9a-zA-Z-_:]+\/[0-9a-zA-Z-_:]+\/personal\/[0-9a-zA-Z-_]+\//gi,
        checkAccessCode: /(提取码|密码|访问码|\?password=|\?e=)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]{4,8})/gi,
        paramMatch: /([0-9a-zA-Z-_]+).sharepoint.com\/([0-9a-zA-Z-_:]+)\/([0-9a-zA-Z-_:]+)\/personal\/([0-9a-zA-Z-_]+)\/([0-9a-zA-Z-_]+)/i,
        uiLinkShow: "{#$1#}.sharepoint.com/{#$2#}/{#$3#}/personal/{#$4#}/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://{#$1#}.sharepoint.com/{#$2#}/{#$3#}/personal/{#$4#}/{#shareCode#}?e={#accessCode#}",
        copyUrl: "https://{#$1#}.sharepoint.com/{#$2#}/{#$3#}/personal/{#$4#}/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("onedrive")
      }
    ],
    /** 设置项 */
    setting: {
      name: "OneDrive",
      key: "onedrive",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const NetDiskRule_uc = {
    /** 规则 */
    rule: [
      {
        enable: NetDiskLocalData.function.enable("uc"),
        link_innerText: `(drive|fast).uc.cn/s/[0-9a-zA-Z]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_text.before(
        "uc"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_text.after(
        "uc"
      )}}[0-9a-zA-Z]+|)`,
        link_innerHTML: `(drive|fast).uc.cn/s/[0-9a-zA-Z]{8,24}([\\s\\S]{0,${NetDiskLocalData.matchRange_html.before(
        "uc"
      )}}(访问码|密码|提取码|\\?password=)[\\s\\S]{0,${NetDiskLocalData.matchRange_html.after(
        "uc"
      )}}[0-9a-zA-Z]+|)`,
        shareCode: /(drive|fast).uc.cn\/s\/([0-9a-zA-Z]{8,24})/gi,
        shareCodeNeedRemoveStr: /(drive|fast).uc.cn\/s\//gi,
        checkAccessCode: /(提取码|密码|访问码)[\s\S]+/gi,
        accessCode: /([0-9a-zA-Z]+)/gi,
        uiLinkShow: "drive.uc.cn/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://drive.uc.cn/s/{#shareCode#}",
        copyUrl: "https://drive.uc.cn/s/{#shareCode#}\n密码：{#accessCode#}",
        checkLinkValidity: NetDiskLocalData.function.checkLinkValidity("uc")
      }
    ],
    /** 设置项 */
    setting: {
      name: "UC网盘",
      key: "uc",
      configurationInterface: {
        matchRange_text: {
          before: 20,
          after: 10
        },
        matchRange_html: {
          before: 100,
          after: 15
        },
        function: {
          enable: true,
          linkClickMode: "openBlank",
          linkClickMode_extend: ["parseFile"],
          checkLinkValidity: true
        },
        linkClickMode_openBlank: {
          openBlankWithCopyAccessCode: true
        },
        schemeUri: {
          enable: false,
          isForwardLinearChain: false,
          isForwardBlankLink: false,
          uri: ""
        }
      }
    }
  };
  const UISlider = function(text, key, defaultValue, min, max, changeCallBack, getToolTipContent, description, step) {
    let result = {
      text,
      type: "slider",
      description,
      attributes: {},
      getValue() {
        return _GM_getValue(key, defaultValue);
      },
      getToolTipContent(value) {
        if (typeof getToolTipContent === "function") {
          return getToolTipContent(value);
        } else {
          return `${value}`;
        }
      },
      callback(event, value) {
        if (typeof changeCallBack === "function") {
          if (changeCallBack(event, value)) {
            return;
          }
        }
        _GM_setValue(key, value);
      },
      min,
      max,
      step
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
    }
    return result;
  };
  const NetDiskRule = {
    $data: {
      /** 规则的配置界面信息 */
      ruleContent: []
    },
    init() {
      this.initRule();
    },
    /**
     * 初始化规则的内容
     * 1. 动态添加rule到NetDisk.regular
     * 2. 生成pops.panel适用的配置
     */
    initRule() {
      let defaultRuleList = [
        NetDiskRule_baidu,
        NetDiskRule_lanzou,
        NetDiskRule_lanzouyx,
        NetDiskRule_tianyiyun,
        NetDiskRule_hecaiyun,
        NetDiskRule_aliyun,
        NetDiskRule_wenshushu,
        NetDiskRule_nainiu,
        NetDiskRule_123pan,
        NetDiskRule_weiyun,
        NetDiskRule_xunlei,
        NetDiskRule_115pan,
        NetDiskRule_chengtong,
        NetDiskRule_kuake,
        NetDiskRule_magnet,
        NetDiskRule_jianguoyun,
        NetDiskRule_onedrive,
        NetDiskRule_uc
      ];
      let userRuleList = NetDiskUserRule.getNetDiskRuleConfig();
      [...defaultRuleList, ...userRuleList].forEach((netDiskRuleConfig) => {
        if (typeof netDiskRuleConfig.setting.key !== "string") {
          throw new TypeError("规则未设置key");
        }
        if (netDiskRuleConfig.rule == null) {
          throw new TypeError("规则未设置rule");
        }
        const ruleKey = netDiskRuleConfig.setting.key;
        const ruleName = netDiskRuleConfig.setting.name;
        const netDiskRule = netDiskRuleConfig.rule;
        if (Reflect.has(NetDisk.regular, ruleKey)) {
          let commonRule = NetDisk.regular[ruleKey];
          if (netDiskRuleConfig.isUserRule) {
            commonRule = [...netDiskRule, ...commonRule];
          } else {
            commonRule = [...commonRule, ...netDiskRule];
          }
          let findValue = NetDisk.rule.find(
            (item) => item.setting.key === ruleKey
          );
          findValue.rule = commonRule;
        } else {
          Reflect.set(NetDisk.regular, ruleKey, netDiskRuleConfig.rule);
          NetDisk.rule.push(netDiskRuleConfig);
        }
        let viewConfig = this.parseRuleToViewConfig(netDiskRuleConfig);
        let asideTitle = netDiskRuleConfig.setting.name;
        if (NetDiskUI.src.hasIcon(ruleKey)) {
          if (__pops.isPhone()) {
            asideTitle = /*html*/
            `
					<div style="
						width: 20px;
						height: 20px;
						background: url(${NetDiskUI.src.icon[ruleKey]}) no-repeat;
						background-size: 100% 100%;
						">`;
          } else {
            asideTitle = /*html*/
            `
					<div style="
						width: 20px;
						height: 20px;
						background: url(${NetDiskUI.src.icon[ruleKey]}) no-repeat;
						background-size: 100% 100%;
						"></div>
					<div style="margin-left: 4px;">${ruleName}</div>`;
          }
        }
        let headerTitleText = ruleName;
        if (netDiskRuleConfig.isUserRule) {
          headerTitleText += /*html*/
          `<div class="netdisk-custom-rule-edit" data-key="${ruleKey}" data-type="${netDiskRuleConfig.setting.name}">${__pops.config.iconSVG.edit}</div>`;
          headerTitleText += /*html*/
          `<div class="netdisk-custom-rule-delete" data-key="${ruleKey}" data-type="${netDiskRuleConfig.setting.name}">${__pops.config.iconSVG.delete}</div>`;
        }
        this.$data.ruleContent.push({
          id: "netdisk-panel-config-" + ruleKey,
          title: asideTitle,
          headerTitle: headerTitleText,
          attributes: {
            "data-key": ruleKey
          },
          forms: viewConfig
        });
      });
    },
    /**
     * 转换规则为视图配置
     */
    parseRuleToViewConfig(netDiskRule) {
      let formConfigList = [];
      const settingConfig = netDiskRule.setting.configurationInterface;
      const ruleKey = netDiskRule.setting.key;
      if (settingConfig == null) {
        return [];
      }
      if (settingConfig.matchRange_text) {
        let matchRange_text_form = [];
        if ("before" in settingConfig.matchRange_text) {
          const default_value = typeof settingConfig.matchRange_text.before === "number" ? settingConfig.matchRange_text.before : 0;
          matchRange_text_form.push(
            UISlider(
              "间隔前",
              NetDiskLocalDataKey.template.matchRange_text.before(ruleKey),
              default_value,
              0,
              100,
              void 0,
              void 0,
              "提取码间隔前的字符长度"
            )
          );
        }
        if ("after" in settingConfig.matchRange_text) {
          const default_value = typeof settingConfig.matchRange_text.after === "number" ? settingConfig.matchRange_text.after : 0;
          matchRange_text_form.push(
            UISlider(
              "间隔后",
              NetDiskLocalDataKey.template.matchRange_text.after(ruleKey),
              default_value,
              0,
              100,
              void 0,
              void 0,
              "提取码间隔后的字符长度"
            )
          );
        }
        if (matchRange_text_form.length) {
          formConfigList.push({
            text: "提取码文本匹配Text",
            type: "forms",
            forms: matchRange_text_form
          });
        }
      }
      if (settingConfig.matchRange_html) {
        let matchRange_html_form = [];
        if ("before" in settingConfig.matchRange_html) {
          const default_value = typeof settingConfig.matchRange_html.before === "number" ? settingConfig.matchRange_html.before : 0;
          matchRange_html_form.push(
            UISlider(
              "间隔前",
              NetDiskLocalDataKey.template.matchRange_html.before(ruleKey),
              default_value,
              0,
              100,
              void 0,
              void 0,
              "提取码间隔前的字符长度"
            )
          );
        }
        if ("after" in settingConfig.matchRange_html) {
          const default_value = typeof settingConfig.matchRange_html.after === "number" ? settingConfig.matchRange_html.after : 0;
          matchRange_html_form.push(
            UISlider(
              "间隔后",
              NetDiskLocalDataKey.template.matchRange_html.after(ruleKey),
              default_value,
              0,
              100,
              void 0,
              void 0,
              "提取码间隔后的字符长度"
            )
          );
        }
        if (matchRange_html_form.length) {
          formConfigList.push({
            text: "提取码文本匹配HTML",
            type: "forms",
            forms: matchRange_html_form
          });
        }
      }
      if (settingConfig.function) {
        let function_form = [];
        if ("enable" in settingConfig.function) {
          let default_value = typeof settingConfig.function.enable === "boolean" ? settingConfig.function.enable : false;
          function_form.push(
            UISwitch(
              "启用",
              NetDiskLocalDataKey.template.function.enable(ruleKey),
              default_value,
              void 0,
              "开启可允许匹配该规则"
            )
          );
        }
        if ("linkClickMode" in settingConfig.function) {
          let default_value = typeof settingConfig.function.linkClickMode === "string" ? settingConfig.function.linkClickMode : "copy";
          let data = [
            {
              value: "copy",
              text: "复制到剪贴板"
            },
            {
              value: "openBlank",
              text: "新标签页打开"
            }
          ];
          let extendData = {
            parseFile: "文件解析"
          };
          if (settingConfig.function.linkClickMode_extend && Array.isArray(settingConfig.function.linkClickMode_extend)) {
            settingConfig.function.linkClickMode_extend.forEach((extendName) => {
              if (extendName in extendData) {
                data.push({
                  value: extendName,
                  text: extendData[extendName]
                });
              }
            });
          }
          function_form.push(
            UISelect(
              "点击动作",
              NetDiskLocalDataKey.template.function.linkClickMode(ruleKey),
              default_value,
              data,
              void 0,
              "点击匹配到的链接的执行的动作"
            )
          );
        }
        if ("checkLinkValidity" in settingConfig.function) {
          const default_value = typeof settingConfig.function.checkLinkValidity === "boolean" ? settingConfig.function.checkLinkValidity : true;
          function_form.push(
            UISwitch(
              "验证链接有效性",
              NetDiskLocalDataKey.template.function.checkLinkValidity(ruleKey),
              default_value,
              void 0,
              "自动请求链接，判断该链接是否有效，在大/小窗内显示验证结果图标"
            )
          );
        }
        if (function_form.length) {
          formConfigList.push({
            text: "功能",
            type: "forms",
            forms: function_form
          });
        }
      }
      if (settingConfig.linkClickMode_openBlank) {
        let linkClickMode_openBlank_form = [];
        if ("openBlankWithCopyAccessCode" in settingConfig.linkClickMode_openBlank) {
          const default_value = typeof settingConfig.linkClickMode_openBlank.openBlankWithCopyAccessCode === "boolean" ? settingConfig.linkClickMode_openBlank.openBlankWithCopyAccessCode : false;
          linkClickMode_openBlank_form.push(
            UISwitch(
              "跳转时复制访问码",
              NetDiskLocalDataKey.template.linkClickMode_openBlank.openBlankWithCopyAccessCode(
                ruleKey
              ),
              default_value,
              void 0,
              "当点击动作是【新标签页打开】时且存在访问码，那就会复制访问码到剪贴板"
            )
          );
        }
        if (linkClickMode_openBlank_form.length) {
          formConfigList.push({
            text: "点击动作-新标签页打开",
            type: "forms",
            forms: linkClickMode_openBlank_form
          });
        }
      }
      if (settingConfig.schemeUri) {
        const schemeUri_form = [];
        if ("enable" in settingConfig.schemeUri) {
          const default_value = typeof settingConfig.schemeUri.enable === "boolean" ? settingConfig.schemeUri.enable : false;
          schemeUri_form.push(
            UISwitch(
              "启用",
              NetDiskLocalDataKey.template.schemeUri.enable(ruleKey),
              default_value,
              void 0,
              "开启后可进行scheme uri转发"
            )
          );
        }
        if ("isForwardBlankLink" in settingConfig.schemeUri) {
          const default_value = typeof settingConfig.schemeUri.isForwardBlankLink === "boolean" ? settingConfig.schemeUri.isForwardBlankLink : false;
          schemeUri_form.push(
            UISwitch(
              "转发直链",
              NetDiskLocalDataKey.template.schemeUri.isForwardBlankLink(ruleKey),
              default_value,
              void 0,
              "对解析的直链进行scheme转换"
            )
          );
        }
        if ("isForwardLinearChain" in settingConfig.schemeUri) {
          const default_value = typeof settingConfig.schemeUri.isForwardLinearChain === "boolean" ? settingConfig.schemeUri.isForwardLinearChain : false;
          schemeUri_form.push(
            UISwitch(
              "转发新标签页链接",
              NetDiskLocalDataKey.template.schemeUri.isForwardBlankLink(ruleKey),
              default_value,
              void 0,
              "对新标签页打开的链接进行scheme转换"
            )
          );
        }
        if ("uri" in settingConfig.schemeUri) {
          const default_value = typeof settingConfig.schemeUri.uri === "string" ? settingConfig.schemeUri.uri : "";
          schemeUri_form.push(
            UIInput(
              "Uri链接",
              NetDiskLocalDataKey.template.schemeUri.uri(ruleKey),
              default_value,
              "自定义的Scheme的Uri链接",
              void 0,
              "jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx"
            )
          );
        }
        if (schemeUri_form.length) {
          formConfigList.push({
            text: "Scheme Uri转发",
            type: "forms",
            forms: schemeUri_form
          });
        }
      }
      if (settingConfig.ownFormList) {
        formConfigList.push(...settingConfig.ownFormList);
      }
      return formConfigList;
    },
    /**
     * 获取规则界面配置的内容
     */
    getRulePanelContent() {
      return this.$data.ruleContent;
    }
  };
  const NetDiskView_setting = {
    show() {
      var _a2;
      if (NetDiskUI.Alias.settingAlias) {
        log.error("设置界面已存在");
        Qmsg.error("设置界面已存在");
        return;
      }
      let content = PopsPanel.getPanelContentConfig();
      let ruleContent = NetDiskRule.getRulePanelContent();
      content = content.concat(ruleContent);
      NetDiskUI.Alias.settingAlias = NetDiskPops.panel(
        {
          title: {
            text: `${((_a2 = _GM_info == null ? void 0 : _GM_info.script) == null ? void 0 : _a2.name) || SCRIPT_NAME}-设置`,
            position: "center"
          },
          content,
          btn: {
            close: {
              enable: true,
              callback(event) {
                event.close();
                NetDiskUI.Alias.settingAlias = void 0;
              }
            }
          },
          mask: {
            clickCallBack(originalRun) {
              originalRun();
              NetDiskUI.Alias.settingAlias = void 0;
            }
          },
          class: "whitesevPopSetting",
          style: (
            /*css*/
            `
				div[class^="netdisk-custom-rule-"]{
					display: flex;
					align-items: center;
					margin-left: 10px;
					cursor: pointer;
				}
				div[class^="netdisk-custom-rule-"] svg,
				div[class^="netdisk-custom-rule-"] svg{
					width: 1.2em;
					height: 1.2em;
				}
				`
          )
        },
        NetDiskUI.popsStyle.settingView
      );
      domUtils.on(
        NetDiskUI.Alias.settingAlias.$shadowRoot,
        "click",
        ".netdisk-custom-rule-edit",
        function(event) {
          let $click = event.target;
          let ruleKey = $click.getAttribute("data-key");
          $click.getAttribute("data-type");
          NetDiskUserRule.showUI(true, ruleKey);
        }
      );
      domUtils.on(
        NetDiskUI.Alias.settingAlias.$shadowRoot,
        "click",
        ".netdisk-custom-rule-delete",
        function(event) {
          let $click = event.target;
          let ruleKey = $click.getAttribute("data-key");
          let ruleName = $click.getAttribute("data-type");
          NetDiskPops.alert({
            title: {
              text: "提示",
              position: "center"
            },
            content: {
              text: `确定删除自定义规则 ${ruleName}(${ruleKey}) 吗？`
            },
            btn: {
              ok: {
                callback(okEvent) {
                  let deleteStatus = NetDiskUserRule.deleteRule(ruleKey);
                  if (deleteStatus) {
                    let asideElement = NetDiskUI.Alias.settingAlias.$shadowRoot.querySelector(
                      `.pops-panel-aside > ul > li[data-key="${ruleKey}"]`
                    );
                    let $prev = asideElement.previousElementSibling;
                    let $next = asideElement.nextElementSibling;
                    if ($prev) {
                      $prev.click();
                    } else if ($next) {
                      $next.click();
                    }
                    asideElement == null ? void 0 : asideElement.remove();
                    Qmsg.success("删除成功");
                    okEvent.close();
                  } else {
                    Qmsg.error("删除自定义规则失败");
                  }
                }
              }
            }
          });
        }
      );
    }
  };
  const NetDiskSuspensionConfig = {
    position: {
      suspensionX: GenerateNetDiskConfig(
        "suspensionX",
        domUtils.width(window) - NetDiskConfig.suspension.size.value
      ),
      suspensionY: GenerateNetDiskConfig(
        "suspensionY",
        (domUtils.height(window) - NetDiskConfig.suspension.size.value) / 2
      ),
      isRight: GenerateNetDiskConfig("isRight", false)
    },
    mode: {
      current_suspension_smallwindow_mode: GenerateNetDiskConfig(
        "current_suspension_smallwindow_mode",
        "suspension"
      )
    }
  };
  const NetDiskSuspension = {
    suspensionNode: null,
    /** 是否已显示 */
    isShow: false,
    /** 是否已设置事件 */
    isSetEvent: false,
    /** 是否正在切换背景 */
    isRandBg: false,
    /**
     * 显示悬浮按钮
     */
    show() {
      if (!this.isShow) {
        this.isShow = true;
        this.createUI();
        this.setSuspensionPosition();
      }
      if (!this.isSetEvent) {
        this.isSetEvent = true;
        this.setSuspensionEvent();
        this.setResizeEventListener();
      }
      this.backgroundSwitch();
      this.showSuspension();
    },
    showSuspension() {
      this.suspensionNode.style.display = "";
    },
    hideSuspension() {
      this.suspensionNode.style.display = "none";
    },
    /**
     * 判断当前是否是顶部窗口
     * @returns {boolean}
     */
    isTopWindow() {
      return _unsafeWindow.self.window === _unsafeWindow.top.window;
    },
    /**
     * 创建UI界面
     */
    createUI() {
      if (NetDiskConfig.suspension.size.value < 15) {
        NetDiskConfig.suspension.size.value = 15;
      }
      if (NetDiskConfig.suspension.size.value > 250) {
        NetDiskConfig.suspension.size.value = 250;
      }
      if (NetDiskConfig.suspension.opacity.value < 0.1) {
        NetDiskConfig.suspension.opacity.value = 0.1;
      }
      if (NetDiskConfig.suspension.opacity.value > 1) {
        NetDiskConfig.suspension.opacity.value = 1;
      }
      let $shadowContainer = domUtils.createElement("div", {
        className: "whitesev-suspension-shadow-container"
      });
      let $shadowRoot = $shadowContainer.attachShadow({ mode: "open" });
      this.suspensionNode = domUtils.createElement(
        "div",
        {
          id: "whitesevSuspensionId",
          className: "whitesevSuspension",
          innerHTML: (
            /*html*/
            `
                <style type="text/css">

                ${this.getCSS()}

                </style>
                <div class="whitesevSuspensionMain">
                <div class="whitesevSuspensionFloor">
                    <div class="netdisk"></div>
                </div>
                </div>
                `
          )
        },
        {
          style: `
                    width: ${NetDiskConfig.suspension.size.value}px;
                    height: ${NetDiskConfig.suspension.size.value}px;
                    opacity: ${NetDiskConfig.suspension.opacity.value}
                `
        }
      );
      $shadowRoot.appendChild(this.suspensionNode);
      document.body.appendChild($shadowContainer);
    },
    /**
     * 设置 悬浮按钮所有事件
     */
    setSuspensionEvent() {
      let needDragElement = NetDiskUI.suspension.suspensionNode;
      let dragNode = new AnyTouch(needDragElement);
      let netDiskLinkViewTimer = void 0;
      let moveFlag = false;
      let isDouble = false;
      let clickElementLeftOffset = 0;
      let clickElementTopOffset = 0;
      dragNode.on("pan", function(event) {
        if (!moveFlag) {
          moveFlag = true;
          let rect = needDragElement.getBoundingClientRect();
          clickElementLeftOffset = event.x - rect.left;
          clickElementTopOffset = event.y - rect.top;
          domUtils.css(needDragElement, {
            cursor: "move",
            transition: "none"
          });
        }
        if (event.phase === "move") {
          let maxLeftOffset = domUtils.width(window) - NetDiskConfig.suspension.size.value;
          let maxTopOffset = domUtils.height(window) - NetDiskConfig.suspension.size.value;
          let currentSuspensionLeftOffset = event.x - clickElementLeftOffset;
          let currentSuspensionTopOffset = event.y - clickElementTopOffset;
          currentSuspensionLeftOffset = currentSuspensionLeftOffset > maxLeftOffset ? maxLeftOffset : currentSuspensionLeftOffset;
          currentSuspensionTopOffset = currentSuspensionTopOffset > maxTopOffset ? maxTopOffset : currentSuspensionTopOffset;
          currentSuspensionLeftOffset = currentSuspensionLeftOffset < 0 ? 0 : currentSuspensionLeftOffset;
          currentSuspensionTopOffset = currentSuspensionTopOffset < 0 ? 0 : currentSuspensionTopOffset;
          if (NetDiskUI.suspension.isTopWindow()) {
            NetDiskSuspensionConfig.position.suspensionX.value = currentSuspensionLeftOffset;
            NetDiskSuspensionConfig.position.suspensionY.value = currentSuspensionTopOffset;
          }
          domUtils.css(needDragElement, {
            left: currentSuspensionLeftOffset + "px",
            top: currentSuspensionTopOffset + "px"
          });
        }
        if (event.phase === "end") {
          moveFlag = false;
          domUtils.css(needDragElement, {
            cursor: "auto"
          });
          let currentSuspensionLeftOffset = parseInt(
            domUtils.css(needDragElement, "left")
          );
          if (NetDiskConfig.suspension["suspended-button-adsorption-edge"].value) {
            let setCSSLeft = 0;
            if (currentSuspensionLeftOffset >= domUtils.width(window) / 2) {
              setCSSLeft = domUtils.width(window) - NetDiskConfig.suspension.size.value;
              if (NetDiskUI.suspension.isTopWindow()) {
                NetDiskSuspensionConfig.position.isRight.value = true;
              }
            } else {
              if (NetDiskUI.suspension.isTopWindow()) {
                NetDiskSuspensionConfig.position.isRight.value = false;
              }
            }
            if (NetDiskUI.suspension.isTopWindow()) {
              NetDiskSuspensionConfig.position.suspensionX.value = setCSSLeft;
            }
            domUtils.css(needDragElement, {
              left: setCSSLeft + "px"
            });
          }
          domUtils.css(needDragElement, {
            transition: "left 300ms ease 0s"
          });
        }
      });
      dragNode.on(["click", "tap"], function(event) {
        clearTimeout(netDiskLinkViewTimer);
        netDiskLinkViewTimer = void 0;
        if (isDouble) {
          isDouble = false;
          NetDiskView_setting.show();
        } else {
          netDiskLinkViewTimer = setTimeout(() => {
            isDouble = false;
            if (NetDiskConfig.function["netdisk-behavior-mode"].value.includes(
              "smallwindow"
            )) {
              NetDiskSuspensionConfig.mode.current_suspension_smallwindow_mode.value = "smallwindow";
              NetDiskUI.suspension.hideSuspension();
            }
            NetDiskUI.view.show();
          }, 200);
          isDouble = true;
        }
      });
      NetDiskUI.setGlobalRightClickMenu(needDragElement);
    },
    /**
     * 设置window的resize事件监听，来重新设置悬浮按钮的位置
     */
    setResizeEventListener() {
      domUtils.on(globalThis, "resize", void 0, () => {
        let activeElement = document.activeElement;
        if (utils.isPhone()) {
          if (["input", "textarea"].includes(activeElement.localName)) {
            return;
          } else if (activeElement.hasAttribute("contenteditable") && activeElement.getAttribute("contenteditable") === "true" || activeElement.closest("[contenteditable='true']")) {
            return;
          } else if (!document.hasFocus()) {
            return;
          }
        }
        this.setSuspensionPosition();
      });
    },
    /**
     * 设置悬浮按钮位置
     */
    setSuspensionPosition() {
      let maxLeftOffset = domUtils.width(window) - NetDiskConfig.suspension.size.value;
      let maxTopOffset = domUtils.height(window) - NetDiskConfig.suspension.size.value;
      let userSetLeftOffset = NetDiskSuspensionConfig.position.suspensionX.value;
      let userSetTopOffset = NetDiskSuspensionConfig.position.suspensionY.value;
      if (NetDiskConfig.suspension["suspended-button-adsorption-edge"].value) {
        if (NetDiskSuspensionConfig.position.isRight.value) {
          userSetLeftOffset = maxLeftOffset;
        } else {
          userSetLeftOffset = 0;
        }
        if (userSetTopOffset > maxTopOffset) {
          userSetTopOffset = maxTopOffset;
        } else if (userSetTopOffset < 0) {
          userSetTopOffset = 0;
        }
        if (NetDiskUI.suspension.isTopWindow()) {
          NetDiskSuspensionConfig.position.suspensionX.value = userSetLeftOffset;
          NetDiskSuspensionConfig.position.suspensionY.value = userSetTopOffset;
        }
      }
      domUtils.css(NetDiskUI.suspension.suspensionNode, {
        left: userSetLeftOffset + "px",
        top: userSetTopOffset + "px"
      });
    },
    getCSS() {
      return (
        /*css*/
        `
            .whitesevSuspension{
                top: 0;
                position: fixed;
                right: 10px;
                border-radius: 12px;
                z-index: ${utils.getMaxValue(4e3, utils.getMaxZIndex(10))};
            }
            .whitesevSuspension .whitesevSuspensionMain{
                background: #fff;
                border: 1px solid #f2f2f2;
                box-shadow: 0 0 15px #e4e4e4;
                box-sizing: border-box;
                border-radius: inherit;
                height: inherit;
                width: inherit;
            }
            .whitesevSuspension .whitesevSuspensionFloor{
                border-bottom: 1px solid #f2f2f2;
                position: relative;
                box-sizing: border-box;
                border-radius: inherit;
                height: inherit;
                width: inherit;
            }
            .whitesevSuspension .whitesevSuspensionFloor .netdisk{
                background-position: center center;
                background-size: 115% 115%;
                background-repeat: no-repeat;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: inherit;
                height: inherit;
                width: inherit;
            }
            .whitesevSuspension .whitesevSuspensionFloor .netdisk:hover{
                transition: all 300ms linear;
                background-color: #e4e4e4;
                transform: scale(1.1);
            }
            .whitesevPop-content p[pop]{
                height: 100%;
            }
        `
      );
    },
    /**
     * 悬浮按钮背景轮播 效果为淡入淡出
     */
    backgroundSwitch() {
      if (this.isRandBg) {
        return;
      }
      function getRandBgList() {
        let resultList = [];
        NetDiskUI.isMatchedNetDiskIconMap.forEach((item) => {
          resultList = [...resultList, NetDiskUI.src.icon[item]];
        });
        return resultList;
      }
      function startSwitch(fadeTime, currentBackgroundSrc) {
        currentList = getRandBgList();
        domUtils.fadeOut(randBgNode, fadeTime, function() {
          currentIndex++;
          currentIndex = currentIndex < currentList.length ? currentIndex : 0;
          currentBackgroundSrc = currentList[currentIndex];
          domUtils.css(randBgNode, {
            "background-image": `url(${currentBackgroundSrc})`
          });
          domUtils.fadeIn(randBgNode, fadeTime, function() {
            setTimeout(() => {
              startSwitch(
                parseInt(
                  NetDiskConfig.suspension["randbg-time"].value.toString()
                ),
                currentBackgroundSrc
              );
            }, parseInt(NetDiskConfig.suspension["randbg-show-time"].value.toString()));
          });
        });
      }
      let currentList = [];
      let currentIndex = 0;
      currentList = getRandBgList();
      let randBgSrc = currentList[currentIndex];
      let randBgNode = NetDiskUI.suspension.suspensionNode.querySelector(
        ".whitesevSuspension .netdisk"
      );
      domUtils.css(randBgNode, {
        "background-image": `url(${randBgSrc})`
      });
      if (currentList.length < 2 || NetDiskConfig.suspension["randbg-time"].value <= 0) {
        return;
      }
      this.isRandBg = true;
      startSwitch(
        parseInt(
          NetDiskConfig.suspension["randbg-time"].value.toString().toString()
        ),
        randBgSrc
      );
    }
  };
  const NetDiskView_static = {
    getCSS() {
      return (
        /*css*/
        `
        .pops-folder-list .list-name-text{
            max-width: 300px;
        }
        .netdisk-static-link-onefile .pops-folder-list .list-name-text{
            max-width: 220px;
        }
        .netdisk-static-link-onefile .pops-mobile-folder-content .pops-folder-list .list-name-text{
            max-width: unset;
        }
        `
      );
    },
    /**
     * 单文件直链弹窗
     * @param fileDetails 配置
     */
    oneFile(fileDetails) {
      log.success(["成功获取单文件直链", fileDetails]);
      NetDiskPops.folder(
        {
          title: {
            text: fileDetails.title
          },
          folder: [
            {
              fileName: fileDetails.fileName,
              fileSize: fileDetails.fileSize,
              fileType: fileDetails.fileType ?? "",
              // @ts-ignore
              createTime: fileDetails.fileUploadTime || fileDetails.fileLatestTime,
              // @ts-ignore
              latestTime: fileDetails.fileLatestTime || fileDetails.fileUploadTime,
              isFolder: false,
              index: 0,
              async clickEvent() {
                if (typeof fileDetails.clickCallBack === "function") {
                  fileDetails.clickCallBack(fileDetails);
                } else {
                  return {
                    autoDownload: true,
                    mode: "aBlank",
                    url: fileDetails.downloadUrl
                  };
                }
              }
            }
          ],
          btn: {
            ok: {
              text: "下载",
              callback() {
                if (typeof fileDetails.clickCallBack === "function") {
                  fileDetails.clickCallBack(fileDetails);
                } else {
                  window.open(fileDetails.downloadUrl, "_blank");
                }
              }
            }
          },
          class: "netdisk-static-link-onefile",
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.oneFileStaticView
      );
    },
    /**
     * 多文件直链弹窗
     * @param title 标题
     * @param folderInfoList文件夹信息
     */
    moreFile(title, folderInfoList = []) {
      log.success(["文件解析信息", folderInfoList]);
      NetDiskPops.folder(
        {
          title: {
            text: title
          },
          folder: folderInfoList,
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.moreFileStaticView
      );
    }
  };
  const NetDiskView_newAccessCode = function(title = "密码错误", netDiskName = "", netDiskIndex, shareCode, accessCode, okCallBack = () => {
  }) {
    const accessCodeConfirm = NetDiskPops.prompt(
      {
        title: {
          text: title,
          position: "center",
          html: false
        },
        btn: {
          reverse: true,
          position: "end",
          cancel: {
            text: "取消"
          },
          ok: {
            callback: (event) => {
              var _a2, _b, _c, _d;
              let userInputAccessCode = event.text.replace(/[\s]*/gi, "");
              let uiLink = NetDisk.handleLinkShow(
                netDiskName,
                netDiskIndex,
                shareCode,
                userInputAccessCode,
                void 0
              );
              let currentItemSelector = `.netdisk-url a[data-netdisk='${netDiskName}'][data-sharecode='${shareCode}']`;
              let currentHistoryItemSelector = `.netdiskrecord-link a[data-netdisk='${netDiskName}'][data-sharecode='${shareCode}']`;
              let currentItemElement = (_b = (_a2 = NetDiskUI.Alias.uiLinkAlias) == null ? void 0 : _a2.$shadowRoot) == null ? void 0 : _b.querySelector(
                currentItemSelector
              );
              let currentHistoryItemElement = (_d = (_c = NetDiskUI.Alias.historyAlias) == null ? void 0 : _c.$shadowRoot) == null ? void 0 : _d.querySelector(
                currentHistoryItemSelector
              );
              if (currentItemElement) {
                currentItemElement.setAttribute(
                  "data-accesscode",
                  userInputAccessCode
                );
                domUtils.html(currentItemElement, uiLink);
              }
              if (currentHistoryItemElement) {
                currentHistoryItemElement.setAttribute(
                  "data-accesscode",
                  userInputAccessCode
                );
                domUtils.html(currentHistoryItemElement, uiLink);
              }
              log.info(`${netDiskName} 重新输入的密码：${userInputAccessCode}`);
              okCallBack(userInputAccessCode);
              event.close();
            }
          }
        },
        content: {
          placeholder: "请重新输入密码",
          focus: true,
          select: true,
          text: accessCode == null ? "" : typeof accessCode === "string" ? accessCode : ""
        }
      },
      NetDiskUI.popsStyle.inputNewAccessCodeView
    );
    domUtils.listenKeyboard(
      accessCodeConfirm.$shadowRoot,
      "keypress",
      (keyName) => {
        if (keyName === "Enter") {
          const $ok = accessCodeConfirm.$shadowRoot.querySelector(
            ".pops-prompt-btn-ok"
          );
          $ok.click();
        }
      }
    );
  };
  const NetDiskView_historyMatch = {
    /**
     * 本地存储的keyName
     */
    storageKey: "netDiskHistoryMatch",
    /**
     * 是否已设置其它DOM事件
     */
    isSetOtherEvent: false,
    /**
     * 分页
     */
    dataPaging: void 0,
    /**
     * 显示弹窗
     */
    show() {
      let data = this.getNetDiskHistoryMatchData();
      let dataHTML = "";
      let that = this;
      data = this.orderNetDiskHistoryMatchData(data);
      for (let index = 0; index < 10; index++) {
        if (data[index]) {
          dataHTML += that.getTableHTML(data[index]);
        }
      }
      dataHTML = /*html*/
      `
        <div class="netdiskrecord-search">
            <input type="text" placeholder="搜索链接/网址/网址标题，可正则搜索">
        </div>
        <div class="netdiskrecord-table"><ul>${dataHTML}</ul></div>
        <div class="netdiskrecord-page">

        </div>`;
      NetDiskUI.Alias.historyAlias = NetDiskPops.confirm(
        {
          title: {
            text: "历史匹配记录",
            position: "center"
          },
          content: {
            text: dataHTML,
            html: true
          },
          btn: {
            reverse: true,
            position: "space-between",
            ok: {
              enable: true,
              callback(event) {
                event.close();
                NetDiskUI.Alias.historyAlias = void 0;
              }
            },
            close: {
              callback(event) {
                event.close();
                NetDiskUI.Alias.historyAlias = void 0;
              }
            },
            cancel: {
              enable: false
            },
            other: {
              enable: true,
              text: `清空所有(${data.length})`,
              type: "xiaomi-primary",
              callback: (event) => {
                NetDiskPops.confirm({
                  title: {
                    text: "删除",
                    position: "center"
                  },
                  content: {
                    text: "确定清空所有的记录？",
                    html: false
                  },
                  btn: {
                    ok: {
                      enable: true,
                      callback(okEvent) {
                        that.clearNetDiskHistoryMatchData();
                        domUtils.remove(
                          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelectorAll(
                            ".whitesevPopNetDiskHistoryMatch .pops-confirm-content ul li"
                          )
                        );
                        okEvent.close();
                        domUtils.html(
                          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
                            ".whitesevPopNetDiskHistoryMatch .netdiskrecord-page"
                          ),
                          ""
                        );
                        domUtils.text(
                          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
                            ".whitesevPopNetDiskHistoryMatch .pops-confirm-btn-other"
                          ),
                          domUtils.text(
                            NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
                              ".whitesevPopNetDiskHistoryMatch .pops-confirm-btn-other"
                            )
                          ).replace(/[\d]+/gi, "0")
                        );
                      }
                    },
                    cancel: {
                      text: "取消",
                      enable: true
                    }
                  }
                });
              }
            }
          },
          mask: {
            clickCallBack(originalRun) {
              originalRun();
              NetDiskUI.Alias.historyAlias = null;
            }
          },
          class: "whitesevPopNetDiskHistoryMatch",
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.historyMatchView
      );
      this.setDataPaging(data);
      this.setEvent(NetDiskUI.Alias.historyAlias.$shadowRoot);
      this.setSearchEvent();
      NetDiskUI.setRightClickMenu(
        NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
          ".whitesevPopNetDiskHistoryMatch"
        ),
        ".netdiskrecord-link a",
        true
      );
    },
    /**
     * 获取CSS
     */
    getCSS() {
      return (
        /*css*/
        `
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content ul{

        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 10px;
            box-shadow: 0 0.3px 0.6px rgb(0 0 0 / 6%), 0 0.7px 1.3px rgb(0 0 0 / 8%), 0 1.3px 2.5px rgb(0 0 0 / 10%), 0 2.2px 4.5px rgb(0 0 0 / 12%), 0 4.2px 8.4px rgb(0 0 0 / 14%), 0 10px 20px rgb(0 0 0 / 20%);
            margin: 20px 10px;
            padding: 10px;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-search{
            height: 11%;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-table{
            height: calc( 85% - 40px);
            overflow: auto;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-page{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-search input{
            border: none;
            border-bottom: 1px solid #000000;
            padding: 0px 5px;
            line-height: 28px;
            width: -moz-available;
            width: -webkit-fill-available;
            width: fill-available;
            margin: 5px 5px 0px 5px;
            background: none;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-search input:focus-visible{
            outline: none;
            border-bottom: 1px solid #0009ff;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link{
        
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link a{
            color: #ff4848;
            font-size: 0.8em;
            border: none;
            word-break: break-word;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link a[isvisited=true]{
            color: #8b8888;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-icon{
        
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-icon .netdisk-icon-img{
            width: 28px;
            height: 28px;
            min-width: 28px;
            min-height: 28px;
            font-size: 0.8em;
            border-radius: 10px;
            box-shadow: 0 0.3px 0.6px rgb(0 0 0 / 6%), 0 0.7px 1.3px rgb(0 0 0 / 8%), 0 1.3px 2.5px rgb(0 0 0 / 10%), 0 2.2px 4.5px rgb(0 0 0 / 12%), 0 4.2px 8.4px rgb(0 0 0 / 14%), 0 10px 20px rgb(0 0 0 / 20%);
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-url{
            color: #000;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-top-url{
            color: #000;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-functions button.btn-delete{
            background: #263cf3;
            color: #fff;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-functions button.btn-delete:active{
            background: #6e7be8;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-icon,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-url,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-top-url,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-add-time,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-update-time,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-url-title,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-functions{
            display: flex;
            margin: 5px 0px;
        }
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-icon p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-url p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-top-url p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-add-time p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-update-time p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-url-title p,
        .whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-functions p{
            min-width: 80px;
            max-width: 80px;
            align-self: center;
        }
        `
      );
    },
    /**
     * 获取显示出的每一项的html
     * @param data
     */
    getTableHTML(data) {
      let netDiskURL = NetDisk.handleLinkShow(
        data.netDiskName,
        data.netDiskIndex,
        data.shareCode,
        data.accessCode,
        data.matchText
      );
      return (
        /*html*/
        `
		<li>
			<div class="netdiskrecord-link">
				<p>链接</p>
				<a  href="javascript:;"
					isvisited="false"
					${NetDiskView.createElementAttributeRuleInfo({
        netDisk: data.netDiskName,
        netDiskIndex: data.netDiskIndex,
        shareCode: data.shareCode,
        accessCode: data.accessCode
      })}>${netDiskURL}</a>
			</div>
			<div class="netdiskrecord-icon">
				<p>网盘</p>
				<div class="netdisk-icon-img" style="background: url(${NetDiskUI.src.icon[data.netDiskName]}) no-repeat;background-size:100%"></div>
			</div>
			${data.url === data.topURL ? (
        /*html*/
        `
			<div class="netdiskrecord-url">
				<p>网址</p>
				<a href="${data.url}" target="_blank">${data.url}</a>
			</div>
			`
      ) : (
        /*html*/
        `
			<div class="netdiskrecord-url">
				<p>网址</p>
				<a href="${data.url}" target="_blank">${data.url}</a>
			</div>
			<div class="netdiskrecord-top-url">
				<p>TOP网址</p>
				<a href="${data.topURL}" target="_blank">${data.topURL}</a>
			</div>
			`
      )}
			<div class="netdiskrecord-url-title">
				<p>网址标题</p>
				${data.title}
			</div>
			<div class="netdiskrecord-add-time">
				<p>记录时间</p>
				${utils.formatTime(data.addTime)}
			</div>
			<div class="netdiskrecord-update-time">
				<p>更新时间</p>
				${utils.formatTime(data.updateTime)}
			</div>
			<div class="netdiskrecord-functions">
				<p>功能</p>
				<button class="btn-delete" data-json='${JSON.stringify(data)}'>删除</button>
			</div>
		</li>`
      );
    },
    /**
     * 设置只执行一次的事件
     * @param target
     */
    setEvent(target) {
      let that = this;
      NetDiskUI.view.setNetDiskUrlClickEvent(
        target,
        ".whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-link a"
      );
      domUtils.on(
        target,
        "click",
        ".whitesevPopNetDiskHistoryMatch .pops-confirm-content .netdiskrecord-functions button.btn-delete",
        function(event) {
          var _a2;
          let deleteLoading = NetDiskPops.loading({
            parent: target.querySelector(
              ".whitesevPopNetDiskHistoryMatch .pops-confirm-content ul"
            ),
            content: {
              text: "删除中..."
            },
            only: true,
            addIndexCSS: false
          });
          let clickNode = event.target;
          let dataJSON = clickNode.getAttribute("data-json");
          (_a2 = clickNode.closest("li")) == null ? void 0 : _a2.remove();
          that.deleteNetDiskHistoryMatchData(dataJSON);
          deleteLoading == null ? void 0 : deleteLoading.close();
          let totalNumberText = domUtils.text(
            target.querySelector(
              ".whitesevPopNetDiskHistoryMatch .pops-confirm-btn-other"
            )
          );
          let totalNumberMatch = totalNumberText.match(/[\d]+/gi);
          let totalNumber = parseInt(
            totalNumberMatch[totalNumberMatch.length - 1]
          );
          totalNumber--;
          totalNumberText = totalNumberText.replace(
            /[\d]+/gi,
            totalNumber.toString()
          );
          domUtils.text(
            target.querySelector(
              ".whitesevPopNetDiskHistoryMatch .pops-confirm-btn-other"
            ),
            totalNumberText
          );
          let data = that.getNetDiskHistoryMatchData();
          data = that.orderNetDiskHistoryMatchData(data);
          that.dataPaging.refresh(data);
          that.pageChangeCallBack(data, that.dataPaging.CONFIG.currentPage);
        }
      );
    },
    /**
     * 页码改变的回调
     * @param data
     * @param page
     */
    pageChangeCallBack(data, page) {
      let startIndex = (page - 1) * 10;
      let dataHTML = "";
      for (let index = 0; index < 10; index++) {
        if (data[startIndex]) {
          dataHTML += this.getTableHTML(data[startIndex]);
        } else {
          break;
        }
        startIndex++;
      }
      NetDiskUI.Alias.historyAlias.$shadowRoot.querySelectorAll(
        ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul li"
      ).forEach((ele) => ele.remove());
      domUtils.append(
        NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
          ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul"
        ),
        dataHTML
      );
    },
    /**
     * 设置分页
     * @param data
     */
    setDataPaging(data) {
      let that = this;
      let dataPaging = new __DataPaging({
        data,
        pageCount: 10,
        pageStep: __pops.isPhone() ? 2 : 4,
        currentPage: 1,
        pageChangeCallBack: function(page) {
          that.pageChangeCallBack(data, page);
        }
      });
      this.dataPaging = dataPaging;
      dataPaging.addCSS(NetDiskUI.Alias.historyAlias.$shadowRoot);
      dataPaging.append(
        NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
          ".whitesevPopNetDiskHistoryMatch .netdiskrecord-page"
        )
      );
    },
    /**
     * 设置搜索框的回车事件
     */
    setSearchEvent() {
      let isSeaching = false;
      let searchLoading = void 0;
      let that = this;
      function searchEvent() {
        if (isSeaching) {
          return;
        }
        isSeaching = true;
        searchLoading = NetDiskPops.loading({
          parent: NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
            ".whitesevPopNetDiskHistoryMatch .pops-confirm-content ul"
          ),
          content: {
            text: "搜索中..."
          },
          only: true,
          addIndexCSS: false
        });
        let inputText = NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
          ".whitesevPopNetDiskHistoryMatch .netdiskrecord-search input"
        ).value.trim();
        let data = that.getNetDiskHistoryMatchData();
        data = that.orderNetDiskHistoryMatchData(data);
        if (inputText === "") {
          let historyDataHTML = "";
          data.forEach((item, index) => {
            if (index > 9) {
              return;
            }
            historyDataHTML += that.getTableHTML(item);
          });
          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelectorAll(
            ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul li"
          ).forEach((ele) => ele.remove());
          domUtils.append(
            NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
              ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul"
            ),
            historyDataHTML
          );
          searchLoading == null ? void 0 : searchLoading.close();
          isSeaching = false;
          that.setDataPaging(data);
          return;
        }
        let isFindHTML = "";
        data.forEach((item) => {
          let netDiskURL = NetDisk.handleLinkShow(
            item.netDiskName,
            item.netDiskIndex,
            item.shareCode,
            item.accessCode,
            item.matchText
          );
          if (netDiskURL.match(new RegExp(inputText, "ig")) || item.url.match(new RegExp(inputText, "ig")) || item.topURL.match(new RegExp(inputText, "ig")) || item.title.match(new RegExp(inputText, "ig"))) {
            isFindHTML += that.getTableHTML(item);
          }
        });
        domUtils.remove(
          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelectorAll(
            ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul li"
          )
        );
        domUtils.append(
          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
            ".whitesevPopNetDiskHistoryMatch .netdiskrecord-table ul"
          ),
          isFindHTML
        );
        domUtils.remove(
          NetDiskUI.Alias.historyAlias.$shadowRoot.querySelectorAll(
            ".whitesevPopNetDiskHistoryMatch .netdiskrecord-page > *"
          )
        );
        searchLoading == null ? void 0 : searchLoading.close();
        searchLoading = void 0;
        isSeaching = false;
      }
      domUtils.listenKeyboard(
        NetDiskUI.Alias.historyAlias.$shadowRoot.querySelector(
          ".whitesevPopNetDiskHistoryMatch .netdiskrecord-search input"
        ),
        "keypress",
        (keyName) => {
          if (keyName === "Enter") {
            searchEvent();
          }
        }
      );
    },
    /**
     * 排序数据
     * @param data
     */
    orderNetDiskHistoryMatchData(data) {
      let localOrder = NetDiskConfig.historyMatch["netdisk-history-match-ordering-rule"].value;
      let isDesc = localOrder.indexOf("降序") !== -1 ? true : false;
      let orderField = localOrder.indexOf("记录时间") !== -1 ? "addTime" : "updateTime";
      utils.sortListByProperty(
        data,
        (item) => {
          return item[orderField];
        },
        isDesc
      );
      return data;
    },
    /**
     * 存储匹配到的链接
     * @param netDiskName 网盘名称
     * @param netDiskIndex 网盘名称索引下标
     * @param shareCode 分享码
     * @param accessCode 访问码
     * @param matchText 匹配到的文本
     */
    setNetDiskHistoryMatchData(netDiskName, netDiskIndex, shareCode, accessCode, matchText) {
      if (!NetDiskConfig.historyMatch.saveMatchNetDisk.value) {
        return;
      }
      let localData = this.getNetDiskHistoryMatchData();
      for (let index = 0; index < localData.length; index++) {
        const data = localData[index];
        if (data.url === window.location.href && data.topURL === top.window.location.href && data.netDiskName === netDiskName && shareCode.startsWith(data.shareCode) && data.netDiskIndex === netDiskIndex) {
          if (data.matchText !== matchText) {
            log.success(["匹配历史记录 -> 设置新的matchText", [matchText]]);
            localData[index].matchText = matchText;
            localData[index].updateTime = Date.now();
            if (localData[index].title) {
              localData[index].title = document.title;
            }
            _GM_setValue(this.storageKey, localData);
            return;
          }
          if (data.accessCode !== accessCode) {
            log.success("匹配历史记录 -> 修改accessCode");
            localData[index].accessCode = accessCode;
            localData[index].updateTime = Date.now();
            if (localData[index].title) {
              localData[index].title = document.title;
            }
            _GM_setValue(this.storageKey, localData);
            return;
          }
          if (data.accessCode === accessCode) {
            return;
          }
        }
      }
      log.success("匹配历史记录 -> 增加新的");
      let time = Date.now();
      localData = [
        ...localData,
        {
          url: window.location.href,
          topURL: top.window.location.href,
          netDiskName,
          netDiskIndex,
          shareCode,
          accessCode,
          addTime: time,
          updateTime: time,
          title: document.title || top.document.title,
          matchText
        }
      ];
      _GM_setValue(this.storageKey, localData);
    },
    /**
     * 获取历史匹配到的链接
     */
    getNetDiskHistoryMatchData() {
      let data = _GM_getValue(this.storageKey);
      if (data == null) {
        data = [];
        _GM_setValue(this.storageKey, data);
      }
      return data;
    },
    /**
     * 检测并尝试修复本地的数据
     */
    checkAndRepairLocalData() {
      let repairCount = 0;
      let data = _GM_getValue(this.storageKey);
      if (Array.isArray(data)) {
        for (let index = 0; index < data.length; index++) {
          const itemData = data[index];
          if (typeof itemData["matchText"] !== "string") {
            itemData["matchText"] = "";
            repairCount++;
          }
        }
      } else {
        data = [];
      }
      _GM_setValue(this.storageKey, data);
      return {
        count: data.length,
        repairCount
      };
    },
    /**
     * 删除存储的某个项
     * @param dataJSONText
     */
    deleteNetDiskHistoryMatchData(dataJSONText) {
      let isSuccess = false;
      let data = this.getNetDiskHistoryMatchData();
      for (let index = 0; index < data.length; index++) {
        if (JSON.stringify(data[index]) === dataJSONText) {
          log.success(["删除 ===> ", data[index]]);
          data.splice(index, 1);
          isSuccess = true;
          break;
        }
      }
      if (isSuccess) {
        _GM_setValue(this.storageKey, data);
      }
      return isSuccess;
    },
    /**
     * 清空所有配置
     */
    clearNetDiskHistoryMatchData() {
      _GM_setValue(this.storageKey, []);
    }
  };
  const NetDiskView_accessCodeRule = {
    /**
     * 弹窗的className
     */
    accessCodeRuleDialogClassName: "whitesevPopNetDiskAccessCodeRule",
    /**
     * 显示弹窗
     */
    show() {
      let that = this;
      let popsConfirm = NetDiskPops.confirm(
        {
          title: {
            text: "自定义访问码规则",
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `
                    <div class="netdisk-accesscode-rule-table">
                        <ul>
                        ${that.getShowItemHTML()}
                        </ul>
                    </div>
                    `
            ),
            html: true
          },
          btn: {
            merge: true,
            reverse: false,
            position: "space-between",
            ok: {
              enable: true,
              text: "添加",
              callback(event) {
                that.showRule(event);
              }
            },
            close: {
              callback(event) {
                event.close();
              }
            },
            cancel: {
              enable: true
            },
            other: {
              enable: true,
              type: "xiaomi-primary",
              text: `清空所有`,
              callback(event) {
                NetDiskPops.confirm({
                  title: {
                    text: "删除",
                    position: "center"
                  },
                  content: {
                    text: "确定清空所有的规则？",
                    html: false
                  },
                  btn: {
                    ok: {
                      enable: true,
                      callback: function(okEvent) {
                        log.success("清空所有");
                        that.deleteAllValue();
                        if (that.getValue().length) {
                          Qmsg.error("清空全部规则失败");
                          return;
                        } else {
                          Qmsg.success("已清空全部规则");
                        }
                        that.setDeleteAllBtnText(event.animElement);
                        event.animElement.querySelector(
                          ".pops-confirm-content ul"
                        ).innerHTML = "";
                        okEvent.close();
                      }
                    },
                    cancel: {
                      text: "取消",
                      enable: true
                    }
                  }
                });
              }
            }
          },
          class: this.accessCodeRuleDialogClassName,
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.accessCodeRuleView
      );
      that.setDeleteAllBtnText(popsConfirm.animElement);
      this.setEvent(popsConfirm);
    },
    getShowItemHTML() {
      let result = "";
      this.getValue().forEach((item) => {
        let netdiskName = "";
        item.netdisk.forEach((_netdisk_) => {
          netdiskName += _netdisk_.name;
          netdiskName += "、";
        });
        netdiskName = netdiskName.replace(/、$/g, "");
        result += /*html*/
        `
            <li>
                <div class="accesscode-rule-url-regexp">
                <p>匹配规则</p>
                ${item.urlRegexp}
                </div>
                <div class="accesscode-rule-netdisk-name">
                <p>匹配网盘</p>
                ${netdiskName}
                </div>
                <div class="accesscode-rule-accesscode">
                <p>固定值</p>
                ${item.accessCode}
                </div>
                <div class="accesscode-rule-functions" data-json='${JSON.stringify(
        item
      )}'>
                <p>功能</p>
                <button style="background: #46cb31;color: #fff;" data-edit>修改</button>
                <button style="background: #263cf3;color: #fff;" data-delete>删除</button>
                </div>
            </li>
              `;
      });
      return result;
    },
    getCSS() {
      return (
        /*css*/
        `
        .pops-confirm-content .whitesev-accesscode-rule{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 15px 15px;
        }
        
        .pops-confirm-content div.netdisk-accesscode-rule-table{
            /* height: calc( 85% - 40px); */
            overflow: auto;
        }

        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-url-regexp,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-netdisk-name,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-accesscode,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-functions{
            display: flex;
            margin: 5px 0px;
        }

        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-url-regexp p,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-netdisk-name p,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-accesscode p,
        .pops-confirm-content .netdisk-accesscode-rule-table .accesscode-rule-functions p{
            min-width: 80px;
            max-width: 80px;
            align-self: center;
        }
        .pops-confirm-content .netdisk-accesscode-rule-table li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-radius: 10px;
            box-shadow: 0 0.3px 0.6px rgb(0 0 0 / 6%), 0 0.7px 1.3px rgb(0 0 0 / 8%), 0 1.3px 2.5px rgb(0 0 0 / 10%), 0 2.2px 4.5px rgb(0 0 0 / 12%), 0 4.2px 8.4px rgb(0 0 0 / 14%), 0 10px 20px rgb(0 0 0 / 20%);
            margin: 20px 10px;
            padding: 10px;
        }
        `
      );
    },
    /**
     * 显示规则弹窗进行添加/修改
     * @param mainEvent
     * @param isEdit 是否是修改模式
     * @param oldValue 当isEdie为true时传入的值
     */
    showRule(mainEvent, isEdit = false, oldValue) {
      let that = this;
      let $popsConfirm = NetDiskPops.confirm(
        {
          title: {
            text: isEdit ? "修改规则" : "添加规则",
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `
                    <div class="whitesev-accesscode-rule">
                        <div type-name>匹配网站</div>
                        <div class="pops-panel-input">
                        <input type="text" placeholder="请输入需要匹配的正则规则" val-key="access-rule-url" />
                        </div>
                    </div>
                    <div class="whitesev-accesscode-rule">
                        <div>匹配网盘</div>
                        <div class="pops-panel-select">
                        <select val-key="access-rule-netdisk" multiple="true" style="height: auto;">
                        </select>
                        </div>
                    </div>
                    <div class="whitesev-accesscode-rule">
                        <div>固定值</div>
                        <div class="pops-panel-input">
                        <input type="text" placeholder="请输入固定的访问码" val-key="access-rule-accesscode" />
                        </div>
                    </div>
                    `
            ),
            html: true
          },
          btn: {
            ok: {
              enable: true,
              text: isEdit ? "修改" : "添加",
              callback(event) {
                let $pops = event.popsElement;
                let accessRuleUrl = $pops.querySelector(
                  'input[val-key="access-rule-url"]'
                ).value;
                let accessRuleNetDisk = [];
                let accessRuleNetDiskElement = $pops.querySelector(
                  'select[val-key="access-rule-netdisk"]'
                );
                Array.from(accessRuleNetDiskElement.selectedOptions).forEach(
                  (item) => {
                    accessRuleNetDisk.push({
                      name: item.value,
                      value: item.getAttribute("data-value")
                    });
                  }
                );
                let accessRuleAccessCode = $pops.querySelector(
                  'input[val-key="access-rule-accesscode"]'
                ).value;
                if (!that.checkRuleUrlValid(accessRuleUrl)) {
                  log.error(["验证失败", accessRuleUrl]);
                  return;
                }
                if (isEdit) {
                  if (that.changeValue(oldValue, {
                    urlRegexp: accessRuleUrl,
                    netdisk: accessRuleNetDisk,
                    accessCode: accessRuleAccessCode
                  })) {
                    log.success([
                      "修改成功",
                      {
                        urlRegexp: accessRuleUrl,
                        netdisk: accessRuleNetDisk,
                        accessCode: accessRuleAccessCode
                      }
                    ]);
                    Qmsg.success("修改成功");
                    mainEvent.animElement.querySelector(
                      ".netdisk-accesscode-rule-table ul"
                    ).innerHTML = that.getShowItemHTML();
                    $popsConfirm.close();
                  } else {
                    Qmsg.error("修改失败");
                  }
                } else {
                  if (that.addValue({
                    urlRegexp: accessRuleUrl,
                    netdisk: accessRuleNetDisk,
                    accessCode: accessRuleAccessCode
                  })) {
                    Qmsg.success("添加成功");
                    mainEvent.animElement.querySelector(
                      ".netdisk-accesscode-rule-table ul"
                    ).innerHTML = that.getShowItemHTML();
                    that.setDeleteAllBtnText(mainEvent.animElement);
                    $popsConfirm.close();
                  } else {
                    Qmsg.error("已存在重复的规则");
                  }
                }
              }
            },
            cancel: {
              text: "取消",
              enable: true
            }
          },
          class: "whitesevPopNetDiskAccessCodeRuleAddOrEdit",
          style: (
            /*css*/
            `
                ${__pops.config.cssText.panelCSS}

                .whitesevPopNetDiskAccessCodeRuleAddOrEdit .whitesev-accesscode-rule{
                    display: flex;
                    justify-content: space-between;
                    margin: 4px 4px;
                }
                .whitesevPopNetDiskAccessCodeRuleAddOrEdit .whitesev-accesscode-rule select{
                    height: 150px;
                }
                `
          )
        },
        NetDiskUI.popsStyle.accessCodeRuleEditView
      );
      this.setRuleEvent($popsConfirm.element);
      const $select = $popsConfirm.$shadowRoot.querySelector("select");
      let $optionFragment = document.createDocumentFragment();
      NetDisk.rule.forEach((ruleConfig) => {
        let $option = domUtils.createElement(
          "option",
          {
            innerText: ruleConfig.setting.name
          },
          {
            "data-value": ruleConfig.setting.key
          }
        );
        $optionFragment.appendChild($option);
      });
      $select.appendChild($optionFragment);
      if (isEdit) {
        $popsConfirm.element.querySelector(
          '.whitesev-accesscode-rule input[val-key="access-rule-url"]'
        ).value = oldValue.urlRegexp;
        let optionElement = $popsConfirm.element.querySelectorAll(
          '.whitesev-accesscode-rule select[val-key="access-rule-netdisk"] option'
        );
        oldValue.netdisk.forEach((item) => {
          optionElement.forEach((element) => {
            if (element.getAttribute("data-value") === item.value) {
              element.selected = true;
              log.success(["选中", element]);
              return;
            }
          });
        });
        $popsConfirm.element.querySelector(
          '.whitesev-accesscode-rule input[val-key="access-rule-accesscode"]'
        ).value = oldValue.accessCode;
      }
    },
    /**
     * 修改 删除所有(xx)的文字
     * @param element
     */
    setDeleteAllBtnText(element) {
      let $btnOther = element.querySelector(
        ".pops-confirm-btn button.pops-confirm-btn-other"
      );
      if ($btnOther) {
        $btnOther.textContent = `清空所有(${this.getValue().length})`;
      } else if (element.getRootNode() instanceof ShadowRoot) {
        let $root = element.getRootNode();
        $root.querySelector(
          ".whitesevPopNetDiskAccessCodeRule .pops-confirm-btn button.pops-confirm-btn-other"
        ).textContent = `清空所有(${this.getValue().length})`;
      }
    },
    /**
     * 校验填写的匹配网站正则规则是否正确
     * @param accessRuleUrl 填写的匹配网站正则规则
     */
    checkRuleUrlValid(accessRuleUrl) {
      if (utils.isNull(accessRuleUrl)) {
        Qmsg.error("匹配网站的正则不能为空或纯空格");
        return false;
      }
      try {
        new RegExp(accessRuleUrl);
      } catch (error) {
        log.error(error);
        Qmsg.error("匹配网站的正则错误</br>" + error.message, {
          html: true,
          timeout: 5e3
        });
        return false;
      }
      return true;
    },
    /**
     * 设置事件
     * @param event
     */
    setEvent(event) {
      let that = this;
      domUtils.on(
        event.animElement,
        "click",
        ".netdisk-accesscode-rule-table div.accesscode-rule-functions button[data-delete]",
        function() {
          let dataJSONStr = this.closest(
            ".accesscode-rule-functions"
          ).getAttribute("data-json");
          let dataJSON = utils.toJSON(dataJSONStr);
          log.success(["删除👉", dataJSON]);
          if (that.deleteValue(dataJSON)) {
            this.closest("li").remove();
            that.setDeleteAllBtnText(event.animElement);
          } else {
            Qmsg.error("删除失败");
          }
        }
      );
      domUtils.on(
        event.element,
        "click",
        ".netdisk-accesscode-rule-table div.accesscode-rule-functions button[data-edit]",
        function() {
          let dataJSONStr = this.closest(
            ".accesscode-rule-functions"
          ).getAttribute("data-json");
          let dataJSON = utils.toJSON(dataJSONStr);
          log.success(["修改👉", dataJSON]);
          let newEvent = Object.assign({}, event);
          newEvent.animElement = newEvent.element;
          that.showRule(newEvent, true, dataJSON);
        }
      );
    },
    /**
     * 设置事件
     * @param element 弹窗元素
     */
    setRuleEvent(element) {
    },
    /**
     * 获取值
     */
    getValue() {
      return _GM_getValue("accessCodeRule", []);
    },
    /**
     * 设置值
     * @param value
     */
    setValue(value) {
      let localData = this.getValue();
      localData.push(value);
      _GM_setValue("accessCodeRule", localData);
    },
    /**
     * 修改值
     * @param oldValue
     * @param newValue
     */
    changeValue(oldValue, newValue) {
      let result = false;
      let localData = this.getValue();
      let oldValueStr = JSON.stringify(oldValue);
      for (let i = 0; i < localData.length; i++) {
        if (JSON.stringify(localData[i]) === oldValueStr) {
          localData[i] = newValue;
          result = true;
          break;
        }
      }
      _GM_setValue("accessCodeRule", localData);
      return result;
    },
    /**
     * 添加值
     * @param value
     */
    addValue(value) {
      let result = true;
      let localData = this.getValue();
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].urlRegexp === value.urlRegexp && localData[i].netdisk === value.netdisk) {
          result = false;
          break;
        }
      }
      if (result) {
        localData.push(value);
        this.setValue(value);
      }
      return result;
    },
    /**
     * 删除值
     */
    deleteValue(value) {
      let result = false;
      let localData = this.getValue();
      let valueStr = JSON.stringify(value);
      for (let i = 0; i < localData.length; i++) {
        if (JSON.stringify(localData[i]) === valueStr) {
          localData.splice(i, 1);
          result = true;
          break;
        }
      }
      if (result) {
        _GM_setValue("accessCodeRule", localData);
      }
      return result;
    },
    /**
     * 清空所有规则
     */
    deleteAllValue() {
      _GM_setValue("accessCodeRule", []);
    }
  };
  const NetDiskView_matchPasteText = {
    show() {
      let popsConfirm = NetDiskPops.confirm(
        {
          title: {
            text: "主动识别文本",
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `
                    <textarea class="netdisk-match-paste-text"></textarea>
                    `
            ),
            html: true
          },
          btn: {
            ok: {
              text: "识别",
              callback() {
                var _a2, _b;
                let inputText = ((_b = (_a2 = popsConfirm.popsElement) == null ? void 0 : _a2.querySelector(
                  ".netdisk-match-paste-text"
                )) == null ? void 0 : _b.value) || "";
                if (inputText.trim() !== "") {
                  inputText = NetDiskRuleUtils.replaceChinese(inputText);
                  NetDiskWorker.postMessage({
                    textList: [inputText],
                    matchTextRange: NetDiskConfig.match.pageMatchRange.value,
                    regular: NetDisk.regular,
                    startTime: Date.now(),
                    from: "PasteText"
                  });
                }
              }
            }
          },
          class: "whitesevPopNetDiskMatchPasteText",
          style: this.getCSS()
        },
        NetDiskUI.popsStyle.matchPasteTextView
      );
      popsConfirm.popsElement.querySelector("textarea").focus();
    },
    getCSS() {
      return (
        /*css*/
        `
		.pops[type-value=confirm] .pops-confirm-content{
			overflow: hidden;
		}
		.netdisk-match-paste-text {
			--textarea-bd-color: #dcdfe6;
			display: inline-block;
			resize: vertical;
			padding: 5px 15px;
			line-height: 1.5;
			box-sizing: border-box;
			color: #606266;
			border: 1px solid var(--textarea-bd-color);
			border-radius: 4px;
			transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
			outline: none;
			margin: 0;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			background: none;
			width: 100%;
			height: 100%;
			appearance: none;
			resize: none;
		}
		.netdisk-match-paste-text:hover{
			--textarea-bd-color: #c0c4cc;
		}
		.netdisk-match-paste-text:focus{
			--textarea-bd-color: #3677f0;
		}
		`
      );
    },
    /**
     * Worker匹配完毕后执行的回调函数
     * @param {NetDiskWorkerCallBackOptions} data
     */
    workerMatchEndCallBack(data) {
      if (data.data.length) {
        Qmsg.success(
          `成功匹配${data.data.length}个，用时${Date.now() - data.startTime}ms`
        );
      } else {
        Qmsg.error("未识别到链接");
      }
    }
  };
  const NetDiskUI = {
    /** 元素对象实例 */
    Alias: {
      /**
       * 链接弹窗的对象
       */
      uiLinkAlias: void 0,
      /**
       * 历史匹配记录弹窗的对象
       */
      historyAlias: void 0,
      /**
       * 设置弹窗的对象
       */
      settingAlias: void 0
    },
    /**
     * 已匹配到的网盘图标字典
     */
    isMatchedNetDiskIconMap: /* @__PURE__ */ new Set(),
    /**
     * 是否默认禁用弹窗弹出后背景可以滚动
     */
    defaultForbiddenScroll: false,
    /**
     * 弹窗的配置
     * 规定格式
     * {
     *  PC:{
     *    width: "",
     *    height: "",
     *  },
     *  Mobile: {
     *    width: "",
     *    height: "",
     *  }
     * }
     */
    popsStyle: NetDiskUISizeConfig,
    src: {
      /**
       * 图标RESOURCE_ICON
       * 从图标库中引入并覆盖
       */
      icon: {},
      /**
       * 判断图标字典中是否存在该键
       * @param iconKey
       */
      hasIcon(iconKey) {
        return Reflect.has(this.icon, iconKey);
      },
      /**
       * 添加图标数据
       * @param iconKey
       * @param iconValue
       */
      addIcon(iconKey, iconValue) {
        if (this.hasIcon(iconKey)) {
          log.warn("图标字典中已存在该icon：" + iconKey);
          return false;
        } else {
          return Reflect.set(this.icon, iconKey, iconValue);
        }
      }
    },
    /**
     * 悬浮按钮  双击打开主界面，长按打开设置（不能移动，移动就不打开，只是移动按钮
     */
    suspension: NetDiskSuspension,
    /**
     * 主视图
     */
    view: NetDiskView,
    /**
     * 显示直链的弹窗
     */
    staticView: NetDiskView_static,
    /**
     * 需要重新输入新密码的弹窗
     */
    newAccessCodeView: NetDiskView_newAccessCode,
    /**
     * 网盘历史匹配到的记录弹窗
     */
    netDiskHistoryMatch: NetDiskView_historyMatch,
    /**
     * 自定义访问码规则，用于设置某个网站下的某个网盘链接的固定访问码
     */
    accessCodeRule: NetDiskView_accessCodeRule,
    /**
     * 主动识别文本
     */
    matchPasteText: NetDiskView_matchPasteText,
    /**
     * 设置标题的右键菜单
     * @param element
     */
    setGlobalRightClickMenu(element) {
      NetDiskUI.view.registerContextMenu(element, void 0, [
        {
          text: "设置",
          callback() {
            log.info("打开-设置");
            NetDiskView_setting.show();
          }
        },
        {
          text: "历史匹配记录",
          callback() {
            log.info("打开-历史匹配记录");
            NetDiskUI.netDiskHistoryMatch.show();
          }
        },
        {
          text: "访问码规则",
          callback() {
            log.info("打开-访问码规则");
            NetDiskUI.accessCodeRule.show();
          }
        },
        {
          text: "自定义规则",
          callback() {
            log.info("打开-自定义规则");
            NetDiskUserRule.showUI(false);
          }
        },
        {
          text: "主动识别文本",
          callback() {
            log.info("打开-主动识别文本");
            NetDiskUI.matchPasteText.show();
          }
        }
      ]);
    },
    /**
     * 设置右键菜单
     * @param target
     * @param selector
     * @param isHistoryView 是否是历史界面的
     */
    setRightClickMenu(target, selector, isHistoryView) {
      NetDiskUI.view.registerContextMenu(target, selector, [
        {
          text: "复制链接",
          callback: function(event, contextMenuEvent) {
            let linkElement = contextMenuEvent.target;
            const { netDiskName, netDiskIndex, shareCode, accessCode } = NetDiskView.praseElementAttributeRuleInfo(linkElement);
            NetDiskLinkClickMode.copy(
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode
            );
          }
        },
        {
          text: "访问链接",
          callback: function(event, contextMenuEvent) {
            let linkElement = contextMenuEvent.target;
            const { netDiskName, netDiskIndex, shareCode, accessCode } = NetDiskView.praseElementAttributeRuleInfo(linkElement);
            let url = NetDiskLinkClickModeUtils.getBlankUrl(
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode
            );
            NetDiskLinkClickMode.openBlank(
              url,
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode
            );
          }
        },
        {
          text: "修改访问码",
          callback: function(event, contextMenuEvent) {
            let $link = contextMenuEvent.target;
            const { netDiskName, netDiskIndex, shareCode, accessCode } = NetDiskView.praseElementAttributeRuleInfo($link);
            function newAccessCodeByHistoryViewCallBack(userInputAccessCode) {
              let currentTime = (/* @__PURE__ */ new Date()).getTime();
              let data = _GM_getValue(
                NetDiskUI.netDiskHistoryMatch.storageKey
              );
              let editFlag = false;
              data.forEach((item) => {
                if (item["netDiskName"] === netDiskName && item["netDiskIndex"] === netDiskIndex && item["shareCode"] === shareCode && item["accessCode"] === accessCode) {
                  item = utils.assign(item, {
                    accessCode: userInputAccessCode,
                    updateTime: currentTime
                  });
                  log.success(["成功找到项", item]);
                  editFlag = true;
                  return;
                }
              });
              if (editFlag) {
                _GM_setValue(NetDiskUI.netDiskHistoryMatch.storageKey, data);
                $link.closest("li").querySelector(
                  ".netdiskrecord-update-time"
                ).lastChild.textContent = utils.formatTime(currentTime);
                $link.setAttribute("data-accesscode", userInputAccessCode);
                Qmsg.success(
                  /*html*/
                  `
                                <div style="text-align: left;">旧: ${accessCode}</div>
                                <div style="text-align: left;">新: ${userInputAccessCode}</div>`,
                  {
                    html: true
                  }
                );
              } else {
                Qmsg.error("修改失败");
              }
            }
            function newAccessCodeCallBack_(userInputAccessCode) {
              event.target.setAttribute("data-accesscode", userInputAccessCode);
              let netDiskDict = NetDisk.linkDict.get(netDiskName);
              if (netDiskDict.has(shareCode)) {
                let currentDict = netDiskDict.get(shareCode);
                netDiskDict.set(
                  shareCode,
                  NetDisk.getLinkDickObj(
                    userInputAccessCode,
                    netDiskIndex,
                    true,
                    currentDict.matchText
                  )
                );
                Qmsg.success(
                  /*html*/
                  `
                                <div style="text-align: left;">旧: ${accessCode}</div>
                                <div style="text-align: left;">新: ${userInputAccessCode}</div>`,
                  {
                    html: true
                  }
                );
              } else {
                Qmsg.error("该访问码不在已获取的字典中：" + shareCode);
              }
            }
            NetDiskUI.newAccessCodeView(
              this.text,
              netDiskName,
              netDiskIndex,
              shareCode,
              accessCode,
              (userInputAccessCode) => {
                if (isHistoryView) {
                  newAccessCodeByHistoryViewCallBack(userInputAccessCode);
                } else {
                  newAccessCodeCallBack_(userInputAccessCode);
                }
              }
            );
          }
        }
      ]);
    }
  };
  const UIButton = function(text, description, buttonText, buttonIcon, buttonIsRightIcon, buttonIconIsLoading, buttonType, clickCallBack, afterAddToUListCallBack) {
    let result = {
      text,
      type: "button",
      description,
      buttonIcon,
      buttonIsRightIcon,
      buttonIconIsLoading,
      buttonType,
      buttonText,
      callback(event) {
        if (typeof clickCallBack === "function") {
          clickCallBack(event);
        }
      },
      afterAddToUListCallBack
    };
    return result;
  };
  const UIButtonShortCut = function(text, description, key, defaultValue, defaultButtonText, buttonType = "default", shortCut) {
    let __defaultButtonText = defaultButtonText;
    let getButtonText = () => {
      return shortCut.getShowText(key, __defaultButtonText);
    };
    let result = UIButton(
      text,
      description,
      getButtonText,
      "keyboard",
      false,
      false,
      buttonType,
      async (event) => {
        var _a2;
        let $click = event.target;
        let $btn = (_a2 = $click.closest(".pops-panel-button")) == null ? void 0 : _a2.querySelector("span");
        if (shortCut.isWaitPress) {
          Qmsg.warning("请先执行当前的录入操作");
          return;
        }
        if (shortCut.hasOptionValue(key)) {
          shortCut.emptyOption(key);
          Qmsg.success("清空快捷键");
        } else {
          let loadingQmsg = Qmsg.loading("请按下快捷键...", {
            showClose: true
          });
          let {
            status,
            option,
            key: isUsedKey
          } = await shortCut.enterShortcutKeys(key);
          loadingQmsg.close();
          if (status) {
            log.success(["成功录入快捷键", option]);
            Qmsg.success("成功录入");
          } else {
            Qmsg.error(
              `快捷键 ${shortCut.translateKeyboardValueToButtonText(
              option
            )} 已被 ${isUsedKey} 占用`
            );
          }
        }
        $btn.innerHTML = getButtonText();
      }
    );
    result.attributes = {};
    Reflect.set(result.attributes, ATTRIBUTE_INIT, () => {
      return false;
    });
    return result;
  };
  class ShortCut {
    constructor(key) {
      /** 存储的键 */
      __publicField(this, "key", "short-cut");
      /** 是否存在等待按下的按键 */
      __publicField(this, "isWaitPress", false);
      if (typeof key === "string") {
        this.key = key;
      }
    }
    /**
     * 初始化配置默认值
     */
    initConfig(key, option) {
      if (this.hasOption(key)) ;
      else {
        this.setOption(key, option);
      }
    }
    /** 获取存储的键 */
    getStorageKey() {
      return this.key;
    }
    /**
     * 获取本地存储的所有值
     */
    getLocalAllOptions() {
      return _GM_getValue(this.key, []);
    }
    /**
     * 判断是否存在该配置
     * @param key 键
     */
    hasOption(key) {
      let localOptions = this.getLocalAllOptions();
      let findOption = localOptions.find((item) => item.key === key);
      return !!findOption;
    }
    /**
     * 判断是否存在该配置的value值
     * @param key 键
     */
    hasOptionValue(key) {
      if (this.hasOption(key)) {
        let option = this.getOption(key);
        return !((option == null ? void 0 : option.value) == null);
      } else {
        return false;
      }
    }
    /**
     * 获取配置
     * @param key 键
     * @param defaultValue 默认值
     */
    getOption(key, defaultValue) {
      let localOptions = this.getLocalAllOptions();
      let findOption = localOptions.find((item) => item.key === key);
      return findOption ?? defaultValue;
    }
    /**
     * 设置配置
     * @param key 键
     * @param value 配置
     */
    setOption(key, value) {
      let localOptions = this.getLocalAllOptions();
      let findIndex = localOptions.findIndex((item) => item.key === key);
      if (findIndex == -1) {
        localOptions.push({
          key,
          value
        });
      } else {
        Reflect.set(localOptions[findIndex], "value", value);
      }
      _GM_setValue(this.key, localOptions);
    }
    /**
     * 清空当前已有配置录入的值
     * @param key
     */
    emptyOption(key) {
      let result = false;
      let localOptions = this.getLocalAllOptions();
      let findIndex = localOptions.findIndex((item) => item.key === key);
      if (findIndex !== -1) {
        localOptions[findIndex].value = null;
        result = true;
      }
      _GM_setValue(this.key, localOptions);
      return result;
    }
    /**
     * 删除配置
     * @param key 键
     */
    deleteOption(key) {
      let result = false;
      let localValue = this.getLocalAllOptions();
      let findValueIndex = localValue.findIndex((item) => item.key === key);
      if (findValueIndex !== -1) {
        localValue.splice(findValueIndex, 1);
        result = true;
      }
      _GM_setValue(this.key, localValue);
      return result;
    }
    /**
     * 把配置的快捷键转成文字
     * @param keyboardValue
     * @returns
     */
    translateKeyboardValueToButtonText(keyboardValue) {
      let result = "";
      keyboardValue.ohterCodeList.forEach((ohterCodeKey) => {
        result += utils.stringTitleToUpperCase(ohterCodeKey, true) + " + ";
      });
      result += utils.stringTitleToUpperCase(keyboardValue.keyName);
      return result;
    }
    /**
     * 获取快捷键显示的文字
     * @param key 本地存储的快捷键键名
     * @param defaultShowText 默认显示的文字
     */
    getShowText(key, defaultShowText) {
      if (this.hasOption(key)) {
        let localOption = this.getOption(key);
        if (localOption.value == null) {
          return defaultShowText;
        } else {
          return this.translateKeyboardValueToButtonText(localOption.value);
        }
      } else {
        return defaultShowText;
      }
    }
    /**
     * 录入快捷键
     * @param key 本地存储的快捷键键名
     */
    async enterShortcutKeys(key) {
      return new Promise((resolve) => {
        this.isWaitPress = true;
        let keyboardListener = domUtils.listenKeyboard(
          window,
          "keyup",
          (keyName, keyValue, ohterCodeList) => {
            const currentOption = {
              keyName,
              keyValue,
              ohterCodeList
            };
            const shortcutJSONString = JSON.stringify(currentOption);
            const allOptions = this.getLocalAllOptions();
            for (let index = 0; index < allOptions.length; index++) {
              let localValue = allOptions[index];
              if (localValue.key === key) {
                continue;
              }
              const localShortCutJSONString = JSON.stringify(localValue.value);
              let isUsedByOtherOption = false;
              if (localValue.value != null && shortcutJSONString === localShortCutJSONString) {
                isUsedByOtherOption = true;
              }
              if (isUsedByOtherOption) {
                this.isWaitPress = false;
                keyboardListener.removeListen();
                resolve({
                  status: false,
                  key: localValue.key,
                  option: currentOption
                });
                return;
              }
            }
            this.setOption(key, currentOption);
            this.isWaitPress = false;
            keyboardListener.removeListen();
            resolve({
              status: true,
              key,
              option: currentOption
            });
          }
        );
      });
    }
    /**
     * 初始化全局键盘监听
     * @param shortCutOption 快捷键配置 一般是{ "键名": { callback: ()=>{}}}，键名是本地存储的自定义快捷键的键名
     */
    initGlobalKeyboardListener(shortCutOption) {
      let localOptions = this.getLocalAllOptions();
      if (!localOptions.length) {
        log.warn("没有设置快捷键");
        return;
      }
      let that = this;
      function setListenKeyboard($ele, option) {
        domUtils.listenKeyboard(
          $ele,
          "keydown",
          (keyName, keyValue, ohterCodeList) => {
            if (that.isWaitPress) {
              return;
            }
            localOptions = that.getLocalAllOptions();
            let findShortcutIndex = localOptions.findIndex((item) => {
              let option2 = item.value;
              let tempOption = {
                keyName,
                keyValue,
                ohterCodeList
              };
              if (JSON.stringify(option2) === JSON.stringify(tempOption)) {
                return item;
              }
            });
            if (findShortcutIndex != -1) {
              let findShortcut = localOptions[findShortcutIndex];
              log.info(["调用快捷键", findShortcut]);
              if (findShortcut.key in option) {
                option[findShortcut.key].callback();
              }
            }
          }
        );
      }
      let WindowShortCutOption = {};
      let ElementShortCutOption = {};
      Object.keys(shortCutOption).forEach((localKey) => {
        let option = shortCutOption[localKey];
        if (option.target == null || typeof option.target === "string" && option.target === "") {
          option.target = "window";
        }
        if (option.target === "window") {
          Reflect.set(WindowShortCutOption, localKey, option);
        } else {
          Reflect.set(ElementShortCutOption, localKey, option);
        }
      });
      setListenKeyboard(window, WindowShortCutOption);
      domUtils.ready(() => {
        Object.keys(ElementShortCutOption).forEach(async (localKey) => {
          let option = ElementShortCutOption[localKey];
          if (typeof option.target === "string") {
            utils.waitNode(option.target, 1e4).then(($ele) => {
              if (!$ele) {
                return;
              }
              let __option = {};
              Reflect.set(__option, localKey, option);
              setListenKeyboard($ele, __option);
            });
          } else if (typeof option.target === "function") {
            let target = await option.target();
            if (target == null) {
              return;
            }
            let __option = {};
            Reflect.set(__option, localKey, option);
            setListenKeyboard(target, __option);
          } else {
            let __option = {};
            Reflect.set(__option, localKey, option);
            setListenKeyboard(option.target, __option);
          }
        });
      });
    }
  }
  const NetDiskShortcut = {
    shortCut: new ShortCut("GM_shortcut"),
    init() {
      this.shortCut.initGlobalKeyboardListener(this.getShortCutMap());
    },
    getShortCutMap() {
      return {
        "netdisk-keyboard-open-setting": {
          target: "window",
          callback: () => {
            log.info(`【打开】⚙ 设置`);
            NetDiskView_setting.show();
          }
        },
        "netdisk-keyboard-open-history-matching-records": {
          target: "window",
          callback: () => {
            log.info("【打开】⚙ 历史匹配记录");
            NetDiskUI.netDiskHistoryMatch.show();
          }
        },
        "netdisk-keyboard-open-accesscode-rule": {
          target: "window",
          callback: () => {
            log.info("【打开】⚙ 访问码规则");
            NetDiskUI.accessCodeRule.show();
          }
        },
        "netdisk-keyboard-open-user-rule": {
          target: "window",
          callback: () => {
            log.info("【打开】⚙ 用户自定义规则");
            NetDiskUserRule.showUI(false);
          }
        },
        "netdisk-keyboard-open-proactively-recognize-text": {
          target: "window",
          callback: () => {
            log.info("【打开】⚙ 主动识别文本");
            NetDiskUI.matchPasteText.show();
          }
        }
      };
    }
  };
  const UISelectMultiple = function(text, key, defaultValue, data, callback, description, placeholder = "请至少选择一个选项", selectConfirmDialogDetails) {
    let selectData = [];
    if (typeof data === "function") {
      selectData = data();
    } else {
      selectData = data;
    }
    let result = {
      text,
      type: "select-multiple",
      description,
      placeholder,
      attributes: {},
      getValue() {
        return _GM_getValue(key, defaultValue);
      },
      selectConfirmDialogDetails,
      callback(selectInfo) {
        let saveValue = [];
        selectInfo.forEach((selectedInfo) => {
          saveValue.push(selectedInfo.value);
        });
        _GM_setValue(key, saveValue);
        log.info([`多选-选择：`, saveValue]);
      },
      data: selectData
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
    }
    return result;
  };
  const PanelUI_allSetting = {
    id: "netdisk-panel-config-all-setting",
    title: "总设置",
    isDefault: true,
    forms: [
      {
        type: "forms",
        text: "",
        forms: [
          {
            type: "deepMenu",
            text: "Toast",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-forms-toast",
                forms: [
                  UISelect(
                    "位置",
                    NetDiskConfig.toast.position.KEY,
                    NetDiskConfig.toast.position.default,
                    [
                      {
                        value: "topleft",
                        text: "左上角"
                      },
                      {
                        value: "top",
                        text: "顶部"
                      },
                      {
                        value: "topright",
                        text: "右上角"
                      },
                      {
                        value: "left",
                        text: "左边"
                      },
                      {
                        value: "center",
                        text: "中间"
                      },
                      {
                        value: "right",
                        text: "右边"
                      },
                      {
                        value: "bottomleft",
                        text: "左下角"
                      },
                      {
                        value: "bottom",
                        text: "底部"
                      },
                      {
                        value: "bottomright",
                        text: "右下角"
                      }
                    ],
                    void 0,
                    `Toast显示在九宫格的位置，默认: ${NetDiskConfig.toast.position.default}`
                  ),
                  UISelect(
                    "同时最多显示的数量",
                    NetDiskConfig.toast.maxnums.KEY,
                    NetDiskConfig.toast.maxnums.default,
                    [
                      {
                        value: 1,
                        text: "1"
                      },
                      {
                        value: 2,
                        text: "2"
                      },
                      {
                        value: 3,
                        text: "3"
                      },
                      {
                        value: 4,
                        text: "4"
                      },
                      {
                        value: 5,
                        text: "5"
                      }
                    ],
                    void 0,
                    `默认: ${NetDiskConfig.toast.showreverse.default}`
                  ),
                  UISwitch(
                    "逆序弹出",
                    NetDiskConfig.toast.showreverse.KEY,
                    NetDiskConfig.toast.showreverse.value,
                    void 0,
                    "默认是自上往下显示Toast，逆序则是自下往上显示Toast"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "弹窗",
            forms: [
              {
                className: "netdisk-panel-forms-pops",
                type: "forms",
                text: "",
                forms: [
                  UISelect(
                    "动画",
                    NetDiskConfig.pops.popsAnimation.KEY,
                    NetDiskConfig.pops.popsAnimation.default,
                    [
                      {
                        value: "",
                        text: "无"
                      },
                      {
                        value: "pops-anim-spread",
                        text: "spread"
                      },
                      {
                        value: "pops-anim-shake",
                        text: "shake"
                      },
                      {
                        value: "pops-anim-rolling-left",
                        text: "rolling-left"
                      },
                      {
                        value: "pops-anim-rolling-right",
                        text: "rolling-right"
                      },
                      {
                        value: "pops-anim-slide-top",
                        text: "slide-top"
                      },
                      {
                        value: "pops-anim-slide-bottom",
                        text: "slide-bottom"
                      },
                      {
                        value: "pops-anim-slide-left",
                        text: "slide-left"
                      },
                      {
                        value: "pops-anim-slide-right",
                        text: "slide-right"
                      },
                      {
                        value: "pops-anim-fadein",
                        text: "fadein"
                      },
                      {
                        value: "pops-anim-fadein-zoom",
                        text: "fadein-zoom"
                      },
                      {
                        value: "pops-anim-fadein-alert",
                        text: "fadein-alert"
                      },
                      {
                        value: "pops-anim-don",
                        text: "don"
                      },
                      {
                        value: "pops-anim-roll",
                        text: "roll"
                      },
                      {
                        value: "pops-anim-sandra",
                        text: "sandra"
                      },
                      {
                        value: "pops-anim-gather",
                        text: "gather"
                      }
                    ],
                    void 0,
                    `显示/关闭的动画效果，默认: ${NetDiskConfig.pops.popsAnimation.default}`
                  ),
                  UISwitch(
                    "点击弹窗遮罩层关闭弹窗",
                    NetDiskConfig.pops.clickMaskToCloseDialog.KEY,
                    NetDiskConfig.pops.clickMaskToCloseDialog.default,
                    void 0,
                    "点击遮罩层触发关闭弹窗事件"
                  ),
                  UISwitch(
                    "窗口拖拽",
                    NetDiskConfig.pops.pcDrag.KEY,
                    NetDiskConfig.pops.pcDrag.default,
                    void 0,
                    "长按标题栏可拖拽移动弹窗"
                  ),
                  UISwitch(
                    "限制拖拽距离",
                    NetDiskConfig.pops.pcDragLimit.KEY,
                    NetDiskConfig.pops.pcDragLimit.default,
                    void 0,
                    "只能在浏览器的可视窗口内拖动"
                  ),
                  UISwitch(
                    "亚克力效果",
                    NetDiskConfig.pops.popsAcrylic.KEY,
                    NetDiskConfig.pops.popsAcrylic.default,
                    void 0,
                    ""
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "文件弹窗",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-forms-pops-folder",
                forms: [
                  UISelect(
                    "排序名",
                    NetDiskConfig.popsFolder["pops-folder-sort-name"].KEY,
                    NetDiskConfig.popsFolder["pops-folder-sort-name"].default,
                    [
                      {
                        value: "fileName",
                        text: "文件名"
                      },
                      {
                        value: "latestTime",
                        text: "修改时间"
                      },
                      {
                        value: "fileSize",
                        text: "大小"
                      }
                    ],
                    void 0,
                    "当前的规则"
                  ),
                  UISelect(
                    "排序规则",
                    NetDiskConfig.popsFolder["pops-folder-sort-is-desc"].KEY,
                    NetDiskConfig.popsFolder["pops-folder-sort-is-desc"].default,
                    [
                      {
                        value: false,
                        text: "升序"
                      },
                      {
                        value: true,
                        text: "降序"
                      }
                    ],
                    void 0,
                    "当前的规则"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "小图标导航",
            forms: [
              {
                type: "forms",
                text: "",
                forms: [
                  UISwitch(
                    "点击定位分享码",
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode"].KEY,
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode"].default,
                    void 0,
                    "自动滚动页面至包含分享码的元素"
                  ),
                  UISwitch(
                    "选中分享码",
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode-with-select"].KEY,
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-find-sharecode-with-select"].default,
                    void 0,
                    "使用光标选中分享码/元素"
                  ),
                  UISwitch(
                    "循环定位",
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-loop-find-sharecode"].KEY,
                    NetDiskConfig.smallIconNavgiator["pops-netdisk-icon-click-event-loop-find-sharecode"].default,
                    void 0,
                    "关闭则是每一个元素只定位一次"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "悬浮按钮",
            forms: [
              {
                type: "forms",
                text: "",
                forms: [
                  UISlider(
                    "大小",
                    NetDiskConfig.suspension.size.KEY,
                    NetDiskConfig.suspension.size.default,
                    15,
                    250,
                    (event, value) => {
                      NetDiskConfig.suspension.size.value = parseInt(
                        value.toString()
                      );
                      if (NetDiskUI.suspension.isShow) {
                        domUtils.css(NetDiskUI.suspension.suspensionNode, {
                          width: NetDiskConfig.suspension.size.value,
                          height: NetDiskConfig.suspension.size.value
                        });
                        NetDiskUI.suspension.setSuspensionPosition();
                      }
                    },
                    (value) => {
                      return `${value}px`;
                    },
                    "悬浮按钮的大小，默认: " + NetDiskConfig.suspension.size.default
                  ),
                  UISlider(
                    "透明度",
                    NetDiskConfig.suspension.opacity.KEY,
                    NetDiskConfig.suspension.opacity.default,
                    0.1,
                    1,
                    (event, value) => {
                      NetDiskConfig.suspension.opacity.value = parseFloat(
                        value.toString()
                      );
                      if (NetDiskUI.suspension.isShow) {
                        domUtils.css(NetDiskUI.suspension.suspensionNode, {
                          opacity: NetDiskConfig.suspension.opacity.value
                        });
                      }
                    },
                    void 0,
                    "值越小越透明，默认: " + NetDiskConfig.suspension.opacity.default,
                    0.1
                  ),
                  UISlider(
                    "背景轮播时间",
                    NetDiskConfig.suspension["randbg-time"].KEY,
                    NetDiskConfig.suspension["randbg-time"].default,
                    0,
                    1e4,
                    void 0,
                    (value) => {
                      return `${value}ms`;
                    },
                    "淡入/淡出的时间，默认: " + NetDiskConfig.suspension["randbg-time"].default + "ms",
                    100
                  ),
                  UISlider(
                    "背景显示时间",
                    NetDiskConfig.suspension["randbg-show-time"].KEY,
                    NetDiskConfig.suspension["randbg-show-time"].default,
                    0,
                    1e4,
                    void 0,
                    (value) => {
                      return `${value}ms`;
                    },
                    "图标显示的持续时间，默认: 1200",
                    100
                  ),
                  UISwitch(
                    "吸附边缘",
                    NetDiskConfig.suspension["suspended-button-adsorption-edge"].KEY,
                    NetDiskConfig.suspension["suspended-button-adsorption-edge"].default,
                    void 0,
                    "移动悬浮按钮松开后自动吸附边缘"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "小窗模式",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-forms-small-window",
                forms: [
                  UISlider(
                    "宽度",
                    NetDiskConfig.smallWindow["netdisk-ui-small-window-width"].KEY,
                    NetDiskConfig.smallWindow["netdisk-ui-small-window-width"].default,
                    50,
                    domUtils.width(window),
                    void 0,
                    (value) => {
                      return `${value}px`;
                    },
                    "设置小窗宽度(px)，默认: 250",
                    1
                  ),
                  UISlider(
                    "高度",
                    NetDiskConfig.smallWindow["netdisk-ui-small-window-max-height"].KEY,
                    NetDiskConfig.smallWindow["netdisk-ui-small-window-max-height"].default,
                    50,
                    domUtils.height(window),
                    void 0,
                    (value) => {
                      return `${value}px`;
                    },
                    "设置小窗最大高度(px)，默认: " + NetDiskConfig.smallWindow["netdisk-ui-small-window-max-height"].default,
                    1
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "历史匹配记录",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-history-match",
                forms: [
                  UISelect(
                    "排序规则",
                    NetDiskConfig.historyMatch["netdisk-history-match-ordering-rule"].KEY,
                    NetDiskConfig.historyMatch["netdisk-history-match-ordering-rule"].default,
                    [
                      {
                        value: "按 记录时间 - 升序",
                        text: "按 记录时间 - 升序"
                      },
                      {
                        value: "按 记录时间 - 降序",
                        text: "按 记录时间 - 降序"
                      },
                      {
                        value: "按 更新时间 - 升序",
                        text: "按 更新时间 - 升序"
                      },
                      {
                        value: "按 更新时间 - 降序",
                        text: "按 更新时间 - 降序"
                      }
                    ]
                  ),
                  UIButton(
                    "修复存储记录",
                    "如果【匹配记录】弹窗打不开，可能是存储的数据缺失某些字段，可尝试点击此处进行修复",
                    "修复",
                    void 0,
                    void 0,
                    false,
                    "primary",
                    () => {
                      try {
                        const { count, repairCount } = NetDiskUI.netDiskHistoryMatch.checkAndRepairLocalData();
                        if (repairCount === 0) {
                          Qmsg.info(`不存在需要修复的数据`);
                        } else {
                          Qmsg.success(`共计: ${count} 条，修复${repairCount}条`);
                        }
                      } catch (error) {
                        Qmsg.error("修复异常：" + error.toString());
                      }
                    }
                  ),
                  UISwitch(
                    "保存匹配记录",
                    NetDiskConfig.historyMatch.saveMatchNetDisk.KEY,
                    NetDiskConfig.historyMatch.saveMatchNetDisk.default,
                    void 0,
                    "将匹配到的链接信息进行本地存储，可点击【油猴菜单-⚙ 历史匹配记录】进行查看"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "匹配设置",
            forms: [
              {
                type: "forms",
                text: "文本匹配范围",
                forms: [
                  UISelectMultiple(
                    "匹配规则类型",
                    NetDiskConfig.match.pageMatchRange.KEY,
                    NetDiskConfig.match.pageMatchRange.default,
                    [
                      {
                        value: "innerText",
                        text: "普通文本"
                      },
                      {
                        value: "innerHTML",
                        text: "超文本"
                      }
                    ],
                    void 0,
                    "执行的文本匹配规则",
                    void 0,
                    {
                      height: "auto"
                    }
                  ),
                  UISwitch(
                    "深入ShadowRoot获取匹配文本",
                    NetDiskConfig.match.depthQueryWithShadowRoot.KEY,
                    NetDiskConfig.match.depthQueryWithShadowRoot.default,
                    void 0,
                    "遍历ShadowRoot，获取匹配的内容"
                  ),
                  UISwitch(
                    "匹配剪贴板",
                    NetDiskConfig.match.readClipboard.KEY,
                    NetDiskConfig.match.readClipboard.default,
                    void 0,
                    "Api兼容性查看：<a href='https://caniuse.com/mdn-api_permissions_permission_clipboard-read' target='_blank'>读取剪贴板权限申请</a>、<a href='https://caniuse.com/mdn-api_clipboard_readtext' target='_blank'>直接读取剪贴板</a>"
                  ),
                  UISwitch(
                    "匹配当前URL",
                    NetDiskConfig.match.allowMatchLocationHref.KEY,
                    NetDiskConfig.match.allowMatchLocationHref.default,
                    void 0,
                    "提取window.location.href进行匹配"
                  ),
                  UISwitch(
                    "匹配input标签的内容",
                    NetDiskConfig.match.toBeMatchedWithInputElementValue.KEY,
                    NetDiskConfig.match.toBeMatchedWithInputElementValue.default,
                    void 0,
                    "提取页面中的&lt;input&gt;的内容进行匹配"
                  ),
                  UISwitch(
                    "匹配textarea标签的内容",
                    NetDiskConfig.match.toBeMatchedTextAreaElementValue.KEY,
                    NetDiskConfig.match.toBeMatchedTextAreaElementValue.default,
                    void 0,
                    "提取页面中的&lt;textarea&gt;的内容进行匹配"
                  )
                ]
              },
              {
                type: "forms",
                text: "页面内容改变时的观察器",
                forms: [
                  UISlider(
                    "匹配间隔",
                    NetDiskConfig.match.delaytime.KEY,
                    NetDiskConfig.match.delaytime.default,
                    0,
                    5,
                    void 0,
                    (value) => {
                      return `${value}s`;
                    },
                    "匹配文本完毕后的延迟xxx秒允许下一次匹配",
                    0.1
                  ),
                  UISwitch(
                    "添加元素时进行匹配",
                    NetDiskConfig.match.isAddedNodesToMatch.KEY,
                    NetDiskConfig.match.isAddedNodesToMatch.default,
                    void 0,
                    "当监听到页面添加元素时才进行匹配文本"
                  ),
                  UISwitch(
                    "观察器：childList",
                    NetDiskConfig.match["mutationObserver-childList"].KEY,
                    NetDiskConfig.match["mutationObserver-childList"].default,
                    void 0,
                    "子节点的变动（新增、删除或者更改）"
                  ),
                  UISwitch(
                    "观察器：characterData",
                    NetDiskConfig.match["mutationObserver-characterData"].KEY,
                    NetDiskConfig.match["mutationObserver-characterData"].default,
                    void 0,
                    "节点内容或节点文本的变动"
                  ),
                  UISwitch(
                    "观察器：subtree",
                    NetDiskConfig.match["mutationObserver-subtree"].KEY,
                    NetDiskConfig.match["mutationObserver-subtree"].default,
                    void 0,
                    "是否将观察器应用于该节点的所有后代节点"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "功能",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-forms-function",
                forms: [
                  UISelect(
                    "行为模式",
                    NetDiskConfig.function["netdisk-behavior-mode"].KEY,
                    NetDiskConfig.function["netdisk-behavior-mode"].default,
                    [
                      {
                        text: "悬浮按钮+小窗",
                        value: "suspension_smallwindow"
                      },
                      {
                        text: "悬浮按钮+大窗",
                        value: "suspension_window"
                      },
                      {
                        text: "小窗",
                        value: "smallwindow"
                      }
                    ],
                    void 0,
                    "匹配到链接时触发的UI执行"
                  ),
                  UISwitch(
                    "自动输入访问码",
                    NetDiskConfig.function.autoFillAccessCode.KEY,
                    NetDiskConfig.function.autoFillAccessCode.default,
                    void 0,
                    "通过主动点击链接跳转时，会自动输入网盘访问码"
                  ),
                  UISwitch(
                    "获取重定向后的直链",
                    NetDiskConfig.function.getTheDirectLinkAfterRedirection.KEY,
                    NetDiskConfig.function.getTheDirectLinkAfterRedirection.default,
                    void 0,
                    "对获取的链接再进行一次重定向获取链接"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "分享码相关",
            forms: [
              {
                type: "forms",
                text: "",
                className: "netdisk-panel-forms-share-code",
                forms: [
                  UISwitch(
                    "排除分享码",
                    NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodes.KEY,
                    NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodes.default,
                    void 0,
                    "启用后会根据【相同系数】排除掉匹配到的分享码"
                  ),
                  UISlider(
                    "相同系数",
                    NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodesCoefficient.KEY,
                    NetDiskConfig.aboutShareCode.excludeIdenticalSharedCodesCoefficient.default,
                    0,
                    1,
                    void 0,
                    (value) => {
                      return value.toString();
                    },
                    "例如分享码: aaaaaaaabb，它的相同系数是0.8，设置相同系数≥0.8时会被排除",
                    0.01
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "快捷键",
            forms: [
              {
                className: "netdisk-panel-forms-shortcut-keys",
                text: "",
                type: "forms",
                forms: [
                  UIButtonShortCut(
                    "【打开】⚙ 设置",
                    "",
                    "netdisk-keyboard-open-setting",
                    void 0,
                    "暂无快捷键",
                    "default",
                    NetDiskShortcut.shortCut
                  ),
                  UIButtonShortCut(
                    "【打开】⚙ 历史匹配记录",
                    "",
                    "netdisk-keyboard-open-history-matching-records",
                    void 0,
                    "暂无快捷键",
                    "default",
                    NetDiskShortcut.shortCut
                  ),
                  UIButtonShortCut(
                    "【打开】⚙ 访问码规则",
                    "",
                    "netdisk-keyboard-open-accesscode-rule",
                    void 0,
                    "暂无快捷键",
                    "default",
                    NetDiskShortcut.shortCut
                  ),
                  UIButtonShortCut(
                    "【打开】⚙ 用户自定义规则",
                    "",
                    "netdisk-keyboard-open-user-rule",
                    void 0,
                    "暂无快捷键",
                    "default",
                    NetDiskShortcut.shortCut
                  ),
                  UIButtonShortCut(
                    "【打开】⚙ 主动识别文本",
                    "",
                    "netdisk-keyboard-open-proactively-recognize-text",
                    void 0,
                    "暂无快捷键",
                    "default",
                    NetDiskShortcut.shortCut
                  )
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  const PopsPanel = {
    /** 数据 */
    $data: {
      __data: null,
      __oneSuccessExecMenu: null,
      __onceExec: null,
      __listenData: null,
      /**
       * 菜单项的默认值
       */
      get data() {
        if (PopsPanel.$data.__data == null) {
          PopsPanel.$data.__data = new utils.Dictionary();
        }
        return PopsPanel.$data.__data;
      },
      /**
       * 成功只执行了一次的项
       */
      get oneSuccessExecMenu() {
        if (PopsPanel.$data.__oneSuccessExecMenu == null) {
          PopsPanel.$data.__oneSuccessExecMenu = new utils.Dictionary();
        }
        return PopsPanel.$data.__oneSuccessExecMenu;
      },
      /**
       * 成功只执行了一次的项
       */
      get onceExec() {
        if (PopsPanel.$data.__onceExec == null) {
          PopsPanel.$data.__onceExec = new utils.Dictionary();
        }
        return PopsPanel.$data.__onceExec;
      },
      /** 脚本名，一般用在设置的标题上 */
      get scriptName() {
        return SCRIPT_NAME;
      },
      /** 菜单项的总值在本地数据配置的键名 */
      key: KEY,
      /** 菜单项在attributes上配置的菜单键 */
      attributeKeyName: ATTRIBUTE_KEY,
      /** 菜单项在attributes上配置的菜单默认值 */
      attributeDefaultValueName: ATTRIBUTE_DEFAULT_VALUE
    },
    /** 监听器 */
    $listener: {
      /**
       * 值改变的监听器
       */
      get listenData() {
        if (PopsPanel.$data.__listenData == null) {
          PopsPanel.$data.__listenData = new utils.Dictionary();
        }
        return PopsPanel.$data.__listenData;
      }
    },
    init() {
      this.initPanelDefaultValue(
        this.getPanelContentConfig().concat(NetDiskRule.getRulePanelContent())
      );
      this.initExtensionsMenu();
    },
    /** 判断是否是顶层窗口 */
    isTopWindow() {
      return _unsafeWindow.top === _unsafeWindow.self;
    },
    /** 初始化进行注册油猴菜单 */
    initExtensionsMenu() {
      if (!this.isTopWindow()) {
        return;
      }
      GM_Menu.add([
        {
          key: "show_pops_panel_setting",
          text: "⚙ 设置",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback: () => {
            NetDiskView_setting.show();
          }
        },
        {
          key: "showNetDiskHistoryMatch",
          text: "⚙ 历史匹配记录",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback() {
            NetDiskUI.netDiskHistoryMatch.show();
          }
        },
        {
          key: "showAccessCodeRule",
          text: "⚙ 访问码规则",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback() {
            NetDiskUI.accessCodeRule.show();
          }
        },
        {
          key: "showUserRule",
          text: "⚙ 用户自定义规则",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback() {
            NetDiskUserRule.showUI(false);
          }
        },
        {
          key: "showMatchPasteText",
          text: "⚙ 主动识别文本",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback() {
            NetDiskUI.matchPasteText.show();
          }
        }
      ]);
    },
    /** 初始化菜单项的默认值保存到本地数据中 */
    initPanelDefaultValue(contentConfigList) {
      function initDefaultValue(config) {
        if (!config.attributes) {
          return;
        }
        let needInitConfig = {};
        let key = config.attributes[ATTRIBUTE_KEY];
        if (key != null) {
          needInitConfig[key] = config.attributes[ATTRIBUTE_DEFAULT_VALUE];
        }
        let __attr_init__ = config.attributes[ATTRIBUTE_INIT];
        if (typeof __attr_init__ === "function") {
          let __attr_result__ = __attr_init__();
          if (typeof __attr_result__ === "boolean" && !__attr_result__) {
            return;
          }
        }
        let initMoreValue = config.attributes[ATTRIBUTE_INIT_MORE_VALUE];
        if (initMoreValue && typeof initMoreValue === "object") {
          Object.assign(needInitConfig, initMoreValue);
        }
        let needInitConfigList = Object.keys(needInitConfig);
        if (!needInitConfigList.length) {
          log.warn(["请先配置键", config]);
          return;
        }
        needInitConfigList.forEach((iteratorKey) => {
          let iteratorDefaultValue = needInitConfig[iteratorKey];
          if (_GM_getValue(iteratorKey) == null) {
            _GM_setValue(iteratorKey, iteratorDefaultValue);
          }
        });
      }
      function loopInitDefaultValue(configList) {
        for (let index = 0; index < configList.length; index++) {
          let configItem = configList[index];
          initDefaultValue(configItem);
          let childForms = configItem.forms;
          if (childForms && Array.isArray(childForms)) {
            loopInitDefaultValue(childForms);
          }
        }
      }
      for (let index = 0; index < contentConfigList.length; index++) {
        let leftContentConfigItem = contentConfigList[index];
        if (!leftContentConfigItem.forms) {
          continue;
        }
        let rightContentConfigList = leftContentConfigItem.forms;
        if (rightContentConfigList && Array.isArray(rightContentConfigList)) {
          loopInitDefaultValue(rightContentConfigList);
        }
      }
    },
    /**
     * 设置值
     * @param key 键
     * @param value 值
     */
    setValue(key, value) {
      let locaData = _GM_getValue(KEY, {});
      let oldValue = locaData[key];
      locaData[key] = value;
      _GM_setValue(KEY, locaData);
      if (this.$listener.listenData.has(key)) {
        this.$listener.listenData.get(key).callback(key, oldValue, value);
      }
    },
    /**
     * 获取值
     * @param key 键
     * @param defaultValue 默认值
     */
    getValue(key, defaultValue) {
      let locaData = _GM_getValue(KEY, {});
      let localValue = locaData[key];
      if (localValue == null) {
        if (this.$data.data.has(key)) {
          return this.$data.data.get(key);
        }
        return defaultValue;
      }
      return localValue;
    },
    /**
     * 删除值
     * @param key 键
     */
    deleteValue(key) {
      let locaData = _GM_getValue(KEY, {});
      let oldValue = locaData[key];
      Reflect.deleteProperty(locaData, key);
      _GM_setValue(KEY, locaData);
      if (this.$listener.listenData.has(key)) {
        this.$listener.listenData.get(key).callback(key, oldValue, void 0);
      }
    },
    /**
     * 监听调用setValue、deleteValue
     * @param key 需要监听的键
     * @param callback
     */
    addValueChangeListener(key, callback, option) {
      let listenerId = Math.random();
      this.$listener.listenData.set(key, {
        id: listenerId,
        key,
        callback
      });
      if (option) {
        if (option.immediate) {
          callback(key, this.getValue(key), this.getValue(key));
        }
      }
      return listenerId;
    },
    /**
     * 移除监听
     * @param listenerId 监听的id
     */
    removeValueChangeListener(listenerId) {
      let deleteKey = null;
      for (const [key, value] of this.$listener.listenData.entries()) {
        if (value.id === listenerId) {
          deleteKey = key;
          break;
        }
      }
      if (typeof deleteKey === "string") {
        this.$listener.listenData.delete(deleteKey);
      } else {
        console.warn("没有找到对应的监听器");
      }
    },
    /**
     * 主动触发菜单值改变的回调
     * @param key 菜单键
     * @param newValue 想要触发的新值，默认使用当前值
     * @param oldValue 想要触发的旧值，默认使用当前值
     */
    triggerMenuValueChange(key, newValue, oldValue) {
      if (this.$listener.listenData.has(key)) {
        let listenData = this.$listener.listenData.get(key);
        if (typeof listenData.callback === "function") {
          let value = this.getValue(key);
          let __newValue = value;
          let __oldValue = value;
          if (typeof newValue !== "undefined" && arguments.length > 1) {
            __newValue = newValue;
          }
          if (typeof oldValue !== "undefined" && arguments.length > 2) {
            __oldValue = oldValue;
          }
          listenData.callback(key, __oldValue, __newValue);
        }
      }
    },
    /**
     * 判断该键是否存在
     * @param key 键
     */
    hasKey(key) {
      let locaData = _GM_getValue(KEY, {});
      return key in locaData;
    },
    /**
     * 自动判断菜单是否启用，然后执行回调
     * @param key
     * @param callback 回调
     * @param [isReverse=false] 逆反判断菜单启用
     */
    execMenu(key, callback, isReverse = false) {
      if (!(typeof key === "string" || typeof key === "object" && Array.isArray(key))) {
        throw new TypeError("key 必须是字符串或者字符串数组");
      }
      let runKeyList = [];
      if (typeof key === "object" && Array.isArray(key)) {
        runKeyList = [...key];
      } else {
        runKeyList.push(key);
      }
      let value = void 0;
      for (let index = 0; index < runKeyList.length; index++) {
        const runKey = runKeyList[index];
        if (!this.$data.data.has(runKey)) {
          log.warn(`${key} 键不存在`);
          return;
        }
        let runValue = PopsPanel.getValue(runKey);
        if (isReverse) {
          runValue = !runValue;
        }
        if (!runValue) {
          break;
        }
        value = runValue;
      }
      if (value) {
        callback(value);
      }
    },
    /**
     * 自动判断菜单是否启用，然后执行回调，只会执行一次
     * @param key
     * @param callback 回调
     * @param getValueFn 自定义处理获取当前值，值true是启用并执行回调，值false是不执行回调
     * @param handleValueChangeFn 自定义处理值改变时的回调，值true是启用并执行回调，值false是不执行回调
     */
    execMenuOnce(key, callback, getValueFn, handleValueChangeFn) {
      if (typeof key !== "string") {
        throw new TypeError("key 必须是字符串");
      }
      if (!this.$data.data.has(key)) {
        log.warn(`${key} 键不存在`);
        return;
      }
      if (this.$data.oneSuccessExecMenu.has(key)) {
        return;
      }
      this.$data.oneSuccessExecMenu.set(key, 1);
      let __getValue = () => {
        let localValue = PopsPanel.getValue(key);
        return typeof getValueFn === "function" ? getValueFn(key, localValue) : localValue;
      };
      let resultStyleList = [];
      let dynamicPushStyleNode = ($style) => {
        let __value = __getValue();
        let dynamicResultList = [];
        if ($style instanceof HTMLStyleElement) {
          dynamicResultList = [$style];
        } else if (Array.isArray($style)) {
          dynamicResultList = [
            ...$style.filter(
              (item) => item != null && item instanceof HTMLStyleElement
            )
          ];
        }
        if (__value) {
          resultStyleList = resultStyleList.concat(dynamicResultList);
        } else {
          for (let index = 0; index < dynamicResultList.length; index++) {
            let $css = dynamicResultList[index];
            $css.remove();
            dynamicResultList.splice(index, 1);
            index--;
          }
        }
      };
      let changeCallBack = (currentValue) => {
        let resultList = [];
        if (currentValue) {
          let result = callback(currentValue, dynamicPushStyleNode);
          if (result instanceof HTMLStyleElement) {
            resultList = [result];
          } else if (Array.isArray(result)) {
            resultList = [
              ...result.filter(
                (item) => item != null && item instanceof HTMLStyleElement
              )
            ];
          }
        }
        for (let index = 0; index < resultStyleList.length; index++) {
          let $css = resultStyleList[index];
          $css.remove();
          resultStyleList.splice(index, 1);
          index--;
        }
        resultStyleList = [...resultList];
      };
      this.addValueChangeListener(
        key,
        (__key, oldValue, newValue) => {
          let __newValue = newValue;
          if (typeof handleValueChangeFn === "function") {
            __newValue = handleValueChangeFn(__key, newValue, oldValue);
          }
          changeCallBack(__newValue);
        }
      );
      let value = __getValue();
      if (value) {
        changeCallBack(value);
      }
    },
    /**
     * 父子菜单联动，自动判断菜单是否启用，然后执行回调，只会执行一次
     * @param key 菜单键
     * @param childKey 子菜单键
     * @param callback 回调
     * @param replaceValueFn 用于修改mainValue，返回undefined则不做处理
     */
    execInheritMenuOnce(key, childKey, callback, replaceValueFn) {
      let that = this;
      const handleInheritValue = (key2, childKey2) => {
        let mainValue = that.getValue(key2);
        let childValue = that.getValue(childKey2);
        if (typeof replaceValueFn === "function") {
          let changedMainValue = replaceValueFn(mainValue, childValue);
          if (changedMainValue !== void 0) {
            return changedMainValue;
          }
        }
        return mainValue;
      };
      this.execMenuOnce(
        key,
        callback,
        () => {
          return handleInheritValue(key, childKey);
        },
        () => {
          return handleInheritValue(key, childKey);
        }
      );
      this.execMenuOnce(
        childKey,
        () => {
        },
        () => false,
        () => {
          this.triggerMenuValueChange(key);
          return false;
        }
      );
    },
    /**
     * 根据自定义key只执行一次
     * @param key 自定义key
     */
    onceExec(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError("key 必须是字符串");
      }
      if (this.$data.onceExec.has(key)) {
        return;
      }
      callback();
      this.$data.onceExec.set(key, 1);
    },
    /**
     * 获取配置内容
     */
    getPanelContentConfig() {
      let configList = [PanelUI_allSetting];
      return configList;
    }
  };
  Object.assign(
    NetDiskUI.src.icon,
    // @ts-ignore
    typeof RESOURCE_ICON === "undefined" ? {} : RESOURCE_ICON
  );
  NetDiskUserRule.init();
  NetDiskRule.init();
  PopsPanel.init();
  NetDisk.init();
  NetDiskShortcut.init();
  domUtils.ready(() => {
    NetDiskAutoFillAccessCode.init();
    NetDiskAuthorization.init();
    NetDiskWorker.init();
  });

})(Qmsg, DOMUtils, Utils, pops);
// ==UserScript==
// @name         网盘链接识别
// @namespace    https://tampermonkey.net/
// @version      22.12.08.17.30
// @description  识别网页中显示的网盘链接，目前包括百度网盘、蓝奏云、天翼云、中国移动云盘(原:和彩云)、阿里云、文叔叔、奶牛快传、123盘、腾讯微云、迅雷网盘、115网盘、夸克网盘、城通网盘(部分)、magnet格式，支持蓝奏云、天翼云、123盘、奶牛直链获取下载，页面动态监控链接
// @author       WhiteSevs
// @include      *
// @run-at       document-body
// @license      GPL-3.0-only
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      *
// @require	     https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.4.1/jquery.min.js
// @require      https://unpkg.com/any-touch/dist/any-touch.umd.min.js
// @require      https://greasyfork.org/scripts/455576-qmsg/code/Qmsg.js?version=1122361
// @require      https://greasyfork.org/scripts/455186-whitesevsutils/code/WhiteSevsUtils.js?version=1124335
// ==/UserScript==

(function () {
  "use strict";
  const NetDisk = {
    // 网盘链接获取
    isInit: false, // 是否初始化
    pageText: null, // 页面显示出的文字
    linkDict: null, // 链接字典
    isMatching: false, // 正在匹配链接中
    matchLink: null, // 匹配到的
    hasMatchLink: false, // 已存在匹配的链接

    regular: {
      baidu: {
        link_innerText:
          /pan.baidu.com\/s\/[0-9a-zA-Z-_]{8,24}([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 百度网盘链接
        link_innerHTML:
          /pan.baidu.com\/s\/[0-9a-zA-Z-_]{8,24}([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 百度网盘链接
        shareCode: /pan\.baidu\.com\/s\/([0-9a-zA-Z-_]+)/gi, // 链接参数
        shareCodeNeedRemoveStr: /pan\.baidu\.com\/s\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(密码|访问码|提取码).+/g, // 用来判断是否存在密码
        accessCode: /[0-9a-zA-Z]{4}/i, // 提取码（如果存在的话）
        uiLinkShow:
          "pan.baidu.com/s/{#shareCode#}?pwd={#accessCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://pan.baidu.com/s/{#shareCode#}?pwd={#accessCode#}",
      },
      lanzou: {
        link_innerText:
          /lanzou[a-z]{0,1}.com\/(tp\/|u\/|)([a-zA-Z0-9_\-]{5,22}|[%0-9a-zA-Z]{3,90}|[\u4e00-\u9fa5]{1,20})([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[a-zA-Z0-9]{3,6}|)/gi,
        link_innerHTML:
          /lanzou[a-z]{0,1}.com\/(tp\/|u\/|)([a-zA-Z0-9_\-]{5,22}|[%0-9a-zA-Z]{3,90}|[\u4e00-\u9fa5]{1,20})([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[a-zA-Z0-9]{3,6}|)/gi,
        shareCode:
          /lanzou[a-z]{0,1}.com\/(tp\/|u\/|)([a-zA-Z0-9_\-]{5,22}|[%0-9a-zA-Z]{3,90}|[\u4e00-\u9fa5]{1,20})/gi,
        shareCodeNotMatch: /^(ajax|file|undefined|1125)/gi, // shareCode参数中不可能存在的链接，如果shareCode存在这些，那就拒绝匹配
        shareCodeNeedRemoveStr: /lanzou[a-z]{0,1}.com\/(tp\/|u\/|)/gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/i,
        uiLinkShow: "lanzoux.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://www.lanzoux.com/s/{#shareCode#}",
      },
      tianyiyun: {
        link_innerText:
          /(cloud.189.cn\/web\/share\?code=([0-9a-zA-Z_\-]){8,14}|cloud.189.cn\/t\/([a-zA-Z0-9_\-]{8,14}))([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /(cloud.189.cn\/web\/share\?code=([0-9a-zA-Z_\-]){8,14}|cloud.189.cn\/t\/([a-zA-Z0-9_\-]{8,14}))([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode:
          /cloud.189.cn\/web\/share\?code=([0-9a-zA-Z_\-]){8,14}|cloud.189.cn\/t\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr:
          /cloud\.189\.cn\/t\/|cloud.189.cn\/web\/share\?code=/gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        uiLinkShow: "cloud.189.cn/t/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://cloud.189.cn/t/{#shareCode#}",
      },
      hecaiyun: {
        link_innerText:
          /caiyun.139.com\/m\/i\?([a-zA-Z0-9_\-]{8,14})([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /caiyun.139.com\/m\/i\?([a-zA-Z0-9_\-]{8,14})([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode: /caiyun\.139\.com\/m\/i\?([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /caiyun\.139\.com\/m\/i\?/gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        uiLinkShow: "caiyun.139.com/m/i?{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://caiyun.139.com/m/i?{#shareCode#}",
      },
      aliyun: {
        link_innerText:
          /aliyundrive.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /aliyundrive.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode: /aliyundrive\.com\/s\/([a-zA-Z0-9_\-]{8,14})/g,
        shareCodeNotMatch: /undefined/gi, // shareCode参数中不可能存在的链接，如果shareCode存在这些，那就拒绝匹配
        shareCodeNeedRemoveStr: /aliyundrive\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        acceesCodeNotMatch: /^(font)/gi,
        uiLinkShow: "aliyundrive.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://aliyundrive.com/s/{#shareCode#}",
      },
      wenshushu: {
        link_innerText:
          /(wss.ink\/f\/([a-zA-Z0-9_-]{8,14})|ws28.cn\/f\/([a-zA-Z0-9_-]{8,14})|wss1.cn\/f\/([a-zA-Z0-9_-]{8,14}))([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /(wss.ink\/f\/([a-zA-Z0-9_-]{8,14})|ws28.cn\/f\/([a-zA-Z0-9_-]{8,14})|wss1.cn\/f\/([a-zA-Z0-9_-]{8,14}))([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode:
          /wss.ink\/f\/([a-zA-Z0-9_-]{8,14})|ws28.cn\/f\/([a-zA-Z0-9_-]{8,14})|wss1.cn\/f\/([a-zA-Z0-9_-]{8,14})/gi,
        shareCodeNeedRemoveStr: /wss.ink\/f\/|ws28.cn\/f\/|wss1.cn\/f\//gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        uiLinkShow: "wss.ink/f/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://wss.ink/f/{#shareCode#}",
      },
      nainiu: {
        link_innerText:
          /cowtransfer.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /cowtransfer.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode: /cowtransfer.com\/s\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /cowtransfer\.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        uiLinkShow: "cowtransfer.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://cowtransfer.com/s/{#shareCode#}",
      },
      _123pan: {
        link_innerText:
          /123pan.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,20}(密码|访问码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /123pan.com\/s\/([a-zA-Z0-9_\-]{8,14})([\s\S]{0,300}(密码|访问码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode: /123pan.com\/s\/([a-zA-Z0-9_\-]{8,14})/gi,
        shareCodeNeedRemoveStr: /123pan.com\/s\//gi,
        checkAccessCode: /(密码|访问码|提取码).+/g,
        accessCode: /[0-9a-zA-Z]{4}/g,
        uiLinkShow: "123pan.com/s/{#shareCode#} 提取码: {#accessCode#}",
        blank: "https://123pan.com/s/{#shareCode#}",
      },
      weiyun: {
        link_innerText:
          /weiyun.com\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,20}(访问码|密码|提取码)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi,
        link_innerHTML:
          /weiyun.com\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,300}(访问码|密码|提取码)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi,
        shareCode: /weiyun.com\/([0-9a-zA-Z\-_]{8,24})/gi, // 链接参数
        shareCodeNotMatch:
          /^(ajax|file|download|ptqrshow|xy-privacy|comp|web)/gi, // shareCode参数中不可能存在的链接，如果shareCode存在这些，那就拒绝匹配
        shareCodeNeedRemoveStr: /weiyun.com\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/g, // 用来判断是否存在密码
        accessCode: /[0-9a-zA-Z]{4}/g, // 提取码（如果存在的话）
        uiLinkShow: "share.weiyun.com/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://share.weiyun.com/{#shareCode#}",
      },
      xunlei: {
        link_innerText:
          /xunlei.com\/s\/[0-9a-zA-Z\-_]{8,30}([\s\S]{0,20}(访问码|提取码|密码|)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        link_innerHTML:
          /xunlei.com\/s\/[0-9a-zA-Z\-_]{8,30}([\s\S]{0,300}(访问码|提取码|密码|)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        shareCode: /xunlei.com\/s\/([0-9a-zA-Z\-_]{8,30})/gi, // 链接参数
        shareCodeNeedRemoveStr: /xunlei.com\/s\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/g, // 用来判断是否存在密码
        accessCode: /[0-9a-zA-Z]{4}/g, // 提取码（如果存在的话）
        uiLinkShow: "pan.xunlei.com/s/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://pan.xunlei.com/s/{#shareCode#}",
      },
      _115pan: {
        link_innerText:
          /115.com\/s\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,20}(访问码|密码|提取码|\?password=)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        link_innerHTML:
          /115.com\/s\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,300}(访问码|密码|提取码|\?password=)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        shareCode: /115.com\/s\/([0-9a-zA-Z\-_]{8,24})/gi, // 链接参数
        shareCodeNeedRemoveStr: /115.com\/s\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|\?password=|访问码).+/gi, // 用来判断是否存在密码
        accessCode: /(\?password=|)([0-9a-zA-Z]{4})/i, // 提取码（如果存在的话）
        uiLinkShow: "115.com/s/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://115.com/s/{#shareCode#}",
      },
      chengtong1: {
        link_innerText:
          /ctfile.com(\/d\/|\/f\/)[0-9a-zA-Z\-_]{8,24}([\s\S]{0,20}(访问码|密码|提取码|\?password=)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        link_innerHTML:
          /ctfile.com(\/d\/|\/f\/)[0-9a-zA-Z\-_]{8,24}([\s\S]{0,300}(访问码|密码|提取码|\?password=)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        shareCode: /ctfile.com(\/d\/|\/f\/)([0-9a-zA-Z\-_]{8,24})/gi, // 链接参数
        shareCodeNeedRemoveStr: /ctfile.com(\/d\/|\/f\/)/gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/gi, // 用来判断是否存在密码
        accessCode: /([0-9a-zA-Z]{4})/i, // 提取码（如果存在的话）
        uiLinkShow: "url95.ctfile.com/d/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://url95.ctfile.com/d/{#shareCode#}",
      },
      chengtong2: {
        link_innerText:
          /(2k.us\/file\/|u062.com\/file\/|545c.com\/file\/)[0-9a-zA-Z\-_]{8,24}([\s\S]{0,20}(访问码|密码|提取码|\?password=)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        link_innerHTML:
          /(2k.us\/file\/|u062.com\/file\/|545c.com\/file\/)[0-9a-zA-Z\-_]{8,24}([\s\S]{0,300}(访问码|密码|提取码|\?password=)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        shareCode:
          /(2k.us\/file\/|u062.com\/file\/|545c.com\/file\/)([0-9a-zA-Z\-_]{8,24})/gi, // 链接参数
        shareCodeNeedRemoveStr:
          /2k.us\/file\/|u062.com\/file\/|545c.com\/file\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/gi, // 用来判断是否存在密码
        accessCode: /([0-9a-zA-Z]{4})/i, // 提取码（如果存在的话）
        uiLinkShow: "u062.com/file/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://u062.com/file/{#shareCode#}",
      },
      kuake: {
        link_innerText:
          /quark.cn\/s\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,20}(访问码|密码|提取码|\?password=)[\s\S]{0,10}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        link_innerHTML:
          /quark.cn\/s\/[0-9a-zA-Z\-_]{8,24}([\s\S]{0,300}(访问码|密码|提取码|\?password=)[\s\S]{0,15}[0-9a-zA-Z]{4}|)/gi, // 网盘链接
        shareCode: /quark.cn\/s\/([0-9a-zA-Z\-_]{8,24})/gi, // 链接参数
        shareCodeNeedRemoveStr: /quark.cn\/s\//gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/gi, // 用来判断是否存在密码
        accessCode: /([0-9a-zA-Z]{4})/i, // 提取码（如果存在的话）
        uiLinkShow: "quark.cn/s/{#shareCode#} 提取码: {#accessCode#}", // 用于显示的链接
        blank: "https://pan.quark.cn/s/{#shareCode#}",
      },
      magnet: {
        link_innerText: /magnet:\?xt=urn:btih:[0-9a-fA-F]{32,40}/gi,
        link_innerHTML: /magnet:\?xt=urn:btih:[0-9a-fA-F]{32,40}/gi,
        shareCode: /magnet:\?xt=urn:btih:([0-9a-fA-F]{32,40})/gi, // 链接参数
        shareCodeNeedRemoveStr: /magnet:\?xt=urn:btih:/gi, // 需要替换空的字符串，比如pan.baidu.com/s/替换为空
        checkAccessCode: /(提取码|密码|访问码).+/gi, // 用来判断是否存在密码
        accessCode: /([0-9a-zA-Z]{4})/i, // 提取码（如果存在的话）
        uiLinkShow: "magnet:?xt=urn:btih:{#shareCode#}", // 用于显示的链接
        blank: "magnet:?xt=urn:btih:{#shareCode#}",
      },
    },
    initLinkDict() {
      // 初始化字典
      NetDisk.linkDict = new Utils.Dictionary();
      Object.keys(NetDisk.regular).forEach((keys) => {
        NetDisk.linkDict.set(keys, new Utils.Dictionary());
      });
    },
    matchPageLink(clipboardText) {
      // 检查页面是否存在链接
      let matchTextRange = GM_getValue("pageMatchRange", "innerText");
      if (matchTextRange.toLowerCase() === "all") {
        this.pageText = $("body").prop("innerText");
        if ($(".whitesevPop-whitesevPopSetting").length !== 0) {
          this.pageText = this.pageText.replaceAll(
            $(".whitesevPop-whitesevPopSetting").prop("innerText"),
            ""
          );
        }
        this.pageText += $("body").prop("innerHTML");
        if ($(".whitesevPop-whitesevPopSetting").length !== 0) {
          this.pageText = this.pageText.replaceAll(
            $(".whitesevPop-whitesevPopSetting").prop("innerText"),
            ""
          );
        }
        this.pageText += clipboardText;
      } else {
        this.pageText = $("body").prop(matchTextRange) + clipboardText;
        if ($(".whitesevPop-whitesevPopSetting").length !== 0) {
          this.pageText = this.pageText.replaceAll(
            $(".whitesevPop-whitesevPopSetting").prop(matchTextRange),
            ""
          );
        }
      }
      if (!this.isInit) {
        this.matchLink = new Set();
        this.initLinkDict();
        this.isInit = true;
      }
      if (matchTextRange.toLowerCase() === "all") {
        $.each(this.regular, (netdiskName, item) => {
          window.GM_linkWorker.postMessage({
            regexp: item["link_innerText"],
            pageText: this.pageText,
            netdiskName: netdiskName,
          });
          window.GM_linkWorker.postMessage({
            regexp: item["link_innerHTML"],
            pageText: this.pageText,
            netdiskName: netdiskName,
          });
        });
      } else {
        $.each(this.regular, (netdiskName, item) => {
          window.GM_linkWorker.postMessage({
            regexp: item[`link_${matchTextRange}`],
            pageText: this.pageText,
            netdiskName: netdiskName,
          });
        });
      }
    },
    handleLink(netDiskName, url) {
      // 处理链接，将匹配到的链接转为参数和密码存入字典中
      let currentDict = this.linkDict.get(netDiskName);
      let shareCode = this.handleShareCode(netDiskName, url);
      if (shareCode == "" || shareCode == null) {
        return null;
      }
      let accessCode = this.handleAccessCode(netDiskName, url);
      if (currentDict.has(shareCode)) {
        let dictAccessCode = this.linkDict.get(netDiskName).get(shareCode);
        if (dictAccessCode == "" && accessCode != "" && accessCode != null) {
          currentDict.set(shareCode, accessCode);
          UI.view.changeLinkView(netDiskName, shareCode, accessCode);
          console.log(
            `设置密码 ${netDiskName}: ${shareCode}  ===> ${accessCode}`
          );
        }
      } else {
        this.hasMatchLink = true;
        currentDict.set(shareCode, accessCode);
        UI.matchIcon.add(netDiskName);
        UI.view.addLinkView(netDiskName, shareCode, accessCode);
        console.log(
          `%c${netDiskName}%c ${shareCode} ===> ${accessCode}`,
          "background:#24272A; color:#ffffff; padding: 0px 10px;",
          "color:#000000"
        );
      }
    },
    handleShareCode(netDiskName, url) {
      // 处理shareCode
      let shareCodeMatch = url.match(this.regular[netDiskName].shareCode);
      if (shareCodeMatch == null) {
        return "";
      }
      if (shareCodeMatch.length === 0) {
        return "";
      }
      let shareCode = shareCodeMatch[0].replace(
        this.regular[netDiskName].shareCodeNeedRemoveStr,
        ""
      );
      let shareCodeNotMatch = this.regular[netDiskName].shareCodeNotMatch;
      if (shareCodeNotMatch != null && shareCode.match(shareCodeNotMatch)) {
        console.log("不可能的shareCode =>", shareCode);
        return "";
      }
      shareCode = decodeURIComponent(shareCode); // %E7%BD%91%E7%9B%98 => 网盘
      return shareCode;
    },
    handleAccessCode(netDiskName, url) {
      // 处理accessCode
      let accessCode = "";
      let accessCodeMatch = url.match(
        this.regular[netDiskName].checkAccessCode
      );
      if (accessCodeMatch) {
        accessCode = accessCodeMatch[0].match(
          this.regular[netDiskName].accessCode
        );
        if (accessCode == null) {
          return "";
        }
        $.each(accessCode, (i, v) => {
          if (!v.match(this.regular[netDiskName]["accessCodeNotMatch"])) {
            return accessCode[i];
          }
        });
        accessCode = accessCode[0];
      }
      return accessCode;
    },
    handleLinkShow(netDiskName, shareCode, accessCode) {
      // 处理显示在弹窗的网盘链接
      let netdisk_regular = NetDisk.regular[netDiskName];
      let uiLink = netdisk_regular["uiLinkShow"].replace(
        /{#shareCode#}/gi,
        shareCode
      );
      if (accessCode) {
        uiLink = uiLink.replace(/{#accessCode#}/g, accessCode);
      } else {
        uiLink = uiLink.replace(/( |提取码:|{#accessCode#}|\?pwd=)/g, "");
      }
      return uiLink;
    },
    getClipboardText() {
      /* 获取剪贴板文本 */
      return new Promise((res) => {
        navigator.permissions
          .query({
            name: "clipboard-read",
          })
          .then((result) => {
            const hasFocus = document.hasFocus(); //这个是重点，可判断是否为当前dom页面
            if (
              hasFocus &&
              (result.state === "granted" || result.state === "prompt")
            ) {
              const clipboard = navigator.clipboard.readText();
              clipboard.then((clipText) => {
                res(clipText);
              });
            } else {
              res("");
            }
          });
      });
    },
  };

  const NetDiskLinkParse = {
    // 网盘直链解析
    netdisk: {
      baidu: {
        default(shareCode, accessCode) {
          let bdurl = GM_getValue("bdurl");
          let paramSurl = GM_getValue("paramSurl");
          let paramPwd = GM_getValue("paramPwd");
          let paramKey = GM_getValue("paramKey");
          let paramWebSiteKey = GM_getValue("paramWebSiteKey");
          let baidu_website_key_enable = GM_getValue(
            "baidu-website-key-enable"
          );

          if (!bdurl) {
            Qmsg.error("请完善配置 网址-Url", {
              html: true,
            });
            return null;
          }
          if (!paramSurl) {
            Qmsg.error("请完善配置 参数-Key", {
              html: true,
            });
            return null;
          }
          if (!paramPwd) {
            Qmsg.error("请完善配置 密码-Key", {
              html: true,
            });
            return null;
          }
          if (!paramKey) {
            Qmsg.error("请完善配置 密钥-Key", {
              html: true,
            });
            return null;
          }
          if (baidu_website_key_enable && !paramWebSiteKey) {
            Qmsg.error("请完善配置 密钥-Value", {
              html: true,
            });
            return null;
          }
          var temp = document.createElement("form");
          var list = {}; //表单数据
          list[paramSurl] = shareCode;
          list[paramPwd] = accessCode;
          if (baidu_website_key_enable) {
            list[paramKey] = paramWebSiteKey;
          }
          temp.action = bdurl; //解析网址
          temp.method = "post";
          temp.style.display = "none";
          temp.target = "_blank";
          for (var x in list) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = list[x]; // alert(opt.name)
            temp.appendChild(opt);
          }
          document.body.appendChild(temp);
          temp.submit();
        },
      },
      lanzou: {
        // 流程：判断是否是多文件
        // 单文件 => 请求https://www.lanzoux.com/{shareToken} 判断链接类型和是否能正常获取
        //       => 请求https://www.lanzoux.com/tp/{shareToken} 获取文件sign
        //       => 请求https://www.lanzoux.com/ajaxm.php 获取下载参数，下载参数例如：https://develope.lanzoug.com/file/?xxxxxxxxx
        // 多文件 => 先请求https://www.lanzoux.com/{shareToken} 获取文件sign => 请求https://www.lanzoux.com/filemoreajax.php 获取json格式的文件参数，参数内容如{"info":"success","text":[{"duan":"xx","icon":"","id":"".....},{},{}]}
        url: {
          default: (replaced, shareCode) => {
            return NetDisk.regular.lanzou.blank
              .replace("/s/", replaced)
              .replace(/{#shareCode#}/g, shareCode);
          },
          tp: (shareCode) => {
            return NetDisk.regular.lanzou.blank
              .replace("/s/", "/tp/")
              .replace(/{#shareCode#}/gi, shareCode);
          },
          uiLink: (shareCode, accessCode) => {
            return NetDisk.regular.lanzou.uiLinkShow
              .replace(/{#shareCode#}/gi, shareCode)
              .replace(/{#accessCode#}/gi, accessCode);
          },
        },
        regexp: {
          unicode: {
            match: /[%\u4e00-\u9fa5]+/g, // 判断该链接是否是中文
            tip: "中文链接",
            isUnicode: false,
          },
          noFile: {
            match: /div>来晚啦...文件取消分享了<\/div>/g, //蓝奏文件取消分享
            tip: "来晚啦...文件取消分享了",
          },
          noExists: {
            match: /div>文件不存在，或已删除<\/div>/g, //蓝奏文件链接错误
            tip: "文件不存在，或已删除",
          },
          moreFile: {
            match: /<span id=\"filemore\" onclick=\"more\(\);\">/g, // 蓝奏多文件
          },
          sign: {
            match: /var[\s]*posign[\s]*=[\s]*'(.+?)';/, //蓝奏设置了密码的单文件请求需要的sign值;
          },
          fileName: {
            match: /<title>(.*)<\/title>/, //蓝奏文件名
          },
          size: {
            match: /<span class=\"mtt\">\((.*)\)<\/span>/, //蓝奏文件大小
          },
          loadDown: {
            match:
              /var[\s]*(loaddown|oreferr|spototo|domianload)[\s]*=[\s]*'(.+?)';/i,
          },
        },
        http: {
          UserAgent:
            "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
          ContentTypeJson: "application/json; charset=UTF-8",
          ContentTypeForm: "application/x-www-form-urlencoded; charset=UTF-8",
        },
        default(shareCode, accessCode) {
          this.regexp.unicode.isUnicode = shareCode.match(
            this.regexp.unicode.match
          )
            ? true
            : false;
          this.replaced = this.regexp.unicode.isUnicode ? "/u/" : "/";

          this.getFileLink(shareCode, accessCode);
        },
        async getFileLink(shareCode, accessCode, getShareCodeByPageAgain) {
          // 获取文件下载链接
          let that = this;
          let _url_ = this.url.default(this.replaced, shareCode);
          console.log(_url_);
          GM_xmlhttpRequest({
            url: _url_,
            timeout: 5000,
            method: "GET",
            headers: {
              Accept: "*/*",
              "user-agent": that.http.UserAgent,
              referer: window.location.origin,
            },
            onload: function (r) {
              if (r.status == 200 && r.readyState == 4) {
                if (that.checkPageCode(r)) {
                  if (that.isMoreFile(r)) {
                    console.log("该链接为多文件");
                    that.getMoreFile(r, shareCode, accessCode);
                  } else {
                    console.log("该链接为单文件");
                    console.log(r);
                    if (getShareCodeByPageAgain) {
                      let shareCodeNewMatch = r.responseText.match(
                        /var[\s]*link[\s]*=[\s]*\'tp\/(.+?)\';/i
                      );
                      shareCode =
                        shareCodeNewMatch[shareCodeNewMatch.length - 1];
                      console.log("新参数 => " + shareCode);
                    }
                    that.getLinkByTp(shareCode, accessCode);
                  }
                }
              } else {
                console.log(r);
                Qmsg.error("请求失败，请重试", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        getRedirectFinalUrl(url) {
          let that = this;
          console.log("开始获取head");
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: url,
              timeout: 5000,
              method: "head",
              headers: {
                Accept: "*/*",
                "user-agent": that.http.UserAgent,
                referer: window.location.origin,
              },
              onload: function () {
                res(this.finalUrl);
              },
              onerror: function () {
                res(url);
              },
            });
          });
        },
        checkPageCode(resp) {
          // 页面检查，看看是否存在文件失效情况
          let pageText = resp.responseText;
          if (pageText.match(this.regexp.noFile.match)) {
            Qmsg.error(this.regexp.noFile.tip, {
              html: true,
            });
            return false;
          }
          if (pageText.match(this.regexp.noExists.match)) {
            Qmsg.error(this.regexp.noExists.tip, {
              html: true,
            });
            return false;
          }
          return true;
        },
        isMoreFile(resp) {
          // 判断是否是多文件的链接
          let pageText = resp.responseText;
          if (pageText.match(this.regexp.moreFile.match)) {
            console.log("该链接为多文件");
            return true;
          }
          return false;
        },
        getLinkByTp(shareCode, accessCode) {
          // 访问蓝奏tp获取sign
          let _url_ = this.url.tp(shareCode);
          let that = this;
          GM_xmlhttpRequest({
            url: _url_,
            timeout: 5000,
            method: "GET",
            headers: {
              Accept: "*/*",
              "user-agent": that.http.UserAgent,
              referer: window.location.origin,
            },
            onload: function (r) {
              console.log("by_tp ↓");
              console.log(r);
              if (r.status == 200 && r.readyState == 4) {
                that.getLink(r, shareCode, accessCode);
              } else {
                Qmsg.error("请求失败，请重试", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        async getLink(resp, shareCode, accessCode) {
          // 获取链接
          let that = this;
          let pageText = resp.responseText;
          if (pageText == null) {
            console.log("shareCode错误，重新从页面中获取");
            this.getFileLink(shareCode, accessCode, true);
            return;
          }
          let sign = pageText.match(this.regexp.sign.match);
          let postData_p = "";
          let postData_sign = "";
          let fileNameMatch = pageText.match(this.regexp.fileName.match);
          let fileName = fileNameMatch ? fileNameMatch[1].trim() : "";
          let fileSizeMatch = pageText.match(this.regexp.size.match);
          let fileSize = fileSizeMatch ? fileSizeMatch[1].trim() : "";
          if (sign) {
            postData_sign = sign[1];
            console.log("获取Sign:" + postData_sign);
            if (accessCode) {
              console.log("传入参数=>有密码");
              postData_p = accessCode;
            } else {
              console.log("传入参数=>无密码");
            }
            GM_xmlhttpRequest({
              url: "https://www.lanzoux.com/ajaxm.php",
              timeout: 5000,
              method: "POST",
              responseType: "json",
              headers: {
                "Content-Type": that.http.ContentTypeForm,
                "user-agent": that.http.UserAgent,
                referer: window.location.origin,
              },
              data:
                "action=downprocess&sign=" + postData_sign + "&p=" + postData_p,
              onload: async (r) => {
                console.log(r);
                if (r.status == 200 && r.readyState == 4) {
                  let json_data = JSON.parse(r.responseText);
                  let downloadUrl =
                    json_data["dom"] + "/file/" + json_data["url"];
                  let zt = json_data["zt"];
                  if ("密码不正确".indexOf(json_data["inf"]) != -1) {
                    Qmsg.error("密码不正确!", {
                      html: true,
                    });
                    pop.prompt({
                      title: "密码不正确",
                      placeholder: "请重新输入密码",
                      row: false,
                      focus: true,
                      content: "",
                      button: [
                        [
                          "default",
                          "取消",
                          function () {
                            this.close();
                          },
                        ],
                        [
                          "primary",
                          "确定",
                          function () {
                            let newPwd = this.getText().replace(/ /g, "");
                            if (newPwd != "") {
                              let uiLink = that.url.uiLink(shareCode, newPwd);
                              $(
                                `.netdisk-url a[data-netdisk=lanzou][data-sharecode=${shareCode}]`
                              ).attr("data-accesscode", newPwd);
                              $(
                                `.netdisk-url a[data-netdisk=lanzou][data-sharecode=${shareCode}]`
                              ).html(uiLink);
                            }
                            console.log("重新输入的密码：" + newPwd);
                            that.getLink(resp, shareCode, newPwd);
                            this.close();
                          },
                        ],
                      ],
                      buttonSpcl: "",
                      anim: "fadeIn-zoom",
                      width: 350,
                      height: 160,
                      id: undefined,
                      place: 5,
                      drag: false,
                      index: true,
                      toClose: false,
                      mask: true,
                      class: false,
                    });
                  } else {
                    fileName = json_data["inf"] ? json_data["inf"] : fileName;
                    downloadUrl = await that.getRedirectFinalUrl(downloadUrl);
                    console.log(downloadUrl);
                    downloadUrl = filterScheme.handleUrl(
                      "lanzou-static-scheme-enable",
                      "lanzou-static-scheme-forward",
                      downloadUrl
                    );
                    UI.staticView.oneFile(
                      "蓝奏云单文件直链",
                      fileName,
                      fileSize,
                      downloadUrl
                    );
                  }
                } else {
                  Qmsg.error("请求失败，请重试", {
                    html: true,
                  });
                }
              },
              onerror: () => {
                Qmsg.error("网络异常", {
                  html: true,
                });
              },
            });
          } else {
            let loaddown = pageText.match(this.regexp.loadDown.match);
            if (loaddown == null) {
              loaddown = pageText.match(/cppat[\s]*\+[\s]*'(.+?)'/i);
            }
            if (loaddown != null) {
              let downloadUrl =
                "https://develope.lanzoug.com/file/" +
                loaddown[loaddown.length - 1];
              console.log(fileName, fileSize, downloadUrl);
              downloadUrl = await that.getRedirectFinalUrl(downloadUrl);
              console.log(downloadUrl);
              downloadUrl = filterScheme.handleUrl(
                "lanzou-static-scheme-enable",
                "lanzou-static-scheme-forward",
                downloadUrl
              );
              UI.staticView.oneFile(
                "蓝奏云单文件直链",
                fileName,
                fileSize,
                downloadUrl
              );
            } else {
              Qmsg.error("获取sign失败", {
                html: true,
              });
            }
          }
        },
        getMoreFile(resp, shareCode, accessCode) {
          // 多文件获取
          let _url_ = this.url.default(this.replaced, shareCode);
          let that = this;
          GM_xmlhttpRequest({
            url: _url_,
            timeout: 5000,
            method: "GET",
            headers: {
              Accept: "*/*",
              "user-agent": that.http.UserAgent,
              referer: window.location.origin,
            },
            onload: function (r) {
              console.log(r);
              if (r.status == 200 && r.readyState == 4) {
                let pageText = r.responseText;
                let fid = pageText
                  .match(/\'fid\':(.+?),/)[1]
                  .replaceAll("'", "");
                let uid = pageText
                  .match(/\'uid\':(.+?),/)[1]
                  .replaceAll("'", "");
                let pgs = 1;
                let t_name = pageText.match(/\'t\':(.+?),/)[1];
                let t_rexp = new RegExp(
                  t_name + "[\\s]*=[\\s]*('|\")(.+?)('|\");"
                );
                let t = pageText.match(t_rexp)[2];
                let k_name = pageText.match(/\'k\':(.+?),/)[1];
                let k_rexp = new RegExp(
                  k_name + "[\\s]*=[\\s]*('|\")(.+?)('|\");"
                );
                let k = pageText.match(k_rexp)[2];
                let lx = shareCode.match(that.regexp.unicode.match) ? 1 : 2;
                let postData = `lx=${lx}&fid=${fid}&uid=${uid}&pg=${pgs}&rep=0&t=${t}&k=${k}&up=1&ls=1&pwd=${accessCode}`;
                console.log("多文件请求参数：" + postData);
                GM_xmlhttpRequest({
                  url: "https://www.lanzoux.com/filemoreajax.php",
                  timeout: 5000,
                  method: "POST",
                  responseType: "json",
                  headers: {
                    "Content-Type": that.http.ContentTypeForm,
                    "user-agent": that.http.UserAgent,
                    referer: window.location.origin,
                  },
                  data: postData,
                  onload: function (resp) {
                    console.log(resp);
                    let json_data = JSON.parse(resp.responseText);
                    let zt = json_data["zt"];
                    let info = json_data["info"];
                    if (zt == 4) {
                      Qmsg.error(info, {
                        html: true,
                      });
                    } else if (zt == 1) {
                      Qmsg.success("获取文件夹成功，解析文件直链中...", {
                        html: true,
                      });
                      var folder = json_data["text"];
                      var folderContent = "";
                      var folderContextArray = [];
                      console.log("本链接一共" + folder.length + "个文件");
                      Promise.all(
                        Array.from(folder).map(async (item, index) => {
                          let _shareCode_ = item.id;
                          let fileName = item.name_all;
                          let fileSize = item.size;
                          console.log(`第${index + 1}个开始解析`);
                          let content = await that.parseMoreFile(
                            _shareCode_,
                            fileName,
                            fileSize
                          );
                          console.log(`第${index + 1}个解析完毕`);
                          folderContextArray = folderContextArray.concat({
                            index: index,
                            text: content,
                          });
                        })
                      ).then(() => {
                        console.log("解析完毕,排序,弹出弹窗");

                        function compareDesc(propertyName) {
                          return function (object1, object2) {
                            var value1 = object1[propertyName];
                            var value2 = object2[propertyName];
                            if (value2 < value1) {
                              return -1;
                            } else if (value2 > value1) {
                              return 1;
                            } else {
                              return 0;
                            }
                          };
                        }
                        folderContextArray.sort(compareDesc("index")).reverse();
                        folderContextArray.forEach((item) => {
                          folderContent = folderContent + item["text"];
                        });
                        UI.staticView.moreFile(
                          "蓝奏云多文件直链",
                          folderContent
                        );
                      });
                    } else if ("密码不正确".indexOf(info) != -1) {
                      Qmsg.error("密码不正确!", {
                        html: true,
                      });
                      pop.prompt({
                        title: "密码不正确",
                        placeholder: "请重新输入密码",
                        row: false,
                        focus: true,
                        content: "",
                        button: [
                          [
                            "default",
                            "取消",
                            function () {
                              this.close();
                            },
                          ],
                          [
                            "primary",
                            "确定",
                            function () {
                              let newPwd = this.getText().replace(/ /g, "");
                              if (newPwd != "") {
                                let uiLink = that.url.uiLink(shareCode, newPwd);
                                $(
                                  `.netdisk-url a[data-netdisk=lanzou][data-sharecode=${shareCode}]`
                                ).attr("data-accesscode", newPwd);
                                $(
                                  `.netdisk-url a[data-netdisk=lanzou][data-sharecode=${shareCode}]`
                                ).html(uiLink);
                              }
                              console.log("重新输入的密码：" + newPwd);
                              that.getMoreFile(resp, shareCode, newPwd);
                              this.close();
                            },
                          ],
                        ],
                        buttonSpcl: "",
                        anim: "fadeIn-zoom",
                        width: 350,
                        height: 160,
                        id: undefined,
                        place: 5,
                        drag: false,
                        index: true,
                        toClose: false,
                        mask: true,
                        class: false,
                      });
                    } else if ("没有了".indexOf(info) != -1) {
                      Qmsg.error("没有文件了", {
                        html: true,
                      });
                    } else {
                      Qmsg.error("未知错误", {
                        html: true,
                      });
                    }
                  },
                  onerror: function () {
                    Qmsg.error("网络异常", {
                      html: true,
                    });
                  },
                });
              } else {
                Qmsg.error("请求失败，请重试", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        parseMoreFile(shareCode, fileName, fileSize) {
          // 根据获取到的json中多文件链接来获取单文件直链
          let ret_content = "";
          let that = this;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: that.url.tp(shareCode),
              timeout: 5000,
              method: "GET",
              headers: {
                Accept: "*/*",
                "user-agent": that.http.UserAgent,
                referer: window.location.origin,
              },
              onload: async function (r) {
                let pageText = r.responseText;
                let loaddown = pageText.match(
                  NetDiskLinkParse.netdisk.lanzou.regexp.loadDown.match
                );
                if (loaddown == null) {
                  loaddown = pageText.match(/cppat[\s]*\+[\s]*'(.+?)'/i);
                }
                let submit_url = "javascript:;";
                let downloadUrl = "";
                if (downloadUrl != null) {
                  let needRedirectDownloadUrl = `https://develope.lanzoug.com/file/${
                    loaddown[loaddown.length - 1]
                  }`;
                  downloadUrl = await that.getRedirectFinalUrl(
                    needRedirectDownloadUrl
                  );
                  submit_url = filterScheme.handleUrl(
                    "lanzou-static-scheme-enable",
                    "lanzou-static-scheme-forward",
                    downloadUrl
                  );
                } else {
                  fileSize = "解析直链失败";
                }

                ret_content = `
								<div class="netdisk-static-body">
									<div class="netdisk-static-filename">
										<a href="${submit_url}" target="_blank">${fileName}</a>
									</div>
									<div class="netdisk-static-filesize">${fileSize}</div>
								</div>
								`;
                res(ret_content);
              },
              onerror: function (r) {
                console.log(r);
                ret_content = `
								<div class="netdisk-static-body">
									<div class="netdisk-static-filename">
										<a href="javascript:;">${fileName}</a>
									</div>
									<div class="netdisk-static-filesize">解析失败，请求异常</div>
								</div>`;
                res(ret_content);
              },
            });
          });
        },
      },
      tianyiyun: {
        code: {
          ShareAuditNotPass: "抱歉，该内容审核不通过",
          FileNotFound: "抱歉，文件不存在",
          ShareExpiredError: "抱歉，您访问的页面地址有误，或者该页面不存在",
          ShareAuditWaiting: "抱歉，该链接处于审核中",
          ShareInfoNotFound: "抱歉，您访问的页面地址有误，或者该页面不存在",
          FileTooLarge: "抱歉，文件太大，不支持下载",
          InvalidSessionKey:
            "天翼云Session已失效，是否前去登录？<br />(注意,UA需要切换成PC进行登录)",
        },
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
          this.shareCode = shareCode;
          this.accessCode = accessCode;
          this.getDownloadParams();
        },
        getDownloadParams() {
          let that = this;
          let post_url =
            "https://cloud.189.cn/api/open/share/getShareInfoByCodeV2.action";
          let post_data = "shareCode=" + that.shareCode;

          GM_xmlhttpRequest({
            url: post_url,
            timeout: 5000,
            method: "POST",
            data: post_data,
            headers: {
              accept: "application/json;charset=UTF-8",
              "content-type": "application/x-www-form-urlencoded",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Mobile Safari/537.36 Edg/94.0.992.38",
              referer: "https://h5.cloud.189.cn/",
              origin: "https://h5.cloud.189.cn",
            },
            onload: function (r) {
              console.log(r);
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data.res_code == 0) {
                console.log(json_data);
                that.isFolder = json_data.isFolder;
                if (json_data["needAccessCode"] && !that.accessCode) {
                  Qmsg.error("密码不正确!", {
                    html: true,
                  });
                  pop.prompt({
                    title: "密码不正确",
                    placeholder: "请重新输入密码",
                    row: false,
                    focus: true,
                    content: "",
                    button: [
                      [
                        "default",
                        "取消",
                        function () {
                          this.close();
                        },
                      ],
                      [
                        "primary",
                        "确定",
                        function () {
                          let newPwd = this.getText().replace(/ /g, "");
                          if (newPwd != "") {
                            let uiLink = NetDisk.regular.tianyiyun.uiLinkShow
                              .replace(/{#shareCode#}/gi, that.shareCode)
                              .replace(/{#accessCode#}/gi, newPwd);
                            $(
                              `.netdisk-url a[data-netdisk=tianyiyun][data-sharecode=${that.shareCode}]`
                            ).attr("data-accesscode", newPwd);
                            $(
                              `.netdisk-url a[data-netdisk=tianyiyun][data-sharecode=${that.shareCode}]`
                            ).html(uiLink);
                          }
                          console.log("重新输入的密码：" + newPwd);
                          that.accessCode = newPwd;
                          that.getDownloadParams();
                          this.close();
                        },
                      ],
                    ],
                    buttonSpcl: "",
                    anim: "fadeIn-zoom",
                    width: 350,
                    height: 160,
                    id: undefined,
                    place: 5,
                    drag: false,
                    index: true,
                    toClose: false,
                    mask: true,
                    class: false,
                  });
                  return;
                }
                if (that.isFolder) {
                  console.log("该链接是文件夹");
                  if (that.accessCode) {
                    GM_setClipboard(that.accessCode);
                    Qmsg.info("提取码已复制", {
                      html: true,
                    });
                  }
                  window.open(
                    "https://cloud.189.cn/t/" + that.shareCode,
                    "_blank"
                  );
                  return;
                }

                that.fileId = json_data.fileId;
                that.fileName = json_data.fileName;
                that.fileSize = json_data.fileSize;
                that.fileType = json_data.fileType;
                that.shareId = json_data.shareId;
                if (!that.shareId) {
                  that.getShareId();
                } else {
                  that.getDownloadUrl();
                }
              } else {
                if (that.code.hasOwnProperty(json_data["res_code"])) {
                  Qmsg.error(that.code[json_data["res_code"]], {
                    html: true,
                  });
                } else {
                  Qmsg.error("获取FileId失败", {
                    html: true,
                  });
                }
              }
            },
            onerror: function (r) {
              console.log(r);
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        getCookie() {
          // 暂不需要获取cookie
          let cookie = "";
          return cookie;
        },
        getShareId() {
          let that = this;
          let post_url =
            "https://cloud.189.cn/api/open/share/checkAccessCode.action?noCache=0.44175365295952296&shareCode=" +
            that.shareCode +
            "&accessCode=" +
            that.accessCode;
          GM_xmlhttpRequest({
            url: post_url,
            timeout: 5000,
            headers: {
              accept: "application/json;charset=UTF-8",
              "cache-control": "no-cache",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Edg/94.0.992.38",
              referer: "https://cloud.189.cn/web/share?code=" + that.shareCode,
            },
            onload: (r) => {
              console.log(r);
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data["res_message"] == "成功") {
                that.shareId = json_data["shareId"];
                that.getDownloadUrl();
              } else {
                Qmsg.error("获取shareId失败", {
                  html: true,
                });
                console.log(json_data);
              }
            },
            onerror: (r) => {
              console.error(r);
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        getDownloadUrl() {
          let that = this;
          let cookie_ = that.getCookie();
          let post_url =
            "https://cloud.189.cn/api/open/file/getFileDownloadUrl.action?noCache=0.8242175875972797&fileId=" +
            that.fileId +
            "&dt=1&shareId=" +
            that.shareId;
          GM_xmlhttpRequest({
            url: post_url,
            timeout: 5000,
            method: "GET",
            headers: {
              accept: "application/json;charset=UTF-8",
              "cache-control": "no-cache",
              "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Edg/94.0.992.38",
              referer: "https://cloud.189.cn/web/share?code=" + that.shareCode,
            },
            cookie: cookie_,
            onload: function (r) {
              let json_data = JSON.parse(r.responseText);
              console.log(json_data);
              if (r.status == 200 && json_data.res_code == 0) {
                let download_url = json_data.fileDownloadUrl;
                download_url = filterScheme.handleUrl(
                  "tianyiyun-scheme-enable",
                  "tianyiyun-scheme-forward",
                  download_url
                );
                UI.staticView.oneFile(
                  "天翼云单文件直链",
                  that.fileName,
                  Utils.formatByteToSize(that.fileSize),
                  download_url
                );
              } else if (
                "InvalidSessionKey" === json_data["res_code"] ||
                "InvalidSessionKey" === json_data["errorCode"]
              ) {
                pop
                  .alert({
                    title: "天翼云",
                    content: that.code[json_data.errorCode],
                    button: [
                      [
                        "close",
                        "关闭",
                        function () {
                          this.close();
                        },
                      ],
                      [
                        "primary",
                        "前往",
                        function () {
                          window.open(
                            "https://cloud.189.cn/web/login",
                            "_blank"
                          );
                        },
                      ],
                    ],
                    box: "body",
                    sizeAdapt: false,
                    drag: false,
                    mask: false,
                    only: true,
                    height: 180,
                    width: pop.pcIn ? 500 : 350,
                    class: "whitesevPopSetting",
                    buttonSpcl: "close",
                  })
                  .alias("天翼云需登录");
              } else if (that.code.hasOwnProperty(json_data["res_code"])) {
                Qmsg.error(that.code[json_data["res_code"]], {
                  html: true,
                });
              } else {
                Qmsg.error("请求失败", {
                  html: true,
                });
                console.log(r.responseText);
              }
            },
            onerror: function (r) {
              console.log(r);
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
      },
      hecaiyun: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      aliyun: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      wenshushu: {
        code: {
          1004: "no token",
          1013: "糟糕，此任务已过期销毁，下次要记得续期",
          1088: "糟糕，您访问的页面不存在",
        },
        default(shareCode, accessCode) {
          this.tid = shareCode;
          Qmsg.info("正在请求直链中...", {
            html: true,
          });
          this.getWss();
        },
        getWss() {
          let that = this;
          let url = "https://www.wenshushu.cn/ap/login/anonymous";
          let post_data = {
            dev_info: "{}",
          };
          GM_xmlhttpRequest({
            url: url,
            timeout: 5000,
            method: "POST",
            dataType: "json",
            responseType: "json",
            data: JSON.stringify(post_data),
            headers: {
              accept: "application/json, text/plain, */*",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
              referer: window.location.origin,
            },
            onload: function (r) {
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data["code"] == 0) {
                that.token = json_data["data"]["token"];
                that.getPid();
              } else if (json_data["code"] in that.code) {
                Qmsg.error(that.code[json_data["code"]], {
                  html: true,
                });
              } else {
                Qmsg.error("获取wss失败", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常");
            },
          });
        },
        getPid() {
          let that = this;
          let post_data = {
            tid: that.tid,
            password: "",
            ufileid: "",
          };
          GM_xmlhttpRequest({
            url: "https://www.wenshushu.cn/ap/task/mgrtask",
            timeout: 5000,
            method: "POST",
            dataType: "json",
            responseType: "json",
            data: JSON.stringify(post_data),
            headers: {
              accept: "application/json, text/plain, */*",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
              referer: window.location.origin,
              "x-token": that.token,
            },
            onload: function (r) {
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data["code"] == 0) {
                let bid = json_data["data"]["boxid"];
                let pid = json_data["data"]["ufileid"];
                that.getFileNList(bid, pid);
              } else if (json_data["code"] in that.code) {
                Qmsg.error(that.code[json_data["code"]], {
                  html: true,
                });
              } else {
                Qmsg.error("获取pid失败", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        getFileNList(bid, pid) {
          let that = this;
          let url = "https://www.wenshushu.cn/ap/ufile/nlist";
          let post_data = {
            start: 0,
            sort: {
              name: "asc",
            },
            bid: bid,
            pid: pid,
            options: {
              uploader: "true",
            },
            size: 50,
          };
          GM_xmlhttpRequest({
            url: url,
            timeout: 5000,
            method: "POST",
            dataType: "json",
            responseType: "json",
            data: JSON.stringify(post_data),
            headers: {
              accept: "application/json, text/plain, */*",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
              referer: window.location.origin,
              "x-token": that.token,
            },
            onload: function (r) {
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data["code"] == 0) {
                that.getDownloadUrl(json_data["data"]["fileList"][0]);
              } else if (json_data["code"] in that.code) {
                Qmsg.error(that.code[json_data["code"]], {
                  html: true,
                });
              } else {
                Qmsg.error("获取文件信息失败", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
        getDownloadUrl(data) {
          let that = this;
          let file_name = data.fname;
          let file_size = Utils.formatByteToSize(data.size);
          let post_url = "https://www.wenshushu.cn/ap/dl/sign";
          let post_data = {
            ufileid: data.fid,
            consumeCode: 0,
          };
          GM_xmlhttpRequest({
            url: post_url,
            timeout: 5000,
            method: "POST",
            dataType: "json",
            responseType: "json",
            data: JSON.stringify(post_data),
            headers: {
              accept: "application/json, text/plain, */*",
              "user-agent":
                "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
              referer: window.location.origin,
              "x-token": that.token,
            },
            onload: function (r) {
              let json_data = JSON.parse(r.responseText);
              if (r.status == 200 && json_data["code"] == 0) {
                let download_url = json_data["data"]["url"];
                if (download_url == "") {
                  Qmsg.error("对方的分享流量不足");
                } else {
                  download_url = filterScheme.handleUrl(
                    "wenshushu-static-scheme-enable",
                    "wenshushu-static-scheme-forward",
                    download_url
                  );
                  UI.staticView.oneFile(
                    "文叔叔单文件直链",
                    file_name,
                    file_size,
                    download_url
                  );
                }
              } else if (json_data["data"] in that.code) {
                Qmsg.error(that.code[json_data["data"]], {
                  html: true,
                });
              } else {
                Qmsg.error("获取下载链接失败", {
                  html: true,
                });
              }
            },
            onerror: function () {
              Qmsg.error("网络异常", {
                html: true,
              });
            },
          });
        },
      },
      nainiu: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      _123pan: {
        code: {
          5103: "分享码错误或者分享地址错误",
          5104: "分享已过期",
          "-1000": "获取出错",
          "-2000": "网络异常",
        },
        async default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
          this.shareCode = shareCode;
          this.accessCode = accessCode;
          this.panelContent = "";
          this.panelLength = 0;
          let infoLists = await this.getFiles(shareCode, accessCode, 0);
          if (infoLists[0]["error"] == null) {
            if (infoLists.length == 1 && infoLists[0]["Type"] == 0) {
              let downloadUrl = infoLists[0]["DownloadUrl"];
              let fileSize = "";
              if (downloadUrl == "") {
                let downloadInfo = await this.getFileDownloadInfo(
                  infoLists[0]["Etag"],
                  infoLists[0]["FileId"],
                  infoLists[0]["S3KeyFlag"],
                  this.shareCode,
                  infoLists[0]["Size"]
                );
                if (downloadInfo["code"] == 0) {
                  downloadUrl = filterScheme.handleUrl(
                    "_123pan-static-scheme-enable",
                    "_123pan-static-scheme-forward",
                    downloadInfo["data"]["DownloadURL"]
                  );
                  fileSize = Utils.formatByteToSize(infoLists[0]["Size"]);
                } else {
                  downloadUrl = "javascript:;";
                  fileSize = "获取下载链接失败";
                }
              } else {
                downloadUrl = filterScheme.handleUrl(
                  "_123pan-static-scheme-enable",
                  "_123pan-static-scheme-forward",
                  downloadUrl
                );
                fileSize = Utils.formatByteToSize(infoLists[0]["Size"]);
              }
              UI.staticView.oneFile(
                "123盘单文件直链",
                infoLists[0]["FileName"],
                fileSize,
                downloadUrl
              );
            } else {
              Qmsg.info("正在递归文件", {
                html: true,
              });

              this.folderNumber = 0;
              await this.recursiveAlgorithm(infoLists);
              UI.staticView.moreFile("123盘多文件直链", this.panelContent);
              console.log("end");
            }
          } else {
            Qmsg.error(this.code[infoLists[0]["error"]], {
              html: true,
            });
          }
        },
        getFiles(shareCode, accessCode, parentFileId) {
          let url = `https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&shareKey=${shareCode}&SharePwd=${accessCode}&ParentFileId=${parentFileId}&Page=1`;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: url,
              timeout: 5000,
              async: false,
              method: "GET",
              headers: {
                accept: "*/*",
                "user-agent":
                  "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
                referer: "https://www.123pan.com/s/" + shareCode,
              },
              onload: (r) => {
                console.log(r);
                let json_data = JSON.parse(r.responseText);
                if (r.status == 200 && json_data["code"] == 0) {
                  let infoList = json_data["data"]["InfoList"];
                  res(infoList);
                } else {
                  console.log(r);
                  res([
                    {
                      error: json_data["code"],
                    },
                  ]);
                }
              },
              onerror: (r) => {
                console.log(r);
                res([
                  {
                    error: -2,
                  },
                ]);
              },
            });
          });
        },
        getFilesByRec(shareCode, accessCode, parentFileId) {
          // 递归算法使用的请求
          let url = `https://www.123pan.com/b/api/share/get?limit=100&next=1&orderBy=share_id&orderDirection=desc&shareKey=${shareCode}&SharePwd=${accessCode}&ParentFileId=${parentFileId}&Page=1`;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: url,
              timeout: 5000,
              async: false,
              method: "GET",
              headers: {
                accept: "*/*",
                "user-agent":
                  "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
                referer: "https://www.123pan.com/s/" + shareCode,
              },
              onload: (r) => {
                console.log(r);
                let json_data = JSON.parse(r.responseText);
                if (r.status == 200 && json_data["code"] == 0) {
                  let infoList = json_data["data"]["InfoList"];
                  res(infoList);
                } else {
                  console.log(r);
                  res([]);
                }
              },
              onerror: (r) => {
                console.log(r);
                res([]);
              },
            });
          });
        },
        async recursiveAlgorithm(infoList) {
          // 异步递归算法
          let that = this;
          return Promise.all(
            Array.from(infoList).map(async (value, index) => {
              let fileType = value["Type"];
              console.log(fileType ? "文件夹" : "文件");
              if (fileType) {
                // 是文件夹
                let retList = await that.getFilesByRec(
                  that.shareCode,
                  that.accessCode,
                  value["FileId"]
                );
                await that.recursiveAlgorithm(retList);
              } else {
                // 是文件
                that.isEnd = true;
                let fileName = value["FileName"];
                let fileSize = Utils.formatByteToSize(value["Size"]);
                let fileDownloadUrl = value["DownloadUrl"];
                let content = "";
                if (fileDownloadUrl == "") {
                  let downloadInfo = await that.getFileDownloadInfo(
                    value["Etag"],
                    value["FileId"],
                    value["S3KeyFlag"],
                    that.shareCode,
                    value["Size"]
                  );
                  if (downloadInfo["code"] == 0) {
                    fileDownloadUrl = downloadInfo["data"]["DownloadURL"];
                    filterScheme.handleUrl(
                      "_123pan-static-scheme-enable",
                      "_123pan-static-scheme-forward",
                      fileDownloadUrl
                    );
                    content = `
										<div class="netdisk-static-body">
												<div class="netdisk-static-filename">
														<a href="${fileDownloadUrl}">${fileName}</a>
												</div>
												<div class="netdisk-static-filesize">${fileSize}</div>
										</div>`;
                  } else {
                    content = `
										<div class="netdisk-static-body">
												<div class="netdisk-static-filename">
														<a href="javascript:;">${fileName}</a>
												</div>
												<div class="netdisk-static-filesize">${fileSize}-单次获取下载链接失败</div>
										</div>`;
                  }
                } else {
                  fileDownloadUrl = filterScheme.handleUrl(
                    "_123pan-static-scheme-enable",
                    "_123pan-static-scheme-forward",
                    fileDownloadUrl
                  );
                  content = `
											<div class="netdisk-static-body">
													<div class="netdisk-static-filename">
															<a href="${fileDownloadUrl}">${fileName}</a>
													</div>
													<div class="netdisk-static-filesize">${fileSize}</div>
											</div>`;
                }
                that.panelLength = that.panelLength + 1;
                that.panelContent = that.panelContent + content;
              }
            })
          );
        },
        handleRecursiveAlgorithm() {},
        getFileDownloadInfo(Etag, FileID, S3keyFlag, ShareKey, Size) {
          /* 获取单文件下载链接 */
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: "http://www.123pan.com/a/api/share/download/info",
              method: "post",
              timeout: 5000,
              async: false,
              data: JSON.stringify({
                Etag: Etag,
                FileID: FileID,
                S3keyFlag: S3keyFlag,
                ShareKey: ShareKey,
                Size: Size,
              }),
              headers: {
                accept: "*/*",
                "user-agent":
                  "Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 Edg/91.0.864.59",
              },
              onload: (r) => {
                let res_data = JSON.parse(r.responseText);
                console.log(res_data);
                res(res_data);
              },
              onerror: () => {
                console.log(r);
                res({
                  code: -2,
                });
              },
            });
          });
        },
      },
      weiyun: {
        // 不行
        default(shareCode, accessCode) {
          // https://share.weiyun.com/webapp/json/weiyunQdiskClient/DiskUserInfoGet?refer=chrome_windows&g_tk=
          // 不做解析 微云QQ或微信登录的有效期很短
          console.log(shareCode, accessCode);
        },
      },
      xunlei: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      _115pan: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      chengtong1: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      chengtong2: {
        // 不行
        default(shareCode, accessCode) {
          console.log(shareCode, accessCode);
        },
      },
      kuake: {
        // 不行-需要转存到自己的网盘中fied才可以通过验证传递回下载地址，通过分享到是不会传回来的
        code: {
          14001: "非法token",
          21001: "文件不存在",
          15000: "inner error",
        },
        async default(shareCode, accessCode) {
          Qmsg.error("抱歉，夸克不支持直链获取", {
            html: true,
          });
          return;
          this.shareCode = shareCode;
          this.accessCode = accessCode;
          console.log(shareCode, accessCode);
          this.url = NetDisk.regular.kuake.blank.replace(
            /{#shareCode#}/g,
            shareCode
          );
          this.shareStoken = await this.getShareStoken(); // 分享的stoken
          console.log(`stoken: ${this.shareStoken}`);
          if (this.shareStoken != "") {
            let data_list = await this.getFolderInfo();
            if (data_list.length == 0) {
              Qmsg.error("获取失败", {
                html: true,
              });
            } else if (data_list.length == 1 && data_list[0]["file"]) {
              console.log("夸克单文件直链");
              await this.parseFileLink(data_list[0]);
            } else {
              console.log("夸克多文件直链");
              await this.parseMoreFileLink(data_list);
              console.log("全部解析完毕");
            }
          }
        },
        getShareStoken() {
          let that = this;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: "https://drive.quark.cn/1/clouddrive/share/sharepage/token?pr=ucpro&fr=h5",
              timeout: 5000,
              method: "POST",
              data: JSON.stringify({
                pwd_id: that.shareCode,
                passcode: that.accessCode,
              }),
              headers: {
                Accept: "application/json, text/plain, */*",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77",
                referer: "https://pan.quark.cn/",
                origin: "https://pan.quark.cn",
              },
              onload: (r) => {
                let json_data = JSON.parse(r.responseText);

                if (json_data["status"] == 200) {
                  res(json_data["data"]["stoken"]);
                } else {
                  console.log(json_data);
                  Qmsg.error(json_data["message"], {
                    html: true,
                  });
                  res("");
                }
              },
              onerror: () => {
                Qmsg.error("网络异常", {
                  html: true,
                });
                res("");
              },
            });
          });
        },
        getFolderInfo(pdir_fid) {
          let that = this;
          pdir_fid = pdir_fid == null ? "" : pdir_fid;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              url: `https://drive.quark.cn/1/clouddrive/share/sharepage/detail?pr=ucpro&fr=pc&pwd_id=${that.shareCode}&stoken=${that.shareStoken}&pdir_fid=${pdir_fid}&force=0&_page=1&_size=50&_fetch_banner=0&_fetch_share=0&_fetch_total=1&_sort=file_type:asc,updated_at:desc`,
              timeout: 5000,
              method: "GET",
              headers: {
                Accept: "application/json, text/plain, */*",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36 Edg/103.0.1264.77",
                referer: "https://pan.quark.cn/",
                origin: "https://pan.quark.cn",
              },
              onload: (r) => {
                let json_data = JSON.parse(r.responseText);
                console.log(json_data);
                if (that.code[json_data["code"]] != null) {
                  Qmsg.error(that.code[json_data["code"]], {
                    html: true,
                  });
                  res([]);
                } else if (json_data["status"] == 200) {
                  res(json_data["data"]["list"]);
                } else {
                  Qmsg.error(json_data["message"], {
                    html: true,
                  });
                  res([]);
                }
              },
              onerror: () => {
                Qmsg.error("网络异常", {
                  html: true,
                });
                res([]);
              },
            });
          });
        },
        getLink(fids) {
          let that = this;
          return new Promise((res) => {
            GM_xmlhttpRequest({
              method: "POST",
              url: "https://drive.quark.cn/1/clouddrive/file/download?pr=ucpro&fr=pc",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              data: JSON.stringify({
                fids: [fids],
              }),
              onload: function (r) {
                let json_data = JSON.parse(r.responseText);
                console.log(json_data);
                if (that.code[json_data["code"]] != null) {
                  Qmsg.error(that.code[json_data["code"]], {
                    html: true,
                  });
                  res([]);
                } else {
                  res(json_data);
                }
              },
              onerror: () => {
                Qmsg.error("网络异常", {
                  html: true,
                });
                res([]);
              },
            });
          });
        },
        async parseFileLink(_data_) {
          // 单文件
          let that = this;
          return new Promise(async (resolve) => {
            let downloadUrl = await that.getLink(_data_["fid"]);
            resolve(downloadUrl);
          });
        },
        async parseMoreFileLink(_data_) {
          // 多文件
          let that = this;
          return Promise.all(
            Array.from(_data_).map(async (item, index) => {
              if (item["file"]) {
                /* 是文件 */
                console.log("是文件");
                console.log(item);
                let fileInfo = await that.getLink(item["fid"]);
                console.log(fileInfo);
              } else {
                /* 是文件夹 */
                let folderInfo = await that.getFolderInfo(item["fid"]);
                if (folderInfo.length != 0) {
                  await that.parseMoreFileLink(folderInfo);
                }
              }
            })
          );

          console.log(files);
        },
      },
    },
    parse(netdiskName, shareCode, accessCode) {
      Qmsg.info("正在获取直链", {
        html: true,
      });
      NetDiskLinkParse.netdisk[netdiskName].default(shareCode, accessCode);
    },
    setClipboard(uiLink, tip) {
      // 复制到剪贴板
      GM_setClipboard(uiLink);
      tip = tip ? tip : "提取码已复制";
      Qmsg.success(tip, {
        html: true,
      });
    },
    blank(url, accessCode) {
      // 新标签页打开
      if (accessCode) {
        this.setClipboard(accessCode);
      }
      document
        .querySelector("meta[name='referrer']")
        ?.setAttribute(
          "content",
          "no-referrer"
        ); /* 百度网盘会拒绝referrer不安全访问 */
      window.open(url);
    },
    scheme(netdiskName, shareCode, accessCode) {
      let url = NetDisk.regular[netdiskName].blank.replace(
        /{#shareCode#}/gi,
        shareCode
      );
      url = filterScheme.handleUrl(
        `${netdiskName}-scheme-enable`,
        `${netdiskName}-scheme-forward`,
        url
      );
      window.open(url);
    },
  };

  const filterScheme = {
    // android scheme调用
    defaultScheme:
      "jumpwsv://go?package=idm.internet.download.manager.plus&activity=idm.internet.download.manager.UrlHandlerDownloader&intentAction=android.intent.action.VIEW&intentData={#intentData#}&intentExtra=",
    packageIDM: "idm.internet.download.manager.plus",
    activityIDM: "idm.internet.download.manager.UrlHandlerDownloader",
    defaultAction: "android.intent.action.VIEW",
    defaultExtra: "",
    handleUrl(enable_key, forward_key, url) {
      // 参数 是否启用的key和转发的scheme和需要转发的url
      if (!GM_getValue(enable_key)) {
        return url;
      }
      url = url.replace(/&/g, "{-and-}");
      url = url.replace(/#/g, "{-number-}");
      let thisScheme = GM_getValue(forward_key)
        ? GM_getValue(forward_key)
        : this.defaultScheme;
      thisScheme = thisScheme.replace("{#intentData#}", url);
      return thisScheme;
    },
  };

  const WorkerHandle = {
    blobUrl: "",
    insertDOMHandleTextMatch: () => {
      const handleMatch = `
			(()=>{
				this.addEventListener('message', function (e) {
					let data = e.data;
					let link_regexp = data["regexp"];
					let pageText = data["pageText"];
					let netdisk = data["netdiskName"];
					let matchLink = pageText.match(link_regexp);
					this.postMessage({
						"msg": matchLink ? "workercallback: 文本匹配完毕,当前文本匹配到网盘链接数量:"+matchLink.length.toString() : "workercallback: 文本匹配完毕,当前未匹配到",
						"netdisk": matchLink ? netdisk : "" ,
						"data": matchLink ? matchLink : []
					});
				}, false);

			})()`;
      var blob = new Blob([handleMatch]);
      WorkerHandle.blobUrl = window.URL.createObjectURL(blob);
      console.log("woker Blob:", WorkerHandle.blobUrl);
    },
    createWorkerObject: () => {
      window.GM_linkWorker = new Worker(WorkerHandle.blobUrl);

      window.GM_linkWorker.onmessage = function (e) {
        // e.data === 'some message'
        // console.log(e.data["msg"]);
        WorkerHandle.successCallBack(e.data["data"], e.data["netdisk"]);
      };
      window.GM_linkWorker.onerror = function (error) {
        WorkerHandle.errorCallBack(error);
      };
    },
    successCallBack: (matchLink, netdiskName) => {
      /* worker处理文件匹配后的回调 */
      if (!matchLink.length && UI.isHandling) {
        setTimeout(() => {
          UI.isHandling = false;
          /* 延迟赋值-防止页面子元素插入导致闪烁 */
        }, 800);
        return;
      }

      NetDisk.matchLink.add(netdiskName);
      let matchLinkSet = new Set(); // 匹配到的可能很多，使用集合去重
      matchLink.forEach((item) => {
        matchLinkSet.add(item);
      });
      Array.from(matchLinkSet).forEach((item) => {
        NetDisk.handleLink(netdiskName, item);
      });
      if (NetDisk.hasMatchLink) {
        UI.suspension.show();
      }
      setTimeout(() => {
        UI.isHandling = false;
      }, 800);
    },
    errorCallBack: (error) => {
      console.log("worker throw error: ", error);
    },
  };
  const UI = {
    matchIcon: new Set(),
    size: 50, // 高度和宽度
    opacity: 1, // 按钮透明度
    isCreatedUI: false, // 已创建链接界面
    isCreatedUISetting: false, // 已创建设置界面
    isHandling: false, // 是否在处理页面链接中标识
    uiLinkAlias: "链接层", // 链接层唯一标识
    uiSettingAlias: "设置层", // 设置层唯一标识

    uiLinkParseAlias: "单文件直链层", // 单文件直链层唯一标识
    uiLinkParseMoreAlias: "多文件直链层", // 多文件直链层唯一标识
    uiPasswordAlias: "重输密码层", // 重输密码层唯一标识
    bgInterval: null, // 定时事件id
    src: {
      icon: {
        baidu: `data:image/png;base64,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`,
        lanzou: `data:image/jpeg;base64,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`,
        tianyiyun: `data:image/png;base64,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`,
        hecaiyun: `data:image/png;base64,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`,
        aliyun: `data:image/webp;base64,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`,
        wenshushu: `data:image/webp;base64,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`,
        nainiu: `data:image/webp;base64,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`,
        _123pan: `data:image/x-icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAAMMOAADDDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPt8WAD7fFgC+3xYB/t8WBf7fFhQ+3xYkPt8WMD7fFji+3xY9Px9Wfr8fVn7+3xY+/x9Wfv7fFj7/H1Z+/t8WPv8fVn7/H1Z+/x9Wfv8fVn7/H1Z+/x9Wfv7fVn7+31Z+/t9Wfv7fVn7/H1Z+/x9Wfv8fVn7+3xY+/x9Wfv7fFj7/H1Z+/x9Wfv8fVn7/H1Z+/x9Wfv8fVn7/H1Z+/x9Wfr7fFj1+3xY5Pt8WMP7fFiU+3xYVPt8WBn7fFgI+3xYAvt8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAD7fFgF+3xYJft8WIL7fFjV/H1Z8ft9Wff8fVn6+31Z/ft9Wf78fVn//H1Z//x9Wf/8fVn//H1Z//t9Wf/8fVn/+31Z//x9Wf/8fVn//H1Z//t9Wf/7fVn/+31Y//t9Wf/7fVn/+31Z//x9WP/8fVn/+31Z//x9Wf/7fVn//H1Z//t9Wf/8fVn/+31Z//x9Wf/8fVn//H1Z//t9Wf/8fVn/+31Z/vt9Wf38fVn7/H1Z9/x9WfL7fFjZ+3xYift8WCr7fFgG+3xYAft8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAH7fFgQ+3xYc/t8WNn8fVn1/H1Z/fx9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z/fx9Wfb7fFjd+3xYfPt8WBP7fFgC+3xYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAL7fFgm+3xYrvt9We/7fVn9+31Z//t8Wf/7fFj/+3xY//t9Wf/7fVn/+31Z//t9Wf/7fFj/+3xY//t8Wf/7fVn/+31Z//t9Wf/7fFj/+3xY//t8Wf/7fVn/+31Z//t9Wf/7fVj/+3xY//t8WP/7fFj/+31Y//t9Wf/7fVn/+31Z//t8Wf/7fFj/+3xY//t9Wf/7fVn/+31Z//t8Wf/7fFj/+3xY//t9Wf/7fVn/+31Z//t9Wf/7fFj/+3xY//t8Wf/7fVn/+31Z/vt9WfD7fFi2+3xYLft8WAP7fFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAL7fFgx+3xYxvt9Wff7fFj/+3xY//t8WP/7fVn/+3xY//t8WP/7fVj/+31Z//t9Wf/7fVj/+3xY//t8WP/7fVn/+3xY//t8WP/7fFj/+31Z//t9WP/7fFj/+3xY//t8WP/7fVj/+31Y//t8WP/7fFj/+3xY//t9WP/7fFj/+3xY//t8WP/7fVj/+31Y//t9Wf/7fFj/+3xY//t8WP/7fVn/+3xY//t8WP/7fVj/+31Z//t9Wf/7fVj/+3xY//t8WP/7fVn/+3xY//t8WP/7fFj/+31Z+ft8WMz7fFg5+3xYA/t8WAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAH7fFgp+3xYxvx9WPn8fVj//H1Y//x9Wf/8fVj//H1Y//x9WP/8fVn//H1Y//x9WP/8fVj//H1Z//x9WP/8fVj//H1Y//x9Wf/8fVj//H1Y//x9WP/8fVn//H1Y//x9WP/8fVj//H1Z//x9WP/8fVj//H1Y//x9WP/8fVn//H1Y//x9WP/8fVj//H1Z//x9WP/8fVj//H1Y//x9Wf/8fVj//H1Y//x9WP/8fVn//H1Y//x9WP/8fVj//H1Z//x9WP/8fVj//H1Y//x9Wf/8fVj//H1Y//x9WP/8fVn7+3xYzft8WDH7fFgC+3xYAAAAAAAAAAAAAAAAAPt8WAH7fFgT+3xYtfx9Wfj7fVj//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//t9WP/8fVn//H1Z//t9Wf/8fVn//H1Z//x9Wf/8fVn/+31Y//x9Wf/8fVn//H1Z//x9Wf/7fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn/+31Z//x9Wf/7fVj//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//t9WP/8fVn//H1Z//t9Wf/8fVn//H1Z//x9Wf/8fVn/+31Y//x9Wf/8fVn//H1Z//x9Wfn7fFi++3xYGft8WAEAAAAAAAAAAPt8WAD7fFgG+3xYgfx9WfD8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z8/t8WI/7fFgG+3xYAAAAAAD7fFgC+3xYMft8WOD8fFn+/HxZ//x8Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fFn//HxZ//x8Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fFn//HxZ//x8Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fFn//HxZ//x8Wf77fFjk+3xYPPt8WAMAAAAA+3xYB/t8WJb7fFj3+3xY//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFj/+3xZ//t8WP/7fFn/+3xZ//t8Wf/7fFn/+3xY//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFj/+3xZ//t8WP/7fFn/+3xZ//t8Wf/7fFn/+3xY//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFj/+3xY+Pt8WKT7fFgI+3xYAft8WCL7fFjg/HxY/vx8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP77fFnm+3xYLft8WAX7fFhj/HxY8/x8Wf/7fFj/+3xY//x8Wf/7fFj/+3xZ//x8WP/8fFj/+3xZ//x8Wf/8fFj//HxZ//x8Wf/8fFn//HxZ//x8WP/8fFn/+3xZ//x8WP/8fFn/+3xZ//t8WP/8fFj//HxY//t8WP/8fFj//HxY//x8WP/8fFj//HxZ//x8WP/8fFj//HxY//x8WP/7fFj//HxY//x8Wf/7fFj/+3xZ//x8WP/8fFj/+3xZ//x8Wf/8fFj//HxZ//x8Wf/8fFn//HxZ//x8WP/8fFn/+3xZ//x8WP/8fFn/+3xZ//t8WP/8fFj/+3xY//t8WP/8fFn//HxY9Pt8WHL7fFgJ+3xYovt8Wfn8fFn//HxZ//t8Wf/8fFn/+3xY//x8Wf/8fVn/+3xY//x8Wf/8fFn//H1Z//x8Wf/7fFn/+3xZ//t8Wf/7fFn//HxZ//x8Wf/7fFj//HxZ//x8Wf/7fFj//H1Y//x8Wf/8fFn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fFn/+3xZ//x8Wf/8fFn/+3xZ//t8Wf/8fFn/+3xY//x8Wf/8fVn/+3xY//x8Wf/8fFn//H1Z//x8Wf/7fFn/+3xZ//t8Wf/7fFn//HxZ//x8Wf/7fFj//HxZ//x8Wf/7fFj//H1Z//x8Wf/8fFn//HxZ//x9Wfr7fFix+3xYDPt8WND7fVj9+31Z//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVn/+31Y//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Y//t9WP/7fVn/+31Z//t9Wf/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVn/+31Y//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9Wf/7fVn++3xY3Pt8WBn7fFjo/H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9WO37fFgm+3xY7/t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFjw+3xYLPx8WPD8fVn//H1Z//x9Wf/8fVj++3xZw/t8WK77fFit+3xYrft8WK37fFis/HxY2Px8WPr8fFj/+3xY3/t8WLb7fFis+3xYrft8WK37fFit+3xYrft8WK37fFit+3xYrft8WK37fFit+3xYrft8WK37fFit+3xYrft8WK37fFit+3xYrft8WKv7fFjC/HxY7/x9WP/8fFj//HxY5/t8WLb7fFis+3xYrft8WK37fFit+3xYrft8WK37fFit+3xYr/t8WLP7fFi8+3xYzPt8WOf7fFj//HxY//x8WP/8fVj//H1Y//x8WP/8fVj//H1Z//x9Wf/8fVn//HxY8ft8WCz7fVjw/H1Y//t9WP/7fVj//H1Y/Pt8WV77fFgn+3xYI/t8WCP7fFgj+3xYIvx9WZb8fVjx+31Y//t8WKn7fFg7+3xYIft8WCP7fFgj+3xYI/t8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Wf/7fVn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+31Z//t9Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFnk+3xYXvt8WAAAAAAAAAAAAPt8WAD7fFgD+3xYOft8Wfv7fFn/+3xZ//t8Wf/7fFnx+3xYLPx8WfD8fFn//HxZ//x8Wf/8fVn7+3xZRPt8WQX7fFkAAAAAAAAAAAD8fFkA/HxZhfx9We/8fFn/+3xYoft8WB77fFgAAAAAAAAAAAD7fFgA+3xYSft8WdP8fFn//HxZ//x9Wf/8fVn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fVn//H1Z//x8Wf/8fFn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fFn//HxZ//x8Wf/8fFn//H1Z6vt8WHX7fFgAAAAAAAAAAAD7fFgA+3xYBft8WEL8fVn7/HxZ//x8Wf/8fFn//HxZ8ft8WCz7fFjw+3xY//t8WP/7fFj/+3xY+/t8WUT7fFkF+3xZAAAAAAAAAAAA/H1YAPx9WIX8fFjv+3xY//t8WLD7fFgj+3xYAAAAAAAAAAAA+3xYAPt8WCf7fFjB+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WOD7fFhL+3xYAAAAAAAAAAAA+3xYAPt8WAn7fFhi+3xY/Pt8WP/7fFj/+3xY//t8WPH7fFgs+3xY8Pt8Wf/7fFn/+3xY//t8WPv7fFlE+3xZBft8WQAAAAAAAAAAAPx9WQD8fVmF+3xZ7/t8Wf/7fFjM+3xYLPt8WAAAAAAAAAAAAPt8WAD7fFgF+3xYd/t8WOf7fFj/+3xZ//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFj/+3xY//t8Wf/7fFj/+3xY//t8WP/7fFn/+3xZ//t8WP/7fFj/+3xY//t8WP/7fFn/+3xZ//t8WP/7fFj/+3xY//t8WOn7fFiG+3xYEft8WAAAAAAAAAAAAPt8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WO/7fFj/+3xY//t8WP/7fFj/+3xY8ft8WCz8fVjw/H1Y//x9WP/8fVj//H1Y+/t8WET7fFkF+3xZAAAAAAAAAAAA/H1ZAPx9WYX8fVnv/H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/7fVj2+3xYkft8WB37fFgAAAAAAAAAAAD7fFgA+ntXAvt8WHn7fFj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//t9WP/7fFj6+3xY0/t8WHT7fFgM+3xYAAAAAAAAAAAA+3xYAPt8WBb7fFi1/HxY/fx9WP/8fVj//H1Y//x9WPH7fFgs+31Z8Pt9Wf/7fVn/+31Z//t9Wfv7fFlE+3xYBft8WAAAAAAAAAAAAPx9WQD8fVmF+31Z7/t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wdn7fFhO+3xYAAAAAAAAAAAA+XpWAPt8WAD7fFhp+3xY//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fFjd+3xYQPt8WAAAAAAAAAAAAPt8WAD7fFgL+3xYcPt9Wfz7fVn/+31Z//t9Wf/7fVnx+3xYLPx9WfD8fVj//H1Z//x9Wf/8fVn7+3xZRPt8WQX7fFkAAAAAAAAAAAD7fFgA+3xYhfx9WO/8fVn//H1Z//x9Wf/8fVn//H1Z//x9WP/8fVj//H1Z//x9Wf/8fVn//H1Y//x9Wf/8fVn//H1Z//x9Wf/8fVno+3xYXPt8WAAAAAAAAAAAAAAAAAD7fFgA+3xYZPt8WPr8fVn//H1Z//x9WP/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Y6Pt8WGz7fFgAAAAAAAAAAAD7fFgA+3xYBvt8WEv8fVn7/H1Z//x9Wf/8fVj//H1Z8ft8WCz8fVnw/H1Z//x9Wf/8fVn//H1Z+/t8WET7fFgF+3xYAAAAAAAAAAAA/HxZAPx8WYX8fVnv/H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9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WDP7fFg/+3xYY/t8WK77fFjv+3xY//t8WP/7fFj/+3xY//t8WP/7fFjA+3xYQfx9WSf8fVkp/H1ZKfx9WSn8fVkp/H1ZKfx9WSn8fVkp/H1YKft8WCv7fFgv+3xYN/t8WFL7fFiV+3xY6vt8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFjx+3xYK/x8WPD8fFj//HxY//x8WP/8fFj++3xZy/x9Wbn8fVm4/H1ZuPx9Wbj8fVm4/H1Z3fx8WPr8fFj//HxY+/x8WMj8fVm3/H1ZuPx9Wbj8fVm4/H1ZuPx9Wbj8fVm4/H1ZuPx9Wbj8fVi4+3xYuft8WMD7fFjS+3xY7fx8WP78fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY6vx8WMD8fVm3/H1ZuPx9Wbj8fVm4/H1ZuPx9Wbj8fVm4/H1YuPx9WLn7fFi++3xYx/t8WNz7fFj7/HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY8ft8WCX8fFnu/HxY//x8WP/8fFj//HxY//x8Wf/8fFj//HxY//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj/+3xY//t8WP/8fFn//HxZ//x8Wf/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxZ//x8Wf/8fFj//HxY//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj//H1Z//x8WP/8fFj/+3xY//x8WP/8fFn//HxY//x8Wf/8fFj//HxY//x8WfD7fFgX+3xY5ft9WP77fVj/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVj/+31Z//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Z//t9WP/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9WP/7fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Z//t9WP/7fVn/+31Y//t9Wf/7fVj/+31Z//t9Wf/7fVn/+31Y//t9WP/7fVjr+3xYDPt8WM38fVn8/H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn9+3xY2vt8WAn7fFie+3xY+Pt8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t9WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t9WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY//t8WP/7fFj/+3xY+vt8WK37fFgF+3xYXvt9WPL7fVj/+3xY//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fFj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+3xY//t9WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t8WP/7fVj/+31Y//t9WP/7fVj/+31Y//t8WP/7fFj/+31Y//t9WPT7fFhs+3xYAft8WB77fFjd/H1Y/vx9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fFj//H1Y//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fFj//H1Y//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP/8fVj//H1Y//x9WP77fFjj+3xYKQAAAAD7fFgH+3xYkPt9Wfb7fVj//H1Y//t9WP/7fVj/+31Z//t9WP/7fVj/+31Y//x9Wf/7fVj/+31Z//t9WP/7fVj/+31Z//t9WP/8fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj//H1Y//t9WP/7fVn/+31Z//t9Wf/7fVn/+31Y//t9Wf/7fVn/+31Z//t9Wf/7fVj//H1Y//t9WP/7fVj/+31Z//t9WP/7fVj/+31Y//x9Wf/7fVj/+31Z//t9WP/7fVj/+31Z//t9WP/8fVn/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj//H1Y//t9WP/7fVn4+3xYnvt8WAcAAAAA+3xYAvt8WCv7fFjc+31Z/ft9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn++3xY4vt8WDb7fFgCAAAAAPt8WAD7fFgF+3xYefx9We78fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z//x9Wf/8fVn//H1Z8ft8WIb7fFgG+3xYAAAAAAAAAAAA+3xYAPt8WBD7fFiu+31Z9vt9Wf/7fVn/+31Z//t9Wf/7fVn/+3xZ//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+3xZ//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t8Wf/7fVn/+3xZ//t8Wf/7fVn/+31Z//t9Wf/7fFn/+3xZ//t9Wf/7fFn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+3xZ//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z//t9Wf/7fVn/+3xZ//t9Wf/7fVn/+31Z//t9Wf/7fVn/+31Z+Pt8WLf7fFgV+3xYAQAAAAAAAAAAAAAAAPt8WAD7fFgB+3xYI/t8WMD8fFj4/HxY//x8Wf/8fFj//HxZ//x8WP/8fFj//HxY//x8WP/8fFn//HxZ//x8WP/8fFj//HxY//x8WP/8fFn//HxY//x8Wf/8fFj//HxY//x8WP/8fFj//HxY//x8Wf/8fFj//HxY//x8WP/8fFj//HxY//x8Wf/8fFn//HxY//x8WP/8fFj//HxY//x8Wf/8fFj//HxZ//x8WP/8fFj//HxY//x8WP/8fFn//HxZ//x8WP/8fFj//HxY//x8WP/8fFn//HxY//x8Wf/8fFj//HxY+vt8WMj7fFgr+3xYAvt8WAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAL7fFgr+3xYvvx8WPX8fFn+/HxY//x8WP/8fFj//HxY//x8WP/8fFn//HxZ//x8Wf/8fFn//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY//x8WP/8fFn//HxY//x8WP/8fFj//HxY//x8WP/8fFn//HxZ//x8Wf/8fFn//HxY//x8WP/8fFj//HxY//x8WP/8fFj//HxY9/t8WMT7fFgx+3xYAvt8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7fFgA+3xYAvt8WCD7fFil+3xZ6/t8Wf37fFn/+3xZ//t8Wf/7fFn/+31Z//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+31Z//t8Wf/7fFn/+3xZ//t8Wf/7fFn/+3xZ//t8Wf/7fFn9+3xZ7ft8WK77fFgm+3xYAvt8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPt8WAD7fFgB+3xYC/t8WGf7fFjT+31Y8/t9WPz7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+3xY//t9WP/7fFj/+31Y//t8WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t8WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+31Y//t9WP/7fVj/+3xY//t9WP37fFj0+3xY1vt8WHD7fFgO+3xYAft8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+nxYAPp8WAD7fFgE+3xYHft8WHb7fFjM/H1Z7fx9WfX8fVn5/H1Z/Px9Wf38fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/vx9Wf78fVn+/H1Z/fx9Wfz8fVn5/H1Z9vx9We77fFjR+3xYfPt8WCH7fFgF+3xYAPt8WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+3xYAPt8WAH7fFgF+3xYD/t8WED7fFh7+3xYqPt8WMf7fFjZ/H1Z3/x9WeD8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/x9Wd/8fVnf/H1Z3/t8WNv7fFjK+3xYrPt8WH77fFhF+3xYEvt8WAb7fFgB+3xYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+ntXAPp7VwD7fFgD+3xYB/t8WAr7fFgM+3xYDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ38fVkN/H1ZDfx9WQ37fFgN+3xYDPt8WAr7fFgH+3xYBPt8WAH7fFgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAAAAAH/8AAAAAAAAH/gAAAAAAAAP8AAAAAAAAAfgAAAAAAAAA8AAAAAAAAABwAAAAAAAAAGAAAAAAAAAAIAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPB//+B/+AAA8H//4H/+AADwf//gf/8AAPB4AAAAH4AA8HgAAAAPgADweAAAAAeAAPB4AAAAB4AA8HgAAAAHgADweAAAAAeAAPB4AAAAB4AA8HwAAAAPAADwPgAAAD4AAPA//wAf/AAA8B//gB/8AADwB//AH/wAAPAAB+AAPgAA8AAD4AAPAADwAAHgAAeAAPAAAfAAB4AA8AAB8AAHgADwAAHwAAeAAPAAAeAAB4AA8AAD4AAPgADwAA/gAB8AAPB//8B//wAA8H//gH/+AADwf/4Af/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAgAAAAAAAAACAAAAAAAAAAMAAAAAAAAABwAAAAAAAAAHgAAAAAAAAA/AAAAAAAAAH+AAAAAAAAA/8AAAAAAAAH/8AAAAAAAB//+AAAAAAA/8=`,
        weiyun: `data:image/jpeg;base64,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`,
        xunlei: `data:image/png;base64,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`,
        _115pan: `data:image/png;base64,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`,
        chengtong1: `data:image/x-icon;base64,AAABAAEAgIAAAAEAIAAoCAEAFgAAACgAAACAAAAAAAEAAAEAIAAAAAAAAAABAKQBAACkAQAAAAAAAAAAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/P//8+z//+zf///l0///49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//5dP//+zf///z7P///fz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n1///jz///zqz//7uM//+lZ///lk///4k4//+FMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Uy//+JOP//lk///6Vn//+7jP//zqz//+PP///59f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hn///Jo///qWv//44+//97Hf//cQz//3IO//9yD///cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9yD///cg7//3EM//97Hf//jj7//6lr///Jo///8ef//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///Lp///EmP//mEv//4Ai//90Dv//dA7//3YR//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3YR//90Dv//dA7//4Ai//+YS///xJj///Lp///+/f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n1///Us///lkf//38e//93Ef//dxH//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///dxH//3cR//9/Hv//lUX//8+r///59P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///s3f//snb//4Mj//96Ev//ehL//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oS//96Ev//gR///69w///r2////fz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+///3cL//59S//98Ff//exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///fBX//5tN///Zu////Pr//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fz//9Kt//+TPP//exH//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fBH//5E3///RrP///fz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+///Rqv//kDL//34S//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fhL//5Ay///Rqv///v3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1rT//5I1//+AE///gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EU//+AFP//gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gRT//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gBT//4AT//+AE///gBP//4AT//+AE///gBT//4EU//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gBP//5Ez///Trf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+XO//+cRf//gRL//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4ET//+AEP//gxf//4sl//+NKf//kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5M0//+JIv//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFP//gBH//4IU//+HH///jCj//5Au//+SNP//kjP//44s//+LJf//gxf//4AQ//+BEv//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//gRL//5tD///kzf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////y5///r2b//4UV//+EFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4MT//+DE///kjD//6RS//+4ef//z6X//9ez///o0///6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///q1v//3b///6FM//+EFP//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+EFP//ghH//4sh//+eRv//sm3//8WR///Urv//4MP//+nV///o0///27r//9Cm//+4ef//pFL//5Qz//+EFP//gxP//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//gxL//6tf///x5f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pn//8qZ//+KHv//hhX//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+FE///lTL//7p6///auf//9u3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v4///Hkv//jCL//4YV//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhT//4wh//+tYv//z6L//+zb///9/P/////////////////////////////////////////////27f//3b7//7t8//+YOP//hRP//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//iBr//8OM///69v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mz///lzP//4gV//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFf//jB7//7Jp///fwP//+/j////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/f//27f//5Yx//+HE///iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4kX//+fQv//0qj///Pn/////////////////////////////////////////////////////////////////////////Pn//+HF//+yaf//jB7//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFf//lTD//+bO////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/b//7t3//+KFv//ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KF///iRb//5Mp///Gjf//9ev//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/g//+kSv//iRX//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oW//+LGf//tGv//+nT///+/f////////////////////////////////////////////////////////////////////////////////////////Xr///Ikv//lS3//4kV//+KF///ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KFv//s2j///n0///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n0P//lSv//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sW//+XL///0aP///z5///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////69P//vnz//40a//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+LFv//kCD//79+///06P////////////////////////////////////////////////////////////////////////////////////////////////////////36///RpP//mDH//4sW//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+TJ///48f////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fv//7pz//+PG///jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//lSf//82a///9/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//9u2//+UJf//jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//jRf//5Ad///Bgf//+PD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////78///Qof//lSj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//48b//+6c////fz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///nzn//44W//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jxj//5AZ///Aff//+vT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z5v//rFP//5AZ//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jxj//48Y//+QGv//uW7///Xq//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////r0///Aff//kBn//48Y//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jhb//583///t2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9Sl//+YJ///kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+QF///qk3//+/e/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7//8eL//+UH///kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+RGP//kRn//6xR///v3v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/e//+qTf//kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+QF///liT//8+b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////um3//5IX//+SGf//kxn//5MZ//+TGf//kxn//5MZ//+TGf//khj//5Uf///Xqv///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////p0f//pkL//5EV//+TGf//kxn//5MZ//+TGf//kxn//5MZ//+TGf//kxn//5IY//+hN///4sH///7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3//9eq//+VH///khj//5MZ//+TGf//kxn//5MZ//+TGf//kxn//5IZ//+RFv//t2f///78//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pl//+tTv//kxX//5UZ//+VGf//lRn//5UZ//+VGf//lRn//5UZ//+TFv//sVf///Hi////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/b//8SA//+VGv//lBf//5QX//+UF///lBf//5QX//+UF///lBf//5QX//+UF///lx3//9Gb///9+v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8eL//7FX//+TFv//lRn//5UZ//+VGf//lRn//5UZ//+VGf//lRn//5MV//+rSv//8N7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////48H//6Q4//+VF///lhr//5Ya//+WGv//lhr//5Ya//+WGv//lhr//5UY///Ok////v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////pz///r0///58u//+gMP//oDD//6Aw//+gMP//oDD//6Aw//+gMP//oDD//58t//+9cP//9Oj////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v//zpP//5UY//+WGv//lhr//5Ya//+WGv//lhr//5Ya//+WGv//lRf//6Q3///hv//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Zq///oCv//5gY//+YGv//mBr//5ga//+YGv//mBr//5ga//+XGP//ozL//+G9//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pk///dtP//3rb//962///etv//3rb//962///etv//3rb//962///etv//3bT///Hg///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////hvf//ozH//5cY//+YGv//mBr//5ga//+YGv//mBr//5ga//+YGf//nSX//9aj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9CV//+bHf//mhr//5ob//+aG///mhv//5ob//+aG///mhv//5gX//+zUv//8N3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hg//+0Vf//mBb//5ob//+aG///mhv//5ob//+aG///mhv//5oa//+aGv//z5H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yob//5gT//+cG///nBv//5wb//+cG///nBv//5wb//+cG///mhb//7pg///26///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+fH//71n//+ZFv//nBv//5wb//+cG///nBv//5wb//+cG///nBv//5kU///Khv/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Mh///mxT//54b//+eG///nhv//54b//+eG///nhv//54b//+bFf//xXb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xXj//5sV//+eG///nhv//54b//+eG///nhv//54b//+eG///mxT//8yH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8yH//+cFf//nxz//58c//+fHP//nxz//58c//+fHP//nxz//5wV///He//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////He///nBX//58c//+fHP//nxz//58c//+fHP//nxz//58c//+cFf//zIf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zYf//54V//+hHP//oRz//6Ec//+hHP//oRz//6Ec//+hHP//nhb//8Z1/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8d4//+eFv//oRz//6Ec//+hHP//oRz//6Ec//+hHP//oRz//54V///Nh//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Oh///oBX//6Mc//+jHP//oxz//6Mc//+jHP//oxz//6Mc//+hF///wWb///nv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////68///wmn//6EX//+jHP//oxz//6Mc//+jHP//oxz//6Mc//+jHP//oBX//86H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9WW//+mH///pBz//6Ud//+lHf//pR3//6Ud//+lHf//pR3//6MZ//+6Uv//8dz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hb//+6Uv//oxn//6Ud//+lHf//pR3//6Ud//+lHf//pR3//6Ud//+kHP//05H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3af//6wq//+mHP//px3//6cd//+nHf//px3//6cd//+nHf//phv//7A0///lvf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fv//96p///Jdf//y3j//8t4///LeP//y3j//8t4///LeP//y3j//8t4///Kdv//3KX///rz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////58H//7E4//+mG///px3//6cd//+nHf//px3//6cd//+nHf//phz//6sp///cpf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oxf//tD7//6cb//+oHv//qB7//6ge//+oHv//qB7//6ge//+oHv//pxr//9eV///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ow///tUD//6kf//+pIf//qSH//6kh//+pIf//qSH//6kh//+pIf//qSH//6oh///Znf///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Xl///pxv//6ge//+oHv//qB7//6ge//+oHv//qB7//6ge//+nG///tD7//+nF//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Xk//+9Uf//qRr//6oe//+qHv//qh7//6oe//+qHv//qh7//6oe//+pG///wFj///Th////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Ov//8hu//+pG///qh7//6oe//+qHv//qh7//6oe//+qHv//qh7//6oe//+oGv//vE7///DY////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eT//8Je//+pG///qh7//6oe//+qHv//qh7//6oe//+qHv//qh7//6ka//+9Uf//9eT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lt//+rHP//rB7//6we//+sHv//rB7//6we//+sHv//rB7//6we//+uJf//4Kz///79//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78///gqv//sCr//6we//+sHv//rB7//6we//+sHv//rB7//6we//+sHv//rB7//64j///Xkv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///grP//riX//6we//+sHv//rB7//6we//+sHv//rB7//6we//+sHv//qxz//8lt////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3aP//7Is//+tHv//rh///64f//+uH///rh///64f//+uH///rh///60e//+/Tv//893/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7s///7tD//+tHv//rh///64f//+uH///rh///64f//+uH///rh///64f//+sG///vkz///Lb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eT//79O//+tHv//rh///64f//+uH///rh///64f//+uH///rh///60e//+yLP//3aP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z3v//u0D//64d//+vH///rx///68f//+vH///rx///68f//+vH///rx///7Ai///Qev///Pb///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pd///EWv//rh7//68f//+vH///rx///68f//+vH///rx///68f//+vH///rx7//7Ip///al/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z2///Rfv//sCL//68f//+vH///rx///68f//+vH///rx///68f//+vH///rh3//7tA///z3v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77///Re///siP//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xIP//sR///7Us///Zk////Pb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////47P//znP//7Ij//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xH///w1T///jq///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+v//3Zz//7Yt//+xH///sSD//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+yI///0Xv///77//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//+3L//+6NP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//sx///7gv///alP//+/T/////////////////////////////////////////////////////////////////////////////////////////////////////////////9+b//9F2//+1Jv//sx///7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7kx///nuv////7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/P//+Ot//+8Ov//sx7//7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7o0///ty/////7//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pb//9J3//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tB///7ox///ZjP//+Or//////////////////////////////////////////////////////////////////////////////////////////////vv//+7M///MZ///tiT//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1I///1YD///z3//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ns///aj///ujH//7Qf//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//0nf///z2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////787//8FA//+2IP//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//tiD//7gm///Oav//68D///35//////////////////////////////////////////////////////////////////////////////fm///gn///xEn//7Yh//+2If//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//th///8dT///03v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////35///rwP//z23//7oq//+2IP//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//tiD//787///uzP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+v//35v//7kl//+4If//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCH//7gh///CPv//0nP//+m7///78////v3////+/////v////7////+/////v////7////+///+/f///fr///Tb///gnP//y1v//7wt//+4H///uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gg///AOf//6Lf///79//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7////+/////v///v3///vz///swf//03X//8I+//+4If//uCH//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gh//+5Jf//3pf///35///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////56v//0m///7kg//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7kg//+6Iv//wDb//8hQ///Xf///46T//+zC///txf//7cX//+3F///txP//5Kn//9uK///NXf//wz///70t//+5IP//uiH//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6If//vCn//92T///9+P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///z0///67v//+u////PW///txP//7cT//+Ws///Zg///ylX//8E3//+6I///uSD//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uSD//9Bp///35//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x0f//y1P//7wh//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8If//vCH//70m//+/Kv//wC7//8Au///ALv//wC7//8Au//+/K///vif//7wi//+7IP//vCH//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCH//70k///WeP//+e3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////vw///pt///0WX//8I0///BM///wDD//8Au///ALv//vyv//70m//+8If//uyH//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wh///JTv//78z////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////twv//x0L//70h//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//70j//+9Iv//0Wb///Xf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////78f//3Yr//8Ev//++I///vSP//70j//+9I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//+9If//xj///+q5///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////nrP//xz7//78i//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyL//9Jk///02v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+ap///DL///vyH//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyL//8Y6///nq////vz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///svP//zU3//8Ej///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wSP//8Mo///Wb///9dv////+///////////////////////////////////////////////////////////////////////////////////////////////////////////////////56v//1Wr//8Ae///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ej///NTP//6bH///78//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///xy///0lv//8Ml///DI///wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mj///HNP//3oj///jm//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LQ///LQ///wiL//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mj///DJf//0lv///HL///+/f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+///34f//3YD//8o2///EIv//xSP//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Qi///FJv//z0r//+ip///89P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8s3//8xA///EIv//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uj///EIv//yjb//92A///34f////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////99v//67T//9Ve///KM///xSH//8Yk///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yi///GIv//zT7//9x7///12v///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////34P//1Vz//8Uh///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xyX//8Yk///FIf//yS3//9Vd///rtP///fb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+u3//+mn///YY///zDL//8gi///II///yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCT//8ch///IJP//0ET//915///vvv///vr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////76///kk///ySn//8gk///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gj///HIP//yy///9hk///mnP//+uv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////no///ss///4ID//9RP///MLP//yiT//8ol///KJf//yiX//8om///KJv//yib//8om///KJf//yiX//8ol///KJf//yiT//8ok///RQP//3G///+ac///yyv///fX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jh///aaP//yib//8ol///KJv//yib//8om///KJv//yib//8ol///KJf//yiX//8ok///KJv//1E7//99+///ssP//+ej////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////88v//9tv///DC///ml///33n//9lc///USf//zjD//80t///NLf//zS3//881///VTv//2Fn//951///lkf//7rr///XU///66/////7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jh///mlv//1Ev//84u///NLf//zS3//80t///OMP//1En//9hZ///edf//5pf///DA///22////PL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7///75///88v//+uv///nn///44f//+OD///jg///44P//+OL///ro///66v///PH///33/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////33///55///+OD///jg///44P//+OD///jh///55///+ur///zx///++f////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fX/+/jX//z64v/+/O////77///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//799f/9++v//vzt/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////377P/w53b/8uh9//Trjv/176H/9vCq//fytP/487//+PS///j0v//38bL//Prj/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77//n0vf/587n/+vXG//r2yP/69sn/+vTD//nzuP/48bP/9++m//btmv/69L7///77/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v30//DmdP/u4lf/7uFW/+7hVf/u4Vb/7uNd/+/kZP/v5GX/7+Rm/+7iX//38bL///78///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9++r/9Oh8//Pncf/z6Hr/9Oh8//TofP/z6Hn/8+Zy//Pmcv/z5nT/9Oh2//r0wP////z////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vf/8+uR/+7iWv/u4ln/7uJa/+7iWv/u4lr/7uJa/+7iW//u4lv/7uJd//LphP/+/vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v2zf/06Hv/8+dy//Pnc//z53P/8+d0//PndP/z53X/8+d2//Pnd//06Hn//PjT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//28a7/7uJa/+7iWf/u4lr/7uJa/+7iW//u4lv/7uJc/+7iXP/u4lz/7+Rp//v41f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+PGt//Pndf/z53P/8+dz//PndP/z53X/8+d1//Pndf/z53b/8+d2//Tpgv/9++j///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////r30f/u4l7/7uJZ/+7iWv/u4lr/7uJb/+7iW//u4lv/7uJc/+7iXf/u4mD/9e6f///+/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////388P/064z/8+dw//Pnc//z53P/8+d0//PndP/z53X/8+d1//Pndv/z53X/9u2b//788f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fvq//HneP/u4lj/7uJa/+7iWv/u4lr/7uJb/+7iW//u4lz/7uJc/+7iW//w5nL/+/jb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vXF//Poev/z53H/8+dz//Pnc//z53T/8+d0//Pndf/z53X/8+d1//PndP/587n///76///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vj/9u+n/+3hV//u4ln/7uJa/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXv/17p7//v75//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////798v/27Zv/8uZw//Lmcv/z53P/8+dz//PndP/z53T/8+d1//Pndf/z53X/8+h8//v41v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////69s3/7uNg/+7iWP/u4lr/7uJa/+7iWv/u4lv/7uJc/+7iXP/u4l3/7uJb//Dlb//6987/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vXG//Pnef/y5nH/8uZy//Pncv/z53P/8+dz//PndP/z53T/8+d1//Pnc//27Zn//fvr//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////376//z6on/7uJW/+7iWv/u4lr/7uJa/+7iW//u4lz/7uJc/+7iXP/u4l3/7uJc//Tri//9++j///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////365f/164//8uZv//Lmcf/y5nL/8+dy//Pnc//z53P/8+d0//PndP/z53X/8+d0//nzuv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jzuf/v41//7uJZ/+7iWv/u4lr/7uJb/+7iXP/u4lz/7uJc/+7iXf/u4l3/7+Ne//bwpv/+/vf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fb/9/Cp//Lmb//y5nH/8uZx//Lmcv/z53L/8+dy//Pnc//z53T/8+d0//Pnc//164v//Prf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fvp//Lpg//u4lf/7uJa/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXf/v4l7/8ORn//jyt////vv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77//n0vv/y53T/8uZw//Lmcf/y5nH/8uZy//Lmcv/z53L/8+dz//Pnc//z53T/8+d2//jxsP////3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/K2/+/jYv/u4ln/7uJa/+7iWv/u4lv/7uJc/+7iXP/u4l3/7uJd/+/jXv/v417/8OVq//jyt////vv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//59L7/8+h6//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZy//Pncv/z53P/8+dz//Pncv/16of//Pri///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fL/8+qG/+7iWf/u4lr/7uJa/+7iW//u4lz/7uJc/+7iXP/u4l3/7uJe/+/jXv/v413/8OVr//fxsf/+/fL////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vf/+fO7//Poef/y5m7/8uZv//LmcP/y5nD/8uZx//Lmcf/y5nL/8+dy//Pnc//z53P/8+h4//nzuP////3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////699H/8OVp/+7iWf/u4lr/7uJb/+7iW//u4lz/7uJc/+7iXf/u4l3/7+Ne/+/jXv/v417/8ORm//Xunf/9++f////+//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//fzs//fwqv/z53T/8uZt//Lmb//y5m//8uZw//LmcP/y5nH/8uZx//Lmcv/y5nL/8+dz//Pnc//17JL//fzu///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//28a3/7uNf/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXf/v417/7+Ne/+/jX//v41//7+Nh//Lpgv/69sr//v3y/////////////////////////////////////////////////////////////////////////////////////////////////////////////v30//r20P/065H/8uZu//Lmbf/y5m7/8uZu//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZx//Lmcv/z53L/9OmA//v41v////7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////387v/z647/7uJa/+7iW//u4lv/7uJc/+7iXP/u4lz/7uJd/+7iXv/v417/7+Nf/+/jX//v41//7+Ng//DkaP/17Zv/+vfS//798v///////////////////////////////////////////////////////////////////////////////////////v3z//v41f/376X/8uZz//HlbP/x5W3/8uZt//Lmbv/y5m7/8uZv//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZx//Pod//59L3///76//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z53f/y6H3/7uJY/+7iW//u4lv/7uJc/+7iXP/u4l3/7uJe/+/jXv/v417/7+Nf/+/jX//v42D/7+Ng/+/jX//w5W//9OyW//jzuv/7+dz//v31///////////////////////////////////////////////////////+/vb//Pne//n0vv/27pv/8ud4//Hlav/x5Wz/8eVs//Hlbf/y5m3/8uZu//Lmbv/y5m//8uZv//LmcP/y5nD/8uZx//Lmcf/y53X/9/Cp//798//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+//v30v/x53f/7uJZ/+7iW//u4lz/7uJc/+7iXf/u4l3/7+Ne/+/jXv/v41//7+Nf/+/jYP/v42D/7+Nh/+/jYP/v4l7/8ORn//LofP/0647/9u+l//nzvf/59cn/+/jb//z65P/8+uH/+vfT//n1yv/487r/9u+h//Xskv/z6YL/8eZu//HkZv/x5Wr/8eVr//HlbP/x5Wz/8eVt//Lmbf/y5m7/8uZu//Lmb//y5m//8uZw//LmcP/y5nH/8uZx//btmf/9++v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//r30P/x53b/7uJa/+7iXP/u4lz/7uJd/+7iXf/v417/7+Ne/+/jXv/v41//7+Ng/+/jYP/v42H/7+Nh/+/jYf/v42H/7+Nh//DjYP/w5GX/8eVs//Hmcf/y53f/8uh6//Lnev/x53b/8eZz//Hlb//x5Wf/8eVl//HlZ//x5Wn/8eVq//Hlav/x5Wv/8eVr//HlbP/x5Wz/8uZt//Lmbv/y5m7/8uZu//Lmb//y5nD/8uZw//LmcP/27JT//frl///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//r30P/x53b/7uJb/+7iXP/u4l3/7uJd/+7iXv/v417/7+Ne/+/jX//v42D/7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42P/8ORj//DkY//w5GP/8ORk//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORn//HlaP/x5Wj/8eVp//Hlaf/x5Wr/8eVq//Hla//x5Wv/8eVs//HlbP/x5W3/8uZt//Lmbv/y5m7/8uZv//Lmb//y5nL/9eyV//365v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//v30v/y6YT/7uJb/+7iXP/u4l3/7uJe/+/jXv/v417/7+Nf/+/jX//v42D/7+Ng/+/jYf/v42H/7+Ni/+/jYv/v42P/8ORj//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORm//DkZ//w5Gf/8ORo//HlaP/x5Wn/8eVp//Hlav/x5Wr/8eVr//Hla//x5Wz/8eVs//Hlbf/y5m3/8uZu//Lmbv/y5m3/8+d1//fvpP/9/Oz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z64//07Jb/7+Nj/+7iW//u4l3/7+Ne/+/jXv/v41//7+Nf/+/jYP/v42D/7+Nh/+/jYf/v42L/7+Ni/+/jY//w5GP/8ORk//DkZP/w5GX/8ORl//DkZv/w5Gb/8ORn//DkZ//w5Gj/8eVo//HlaP/x5Wn/8eVq//Hlav/x5Wr/8eVr//HlbP/x5Wz/8eVt//Lmbf/y5m7/8uZr//Ppff/587j//v3z//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////798v/38rT/8OZx/+7iXf/u4l7/7+Ne/+/jXv/v41//7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42L/7+Nj//DkY//w5GP/8ORk//DkZf/w5GX/8ORl//DkZv/w5Gb/8ORn//DkaP/w5Gj/8eVo//Hlaf/x5Wr/8eVq//Hlav/x5Wv/8eVr//HlbP/x5Wz/8eVt//Lmb//17JD/+/fR//7++f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7++P/7+Nj/9O2Y/+/kZv/v417/7+Ne/+/jX//v41//7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42L/7+Nj//DkY//w5GT/8ORl//DkZf/w5GX/8ORm//DkZv/w5Gf/8ORn//DkaP/x5Wj/8eVp//Hlav/x5Wr/8eVq//Hla//x5Wv/8eVr//Hlbv/z6Hz/+PK1//387P////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fX/+fXI//PqiP/w5Wr/7+Nf/+/jXf/v41//7+Ng/+/jYf/v42H/7+Ni/+/jYv/v42P/8ORj//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORm//DkZ//w5Gf/8ORo//HlaP/x5Wj/8eVp//Hlav/x5Wn/8eVp//Hlbf/z6H3/9/Cp//z64//+/vr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//v3z//r2yv/07JT/8ed3/+/kZP/v4l3/7+Nf/+/jYP/v42L/7+Ni/+/jY//w5GP/8ORk//DkZP/w5GX/8ORl//DkZf/w5Gb/8ORn//DkZ//w5Gj/8eVo//HlZ//x5Wf/8eRm//Lmc//06oX/9/Cp//z54P///vz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7++P/7+dz/9/K0//Tslf/y6H3/8ORo/+/iXv/v4l//7+Ng//DjYf/w5GL/8ORj//DkZP/w5GT/8ORk//DkZf/w5GX/8ORl//DjZP/w5Gb/8udz//Triv/276H/+fTC//365f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v31//z53f/59cj/9/K0//XuoP/064//8+mD//LoeP/y6Hn/8uh5//Loev/y6Hr/8uh9//TqjP/17Zj/9vCp//nzvf/7987//fvm///++/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//v31//387P/9++b//Prg//z64f/8+uD//Prh//z64f/8+uL//fvp//387//+/vj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`,
        chengtong2: `data:image/x-icon;base64,AAABAAEAgIAAAAEAIAAoCAEAFgAAACgAAACAAAAAAAEAAAEAIAAAAAAAAAABAKQBAACkAQAAAAAAAAAAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/P//8+z//+zf///l0///49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//49D//+PQ///j0P//5dP//+zf///z7P///fz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n1///jz///zqz//7uM//+lZ///lk///4k4//+FMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Yy//+GMv//hjL//4Uy//+JOP//lk///6Vn//+7jP//zqz//+PP///59f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hn///Jo///qWv//44+//97Hf//cQz//3IO//9yD///cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9zEP//cxD//3MQ//9yD///cg7//3EM//97Hf//jj7//6lr///Jo///8ef//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///Lp///EmP//mEv//4Ai//90Dv//dA7//3YR//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3cS//93Ev//dxL//3YR//90Dv//dA7//4Ai//+YS///xJj///Lp///+/f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n1///Us///lkf//38e//93Ef//dxH//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///eBP//3gT//94E///dxH//3cR//9/Hv//lUX//8+r///59P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///s3f//snb//4Mj//96Ev//ehL//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oT//96E///ehP//3oS//96Ev//gR///69w///r2////fz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+///3cL//59S//98Ff//exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///exP//3sT//97E///fBX//5tN///Zu////Pr//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fz//9Kt//+TPP//exH//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fRT//30U//99FP//fBH//5E3///RrP///fz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+///Rqv//kDL//34S//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fxT//38U//9/FP//fhL//5Ay///Rqv///v3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////1rT//5I1//+AE///gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EU//+AFP//gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gBP//4AT//+AE///gRT//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gBT//4AT//+AE///gBP//4AT//+AE///gBT//4EU//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gRX//4EV//+BFf//gBP//5Ez///Trf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+XO//+cRf//gRL//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4ET//+AEP//gxf//4sl//+NKf//kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5Iz//+SM///kjP//5M0//+JIv//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFP//gBH//4IU//+HH///jCj//5Au//+SNP//kjP//44s//+LJf//gxf//4AQ//+BEv//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//ghX//4IV//+CFf//gRL//5tD///kzf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////y5///r2b//4UV//+EFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4MT//+DE///kjD//6RS//+4ef//z6X//9ez///o0///6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///o1P//6NT//+jU///q1v//3b///6FM//+EFP//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+EFP//ghH//4sh//+eRv//sm3//8WR///Urv//4MP//+nV///o0///27r//9Cm//+4ef//pFL//5Qz//+EFP//gxP//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//hRX//4UV//+FFf//gxL//6tf///x5f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pn//8qZ//+KHv//hhX//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+FE///lTL//7p6///auf//9u3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v4///Hkv//jCL//4YV//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhT//4wh//+tYv//z6L//+zb///9/P/////////////////////////////////////////////27f//3b7//7t8//+YOP//hRP//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//hhb//4YW//+GFv//iBr//8OM///69v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mz///lzP//4gV//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFf//jB7//7Jp///fwP//+/j////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/f//27f//5Yx//+HE///iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4kX//+fQv//0qj///Pn/////////////////////////////////////////////////////////////////////////Pn//+HF//+yaf//jB7//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFv//iBb//4gW//+IFf//lTD//+bO////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/b//7t3//+KFv//ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KF///iRb//5Mp///Gjf//9ev//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/g//+kSv//iRX//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oW//+LGf//tGv//+nT///+/f////////////////////////////////////////////////////////////////////////////////////////Xr///Ikv//lS3//4kV//+KF///ihf//4oX//+KF///ihf//4oX//+KF///ihf//4oX//+KFv//s2j///n0///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////n0P//lSv//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sW//+XL///0aP///z5///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////69P//vnz//40a//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+LFv//kCD//79+///06P////////////////////////////////////////////////////////////////////////////////////////////////////////36///RpP//mDH//4sW//+LF///ixf//4sX//+LF///ixf//4sX//+LF///ixf//4sX//+TJ///48f////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fv//7pz//+PG///jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//lSf//82a///9/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//9u2//+UJf//jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//jRf//5Ad///Bgf//+PD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////78///Qof//lSj//40Y//+NGP//jRj//40Y//+NGP//jRj//40Y//+NGP//jRj//48b//+6c////fz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///nzn//44W//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jxj//5AZ///Aff//+vT////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z5v//rFP//5AZ//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jxj//48Y//+QGv//uW7///Xq//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////r0///Aff//kBn//48Y//+PGP//jxj//48Y//+PGP//jxj//48Y//+PGP//jhb//583///t2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9Sl//+YJ///kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+QF///qk3//+/e/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7//8eL//+UH///kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+RGP//kRn//6xR///v3v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/e//+qTf//kBf//5EY//+RGP//kRj//5EY//+RGP//kRj//5EY//+QF///liT//8+b////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////um3//5IX//+SGf//kxn//5MZ//+TGf//kxn//5MZ//+TGf//khj//5Uf///Xqv///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////p0f//pkL//5EV//+TGf//kxn//5MZ//+TGf//kxn//5MZ//+TGf//kxn//5IY//+hN///4sH///7+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3//9eq//+VH///khj//5MZ//+TGf//kxn//5MZ//+TGf//kxn//5IZ//+RFv//t2f///78//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pl//+tTv//kxX//5UZ//+VGf//lRn//5UZ//+VGf//lRn//5UZ//+TFv//sVf///Hi////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/b//8SA//+VGv//lBf//5QX//+UF///lBf//5QX//+UF///lBf//5QX//+UF///lx3//9Gb///9+v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8eL//7FX//+TFv//lRn//5UZ//+VGf//lRn//5UZ//+VGf//lRn//5MV//+rSv//8N7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////48H//6Q4//+VF///lhr//5Ya//+WGv//lhr//5Ya//+WGv//lhr//5UY///Ok////v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////pz///r0///58u//+gMP//oDD//6Aw//+gMP//oDD//6Aw//+gMP//oDD//58t//+9cP//9Oj////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v//zpP//5UY//+WGv//lhr//5Ya//+WGv//lhr//5Ya//+WGv//lRf//6Q3///hv//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Zq///oCv//5gY//+YGv//mBr//5ga//+YGv//mBr//5ga//+XGP//ozL//+G9//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pk///dtP//3rb//962///etv//3rb//962///etv//3rb//962///etv//3bT///Hg///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////hvf//ozH//5cY//+YGv//mBr//5ga//+YGv//mBr//5ga//+YGf//nSX//9aj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9CV//+bHf//mhr//5ob//+aG///mhv//5ob//+aG///mhv//5gX//+zUv//8N3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hg//+0Vf//mBb//5ob//+aG///mhv//5ob//+aG///mhv//5oa//+aGv//z5H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yob//5gT//+cG///nBv//5wb//+cG///nBv//5wb//+cG///mhb//7pg///26///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+fH//71n//+ZFv//nBv//5wb//+cG///nBv//5wb//+cG///nBv//5kU///Khv/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Mh///mxT//54b//+eG///nhv//54b//+eG///nhv//54b//+bFf//xXb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xXj//5sV//+eG///nhv//54b//+eG///nhv//54b//+eG///mxT//8yH/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8yH//+cFf//nxz//58c//+fHP//nxz//58c//+fHP//nxz//5wV///He//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////He///nBX//58c//+fHP//nxz//58c//+fHP//nxz//58c//+cFf//zIf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////zYf//54V//+hHP//oRz//6Ec//+hHP//oRz//6Ec//+hHP//nhb//8Z1/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8d4//+eFv//oRz//6Ec//+hHP//oRz//6Ec//+hHP//oRz//54V///Nh//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Oh///oBX//6Mc//+jHP//oxz//6Mc//+jHP//oxz//6Mc//+hF///wWb///nv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////68///wmn//6EX//+jHP//oxz//6Mc//+jHP//oxz//6Mc//+jHP//oBX//86H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9WW//+mH///pBz//6Ud//+lHf//pR3//6Ud//+lHf//pR3//6MZ//+6Uv//8dz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Hb//+6Uv//oxn//6Ud//+lHf//pR3//6Ud//+lHf//pR3//6Ud//+kHP//05H/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3af//6wq//+mHP//px3//6cd//+nHf//px3//6cd//+nHf//phv//7A0///lvf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fv//96p///Jdf//y3j//8t4///LeP//y3j//8t4///LeP//y3j//8t4///Kdv//3KX///rz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////58H//7E4//+mG///px3//6cd//+nHf//px3//6cd//+nHf//phz//6sp///cpf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////oxf//tD7//6cb//+oHv//qB7//6ge//+oHv//qB7//6ge//+oHv//pxr//9eV///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ow///tUD//6kf//+pIf//qSH//6kh//+pIf//qSH//6kh//+pIf//qSH//6oh///Znf///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Xl///pxv//6ge//+oHv//qB7//6ge//+oHv//qB7//6ge//+nG///tD7//+nF//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Xk//+9Uf//qRr//6oe//+qHv//qh7//6oe//+qHv//qh7//6oe//+pG///wFj///Th////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Ov//8hu//+pG///qh7//6oe//+qHv//qh7//6oe//+qHv//qh7//6oe//+oGv//vE7///DY////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eT//8Je//+pG///qh7//6oe//+qHv//qh7//6oe//+qHv//qh7//6ka//+9Uf//9eT//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8lt//+rHP//rB7//6we//+sHv//rB7//6we//+sHv//rB7//6we//+uJf//4Kz///79//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////78///gqv//sCr//6we//+sHv//rB7//6we//+sHv//rB7//6we//+sHv//rB7//64j///Xkv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///grP//riX//6we//+sHv//rB7//6we//+sHv//rB7//6we//+sHv//qxz//8lt////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3aP//7Is//+tHv//rh///64f//+uH///rh///64f//+uH///rh///60e//+/Tv//893/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7s///7tD//+tHv//rh///64f//+uH///rh///64f//+uH///rh///64f//+sG///vkz///Lb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9eT//79O//+tHv//rh///64f//+uH///rh///64f//+uH///rh///60e//+yLP//3aP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z3v//u0D//64d//+vH///rx///68f//+vH///rx///68f//+vH///rx///7Ai///Qev///Pb///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pd///EWv//rh7//68f//+vH///rx///68f//+vH///rx///68f//+vH///rx7//7Ip///al/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z2///Rfv//sCL//68f//+vH///rx///68f//+vH///rx///68f//+vH///rh3//7tA///z3v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77///Re///siP//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xIP//sR///7Us///Zk////Pb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////47P//znP//7Ij//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+xH///w1T///jq///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+v//3Zz//7Yt//+xH///sSD//7Eg//+xIP//sSD//7Eg//+xIP//sSD//7Eg//+yI///0Xv///77//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//+3L//+6NP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//sx///7gv///alP//+/T/////////////////////////////////////////////////////////////////////////////////////////////////////////////9+b//9F2//+1Jv//sx///7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7kx///nuv////7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/P//+Ot//+8Ov//sx7//7Mg//+zIP//syD//7Mg//+zIP//syD//7Mg//+zIP//syD//7o0///ty/////7//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Pb//9J3//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tB///7ox///ZjP//+Or//////////////////////////////////////////////////////////////////////////////////////////////vv//+7M///MZ///tiT//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1I///1YD///z3//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ns///aj///ujH//7Qf//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//tSD//7Ug//+1IP//0nf///z2////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////787//8FA//+2IP//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//tiD//7gm///Oav//68D///35//////////////////////////////////////////////////////////////////////////////fm///gn///xEn//7Yh//+2If//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//th///8dT///03v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////35///rwP//z23//7oq//+2IP//tyH//7ch//+3If//tyH//7ch//+3If//tyH//7ch//+3If//tiD//787///uzP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+v//35v//7kl//+4If//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCH//7gh///CPv//0nP//+m7///78////v3////+/////v////7////+/////v////7////+///+/f///fr///Tb///gnP//y1v//7wt//+4H///uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gg///AOf//6Lf///79//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7////+/////v///v3///vz///swf//03X//8I+//+4If//uCH//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gi//+4Iv//uCL//7gh//+5Jf//3pf///35///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////56v//0m///7kg//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7kg//+6Iv//wDb//8hQ///Xf///46T//+zC///txf//7cX//+3F///txP//5Kn//9uK///NXf//wz///70t//+5IP//uiH//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6If//vCn//92T///9+P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////v3///z0///67v//+u////PW///txP//7cT//+Ws///Zg///ylX//8E3//+6I///uSD//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uiL//7oi//+6Iv//uSD//9Bp///35//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////x0f//y1P//7wh//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8If//vCH//70m//+/Kv//wC7//8Au///ALv//wC7//8Au//+/K///vif//7wi//+7IP//vCH//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCH//70k///WeP//+e3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////vw///pt///0WX//8I0///BM///wDD//8Au///ALv//vyv//70m//+8If//uyH//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wi//+8Iv//vCL//7wh///JTv//78z////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////twv//x0L//70h//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//70j//+9Iv//0Wb///Xf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////78f//3Yr//8Ev//++I///vSP//70j//+9I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//++I///viP//74j//+9If//xj///+q5///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////nrP//xz7//78i//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyL//9Jk///02v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+ap///DL///vyH//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyP//78j//+/I///vyL//8Y6///nq////vz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///svP//zU3//8Ej///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wSP//8Mo///Wb///9dv////+///////////////////////////////////////////////////////////////////////////////////////////////////////////////////56v//1Wr//8Ae///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ek///BJP//wST//8Ej///NTP//6bH///78//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////79///xy///0lv//8Ml///DI///wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mj///HNP//3oj///jm//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LQ///LQ///wiL//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mk///DJP//wyT//8Mj///DJf//0lv///HL///+/f/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+///34f//3YD//8o2///EIv//xSP//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Qi///FJv//z0r//+ip///89P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8s3//8xA///EIv//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uk///FJP//xST//8Uj///EIv//yjb//92A///34f////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////99v//67T//9Ve///KM///xSH//8Yk///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yi///GIv//zT7//9x7///12v///v3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////34P//1Vz//8Uh///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xiX//8Yl///GJf//xyX//8Yk///FIf//yS3//9Vd///rtP///fb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+u3//+mn///YY///zDL//8gi///II///yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCT//8ch///IJP//0ET//915///vvv///vr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////76///kk///ySn//8gk///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gl///IJf//yCX//8gj///HIP//yy///9hk///mnP//+uv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////no///ss///4ID//9RP///MLP//yiT//8ol///KJf//yiX//8om///KJv//yib//8om///KJf//yiX//8ol///KJf//yiT//8ok///RQP//3G///+ac///yyv///fX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jh///aaP//yib//8ol///KJv//yib//8om///KJv//yib//8ol///KJf//yiX//8ok///KJv//1E7//99+///ssP//+ej////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////88v//9tv///DC///ml///33n//9lc///USf//zjD//80t///NLf//zS3//881///VTv//2Fn//951///lkf//7rr///XU///66/////7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jh///mlv//1Ev//84u///NLf//zS3//80t///OMP//1En//9hZ///edf//5pf///DA///22////PL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7///75///88v//+uv///nn///44f//+OD///jg///44P//+OL///ro///66v///PH///33/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////33///55///+OD///jg///44P//+OD///jh///55///+ur///zx///++f////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fX/+/jX//z64v/+/O////77///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//799f/9++v//vzt/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////377P/w53b/8uh9//Trjv/176H/9vCq//fytP/487//+PS///j0v//38bL//Prj/////v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77//n0vf/587n/+vXG//r2yP/69sn/+vTD//nzuP/48bP/9++m//btmv/69L7///77/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v30//DmdP/u4lf/7uFW/+7hVf/u4Vb/7uNd/+/kZP/v5GX/7+Rm/+7iX//38bL///78///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9++r/9Oh8//Pncf/z6Hr/9Oh8//TofP/z6Hn/8+Zy//Pmcv/z5nT/9Oh2//r0wP////z////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vf/8+uR/+7iWv/u4ln/7uJa/+7iWv/u4lr/7uJa/+7iW//u4lv/7uJd//LphP/+/vf///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v2zf/06Hv/8+dy//Pnc//z53P/8+d0//PndP/z53X/8+d2//Pnd//06Hn//PjT/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//28a7/7uJa/+7iWf/u4lr/7uJa/+7iW//u4lv/7uJc/+7iXP/u4lz/7+Rp//v41f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+PGt//Pndf/z53P/8+dz//PndP/z53X/8+d1//Pndf/z53b/8+d2//Tpgv/9++j///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////r30f/u4l7/7uJZ/+7iWv/u4lr/7uJb/+7iW//u4lv/7uJc/+7iXf/u4mD/9e6f///+/P////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////388P/064z/8+dw//Pnc//z53P/8+d0//PndP/z53X/8+d1//Pndv/z53X/9u2b//788f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fvq//HneP/u4lj/7uJa/+7iWv/u4lr/7uJb/+7iW//u4lz/7uJc/+7iW//w5nL/+/jb////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vXF//Poev/z53H/8+dz//Pnc//z53T/8+d0//Pndf/z53X/8+d1//PndP/587n///76///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vj/9u+n/+3hV//u4ln/7uJa/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXv/17p7//v75//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////798v/27Zv/8uZw//Lmcv/z53P/8+dz//PndP/z53T/8+d1//Pndf/z53X/8+h8//v41v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////69s3/7uNg/+7iWP/u4lr/7uJa/+7iWv/u4lv/7uJc/+7iXP/u4l3/7uJb//Dlb//6987/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vXG//Pnef/y5nH/8uZy//Pncv/z53P/8+dz//PndP/z53T/8+d1//Pnc//27Zn//fvr//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////376//z6on/7uJW/+7iWv/u4lr/7uJa/+7iW//u4lz/7uJc/+7iXP/u4l3/7uJc//Tri//9++j///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////365f/164//8uZv//Lmcf/y5nL/8+dy//Pnc//z53P/8+d0//PndP/z53X/8+d0//nzuv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////jzuf/v41//7uJZ/+7iWv/u4lr/7uJb/+7iXP/u4lz/7uJc/+7iXf/u4l3/7+Ne//bwpv/+/vf////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fb/9/Cp//Lmb//y5nH/8uZx//Lmcv/z53L/8+dy//Pnc//z53T/8+d0//Pnc//164v//Prf/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////fvp//Lpg//u4lf/7uJa/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXf/v4l7/8ORn//jyt////vv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////77//n0vv/y53T/8uZw//Lmcf/y5nH/8uZy//Lmcv/z53L/8+dz//Pnc//z53T/8+d2//jxsP////3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/K2/+/jYv/u4ln/7uJa/+7iWv/u4lv/7uJc/+7iXP/u4l3/7uJd/+/jXv/v417/8OVq//jyt////vv////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//59L7/8+h6//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZy//Pncv/z53P/8+dz//Pncv/16of//Pri///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fL/8+qG/+7iWf/u4lr/7uJa/+7iW//u4lz/7uJc/+7iXP/u4l3/7uJe/+/jXv/v413/8OVr//fxsf/+/fL////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/vf/+fO7//Poef/y5m7/8uZv//LmcP/y5nD/8uZx//Lmcf/y5nL/8+dy//Pnc//z53P/8+h4//nzuP////3////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////699H/8OVp/+7iWf/u4lr/7uJb/+7iW//u4lz/7uJc/+7iXf/u4l3/7+Ne/+/jXv/v417/8ORm//Xunf/9++f////+//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//fzs//fwqv/z53T/8uZt//Lmb//y5m//8uZw//LmcP/y5nH/8uZx//Lmcv/y5nL/8+dz//Pnc//17JL//fzu///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////++//28a3/7uNf/+7iWv/u4lv/7uJb/+7iXP/u4lz/7uJd/+7iXf/v417/7+Ne/+/jX//v41//7+Nh//Lpgv/69sr//v3y/////////////////////////////////////////////////////////////////////////////////////////////////////////////v30//r20P/065H/8uZu//Lmbf/y5m7/8uZu//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZx//Lmcv/z53L/9OmA//v41v////7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////387v/z647/7uJa/+7iW//u4lv/7uJc/+7iXP/u4lz/7uJd/+7iXv/v417/7+Nf/+/jX//v41//7+Ng//DkaP/17Zv/+vfS//798v///////////////////////////////////////////////////////////////////////////////////////v3z//v41f/376X/8uZz//HlbP/x5W3/8uZt//Lmbv/y5m7/8uZv//Lmb//y5nD/8uZw//Lmcf/y5nH/8uZx//Pod//59L3///76//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z53f/y6H3/7uJY/+7iW//u4lv/7uJc/+7iXP/u4l3/7uJe/+/jXv/v417/7+Nf/+/jX//v42D/7+Ng/+/jX//w5W//9OyW//jzuv/7+dz//v31///////////////////////////////////////////////////////+/vb//Pne//n0vv/27pv/8ud4//Hlav/x5Wz/8eVs//Hlbf/y5m3/8uZu//Lmbv/y5m//8uZv//LmcP/y5nD/8uZx//Lmcf/y53X/9/Cp//798//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+//v30v/x53f/7uJZ/+7iW//u4lz/7uJc/+7iXf/u4l3/7+Ne/+/jXv/v41//7+Nf/+/jYP/v42D/7+Nh/+/jYP/v4l7/8ORn//LofP/0647/9u+l//nzvf/59cn/+/jb//z65P/8+uH/+vfT//n1yv/487r/9u+h//Xskv/z6YL/8eZu//HkZv/x5Wr/8eVr//HlbP/x5Wz/8eVt//Lmbf/y5m7/8uZu//Lmb//y5m//8uZw//LmcP/y5nH/8uZx//btmf/9++v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//r30P/x53b/7uJa/+7iXP/u4lz/7uJd/+7iXf/v417/7+Ne/+/jXv/v41//7+Ng/+/jYP/v42H/7+Nh/+/jYf/v42H/7+Nh//DjYP/w5GX/8eVs//Hmcf/y53f/8uh6//Lnev/x53b/8eZz//Hlb//x5Wf/8eVl//HlZ//x5Wn/8eVq//Hlav/x5Wv/8eVr//HlbP/x5Wz/8uZt//Lmbv/y5m7/8uZu//Lmb//y5nD/8uZw//LmcP/27JT//frl///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//r30P/x53b/7uJb/+7iXP/u4l3/7uJd/+7iXv/v417/7+Ne/+/jX//v42D/7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42P/8ORj//DkY//w5GP/8ORk//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORn//HlaP/x5Wj/8eVp//Hlaf/x5Wr/8eVq//Hla//x5Wv/8eVs//HlbP/x5W3/8uZt//Lmbv/y5m7/8uZv//Lmb//y5nL/9eyV//365v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9//v30v/y6YT/7uJb/+7iXP/u4l3/7uJe/+/jXv/v417/7+Nf/+/jX//v42D/7+Ng/+/jYf/v42H/7+Ni/+/jYv/v42P/8ORj//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORm//DkZ//w5Gf/8ORo//HlaP/x5Wn/8eVp//Hlav/x5Wr/8eVr//Hla//x5Wz/8eVs//Hlbf/y5m3/8uZu//Lmbv/y5m3/8+d1//fvpP/9/Oz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z64//07Jb/7+Nj/+7iW//u4l3/7+Ne/+/jXv/v41//7+Nf/+/jYP/v42D/7+Nh/+/jYf/v42L/7+Ni/+/jY//w5GP/8ORk//DkZP/w5GX/8ORl//DkZv/w5Gb/8ORn//DkZ//w5Gj/8eVo//HlaP/x5Wn/8eVq//Hlav/x5Wr/8eVr//HlbP/x5Wz/8eVt//Lmbf/y5m7/8uZr//Ppff/587j//v3z//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////798v/38rT/8OZx/+7iXf/u4l7/7+Ne/+/jXv/v41//7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42L/7+Nj//DkY//w5GP/8ORk//DkZf/w5GX/8ORl//DkZv/w5Gb/8ORn//DkaP/w5Gj/8eVo//Hlaf/x5Wr/8eVq//Hlav/x5Wv/8eVr//HlbP/x5Wz/8eVt//Lmb//17JD/+/fR//7++f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7++P/7+Nj/9O2Y/+/kZv/v417/7+Ne/+/jX//v41//7+Ng/+/jYP/v42H/7+Nh/+/jYv/v42L/7+Nj//DkY//w5GT/8ORl//DkZf/w5GX/8ORm//DkZv/w5Gf/8ORn//DkaP/x5Wj/8eVp//Hlav/x5Wr/8eVq//Hla//x5Wv/8eVr//Hlbv/z6Hz/+PK1//387P////7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/fX/+fXI//PqiP/w5Wr/7+Nf/+/jXf/v41//7+Ng/+/jYf/v42H/7+Ni/+/jYv/v42P/8ORj//DkZP/w5GT/8ORl//DkZf/w5Gb/8ORm//DkZ//w5Gf/8ORo//HlaP/x5Wj/8eVp//Hlav/x5Wn/8eVp//Hlbf/z6H3/9/Cp//z64//+/vr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//v3z//r2yv/07JT/8ed3/+/kZP/v4l3/7+Nf/+/jYP/v42L/7+Ni/+/jY//w5GP/8ORk//DkZP/w5GX/8ORl//DkZf/w5Gb/8ORn//DkZ//w5Gj/8eVo//HlZ//x5Wf/8eRm//Lmc//06oX/9/Cp//z54P///vz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7++P/7+dz/9/K0//Tslf/y6H3/8ORo/+/iXv/v4l//7+Ng//DjYf/w5GL/8ORj//DkZP/w5GT/8ORk//DkZf/w5GX/8ORl//DjZP/w5Gb/8udz//Triv/276H/+fTC//365f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v31//z53f/59cj/9/K0//XuoP/064//8+mD//LoeP/y6Hn/8uh5//Loev/y6Hr/8uh9//TqjP/17Zj/9vCp//nzvf/7987//fvm///++/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7//v31//387P/9++b//Prg//z64f/8+uD//Prh//z64f/8+uL//fvp//387//+/vj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=`,
        kuake: `data:image/png;base64,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`,
        magnet: `data:image/png;base64,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`,
      }, // icon结尾处
    },
    suspension: {
      // 悬浮按钮  双击打开主界面，长按打开设置（不能移动，移动就不打开，只是移动按钮）
      isShow: false,
      show() {
        if (!UI.suspension.isShow) {
          this.createUI();
          this.initPop();
          this.setSuspensionEvent();
          this.setSuspensionDefaultPositionEvent();
          this.resizeEvent();

          UI.suspension.isShow = true;
        }
        this.randBg();
      },
      createUI() {
        UI.size = GM_getValue("size") ? parseInt(GM_getValue("size")) : 50;
        UI.opacity = GM_getValue("opacity")
          ? parseFloat(GM_getValue("opacity"))
          : 1;
        if (UI.size < 15) {
          GM_setValue("size", 15);
          UI.size = 15;
        }
        if (UI.size > 250) {
          GM_setValue("size", 250);
          UI.size = 250;
        }
        if (UI.opacity < 0.1) {
          GM_setValue("opacity", 0.1);
          UI.opacity = 0.1;
        }
        if (UI.opacity > 1.0) {
          GM_setValue("opacity", 1);
          UI.opacity = 1;
        }
        this.loadCSS();
        let _html_ = `
				<div class="whitesevSuspension" id="whitesevSuspensionId" style="width:${UI.size}px;height:${UI.size}px;opacity:${UI.opacity}">
					<div class="whitesevSuspensionMain">
						<div class="whitesevSuspensionFloor">
							<div class="netdisk"></div>
						</div>
					</div>
				</div>
				`;
        let _settingHtml_ = `
				<div id="whitesevSuspensionContextMenu" class="whitesevSuspensionContextMenuHide">
					<ul>
						<li class="whitesevSuspensionSetting">
						设置
						</li>
					</ul>
				</div>
				`;

        $("body").append($(_html_)[0]);
        $("body").append($(_settingHtml_)[0]);
      },
      initPop() {
        // 初始化弹出层
        pop.cfg({
          className: "whitesevPop",
          resize: true,
          viewport: true,
        });
        Qmsg.config({
          position: "center",
        });

        GM_addStyle(`
				.whitesevPop{
					user-select: unset;
				}
				.whitesevPop[type=mask],
				.whitesevPop[type=alert],
				.whitesevPop[type=prompt]{
					position: fixed;
				}
				.whitesevPop-whitesevPopSetting{
					transition: all 0.45s ease;
				}
				
				.whitesevPop-whitesevPopSetting .whitesevPop-title {
					text-align: center;
				}
				.whitesevPop-whitesevPopSetting .whitesevPop-buttonSpcl{
					display: none;
				}
				.whitesevPop-whitesevPopSetting .whitesevPop-content{
					overflow: auto;
				}

				.netdisk-setting-menu-item{
					display:flex;
				}
				.netdisk-setting-menu-item label{
					width:150px;
				}
				.netdisk-setting-menu-item[type=checkbox]{
					display: flex;
    			height: 50px;
				}
				.netdisk-setting-menu-item[type=checkbox] p{
					align-self: center;
    			width: 150px;
				}
				.netdisk-setting-menu-item input[type=text],
				.netdisk-setting-menu-item input[type=number],
				.netdisk-setting-menu-item input[type=range]{
					margin-right: 10px;
					border: none;
					border-bottom: 1px solid #8f8e8e;
					width: 60%;
				}
				.netdisk-setting-menu-item input[type=text]:focus,
				.netdisk-setting-menu-item input[type=number]:focus{
					outline: none;
    			border-bottom: 1px solid #2196f3;
				}
				.netdisk-setting-menu[type='百度'] .netdisk-setting-menu-item,
				.netdisk-setting-menu[type='总设置'] .netdisk-setting-menu-item{
					margin: 12px 0px;
				}
				.netdisk-setting-menu[type='总设置'] .netdisk-setting-menu-item{
					align-items: center;
					display: flex;
    			justify-content: space-between;
				}
				.netdisk-setting-menu-item select[data-key=pageMatchRange]{
					background-color: #fff;
				}
				/*checkbox美化*/
				/* CSS规则保持重复，以便您可以轻松获取每个按钮的CSS规则 :) */

				.netdisk-checkbox .knobs, 
				.netdisk-checkbox .layer{
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
				}
				.netdisk-checkbox{
					position: relative;
					top: 50%;
					width: 56px;
					height: 28px;
					margin: 0px auto 0 auto;
					overflow: hidden;
					transform: translateY(-50%);
				}
				.netdisk-checkbox input[type="checkbox"]{
						position: relative;
						width: 100%;
						height: 100%;
						padding: 0;
						margin: 0;
						opacity: 0;
						cursor: pointer;
						z-index: 3;
				}
				.netdisk-checkbox .knobs{
						z-index: 2;
				}
				.netdisk-checkbox .layer{
						width: 100%;
						background-color: #fcebeb;
						transition: 0.3s ease all;
						z-index: 1;
				}
				/*
				.netdisk-checkbox .knobs:before,
				.netdisk-checkbox .knobs span{
						position: absolute;
						display: inline;
						top: 5px;
						left: 6px;
						width: 20px;
						height: 10px;
						color: #fff;
						font-size: 10px;
						font-weight: bold;
						text-align: center;
						line-height: 1;
						padding: 9px 4px;
				}
				另类写法居中
				*/
				.netdisk-checkbox .knobs:before,
				.netdisk-checkbox .knobs span{
					position: relative;
					display: block;
					top: 50%;
					left: 30%;
					width: 35%;
    			height: 65%;
					color: #fff;
					font-size: 10px;
					font-weight: bold;
					text-align: center;
					line-height: 1;
					padding: 9px 4px;
					transform: translate(-50%,-50%);
				}			
				.netdisk-checkbox .knobs span{
						background-color: #F44336;
						border-radius: 2px;
						transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
						z-index: 1;
				}
				.netdisk-checkbox .knobs:before{
					transition: 0.3s ease all, left 0.5s cubic-bezier(0.18, 0.89, 0.35, 1.15);
					z-index: 2;
			}
			/*
				.netdisk-checkbox .knobs:before{
					content: 'N';
					display: inline;
					top: -2px;
					left: -10px;
				}
				.netdisk-checkbox input[type="checkbox"]:checked + .knobs:before{
						content: 'Y';
						display: inline;
						position: inherit;
						top: -2px;
						left: 20px;
				}

				.netdisk-checkbox input[type="checkbox"]:checked + .knobs span{
						left: 30px;
						background-color: #03A9F4;
				}
				另类写法居中 */
				.netdisk-checkbox input[type="checkbox"]:checked + .knobs span{
					left: 70%;
					background-color: #03A9F4;
			}
				.netdisk-checkbox input[type="checkbox"]:checked ~ .layer{
						background-color: #ebf7fc;
				}

				/*range美化*/
				.netdisk-setting-menu-item input[type=range] {
					background-size: 98% 3px;
					margin: auto;
					background: linear-gradient(to right, #ccc 0%, #ccc 100%);
					outline: none;
					-webkit-appearance: none;
					/*清除系统默认样式*/
					height: 1px;
					/*横条的高度*/
				}
				.netdisk-setting-menu-item input[type=range]::-webkit-slider-thumb {
						width: 15px;
						height: 15px;
						border-radius: 50%;
						background-color: #fff;
						box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2);
						cursor: pointer;
						-webkit-appearance: none;
						border: 0;
				}
		
					/*message提示的css文件*/
					.qmsg.qmsg-wrapper{
						box-sizing: border-box;
						margin: 0;
						padding: 0;
						color: rgba(0, 0, 0, .55);
						font-size: 13px;
						font-variant: tabular-nums;
						line-height: 1;
						list-style: none;
						font-feature-settings: "tnum";
						position: fixed;
						top: 16px;
						left: 0;
						z-index: 50000;
						width: 100%;
						pointer-events: none;
					}
					.qmsg .qmsg-item{
							padding: 8px;
							text-align: center;
							-webkit-animation-duration: .3s;
							animation-duration: .3s;
							position: relative;
					}
					.qmsg .qmsg-item .qmsg-count{
							text-align: center;
							position: absolute;
							left: -4px;
							top: -4px;
							background-color: red;
							color: #fff;
							font-size: 12px;
							line-height: 16px;
							border-radius: 2px;
							display: inline-block;
							min-width: 16px;
							height: 16px;
							-webkit-animation-duration: .3s;
							animation-duration: .3s;
					}
					.qmsg .qmsg-item:first-child{
							margin-top: -8px;
					}
					.qmsg .qmsg-content{
							text-align: left;
							position: relative;
							display: inline-block;
							padding: 10px 16px;
							background: #fff;
							border-radius: 4px;
							box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
							pointer-events: all;
							/* min-width: 175px; */
							max-width: 80%;
							min-width: 80px;
					}
					.qmsg .qmsg-content [class^="qmsg-content-"]{
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
					}
					.qmsg .qmsg-content .qmsg-content-with-close{
							padding-right: 20px;
					}
					.qmsg .qmsg-icon{
							display: inline-block;
							color: inherit;
							font-style: normal;
							line-height: 0;
							text-align: center;
							text-transform: none;
							vertical-align: -.125em;
							text-rendering: optimizeLegibility;
							-webkit-font-smoothing: antialiased;
							-moz-osx-font-smoothing: grayscale;
							position: relative;
							top: 1px;
							margin-right: 8px;
							font-size: 16px;
					}
					.qmsg .qmsg-icon svg{
							display: inline-block;
					}
					
					.qmsg .qmsg-content-info .qmsg-icon{
							color: #1890ff;
					}
					.qmsg .qmsg-icon-close{
							position: absolute;
							top: 11px;
							right: 5px;
							padding: 0;
							overflow: hidden;
							font-size: 12px;
							line-height: 22px;
							background-color: transparent;
							border: none;
							outline: none;
							cursor: pointer;
							color: rgba(0, 0, 0, .45);
							transition: color .3s
					}
					.qmsg .qmsg-icon-close:hover>svg path{
							stroke: #555;
					}
					.qmsg .animate-turn{
							animation:MessageTurn 1s linear infinite;  
							-webkit-animation: MessageTurn 1s linear infinite;
					}
					@keyframes MessageTurn{
							0%{-webkit-transform:rotate(0deg);}
							25%{-webkit-transform:rotate(90deg);}
							50%{-webkit-transform:rotate(180deg);}
							75%{-webkit-transform:rotate(270deg);}
							100%{-webkit-transform:rotate(360deg);}
					}
					@-webkit-keyframes MessageTurn{
							0%{-webkit-transform:rotate(0deg);}
							25%{-webkit-transform:rotate(90deg);}
							50%{-webkit-transform:rotate(180deg);}
							75%{-webkit-transform:rotate(270deg);}
							100%{-webkit-transform:rotate(360deg);}
					}
					
					@-webkit-keyframes MessageMoveOut {
							0% {
									max-height: 150px;
									padding: 8px;
									opacity: 1
							}
					
							to {
									max-height: 0;
									padding: 0;
									opacity: 0
							}
					}
					
					@keyframes MessageMoveOut {
							0% {
									max-height: 150px;
									padding: 8px;
									opacity: 1
							}
					
							to {
									max-height: 0;
									padding: 0;
									opacity: 0
							}
					}
					
					
					@-webkit-keyframes MessageMoveIn {
							
							0% {
									transform: translateY(-100%);
									transform-origin: 0 0;
									opacity: 0
							}
					
							to {
									transform: translateY(0);
									transform-origin: 0 0;
									opacity: 1
							}
					}
					
					@keyframes MessageMoveIn {
							0% {
									transform: translateY(-100%);
									transform-origin: 0 0;
									opacity: 0
							}
					
							to {
									transform: translateY(0);
									transform-origin: 0 0;
									opacity: 1
							}
					}
					@-webkit-keyframes MessageShake {
							0%,
							100% {
								transform: translateX(0px);
								opacity: 1;
							}
						
							25%,
							75% {
									transform: translateX(-4px);
								opacity: 0.75;
							}
						
							50% {
									transform: translateX(4px);
									opacity: 0.25;
							}
						}
					@keyframes MessageShake {
							0%,
							100% {
								transform: translateX(0px);
								opacity: 1;
							}
						
							25%,
							75% {
									transform: translateX(-4px);
								opacity: 0.75;
							}
						
							50% {
									transform: translateX(4px);
									opacity: 0.25;
							}
						}

						/* select美化 无法美化option*/
						.netdisk-setting-menu-item select{
							display: block;
							height: 32px;
							line-height: 32px;
							font-size: 14px;
							width: 200px;
							border: 1px solid #5c5c5c;
							border-radius: 5px;
							text-align: center;
							outline: 0;
							margin: auto;
						}
						.netdisk-setting-menu-item select:focus{
							border: 1px solid #002bff;
						}
						/* select美化*/
				`);
        if (pop.pcIn) {
          GM_addStyle(`
					.whitesevPop ::-webkit-scrollbar
					{
							width: 11px;
							height: 16px;
							background-color: #ffffff;
					}
					/*定义滚动条轨道
					内阴影+圆角*/
					.whitesevPop ::-webkit-scrollbar-track
					{
							-webkit-box-shadow: inset 0 0 6px rgb(0 0 0 / 25%);
							border-radius:10px;
							background-color: #f2f2f2;
					}
					/*定义滑块
					内阴影+圆角*/
					.whitesevPop ::-webkit-scrollbar-thumb
					{
							border-radius: 16px;
							-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
							background-color: #3597ff;
					}
					`);
        }
      },
      openPop() {
        if (UI.isCreatedUISetting) {
          let currentPop = pop.getLayer(UI.uiSettingAlias).$;
          currentPop.show();
          if (currentPop.next().attr("type") === "mask") {
            currentPop.next().show();
            $("body").css("overflow", "hidden"); // 禁止弹出窗口还能后面滑动
          }
        } else {
          UI.isCreatedUISetting = true;

          let ui_size = GM_getValue("size") ? GM_getValue("size") : 50;
          let ui_opacity = GM_getValue("opacity") ? GM_getValue("opacity") : 1;
          let _settingHtml_ = `
				<div class="netdisk-setting-body">
					<div class="netdisk-setting">
						<div class="netdisk-setting-main">
							<details class="netdisk-setting-menu" type="总设置">
									<summary>总设置</summary>
									<div class="netdisk-setting-menu-item">
											<label data-id="netdisk-size">大小${ui_size}</label>
											<input type="range" data-key="size" data-content="大小" min="15" max="250" defaultvalue="50">
									</div>
									<div class="netdisk-setting-menu-item">
											<label data-id="netdisk-opacity" content="透明度">透明度${ui_opacity}</label>
											<input type="range" data-key="opacity" data-content="透明度" min="0.1" max="1" step="0.1" defaultvalue="1">
									</div>
									<div class="netdisk-setting-menu-item">
											<label>匹配类型</label>
											<select data-key="pageMatchRange">
													<option data-value="all">全部</option>
													<option data-value="innerText">普通文本</option>
													<option data-value="innerHTML">超文本</option>
											</select>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>读取剪贴板</p>
											<div class="netdisk-checkbox" style="position: inherit;top: unset;transform: matrix(1, 0, 0, 1, 0, 0);">
												<input type="checkbox" data-key="readClipboard">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
											
									</div>
							</details>
							<details class="netdisk-setting-menu" type="百度">
									<summary>百度网盘</summary>
									<div class="netdisk-setting-menu-item">
											<label>网址-Url</label>
											<input type="text" data-key="bdurl" placeholder="如：https://www.example.com/">
									</div>
									<div class="netdisk-setting-menu-item">
											<label>参数-Key</label>
											<input type="text" data-key="paramSurl" placeholder="如：surl">
									</div>
									<div class="netdisk-setting-menu-item">
											<label>密码-Key</label>
											<input type="text" data-key="paramPwd" placeholder="如：pwd">
									</div>
									<div class="netdisk-setting-menu-item">
											<label>密钥-Key</label>
											<input type="text" data-key="paramKey" placeholder="如：Password">
									</div>
									<div class="netdisk-setting-menu-item">
											<label>密钥-Value</label>
											<input type="text" data-key="paramWebSiteKey"  placeholder="密钥，有就填">
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>网站存在密钥验证</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="baidu-website-key-enable">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
											
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>启用解析</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="baidu-static-enable" mutex=".netdisk-checkbox input[data-key='baidu-open-enable']">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
											
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="baidu-open-enable" mutex=".netdisk-checkbox input[data-key='baidu-static-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="蓝奏云">
								<summary>蓝奏云</summary>
								<div class="netdisk-setting-menu-item" type="checkbox">
										<p>单/多文件直链获取</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="lanzou-static-enable" mutex=".netdisk-checkbox input[data-key='lanzou-open-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
								<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="lanzou-open-enable" mutex=".netdisk-checkbox input[data-key='lanzou-static-enable']">
											<div class="knobs"><span></span></div>
											<div class="layer"></div>
										</div>
								</div>
								<div class="netdisk-setting-menu-item" type="checkbox">
										<p>直链调用scheme</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="lanzou-static-scheme-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
								</div>
								<div class="netdisk-setting-menu-item">
										<label>scheme转发</label>
										<input type="text" data-key="lanzou-static-scheme-forward" placeholder="如: jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx">
								</div>
							</details>
							<details class="netdisk-setting-menu" type="天翼云">
									<summary>天翼云</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>单文件直链获取</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="tianyiyun-static-enable" mutex=".netdisk-checkbox input[data-key='tianyiyun-open-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="tianyiyun-open-enable" mutex=".netdisk-checkbox input[data-key='tianyiyun-static-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>直链调用scheme</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="tianyiyun-scheme-enable">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
									</div>
									<div class="netdisk-setting-menu-item">
											<label>scheme转发</label>
											<input type="text" data-key="tianyiyun-scheme-forward" placeholder="如: jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx">
									</div>
									
							</details>
							<details class="netdisk-setting-menu" type="和彩云">
									<summary>中国移动云盘(原:和彩云)</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="hecaiyun-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="阿里云">
									<summary>阿里云</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="aliyun-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="文叔叔">
									<summary>文叔叔</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>单文件直链获取</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="wenshushu-static-enable" mutex=".netdisk-checkbox input[data-key='wenshushu-open-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="wenshushu-open-enable" mutex=".netdisk-checkbox input[data-key='wenshushu-static-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>直链调用scheme</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="wenshushu-static-scheme-enable">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
									</div>
									<div class="netdisk-setting-menu-item">
											<label>scheme转发</label>
											<input type="text" data-key="wenshushu-static-scheme-forward" placeholder="如: jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx">
									</div>
									
							</details>
							<details class="netdisk-setting-menu" type="奶牛">
									<summary>奶牛</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="nainiu-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="123盘">
									<summary>123盘</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>单/多文件直链获取</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="_123pan-static-enable" mutex=".netdisk-checkbox input[data-key='_123pan-open-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="_123pan-open-enable" mutex=".netdisk-checkbox input[data-key='_123pan-static-enable']">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>直链调用scheme</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="_123pan-static-scheme-enable">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
									</div>
									<div class="netdisk-setting-menu-item">
											<label>scheme转发</label>
											<input type="text" data-key="_123pan-static-scheme-forward" placeholder="如: jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx">
									</div>
									
							</details>
							<details class="netdisk-setting-menu" type="微云">
									<summary>微云</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="weiyun-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="迅雷云盘">
									<summary>迅雷云盘</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="xunlei-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="115盘">
									<summary>115盘</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="_115pan-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="城通网盘1">
									<summary>城通网盘1</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="chengtong1-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="城通网盘2">
									<summary>城通网盘2</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="chengtong2-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="夸克网盘">
									<summary>夸克网盘</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
										<p>新标签页打开</p>
										<div class="netdisk-checkbox">
											<input type="checkbox" data-key="kuake-open-enable">
											<div class="knobs"><span></span></div><div class="layer"></div>
										</div>
									</div>
							</details>
							<details class="netdisk-setting-menu" type="磁力magnet">
									<summary>磁力magnet</summary>
									<div class="netdisk-setting-menu-item" type="checkbox">
											<p>调用scheme</p>
											<div class="netdisk-checkbox">
												<input type="checkbox" data-key="magnet-scheme-enable">
												<div class="knobs"><span></span></div><div class="layer"></div>
											</div>
									</div>
									<div class="netdisk-setting-menu-item">
											<label>scheme转发</label>
											<input type="text" data-key="magnet-scheme-forward" placeholder="如: jumpwsv://go?package=xx&activity=xx&intentAction=xx&intentData=xx&intentExtra=xx">
									</div>
							</details>
						</div>
					</div>
				</div>
				`;
          pop
            .alert({
              title: "设置",
              content: _settingHtml_,
              button: [
                "primary",
                "关闭",
                function () {
                  $("body").css("overflow", "auto");
                  pop.getLayer(UI.uiSettingAlias).$.hide();
                  $(".whitesevPop[type=mask]").hide();
                },
              ],
              box: "body",
              sizeAdapt: false,
              drag: false,
              mask: true,
              only: true,
              height: 350,
              width: pop.pcIn ? 500 : 350,
              class: "whitesevPopSetting",
              buttonSpcl: "close",
            })
            .alias(UI.uiSettingAlias);
          $("body").css("overflow", "hidden"); // 禁止弹出窗口还能后面滑动

          this.setCheckBoxClickEvent();
          this.setSelectEvent();
        }
      },
      setCheckBoxClickEvent() {
        $(".netdisk-setting input").each((i, v) => {
          let data_key = v.getAttribute("data-key");
          v.value = GM_getValue(data_key) ? GM_getValue(data_key) : "";
          switch (v.getAttribute("type")) {
            case "checkbox":
              v.checked = GM_getValue(data_key) ? true : false;
              let mutex = v.getAttribute("mutex");
              $(v).on("click", (e) => {
                if (mutex) {
                  let mutexElement = $(mutex);
                  let mutex_data_key = $(mutex).attr("data-key");
                  if (v.checked) {
                    mutexElement.prop("checked", !v.checked);
                    GM_setValue(mutex_data_key, !v.checked);
                  }
                }
                GM_setValue(data_key, v.checked);
              });
              break;
            case "range":
              $(v).on("input propertychange", (val) => {
                $(`.netdisk-setting label[data-id=netdisk-${data_key}]`).html(
                  `${v.getAttribute("data-content")}${v.value}`
                );
                let itSize = $(".netdisk-setting input[data-key=size]").val();
                $("#whitesevSuspensionId").css({
                  width: itSize + "px",
                  height: itSize + "px",
                  opacity: $(".netdisk-setting input[data-key=opacity]").val(),
                });
                UI.size = itSize;
                UI.suspension.setSuspensionDefaultPositionEvent();
                GM_setValue(data_key, v.value);
              });
              $(".netdisk-setting input[data-key=opacity]").val(
                GM_getValue("opacity") ? GM_getValue("opacity") : 1
              ); // 初始化opacity的值
            default:
              $(v).on("input propertychange", (val) => {
                GM_setValue(data_key, v.value);
              });
          }
        });
      },
      setSelectEvent() {
        $(".netdisk-setting select").change(function (e) {
          let data_key = e.target.getAttribute("data-key");
          let data_value =
            e.target[e.target.selectedIndex].getAttribute("data-value");
          GM_setValue(data_key, data_value);
        });
        let pageMatchRangeOptionValue = GM_getValue(
          "pageMatchRange",
          "innerText"
        );
        $(".netdisk-setting select[data-key=pageMatchRange]")
          .find(`option[data-value='${pageMatchRangeOptionValue}']`)
          .attr("selected", true);
      },
      setSuspensionEvent() {
        let needDragEle = document.getElementById("whitesevSuspensionId");
        let that = this;
        let _drag_ = new AnyTouch(needDragEle);
        let timerID = null;
        let isClicked = false;
        let isDouble = false;
        let click_deviation_x = 0; // 点击元素，距离元素左上角的X轴偏移
        let click_deviation_y = 0; // 点击元素，距离元素左上角的Y轴偏移
        _drag_.on("pan", (e) => {
          if (!isClicked) {
            isClicked = true;
            click_deviation_x = e.nativeEvent.offsetX
              ? parseInt(e.nativeEvent.offsetX)
              : parseInt(e.getOffset().x);
            click_deviation_y = e.nativeEvent.offsetY
              ? parseInt(e.nativeEvent.offsetY)
              : parseInt(e.getOffset().y);
            $("#whitesevSuspensionId").css({
              cursor: "move",
              transition: "none",
            });
          }
          if (e.phase == "move") {
            if (click_deviation_x > 250 || click_deviation_y > 250) {
              return;
            }
            var maxL = $(window).width() - UI.size;
            var maxT = $(window).height() - UI.size;
            var x = e.x - click_deviation_x;
            var y = e.y - click_deviation_y;
            x = x < maxL ? x : maxL;
            y = y < maxT ? y : maxT;
            x = x < 0 ? 0 : x;
            y = y < 0 ? 0 : y;
            GM_setValue("suspensionX", x);
            GM_setValue("suspensionY", y);
            $("#whitesevSuspensionId").css({
              left: x,
              top: y,
            });
          }

          if (e.phase == "end") {
            isClicked = false;
            $("#whitesevSuspensionId").css("cursor", "auto");
            let left_px = parseInt(
              $("#whitesevSuspensionId").css("left").replace("px", "")
            );
            let setCSSLeft = 0;
            if (left_px >= $(window).width() / 2) {
              setCSSLeft = $(window).width() - UI.size;
              GM_setValue("isRight", true);
            } else {
              GM_setValue("isRight", false);
            }

            GM_setValue("suspensionX", setCSSLeft);
            $("#whitesevSuspensionId").css({
              left: setCSSLeft,
              transition: "left 300ms ease 0s",
            });
          }
        });

        _drag_.on(["click", "tap"], (e) => {
          if (isDouble) {
            // 双
            clearTimeout(timerID);
            timerID = setTimeout(function () {
              isDouble = false;
              that.openPop();
            }, 300);
          } else {
            isDouble = true;
            timerID = setTimeout(function () {
              isDouble = false;
              UI.view.show();
            }, 300);
          }
        });
        $(window).on("click", (e) => {
          let targetId = e.target.id;
          let targetClassName = e.target.className;
          if (targetId != "whitesevSuspensionContextMenu") {
            $("#whitesevSuspensionContextMenu").addClass(
              "whitesevSuspensionContextMenuHide"
            );
          }
          if (targetClassName == "whitesevSuspensionSetting") {
            console.log("打开设置界面");
            that.openPop();
          }
        });
        $("#whitesevSuspensionId").on("contextmenu", (e) => {
          e.preventDefault();
          let settingEle = $("#whitesevSuspensionContextMenu");
          var maxL1 = $(window).width() - UI.size;
          var maxT1 = $(window).height() - UI.size;
          var x1 = e.clientX;
          var y1 = e.clientY;
          //不允许超出浏览器范围
          x1 = x1 < 0 ? 0 : x1;
          x1 = x1 < maxL1 ? x1 : maxL1;
          y1 = y1 < 0 ? 0 : y1;
          y1 = y1 < maxT1 ? y1 : maxT1;
          settingEle.removeClass("whitesevSuspensionContextMenuHide");
          settingEle.css({
            left: x1,
            top: y1,
          });
        });
      },
      setSuspensionDefaultPositionEvent() {
        // 设置悬浮按钮位置
        let maxY = $(window).height() - UI.size;
        let defaultX = $(window).width() - UI.size;
        let defaultY = $(window).height() / 2 - UI.size;
        let setX =
          GM_getValue("suspensionX") != null
            ? GM_getValue("suspensionX")
            : defaultX;
        let setY =
          GM_getValue("suspensionY") != null
            ? GM_getValue("suspensionY")
            : defaultY;

        setX = GM_getValue("isRight") ? defaultX : 0;
        setY = setY < maxY ? setY : maxY; // 超出高度那肯定是最底下了
        setY = setY < 0 ? 0 : setY;
        GM_setValue("suspensionX", setX);
        GM_setValue("suspensionY", setY);
        $("#whitesevSuspensionId").css({
          left: setX,
          top: setY,
        });
      },
      loadCSS() {
        GM_addStyle(`
					.whitesevSuspension{
						top: 0;
						position:fixed;
						right:10px;
						border-radius: 12px;
						z-index:4000;
					}
					.whitesevSuspension .whitesevSuspensionMain{
						background:#fff;
						border:1px solid #f2f2f2;
						box-shadow:0 0 15px #e4e4e4;
						box-sizing:border-box;
						border-radius: inherit;
						height: inherit;
						width: inherit;
					}
					.whitesevSuspension .whitesevSuspensionFloor{
						border-bottom:1px solid #f2f2f2;
						position:relative;
						box-sizing:border-box;
						border-radius: inherit;
						height: inherit;
						width: inherit;
					}
					.whitesevSuspension .whitesevSuspensionFloor .netdisk{
						background-position:center center;
						background-size:115% 115%;
						background-repeat:no-repeat;
						display:flex;
						align-items:center;
						justify-content:center;
						border-radius: inherit;
						height: inherit;
						width: inherit;
					}
					.whitesevSuspension .whitesevSuspensionFloor .netdisk:hover{
						transition:all 300ms linear;
						background-color:#e4e4e4;
						transform:scale(1.1);
					}
					#whitesevSuspensionContextMenu{
						position: fixed;
						z-index: 10000;
						width: 50px;
    				text-align: center;
						padding: 3px 0px;
						border-radius: 3px;
						font-size: 13px;
						font-weight: 500;
						background:#fff;
					}
					#whitesevSuspensionContextMenu:hover{
						background: #dfdfdf;
					}
					.whitesevSuspensionContextMenuHide{
						display: none;
					}
					.whitesevPop-content p[pop]{
						height: 100%;
					}
				`);
      },
      resizeEvent() {
        // 界面大小改变
        let that = this;
        $(window).resize(function () {
          that.setSuspensionDefaultPositionEvent();
        });
      },
      randBg() {
        // 悬浮按钮背景轮播淡入淡出
        clearInterval(this.bgInterval);
        let currentList = [];
        let currentIndex = 0;
        let switchBgTime = 1500;
        UI.matchIcon.forEach((item) => {
          currentList = currentList.concat(item);
        });
        let randBgSrc = UI.src.icon[currentList[currentIndex]];
        $(".whitesevSuspension .netdisk").css(
          "background-image",
          `url(${randBgSrc})`
        );
        if (currentList.length > 1) {
          this.bgInterval = setInterval(function () {
            $(".whitesevSuspension .netdisk").fadeOut(
              switchBgTime,
              function () {
                currentIndex++;
                currentIndex =
                  currentIndex < currentList.length ? currentIndex : 0;
                randBgSrc = UI.src.icon[currentList[currentIndex]];
                $(".whitesevSuspension .netdisk").css(
                  "background-image",
                  `url(${randBgSrc})`
                );
                $(this).fadeIn(switchBgTime);
              }
            );
          }, switchBgTime * 2);
        }
      },
    },

    view: {
      // 主界面
      show() {
        if (!UI.isCreatedUI) {
          this.addCSS();
          this.createView();
          this.registerIconGotoPagePosition();
          UI.isCreatedUI = true;
        } else {
          let currentPop = pop.getLayer(UI.uiLinkAlias).$;
          currentPop.show();
          if (currentPop.next().attr("type") === "mask") {
            currentPop.next().show();
            $("body").css("overflow", "hidden"); // 禁止弹出窗口还能后面滑动
          }
        }
      },
      addCSS() {
        GM_addStyle(`
				
				.netdisk-url-box-all{
					
				}
				.netdisk-url-box{

				}
				.netdisk-url-box:last-child {
					padding: 0 0 10px 0;
				}
				.netdisk-url-div{
					display: flex;
					align-items: center;
					width: 100%;
					margin: 10px 0px;
				}
				.netdisk-icon{
					margin: 0px 4px;
					display: contents;
				}
				.netdisk-icon img{
					width: 28px;
					height: 28px;
					font-size: 13px !important;
				}
				.netdisk-icon img,
				.netdisk-url a{
					border-radius: 10px;
					box-shadow: 0 0.3px 0.6px rgb(0 0 0 / 6%), 0 0.7px 1.3px rgb(0 0 0 / 8%), 0 1.3px 2.5px rgb(0 0 0 / 10%), 0 2.2px 4.5px rgb(0 0 0 / 12%), 0 4.2px 8.4px rgb(0 0 0 / 14%), 0 10px 20px rgb(0 0 0 / 20%);
				}
				.netdisk-url{
					padding: 5px 0px;
					margin: 0px 10px;
				}
				.netdisk-url a{
					color: #ff4848 !important;
					min-height: 28px;
					overflow-x: hidden;
					overflow-y: auto;
					font-size: 14px;
					border: none;

					display: flex;
					align-items: center;
					width: 100%;
					height: 100%;
					padding: 2px 10px;
					word-break: break-word;
				}
				.whitesevPop-whitesevPopSetting *:focus-visible {
					outline-offset: 0px;
					outline:0px;
				}

				.netdisk-url a[isvisited=true]{
					color: #8b8888 !important;
				}
				.whitesevPop-content p[pop]{
					text-indent: 0px;
				}
				.whitesevPop-button[type="primary"] {
					border-color: #2d8cf0;
					background-color: #2d8cf0;
				}
				`);
      },
      createView() {
        let viewAddHTML = "";
        UI.matchIcon.forEach((netDiskName) => {
          let netDisk = NetDisk.linkDict.get(netDiskName);
          $.each(netDisk.getItems(), (shareCode, accessCode) => {
            let uiLink = NetDisk.handleLinkShow(
              netDiskName,
              shareCode,
              accessCode
            );
            viewAddHTML =
              viewAddHTML +
              this.getViewHTML(
                UI.src.icon[netDiskName],
                netDiskName,
                shareCode,
                accessCode,
                uiLink
              );
          });
        });
        let viewHTML = `
					<div class="netdisk-url-box-all">
						${viewAddHTML}
					</div>`;
        pop
          .alert({
            title: "网盘链接",
            content: viewHTML,
            button: [
              "primary",
              "关闭",
              function () {
                $("body").css("overflow", "auto");
                pop.getLayer(UI.uiLinkAlias).$.hide();
                $(".whitesevPop[type=mask]").hide();
              },
            ],
            box: "body",
            sizeAdapt: false,
            drag: false,
            mask: true,
            only: true,
            height: 350,
            width: pop.pcIn ? 500 : 350,
            class: "whitesevPopSetting",
            buttonSpcl: "close",
          })
          .alias(UI.uiLinkAlias);
        $("body").css("overflow", "hidden"); // 禁止弹出窗口还能后面滑动
        this.setNetDiskUrlClickEvent();
      },
      getViewHTML(
        _netdiskicon_,
        _netdiskname_,
        _sharecode_,
        _accesscode_,
        _uilink_
      ) {
        return `
				<div class="netdisk-url-box">
					<div class="netdisk-url-div">
						<div class="netdisk-icon">
							<img src="${_netdiskicon_}">
						</div>
						<div class="netdisk-url">
							<a href="javascript:;" isvisited="false" data-netdisk="${_netdiskname_}" data-sharecode="${_sharecode_}" data-accesscode="${_accesscode_}" data-open-enable-key="${_netdiskname_}-open-enable" data-static-enable-key="${_netdiskname_}-static-enable" data-scheme-enable-key="${_netdiskname_}-scheme-enable">${_uilink_}</a>
						</div>
					</div>
				</div>
				`;
      },
      setNetDiskUrlClickEvent() {
        function clickEvent(e) {
          e.target.setAttribute("isvisited", "true");
          let netdiskName = e.target.getAttribute("data-netdisk");
          let shareCode = e.target.getAttribute("data-sharecode");
          let accessCode = e.target.getAttribute("data-accesscode");
          let openEnable = GM_getValue(
            e.target.getAttribute("data-open-enable-key")
          );
          let staticEnable = GM_getValue(
            e.target.getAttribute("data-static-enable-key")
          );
          let schemeEnable = GM_getValue(
            e.target.getAttribute("data-scheme-enable-key")
          );
          if (openEnable) {
            let url = NetDisk.regular[netdiskName].blank.replace(
              /{#shareCode#}/gi,
              shareCode
            );
            url = url.replace(/{#accessCode#}/gi, accessCode);
            NetDiskLinkParse.blank(url, accessCode);
          } else if (staticEnable) {
            NetDiskLinkParse.parse(netdiskName, shareCode, accessCode);
          } else if (schemeEnable) {
            NetDiskLinkParse.scheme(netdiskName, shareCode, accessCode);
          } else {
            NetDiskLinkParse.setClipboard(e.target.outerText, "已复制");
          }
        }
        $("body").on("click", ".netdisk-url a", clickEvent);
      },
      addLinkView(_netdiskname_, _sharecode_, _accesscode_) {
        // 添加新的链接
        if (!UI.isCreatedUI) {
          return null;
        }
        console.log("添加");
        let icon = UI.src.icon[_netdiskname_];
        let uiLink = NetDisk.regular[_netdiskname_].uiLinkShow.replace(
          /{#shareCode#}/gi,
          _sharecode_
        );
        uiLink = _accesscode_
          ? uiLink.replace(/{#accessCode#}/gi, _accesscode_)
          : uiLink
              .replace(/{#accessCode#}/gi, "")
              .replace(/提取码:/gi, "")
              .replace(/ /g, "");
        let linkALiasElement = pop.getLayer(UI.uiLinkAlias).$;
        let insertDOM = this.getViewHTML(
          icon,
          _netdiskname_,
          _sharecode_,
          _accesscode_,
          uiLink
        );
        let parentDOM = linkALiasElement.find(".netdisk-url-box-all");
        parentDOM.append(insertDOM);
      },
      changeLinkView(_netdiskname_, _sharecode_, _accesscode_) {
        // 修改已存在的view
        if (!UI.isCreatedUI) {
          return null;
        }
        console.log("修改");
        let uiLink = NetDisk.regular[_netdiskname_].uiLinkShow.replace(
          /{#shareCode#}/gi,
          _sharecode_
        );
        uiLink = _accesscode_
          ? uiLink.replace(/{#accessCode#}/gi, _accesscode_)
          : uiLink
              .replace(/{#accessCode#}/gi, "")
              .replace(/提取码:/gi, "")
              .replace(/ /g, "");
        let linkALiasElement = pop.getLayer(UI.uiLinkAlias).$;
        let needChangeDOM = linkALiasElement.find(
          `.netdisk-url a[data-sharecode=${_sharecode_}]`
        );
        needChangeDOM.attr("data-accesscode", _accesscode_);
        needChangeDOM.html(uiLink);
      },
      registerIconGotoPagePosition() {
        /* 设置点击图标按钮导航至该网盘链接所在网页中位置 */
        $(document).on(
          "click",
          ".whitesevPop-content .netdisk-icon img",
          function (event) {
            let dataSharecode =
              event.target.parentElement.nextElementSibling.firstElementChild.getAttribute(
                "data-sharecode"
              );
            Utils.findWindowPageString(dataSharecode, true);
          }
        );
      },
    },
    staticView: {
      // 直链弹窗
      isLoadCSS: false,
      addCSS() {
        if (!this.isLoadCSS) {
          this.isLoadCSS = true;
          GM_addStyle(`
					.netdisk-static-body{
						flex-wrap: wrap;
						letter-spacing: 1px;
						text-decoration: none;
						width: 100%;
						padding: 5px 16px;
						text-align: left;
					}
					.netdisk-static-filename{

					}
					.netdisk-static-filename a{
						color: #233df8 !important;
					}
					.netdisk-static-body .netdisk-static-filename:before{
						content: "文件: ";
						font-weight: bold;
    				text-overflow: ellipsis;
						display: contents;
    				position: inherit;
					}
					.netdisk-static-filesize{

					}
					.netdisk-static-body .netdisk-static-filesize:before{
						content: "大小: ";
						font-weight: bold;
						display: contents;
    				position: inherit;
					}
					`);
        }
      },
      oneFile(title, fileName, fileSize, downloadUrl) {
        this.addCSS();
        Qmsg.success("成功获取直链", {
          html: true,
        });
        pop
          .alert({
            title: title,
            content: `<div class="netdisk-static-body"><div class="netdisk-static-filename"><a target="_blank" href="${downloadUrl}">${fileName}</a></div><div class="netdisk-static-filesize">${fileSize}</div></div>`,
            button: [
              [
                "close",
                "关闭",
                function () {
                  this.close();
                },
              ],
              [
                "primary",
                "下载",
                function () {
                  let downloadUrl = pop
                    .getLayer("单文件直链")
                    .$.find(".netdisk-static-filename a")
                    .attr("href");
                  window.open(downloadUrl, "_blank");
                },
              ],
            ],
            box: "body",
            sizeAdapt: false,
            drag: false,
            mask: true,
            only: true,
            height: 180,
            width: pop.pcIn ? 400 : 300,
            class: "whitesevPopSetting",
            buttonSpcl: "close",
          })
          .alias("单文件直链");
      },
      moreFile(title, _content_) {
        this.addCSS();
        Qmsg.success("成功获取多文件直链", {
          html: true,
        });
        pop
          .alert({
            title: title,
            content: _content_,
            button: [
              "primary",
              "关闭",
              function () {
                this.close();
              },
            ],
            box: "body",
            sizeAdapt: false,
            drag: false,
            mask: true,
            only: true,
            height: 400,
            width: pop.pcIn ? 400 : 300,
            class: "whitesevPopSetting whitesevPopMoreFile",
            buttonSpcl: "close",
          })
          .alias("多文件直链");
      },
    },
    monitorDOMInsert() {
      WorkerHandle.insertDOMHandleTextMatch();
      WorkerHandle.createWorkerObject();

      /* 使用观察者模式 */
      var MutationObserver =
        window.MutationObserver ||
        window.webkitMutationObserver ||
        window.MozMutationObserver;
      var mutationObserver = new MutationObserver(async function (mutations) {
        var retStatus = false;
        $.each(mutations, (i, v) => {
          if (
            v.target.className != null &&
            typeof v.target.className == "string" &&
            v.target.className.match(/whitesevPop|netdisk-url-box/gi)
          ) {
            retStatus = true;
            return null;
          }
        });
        if (retStatus) {
          return null;
        }
        if (UI.isHandling) {
          // 当前正在处理文本正则匹配中
          return null;
        }
        UI.isHandling = true;
        let clipboardText = "";
        if (GM_getValue("readClipboard", false)) {
          clipboardText = await NetDisk.getClipboardText();
        }
        NetDisk.matchPageLink(clipboardText);
      });
      mutationObserver.observe(document.body, {
        /* 子节点的变动（新增、删除或者更改） */
        childList: true,
        /* 属性的变动 */
        attributes: true,
        /* 节点内容或节点文本的变动 */
        characterData: true,
        /* 是否将观察器应用于该节点的所有后代节点 */
        subtree: true,
      });
    },
  };
  if (typeof pop !== "object") {
    console.error(
      "【网盘链接识别】: 由于某些原因，请手动修改本脚本，添加@require引用弹窗的组件库才可以正常使用本脚本！具体可看本脚本简介处！"
    );
  } else {
    $(document).ready(function () {
      UI.monitorDOMInsert();
    });
  }
})();

// ==UserScript==
// @name         【移动端】微博优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2025.8.21
// @author       WhiteSevs
// @description  劫持自动跳转登录，修复用户主页正确跳转，伪装客户端，可查看名人堂日程表，解锁视频清晰度(1080p、2K、2K-60、4K、4K-60)
// @license      GPL-3.0-only
// @icon         data:image/png;base64,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
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://m.weibo.cn/*
// @match        *://huati.weibo.cn/*
// @match        *://h5.video.weibo.com/*
// @match        *://card.weibo.com/*
// @match        *://weibo.com/l/wblive/m/show/*
// @require      https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript@86be74b83fca4fa47521cded28377b35e1d7d2ac/lib/CoverUMD/index.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@2.7.4/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.6.3/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/pops@2.3.5/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.4.0/dist/index.umd.js
// @connect      m.weibo.cn
// @connect      www.weibo.com
// @connect      passport.weibo.com
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

(function (Qmsg, DOMUtils, Utils, pops) {
  'use strict';

  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  const CommonUtil = {
    /**
     * 移除元素（未出现也可以等待出现）
     * @param selector 元素选择器
     */
    waitRemove(...args) {
      args.forEach((selector) => {
        if (typeof selector !== "string") {
          return;
        }
        utils.waitNodeList(selector).then((nodeList) => {
          nodeList.forEach(($el) => $el.remove());
        });
      });
    },
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
     * @example
     * setGMResourceCSS({
     *   keyName: "ViewerCSS",
     *   url: "https://example.com/example.css",
     * })
     */
    setGMResourceCSS(resourceMapData) {
      let cssText = typeof _GM_getResourceText === "function" ? _GM_getResourceText(resourceMapData.keyName) : null;
      if (typeof cssText === "string" && cssText) {
        addStyle(cssText);
      } else {
        CommonUtil.loadStyleLink(resourceMapData.url);
      }
    },
    /**
     * 添加<link>标签
     * @param url
     * @example
     * loadStyleLink("https://example.com/example.css")
     */
    async loadStyleLink(url) {
      let $link = document.createElement("link");
      $link.rel = "stylesheet";
      $link.type = "text/css";
      $link.href = url;
      DOMUtils.ready(() => {
        document.head.appendChild($link);
      });
    },
    /**
     * 添加<script>标签
     * @param url
     * @example
     * loadStyleLink("https://example.com/example.js")
     */
    async loadScript(url) {
      let $script = document.createElement("script");
      $script.src = url;
      return new Promise((resolve) => {
        $script.onload = () => {
          resolve(null);
        };
        (document.head || document.documentElement).appendChild($script);
      });
    },
    /**
     * 将url修复，例如只有search的链接修复为完整的链接
     *
     * 注意：不包括http转https
     * @param url 需要修复的链接
     * @example
     * 修复前：`/xxx/xxx?ss=ssss`
     * 修复后：`https://xxx.xxx.xxx/xxx/xxx?ss=ssss`
     * @example
     * 修复前：`//xxx/xxx?ss=ssss`
     * 修复后：`https://xxx.xxx.xxx/xxx/xxx?ss=ssss`
     * @example
     * 修复前：`https://xxx.xxx.xxx/xxx/xxx?ss=ssss`
     * 修复后：`https://xxx.xxx.xxx/xxx/xxx?ss=ssss`
     * @example
     * 修复前：`xxx/xxx?ss=ssss`
     * 修复后：`https://xxx.xxx.xxx/xxx/xxx?ss=ssss`
     */
    fixUrl(url) {
      url = url.trim();
      if (url.match(/^http(s|):\/\//i)) {
        return url;
      } else if (url.startsWith("//")) {
        if (url.startsWith("///")) ;
        else {
          url = window.location.protocol + url;
        }
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
     * http转https
     * @param url 需要修复的链接
     * @example
     * 修复前：
     * 修复后：
     * @example
     * 修复前：
     * 修复后：
     */
    fixHttps(url) {
      if (url.startsWith("https://")) {
        return url;
      }
      if (!url.startsWith("http://")) {
        return url;
      }
      let urlInstance = new URL(url);
      urlInstance.protocol = "https:";
      return urlInstance.toString();
    },
    /**
     * 禁止页面滚动，默认锁定html和body
     * @example
     * lockScroll();
     * @example
     * lockScroll(document.body);
     */
    lockScroll(...args) {
      let $hidden = document.createElement("style");
      $hidden.innerHTML = /*css*/
      `
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;
      let $elList = [document.documentElement, document.body].concat(...args || []);
      $elList.forEach(($el) => {
        $el.classList.add("pops-overflow-hidden-important");
      });
      (document.head || document.documentElement).appendChild($hidden);
      return {
        /**
         * 解除锁定
         */
        recovery() {
          $elList.forEach(($el) => {
            $el.classList.remove("pops-overflow-hidden-important");
          });
          $hidden.remove();
        }
      };
    },
    /**
     * 获取剪贴板文本
     */
    async getClipboardText() {
      function readClipboardText(resolve) {
        navigator.clipboard.readText().then((clipboardText) => {
          resolve(clipboardText);
        }).catch((error) => {
          log.error("读取剪贴板内容失败👉", error);
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
          log.error("申请剪贴板权限失败，尝试直接读取👉", error.message ?? error.name ?? error.stack);
          readClipboardText(resolve);
        });
      }
      function checkClipboardApi() {
        if (typeof navigator?.clipboard?.readText !== "function") {
          return false;
        }
        if (typeof navigator?.permissions?.query !== "function") {
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
    },
    /**
     * html转义
     * @param unsafe
     */
    escapeHtml(unsafe) {
      return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/©/g, "&copy;").replace(/®/g, "&reg;").replace(/™/g, "&trade;").replace(/→/g, "&rarr;").replace(/←/g, "&larr;").replace(/↑/g, "&uarr;").replace(/↓/g, "&darr;").replace(/—/g, "&mdash;").replace(/–/g, "&ndash;").replace(/…/g, "&hellip;").replace(/ /g, "&nbsp;").replace(/\r\n/g, "<br>").replace(/\r/g, "<br>").replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
    },
    /**
     * 在规定时间内循环，如果超时或返回false则取消循环
     * @param fn 循环的函数
     * @param intervalTime 循环间隔时间
     * @param [timeout=5000] 循环超时时间
     */
    interval(fn, intervalTime, timeout = 5e3) {
      let timeId;
      let maxTimeout = timeout - intervalTime;
      let intervalTimeCount = intervalTime;
      let loop = async (isTimeout) => {
        let result = await fn(isTimeout);
        if (typeof result === "boolean" && !result || isTimeout) {
          utils.workerClearTimeout(timeId);
          return;
        }
        intervalTimeCount += intervalTime;
        if (intervalTimeCount > maxTimeout) {
          loop(true);
          return;
        }
        timeId = utils.workerSetTimeout(() => {
          loop(false);
        }, intervalTime);
      };
      loop(false);
    },
    /**
     * 找到对应的上层元素
     */
    findParentNode($el, selector, parentSelector) {
      if (parentSelector) {
        let $parent = DOMUtils.closest($el, parentSelector);
        if ($parent) {
          let $target = $parent.querySelector(selector);
          return $target;
        }
      } else {
        if (DOMUtils.matches($el, selector)) {
          return $el;
        }
        let $parent = DOMUtils.closest($el, selector);
        return $parent;
      }
    }
  };
  const PanelSettingConfig = {
    /** Toast位置 */
    qmsg_config_position: {
      key: "qmsg-config-position",
      defaultValue: "bottom"
    },
    /** 最多显示的数量 */
    qmsg_config_maxnums: {
      key: "qmsg-config-maxnums",
      defaultValue: 3
    },
    /** 逆序弹出 */
    qmsg_config_showreverse: {
      key: "qmsg-config-showreverse",
      defaultValue: false
    }
  };
  const utils = Utils.noConflict();
  const domUtils = DOMUtils.noConflict();
  const __pops = pops;
  const log = new utils.Log(
    _GM_info,
    _unsafeWindow.console || _monkeyWindow.console
  );
  let SCRIPT_NAME = _GM_info?.script?.name || void 0;
  pops.config.Utils.AnyTouch();
  const DEBUG = false;
  log.config({
    debug: DEBUG,
    logMaxCount: 1e3,
    autoClearConsole: true,
    tag: true
  });
  Qmsg.config({
    isHTML: true,
    autoClose: true,
    showClose: false,
    consoleLogContent(qmsgInst) {
      const qmsgType = qmsgInst.getSetting().type;
      if (qmsgType === "loading") {
        return false;
      }
      const content = qmsgInst.getSetting().content;
      if (qmsgType === "warning") {
        log.warn(content);
      } else if (qmsgType === "error") {
        log.error(content);
      } else {
        log.info(content);
      }
      return true;
    },
    get position() {
      return Panel.getValue(
        PanelSettingConfig.qmsg_config_position.key,
        PanelSettingConfig.qmsg_config_position.defaultValue
      );
    },
    get maxNums() {
      return Panel.getValue(
        PanelSettingConfig.qmsg_config_maxnums.key,
        PanelSettingConfig.qmsg_config_maxnums.defaultValue
      );
    },
    get showReverse() {
      return Panel.getValue(
        PanelSettingConfig.qmsg_config_showreverse.key,
        PanelSettingConfig.qmsg_config_showreverse.defaultValue
      );
    },
    get zIndex() {
      let maxZIndex = Utils.getMaxZIndex();
      let popsMaxZIndex = pops.config.InstanceUtils.getPopsMaxZIndex().zIndex;
      return Utils.getMaxValue(maxZIndex, popsMaxZIndex) + 100;
    }
  });
  __pops.GlobalConfig.setGlobalConfig({
    zIndex: () => {
      let maxZIndex = Utils.getMaxZIndex(void 0, void 0, ($ele) => {
        if ($ele?.classList?.contains("qmsg-shadow-container")) {
          return false;
        }
        if ($ele?.closest("qmsg") && $ele.getRootNode() instanceof ShadowRoot) {
          return false;
        }
      });
      let popsMaxZIndex = pops.config.InstanceUtils.getPopsMaxZIndex().zIndex;
      return Utils.getMaxValue(maxZIndex, popsMaxZIndex) + 100;
    },
    mask: {
      // 开启遮罩层
      enable: true,
      // 取消点击遮罩层的事件
      clickEvent: {
        toClose: false,
        toHide: false
      }
    },
    drag: true
  });
  const GM_Menu = new utils.GM_Menu({
    GM_getValue: _GM_getValue,
    GM_setValue: _GM_setValue,
    GM_registerMenuCommand: _GM_registerMenuCommand,
    GM_unregisterMenuCommand: _GM_unregisterMenuCommand
  });
  const httpx = new utils.Httpx({
    xmlHttpRequest: _GM_xmlhttpRequest,
    logDetails: DEBUG
  });
  httpx.interceptors.request.use((data) => {
    return data;
  });
  httpx.interceptors.response.use(void 0, (data) => {
    log.error("拦截器-请求错误", data);
    if (data.type === "onabort") {
      Qmsg.warning("请求取消", { consoleLogContent: true });
    } else if (data.type === "onerror") {
      Qmsg.error("请求异常", { consoleLogContent: true });
    } else if (data.type === "ontimeout") {
      Qmsg.error("请求超时", { consoleLogContent: true });
    } else {
      Qmsg.error("其它错误", { consoleLogContent: true });
    }
    return data;
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
  const $ = DOMUtils.selector.bind(DOMUtils);
  const $$ = DOMUtils.selectorAll.bind(DOMUtils);
  new utils.GM_Cookie();
  const KEY = "GM_Panel";
  const ATTRIBUTE_INIT = "data-init";
  const ATTRIBUTE_KEY = "data-key";
  const ATTRIBUTE_DEFAULT_VALUE = "data-default-value";
  const ATTRIBUTE_INIT_MORE_VALUE = "data-init-more-value";
  const PROPS_STORAGE_API = "data-storage-api";
  const PanelUISize = {
    /**
     * 一般设置界面的尺寸
     */
    setting: {
      get width() {
        if (window.innerWidth < 550) {
          return "88vw";
        } else if (window.innerWidth < 700) {
          return "550px";
        } else {
          return "700px";
        }
      },
      get height() {
        if (window.innerHeight < 450) {
          return "70vh";
        } else if (window.innerHeight < 550) {
          return "450px";
        } else {
          return "550px";
        }
      }
    },
    /**
     * 中等的设置界面
     */
    settingMiddle: {
      get width() {
        return window.innerWidth < 350 ? "88vw" : "350px";
      }
    }
  };
  class StorageUtils {
    /** 存储的键名 */
    storageKey;
    listenerData;
    /**
     * 存储的键名，可以是多层的，如：a.b.c
     *
     * 那就是
     * {
     *  "a": {
     *     "b": {
     *       "c": {
     *         ...你的数据
     *       }
     *     }
     *   }
     * }
     * @param key
     */
    constructor(key) {
      if (typeof key === "string") {
        let trimKey = key.trim();
        if (trimKey == "") {
          throw new Error("key参数不能为空字符串");
        }
        this.storageKey = trimKey;
      } else {
        throw new Error("key参数类型错误，必须是字符串");
      }
      this.listenerData = new Utils.Dictionary();
    }
    /**
     * 获取本地值
     */
    getLocalValue() {
      let localValue = _GM_getValue(this.storageKey);
      if (localValue == null) {
        localValue = {};
        this.setLocalValue(localValue);
      }
      return localValue;
    }
    /**
     * 设置本地值
     * @param value
     */
    setLocalValue(value) {
      _GM_setValue(this.storageKey, value);
    }
    /**
     * 设置值
     * @param key 键
     * @param value 值
     */
    set(key, value) {
      let oldValue = this.get(key);
      let localValue = this.getLocalValue();
      Reflect.set(localValue, key, value);
      this.setLocalValue(localValue);
      this.triggerValueChangeListener(key, oldValue, value);
    }
    /**
     * 获取值
     * @param key 键
     * @param defaultValue 默认值
     */
    get(key, defaultValue) {
      let localValue = this.getLocalValue();
      return Reflect.get(localValue, key) ?? defaultValue;
    }
    /**
     * 获取所有值
     */
    getAll() {
      let localValue = this.getLocalValue();
      return localValue;
    }
    /**
     * 删除值
     * @param key 键
     */
    delete(key) {
      let oldValue = this.get(key);
      let localValue = this.getLocalValue();
      Reflect.deleteProperty(localValue, key);
      this.setLocalValue(localValue);
      this.triggerValueChangeListener(key, oldValue, void 0);
    }
    /**
     * 判断是否存在该值
     */
    has(key) {
      let localValue = this.getLocalValue();
      return Reflect.has(localValue, key);
    }
    /**
     * 获取所有键
     */
    keys() {
      let localValue = this.getLocalValue();
      return Reflect.ownKeys(localValue);
    }
    /**
     * 获取所有值
     */
    values() {
      let localValue = this.getLocalValue();
      return Reflect.ownKeys(localValue).map(
        (key) => Reflect.get(localValue, key)
      );
    }
    /**
     * 清空所有值
     */
    clear() {
      _GM_deleteValue(this.storageKey);
    }
    /**
     * 监听值改变
     * + .set
     * + .delete
     * @param key 监听的键
     * @param callback 值改变的回调函数
     */
    addValueChangeListener(key, callback) {
      let listenerId = Math.random();
      let listenerData = this.listenerData.get(key) || [];
      listenerData.push({
        id: listenerId,
        key,
        callback
      });
      this.listenerData.set(key, listenerData);
      return listenerId;
    }
    /**
     * 移除监听
     * @param listenerId 监听的id或键名
     */
    removeValueChangeListener(listenerId) {
      let flag = false;
      for (const [key, listenerData] of this.listenerData.entries()) {
        for (let index = 0; index < listenerData.length; index++) {
          const value = listenerData[index];
          if (typeof listenerId === "string" && value.key === listenerId || typeof listenerId === "number" && value.id === listenerId) {
            listenerData.splice(index, 1);
            index--;
            flag = true;
          }
        }
        this.listenerData.set(key, listenerData);
      }
      return flag;
    }
    /**
     * 主动触发监听器
     * @param key 键
     * @param oldValue （可选）旧值
     * @param newValue （可选）新值
     */
    triggerValueChangeListener(key, oldValue, newValue) {
      if (!this.listenerData.has(key)) {
        return;
      }
      let listenerData = this.listenerData.get(key);
      for (let index = 0; index < listenerData.length; index++) {
        const data = listenerData[index];
        if (typeof data.callback === "function") {
          let value = this.get(key);
          let __newValue;
          let __oldValue;
          if (typeof oldValue !== "undefined" && arguments.length >= 2) {
            __oldValue = oldValue;
          } else {
            __oldValue = value;
          }
          if (typeof newValue !== "undefined" && arguments.length > 2) {
            __newValue = newValue;
          } else {
            __newValue = value;
          }
          data.callback(key, __oldValue, __newValue);
        }
      }
    }
  }
  const PopsPanelStorageApi = new StorageUtils(KEY);
  const PanelContent = {
    $data: {
      /**
       * @private
       */
      __contentConfig: null,
      get contentConfig() {
        if (this.__contentConfig == null) {
          this.__contentConfig = new utils.Dictionary();
        }
        return this.__contentConfig;
      }
    },
    /**
     * 设置所有配置项，用于初始化默认的值
     *
     * 如果是第一组添加的话，那么它默认就是设置菜单打开的配置
     * @param configList 配置项
     */
    addContentConfig(configList) {
      if (!Array.isArray(configList)) {
        configList = [configList];
      }
      let index = this.$data.contentConfig.keys().length;
      this.$data.contentConfig.set(index, configList);
    },
    /**
     * 获取所有的配置内容，用于初始化默认的值
     */
    getAllContentConfig() {
      return this.$data.contentConfig.values().flat();
    },
    /**
     * 获取配置内容
     * @param index 配置索引
     */
    getConfig(index = 0) {
      return this.$data.contentConfig.get(index) ?? [];
    },
    /**
     * 获取默认左侧底部的配置项
     */
    getDefaultBottomContentConfig() {
      return [
        {
          id: "script-version",
          title: `版本：${_GM_info?.script?.version || "未知"}`,
          isBottom: true,
          forms: [],
          clickFirstCallback(event, rightHeaderElement, rightContainerElement) {
            let supportURL = _GM_info?.script?.supportURL || _GM_info?.script?.namespace;
            if (typeof supportURL === "string" && utils.isNotNull(supportURL)) {
              window.open(supportURL, "_blank");
            }
            return false;
          }
        }
      ];
    }
  };
  const PanelMenu = {
    $data: {
      __menuOption: [
        {
          key: "show_pops_panel_setting",
          text: "⚙ 设置",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback: () => {
            Panel.showPanel(PanelContent.getConfig(0));
          }
        }
      ],
      get menuOption() {
        return this.__menuOption;
      }
    },
    init() {
      this.initExtensionsMenu();
    },
    /**
     * 初始化菜单项
     */
    initExtensionsMenu() {
      if (!Panel.isTopWindow()) {
        return;
      }
      GM_Menu.add(this.$data.menuOption);
    },
    /**
     * 添加菜单项
     * @param option 菜单配置
     */
    addMenuOption(option) {
      if (!Array.isArray(option)) {
        option = [option];
      }
      this.$data.menuOption.push(...option);
    },
    /**
     * 更新菜单项
     * @param option 菜单配置
     */
    updateMenuOption(option) {
      if (!Array.isArray(option)) {
        option = [option];
      }
      option.forEach((optionItem) => {
        let findIndex = this.$data.menuOption.findIndex((it) => {
          return it.key === optionItem.key;
        });
        if (findIndex !== -1) {
          this.$data.menuOption[findIndex] = optionItem;
        }
      });
    },
    /**
     * 获取菜单项
     * @param [index=0] 索引
     */
    getMenuOption(index = 0) {
      return this.$data.menuOption[index];
    },
    /**
     * 删除菜单项
     * @param [index=0] 索引
     */
    deleteMenuOption(index = 0) {
      this.$data.menuOption.splice(index, 1);
    }
  };
  const Panel = {
    /** 数据 */
    $data: {
      /**
       * @private
       */
      __contentConfigInitDefaultValue: null,
      /**
       * @private
       */
      __onceExecMenuData: null,
      /**
       * @private
       */
      __onceExecData: null,
      /**
       * @private
       */
      __panelConfig: {},
      /**
       * 面板
       */
      $panel: null,
      /**
       * 面板配置
       */
      panelContent: [],
      /**
       * 菜单项初始化的默认值
       */
      get contentConfigInitDefaultValue() {
        if (this.__contentConfigInitDefaultValue == null) {
          this.__contentConfigInitDefaultValue = new utils.Dictionary();
        }
        return this.__contentConfigInitDefaultValue;
      },
      /**
       * 菜单项初始化时禁用的键
       */
      contentConfigInitDisabledKeys: [],
      /**
       * 成功只执行了一次的菜单项
       *
       * + .exec
       * + .execMenu
       * + .execMenuOnce
       */
      get onceExecMenuData() {
        if (this.__onceExecMenuData == null) {
          this.__onceExecMenuData = new utils.Dictionary();
        }
        return this.__onceExecMenuData;
      },
      /**
       * 成功只执行了一次的项
       *
       * + .onceExec
       */
      get onceExecData() {
        if (this.__onceExecData == null) {
          this.__onceExecData = new utils.Dictionary();
        }
        return this.__onceExecData;
      },
      /** 脚本名，一般用在设置的标题上 */
      get scriptName() {
        return SCRIPT_NAME;
      },
      /**
       * pops.panel的默认配置
       */
      get panelConfig() {
        return this.__panelConfig;
      },
      set panelConfig(value) {
        this.__panelConfig = value;
      },
      /** 菜单项的总值在本地数据配置的键名 */
      key: KEY,
      /** 菜单项在attributes上配置的菜单键 */
      attributeKeyName: ATTRIBUTE_KEY,
      /** 菜单项在attributes上配置的菜单默认值 */
      attributeDefaultValueName: ATTRIBUTE_DEFAULT_VALUE
    },
    init() {
      this.initContentDefaultValue();
      PanelMenu.init();
    },
    /** 判断是否是顶层窗口 */
    isTopWindow() {
      return _unsafeWindow.top === _unsafeWindow.self;
    },
    /** 初始化菜单项的默认值保存到本地数据中 */
    initContentDefaultValue() {
      const initDefaultValue = (config) => {
        if (!config.attributes) {
          return;
        }
        if (config.type === "button" || config.type === "forms" || config.type === "deepMenu") {
          return;
        }
        let menuDefaultConfig = /* @__PURE__ */ new Map();
        let key = config.attributes[ATTRIBUTE_KEY];
        if (key != null) {
          const defaultValue = config.attributes[ATTRIBUTE_DEFAULT_VALUE];
          menuDefaultConfig.set(key, defaultValue);
        }
        let moreMenuDefaultConfig = config.attributes[ATTRIBUTE_INIT_MORE_VALUE];
        if (typeof moreMenuDefaultConfig === "object" && moreMenuDefaultConfig) {
          Object.keys(moreMenuDefaultConfig).forEach((key2) => {
            menuDefaultConfig.set(key2, moreMenuDefaultConfig[key2]);
          });
        }
        if (!menuDefaultConfig.size) {
          log.warn(["请先配置键", config]);
          return;
        }
        let __attr_init__ = config.attributes[ATTRIBUTE_INIT];
        if (typeof __attr_init__ === "function") {
          let __attr_result__ = __attr_init__();
          if (typeof __attr_result__ === "boolean" && !__attr_result__) {
            return;
          }
        }
        if (config.type === "switch") {
          let disabled = typeof config.disabled === "function" ? config.disabled() : config.disabled;
          if (typeof disabled === "boolean" && disabled) {
            this.$data.contentConfigInitDisabledKeys.push(...menuDefaultConfig.keys());
          }
        }
        for (const [__key, __defaultValue] of menuDefaultConfig.entries()) {
          this.setDefaultValue(__key, __defaultValue);
        }
      };
      const loopInitDefaultValue = (configList) => {
        for (let index = 0; index < configList.length; index++) {
          let configItem = configList[index];
          initDefaultValue(configItem);
          let child_forms = configItem.forms;
          if (child_forms && Array.isArray(child_forms)) {
            loopInitDefaultValue(child_forms);
          }
        }
      };
      const contentConfigList = [...PanelContent.getAllContentConfig()];
      for (let index = 0; index < contentConfigList.length; index++) {
        let leftContentConfigItem = contentConfigList[index];
        if (!leftContentConfigItem.forms) {
          continue;
        }
        const rightContentConfigList = leftContentConfigItem.forms;
        if (rightContentConfigList && Array.isArray(rightContentConfigList)) {
          loopInitDefaultValue(rightContentConfigList);
        }
      }
      this.$data.contentConfigInitDisabledKeys = [...new Set(this.$data.contentConfigInitDisabledKeys)];
    },
    /**
     * 设置初始化使用的默认值
     * @param key 键
     * @param defaultValue 默认值
     */
    setDefaultValue(key, defaultValue) {
      if (this.$data.contentConfigInitDefaultValue.has(key)) {
        log.warn("请检查该key(已存在): " + key);
      }
      this.$data.contentConfigInitDefaultValue.set(key, defaultValue);
    },
    /**
     * 设置值
     * @param key 键
     * @param value 值
     */
    setValue(key, value) {
      PopsPanelStorageApi.set(key, value);
    },
    /**
     * 获取值
     * @param key 键
     * @param defaultValue 默认值
     */
    getValue(key, defaultValue) {
      let localValue = PopsPanelStorageApi.get(key);
      if (localValue == null) {
        if (this.$data.contentConfigInitDefaultValue.has(key)) {
          return this.$data.contentConfigInitDefaultValue.get(key);
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
      PopsPanelStorageApi.delete(key);
    },
    /**
     * 判断该键是否存在
     * @param key 键
     */
    hasKey(key) {
      return PopsPanelStorageApi.has(key);
    },
    /**
     * 监听调用setValue、deleteValue
     * @param key 需要监听的键
     * @param callback
     */
    addValueChangeListener(key, callback) {
      let listenerId = PopsPanelStorageApi.addValueChangeListener(key, (__key, __newValue, __oldValue) => {
        callback(key, __oldValue, __newValue);
      });
      return listenerId;
    },
    /**
     * 移除监听
     * @param listenerId 监听的id
     */
    removeValueChangeListener(listenerId) {
      PopsPanelStorageApi.removeValueChangeListener(listenerId);
    },
    /**
     * 主动触发菜单值改变的回调
     * @param key 菜单键
     * @param newValue 想要触发的新值，默认使用当前值
     * @param oldValue 想要触发的旧值，默认使用当前值
     */
    triggerMenuValueChange(key, newValue, oldValue) {
      PopsPanelStorageApi.triggerValueChangeListener(key, oldValue, newValue);
    },
    /**
     * 执行菜单
     *
     * @param queryKey 判断的键，如果是字符串列表，那么它们的判断处理方式是与关系
     * @param callback 执行的回调函数
     * @param checkExec 判断是否执行回调
     *
     * （默认）如果想要每个菜单是`与`关系，即每个菜单都判断为开启，那么就判断它们的值&就行
     *
     * 如果想要任意菜单存在true再执行，那么判断它们的值|就行
     *
     * + 返回值都为`true`，执行回调，如果回调返回了<style>元素，该元素会在监听到值改变时被移除掉
     * + 返回值有一个为`false`，则不执行回调，且移除之前回调函数返回的<style>元素
     * @param once 是否只执行一次，默认true
     *
     * + true （默认）只执行一次，且会监听键的值改变
     * + false 不会监听键的值改变
     */
    exec(queryKey, callback, checkExec, once = true) {
      const that = this;
      let queryKeyFn;
      if (typeof queryKey === "string" || Array.isArray(queryKey)) {
        queryKeyFn = () => queryKey;
      } else {
        queryKeyFn = queryKey;
      }
      let isArrayKey = false;
      let queryKeyResult = queryKeyFn();
      let keyList = [];
      if (Array.isArray(queryKeyResult)) {
        isArrayKey = true;
        keyList = queryKeyResult;
      } else {
        keyList.push(queryKeyResult);
      }
      let findNotInDataKey = keyList.find((it) => !this.$data.contentConfigInitDefaultValue.has(it));
      if (findNotInDataKey) {
        log.warn(`${findNotInDataKey} 键不存在`);
        return;
      }
      let storageKey = JSON.stringify(keyList);
      if (once) {
        if (this.$data.onceExecMenuData.has(storageKey)) {
          return;
        }
        this.$data.onceExecMenuData.set(storageKey, 1);
      }
      let storeValueList = [];
      let listenerIdList = [];
      let dynamicAddStyleNodeCallback = (value, $style) => {
        let dynamicResultList = [];
        if (!Array.isArray($style)) {
          $style = [$style];
        }
        $style.forEach(($styleItem) => {
          if ($styleItem == null) {
            return;
          }
          if ($styleItem instanceof HTMLStyleElement) {
            dynamicResultList.push($styleItem);
            return;
          }
        });
        {
          storeValueList = storeValueList.concat(dynamicResultList);
        }
      };
      let getMenuValue = (key) => {
        let value = this.getValue(key);
        return value;
      };
      let clearBeforeStoreValue = () => {
        for (let index = 0; index < storeValueList.length; index++) {
          let $css = storeValueList[index];
          $css.remove();
          storeValueList.splice(index, 1);
          index--;
        }
      };
      let checkMenuExec = () => {
        let flag = false;
        if (typeof checkExec === "function") {
          flag = checkExec(keyList);
        } else {
          flag = keyList.every((key) => getMenuValue(key));
        }
        return flag;
      };
      let valueChangeCallback = (valueOption) => {
        let execFlag = checkMenuExec();
        let resultList = [];
        if (execFlag) {
          let valueList = keyList.map((key) => this.getValue(key));
          let callbackResult = callback({
            value: isArrayKey ? valueList : valueList[0],
            addStyleElement: (...args) => {
              return dynamicAddStyleNodeCallback(true, ...args);
            }
          });
          if (!Array.isArray(callbackResult)) {
            callbackResult = [callbackResult];
          }
          callbackResult.forEach((it) => {
            if (it == null) {
              return;
            }
            if (it instanceof HTMLStyleElement) {
              resultList.push(it);
              return;
            }
          });
        }
        clearBeforeStoreValue();
        storeValueList = [...resultList];
      };
      once && keyList.forEach((key) => {
        let listenerId = this.addValueChangeListener(key, (key2, newValue, oldValue) => {
          valueChangeCallback();
        });
        listenerIdList.push(listenerId);
      });
      valueChangeCallback();
      let result = {
        /**
         * 清空菜单执行情况
         *
         * + 清空存储的元素列表
         * + 清空值改变的监听器
         * + 清空存储的一次执行的键
         */
        clear() {
          this.clearStoreStyleElements();
          this.removeValueChangeListener();
          once && that.$data.onceExecMenuData.delete(storageKey);
        },
        /**
         * 清空存储的元素列表
         */
        clearStoreStyleElements: () => {
          return clearBeforeStoreValue();
        },
        /**
         * 移除值改变的监听器
         */
        removeValueChangeListener: () => {
          listenerIdList.forEach((listenerId) => {
            this.removeValueChangeListener(listenerId);
          });
        }
      };
      return result;
    },
    /**
     * 自动判断菜单是否启用，然后执行回调
     * @param key 判断的键，如果是字符串列表，那么它们的判断处理方式是与关系
     * @param callback 回调
     * @param isReverse 逆反判断菜单启用，默认false
     * @param once 是否是只执行一次，默认false
     */
    execMenu(key, callback, isReverse = false, once = false) {
      return this.exec(
        key,
        (option) => {
          return callback(option);
        },
        (keyList) => {
          let execFlag = keyList.every((__key__) => {
            let flag = !!this.getValue(__key__);
            let disabled = Panel.$data.contentConfigInitDisabledKeys.includes(__key__);
            if (disabled) {
              flag = false;
              log.warn(`.execMenu${once ? "Once" : ""} ${__key__} 被禁用`);
            }
            isReverse && (flag = !flag);
            return flag;
          });
          return execFlag;
        },
        once
      );
    },
    /**
     * 自动判断菜单是否启用，然后执行回调，只会执行一次
     *
     * 它会自动监听值改变（设置中的修改），改变后如果未执行，则执行一次
     * @param key 判断的键，如果是字符串列表，那么它们的判断处理方式是与关系
     * @param callback 回调
     * @param isReverse 逆反判断菜单启用，默认false
     */
    execMenuOnce(key, callback, isReverse = false) {
      return this.execMenu(key, callback, isReverse, true);
    },
    /**
     * 移除已执行的仅执行一次的菜单
     * + .exec
     * + .execMenu
     * + .execMenuOnce
     * @param key 键
     */
    deleteExecMenuOnce(key) {
      this.$data.onceExecMenuData.delete(key);
      let flag = PopsPanelStorageApi.removeValueChangeListener(key);
      return flag;
    },
    /**
     * 根据key执行一次，该key不会和execMenu|exec|execMenuOnce已执行的key冲突
     * @param key 键
     * @param callback 回调
     */
    onceExec(key, callback) {
      key = this.transformKey(key);
      if (typeof key !== "string") {
        throw new TypeError("key 必须是字符串");
      }
      if (this.$data.onceExecData.has(key)) {
        return;
      }
      callback();
      this.$data.onceExecData.set(key, 1);
    },
    /**
     * 移除已执行的仅执行一次的菜单
     * + .onceExec
     * @param key 键
     */
    deleteOnceExec(key) {
      key = this.transformKey(key);
      this.$data.onceExecData.delete(key);
    },
    /**
     * 显示设置面板
     * @param content 显示的内容配置
     * @param [title] 标题
     * @param [preventDefaultContentConfig=false] 是否阻止默认添加内容配置（版本号），默认false
     * @param [preventRegisterSearchPlugin=false] 是否阻止默认添加搜索组件，默认false
     */
    showPanel(content, title = `${SCRIPT_NAME}-设置`, preventDefaultContentConfig = false, preventRegisterSearchPlugin = false) {
      this.$data.$panel = null;
      this.$data.panelContent = [];
      let checkHasBottomVersionContentConfig = content.findIndex((it) => {
        let isBottom = typeof it.isBottom === "function" ? it.isBottom() : Boolean(it.isBottom);
        return isBottom && it.id === "script-version";
      }) !== -1;
      if (!preventDefaultContentConfig && !checkHasBottomVersionContentConfig) {
        content.push(...PanelContent.getDefaultBottomContentConfig());
      }
      let $panel = __pops.panel({
        ...{
          title: {
            text: title,
            position: "center",
            html: false,
            style: ""
          },
          content,
          btn: {
            close: {
              enable: true,
              callback: (details, event) => {
                details.close();
                this.$data.$panel = null;
              }
            }
          },
          mask: {
            enable: true,
            clickEvent: {
              toClose: true,
              toHide: false
            },
            clickCallBack: (originalRun, config) => {
              originalRun();
              this.$data.$panel = null;
            }
          },
          width: PanelUISize.setting.width,
          height: PanelUISize.setting.height,
          drag: true,
          only: true
        },
        ...this.$data.panelConfig
      });
      this.$data.$panel = $panel;
      this.$data.panelContent = content;
      if (!preventRegisterSearchPlugin) {
        this.registerConfigSearch({ $panel, content });
      }
    },
    /**
     * 注册设置面板的搜索功能（双击左侧选项第一个）
     * @param config 配置项
     */
    registerConfigSearch(config) {
      const { $panel, content } = config;
      let asyncQueryProperty = async (target, handler) => {
        if (target == null) {
          return;
        }
        let handleResult = await handler(target);
        if (handleResult && typeof handleResult.isFind === "boolean" && handleResult.isFind) {
          return handleResult.data;
        }
        return await asyncQueryProperty(handleResult.data, handler);
      };
      let scrollToElementAndListen = ($el, callback) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                callback?.();
                observer.disconnect();
              }
            });
          },
          {
            root: null,
            // 使用视口作为根
            threshold: 1
            // 元素完全进入视口时触发
          }
        );
        observer.observe($el);
        $el.scrollIntoView({ behavior: "smooth", block: "center" });
      };
      let addFlashingClass = ($el) => {
        const flashingClassName = "pops-flashing";
        domUtils.animationend($el, () => {
          $el.classList.remove(flashingClassName);
        });
        $el.classList.add(flashingClassName);
      };
      let dbclick_event = (evt, selectorTarget) => {
        utils.preventEvent(evt);
        let $alert = __pops.alert({
          title: {
            text: "搜索配置",
            position: "center"
          },
          content: {
            text: (
              /*html*/
              `
						<div class="search-wrapper">
							<input class="search-config-text" name="search-config" type="text" placeholder="请输入需要搜素的配置名称">
						</div>
						<div class="search-result-wrapper"></div>
					`
            ),
            html: true
          },
          btn: {
            ok: { enable: false }
          },
          mask: {
            clickEvent: {
              toClose: true
            }
          },
          width: PanelUISize.settingMiddle.width,
          height: "auto",
          drag: true,
          style: (
            /*css*/
            `
					${__pops.config.cssText.panelCSS}

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
						font-size: 0.8rem;
						color: #6c6c6c;
					}
					${config.searchDialogStyle ?? ""}
				`
          )
        });
        $alert.$shadowRoot.querySelector(".search-wrapper");
        let $searchInput = $alert.$shadowRoot.querySelector(".search-config-text");
        let $searchResultWrapper = $alert.$shadowRoot.querySelector(".search-result-wrapper");
        $searchInput.focus();
        let clearSearchResult = () => {
          domUtils.empty($searchResultWrapper);
        };
        let createSearchResultItem = (pathInfo) => {
          const searchPath = utils.queryProperty(pathInfo, (target) => {
            if (target?.next) {
              return {
                isFind: false,
                data: target.next
              };
            } else {
              return {
                isFind: true,
                data: target
              };
            }
          });
          let $item = domUtils.createElement("div", {
            className: "search-result-item",
            innerHTML: (
              /*html*/
              `
							<div class="search-result-item-path">${searchPath.matchedData?.path}</div>
							<div class="search-result-item-description">${searchPath.matchedData?.description ?? ""}</div>
						`
            )
          });
          domUtils.on($item, "click", (clickItemEvent) => {
            let $asideItems = $panel.$shadowRoot.querySelectorAll(
              "aside.pops-panel-aside .pops-panel-aside-top-container li"
            );
            let $targetAsideItem = $asideItems[pathInfo.index];
            if (!$targetAsideItem) {
              Qmsg.error(`左侧项下标${pathInfo.index}不存在`);
              return;
            }
            $targetAsideItem.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
            $targetAsideItem.click();
            asyncQueryProperty(pathInfo.next, async (target) => {
              if (target?.next) {
                let $findDeepMenu = await utils.waitNode(() => {
                  return Array.from(
                    $panel.$shadowRoot.querySelectorAll(".pops-panel-deepMenu-nav-item")
                  ).find(($deepMenu) => {
                    const __formConfig__ = Reflect.get($deepMenu, "__formConfig__");
                    return typeof __formConfig__ === "object" && __formConfig__ != null && __formConfig__.text === target.name;
                  });
                }, 2500);
                if ($findDeepMenu) {
                  $findDeepMenu.click();
                } else {
                  Qmsg.error("未找到对应的二级菜单");
                  return {
                    isFind: true,
                    data: target
                  };
                }
                return {
                  isFind: false,
                  data: target.next
                };
              } else {
                let $findTargetMenu = await utils.waitNode(() => {
                  return Array.from(
                    $panel.$shadowRoot.querySelectorAll(`li:not(.pops-panel-deepMenu-nav-item)`)
                  ).find(($menuItem) => {
                    const __formConfig__ = Reflect.get($menuItem, "__formConfig__");
                    return __formConfig__ === target.matchedData?.formConfig;
                  });
                }, 2500);
                if ($findTargetMenu) {
                  scrollToElementAndListen($findTargetMenu);
                  let $fold = $findTargetMenu.closest(`.pops-panel-forms-fold[data-fold-enable]`);
                  if ($fold) {
                    let $foldWrapper = $fold.querySelector(".pops-panel-forms-fold-container");
                    $foldWrapper.click();
                    await utils.sleep(500);
                  }
                  scrollToElementAndListen($findTargetMenu, () => {
                    addFlashingClass($findTargetMenu);
                  });
                } else {
                  Qmsg.error("未找到对应的菜单项");
                }
                return {
                  isFind: true,
                  data: target
                };
              }
            });
          });
          return $item;
        };
        let execSearch = (searchText) => {
          const searchTextRegExp = new RegExp(searchText, "i");
          const searchConfigResult = [];
          const loopContentConfig = (configList, path) => {
            for (let index = 0; index < configList.length; index++) {
              const configItem = configList[index];
              let child_forms = configItem.forms;
              if (child_forms && Array.isArray(child_forms)) {
                const deepMenuPath = utils.deepClone(path);
                if (configItem.type === "deepMenu") {
                  const deepNext = utils.queryProperty(deepMenuPath, (target) => {
                    if (target?.next) {
                      return {
                        isFind: false,
                        data: target.next
                      };
                    } else {
                      return {
                        isFind: true,
                        data: target
                      };
                    }
                  });
                  deepNext.next = {
                    name: configItem.text
                  };
                }
                loopContentConfig(child_forms, deepMenuPath);
              } else {
                let text = Reflect.get(configItem, "text");
                let description = Reflect.get(configItem, "description");
                const delayMatchedTextList = [text, description];
                let matchedIndex = delayMatchedTextList.findIndex((configText) => {
                  if (typeof configText !== "string") {
                    return;
                  }
                  return configText.match(searchTextRegExp);
                });
                if (matchedIndex !== -1) {
                  const matchedPath = utils.deepClone(path);
                  const deepNext = utils.queryProperty(matchedPath, (target) => {
                    if (target?.next) {
                      return {
                        isFind: false,
                        data: target.next
                      };
                    } else {
                      return {
                        isFind: true,
                        data: target
                      };
                    }
                  });
                  deepNext.next = {
                    name: text,
                    matchedData: {
                      path: "",
                      formConfig: configItem,
                      matchedText: delayMatchedTextList[matchedIndex],
                      description
                    }
                  };
                  const pathList = [];
                  utils.queryProperty(matchedPath, (target) => {
                    const name = target?.name;
                    if (typeof name === "string" && name.trim() !== "") {
                      pathList.push(name);
                    }
                    if (target?.next) {
                      return {
                        isFind: false,
                        data: target.next
                      };
                    } else {
                      return {
                        isFind: true,
                        data: target
                      };
                    }
                  });
                  const pathStr = pathList.join(CommonUtil.escapeHtml(" - "));
                  deepNext.next.matchedData.path = pathStr;
                  searchConfigResult.push(matchedPath);
                }
              }
            }
          };
          for (let index = 0; index < content.length; index++) {
            const leftContentConfigItem = content[index];
            if (!leftContentConfigItem.forms) {
              continue;
            }
            if (leftContentConfigItem.isBottom && leftContentConfigItem.id === "script-version") {
              continue;
            }
            const rightContentConfigList = leftContentConfigItem.forms;
            if (rightContentConfigList && Array.isArray(rightContentConfigList)) {
              let text = leftContentConfigItem.title;
              if (typeof text === "function") {
                text = text();
              }
              loopContentConfig(rightContentConfigList, {
                index,
                name: text
              });
            }
          }
          let fragment = document.createDocumentFragment();
          for (const pathInfo of searchConfigResult) {
            let $resultItem = createSearchResultItem(pathInfo);
            fragment.appendChild($resultItem);
          }
          clearSearchResult();
          $searchResultWrapper.append(fragment);
        };
        domUtils.on(
          $searchInput,
          "input",
          utils.debounce((evt2) => {
            utils.preventEvent(evt2);
            let searchText = domUtils.val($searchInput).trim();
            if (searchText === "") {
              clearSearchResult();
              return;
            }
            execSearch(searchText);
          }, 200)
        );
      };
      let clickElement = null;
      let isDoubleClick = false;
      let timer = void 0;
      domUtils.on(
        $panel.$shadowRoot,
        "dblclick",
        `aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`,
        dbclick_event
      );
      domUtils.on(
        $panel.$shadowRoot,
        "touchend",
        `aside.pops-panel-aside .pops-panel-aside-item:not(#script-version)`,
        (evt, selectorTarget) => {
          clearTimeout(timer);
          timer = void 0;
          if (isDoubleClick && clickElement === selectorTarget) {
            isDoubleClick = false;
            dbclick_event(evt);
          } else {
            timer = setTimeout(() => {
              isDoubleClick = false;
            }, 200);
            clickElement = selectorTarget;
            isDoubleClick = true;
          }
        },
        {
          capture: true
        }
      );
      $panel.$shadowRoot.appendChild(
        domUtils.createElement("style", {
          type: "text/css",
          textContent: (
            /*css*/
            `
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
				`
          )
        })
      );
    },
    /**
     * 把key:string[]转为string
     */
    transformKey(key) {
      if (Array.isArray(key)) {
        const keyArray = key.sort();
        return JSON.stringify(keyArray);
      } else {
        return key;
      }
    }
  };
  const blockAdsCSS$1 = "/* 底部中间的 登录/注册按钮 */\r\n#app div.main-wrap div.login-box,\r\n/* 主内容底部的小程序横幅推荐 */\r\n#app > div.lite-page-wrap > div > div.main > div > div.wrap,\r\n/* 底部悬浮的在微博内打开 */\r\n#app .woo-frame.blog-config-page div.weibo-btn-box,\r\n/* 顶部的新闻信息流 */\r\n#app .woo-frame div.woo-panel-container.news-banner,\r\n/* 夹杂在card中间的图片横幅，不确定是否会误伤其它正常内容 */\r\n.card .card-main .m-img-box > ul {\r\n	display: none !important;\r\n}\r\n/* 搜索域名下的 */\r\n.card.m-panel:has(+ .simple),\r\n.card.m-panel.simple {\r\n	display: none !important;\r\n}\r\n";
  const WeiBoNetWorkHook = {
    _ajaxHooker_: null,
    get ajaxHooker() {
      if (this._ajaxHooker_ == null) {
        log.info("启用ajaxHooker拦截网络");
        this._ajaxHooker_ = utils.ajaxHooker();
        this._ajaxHooker_.protect();
      }
      return this._ajaxHooker_;
    }
  };
  const VueUtils = {
    /**
     * 获取vue2实例
     * @param $el
     */
    getVue($el) {
      if ($el == null) {
        return;
      }
      return $el["__vue__"] || $el["__Ivue__"] || $el["__IVue__"];
    },
    /**
     * 获取vue3实例
     * @param $el
     */
    getVue3($el) {
      if ($el == null) {
        return;
      }
      return $el["__vueParentComponent"];
    },
    /**
     * 等待vue属性并进行设置
     * @param $el 目标对象
     * @param checkOption 需要设置的配置
     */
    waitVuePropToSet($el, checkOption) {
      if (!Array.isArray(checkOption)) {
        checkOption = [checkOption];
      }
      function getTarget() {
        let __target__ = null;
        if (typeof $el === "string") {
          __target__ = domUtils.selector($el);
        } else if (typeof $el === "function") {
          __target__ = $el();
        } else if ($el instanceof HTMLElement) {
          __target__ = $el;
        }
        return __target__;
      }
      checkOption.forEach((needSetOption) => {
        if (typeof needSetOption.msg === "string") {
          log.info(needSetOption.msg);
        }
        function checkTarget() {
          let $targetEl = getTarget();
          if ($targetEl == null) {
            return {
              status: false,
              isTimeout: true,
              inst: null,
              $el: $targetEl
            };
          }
          let vueInst = VueUtils.getVue($targetEl);
          if (vueInst == null) {
            return {
              status: false,
              isTimeout: false,
              inst: null,
              $el: $targetEl
            };
          }
          let checkResult = needSetOption.check(vueInst, $targetEl);
          checkResult = Boolean(checkResult);
          return {
            status: checkResult,
            isTimeout: false,
            inst: vueInst,
            $el: $targetEl
          };
        }
        utils.waitVueByInterval(
          () => {
            return getTarget();
          },
          () => checkTarget().status,
          250,
          1e4
        ).then((result) => {
          let checkTargetResult = checkTarget();
          if (checkTargetResult.status) {
            let vueInst = checkTargetResult.inst;
            needSetOption.set(vueInst, checkTargetResult.$el);
          } else {
            if (typeof needSetOption.failWait === "function") {
              needSetOption.failWait(checkTargetResult.isTimeout);
            }
          }
        });
      });
    },
    /**
     * 观察vue属性的变化
     * @param $el 目标对象
     * @param key 需要观察的属性
     * @param callback 监听回调
     * @param watchConfig 监听配置
     * @param failWait 当检测失败/超时触发该回调
     */
    watchVuePropChange($el, key, callback, watchConfig, failWait) {
      let config = utils.assign(
        {
          immediate: true,
          deep: false
        },
        watchConfig || {}
      );
      return new Promise((resolve) => {
        VueUtils.waitVuePropToSet($el, {
          check(vueInstance) {
            return typeof vueInstance?.$watch === "function";
          },
          set(vueInstance) {
            let removeWatch = null;
            if (typeof key === "function") {
              removeWatch = vueInstance.$watch(
                () => {
                  return key(vueInstance);
                },
                (newValue, oldValue) => {
                  callback(vueInstance, newValue, oldValue);
                },
                config
              );
            } else {
              removeWatch = vueInstance.$watch(
                key,
                (newValue, oldValue) => {
                  callback(vueInstance, newValue, oldValue);
                },
                config
              );
            }
            resolve(removeWatch);
          },
          failWait
        });
      });
    },
    /**
     * 前往网址
     * @param $el 包含vue属性的元素
     * @param path 需要跳转的路径
     * @param [useRouter=false] 是否强制使用Vue的Router来进行跳转，默认false
     */
    goToUrl($el, path, useRouter = false) {
      if ($el == null) {
        Qmsg.error("跳转Url: $vueNode为空");
        log.error("跳转Url: $vueNode为空：" + path);
        return;
      }
      let vueInstance = VueUtils.getVue($el);
      if (vueInstance == null) {
        Qmsg.error("获取vue属性失败", { consoleLogContent: true });
        return;
      }
      let $router = vueInstance.$router;
      let isBlank = true;
      log.info("即将跳转URL：" + path);
      if (useRouter) {
        isBlank = false;
      }
      if (isBlank) {
        window.open(path, "_blank");
      } else {
        if (path.startsWith("http") || path.startsWith("//")) {
          if (path.startsWith("//")) {
            path = window.location.protocol + path;
          }
          let urlObj = new URL(path);
          if (urlObj.origin === window.location.origin) {
            path = urlObj.pathname + urlObj.search + urlObj.hash;
          } else {
            log.info("不同域名，直接本页打开，不用Router：" + path);
            window.location.href = path;
            return;
          }
        }
        log.info("$router push跳转Url：" + path);
        $router.push(path);
      }
    },
    /**
     * 手势返回
     * @param option 配置
     */
    hookGestureReturnByVueRouter(option) {
      function popstateEvent() {
        log.success("触发popstate事件");
        resumeBack(true);
      }
      function banBack() {
        log.success("监听地址改变");
        option.vueInst.$router.history.push(option.hash);
        domUtils.on(_unsafeWindow, "popstate", popstateEvent);
      }
      async function resumeBack(isFromPopState = false) {
        domUtils.off(_unsafeWindow, "popstate", popstateEvent);
        let callbackResult = option.callback(isFromPopState);
        if (callbackResult) {
          return;
        }
        while (1) {
          if (option.vueInst.$router.history.current.hash === option.hash) {
            log.info("后退！");
            option.vueInst.$router.back();
            await utils.sleep(250);
          } else {
            return;
          }
        }
      }
      banBack();
      return {
        resumeBack
      };
    }
  };
  const WeiBoHook = {
    /**
     * 劫持Function.prototype.apply;
     */
    hookApply() {
      log.info("劫持Function.prototype.apply");
      let originApply = _unsafeWindow.Function.prototype.apply;
      _unsafeWindow.Function.prototype.apply = function(...args) {
        let target = originApply;
        if (args.length !== 2 || args.length === 2 && !Array.isArray(args[1]) || typeof args[1][0] !== "string") {
          return Reflect.apply(target, this, args);
        }
        const ApiPath = args[1][0];
        const ApiSearchParams = args[1]?.[1]?.["params"];
        if (ApiPath === "api/attitudes/create" && Panel.getValue("weibo_apply_attitudes_create")) {
          log.success("拦截跳转登录");
          return new Promise((resolve) => {
            resolve({
              data: {}
            });
          });
        } else if (ApiPath === "api/likes/update" && Panel.getValue("weibo_apply_likes_update")) {
          log.success("拦截点赞跳转登录");
          return new Promise((resolve) => {
            resolve({
              data: {}
            });
          });
        } else if (ApiPath === "api/comments/create" && Panel.getValue("weibo_apply_comments_create")) {
          log.success("拦截评论跳转登录");
          return new Promise((resolve) => {
            resolve({
              data: {}
            });
          });
        } else if (ApiPath === "api/friendships/create" && Panel.getValue("weibo_apply_friendships_create")) {
          log.success("拦截关注跳转登录");
          return new Promise((resolve) => {
            resolve({
              data: {}
            });
          });
        } else if (ApiPath === "api/comments/reply" && Panel.getValue("weibo_apply_comments_reply")) {
          log.success("拦截回复跳转登录");
          return new Promise((resolve, reject) => {
            resolve({
              data: {
                ok: 200
              }
            });
          });
        } else if (ApiPath.startsWith("profile/info") && Panel.getValue("weibo_apply_profile_info")) {
          log.success("优化跳转xx微博主页", ApiSearchParams);
          let uidHomeUrl = `https://weibo.com/${ApiSearchParams["uid"]}`;
          log.success("跳转微博主页：" + uidHomeUrl);
          window.location.href = uidHomeUrl;
          return null;
        } else if (ApiPath === "comments/hotflow" && Panel.getValue("weibo_apply_comments_hotflow")) {
          if (!("id" in ApiSearchParams && "max_id_type" in ApiSearchParams && "mid" in ApiSearchParams) || "id" in ApiSearchParams && "max_id" in ApiSearchParams && "max_id_type" in ApiSearchParams && "mid" in ApiSearchParams) {
            log.success("拦截下拉加载更多评论跳转登录", ApiSearchParams);
            return new Promise((resolve) => {
              resolve({
                ok: 1,
                data: {
                  data: [],
                  total_number: 0
                }
              });
            });
          }
        } else if (ApiPath === "comments/hotFlowChild" && Panel.getValue("weibo_apply_comments_hotFlowChild")) {
          if ("max_id" in ApiSearchParams && ApiSearchParams["max_id"] !== 0) {
            log.success(
              "拦截评论中的评论下拉加载更多评论跳转登录",
              ApiSearchParams
            );
            return new Promise((resolve) => {
              resolve({
                data: {
                  ok: 1,
                  data: [],
                  rootComment: [],
                  total_number: 0
                }
              });
            });
          }
        } else if (ApiPath === "api/statuses/repostTimeline" && Panel.getValue("weibo_apply_statuses_repostTimeline")) {
          log.success("拦截查看转发数据，因为需登录", ApiSearchParams);
          return new Promise((resolve) => {
            resolve({
              data: {
                ok: 1,
                data: {
                  data: [],
                  total_number: 0
                }
              }
            });
          });
        } else ;
        return Reflect.apply(target, this, args);
      };
    },
    /**
     * 拦截网络
     */
    hookNetWork() {
      WeiBoNetWorkHook.ajaxHooker.hook(function(request) {
        let requestUrl = CommonUtil.fixUrl(request.url);
        log.info("[ajaxHookr] " + requestUrl);
        if (requestUrl.startsWith("https://m.weibo.cn/api/config") && Panel.getValue("weibo_request_api_config")) {
          request.response = function(originResponse) {
            let originResponseData = utils.toJSON(originResponse.responseText);
            if (!originResponseData.data.login) {
              log.error("由于未登录，伪装为已登录状态");
              originResponseData.data.login = true;
              originResponseData.data.uid = "";
              originResponseData.preferQuickapp = 0;
              Reflect.deleteProperty(originResponseData.data, "loginUrl");
              Reflect.deleteProperty(originResponseData.data, "wx_callback");
              Reflect.deleteProperty(originResponseData.data, "wx_authorize");
              Reflect.deleteProperty(
                originResponseData.data,
                "passport_login_url"
              );
              originResponse.responseText = JSON.stringify(originResponseData);
            }
          };
        } else if (requestUrl.startsWith("https://m.weibo.cn/comments/hot") && Panel.getValue("weibo_request_comments_hot")) {
          request.response = function(originResponse) {
            let originResponseData = utils.toJSON(originResponse.responseText);
            if (originResponseData.ok !== 1) {
              log.error("由于尚未登录，获取不到更多评论数据", originResponseData);
              originResponseData = {
                ok: 1
              };
              originResponse.responseText = JSON.stringify(originResponseData);
            }
          };
        } else if (requestUrl.startsWith("https://m.weibo.cn/status/push?") && Panel.getValue("weibo_request_status_push")) {
          request.response = function(originResponse) {
            let originResponseData = utils.toJSON(originResponse.responseText);
            Reflect.set(originResponse, "json", {});
            log.info(`重构/status/push响应`, originResponseData);
            originResponse.responseText = JSON.stringify(originResponseData);
          };
        } else if (requestUrl.startsWith("https://m.weibo.cn/api/container/getIndex") && Panel.getValue("weibo-request-blockArticleAds")) {
          request.response = function(originResponse) {
            let originResponseData = utils.toJSON(originResponse.responseText);
            let cards = originResponseData["data"]["cards"];
            if (Array.isArray(cards)) {
              for (let index = 0; index < cards.length; index++) {
                const card = cards[index];
                let mblog = card?.mblog;
                if (mblog) {
                  let id = mblog.id;
                  let ad_state = mblog?.ad_state;
                  let cardText = mblog?.text;
                  mblog?.page_info?.page_title;
                  if (ad_state) {
                    cards.splice(index, 1);
                    index--;
                    log.info(`移除广告url：https://m.weibo.cn/detail/` + id);
                    log.info(`移除广告card：` + cardText);
                  }
                }
              }
            }
            originResponse.responseText = JSON.stringify(originResponseData);
          };
        }
      });
    },
    /**
     * 劫持webpack
     * @param webpackName 当前全局变量的webpack名
     * @param mainCoreData 需要劫持的webpack的顶部core，例如：(window.webpackJsonp = window.webpackJsonp || []).push([["core:0"],{}])
     * @param checkCallBack 如果mainCoreData匹配上，则调用此回调函数
     */
    hookWebpack(webpackName = "webpackJsonp", mainCoreData, checkCallBack) {
      let originObject = void 0;
      Object.defineProperty(_unsafeWindow, webpackName, {
        get() {
          return originObject;
        },
        set(newValue) {
          log.success("成功劫持webpack，当前webpack名：" + webpackName);
          originObject = newValue;
          const originPush = originObject.push;
          originObject.push = function(...args) {
            let _mainCoreData = args[0][0];
            if (mainCoreData == _mainCoreData || Array.isArray(mainCoreData) && Array.isArray(_mainCoreData) && JSON.stringify(mainCoreData) === JSON.stringify(_mainCoreData)) {
              Object.keys(args[0][1]).forEach((keyName) => {
                let originSwitchFunc = args[0][1][keyName];
                args[0][1][keyName] = function(..._args) {
                  let result = originSwitchFunc.call(this, ..._args);
                  _args[0] = checkCallBack(_args[0]);
                  return result;
                };
              });
            }
            return originPush.call(this, ...args);
          };
        }
      });
    },
    /**
     * 拦截Vue Router跳转
     */
    hookVueRouter() {
      VueUtils.waitVuePropToSet("#app", [
        {
          msg: "等待获取属性 __vue__.$router",
          check(vueIns) {
            return typeof vueIns?.$router?.push === "function";
          },
          set(vueIns) {
            log.success("拦截Vue路由跳转");
            let beforeEachFn = (to, from, next) => {
              if (to.name === "profile") {
                if (Panel.getValue("weibo_router_profile_to_user_home")) {
                  let uid = to?.params?.uid;
                  if (uid == null) {
                    log.error("获取uid失败");
                    Qmsg.error("获取uid失败");
                    return;
                  }
                  log.success(`修复跳转${uid}微博主页`);
                  let uidHomeUrl = `https://m.weibo.cn/u/${uid}`;
                  window.location.href = uidHomeUrl;
                  return;
                }
              } else if (to?.name === "detail") ;
              next();
            };
            vueIns.$router.beforeEach(beforeEachFn);
            vueIns.$router.afterEach((to, from) => {
              Panel.execMenu("weibo-listenRouterChange", () => {
                log.info("路由更新，重载功能");
                WeiBo.init();
              });
            });
            let ownHookIndex = vueIns.$router.beforeHooks.findIndex(
              (item) => item == beforeEachFn
            );
            if (ownHookIndex !== -1) {
              let ownHook = vueIns.$router.beforeHooks.splice(ownHookIndex, 1);
              vueIns.$router.beforeHooks.splice(0, 0, ...ownHook);
            } else {
              log.error("$router未在beforeHooks内找到自定义的beforeEach");
            }
          }
        }
      ]);
    },
    /**
     * 禁止Service Worker注册
     */
    hookServiceWorkerRegister() {
      log.info("hook => navigator.serviceWorker.register");
      _unsafeWindow.Object.defineProperty(
        _unsafeWindow.navigator.serviceWorker,
        "register",
        {
          get() {
            return function(...args) {
              log.success("劫持navigator.serviceWorker.register: ", args);
            };
          }
        }
      );
    }
  };
  const WeiBoRouter = {
    /**
     * 移动端微博
     * @returns
     */
    isMWeiBo() {
      return window.location.hostname === "m.weibo.cn";
    },
    /**
     * 移动端微博-首页
     */
    isMWeiBoHome() {
      return this.isMWeiBo() && window.location.pathname === "/";
    },
    /**
     * 移动端微博-微博正文
     */
    isMWeiBo_detail() {
      return this.isMWeiBo() && window.location.pathname.startsWith("/detail/");
    },
    /**
     * 移动端微博-微博正文
     */
    isMWeiBo_status() {
      return this.isMWeiBo() && window.location.pathname.startsWith("/status/");
    },
    /**
     * 移动端微博-用户主页
     */
    isMWeiBo_userHome() {
      return this.isMWeiBo() && window.location.pathname.startsWith("/u/");
    },
    /**
     * 移动端微博-搜索
     */
    isMWeiBo_search() {
      return this.isMWeiBo() && window.location.pathname.startsWith("/search");
    },
    /**
     * 移动端微博-微博热搜
     */
    isMWeiBo_HotSearch() {
      let searchParams = new URLSearchParams(globalThis.location.search);
      let containerid = searchParams.get("containerid");
      return this.isMWeiBo() && window.location.pathname.startsWith("/p/index") && typeof containerid === "string" && containerid.startsWith("106003");
    },
    /**
     * 话题
     */
    isHuaTi() {
      return window.location.hostname === "huati.weibo.cn";
    },
    /**
     * 视频页
     */
    isVideo() {
      return window.location.hostname === "h5.video.weibo.com";
    },
    /**
     * 头条
     */
    isCard() {
      return window.location.hostname === "card.weibo.com";
    },
    /**
     * 头条文章
     */
    isCardArticle() {
      return this.isCard() && window.location.pathname.startsWith("/article/");
    },
    /**
     * 微博直播页面
     */
    isLive() {
      return window.location.hostname === "weibo.com" && window.location.pathname.startsWith("/l/wblive/m/show/");
    }
  };
  const WeiBoHuaTi = {
    init() {
      Panel.execMenu("huati_weibo_masquerade_weibo_client_app", () => {
        this.isWeibo();
      });
      Panel.execMenuOnce(
        "huati_weibo_get_more_celebrity_calendar_information",
        () => {
          this.hookNetWorkWithGetMoreCelebrityCalendarInformation();
        }
      );
    },
    /**
     * 伪装微博
     */
    isWeibo() {
      log.info("伪装微博");
      VueUtils.waitVuePropToSet("#loadMore", [
        {
          msg: "等待设置属性 __vue__.isWeibo",
          check(vueObj) {
            return typeof vueObj.isWeibo === "boolean";
          },
          set(vueObj) {
            vueObj.isWeibo = true;
            log.success("成功设置属性 __vue__.isWeibo=true");
          }
        }
      ]);
    },
    /**
     * 劫持请求让获取更多名人日历信息
     */
    hookNetWorkWithGetMoreCelebrityCalendarInformation() {
      WeiBoNetWorkHook.ajaxHooker.hook((request) => {
        log.info("ajaxHookr: ", request.url);
        if (!request.url.startsWith("/ajax/super/starschedule?")) {
          return;
        }
        request.response = async (res) => {
          let getResp = await httpx.get(request.url, {
            headers: {
              Host: globalThis.location.hostname,
              Accept: "application/json, text/plain, */*",
              "X-Requested-With": "XMLHttpRequest",
              "sec-ch-ua-mobile": "?1",
              "User-Agent": utils.getRandomAndroidUA() + " Weibo (__weibo__)",
              "sec-ch-ua-platform": "Android",
              "Sec-Fetch-Site": "same-origin",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Dest": "empty",
              Referer: globalThis.location.href,
              "Accept-Encoding": "gzip, deflate, br",
              "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            }
          });
          res.response = getResp.data.responseText;
          res.responseText = getResp.data.responseText;
        };
      });
    }
  };
  const WeiBoVideoHook = {
    init() {
      this.hookWebpack();
    },
    /**
     * 劫持webpack
     */
    hookWebpack() {
      log.info("劫持webpack");
      WeiBoHook.hookWebpack("webpackJsonp", "chunk-common", (webpackExports) => {
        if (typeof webpackExports?.exports === "object" && typeof webpackExports.exports["a"] === "object" && typeof webpackExports.exports["a"]["gotoApp"] === "function" && Panel.getValue("weibo_video_webpack_gotoApp")) {
          log.success("成功劫持webpack调用函数", webpackExports);
          webpackExports.exports["a"]["gotoApp"] = function(...args) {
            log.info("阻止唤醒App：", args);
          };
          return webpackExports;
        }
      });
    }
  };
  const WeiBoVideo = {
    init() {
      Panel.onceExec("weibo-video-init-hook", () => {
        WeiBoVideoHook.init();
      });
      Panel.execMenuOnce("weibo_video_shield_bottom_toolbar", () => {
        return this.shieldBottomToolBar();
      });
      Panel.execMenuOnce("weibo_video_shield_hot_comments", () => {
        return this.shieldHotComments();
      });
      Panel.execMenuOnce("weibo_video_shield_recommend", () => {
        return this.shieldRecommend();
      });
    },
    /** 【屏蔽】底部工具栏 */
    shieldBottomToolBar() {
      log.info("【屏蔽】底部工具栏");
      return CommonUtil.addBlockCSS(".woo-toolBar");
    },
    /** 【屏蔽】相关推荐 */
    shieldRecommend() {
      log.info("【屏蔽】相关推荐");
      return CommonUtil.addBlockCSS(
        '#app .woo-panel[class*="Playdetail_card_"]:nth-child(2)'
      );
    },
    /** 【屏蔽】热门评论 */
    shieldHotComments() {
      log.info("【屏蔽】热门评论");
      return CommonUtil.addBlockCSS(
        '#app .woo-panel[class*="Playdetail_card_"]:nth-child(3)'
      );
    }
  };
  const blockAdsCSS = "/* 文章内容的底部的广告 */\r\n#app .ad-wrap {\r\n	display: none !important;\r\n}\r\n";
  const WeiBoDetail = {
    init() {
      Panel.onceExec("weibo-detail-blockAds", () => {
        return addStyle(blockAdsCSS);
      });
    },
    /**
     * 设置正文显示的时间为绝对时间
     */
    setArticleAbsoluteTime() {
      log.info(`监听并设置正文显示的时间为绝对时间`);
      utils.mutationObserver(document.documentElement, {
        config: {
          subtree: true,
          childList: true
        },
        immediate: true,
        callback: () => {
          function handleCardMainTime() {
            Array.from(
              $$(
                ".card.m-panel .m-text-cut .time:not([data-gm-absolute-time])"
              )
            ).forEach(($time) => {
              let $card = $time.closest(".card.m-panel");
              let cardVueIns = VueUtils.getVue($card);
              if (!cardVueIns) {
                return;
              }
              let createTime = cardVueIns?.item?.created_at;
              if (typeof createTime !== "string") {
                return;
              }
              if ($time.innerText.includes("编辑")) {
                return;
              }
              let createTimeObj = new Date(createTime);
              let formatCreateTime = utils.formatTime(
                createTimeObj,
                "yyyy-MM-dd HH:mm:ss"
              );
              $time.innerText = formatCreateTime;
              $time.setAttribute("data-gm-absolute-time", "true");
            });
          }
          function handleCardLzlTime() {
            let $litePageWrap = $(".lite-page-wrap");
            let litePageWrapVueIns = VueUtils.getVue($litePageWrap);
            if (litePageWrapVueIns) {
              let curWeiboData = litePageWrapVueIns?.curWeiboData;
              let $timeList = Array.from(
                $$(
                  ".lite-page-comment .card .card-main .m-box .time"
                )
              );
              if ($timeList.length === curWeiboData.commentLists.length + 1) {
                $timeList.forEach(($time, index) => {
                  if ($time.hasAttribute("data-gm-absolute-time")) {
                    return;
                  }
                  if (index === 0) {
                    let createTimeObj = new Date(
                      curWeiboData.rootComment.created_at
                    );
                    let formatCreateTime = utils.formatTime(
                      createTimeObj,
                      "yyyy-MM-dd HH:mm:ss"
                    );
                    $time.innerText = formatCreateTime;
                  } else {
                    let createTimeObj = new Date(
                      curWeiboData.commentLists[index - 1].created_at
                    );
                    let formatCreateTime = utils.formatTime(
                      createTimeObj,
                      "yyyy-MM-dd HH:mm:ss"
                    );
                    $time.innerText = formatCreateTime;
                  }
                  $time.setAttribute("data-gm-absolute-time", "true");
                });
              } else {
                if ($timeList.length !== 0) {
                  log.warn("楼中楼时间设置失败，数量不一致");
                }
              }
            }
          }
          function handleCardCommentTime() {
            Array.from(
              $$(
                ".comment-content .card .m-box .time:not([data-gm-absolute-time])"
              )
            ).forEach(($time) => {
              let $card = $time.closest(".card");
              let $cardParent = $card.parentElement;
              let cardVueIns = VueUtils.getVue($card) || VueUtils.getVue($cardParent);
              if (!cardVueIns) {
                return;
              }
              let createTime = cardVueIns?.item?.created_at;
              if (typeof createTime !== "string") {
                return;
              }
              let createTimeObj = new Date(createTime);
              let formatCreateTime = utils.formatTime(
                createTimeObj,
                "yyyy-MM-dd HH:mm:ss"
              );
              $time.innerText = `${formatCreateTime} ${cardVueIns?.item?.source || ""}`;
              $time.setAttribute("data-gm-absolute-time", "true");
            });
          }
          let searchParams = new URLSearchParams(window.location.search);
          if (WeiBoRouter.isMWeiBo_detail() || WeiBoRouter.isMWeiBo_status()) {
            if (searchParams.has("cid")) {
              handleCardLzlTime();
            } else {
              handleCardMainTime();
              handleCardCommentTime();
            }
          } else {
            handleCardMainTime();
          }
        }
      });
    }
  };
  const WeiBoSearch = {
    init() {
      Panel.execMenuOnce("weibo-search-addOpenBlankBtn", () => {
        this.addOpenBlankBtn();
      });
      domUtils.ready(() => {
        Panel.execMenu("weibo-search-autoFocusSearchInput", () => {
          this.autoFocusSearchInput();
        });
      });
    },
    /**
     * 自动聚焦搜索框
     */
    autoFocusSearchInput() {
      log.info(`自动聚焦搜索框`);
      utils.waitNode(`.ntop-nav input[type="search"]`).then(($input) => {
        if (!$input) {
          log.error("未找到搜索框");
          Qmsg.error("未找到搜索框");
          return;
        }
        let searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.has("containerid")) {
          log.warn("不存在containerid参数");
          return;
        }
        let containeridSearchParams = new URLSearchParams(
          searchParams.get("containerid")
        );
        if (containeridSearchParams.has("q")) {
          log.warn("containerid参数中存在q参数，是搜索结果页面");
          return;
        }
        log.success(
          "containerid参数中不存在q参数，所以是主搜索页面，聚焦输入框"
        );
        setTimeout(() => {
          $input.focus();
        }, 250);
      });
    },
    /**
     * 新增新标签页打开按钮
     */
    addOpenBlankBtn() {
      utils.mutationObserver(document.documentElement, {
        config: {
          subtree: true,
          childList: true
        },
        immediate: true,
        callback() {
          if (!WeiBoRouter.isMWeiBo_search()) {
            return;
          }
          document.querySelectorAll(
            ".card footer.m-ctrl-box:not(:has(.gm-open-blank))"
          ).forEach(($footerCtrl) => {
            if ($footerCtrl.querySelector(".gm-open-blank")) {
              return;
            }
            let $ownDiyBtn = domUtils.createElement("div", {
              innerHTML: (
                /*html*/
                `
								<h4>新标签页打开</h4>
							`
              )
            });
            $ownDiyBtn.classList.add(
              "m-diy-btn",
              "m-box-col",
              "m-box-center",
              "m-box-center-a",
              "gm-open-blank"
            );
            domUtils.on($ownDiyBtn, "click", (event) => {
              utils.preventEvent(event);
              let vueIns = VueUtils.getVue($footerCtrl);
              if (!vueIns) {
                Qmsg.error("没有找到对应的Vue实例");
                return;
              }
              let id = vueIns?.item?.id;
              if (typeof id !== "string") {
                Qmsg.error("没有找到对应的id");
                return;
              }
              let url = `${window.location.origin}/detail/${id}`;
              log.info(`新标签页打开：${url}`);
              window.open(url, "_blank");
            });
            let $diyBtnList = $footerCtrl.querySelectorAll(".m-diy-btn");
            if ($diyBtnList.length) {
              domUtils.after($diyBtnList[$diyBtnList.length - 1], $ownDiyBtn);
            } else {
              domUtils.append($footerCtrl, $ownDiyBtn);
            }
          });
        }
      });
    }
  };
  const WeiBoApi = {
    /**
     * 获取组件播放信息
     * @param oid 格式：xxxx:xxxxxxxxxxx
     */
    async component(oid) {
      let postParams = {
        page: "/tv/show/" + oid
      };
      let postData = {
        data: JSON.stringify({ Component_Play_Playinfo: { oid } })
      };
      let api = `https://www.weibo.com/tv/api/component?${utils.toSearchParamsStr(
      postParams
    )}`;
      let response = await httpx.post(api, {
        data: utils.toSearchParamsStr(postData),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/x-www-form-urlencoded",
          Host: "www.weibo.com",
          Origin: "https://www.weibo.com",
          "Page-Referer": postParams.page,
          Referer: "https://www.weibo.com" + postParams.page,
          "User-Agent": utils.getRandomPCUA()
        }
      });
      if (!response.status) {
        return;
      }
      let data = utils.toJSON(response.data.responseText);
      if (data["code"] !== "100000") {
        log.info(`获取播放信息失败`, response);
        Qmsg.error("获取播放信息失败");
        return;
      }
      let Component_Play_Playinfo = data["data"]["Component_Play_Playinfo"];
      return Component_Play_Playinfo;
    }
  };
  const VideoQualityMap_Mobile = {
    "流畅 360P": {
      label: "流畅",
      sign: 1,
      name: "mp4_ld_mp4"
    },
    "标清 480P": {
      label: "标清",
      sign: 2,
      name: "mp4_hd_mp4"
    },
    "高清 720P": {
      label: "高清",
      sign: 3,
      name: "mp4_720p_mp4"
    }
  };
  const VideoQualityMap_PC = {
    "高清 1080P": {
      label: "超清",
      sign: 4,
      name: "mp4_1080p_mp4"
    },
    "超清 2K": {
      label: "2K",
      sign: 5,
      name: "mp4_1440p_mp4"
    },
    "超清 2K60": {
      label: "2K-60",
      sign: 6,
      name: "mp4_1440p_60fps_mp4"
    },
    "超清 4K": {
      label: "4K",
      sign: 7,
      name: "mp4_2160p_mp4"
    },
    "超清 4K60": {
      label: "4K-60",
      sign: 7,
      name: "mp4_2160p_60fps_mp4"
    }
  };
  const VideoQualityMap = {
    ...VideoQualityMap_Mobile,
    ...VideoQualityMap_PC
  };
  class WeiBoUnlockQuality {
    $src = VideoQualityMap_PC;
    $data = {
      newQualityNameList: [],
      videoQualityMap: new utils.Dictionary()
    };
    constructor() {
      this.$data.newQualityNameList = [];
      this.$data.newQualityNameList.push(...Object.keys(this.$src));
    }
    /**
     * 锁定视频清晰度
     */
    lockVideoQuality() {
      let that = this;
      log.info("锁定视频清晰度");
      VueUtils.waitVuePropToSet(".video-player .mwb-video", [
        {
          msg: "等待获取属性 __vue__.player.controlBar.addChild",
          check(vueObj) {
            return typeof vueObj.player.controlBar.addChild === "function";
          },
          set(vueObj) {
            let oldAddChild = vueObj.player.controlBar.addChild;
            let userSetQuality = Panel.getValue(
              "weibo-common-lockVideoQuality"
            );
            let userSetQualitySign = -1;
            Object.keys(VideoQualityMap).find((key) => {
              if (VideoQualityMap[key].name === userSetQuality) {
                userSetQualitySign = VideoQualityMap[key].sign;
                return true;
              } else {
                return false;
              }
            });
            let ownAddChild = function(...args) {
              let name = args[0];
              if (name === "qualityButton") {
                let qualityInfo = args[1];
                log.info("锁定视频清晰度", qualityInfo);
                qualityInfo["qualityList"].find((item) => {
                  if (!(item.sign === 1 && that.$data.videoQualityMap.has(item.src))) {
                    return false;
                  }
                  that.$data.videoQualityMap.get(item.src).forEach((videoQualityMapInfo) => {
                    let findIndex = qualityInfo["qualityList"].findIndex(
                      (qualityItem) => {
                        return qualityItem.sign === videoQualityMapInfo.sign;
                      }
                    );
                    if (findIndex === -1) {
                      let newQuality = {
                        label: videoQualityMapInfo.label,
                        sign: videoQualityMapInfo.sign,
                        src: videoQualityMapInfo.src
                      };
                      log.success("添加新的视频清晰度", newQuality);
                      qualityInfo["qualityList"].push(newQuality);
                    }
                  });
                  return true;
                });
                if (userSetQualitySign !== -1) {
                  let findSign = qualityInfo["qualityList"].find(
                    (item) => item["sign"] === userSetQualitySign
                  );
                  if (findSign) {
                    qualityInfo["defaultSign"] = userSetQualitySign;
                  } else {
                    let signList = qualityInfo["qualityList"].map((item) => {
                      if (item.sign <= userSetQualitySign) {
                        return item.sign;
                      }
                    }).filter((item) => item);
                    let userSetQualitySignLower = utils.getMaxValue(...signList);
                    qualityInfo["defaultSign"] = userSetQualitySignLower;
                    log.error(
                      "该清晰度不存在，选择比该画质低的清晰度：" + userSetQualitySignLower
                    );
                  }
                } else {
                  let signList = qualityInfo["qualityList"].map(
                    (item) => item.sign
                  );
                  let maxSign = utils.getMaxValue(...signList);
                  qualityInfo["defaultSign"] = maxSign;
                }
              }
              return oldAddChild.apply(this, args);
            };
            if (oldAddChild == ownAddChild) {
              return;
            }
            vueObj.player.controlBar.addChild = ownAddChild;
            log.success("成功覆盖属性 __vue__.player.controlBar.addChild");
          }
        }
      ]);
    }
    /**
     * 解锁更多视频清晰度
     */
    async unlockVideoHigherQuality() {
      let that = this;
      let taskQueue = [];
      $$(".weibo-media-wraps:not([data-unlock-quality])").forEach(
        ($ele) => {
          $ele.setAttribute("data-unlock-quality", "true");
          let taskFunc = function() {
            return new Promise((resolve, reject) => {
              VueUtils.waitVuePropToSet($ele, [
                {
                  check(vueObj) {
                    if (typeof vueObj?.item?.type === "string" && vueObj?.item?.type !== "video") {
                      return true;
                    }
                    return typeof vueObj?.item?.object_id === "string";
                  },
                  failWait() {
                    resolve();
                  },
                  async set(vueObj) {
                    try {
                      if (vueObj.item.type !== "video") {
                        return;
                      }
                      let object_id = vueObj.item.object_id;
                      let urls = vueObj.item.urls;
                      let componentInfo = await WeiBoApi.component(object_id);
                      if (!componentInfo) {
                        return;
                      }
                      if (!componentInfo.urls) {
                        log.error("获取组件信息urls失败");
                        Qmsg.error("获取组件信息urls失败");
                        return;
                      }
                      if (typeof componentInfo.urls !== "object") {
                        log.error("组件信息urls不是一个对象");
                        Qmsg.error("组件信息urls不是一个对象");
                        return;
                      }
                      if (!Object.keys(componentInfo.urls).length) {
                        log.error("组件信息urls为空");
                        Qmsg.error("组件信息urls为空");
                        return;
                      }
                      Object.keys(componentInfo.urls).forEach((srcName) => {
                        let src = componentInfo.urls[srcName];
                        if (that.$data.newQualityNameList.includes(srcName)) {
                          let mapInfo = {
                            label: that.$src[srcName].label,
                            name: that.$src[srcName].name,
                            sign: that.$src[srcName].sign,
                            src
                          };
                          let ld_mp4_url = urls["mp4_ld_mp4"];
                          if (ld_mp4_url) {
                            if (!that.$data.videoQualityMap.has(ld_mp4_url)) {
                              that.$data.videoQualityMap.set(ld_mp4_url, [
                                mapInfo
                              ]);
                            } else {
                              let currentMapInfo = that.$data.videoQualityMap.get(ld_mp4_url);
                              currentMapInfo.push(mapInfo);
                              that.$data.videoQualityMap.set(
                                ld_mp4_url,
                                currentMapInfo
                              );
                            }
                          }
                        }
                        if (srcName in VideoQualityMap) {
                          let newSrcInfo = VideoQualityMap[srcName];
                          if (newSrcInfo.name in urls) {
                          } else {
                            log.success("新增清晰度：", newSrcInfo);
                            urls[newSrcInfo.name] = src;
                          }
                        } else {
                          log.error("视频清晰度映射尚未补充", { srcName, src });
                        }
                      });
                    } catch (error) {
                      log.error(error);
                    } finally {
                      resolve();
                    }
                  }
                }
              ]);
            });
          };
          taskQueue.push(taskFunc);
        }
      );
      for (const taskIterator of taskQueue) {
        taskIterator();
        await utils.sleep(100);
      }
    }
  }
  const WeiBoCardArticle = {
    init() {
      Panel.execMenuOnce("card_weibo_com__autoExpandFullArticle", () => {
        return this.autoExpandFullArticle();
      });
      Panel.execMenuOnce("card_weibo_com__blockComment", () => {
        return this.blockComment();
      });
      Panel.execMenuOnce("card_weibo_com__repairArticleUserHomeJump", () => {
        this.repairArticleUserHomeJump();
      });
    },
    /**
     * 自动展开全文
     */
    autoExpandFullArticle() {
      log.info("自动展开全文");
      return [
        addStyle(
          /*css*/
          `
			.m-container-max .f-art,
			.m-container-max .art-con-new{
				height: unset !important;
				overflow: unset !important;
			}    
			`
        ),
        CommonUtil.addBlockCSS(".m-container-max .f-art-opt")
      ];
    },
    /**
     * 屏蔽评论
     */
    blockComment() {
      log.info("【屏蔽】评论");
      return CommonUtil.addBlockCSS(".m-container-max .m-panel1");
    },
    /**
     * 修复文章用户主页跳转
     */
    repairArticleUserHomeJump() {
      log.info("修复文章用户主页跳转");
      domUtils.on(
        document,
        "click",
        ".m-feed .f-art-user-v2",
        (event) => {
          let $click = event.target;
          let jQueryEventName = Object.keys($click).find(
            (key) => key.startsWith("jQuery")
          );
          if (!jQueryEventName) {
            return;
          }
          utils.preventEvent(event);
          let jQueryEvent = $click[jQueryEventName];
          let data = jQueryEvent["events"]["click"][0]["data"];
          log.success("跳转信息：", data);
          let url = data["url"] || data["target_url"];
          window.open(url, "_blank");
        },
        {
          capture: true
        }
      );
    }
  };
  const WeiBoHome = {
    init() {
      Panel.execMenuOnce("weibo-home-blockMessageCount", () => {
        return this.blockMessageCount();
      });
      Panel.execMenuOnce("weibo-home-addOpenBlankBtn", () => {
        this.addOpenBlankBtn();
      });
      domUtils.ready(() => {
        Panel.execMenuOnce("weibo-home-addSupertalkTab", () => {
          this.addSupertalkTab();
        });
      });
    },
    /**
     * 屏蔽右上角的信息红点（登录后）
     */
    blockMessageCount() {
      log.info(`屏蔽右上角的信息红点（登录后）`);
      return CommonUtil.addBlockCSS(".nav-right .m-bubble");
    },
    /**
     * 新增Tab - 超话
     */
    addSupertalkTab() {
      VueUtils.waitVuePropToSet(".main-top", {
        check(vueObj) {
          return Array.isArray(vueObj?.tabs);
        },
        set(vueObj) {
          log.success(`添加顶部Tab - 超话`);
          vueObj?.tabs?.push({
            children: [
              {
                api: "api/container/getIndex?containerid=100803",
                gid: "100803",
                name: "超话社区",
                type: 1
              }
            ]
          });
          return;
        }
      });
    },
    /**
     * 新增新标签页打开按钮
     */
    addOpenBlankBtn() {
      utils.mutationObserver(document.documentElement, {
        config: {
          subtree: true,
          childList: true
        },
        immediate: true,
        callback() {
          if (!WeiBoRouter.isMWeiBoHome()) {
            return;
          }
          document.querySelectorAll(
            ".main-wrap .wb-item .card .f-footer-ctrl:not(:has(.gm-open-blank))"
          ).forEach(($footerCtrl) => {
            if ($footerCtrl.querySelector(".gm-open-blank")) {
              return;
            }
            let $ownDiyBtn = domUtils.createElement("div", {
              innerHTML: (
                /*html*/
                `
								<h4>新标签页打开</h4>
							`
              )
            });
            $ownDiyBtn.classList.add(
              "m-diy-btn",
              "m-box-center-a",
              "gm-open-blank"
            );
            domUtils.on($ownDiyBtn, "click", (event) => {
              utils.preventEvent(event);
              let vueIns = VueUtils.getVue($footerCtrl);
              if (!vueIns) {
                Qmsg.error("没有找到对应的Vue实例");
                return;
              }
              let id = vueIns?.item?.id;
              if (typeof id !== "string") {
                Qmsg.error("没有找到对应的id");
                return;
              }
              let url = `${window.location.origin}/detail/${id}`;
              log.info(`新标签页打开：${url}`);
              window.open(url, "_blank");
            });
            let $diyBtnList = $footerCtrl.querySelectorAll(".m-diy-btn");
            if ($diyBtnList.length) {
              domUtils.after($diyBtnList[$diyBtnList.length - 1], $ownDiyBtn);
            } else {
              domUtils.append($footerCtrl, $ownDiyBtn);
            }
          });
        }
      });
    }
  };
  const WeiBoHotSearch = {
    init() {
      Panel.execMenuOnce("weibo-hot-search-openBlank", () => {
        this.openBlank();
      });
    },
    /**
     * 新标签页打开链接
     */
    openBlank() {
      DOMUtils.on(
        document,
        "click",
        ".card-list .card",
        (event, targetSelector) => {
          utils.preventEvent(event);
          let vueIns = VueUtils.getVue(targetSelector);
          if (!vueIns) {
            log.error("没有找到对应的Vue实例", vueIns);
            Qmsg.error("没有找到对应的Vue实例");
            return;
          }
          let carddata = vueIns?.carddata;
          if (typeof carddata?.scheme !== "string") {
            log.error("没有找到对应的scheme", vueIns);
            Qmsg.error("没有找到对应的scheme");
            return;
          }
          let scheme = carddata.scheme;
          log.success(`新标签页打开：` + scheme);
          window.open(scheme, "_blank");
        },
        {
          capture: true
        }
      );
    }
  };
  const blockCSS = "#app .bottombtn {\r\n	display: none !important;\r\n}\r\n";
  const WeiBoLive = {
    init() {
      addStyle(blockCSS);
    }
  };
  const WeiBo = {
    $data: {
      weiBoUnlockQuality: new WeiBoUnlockQuality()
    },
    init() {
      Panel.execMenuOnce("weibo_hijack_navigator_service_worker_register", () => {
        if ("serviceWorker" in window.navigator) {
          WeiBoHook.hookServiceWorkerRegister();
        }
      });
      Panel.execMenuOnce("weibo-common-clickImageToClosePreviewImage", () => {
        this.clickImageToClosePreviewImage();
      });
      if (WeiBoRouter.isMWeiBo()) {
        log.info("Router: 移动端微博");
        Panel.onceExec("weibo-m-init", () => {
          WeiBoHook.hookNetWork();
          WeiBoHook.hookApply();
          WeiBoHook.hookVueRouter();
        });
        Panel.execMenuOnce("weibo_remove_ads", () => {
          return this.blockAds();
        });
        Panel.execMenuOnce("weibo_shield_bottom_bar", () => {
          return this.shieldBottomBar();
        });
        this.$data.weiBoUnlockQuality.lockVideoQuality();
        domUtils.ready(() => {
          Panel.execMenuOnce("weibo-common-unlockVideoHigherQuality", () => {
            this.unlockVideoHigherQuality();
          });
          Panel.execMenuOnce("weibo-detail-setArticleAbsoluteTime", () => {
            WeiBoDetail.setArticleAbsoluteTime();
          });
        });
        if (WeiBoRouter.isMWeiBoHome()) {
          log.info(`Router: 移动端微博-首页`);
          WeiBoHome.init();
        } else if (WeiBoRouter.isMWeiBo_detail() || WeiBoRouter.isMWeiBo_status()) {
          log.info("Router: 移动端微博-正文");
          WeiBoDetail.init();
        } else if (WeiBoRouter.isMWeiBo_userHome()) {
          log.info("Router: 移动端微博-用户主页");
        } else if (WeiBoRouter.isMWeiBo_search()) {
          log.info("Router: 移动端微博-搜索");
          WeiBoSearch.init();
        } else if (WeiBoRouter.isMWeiBo_HotSearch()) {
          log.info(`Router: 移动端微博-微博热搜`);
          WeiBoHotSearch.init();
        } else {
          log.error("Router: 移动端微博未适配链接 => " + window.location.href);
        }
      } else if (WeiBoRouter.isHuaTi()) {
        log.info("Router: 话题");
        WeiBoHuaTi.init();
      } else if (WeiBoRouter.isVideo()) {
        log.info("Router: 视频页");
        WeiBoVideo.init();
      } else if (WeiBoRouter.isCard()) {
        log.info("Router: 头条");
        if (WeiBoRouter.isCardArticle()) {
          log.info("Router: 头条文章");
          WeiBoCardArticle.init();
        } else {
          log.error("Router: 头条未适配链接 => " + window.location.href);
        }
      } else if (WeiBoRouter.isLive()) {
        log.info(`Router: 直播`);
        WeiBoLive.init();
      } else {
        log.error("Router: 未适配 => " + window.location.href);
      }
    },
    /**
     * 屏蔽 广告
     */
    blockAds() {
      log.info(`屏蔽 广告`);
      return addStyle(blockAdsCSS$1);
    },
    /**
     * 【屏蔽】底部工具栏
     */
    shieldBottomBar() {
      log.info("【屏蔽】底部工具栏");
      return CommonUtil.addBlockCSS(
        "#app div.m-tab-bar.m-bar-panel.m-container-max"
      );
    },
    /**
     * 解锁微博视频高画质
     **/
    unlockVideoHigherQuality() {
      let lock = new utils.LockFunction(() => {
        this.$data.weiBoUnlockQuality.unlockVideoHigherQuality();
      }, 15);
      utils.mutationObserver(document.body, {
        config: {
          subtree: true,
          childList: true
        },
        immediate: true,
        callback: () => {
          lock.run();
        }
      });
    },
    /**
     * 设置监听事件，监听点击预览中的图片，从而关闭预览
     */
    clickImageToClosePreviewImage() {
      let selectorList = [".pswp .pswp__item"];
      selectorList.forEach((selector) => {
        domUtils.on(document, "click", selector, (event) => {
          event.target;
          let $closeButton = $(".pswp .pswp__button--close");
          if ($closeButton) {
            $closeButton.click();
          } else {
            log.warn("未找到关闭预览按钮，使用history.back()");
            window.history.back();
          }
        });
      });
    }
  };
  const PanelComponents = {
    $data: {
      __storeApiFn: null,
      get storeApiValue() {
        if (!this.__storeApiFn) {
          this.__storeApiFn = new Utils.Dictionary();
        }
        return this.__storeApiFn;
      }
    },
    /**
     * 获取自定义的存储接口
     * @param type 组件类型
     */
    getStorageApi(type) {
      if (!this.hasStorageApi(type)) {
        return;
      }
      return this.$data.storeApiValue.get(type);
    },
    /**
     * 判断是否存在自定义的存储接口
     * @param type 组件类型
     */
    hasStorageApi(type) {
      return this.$data.storeApiValue.has(type);
    },
    /**
     * 设置自定义的存储接口
     * @param type 组件类型
     * @param storageApiValue 存储接口
     */
    setStorageApi(type, storageApiValue) {
      this.$data.storeApiValue.set(type, storageApiValue);
    },
    /**
     * 初始化组件的存储接口属性
     *
     * @param type 组件类型
     * @param config 组件配置，必须包含prop属性
     * @param storageApiValue 存储接口
     */
    initComponentsStorageApi(type, config, storageApiValue) {
      let propsStorageApi;
      if (this.hasStorageApi(type)) {
        propsStorageApi = this.getStorageApi(type);
      } else {
        propsStorageApi = storageApiValue;
      }
      this.setComponentsStorageApiProperty(config, propsStorageApi);
    },
    /**
     * 设置组件的存储接口属性
     * @param config 组件配置，必须包含prop属性
     * @param storageApiValue 存储接口
     */
    setComponentsStorageApiProperty(config, storageApiValue) {
      Reflect.set(config.props, PROPS_STORAGE_API, storageApiValue);
    }
  };
  const UISelect = function(text, key, defaultValue, data, selectCallBack, description, valueChangeCallBack) {
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
      props: {},
      getValue() {
        let storageApiValue = this.props[PROPS_STORAGE_API];
        return storageApiValue.get(key, defaultValue);
      },
      callback(event, isSelectedValue, isSelectedText) {
        let value = isSelectedValue;
        log.info(`选择：${isSelectedText}`);
        if (typeof selectCallBack === "function") {
          let result2 = selectCallBack(event, value, isSelectedText);
          if (result2) {
            return;
          }
        }
        let storageApiValue = this.props[PROPS_STORAGE_API];
        storageApiValue.set(key, value);
      },
      data: selectData
    };
    Reflect.set(result.attributes, ATTRIBUTE_KEY, key);
    Reflect.set(result.attributes, ATTRIBUTE_DEFAULT_VALUE, defaultValue);
    PanelComponents.initComponentsStorageApi(
      "select",
      result,
      {
        get(key2, defaultValue2) {
          return Panel.getValue(key2, defaultValue2);
        },
        set(key2, value) {
          Panel.setValue(key2, value);
        }
      }
    );
    return result;
  };
  const UISwitch = function(text, key, defaultValue, clickCallBack, description, afterAddToUListCallBack, disabled, valueChangeCallBack) {
    let result = {
      text,
      type: "switch",
      description,
      disabled,
      attributes: {},
      props: {},
      getValue() {
        let storageApiValue = this.props[PROPS_STORAGE_API];
        let value = storageApiValue.get(key, defaultValue);
        return value;
      },
      callback(event, __value) {
        let value = Boolean(__value);
        log.success(`${value ? "开启" : "关闭"} ${text}`);
        let storageApiValue = this.props[PROPS_STORAGE_API];
        storageApiValue.set(key, value);
      },
      afterAddToUListCallBack
    };
    Reflect.set(result.attributes, ATTRIBUTE_KEY, key);
    Reflect.set(result.attributes, ATTRIBUTE_DEFAULT_VALUE, defaultValue);
    PanelComponents.initComponentsStorageApi(
      "switch",
      result,
      {
        get(key2, defaultValue2) {
          return Panel.getValue(key2, defaultValue2);
        },
        set(key2, value) {
          Panel.setValue(key2, value);
        }
      }
    );
    return result;
  };
  const UITextArea = function(text, key, defaultValue, description, changeCallback, placeholder = "", disabled, valueChangeCallBack) {
    let result = {
      text,
      type: "textarea",
      attributes: {},
      props: {},
      description,
      placeholder,
      disabled,
      getValue() {
        let storageApiValue = this.props[PROPS_STORAGE_API];
        let value = storageApiValue.get(key, defaultValue);
        if (Array.isArray(value)) {
          return value.join("\n");
        }
        return value;
      },
      callback(event, value) {
        let storageApiValue = this.props[PROPS_STORAGE_API];
        storageApiValue.set(key, value);
      }
    };
    Reflect.set(result.attributes, ATTRIBUTE_KEY, key);
    Reflect.set(result.attributes, ATTRIBUTE_DEFAULT_VALUE, defaultValue);
    PanelComponents.initComponentsStorageApi(
      "switch",
      result,
      {
        get(key2, defaultValue2) {
          return Panel.getValue(key2, defaultValue2);
        },
        set(key2, value) {
          Panel.setValue(key2, value);
        }
      }
    );
    return result;
  };
  const SettingUICommon = {
    id: "weibo-panel-config-currency",
    title: "通用",
    forms: [
      {
        text: "",
        type: "forms",
        forms: [
          {
            type: "deepMenu",
            text: "Toast配置",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISelect(
                    "Toast位置",
                    "qmsg-config-position",
                    "bottom",
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
                    (event, isSelectValue, isSelectText) => {
                      log.info("设置当前Qmsg弹出位置" + isSelectText);
                    },
                    "Toast显示在页面九宫格的位置"
                  ),
                  UISelect(
                    "最多显示的数量",
                    "qmsg-config-maxnums",
                    3,
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
                    "限制Toast显示的数量"
                  ),
                  UISwitch(
                    "逆序弹出",
                    "qmsg-config-showreverse",
                    false,
                    void 0,
                    "修改Toast弹出的顺序"
                  )
                ]
              }
            ]
          },
          {
            type: "deepMenu",
            text: "Cookie配置",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISwitch(
                    "启用",
                    "httpx-use-cookie-enable",
                    false,
                    void 0,
                    "启用后，将根据下面的配置进行添加cookie"
                  ),
                  UISwitch(
                    "使用document.cookie",
                    "httpx-use-document-cookie",
                    false,
                    void 0,
                    "自动根据请求的域名来获取对应的cookie"
                  ),
                  UITextArea(
                    "weibo.com",
                    "httpx-cookie-weibo.com",
                    "",
                    void 0,
                    void 0,
                    "Cookie格式：xxx=xxxx;xxx=xxxx"
                  )
                ]
              }
            ]
          }
        ]
      },
      {
        type: "forms",
        text: "",
        forms: [
          {
            text: "功能",
            type: "deepMenu",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISelect(
                    "视频清晰度",
                    "weibo-common-lockVideoQuality",
                    "",
                    [
                      {
                        value: "",
                        text: "自动"
                      },
                      ...(() => {
                        let result = [];
                        Object.keys(VideoQualityMap).forEach((name) => {
                          let value = VideoQualityMap[name];
                          result.push({
                            value: value.name,
                            text: name
                          });
                        });
                        return result;
                      })()
                    ],
                    void 0,
                    "设置视频清晰度，默认自动，其它的清晰度将自动被删除(强制固定选择的清晰度)"
                  ),
                  UISwitch(
                    "解锁更多清晰度",
                    "weibo-common-unlockVideoHigherQuality",
                    true,
                    void 0,
                    "自动请求PC端的视频清晰度，如果请求成功，将解锁更多的清晰度，如1080p、2K、2K-60、4K-60"
                  ),
                  UISwitch(
                    "点击图片关闭预览",
                    "weibo-common-clickImageToClosePreviewImage",
                    false,
                    void 0,
                    "当点击图片进入预览模式时，再点击当前预览的图片可退出预览"
                  )
                ]
              },
              {
                text: "函数禁用",
                type: "forms",
                forms: [
                  UISwitch(
                    "navigator.serviceWorker.register",
                    "weibo_hijack_navigator_service_worker_register",
                    true,
                    void 0,
                    "禁止注册serviceWorker"
                  )
                ]
              }
            ]
          },
          {
            text: "屏蔽",
            type: "deepMenu",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISwitch(
                    "【屏蔽】广告",
                    "weibo_remove_ads",
                    true,
                    void 0,
                    "包括【登录/注册按钮】、【小程序横幅推荐】"
                  ),
                  UISwitch(
                    "【屏蔽】底部工具栏",
                    "weibo_shield_bottom_bar",
                    false,
                    void 0,
                    "屏蔽聊天/关注按钮"
                  )
                ]
              }
            ]
          },
          {
            text: "拦截跳转",
            type: "deepMenu",
            forms: [
              {
                text: "注意：已登录的情况下请关闭下面的功能",
                type: "forms",
                forms: [
                  UISwitch(
                    "api/attitudes/create",
                    "weibo_apply_attitudes_create",
                    true
                  ),
                  UISwitch(
                    "点赞",
                    "weibo_apply_likes_update",
                    true,
                    void 0,
                    "未登录时，拦截点赞跳转登录"
                  ),
                  UISwitch(
                    "评论",
                    "weibo_apply_comments_create",
                    true,
                    void 0,
                    "未登录时，拦截评论跳转登录"
                  ),
                  UISwitch(
                    "关注",
                    "weibo_apply_friendships_create",
                    true,
                    void 0,
                    "未登录时，拦截关注跳转登录"
                  ),
                  UISwitch(
                    "转发",
                    "weibo_apply_statuses_repostTimeline",
                    true,
                    void 0,
                    "未登录时，拦截查看转发数据"
                  ),
                  UISwitch(
                    "回复",
                    "weibo_apply_comments_reply",
                    true,
                    void 0,
                    "未登录时，拦截回复跳转登录"
                  ),
                  UISwitch(
                    "优化跳转主页",
                    "weibo_apply_profile_info",
                    true,
                    void 0,
                    "未登录时，正确跳转至用户主页"
                  ),
                  UISwitch(
                    "下拉加载更多评论",
                    "weibo_apply_comments_hotflow",
                    true,
                    void 0,
                    "未登录时，拦截下拉加载更多评论跳转登录"
                  ),
                  UISwitch(
                    "楼中楼下拉加载更多评论",
                    "weibo_apply_comments_hotFlowChild",
                    true,
                    void 0,
                    "未登录时，拦截下拉加载更多评论跳转登录"
                  )
                ]
              }
            ]
          },
          {
            text: "网络请求",
            type: "deepMenu",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISwitch(
                    "/api/config",
                    "weibo_request_api_config",
                    true,
                    void 0,
                    "Api为获取用户数据，未登录时伪装为已登录"
                  ),
                  UISwitch(
                    "/comments/hot",
                    "weibo_request_comments_hot",
                    true,
                    void 0,
                    "Api为获取评论数据，未登录时伪装为成功获取评论数据"
                  ),
                  UISwitch(
                    "/status/push",
                    "weibo_request_status_push",
                    true,
                    void 0,
                    "Api为获取顶部的热点新闻信息流，这里是直接清空json"
                  )
                ]
              }
            ]
          },
          {
            text: "Vue-Router路由",
            type: "deepMenu",
            forms: [
              {
                text: "",
                type: "forms",
                forms: [
                  UISwitch(
                    "监听路由改变",
                    "weibo-listenRouterChange",
                    true,
                    void 0,
                    "监听路由改变，动态加载功能"
                  ),
                  UISwitch(
                    "修复用户主页正确跳转",
                    "weibo_router_profile_to_user_home",
                    true,
                    void 0,
                    "可以正确跳转至用户主页"
                  )
                ]
              }
            ]
          }
        ]
      }
    ]
  };
  const SettingUIHome = {
    id: "weibo-panel-config-card-article",
    title: "首页",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "新增超话Tab",
            "weibo-home-addSupertalkTab",
            false,
            void 0,
            "在首页添加超话Tab，方便快速查看超话"
          ),
          UISwitch(
            "新增【新标签页打开】按钮",
            "weibo-home-addOpenBlankBtn",
            false,
            void 0,
            "在每个card下面的按钮区域添加该按钮，方便快速在新标签页中打开"
          )
        ]
      },
      {
        text: "网络拦截",
        type: "forms",
        forms: [
          UISwitch(
            "过滤掉信息流广告",
            "weibo-request-blockArticleAds",
            true,
            void 0,
            '夹杂在文章中间的"微博广告"'
          )
        ]
      },
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "屏蔽消息数量",
            "weibo-home-blockMessageCount",
            false,
            void 0,
            "即登录后右上角的消息提示数"
          )
        ]
      }
    ]
  };
  const SettingUIDetail = {
    id: "weibo-panel-config-detail",
    title: "正文",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "修改发布时间显示为绝对时间",
            "weibo-detail-setArticleAbsoluteTime",
            false,
            void 0,
            "该功能全局生效包括但不限于微博正文、首页等"
          )
        ]
      }
    ]
  };
  const SettingUISearch = {
    id: "weibo-panel-config-u",
    title: "搜索",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch("自动聚焦搜索框", "weibo-search-autoFocusSearchInput", void 0),
          UISwitch(
            "新增【新标签页打开】按钮",
            "weibo-search-addOpenBlankBtn",
            false,
            void 0,
            "在每个card下面的按钮区域添加该按钮，方便快速在新标签页中打开"
          )
        ]
      }
    ]
  };
  const SettingUIHuaTi = {
    id: "weibo-panel-config-huati",
    title: "话题",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "伪装微博客户端",
            "huati_weibo_masquerade_weibo_client_app",
            true,
            void 0,
            "可以隐藏底部的【在微博内打开】"
          )
        ]
      },
      {
        text: "网络请求(不一定能劫持到)",
        type: "forms",
        forms: [
          UISwitch(
            "/ajax/super/starschedule",
            "huati_weibo_get_more_celebrity_calendar_information",
            true,
            void 0,
            "Api为获取日程数据，开启后可获取正常日程数据"
          )
        ]
      }
    ]
  };
  const SettingUIVideo = {
    id: "weibo-panel-config-video",
    title: "视频",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISelect(
            "视频清晰度",
            "weibo-video-quality",
            "",
            [
              {
                value: "",
                text: "自动"
              },
              {
                value: "mp4_ld_mp4",
                text: "流畅360p"
              },
              {
                value: "mp4_hd_mp4",
                text: "标清480p"
              },
              {
                value: "mp4_720p_mp4",
                text: "高清720p"
              },
              {
                value: "mp4_1080p_mp4",
                text: "超清1080p"
              }
            ],
            void 0,
            "设置视频清晰度，默认自动，其它的清晰度将自动被删除(强制固定选择的清晰度)"
          ),
          UISwitch(
            "解锁1080p",
            "weibo-video-unlockVideo1080p",
            true,
            void 0,
            "请求PC端的视频1080p链接，开启该功能↑选择的1080p才会生效"
          )
        ]
      },
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】底部工具栏",
            "weibo_video_shield_bottom_toolbar",
            true
          ),
          UISwitch("【屏蔽】相关推荐", "weibo_video_shield_recommend", true),
          UISwitch("【屏蔽】热门评论", "weibo_video_shield_hot_comments", true)
        ]
      },
      {
        text: "webpack",
        type: "forms",
        forms: [
          UISwitch(
            "gotoApp",
            "weibo_video_webpack_gotoApp",
            true,
            void 0,
            "开启后阻止唤醒Scheme"
          )
        ]
      }
    ]
  };
  const SettingUICardArticle = {
    id: "weibo-panel-config-card-article",
    title: "头条文章",
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "自动展开全文",
            "card_weibo_com__autoExpandFullArticle",
            true,
            void 0,
            "自动展开全文，屏蔽展开按钮"
          ),
          UISwitch(
            "修复文章作者主页正确跳转",
            "card_weibo_com__repairArticleUserHomeJump",
            true,
            void 0,
            "避免跳转至用户主页时需登录"
          )
        ]
      },
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】评论",
            "card_weibo_com__blockComment",
            false,
            void 0,
            "屏蔽评论区"
          )
        ]
      }
    ]
  };
  const SettingUIOther = {
    id: "weibo-panel-config-other",
    title: "其它",
    forms: [
      {
        text: "微博热搜",
        type: "forms",
        forms: [
          UISwitch(
            "新标签页打开",
            "weibo-hot-search-openBlank",
            false,
            void 0,
            "新标签页打开链接"
          )
        ]
      }
    ]
  };
  PanelContent.addContentConfig([
    SettingUICommon,
    SettingUIHome,
    SettingUIDetail,
    // SettingUIUserHome,
    SettingUISearch,
    SettingUIHuaTi,
    SettingUIVideo,
    SettingUICardArticle,
    SettingUIOther
  ]);
  Panel.$data.panelConfig = {
    style: (
      /*css*/
      `
        aside.pops-panel-aside{
            width: auto !important;
        }
        .pops-panel-textarea textarea{
            height: 100px;
        }`
    )
  };
  Panel.init();
  WeiBo.init();

})(Qmsg, DOMUtils, Utils, pops);
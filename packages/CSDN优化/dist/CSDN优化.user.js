// ==UserScript==
// @name         CSDN优化
// @namespace    https://github.com/WhiteSevs/TamperMonkeyScript
// @version      2024.6.23.19
// @author       WhiteSevs
// @description  支持手机端和PC端，屏蔽广告，优化浏览体验，自动跳转拦截的URL
// @license      GPL-3.0-only
// @icon         https://www.csdn.net/favicon.ico
// @supportURL   https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match        *://*.csdn.net/*
// @require      https://update.greasyfork.org/scripts/494167/1376186/CoverUMD.js
// @require      https://update.greasyfork.org/scripts/456485/1398647/pops.js
// @require      https://fastly.jsdelivr.net/npm/qmsg@1.1.2/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/utils@1.5.8/dist/index.umd.js
// @require      https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.1.2/dist/index.umd.js
// @grant        GM_addStyle
// @grant        GM_cookie
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

(function (Qmsg, DOMUtils, Utils) {
  'use strict';

  var _a;
  var _GM_deleteValue = /* @__PURE__ */ (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_unregisterMenuCommand = /* @__PURE__ */ (() => typeof GM_unregisterMenuCommand != "undefined" ? GM_unregisterMenuCommand : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  var _monkeyWindow = /* @__PURE__ */ (() => window)();
  const _SCRIPT_NAME_ = "CSDN优化";
  const utils = Utils.noConflict();
  const domutils = DOMUtils.noConflict();
  const pops = _monkeyWindow.pops || _unsafeWindow.pops;
  const log = new utils.Log(
    _GM_info,
    _unsafeWindow.console || _monkeyWindow.console
  );
  const SCRIPT_NAME = ((_a = _GM_info == null ? void 0 : _GM_info.script) == null ? void 0 : _a.name) || _SCRIPT_NAME_;
  const DEBUG = false;
  log.config({
    debug: DEBUG,
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
            return PopsPanel.getValue("qmsg-config-position", "bottom");
          }
        },
        maxNums: {
          get() {
            return PopsPanel.getValue("qmsg-config-maxnums", 5);
          }
        },
        showReverse: {
          get() {
            return PopsPanel.getValue("qmsg-config-showreverse", true);
          }
        },
        zIndex: {
          get() {
            let maxZIndex = Utils.getMaxZIndex(10);
            let popsMaxZIndex = pops.config.Utils.getPopsMaxZIndex(10).zIndex;
            return Utils.getMaxValue(maxZIndex, popsMaxZIndex);
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
    logDetails: DEBUG
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
  const addStyle = utils.addStyle;
  const KEY = "GM_Panel";
  const ATTRIBUTE_KEY = "data-key";
  const ATTRIBUTE_DEFAULT_VALUE = "data-default-value";
  const CSDNRouter = {
    /**
     * 判断是否是华为云联盟
     * + huaweicloud.csdn.net
     */
    isHuaWeiCloudBlog() {
      return Boolean(/huaweicloud.csdn.net/i.test(window.location.origin));
    },
    /**
     * 判断是否是博客
     * + blog.csdn.net
     */
    isBlog() {
      return Boolean(/blog.csdn.net/i.test(window.location.origin));
    },
    /**
     * 判断是否是文库
     * + wenku.csdn.net
     */
    isWenKu() {
      return Boolean(/wenku.csdn.net/i.test(window.location.origin));
    },
    /**
     * 判断是否是链接
     * + link.csdn.net
     */
    isLink() {
      return window.location.hostname === "link.csdn.net";
    },
    /**
     * 判断是否是搜索
     * + so.csdn.net
     */
    isSo() {
      return window.location.hostname === "so.csdn.net";
    },
    /**
     * 判断是否是C知道
     * + so.csdn.net/know
     * + /chat
     * + /so/ai
     */
    isSoCKnow() {
      return this.isSo() && (window.location.pathname.startsWith("/chat") || window.location.pathname.startsWith("/so/ai"));
    },
    /**
     * 判断是否是资源页面
     * + download.csdn.net
     */
    isDownload() {
      return window.location.hostname === "download.csdn.net";
    }
  };
  const UISlider = function(text, key, defaultValue, min, max, changeCallBack, getToolTipContent, description) {
    let result = {
      text,
      type: "slider",
      description,
      attributes: {},
      getValue() {
        return PopsPanel.getValue(key, defaultValue);
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
        PopsPanel.setValue(key, value);
      },
      min,
      max
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
        return Boolean(PopsPanel.getValue(key, defaultValue));
      },
      callback(event, value) {
        log.success(`${value ? "开启" : "关闭"} ${text}`);
        if (typeof clickCallBack === "function") {
          if (clickCallBack(event, value)) {
            return;
          }
        }
        PopsPanel.setValue(key, Boolean(value));
      },
      afterAddToUListCallBack: void 0
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = Boolean(defaultValue);
    }
    return result;
  };
  const SettingUIBlog = {
    id: "panel-blog",
    title: "博客",
    isDefault() {
      return CSDNRouter.isBlog();
    },
    forms: [
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch("【屏蔽】登录弹窗", "csdn-blog-shieldLoginDialog", true),
          UISwitch(
            "【屏蔽】左侧博客信息",
            "csdn-blog-shieldLeftBlogContainerAside",
            false
          ),
          UISwitch(
            "【屏蔽】右侧目录信息",
            "csdn-blog-shieldRightDirectoryInformation",
            false
          ),
          UISwitch("【屏蔽】顶部工具栏", "csdn-blog-shieldTopToolbar", false),
          UISwitch(
            "【屏蔽】底部的悬浮工具栏",
            "csdn-blog-shieldBottomFloatingToolbar",
            false
          )
        ]
      },
      {
        text: "右侧悬浮工具栏",
        type: "forms",
        forms: [
          UISwitch(
            "启用",
            "csdn-blog-rightToolbarEnable",
            true,
            void 0,
            "创作中心，隐藏/显示侧栏，新手引导，客服、举报..."
          ),
          UISwitch(
            "【添加按钮】前往评论",
            "csdn-blog-addGotoRecommandButton",
            true,
            void 0,
            "在悬浮工具栏最后面添加"
          ),
          UISlider(
            "right偏移",
            "csdn-blog-rightToolbarRightOffset",
            90,
            0,
            document.documentElement.clientWidth,
            (event, value) => {
              let csdnSideToolbar = document.querySelector(
                ".csdn-side-toolbar"
              );
              domutils.css(csdnSideToolbar, {
                right: value + "px"
              });
            },
            (value) => {
              return `当前：${value}px，默认：90px`;
            }
          ),
          UISlider(
            "top偏移",
            "csdn-blog-rightToolbarTopOffset",
            140,
            0,
            document.documentElement.clientHeight,
            (event, value) => {
              let csdnSideToolbar = document.querySelector(
                ".csdn-side-toolbar"
              );
              domutils.css(csdnSideToolbar, {
                top: value + "px"
              });
            },
            (value) => {
              return `当前：${value}px，默认：90px`;
            }
          ),
          UISwitch(
            "【屏蔽】创作中心",
            "csdn-blog-rightToolbarCreativeCenter",
            false
          ),
          UISwitch(
            "【屏蔽】显示/隐藏侧栏",
            "csdn-blog-rightToolbarShowOrSidebar",
            false
          ),
          UISwitch(
            "【屏蔽】新手引导",
            "csdn-blog-rightToolbarBeginnerGuidance",
            false
          ),
          UISwitch(
            "【屏蔽】客服",
            "csdn-blog-rightToolbarCustomerService",
            false
          ),
          UISwitch("【屏蔽】举报", "csdn-blog-rightToolbarReport", false),
          UISwitch("【屏蔽】返回顶部", "csdn-blog-rightToolbarBackToTop", false)
        ]
      },
      {
        text: "内容",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】底部xx技能树",
            "csdn-blog-shieldBottomSkillTree",
            false
          ),
          UISwitch(
            "【屏蔽】选中文字悬浮栏",
            "csdn-blog-shieldArticleSearchTip",
            false,
            void 0,
            "选中文字弹出的，例如：搜索、评论、笔记"
          ),
          UISwitch(
            "点击代码块自动展开",
            "csdn-blog-clickPreCodeAutomatically",
            true,
            void 0,
            "当鼠标点击代码块区域时，将自动展开内容"
          ),
          UISwitch(
            "自动展开代码块",
            "csdn-blog-autoExpandCodeContent",
            true,
            void 0,
            "懒人操作，免手动点击展开"
          ),
          UISwitch(
            "自动展开内容",
            "csdn-blog-autoExpandContent",
            true,
            void 0,
            "懒人操作，免手动点击展开"
          ),
          UISwitch(
            "全文居中",
            "csdn-blog-articleCenter",
            true,
            function(event, enable) {
              if (enable) {
                alert(
                  "为了更好的呈现效果，请开启功能：【屏蔽】左侧博客信息、【屏蔽】右侧目录信息"
                );
              }
            },
            "自动屏蔽左侧和右侧的信息，且将文章居中"
          ),
          UISwitch("允许选择内容", "csdn-blog-allowSelectContent", true, void 0)
        ]
      },
      {
        text: "评论",
        type: "forms",
        forms: [
          UISwitch("屏蔽", "csdn-blog-blockComment", false, void 0, "屏蔽评论"),
          UISwitch("优化评论的位置", "csdn-blog-restoreComments", true)
        ]
      },
      {
        text: "底部文章",
        type: "forms",
        forms: [
          UISwitch(
            "屏蔽",
            "csdn-blog-shieldBottomRecommendArticle",
            false,
            void 0,
            "屏蔽底部文章"
          ),
          UISwitch(
            "标识CSDN下载",
            "csdn-blog-identityCSDNDownload",
            true,
            void 0,
            "使用红框标识"
          ),
          UISwitch(
            "移除资源下载的文章",
            "csdn-blog-removeResourceDownloadArticle",
            false,
            void 0,
            "移除download.csdn.net、www.iteye.com、edu.csdn.net的文章链接"
          )
        ]
      },
      {
        text: "劫持/拦截",
        type: "forms",
        forms: [
          UISwitch(
            "拦截-复制的小尾巴",
            "csdn-blog-removeClipboardHijacking",
            true
          ),
          UISwitch(
            "劫持-禁止复制",
            "csdn-blog-unBlockCopy",
            true,
            void 0,
            "允许点击复制按钮进行复制"
          )
        ]
      }
    ]
  };
  const SettingUILink = {
    id: "panel-link",
    title: "链接",
    isDefault() {
      return CSDNRouter.isLink();
    },
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "重定向链接",
            "csdn-link-jumpRedirect",
            true,
            void 0,
            "自动跳转至被拦截的Url链接"
          )
        ]
      }
    ]
  };
  const SettingUIHuaWeiCloud = {
    id: "panel-hua-wei-cloud",
    title: "华为云开发者联盟",
    isDefault() {
      return CSDNRouter.isHuaWeiCloudBlog();
    },
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "自动展开全文",
            "csdn-hua-wei-cloud-autoExpandContent",
            true
          )
        ]
      },
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】云开发者任务挑战活动",
            "csdn-hua-wei-cloud-shieldCloudDeveloperTaskChallengeEvent",
            true
          ),
          UISwitch(
            "【屏蔽】左侧悬浮按钮",
            "csdn-hua-wei-cloud-shieldLeftFloatingButton",
            false,
            function(event, enable) {
              if (enable) {
                alert(
                  "开启后将屏蔽【当前阅读量】、【点赞按钮】、【评论按钮】、【分享按钮】"
                );
              }
            }
          ),
          UISwitch(
            "【屏蔽】右侧栏",
            "csdn-hua-wei-cloud-blockRightColumn",
            false,
            function(event, enable) {
              if (enable) {
                alert(
                  "开启后将屏蔽【相关产品】-【活动日历】-【运营活动】-【热门标签】"
                );
              }
            }
          ),
          UISwitch(
            "【屏蔽】底部推荐内容",
            "csdn-hua-wei-cloud-blockRecommendedContentAtTheBottom",
            false
          ),
          UISwitch(
            "【屏蔽】底部更多推荐",
            "csdn-hua-wei-cloud-shieldTheBottomForMoreRecommendations",
            false
          )
        ]
      }
    ]
  };
  const SettingUIWenKu = {
    id: "panel-wenku",
    title: "资源",
    isDefault() {
      return CSDNRouter.isLink();
    },
    forms: [
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】资源推荐",
            "csdn-wenku-shieldResourceRecommend",
            false
          ),
          UISwitch(
            "【屏蔽】右侧用户信息",
            "csdn-wenku-shieldRightUserInfo",
            false
          ),
          UISwitch(
            "【屏蔽】右侧悬浮工具栏",
            "csdn-wenku-shieldRightToolBar",
            false
          )
        ]
      }
    ]
  };
  const SettingUISo = {
    id: "panel-so",
    title: "搜索",
    isDefault() {
      return CSDNRouter.isSo();
    },
    forms: [
      {
        text: "C知道-功能",
        type: "forms",
        forms: [
          UISwitch(
            "去除水印",
            "csdn-so-cknow-removeMaskCover",
            true
          )
        ]
      }
    ]
  };
  const MSettingUIBlog = {
    id: "m-panel-blog",
    title: "博客",
    isDefault() {
      return CSDNRouter.isBlog();
    },
    forms: [
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】广告",
            "m-csdn-blog-removeAds",
            true,
            void 0,
            "包括：登录弹窗、打开APP、ios版本提示等"
          ),
          UISwitch(
            "【屏蔽】顶部Toolbar",
            "m-csdn-blog-shieldTopToolbar",
            false
          )
        ]
      },
      {
        text: "内容",
        type: "forms",
        forms: [
          UISwitch(
            "允许选中文字",
            "m-csdn-blog-allowSelectText",
            true,
            void 0,
            "设置user-select: text;"
          ),
          UISwitch(
            "自动展开",
            "m-csdn-blog-autoExpandContent",
            true,
            void 0,
            "包括内容、代码块"
          ),
          UISwitch(
            "不限制代码块的最大高度",
            "m-csdn-blog-notLimitCodePreMaxHeight",
            false,
            void 0,
            "让代码块的高度直接被撑开"
          )
        ]
      },
      {
        text: "评论",
        type: "forms",
        forms: [
          UISwitch(
            "屏蔽",
            "m-csdn-blog-blockComment",
            false,
            void 0,
            "屏蔽评论区"
          ),
          UISwitch(
            "不限制评论区的最大高度",
            "m-csdn-blog-notLimitCommentMaxHeight",
            true,
            void 0,
            "让评论区高度直接被撑开"
          )
        ]
      },
      {
        text: "底部文章",
        type: "forms",
        forms: [
          UISwitch(
            "屏蔽",
            "m-csdn-blog-blockBottomArticle",
            false,
            void 0,
            "屏蔽底部文章"
          ),
          UISwitch(
            "移除资源下载的文章",
            "m-csdn-blog-removeResourceArticle",
            false,
            void 0,
            "移除download.csdn.net、www.iteye.com、edu.csdn.net的文章链接"
          ),
          UISwitch(
            "重构",
            "m-csdn-blog-refactoringRecommendation",
            true,
            void 0,
            "样式统一化"
          ),
          UISwitch(
            "新标签页打开",
            "m-csdn-blog-openNewTab",
            true,
            void 0,
            "点击文章，新标签页打开"
          )
        ]
      },
      {
        text: "劫持/拦截",
        type: "forms",
        forms: [
          UISwitch(
            "劫持-禁止复制",
            "m-csdn-blog-unBlockCopy",
            true,
            void 0,
            "允许点击复制按钮进行复制"
          )
        ]
      }
    ]
  };
  const MSettingUILink = {
    id: "m-panel-link",
    title: "链接",
    isDefault() {
      return CSDNRouter.isLink();
    },
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "重定向链接",
            "m-csdn-link-jumpRedirect",
            true,
            void 0,
            "自动跳转至被拦截的Url链接"
          )
        ]
      }
    ]
  };
  const MSettingUISo = {
    id: "panel-so",
    title: "搜索",
    isDefault() {
      return CSDNRouter.isSo();
    },
    forms: [
      {
        text: "C知道-功能",
        type: "forms",
        forms: [
          UISwitch(
            "去除水印",
            "m-csdn-so-cknow-removeMaskCover",
            true
          )
        ]
      }
    ]
  };
  const MSettingUIWenKu = {
    id: "m-panel-wenku",
    title: "文库",
    isDefault() {
      return CSDNRouter.isWenKu();
    },
    forms: [
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】底部工具栏",
            "m-csdn-wenku-shieldBottomToolbar",
            false
          )
        ]
      }
    ]
  };
  const MSettingUIHuaWeiCloud = {
    id: "m-panel-hua-wei-cloud",
    title: "华为云开发者联盟",
    isDefault() {
      return CSDNRouter.isHuaWeiCloudBlog();
    },
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "自动展开全文",
            "m-csdn-hua-wei-cloud-autoExpandContent",
            true
          )
        ]
      }
    ]
  };
  const MSettingUIDownload = {
    id: "m-panel-download",
    title: "资源",
    isDefault() {
      return CSDNRouter.isDownload();
    },
    forms: [
      {
        text: "功能",
        type: "forms",
        forms: [
          UISwitch(
            "自动展开资源介绍",
            "m-csdn-download-automaticallyExpandResourceIntroduction",
            true,
            void 0,
            "屏蔽资源介绍【展开全部】按钮并展开资源介绍"
          )
        ]
      },
      {
        text: "屏蔽",
        type: "forms",
        forms: [
          UISwitch(
            "【屏蔽】广告",
            "m-csdn-download-removeAds",
            true,
            void 0,
            "包括：登录弹窗、会员降价等"
          )
        ]
      }
    ]
  };
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
        return PopsPanel.getValue(key, defaultValue);
      },
      callback(event, isSelectedValue, isSelectedText) {
        PopsPanel.setValue(key, isSelectedValue);
        if (typeof callback === "function") {
          callback(event, isSelectedValue, isSelectedText);
        }
      },
      data: selectData
    };
    if (result.attributes) {
      result.attributes[ATTRIBUTE_KEY] = key;
      result.attributes[ATTRIBUTE_DEFAULT_VALUE] = defaultValue;
    }
    return result;
  };
  const SettingUICommon = {
    id: "component-common",
    title: "通用",
    forms: [
      {
        text: "Toast配置",
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
      // {
      // 	text: "Cookie配置",
      // 	type: "forms",
      // 	forms: [
      // 		UISwitch(
      // 			"启用",
      // 			"httpx-use-cookie-enable",
      // 			false,
      // 			void 0,
      // 			"启用后，将根据下面的配置进行添加cookie"
      // 		),
      // 		UISwitch(
      // 			"使用document.cookie",
      // 			"httpx-use-document-cookie",
      // 			false,
      // 			void 0,
      // 			"自动根据请求的域名来设置对应的cookie"
      // 		),
      // 		UITextArea(
      // 			"tieba.baidu.com",
      // 			"httpx-cookie-tieba.baidu.com",
      // 			"",
      // 			void 0,
      // 			void 0,
      // 			"Cookie格式：xxx=xxxx;xxx=xxxx"
      // 		),
      // 	],
      // },
    ]
  };
  const MSettingUICommon = {
    id: "component-common",
    title: "通用",
    forms: [
      {
        text: "Toast配置",
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
      // {
      // 	text: "Cookie配置",
      // 	type: "forms",
      // 	forms: [
      // 		UISwitch(
      // 			"启用",
      // 			"httpx-use-cookie-enable",
      // 			false,
      // 			void 0,
      // 			"启用后，将根据下面的配置进行添加cookie"
      // 		),
      // 		UISwitch(
      // 			"使用document.cookie",
      // 			"httpx-use-document-cookie",
      // 			false,
      // 			void 0,
      // 			"自动根据请求的域名来设置对应的cookie"
      // 		),
      // 		UITextArea(
      // 			"tieba.baidu.com",
      // 			"httpx-cookie-tieba.baidu.com",
      // 			"",
      // 			void 0,
      // 			void 0,
      // 			"Cookie格式：xxx=xxxx;xxx=xxxx"
      // 		),
      // 	],
      // },
    ]
  };
  const __PopsPanel__ = {
    data: null,
    oneSuccessExecMenu: null,
    onceExec: null,
    listenData: null
  };
  const PopsPanel = {
    /** 数据 */
    $data: {
      /**
       * 菜单项的默认值
       */
      get data() {
        if (__PopsPanel__.data == null) {
          __PopsPanel__.data = new utils.Dictionary();
        }
        return __PopsPanel__.data;
      },
      /**
       * 成功只执行了一次的项
       */
      get oneSuccessExecMenu() {
        if (__PopsPanel__.oneSuccessExecMenu == null) {
          __PopsPanel__.oneSuccessExecMenu = new utils.Dictionary();
        }
        return __PopsPanel__.oneSuccessExecMenu;
      },
      /**
       * 成功只执行了一次的项
       */
      get onceExec() {
        if (__PopsPanel__.onceExec == null) {
          __PopsPanel__.onceExec = new utils.Dictionary();
        }
        return __PopsPanel__.onceExec;
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
        if (__PopsPanel__.listenData == null) {
          __PopsPanel__.listenData = new utils.Dictionary();
        }
        return __PopsPanel__.listenData;
      }
    },
    init() {
      this.initPanelDefaultValue();
      this.initExtensionsMenu();
    },
    initExtensionsMenu() {
      if (_unsafeWindow.top !== _unsafeWindow.self) {
        return;
      }
      GM_Menu.add([
        {
          key: "show_pops_panel_setting",
          text: "⚙ PC端设置",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback: () => {
            this.showPanel();
          }
        },
        {
          key: "m_show_pops_panel_setting",
          text: "⚙ 移动端端设置",
          autoReload: false,
          isStoreValue: false,
          showText(text) {
            return text;
          },
          callback: () => {
            this.showMPanel();
          }
        },
        {
          key: "gotoCSDNCKnow",
          text: "⚙ 前往C知道",
          isStoreValue: false,
          autoReload: false,
          showText(text) {
            return text;
          },
          callback() {
            window.open("https://so.csdn.net/chat", "_blank");
          }
        }
      ]);
    },
    /** 初始化本地设置默认的值 */
    initPanelDefaultValue() {
      let that = this;
      function initDefaultValue(config) {
        if (!config["attributes"]) {
          return;
        }
        let key = config.attributes[ATTRIBUTE_KEY];
        let defaultValue = config["attributes"][ATTRIBUTE_DEFAULT_VALUE];
        if (key == null) {
          log.warn(["请先配置键", config]);
          return;
        }
        if (that.$data.data.has(key)) {
          log.warn("请检查该key(已存在): " + key);
        }
        that.$data.data.set(key, defaultValue);
      }
      let contentConfigList = this.getPanelContentConfig().concat(
        this.getMPanelContentConfig()
      );
      for (let index = 0; index < contentConfigList.length; index++) {
        let leftContentConfigItem = contentConfigList[index];
        if (!leftContentConfigItem.forms) {
          continue;
        }
        let rightContentConfigList = leftContentConfigItem.forms;
        for (let formItemIndex = 0; formItemIndex < rightContentConfigList.length; formItemIndex++) {
          let rightContentConfigItem = rightContentConfigList[formItemIndex];
          if (rightContentConfigItem.forms) {
            let childFormConfigList = rightContentConfigItem.forms;
            for (let formChildConfigIndex = 0; formChildConfigIndex < childFormConfigList.length; formChildConfigIndex++) {
              initDefaultValue(childFormConfigList[formChildConfigIndex]);
            }
          } else {
            initDefaultValue(rightContentConfigItem);
          }
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
     * 判断该键是否存在
     * @param key 键
     */
    hasKey(key) {
      let locaData = _GM_getValue(KEY, {});
      return key in locaData;
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
    addValueChangeListener(key, callback) {
      let listenerId = Math.random();
      this.$listener.listenData.set(key, {
        id: listenerId,
        key,
        callback
      });
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
     * 自动判断菜单是否启用，然后执行回调
     * @param key
     * @param callback 回调
     */
    execMenu(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError("key 必须是字符串");
      }
      if (!this.$data.data.has(key)) {
        log.warn(`${key} 键不存在`);
        return;
      }
      let value = PopsPanel.getValue(key);
      if (value) {
        callback(value);
      }
    },
    /**
     * 自动判断菜单是否启用，然后执行回调，只会执行一次
     * @param key
     * @param callback 回调
     */
    execMenuOnce(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError("key 必须是字符串");
      }
      if (!this.$data.data.has(key)) {
        log.warn(`${key} 键不存在`);
        return;
      }
      let value = PopsPanel.getValue(key);
      if (value) {
        if (this.$data.oneSuccessExecMenu.has(key)) {
          return;
        }
        callback(value);
        this.$data.oneSuccessExecMenu.set(key, 1);
      }
    },
    /**
     * 根据key执行一次
     * @param key
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
     * 显示设置面板
     */
    showPanel() {
      pops.panel({
        title: {
          text: `${SCRIPT_NAME}-PC端设置`,
          position: "center",
          html: false,
          style: ""
        },
        content: this.getPanelContentConfig(),
        mask: {
          enable: true,
          clickEvent: {
            toClose: true,
            toHide: false
          }
        },
        isMobile: this.isMobile(),
        width: this.getWidth(),
        height: this.getHeight(),
        drag: true,
        only: true
      });
    },
    /**
     * 显示设置面板
     */
    showMPanel() {
      pops.panel({
        title: {
          text: `${SCRIPT_NAME}-移动端设置`,
          position: "center",
          html: false,
          style: ""
        },
        content: this.getMPanelContentConfig(),
        mask: {
          enable: true,
          clickEvent: {
            toClose: true,
            toHide: false
          }
        },
        isMobile: this.isMobile(),
        width: this.getWidth(),
        height: this.getHeight(),
        drag: true,
        only: true
      });
    },
    isMobile() {
      return window.outerWidth < 550;
    },
    /**
     * 获取设置面板的宽度
     */
    getWidth() {
      if (window.outerWidth < 800) {
        return "92dvw";
      } else {
        return "800px";
      }
    },
    /**
     * 获取设置面板的高度
     */
    getHeight() {
      if (window.outerHeight > 450) {
        return "80dvh";
      } else {
        return "450px";
      }
    },
    /**
     * 获取配置内容
     */
    getPanelContentConfig() {
      let configList = [
        SettingUICommon,
        SettingUIBlog,
        SettingUILink,
        SettingUIHuaWeiCloud,
        SettingUIWenKu,
        SettingUISo
      ];
      return configList;
    },
    /**
     * 获取配置内容
     */
    getMPanelContentConfig() {
      let configList = [
        MSettingUICommon,
        MSettingUIBlog,
        MSettingUILink,
        MSettingUIHuaWeiCloud,
        MSettingUIWenKu,
        MSettingUISo,
        MSettingUIDownload
      ];
      return configList;
    }
  };
  const ShieldCSS$4 = "/* 底部免费抽xxx奖品广告 */\r\ndiv.siderbar-box,\r\n/* 华为开发者联盟加入社区 */\r\ndiv.user-desc.user-desc-fix {\r\n  display: none !important;\r\n}\r\n";
  const CSDNUtils = {
    /**
     * 移除元素（未出现也可以等待出现）
     * @param selectorText 元素选择器
     */
    waitForElementToRemove(selectorText = "") {
      utils.waitNodeList(selectorText).then((nodeList) => {
        nodeList.forEach((item) => item.remove());
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
      addStyle(`${selectorList.join(",\n")}{display: none !important;}`);
    }
  };
  const CSDNHuaWeiCloud = {
    init() {
      addStyle(ShieldCSS$4);
      PopsPanel.execMenu(
        "csdn-hua-wei-cloud-shieldCloudDeveloperTaskChallengeEvent",
        () => {
          this.shieldCloudDeveloperTaskChallengeEvent();
        }
      );
      PopsPanel.execMenu("csdn-hua-wei-cloud-autoExpandContent", () => {
        this.autoExpandContent();
      });
      PopsPanel.execMenu("csdn-hua-wei-cloud-shieldLeftFloatingButton", () => {
        this.shieldLeftFloatingButton();
      });
      PopsPanel.execMenu("csdn-hua-wei-cloud-blockRightColumn", () => {
        this.blockRightColumn();
      });
      PopsPanel.execMenu(
        "csdn-hua-wei-cloud-blockRecommendedContentAtTheBottom",
        () => {
          this.blockRecommendedContentAtTheBottom();
        }
      );
      PopsPanel.execMenu(
        "csdn-hua-wei-cloud-shieldTheBottomForMoreRecommendations",
        () => {
          this.shieldTheBottomForMoreRecommendations();
        }
      );
    },
    /**
     * 自动展开内容
     */
    autoExpandContent() {
      log.info("自动展开全文");
      CSDNUtils.addBlockCSS("div.article-show-more");
      addStyle(`
        /* 自动展开全文 */
        .main-content .user-article{
            height: auto !important;
            overflow: auto !important;
        }
        `);
    },
    /**
     * 屏蔽云开发者任务挑战活动
     */
    shieldCloudDeveloperTaskChallengeEvent() {
      let GM_cookie = new utils.GM_Cookie();
      GM_cookie.set({ name: "show_join_group_index", value: 1 });
      log.info("设置Cookie 屏蔽云开发者任务挑战活动");
    },
    /**
     * 屏蔽左侧悬浮按钮
     */
    shieldLeftFloatingButton() {
      log.info("屏蔽左侧悬浮按钮，包括当前阅读量、点赞按钮、评论按钮、分享按钮");
      CSDNUtils.addBlockCSS("div.toolbar-wrapper.article-interact-bar");
    },
    /**
     * 屏蔽右侧栏
     */
    blockRightColumn() {
      log.info("屏蔽右侧栏，包括相关产品-活动日历-运营活动-热门标签");
      CSDNUtils.addBlockCSS("div.page-home-right.dp-aside-right");
    },
    /**
     * 屏蔽底部推荐内容
     */
    blockRecommendedContentAtTheBottom() {
      log.info("屏蔽底部推荐内容");
      CSDNUtils.addBlockCSS("div.recommend-card-box");
    },
    /**
     * 屏蔽底部更多推荐
     */
    shieldTheBottomForMoreRecommendations() {
      log.info("屏蔽底部更多推荐");
      CSDNUtils.addBlockCSS("div.more-article");
    }
  };
  const BlogShieldCSS = ".ecommend-item-box.recommend-recommend-box,\r\n.login-mark,\r\n.opt-box.text-center,\r\n.leftPop,\r\n#csdn-shop-window,\r\n.toolbar-advert,\r\n.hide-article-box,\r\n.user-desc.user-desc-fix,\r\n.recommend-card-box,\r\n.more-article,\r\n.article-show-more,\r\n#csdn-toolbar-profile-nologin,\r\n.guide-rr-first,\r\n#recommend-item-box-tow,\r\n/* 发文章得原力分图片提示 */\r\ndiv.csdn-toolbar-creative-mp,\r\n/* 阅读终点，创作起航，您可以撰写心得或摘录文章要点写篇博文。 */\r\n#toolBarBox div.write-guide-buttom-box,\r\n/* 觉得还不错? 一键收藏 */\r\nul.toolbox-list div.tool-active-list,\r\n/* 右边按钮组的最上面的创作话题 */\r\ndiv.csdn-side-toolbar .activity-swiper-box,\r\n.sidetool-writeguide-box .tip-box,\r\n/* 右下角的登录提示 */\r\n.passport-login-tip-container {\r\n  display: none !important;\r\n}\r\n\r\n\r\n";
  const BlogCSS = "/*.blog_container_aside,\r\n#nav {\r\n	margin-left: -45px;\r\n}\r\n.recommend-right.align-items-stretch.clearfix,\r\n.dl_right_fixed {\r\n	margin-left: 45px;\r\n}*/\r\n";
  const BlogArticleCenterCSS = '#mainBox main {\r\n	width: inherit !important;\r\n}\r\n/* 当文章向下滚动时，触发左侧信息悬浮 */\r\naside.blog_container_aside[style*="position: fixed;"] {\r\n	display: none !important;\r\n}\r\n\r\n@media (min-width: 1320px) and (max-width: 1380px) {\r\n	.nodata .container {\r\n		width: 900px !important;\r\n	}\r\n\r\n	.nodata .container main {\r\n		width: 900px;\r\n	}\r\n\r\n	.nodata .container main #pcCommentBox pre > ol.hljs-ln {\r\n		width: 490px !important;\r\n	}\r\n\r\n	.nodata .container main .articleConDownSource {\r\n		width: 500px;\r\n	}\r\n}\r\n\r\n@media screen and (max-width: 1320px) {\r\n	.nodata .container {\r\n		width: 760px !important;\r\n	}\r\n\r\n	.nodata .container main {\r\n		width: 760px;\r\n	}\r\n\r\n	.nodata .container main #pcCommentBox pre > ol.hljs-ln {\r\n		width: 490px !important;\r\n	}\r\n\r\n	.nodata .container main .toolbox-list .tool-reward {\r\n		display: none;\r\n	}\r\n\r\n	.nodata\r\n		.container\r\n		main\r\n		.more-toolbox-new\r\n		.toolbox-left\r\n		.profile-box\r\n		.profile-name {\r\n		max-width: 128px;\r\n	}\r\n\r\n	.nodata .container main .articleConDownSource {\r\n		width: 420px;\r\n	}\r\n}\r\n\r\n@media screen and (min-width: 1380px) {\r\n	.nodata .container {\r\n		width: 1010px !important;\r\n	}\r\n\r\n	.nodata .container main {\r\n		width: 1010px;\r\n	}\r\n\r\n	.nodata .container main #pcCommentBox pre > ol.hljs-ln {\r\n		width: 490px !important;\r\n	}\r\n\r\n	.nodata .container main .articleConDownSource {\r\n		width: 560px;\r\n	}\r\n}\r\n\r\n@media (min-width: 1550px) and (max-width: 1700px) {\r\n	.nodata .container {\r\n		width: 820px !important;\r\n	}\r\n\r\n	.nodata .container main {\r\n		width: 820px;\r\n	}\r\n\r\n	.nodata .container main #pcCommentBox pre > ol.hljs-ln {\r\n		width: 690px !important;\r\n	}\r\n\r\n	.nodata .container main .articleConDownSource {\r\n		width: 500px;\r\n	}\r\n}\r\n\r\n@media screen and (min-width: 1700px) {\r\n	.nodata .container {\r\n		width: 1010px !important;\r\n	}\r\n\r\n	.nodata .container main {\r\n		width: 1010px;\r\n	}\r\n\r\n	.nodata .container main #pcCommentBox pre > ol.hljs-ln {\r\n		width: 690px !important;\r\n	}\r\n\r\n	.nodata .container main .articleConDownSource {\r\n		width: 560px;\r\n	}\r\n}\r\n';
  const CSDNBlogRightToolBar = {
    init() {
      if (!PopsPanel.getValue("csdn-blog-rightToolbarEnable")) {
        this.shieldRightToolbar();
      }
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarCreativeCenter", () => {
        this.shieldCreativeCenter();
      });
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarShowOrSidebar", () => {
        this.shieldShowOrSidebar();
      });
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarBeginnerGuidance", () => {
        this.shieldBeginnerGuidance();
      });
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarCustomerService", () => {
        this.shieldCustomerService();
      });
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarReport", () => {
        this.shieldReport();
      });
      PopsPanel.execMenuOnce("csdn-blog-rightToolbarBackToTop", () => {
        this.shieldBackToTop();
      });
      this.initRightToolbarOffset();
      domutils.ready(() => {
        PopsPanel.execMenu("csdn-blog-addGotoRecommandButton", () => {
          this.addGotoRecommandButton();
        });
      });
    },
    /**
     * 屏蔽右侧工具栏
     */
    shieldRightToolbar() {
      log.info("屏蔽右侧工具栏");
      CSDNUtils.addBlockCSS(`div.csdn-side-toolbar`);
    },
    /**
     * 【添加】前往评论按钮，在返回顶部的下面
     */
    addGotoRecommandButton() {
      log.info("【添加】前往评论按钮，在返回顶部的上面");
      let gotoRecommandNode = document.createElement("a");
      gotoRecommandNode.className = "option-box";
      gotoRecommandNode.setAttribute("data-type", "gorecommand");
      gotoRecommandNode.innerHTML = `<span class="show-txt" style="display:flex;opacity:100;">前往<br>评论</span>`;
      gotoRecommandNode.addEventListener("click", function() {
        let toolbarBoxElement = document.querySelector(
          "#toolBarBox"
        );
        if (!toolbarBoxElement.getClientRects().length) {
          log.error("评论区处于隐藏状态");
          return;
        }
        log.info("滚动到评论");
        let toolbarBoxOffsetTop = toolbarBoxElement.getBoundingClientRect().top + window.scrollY;
        let csdnToolBarElement = document.querySelector(
          "#csdn-toolbar"
        );
        let csdnToolBarStyles = window.getComputedStyle(csdnToolBarElement);
        let csdnToolBarHeight = csdnToolBarElement.clientHeight - parseFloat(csdnToolBarStyles.paddingTop) - parseFloat(csdnToolBarStyles.paddingBottom);
        window.scrollTo({
          top: toolbarBoxOffsetTop - csdnToolBarHeight - 8,
          left: 0,
          behavior: "smooth"
        });
      });
      utils.waitNode(".csdn-side-toolbar").then(() => {
        let targetElement = document.querySelector(
          ".csdn-side-toolbar a:nth-last-child(2)"
        );
        targetElement.parentElement.insertBefore(
          gotoRecommandNode,
          targetElement.nextSibling
        );
      });
    },
    /**
     * 初始化右侧工具栏的偏移（top、right）
     */
    initRightToolbarOffset() {
      log.info("初始化右侧工具栏的偏移（top、right）");
      addStyle(`
        .csdn-side-toolbar{
          left: unset !important;
        }
        `);
      utils.waitNode(".csdn-side-toolbar").then(($sideToolbar) => {
        domutils.css($sideToolbar, {
          top: parseInt(PopsPanel.getValue("csdn-blog-rightToolbarTopOffset")) + "px",
          right: parseInt(PopsPanel.getValue("csdn-blog-rightToolbarRightOffset")) + "px"
        });
      });
    },
    /**
     * 【屏蔽】创作中心
     */
    shieldCreativeCenter() {
      log.info("【屏蔽】创作中心");
      CSDNUtils.addBlockCSS(".csdn-side-toolbar .sidetool-writeguide-box");
    },
    /**
     * 【屏蔽】显示/隐藏侧栏
     */
    shieldShowOrSidebar() {
      log.info("【屏蔽】显示/隐藏侧栏");
      CSDNUtils.addBlockCSS(".csdn-side-toolbar a.sidecolumn");
    },
    /**
     * 【屏蔽】新手引导
     */
    shieldBeginnerGuidance() {
      log.info("【屏蔽】新手引导");
      CSDNUtils.addBlockCSS('.csdn-side-toolbar a.option-box[data-type="guide"]');
    },
    /**
     * 【屏蔽】客服
     */
    shieldCustomerService() {
      log.info("【屏蔽】客服");
      CSDNUtils.addBlockCSS('.csdn-side-toolbar a.option-box[data-type="cs"]');
    },
    /**
     * 【屏蔽】举报
     */
    shieldReport() {
      log.info("【屏蔽】举报");
      CSDNUtils.addBlockCSS(
        '.csdn-side-toolbar a.option-box[data-type="report"]'
      );
    },
    /**
     * 【屏蔽】返回顶部
     */
    shieldBackToTop() {
      log.info("【屏蔽】返回顶部");
      CSDNUtils.addBlockCSS('.csdn-side-toolbar a.option-box[data-type="gotop"]');
    }
  };
  const CSDNBlog = {
    init() {
      this.addCSS();
      CSDNBlogRightToolBar.init();
      PopsPanel.execMenu("csdn-blog-articleCenter", () => {
        this.articleCenter();
      });
      PopsPanel.execMenu("csdn-blog-shieldLoginDialog", () => {
        this.shieldLoginDialog();
      });
      PopsPanel.execMenu("csdn-blog-autoExpandContent", () => {
        this.autoExpandContent();
      });
      PopsPanel.execMenu("csdn-blog-autoExpandCodeContent", () => {
        this.autoExpandCodeContent();
      });
      PopsPanel.execMenu("csdn-blog-blockComment", () => {
        this.blockComment();
      });
      PopsPanel.execMenu("csdn-blog-shieldBottomRecommendArticle", () => {
        this.shieldBottomRecommendArticle();
      });
      PopsPanel.execMenu("csdn-blog-shieldBottomSkillTree", () => {
        this.shieldBottomSkillTree();
      });
      PopsPanel.execMenu("csdn-blog-shieldBottomFloatingToolbar", () => {
        this.shieldBottomFloatingToolbar();
      });
      PopsPanel.execMenu("csdn-blog-shieldLeftBlogContainerAside", () => {
        this.shieldLeftBlogContainerAside();
      });
      PopsPanel.execMenu("csdn-blog-shieldRightDirectoryInformation", () => {
        this.shieldRightDirectoryInformation();
      });
      PopsPanel.execMenu("csdn-blog-shieldTopToolbar", () => {
        this.shieldTopToolbar();
      });
      PopsPanel.execMenu("csdn-blog-shieldArticleSearchTip", () => {
        this.shieldArticleSearchTip();
      });
      PopsPanel.execMenu("csdn-blog-allowSelectContent", () => {
        this.allowSelectContent();
      });
      domutils.ready(() => {
        PopsPanel.execMenu("csdn-blog-removeClipboardHijacking", () => {
          this.removeClipboardHijacking();
        });
        PopsPanel.execMenuOnce("csdn-blog-unBlockCopy", () => {
          this.unBlockCopy();
        });
        PopsPanel.execMenu("csdn-blog-identityCSDNDownload", () => {
          this.identityCSDNDownload();
        });
        PopsPanel.execMenuOnce("csdn-blog-clickPreCodeAutomatically", () => {
          this.clickPreCodeAutomatically();
        });
        PopsPanel.execMenu("csdn-blog-restoreComments", () => {
          this.restoreComments();
        });
      });
    },
    /**
     * 添加屏蔽CSS和功能CSS
     */
    addCSS() {
      log.info("添加屏蔽CSS和功能CSS");
      addStyle(BlogShieldCSS);
      addStyle(BlogCSS);
    },
    /**
     * 去除剪贴板劫持
     */
    removeClipboardHijacking() {
      var _a2;
      log.info("去除剪贴板劫持");
      (_a2 = document.querySelector(".article-copyright")) == null ? void 0 : _a2.remove();
      if (_unsafeWindow.articleType) {
        _unsafeWindow.articleType = 0;
      }
      if (_unsafeWindow.csdn && _unsafeWindow.csdn.copyright && _unsafeWindow.csdn.copyright.textData) {
        _unsafeWindow.csdn.copyright.textData = "";
      }
      if (_unsafeWindow.csdn && _unsafeWindow.csdn.copyright && _unsafeWindow.csdn.copyright.htmlData) {
        _unsafeWindow.csdn.copyright.htmlData = "";
      }
    },
    /**
     * 取消禁止复制
     */
    unBlockCopy() {
      log.info("取消禁止复制");
      domutils.on(
        document,
        "click",
        function(event) {
          let $click = event.target;
          let $parent = $click.parentElement;
          if (!$click.classList.contains("hljs-button")) {
            return;
          }
          utils.preventEvent(event);
          let copyText = ($parent.innerText || $parent.textContent || "").toString();
          log.info(
            "点击复制按钮复制内容：" + (copyText.length > 8 ? copyText.substring(0, 8) + "..." : copyText)
          );
          utils.setClip(copyText);
          $click.setAttribute("data-title", "复制成功");
        },
        {
          capture: true
        }
      );
      let changeDataTitle = new utils.LockFunction(function(event) {
        let $mouse = event.target;
        if ($mouse.localName !== "pre") {
          return;
        }
        let $hljsBtn = $mouse.querySelector(".hljs-button");
        if ($hljsBtn) {
          $hljsBtn.setAttribute("data-title", "复制");
        }
      });
      domutils.on(
        document,
        ["mouseenter", "mouseleave"],
        function(event) {
          changeDataTitle.run(event);
        },
        {
          capture: true
        }
      );
      utils.waitNode("#content_views").then(($content_views) => {
        var _a2;
        if (_unsafeWindow.$) {
          (_a2 = _unsafeWindow.$("#content_views")) == null ? void 0 : _a2.unbind("copy");
        }
        domutils.on(
          $content_views,
          "copy",
          function(event) {
            utils.preventEvent(event);
            let selectText = _unsafeWindow.getSelection();
            let copyText = selectText == null ? void 0 : selectText.toString();
            log.info(
              "Ctrl+C复制内容：" + (copyText.length > 8 ? copyText.substring(0, 8) + "..." : copyText)
            );
            utils.setClip(copyText);
            return false;
          },
          {
            capture: true
          }
        );
      });
      utils.waitNode(".hljs-button").then(() => {
        setTimeout(() => {
          document.querySelectorAll(".hljs-button").forEach((element) => {
            element.removeAttribute("onclick");
            element.removeAttribute("data-report-click");
            element.setAttribute("data-title", "复制");
          });
        }, 250);
      });
    },
    /**
     * 点击代码块自动展开
     */
    clickPreCodeAutomatically() {
      log.info("点击代码块自动展开");
      document.addEventListener("click", function(event) {
        var _a2;
        let $click = event.target;
        if ($click.localName !== "pre") {
          return;
        }
        $click.style.setProperty("height", "auto");
        (_a2 = $click.querySelector(".hide-preCode-box")) == null ? void 0 : _a2.remove();
      });
    },
    /**
     * 恢复评论到正确位置
     */
    restoreComments() {
      log.info("恢复评论到正确位置-第一条评论");
      utils.waitNode(".first-recommend-box").then(($firstRecommendBox) => {
        let recommendBoxElement = document.querySelector(
          ".recommend-box.insert-baidu-box.recommend-box-style"
        );
        recommendBoxElement.insertBefore(
          $firstRecommendBox,
          recommendBoxElement.firstChild
        );
      });
      log.info("恢复评论到正确位置-第二条评论");
      utils.waitNode(".second-recommend-box").then(($secondRecommendBox) => {
        let recommendBoxElement = document.querySelector(
          ".recommend-box.insert-baidu-box.recommend-box-style"
        );
        recommendBoxElement.insertBefore(
          $secondRecommendBox,
          recommendBoxElement.firstChild
        );
      });
    },
    /**
     * 标识CSDN下载的链接
     */
    identityCSDNDownload() {
      log.info("标识CSDN下载的链接");
      document.querySelectorAll(
        ".recommend-item-box[data-url*='https://download.csdn.net/']"
      ).forEach((item) => {
        if (PopsPanel.getValue("csdn-blog-removeResourceDownloadArticle")) {
          item.remove();
        } else {
          item.querySelector(".content-box").style.setProperty("border", "2px solid red");
        }
      });
    },
    /**
     * 全文居中
     */
    articleCenter() {
      log.info("全文居中");
      addStyle(BlogArticleCenterCSS);
    },
    /**
     * 屏蔽登录弹窗
     */
    shieldLoginDialog() {
      log.info("屏蔽登录弹窗");
      CSDNUtils.addBlockCSS(`.passport-login-container`);
    },
    /**
     * 自动展开代码块
     */
    autoExpandCodeContent() {
      log.info("自动展开代码块");
      CSDNUtils.addBlockCSS("pre.set-code-hide .hide-preCode-box");
      addStyle(`
		pre.set-code-hide{
			height: auto !important;
		}
		/* 自动展开代码块 */
		.comment-list-box,
		main div.blog-content-box pre {
			max-height: none !important;
		}
        `);
    },
    /**
     * 自动展开全文
     */
    autoExpandContent() {
      log.info("自动展开全文");
      addStyle(`
		/* 自动展开全文 */
		#article_content,
		.user-article.user-article-hide {
			height: auto !important;
			overflow: auto !important;
		}
        `);
    },
    /**
     * 屏蔽评论区
     */
    blockComment() {
      log.info("屏蔽评论区");
      CSDNUtils.addBlockCSS(`#pcCommentBox`);
    },
    /**
     * 屏蔽底部推荐文章
     */
    shieldBottomRecommendArticle() {
      log.info("屏蔽底部推荐文章");
      CSDNUtils.addBlockCSS(`main > div.recommend-box`);
    },
    /**
     * 屏蔽底部xx技能树
     */
    shieldBottomSkillTree() {
      log.info("屏蔽底部xx技能树");
      CSDNUtils.addBlockCSS(`#treeSkill`);
    },
    /**
     * 屏蔽底部悬浮工具栏
     */
    shieldBottomFloatingToolbar() {
      log.info("屏蔽底部悬浮工具栏");
      CSDNUtils.addBlockCSS(`#toolBarBox`);
    },
    /**
     * 屏蔽左侧博客信息
     */
    shieldLeftBlogContainerAside() {
      log.info("【屏蔽】左侧博客信息");
      CSDNUtils.addBlockCSS(`aside.blog_container_aside`);
    },
    /**
     * 【屏蔽】右侧目录信息
     */
    shieldRightDirectoryInformation() {
      log.info("【屏蔽】右侧目录信息");
      CSDNUtils.addBlockCSS("#rightAsideConcision", "#rightAside");
    },
    /**
     * 屏蔽顶部Toolbar
     */
    shieldTopToolbar() {
      log.info("屏蔽顶部Toolbar");
      CSDNUtils.addBlockCSS(`#toolbarBox`);
    },
    /**
     * 屏蔽文章内的选中搜索悬浮提示
     */
    shieldArticleSearchTip() {
      log.info("屏蔽文章内的选中搜索悬浮提示");
      CSDNUtils.addBlockCSS(`#articleSearchTip`);
    },
    /**
     * 允许选择内容
     */
    allowSelectContent() {
      log.info("允许选择内容");
      addStyle(`
		#content_views,
		#content_views pre,
		#content_views pre code {
			user-select: text !important;
		}
		`);
    }
  };
  const WenkuCSS = "#chatgpt-article-detail\r\n  > div.layout-center\r\n  > div.main\r\n  > div.article-box\r\n  > div.cont.first-show.forbid {\r\n  max-height: unset !important;\r\n  height: auto !important;\r\n  overflow: auto !important;\r\n}\r\n\r\n.forbid {\r\n  user-select: text !important;\r\n}\r\n";
  const ShieldCSS$3 = "/* wenku顶部横幅 */\r\n#app > div > div.main.pb-32 > div > div.top-bar,\r\n/* 底部展开全文 */\r\n#chatgpt-article-detail > div.layout-center > div.main > div.article-box > div.cont.first-show.forbid > div.open {\r\n  display: none !important;\r\n}";
  const CSDNWenKu = {
    init() {
      addStyle(WenkuCSS);
      addStyle(ShieldCSS$3);
      PopsPanel.execMenu("csdn-wenku-shieldResourceRecommend", () => {
        this.shieldResourceRecommend();
      });
      PopsPanel.execMenu("csdn-wenku-shieldRightUserInfo", () => {
        this.shieldRightUserInfo();
      });
      PopsPanel.execMenu("csdn-wenku-shieldRightToolBar", () => {
        this.shieldRightToolBar();
      });
    },
    /**
     * 【屏蔽】资源推荐
     */
    shieldResourceRecommend() {
      log.info("【屏蔽】资源推荐");
      CSDNUtils.addBlockCSS("#recommend");
    },
    /**
     * 【屏蔽】右侧用户信息
     */
    shieldRightUserInfo() {
      log.info("【屏蔽】右侧用户信息");
      CSDNUtils.addBlockCSS(".layout-right");
    },
    /**
     * 【屏蔽】右侧悬浮工具栏
     */
    shieldRightToolBar() {
      log.info("【屏蔽】右侧悬浮工具栏");
      CSDNUtils.addBlockCSS(".csdn-side-toolbar");
    }
  };
  const CSDNLink = {
    init() {
      PopsPanel.execMenu("csdn-link-jumpRedirect", () => {
        this.jumpRedirect();
      });
    },
    /**
     * 去除CSDN拦截其它网址的url并自动跳转
     */
    jumpRedirect() {
      if (window.location.hostname === "link.csdn.net" && window.location.search.startsWith("?target")) {
        window.stop();
        let search = window.location.search.replace(/^\?target=/gi, "");
        search = decodeURIComponent(search);
        let newURL = search;
        log.success(`跳转链接 ${newURL}`);
        window.location.href = newURL;
      }
    }
  };
  const CSDN = {
    init() {
      if (CSDNRouter.isLink()) {
        log.info("Router: 中转链接");
        CSDNLink.init();
      } else if (CSDNRouter.isHuaWeiCloudBlog()) {
        log.info("Router: 华为云联盟");
        CSDNHuaWeiCloud.init();
      } else if (CSDNRouter.isBlog()) {
        log.info("Router: 博客");
        CSDNBlog.init();
      } else if (CSDNRouter.isWenKu()) {
        log.info("Router: 文库");
        CSDNWenKu.init();
      } else {
        log.error("暂未适配，请反馈开发者：" + globalThis.location.href);
      }
    }
  };
  const M_CSDNLink = {
    init() {
      PopsPanel.execMenu("m-csdn-link-jumpRedirect", () => {
        CSDNLink.jumpRedirect();
      });
    }
  };
  const ShieldCSS$2 = "/* 右下角的 免费赢华为平板xxxx */\r\n.org-main-content .siderbar-box {\r\n  display: none !important;\r\n}\r\n";
  const M_CSDNHuaWeiCloud = {
    init() {
      addStyle(ShieldCSS$2);
      PopsPanel.execMenu("m-csdn-hua-wei-cloud-autoExpandContent", () => {
        CSDNHuaWeiCloud.autoExpandContent();
      });
    }
  };
  const ShieldCSS$1 = "#operate,.feed-Sign-span,\r\n.view_comment_box,\r\n.weixin-shadowbox.wap-shadowbox,\r\n.feed-Sign-span,\r\n.user-desc.user-desc-fix,\r\n.comment_read_more_box,\r\n#content_views pre.set-code-hide .hide-preCode-box,\r\n/* 登录弹窗 */\r\n.passport-login-container,\r\n.hljs-button[data-title='登录后复制'],\r\n.article-show-more,\r\n#treeSkill,\r\ndiv.btn_open_app_prompt_div,\r\ndiv.readall_box,\r\ndiv.aside-header-fixed,\r\ndiv.feed-Sign-weixin,\r\ndiv.ios-shadowbox {\r\n  display: none !important;\r\n}\r\n";
  const MBlogCSS = "#mainBox {\r\n  width: auto;\r\n}\r\n.user-desc.user-desc-fix {\r\n  height: auto !important;\r\n  overflow: auto !important;\r\n}\r\n.component-box .praise {\r\n  background: #ff5722;\r\n  border-radius: 5px;\r\n  padding: 0px 8px;\r\n  height: auto;\r\n}\r\n.component-box .praise,\r\n.component-box .share {\r\n  color: #fff;\r\n}\r\n.component-box a {\r\n  display: inline-block;\r\n  font-size: xx-small;\r\n}\r\n.component-box {\r\n  display: inline;\r\n  margin: 0;\r\n  position: relative;\r\n  white-space: nowrap;\r\n}\r\n.csdn-edu-title {\r\n  background: #4d6de1;\r\n  border-radius: 5px;\r\n  padding: 0px 8px;\r\n  height: auto;\r\n  color: #fff !important;\r\n}\r\n\r\n.GM-csdn-dl {\r\n  padding: 0.24rem 0.32rem;\r\n  width: 100%;\r\n  justify-content: space-between;\r\n  -webkit-box-pack: justify;\r\n  border-bottom: 1px solid #f5f6f7 !important;\r\n}\r\n.GM-csdn-title {\r\n  font-size: 0.3rem;\r\n  color: #222226;\r\n  letter-spacing: 0;\r\n  line-height: 0.44rem;\r\n  font-weight: 600;\r\n  /*max-height: .88rem;*/\r\n  word-break: break-all;\r\n  overflow: hidden;\r\n  display: -webkit-box;\r\n  -webkit-box-orient: vertical;\r\n  -webkit-line-clamp: 2;\r\n}\r\n.GM-csdn-title a {\r\n  word-break: break-all;\r\n  color: #222226;\r\n  font-weight: 600;\r\n}\r\n.GM-csdn-title em,\r\n.GM-csdn-content em {\r\n  font-style: normal;\r\n  color: #fc5531;\r\n}\r\n.GM-csdn-content {\r\n  /*max-width: 5.58rem;*/\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  display: -webkit-box;\r\n  -webkit-line-clamp: 1;\r\n  -webkit-box-orient: vertical;\r\n  color: #555666;\r\n  font-size: 0.24rem;\r\n  line-height: 0.34rem;\r\n  max-height: 0.34rem;\r\n  word-break: break-all;\r\n  -webkit-box-flex: 1;\r\n  -ms-flex: 1;\r\n  flex: 1;\r\n  margin-top: 0.16rem;\r\n}\r\n.GM-csdn-img img {\r\n  width: 2.18rem;\r\n  height: 1.58rem;\r\n  /*margin-left: .16rem*/\r\n}\r\n";
  const M_CSDNBlog = {
    init() {
      this.addCSS();
      PopsPanel.execMenu("m-csdn-blog-shieldTopToolbar", () => {
        this.shieldTopToolbar();
      });
      PopsPanel.execMenu("m-csdn-blog-notLimitCodePreMaxHeight", () => {
        this.notLimitCodePreMaxHeight();
      });
      PopsPanel.execMenu("m-csdn-blog-notLimitCommentMaxHeight", () => {
        this.notLimitCommentMaxHeight();
      });
      PopsPanel.execMenu("m-csdn-blog-allowSelectText", () => {
        this.allowSelectText();
      });
      PopsPanel.execMenu("m-csdn-blog-autoExpandContent", () => {
        this.autoExpandContent();
      });
      PopsPanel.execMenu("m-csdn-blog-blockBottomArticle", () => {
        this.blockBottomArticle();
      });
      PopsPanel.execMenu("m-csdn-blog-blockComment", () => {
        this.blockComment();
      });
      domutils.ready(() => {
        PopsPanel.execMenu("m-csdn-blog-removeAds", () => {
          this.removeAds();
        });
        PopsPanel.execMenu("m-csdn-blog-refactoringRecommendation", () => {
          this.refactoringRecommendation();
        });
        PopsPanel.execMenu("m-csdn-blog-unBlockCopy", () => {
          CSDNBlog.unBlockCopy();
        });
      });
    },
    addCSS() {
      addStyle(ShieldCSS$1);
      addStyle(MBlogCSS);
    },
    /**
     * 屏蔽顶部Toolbar
     */
    shieldTopToolbar() {
      log.info("屏蔽顶部Toolbar");
      CSDNUtils.addBlockCSS("#csdn-toolbar");
      addStyle(`
        /* 内容顶部要归位 */
        body #main,
        .margin_sides{
          margin-top: unset !important;
          padding-top: unset !important;
        }
        #article .article_title{
          margin-top: .32rem !important;
          padding-top: unset !important;
        }
        `);
    },
    /**
     * 重构底部推荐
     */
    refactoringRecommendation() {
      function refactoring() {
        log.info("重构底部推荐");
        document.querySelectorAll(
          ".container-fluid"
        ).forEach((item) => {
          var _a2, _b;
          let url = "";
          let title = "";
          let content = "";
          let img = "";
          let isCSDNDownload = false;
          let isCSDNEduDownload = false;
          if (item.hasAttribute("data-url")) {
            url = item.getAttribute("data-url");
            title = (_a2 = item.querySelector(".recommend_title div.left")) == null ? void 0 : _a2.innerHTML;
            if (!item.querySelector(".text")) {
              return;
            }
            content = (_b = item.querySelector(".text")) == null ? void 0 : _b.innerHTML;
            if (item.querySelectorAll(".recommend-img").length) {
              item.querySelectorAll(".recommend-img").forEach((item2) => {
                img += item2.innerHTML;
              });
            }
          } else {
            log.info("节点上无data-url");
            url = item.querySelector("a[data-type]").getAttribute("href");
            title = item.querySelector(".recommend_title div.left").innerHTML;
            content = item.querySelector(".text").innerHTML;
          }
          var _URL_ = new URL(url);
          if (_URL_.host === "download.csdn.net" || _URL_.host === "www.iteye.com" && _URL_.pathname.match(/^\/resource/gi)) {
            log.info("该链接为csdn资源下载");
            isCSDNDownload = true;
            title = `<div class="component-box"><a class="praise" href="javascript:;">CSDN下载</a></div>` + title;
          } else if (_URL_.origin.match(/edu.csdn.net/gi)) {
            isCSDNEduDownload = true;
            log.info("该链接为csdn学院下载");
            title = `<div class="component-box"><a class="csdn-edu-title" href="javascript:;">CSDN学院</a></div>` + title;
          }
          item.setAttribute("class", "GM-csdn-dl");
          item.setAttribute("data-url", url);
          item.innerHTML = `<div class="GM-csdn-title"><div class="left">${title}</div></div><div class="GM-csdn-content">${content}</div><div class="GM-csdn-img">${img}</div>`;
          item.addEventListener("click", function() {
            if (PopsPanel.getValue("m-csdn-blog-openNewTab")) {
              window.open(url, "_blank");
            } else {
              window.location.href = url;
            }
          });
          if ((isCSDNDownload || isCSDNEduDownload) && PopsPanel.getValue("m-csdn-blog-removeResourceArticle")) {
            item.remove();
          }
        });
      }
      let lockFunction = new utils.LockFunction(refactoring, 50);
      utils.waitNode("#recommend").then(($recommend) => {
        log.info("重构底部推荐");
        lockFunction.run();
        utils.mutationObserver($recommend, {
          callback: () => {
            lockFunction.run();
          },
          config: { childList: true, subtree: true, attributes: true }
        });
      });
    },
    /**
     * 屏蔽底部文章
     */
    blockBottomArticle() {
      log.info("屏蔽底部文章");
      CSDNUtils.addBlockCSS("#recommend");
    },
    /**
     * 屏蔽评论
     */
    blockComment() {
      log.info("屏蔽评论");
      CSDNUtils.addBlockCSS("#comment");
    },
    /**
     * 去除广告
     */
    removeAds() {
      log.info("去除广告");
      CSDNUtils.waitForElementToRemove(".passport-login-container");
      CSDNUtils.waitForElementToRemove(
        ".btn_open_app_prompt_box.detail-open-removed"
      );
      CSDNUtils.waitForElementToRemove(".add-firstAd");
      CSDNUtils.waitForElementToRemove("div.feed-Sign-weixin");
      CSDNUtils.waitForElementToRemove("div.ios-shadowbox");
    },
    /**
     * 不限制代码块最大高度
     */
    notLimitCodePreMaxHeight() {
      log.info("不限制代码块最大高度");
      addStyle(`
        pre{
            max-height: unset !important;
        }
        `);
    },
    /**
     * 不限制评论区最大高度
     */
    notLimitCommentMaxHeight() {
      log.info("不限制评论区最大高度");
      addStyle(`
        #comment{
          max-height: none !important;
        }
      `);
    },
    /**
     * 允许选择文字
     */
    allowSelectText() {
      log.info("允许选择文字");
      addStyle(`
        #content_views,
        #content_views pre,
        #content_views pre code{
            webkit-touch-callout: text !important;
            -webkit-user-select: text !important;
            -khtml-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        `);
    },
    /**
     * 自动展开内容
     */
    autoExpandContent() {
      log.info("自动展开内容");
      addStyle(`
        #content_views pre.set-code-hide,
        .article_content{
          height: 100% !important;
          overflow: auto !important;
        }
        `);
    }
  };
  const ShieldCSS = "/* 右下角的买一年送3个月的广告图标 */\r\n.blind_box {\r\n  display: none !important;\r\n}\r\n";
  const M_CSDNWenKu = {
    init() {
      addStyle(ShieldCSS);
      PopsPanel.execMenu("m-csdn-wenku-shieldBottomToolbar", () => {
        this.shieldBottomToolbar();
      });
    },
    /**
     * 【屏蔽】底部工具栏
     */
    shieldBottomToolbar() {
      log.info("【屏蔽】底部工具栏");
      CSDNUtils.addBlockCSS(`.page-container > div.btn`);
    }
  };
  const CSDNBlockCSS = "/* 右下角悬浮图标 买1年送3个月 */\r\n.page-container .blind_box,\r\n/* 底部工具栏右边的 开会员按钮（低至xx元/次） */\r\n.page-container .btn .ml-12,\r\n/* 登录弹窗 */\r\n.passport-login-container,\r\n/* 通用广告className匹配 */\r\n.ads {\r\n	display: none !important;\r\n}\r\n";
  const M_CSDNDownload = {
    init() {
      PopsPanel.execMenu("m-csdn-download-removeAds", () => {
        addStyle(CSDNBlockCSS);
      });
      PopsPanel.execMenuOnce(
        "m-csdn-download-automaticallyExpandResourceIntroduction",
        () => {
          this.automaticallyExpandResourceIntroduction();
        }
      );
    },
    /**
     * 自动展开资源介绍
     */
    automaticallyExpandResourceIntroduction() {
      log.info("自动展开资源介绍");
      CSDNUtils.addBlockCSS("label.unfold-font");
      addStyle(`
		.resource-desc{
			max-height: unset !important;
    		overflow: unset !important;
		}
		`);
    }
  };
  const M_CSDN = {
    init() {
      if (CSDNRouter.isLink()) {
        log.info("Router: 中转链接");
        M_CSDNLink.init();
      } else if (CSDNRouter.isHuaWeiCloudBlog()) {
        log.info("Router: 华为云联盟");
        M_CSDNHuaWeiCloud.init();
      } else if (CSDNRouter.isBlog()) {
        log.info("Router: 博客");
        M_CSDNBlog.init();
      } else if (CSDNRouter.isWenKu()) {
        log.info("Router: 文库");
        M_CSDNWenKu.init();
      } else if (CSDNRouter.isDownload()) {
        log.info("Router: 资源下载");
        M_CSDNDownload.init();
      } else {
        log.error("暂未适配，请反馈开发者：" + globalThis.location.href);
      }
    }
  };
  PopsPanel.init();
  let isMobile = utils.isPhone();
  let CHANGE_ENV_SET_KEY = "change_env_set";
  let chooseMode = _GM_getValue(CHANGE_ENV_SET_KEY);
  GM_Menu.add({
    key: CHANGE_ENV_SET_KEY,
    text: `⚙ 自动: ${isMobile ? "移动端" : "PC端"}`,
    autoReload: false,
    isStoreValue: false,
    showText(text) {
      if (chooseMode == null) {
        return text;
      }
      return text + ` 手动: ${chooseMode == 1 ? "移动端" : chooseMode == 2 ? "PC端" : "未知"}`;
    },
    callback: () => {
      let allowValue = [0, 1, 2];
      let chooseText = window.prompt(
        "请输入当前脚本环境判定\n\n自动判断: 0\n移动端: 1\nPC端: 2",
        "0"
      );
      if (!chooseText) {
        return;
      }
      let chooseMode2 = parseInt(chooseText);
      if (isNaN(chooseMode2)) {
        Qmsg.error("输入的不是规范的数字");
        return;
      }
      if (!allowValue.includes(chooseMode2)) {
        Qmsg.error("输入的值必须是0或1或2");
        return;
      }
      if (chooseMode2 == 0) {
        _GM_deleteValue(CHANGE_ENV_SET_KEY);
      } else {
        _GM_setValue(CHANGE_ENV_SET_KEY, chooseMode2);
      }
    }
  });
  if (chooseMode != null) {
    log.info(`手动判定为${chooseMode === 1 ? "移动端" : "PC端"}`);
    if (chooseMode == 1) {
      M_CSDN.init();
    } else if (chooseMode == 2) {
      CSDN.init();
    } else {
      Qmsg.error("意外，手动判定的值不在范围内");
      _GM_deleteValue(CHANGE_ENV_SET_KEY);
    }
  } else {
    if (isMobile) {
      log.info("自动判定为移动端");
      M_CSDN.init();
    } else {
      log.info("自动判定为PC端");
      CSDN.init();
    }
  }

})(Qmsg, DOMUtils, Utils);
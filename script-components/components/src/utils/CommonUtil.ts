import DOMUtils from "@whitesev/domutils";
import { addStyle, log, utils } from "../base.env";
import { GM_getResourceText } from "ViteGM";

export const CommonUtil = {
  /**
   * 移除元素（未出现也可以等待出现）
   * @param selector 元素选择器
   */
  waitRemove(...args: string[]) {
    args.forEach((selector) => {
      if (typeof selector !== "string") {
        return;
      }
      DOMUtils.waitNodeList<NodeListOf<HTMLElement>>(selector).then((nodeList) => {
        nodeList.forEach(($el) => $el.remove());
      });
    });
  },
  /**
   * 生成屏蔽CSS元素
   * @param args
   * @example
   * addBlockCSS("")
   * addBlockCSS("","")
   * addBlockCSS(["",""])
   */
  createBlockCSSNode(...args: (string | string[])[]) {
    let selectorList: string[] = [];
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

    return DOMUtils.createElement("style", {
      type: "text/css",
      innerHTML: `${selectorList.join(",\n")}{display: none !important;}`,
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
  addBlockCSS(...args: (string | string[])[]) {
    let selectorList: string[] = [];
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
  setGMResourceCSS(resourceMapData: {
    /** 使用@resource定义的名字 */
    keyName: string;
    /** 使用@resource引用的地址 */
    url: string;
  }) {
    let cssText = typeof GM_getResourceText === "function" ? GM_getResourceText(resourceMapData.keyName) : null;
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
  async loadStyleLink(url: string) {
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
  async loadScript(url: string) {
    let $script = document.createElement("script");
    $script.src = url;
    return new Promise<null>((resolve) => {
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
  fixUrl(url: string) {
    url = url.trim();
    if (url.startsWith("data:")) {
      return url;
    }
    if (url.match(/^http(s|):\/\//i)) {
      return url;
    } else if (url.startsWith("//")) {
      // 2个或2个以上的//
      if (url.startsWith("///")) {
        // 非法的//
      } else {
        // 补全protocol
        url = window.location.protocol + url;
      }
      return url;
    } else {
      if (!url.startsWith("/")) {
        // 不以/开头的，补上
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
   * 修复前：https://xxx.xxx.xxx/
   * 修复后：https://xxx.xxx.xxx/
   * @example
   * 修复前：http://xxx.xxx.xxx/
   * 修复后：https://xxx.xxx.xxx/
   */
  fixHttps(url: string) {
    if (url.startsWith("https://")) {
      // 已经是https
      return url;
    }
    if (!url.startsWith("http://")) {
      // 不是http链接
      return url;
    }
    try {
      let urlInstance = new URL(url);
      urlInstance.protocol = "https:";
      return urlInstance.toString();
    } catch {
      // 异常的url链接
      // 例如：data:application
      return url;
    }
  },
  /**
   * 禁止页面滚动，默认锁定html和body
   * @example
   * lockScroll();
   * @example
   * lockScroll(document.body);
   */
  lockScroll(...args: HTMLElement[]) {
    let $hidden = document.createElement("style");
    $hidden.innerHTML = /*css*/ `
			.pops-overflow-hidden-important {
				overflow: hidden !important;
			}
		`;
    let $elList = [document.documentElement, document.body].concat(...(args || []));
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
      },
    };
  },
  /**
   * 获取剪贴板文本
   */
  async getClipboardText(): Promise<string> {
    /** 读取剪贴板 */
    function readClipboardText(resolve: Function) {
      navigator.clipboard
        .readText()
        .then((clipboardText) => {
          resolve(clipboardText);
        })
        .catch((error: TypeError) => {
          log.error("读取剪贴板内容失败👉", error);
          resolve("");
        });
    }
    /** 申请读取剪贴板的权限 */
    function requestPermissionsWithClipboard(resolve: Function) {
      navigator.permissions
        .query({
          // @ts-ignore
          name: "clipboard-read",
        })
        .then((permissionStatus) => {
          readClipboardText(resolve);
        })
        .catch((error: TypeError) => {
          log.error("申请剪贴板权限失败，尝试直接读取👉", error.message ?? error.name ?? error.stack);
          /* 该权限申请Api可能在该环境下不生效，尝试直接读取剪贴板 */
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
            once: true,
          }
        );
      }
    });
  },
  /**
   * html转义
   * @param unsafe
   */
  escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/©/g, "&copy;")
      .replace(/®/g, "&reg;")
      .replace(/™/g, "&trade;")
      .replace(/→/g, "&rarr;")
      .replace(/←/g, "&larr;")
      .replace(/↑/g, "&uarr;")
      .replace(/↓/g, "&darr;")
      .replace(/—/g, "&mdash;")
      .replace(/–/g, "&ndash;")
      .replace(/…/g, "&hellip;")
      .replace(/ /g, "&nbsp;")
      .replace(/\r\n/g, "<br>") // 转义 Windows 换行符
      .replace(/\r/g, "<br>") // 转义 Mac 换行符
      .replace(/\n/g, "<br>")
      .replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"); // 转义制表符，用四个空格表示
  },
  /**
   * 在规定时间内循环，如果超时或返回false则取消循环
   * @param fn 循环的函数
   * @param intervalTime 循环间隔时间
   * @param [timeout=5000] 循环超时时间
   */
  interval(
    fn: (
      /**
       * 是否是超时的调用
       */
      isTimeout: boolean
    ) => void | boolean | Promise<void | boolean>,
    intervalTime: number,
    timeout: number = 5000
  ) {
    let timeId: number;
    /**
     * 循环的超时时间
     */
    let maxTimeout = timeout - intervalTime;
    /**
     * 累计的循环时间
     */
    let intervalTimeCount = intervalTime;
    let loop = async (isTimeout: boolean) => {
      let result = await fn(isTimeout);
      if ((typeof result === "boolean" && !result) || isTimeout) {
        utils.workerClearTimeout(timeId);
        return;
      }
      intervalTimeCount += intervalTime;
      if (intervalTimeCount > maxTimeout) {
        // 超时了
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
  findParentNode<T = HTMLElement>($el: HTMLElement, selector: string, parentSelector?: string): T | null | undefined {
    if (parentSelector) {
      let $parent = DOMUtils.closest($el, parentSelector);
      if ($parent) {
        let $target = $parent.querySelector(selector);
        return $target as T;
      }
    } else {
      if (DOMUtils.matches($el, selector)) {
        return $el as T;
      }
      let $parent = DOMUtils.closest($el, selector);
      return $parent as T;
    }
  },
};

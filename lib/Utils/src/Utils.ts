import { ColorConversion } from "./ColorConversion";
import { GBKEncoder } from "./GBKEncoder";
import { UtilsGMCookie } from "./UtilsGMCookie";
import { ajaxHooker } from "./ajaxHooker/ajaxHooker.js";
import { AjaxHooker1_2_4 } from "./ajaxHooker/ajaxHooker1.2.4";
import { GMMenu } from "./UtilsGMMenu";
import { Hooks } from "./Hooks";
import { Httpx } from "./Httpx";
import { indexedDB } from "./indexedDB";
import { LockFunction } from "./LockFunction";
import { Log } from "./Log";
import { Progress } from "./Progress";
import { TryCatch } from "./TryCatch";
import { UtilsDictionary } from "./Dictionary";
import type { DOMUtils_EventType } from "./types/Event";
import type { UtilsAjaxHookResult } from "./types/ajaxHooker";
import { GenerateUUID } from "./UtilsCommon";
import { WindowApi } from "./WindowApi";
import { Vue } from "./Vue";
import {
	type ArgsType,
	type JSTypeNames,
	type UtilsOwnObject,
} from "./types/global";
import type { WindowApiOption } from "./types/WindowApi";
import {
	clearInterval as WorkerClearInterval,
	clearTimeout as WorkerClearTimeout,
	setInterval as WorkerSetInterval,
	setTimeout as WorkerSetTimeout,
} from "worker-timers";
import { ModuleRaid } from "./ModuleRaid";
import { domUtils } from "./DOMUtils";
import { CommonUtil } from "./CommonUtil";

class Utils {
	private windowApi: typeof WindowApi.prototype;
	constructor(option?: WindowApiOption) {
		this.windowApi = new WindowApi(option);
	}
	/** 版本号 */
	version = "2025.7.29";
	/**
	 * 在页面中增加style元素，如果html节点存在子节点，添加子节点第一个，反之，添加到html节点的子节点最后一个
	 * @param cssText css字符串
	 * @returns 返回添加的CSS标签
	 * @example
	 * Utils.GM_addStyle("html{}");
	 * > <style type="text/css">html{}</style>
	 */
	addStyle(cssText: string): HTMLStyleElement;
	addStyle(cssText: string) {
		if (typeof cssText !== "string") {
			throw new Error("Utils.addStyle 参数cssText 必须为String类型");
		}
		let cssNode = this.windowApi.document.createElement("style");
		cssNode.setAttribute("type", "text/css");
		cssNode.innerHTML = cssText;
		if (this.windowApi.document.head) {
			/* 插入head最后 */
			this.windowApi.document.head.appendChild(cssNode);
		} else if (this.windowApi.document.body) {
			/* 插入body后 */
			this.windowApi.document.body.appendChild(cssNode);
		} else if (
			this.windowApi.document.documentElement.childNodes.length === 0
		) {
			/* 插入#html第一个元素后 */
			this.windowApi.document.documentElement.appendChild(cssNode);
		} else {
			/* 插入head前面 */
			this.windowApi.document.documentElement.insertBefore(
				cssNode,
				this.windowApi.document.documentElement.childNodes[0]
			);
		}
		return cssNode;
	}

	/** 
     * JSON数据从源端替换到目标端中，如果目标端存在该数据则替换，不添加，返回结果为目标端替换完毕的结果
     * @param target 目标数据
     * @param source 源数据
     * @param isAdd 是否可以追加键，默认false
     * @example
     * Utils.assign({"1":1,"2":{"3":3}}, {"2":{"3":4}});
     * > 
     * {
            "1": 1,
            "2": {
                "3": 4
            }
        }
     */
	assign = CommonUtil.assign.bind(CommonUtil);
	/**
	 * 异步替换字符串
	 * @param string 需要被替换的目标字符串
	 * @param pattern 正则匹配模型
	 * @param asyncFn 异步获取的函数
	 */
	asyncReplaceAll(
		string: string,
		pattern: RegExp | string,
		asyncFn: (item: string) => Promise<string>
	): Promise<string>;
	async asyncReplaceAll(
		string: string,
		pattern: RegExp | string,
		asyncFn: (item: string) => Promise<string>
	) {
		let UtilsContext = this;
		if (typeof string !== "string") {
			throw new TypeError("string必须是字符串");
		}
		if (typeof asyncFn !== "function") {
			throw new TypeError("asyncFn必须是函数");
		}
		let reg;
		if (typeof pattern === "string") {
			reg = new RegExp(UtilsContext.parseStringToRegExpString(pattern), "g");
		} else if (pattern instanceof RegExp) {
			if (!pattern.global) {
				throw new TypeError("pattern必须是全局匹配");
			}
			reg = new RegExp(pattern);
		} else {
			throw new TypeError("pattern必须是正则对象");
		}
		let result = [];
		let match;
		let lastIndex = 0;
		while ((match = reg.exec(string)) !== null) {
			/* 异步获取匹配对应的字符串 */
			const item = asyncFn(match[0]);
			/* 获取该匹配项和上一个匹配项的中间的字符串 */
			const prefix = string.slice(lastIndex, match.index);
			lastIndex = match.index + match[0].length;
			result.push(item);
			result.push(prefix);
		}
		result.push(string.slice(lastIndex));
		/* 等待所有异步完成 */
		result = await Promise.all(result);
		return result.join("");
	}
	/**
	 * ajax劫持库，支持xhr和fetch劫持。
	 * + 来源：https://bbs.tampermonkey.net.cn/thread-3284-1-1.html
	 * + 作者：cxxjackie
	 * + 版本：1.4.7
	 * + 旧版本：1.2.4
	 * + 文档：https://scriptcat.org/zh-CN/script-show-page/637/
	 * @param useOldVersion 是否使用旧版本，默认false
	 */
	ajaxHooker = (useOldVersion: boolean = false): UtilsAjaxHookResult => {
		if (useOldVersion) {
			return AjaxHooker1_2_4();
		} else {
			return ajaxHooker();
		}
	};
	/**
	 * 根据坐标点击canvas元素的内部位置
	 * @param canvasElement 画布元素
	 * @param clientX X坐标，默认值0
	 * @param clientY Y坐标，默认值0
	 * @param view 触发的事件目标
	 */
	canvasClickByPosition(
		canvasElement: HTMLCanvasElement,
		clientX?: number | string,
		clientY?: number | string,
		view?: Window & typeof globalThis
	): void;
	canvasClickByPosition(
		canvasElement: HTMLCanvasElement,
		clientX = 0,
		clientY = 0,
		view = this.windowApi.window
	) {
		if (!(canvasElement instanceof HTMLCanvasElement)) {
			throw new Error(
				"Utils.canvasClickByPosition 参数canvasElement必须是canvas元素"
			);
		}
		clientX = parseInt(clientX.toString());
		clientY = parseInt(clientY.toString());
		const eventInit: MouseEventInit & {
			cancelBubble: boolean;
		} = {
			cancelBubble: true,
			cancelable: true,
			clientX: clientX,
			clientY: clientY,
			view: view,
			detail: 1,
		};
		canvasElement.dispatchEvent(new MouseEvent("mousedown", eventInit));
		canvasElement.dispatchEvent(new MouseEvent("mouseup", eventInit));
	}
	/**
	 * 【手机】检测点击的地方是否在该元素区域内
	 * @param element 需要检测的元素
	 * @returns
	 * + true 点击在元素上
	 * + false 未点击在元素上
	 * @example
	 * Utils.checkUserClickInNode(document.querySelector(".xxx"));
	 * > false
	 **/
	checkUserClickInNode(element: Element | Node | HTMLElement): boolean;
	checkUserClickInNode(element: Element | Node | HTMLElement) {
		let UtilsContext = this;
		if (!UtilsContext.isDOM(element)) {
			throw new Error(
				"Utils.checkUserClickInNode 参数 targetNode 必须为 Element|Node 类型"
			);
		}
		let clickEvent = UtilsContext.windowApi.window.event as PointerEvent;
		let touchEvent = UtilsContext.windowApi.window.event as TouchEvent;
		let $click = clickEvent?.composedPath()?.[0] as HTMLElement;

		// 点击的x坐标
		let clickPosX =
			clickEvent?.clientX != null
				? clickEvent.clientX
				: touchEvent.touches[0].clientX;
		// 点击的y坐标
		let clickPosY =
			clickEvent?.clientY != null
				? clickEvent.clientY
				: touchEvent.touches[0].clientY;
		let {
			/* 要检测的元素的相对屏幕的横坐标最左边 */
			left: elementPosXLeft,
			/* 要检测的元素的相对屏幕的横坐标最右边 */
			right: elementPosXRight,
			/* 要检测的元素的相对屏幕的纵坐标最上边 */
			top: elementPosYTop,
			/* 要检测的元素的相对屏幕的纵坐标最下边 */
			bottom: elementPosYBottom,
		} = (element as HTMLElement).getBoundingClientRect();
		if (
			clickPosX >= elementPosXLeft &&
			clickPosX <= elementPosXRight &&
			clickPosY >= elementPosYTop &&
			clickPosY <= elementPosYBottom
		) {
			return true;
		} else if (($click && element.contains($click)) || $click == element) {
			/* 这种情况是应对在界面中隐藏的元素，getBoundingClientRect获取的都是0 */
			return true;
		} else {
			return false;
		}
	}
	/**
	 * 复制formData数据
	 * @param formData 需要clone的数据
	 */
	cloneFormData<T extends FormData>(
		formData: T,
		filterFn?: (key: string, value: string | Blob) => boolean
	): T {
		let clonedFormData = new FormData() as T;
		for (let [key, value] of (formData as any).entries()) {
			let isFilter =
				typeof filterFn === "function" ? filterFn(key, value) : false;
			if (typeof isFilter === "boolean" && isFilter) {
				continue;
			}
			clonedFormData.append(key, value);
		}
		return clonedFormData;
	}
	/**
	 * 函数重载实现
	 * @example
	 * let getUsers = Utils.createOverload();
	 * getUsers.addImpl("",()=>{
	 *    console.log("无参数");
	 * });
	 *
	 * getUsers.addImpl("boolean",()=>{
	 *    console.log("boolean");
	 * });
	 *
	 * getUsers.addImpl("string",()=>{
	 *    console.log("string");
	 * });
	 *
	 * getUsers.addImpl("number","string",()=>{
	 *    console.log("number string");
	 * });
	 */
	createOverload(): {
		/**
		 * 前面的参数都是字符串，最后一个参数是函数
		 */
		addImpl<T extends JSTypeNames[]>(
			...args: [...T, (...args: ArgsType<T>) => any]
		): void;
	};
	createOverload(): {
		/**
		 * 前面的参数都是字符串，最后一个参数是函数
		 */
		addImpl<T extends JSTypeNames[]>(
			...args: [...T, (...args: ArgsType<T>) => any]
		): void;
	} {
		let fnMap = new Map();
		function overload(this: any, ...args: any[]) {
			let key = args.map((it) => typeof it).join(",");
			let fn = fnMap.get(key);
			if (!fn) {
				throw new TypeError("没有找到对应的实现");
			}
			return fn.apply(this, args);
		}
		overload.addImpl = function (...args: any[]) {
			let fn = args.pop();
			if (typeof fn !== "function") {
				throw new TypeError("最后一个参数必须是函数");
			}
			let key = args.join(",");
			fnMap.set(key, fn);
		};
		return overload;
	}
	/**
	 * 颜色转换
	 * @returns
	 */
	ColorConversion = ColorConversion;
	/**
	 * 深拷贝
	 * @param obj 对象
	 */
	deepClone = CommonUtil.deepClone.bind(CommonUtil);
	/**
	 * 防抖函数
	 * @param fn 需要触发的回调
	 * @param delay 防抖判定时间(毫秒)，默认是0ms
	 */
	debounce<A extends any[], R>(
		fn: (...args: A) => R,
		delay?: number
	): (...args: A) => void;
	debounce<A extends any[], R>(fn: (...args: A) => R, delay = 0) {
		let timer: any = null as any;
		let UtilsContext = this;
		return function (...args: A) {
			UtilsContext.workerClearTimeout(timer);
			timer = UtilsContext.workerSetTimeout(function () {
				fn.apply(UtilsContext, args);
			}, delay);
		};
	}
	/**
	 * 删除某个父元素，父元素可能在上层或上上层或上上上层...
	 * @param element 当前元素
	 * @param targetSelector 判断是否满足父元素，参数为当前处理的父元素，满足返回true，否则false
	 * @returns
	 * + true 已删除
	 * + false 未删除
	 * @example
	 * Utils.deleteParentNode(document.querySelector("a"),".xxx");
	 * > true
	 **/
	deleteParentNode(
		element: Node | HTMLElement | Element | null,
		targetSelector: string
	): boolean;
	deleteParentNode(
		element: Node | HTMLElement | Element | null,
		targetSelector: string
	) {
		let UtilsContext = this;
		if (element == null) {
			return;
		}
		if (!UtilsContext.isDOM(element)) {
			throw new Error(
				"Utils.deleteParentNode 参数 target 必须为 Node|HTMLElement 类型"
			);
		}
		if (typeof targetSelector !== "string") {
			throw new Error(
				"Utils.deleteParentNode 参数 targetSelector 必须为 string 类型"
			);
		}
		let result = false;
		let needRemoveDOM = domUtils.closest(
			element as HTMLElement,
			targetSelector
		);
		if (needRemoveDOM) {
			needRemoveDOM.remove();
			result = true;
		}
		return result;
	}

	/**
	 * 字典
	 * @example
	 * let dictionary = new Utils.Dictionary();
	 * let dictionary2 = new Utils.Dictionary();
	 * dictionary.set("test","111");
	 * dictionary.get("test");
	 * > '111'
	 * dictionary.has("test");
	 * > true
	 * dictionary.concat(dictionary2);
	 **/
	Dictionary = UtilsDictionary;
	/**
	 * 主动触发事件
	 * @param element 元素
	 * @param eventName 事件名称，可以是字符串，也可是字符串格式的列表
	 * @param details （可选）赋予触发的Event的额外属性
	 * + true 使用Proxy代理Event并设置获取isTrusted永远为True
	 * + false (默认) 不对Event进行Proxy代理
	 * @example
	 * Utils.dispatchEvent(document.querySelector("input","input"))
	 */
	dispatchEvent(
		element: HTMLElement | Document,
		eventName: DOMUtils_EventType | DOMUtils_EventType[],
		details?: any
	): void;
	/**
	 * 主动触发事件
	 * @param element 元素
	 * @param eventName 事件名称，可以是字符串，也可是字符串格式的列表
	 * @param details （可选）赋予触发的Event的额外属性
	 * + true 使用Proxy代理Event并设置获取isTrusted永远为True
	 * + false (默认) 不对Event进行Proxy代理
	 * @example
	 * Utils.dispatchEvent(document.querySelector("input","input"))
	 */
	dispatchEvent(
		element: HTMLElement | Document,
		eventName: string,
		details?: any
	): void;
	dispatchEvent(
		element: HTMLElement | Document,
		eventName: DOMUtils_EventType | DOMUtils_EventType[] | string,
		details?: any
	) {
		// let UtilsContext = this;
		let eventNameList: string[] = [];
		if (typeof eventName === "string") {
			eventNameList = [eventName];
		}
		if (Array.isArray(eventName)) {
			eventNameList = [...eventName];
		}
		eventNameList.forEach((_eventName_) => {
			let event = new Event(_eventName_);
			if (details) {
				Object.assign(event, details);
			}
			element.dispatchEvent(event);
		});
	}
	/**
	 * 下载base64格式的数据
	 * @param base64Data	需要转换的base64数据
	 * @param fileName	需要保存的文件名
	 * @param isIFrame （可选）是否使用iframe进行下载
	 * @example
	 * Utils.downloadBase64("data:image/jpeg:base64/,xxxxxx");
	 **/
	downloadBase64(
		base64Data: string,
		fileName: string,
		isIFrame?: boolean
	): void;
	downloadBase64(base64Data: string, fileName: string, isIFrame = false) {
		let UtilsContext = this;
		if (typeof base64Data !== "string") {
			throw new Error(
				"Utils.downloadBase64 参数 base64Data 必须为 string 类型"
			);
		}
		if (typeof fileName !== "string") {
			throw new Error("Utils.downloadBase64 参数 fileName 必须为 string 类型");
		}
		if (isIFrame) {
			/* 使用iframe */
			const iframeElement = this.windowApi.document.createElement("iframe");
			iframeElement.style.display = "none";
			iframeElement.src = base64Data;
			this.windowApi.document.body.appendChild(iframeElement);
			UtilsContext.workerSetTimeout(() => {
				iframeElement!.contentWindow!.document.execCommand(
					"SaveAs",
					true,
					fileName
				);
				this.windowApi.document.body.removeChild(iframeElement);
			}, 100);
		} else {
			/* 使用A标签 */
			const linkElement = this.windowApi.document.createElement("a");
			linkElement.setAttribute("target", "_blank");
			linkElement.download = fileName;
			linkElement.href = base64Data;
			linkElement.click();
		}
	}

	/**
	 * 选中页面中的文字，类似Ctrl+F的选中
	 * @param str （可选）需要寻找的字符串，默认为空
	 * @param caseSensitive（可选）默认false
	 * + true 区分大小写
	 * + false (默认) 不区分大小写
	 * @returns
	 * + true 找到
	 * + false 未找到
	 * + undefined 不可使用该Api
	 * @example
	 * Utils.findWebPageVisibleText("xxxxx");
	 * > true
	 **/
	findWebPageVisibleText(str?: string, caseSensitive?: boolean): boolean | void;
	findWebPageVisibleText(str = "", caseSensitive = false) {
		let TRange = null;
		let strFound;
		if ((this.windowApi.globalThis as any).find) {
			/* CODE FOR BROWSERS THAT SUPPORT window.find */
			let windowFind = (this.windowApi.self as any).find;
			strFound = windowFind(str, caseSensitive, true, true, false);
			if (
				strFound &&
				this.windowApi.self.getSelection &&
				!this.windowApi.self.getSelection()!.anchorNode
			) {
				strFound = windowFind(str, caseSensitive, true, true, false);
			}
			if (!strFound) {
				strFound = windowFind(str, 0, 1);
				while (windowFind(str, 0, 1)) continue;
			}
		} else if (navigator.appName.indexOf("Microsoft") != -1) {
			/* EXPLORER-SPECIFIC CODE */
			if (TRange != null) {
				TRange = TRange as any;
				TRange.collapse(false);
				strFound = TRange.findText(str);
				if (strFound) TRange.select();
			}
			if (TRange == null || strFound == 0) {
				TRange = (this.windowApi.self.document.body as any).createTextRange();
				strFound = TRange.findText(str);
				if (strFound) TRange.select();
			}
		} else if (navigator.appName == "Opera") {
			alert("Opera browsers not supported, sorry...");
			return;
		}
		return strFound ? true : false;
	}
	/**
	 * 定位元素上的字符串，返回一个迭代器
	 * @param element 目标元素
	 * @param text 需要定位的字符串
	 * @param filter （可选）过滤器函数，返回值为true是排除该元素
	 * @example
	 * let textIterator = Utils.findElementsWithText(document.documentElement,"xxxx");
	 * textIterator.next();
	 * > {value: ?HTMLElement, done: boolean, next: Function}
	 */
	findElementsWithText<T extends HTMLElement | Element | Node>(
		element: T,
		text: string,
		filter?: (element: T) => boolean
	): Generator<HTMLElement | ChildNode, void, any>;
	*findElementsWithText<T extends HTMLElement | Element | Node>(
		element: T,
		text: string,
		filter?: (element: T) => boolean
	) {
		let that = this;
		if ((element as HTMLElement).outerHTML.includes(text)) {
			if ((element as HTMLElement).children.length === 0) {
				let filterResult =
					typeof filter === "function" ? filter(element) : false;
				if (!filterResult) {
					yield element as any;
				}
			} else {
				let textElement = Array.from(element.childNodes).filter(
					(ele) => ele.nodeType === Node.TEXT_NODE
				);
				for (let ele of textElement) {
					if ((ele as any).textContent.includes(text)) {
						let filterResult =
							typeof filter === "function" ? filter(element) : false;
						if (!filterResult) {
							yield ele;
						}
					}
				}
			}
		}

		for (
			let index = 0;
			index < (element as HTMLElement).children.length;
			index++
		) {
			let childElement = (element as HTMLElement).children[index] as any;
			yield* that.findElementsWithText(childElement, text, filter);
		}
	}
	/**
	 * 判断该元素是否可见，如果不可见，向上找它的父元素直至找到可见的元素
	 * @param element
	 * @example
	 * let visibleElement = Utils.findVisibleElement(document.querySelector("a.xx"));
	 * > <HTMLElement>
	 */
	findVisibleElement(element: HTMLElement | Element | Node) {
		let currentElement = element as HTMLElement;
		while (currentElement) {
			let elementRect = currentElement.getBoundingClientRect();
			if (Boolean((elementRect as any).length)) {
				return currentElement;
			}
			currentElement = currentElement.parentElement as any;
		}
		return null;
	}
	/**
	 * 格式化byte为KB、MB、GB、TB、PB、EB、ZB、YB、BB、NB、DB
	 * @param byteSize 字节
	 * @param addType （可选）是否添加单位
	 * + true (默认) 添加单位
	 * + false 不添加单位
	 * @returns
	 * + {string} 当addType为true时，且保留小数点末尾2位
	 * + {number} 当addType为false时，且保留小数点末尾2位
	 * @example
	 * Utils.formatByteToSize("812304");
	 * > '793.27KB'
	 * @example
	 * Utils.formatByteToSize("812304",false);
	 * > 793.27
	 **/
	formatByteToSize(byteSize: number | string): number;
	formatByteToSize<T extends boolean>(
		byteSize: number | string,
		addType?: T
	): T extends true ? string : number;
	formatByteToSize(byteSize: number | string, addType = true) {
		byteSize = parseInt(byteSize.toString());
		if (isNaN(byteSize)) {
			throw new Error("Utils.formatByteToSize 参数 byteSize 格式不正确");
		}
		let result = 0;
		let resultType = "KB";
		let sizeData: UtilsOwnObject<number> = {};
		sizeData.B = 1;
		sizeData.KB = 1024;
		sizeData.MB = sizeData.KB * sizeData.KB;
		sizeData.GB = sizeData.MB * sizeData.KB;
		sizeData.TB = sizeData.GB * sizeData.KB;
		sizeData.PB = sizeData.TB * sizeData.KB;
		sizeData.EB = sizeData.PB * sizeData.KB;
		sizeData.ZB = sizeData.EB * sizeData.KB;
		sizeData.YB = sizeData.ZB * sizeData.KB;
		sizeData.BB = sizeData.YB * sizeData.KB;
		sizeData.NB = sizeData.BB * sizeData.KB;
		sizeData.DB = sizeData.NB * sizeData.KB;
		for (let key in sizeData) {
			result = byteSize / (sizeData as any)[key];
			resultType = key;
			if (sizeData.KB >= result) {
				break;
			}
		}
		result = result.toFixed(2) as any;
		result = addType
			? result + resultType.toString()
			: (parseFloat(result.toString()) as any);
		return result;
	}
	/**
	 * 应用场景: 当你想要获取数组形式的元素时，它可能是其它的选择器，那么需要按照先后顺序填入参数
	 * 第一个是优先级最高的，依次下降，如果都没有，返回空列表
	 * 支持document.querySelectorAll、$("")、()=>{return document.querySelectorAll("")}
	 * @param NodeList
	 * @example
	 * Utils.getNodeListValue(
	 *  document.querySelectorAll("div.xxx"),
	 *  document.querySelectorAll("a.xxx")
	 * );
	 * > [...div,div,div]
	 * @example
	 * Utils.getNodeListValue(divGetFunction,aGetFunction);
	 * > [...div,div,div]
	 */
	getNodeListValue(...args: (NodeList | (() => HTMLElement))[]): HTMLElement[];
	getNodeListValue(...args: (NodeList | (() => HTMLElement))[]) {
		let resultArray: HTMLElement[] = [];
		for (let arg of args) {
			let value = arg as any;
			if (typeof arg === "function") {
				/* 方法 */
				value = arg();
			}
			if (value.length !== 0) {
				resultArray = [...value];
				break;
			}
		}
		return resultArray;
	}
	/**
	 * 自动判断N个参数，获取非空的值，如果都是空，返回最后一个值
	 */
	getNonNullValue(...args: any[]): any;
	getNonNullValue(...args: any[]) {
		let resultValue = args[args.length - 1];
		let UtilsContext = this;
		for (const argValue of args) {
			if (UtilsContext.isNotNull(argValue)) {
				resultValue = argValue;
				break;
			}
		}
		return resultValue;
	}
	/**
	 * 获取格式化后的时间
	 * @param text （可选）需要格式化的字符串或者时间戳，默认：new Date()
	 * @param formatType （可选）格式化成的显示类型，默认：yyyy-MM-dd HH:mm:ss
	 * + yyyy 年
	 * + MM 月
	 * + dd 天
	 * + HH 时 (24小时制)
	 * + hh 时 (12小时制)
	 * + mm 分
	 * + ss 秒
	 * @returns {string}	返回格式化后的时间
	 * @example
	 * Utils.formatTime("2022-08-21 23:59:00","HH:mm:ss");
	 * > '23:59:00'
	 * @example
	 * Utils.formatTime(1899187424988,"HH:mm:ss");
	 * > '15:10:13'
	 * @example
	 * Utils.formatTime()
	 * > '2023-1-1 00:00:00'
	 **/
	formatTime(text?: string | number | Date, formatType?: string): string;
	/**
	 * 获取格式化后的时间
	 * @param text （可选）需要格式化的字符串或者时间戳，默认：new Date()
	 * @param formatType （可选）格式化成的显示类型，默认：yyyy-MM-dd HH:mm:ss
	 * + yyyy 年
	 * + MM 月
	 * + dd 天
	 * + HH 时 (24小时制)
	 * + hh 时 (12小时制)
	 * + mm 分
	 * + ss 秒
	 * @returns {string}	返回格式化后的时间
	 * @example
	 * Utils.formatTime("2022-08-21 23:59:00","HH:mm:ss");
	 * > '23:59:00'
	 * @example
	 * Utils.formatTime(1899187424988,"HH:mm:ss");
	 * > '15:10:13'
	 * @example
	 * Utils.formatTime()
	 * > '2023-1-1 00:00:00'
	 **/
	formatTime(
		text?: string | number | Date,
		formatType?:
			| "yyyy-MM-dd HH:mm:ss"
			| "yyyy/MM/dd HH:mm:ss"
			| "yyyy_MM_dd_HH_mm_ss"
			| "yyyy年MM月dd日 HH时mm分ss秒"
			| "yyyy年MM月dd日 hh:mm:ss"
			| "yyyy年MM月dd日 HH:mm:ss"
			| "yyyy-MM-dd"
			| "yyyyMMdd"
			| "HH:mm:ss"
			| "yyyy"
			| "MM"
			| "dd"
			| "HH"
			| "mm"
			| "ss"
	): string;
	formatTime(text = new Date(), formatType = "yyyy-MM-dd HH:mm:ss") {
		let time = text == null ? new Date() : new Date(text);
		/**
		 * 校验时间补0
		 * @param timeNum
		 * @returns
		 */
		function checkTime(timeNum: number) {
			if (timeNum < 10) return "0" + timeNum;
			return timeNum;
		}

		/**
		 * 时间制修改 24小时制转12小时制
		 * @param hourNum 小时
		 * @returns
		 */
		function timeSystemChange(hourNum: number) {
			return hourNum > 12 ? hourNum - 12 : hourNum;
		}

		let timeRegexp = {
			yyyy: time.getFullYear(),
			/* 年 */
			MM: checkTime(time.getMonth() + 1),
			/* 月 */
			dd: checkTime(time.getDate()),
			/* 日 */
			HH: checkTime(time.getHours()),
			/* 时 (24小时制) */
			hh: checkTime(timeSystemChange(time.getHours())),
			/* 时 (12小时制) */
			mm: checkTime(time.getMinutes()),
			/* 分 */
			ss: checkTime(time.getSeconds()),
			/* 秒 */
		};
		Object.keys(timeRegexp).forEach(function (key) {
			let replaecRegexp = new RegExp(key, "g");
			formatType = formatType.replace(replaecRegexp, (timeRegexp as any)[key]);
		});
		return formatType;
	}
	/**
	 * 字符串格式的时间转时间戳
	 * @param text	字符串格式的时间，例如：
	 * + 2022-11-21 00:00:00
	 * + 00:00:00
	 * @returns 返回时间戳
	 * @example
	 * Utils.formatToTimeStamp("2022-11-21 00:00:00");
	 * > 1668960000000
	 **/
	formatToTimeStamp(text: string): number;
	formatToTimeStamp(text: string) {
		/* 把字符串格式的时间（完整，包括日期和时间）格式化成时间 */
		if (typeof text !== "string") {
			throw new Error("Utils.formatToTimeStamp 参数 text 必须为 string 类型");
		}
		if (text.length === 8) {
			/* 该字符串只有时分秒 */
			let today = new Date();
			text =
				today.getFullYear() +
				"-" +
				(today.getMonth() + 1) +
				"-" +
				today.getDate() +
				" " +
				text;
		}
		text = text.substring(0, 19);
		text = text.replace(/-/g, "/");
		let timestamp = new Date(text).getTime();
		return timestamp;
	}
	/**
	 * gbk格式的url编码,来自https://greasyfork.org/zh-CN/scripts/427726-gbk-url-js
	 * @example
	 * let gbkEncoder = new Utils.GBKEncoder();
	 * gbkEncoder.encode("测试");
	 * > '%B2%E2%CA%D4'
	 * gbkEncoder.decode("%B2%E2%CA%D4");
	 * > 测试
	 */
	GBKEncoder = GBKEncoder;
	/**
	 * 获取 transitionend 的在各个浏览器的兼容名
	 */
	getTransitionEndNameList() {
		return [
			"webkitTransitionEnd",
			"mozTransitionEnd",
			"MSTransitionEnd",
			"otransitionend",
			"transitionend",
		];
	}
	/**
	 * 获取 animationend 的在各个浏览器的兼容名
	 */
	getAnimationEndNameList() {
		return [
			"webkitAnimationEnd",
			"mozAnimationEnd",
			"MSAnimationEnd",
			"oanimationend",
			"animationend",
		];
	}
	/**
	 * 获取NodeList或Array对象中的最后一个的值
	 * @param targetObj
	 * @returns
	 * @example
	 * Utils.getArrayLastValue(document.querySelectorAll("div"));
	 * > div
	 * @example
	 * Utils.getArrayLastValue([1,2,3,4,5]);
	 * > 5
	 */
	getArrayLastValue<R extends any>(targetObj: NodeList | any[]): R;
	getArrayLastValue(targetObj: NodeList | any[]) {
		return targetObj[targetObj.length - 1];
	}
	/**
	 * 应用场景: 当想获取的元素可能是不同的选择器的时候，按顺序优先级获取
	 * 参数类型可以是Element或者是Function
	 * @returns 如果都没有的话，返回null
	 * @example
	 * // 如果a.aaa不存在的话，取a.bbb，这里假设a.aaa不存在
	 * Utils.getArrayRealValue(document.querySelector("a.aaa"),document.querySelector("a.bbb"));
	 * > a.bbb
	 * @example
	 * Utils.getArrayRealValue(()=>{return document.querySelector("a.aaa").href},()=>{document.querySelector("a.bbb").getAttribute("data-href")});
	 * > javascript:;
	 */
	getArrayRealValue(...args: (NodeList | (() => HTMLElement))[]): any;
	getArrayRealValue(...args: (NodeList | (() => HTMLElement))[]) {
		let result = null;
		for (let arg of args) {
			if (typeof arg === "function") {
				/* 方法 */
				(arg as any) = arg();
			}
			if (arg != null) {
				result = arg;
				break;
			}
		}
		return result;
	}
	/**
	 * 获取天数差异，如何获取某个时间与另一个时间相差的天数
	 * @param timestamp1 （可选）时间戳(毫秒|秒)，不区分哪个更大，默认为：Date.now()
	 * @param timestamp2 （可选）时间戳(毫秒|秒)，不区分哪个更大，默认为：Date.now()
	 * @param type （可选）返回的数字的表达的类型，比如：年、月、天、时、分、秒、auto，默认天
	 * @example
	 * Utils.getDaysDifference(new Date().getTime());
	 * > 0
	 * @example
	 * Utils.getDaysDifference(new Date().getTime(),undefined,"秒");
	 * > 0
	 */
	getDaysDifference(
		timestamp1?: number,
		timestamp2?: number,
		type?: "auto"
	): string;
	/**
	 * 获取天数差异，如何获取某个时间与另一个时间相差的天数
	 * @param timestamp1 （可选）时间戳(毫秒|秒)，不区分哪个更大，默认为：Date.now()
	 * @param timestamp2 （可选）时间戳(毫秒|秒)，不区分哪个更大，默认为：Date.now()
	 * @param type （可选）返回的数字的表达的类型，比如：年、月、天、时、分、秒、auto，默认天
	 * @example
	 * Utils.getDaysDifference(new Date().getTime());
	 * > 0
	 * @example
	 * Utils.getDaysDifference(new Date().getTime(),undefined,"秒");
	 * > 0
	 */
	getDaysDifference(
		timestamp1?: number,
		timestamp2?: number,
		type?: "年" | "月" | "天" | "时" | "分" | "秒"
	): number;
	getDaysDifference(
		timestamp1 = Date.now(),
		timestamp2 = Date.now(),
		type = "天"
	): number | string {
		type = type.trim();
		if (timestamp1.toString().length === 10) {
			timestamp1 = timestamp1 * 1000;
		}
		if (timestamp2.toString().length === 10) {
			timestamp2 = timestamp2 * 1000;
		}
		let smallTimeStamp = timestamp1 > timestamp2 ? timestamp2 : timestamp1;
		let bigTimeStamp = timestamp1 > timestamp2 ? timestamp1 : timestamp2;
		let oneSecond = 1000; /* 一秒的毫秒数 */
		let oneMinute = 60 * oneSecond; /* 一分钟的毫秒数 */
		let oneHour = 60 * oneMinute; /* 一小时的毫秒数 */
		let oneDay = 24 * oneHour; /* 一天的毫秒数 */
		let oneMonth = 30 * oneDay; /* 一个月的毫秒数(30天) */
		let oneYear = 12 * oneMonth; /* 一年的毫秒数 */
		let bigDate = new Date(bigTimeStamp);
		let smallDate = new Date(smallTimeStamp);
		let remainderValue = 1;
		if (type === "年") {
			remainderValue = oneYear;
		} else if (type === "月") {
			remainderValue = oneMonth;
		} else if (type === "天") {
			remainderValue = oneDay;
		} else if (type === "时") {
			remainderValue = oneHour;
		} else if (type === "分") {
			remainderValue = oneMinute;
		} else if (type === "秒") {
			remainderValue = oneSecond;
		}
		let diffValue = Math.round(
			Math.abs(((bigDate as any) - (smallDate as any)) / remainderValue)
		);
		if (type === "auto") {
			let timeDifference = bigTimeStamp - smallTimeStamp;
			diffValue = Math.floor(timeDifference / (24 * 3600 * 1000));
			if (diffValue > 0) {
				(diffValue as any) = diffValue + "天";
			} else {
				/* 计算出小时数 */
				let leave1 =
					timeDifference % (24 * 3600 * 1000); /* 计算天数后剩余的毫秒数 */
				let hours = Math.floor(leave1 / (3600 * 1000));
				if (hours > 0) {
					(diffValue as any) = hours + "小时";
				} else {
					/* 计算相差分钟数 */
					let leave2 = leave1 % (3600 * 1000); /* 计算小时数后剩余的毫秒数 */
					let minutes = Math.floor(leave2 / (60 * 1000));
					if (minutes > 0) {
						(diffValue as any) = minutes + "分钟";
					} else {
						/* 计算相差秒数 */
						let leave3 = leave2 % (60 * 1000); /* 计算分钟数后剩余的毫秒数 */
						let seconds = Math.round(leave3 / 1000);
						(diffValue as any) = seconds + "秒";
					}
				}
			}
		}
		return diffValue;
	}
	/**
	 * 获取元素的选择器字符串
	 * @param element
	 * @example
	 * Utils.getElementSelector(document.querySelector("a"))
	 * > '.....'
	 */
	getElementSelector(element: HTMLElement): string;
	getElementSelector(element: HTMLElement): string {
		let UtilsContext = this;
		if (!element) return void 0 as any as string;
		if (!element.parentElement) return void 0 as any as string;
		/* 如果元素有id属性，则直接返回id选择器 */
		if (element.id) return "#" + element.id;

		/* 递归地获取父元素的选择器 */
		let selector = UtilsContext.getElementSelector(element.parentElement);
		if (!selector) {
			return element.tagName.toLowerCase();
		}
		/* 如果有多个相同类型的兄弟元素，则需要添加索引 */
		if (element.parentElement.querySelectorAll(element.tagName).length > 1) {
			let index =
				Array.prototype.indexOf.call(element.parentElement.children, element) +
				1;
			selector +=
				" > " + element.tagName.toLowerCase() + ":nth-child(" + index + ")";
		} else {
			selector += " > " + element.tagName.toLowerCase();
		}
		return selector;
	}
	/**
	 * 获取最大值
	 * @example
	 * Utils.getMaxValue(1,3,5,7,9)
	 * > 9
	 */
	getMaxValue(...args: number[]): number;
	/**
	 * 获取最大值
	 * @example
	 * Utils.getMaxValue([1,3,5])
	 * > 5
	 */
	getMaxValue(val: number[]): number;
	/**
	 * 获取最大值
	 * @example
	 * Utils.getMaxValue({1:123,2:345,3:456},(key,value)=>{return parseInt(value)})
	 * > 456
	 */
	getMaxValue(
		val: UtilsOwnObject<number>,
		handler: (key: any, value: any) => number
	): number;
	/**
	 * 获取最大值
	 * @example
	 * Utils.getMaxValue([{1:123},{2:345},{3:456}],(index,value)=>{return parseInt(index)})
	 * > 2
	 */
	getMaxValue(...args: any[]): number {
		let result = [...args];
		let newResult: number[] = [];
		if (result.length === 0) {
			return void 0 as any as number;
		}
		if (result.length > 1) {
			if (
				result.length === 2 &&
				typeof result[0] === "object" &&
				typeof result[1] === "function"
			) {
				let data = result[0];
				let handleDataFunc = result[1];
				Object.keys(data).forEach((keyName) => {
					newResult = [...newResult, handleDataFunc(keyName, data[keyName])];
				});
			} else {
				result.forEach((item) => {
					if (!isNaN(parseFloat(item))) {
						newResult = [...newResult, parseFloat(item)];
					}
				});
			}
			return Math.max(...newResult);
		} else {
			result[0].forEach((item: any) => {
				if (!isNaN(parseFloat(item))) {
					newResult = [...newResult, parseFloat(item)];
				}
			});
			return Math.max(...newResult);
		}
	}
	/**
	 * 获取页面中最大的z-index的元素信息
	 * @param deviation 获取最大的z-index值的偏移，默认是1
	 * @param node 进行判断的元素，默认是document
	 * @param ignoreCallBack 执行元素处理时调用的函数，返回false可忽略不想要处理的元素
	 * @example
	 * Utils.getMaxZIndexNodeInfo();
	 * > {
	 *   node: ...,
	 *   zIndex: 1001
	 * }
	 **/
	getMaxZIndexNodeInfo(
		deviation?: number,
		target?: Element | ShadowRoot | Document,
		ignoreCallBack?: (
			$ele: Element | HTMLElement | ShadowRoot
		) => boolean | void
	): {
		node: Element;
		zIndex: number;
	};
	getMaxZIndexNodeInfo(
		deviation = 1,
		target: Element | ShadowRoot | Document = this.windowApi.document,
		ignoreCallBack?: (
			$ele: Element | HTMLElement | ShadowRoot
		) => boolean | void
	): {
		node: Element;
		zIndex: number;
	} {
		deviation = Number.isNaN(deviation) ? 1 : deviation;
		const UtilsContext = this;
		// 最大值 2147483647
		// const maxZIndex = Math.pow(2, 31) - 1;
		// 比较值 2000000000
		const maxZIndexCompare = 2 * Math.pow(10, 9);
		// 当前页面最大的z-index
		let zIndex = 0;
		// 当前的最大z-index的元素，调试使用
		let maxZIndexNode: Element | null = null;
		/**
		 * 元素是否可见
		 * @param $css
		 */
		function isVisibleNode($css: CSSStyleDeclaration): boolean {
			return $css.position !== "static" && $css.display !== "none";
		}
		/**
		 * 查询元素的z-index
		 * 并比较值是否是已获取的最大值
		 * @param $ele
		 */
		function queryMaxZIndex($ele: Element) {
			if (typeof ignoreCallBack === "function") {
				let ignoreResult = ignoreCallBack($ele);
				if (typeof ignoreResult === "boolean" && !ignoreResult) {
					return;
				}
			}
			/** 元素的样式 */
			const nodeStyle = UtilsContext.windowApi.window.getComputedStyle($ele);
			/* 不对position为static和display为none的元素进行获取它们的z-index */
			if (isVisibleNode(nodeStyle)) {
				let nodeZIndex = parseInt(nodeStyle.zIndex);
				if (!isNaN(nodeZIndex)) {
					if (nodeZIndex > zIndex) {
						// 赋值到全局
						zIndex = nodeZIndex;
						maxZIndexNode = $ele;
					}
				}
				// 判断shadowRoot
				if ($ele.shadowRoot != null && $ele instanceof ShadowRoot) {
					$ele.shadowRoot.querySelectorAll("*").forEach(($shadowEle) => {
						queryMaxZIndex($shadowEle);
					});
				}
			}
		}
		target.querySelectorAll("*").forEach(($ele, index) => {
			queryMaxZIndex($ele);
		});
		zIndex += deviation;
		if (zIndex >= maxZIndexCompare) {
			// 最好不要超过最大值
			zIndex = maxZIndexCompare;
		}
		return {
			node: maxZIndexNode!,
			zIndex: zIndex,
		};
	}
	/**
	 * 获取页面中最大的z-index
	 * @param deviation 获取最大的z-index值的偏移，默认是1
	 * @param node 进行判断的元素，默认是document
	 * @param ignoreCallBack 执行元素处理时调用的函数，返回false可忽略不想要处理的元素
	 * @example
	 * Utils.getMaxZIndex();
	 * > 1001
	 **/
	getMaxZIndex(
		deviation?: number,
		target?: Element | DocumentOrShadowRoot | Document,
		ignoreCallBack?: (
			$ele: Element | HTMLElement | ShadowRoot
		) => boolean | void
	): number;
	getMaxZIndex(
		deviation = 1,
		target: Element | ShadowRoot | Document = this.windowApi.document,
		ignoreCallBack?: (
			$ele: Element | HTMLElement | ShadowRoot
		) => boolean | void
	): number {
		return this.getMaxZIndexNodeInfo(deviation, target, ignoreCallBack).zIndex;
	}
	/**
	 * 获取最小值
	 * @example
	 * Utils.getMinValue(1,3,5,7,9)
	 * > 1
	 */
	getMinValue(...args: number[]): number;
	/**
	 * 获取最小值
	 * @example
	 * Utils.getMinValue([1,3,5])
	 * > 1
	 */
	getMinValue(val: number[]): number;
	/**
	 * 获取最小值
	 * @example
	 * Utils.getMinValue({1:123,2:345,3:456},(key,value)=>{return parseInt(value)})
	 * > 123
	 */
	getMinValue(
		val: UtilsOwnObject<number>,
		handler: (key: any, value: any) => number
	): number;
	/**
	 * 获取最小值
	 * @example
	 * Utils.getMinValue([{1:123},{2:345},{3:456}],(index,value)=>{return parseInt(index)})
	 * > 0
	 */
	getMinValue(
		val: UtilsOwnObject<number>[],
		handler: (index: number, value: any) => number
	): number;
	getMinValue(...args: any[]): number {
		let result = [...args];
		let newResult: number[] = [];
		if (result.length === 0) {
			return void 0 as any as number;
		}
		if (result.length > 1) {
			if (
				result.length === 2 &&
				typeof result[0] === "object" &&
				typeof result[1] === "function"
			) {
				let data = result[0];
				let handleDataFunc = result[1];
				Object.keys(data).forEach((keyName) => {
					newResult = [...newResult, handleDataFunc(keyName, data[keyName])];
				});
			} else {
				result.forEach((item) => {
					if (!isNaN(parseFloat(item))) {
						newResult = [...newResult, parseFloat(item)];
					}
				});
			}
			return Math.min(...newResult);
		} else {
			result[0].forEach((item: any) => {
				if (!isNaN(parseFloat(item))) {
					newResult = [...newResult, parseFloat(item)];
				}
			});
			return Math.min(...newResult);
		}
	}
	/**
	 * 获取随机的安卓手机User-Agent
	 * @example
	 * Utils.getRandomAndroidUA();
	 * > 'Mozilla/5.0 (Linux; Android 10; MI 13 Build/OPR1.170623.027; wv) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.3490.40 Mobile Safari/537.36'
	 **/
	getRandomAndroidUA(): string {
		let UtilsContext = this;
		let mobileNameList = [
			"LDN-LX3",
			"RNE-L03",
			"ASUS_X00ID Build/NMF26F",
			"WAS-LX3",
			"PRA-LX3",
			"MYA-L03",
			"Moto G Play",
			"Moto C Build/NRD90M.063",
			"Redmi Note 4 Build/NRD90M",
			"HUAWEI VNS-L21 Build/HUAWEIVNS-L21",
			"VTR-L09",
			"TRT-LX3",
			"M2003J15SC Build/RP1A.200720.011; wv",
			"MI 13 Build/OPR1.170623.027; wv",
		];
		/* 安卓版本 */
		let androidVersion = UtilsContext.getRandomValue(12, 14);
		/* 手机型号 */
		let randomMobile = UtilsContext.getRandomValue(mobileNameList);
		/* chrome大版本号 */
		let chromeVersion1 = UtilsContext.getRandomValue(120, 132);
		let chromeVersion2 = UtilsContext.getRandomValue(0, 0);
		let chromeVersion3 = UtilsContext.getRandomValue(2272, 6099);
		let chromeVersion4 = UtilsContext.getRandomValue(1, 218);
		return `Mozilla/5.0 (Linux; Android ${androidVersion}; ${randomMobile}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion1}.${chromeVersion2}.${chromeVersion3}.${chromeVersion4} Mobile Safari/537.36`;
	}
	/**
	 * 获取随机的电脑端User-Agent
	 * + Mozilla/5.0：以前用于Netscape浏览器，目前大多数浏览器UA都会带有
	 * + Windows NT 13：代表Window11系统
	 * + Windows NT 10.0：代表Window10系统
	 * + Windows NT 6.1：代表windows7系统
	 * + WOW64：Windows-on-Windows 64-bit，32位的应用程序运行于此64位处理器上
	 * + Win64：64位
	 * + AppleWebKit/537.36：浏览器内核
	 * + KHTML：HTML排版引擎
	 * + like Gecko：这不是Geckeo 浏览器，但是运行起来像Geckeo浏览器
	 * + Chrome/106.0.5068.19：Chrome版本号
	 * + Safari/537.36：宣称自己是Safari？
	 * @returns 返回随机字符串
	 * @example
	 * Utils.getRandomPCUA();
	 * > 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5068.19 Safari/537.36'
	 **/
	getRandomPCUA(): string {
		let UtilsContext = this;
		/* chrome大版本号 */
		let chromeVersion1 = UtilsContext.getRandomValue(120, 132);
		let chromeVersion2 = UtilsContext.getRandomValue(0, 0);
		let chromeVersion3 = UtilsContext.getRandomValue(2272, 6099);
		let chromeVersion4 = UtilsContext.getRandomValue(1, 218);
		return `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion1}.${chromeVersion2}.${chromeVersion3}.${chromeVersion4} Safari/537.36`;
	}
	/**
	 * 获取随机值
	 * @example
	 * Utils.getRandomValue(1,9,6,99)
	 * > 6
	 */
	getRandomValue<T extends any>(...args: T[]): T;
	/**
	 * 获取随机值
	 * @example
	 * Utils.getRandomValue([1,2,3])
	 * > 3
	 * @example
	 * Utils.getRandomValue({1:"结果1",2:"结果2",3:"结果3"}})
	 * > 结果2
	 */
	getRandomValue<T extends any>(val: T[] | UtilsOwnObject<T>): T;
	/**
	 * 获取两个数之间随机值
	 * @example
	 * Utils.getRandomValue(1,9)
	 * > 6
	 */
	getRandomValue(val_1: number, val_2: number): number;
	/**
	 * 获取随机值
	 * @example
	 * Utils.getRandomValue({1:1},{2:2})
	 * > {1: 1}
	 */
	getRandomValue<T extends any>(
		val_1: UtilsOwnObject<T>,
		val_2: UtilsOwnObject<T>
	): T;
	getRandomValue(...args: any[]): any {
		let result = [...args];
		if (result.length > 1) {
			if (
				result.length === 2 &&
				typeof result[0] === "number" &&
				typeof result[1] === "number"
			) {
				let leftNumber = result[0] > result[1] ? result[1] : result[0];
				let rightNumber = result[0] > result[1] ? result[0] : result[1];
				return (
					Math.round(Math.random() * (rightNumber - leftNumber)) + leftNumber
				);
			} else {
				return result[Math.floor(Math.random() * result.length)];
			}
		} else if (result.length === 1) {
			let paramData = result[0];
			if (Array.isArray(paramData)) {
				return paramData[Math.floor(Math.random() * paramData.length)];
			} else if (
				typeof paramData === "object" &&
				Object.keys(paramData).length > 0
			) {
				let paramObjDataKey =
					Object.keys(paramData)[
						Math.floor(Math.random() * Object.keys(paramData).length)
					];
				return paramData[paramObjDataKey];
			} else {
				return paramData;
			}
		}
	}
	/**
	 * 获取元素上的使用React框架的实例属性，目前包括reactFiber、reactProps、reactEvents、reactEventHandlers、reactInternalInstance
	 * @param element 需要获取的目标元素
	 * @returns
	 * @example
	 * Utils.getReactObj(document.querySelector("input"))?.reactProps?.onChange({target:{value:"123"}});
	 */
	getReactObj(element: HTMLElement | Element): {
		reactFiber?: any;
		reactProps?: any;
		reactEvents?: any;
		reactEventHandlers?: any;
		reactInternalInstance?: any;
		reactContainer?: any;
	} {
		let result = {};
		Object.keys(element).forEach((domPropsName) => {
			if (domPropsName.startsWith("__react")) {
				let propsName = domPropsName.replace(/__(.+)\$.+/i, "$1");
				if (propsName in result) {
					new Error("重复属性 " + domPropsName);
				} else {
					(result as any)[propsName] = (element as any)[domPropsName];
				}
			}
		});
		return result;
	}
	/**
	 * 获取对象上的Symbol属性，如果没设置keyName，那么返回一个对象，对象是所有遍历到的Symbol对象
	 * @param target 目标对象
	 * @param keyName （可选）Symbol名或者Symbol对象
	 */
	getSymbol(target: any, keyName?: string | symbol) {
		if (typeof target !== "object") {
			throw new TypeError("target不是一个对象");
		}
		let objectsSymbols = Object.getOwnPropertySymbols(target);
		if (typeof keyName === "string") {
			let findSymbol = objectsSymbols.find((key) => {
				return key.toString() === keyName;
			});
			if (findSymbol) {
				return target[findSymbol];
			}
		} else if (typeof keyName === "symbol") {
			let findSymbol = objectsSymbols.find((key) => {
				return key === keyName;
			});
			if (findSymbol) {
				return (target as any)[findSymbol];
			}
		} else {
			let result = {};
			objectsSymbols.forEach((item) => {
				(result as any)[item] = target[item];
			});
			return result;
		}
	}
	/**
	 * 获取文本的字符长度
	 * @param text
	 * @example
	 * Utils.getTextLength("测试文本")
	 * > 12
	 */
	getTextLength(text: string): number {
		let encoder = new TextEncoder();
		let bytes = encoder.encode(text);
		return bytes.length;
	}
	/**
	 * 获取文本占据的空间大小，返回自动的单位，如12 Kb,14 K,20 MB，1 GB
	 * @param text 目标字符串
	 * @param addType （可选）是否添加单位
	 * + true (默认) 自动添加单位
	 * + false 不添加单位
	 * @example
	 * Utils.getTextStorageSize("测试文本");
	 * > '12.00B'
	 */
	getTextStorageSize<T extends boolean>(
		text: string,
		addType?: T
	): T extends true ? string : number;
	getTextStorageSize(text: string, addType = true) {
		let UtilsContext = this;
		return UtilsContext.formatByteToSize(
			UtilsContext.getTextLength(text),
			addType
		);
	}
	/**
	 * 获取迅雷协议的Url
	 * @param url Url链接或者其它信息
	 */
	getThunderUrl(url: string): string;
	getThunderUrl(url: string): string {
		if (url == null) {
			throw new TypeError("url不能为空");
		}
		if (typeof url !== "string") {
			throw new TypeError("url必须是string类型");
		}
		if (url.trim() === "") {
			throw new TypeError("url不能为空字符串或纯空格");
		}
		return `thunder://${this.windowApi.globalThis.btoa("AA" + url + "ZZ")}`;
	}
	/**
     * 对于GM_cookie的兼容写法，当无法使用GM_cookie时可以使用这个,但是并不完全兼容，有些写不出来且限制了httponly是无法访问的
     * @example
      let GM_cookie = new Utils.GM_Cookie();
      GM_cookie.list({name:"xxx_cookie_xxx"},function(cookies,error){
          if (!error) {
              console.log(cookies);
              console.log(cookies.value);
          } else {
              console.error(error);
          }
      });
      GM_cookie.set({name:"xxx_cookie_test_xxx",value:"这是Cookie测试值"},function(error){
          if (error) {
              console.error(error);
          } else {
              console.log('Cookie set successfully.');
          }
      })
      GM_cookie.delete({name:"xxx_cookie_test_xxx"},function(error){
          if (error) {
              console.error(error);
          } else {
              console.log('Cookie set successfully.');
          }
      })
     **/
	GM_Cookie = UtilsGMCookie;
	/**
     * 注册油猴菜单，要求本地存储的键名不能存在其它键名`GM_Menu_Local_Map`会冲突/覆盖
     * @example
      let GM_Menu = new Utils.GM_Menu({
        data: [
          {
            menu_key: "menu_key",
            text: "测试按钮",
            enable: true,
            accessKey: "a",
            autoClose: false,
            showText(text, enable) {
              return "[" + (enable ? "√" : "×") + "]" + text;
            },
            callback(data) {
              console.log("点击菜单，值修改为", data.enable);
            },
          },
        ],
        autoReload: false,
        GM_getValue,
        GM_setValue,
        GM_registerMenuCommand,
        GM_unregisterMenuCommand,
      });
  
  
      // 获取某个菜单项的值
      GM_Menu.get("menu_key");
      > true
  
      // 获取某个菜单项的开启/关闭后显示的文本
      GM_Menu.getShowTextValue("menu_key");
      > √测试按钮
  
      // 添加键为menu_key2的菜单项
      GM_Menu.add({
        key:"menu_key2",
        text: "测试按钮2",
        enable: false,
        showText(text,enable){
          return "[" + (enable ? "√" : "×") + "]" + text;
        },
        callback(data){
          console.log("点击菜单，值修改为",data.enable);
        }
      });
      // 使用数组的方式添加多个菜单，如menu_key3、menu_key4
      GM_Menu.add([
        {
          key:"menu_key3",
          text: "测试按钮3",
          enable: false,
          showText(text,enable){
            return "[" + (enable ? "√" : "×") + "]" + text;
          },
          callback(data){
            console.log("点击菜单，值修改为",data.enable);
          }
        },
        {
          key:"menu_key4",
          text: "测试按钮4",
          enable: false,
          showText(text,enable){
            return "[" + (enable ? "√" : "×") + "]" + text;
          },
          callback(data){
            console.log("点击菜单，值修改为",data.enable);
          }
        }
      ]);
  
      // 更新键为menu_key的显示文字和点击回调
      GM_Menu.update({
        menu_key:{
          text: "更新后的测试按钮",
          enable: true,
          showText(text,enable){
            return "[" + (enable ? "√" : "×") + "]" + text;
          },
          callback(data){
            console.log("点击菜单更新后的测试按钮，新值修改为",data.enable);
          }
        }
      });
  
      // 删除键为menu_key的菜单
      GM_Menu.delete("menu_key");
     **/
	GM_Menu = GMMenu;
	/**
     * 基于Function prototype，能够勾住和释放任何函数
     * 
     * .hook
     * + realFunc {string} 用于保存原始函数的函数名称,用于unHook
     * + hookFunc {string} 替换的hook函数
     * + context {object} 目标函数所在对象,用于hook非window对象下的函数，如String.protype.slice,carInstance1
     * + methodName {string} 匿名函数需显式传入目标函数名eg:this.Begin = function(){....};}
     * 
     * .unhook
     * + realFunc {string} 用于保存原始函数的函数名称,用于unHook
     * + funcName {string} 被Hook的函数名称
     * + context {object} 目标函数所在对象,用于hook非window对象下的函数，如String.protype.slice,carInstance1
     * @example
      let hook = new Utils.Hooks();
      hook.initEnv();
      function myFunction(){
          console.log("我自己需要执行的函数");
      }
      function testFunction(){
          console.log("正常执行的函数");
      }
      testFunction.hook(testFunction,myFunction,window);
     **/
	Hooks = Hooks;

	/**
     * 为减少代码量和回调，把GM_xmlhttpRequest封装
     * 文档地址: https://www.tampermonkey.net/documentation.php?ext=iikm
     * 其中onloadstart、onprogress、onreadystatechange是回调形式，onabort、ontimeout、onerror可以设置全局回调函数
     * @param _GM_xmlHttpRequest_ 油猴中的GM_xmlhttpRequest
     * @example
      let httpx = new Utils.Httpx(GM_xmlhttpRequest);
      let postResp = await httpx.post({
        url:url,
        data:JSON.stringify({
          test:1
        }),
        timeout: 5000
      });
      console.log(postResp);
      > {
        status: true,
        data: {responseText: "...", response: xxx,...},
        msg: "请求完毕",
        type: "onload",
      }
  
      if(postResp === "onload" && postResp.status){
      // onload
      }else if(postResp === "ontimeout"){
      // ontimeout
      }
     * @example
      // 也可以先配置全局参数
      let httpx = new Utils.Httpx(GM_xmlhttpRequest);
      httpx.config({
        timeout: 5000,
        async: false,
        responseType: "html",
        redirect: "follow",
      })
      // 优先级为 默认details < 全局details < 单独的details
     */
	Httpx = Httpx;
	/**
     * 浏览器端的indexedDB操作封装
     * @example
      let db = new Utils.indexedDB('web_DB', 'nav_text')
      let data = {name:'管理员', roleId: 1, type: 1};
      db.save('list',data).then((resolve)=>{
          console.log(resolve,'存储成功')
      })
  
      db.get('list').then((resolve)=>{
          console.log(resolve,'查询成功')
      })
  
      db.getPaging('list',20,10).then((resolve)=>{
          console.log(resolve,'查询分页偏移第20，一共10行成功');
      })
  
      db.delete('list').then(resolve=>{
          console.log(resolve,'删除成功---->>>>>>name')
      })
  
      db.deleteAll().then(resolve=>{
          console.log(resolve,'清除数据库---->>>>>>name')
      })
     **/
	indexedDB = indexedDB;
	/**
	 * 判断目标函数是否是Native Code
	 * @param target
	 * @returns
	 * + true 是Native
	 * + false 不是Native
	 * @example
	 * Utils.isNativeFunc(window.location.assign)
	 * > true
	 */
	isNativeFunc(target: Function): boolean;
	isNativeFunc(target: Function): boolean {
		return Boolean(
			target.toString().match(/^function .*\(\) { \[native code\] }$/)
		);
	}
	/**
	 * 判断当前的位置是否位于页面底部附近
	 * @param nearBottomHeight （可选）判断在底部的误差值，默认：50
	 * @returns
	 * + true 在底部附近
	 * + false 不在底部附近
	 */
	isNearBottom(nearBottomHeight?: number): boolean;
	/**
	 * 判断元素内当前的位置是否位于元素内底部附近
	 * @param target 需要判断的元素
	 * @param nearBottomHeight （可选）判断在底部的误差值，默认：50
	 */
	isNearBottom(target: HTMLElement, nearBottomHeight?: number): boolean;
	isNearBottom(...args: any[]): boolean {
		let nearBottomHeight = 50;

		let checkWindow = () => {
			// 已滚动的距离
			let scrollTop: number =
				this.windowApi.window.pageYOffset ||
				this.windowApi.document.documentElement.scrollTop;
			// 视窗高度
			let viewportHeight: number =
				this.windowApi.window.innerHeight ||
				this.windowApi.document.documentElement.clientHeight;
			// 最大滚动距离
			let maxScrollHeight: number =
				this.windowApi.document.documentElement.scrollHeight - nearBottomHeight;

			return scrollTop + viewportHeight >= maxScrollHeight;
		};

		let checkNode = ($ele: HTMLElement) => {
			// 已滚动的距离
			let scrollTop: number = $ele.scrollTop;
			// 视窗高度
			let viewportHeight: number = $ele.clientHeight;
			// 最大滚动距离
			let maxScrollHeight: number =
				$ele.scrollHeight - viewportHeight - nearBottomHeight;

			return scrollTop >= maxScrollHeight;
		};

		let firstArg = args[0];
		if (args.length === 0 || typeof args[0] === "number") {
			// nearBottomHeight
			//
			return checkWindow();
		} else if (typeof args[0] === "object" && args[0] instanceof HTMLElement) {
			// target
			// target，nearBottomHeight
			if (typeof args[1] === "number" && !Number.isNaN(args[1])) {
				nearBottomHeight = args[1];
			}
			return checkNode(args[0]);
		} else {
			throw new TypeError("参数1类型错误" + typeof firstArg);
		}
	}
	/**
	 * 判断对象是否是元素
	 * @param target
	 * @returns
	 * + true 是元素
	 * + false 不是元素
	 * @example
	 * Utils.isDOM(document.querySelector("a"))
	 * > true
	 */
	isDOM = CommonUtil.isDOM.bind(CommonUtil);
	/**
	 * 判断浏览器是否支持全屏
	 */
	isFullscreenEnabled(): boolean;
	isFullscreenEnabled(): boolean {
		return !!(
			(this.windowApi.document as any).fullscreenEnabled ||
			(this.windowApi.document as any).webkitFullScreenEnabled ||
			(this.windowApi.document as any).mozFullScreenEnabled ||
			(this.windowApi.document as any).msFullScreenEnabled
		);
	}
	/**
	 * 判断对象是否是jQuery对象
	 * @param target
	 * @returns
	 * + true 是jQuery对象
	 * + false 不是jQuery对象
	 * @example
	 * Utils.isJQuery($("a"))
	 * > true
	 */
	isJQuery(target: any): boolean;
	isJQuery(target: any): boolean {
		let result = false;
		if (typeof jQuery === "object" && target instanceof jQuery) {
			result = true;
		}
		if (target == null) {
			return false;
		}
		if (typeof target === "object") {
			/* 也有种可能，这个jQuery对象是1.8.3版本的，页面中的jQuery是3.4.1版本的 */
			let jQueryProps = [
				"add",
				"addBack",
				"addClass",
				"after",
				"ajaxComplete",
				"ajaxError",
				"ajaxSend",
				"ajaxStart",
				"ajaxStop",
				"ajaxSuccess",
				"animate",
				"append",
				"appendTo",
				"attr",
				"before",
				"bind",
				"blur",
				"change",
				"children",
				"clearQueue",
				"click",
				"clone",
				"closest",
				"constructor",
				"contents",
				"contextmenu",
				"css",
				"data",
				"dblclick",
				"delay",
				"delegate",
				"dequeue",
				"each",
				"empty",
				"end",
				"eq",
				"extend",
				"fadeIn",
				"fadeOut",
				"fadeTo",
				"fadeToggle",
				"filter",
				"find",
				"first",
				"focus",
				"focusin",
				"focusout",
				"get",
				"has",
				"hasClass",
				"height",
				"hide",
				"hover",
				"html",
				"index",
				"init",
				"innerHeight",
				"innerWidth",
				"insertAfter",
				"insertBefore",
				"is",
				"jquery",
				"keydown",
				"keypress",
				"keyup",
				"last",
				"load",
				"map",
				"mousedown",
				"mouseenter",
				"mouseleave",
				"mousemove",
				"mouseout",
				"mouseover",
				"mouseup",
				"next",
				"nextAll",
				"not",
				"off",
				"offset",
				"offsetParent",
				"on",
				"one",
				"outerHeight",
				"outerWidth",
				"parent",
				"parents",
				"position",
				"prepend",
				"prependTo",
				"prev",
				"prevAll",
				"prevUntil",
				"promise",
				"prop",
				"pushStack",
				"queue",
				"ready",
				"remove",
				"removeAttr",
				"removeClass",
				"removeData",
				"removeProp",
				"replaceAll",
				"replaceWith",
				"resize",
				"scroll",
				"scrollLeft",
				"scrollTop",
				"select",
				"show",
				"siblings",
				"slice",
				"slideDown",
				"slideToggle",
				"slideUp",
				"sort",
				"splice",
				"text",
				"toArray",
				"toggle",
				"toggleClass",
				"trigger",
				"triggerHandler",
				"unbind",
				"width",
				"wrap",
			];
			for (const jQueryPropsName of jQueryProps) {
				if (!(jQueryPropsName in target)) {
					result = false;
					/* console.log(jQueryPropsName); */
					break;
				} else {
					result = true;
				}
			}
		}
		return result;
	}
	/**
	 * 判断当前设备是否是移动端
	 * @param userAgent （可选）UA字符串，默认使用当前的navigator.userAgent
	 * @returns
	 * + true 是移动端
	 * + false 不是移动端
	 * @example
	 * Utils.isPhone();
	 * > true
	 **/
	isPhone(userAgent?: string): boolean;
	isPhone(userAgent: string = navigator.userAgent): boolean {
		return Boolean(/(iPhone|iPad|iPod|iOS|Android|Mobile)/i.test(userAgent));
	}
	/**
	 * 判断传递的字符串是否是由相同的字符组成
	 * @param targetStr 需要判断的字符串，长度(.length)需要≥2
	 * @param coefficient 系数（默认:1），某个字符重复的系数大于它那么就是返回true，默认全部
	 */
	isSameChars(targetStr: string, coefficient?: number): boolean;
	isSameChars(targetStr: string, coefficient: number = 1): boolean {
		if (typeof targetStr !== "string") {
			throw new TypeError("参数 str 必须是 string 类型");
		}
		if (targetStr.length < 2) {
			return false;
		}
		targetStr = targetStr.toLowerCase();
		const targetCharMap: UtilsOwnObject<string> = {};
		let targetStrLength = 0;
		for (const char of targetStr) {
			if (Reflect.has(targetCharMap, char)) {
				(targetCharMap as any)[char]++;
			} else {
				(targetCharMap as any)[char] = 1;
			}
			targetStrLength++;
		}
		let result = false;
		for (const char in targetCharMap) {
			if ((targetCharMap as any)[char] / targetStrLength >= coefficient) {
				result = true;
				break;
			}
		}
		return result;
	}
	/**
	 * 判断对象是否不为空
	 * @returns {boolean}
	 * + true 不为空
	 * + false 为空
	 * @example
	 * Utils.isNotNull("123");
	 * > true
	 */
	isNotNull = CommonUtil.isNotNull.bind(CommonUtil);
	/**
     * 判断对象或数据是否为空
     * + `String`判空的值，如 ""、"null"、"undefined"、"   "
     * + `Number`判空的值，如 0
     * + `Object`判空的值，如 {}、null、undefined
     * + `Array`(存在属性Symbol.iterator)判空的值，如 []
     * + `Boolean`判空的值，如false
     * + `Function`判空的值，如()=>{}、(xxx="")=>{}、function(){}、function(xxx=""){}
     * @returns
     * + true 为空
     * + false 不为空
     * @example
      Utils.isNull({});
      > true
     * @example
      Utils.isNull([]);
      > true
     * @example
      Utils.isNull(" ");
      > true
     * @example
      Utils.isNull(function(){});
      > true
     * @example
      Utils.isNull(()=>{}));
      > true
     * @example
      Utils.isNull("undefined");
      > true
     * @example
      Utils.isNull("null");
      > true
     * @example
      Utils.isNull(" ", false);
      > true
     * @example
      Utils.isNull([1],[]);
      > false
     * @example
      Utils.isNull([],[1]);
      > false
     * @example
      Utils.isNull(false,[123]);
      > false
     **/
	isNull = CommonUtil.isNull.bind(CommonUtil);

	/**
	 * 判断浏览器主题是否是暗黑|深色模式
	 */
	isThemeDark(): boolean;
	isThemeDark(): boolean {
		return this.windowApi.globalThis.matchMedia("(prefers-color-scheme: dark)")
			.matches;
	}
	/**
	 * 判断元素是否在页面中可见
	 * @param element 需要检查的元素，可以是普通元素|数组形式的元素|通过querySelectorAll获取的元素数组
	 * @param inView
	 * + true 在窗口可视区域
	 * + false 不在窗口可视区域
	 * @returns
	 * + true 可见
	 * + false 不可见
	 * @example
	 * Utils.isVisible(document.documentElement)
	 * > true
	 */
	isVisible(
		element: HTMLElement | HTMLElement[] | Element | NodeList,
		inView: boolean = false
	): boolean {
		let needCheckDomList = [];
		if (element instanceof Array || element instanceof NodeList) {
			element = element as HTMLElement[];
			needCheckDomList = [...element];
		} else {
			needCheckDomList = [element];
		}
		let result = true;
		for (const domItem of needCheckDomList) {
			let domDisplay = this.windowApi.window.getComputedStyle(domItem);
			if (domDisplay.display === "none") {
				result = false;
			} else {
				let domClientRect = domItem.getBoundingClientRect();
				if (inView) {
					let viewportWidth =
						this.windowApi.window.innerWidth ||
						this.windowApi.document.documentElement.clientWidth;
					let viewportHeight =
						this.windowApi.window.innerHeight ||
						this.windowApi.document.documentElement.clientHeight;
					result = !(
						domClientRect.right < 0 ||
						domClientRect.left > viewportWidth ||
						domClientRect.bottom < 0 ||
						domClientRect.top > viewportHeight
					);
				} else {
					result = Boolean(domItem.getClientRects().length);
				}
			}
			if (!result) {
				/* 有一个不可见就退出循环 */
				break;
			}
		}
		return result;
	}

	/**
	 * 判断是否是Via浏览器环境
	 * @returns
	 * + true 是Via
	 * + false 不是Via
	 * @example
	 * Utils.isWebView_Via()
	 * > false
	 */
	isWebView_Via(): boolean;
	isWebView_Via(): boolean {
		let result = true;
		let UtilsContext = this;
		if (typeof (this.windowApi.top.window as any).via === "object") {
			for (const key in Object.values((this.windowApi.top.window as any).via)) {
				if (Reflect.has((this.windowApi.top.window as any).via, key)) {
					let objValueFunc = (this.windowApi.top.window as any).via[key];
					if (
						typeof objValueFunc === "function" &&
						UtilsContext.isNativeFunc(objValueFunc)
					) {
						result = true;
					} else {
						result = false;
						break;
					}
				}
			}
		} else {
			result = false;
		}
		return result;
	}
	/**
	 * 判断是否是X浏览器环境
	 * @returns
	 * + true 是X浏览器
	 * + false 不是X浏览器
	 * @example
	 * Utils.isWebView_X()
	 * > false
	 */
	isWebView_X(): boolean;
	isWebView_X(): boolean {
		let result = true;
		let UtilsContext = this;
		if (typeof (this.windowApi.top.window as any).mbrowser === "object") {
			for (const key in Object.values(
				(this.windowApi.top.window as any).mbrowser
			)) {
				if (Reflect.has((this.windowApi.top.window as any).mbrowser, key)) {
					let objValueFunc = (this.windowApi.top.window as any).mbrowser[key];
					if (
						typeof objValueFunc === "function" &&
						UtilsContext.isNativeFunc(objValueFunc)
					) {
						result = true;
					} else {
						result = false;
						break;
					}
				}
			}
		} else {
			result = false;
		}
		return result;
	}
	/**
	 * 把对象内的value值全部取出成数组
	 * @param target 目标对象
	 * @returns 返回数组
	 * @example
	 * Utils.parseObjectToArray({"工具类":"jsonToArray","return","Array"});
	 * > ['jsonToArray', 'Array']
	 **/
	parseObjectToArray<T extends any>(target: T): T[keyof T][];
	parseObjectToArray<T extends any>(target: T) {
		if (typeof target !== "object") {
			throw new Error(
				"Utils.parseObjectToArray 参数 target 必须为 object 类型"
			);
		}
		let result: T[keyof T][] = [];
		Object.keys(target!).forEach(function (keyName) {
			result = result.concat(target![keyName as any as keyof T]);
		});
		return result;
	}
	/**
     * 自动锁对象，用于循环判断运行的函数，在循环外new后使用，注意，如果函数内部存在异步操作，需要使用await
     * @example
      let lock = new Utils.LockFunction(()=>{console.log(1)}))
      lock.run();
      > 1
     * @example
      let lock = new Utils.LockFunction(()=>{console.log(1)}),true) -- 异步操作
      await lock.run();
      > 1
     **/
	LockFunction = LockFunction;
	/**
     * 日志对象
     * @param _GM_info_ 油猴管理器的API GM_info，或者是一个对象，如{"script":{name:"Utils.Log"}}
     * @example
      let log = new Utils.Log(GM_info);
      log.info("普通输出");
      > 普通输出
  
      log.success("成功输出");
      > 成功输出
  
      log.error("错误输出");
      > 错误输出
      
      log.warn("警告输出");
      > 警告输出
  
      log.tag = "自定义tag信息";
      log.info("自定义info的颜色","#e0e0e0");
      > 自定义info的颜色
  
      log.config({
        successColor: "#31dc02",
        errorColor: "#e02d2d",
        infoColor: "black",
      })
      log.success("颜色为#31dc02");
      > 颜色为#31dc02
     */
	Log = Log;
	/**
	 * 合并数组内的JSON的值字符串
	 * @param data 需要合并的数组
	 * @param handleFunc 处理的函数|JSON的key
	 * @example
	 * Utils.mergeArrayToString([{"name":"数组内数据部分字段合并成字符串->"},{"name":"mergeToString"}],(item)=>{return item["name"]});
	 * > '数组内数据部分字段合并成字符串->mergeToString'
	 **/
	mergeArrayToString<T extends any>(
		data: T[],
		handleFunc?: ((val: T) => T) | keyof T
	): string;
	mergeArrayToString<T extends any>(
		data: T[],
		handleFunc?: ((val: T) => T) | keyof T
	): string {
		if (!(data instanceof Array)) {
			throw new Error("Utils.mergeArrayToString 参数 data 必须为 Array 类型");
		}
		let content = "";
		if (typeof handleFunc === "function") {
			data.forEach((item) => {
				content += handleFunc(item);
			});
		} else if (typeof handleFunc === "string") {
			data.forEach((item) => {
				content += item[handleFunc];
			});
		} else {
			data.forEach((item) => {
				Object.values(item as any)
					.filter((item2) => typeof item2 === "string")
					.forEach((item3) => {
						content += item3;
					});
			});
		}
		return content;
	}
	/**
     * 监听页面元素改变并处理
     * @param target 需要监听的元素，如果不存在，可以等待它出现
     * @param observer_config MutationObserver的配置
     * @example
      Utils.mutationObserver(document.querySelector("div.xxxx"),{
        "callback":(mutations, observer)=>{},
        "config":{childList:true,attributes:true}
      });
     * @example
      Utils.mutationObserver(document.querySelectorAll("div.xxxx"),{
        "callback":(mutations, observer)=>{},
        "config":{childList:true,attributes:true}}
      );
     * @example
      Utils.mutationObserver($("div.xxxx"),{
      "callback":(mutations, observer)=>{},
      "config":{childList:true,attributes:true}}
      );
     **/
	mutationObserver(
		target: HTMLElement | Node | NodeList | Document,
		observer_config: {
			/**
			 * observer的配置
			 */
			config?: MutationObserverInit;
			/**
			 * 是否主动触发一次
			 */
			immediate?: boolean;
			/**
			 * 触发的回调函数
			 */
			callback: MutationCallback;
		}
	): MutationObserver;
	mutationObserver(
		target: HTMLElement | Node | NodeList | Document,
		observer_config: {
			/**
			 * observer的配置
			 */
			config?: MutationObserverInit;
			/**
			 * 是否主动触发一次
			 */
			immediate?: boolean;
			/**
			 * 触发的回调函数
			 */
			callback: MutationCallback;
		}
	): MutationObserver {
		let UtilsContext = this;

		let default_obverser_config = {
			/* 监听到元素有反馈，需执行的函数 */
			callback: () => {},
			config: <MutationObserverInit>{
				/**
				 * + true 监听以 target 为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对 target
				 * + false (默认) 不生效
				 */
				subtree: void 0 as any as boolean,
				/**
				 * + true 监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）
				 * + false (默认) 不生效
				 */
				childList: void 0 as any as boolean,
				/**
				 * + true 观察所有监听的节点属性值的变化。默认值为 true，当声明了 attributeFilter 或 attributeOldValue
				 * + false (默认) 不生效
				 */
				attributes: void 0 as any as boolean,
				/**
				 * 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知
				 */
				attributeFilter: void 0 as any as string[],
				/**
				 * + true 记录上一次被监听的节点的属性变化；可查阅 MutationObserver 中的 Monitoring attribute values 了解关于观察属性变化和属性值记录的详情
				 * + false (默认) 不生效
				 */
				attributeOldValue: void 0 as any as boolean,
				/**
				 * + true 监听声明的 target 节点上所有字符的变化。默认值为 true，如果声明了 characterDataOldValue
				 * + false (默认) 不生效
				 */
				characterData: void 0 as any as boolean,
				/**
				 * + true 记录前一个被监听的节点中发生的文本变化
				 * + false (默认) 不生效
				 */
				characterDataOldValue: void 0 as any as boolean,
			},
			immediate: false,
		};
		observer_config = UtilsContext.assign(
			default_obverser_config,
			observer_config
		);
		let windowMutationObserver =
			this.windowApi.window.MutationObserver ||
			(this.windowApi.window as any).webkitMutationObserver ||
			(this.windowApi.window as any).MozMutationObserver;
		// 观察者对象
		let mutationObserver = new windowMutationObserver(function (
			mutations: MutationRecord[],
			observer: MutationObserver
		) {
			if (typeof observer_config.callback === "function") {
				observer_config.callback(mutations, observer);
			}
		});

		if (Array.isArray(target) || target instanceof NodeList) {
			// 传入的是数组或者元素数组
			target.forEach((item) => {
				mutationObserver.observe(item, observer_config.config);
			});
		} else if (UtilsContext.isJQuery(target)) {
			/* 传入的参数是jQuery对象 */
			(target as any).each((index: any, item: any) => {
				mutationObserver.observe(item, observer_config.config);
			});
		} else {
			mutationObserver.observe(target, observer_config.config);
		}
		if (observer_config.immediate) {
			/* 主动触发一次 */
			if (typeof observer_config.callback === "function") {
				observer_config.callback([], mutationObserver);
			}
		}
		return mutationObserver;
	}
	/**
	 * 使用观察器观察元素出现在视图内，出现的话触发回调
	 * @param target 目标元素
	 * @param callback 触发的回调
	 * @param options 观察器配置
	 * @example
	 * Utils.mutationVisible(document.querySelector("div.xxxx"),(entries,observer)=>{
	 *     console.log("该元素出现在视图内");
	 * }))
	 */
	mutationVisible(
		target: Element | Element[],
		callback: (
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) => void,
		options?: IntersectionObserverInit
	) {
		if (typeof IntersectionObserver === "undefined") {
			throw new TypeError("IntersectionObserver is not defined");
		}
		if (target == null) {
			throw new TypeError("mutatuinVisible target is null");
		}
		let defaultOptions: IntersectionObserverInit = {
			root: null,
			rootMargin: "0px 0px 0px 0px",
			threshold: [0.01, 0.99],
		};
		defaultOptions = this.assign(defaultOptions, options || {});
		let intersectionObserver = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) {
				if (typeof callback === "function") {
					callback(entries, observer);
				}
			}
		}, defaultOptions);
		if (Array.isArray(target)) {
			target.forEach((item) => {
				intersectionObserver.observe(item);
			});
		} else {
			intersectionObserver.observe(target);
		}
	}
	/**
	 * 去除全局window下的Utils，返回控制权
	 * @example
	 * let utils = Utils.noConflict();
	 * > ...
	 */
	noConflict() {
		if ((this.windowApi.window as any).Utils) {
			Reflect.deleteProperty(this.windowApi.window as any, "Utils");
		}
		(this.windowApi.window as any).Utils = utils;
		return utils;
	}
	/**
     * 恢复/释放该对象内的为function，让它无效/有效
     * @param needReleaseObject 需要操作的对象
     * @param needReleaseName 需要操作的对象的名字
     * @param functionNameList （可选）需要释放的方法，默认：全部方法
     * @param release （可选）
     * + true (默认) 释放该对象下的某些方法
     * + false 恢复该对象下的某些方法
     * @example
      // 释放该方法
      Utils.noConflictFunc(console,"console",["log"],true);
      console.log;
      > () => {}
  
     * @example
      // 恢复该方法
      Utils.noConflictFunc(console,"console",["log"],false);
      console.log;
      > ƒ log() { [native code] }
  
     * @example
      // 释放所有方法
      Utils.noConflictFunc(console,"console",[],true);
      console.debug;
      > () => {}
  
     * @example
      // 恢复所有方法
      Utils.noConflictFunc(console,"console",[],false);
      console.debug;
      > ƒ log() { [native code] }
     **/
	noConflictFunc(
		needReleaseObject: object,
		needReleaseName: string,
		functionNameList?: any[],
		release?: boolean
	): void;
	noConflictFunc(
		needReleaseObject: object,
		needReleaseName: string,
		functionNameList: any[] = [],
		release: boolean = true
	): void {
		let UtilsContext = this;
		if (typeof needReleaseObject !== "object") {
			throw new Error(
				"Utils.noConflictFunc 参数 needReleaseObject 必须为 object 类型"
			);
		}
		if (typeof needReleaseName !== "string") {
			throw new Error(
				"Utils.noConflictFunc 参数 needReleaseName 必须为 string 类型"
			);
		}
		if (!Array.isArray(functionNameList)) {
			throw new Error(
				"Utils.noConflictFunc 参数 functionNameList 必须为 Array 类型"
			);
		}
		let needReleaseKey = "__" + needReleaseName;
		/**
		 * 释放所有
		 */
		function releaseAll() {
			if (
				typeof (UtilsContext.windowApi.window as any)[needReleaseKey] !==
				"undefined"
			) {
				/* 已存在 */
				return;
			}
			(UtilsContext.windowApi.window as any)[needReleaseKey] =
				UtilsContext.deepClone(needReleaseObject);
			Object.values(needReleaseObject).forEach((value) => {
				if (typeof value === "function") {
					(needReleaseObject as any)[value.name] = () => {};
				}
			});
		}
		/**
		 * 释放单个
		 */
		function releaseOne() {
			Array.from(functionNameList).forEach((item) => {
				Object.values(needReleaseObject).forEach((value) => {
					if (typeof value === "function") {
						if (
							typeof (UtilsContext.windowApi.window as any)[needReleaseKey] ===
							"undefined"
						) {
							(UtilsContext.windowApi.window as any)[needReleaseKey] = {};
						}
						if (item === value.name) {
							(UtilsContext.windowApi.window as any)[needReleaseKey][
								value.name
							] = (needReleaseObject as any)[value.name];
							(needReleaseObject as any)[value.name] = () => {};
						}
					}
				});
			});
		}
		/**
		 * 恢复所有
		 */
		function recoveryAll() {
			if (
				typeof (UtilsContext.windowApi.window as any)[needReleaseKey] ===
				"undefined"
			) {
				/* 未存在 */
				return;
			}
			Object.assign(
				needReleaseObject,
				(UtilsContext.windowApi.window as any)[needReleaseKey]
			);
			Reflect.deleteProperty(
				UtilsContext.windowApi.window as any,
				"needReleaseKey"
			);
		}

		/**
		 * 恢复单个
		 */
		function recoveryOne() {
			if (
				typeof (UtilsContext.windowApi.window as any)[needReleaseKey] ===
				"undefined"
			) {
				/* 未存在 */
				return;
			}
			Array.from(functionNameList).forEach((item) => {
				if ((UtilsContext.windowApi.window as any)[needReleaseKey][item]) {
					(needReleaseObject as any)[item] = (
						UtilsContext.windowApi.window as any
					)[needReleaseKey][item];
					Reflect.deleteProperty(
						(UtilsContext.windowApi.window as any)[needReleaseKey],
						item
					);
					if (
						Object.keys((UtilsContext.windowApi.window as any)[needReleaseKey])
							.length === 0
					) {
						Reflect.deleteProperty(window, needReleaseKey);
					}
				}
			});
		}
		if (release) {
			/* 释放 */
			if (functionNameList.length === 0) {
				releaseAll();
			} else {
				/* 对单个进行操作 */
				releaseOne();
			}
		} else {
			/* 恢复 */
			if (functionNameList.length === 0) {
				recoveryAll();
			} else {
				/* 对单个进行操作 */
				recoveryOne();
			}
		}
	}
	/**
	 * base64转blob
	 * @param dataUri base64的数据
	 * @returns blob的链接
	 * @example
	 * Utils.parseBase64ToBlob("data:image/jpeg;base64,.....");
	 * > blob://xxxxxxx
	 **/
	parseBase64ToBlob(dataUri: string): Blob;
	parseBase64ToBlob(dataUri: string): Blob {
		if (typeof dataUri !== "string") {
			throw new Error(
				"Utils.parseBase64ToBlob 参数 dataUri 必须为 string 类型"
			);
		}
		let dataUriSplit = dataUri.split(","),
			dataUriMime = (dataUriSplit[0] as any).match(/:(.*?);/)[1],
			dataUriBase64Str = atob(dataUriSplit[1]),
			dataUriLength = dataUriBase64Str.length,
			u8arr = new Uint8Array(dataUriLength);
		while (dataUriLength--) {
			u8arr[dataUriLength] = dataUriBase64Str.charCodeAt(dataUriLength);
		}
		return new Blob([u8arr], {
			type: dataUriMime,
		});
	}
	/**
	 * base64转File对象
	 * @param dataUri base64的数据
	 * @param fileName （可选）文件名，默认：example
	 * @returns blob的链接
	 * @example
	 * Utils.parseBase64ToFile("data:image/jpeg;base64,.....","测试文件");
	 * > object
	 **/
	parseBase64ToFile(dataUri: string, fileName?: string): File;
	parseBase64ToFile(dataUri: string, fileName = "example") {
		if (typeof dataUri !== "string") {
			throw new Error(
				"Utils.parseBase64ToFile 参数 dataUri 必须为 string 类型"
			);
		}
		if (typeof fileName !== "string") {
			throw new Error(
				"Utils.parseBase64ToFile 参数 fileName 必须为 string 类型"
			);
		}
		let dataUriSplit = dataUri.split(","),
			dataUriMime = (dataUriSplit[0] as any).match(/:(.*?);/)[1],
			dataUriBase64Str = atob(dataUriSplit[1]),
			dataUriLength = dataUriBase64Str.length,
			u8arr = new Uint8Array(dataUriLength);
		while (dataUriLength--) {
			u8arr[dataUriLength] = dataUriBase64Str.charCodeAt(dataUriLength);
		}
		return new File([u8arr], fileName, {
			type: dataUriMime,
		});
	}
	/**
	 * 将正则匹配到的结果取出最后一个值并转换成int格式
	 * @param matchList 正则匹配的列表
	 * @param defaultValue 正则匹配的列表为空时，或者正则匹配的列表最后一项不为Int，返回该默认值0
	 * @example
	 * Utils.parseInt(["dadaadada123124","123124"],0);
	 * > 123124
	 *
	 * @example
	 * Utils.parseInt(null,0);
	 * > 0
	 * @example
	 * Utils.parseInt(["aaaaaa"]);
	 * > 0
	 *
	 * @example
	 * Utils.parseInt(["aaaaaa"],"66");
	 * > 66
	 *
	 * @example
	 * Utils.parseInt(["aaaaaaa"],"aa");
	 * > NaN
	 **/
	parseInt(
		matchList?: any[] | null | undefined | RegExpMatchArray,
		defaultValue?: number
	): number;
	parseInt(matchList: any[] = [], defaultValue = 0): number {
		if (matchList == null) {
			return parseInt(defaultValue.toString());
		}
		let parseValue = parseInt(matchList[matchList.length - 1]);
		if (isNaN(parseValue)) {
			parseValue = parseInt(defaultValue.toString());
		}
		return parseValue;
	}
	/**
	 * blob转File对象
	 * @param blobUrl 需要转换的blob的链接
	 * @param fileName （可选）转换成的File对象的文件名称，默认：example
	 * @example
	 * Utils.parseBlobToFile("blob://xxxxx");
	 * > object
	 **/
	parseBlobToFile(blobUrl: string, fileName?: string): Promise<File | Error>;
	async parseBlobToFile(
		blobUrl: string,
		fileName: string = "example"
	): Promise<File | Error> {
		return new Promise((resolve, reject) => {
			fetch(blobUrl)
				.then((response) => response.blob())
				.then((blob) => {
					const file = new File([blob], fileName, { type: blob.type });
					resolve(file);
				})
				.catch((error) => {
					console.error("Error:", error);
					reject(error);
				});
		});
	}
	/**
	 * 解析CDATA格式的内容字符串
	 * @param text 传入CDATA字符串
	 * @returns 返回解析出的内容
	 * @example
	 * let xml = "<root><![CDATA[This is some CDATA content.]]></root>";
	 * console.log(Utils.parseCDATA(xml));
	 * > This is some CDATA content.
	 */
	parseCDATA(text: string): string;
	parseCDATA(text: string = ""): string {
		let result = "";
		let cdataRegexp = /<\!\[CDATA\[([\s\S]*)\]\]>/;
		let cdataMatch = cdataRegexp.exec(text.trim());
		if (cdataMatch && cdataMatch.length > 1) {
			result = cdataMatch[cdataMatch.length - 1];
		}
		return result;
	}
	/**
	 * 【异步函数】File对象转base64
	 * @param fileObj 需要转换的File对象
	 * @example
	 * await Utils.parseFileToBase64(object);
	 * > 'data:image/jpeg:base64/,xxxxxx'
	 **/
	parseFileToBase64(fileObj: File): Promise<string>;
	async parseFileToBase64(fileObj: File): Promise<string> {
		let reader = new FileReader();
		reader.readAsDataURL(fileObj);
		return new Promise((resolve) => {
			reader.onload = function (event: any) {
				resolve(event.target.result as string);
			};
		});
	}
	/**
	 * 解析字符串
	 * @param text 要解析的 DOMString。它必须包含 HTML、xml、xhtml+xml 或 svg 文档。
	 * @param mimeType （可选）解析成的类型
	 * + （默认）text/html
	 * + text/xml
	 * + application/xml
	 * + application/xhtml+xml
	 * + image/svg+xml
	 * @example
	 * Utils.parseFromString("<p>123<p>");
	 * > #document
	 */
	parseFromString(
		text: string,
		mimeType?:
			| "text/html"
			| "text/xml"
			| "application/xml"
			| "application/xhtml+xml"
			| "image/svg+xml"
	): HTMLElement | XMLDocument | SVGElement;
	parseFromString(
		text: string,
		mimeType:
			| "text/html"
			| "text/xml"
			| "application/xml"
			| "application/xhtml+xml"
			| "image/svg+xml" = "text/html"
	): HTMLElement | XMLDocument | SVGElement {
		let parser = new DOMParser();
		return parser.parseFromString(text, mimeType);
	}
	/**
	 * 将字符串进行正则转义
	 * 例如：^替换$
	 * 转换：\^替换\$
	 */
	parseStringToRegExpString(text: string): string;
	parseStringToRegExpString(text: string): string {
		if (typeof text !== "string") {
			throw new TypeError("string必须是字符串");
		}
		let regString = text.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
		return regString;
	}
	/**
	 * 阻止事件传递
	 * @param element 要进行处理的元素
	 * @param eventNameList （可选）要阻止的事件名|列表
	 * @param capture （可选）是否捕获，默认false
	 * @example
	 * Utils.preventEvent(document.querySelector("a"),"click")
	 * @example
	 * Utils.preventEvent(event);
	 */
	preventEvent(event: Event): boolean;
	/**
	 * 阻止事件传递
	 * @param element 要进行处理的元素
	 * @param eventNameList （可选）要阻止的事件名|列表
	 * @param capture （可选）是否捕获，默认false
	 * @example
	 * Utils.preventEvent(document.querySelector("a"),"click")
	 * @example
	 * Utils.preventEvent(event);
	 */
	preventEvent(
		element: HTMLElement,
		eventNameList?: string | string[],
		capture?: boolean
	): boolean;
	preventEvent(
		element: HTMLElement | Event,
		eventNameList: string | string[] = [],
		capture?: boolean
	): boolean | undefined {
		function stopEvent(event: Event) {
			/* 阻止事件的默认行为发生。例如，当点击一个链接时，浏览器会默认打开链接的URL */
			event?.preventDefault();
			/* 停止事件的传播，阻止它继续向更上层的元素冒泡，事件将不会再传播给其他的元素 */
			event?.stopPropagation();
			/* 阻止事件传播，并且还能阻止元素上的其他事件处理程序被触发 */
			event?.stopImmediatePropagation();
			return false;
		}
		if (arguments.length === 1) {
			/* 直接阻止事件 */
			return stopEvent(arguments[0]);
		} else {
			/* 添加对应的事件来阻止触发 */
			if (typeof eventNameList === "string") {
				eventNameList = [eventNameList];
			}
			eventNameList.forEach((eventName) => {
				(element as HTMLElement).addEventListener(eventName, stopEvent, {
					capture: Boolean(capture),
				});
			});
		}
	}
	/**
     * 在canvas元素节点上绘制进度圆圈
     * @example
      let progress = new Utils.Process({canvasNode:document.querySelector("canvas")});
      progress.draw();
     * **/
	Progress = Progress;
	/**
	 * 劫持Event的isTrust为true，注入时刻，ducument-start
	 * @param isTrustValue （可选）让isTrusted为true
	 * @param filter （可选）过滤出需要的事件名，true为需要，false为不需要
	 * @example
	 * Utils.registerTrustClickEvent()
	 */
	registerTrustClickEvent(
		isTrustValue?: boolean,
		filter?: (typeName: string) => boolean
	): void;
	registerTrustClickEvent(
		isTrustValue: boolean = true,
		filter?: (typeName: string) => boolean
	): void {
		function trustEvent(event: Event) {
			return new Proxy(event, {
				get: function (target, property) {
					if (property === "isTrusted") {
						return isTrustValue;
					} else {
						return Reflect.get(target, property);
					}
				},
			});
		}
		if (filter == null) {
			filter = function (typeName) {
				return typeName === "click";
			};
		}
		const originalListener = EventTarget.prototype.addEventListener;
		EventTarget.prototype.addEventListener = function (...args) {
			let type = args[0];
			let callback: any = args[1];
			// let options = args[2];
			if (filter(type)) {
				if (typeof callback === "function") {
					args[1] = function (event) {
						callback.call(this, trustEvent(event));
					};
				} else if (typeof callback === "object" && "handleEvent" in callback) {
					let oldHandleEvent = callback["handleEvent"];

					(args[1] as any)["handleEvent"] = function (event: Event) {
						if (event == null) {
							return;
						}
						try {
							// Proxy对象使用instanceof会报错
							// 这里故意尝试一下，如果报错，则说明是Proxy对象
							event instanceof Proxy;
							oldHandleEvent.call(this, trustEvent(event));
						} catch (error) {
							Reflect.set(event, "isTrusted", isTrustValue);
						}
					};
				}
			}
			return originalListener.apply(this, args);
		};
	}
	/**
	 * 将数字进行正/负转换
	 * @param num 需要进行转换的数字
	 */
	reverseNumber(num: number): number;
	reverseNumber(num: number): number {
		let reversedNum = 0;
		let isNegative = false;

		if (num < 0) {
			isNegative = true;
			num = Math.abs(num);
		}

		while (num > 0) {
			reversedNum = reversedNum * 10 + (num % 10);
			num = Math.floor(num / 10);
		}

		return isNegative ? -reversedNum : reversedNum;
	}
	/**
	 * 将元素上的文本或元素使用光标进行选中
	 *
	 * 注意，如果设置startIndex和endIndex，且元素上并无可选则的坐标，那么会报错
	 * @param element 目标元素
	 * @param childTextNode 目标元素下的#text元素
	 * @param startIndex （可选）开始坐标，可为空
	 * @param endIndex （可选）结束坐标，可为空
	 */
	selectElementText(
		element: HTMLElement | Element | Node,
		childTextNode?: ChildNode,
		startIndex?: number,
		endIndex?: number
	): void;
	selectElementText(
		element: HTMLElement | Element | Node,
		childTextNode?: ChildNode,
		startIndex?: number,
		endIndex?: number
	): void {
		let range = this.windowApi.document.createRange();
		range.selectNodeContents(element);
		if (childTextNode) {
			if (childTextNode.nodeType !== Node.TEXT_NODE) {
				throw new TypeError("childTextNode必须是#text元素");
			}
			if (startIndex != null && endIndex != null) {
				range.setStart(childTextNode, startIndex);
				range.setEnd(childTextNode, endIndex);
			}
		}

		let selection = this.windowApi.globalThis.getSelection();
		if (selection) {
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	/**
	 * 复制到剪贴板
	 * @param data 需要复制到剪贴板的文本
	 * @param info （可选）默认：text/plain
	 * @example
	 * Utils.setClip({1:2});
	 * > {"1":2}
	 * @example
	 * Utils.setClip( ()=>{
	 *   console.log(1)
	 * });
	 * > ()=>{console.log(1)}
	 * @example
	 * Utils.setClip("xxxx");
	 * > xxxx
	 * @example
	 * Utils.setClip("xxxx","html");
	 * > xxxx
	 * @example
	 * Utils.setClip("xxxx","text/plain");
	 * > xxxx
	 **/
	setClip(
		data: any,
		info?:
			| {
					type: string;
					mimetype: string;
			  }
			| string
	): Promise<boolean>;
	setClip(
		data: any,
		info:
			| {
					type: string;
					mimetype: string;
			  }
			| string = {
			type: "text",
			mimetype: "text/plain",
		}
	): Promise<boolean> {
		if (typeof data === "object") {
			if (data instanceof Element) {
				data = data.outerHTML;
			} else {
				data = JSON.stringify(data);
			}
		} else if (typeof data !== "string") {
			data = data.toString();
		}
		let textType = typeof info === "object" ? info.type : (info as string);
		if (textType.includes("html")) {
			textType = "text/html";
		} else {
			textType = "text/plain";
		}
		let UtilsContext = this;
		class UtilsClipboard {
			#resolve;
			#copyData;
			#copyDataType;
			constructor(
				resolve: (value: boolean | PromiseLike<boolean>) => void,
				copyData: any,
				copyDataType: string
			) {
				this.#resolve = resolve;
				this.#copyData = copyData;
				this.#copyDataType = copyDataType;
			}
			async init() {
				let copyStatus = false;
				let requestPermissionStatus = await this.requestClipboardPermission();
				console.log(requestPermissionStatus);
				if (
					this.hasClipboard() &&
					(this.hasClipboardWrite() || this.hasClipboardWriteText())
				) {
					try {
						copyStatus = await this.copyDataByClipboard();
					} catch (error) {
						console.error("复制失败，使用第二种方式，error👉", error);
						copyStatus = this.copyTextByTextArea();
					}
				} else {
					copyStatus = this.copyTextByTextArea();
				}
				this.#resolve(copyStatus);
				this.destroy();
			}
			destroy() {
				this.#resolve = null as any;
				this.#copyData = null;
				this.#copyDataType = null as any;
			}
			isText() {
				return this.#copyDataType.includes("text");
			}
			hasClipboard() {
				return navigator?.clipboard != null;
			}
			hasClipboardWrite() {
				return navigator?.clipboard?.write != null;
			}
			hasClipboardWriteText() {
				return navigator?.clipboard?.writeText != null;
			}
			/**
			 * 使用textarea和document.execCommand("copy")来复制文字
			 */
			copyTextByTextArea() {
				try {
					let copyElement =
						UtilsContext.windowApi.document.createElement("textarea");
					copyElement.value = this.#copyData;
					copyElement.setAttribute("type", "text");
					copyElement.setAttribute("style", "opacity:0;position:absolute;");
					copyElement.setAttribute("readonly", "readonly");
					UtilsContext.windowApi.document.body.appendChild(copyElement);
					copyElement.select();
					UtilsContext.windowApi.document.execCommand("copy");
					UtilsContext.windowApi.document.body.removeChild(copyElement);
					return true;
				} catch (error) {
					console.error("复制失败，error👉", error);
					return false;
				}
			}
			/**
			 * 申请剪贴板权限
			 */
			requestClipboardPermission() {
				return new Promise((resolve, reject) => {
					if (navigator.permissions && navigator.permissions.query) {
						navigator.permissions
							.query({
								name: "clipboard-write" as any as PermissionName,
							})
							.then((permissionStatus) => {
								resolve(true);
							})
							.catch((error: TypeError) => {
								console.error([
									"申请剪贴板权限失败，尝试直接写入👉",
									error.message ?? error.name ?? error.stack,
								]);
								resolve(false);
							});
					} else {
						resolve(false);
					}
				});
			}
			/**
			 * 使用clipboard直接写入数据到剪贴板
			 */
			copyDataByClipboard(): Promise<boolean> {
				return new Promise((resolve, reject) => {
					if (this.isText()) {
						/* 只复制文字 */
						navigator.clipboard
							.writeText(this.#copyData)
							.then(() => {
								resolve(true);
							})
							.catch((error) => {
								reject(error);
							});
					} else {
						/* 可复制对象 */
						let textBlob = new Blob([this.#copyData], {
							type: this.#copyDataType,
						});
						navigator.clipboard
							.write([
								new ClipboardItem({
									[this.#copyDataType]: textBlob,
								}),
							])
							.then(() => {
								resolve(true);
							})
							.catch((error) => {
								reject(error);
							});
					}
				});
			}
		}
		return new Promise((resolve) => {
			const utilsClipboard = new UtilsClipboard(resolve, data, textType);
			if (UtilsContext.windowApi.document.hasFocus()) {
				utilsClipboard.init();
			} else {
				UtilsContext.windowApi.window.addEventListener(
					"focus",
					() => {
						utilsClipboard.init();
					},
					{ once: true }
				);
			}
		});
	}
	/**
	 * 【异步函数】等待N秒执行函数
	 * @param callback 待执行的函数(字符串)
	 * @param delayTime （可选）延时时间(ms)，默认：0
	 * @example
	 * await Utils.setTimeout(()=>{}, 2500);
	 * > ƒ tryCatchObj() {}
	 * @example
	 * await Utils.setTimeout("()=>{console.log(12345)}", 2500);
	 * > ƒ tryCatchObj() {}
	 **/
	setTimeout(callback: (() => void) | string, delayTime?: number): Promise<any>;
	setTimeout(
		callback: (() => void) | string,
		delayTime: number = 0
	): Promise<any> {
		let UtilsContext = this;
		if (typeof callback !== "function" && typeof callback !== "string") {
			throw new TypeError(
				"Utils.setTimeout 参数 callback 必须为 function|string 类型"
			);
		}
		if (typeof delayTime !== "number") {
			throw new TypeError("Utils.setTimeout 参数 delayTime 必须为 number 类型");
		}
		return new Promise((resolve) => {
			UtilsContext.workerSetTimeout(() => {
				resolve(UtilsContext.tryCatch().run(callback));
			}, delayTime);
		});
	}
	/**
	 * 【异步函数】延迟xxx毫秒
	 * @param delayTime （可选）延时时间(ms)，默认：0
	 * @example
	 * await Utils.sleep(2500)
	 **/
	sleep(delayTime?: number): Promise<void>;
	sleep(delayTime: number = 0): Promise<void> {
		let UtilsContext = this;
		if (typeof delayTime !== "number") {
			throw new Error("Utils.sleep 参数 delayTime 必须为 number 类型");
		}
		return new Promise((resolve) => {
			UtilsContext.workerSetTimeout(() => {
				resolve(void 0);
			}, delayTime);
		});
	}
	/**
	 * 向右拖动滑块
	 * @param selector 选择器|元素
	 * @param offsetX （可选）水平拖动长度，默认：window.innerWidth
	 * @example
	 * Utils.dragSlider("#xxxx");
	 * @example
	 * Utils.dragSlider("#xxxx",100);
	 */
	dragSlider(selector: string | Element | Node, offsetX?: number): void;
	dragSlider(
		selector: string | Element | Node,
		offsetX: number = this.windowApi.window.innerWidth
	): void {
		let UtilsContext = this;
		function initMouseEvent(
			eventName: string,
			offSetX: number,
			offSetY: number
		) {
			let win = typeof unsafeWindow === "undefined" ? globalThis : unsafeWindow;
			let mouseEvent =
				UtilsContext.windowApi.document.createEvent("MouseEvents");
			mouseEvent.initMouseEvent(
				eventName,
				true,
				true,
				win as Window,
				0,
				offSetX,
				offSetY,
				offSetX,
				offSetY,
				false,
				false,
				false,
				false,
				0,
				null
			);
			return mouseEvent;
		}
		let sliderElement =
			typeof selector === "string"
				? domUtils.selector<HTMLElement>(selector)
				: selector;
		if (
			!(sliderElement instanceof Node) ||
			!(sliderElement instanceof Element)
		) {
			throw new Error("Utils.dragSlider 参数selector 必须为Node/Element类型");
		}
		let rect = sliderElement.getBoundingClientRect(),
			x0 = rect.x || rect.left,
			y0 = rect.y || rect.top,
			x1 = x0 + offsetX,
			y1 = y0;
		sliderElement.dispatchEvent(initMouseEvent("mousedown", x0, y0));
		sliderElement.dispatchEvent(initMouseEvent("mousemove", x1, y1));
		sliderElement.dispatchEvent(initMouseEvent("mouseleave", x1, y1));
		sliderElement.dispatchEvent(initMouseEvent("mouseout", x1, y1));
	}
	/**
	 * 使目标元素进入全屏
	 * @param element （可选）目标元素，默认：document.documentElement
	 * @param options （可选）配置，一般不用
	 * @example
	 * Utils.enterFullScreen();
	 */
	enterFullScreen(element: HTMLElement, options?: FullscreenOptions): void;
	enterFullScreen(
		element: HTMLElement = this.windowApi.document.documentElement,
		options?: FullscreenOptions
	): void {
		try {
			if (element.requestFullscreen) {
				element.requestFullscreen(options);
			} else if ((element as any).webkitRequestFullScreen) {
				(element as any).webkitRequestFullScreen();
			} else if ((element as any).mozRequestFullScreen) {
				(element as any).mozRequestFullScreen();
			} else if ((element as any).msRequestFullscreen) {
				(element as any).msRequestFullscreen();
			} else {
				throw new TypeError("该浏览器不支持全屏API");
			}
		} catch (err) {
			console.error(err);
		}
	}
	/**
	 * 使浏览器退出全屏
	 * @param element （可选）目标元素，默认：document.documentElement
	 * @example
	 * Utils.exitFullScreen();
	 */
	exitFullScreen(element?: HTMLElement): Promise<void>;
	exitFullScreen(
		element: HTMLElement = this.windowApi.document.documentElement
	): Promise<void> {
		if (this.windowApi.document.exitFullscreen) {
			return this.windowApi.document.exitFullscreen();
		} else if ((this.windowApi.document as any).msExitFullscreen) {
			return (this.windowApi.document as any).msExitFullscreen();
		} else if ((this.windowApi.document as any).mozCancelFullScreen) {
			return (this.windowApi.document as any).mozCancelFullScreen();
		} else if ((this.windowApi.document as any).webkitCancelFullScreen) {
			return (this.windowApi.document as any).webkitCancelFullScreen();
		} else {
			return new Promise((resolve, reject) => {
				reject(new TypeError("该浏览器不支持全屏API"));
			});
		}
	}
	/**
	 * 数组按照内部某个值的大小比对排序，如[{"time":"2022-1-1"},{"time":"2022-2-2"}]
	 * @param data 数据|获取数据的方法
	 * @param getPropertyValueFunc 数组内部项的某个属性的值的方法，参数为这个项
	 * @param sortByDesc （可选）排序方式
	 * + true (默认)倒序(值最大排第一个，如:6、5、4、3...)
	 * + false 升序(值最小排第一个，如:1、2、3、4...)
	 * @returns 返回比较排序完成的数组
	 * @example
	 * Utils.sortListByProperty([{"time":"2022-1-1"},{"time":"2022-2-2"}],(item)=>{return item["time"]})
	 * > [{time: '2022-2-2'},{time: '2022-1-1'}]
	 * @example
	 * Utils.sortListByProperty([{"time":"2022-1-1"},{"time":"2022-2-2"}],(item)=>{return item["time"]},false)
	 * > [{time: '2022-1-1'},{time: '2022-2-2'}]
	 **/
	sortListByProperty<T extends any>(
		data: T[],
		getPropertyValueFunc: string | ((value: T) => any),
		sortByDesc?: boolean
	): T[];
	sortListByProperty<T extends any>(
		data: T[],
		getPropertyValueFunc: string | ((value: T) => any),
		sortByDesc: boolean = true
	): T[] {
		let UtilsContext = this;
		if (
			typeof getPropertyValueFunc !== "function" &&
			typeof getPropertyValueFunc !== "string"
		) {
			throw new Error(
				"Utils.sortListByProperty 参数 getPropertyValueFunc 必须为 function|string 类型"
			);
		}
		if (typeof sortByDesc !== "boolean") {
			throw new Error(
				"Utils.sortListByProperty 参数 sortByDesc 必须为 boolean 类型"
			);
		}
		let getObjValue = function (obj: any) {
			return typeof getPropertyValueFunc === "string"
				? obj[getPropertyValueFunc]
				: getPropertyValueFunc(obj);
		};
		/**
		 * 排序方法
		 * @param {any} after_obj
		 * @param {any} before_obj
		 * @returns
		 */
		let sortFunc = function (after_obj: any, before_obj: any) {
			let beforeValue = getObjValue(before_obj); /*  前 */
			let afterValue = getObjValue(after_obj); /* 后 */
			if (sortByDesc) {
				if (afterValue > beforeValue) {
					return -1;
				} else if (afterValue < beforeValue) {
					return 1;
				} else {
					return 0;
				}
			} else {
				if (afterValue < beforeValue) {
					return -1;
				} else if (afterValue > beforeValue) {
					return 1;
				} else {
					return 0;
				}
			}
		};
		/**
		 * 排序元素方法
		 * @param  nodeList 元素列表
		 * @param getNodeListFunc 获取元素列表的函数
		 */
		let sortNodeFunc = function (
			nodeList: NodeListOf<HTMLElement>,
			getNodeListFunc: () => NodeListOf<HTMLElement>
		) {
			let nodeListLength = nodeList.length;
			for (let i = 0; i < nodeListLength - 1; i++) {
				for (let j = 0; j < nodeListLength - 1 - i; j++) {
					let beforeNode = nodeList[j];
					let afterNode = nodeList[j + 1];
					let beforeValue = getObjValue(beforeNode); /*  前 */
					let afterValue = getObjValue(afterNode); /* 后 */
					if (
						(sortByDesc == true && beforeValue < afterValue) ||
						(sortByDesc == false && beforeValue > afterValue)
					) {
						/* 升序/降序 */
						/* 相邻元素两两对比 */
						let temp = beforeNode.nextElementSibling;
						afterNode.after(beforeNode);
						if (temp == null) {
							/* 如果为空，那么是最后一个元素，使用append */
							(temp as any).parentNode.appendChild(afterNode);
						} else {
							/* 不为空，使用before */
							temp.before(afterNode);
						}
						nodeList = getNodeListFunc();
					}
				}
			}
		};
		let result = data;
		let getDataFunc = null;
		if (data instanceof Function) {
			getDataFunc = data;
			data = (data as any)();
		}
		if (Array.isArray(data)) {
			data.sort(sortFunc);
		} else if (
			(data as any) instanceof NodeList ||
			UtilsContext.isJQuery(data)
		) {
			sortNodeFunc(data as any, getDataFunc as any);
			result = (getDataFunc as any)();
		} else {
			throw new Error(
				"Utils.sortListByProperty 参数 data 必须为 Array|NodeList|jQuery 类型"
			);
		}
		return result;
	}
	/**
	 * 字符串转正则，用于把字符串中不规范的字符进行转义
	 * @param targetString 需要进行转换的字符串
	 * @param flags 正则标志
	 */
	stringToRegular(
		targetString: string | RegExp,
		flags?: "g" | "i" | "m" | "u" | "y" | string
	): RegExp;
	stringToRegular(
		targetString: string | RegExp,
		flags: "g" | "i" | "m" | "u" | "y" | string = "ig"
	): RegExp {
		let reg;
		flags = flags.toLowerCase();
		if (typeof targetString === "string") {
			reg = new RegExp(
				targetString.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"),
				flags
			);
		} else if ((targetString as any) instanceof RegExp) {
			reg = targetString;
		} else {
			throw new Error(
				"Utils.stringToRegular 参数targetString必须是string|Regexp类型"
			);
		}
		return reg;
	}
	/**
	 * 字符串首字母转大写
	 * @param targetString 目标字符串
	 * @param otherStrToLowerCase （可选）剩余部分字符串转小写，默认false
	 */
	stringTitleToUpperCase(
		targetString: string,
		otherStrToLowerCase?: boolean
	): string;
	stringTitleToUpperCase(
		targetString: string,
		otherStrToLowerCase: boolean = false
	): string {
		let newTargetString = targetString.slice(0, 1).toUpperCase();
		if (otherStrToLowerCase) {
			newTargetString = newTargetString + targetString.slice(1).toLowerCase();
		} else {
			newTargetString = newTargetString + targetString.slice(1);
		}
		return newTargetString;
	}
	/**
	 * 判断目标字符串是否是以xxx开始
	 *
	 * 如果searchString是字符串数组，那么判断的结果则是字符串数组中的任意字符匹配到返回true
	 * @param target 目标字符串
	 * @param searchString 需要搜索的字符串
	 * @param position （可选）目标字符串的判断起点，要求≥0，默认为0
	 */
	startsWith(
		target: string,
		searchString: string | RegExp | string[],
		position?: number
	): boolean;
	startsWith(
		target: string,
		searchString: string | RegExp | string[],
		position: number = 0
	): boolean {
		let UtilsContext = this;
		if (position > target.length) {
			/* 超出目标字符串的长度 */
			return false;
		}
		if (position !== 0) {
			target = target.slice(position, target.length);
		}
		let searchStringRegexp = searchString;
		if (typeof searchString === "string") {
			searchStringRegexp = new RegExp(`^${searchString}`);
		} else if (Array.isArray(searchString)) {
			let flag = false;
			for (const searcStr of searchString) {
				if (!UtilsContext.startsWith(target, searcStr, position)) {
					flag = true;
					break;
				}
			}
			return flag;
		}
		return Boolean(target.match(searchStringRegexp as RegExp));
	}
	/**
	 * 字符串首字母转小写
	 * @param targetString 目标字符串
	 * @param otherStrToLowerCase （可选）剩余部分字符串转大写，默认false
	 */
	stringTitleToLowerCase(
		targetString: string,
		otherStrToUpperCase?: boolean
	): string;
	stringTitleToLowerCase(
		targetString: string,
		otherStrToUpperCase: boolean = false
	): string {
		let newTargetString = targetString.slice(0, 1).toLowerCase();
		if (otherStrToUpperCase) {
			newTargetString = newTargetString + targetString.slice(1).toUpperCase();
		} else {
			newTargetString = newTargetString + targetString.slice(1);
		}
		return newTargetString;
	}
	/**
	 * 字符串转Object对象，类似'{"test":""}' => {"test":""}
	 * @param data
	 * @param errorCallBack （可选）错误回调
	 * @example
	 * Utils.toJSON("{123:123}")
	 * > {123:123}
	 */
	toJSON = CommonUtil.toJSON.bind(CommonUtil);
	/**
	 * 对象转为UrlSearchParams格式的字符串
	 * @param obj 目标对象，可以是对象组成的数组
	 * @param addPrefix 是否添加前缀?
	 * @example
	 * Utils.toSearchParamsStr({
	 *   "test": 1,
	 *   "test2": 2
	 * })
	 * > test=1&test2=2
	 * @example
	 * Utils.toSearchParamsStr([{
	 *   "test": 1,
	 *   "test2": 2
	 * },
	 * {
	 *   "test3": 3
	 * }
	 * ])
	 * > test=1&test2=2&test3=3
	 */
	toSearchParamsStr(obj: object | object[], addPrefix?: boolean): string;
	toSearchParamsStr(obj: object | object[], addPrefix?: boolean): string {
		let UtilsContext = this;
		let searhParamsStr = "";
		if (Array.isArray(obj)) {
			obj.forEach((item) => {
				if (searhParamsStr === "") {
					searhParamsStr += UtilsContext.toSearchParamsStr(item);
				} else {
					searhParamsStr += "&" + UtilsContext.toSearchParamsStr(item);
				}
			});
		} else {
			searhParamsStr = new URLSearchParams(Object.entries(obj)).toString();
		}
		if (addPrefix && !searhParamsStr.startsWith("?")) {
			searhParamsStr = "?" + searhParamsStr;
		}
		return searhParamsStr;
	}
	/**
	 * 将UrlSearchParams格式的字符串转为对象
	 */
	searchParamStrToObj<T extends any>(
		searhParamsStr?: string | null | undefined
	): T {
		if (typeof searhParamsStr !== "string") {
			return {} as any as T;
		}
		return Object.fromEntries(
			new URLSearchParams(searhParamsStr) as any
		) as any;
	}
	/**
	 * 提供一个封装了 try-catch 的函数，可以执行传入的函数并捕获其可能抛出的错误，并通过传入的错误处理函数进行处理。
	 * @example
	 * Utils.tryCatch().error().run(()=>{console.log(1)});
	 * > 1
	 * @example
	 * Utils.tryCatch().config({log:true}).error((error)=>{console.log(error)}).run(()=>{throw new Error('测试错误')});
	 * > ()=>{throw new Error('测试错误')}出现错误
	 */
	tryCatch = TryCatch;
	/**
	 * 数组去重，去除重复的值
	 * @param uniqueArrayData 需要去重的数组
	 * @param compareArrayData 用来比较的数组
	 * @param compareFun 数组比较方法，如果值相同，去除该数据
	 * @returns 返回去重完毕的数组
	 * @example
	 * Utils.uniqueArray([1,2,3],[1,2],(item,item2)=>{return item===item2 ? true:false});
	 * > [3]
	 *
	 * @example
	 * Utils.uniqueArray([1,2,3],[1,2]);
	 * > [3]
	 *
	 * @example
	 * Utils.uniqueArray([{"key":1,"value":2},{"key":2}],[{"key":1}],(item,item2)=>{return item["key"] === item2["key"] ? true:false});
	 * > [{"key": 2}]
	 **/
	uniqueArray<T extends any, TT extends any>(
		uniqueArrayData?: T[],
		compareArrayData?: TT[],
		compareFun?: (item1: T, item2: TT) => boolean
	): any[];
	/**
	 * 数组去重，去除不需要的值
	 * @param uniqueArrayData 需要过滤的数组
	 * @param getIdentfierValue 获取用于确定唯一性的值
	 * @example
	 * Utils.uniqueArray([{name:"1",host:"baidu.com"},{name:"2",host:"baidu.com"},{name:"3",host:"baidu.com"}]);
	 * > [{name:"1",host:"baidu.com"}]
	 */
	uniqueArray<T>(
		uniqueArrayData: T[],
		getIdentfierValue: (itemValue: T) => any
	): T[];
	uniqueArray<T, T2>(
		uniqueArrayData: T[] = [],
		compareArrayData: any,
		compareFun: any = (item: any, item2: any) => {
			return item === item2;
		}
	): any[] {
		if (typeof compareArrayData === "function") {
			const compareFn = compareArrayData;
			const seen = new Set();

			const result: T[] = [];
			for (const item of uniqueArrayData) {
				// 使用compareFn函数来获取当前对象的唯一标识
				const identfier = compareFn(item);
				// 如果Set中还没有这个标识，则添加到结果数组中，并将其标识存入Set
				if (!seen.has(identfier)) {
					seen.add(identfier);
					result.push(item);
				}
			}
			return result;
		} else {
			return Array.from(uniqueArrayData).filter(
				(item) =>
					!Array.from(compareArrayData).some(function (item2) {
						return compareFun(item, item2);
					})
			);
		}
	}
	/**
	 * 等待函数数组全部执行完毕，注意，每个函数的顺序不是同步
	 * @param data 需要遍历的数组
	 * @param handleFunc 对该数组进行操作的函数，该函数的参数为数组格式的参数,[数组下标，数组项]
	 * @example
	 * await Utils.waitArrayLoopToEnd([callback,callback,callback],xxxcallback);
	 **/
	waitArrayLoopToEnd(
		data: any[] | HTMLElement[],
		handleFunc: Function
	): Promise<void[]>;
	waitArrayLoopToEnd(
		data: any[] | HTMLElement[],
		handleFunc: Function
	): Promise<void[]> {
		let UtilsContext = this;
		if (typeof handleFunc !== "function" && typeof handleFunc !== "string") {
			throw new Error(
				"Utils.waitArrayLoopToEnd 参数 handleDataFunction 必须为 function|string 类型"
			);
		}
		return Promise.all(
			Array.from(data).map(async (item, index) => {
				await UtilsContext.tryCatch(index, item).run(handleFunc);
			})
		);
	}
	/**
	 * 等待任意事件成立
	 *
	 * 运行方式为根据页面元素的改变而触发回调
	 * @param checkFn 检测的函数
	 * @param timeout 超时时间，默认0
	 * @param parent （可选）父元素，默认document
	 * @example
	 * Utils.wait(()=> {
	 *   let $test = document.querySelector("#test");
	 *   return {
	 *     success: $test !== null,
	 *     data:  $test
	 *   }
	 * })
	 */
	wait<T extends any>(
		checkFn: (...args: any[]) => {
			/**
			 * 是否检测成功
			 */
			success: boolean;
			/**
			 * 返回的值
			 */
			data: T;
		},
		timeout?: null | undefined,
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	wait<T extends any>(
		checkFn: (...args: any[]) => {
			/**
			 * 是否检测成功
			 */
			success: boolean;
			/**
			 * 返回的值
			 */
			data: T;
		},
		timeout?: number,
		parent?: Node | Element | Document | HTMLElement
	): Promise<T | null>;
	wait<T extends any>(
		checkFn: (...args: any[]) => {
			/**
			 * 是否检测成功
			 */
			success: boolean;
			/**
			 * 返回的值
			 */
			data: T;
		},
		timeout?: number | null | undefined,
		parent?: Node | Element | Document | HTMLElement
	): Promise<T | null> {
		const UtilsContext = this;
		let __timeout__ = typeof timeout === "number" ? timeout : 0;
		return new Promise((resolve) => {
			let observer = UtilsContext.mutationObserver(
				parent || UtilsContext.windowApi.document,
				{
					config: {
						subtree: true,
						childList: true,
						attributes: true,
					},
					immediate: true,
					callback(mutations, __observer__) {
						let result = checkFn();
						if (result.success) {
							// 取消观察器
							if (typeof __observer__?.disconnect === "function") {
								__observer__.disconnect();
							}
							resolve(result.data);
						}
					},
				}
			);
			if (__timeout__ > 0) {
				UtilsContext.workerSetTimeout(() => {
					// 取消观察器
					if (typeof observer?.disconnect === "function") {
						observer.disconnect();
					}
					resolve(null as T);
				}, __timeout__);
			}
		});
	}
	/**
	 * 等待元素出现
	 * @param selectorFn 获取元素的函数
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNode(()=>document.querySelector("div"), 1000).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement | null
	 * })
	 */
	waitNode<K extends any>(selectorFn: () => K | null | undefined): Promise<K>;
	waitNode<K extends any>(
		selectorFn: () => K | null | undefined,
		timeout: number
	): Promise<K | null | undefined>;
	/**
	 * 等待元素出现
	 * @param selector CSS选择器
	 * @param parent （可选）父元素，默认document
	 * @example
	 * Utils.waitNode("div").then( $div =>{
	 *  console.log($div); // div => HTMLDivELement
	 * })
	 * Utils.waitNode("div", document).then( $div =>{
	 *  console.log($div); // div => HTMLDivELement
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selector: K,
		parent?: Node | Element | Document | HTMLElement
	): Promise<HTMLElementTagNameMap[K]>;
	waitNode<T extends Element>(
		selector: string,
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	/**
	 * 等待元素出现
	 * @param selectorList CSS选择器数组
	 * @param parent （可选）父元素，默认document
	 * @example
	 * Utils.waitNode(["div"]).then( ([$div]) =>{
	 *  console.log($div); // div => HTMLDivELement[]
	 * })
	 * Utils.waitNode(["div"], document).then( ([$div]) =>{
	 *  console.log($div); // div => HTMLDivELement[]
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<HTMLElementTagNameMap[K][]>;
	waitNode<T extends Element[]>(
		selectorList: string[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	/**
	 * 等待元素出现
	 * @param selector CSS选择器
	 * @param parent 父元素，默认document
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNode("div", document, 1000).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement | null
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selector: K,
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitNode<T extends Element>(
		selector: string,
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待元素出现
	 * @param selectorList CSS选择器数组
	 * @param parent 父元素，默认document
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNode(["div"], document, 1000).then( ([$div]) =>{
	 *  console.log($div); // $div => HTMLDivELement[] | null
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitNode<T extends Element[]>(
		selectorList: string[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待元素出现
	 * @param selector CSS选择器
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNode("div", 1000).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement | null
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selector: K,
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitNode<T extends Element>(
		selector: string,
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待元素出现
	 * @param selectorList CSS选择器数组
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNode(["div"], 1000).then( [$div] =>{
	 *  console.log($div); // $div => HTMLDivELement[] | null
	 * })
	 */
	waitNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitNode<T extends Element[]>(
		selectorList: string[],
		timeout: number
	): Promise<T | null>;
	waitNode<T extends Element | Element[]>(...args: any[]): Promise<T | null> {
		// 过滤掉undefined
		args = args.filter((arg) => arg !== void 0);
		let UtilsContext = this;
		// 选择器
		let selector = args[0] as unknown as string | string[] | Function;
		// 父元素（监听的元素）
		let parent: Element = UtilsContext.windowApi.document as any as Element;
		// 超时时间
		let timeout = 0;
		if (
			typeof args[0] !== "string" &&
			!Array.isArray(args[0]) &&
			typeof args[0] !== "function"
		) {
			throw new TypeError(
				"Utils.waitNode 第一个参数必须是string|string[]|Function"
			);
		}
		if (args.length === 1) {
			// 上面已做处理
		} else if (args.length === 2) {
			let secondParam = args[1];
			if (typeof secondParam === "number") {
				// "div",10000
				timeout = secondParam;
			} else if (
				typeof secondParam === "object" &&
				secondParam instanceof Node
			) {
				// "div",document
				parent = secondParam as any as Element;
			} else {
				throw new TypeError("Utils.waitNode 第二个参数必须是number|Node");
			}
		} else if (args.length === 3) {
			// "div",document,10000
			// 第二个参数，parent
			let secondParam = args[1];
			// 第三个参数，timeout
			let thirdParam = args[2];
			if (typeof secondParam === "object" && secondParam instanceof Node) {
				parent = secondParam as any as Element;
				if (typeof thirdParam === "number") {
					timeout = thirdParam;
				} else {
					throw new TypeError("Utils.waitNode 第三个参数必须是number");
				}
			} else {
				throw new TypeError("Utils.waitNode 第二个参数必须是Node");
			}
		} else {
			throw new TypeError("Utils.waitNode 参数个数错误");
		}
		function getNode() {
			if (Array.isArray(selector)) {
				let result: T[] = [];
				for (let index = 0; index < selector.length; index++) {
					let node = domUtils.selector(selector[index]);
					if (node) {
						result.push(node as any);
					}
				}
				if (result.length === selector.length) {
					return result;
				}
			} else if (typeof selector === "function") {
				return selector();
			} else {
				return domUtils.selector(selector, parent);
			}
		}
		return UtilsContext.wait(
			() => {
				let node = getNode();
				if (node) {
					return {
						success: true,
						data: node,
					};
				} else {
					return {
						success: false,
						data: node,
					};
				}
			},
			timeout,
			parent
		);
	}
	/**
	 * 等待任意元素出现
	 * @param selectorList CSS选择器数组
	 * @param parent （可选）监听的父元素
	 * @example
	 * Utils.waitAnyNode(["div","div"]).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement 这里是第一个
	 * })
	 * Utils.waitAnyNode(["a","div"], document).then( $a =>{
	 *  console.log($a); // $a => HTMLAnchorElement 这里是第一个
	 * })
	 */
	waitAnyNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<HTMLElementTagNameMap[K]>;
	waitAnyNode<T extends Element>(
		selectorList: string[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	/**
	 * 等待任意元素出现
	 * @param selectorList CSS选择器数组
	 * @param parent 父元素，默认document
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitAnyNode(["div","div"], document, 10000).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement | null
	 * })
	 */
	waitAnyNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitAnyNode<T extends Element>(
		selectorList: string[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待任意元素出现
	 * @param selectorList CSS选择器数组
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitAnyNode(["div","div"], 10000).then( $div =>{
	 *  console.log($div); // $div => HTMLDivELement | null
	 * })
	 */
	waitAnyNode<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		timeout: number
	): Promise<HTMLElementTagNameMap[K] | null>;
	waitAnyNode<T extends Element>(
		selectorList: string[],
		timeout: number
	): Promise<T | null>;
	waitAnyNode<T extends Element>(...args: any[]): Promise<T | null> {
		// 过滤掉undefined
		args = args.filter((arg) => arg !== void 0);
		let UtilsContext = this;
		// 选择器
		let selectorList = args[0] as unknown as string[];
		// 父元素（监听的元素）
		let parent: Element = UtilsContext.windowApi.document as any as Element;
		// 超时时间
		let timeout = 0;
		if (typeof args[0] !== "object" && !Array.isArray(args[0])) {
			throw new TypeError("Utils.waitAnyNode 第一个参数必须是string[]");
		}
		if (args.length === 1) {
			// 上面已做处理
		} else if (args.length === 2) {
			let secondParam = args[1];
			if (typeof secondParam === "number") {
				// "div",10000
				timeout = secondParam;
			} else if (
				typeof secondParam === "object" &&
				secondParam instanceof Node
			) {
				// "div",document
				parent = secondParam as any as Element;
			} else {
				throw new TypeError("Utils.waitAnyNode 第二个参数必须是number|Node");
			}
		} else if (args.length === 3) {
			// "div",document,10000
			// 第二个参数，parent
			let secondParam = args[1];
			// 第三个参数，timeout
			let thirdParam = args[2];
			if (typeof secondParam === "object" && secondParam instanceof Node) {
				parent = secondParam as any as Element;
				if (typeof thirdParam === "number") {
					timeout = thirdParam;
				} else {
					throw new TypeError("Utils.waitAnyNode 第三个参数必须是number");
				}
			} else {
				throw new TypeError("Utils.waitAnyNode 第二个参数必须是Node");
			}
		} else {
			throw new TypeError("Utils.waitAnyNode 参数个数错误");
		}
		let promiseList = selectorList.map((selector) => {
			return UtilsContext.waitNode<T>(selector, parent, timeout);
		});
		return Promise.any(promiseList);
	}
	/**
	 * 等待元素数组出现
	 * @param selector CSS选择器
	 * @param parent （可选）监听的父元素
	 * @example
	 * Utils.waitNodeList("div").then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>
	 * })
	 * Utils.waitNodeList("div", document).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>
	 * })
	 */
	waitNodeList<T extends keyof HTMLElementTagNameMap>(
		selector: T,
		parent?: Node | Element | Document | HTMLElement
	): Promise<NodeListOf<HTMLElementTagNameMap[T]>>;
	waitNodeList<T extends NodeListOf<Element>>(
		selector: string,
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	/**
	 * 等待元素数组出现
	 * @param selectorList CSS选择器数组
	 * @param parent （可选）监听的父元素
	 * @example
	 * Utils.waitNodeList(["div"]).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>[]
	 * })
	 * Utils.waitNodeList(["div"], document).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>[]
	 * })
	 */
	waitNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<NodeListOf<HTMLElementTagNameMap[K]>[]>;
	waitNodeList<T extends NodeListOf<Element>[]>(
		selectorList: string[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<T>;
	/**
	 * 等待元素数组出现
	 * @param selector CSS选择器
	 * @param parent 监听的父元素
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNodeList("div", document, 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
	 * })
	 */
	waitNodeList<T extends NodeListOf<Element>>(
		selector: string,
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<T | null>;
	waitNodeList<K extends keyof HTMLElementTagNameMap>(
		selector: K,
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
	/**
	 * 等待元素数组出现
	 * @param selectorList CSS选择器数组
	 * @param parent 监听的父元素
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNodeList(["div"], document, 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>[] | null
	 * })
	 */
	waitNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]>[] | null>;
	waitNodeList<T extends NodeListOf<Element>[]>(
		selectorList: string[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待元素数组出现
	 * @param selector CSS选择器数组
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNodeList("div", 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
	 * })
	 */
	waitNodeList<K extends keyof HTMLElementTagNameMap>(
		selector: K[],
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
	waitNodeList<T extends NodeListOf<Element>>(
		selector: string[],
		timeout: number
	): Promise<T | null>;
	/**
	 * 等待元素数组出现
	 * @param selectorList CSS选择器数组
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitNodeList(["div"], 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>[] | null
	 * })
	 */
	waitNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]>[] | null>;
	waitNodeList<T extends NodeListOf<Element>>(
		selectorList: string[],
		timeout: number
	): Promise<T[] | null>;
	waitNodeList<T extends NodeListOf<Element> | NodeListOf<Element>[]>(
		...args: any[]
	): Promise<T | null> {
		// 过滤掉undefined
		args = args.filter((arg) => arg !== void 0);
		let UtilsContext = this;
		// 选择器数组
		let selector = args[0] as unknown as string | string[];
		// 父元素（监听的元素）
		let parent: Element = UtilsContext.windowApi.document as any as Element;
		// 超时时间
		let timeout = 0;
		if (typeof args[0] !== "string" && !Array.isArray(args[0])) {
			throw new TypeError("Utils.waitNodeList 第一个参数必须是string|string[]");
		}
		if (args.length === 1) {
			// 上面已做处理
		} else if (args.length === 2) {
			let secondParam = args[1];
			if (typeof secondParam === "number") {
				// "div",10000
				timeout = secondParam;
			} else if (
				typeof secondParam === "object" &&
				secondParam instanceof Node
			) {
				// "div",document
				parent = secondParam as any as Element;
			} else {
				throw new TypeError("Utils.waitNodeList 第二个参数必须是number|Node");
			}
		} else if (args.length === 3) {
			// "div",document,10000
			// 第二个参数，parent
			let secondParam = args[1];
			// 第三个参数，timeout
			let thirdParam = args[2];
			if (typeof secondParam === "object" && secondParam instanceof Node) {
				parent = secondParam as any as Element;
				if (typeof thirdParam === "number") {
					timeout = thirdParam;
				} else {
					throw new TypeError("Utils.waitNodeList 第三个参数必须是number");
				}
			} else {
				throw new TypeError("Utils.waitNodeList 第二个参数必须是Node");
			}
		} else {
			throw new TypeError("Utils.waitNodeList 参数个数错误");
		}
		function getNodeList() {
			if (Array.isArray(selector)) {
				let result: T[] = [];
				for (let index = 0; index < selector.length; index++) {
					let nodeList = domUtils.selectorAll(selector[index], parent);
					if (nodeList.length) {
						result.push(nodeList as any as T);
					}
				}
				if (result.length === selector.length) {
					return result;
				}
			} else {
				let nodeList = domUtils.selectorAll(selector, parent);
				if (nodeList.length) {
					return nodeList;
				}
			}
		}
		return UtilsContext.wait<any>(
			() => {
				let node = getNodeList();
				if (node) {
					return {
						success: true,
						data: node,
					};
				} else {
					return {
						success: false,
						data: node,
					};
				}
			},
			timeout,
			parent
		);
	}
	/**
	 * 等待任意元素数组出现
	 * @param selectorList CSS选择器数组
	 * @param parent （可选）监听的父元素
	 * @example
	 * Utils.waitAnyNodeList(["div","a"]).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>
	 * })
	 * Utils.waitAnyNodeList(["div","a"], document).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement>
	 * })
	 */
	waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<NodeListOf<HTMLElementTagNameMap[K]>>;
	waitAnyNodeList<T extends Element>(
		selectorList: string[],
		parent?: Node | Element | Document | HTMLElement
	): Promise<NodeListOf<T>>;
	/**
	 * 等待任意元素数组出现
	 * @param selectorList CSS选择器数组
	 * @param parent 父元素，默认document
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitAnyNodeList(["div","a"], document, 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
	 * })
	 */
	waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
	waitAnyNodeList<T extends Element>(
		selectorList: string[],
		parent: Node | Element | Document | HTMLElement,
		timeout: number
	): Promise<NodeListOf<T> | null>;
	/**
	 * 等待任意元素出现
	 * @param selectorList CSS选择器数组
	 * @param timeout 超时时间，默认0
	 * @example
	 * Utils.waitAnyNodeList(["div","div"], 10000).then( $result =>{
	 *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
	 * })
	 */
	waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(
		selectorList: K[],
		timeout: number
	): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
	waitAnyNodeList<T extends Element>(
		selectorList: string[],
		timeout: number
	): Promise<NodeListOf<T> | null>;
	waitAnyNodeList<T extends Element>(
		...args: any[]
	): Promise<NodeListOf<T> | null> {
		// 过滤掉undefined
		args = args.filter((arg) => arg !== void 0);
		let UtilsContext = this;
		// 选择器数组
		let selectorList = args[0] as unknown as string[];
		// 父元素（监听的元素）
		let parent: Element = UtilsContext.windowApi.document as any as Element;
		// 超时时间
		let timeout = 0;
		if (!Array.isArray(args[0])) {
			throw new TypeError("Utils.waitAnyNodeList 第一个参数必须是string[]");
		}
		if (args.length === 1) {
			// 上面已做处理
		} else if (args.length === 2) {
			let secondParam = args[1];
			if (typeof secondParam === "number") {
				// "div",10000
				timeout = secondParam;
			} else if (
				typeof secondParam === "object" &&
				secondParam instanceof Node
			) {
				// "div",document
				parent = secondParam as any as Element;
			} else {
				throw new TypeError(
					"Utils.waitAnyNodeList 第二个参数必须是number|Node"
				);
			}
		} else if (args.length === 3) {
			// "div",document,10000
			// 第二个参数，parent
			let secondParam = args[1];
			// 第三个参数，timeout
			let thirdParam = args[2];
			if (typeof secondParam === "object" && secondParam instanceof Node) {
				parent = secondParam as any as Element;
				if (typeof thirdParam === "number") {
					timeout = thirdParam;
				} else {
					throw new TypeError("Utils.waitAnyNodeList 第三个参数必须是number");
				}
			} else {
				throw new TypeError("Utils.waitAnyNodeList 第二个参数必须是Node");
			}
		} else {
			throw new TypeError("Utils.waitAnyNodeList 参数个数错误");
		}

		let promiseList = selectorList.map((selector) => {
			return UtilsContext.waitNodeList<NodeListOf<T>>(
				selector,
				parent,
				timeout
			);
		});
		return Promise.any(promiseList);
	}

	/**
	 * 等待对象上的属性出现
	 * @param checkObj 检查的对象
	 * @param checkPropertyName 检查的对象的属性名
	 * @example
	 * await Utils.waitProperty(window,"test");
	 * console.log("test success set");
	 *
	 * window.test = 1;
	 * > "test success set"
	 *
	 */
	waitProperty<T extends any>(
		checkObj: any | (() => any),
		checkPropertyName: string
	): Promise<T>;
	waitProperty<T extends any>(
		checkObj: any | (() => any),
		checkPropertyName: string
	): Promise<T> {
		return new Promise((resolve) => {
			let obj = checkObj;
			if (typeof checkObj === "function") {
				obj = checkObj();
			}
			if (Reflect.has(obj, checkPropertyName)) {
				resolve((obj as any)[checkPropertyName]);
			} else {
				Object.defineProperty(obj, checkPropertyName, {
					set: function (value) {
						try {
							resolve(value);
						} catch (error) {
							console.error("Error setting property:", error);
						}
					},
				});
			}
		});
	}
	/**
	 * 在规定时间内等待对象上的属性出现
	 * @param checkObj 检查的对象
	 * @param checkPropertyName 检查的对象的属性名
	 * @param intervalTimer （可选）检查间隔时间（ms），默认250ms
	 * @param maxTime （可选）限制在多长时间内，默认-1(不限制时间)
	 * @example
	 * await Utils.waitPropertyByInterval(window,"test");
	 * console.log("test success set");
	 */
	waitPropertyByInterval<T extends any>(
		checkObj: any | (() => any),
		checkPropertyName: string | ((obj: any) => boolean),
		intervalTimer?: number,
		maxTime?: number
	): Promise<T>;
	waitPropertyByInterval<T extends any>(
		checkObj: any | (() => any),
		checkPropertyName: string | ((obj: any) => boolean),
		intervalTimer: number = 250,
		maxTime: number = -1
	): Promise<T> {
		let UtilsContext = this;
		if (checkObj == null) {
			throw new TypeError("checkObj 不能为空对象 ");
		}
		let isResolve = false;
		return new Promise((resolve, reject) => {
			let interval = UtilsContext.workerSetInterval(() => {
				let obj = checkObj;
				if (typeof checkObj === "function") {
					obj = checkObj();
				}
				if (typeof obj !== "object") {
					return;
				}
				if (obj == null) {
					return;
				}
				if (
					(typeof checkPropertyName === "function" && checkPropertyName(obj)) ||
					Reflect.has(obj, checkPropertyName as string)
				) {
					isResolve = true;
					UtilsContext.workerClearInterval(interval);
					resolve((obj as any)[checkPropertyName as string]);
				}
			}, intervalTimer);
			if (maxTime !== -1) {
				UtilsContext.workerSetTimeout(() => {
					if (!isResolve) {
						UtilsContext.workerClearInterval(interval);
						reject();
					}
				}, maxTime);
			}
		});
	}
	/**
	 * 在规定时间内等待元素上的__vue__属性或者__vue__属性上的某个值出现出现
	 * @param element 目标元素
	 * @param propertyName （可选）vue上的属性名或者传递一个获取属性的方法返回boolean
	 * @param timer （可选）间隔时间（ms），默认：250(ms)
	 * @param maxTime（可选） 限制在多长时间内，默认：-1(不限制时间)
	 * @param vueName （可选）vue挂载的属性名，默认：__vue__
	 * @example
	 * await Utils.waitVueByInterval(
	 * function(){
	 *    return document.querySelector("a.xx")
	 * },
	 * function(__vue__){
	 *    return Boolean(__vue__.xxx == null);
	 * },
	 * 250,
	 * 10000,
	 * "__vue__"
	 * )
	 */
	waitVueByInterval(
		element: HTMLElement | (() => any),
		propertyName: string | ((__vue__: any) => boolean),
		timer?: number,
		maxTime?: number,
		vueName?: "__vue__" | string
	): Promise<boolean>;
	async waitVueByInterval(
		element: HTMLElement | (() => any),
		propertyName: string | ((__vue__: any) => boolean),
		timer = 250,
		maxTime = -1,
		vueName = "__vue__"
	) {
		if (element == null) {
			throw new Error("Utils.waitVueByInterval 参数element 不能为空");
		}
		let flag = false;
		let UtilsContext = this;
		try {
			await UtilsContext.waitPropertyByInterval(
				element,
				function (targetElement) {
					if (targetElement == null) {
						return false;
					}
					if (!(vueName in targetElement)) {
						return false;
					}
					if (propertyName == null) {
						return true;
					}
					let vueObject = targetElement[vueName];
					if (typeof propertyName === "string") {
						if (propertyName in vueObject) {
							flag = true;
							return true;
						}
					} else {
						/* Function */
						if (propertyName(vueObject)) {
							flag = true;
							return true;
						}
					}
					return false;
				},
				timer,
				maxTime
			);
		} catch (error) {
			return flag;
		}
		return flag;
	}
	/**
	 * 观察对象的set、get
	 * @param target 观察的对象
	 * @param propertyName 观察的对象的属性名
	 * @param getCallBack （可选）触发get的回调，可以自定义返回特定值
	 * @param setCallBack （可选）触发set的回调，参数为将要设置的value
	 * @example
	 * Utils.watchObject(window,"test",()=>{return 111;},(value)=>{console.log("test出现，值是",value)});
	 *
	 * window.test = 1;
	 * > test出现，值是 1
	 * console.log(window.test);
	 * > 111;
	 */
	watchObject(
		target: any,
		propertyName: string,
		getCallBack: (value: any) => void,
		setCallBack: (value: any) => void
	): void;
	watchObject(
		target: any,
		propertyName: string,
		getCallBack: (value: any) => void,
		setCallBack: (value: any) => void
	): void {
		if (
			typeof getCallBack !== "function" &&
			typeof setCallBack !== "function"
		) {
			return;
		}

		if (typeof getCallBack === "function") {
			Object.defineProperty(target, propertyName, {
				get() {
					if (typeof getCallBack === "function") {
						return getCallBack(target[propertyName]);
					} else {
						return target[propertyName];
					}
				},
			});
		} else if (typeof setCallBack === "function") {
			Object.defineProperty(target, propertyName, {
				set(value) {
					if (typeof setCallBack === "function") {
						setCallBack(value);
					}
				},
			});
		} else {
			Object.defineProperty(target, propertyName, {
				get() {
					if (typeof getCallBack === "function") {
						return (getCallBack as any)(target[propertyName]);
					} else {
						return target[propertyName];
					}
				},
				set(value) {
					if (typeof setCallBack === "function") {
						(setCallBack as any)(value);
					}
				},
			});
		}
	}

	/**
	 * 深度获取对象属性
	 * @param target 待获取的对象
	 * @param handler 获取属性的回调
	 */
	queryProperty(
		target: any,
		handler: (target: any) => {
			/**
			 * 是否是需要的属性
			 * + true 将目标值赋值给data
			 * + false 不是需要的，data为下一个处理的对象
			 */
			isFind: boolean;
			/**
			 * 对象/目标值
			 */
			data: any;
		}
	): any {
		if (target == null) {
			return;
		}
		let handleResult = handler(target);
		if (
			handleResult &&
			typeof handleResult.isFind === "boolean" &&
			handleResult.isFind
		) {
			return handleResult.data;
		}
		return this.queryProperty(handleResult.data, handler);
	}

	/**
	 * 创建一个新的Utils实例
	 * @param option
	 * @returns
	 */
	createUtils(option?: WindowApiOption) {
		return new Utils(option);
	}

	/**
	 * 将对象转换为FormData
	 * @param data 待转换的对象
	 * @param isEncode 是否对值为string进行编码转换(encodeURIComponent)，默认false
	 * @param valueAutoParseToStr 是否对值强制使用JSON.stringify()转换，默认false
	 * @example
	 * Utils.toFormData({
	 * 	test: "1",
	 *  666: 666,
	 * })
	 */
	toFormData(
		data: { [key: string]: string | Blob | File | number },
		isEncode: boolean = false,
		valueAutoParseToStr: boolean = false
	) {
		const formData = new FormData();
		Object.keys(data).forEach((key) => {
			let value = data[key];
			if (valueAutoParseToStr) {
				value = JSON.stringify(value);
			}
			if (typeof value === "number") {
				value = value.toString();
			}
			if (isEncode && typeof value === "string") {
				value = encodeURIComponent(value);
			}
			if (value instanceof File) {
				formData.append(key, value, value.name);
			} else {
				formData.append(key, value);
			}
		});
		return formData;
	}
	/**
	 * 将链接转为URL对象，自动补充URL的protocol或者origin
	 * @param text 需要转换的链接字符串
	 * @example
	 * Utils.toUrl("//www.baidu.com/s?word=666");
	 * Utils.toUrl("/s?word=666");
	 */
	toUrl(text: string) {
		if (typeof text !== "string") {
			throw new TypeError("toUrl: text must be string");
		}
		text = text.trim();
		if (text === "") {
			throw new TypeError("toUrl: text must not be empty");
		}
		if (text.startsWith("//")) {
			/* //www.baidu.com/xxxxxxx */
			/* 没有protocol，加上 */
			text = this.windowApi.globalThis.location.protocol + text;
		} else if (text.startsWith("/")) {
			/* /xxx/info?xxx=xxx */
			/* 没有Origin，加上 */
			text = this.windowApi.globalThis.location.origin + text;
		}
		return new URL(text);
	}
	/**
	 * 覆盖对象中的函数this指向
	 * @param target 需要覆盖的对象
	 * @param [objectThis] 覆盖的this指向，如果为传入，则默认为对象本身
	 */
	coverObjectFunctionThis = CommonUtil.coverObjectFunctionThis.bind(CommonUtil);
	/**
	 * 生成uuid
	 * @example
	 * Utils.generateUUID()
	 */
	generateUUID = GenerateUUID;
	/**
	 * 自定义的动态响应对象
	 * @example
	 * let vue = new Utils.Vue();
	 * let reactive = new vue.reactive({});
	 * vue.watch(()=>reactive["name"], (newValue, oldValue)=>{
	 *     console.log("newValue ==> " + newValue);
	 *     console.log("oldValue ==> " + oldValue);
	 * })
	 * vue["name"] = "测试";
	 * > "测试"
	 */
	Vue = Vue;
	ModuleRaid = ModuleRaid;
	/**
	 * 自动使用 Worker 执行 setTimeout
	 * @param callback 回调函数
	 * @param [timeout=0] 延迟时间，默认为0
	 */
	workerSetTimeout(callback: Function, timeout: number = 0) {
		try {
			return WorkerSetTimeout(callback, timeout);
		} catch (error) {
			return globalThis.setTimeout(callback, timeout);
		}
	}
	/**
	 * 配合 .setTimeout 使用
	 * @param timeId setTimeout 返回的`id`
	 */
	workerClearTimeout(timeId: number | undefined) {
		try {
			if (timeId != null) {
				WorkerClearTimeout(timeId);
			}
		} catch (error) {
		} finally {
			globalThis.clearTimeout(timeId);
		}
	}
	/**
	 * 自动使用 Worker 执行 setInterval
	 * @param callback 回调函数
	 * @param timeout 间隔时间，默认为0
	 */
	workerSetInterval(callback: Function, timeout: number = 0) {
		try {
			return WorkerSetInterval(callback, timeout);
		} catch (error) {
			return globalThis.setInterval(callback, timeout);
		}
	}
	/**
	 * 配合 .setInterval 使用
	 * @param timeId setInterval 返回的`id`
	 */
	workerClearInterval(timeId: number | undefined) {
		try {
			if (timeId != null) {
				WorkerClearInterval(timeId);
			}
		} catch (error) {
		} finally {
			globalThis.clearInterval(timeId);
		}
	}
	/**
	 * 获取剪贴板信息
	 */
	async getClipboardInfo() {
		return new Promise<{
			/**
			 * 错误信息，如果为null，则表示读取成功
			 */
			error: Error | null;
			/**
			 * 剪贴板内容
			 */
			content: string;
		}>((resolve) => {
			/** 读取剪贴板 */
			function readClipboardText() {
				navigator.clipboard
					.readText()
					.then((clipboardText) => {
						resolve({
							error: null,
							content: clipboardText,
						});
					})
					.catch((error: TypeError) => {
						resolve({
							error: error,
							content: "",
						});
					});
			}
			/** 申请读取剪贴板的权限 */
			function requestPermissionsWithClipboard() {
				navigator.permissions
					.query({
						name: "clipboard-read" as any as PermissionName,
					})
					.then((permissionStatus) => {
						readClipboardText();
					})
					.catch((error: TypeError) => {
						/* 该权限申请Api可能在该环境下不生效，尝试直接读取剪贴板 */
						readClipboardText();
					});
			}
			/**
			 * 检查当前环境是否支持读取剪贴板Api
			 */
			function checkClipboardApi() {
				if (typeof navigator?.clipboard?.readText !== "function") {
					return false;
				}
				if (typeof navigator?.permissions?.query !== "function") {
					return false;
				}
				return true;
			}
			if (!checkClipboardApi()) {
				resolve({
					error: new Error("当前环境不支持读取剪贴板Api"),
					content: "",
				});
				return;
			}
			if (document.hasFocus()) {
				requestPermissionsWithClipboard();
			} else {
				window.addEventListener(
					"focus",
					() => {
						requestPermissionsWithClipboard();
					},
					{
						once: true,
					}
				);
			}
		});
	}
}

let utils = new Utils();

export { utils as Utils };

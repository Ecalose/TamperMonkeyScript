import { isNodeList } from "./DOMUtils";
import { DOMUtilsCommonUtils } from "./DOMUtilsCommonUtils";
import { DOMUtilsData } from "./DOMUtilsData";
import { OriginPrototype } from "./DOMUtilsOriginPrototype";
import type { DOMUtilsTargetElementType } from "./types/global";
import { UtilsWindowApiOption, WindowApi } from "./WindowApi";

export type DOMUtilsEventObject<T extends Node> = Event & {
	target: T;
};

export declare type DOMUtilsCreateElementAttributesMap = {
	style?: string;
	id?: string;
	class?: string;
	"data-"?: string;
	type?: string;
	[key: string]: any;
};
/**
 * 鼠标事件
 * + https://blog.csdn.net/weixin_68658847/article/details/126939879
 */

export interface DOMUtils_MouseEvent {
	click: MouseEvent | PointerEvent;
	contextmenu: MouseEvent | PointerEvent;
	dblclick: MouseEvent | PointerEvent;
	mousedown: MouseEvent | PointerEvent;
	mouseenter: MouseEvent | PointerEvent;
	mouseleave: MouseEvent | PointerEvent;
	mousemove: MouseEvent | PointerEvent;
	mouseover: MouseEvent | PointerEvent;
	mouseout: MouseEvent | PointerEvent;
	mouseup: MouseEvent | PointerEvent;
	hover: MouseEvent;
}
export type DOMUtils_MouseEventType = keyof DOMUtils_MouseEvent;
/**
 * 鼠标事件
 */
export interface DOMUtils_KeyboardEvent {
	keydown: KeyboardEvent;
	keypress: KeyboardEvent;
	keyup: KeyboardEvent;
}
export type DOMUtils_KeyboardEventType = keyof DOMUtils_KeyboardEvent;
/**
 * 框架/对象事件
 */
export interface DOMUtils_Frame_Object_Event {
	abort: Event;
	beforeunload: Event;
	error: Event;
	hashchange: Event;
	load: Event;
	pageshow: Event;
	pagehide: Event;
	resize: Event;
	scroll: Event;
	unload: Event;
}
export type DOMUtils_Frame_Object_EventType = keyof DOMUtils_Frame_Object_Event;
/**
 * 表单事件
 */
export interface DOMUtils_FormEvent {
	blur: Event;
	change: Event;
	focus: Event;
	focusin: Event;
	focusout: Event;
	input: Event;
	reset: Event;
	search: Event;
}
export type DOMUtils_FormEventType = keyof DOMUtils_FormEvent;

/**
 * 剪贴板事件
 */
export interface DOMUtils_ClipboardEvent {
	copy: ClipboardEvent;
	cut: ClipboardEvent;
	paste: ClipboardEvent;
}
export type DOMUtils_ClipboardEventType = keyof DOMUtils_ClipboardEvent;

/**
 * 打印事件
 */
export interface DOMUtils_PrintEvent {
	afterprint: Event;
	beforeprint: Event;
}
export type DOMUtils_PrintEventType = keyof DOMUtils_PrintEvent;

/**
 * 拖动事件
 */
export interface DOMUtils_DragEvent {
	drag: DragEvent;
	dragend: DragEvent;
	dragenter: DragEvent;
	dragleave: DragEvent;
	dragover: DragEvent;
	dragstart: DragEvent;
	drop: DragEvent;
}
export type DOMUtils_DragEventType = keyof DOMUtils_DragEvent;

/**
 * 多媒体（Media）事件
 */
export interface DOMUtils_MediaEvent {
	abort: Event;
	canplay: Event;
	canplaythrough: Event;
	durationchange: Event;
	emptied: Event;
	ended: Event;
	error: Event;
	loadeddata: Event;
	loadedmetadata: Event;
	loadstart: Event;
	pause: Event;
	play: Event;
	playing: Event;
	progress: Event;
	ratechange: Event;
	seeked: Event;
	seeking: Event;
	stalled: Event;
	suspend: Event;
	timeupdate: Event;
	volumechange: Event;
	waiting: Event;
}
export type DOMUtils_MediaEventType = keyof DOMUtils_MediaEvent;

/**
 * 动画事件
 */
export interface DOMUtils_AnimationEvent {
	animationend: AnimationEvent;
	animationiteration: AnimationEvent;
	animationstart: AnimationEvent;
}
export type DOMUtils_AnimationEventType = keyof DOMUtils_AnimationEvent;

/**
 * 过渡事件
 */
export interface DOMUtils_TransitionEvent {
	transitionend: TransitionEvent;
}
export type DOMUtils_TransitionEventType = keyof DOMUtils_TransitionEvent;

/**
 * 触摸事件
 */
export interface DOMUtils_TouchEvent {
	touchstart: TouchEvent;
	touchmove: TouchEvent;
	touchend: TouchEvent;
	touchcancel: TouchEvent;
	touchenter: TouchEvent;
	touchleave: TouchEvent;
}
export type DOMUtils_TouchEventType = keyof DOMUtils_TouchEvent;
/**
 * 其它事件
 */
export interface DOMUtils_OtherEvent {
	message: Event;
	online: Event;
	offline: Event;
	popstate: Event;
	show: Event;
	storage: Event;
	toggle: Event;
	wheel: Event;
	propertychange: Event;
	fullscreenchange: Event;
	DOMContentLoaded: Event;
}
export type DOMUtils_OtherEventType = keyof DOMUtils_OtherEvent;

/**
 * 全部事件
 */
export declare type DOMUtils_Event = DOMUtils_MouseEvent &
	DOMUtils_KeyboardEvent &
	DOMUtils_Frame_Object_Event &
	DOMUtils_FormEvent &
	DOMUtils_ClipboardEvent &
	DOMUtils_PrintEvent &
	DOMUtils_DragEvent &
	DOMUtils_MediaEvent &
	DOMUtils_AnimationEvent &
	DOMUtils_TransitionEvent &
	DOMUtils_TouchEvent &
	DOMUtils_OtherEvent;

/**
 * 事件类型
 */
export declare type DOMUtils_EventType = keyof DOMUtils_Event;

/**
 * 元素上的events属性
 */
export declare interface DOMUtilsEventListenerOptionsAttribute {
	/**
	 * 自定义的ownCallBack
	 */
	callback: () => void;
	/**
	 * 属性配置
	 */
	option: AddEventListenerOptions;
	/**
	 * 用户添加的事件
	 */
	originCallBack: () => void;
	/**
	 * 子元素选择器
	 */
	selector?: string;
}

export declare type DOMUtilsElementEventType =
	| HTMLElement
	| string
	| NodeList
	| (HTMLElement | Window | Document | Element | typeof globalThis)[]
	| Window
	| Document
	| Element
	| null
	| typeof globalThis
	| ShadowRoot
	| EventTarget
	| ChildNode
	| Node;

export class DOMUtilsEvent {
	windowApi: UtilsWindowApiOption;
	constructor(windowApiOption?: UtilsWindowApiOption) {
		this.windowApi = new WindowApi(windowApiOption);
	}
	/**
	 * 绑定事件
	 * @param element 需要绑定的元素|元素数组|window
	 * @param eventType 需要监听的事件
	 * @param callback 绑定事件触发的回调函数
	 * @param option
	 * + capture 表示事件是否在捕获阶段触发。默认为false，即在冒泡阶段触发
	 * + once 表示事件是否只触发一次。默认为false
	 * + passive 表示事件监听器是否不会调用preventDefault()。默认为false
	 * @example
	 * // 监听元素a.xx的click事件
	 * DOMUtils.on(document.querySelector("a.xx"),"click",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * DOMUtils.on("a.xx","click",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 */
	on<T extends DOMUtils_EventType>(
		element: DOMUtilsElementEventType,
		eventType: T | T[],
		callback: (event: DOMUtils_Event[T]) => void,
		option?: boolean | AddEventListenerOptions
	): void;
	/**
	 * 绑定事件
	 * @param element 需要绑定的元素|元素数组|window
	 * @param eventType 需要监听的事件
	 * @param callback 绑定事件触发的回调函数
	 * @param option
	 * + capture 表示事件是否在捕获阶段触发。默认为false，即在冒泡阶段触发
	 * + once 表示事件是否只触发一次。默认为false
	 * + passive 表示事件监听器是否不会调用preventDefault()。默认为false
	 * @example
	 * // 监听元素a.xx的click事件
	 * DOMUtils.on(document.querySelector("a.xx"),"click",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * DOMUtils.on("a.xx","click",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 */
	on<T extends Event>(
		element: DOMUtilsElementEventType,
		eventType: string,
		callback: (event: T) => void,
		option?: boolean | AddEventListenerOptions
	): void;
	/**
	 * 绑定事件
	 * @param element 需要绑定的元素|元素数组|window
	 * @param eventType 需要监听的事件
	 * @param selector 子元素选择器
	 * @param callback 绑定事件触发的回调函数
	 * @param option
	 * + capture 表示事件是否在捕获阶段触发。默认为false，即在冒泡阶段触发
	 * + once 表示事件是否只触发一次。默认为false
	 * + passive 表示事件监听器是否不会调用preventDefault()。默认为false
	 * @example
	 * // 监听元素a.xx的click、tap、hover事件
	 * DOMUtils.on(document.querySelector("a.xx"),"click tap hover",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * DOMUtils.on("a.xx",["click","tap","hover"],(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * @example
	 * // 监听全局document下的子元素a.xx的click事件
	 * DOMUtils.on(document,"click tap hover","a.xx",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 */
	on<T extends DOMUtils_EventType>(
		element: DOMUtilsElementEventType,
		eventType: T | T[],
		selector: string | undefined | null,
		callback: (event: DOMUtils_Event[T]) => void,
		option?: boolean | AddEventListenerOptions
	): void;
	/**
	 * 绑定事件
	 * @param element 需要绑定的元素|元素数组|window
	 * @param eventType 需要监听的事件
	 * @param selector 子元素选择器
	 * @param callback 绑定事件触发的回调函数
	 * @param option
	 * + capture 表示事件是否在捕获阶段触发。默认为false，即在冒泡阶段触发
	 * + once 表示事件是否只触发一次。默认为false
	 * + passive 表示事件监听器是否不会调用preventDefault()。默认为false
	 * @example
	 * // 监听元素a.xx的click、tap、hover事件
	 * DOMUtils.on(document.querySelector("a.xx"),"click tap hover",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * DOMUtils.on("a.xx",["click","tap","hover"],(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 * @example
	 * // 监听全局document下的子元素a.xx的click事件
	 * DOMUtils.on(document,"click tap hover","a.xx",(event)=>{
	 *    console.log("事件触发",event)
	 * })
	 */
	on<T extends Event>(
		element: DOMUtilsElementEventType,
		eventType: string,
		selector: string | undefined | null,
		callback: (event: T) => void,
		option?: boolean | AddEventListenerOptions
	): void;
	on<T extends Event>(
		element:
			| HTMLElement
			| string
			| NodeList
			| HTMLElement[]
			| Window
			| Document
			| Element
			| null
			| typeof globalThis,
		eventType: DOMUtils_EventType | DOMUtils_EventType[] | string,
		selector: string | undefined | ((event: T) => void) | null,
		callback?: ((event: T) => void) | boolean | AddEventListenerOptions,
		option?: boolean | AddEventListenerOptions
	) {
		/**
		 * 获取option配置
		 * @param args
		 * @param startIndex
		 * @param option
		 */
		function getOption(
			args: IArguments,
			startIndex: number,
			option: AddEventListenerOptions
		) {
			if (typeof args[startIndex] === "boolean") {
				option.capture = args[startIndex];
				if (typeof args[startIndex + 1] === "boolean") {
					option.once = args[startIndex + 1];
				}
				if (typeof args[startIndex + 2] === "boolean") {
					option.passive = args[startIndex + 2];
				}
			} else if (
				typeof args[startIndex] === "object" &&
				("capture" in args[startIndex] ||
					"once" in args[startIndex] ||
					"passive" in args[startIndex])
			) {
				option.capture = args[startIndex].capture;
				option.once = args[startIndex].once;
				option.passive = args[startIndex].passive;
			}
			return option;
		}

		let DOMUtilsContext = this;
		let args = arguments;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		let elementList: HTMLElement[] = [];
		if (element instanceof NodeList || Array.isArray(element)) {
			element = element as HTMLElement[];
			elementList = [...element];
		} else {
			elementList.push(element as HTMLElement);
		}

		let eventTypeList: string[] = [];
		if (Array.isArray(eventType)) {
			eventTypeList = eventTypeList.concat(eventType as string[]);
		} else if (typeof eventType === "string") {
			eventTypeList = eventTypeList.concat(eventType.split(" "));
		}
		let _selector_: string | undefined = selector as any;
		let _callback_: (event: T) => void = callback as any;
		let _option_: AddEventListenerOptions = {
			capture: false,
			once: false,
			passive: false,
		};
		if (typeof selector === "function") {
			/* 这是为没有selector的情况 */
			_selector_ = void 0;
			_callback_ = selector;
			_option_ = getOption(args, 3, _option_);
		} else {
			/* 这是存在selector的情况 */
			_option_ = getOption(args, 4, _option_);
		}
		/**
		 * 如果是once，那么删除该监听和元素上的事件和监听
		 */
		function checkOptionOnceToRemoveEventListener() {
			if (_option_.once) {
				DOMUtilsContext.off(
					element,
					eventType as any,
					selector as any,
					callback as any,
					option
				);
			}
		}
		elementList.forEach((elementItem) => {
			function ownCallBack(event: Event) {
				let target = event.target as HTMLElement;
				if (_selector_) {
					/* 存在自定义子元素选择器 */
					let totalParent = DOMUtilsCommonUtils.isWin(elementItem)
						? DOMUtilsContext.windowApi.document.documentElement
						: elementItem;
					if (target.matches(_selector_)) {
						/* 当前目标可以被selector所匹配到 */
						_callback_.call(target, event as any);
						checkOptionOnceToRemoveEventListener();
					} else if (
						target.closest(_selector_) &&
						totalParent.contains(target.closest(_selector_))
					) {
						/* 在上层与主元素之间寻找可以被selector所匹配到的 */
						let closestElement = target.closest(_selector_);
						/* event的target值不能直接修改 */
						OriginPrototype.Object.defineProperty(event, "target", {
							get() {
								return closestElement;
							},
						});
						_callback_.call(closestElement, event as any);
						checkOptionOnceToRemoveEventListener();
					}
				} else {
					_callback_.call(elementItem, event as any);
					checkOptionOnceToRemoveEventListener();
				}
			}

			/* 遍历事件名设置元素事件 */
			eventTypeList.forEach((eventName) => {
				elementItem.addEventListener(eventName, ownCallBack, _option_);

				if (_callback_ && (_callback_ as any).delegate) {
					elementItem.setAttribute("data-delegate", _selector_ as string);
				}
				/* 获取对象上的事件 */
				let elementEvents =
					(elementItem as any)[DOMUtilsData.SymbolEvents] || {};
				/* 初始化对象上的xx事件 */
				elementEvents[eventName] = elementEvents[eventName] || [];
				elementEvents[eventName].push({
					selector: _selector_,
					option: _option_,
					callback: ownCallBack,
					originCallBack: _callback_,
				});
				/* 覆盖事件 */
				(elementItem as any)[DOMUtilsData.SymbolEvents] = elementEvents;
			});
		});
	}
	/**
	 * 取消绑定事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType 需要取消监听的事件
	 * @param callback 通过DOMUtils.on绑定的事件函数
	 * @param option
	 * + capture 如果在添加事件监听器时指定了useCapture为true，则在移除事件监听器时也必须指定为true
	 * @param filter (可选)过滤函数，对元素属性上的事件进行过滤出想要删除的事件
	 * @example
	 * // 取消监听元素a.xx的click事件
	 * DOMUtils.off(document.querySelector("a.xx"),"click")
	 * DOMUtils.off("a.xx","click")
	 */
	off<T extends DOMUtils_EventType>(
		element: DOMUtilsElementEventType,
		eventType: T | T[],
		callback?: (event: DOMUtils_Event[T]) => void,
		option?: boolean | AddEventListenerOptions,
		filter?: (
			value: DOMUtilsEventListenerOptionsAttribute,
			index: number,
			array: DOMUtilsEventListenerOptionsAttribute[]
		) => boolean
	): void;
	/**
	 * 取消绑定事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType 需要取消监听的事件
	 * @param callback 通过DOMUtils.on绑定的事件函数
	 * @param option
	 * + capture 如果在添加事件监听器时指定了useCapture为true，则在移除事件监听器时也必须指定为true
	 * @param filter (可选)过滤函数，对元素属性上的事件进行过滤出想要删除的事件
	 * @example
	 * // 取消监听元素a.xx的click事件
	 * DOMUtils.off(document.querySelector("a.xx"),"click")
	 * DOMUtils.off("a.xx","click")
	 */
	off<T extends Event>(
		element: DOMUtilsElementEventType,
		eventType: string,
		callback?: (event: T) => void,
		option?: boolean | AddEventListenerOptions,
		filter?: (
			value: DOMUtilsEventListenerOptionsAttribute,
			index: number,
			array: DOMUtilsEventListenerOptionsAttribute[]
		) => boolean
	): void;
	/**
	 * 取消绑定事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType 需要取消监听的事件
	 * @param selector 子元素选择器
	 * @param callback 通过DOMUtils.on绑定的事件函数
	 * @param option
	 * + capture 如果在添加事件监听器时指定了useCapture为true，则在移除事件监听器时也必须指定为true
	 * @param filter (可选)过滤函数，对元素属性上的事件进行过滤出想要删除的事件
	 * @example
	 * // 取消监听元素a.xx的click、tap、hover事件
	 * DOMUtils.off(document.querySelector("a.xx"),"click tap hover")
	 * DOMUtils.off("a.xx",["click","tap","hover"])
	 */
	off<T extends DOMUtils_EventType>(
		element: DOMUtilsElementEventType,
		eventType: T | T[],
		selector?: string | undefined,
		callback?: (event: DOMUtils_Event[T]) => void,
		option?: boolean | AddEventListenerOptions,
		filter?: (
			value: DOMUtilsEventListenerOptionsAttribute,
			index: number,
			array: DOMUtilsEventListenerOptionsAttribute[]
		) => boolean
	): void;
	/**
	 * 取消绑定事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType 需要取消监听的事件
	 * @param selector 子元素选择器
	 * @param callback 通过DOMUtils.on绑定的事件函数
	 * @param option
	 * + capture 如果在添加事件监听器时指定了useCapture为true，则在移除事件监听器时也必须指定为true
	 * @param filter (可选)过滤函数，对元素属性上的事件进行过滤出想要删除的事件
	 * @example
	 * // 取消监听元素a.xx的click、tap、hover事件
	 * DOMUtils.off(document.querySelector("a.xx"),"click tap hover")
	 * DOMUtils.off("a.xx",["click","tap","hover"])
	 */
	off<T extends Event>(
		element: DOMUtilsElementEventType,
		eventType: string,
		selector?: string | undefined,
		callback?: (event: T) => void,
		option?: boolean | AddEventListenerOptions,
		filter?: (
			value: DOMUtilsEventListenerOptionsAttribute,
			index: number,
			array: DOMUtilsEventListenerOptionsAttribute[]
		) => boolean
	): void;
	off<T extends Event>(
		element:
			| HTMLElement
			| string
			| NodeList
			| HTMLElement[]
			| Window
			| Document
			| Element
			| null
			| typeof globalThis,
		eventType: DOMUtils_EventType | DOMUtils_EventType[] | string,
		selector?: string | undefined | ((event: T) => void),
		callback?: ((event: T) => void) | boolean | AddEventListenerOptions,
		option?:
			| boolean
			| AddEventListenerOptions
			| ((
					value: DOMUtilsEventListenerOptionsAttribute,
					index: number,
					array: DOMUtilsEventListenerOptionsAttribute[]
			  ) => boolean),
		filter?: (
			value: DOMUtilsEventListenerOptionsAttribute,
			index: number,
			array: DOMUtilsEventListenerOptionsAttribute[]
		) => boolean
	) {
		/**
		 * 获取option配置
		 * @param args1
		 * @param startIndex
		 * @param option
		 */
		function getOption(
			args1: IArguments,
			startIndex: number,
			option: EventListenerOptions
		) {
			if (typeof args1[startIndex] === "boolean") {
				option.capture = args1[startIndex];
			} else if (
				typeof args1[startIndex] === "object" &&
				"capture" in args1[startIndex]
			) {
				option.capture = args1[startIndex].capture;
			}
			return option;
		}
		let DOMUtilsContext = this;
		let args = arguments;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		let elementList: HTMLElement[] = [];
		if (element instanceof NodeList || Array.isArray(element)) {
			element = element as HTMLElement[];
			elementList = [...element];
		} else {
			elementList.push(element as HTMLElement);
		}
		let eventTypeList: string[] = [];
		if (Array.isArray(eventType)) {
			eventTypeList = eventTypeList.concat(eventType as string[]);
		} else if (typeof eventType === "string") {
			eventTypeList = eventTypeList.concat(eventType.split(" "));
		}
		/**
		 * 子元素选择器
		 */
		let _selector_: string | undefined = selector as any;
		/**
		 * 事件的回调函数
		 */
		let _callback_: (event: T) => void = callback as any;

		/**
		 * 事件的配置
		 */
		let _option_: EventListenerOptions = {
			capture: false,
		};
		if (typeof selector === "function") {
			/* 这是为没有selector的情况 */
			_selector_ = void 0;
			_callback_ = selector;
			_option_ = getOption(args, 3, _option_);
		} else {
			_option_ = getOption(args, 4, _option_);
		}
		elementList.forEach((elementItem) => {
			/* 获取对象上的事件 */
			let elementEvents = (elementItem as any)[DOMUtilsData.SymbolEvents] || {};
			eventTypeList.forEach((eventName) => {
				let handlers: DOMUtilsEventListenerOptionsAttribute[] =
					elementEvents[eventName] || [];
				if (typeof filter === "function") {
					handlers = handlers.filter(filter);
				}
				for (let index = 0; index < handlers.length; index++) {
					let handler = handlers[index];
					let flag = false;
					if (!_selector_ || handler.selector === _selector_) {
						/* selector不为空，进行selector判断 */
						flag = true;
					}
					if (
						!_callback_ ||
						handler.callback === _callback_ ||
						handler.originCallBack === _callback_
					) {
						/* callback不为空，进行callback判断 */
						flag = true;
					}

					if (flag) {
						elementItem.removeEventListener(
							eventName,
							handler.callback,
							_option_
						);
						handlers.splice(index--, 1);
					}
				}
				if (handlers.length === 0) {
					/* 如果没有任意的handler，那么删除该属性 */
					DOMUtilsCommonUtils.delete(elementEvents, eventType);
				}
			});
			(elementItem as any)[DOMUtilsData.SymbolEvents] = elementEvents;
		});
	}
	/**
	 * 取消绑定所有的事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType （可选）需要取消监听的事件
	 */
	offAll(element: DOMUtilsElementEventType, eventType?: string): void;
	/**
	 * 取消绑定所有的事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType （可选）需要取消监听的事件
	 */
	offAll(
		element: DOMUtilsElementEventType,
		eventType?: DOMUtils_EventType | DOMUtils_EventType[]
	): void;
	/**
	 * 取消绑定所有的事件
	 * @param element 需要取消绑定的元素|元素数组
	 * @param eventType （可选）需要取消监听的事件
	 */
	offAll(
		element: DOMUtilsElementEventType,
		eventType?: DOMUtils_EventType | DOMUtils_EventType[] | string
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		let elementList: HTMLElement[] = [];
		if (element instanceof NodeList || Array.isArray(element)) {
			elementList = [...(element as HTMLElement[])];
		} else {
			elementList.push(element as HTMLElement);
		}

		let eventTypeList: string[] = [];
		if (Array.isArray(eventType)) {
			eventTypeList = eventTypeList.concat(eventType as string[]);
		} else if (typeof eventType === "string") {
			eventTypeList = eventTypeList.concat(eventType.split(" "));
		}
		elementList.forEach((elementItem) => {
			Object.getOwnPropertySymbols(elementItem).forEach((symbolEvents) => {
				if (!symbolEvents.toString().startsWith("Symbol(events_")) {
					return;
				}
				let elementEvents = (elementItem as any)[symbolEvents] || {};
				let iterEventNameList = eventTypeList.length
					? eventTypeList
					: Object.keys(elementEvents);
				iterEventNameList.forEach((eventName) => {
					let handlers = elementEvents[eventName];
					if (!handlers) {
						return;
					}
					for (const handler of handlers) {
						elementItem.removeEventListener(eventName, handler.callback, {
							capture: handler["option"]["capture"],
						});
					}
					DOMUtilsCommonUtils.delete(
						(elementItem as any)[symbolEvents],
						eventName
					);
				});
			});
		});
	}

	/**
	 * 等待文档加载完成后执行指定的函数
	 * @param callback 需要执行的函数
	 * @example
	 * DOMUtils.ready(function(){
	 *   console.log("文档加载完毕")
	 * })
	 */
	ready<T extends Function>(callback: T) {
		if (typeof callback !== "function") {
			return;
		}
		let DOMUtilsContext = this;
		/**
		 * 检测文档是否加载完毕
		 */
		function checkDOMReadyState() {
			try {
				if (
					DOMUtilsContext.windowApi.document.readyState === "complete" ||
					(DOMUtilsContext.windowApi.document.readyState !== "loading" &&
						!(DOMUtilsContext.windowApi.document.documentElement as any)
							.doScroll)
				) {
					return true;
				} else {
					return false;
				}
			} catch (error) {
				return false;
			}
		}
		/**
		 * 成功加载完毕后触发的回调函数
		 */
		function completed() {
			removeDomReadyListener();
			callback();
		}

		let targetList = [
			{
				target: DOMUtilsContext.windowApi.document,
				eventType: "DOMContentLoaded",
				callback: completed,
			},
			{
				target: DOMUtilsContext.windowApi.window,
				eventType: "load",
				callback: completed,
			},
		];
		/**
		 * 添加监听
		 */
		function addDomReadyListener() {
			for (let index = 0; index < targetList.length; index++) {
				let item = targetList[index];
				item.target.addEventListener(item.eventType, item.callback);
			}
		}
		/**
		 * 移除监听
		 */
		function removeDomReadyListener() {
			for (let index = 0; index < targetList.length; index++) {
				let item = targetList[index];
				item.target.removeEventListener(item.eventType, item.callback);
			}
		}
		if (checkDOMReadyState()) {
			/* 检查document状态 */
			setTimeout(callback);
		} else {
			/* 添加监听 */
			addDomReadyListener();
		}
	}
	/**
	 * 主动触发事件
	 * @param element 需要触发的元素|元素数组|window
	 * @param eventType 需要触发的事件
	 * @param details 赋予触发的Event的额外属性，如果是Event类型，那么将自动代替默认new的Event对象
	 * @param useDispatchToTriggerEvent 是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的click事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click")
	 * DOMUtils.trigger("a.xx","click")
	 * // 触发元素a.xx的click、tap、hover事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click tap hover")
	 * DOMUtils.trigger("a.xx",["click","tap","hover"])
	 */
	trigger(
		element:
			| DOMUtilsTargetElementType
			| any[]
			| typeof globalThis
			| Window
			| Document,
		eventType: string,
		details?: object,
		useDispatchToTriggerEvent?: boolean
	): void;
	/**
	 * 主动触发事件
	 * @param element 需要触发的元素|元素数组|window
	 * @param eventType 需要触发的事件
	 * @param details 赋予触发的Event的额外属性，如果是Event类型，那么将自动代替默认new的Event对象
	 * @param useDispatchToTriggerEvent 是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的click事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click")
	 * DOMUtils.trigger("a.xx","click")
	 * // 触发元素a.xx的click、tap、hover事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click tap hover")
	 * DOMUtils.trigger("a.xx",["click","tap","hover"])
	 */
	trigger(
		element: HTMLElement | string | NodeList | any[] | Window | Document,
		eventType: DOMUtils_EventType | DOMUtils_EventType[],
		details?: object,
		useDispatchToTriggerEvent?: boolean
	): void;
	/**
	 * 主动触发事件
	 * @param element 需要触发的元素|元素数组|window
	 * @param eventType 需要触发的事件
	 * @param details 赋予触发的Event的额外属性，如果是Event类型，那么将自动代替默认new的Event对象
	 * @param useDispatchToTriggerEvent 是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的click事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click")
	 * DOMUtils.trigger("a.xx","click")
	 * // 触发元素a.xx的click、tap、hover事件
	 * DOMUtils.trigger(document.querySelector("a.xx"),"click tap hover")
	 * DOMUtils.trigger("a.xx",["click","tap","hover"])
	 */
	trigger(
		element: HTMLElement | string | NodeList | any[] | Window | Document,
		eventType: DOMUtils_EventType | DOMUtils_EventType[] | string,
		details?: object,
		useDispatchToTriggerEvent: boolean = true
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelector(
				element
			) as HTMLElement;
		}
		if (element == null) {
			return;
		}
		let elementList = [];
		if (element instanceof NodeList || Array.isArray(element)) {
			element = element as HTMLElement[];
			elementList = [...element];
		} else {
			elementList = [element];
		}
		let eventTypeList: string[] = [];
		if (Array.isArray(eventType)) {
			eventTypeList = eventType as string[];
		} else if (typeof eventType === "string") {
			eventTypeList = eventType.split(" ");
		}

		elementList.forEach((elementItem) => {
			/* 获取对象上的事件 */
			let events = elementItem[DOMUtilsData.SymbolEvents] || {};
			eventTypeList.forEach((_eventType_) => {
				let event: Event = null as any;
				if (details && details instanceof Event) {
					event = details;
				} else {
					event = new Event(_eventType_);
					if (details) {
						Object.keys(details).forEach((keyName) => {
							(event as any)[keyName] = (details as any)[keyName];
						});
					}
				}
				if (useDispatchToTriggerEvent == false && _eventType_ in events) {
					events[_eventType_].forEach((eventsItem: any) => {
						eventsItem.callback(event);
					});
				} else {
					elementItem.dispatchEvent(event);
				}
			});
		});
	}

	/**
	 * 绑定或触发元素的click事件
	 * @param element 目标元素
	 * @param handler （可选）事件处理函数
	 * @param details （可选）赋予触发的Event的额外属性
	 * @param useDispatchToTriggerEvent （可选）是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的click事件
	 * DOMUtils.click(document.querySelector("a.xx"))
	 * DOMUtils.click("a.xx")
	 * DOMUtils.click("a.xx"，function(){
	 *  console.log("触发click事件成功")
	 * })
	 * */
	click(
		element: DOMUtilsTargetElementType | typeof globalThis | Window,
		handler?: (event: DOMUtils_Event["click"]) => void,
		details?: any,
		useDispatchToTriggerEvent?: boolean
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.click(
					$ele as HTMLElement,
					handler,
					details,
					useDispatchToTriggerEvent
				);
			});
			return;
		}
		if (handler == null) {
			DOMUtilsContext.trigger(
				element,
				"click",
				details,
				useDispatchToTriggerEvent
			);
		} else {
			DOMUtilsContext.on(element, "click", null, handler);
		}
	}
	/**
	 * 绑定或触发元素的blur事件
	 * @param element 目标元素
	 * @param handler （可选）事件处理函数
	 * @param details （可选）赋予触发的Event的额外属性
	 * @param useDispatchToTriggerEvent （可选）是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的blur事件
	 * DOMUtils.blur(document.querySelector("a.xx"))
	 * DOMUtils.blur("a.xx")
	 * DOMUtils.blur("a.xx"，function(){
	 *  console.log("触发blur事件成功")
	 * })
	 * */
	blur(
		element: DOMUtilsTargetElementType | typeof globalThis | Window,
		handler?: (event: DOMUtils_Event["blur"]) => void,
		details?: object,
		useDispatchToTriggerEvent?: boolean
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelector(
				element
			) as HTMLElement;
		}
		if (element == null) {
			return;
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.focus(
					$ele as HTMLElement,
					handler,
					details,
					useDispatchToTriggerEvent
				);
			});
			return;
		}
		if (handler === null) {
			DOMUtilsContext.trigger(
				element,
				"blur",
				details,
				useDispatchToTriggerEvent
			);
		} else {
			DOMUtilsContext.on(
				element,
				"blur",
				null,
				handler as (event: Event) => void
			);
		}
	}
	/**
	 * 绑定或触发元素的focus事件
	 * @param element 目标元素
	 * @param handler （可选）事件处理函数
	 * @param details （可选）赋予触发的Event的额外属性
	 * @param useDispatchToTriggerEvent （可选）是否使用dispatchEvent来触发事件,默认true
	 * @example
	 * // 触发元素a.xx的focus事件
	 * DOMUtils.focus(document.querySelector("a.xx"))
	 * DOMUtils.focus("a.xx")
	 * DOMUtils.focus("a.xx"，function(){
	 *  console.log("触发focus事件成功")
	 * })
	 * */
	focus(
		element: DOMUtilsTargetElementType | typeof globalThis | Window,
		handler?: (event: DOMUtils_Event["focus"]) => void,
		details?: object,
		useDispatchToTriggerEvent?: boolean
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.focus(
					$ele as HTMLElement,
					handler,
					details,
					useDispatchToTriggerEvent
				);
			});
			return;
		}
		if (handler == null) {
			DOMUtilsContext.trigger(
				element,
				"focus",
				details,
				useDispatchToTriggerEvent
			);
		} else {
			DOMUtilsContext.on(element, "focus", null, handler);
		}
	}
	/**
	 * 当鼠标移入或移出元素时触发事件
	 * @param element 当前元素
	 * @param handler 事件处理函数
	 * @param option 配置
	 * @example
	 * // 监听a.xx元素的移入或移出
	 * DOMUtils.hover(document.querySelector("a.xx"),()=>{
	 *   console.log("移入/移除");
	 * })
	 * DOMUtils.hover("a.xx",()=>{
	 *   console.log("移入/移除");
	 * })
	 */
	hover(
		element: DOMUtilsTargetElementType,
		handler: (event: DOMUtils_Event["hover"]) => void,
		option?: boolean | AddEventListenerOptions
	) {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (element == null) {
			return;
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.hover($ele as HTMLElement, handler, option);
			});
			return;
		}
		DOMUtilsContext.on(element, "mouseenter", null, handler, option);
		DOMUtilsContext.on(element, "mouseleave", null, handler, option);
	}
	/**
	 * 当按键松开时触发事件
	 * keydown - > keypress - > keyup
	 * @param element 当前元素
	 * @param handler 事件处理函数
	 * @param option 配置
	 * @example
	 * // 监听a.xx元素的按键松开
	 * DOMUtils.keyup(document.querySelector("a.xx"),()=>{
	 *   console.log("按键松开");
	 * })
	 * DOMUtils.keyup("a.xx",()=>{
	 *   console.log("按键松开");
	 * })
	 */
	keyup(
		element: DOMUtilsTargetElementType | Window | typeof globalThis,
		handler: (event: DOMUtils_Event["keyup"]) => void,
		option?: boolean | AddEventListenerOptions
	) {
		let DOMUtilsContext = this;
		if (element == null) {
			return;
		}
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.keyup($ele as HTMLElement, handler, option);
			});
			return;
		}
		DOMUtilsContext.on(element, "keyup", null, handler, option);
	}
	/**
	 * 当按键按下时触发事件
	 * keydown - > keypress - > keyup
	 * @param element 目标
	 * @param handler 事件处理函数
	 * @param option 配置
	 * @example
	 * // 监听a.xx元素的按键按下
	 * DOMUtils.keydown(document.querySelector("a.xx"),()=>{
	 *   console.log("按键按下");
	 * })
	 * DOMUtils.keydown("a.xx",()=>{
	 *   console.log("按键按下");
	 * })
	 */
	keydown(
		element: DOMUtilsTargetElementType | Window | typeof globalThis,
		handler: (event: DOMUtils_Event["keydown"]) => void,
		option?: boolean | AddEventListenerOptions
	) {
		let DOMUtilsContext = this;
		if (element == null) {
			return;
		}
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.keydown($ele as HTMLElement, handler, option);
			});
			return;
		}
		DOMUtilsContext.on(element, "keydown", null, handler, option);
	}
	/**
	 * 当按键按下时触发事件
	 * keydown - > keypress - > keyup
	 * @param element 目标
	 * @param handler 事件处理函数
	 * @param option 配置
	 * @example
	 * // 监听a.xx元素的按键按下
	 * DOMUtils.keypress(document.querySelector("a.xx"),()=>{
	 *   console.log("按键按下");
	 * })
	 * DOMUtils.keypress("a.xx",()=>{
	 *   console.log("按键按下");
	 * })
	 */
	keypress(
		element: DOMUtilsTargetElementType | Window | typeof globalThis,
		handler: (event: DOMUtils_Event["keypress"]) => void,
		option?: boolean | AddEventListenerOptions
	) {
		let DOMUtilsContext = this;
		if (element == null) {
			return;
		}
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		if (isNodeList(element)) {
			// 设置
			element.forEach(($ele) => {
				DOMUtilsContext.keypress($ele as HTMLElement, handler, option);
			});
			return;
		}
		DOMUtilsContext.on(element, "keypress", null, handler, option);
	}

	/**
     * 监听某个元素键盘按键事件或window全局按键事件
     * 按下有值的键时触发，按下Ctrl\Alt\Shift\Meta是无值键。按下先触发keydown事件，再触发keypress事件。
     * @param element 需要监听的对象，可以是全局Window或者某个元素
     * @param eventName 事件名，默认keypress
     * @param callback 自己定义的回调事件，参数1为当前的key，参数2为组合按键，数组类型，包含ctrl、shift、alt和meta（win键或mac的cmd键）
	 * @param options 监听事件的配置
     * @example 
        Utils.listenKeyboard(window,(keyName,keyValue,otherKey,event)=>{
            if(keyName === "Enter"){
                console.log("回车按键的值是："+keyValue)
            }
            if(otherKey.indexOf("ctrl") && keyName === "Enter" ){
                console.log("Ctrl和回车键");
          }
        })
     * @example
    字母和数字键的键码值(keyCode)
      按键	键码	按键	键码	按键	键码	按键	键码
      A	65	J	74	S	83	1	49
      B	66	K	75	T	84	2	50
      C	67	L	76	U	85	3	51
      D	68	M	77	V	86	4	52
      E	69	N	78	W	87	5	53
      F	70	O	79	X	88	6	54
      G	71	P	80	Y	89	7	55
      H	72	Q	81	Z	90	8	56
      I	73	R	82	0	48	9	57
  
      数字键盘上的键的键码值(keyCode)	
      功能键键码值(keyCode)
      按键	键码	按键  	键码	按键	键码	按键	键码
      0	96	8	104	F1	112	F7	118
      1	97	9	105	F2	113	F8	119
      2	98	*	106	F3	114	F9	120
      3	99	+	107	F4	115	F10	121
      4	100	Enter	108	F5	116	F11	122
      5	101	-	109	F6	117	F12	123
      6	102	.	110	 	 	 	 
      7	103	/	111	 	 
      
      控制键键码值(keyCode)
      按键		键码	按键		键码	按键		键码	按键		键码
      BackSpace	8	Esc		27	→		39	-_		189
      Tab		9	Spacebar	32	↓		40	.>		190
      Clear		12	Page Up		33	Insert		45	/?		191
      Enter		13	Page Down	34	Delete		46	`~		192
      Shift		16	End		35	Num Lock	144	[{		219
      Control		17	Home		36	;:		186	\|		220
      Alt		18	←		37	=+		187	]}		221
      Cape Lock	20	↑		38	,<		188	'"		222
  
      多媒体键码值(keyCode)
      按键		键码
      音量加		175
      音量减		174
      停止		179
      静音		173
      浏览器		172
      邮件		180
      搜索		170
      收藏		171
     **/
	listenKeyboard(
		element: DOMUtilsTargetElementType | Window | Node | typeof globalThis,
		eventName: "keyup" | "keypress" | "keydown" = "keypress",
		callback: (
			keyName: string,
			keyValue: number,
			otherCodeList: string[],
			event: KeyboardEvent
		) => void,
		options?: AddEventListenerOptions | boolean
	): {
		removeListen(): void;
	} {
		let DOMUtilsContext = this;
		if (typeof element === "string") {
			element = DOMUtilsContext.windowApi.document.querySelectorAll(element);
		}
		let keyboardEventCallBack = function (event: KeyboardEvent) {
			/** 键名 */
			let keyName = event.key || event.code;
			/** 键值 */
			let keyValue = event.charCode || event.keyCode || event.which;
			/** 组合键列表 */
			let otherCodeList: string[] = [];
			if (event.ctrlKey) {
				otherCodeList.push("ctrl");
			}
			if (event.altKey) {
				otherCodeList.push("alt");
			}
			if (event.metaKey) {
				otherCodeList.push("meta");
			}
			if (event.shiftKey) {
				otherCodeList.push("shift");
			}
			if (typeof callback === "function") {
				callback(keyName, keyValue, otherCodeList, event);
			}
		};
		DOMUtilsContext.on(element, eventName, keyboardEventCallBack, options);
		return {
			removeListen: () => {
				DOMUtilsContext.off(element, eventName, keyboardEventCallBack, options);
			},
		};
	}
	/**
	 * 选择器，可使用以下的额外语法
	 *
	 * + :contains([text]) 作用: 找到包含指定文本内容的指定元素
	 * + :empty 作用:找到既没有文本内容也没有子元素的指定元素
	 * + :regexp([text]) 作用: 找到符合正则表达式的内容的指定元素
	 * @param selector
	 * @example
	 * DOMUtils.selector("div:contains('测试')")
	 * > div.xxx
	 * @example
	 * DOMUtils.selector("div:empty")
	 * > div.xxx
	 * @example
	 * DOMUtils.selector("div:regexp('^xxxx$')")
	 * > div.xxx
	 */
	selector<K extends keyof HTMLElementTagNameMap>(
		selector: K
	): HTMLElementTagNameMap[K] | undefined;
	selector<E extends Element = Element>(selector: string): E | undefined;
	selector<E extends Element = Element>(selector: string) {
		return this.selectorAll<E>(selector)[0];
	}
	/**
	 * 选择器，可使用以下的额外语法
	 *
	 * + :contains([text]) 作用: 找到包含指定文本内容的指定元素
	 * + :empty 作用:找到既没有文本内容也没有子元素的指定元素
	 * + :regexp([text]) 作用: 找到符合正则表达式的内容的指定元素
	 * @param selector
	 * @example
	 * DOMUtils.selectorAll("div:contains('测试')")
	 * > [div.xxx]
	 * @example
	 * DOMUtils.selectorAll("div:empty")
	 * > [div.xxx]
	 * @example
	 * DOMUtils.selectorAll("div:regexp('^xxxx$')")
	 * > [div.xxx]
	 */
	selectorAll<K extends keyof HTMLElementTagNameMap>(
		selector: K
	): HTMLElementTagNameMap[K][];
	selectorAll<E extends Element = Element>(selector: string): E[];
	selectorAll<E extends Element = Element>(selector: string) {
		const context = this;
		selector = selector.trim();
		if (selector.match(/[^\s]{1}:empty$/gi)) {
			// empty 语法
			selector = selector.replace(/:empty$/gi, "");
			return Array.from(
				context.windowApi.document.querySelectorAll<E>(selector)
			).filter(($ele) => {
				return $ele?.innerHTML?.trim() === "";
			});
		} else if (
			selector.match(/[^\s]{1}:contains\("(.*)"\)$/gi) ||
			selector.match(/[^\s]{1}:contains\('(.*)'\)$/gi)
		) {
			// contains 语法
			let textMatch = selector.match(/:contains\(("|')(.*)("|')\)$/i);
			let text = textMatch![2];
			selector = selector.replace(/:contains\(("|')(.*)("|')\)$/gi, "");
			return Array.from(
				context.windowApi.document.querySelectorAll<E>(selector)
			).filter(($ele) => {
				// @ts-ignore
				return ($ele?.textContent || $ele?.innerText)?.includes(text);
			});
		} else if (
			selector.match(/[^\s]{1}:regexp\("(.*)"\)$/gi) ||
			selector.match(/[^\s]{1}:regexp\('(.*)'\)$/gi)
		) {
			// regexp 语法
			let textMatch = selector.match(/:regexp\(("|')(.*)("|')\)$/i);
			let text = textMatch![2];
			let regexp = new RegExp(text);
			selector = selector.replace(/:regexp\(("|')(.*)("|')\)$/gi, "");
			return Array.from(
				context.windowApi.document.querySelectorAll<E>(selector)
			).filter(($ele) => {
				// @ts-ignore
				return Boolean(($ele?.textContent || $ele?.innerText)?.match(regexp));
			});
		} else {
			// 普通语法
			return Array.from(
				context.windowApi.document.querySelectorAll<E>(selector)
			);
		}
	}
}

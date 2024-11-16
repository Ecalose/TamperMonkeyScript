import type { PopsAlertDetails } from "../components/alert/indexType";
import type { PopsConfirmDetails } from "../components/confirm/indexType";
import type { PopsDrawerDetails } from "../components/drawer/indexType";
import type { PopsFolderDetails } from "../components/folder/indexType";
import type { PopsIframeDetails } from "../components/iframe/indexType";
import type { PopsLoadingDetails } from "../components/loading/indexType";
import type { PopsPanelDetails } from "../components/panel/indexType";
import type { PopsPromptDetails } from "../components/prompt/indexType";
import { PopsCore } from "../Core";
import { pops } from "../Pops";
import { PopsEventDetails, PopsHandlerEventDetails } from "../types/event";
import { PopsLayerCommonConfig } from "../types/layer";
import type {
	PopsAllDetails,
	PopsLayerMode,
	PopsMode,
	PopsType,
} from "../types/main";
import { popsDOMUtils } from "../utils/PopsDOMUtils";
import { PopsInstanceUtils } from "../utils/PopsInstanceUtils";
import { popsUtils } from "../utils/PopsUtils";

export const PopsHandler = {
	/**
	 * 创建shadow
	 */
	handlerShadow() {
		let $shadowContainer = document.createElement("div");
		$shadowContainer.className = "pops-shadow-container";
		let $shadowRoot = $shadowContainer.attachShadow({ mode: "open" });
		return {
			$shadowContainer,
			$shadowRoot,
		};
	},
	/**
	 * 处理初始化
	 * @param $shadowRoot 所在的shadowRoot
	 * @param cssText 添加进ShadowRoot的CSS
	 */
	handleInit($shadowRoot?: ShadowRoot, cssText?: string | string[]) {
		pops.init();
		if (!arguments.length) {
			return;
		}
		if (Array.isArray(cssText)) {
			for (let index = 0; index < cssText.length; index++) {
				this.handleInit($shadowRoot, cssText[index]);
			}
		} else {
			let $css = popsDOMUtils.createElement(
				"style",
				{
					innerHTML: cssText,
				},
				{
					"data-type": "PopsHandler.handleInit",
				}
			);
			$shadowRoot!.appendChild($css);
		}
	},
	/**
	 * 处理遮罩层
	 *
	 * + 设置遮罩层的点击事件
	 * @param details 传递的配置
	 */
	handleMask(
		details = {} as {
			type:
				| "alert"
				| "confirm"
				| "prompt"
				| "loading"
				| "iframe"
				| "drawer"
				| "folder"
				| "panel";
			guid: string;
			config:
				| Required<PopsAlertDetails>
				| Required<PopsLoadingDetails>
				| Required<PopsIframeDetails>
				| Required<PopsDrawerDetails>
				| Required<PopsPanelDetails>
				| Required<PopsFolderDetails>;
			animElement: HTMLElement;
			maskHTML: string;
		}
	): {
		maskElement: HTMLDivElement;
	} {
		let result = {
			maskElement: popsUtils.parseTextToDOM<HTMLDivElement>(details.maskHTML),
		};
		let isMaskClick = false;
		/**
		 * 点击其它区域的事件
		 * @param event
		 */
		function clickEvent(event: MouseEvent | PointerEvent) {
			popsDOMUtils.preventEvent(event);
			// 获取该类型实例存储列表
			let targetLayer = pops.config.layer[details.type];
			function originalRun() {
				if (details.config.mask!.clickEvent!.toClose) {
					/* 关闭 */
					PopsInstanceUtils.close(
						details.type,
						targetLayer,
						details.guid,
						details.config,
						details.animElement
					);
				} else if (details.config.mask!.clickEvent!.toHide) {
					/* 隐藏 */
					PopsInstanceUtils.hide(
						details.type,
						targetLayer,
						details.guid,
						details.config,
						details.animElement,
						result.maskElement
					);
				}
			}
			if (typeof details.config.mask.clickCallBack === "function") {
				details.config.mask.clickCallBack(originalRun, details.config);
			} else {
				originalRun();
			}
			return false;
		}
		// 判断是否启用了遮罩层点击动作
		if (
			details.config.mask.clickEvent!.toClose ||
			details.config.mask.clickEvent!.toHide
		) {
			/**
			 * 判断点击的元素是否是动画层的元素
			 * @param element
			 * @returns
			 */
			function isAnimElement(element: HTMLElement) {
				return Boolean(
					element?.localName?.toLowerCase() === "div" &&
						element.className &&
						element.className === "pops-anim" &&
						element.hasAttribute("anim")
				);
			}
			/* 判断按下的元素是否是pops-anim */
			popsDOMUtils.on(
				details.animElement,
				["touchstart", "mousedown"],
				void 0,
				(event) => {
					let $click = event.composedPath()[0] as HTMLElement;
					isMaskClick = isAnimElement($click);
				}
			);
			/* 如果有动画层，在动画层上监听点击事件 */
			popsDOMUtils.on<MouseEvent | PointerEvent>(
				details.animElement,
				"click",
				void 0,
				(event) => {
					let $click = event.composedPath()[0] as HTMLElement;
					if (isAnimElement($click) && isMaskClick) {
						return clickEvent(event);
					}
				}
			);
			/* 在遮罩层监听点击事件 */
			/* 如果有动画层，那么该点击事件触发不了 */
			popsDOMUtils.on<MouseEvent | PointerEvent>(
				result.maskElement,
				"click",
				void 0,
				(event) => {
					isMaskClick = true;
					clickEvent(event);
				}
			);
		}
		return result;
	},
	/**
	 * 处理获取元素
	 * @param animElement
	 * @param type
	 */
	handleQueryElement(animElement: HTMLDivElement, type: PopsType) {
		return {
			/**
			 * 主元素
			 */
			popsElement:
				animElement.querySelector<HTMLDivElement>(".pops[type-value")!,
			/**
			 * 确认按钮
			 */
			btnOkElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-btn-ok`
			)!,
			/**
			 * 取消按钮
			 */
			btnCancelElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-btn-cancel`
			)!,
			/**
			 * 其它按钮
			 */
			btnOtherElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-btn-other`
			)!,
			/**
			 * 标题元素
			 */
			titleElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-title`
			)!,
			/**
			 * 输入框元素
			 */
			inputElement: animElement.querySelector<HTMLTextAreaElement>(
				`.pops-${type}-content textarea[pops]`
			)
				? animElement.querySelector<HTMLTextAreaElement>(
						`.pops-${type}-content textarea[pops]`
				  )!
				: animElement.querySelector<HTMLInputElement>(
						`.pops-${type}-content input[pops]`
				  )!,
			/**
			 * 顶部按钮控制层元素
			 */
			headerControlsElement: animElement.querySelector<HTMLDivElement>(
				".pops-header-controls"
			)!,
			/**
			 * iframe元素
			 */
			iframeElement:
				animElement.querySelector<HTMLIFrameElement>("iframe[pops]")!,
			/**
			 * 加载中元素
			 */
			loadingElement:
				animElement.querySelector<HTMLDivElement>(".pops-loading")!,
			/**
			 * 内容元素
			 */
			contentElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-content`
			)!,
			/**
			 * 内容侧边栏容器元素
			 */
			contentAsideElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-content aside.pops-${type}-aside`
			)!,
			/**
			 * 内容主要区域容器元素
			 */
			contentSectionContainerElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-content section.pops-${type}-container`
			)!,
			/**
			 * 内容加载中元素
			 */
			contentLoadingElement: animElement.querySelector<HTMLDivElement>(
				`.pops-${type}-content-global-loading`
			)!,
			/**
			 * 顶部缩小按钮
			 */
			headerMinBtnElement: animElement.querySelector<HTMLDivElement>(
				".pops-header-control[type='min']"
			)!,
			/**
			 * 顶部放大按钮
			 */
			headerMaxBtnElement: animElement.querySelector<HTMLDivElement>(
				".pops-header-control[type='max']"
			)!,
			/**
			 * 顶部恢复原样按钮
			 */
			headerMiseBtnElement: animElement.querySelector<HTMLDivElement>(
				".pops-header-control[type='mise']"
			)!,
			/**
			 * 顶部关闭按钮
			 */
			headerCloseBtnElement: animElement.querySelector<HTMLDivElement>(
				".pops-header-control[type='close']"
			)!,
			/**
			 * 文件夹列表元素
			 */
			folderListElement:
				animElement.querySelector<HTMLDivElement>(".pops-folder-list")!,
			/**
			 * 文件夹列表顶部元素
			 */
			folderListHeaderElement: animElement.querySelector<HTMLDivElement>(
				".pops-folder-list .pops-folder-list-table__header-div"
			)!,
			/**
			 * 文件夹列表行元素
			 */
			folderListHeaderRowElement:
				animElement.querySelector<HTMLTableRowElement>(
					".pops-folder-list .pops-folder-list-table__header-div .pops-folder-list-table__header-row"
				)!,
			/**
			 * 文件夹列表tbody元素
			 */
			folderListBodyElement: animElement.querySelector<HTMLTableElement>(
				".pops-folder-list .pops-folder-list-table__body-div tbody"
			)!,
			/**
			 * 文件夹列表primary元素
			 */
			folderFileListBreadcrumbPrimaryElement:
				animElement.querySelector<HTMLDivElement>(
					".pops-folder-list .pops-folder-file-list-breadcrumb-primary"
				)!,
			/**
			 * 文件夹排序按钮-文件名
			 */
			folderListSortFileNameElement: animElement.querySelector<HTMLDivElement>(
				'.pops-folder-list-table__sort[data-sort="fileName"]'
			)!,
			/**
			 * 文件夹排序按钮-修改时间
			 */
			folderListSortLatestTimeElement:
				animElement.querySelector<HTMLDivElement>(
					'.pops-folder-list-table__sort[data-sort="latestTime"]'
				)!,
			/**
			 * 文件夹排序按钮-文件大小
			 */
			folderListSortFileSizeElement: animElement.querySelector<HTMLDivElement>(
				'.pops-folder-list-table__sort[data-sort="fileSize"]'
			)!,
		};
	},
	/**
	 * 获取事件配置
	 * @param guid
	 * @param $shadowContainer
	 * @param $shadowRoot
	 * @param mode 当前弹窗类型
	 * @param animElement 动画层
	 * @param popsElement 主元素
	 * @param maskElement 遮罩层
	 * @param config 当前配置
	 */
	handleEventDetails(
		guid: string,
		$shadowContainer: HTMLDivElement,
		$shadowRoot: ShadowRoot,
		mode: PopsLayerMode,
		animElement: HTMLDivElement,
		popsElement: HTMLDivElement,
		maskElement: HTMLDivElement,
		config:
			| PopsAlertDetails
			| PopsDrawerDetails
			| PopsPromptDetails
			| PopsConfirmDetails
			| PopsIframeDetails
			| PopsLoadingDetails
			| PopsPanelDetails
			| PopsFolderDetails
	): PopsEventDetails {
		return {
			$shadowContainer: $shadowContainer,
			$shadowRoot: $shadowRoot,
			element: animElement,
			animElement: animElement,
			popsElement: popsElement,
			maskElement: maskElement,
			mode: mode,
			guid: guid,
			close() {
				PopsInstanceUtils.close(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement
				);
			},
			hide() {
				PopsInstanceUtils.hide(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement,
					maskElement
				);
			},
			show() {
				PopsInstanceUtils.show(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement,
					maskElement
				);
			},
		};
	},
	/**
	 * 获取loading的事件配置
	 * @param guid
	 * @param mode 当前弹窗类型
	 * @param animElement 动画层
	 * @param popsElement 主元素
	 * @param maskElement 遮罩层
	 * @param config 当前配置
	 */
	handleLoadingEventDetails(
		guid: string,
		mode: "loading",
		animElement: HTMLDivElement,
		popsElement: HTMLDivElement,
		maskElement: HTMLDivElement,
		config:
			| PopsAlertDetails
			| PopsDrawerDetails
			| PopsPromptDetails
			| PopsConfirmDetails
			| PopsIframeDetails
			| PopsLoadingDetails
			| PopsPanelDetails
			| PopsFolderDetails
	): Omit<PopsEventDetails, "$shadowContainer" | "$shadowRoot"> {
		return {
			element: animElement,
			animElement: animElement,
			popsElement: popsElement,
			maskElement: maskElement,
			mode: mode,
			guid: guid,
			close() {
				PopsInstanceUtils.close(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement
				);
			},
			hide() {
				PopsInstanceUtils.hide(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement,
					maskElement
				);
			},
			show() {
				PopsInstanceUtils.show(
					mode,
					pops.config.layer[mode],
					guid,
					config,
					animElement,
					maskElement
				);
			},
		};
	},
	/**
	 * 处理返回的配置，针对popsHandler.handleEventDetails
	 */
	handleResultDetails(details: any): {
		$shadowContainer: HTMLDivElement;
		$shadowRoot: ShadowRoot;
		animElement: HTMLElement;
		popsElement: HTMLElement;
		maskElement: HTMLElement;
		close: () => void;
		hide: () => void;
		show: () => void;
	} {
		let resultDetails = Object.assign({}, details);
		popsUtils.delete(resultDetails, "type");
		popsUtils.delete(resultDetails, "function");
		return resultDetails;
	},
	/**
	 * 处理点击事件
	 * @param type 当前按钮类型
	 * @param $btn 按钮元素
	 * @param eventDetails 事件配置，由popsHandler.handleEventDetails创建的
	 * @param callback 点击回调
	 */
	handleClickEvent(
		type: "cancel" | "close" | "ok" | "other",
		$btn: HTMLElement,
		eventDetails: PopsEventDetails,
		callback: (
			details: PopsHandlerEventDetails,
			event: PointerEvent | MouseEvent
		) => void
	) {
		popsDOMUtils.on<PointerEvent | MouseEvent>(
			$btn,
			"click",
			(event) => {
				let extraParam = {
					type: type,
				};
				callback(Object.assign(eventDetails, extraParam), event);
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 全局监听键盘事件
	 * @param keyName 键名|键值
	 * @param otherKeyList 组合按键，数组类型，包含ctrl、shift、alt和meta（win键或mac的cmd键）
	 * @param callback 回调函数
	 */
	handleKeyboardEvent(
		keyName: string | number,
		otherKeyList: string[] = [],
		callback: (event: KeyboardEvent) => void
	) {
		let keyboardEvent = function (event: KeyboardEvent) {
			let _keyName = event.code || event.key;
			let _keyValue = event.charCode || event.keyCode || event.which;
			if (otherKeyList.includes("ctrl") && !event.ctrlKey) {
				return;
			}
			if (otherKeyList.includes("alt") && !event.altKey) {
				return;
			}
			if (otherKeyList.includes("meta") && !event.metaKey) {
				return;
			}
			if (otherKeyList.includes("shift") && !event.shiftKey) {
				return;
			}
			if (typeof keyName === "string" && keyName === _keyName) {
				callback && callback(event);
			} else if (typeof keyName === "number" && keyName === _keyValue) {
				callback && callback(event);
			}
		};
		popsDOMUtils.on(PopsCore.globalThis, "keydown", keyboardEvent, {
			capture: true,
		});
		return {
			removeKeyboardEvent() {
				popsDOMUtils.off(globalThis, "keydown", keyboardEvent, {
					capture: true,
				});
			},
		};
	},
	/**
	 * 处理prompt的点击事件
	 * @param type 触发事件类型
	 * @param inputElement 输入框
	 * @param  $btn 按钮元素
	 * @param eventDetails 事件配置，由popsHandler.handleEventDetails创建的
	 * @param callback 点击回调
	 */
	handlePromptClickEvent(
		type: "ok" | "close" | "cancel" | "other",
		inputElement: HTMLInputElement | HTMLTextAreaElement,
		$btn: HTMLElement,
		eventDetails: PopsEventDetails,
		callback: (
			details: PopsEventDetails & {
				type: any;
				text: string;
			},
			event: MouseEvent | PointerEvent
		) => void
	) {
		popsDOMUtils.on<MouseEvent | PointerEvent>(
			$btn,
			"click",
			(event) => {
				// 额外参数
				let extraParam = {
					type: type,
					text: inputElement.value,
				};
				callback(Object.assign(eventDetails, extraParam), event);
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 把配置的z-index配置转为数字
	 * @param zIndex
	 */
	handleZIndex(zIndex: number | (() => number)): number {
		if (typeof zIndex === "function") {
			return zIndex();
		} else {
			return zIndex;
		}
	},
	/**
	 * 处理config.only
	 * @param type 当前弹窗类型
	 * @param config 配置
	 */
	handleOnly<T extends Required<PopsAllDetails[keyof PopsAllDetails]>>(
		type: PopsMode,
		config: T
	): T {
		if (config.only) {
			if (
				type === "loading" ||
				type === "tooltip" ||
				type === "rightClickMenu"
			) {
				let layer = pops.config.layer[type as keyof typeof pops.config.layer];
				if (layer) {
					PopsInstanceUtils.removeInstance([layer], "", true);
				}
			} else {
				PopsInstanceUtils.removeInstance(
					[
						pops.config.layer.alert,
						pops.config.layer.confirm,
						pops.config.layer.prompt,
						pops.config.layer.iframe,
						pops.config.layer.drawer,
						pops.config.layer.folder,
						pops.config.layer.panel,
					],
					"",
					true
				);
			}
		} else {
			// 对配置进行处理
			// 选择配置的z-index和已有的pops实例的最大z-index值
			let originZIndex = config.zIndex;
			config.zIndex = () => {
				const { zIndex: maxZIndex } = PopsInstanceUtils.getPopsMaxZIndex(
					PopsHandler.handleZIndex(originZIndex) + 100
				);
				return maxZIndex;
			};
		}
		return config;
	},
	/**
	 * 处理把已创建的元素保存到内部环境中
	 * @param type 当前弹窗类型
	 * @param value
	 */
	handlePush(type: PopsLayerMode, value: PopsLayerCommonConfig) {
		pops.config.layer[type].push(value);
	},
};

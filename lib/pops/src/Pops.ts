import { popsDOMUtils } from "./utils/PopsDOMUtils";
import { PopsInstanceUtils } from "./utils/PopsInstanceUtils";
import { popsUtils } from "./utils/PopsUtils";
import indexCSS from "./css/index.css";
import ninePalaceGridPositionCSS from "./css/ninePalaceGridPosition.css";
import scrollbarCSS from "./css/scrollbar.css";
import buttonCSS from "./css/button.css";
import commonCSS from "./css/common.css";
import animCSS from "./css/animation.css";
import alertCSS from "./components/alert/index.css";
import confirmCSS from "./components/confirm/index.css";
import promptCSS from "./components/prompt/index.css";
import loadingCSS from "./components/loading/index.css";
import iframeCSS from "./components/iframe/index.css";
import tooltipCSS from "./components/tooltip/index.css";
import drawerCSS from "./components/drawer/index.css";
import folderCSS from "./components/folder/index.css";
import panelCSS from "./components/panel/index.css";
import rightClickMenuCSS from "./components/rightClickMenu/index.css";
import SVG_min from "./svg/min.svg";
import SVG_mise from "./svg/mise.svg";
import SVG_max from "./svg/max.svg";
import SVG_close from "./svg/close.svg";
import SVG_edit from "./svg/edit.svg";
import SVG_share from "./svg/share.svg";
import SVG_delete from "./svg/delete.svg";
import SVG_search from "./svg/search.svg";
import SVG_upload from "./svg/upload.svg";
import SVG_loading from "./svg/loading.svg";
import SVG_next from "./svg/next.svg";
import SVG_prev from "./svg/prev.svg";
import SVG_eleme from "./svg/eleme.svg";
import SVG_elemePlus from "./svg/elemePlus.svg";
import SVG_chromeFilled from "./svg/chromeFilled.svg";
import SVG_cpu from "./svg/cpu.svg";
import SVG_videoPlay from "./svg/videoPlay.svg";
import SVG_videoPause from "./svg/videoPause.svg";
import SVG_headset from "./svg/headset.svg";
import SVG_monitor from "./svg/monitor.svg";
import SVG_documentCopy from "./svg/documentCopy.svg";
import SVG_picture from "./svg/picture.svg";
import SVG_circleClose from "./svg/circleClose.svg";
import SVG_view from "./svg/view.svg";
import SVG_hide from "./svg/hide.svg";
import SVG_keyboard from "./svg/keyboard.svg";
import SVG_arrowRight from "./svg/arrowRight.svg";
import SVG_arrowLeft from "./svg/arrowLeft.svg";
import { PopsCore } from "./Core";
import { PopsLayerMode } from "./types/main";
import { PopsAlert } from "./components/alert";
import type { PopsAlertDetails } from "./components/alert/indexType";
import { PopsConfirm } from "./components/confirm";
import type { PopsConfirmDetails } from "./components/confirm/indexType";
import type { PopsLayerCommonConfig } from "./types/layer";
import type { PopsPromptDetails } from "./components/prompt/indexType";
import { PopsPrompt } from "./components/prompt";
import type { PopsLoadingDetails } from "./components/loading/indexType";
import { PopsLoading } from "./components/loading";
import type { PopsIframeDetails } from "./components/iframe/indexType";
import { PopsIframe } from "./components/iframe";
import type { PopsToolTipDetails } from "./components/tooltip/indexType";
import { PopsDrawer } from "./components/drawer";
import type { PopsDrawerDetails } from "./components/drawer/indexType";
import type { PopsFolderDetails } from "./components/folder/indexType";
import { PopsFolder } from "./components/folder";
import type { PopsPanelDetails } from "./components/panel/indexType";
import { PopsPanel } from "./components/panel";
import { PopsRightClickMenu } from "./components/rightClickMenu";
import type { PopsRightClickMenuDetails } from "./components/rightClickMenu/indexType";
import type { PopsIcon } from "./types/icon";
import type { PopsSearchSuggestionDetails } from "./components/searchSuggestion/indexType";
import { PopsSearchSuggestion } from "./components/searchSuggestion";
import { PopsMathFloatUtils } from "./utils/PopsMathUtils";
import { PanelHandleContentDetails } from "./components/panel/PanelHandleContentDetails";
import { GlobalConfig } from "./GlobalConfig";
import { PopsTooltip } from "./components/tooltip";
import { PopsSafeUtils } from "./utils/PopsSafeUtils";

class Pops {
	/** 配置 */
	config = {
		/** 版本号 */
		version: "2025.5.26",
		cssText: {
			/** 主CSS */
			index: indexCSS,
			/** 九宫格位置CSS */
			ninePalaceGridPosition: ninePalaceGridPositionCSS,
			/** 滚动条CSS */
			scrollbar: scrollbarCSS,
			/** 按钮CSS */
			button: buttonCSS,
			/** 通用的CSS */
			common: commonCSS,
			/** 动画 */
			anim: animCSS,
			/** pops.alert */
			alertCSS: alertCSS,
			/** pops.cponfirm */
			confirmCSS: confirmCSS,
			/** pops.prompt */
			promptCSS: promptCSS,
			/** pops.loading */
			loadingCSS: loadingCSS,
			/** pops.iframe */
			iframeCSS: iframeCSS,
			/** pops.tooltip */
			tooltipCSS: tooltipCSS,
			/** pops.drawer */
			drawerCSS: drawerCSS,
			/** pops.folder */
			folderCSS: folderCSS,
			/** pops.folder */
			panelCSS: panelCSS,
			/** pops.rightClickMenu */
			rightClickMenu: rightClickMenuCSS,
		},
		/** icon图标的svg代码 */
		iconSVG: {
			min: SVG_min,
			mise: SVG_mise,
			max: SVG_max,
			close: SVG_close,
			edit: SVG_edit,
			share: SVG_share,
			delete: SVG_delete,
			search: SVG_search,
			upload: SVG_upload,
			loading: SVG_loading,
			next: SVG_next,
			prev: SVG_prev,
			eleme: SVG_eleme,
			elemePlus: SVG_elemePlus,
			chromeFilled: SVG_chromeFilled,
			cpu: SVG_cpu,
			videoPlay: SVG_videoPlay,
			videoPause: SVG_videoPause,
			headset: SVG_headset,
			monitor: SVG_monitor,
			documentCopy: SVG_documentCopy,
			picture: SVG_picture,
			circleClose: SVG_circleClose,
			view: SVG_view,
			hide: SVG_hide,
			keyboard: SVG_keyboard,
			arrowRight: SVG_arrowRight,
			arrowLeft: SVG_arrowLeft,
		} as {
			[key in PopsIcon]: string;
		},
		/** 当前已配置的动画@keyframes名字映射(初始化时生成) */
		animation: {} as {
			[key: string]: CSSKeyframesRule;
		},
		/** 是否初始化 */
		isInit: false,
		/** 存储已创建的元素 */
		layer: {
			alert: [],
			confirm: [],
			prompt: [],
			loading: [],
			iframe: [],
			tooltip: [],
			drawer: [],
			folder: [],
			panel: [],
			rightClickMenu: [],
		} as {
			[key in PopsLayerMode]: PopsLayerCommonConfig[];
		},
		/** 禁止滚动 */
		forbiddenScroll: {
			event(event: Event) {
				return popsDOMUtils.preventEvent(event);
			},
		},
		/** pops使用的工具类 */
		Utils: popsUtils,
		/** pops使用的DOM工具类 */
		DOMUtils: popsDOMUtils,
		/** pops创建的实例使用的工具类 */
		InstanceUtils: PopsInstanceUtils,
		/** pops处理float类型使用的工具类 */
		MathFloatUtils: PopsMathFloatUtils,
		/** pops.panel中用于处理各个类型的工具 */
		panelHandleContentUtils: PanelHandleContentDetails,
	};
	init() {
		if (!this.config.isInit) {
			/* 处理获取当前所有的动画名 */
			this.config.isInit = true;
			let animationStyle = document.createElement("style");
			PopsSafeUtils.setSafeHTML(animationStyle, this.config.cssText.anim);
			popsDOMUtils.appendHead(animationStyle);
			this.config.animation = null as any;
			this.config.animation = PopsInstanceUtils.getKeyFrames(
				animationStyle.sheet!
			);
			popsUtils.setTimeout(() => {
				animationStyle.remove();
			}, 50);
		}
	}
	/**
	 * 释放原有的pops控制权
	 * @example
	 * let pops = window.pops.noConflict()
	 */
	noConflict() {
		if (typeof (PopsCore.globalThis as any).pops === "object") {
			popsUtils.delete(PopsCore.globalThis, "pops");
		}
		if (
			typeof unsafeWindow === "object" &&
			unsafeWindow != null &&
			typeof (unsafeWindow as any).pops === "object"
		) {
			popsUtils.delete(unsafeWindow, "pops");
		}
		return new Pops();
	}
	/**
	 * 通过navigator.userAgent判断是否是手机访问
	 * @param userAgent
	 */
	isPhone(userAgent = PopsCore.globalThis.navigator.userAgent): boolean {
		return Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(userAgent));
	}
	/**
	 * 为所有弹窗设置全局属性
	 */
	GlobalConfig = GlobalConfig;
	/**
	 * 普通信息框
	 * @param details 配置
	 */
	alert = (details: PopsAlertDetails) => {
		let dialog = PopsAlert.init(details);
		return dialog;
	};

	/**
	 * 询问框
	 * @param details 配置
	 */
	confirm = (details: PopsConfirmDetails) => {
		let dialog = PopsConfirm.init(details);
		return dialog;
	};

	/**
	 * 输入框
	 * @param details 配置
	 */
	prompt = (details: PopsPromptDetails) => {
		let dialog = PopsPrompt.init(details);
		return dialog;
	};

	/**
	 * 加载层
	 * @param details 配置
	 */
	loading = (details: PopsLoadingDetails) => {
		let popsLoading = PopsLoading.init(details);
		return popsLoading;
	};

	/**
	 * iframe层
	 * @param details 配置
	 */
	iframe = (details: PopsIframeDetails) => {
		let dialog = PopsIframe.init(details);
		return dialog;
	};

	/**
	 * 提示框
	 * @param details 配置
	 */
	tooltip = (details: PopsToolTipDetails) => {
		let popsTooltip = PopsTooltip.init(details);
		return popsTooltip;
	};

	/**
	 * 抽屉
	 * @param details 配置
	 */
	drawer = (details: PopsDrawerDetails) => {
		let dialog = PopsDrawer.init(details);
		return dialog;
	};

	/**
	 * 文件夹
	 * @param details 配置
	 */
	folder = (details: PopsFolderDetails) => {
		let dialog = PopsFolder.init(details);
		return dialog;
	};

	/**
	 * 配置面板
	 * @param details 配置
	 */
	panel = (details: PopsPanelDetails) => {
		let dialog = PopsPanel.init(details);
		return dialog;
	};

	/**
	 * 右键菜单
	 * @param details 配置
	 */
	rightClickMenu = (details: PopsRightClickMenuDetails) => {
		let popsRightClickMenu = PopsRightClickMenu.init(details);
		return popsRightClickMenu;
	};

	/**
	 * 搜索建议
	 * @param details 配置
	 */
	searchSuggestion = <T = any>(details: PopsSearchSuggestionDetails<T>) => {
		let popsSearchSuggestion = PopsSearchSuggestion.init(details);
		return popsSearchSuggestion;
	};
}

const pops = new Pops();

export { pops };

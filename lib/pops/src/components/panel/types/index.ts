import type { PopsTitleConfig, PopsDragConfig, PopsCommonConfig } from "../../../types/components";
import type { PopsPanelFormsDetails } from "./components-forms";
import type { PopsPanelSwitchDetails } from "./components-switch";
import type { PopsPanelSliderDetails } from "./components-slider";
import type { PopsPanelInputDetails } from "./components-input";
import type { PopsPanelTextAreaDetails } from "./components-textarea";
import type { PopsPanelSelectDetails } from "./components-select";
import type { PopsPanelButtonDetails } from "./components-button";
import type { PopsPanelDeepMenuDetails } from "./components-deepMenu";
import type { PopsPanelOwnDetails } from "./components-own";
import type { PopsHeaderCloseButtonDetails } from "../../../types/button";
import { PopsPanelSelectMultipleDetails } from "./components-selectMultiple";

/** panel的各种类型的配置项 */
export type PopsPanelFormsTotalDetails =
	| PopsPanelSwitchDetails
	| PopsPanelSliderDetails
	| PopsPanelInputDetails
	| PopsPanelTextAreaDetails
	| PopsPanelSelectDetails<any>
	| PopsPanelSelectMultipleDetails<any>
	| PopsPanelButtonDetails
	| PopsPanelDeepMenuDetails
	| PopsPanelOwnDetails;

/**
 * panel的内部事件
 */
export type PopsPanelEventType = {
	/**
	 * 该事件在右侧容器内的元素改变时触发
	 */
	"pops:renderRightContainer": {
		/**
		 * 菜单配置
		 */
		formConfig: PopsPanelContentConfig[] | PopsPanelDeepMenuDetails;
	};
};

/**
 * pops.panel的content配置信息
 */
export interface PopsPanelContentConfig {
	/**
	 * 元素属性id
	 */
	id: string;
	/**
	 * （可选）元素的className，值为空的话就不设置
	 * @default ""
	 */
	className?: string | string[];
	/**
	 * 左侧的标题，可以是html格式
	 */
	title: string | (() => string);
	/**
	 * （可选）中间顶部的标题，如果为空，则使用title的值代替
	 * @default title
	 */
	headerTitle?: string | (() => string);
	/**
	 * （可选）是否是默认的，指打开弹窗的先显示出来的内容，默认为首位第一个项，如果多个配置都设置了isDefault的值为true，那么只有第一个值生效
	 * @default false
	 */
	isDefault?: boolean | (() => boolean);
	/**
	 * （可选）是否是位于底部的
	 *
	 * 自上而下排序
	 * @default false
	 */
	isBottom?: boolean | (() => boolean);
	/**
	 * （可选）是否禁用左侧项的hover的CSS样式
	 */
	disableAsideItemHoverCSS?: boolean | (() => boolean);
	/**
	 * （可选）是否自动滚动到默认的项
	 * @default false
	 */
	scrollToDefaultView?: boolean;
	/**
	 * （可选）自定义元素属性.setAttribute、.getAttribute
	 */
	attributes?:
		| {
				[key: string]: any;
		  }
		| {
				[key: string]: any;
		  }[];
	/**
	 * （可选）自定义元素内部的属性值
	 */
	props?: {
		[K in keyof HTMLElement]?: HTMLElement[K];
	};
	/**
	 * 子配置
	 */
	forms: (PopsPanelFormsDetails | PopsPanelFormsTotalDetails)[];
	/**
	 * 左侧容器的点击回调（点击后第一个触发该回调）
	 * @returns
	 * + false 阻止默认行为
	 */
	clickFirstCallback?: (
		event: MouseEvent | PointerEvent,
		rightHeaderElement: HTMLUListElement,
		rightContainerElement: HTMLUListElement
	) => void | boolean | Promise<void | boolean>;
	/**
	 * 左侧容器的点击回调
	 * @returns
	 * + false 阻止默认进入菜单详情
	 */
	clickCallback?: (
		event: MouseEvent | PointerEvent,
		rightHeaderElement: HTMLUListElement,
		rightContainerElement: HTMLUListElement
	) => void | boolean | Promise<void | boolean>;
	/**
	 * 左侧项添加到panel后的回调
	 */
	afterRender?: (
		/**
		 * 配置
		 */
		data: {
			/** 容器配置 */
			asideConfig: PopsPanelContentConfig;
			/** 左侧容器的元素 */
			$asideLiElement: HTMLLIElement;
		}
	) => void;
}

/**
 * pops.panel
 */
export interface PopsPanelDetails extends PopsTitleConfig, PopsDragConfig, PopsCommonConfig {
	/**
	 * 内容配置
	 */
	content: PopsPanelContentConfig[];
	/**
	 * 右上角的按钮配置
	 */
	btn?: {
		/**
		 * 关闭按钮
		 */
		close?: PopsHeaderCloseButtonDetails;
	};
	/**
	 * 移动端适配的的className
	 *
	 * @default "pops-panel-is-mobile"
	 */
	mobileClassName?: string;
	/**
	 * 是否强制是移动端，默认false
	 * + true 强制为移动端
	 * + false 自动根据UA判断是否是移动端
	 * @default false
	 */
	isMobile?: boolean;
}

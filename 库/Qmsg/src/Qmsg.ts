import { CompatibleProcessing } from "./CompatibleProcessing";
import { QmsgStore } from "./QmsgStore";
import { QmsgIcon } from "./QmsgIcon";
import { QmsgObj } from "./QmsgInstance";
import { QmsgMsg } from "./QmsgMsg";
import { QmsgUtils } from "./QmsgUtils";

export type QmsgPosition =
	| "topleft"
	| "top"
	| "topright"
	| "left"
	| "center"
	| "right"
	| "bottomleft"
	| "bottom"
	| "bottomright";

export type QmsgType = "info" | "warning" | "success" | "error" | "loading";

export type QmsgLimitWidthWrap = "no-wrap" | "wrap" | "ellipsis";

export interface QmsgOption {
	/**
	 * 是否使用动画
	 * + 默认：true
	 */
	animation?: boolean;
	/**
	 * 是否自动关闭，注意在type为loading的时候自动关闭为false
	 * + 默认：true
	 */
	autoClose?: boolean;
	/**
	 * 显示的内容
	 */
	content?: string;
	/**
	 * 内容是否是html
	 * + 默认：false
	 * @deprecated 建议使用isHTML
	 */
	html?: boolean;
	/**
	 * 内容是否是html
	 * + 默认：false
	 */
	isHTML?: boolean;
	/**
	 * 弹出的位置
	 * + 默认：center
	 */
	position?: QmsgPosition;
	/**
	 * 是否显示关闭图标
	 * + 默认：false
	 */
	showClose?: boolean;
	/**
	 * 最大显示的数量
	 * + 默认：5
	 */
	maxNums?: number;
	/**
	 * 关闭时的回调函数
	 */
	onClose?: (<T extends QmsgMsg>(this: T) => void) | null;
	/**
	 * 是否显示左边的icon图标
	 * + 默认：true
	 */
	showIcon?: boolean;
	/**
	 * 是否使内容进行换行显示
	 * + 默认：false
	 */
	showMoreContent?: boolean;
	/**
	 * 弹出顺序是否逆反
	 * + 默认：false
	 */
	showReverse?: boolean;
	/**
	 * 最大显示的时长(ms)
	 * + 默认：2500
	 */
	timeout?: number;
	/**
	 * 弹出类型
	 */
	type: QmsgType;
	/**
	 * 元素层级
	 * + 默认：50000
	 */
	zIndex?: number | (() => number);
	/**
	 * 自定义的style
	 */
	style?: string;
	/**
	 * 自定义类名
	 */
	customClass?: string;
	/**
	 * 是否限制宽度
	 * + 默认：false
	 */
	isLimitWidth?: boolean;
	/**
	 * 限制宽度的数值
	 * + 默认：200
	 */
	limitWidthNum?: number | string;
	/**
	 * 当超出限制宽度时，是否换行还是显示为省略号
	 * + 默认："wrap"
	 */
	limitWidthWrap?: "no-wrap" | "wrap" | "ellipsis";
}

export interface QmsgDetails extends Partial<QmsgOption> {}

/* 执行兼容 */
CompatibleProcessing();

class Qmsg {
	/** 版本号 */
	#version: string;
	/** 数据 */
	#data: typeof QmsgStore;
	/** 图标svg */
	#icons: typeof QmsgIcon;
	/** 每个Qmsg实例 */
	#obj: typeof QmsgObj;
	constructor() {
		this.#version = "2024.6.10";
		this.#data = QmsgStore;
		this.#icons = QmsgIcon;
		this.#obj = QmsgObj;
	}
	/**
	 * 修改默认配置
	 * @param option
	 */
	config(option?: QmsgDetails) {
		if (option == null) return;
		if (typeof option !== "object") return;
		(QmsgStore.INS_DEFAULT as any) = null;
		(QmsgStore.INS_DEFAULT as any) = option;
	}
	/**
	 * 信息Toast
	 * @param content 内容
	 */
	info(content: any): QmsgMsg;
	/**
	 * 信息Toast
	 * @param option 配置
	 */
	info(option: QmsgDetails): QmsgMsg;
	/**
	 * 信息Toast
	 * @param content 内容
	 * @param option 配置
	 */
	info(content: any, option: QmsgDetails): QmsgMsg;
	info(content: any, option?: QmsgDetails): QmsgMsg {
		let params = QmsgUtils.mergeArgs(content, option);
		params.type = "info";
		return QmsgUtils.judgeReMsg.call(this, params);
	}
	/**
	 * 警告Toast
	 * @param content 内容
	 */
	warning(content: any): QmsgMsg;
	/**
	 * 警告Toast
	 * @param option 配置
	 */
	warning(option: QmsgDetails): QmsgMsg;
	/**
	 * 警告Toast
	 * @param content 内容
	 * @param option 配置
	 */
	warning(content: any, option: QmsgDetails): QmsgMsg;
	warning(content: any, option?: QmsgDetails): QmsgMsg {
		let params = QmsgUtils.mergeArgs(content, option);
		params.type = "warning";
		return QmsgUtils.judgeReMsg.call(this, params);
	}
	/**
	 * 成功Toast
	 * @param content 内容
	 */
	success(content: any): QmsgMsg;
	/**
	 * 成功Toast
	 * @param option 配置
	 */
	success(option: QmsgDetails): QmsgMsg;
	/**
	 * 成功Toast
	 * @param content 内容
	 * @param option 配置
	 */
	success(content: any, option: QmsgDetails): QmsgMsg;
	success(content: any, option?: QmsgDetails) {
		let params = QmsgUtils.mergeArgs(content, option);
		params.type = "success";
		return QmsgUtils.judgeReMsg.call(this, params);
	}
	/**
	 * 失败Toast
	 * @param content 内容
	 */
	error(content: any): QmsgMsg;
	/**
	 * 失败Toast
	 * @param option 配置
	 */
	error(option: QmsgDetails): QmsgMsg;
	/**
	 * 失败Toast
	 * @param content 内容
	 * @param option 配置
	 */
	error(content: any, option: QmsgDetails): QmsgMsg;
	error(content: any, option?: QmsgDetails) {
		let params = QmsgUtils.mergeArgs(content, option);
		params.type = "error";
		return QmsgUtils.judgeReMsg.call(this, params);
	}
	/**
	 * 加载中Toast
	 * @param content 内容
	 */
	loading(content: any): QmsgMsg;
	/**
	 * 加载中Toast
	 * @param config 配置
	 */
	loading(config: QmsgDetails): QmsgMsg;
	/**
	 * 加载中Toast
	 * @param content 内容
	 * @param config 配置
	 * @returns
	 */
	loading(content: any, config: QmsgDetails): QmsgMsg;
	loading(content: any, config?: QmsgDetails): QmsgMsg {
		let params = QmsgUtils.mergeArgs(content, config);
		params.type = "loading";
		params.autoClose = false;
		return QmsgUtils.judgeReMsg.call(this, params);
	}
	/**
	 * 根据uuid删除Qmsg实例和元素
	 * @param uuid
	 */

	remove(uuid: string) {
		QmsgObj.remove(uuid);
	}
	/**
	 * 关闭当前Qmsg创建的所有的实例
	 */
	closeAll() {
		for (let index = QmsgObj.QmsgList.length - 1; index >= 0; index--) {
			let item = QmsgObj.QmsgList[index];
			item && item.instance && item.instance.close();
		}
	}
}

let qmsg = new Qmsg();

export { qmsg as Qmsg };

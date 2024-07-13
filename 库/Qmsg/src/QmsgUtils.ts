import { QmsgOption } from "./Qmsg";
import { QmsgConfig } from "./QmsgConfig";
import { QmsgInstanceStorage } from "./QmsgInstanceStorage";
import { QmsgMsg } from "./QmsgInstance";

export interface QmsgItemInfo {
	config: string;
	instance: QmsgMsg;
	uuid: string;
}

export const QmsgUtils = {
	/**
	 * 生成带插件名的名称
	 * @param args
	 * @returns
	 */
	getNameSpacify(...args: string[]) {
		let result = QmsgConfig.NAMESPACE;
		for (let index = 0; index < args.length; ++index) {
			result += "-" + args[index];
		}
		return result;
	},
	/**
	 * 判断字符是否是数字
	 * @param text 需要判断的字符串
	 */
	isNumber(text: string) {
		let isNumberPattern = /^\d+$/;
		return isNumberPattern.test(text);
	},
	/**
	 * 获取唯一性的UUID
	 * @returns
	 */
	getUUID() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (value) {
				let randValue = (Math.random() * 16) | 0,
					newValue = value == "x" ? randValue : (randValue & 0x3) | 0x8;
				return newValue.toString(16);
			}
		);
	},
	/**
	 * 合并参数为配置信息，用于创建Msg实例
	 * @param content 文本内容
	 * @param config 配置
	 * @private
	 */
	mergeArgs(content = "", config?: object) {
		let opts = {} as QmsgOption;
		if (arguments.length === 0) {
			return opts;
		}
		if (typeof content === "object") {
			return Object.assign(opts, content);
		} else {
			opts.content = content.toString();
		}
		if (typeof config === "object") {
			return Object.assign(opts, config);
		}
		return opts;
	},

	/**
	 * 通过配置信息 来判断是否为同一条消息,并返回消息实例
	 * @param option 配置项
	 * @private
	 */
	judgeReMsg(option: QmsgOption) {
		option = option || {};
		let optionString = JSON.stringify(option);
		/* 寻找已生成的实例是否存在配置相同的 */
		let findQmsgItemInfo = QmsgInstanceStorage.QmsgList.find((item) => {
			return item.config === optionString;
		});
		let QmsgInstance = findQmsgItemInfo?.instance;
		if (QmsgInstance == null) {
			/* 不存在，创建个新的 */
			let uuid = QmsgUtils.getUUID();
			let QmsgItemInfo = <QmsgItemInfo>{
				uuid: uuid,
				config: optionString,
				instance: new QmsgMsg(option, uuid),
			};
			QmsgInstanceStorage.QmsgList.push(QmsgItemInfo);
			let QmsgListLength = QmsgInstanceStorage.QmsgList.length;
			let maxNums = QmsgItemInfo.instance.getSetting().maxNums;
			/**
			 * 关闭多余的消息
			 */
			if (QmsgListLength > maxNums) {
				for (let index = 0; index < QmsgListLength - maxNums; index++) {
					let item = QmsgInstanceStorage.QmsgList[index];
					item && item.instance.getSetting().autoClose && item.instance.close();
				}
			}
			findQmsgItemInfo = QmsgItemInfo;
			QmsgInstance = QmsgItemInfo.instance;
		} else {
			if (!QmsgInstance.getRepeatNum()) {
				QmsgInstance.setRepeatNum(2);
			} else {
				if (QmsgInstance.getRepeatNum() >= 99) {
					/* pass */
				} else {
					QmsgInstance.setRepeatNumIncreasing();
				}
			}
			QmsgInstance.setMsgCount();
		}
		if (QmsgInstance) {
			QmsgInstance.$Qmsg.setAttribute(
				"data-count",
				QmsgInstance?.getRepeatNum().toString()
			);
		} else {
			throw new TypeError("QmsgInstance is null");
		}

		return QmsgInstance;
	},
	/**
	 * 转换为动态对象
	 * @param obj 需要配置的对象
	 * @param other_obj 获取的其它对象
	 * @returns
	 */
	toDynamicObject(obj: any, ...other_objs: any[]) {
		let __obj__ = Object.assign({}, obj);
		Object.keys(__obj__).forEach((keyName) => {
			let objValue = __obj__[keyName];
			Object.defineProperty(__obj__, keyName, {
				get() {
					let findIndex = other_objs.findIndex((other_obj) => {
						// 判断其他对象中是否有该属性
						return other_obj.hasOwnProperty.call(other_obj, keyName);
					});
					if (findIndex !== -1) {
						return other_objs[findIndex][keyName];
					} else {
						return objValue;
					}
				},
				set(newValue) {
					objValue = newValue;
				},
			});
		});
		return __obj__;
	},
};

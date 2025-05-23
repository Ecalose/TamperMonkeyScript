import { $, DOMUtils, httpx, log, utils } from "@/env";
import { NetDiskParse } from "../parse/NetDiskParse";
import Qmsg from "qmsg";
import { NetDiskAutoFillAccessCode } from "../auto-fill-accesscode/NetDiskAutoFillAccessCode";
import { NetDiskFilterScheme } from "../scheme/NetDiskFilterScheme";
import { NetDiskRuleData } from "../data/NetDiskRuleData";
import { NetDisk } from "../NetDisk";
import { NetDiskRuleUtils } from "../rule/NetDiskRuleUtils";
import { NetDiskHandlerUtil } from "@/utils/NetDiskHandlerUtil";
import { GM_openInTab } from "ViteGM";

/** 点击动作 */
export type NetDiskRuleSettingConfigurationInterface_linkClickMode =
	| "copy"
	| "openBlank"
	| "parseFile"
	| "copy-closePopup"
	| "openBlank-closePopup"
	| "parseFile-closePopup"
	| "own";

export const NetDiskLinkClickModeUtils = {
	/**
	 * 获取用于跳转的url
	 * @param netDiskName
	 * @param netDiskIndex
	 * @param shareCode
	 * @param accessCode
	 */
	getBlankUrl(
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string
	) {
		let regularOption = NetDisk.$rule.matchRule[netDiskName][netDiskIndex];
		let blankUrl = regularOption.blank;
		if (shareCode) {
			blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, {
				shareCode: shareCode,
			});
		}
		if (accessCode && accessCode !== "") {
			blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, {
				accessCode: accessCode,
			});
		} else {
			blankUrl = NetDiskHandlerUtil.replaceText(
				blankUrl,
				NetDisk.$extraRule.noAccessCodeRegExp,
				""
			);
		}
		/**
		 * 当前字典
		 */
		let currentDict = NetDisk.$match.matchedInfo
			.get(netDiskName)
			.get(shareCode);
		if (regularOption.paramMatch) {
			let paramMatchArray = currentDict.matchText.match(
				regularOption.paramMatch
			)!;
			let replaceParamData: {
				[key: string]: string;
			} = {};
			for (let index = 0; index < paramMatchArray.length; index++) {
				replaceParamData[`$${index}`] = paramMatchArray[index];
			}
			blankUrl = NetDiskRuleUtils.replaceParam(blankUrl, replaceParamData);
		}
		return blankUrl;
	},
	/**
	 * 获取用于复制到剪贴板的网盘信息
	 * @param netDiskName
	 * @param netDiskIndex
	 * @param shareCode
	 * @param accessCode
	 */
	getCopyUrlInfo(
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string
	) {
		let regularOption = NetDisk.$rule.matchRule[netDiskName][netDiskIndex];
		let copyUrl = regularOption["copyUrl"];
		if (shareCode) {
			copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, {
				shareCode: shareCode,
			});
		}
		if (accessCode && accessCode !== "") {
			copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, {
				accessCode: accessCode,
			});
		} else {
			copyUrl = NetDiskHandlerUtil.replaceText(
				copyUrl,
				NetDisk.$extraRule.noAccessCodeRegExp,
				""
			);
		}
		/**
		 * 当前字典
		 */
		let currentDict = NetDisk.$match.matchedInfo
			.get(netDiskName)
			.get(shareCode);
		if (regularOption.paramMatch) {
			let paramMatchArray = currentDict.matchText.match(
				regularOption.paramMatch
			)!;
			let replaceParamData: {
				[key: string]: string;
			} = {};
			for (let index = 0; index < paramMatchArray.length; index++) {
				replaceParamData[`$${index}`] = paramMatchArray[index];
			}
			copyUrl = NetDiskRuleUtils.replaceParam(copyUrl, replaceParamData);
		}
		return copyUrl;
	},
};

/** 链接点击动作 */
export const NetDiskLinkClickMode = {
	/**
	 * 复制到剪贴板
	 * @param netDiskName 网盘名
	 * @param netDiskIndex 网盘索引
	 * @param shareCode 分享码
	 * @param accessCode 提取码
	 * @param toastText 复制成功的提示的文字
	 */
	copy(
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string,
		toastText: string = "已复制"
	) {
		utils
			.setClip(
				NetDiskLinkClickModeUtils.getCopyUrlInfo(
					netDiskName,
					netDiskIndex,
					shareCode,
					accessCode
				)
			)
			.then((status) => {
				if (status) {
					Qmsg.success(toastText);
				} else {
					Qmsg.error("执行复制失败");
				}
			})
			.catch(() => {
				Qmsg.error("执行复制失败");
			});
	},
	/**
	 * 网盘链接解析
	 * @param netDiskName 网盘名称
	 * @param netDiskIndex 网盘名称索引下标
	 * @param shareCode 分享码
	 * @param accessCode 提取码
	 */
	async parseFile(
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string
	) {
		// Qmsg.info("正在获取直链");
		if (
			NetDiskParse.netDisk[netDiskName as keyof typeof NetDiskParse.netDisk]
		) {
			let parseObj = new NetDiskParse.netDisk[
				netDiskName as keyof typeof NetDiskParse.netDisk
			]();
			await parseObj.init(netDiskIndex, shareCode, accessCode);
		} else {
			log.error(`${netDiskName} 未配置解析函数`);
			Qmsg.error("该链接未配置解析函数");
		}
	},
	/**
	 * 新标签页打开
	 * @param url 跳转的网址
	 * @param netDiskName 网盘名称
	 * @param netDiskIndex 网盘索引
	 * @param shareCode 分享码
	 * @param accessCode 提取码
	 * @param isOpenInBackEnd 是否使用后台打开，默认false
	 */
	openBlankUrl(
		url: string,
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string,
		isOpenInBackEnd: boolean = false
	) {
		log.success(
			`新标签页打开${isOpenInBackEnd ? "（后台打开）" : ""}`,
			arguments
		);
		if (NetDiskAutoFillAccessCode.$data.enable) {
			NetDiskAutoFillAccessCode.addValue({
				url: url,
				netDiskName: netDiskName,
				netDiskIndex: netDiskIndex,
				shareCode: shareCode,
				accessCode: accessCode,
				time: Date.now(),
			});
		}
		if (NetDiskFilterScheme.isForwardBlankLink(netDiskName)) {
			url = NetDiskFilterScheme.parseDataToSchemeUri(netDiskName, url);
		}
		/* 百度网盘会拒绝referrer不安全访问 */
		$("meta[name='referrer']")?.setAttribute("content", "no-referrer");

		/**
		 * 新标签页打开链接
		 */
		let openUrl = () => {
			if (isOpenInBackEnd) {
				// 后台打开
				GM_openInTab(url, {
					active: false,
				});
			} else {
				// 新标签页打开（自动获取焦点）
				try {
					let blankWindow = window.open(url, "_blank");
					if (blankWindow) {
						blankWindow.focus();
					}
				} catch (error) {
					log.error(error, url);
					let $blank = DOMUtils.createElement("a");
					$blank.setAttribute("href", url);
					$blank.setAttribute("target", "_blank");
					$blank.click();
					$blank.remove();
				}
			}
		};
		if (
			utils.isNotNull(accessCode) &&
			NetDiskRuleData.linkClickMode_openBlank.openBlankWithCopyAccessCode(
				netDiskName
			)
		) {
			/* 等待复制完毕再跳转 */
			utils.setClip(accessCode).then(() => {
				openUrl();
			});
		} else {
			openUrl();
		}
	},
	/**
	 * 将链接转为Scheme格式并打开
	 * @param netDiskName 网盘名称
	 * @param netDiskIndex 网盘名称索引下标
	 * @param shareCode
	 * @param accessCode
	 */
	openBlankWithScheme(
		netDiskName: string,
		netDiskIndex: number,
		shareCode: string,
		accessCode: string
	) {
		log.success("scheme新标签页打开", arguments);
		let url = NetDiskLinkClickModeUtils.getBlankUrl(
			netDiskName,
			netDiskIndex,
			shareCode,
			accessCode
		);
		url = NetDiskFilterScheme.parseDataToSchemeUri(netDiskName, url);
		window.open(url, "_blank");
	},
};

import { log } from "@/env";
import Qmsg from "qmsg";
import { GM_getValue } from "ViteGM";
import { NetDisk } from "../NetDisk";
import { NetDiskParse } from "./NetDiskParse";
import { NetDiskParseObject } from "./NetDiskParseObject";
import { NetDiskLinkClickMode } from "../link-click-mode/NetDiskLinkClickMode";
import { NetDiskRuleUtils } from "../rule/NetDiskRuleUtils";

export class NetDiskParse_Baidu extends NetDiskParseObject {
	/**
	 * 入口
	 * @param {number} netDiskIndex 网盘名称索引下标
	 * @param {string} shareCode
	 * @param {string} accessCode
	 */
	init(netDiskIndex: number, shareCode: string, accessCode: string) {
		log.info([netDiskIndex, shareCode, accessCode]);
		this.netDiskIndex = netDiskIndex;
		this.shareCode = shareCode;
		this.accessCode = accessCode;
		let url = GM_getValue<string>("baidu-baiduwp-php-url");
		let postForm = GM_getValue<string>("baidu-baiduwp-php-post-form");
		let enableCopy = GM_getValue<boolean>("baidu-baiduwp-php-copy-url");
		if (!url) {
			Qmsg.error("请先在设置中配置百度网盘-网址");
			return void 0;
		}
		if (!postForm) {
			Qmsg.error("请先在设置中配置百度网盘-表单参数");
			return void 0;
		}
		postForm = NetDiskRuleUtils.replaceParam(postForm, {
			shareCode: shareCode,
			accessCode: accessCode,
		});
		let formElement = document.createElement("form");
		/* POST的表单数据 */
		let formData: {
			[key: string]: string;
		} = {};
		let urlParams = new URLSearchParams(postForm);
		/* 解析网址 */
		formElement.action = url;
		formElement.method = "post";
		formElement.style.display = "none";
		formElement.target = "_blank";
		// @ts-ignore
		for (let [key, value] of urlParams) {
			let textAreaElement = document.createElement("textarea");
			textAreaElement.name = key;
			textAreaElement.value = value;
			formElement.appendChild(textAreaElement);
			formData[key] = value;
		}
		log.info(["表单数据", formData]);
		document.body.appendChild(formElement);
		log.info(["访问网址", url]);
		if (enableCopy) {
			NetDiskLinkClickMode.copy(
				"baidu",
				netDiskIndex,
				shareCode,
				accessCode,
				"1.5秒后跳转至解析站"
			);
			setTimeout(() => {
				formElement.submit();
			}, 1500);
		} else {
			formElement.submit();
		}
	}
}

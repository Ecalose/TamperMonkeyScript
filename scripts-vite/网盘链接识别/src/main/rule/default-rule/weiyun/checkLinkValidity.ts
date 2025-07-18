import { httpx, utils } from "@/env";
import {
	NetDiskCheckLinkValidity,
	NetDiskCheckLinkValidityRequestOption,
} from "../../../check-valid/NetDiskCheckLinkValidity";
import { NetDiskLinkClickModeUtils } from "../../../link-click-mode/NetDiskLinkClickMode";

export const NetDiskCheckLinkValidity_weiyun: NetDiskCheckLinkValidityEntranceInstance =
	{
		async init(netDiskInfo) {
			const { ruleIndex, shareCode, accessCode } = netDiskInfo;
			let url = NetDiskLinkClickModeUtils.getBlankUrl({
				ruleKeyName: "weiyun",
				ruleIndex,
				shareCode,
				accessCode,
			});
			let response = await httpx.get(url, {
				headers: {
					"User-Agent": utils.getRandomPCUA(),
					Host: "share.weiyun.com",
					Origin: "https://share.weiyun.com",
					Referer: url,
				},
				...NetDiskCheckLinkValidityRequestOption,
			});

			if (!response.status && utils.isNull(response.data.responseText)) {
				return {
					...NetDiskCheckLinkValidity.status.networkError,
					data: response,
				};
			}
			let responseText = response.data.responseText;
			if (
				responseText.includes("已删除") ||
				responseText.includes("已被删除") ||
				responseText.includes("已经删除") ||
				responseText.includes("违反相关法规") ||
				responseText.includes("已过期") ||
				responseText.includes("目录无效")
			) {
				return {
					...NetDiskCheckLinkValidity.status.failed,
					data: response,
				};
			}
			if (
				responseText.includes('"need_pwd":1') ||
				(responseText.includes('"pwd":"') && !responseText.includes('"pwd":""'))
			) {
				return {
					...NetDiskCheckLinkValidity.status.needAccessCode,
					data: response,
				};
			}
			return {
				...NetDiskCheckLinkValidity.status.success,
				data: response,
			};
		},
	};

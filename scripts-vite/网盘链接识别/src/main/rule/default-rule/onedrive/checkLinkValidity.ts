import { DOMUtils, httpx, utils } from "@/env";
import {
	NetDiskCheckLinkValidity,
	NetDiskCheckLinkValidityRequestOption,
} from "../../../check-valid/NetDiskCheckLinkValidity";
import { NetDiskLinkClickModeUtils } from "../../../link-click-mode/NetDiskLinkClickMode";

export const NetDiskCheckLinkValidity_onedrive: NetDiskCheckLinkValidityEntranceInstance =
	{
		async init(netDiskInfo) {
			const { ruleIndex, shareCode, accessCode } = netDiskInfo;
			let url = NetDiskLinkClickModeUtils.getBlankUrl({
				ruleKeyName: "onedrive",
				ruleIndex,
				shareCode,
				accessCode,
			});
			let urlObj = new URL(url);
			let response = await httpx.get(url, {
				headers: {
					"User-Agent": utils.getRandomPCUA(),
					Host: urlObj.hostname,
					Referer: url,
					Origin: urlObj.origin,
				},
				...NetDiskCheckLinkValidityRequestOption,
			});
			if (!response.status) {
				let status = response.data?.status?.toString();
				if (status === "429") {
					return {
						...NetDiskCheckLinkValidity.status.networkError,
						data: response,
					};
				} else if (status === "404") {
					return {
						...NetDiskCheckLinkValidity.status.failed,
						data: response,
					};
				}
				return {
					...NetDiskCheckLinkValidity.status.networkError,
					data: response,
				};
			}
			let responseText = response.data.responseText;
			if (utils.isNotNull(responseText)) {
				try {
					let respDOM = DOMUtils.parseHTML(responseText, true, true);
					let title = respDOM.querySelector("title")?.innerHTML;
					if (title?.includes("错误")) {
						return {
							...NetDiskCheckLinkValidity.status.failed,
							data: response,
						};
					}
				} catch (error) {}
			}
			return {
				...NetDiskCheckLinkValidity.status.success,
				data: response,
			};
		},
	};

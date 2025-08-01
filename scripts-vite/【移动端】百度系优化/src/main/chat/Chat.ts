import { DOMUtils, addStyle, log, utils } from "@/env";
import ChatShieldCSS from "./shield.css?raw";
import { Panel } from "@components/setting/panel";
import { CommonUtil } from "@components/utils/CommonUtil";

const BaiduChat = {
	init() {
		addStyle(ChatShieldCSS);
		log.info("插入CSS规则");
		DOMUtils.ready(() => {
			Panel.execMenuOnce("baidu_chat_remove_ai_mask", () => {
				this.removeAiMask();
			});
		});
	},
	/**
	 * 去除AI的遮罩
	 */
	removeAiMask() {
		log.info("去除AI的遮罩");
		CommonUtil.addBlockCSS(
			".bot-body .watermark",
			'#searchChatApp div[class^="watermark"]'
		);
		let lockFunc = new utils.LockFunction(function () {
			document
				.querySelectorAll<HTMLImageElement>("img[src*='style/wm_ai']")
				.forEach((imgElement) => {
					log.info("处理AI水印：" + imgElement.src);
					imgElement.src = imgElement.src.replace(/style\/wm_ai/g, "");
				});
		}, 400);
		utils.mutationObserver(document.body, {
			config: { subtree: true, childList: true },
			callback: lockFunc.run,
		});
	},
};
export { BaiduChat };

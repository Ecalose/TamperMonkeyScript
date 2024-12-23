import { log } from "@/env";
import { ShortCut, type ShortCutOption } from "@/utils/ShortCut";
import { DouYinLiveChatRoomBlock } from "./DouYinLiveBlock";
import { PopsPanel } from "@/setting/setting";

export const DouYinLiveShortCut = {
	shortCut: new ShortCut("live-short-cut"),
	$data: {
		blockChatRoom: false,
	},
	init() {
		this.shortCut.initGlobalKeyboardListener(this.getShortCutMap());
	},
	getShortCutMap(): ShortCutOption {
		return {
			"dy-live-block-chatroom": {
				target: "window",
				callback() {
					log.info("快捷键 ==> 【屏蔽】聊天室");
					let flag = PopsPanel.getValue<boolean>("live-shieldChatRoom");
					PopsPanel.setValue("live-shieldChatRoom", !flag);
				},
			},
			"dy-live-shieldGiftEffects": {
				target: "window",
				callback: () => {
					log.info("快捷键 ==> 【屏蔽】礼物特效");
					let flag = PopsPanel.getValue<boolean>("live-shieldGiftEffects");
					PopsPanel.setValue("live-shieldGiftEffects", !flag);
				},
			},
		};
	},
};

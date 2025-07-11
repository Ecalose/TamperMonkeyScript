import { $$, log } from "@/env";
import { ShortCut, type ShortCutOption } from "@components/utils/ShortCut";
import { Panel } from "@components/setting/panel";

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
					let flag = Panel.getValue<boolean>("live-shieldChatRoom");
					Panel.setValue("live-shieldChatRoom", !flag);
				},
			},
			"dy-live-shieldGiftEffects": {
				target: "window",
				callback: () => {
					log.info("快捷键 ==> 【屏蔽】礼物特效");
					let flag = Panel.getValue<boolean>("live-shieldGiftEffects");
					Panel.setValue("live-shieldGiftEffects", !flag);
				},
			},
			"dy-live-shortcut-changeVideoMuted": {
				target: "window",
				callback() {
					log.info(`触发快捷键 ==> 切换静音状态`);
					$$("video").forEach(($video) => {
						let muted = !$video.muted;
						log.success(`切换video标签的静音状态为 ${muted}`);
						$video.muted = muted;
					});
				},
			},
		};
	},
};

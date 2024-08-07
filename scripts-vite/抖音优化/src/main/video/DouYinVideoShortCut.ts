import { unsafeWindow } from "ViteGM";
import { log } from "@/env";
import { ShortCut, ShortCutOption } from "@/utils/ShortCut";
import { DouYinVideo, VideoRate } from "./DouYinVideo";

export const DouYinVideoShortcut = {
	shortCut: new ShortCut("video-short-cut"),
	$data: {
		rateMap: ["0.75", "1", "1.25", "1.5", "1.75", "2", "3"] as VideoRate[],
	},
	init() {
		this.shortCut.initGlobalKeyboardListener(this.getShortCutMap());
	},
	getShortCutMap(): ShortCutOption {
		return {
			"dy-video-rate-low": {
				target: "window",
				callback() {
					log.info("调用倍速 => 小");
					let currentRate =
						unsafeWindow.sessionStorage.getItem("player_playbackratio") ?? "1";
					let findIndex = DouYinVideoShortcut.$data.rateMap.findIndex(
						(rate) => {
							return rate === currentRate;
						}
					);
					if (findIndex === 0) {
						log.warn("已是最小倍速: " + currentRate);
						return;
					}
					let prevRate = DouYinVideoShortcut.$data.rateMap[findIndex - 1];
					log.info("设置倍速: " + prevRate);
					DouYinVideo.chooseVideoRate(prevRate);
				},
			},
			"dy-video-rate-up": {
				target: "window",
				callback() {
					log.info("调用倍速 => 大");
					let currentRate =
						unsafeWindow.sessionStorage.getItem("player_playbackratio") ?? "1";
					let findIndex = DouYinVideoShortcut.$data.rateMap.findIndex(
						(rate) => {
							return rate === currentRate;
						}
					);
					if (findIndex === DouYinVideoShortcut.$data.rateMap.length - 1) {
						log.warn("已是最大倍速: " + currentRate);
						return;
					}
					let nextRate = DouYinVideoShortcut.$data.rateMap[findIndex + 1];
					log.info("设置倍速: " + nextRate);
					DouYinVideo.chooseVideoRate(nextRate);
				},
			},
		};
	},
};

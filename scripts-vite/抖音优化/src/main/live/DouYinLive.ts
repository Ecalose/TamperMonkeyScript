import { $$, DOMUtils, GM_Menu, addStyle, log, pops, utils } from "@/env";
import { PopsPanel } from "@/setting/setting";
import { DouYinLiveChatRoom } from "./DouYinLiveChatRoom";
import { DouYinLiveMessage } from "./DouYinLiveMessage";
import Qmsg from "qmsg";
import { ReactUtils } from "@/utils/ReactUtils";
import { DouYinLiveBlock } from "./DouYinLiveBlock";
import { DouYinLivePlayerInstance } from "./DouYinLivePlayerInstance";
import { DouYinLiveShortCut } from "./DouYinLiveShortCut";

export const VideoQualityMap: {
	[key: string]: {
		label: string;
		sign: number;
	};
} = {
	auto: {
		label: "自动",
		sign: 0,
	},
	origin: {
		label: "潮汐海灵",
		sign: 5,
	},
	uhd: {
		label: "蓝光",
		sign: 4,
	},
	hd: {
		label: "超清",
		sign: 3,
	},
	sd: {
		label: "高清",
		sign: 2,
	},
	ld: {
		label: "标清",
		sign: 1,
	},
};
/**
 * 直播画质
 * webcast_local_quality
 * + ld 标清
 * + sd 高清
 * + hd 超清
 * + origin 原画
 *
 * 弹幕设置
 * DanmaSetting_GiftAndPackage
 * {
 *   "__tea_cache_tokens_随机4位数字["uuid"]_playRoom.split(",")[0]": {
 *        expired: Date.now(), # 过期时间
 *        giftOn: false, # 送礼信息
 *        packageOn: false, # 福袋口令
 *    }
 * }
 */
export const DouYinLive = {
	init() {
		DouYinLiveBlock.init();
		DouYinLiveShortCut.init();
		PopsPanel.execMenuOnce("live-danmu-shield-rule-enable", () => {
			DouYinLiveMessage.filterMessage();
		});
		PopsPanel.execMenu("live-unlockImageQuality", () => {
			this.unlockImageQuality();
		});
		PopsPanel.execMenuOnce("live-waitToRemovePauseDialog", () => {
			this.waitToRemovePauseDialog();
		});
		PopsPanel.execMenu("live-pauseVideo", () => {
			this.pauseVideo();
		});
		PopsPanel.execMenu("live-bgColor-enable", () => {
			PopsPanel.execMenuOnce("live-changeBackgroundColor", (value: string) => {
				return this.changeBackgroundColor(value);
			});
		});
		PopsPanel.execMenuOnce("live-parsePlayerInstance", () => {
			DouYinLivePlayerInstance.initMenu();
		});
		DouYinLiveChatRoom.init();
		DOMUtils.ready(() => {
			PopsPanel.execMenu("live-chooseQuality", (quality) => {
				if (quality === "auto") {
					return;
				}
				this.chooseQuality(quality);
			});
			PopsPanel.execMenu("live-autoEnterElementFullScreen", () => {
				this.autoEnterElementFullScreen();
			});
		});
	},
	/**
	 * 自动进入网页全屏
	 */
	autoEnterElementFullScreen() {
		ReactUtils.waitReactPropsToSet(
			"xg-icon.xgplayer-fullscreen + xg-icon  div:has(>svg)",
			"reactFiber",
			{
				check(reactInstance) {
					return typeof reactInstance?.memoizedProps?.onClick === "function";
				},
				set(reactInstance, $target) {
					log.success("自动进入网页全屏");
					reactInstance.memoizedProps.onClick();
				},
			}
		);
	},
	/**
	 * 选择画质
	 * @param quality 选择的画质
	 */
	chooseQuality(quality = "origin") {
		ReactUtils.waitReactPropsToSet(
			'xg-inner-controls xg-right-grid >div:has([data-e2e="quality-selector"])',
			"reactProps",
			{
				check(reactInstance) {
					return (
						typeof reactInstance?.children?.props?.children?.props
							?.qualityHandler === "object" &&
						typeof reactInstance?.children?.props?.children?.props
							?.qualityHandler?.getCurrentQualityList === "function"
					);
				},
				set(reactInstance) {
					let qualityHandler =
						reactInstance.children.props.children.props.qualityHandler;
					// 当前直播可选的画质
					let currentQualityList: string[] =
						qualityHandler.getCurrentQualityList();
					if (!currentQualityList.includes(quality)) {
						Qmsg.warning(
							"当前直播没有【" + quality + "】画质，自动选择最高画质"
						);
						currentQualityList.sort((a, b) => {
							if (!VideoQualityMap[a]) {
								log.error("画质【" + a + "】不存在");
								return 0;
							}
							if (!VideoQualityMap[b]) {
								log.error("画质【" + b + "】不存在");
								return 0;
							}
							return VideoQualityMap[a].sign - VideoQualityMap[b].sign;
						});
						quality = currentQualityList[currentQualityList.length - 1];
					}
					qualityHandler.setCurrentQuality(quality);
					log.success("成功设置画质为【" + quality + "】");
				},
			}
		);
	},
	/**
	 * 解锁画质选择
	 *
	 * 未登录情况下最高选择【高清】画质
	 */
	unlockImageQuality() {
		log.info("解锁画质选择");
		DOMUtils.on(
			document,
			"click",
			'div[data-e2e="quality-selector"] > div',
			function (event, clickNode) {
				utils.preventEvent(event);
				try {
					let reactInstance = utils.getReactObj(clickNode);
					let key = reactInstance?.reactFiber?.["key"];
					let parent = clickNode.closest("div[data-index]");
					let parentReactInstance = utils.getReactObj(parent as HTMLDivElement);
					let current =
						parentReactInstance?.reactProps?.["children"]["ref"]["current"];
					log.info("当前选择的画质: " + key);
					log.info(["所有的画质: ", current.getCurrentQualityList()]);
					/* getCurrentQuality */
					/* getCurrentQualityList */
					/* setCurrentQuality */
					current.setCurrentQuality(key);
				} catch (error) {
					log.error(error);
					Qmsg.error("切换画质失败");
				}
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 长时间无操作，已暂停播放
	 * 累计节能xx分钟
	 */
	waitToRemovePauseDialog() {
		log.info("监听【长时间无操作，已暂停播放】弹窗");
		/**
		 * 检测并关闭弹窗
		 * @param $ele
		 * @param from 检测来源
		 * + "1"
		 * + "2"
		 */
		let checkDialogToClose = ($ele: HTMLElement, from: string) => {
			let eleText = DOMUtils.text($ele);
			if (eleText.includes("长时间无操作") && eleText.includes("暂停播放")) {
				Qmsg.info(`检测${from}：出现【长时间无操作，已暂停播放】弹窗`, {
					consoleLogContent: true,
				});
				let $rect = utils.getReactObj($ele);
				if (typeof $rect.reactContainer === "object") {
					let closeDialogFn =
						utils.queryProperty($rect.reactContainer, (obj) => {
							// 不要用onMaskClick，该函数调用不会关闭弹窗
							if (typeof obj["onClose"] === "function") {
								return {
									isFind: true,
									data: obj["onClose"],
								};
							} else if (
								typeof obj?.["memoizedProps"]?.["onClose"] === "function"
							) {
								return {
									isFind: true,
									data: obj?.["memoizedProps"]?.["onClose"],
								};
							} else {
								// 未找到，进入下一层
								return {
									isFind: false,
									data: obj["child"],
								};
							}
						}) ||
						$rect?.reactContainer?.memoizedState?.element?.props?.children
							?.props?.onClose;
					if (typeof closeDialogFn === "function") {
						Qmsg.success(`检测${from}：调用函数关闭弹窗`, {
							consoleLogContent: true,
						});
						closeDialogFn();
					}
				}
			}
		};
		DOMUtils.ready(() => {
			utils.mutationObserver(document.body, {
				config: {
					subtree: true,
					childList: true,
				},
				callback() {
					$$<HTMLDivElement>(
						"body > div[elementtiming='element-timing']"
					).forEach(($elementTiming) => {
						checkDialogToClose($elementTiming, "1");
					});
					$$<HTMLDivElement>('body > div:not([id="root"])').forEach(($ele) => {
						checkDialogToClose($ele, "2");
					});
				},
			});
		});
	},
	/**
	 * 暂停视频
	 */
	pauseVideo() {
		log.info("禁止自动播放视频(直播)");
		utils
			.waitNode<HTMLVideoElement>('.basicPlayer[data-e2e="basicPlayer"] video')
			.then(($video) => {
				DOMUtils.on(
					$video,
					"play",
					() => {
						$video.pause();
					},
					{
						capture: true,
						once: true,
					}
				);
				$video.autoplay = false;
				$video.pause();
			});
	},
	/**
	 * 修改视频背景颜色
	 * @param color 颜色
	 */
	changeBackgroundColor(color: string) {
		log.info("修改视频背景颜色");
		return addStyle(/*css*/ `
		div[id^="living_room_player_container"] > div,
		#chatroom > div{
			background: ${color};
		}	
		`);
	},
};

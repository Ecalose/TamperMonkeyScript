import { DOMUtils, log, utils } from "@/env";
import { GM_getValue, GM_setValue } from "ViteGM";
import { DouYinUtils } from "@/utils/DouYinUtils";

export const DouYinDanmuFilter = {
	key: "douyin-live-danmu-rule",
	$data: {
		rule: [] as RegExp[],
		isFilterAttrName: "data-is-filter",
	},
	init() {
		this.parseRule();
	},
	/**
	 * 解析规则
	 */
	parseRule() {
		let localRule = this.get().trim();
		let localRuleSplit = localRule.split("\n");
		localRuleSplit.forEach((item: string) => {
			if (item.trim() == "") return;
			item = item.trim();
			let itemRegExp = new RegExp(item.trim());
			this.$data.rule.push(itemRegExp);
		});
	},
	/**
	 * 通知弹幕改变(可能是新增)
	 */
	change() {
		let danmakuQueue = Array.from(
			document.querySelectorAll("xg-danmu.xgplayer-danmu > div > div")
		) as HTMLDivElement[];
		if (!danmakuQueue.length) {
			return;
		}
		for (
			let messageIndex = 0;
			messageIndex < danmakuQueue.length;
			messageIndex++
		) {
			let $danmuItem = danmakuQueue[messageIndex];
			if ($danmuItem.hasAttribute(this.$data.isFilterAttrName)) {
				continue;
			}
			let $messageObj =
				utils.getReactObj($danmuItem)?.reactFiber?.return?.memoizedProps
					?.message;
			let message =
				$messageObj?.payload?.content || $messageObj?.payload?.common?.describe;
			for (let index = 0; index < this.$data.rule.length; index++) {
				const ruleRegExp = this.$data.rule[index];
				if (typeof message === "string") {
					if (ruleRegExp.test(message)) {
						log.info("过滤弹幕: " + message);
						$danmuItem.setAttribute(this.$data.isFilterAttrName, "true");
						DOMUtils.hide($danmuItem);
						break;
					}
				}
			}
		}
	},
	set(value: string) {
		GM_setValue(this.key, value);
	},
	get() {
		return GM_getValue(this.key, "");
	},
};

export const DouYinLiveDanmuku = {
	/**
	 * 屏蔽弹幕
	 */
	shieldDanmu() {
		log.info("屏蔽弹幕");
		DouYinUtils.addBlockCSS("xg-danmu.xgplayer-danmu");
	},
	/**
	 * 弹幕过滤
	 */
	filterDanmu() {
		utils
			.waitNode<HTMLElement>("xg-danmu.xgplayer-danmu", 100000)
			.then(($danmu) => {
				if (!$danmu) {
					log.error("xg-danmu.xgplayer-danmu获取失败");
					return;
				}
				log.success("弹幕过滤");
				DouYinDanmuFilter.init();
				utils.mutationObserver($danmu as HTMLDivElement, {
					config: {
						childList: true,
						subtree: true,
					},
					callback: () => {
						DouYinDanmuFilter.change();
					},
				});
			});
	},
};

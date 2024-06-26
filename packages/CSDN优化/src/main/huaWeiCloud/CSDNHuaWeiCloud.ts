import { addStyle, log, utils } from "@/env";
import { PopsPanel } from "@/setting/setting";
import ShieldCSS from "./css/shield.css?raw";
import { CSDNUtils } from "@/utils/CSDNUtils";

const CSDNHuaWeiCloud = {
	init() {
		addStyle(ShieldCSS);
		PopsPanel.execMenu(
			"csdn-hua-wei-cloud-shieldCloudDeveloperTaskChallengeEvent",
			() => {
				this.shieldCloudDeveloperTaskChallengeEvent();
			}
		);
		PopsPanel.execMenu("csdn-hua-wei-cloud-autoExpandContent", () => {
			this.autoExpandContent();
		});
		PopsPanel.execMenu("csdn-hua-wei-cloud-shieldLeftFloatingButton", () => {
			this.shieldLeftFloatingButton();
		});
		PopsPanel.execMenu("csdn-hua-wei-cloud-blockRightColumn", () => {
			this.blockRightColumn();
		});
		PopsPanel.execMenu(
			"csdn-hua-wei-cloud-blockRecommendedContentAtTheBottom",
			() => {
				this.blockRecommendedContentAtTheBottom();
			}
		);
		PopsPanel.execMenu(
			"csdn-hua-wei-cloud-shieldTheBottomForMoreRecommendations",
			() => {
				this.shieldTheBottomForMoreRecommendations();
			}
		);
	},
	/**
	 * 自动展开内容
	 */
	autoExpandContent() {
		log.info("自动展开全文");
		/* 点击阅读全文 */
		CSDNUtils.addBlockCSS("div.article-show-more");
		addStyle(`
        /* 自动展开全文 */
        .main-content .user-article{
            height: auto !important;
            overflow: auto !important;
        }
        `);
	},
	/**
	 * 屏蔽云开发者任务挑战活动
	 */
	shieldCloudDeveloperTaskChallengeEvent() {
		let GM_cookie = new utils.GM_Cookie();
		GM_cookie.set({ name: "show_join_group_index", value: 1 });
		log.info("设置Cookie 屏蔽云开发者任务挑战活动");
	},
	/**
	 * 屏蔽左侧悬浮按钮
	 */
	shieldLeftFloatingButton() {
		log.info("屏蔽左侧悬浮按钮，包括当前阅读量、点赞按钮、评论按钮、分享按钮");
		CSDNUtils.addBlockCSS("div.toolbar-wrapper.article-interact-bar");
	},
	/**
	 * 屏蔽右侧栏
	 */
	blockRightColumn() {
		log.info("屏蔽右侧栏，包括相关产品-活动日历-运营活动-热门标签");
		CSDNUtils.addBlockCSS("div.page-home-right.dp-aside-right");
	},
	/**
	 * 屏蔽底部推荐内容
	 */
	blockRecommendedContentAtTheBottom() {
		log.info("屏蔽底部推荐内容");
		CSDNUtils.addBlockCSS("div.recommend-card-box");
	},
	/**
	 * 屏蔽底部更多推荐
	 */
	shieldTheBottomForMoreRecommendations() {
		log.info("屏蔽底部更多推荐");
		CSDNUtils.addBlockCSS("div.more-article");
	},
};

export { CSDNHuaWeiCloud };

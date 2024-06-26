import { PopsPanel } from "@/setting/setting";
import { addStyle, log } from "@/env";
import { DouYinUtils } from "@/utils/DouYinUtils";

export const DouYinLiveChatRoom = {
	init() {
		PopsPanel.execMenu("live-shieldChatRoom", () => {
			this.shieldChatRoom();
		});
		PopsPanel.execMenu("live-shielChatRoomVipSeats", () => {
			this.shielChatRoomVipSeats();
		});
		PopsPanel.execMenu("dy-live-shieldUserLevelIcon", () => {
			this.shieldUserLevelIcon();
		});
		PopsPanel.execMenu("dy-live-shieldUserVIPIcon", () => {
			this.shieldUserVIPIcon();
		});
		PopsPanel.execMenu("dy-live-shieldUserFansIcon", () => {
			this.shieldUserFansIcon();
		});
		PopsPanel.execMenu("dy-live-shieldMessage", () => {
			this.shieldMessage();
		});
	},
	/**
	 * 【屏蔽】评论区
	 */
	shieldChatRoom() {
		log.info("【屏蔽】评论区");
		DouYinUtils.addBlockCSS("#chatroom");
		addStyle(`
		div[data-e2e="living-container"],
		div[data-e2e="living-container"] > div{
			margin-bottom: 0px !important;
		}`);
	},
	/**
	 * 【屏蔽】评论区的贵宾席
	 */
	shielChatRoomVipSeats() {
		log.info("【屏蔽】评论区的贵宾席");
		DouYinUtils.addBlockCSS(
			"#chatroom > div > div:has(#audiencePanelScrollId)"
		);
	},
	/**
	 * 【屏蔽】用户等级图标
	 */
	shieldUserLevelIcon() {
		log.info("【屏蔽】用户等级图标");
		DouYinUtils.addBlockCSS(
			'.webcast-chatroom___item span:has(>img[src*="level"])'
		);
	},
	/**
	 * 【屏蔽】VIP图标
	 */
	shieldUserVIPIcon() {
		log.info("【屏蔽】VIP图标");
		DouYinUtils.addBlockCSS(
			'.webcast-chatroom___item span:has(>img[src*="subscribe"])'
		);
	},
	/**
	 * 【屏蔽】粉丝牌
	 */
	shieldUserFansIcon() {
		log.info("【屏蔽】粉丝牌");
		DouYinUtils.addBlockCSS(
			'.webcast-chatroom___item span:has(>div[style*="fansclub"])'
		);
	},
	/**
	 * 【屏蔽】信息播报
	 */
	shieldMessage() {
		log.info("【屏蔽】信息播报");
		DouYinUtils.addBlockCSS(
			".webcast-chatroom___bottom-message",
			// 上面的滚动播报，xxx加入了直播间
			'#chatroom >div>div>div:has(>div[elementtiming="element-timing"])'
		);
	},
};

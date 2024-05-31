import { BaiduRouter } from "@/router/BaiduRouter";
import { UISwitch } from "@/setting/common-components/ui-switch";

const PanelHaoKanSettingUI: PopsPanelContentConfig = {
	id: "baidu-panel-config-haokan",
	title: "好看视频",
	headerTitle: "好看视频<br />haokan.baidu.com",
	isDefault() {
		return BaiduRouter.isHaoKan();
	},
	scrollToDefaultView: true,
	forms: [
		{
			text: "屏蔽",
			type: "forms",
			forms: [
				UISwitch("【屏蔽】猜你喜欢", "baidu_haokan_shield_may_also_like", true),
				UISwitch(
					"【屏蔽】今日热播榜单",
					"baidu_haokan_shield_today_s_hot_list",
					true
				),
				UISwitch(
					"【屏蔽】右侧工具栏",
					"baidu_haokan_shield_right_video_action",
					true
				),
			],
		},
		{
			text: "功能",
			type: "forms",
			forms: [
				UISwitch(
					"播放视频自动进入全屏",
					"baidu_haokan_play_video_and_automatically_enter_full_screen",
					false
				),
			],
		},

		{
			text: "劫持/拦截",
			type: "forms",
			forms: [
				UISwitch(
					"拦截-唤醒App",
					"baidu_haokan_hijack_wakeup",
					true,
					void 0,
					"阻止唤醒调用App"
				),
			],
		},
	],
};

export { PanelHaoKanSettingUI };

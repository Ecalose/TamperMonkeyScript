import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/types/index";
import { UISwitch } from "@components/setting/components/ui-switch";

const MSettingUI_Notes: PopsPanelContentConfig = {
	id: "little-red-book-panel-config-note",
	title: "笔记",
	forms: [
		{
			text: "",
			type: "forms",
			forms: [
				{
					text: "视频笔记",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"优化视频描述",
									"little-red-book-optimizeVideoNoteDesc",
									true,
									void 0,
									"让视频描述可以滚动显示更多"
								),
								UISwitch(
									"【屏蔽】作者热门笔记",
									"little-red-book-shieldAuthorHotNote",
									true,
									void 0,
									"建议开启"
								),
								UISwitch(
									"【屏蔽】热门推荐",
									"little-red-book-shieldHotRecommendNote",
									true,
									void 0,
									"建议开启"
								),
							],
						},
					],
				},
			],
		},
		{
			text: "",
			type: "forms",
			forms: [
				{
					text: "功能",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"优化评论浏览",
									"little-red-book-optimizeCommentBrowsing",
									true,
									void 0,
									"目前仅可加载部分评论"
								),
								UISwitch(
									"优化图片浏览",
									"little-red-book-optimizeImageBrowsing",
									true,
									void 0,
									"更方便的浏览图片"
								),
								UISwitch(
									"允许复制",
									"little-red-book-allowCopy",
									true,
									void 0,
									"可以复制笔记的内容"
								),
							],
						},
					],
				},
				{
					text: "劫持/拦截",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"劫持webpack-弹窗",
									"little-red-book-hijack-webpack-mask",
									true,
									void 0,
									"如：打开App弹窗、登录弹窗"
								),
								UISwitch(
									"劫持webpack-唤醒App",
									"little-red-book-hijack-webpack-scheme",
									true,
									void 0,
									"禁止跳转商店小红书详情页/小红书"
								),
							],
						},
					],
				},
			],
		},
	],
};

export { MSettingUI_Notes };

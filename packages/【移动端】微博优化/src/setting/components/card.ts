import { UISwitch } from "../common-components/ui-switch";

export const SettingUICardArticle: PopsPanelContentConfig = {
	id: "weibo-panel-config-card-article",
	title: "头条文章",
	forms: [
		{
			text: "功能",
			type: "forms",
			forms: [
				UISwitch(
					"自动展开全文",
					"card_weibo_com__autoExpandFullArticle",
					true,
					void 0,
					"自动展开全文，屏蔽展开按钮"
				),
				UISwitch(
					"修复文章作者主页正确跳转",
					"card_weibo_com__repairArticleUserHomeJump",
					true,
					void 0,
					"避免跳转至用户主页时需登录"
				),
			],
		},
		{
			text: "屏蔽",
			type: "forms",
			forms: [
				UISwitch(
					"【屏蔽】评论",
					"card_weibo_com__blockComment",
					false,
					void 0,
					"屏蔽评论区"
				),
			],
		},
	],
};

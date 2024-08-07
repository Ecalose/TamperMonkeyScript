import { log } from "@/env";
import { UISelect } from "../common-components/ui-select";
import { UISwitch } from "../common-components/ui-switch";
import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";

const PanelCommonConfig: PopsPanelContentConfig = {
	id: "panel-config-common",
	title: "通用",
	forms: [
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
									"debug模式",
									"debug",
									true,
									void 0,
									"移除抖音的开发者模式检测"
								),
								UISwitch(
									"伪装登录",
									"disguiseLogin",
									false,
									void 0,
									"使用随机UID进行伪装"
								),
								UISwitch(
									"initial-scale=1",
									"dy-initialScale",
									false,
									void 0,
									"可配合手机模式放大页面"
								),
								UISwitch(
									"移除<meta> apple-itunes-app",
									"dy-apple-removeMetaAppleItunesApp",
									true,
									void 0,
									"Safari使用，移除顶部横幅【Open in the 抖音 app】"
								),
							],
						},
					],
				},
				{
					text: "Url重定向",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"重定向/home",
									"douyin-redirect-url-home-to-root",
									false,
									void 0,
									"/home => /"
								),
							],
						},
					],
				},
				{
					text: "Toast配置",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISelect(
									"Toast位置",
									"qmsg-config-position",
									"bottom",
									[
										{
											value: "topleft",
											text: "左上角",
										},
										{
											value: "top",
											text: "顶部",
										},
										{
											value: "topright",
											text: "右上角",
										},
										{
											value: "left",
											text: "左边",
										},
										{
											value: "center",
											text: "中间",
										},
										{
											value: "right",
											text: "右边",
										},
										{
											value: "bottomleft",
											text: "左下角",
										},
										{
											value: "bottom",
											text: "底部",
										},
										{
											value: "bottomright",
											text: "右下角",
										},
									],
									(event, isSelectValue, isSelectText) => {
										log.info("设置当前Qmsg弹出位置" + isSelectText);
									},
									"Toast显示在页面九宫格的位置"
								),
								UISelect(
									"最多显示的数量",
									"qmsg-config-maxnums",
									3,
									[
										{
											value: 1,
											text: "1",
										},
										{
											value: 2,
											text: "2",
										},
										{
											value: 3,
											text: "3",
										},
										{
											value: 4,
											text: "4",
										},
										{
											value: 5,
											text: "5",
										},
									],
									void 0,
									"限制Toast显示的数量"
								),
								UISwitch(
									"逆序弹出",
									"qmsg-config-showreverse",
									false,
									void 0,
									"修改Toast弹出的顺序"
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
					text: "屏蔽-通用",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】登录弹窗",
									"watchLoginDialogToClose",
									true,
									void 0,
									"屏蔽元素且自动等待元素出现并关闭登录弹窗"
								),
								UISwitch(
									"【屏蔽】底部？按钮",
									"shieldBottomQuestionButton",
									true,
									void 0,
									"屏蔽元素"
								),
							],
						},
					],
				},
				{
					text: "屏蔽-左侧导航栏",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】左侧导航栏",
									"shieldLeftNavigator",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】首页",
									"shieldLeftNavigator-tab-home",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】推荐",
									"shieldLeftNavigator-tab-recommend",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】关注",
									"shieldLeftNavigator-tab-follow",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】朋友",
									"shieldLeftNavigator-tab-friend",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】我的",
									"shieldLeftNavigator-tab-user_self",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】喜欢",
									"shieldLeftNavigator-tab-user_self_like",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】收藏",
									"shieldLeftNavigator-tab-user_self_collection",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】观看历史",
									"shieldLeftNavigator-tab-user_self_record",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】看奥运",
									"shieldLeftNavigator-tab-olympics",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】直播",
									"shieldLeftNavigator-tab-live",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】放映厅",
									"shieldLeftNavigator-tab-vs",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】知识",
									"shieldLeftNavigator-tab-channel_300203",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】游戏",
									"shieldLeftNavigator-tab-channel_300205",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】二次元",
									"shieldLeftNavigator-tab-channel_300206",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】音乐",
									"shieldLeftNavigator-tab-channel_300209",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】美食",
									"shieldLeftNavigator-tab-channel_300204",
									false,
									void 0,
									"屏蔽元素"
								),
							],
						},
					],
				},
				{
					text: "屏蔽-顶部导航栏",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】顶部导航栏",
									"shieldTopNavigator",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】客户端提示",
									"shieldClientTip",
									true,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】充钻石",
									"shieldFillingBricksAndStones",
									true,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】客户端",
									"shieldClient",
									true,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】快捷访问",
									"shieldQuickAccess",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】通知",
									"shieldNotifitation",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】私信",
									"shieldPrivateMessage",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】投稿",
									"shieldSubmission",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】壁纸",
									"shieldWallpaper",
									false,
									void 0,
									"屏蔽元素"
								),
							],
						},
					],
				},
				{
					text: "屏蔽-搜索",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】搜索框",
									"shieldSearch",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】搜索框的提示",
									"shieldSearchPlaceholder",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】猜你想搜",
									"shieldSearchGuessYouWantToSearch",
									false,
									void 0,
									"屏蔽元素"
								),
								UISwitch(
									"【屏蔽】抖音热点",
									"shieldSearchTiktokHotspot",
									false,
									void 0,
									"屏蔽元素"
								),
							],
						},
					],
				},
			],
		},
	],
};

export { PanelCommonConfig };

import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/types/index";
import { UISwitch } from "@components/setting/components/ui-switch";
import { UISelect } from "@components/setting/components/ui-select";
import { AutoOpenOrClose } from "../utils/all-open-or-close";
import { PopsPanelStorageApi } from "@components/setting/panel-storage";

export const PanelSearchConfig: PopsPanelContentConfig = {
	id: "panel-config-search",
	title: "搜索",
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
									"禁止点击视频区域进入全屏",
									"dy-search-disableClickToEnterFullScreen",
									false,
									void 0,
									"禁止点击视频区域时会触发自动进入全屏功能"
								),
								UISelect(
									"自动进入网页全屏",
									"search-autoEnterElementFullScreen",
									0,
									() => [
										{
											text: `跟随主设置（${
												PopsPanelStorageApi.get("autoEnterElementFullScreen")
													? "是"
													: "否"
											}）`,
											value: -1,
										},
										{
											text: "是",
											value: 1,
										},
										{
											text: "否",
											value: 0,
										},
									],
									void 0,
									["视频", "功能", "自动进入网页全屏"]
										.map((it) => `<code>${it}</code>`)
										.join("-")
								),
								UISelect(
									"搜索结果-视频-显示样式",
									"live-setSearchResultFilterWithVideoStyle",
									"one",
									[
										{
											text: "单列",
											value: "one",
										},
										{
											text: "双列",
											value: "double",
										},
									],
									void 0,
									"自定义搜索结果，按视频筛选的结果项的显示样式"
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
					text: "布局屏蔽",
					type: "deepMenu",
					afterEnterDeepMenuCallBack:
						AutoOpenOrClose.afterEnterDeepMenuCallBack,
					forms: [
						{
							text: AutoOpenOrClose.text,
							type: "forms",
							forms: [
								UISwitch(
									"【屏蔽】相关搜索",
									"douyin-search-shieldReleatedSearches",
									false,
									void 0,
									"屏蔽右边的相关搜索"
								),
							],
						},
					],
				},
				{
					text: "布局屏蔽-左侧导航栏",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISelect(
									"【屏蔽】左侧导航栏",
									"search-shieldLeftNavigator",
									-1,
									() => [
										{
											text: `跟随主设置（${
												PopsPanelStorageApi.get("shieldLeftNavigator")
													? "是"
													: "否"
											}）`,
											value: -1,
										},
										{
											text: "是",
											value: 1,
										},
										{
											text: "否",
											value: 0,
										},
									],
									void 0,
									["通用", "布局屏蔽-左侧导航栏", "【屏蔽】左侧导航栏"]
										.map((it) => `<code>${it}</code>`)
										.join("-")
								),
							],
						},
					],
				},
				{
					text: "布局屏蔽-顶部导航栏",
					type: "deepMenu",
					forms: [
						{
							text: "",
							type: "forms",
							forms: [
								UISelect(
									"【屏蔽】顶部导航栏",
									"search-shieldTopNavigator",
									-1,
									() => [
										{
											text: `跟随主设置（${
												PopsPanelStorageApi.get("shieldTopNavigator")
													? "是"
													: "否"
											}）`,
											value: -1,
										},
										{
											text: "是",
											value: 1,
										},
										{
											text: "否",
											value: 0,
										},
									],
									void 0,
									["通用", "布局屏蔽-顶部导航栏", "【屏蔽】顶部导航栏"]
										.map((it) => `<code>${it}</code>`)
										.join("-")
								),
							],
						},
					],
				},
			],
		},
	],
};

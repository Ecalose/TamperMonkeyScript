import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";
import { UISwitch } from "@components/setting/components/ui-switch";

export const SettingUIOther: PopsPanelContentConfig = {
	id: "weibo-panel-config-other",
	title: "其它",
	forms: [
		{
			text: "微博热搜",
			type: "forms",
			forms: [
				UISwitch(
					"新标签页打开",
					"weibo-hot-search-openBlank",
					false,
					void 0,
					"新标签页打开链接"
				),
			],
		},
	],
};

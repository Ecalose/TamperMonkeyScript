import { CSDNRouter } from "@/router/CSDNRouter";
import { UISwitch } from "@components/setting/components/ui-switch";
import { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/indexType";

const MSettingUIWenKu: PopsPanelContentConfig = {
	id: "m-panel-wenku",
	title: "文库",
	isDefault() {
		return CSDNRouter.isWenKu();
	},
	forms: [
		{
			text: "屏蔽",
			type: "forms",
			forms: [
				UISwitch(
					"【屏蔽】底部工具栏",
					"m-csdn-wenku-shieldBottomToolbar",
					false
				),
			],
		},
	],
};

export { MSettingUIWenKu };

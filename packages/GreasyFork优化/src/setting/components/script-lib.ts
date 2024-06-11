import { Greasyfork } from "@/main/Greasyfork";
import i18next from "i18next";

const SettingUIScriptLib: PopsPanelContentConfig = {
	id: "greasy-fork-panel-config-library",
	title: i18next.t("库"),
	callback(event, rightHeaderElement, rightContainerElement) {
		Greasyfork.UIScriptList(
			"script-library",
			event,
			rightHeaderElement,
			rightContainerElement
		);
	},
	forms: [],
};

export { SettingUIScriptLib };

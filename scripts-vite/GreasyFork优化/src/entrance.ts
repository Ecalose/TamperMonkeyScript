import { Panel } from "@components/setting/panel";
import { Greasyfork } from "./main/Greasyfork";
import { PanelMenu } from "@components/setting/panel-menu";
import i18next from "i18next";
import { GithubUrl2WebhookUrl } from "./main/GithubUrl2WebhookUrl";
import { PanelContent } from "@components/setting/panel-content";
import { SettingUICommon } from "./setting/view/common";
import { SettingUIScripts } from "./setting/view/scripts";
import { SettingUIScriptSearch } from "./setting/view/search";
import { SettingUIDiscuessions } from "./setting/view/discussions";
import { SettingUIUsers } from "./setting/view/users";
import UIScriptListCSS from "@/main/css/UIScriptListCSS.css?raw";
import { LanguageInit } from "./language/language";

PanelMenu.addMenuOption({
	key: "githubUrl2webhookUrl",
	text: "⚙ " + i18next.t("Url To WebhookUrl"),
	autoReload: false,
	isStoreValue: false,
	showText(text) {
		return text;
	},
	callback: () => {
		GithubUrl2WebhookUrl.showView();
	},
});
Panel.$data.panelConfig = {
	style: UIScriptListCSS,
};
PanelContent.addContentConfig([
	SettingUICommon,
	SettingUIScripts,
	SettingUIScriptSearch,
	SettingUIDiscuessions,
	SettingUIUsers,
]);
Panel.init();
Greasyfork.init();

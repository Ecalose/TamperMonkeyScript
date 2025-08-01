import { GM_deleteValue, GM_getValue, GM_setValue } from "ViteGM";
import { M_XHS } from "./m-main/M_XHS";
import { addStyle, GM_Menu, log, SCRIPT_NAME, utils } from "./env";
import { XHS } from "./main/XHS";
import Qmsg from "qmsg";
import { Panel } from "@components/setting/panel";
import { PanelContent } from "@components/setting/panel-content";
import { SettingUI_Common } from "./setting/view/common";
import { SettingUI_Article } from "./setting/view/article";
import { MSettingUI_Common } from "./setting/m-view/m-common";
import { MSettingUI_Home } from "./setting/m-view/m-home";
import { MSettingUI_Notes } from "./setting/m-view/m-note";
import { PanelMenu } from "@components/setting/panel-menu";

/* 修复一下Qmsg的loading图标问题 */
addStyle(/*css*/ `
.qmsg svg.animate-turn {
    fill: none;
}
`);
PanelContent.addContentConfig([SettingUI_Common, SettingUI_Article]);
PanelContent.addContentConfig([
	MSettingUI_Common,
	MSettingUI_Home,
	MSettingUI_Notes,
]);
const defaultMenuOption = PanelMenu.getMenuOption();
defaultMenuOption.text = "⚙ PC-设置";
PanelMenu.updateMenuOption(defaultMenuOption);
PanelMenu.addMenuOption({
	key: "show_mobile_setting",
	text: "⚙ 移动端-设置",
	autoReload: false,
	isStoreValue: false,
	showText(text) {
		return text;
	},
	callback: () => {
		Panel.showPanel(PanelContent.getConfig(1), `${SCRIPT_NAME}-移动端设置`);
	},
});
Panel.init();
let isMobile = utils.isPhone();
let CHANGE_ENV_SET_KEY = "change_env_set";
let chooseMode = GM_getValue(CHANGE_ENV_SET_KEY);
GM_Menu.add({
	key: CHANGE_ENV_SET_KEY,
	text: `⚙ 自动: ${isMobile ? "移动端" : "PC端"}`,
	autoReload: false,
	isStoreValue: false,
	showText(text) {
		if (chooseMode == null) {
			return text;
		}
		return (
			text +
			` 手动: ${chooseMode == 1 ? "移动端" : chooseMode == 2 ? "PC端" : "未知"}`
		);
	},
	callback: () => {
		let allowValue = [0, 1, 2];
		let chooseText = window.prompt(
			"请输入当前脚本环境判定\n\n自动判断: 0\n移动端: 1\nPC端: 2",
			"0"
		);
		if (!chooseText) {
			/* 取消 */
			return;
		}
		let chooseMode = parseInt(chooseText);
		if (isNaN(chooseMode)) {
			Qmsg.error("输入的不是规范的数字");
			return;
		}
		if (!allowValue.includes(chooseMode)) {
			Qmsg.error("输入的值必须是0或1或2");
			return;
		}
		if (chooseMode == 0) {
			GM_deleteValue(CHANGE_ENV_SET_KEY);
		} else {
			GM_setValue(CHANGE_ENV_SET_KEY, chooseMode);
		}
	},
});
if (chooseMode != null) {
	log.info(`手动判定为${chooseMode === 1 ? "移动端" : "PC端"}`);
	if (chooseMode == 1) {
		M_XHS.init();
	} else if (chooseMode == 2) {
		XHS.init();
	} else {
		Qmsg.error("意外，手动判定的值不在范围内");
		GM_deleteValue(CHANGE_ENV_SET_KEY);
	}
} else {
	if (isMobile) {
		log.info("自动判定为移动端");
		M_XHS.init();
	} else {
		log.info("自动判定为PC端");
		XHS.init();
	}
}

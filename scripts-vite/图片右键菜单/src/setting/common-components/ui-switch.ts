import { log } from "@/env";
import { PopsPanel } from "@/setting/setting";
import { ATTRIBUTE_DEFAULT_VALUE, ATTRIBUTE_KEY } from "../config";
import { PopsPanelSwitchDetails } from "@whitesev/pops/dist/types/src/components/panel/switchType";

/**
 * 获取checkbox按钮配置
 * @param text 文字
 * @param key 键
 * @param defaultValue 默认值
 * @param clickCallBack （可选）点击回调
 * @param description （可选）左边的文字下面的描述
 */
export const UISwitch = function (
	text: string,
	key: string,
	defaultValue: boolean | undefined,
	clickCallBack?:
		| ((event: MouseEvent | PointerEvent, value: boolean) => boolean | void)
		| undefined,
	description?: string | undefined
): PopsPanelSwitchDetails {
	let result: PopsPanelSwitchDetails = {
		text: text,
		type: "switch",
		description: description,
		attributes: {} as { [key: string]: any },
		getValue() {
			return Boolean(PopsPanel.getValue(key, defaultValue));
		},
		callback(event: MouseEvent | PointerEvent, value: boolean) {
			log.success(`${value ? "开启" : "关闭"} ${text}`);
			if (typeof clickCallBack === "function") {
				if (clickCallBack(event, value)) {
					return;
				}
			}
			PopsPanel.setValue(key, Boolean(value));
		},
		afterAddToUListCallBack: void 0,
	};
	if (result.attributes) {
		result.attributes[ATTRIBUTE_KEY] = key;
		result.attributes[ATTRIBUTE_DEFAULT_VALUE] = Boolean(defaultValue);
	}
	return result;
};

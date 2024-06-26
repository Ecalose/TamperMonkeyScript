import { BaiduRouter } from "@/router/BaiduRouter";

const PanelJingYanSettingUI: PopsPanelContentConfig =
{
    id: "baidu-panel-config-jingyan",
    title: "经验",
    headerTitle: "百度经验<br />jingyan.baidu.com",
    isDefault() {
        return BaiduRouter.isJingYan();
    },
    scrollToDefaultView: true,
    forms: [],
}

export {
    PanelJingYanSettingUI
}
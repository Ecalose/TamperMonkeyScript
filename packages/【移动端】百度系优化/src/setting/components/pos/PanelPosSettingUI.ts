import { BaiduRouter } from "@/router/BaiduRouter";

const PanelPosSettingUI: PopsPanelContentConfig = {
    id: "baidu-panel-config-pos",
    title: "网盟",
    headerTitle: "百度网盟推广<br />pos.baidu.com",
    isDefault() {
        return BaiduRouter.isPos();
    },
    scrollToDefaultView: true,
    forms: [],
}

export {
    PanelPosSettingUI
}
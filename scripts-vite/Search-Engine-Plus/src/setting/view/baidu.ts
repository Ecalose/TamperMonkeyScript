import { SearchEngineRouter } from "@/router/SearchEngineRouter";
import { UISelect, UISwitch } from "@components/setting/panel-components";
import type { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/types/index.js";

export const Component_Baidu: PopsPanelContentConfig = {
  id: "baidu",
  title: "百度搜索",
  isDefault: SearchEngineRouter.isBaiduSearch(),
  views: [
    {
      text: "通用",
      type: "container",
      views: [
        UISwitch("移除右侧栏", "baidu-search-removeRightPanel", true),
        UISwitch("移除大家都在搜", "baidu-search-removeEveryOneSearch", true),
        UISwitch("移除相关搜索", "baidu-search-removeRelatedSearch", true),
      ],
    },
    {
      text: "显示模式优化",
      type: "container",
      views: [
        UISwitch("开启", "baidu-search-showOptimization-enable", true),
        UISelect<SearchResultShowType | "">("模式", "baidu-search-showOptimization-mode", "single-center", [
          {
            text: "无",
            value: "",
          },
          {
            text: "单列居中",
            value: "single-center",
          },
          {
            text: "双列居中",
            value: "double-column-center",
          },
          {
            text: "三列居中",
            value: "three-column-center",
          },
          {
            text: "四列居中",
            value: "four-column-center",
          },
        ]),
      ],
    },
    {
      type: "container",
      text: "搜索结果优化",
      views: [
        UISwitch("开启", "baidu-search-optimizationResult-enable", true),
        UISwitch("移除广告", "baidu-search-optimizationResult-removeAds", true),
        UISwitch("链接重定向", "baidu-search-optimizationResult-redirect", true),
      ],
    },
  ],
};

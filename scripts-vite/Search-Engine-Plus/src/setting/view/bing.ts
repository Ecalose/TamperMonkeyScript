import { SearchEngineRouter } from "@/router/SearchEngineRouter";
import { UISelect, UISwitch } from "@components/setting/panel-components";
import type { PopsPanelContentConfig } from "@whitesev/pops/dist/types/src/components/panel/types/index.js";

export const Component_Bing: PopsPanelContentConfig = {
  id: "bing",
  title: "Bing搜索",
  isDefault: SearchEngineRouter.isBingSearch(),
  views: [
    {
      text: "通用",
      type: "container",
      views: [
        UISwitch("移除广告", "bing-search-removeAds", true),
        UISwitch("移除输入预测", "bing-search-removeInputPrediction", false),
        UISwitch("移除输入历史记录", "bing-search-removeInputHistory", false),
        UISwitch(
          "移除输入历史记录 - 与最近的搜索相关",
          "bing-search-removeInputHistory-relatedToRecentSearches",
          false
        ),
        UISwitch("移除右侧更多搜索结果", "bing-search-removeRightMoreSearchResult", true),
        UISwitch("移除Copilot Search", "bing-search-removeCopilotSearch", false),
        UISwitch("移除底部悬浮的工具栏", "bing-search-removeBottomFloatingToolbar", true),
        UISwitch("移除其它用户还搜索过", "bing-search-removeOtherUserSearch", true),
      ],
    },
    {
      text: "显示模式优化",
      type: "container",
      views: [
        UISwitch("开启", "bing-search-showOptimization-enable", true),
        UISelect<SearchResultShowType | "">("模式", "bing-search-showOptimization-mode", "single-center", [
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
    // {
    //   type: "container",
    //   text: "搜索结果优化",
    //   views: [
    //     UISwitch("启用", "bing-search-optimizationResult-enable", true),
    //     UISwitch("新标签页打开", "bing-search-optimizationResult-openBlank", false),
    //   ],
    // },
  ],
};

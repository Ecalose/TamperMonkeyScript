import { SearchEngineRouter } from "@/router/SearchEngineRouter";
import { BaiduSearch } from "./baidu/BaiduSearch";
import { GoogleSearch } from "./google/GoogleSearch";
import { BingSearch } from "./bing/BingSearch";
import { log } from "@/env";

export const SearchEngine = {
  init() {
    if (SearchEngineRouter.isBaiduSearch()) {
      log.info(`Baidu - 启动`);
      BaiduSearch.init();
    } else if (SearchEngineRouter.isGoogleSearch()) {
      log.info(`Google - 启动`);
      GoogleSearch.init();
    } else if (SearchEngineRouter.isBingSearch()) {
      log.info(`Bing - 启动`);
      BingSearch.init();
    }
  },
};

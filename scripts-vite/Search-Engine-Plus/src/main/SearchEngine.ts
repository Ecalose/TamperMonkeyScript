import { SearchEngineRouter } from "@/router/SearchEngineRouter";
import { BaiduSearch } from "./baidu/BaiduSearch";
import { GoogleSearch } from "./google/GoogleSearch";

export const SearchEngine = {
  init() {
    if (SearchEngineRouter.isBaiduSearch()) {
      BaiduSearch.init();
    } else if (SearchEngineRouter.isGoogleSearch()) {
      GoogleSearch.init();
    }
  },
};

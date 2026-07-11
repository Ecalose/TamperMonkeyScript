import { RouterUtil } from "@components/utils/RouterUtil";

export const SearchEngineRouter = {
  /**
   * 百度搜索
   */
  isBaiduSearch() {
    return RouterUtil.builder()
      .hostNameMatch(/^(ipv6|www|www1|m).baidu.com$/)
      .pathname("/s")
      .r();
  },
  /**
   * 谷歌搜索
   */
  isGoogleSearch() {
    return RouterUtil.builder().hostNameIncludes("google.com").pathname("/search").r();
  },
};

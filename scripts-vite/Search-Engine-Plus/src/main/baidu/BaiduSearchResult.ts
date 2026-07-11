import { $$, DOMUtils, log, utils } from "@/env";
import { addBlockCSSWithEnd } from "@components/env.base";
import { Panel } from "@components/setting/panel";

export const BaiduSearchResult = {
  init() {
    Panel.execMenuOnce(
      [
        "baidu-search-optimizationResult-enable",
        "baidu-search-optimizationResult-removeAds",
        "baidu-search-optimizationResult-redirect",
      ],
      (config) => {
        const [enable, removeAds, redirect] = config.value;
        if (!enable) return;
        if (!removeAds && !redirect) return;
        return this.searchResultShowOptimization({ removeAds, redirect });
      }
    );
  },
  /**
   * 搜索结果优化
   */
  searchResultShowOptimization(config: { removeAds: boolean; redirect: boolean }) {
    log.info(`搜索结果优化`, config);
    const resultSelector = "#content_left > div";
    const lockFn = new utils.LockFunction(() => {
      const $results = $$(resultSelector + ":not([data-hijack])");
      for (const $result of $results) {
        if (config.removeAds && DOMUtils.selector('.se_st_footer:contains("广告")', $result)) {
          // 移除广告
          $result.remove();
          continue;
        }
        const mu = $result.getAttribute("mu");
        /** 真实链接 */
        const realLink = mu;
        if (!realLink) {
          continue;
        }
        /** 标题 */
        const $title =
          $result.querySelector<HTMLAnchorElement>("a.sc-link[href]") ||
          $result.querySelector<HTMLAnchorElement>(".c-title a[href]") ||
          $result.querySelector<HTMLAnchorElement>("a.cosc-title-a[href]");

        if ($title) {
          if (config.redirect) {
            // 重定向
            $title.href = realLink;
            $result.setAttribute("data-hijack", "true");
          }
        }
      }
    });
    const observer = utils.mutationObserver(document, {
      config: {
        subtree: true,
        childList: true,
        attributes: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
      },
    });

    return [
      () => {
        observer.disconnect();
      },
      config.removeAds
        ? addBlockCSSWithEnd("#content_left > div:has(.ec-tuiguang)", "#content_left > div:has(.c-recomm-wrap)")
        : null,
    ];
  },
};

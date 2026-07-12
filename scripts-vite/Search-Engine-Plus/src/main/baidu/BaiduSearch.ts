import { log, utils } from "@/env";
import { addBlockCSSWithEnd, addStyleWithEnd } from "@components/env.base";
import { Panel } from "@components/setting/panel";
import { BaiduSearchResult } from "./BaiduSearchResult";

export const BaiduSearch = {
  init() {
    Panel.execMenuOnce("baidu-search-removeRightPanel", () => {
      return this.removeRightPanel();
    });
    Panel.execMenuOnce("baidu-search-removeEveryOneSearch", () => {
      return this.removeEveryOneSearch();
    });
    Panel.execMenuOnce("baidu-search-removeRelatedSearch", () => {
      return this.removeRelatedSearch();
    });
    Panel.execMenuOnce(["baidu-search-showOptimization-enable", "baidu-search-showOptimization-mode"], (config) => {
      const [enable, mode] = config.value;
      if (!enable) return;
      if (utils.isNull(mode)) return;
      return this.searchResultShowOptimization(mode);
    });
    BaiduSearchResult.init();
  },
  /**
   * 移除右侧栏
   */
  removeRightPanel() {
    log.info(`移除右侧栏`);
    return addBlockCSSWithEnd("#content_right");
  },
  /**
   * 移除大家都在搜
   */
  removeEveryOneSearch() {
    log.info(`移除大家都在搜`);
    return addBlockCSSWithEnd('.result-op[tpl="recommend_list"]');
  },
  /**
   * 移除相关搜索
   */
  removeRelatedSearch() {
    log.info(`移除相关搜索`);
    return addBlockCSSWithEnd(".result-molecule:has(#rs_new)");
  },
  /**
   * 搜索结果显示优化
   */
  searchResultShowOptimization(mode: SearchResultShowType) {
    log.info(`搜索结果显示优化: ` + mode);

    const result: any[] = [
      addStyleWithEnd(/*css*/ `
        /* AI回答结果变成滚动条形式 */
        #container #content_left .cosc-card-content [class^="fold-content_"]{
          min-height: unset !important;
          overflow: auto !important;
        }
        /* 隐藏展开按钮 */
        #container #content_left .cosc-card-content [class^="wenda-general-fold-switch_"]{
          display: none !important;
        }
      `),
    ];

    const titleHoverCSS = /*css*/ `
      #container #content_left > .c-container a.cosc-title-a,
      #container #content_left > .c-container .c-title a[href],
      #container #content_left > .c-container [class*="_sc-title"] a.sc-link {
          & {
              position: relative;
          }

          &,
          & span,
          & p.sc-paragraph{
              text-decoration: none !important;
          }

          &:hover:after {
              left: 0;
              width: 100%;
              transition: width 350ms;
          }

          &:after {
              content: "";
              position: absolute;
              border-bottom: 2px solid #3476d2;
              bottom: 0px;
              left: 100%;
              width: 0;
              transition: width 350ms, left 350ms;
              left: 0;
          }
      }

    `;

    const centerCSS = /*css*/ `
      #container{
          margin: 0px auto !important;
          width: auto !important;
      }
      #container #content_left{
          width:  100% !important;
          margin: unset;
          justify-self: center;
          float: unset;
      }
      #container #content_left > .c-container{
          width: 100%;
      }
      /* 顶部输入框居中 */
      .head_wrapper .s_form,
      .input-head-wrapper [class^="head-left_"]{
        width: unset;
        padding: unset;
        justify-self: center;
        margin: 0 auto;
      }
      #s_tab_inner{
        padding: 0 !important;
        justify-self: center;
      }
      #image-search-header [class^="input-container-"]{
        margin: 0 auto !important;
      }

      #header_top_bar{
        margin: 0 auto;
      }
      /* 内容宽度适配 */
      #container #content_left > .c-container .c-row .c-span-last[class*="content_"]{
        width: auto;
        float: unset;
      }
      /* 页码居中 */
      #page [class^="page-inner"]{
        width: min-content !important;
        padding-left: 0px !important;
      }
      /* 底部 */
      #foot .foot-inner{
        width: unset !important;
        justify-self: center !important;
      }
      #foot .foot-inner #help{
        margin: 0 !important;
      }
      `;
    const resultCSS = /*css*/ `
      #content_left > .c-container{
        padding: 15px 20px 15px 20px;
        margin-top: 0;
        margin-left: 0;
        margin-bottom: 30px;
        border-radius: 8px;
        background-color: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      }
      /* AI总结卡片 样式移除 */
      #content_left > .c-container [class*="card-border"]{
        border: none;
        border-radius: 0px;
      }
      #content_left > .c-container [class*="card-border"] [class^="baikan-card-header"]{
        background: none;
      }
      /* 标题背景色 */
      #content_left > .c-container a.sc-link[href],
      #content_left > .c-container .c-title a[href],
      #content_left > .c-container [class*="title-box_"]{
          background-color: #f8f8f8;
          width: 100%;
          margin: 0px -20px;
          padding: 5px 20px;
      }
      /* 标题高度适配 */
      #content_left > .c-container [class*="title-wrapper"] {
        &{
          margin-bottom: 8px;
        }
        & [class*="title-box"],
        & [class*="title-box"] h3.cosc-title{
          margin-bottom: 0px;
          padding-bottom: 0px;
        }
      }

      /* 标题移除省略号 */
      #content_left > .c-container .c-title a,
      #content_left > .c-container a.cosc-title-a{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }
    `;
    const moreColumnCSS = /*css*/ `
      #container #content_left{
        display: grid;
        grid-template-columns: repeat(2, 48%);
        grid-gap: 0 20px;
        grid-template-areas: "xmain xmain";
        margin: 0 auto;
        position: relative;
        padding-left: 2%;
        float: unset;
        width: 90%;
        max-width: 1400px;
        margin-bottom: 30px;
      }
      #container #content_left .c-row[class*="source_"]:has(a),
      #container #content_left .cos-row [class*="source-pc_"]{
        position: relative;
      }
    `;
    result.push(addStyleWithEnd(resultCSS), addStyleWithEnd(titleHoverCSS));
    if (mode === "single-center") {
      // 单列居中
      result.push(
        addStyleWithEnd(centerCSS),
        addStyleWithEnd(/*css*/ `
        #container #content_left > .c-container {
            width: 55%;
            justify-self: center;
        }
      `)
      );
    } else if (mode === "double-column-center") {
      // 双列居中
      result.push(addStyleWithEnd(moreColumnCSS), addStyleWithEnd(centerCSS));
    } else if (mode === "three-column-center") {
      // 三列居中
      result.push(
        addStyleWithEnd(moreColumnCSS),
        addStyleWithEnd(centerCSS),
        addStyleWithEnd(/*css*/ `
        #container #content_left{
          grid-template-columns: repeat(3, 33.3%);
          grid-template-areas: "xmain xmain xmain";
        }
      `)
      );
    } else if (mode === "four-column-center") {
      // 四列居中
      result.push(
        addStyleWithEnd(moreColumnCSS),
        addStyleWithEnd(centerCSS),
        addStyleWithEnd(/*css*/ `
        #container #content_left{
          grid-template-columns: repeat(4, 25%);
          grid-template-areas: "xmain xmain xmain xmain";
        }
      `)
      );
    } else {
      log.error(`不支持的搜索结果显示模式: ` + mode);
    }

    return result;
  },
};

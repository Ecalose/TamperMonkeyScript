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
    Panel.execMenuOnce("baidu-search-removeSelectTextDialog", () => {
      return this.removeSelectTextDialog();
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
   * 移除选中文本弹窗
   */
  removeSelectTextDialog() {
    log.info(`移除选中文本弹窗`);
    return addBlockCSSWithEnd("#wrapper_wrapper > .selected-search-box");
  },
  /**
   * 搜索结果显示优化
   */
  searchResultShowOptimization(mode: SearchResultShowType) {
    log.info(`搜索结果显示优化: ` + mode);

    const resultContainerCSS = (resultCardCSSText: string, contentLeftCSSText?: string) => {
      return /*css*/ `
        #container #content_left{
        & > .c-container,
        & > .new-pmd{
          ${resultCardCSSText}
        }

        ${contentLeftCSSText || ""}
      }
      `;
    };

    const result: any[] = [
      addStyleWithEnd(
        resultContainerCSS(
          "",
          /*css*/ `
          /* AI回答结果变成滚动条形式 */
          & .cosc-card-content [class^="fold-content_"]{
            min-height: unset !important;
            overflow: auto !important;
          }
          /* 隐藏展开按钮 */
          & .cosc-card-content [class^="wenda-general-fold-switch_"]{
            display: none !important;
          }
      `
        )
      ),
    ];

    /** 标题鼠标悬浮背景色 */
    const titleHoverCSS = resultContainerCSS(/*css*/ `
      & a.cosc-title-a,
      & .c-title a[href],
      & [class*="_sc-title"] a.sc-link,
      & [class*="c-line-"]:has(> a[href][class^="title_"]) {
          position: relative;

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
    `);

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
      ${resultContainerCSS(/*css*/ `
        &{
          width: 100%;
        }
        /* 内容宽度适配 */
        & .c-row .c-span-last[class*="content_"]{
          width: auto;
          float: unset;
        }
      `)}
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
      /* 顶部的搜索结果涉及价格仅作参考，请以商家官网为准 */
      #content_left > div:first-child:not(:has(*)) {
        text-align: center;
      }
      /* 抱歉，未找到相关结果 */
      #container .content_none{
        float: unset;
        margin: 0 auto;
      }
      /* 页码居中 */
      #page [class^="page-inner"]{
        width: min-content !important;
        padding-left: 0px !important;
        margin: 0 auto;
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
    const resultCSS = resultContainerCSS(
      /*css*/ `
        &{
          padding: 15px 20px;
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
        & [class*="card-border"]{
          border: none;
          border-radius: 0px;
        }
        & [class*="card-border"] [class^="baikan-card-header"]{
          background: none;
        }
        /* 标题背景色 */
        & a.sc-link[href],
        & .c-title a[href],
        & [class*="title-box_"],
        & [class*="c-line-"]:has(> a[href][class^="title_"]),
        & [class*="title-container_"]:has(>.cosc-title a.cosc-title-a){
            background-color: #f8f8f8;
            width: 100%;
            max-width: unset;
            margin: 0px -20px;
            padding: 5px 20px;
        }
        /* 标题宽度适配（撑满） */
        & [class*="c-line-"] > a[href][class^="title_"],
        & [class*="title-container_"] >.cosc-title a.cosc-title-a{
          width: 100%;
          max-width: unset;
          display: inline-flex !important;
        }
        /* 标题容器高度适配 */
        & [class*="title-wrapper"] {
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
        & .c-title a,
        & a.cosc-title-a{
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
    `,
      /*css*/ `
      /* 您要找的是不是 xxx */
      .result-molecule.hit-toptip > .c-gap-bottom-large{
        margin-bottom: 0px;
      }
      /* 没有找到该URL。您可以直接访问 xxx */
      .result-molecule > .hit_top_new.res-border-bottom{
        &,
        & [class*="gap-bottom-small"]{
          margin-bottom: 0px;
          border: 0px;
        }
      }
    `
    );
    const moreColumnCSS = resultContainerCSS(
      /*css*/ `
       & .c-row[class*="source_"]:has(a),
       & .cos-row [class*="source-pc_"]{
          position: relative;
        }
      `,
      /*css*/ `
      &{
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
    `
    );
    result.push(addStyleWithEnd(resultCSS), addStyleWithEnd(titleHoverCSS));
    if (mode === "single-center") {
      // 单列居中
      result.push(
        addStyleWithEnd(centerCSS),
        addStyleWithEnd(/*css*/ `
        #container #content_left{
          & > div:not(:empty){
            width: 55%;
            justify-self: center;
          }
        }
      `)
      );
    } else if (mode === "double-column-center") {
      // 双列居中
      result.push(
        addStyleWithEnd(moreColumnCSS),
        addStyleWithEnd(centerCSS),
        addBlockCSSWithEnd(/*css*/ `
        #container #content_left{
          &>div:not(:empty){
            max-width: 100%;
          }
        }
        `)
      );
    } else if (mode === "three-column-center") {
      // 三列居中
      result.push(
        addStyleWithEnd(moreColumnCSS),
        addStyleWithEnd(centerCSS),
        addStyleWithEnd(/*css*/ `
        #container #content_left{
          grid-template-columns: repeat(3, 33.3%);
          grid-template-areas: "xmain xmain xmain";
          &>div:not(:empty){
            max-width: 100%;
          }
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
          &>div:not(:empty){
            max-width: 100%;
          }
        }
      `)
      );
    } else {
      log.error(`不支持的搜索结果显示模式: ` + mode);
    }

    return result;
  },
};

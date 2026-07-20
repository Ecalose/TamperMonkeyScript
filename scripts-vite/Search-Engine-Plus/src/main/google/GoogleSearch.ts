import { addStyle, log, utils } from "@/env";
import { addBlockCSS } from "@components/env.base";
import { Panel } from "@components/setting/panel";
import { GoogleSearchResult } from "./GoogleSearchResult";

export const GoogleSearch = {
  init() {
    Panel.execMenuOnce("google-search-removeAIOverview", () => {
      return this.removeAIOverview();
    });
    Panel.execMenuOnce("google-search-removeRightPanel", () => {
      return this.removeRightPanel();
    });
    Panel.execMenuOnce("google-search-removeRelatedSearch", () => {
      return this.removeRelatedSearch();
    });
    Panel.execMenuOnce("google-search-removeQuestions", () => {
      return this.removeQuestions();
    });
    Panel.execMenuOnce(["google-search-showOptimization-enable", "google-search-showOptimization-mode"], (config) => {
      const [enable, mode] = config.value;
      if (!enable) return;
      if (utils.isNull(mode)) return;
      return this.searchResultShowOptimization(mode);
    });
    GoogleSearchResult.init();
  },
  /**
   * 移除AI概览
   */
  removeAIOverview() {
    log.info(`移除AI概览`);
    return addBlockCSS("#rcnt > div:not([role='main']):not(:empty):has([data-mcpr])");
  },
  /**
   * 移除右侧栏
   */
  removeRightPanel() {
    log.info(`移除右侧栏`);
    return addBlockCSS("#rhs");
  },
  /**
   * 移除用户还搜索了
   */
  removeRelatedSearch() {
    log.info(`移除用户还搜索了`);
    return addBlockCSS("#botstuff");
  },
  /**
   * 移除相关问题
   */
  removeQuestions() {
    log.info(`移除相关问题`);
    return addBlockCSS("#rso > div:not(:empty) > div:has(.related-question-pair)");
  },
  /**
   * 搜索结果显示优化
   */
  searchResultShowOptimization(mode: SearchResultShowType) {
    log.info(`搜索结果显示优化: ` + mode);

    const result: any[] = [addBlockCSS(".kp-wholepage-osrp")];

    const titleHoverCSS = /*css*/ `
        #rso a,
        #rso a h3 {
            text-decoration: none !important;
        }

        #rso a h3 {
            &:hover:after{
                left: 0;
                width: 100%;
                transition: width 350ms;
            }
            &:after{
                content: "";
                position: absolute;
                border-bottom: 2px solid #3476d2;
                bottom: -3px;
                left: 100%;
                width: 0;
                transition: width 350ms, left 350ms;
            }
        }

    `;

    const centerCSS = /*css*/ `
    #rcnt{
        display: flex !important;
        flex-direction: column;
        width: 80%;
        margin: 0 auto;
    }
    [id^="center_"][role="main"]{
        display: flex;
        flex-direction: column;
        justify-self: center;
    }
    /* 隐藏空结果 */
    #rso:not(:has(>script)) > div:empty,
    #rso:not(:has(>script)) > div:not(:has([data-rpos])),
    #rso:has(>script)>div:not(:empty)>div:not(:has(>div)){
        display: none;
    }
    /* 顶部输入框居中 */
    #searchform{
        display: block;
        justify-items: center;

        >div{
            justify-content: unset;
        }

        textarea{
            min-width: 300px;
        }

        button[type="submit"]{
            margin-right: 2em;
        }
    }
    /* 顶部搜索结果选项导航栏居中 */
    [data-st-tgt="fb"] > div:not(:empty){
        display: block !important;
    }
    [data-st-tgt="fb"] > div:not(:empty) [role="navigation"]{
        justify-self: center;
    }
    /* 小提示： 限制此搜索仅展示xxx搜索结果。 详细了解如何按语言过滤搜索结果 */
    [id^="center_"][role="main"] #taw{
      justify-items: center;
    }
    `;
    const resultCSS = /*css*/ `
        /* 搜索结果的样式和标题的悬浮样式 */
        #rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty),
        #rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)){
            width: 100% !important;
            padding: 15px 20px;
            margin-top: 0px;
            margin-bottom: 20px;
            border-radius: 5px;
            background-color: #fff;
            box-sizing: border-box;
            border: 1px solid rgba(0, 0, 0, 0.1);
            transition: all 0.25s cubic-bezier(0.23, 1, 0.32, 1) 0s;

            &:hover{
                border: 1px solid rgba(0, 0, 0, 0.3);
                box-shadow: 0 0 1px grey;
                -webkit-box-shadow: 0 0 1px grey;
                -moz-box-shadow: 0 0 1px gray;
            }
        }
    `;
    const moreColumnCSS = /*css*/ `
      #rso:not(:has(>script)),
      #rso:has(>script)>div:not(:empty){
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
      /* 高度统一 */
      #rso:not(:has(>script)) > div:not(:empty) > div[data-rpos]:not(:empty),
      #rso:has(>script)>div:not(:empty)>div:not(:empty):has(>div):not(:has(.related-question-pair)){
          height: -webkit-fill-available;
      }
    `;
    result.push(addStyle(centerCSS), addStyle(resultCSS), addStyle(titleHoverCSS));

    if (mode === "single-center") {
      // 单列居中
      result.push(
        addStyle(/*css*/ `
        #rso{
            width: 55%;
            justify-self: center;
        }
      `)
      );
    } else if (mode === "double-column-center") {
      // 双列居中
      result.push(addStyle(moreColumnCSS));
    } else if (mode === "three-column-center") {
      // 三列居中
      result.push(
        addStyle(moreColumnCSS),
        addStyle(/*css*/ `
        #rso:not(:has(>script)),
        #rso:has(>script)>div:not(:empty){
            grid-template-columns: repeat(3, 33.3%);
            grid-template-areas: "xmain xmain xmain";
        }
      `)
      );
    } else if (mode === "four-column-center") {
      // 四列居中
      result.push(
        addStyle(moreColumnCSS),
        addStyle(/*css*/ `
        #rso:not(:has(>script)),
        #rso:has(>script)>div:not(:empty){
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

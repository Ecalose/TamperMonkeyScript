import { $$, DOMUtils, log, utils } from "@/env";
import { Panel } from "@components/setting/panel";
import { CommonUtil } from "@components/utils/CommonUtil";

/**
 * 底部工具栏 - 视频信息区域
 */
export const DouYinVideoBlock_BottomToolbar_videoInfo = {
  init() {
    Panel.execMenuOnce("dy-video-bottom-shieldVideoInfoWrap", () => {
      return this.shieldVideoInfoWrap();
    });
    Panel.execMenuOnce("dy-video-blockClickRecommend", () => {
      return this.blockClickRecommend();
    });
    Panel.execMenuOnce("dy-video-blockTitleTopTag", () => {
      return this.blobkTitleTopTag();
    });
    Panel.execMenuOnce("dy-video-bottom-shieldVideoUnderTitleTag", () => {
      return this.shieldVideoUnderTitleTag();
    });
    Panel.execMenuOnce("dy-video-blockAIIdentifyTheScreen", () => {
      return this.blockAIIdentifyTheScreen();
    });
    Panel.execMenuOnce("dy-video-blockClickUpdateReminder", () => {
      return this.blockClickUpdateReminder();
    });
    Panel.execMenuOnce("dy-video-blockAuthorDeclaration", () => {
      return this.blockAuthorDeclaration();
    });
  },
  /**
   * 【屏蔽】视频信息
   */
  shieldVideoInfoWrap() {
    log.info("【屏蔽】视频信息");
    return [
      CommonUtil.addBlockCSS(
        "#video-info-wrap",
        // 直播的信息区域
        '[data-e2e="feed-live"] [data-e2e="basicPlayer"] > div:has([aria-label*="直播"])'
      ),
    ];
  },
  /**
   * 【屏蔽】点击推荐或共xx人推荐
   */
  blockClickRecommend() {
    log.info(`【屏蔽】点击推荐或共xx人推荐`);
    return CommonUtil.addBlockCSS(".xgplayer-recommend-tag");
  },
  /**
   * 【屏蔽】视频标题上的标签
   *
   * - 每周精选
   * - 抖音精选
   */
  blobkTitleTopTag() {
    log.info(`【屏蔽】视频标题上的标签`);
    return CommonUtil.addBlockCSS("span:has(+#video-info-wrap):has(img)", "span:has(+div #video-info-wrap):has(img)");
  },
  /**
   * 【屏蔽】视频标题下的标签
   */
  shieldVideoUnderTitleTag() {
    log.info(`【屏蔽】视频标题下的标签`);
    return [CommonUtil.addBlockCSS("#video-info-wrap .under-title-tag")];
  },
  /**
   * 【屏蔽】识别画面
   */
  blockAIIdentifyTheScreen() {
    log.info(`【屏蔽】识别画面`);
    return [
      CommonUtil.addBlockCSS(
        '.under-title-tag + div:has(svg g[filter*="icon_ai_svg__filter"])',
        '[data-e2e="video-desc"] + div:has(svg g[filter*="icon_ai_svg__filter"])'
      ),
    ];
  },
  /**
   * 【屏蔽】及时接收作品更新提醒
   */
  blockClickUpdateReminder() {
    let lockFn = new utils.LockFunction(() => {
      let $reminder = $$<HTMLElement>(".basePlayerContainer div:has(>div>div):contains('及时接收作品更新提醒')");
      // 修复因移除导致视频信息为归为问题
      if ($reminder.length) {
        for (const $reminderItem of $reminder) {
          const $basePlayerContainer = $reminderItem.closest<HTMLElement>(".basePlayerContainer");
          const $videoInfoDetail = $basePlayerContainer?.querySelector<HTMLElement>(".video-info-detail");
          if ($videoInfoDetail) {
            DOMUtils.css($videoInfoDetail, "paddingBottom", "8px");
          }
        }
        DOMUtils.remove($reminder);
        log.success(`【屏蔽】及时接收作品更新提醒`);
      }
    });
    utils.mutationObserver(document, {
      config: {
        subtree: true,
        childList: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
      },
    });
  },
  /**
   * 【屏蔽】作者声明
   */
  blockAuthorDeclaration() {
    log.info(`【屏蔽】作者声明`);
    return [CommonUtil.addBlockCSS("div:has(>a.safetyBar)")];
  },
};

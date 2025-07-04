import blockAdsCSS from "./blockAds.css?raw";
import { WeiBoHook } from "@/hook/WeiBoHook";
import { WeiBoRouter } from "@/router/WeiBoRouter";
import { WeiBoHuaTi } from "./huati/WeiBoHuaTi";
import { $, DOMUtils, addStyle, log, utils } from "@/env";
import { WeiBoVideo } from "./video/WeiBoVideo";
import { WeiBoDetail } from "./detail/WeiBoDetail";
import { CommonUtil } from "@components/utils/CommonUtil";
import { WeiBoUserHome } from "./u/WeiBoUserHome";
import { WeiBoSearch } from "./search/WeiBoSearch";
import { WeiBoUnlockQuality } from "./WeiBoUnlockQuality";
import { WeiBoCardArticle } from "./card/WeiBoCardArticle";
import { WeiBoHome } from "./home/WeiBoHome";
import { WeiBoHotSearch } from "./p/WeiBoHotSearch";
import { WeiBoLive } from "./wblive/WeiBoLive";
import { Panel } from "@components/setting/panel";

const WeiBo = {
	$data: {
		weiBoUnlockQuality: new WeiBoUnlockQuality(),
	},
	init() {
		Panel.execMenuOnce("weibo_hijack_navigator_service_worker_register", () => {
			if ("serviceWorker" in window.navigator) {
				WeiBoHook.hookServiceWorkerRegister();
			}
		});
		Panel.execMenuOnce("weibo-common-clickImageToClosePreviewImage", () => {
			this.clickImageToClosePreviewImage();
		});
		// 不同域名不会触发Router改变，所以单独设定m.weibo.cn下监听路由改变
		if (WeiBoRouter.isMWeiBo()) {
			// 移动端微博
			log.info("Router: 移动端微博");
			Panel.onceExec("weibo-m-init", () => {
				WeiBoHook.hookNetWork();
				WeiBoHook.hookApply();
				WeiBoHook.hookVueRouter();
			});
			Panel.execMenuOnce("weibo_remove_ads", () => {
				return this.blockAds();
			});
			Panel.execMenuOnce("weibo_shield_bottom_bar", () => {
				return this.shieldBottomBar();
			});
			this.$data.weiBoUnlockQuality.lockVideoQuality();
			DOMUtils.ready(() => {
				Panel.execMenuOnce("weibo-common-unlockVideoHigherQuality", () => {
					this.unlockVideoHigherQuality();
				});
				Panel.execMenuOnce("weibo-detail-setArticleAbsoluteTime", () => {
					WeiBoDetail.setArticleAbsoluteTime();
				});
			});
			if (WeiBoRouter.isMWeiBoHome()) {
				log.info(`Router: 移动端微博-首页`);
				WeiBoHome.init();
			} else if (
				WeiBoRouter.isMWeiBo_detail() ||
				WeiBoRouter.isMWeiBo_status()
			) {
				log.info("Router: 移动端微博-正文");
				WeiBoDetail.init();
			} else if (WeiBoRouter.isMWeiBo_userHome()) {
				log.info("Router: 移动端微博-用户主页");
				WeiBoUserHome.init();
			} else if (WeiBoRouter.isMWeiBo_search()) {
				log.info("Router: 移动端微博-搜索");
				WeiBoSearch.init();
			} else if (WeiBoRouter.isMWeiBo_HotSearch()) {
				log.info(`Router: 移动端微博-微博热搜`);
				WeiBoHotSearch.init();
			} else {
				log.error("Router: 移动端微博未适配链接 => " + window.location.href);
			}
		} else if (WeiBoRouter.isHuaTi()) {
			log.info("Router: 话题");
			WeiBoHuaTi.init();
		} else if (WeiBoRouter.isVideo()) {
			// 视频页
			log.info("Router: 视频页");
			WeiBoVideo.init();
		} else if (WeiBoRouter.isCard()) {
			// 头条
			log.info("Router: 头条");
			if (WeiBoRouter.isCardArticle()) {
				log.info("Router: 头条文章");
				WeiBoCardArticle.init();
			} else {
				log.error("Router: 头条未适配链接 => " + window.location.href);
			}
		} else if (WeiBoRouter.isLive()) {
			log.info(`Router: 直播`);
			WeiBoLive.init();
		} else {
			// 未适配Router
			log.error("Router: 未适配 => " + window.location.href);
		}
	},
	/**
	 * 屏蔽 广告
	 */
	blockAds() {
		log.info(`屏蔽 广告`);
		return addStyle(blockAdsCSS);
	},
	/**
	 * 【屏蔽】底部工具栏
	 */
	shieldBottomBar() {
		log.info("【屏蔽】底部工具栏");
		return CommonUtil.addBlockCSS(
			"#app div.m-tab-bar.m-bar-panel.m-container-max"
		);
	},
	/**
	 * 解锁微博视频高画质
	 **/
	unlockVideoHigherQuality() {
		let lock = new utils.LockFunction(() => {
			this.$data.weiBoUnlockQuality.unlockVideoHigherQuality();
		}, 15);

		utils.mutationObserver(document.body, {
			config: {
				subtree: true,
				childList: true,
			},
			immediate: true,
			callback: () => {
				lock.run();
			},
		});
	},
	/**
	 * 设置监听事件，监听点击预览中的图片，从而关闭预览
	 */
	clickImageToClosePreviewImage() {
		let selectorList = [".pswp .pswp__item"];
		selectorList.forEach((selector) => {
			DOMUtils.on(document, "click", selector, (event) => {
				let $clickTarget = event.target as HTMLElement;
				let $closeButton = $<HTMLElement>(".pswp .pswp__button--close")!;
				if ($closeButton) {
					$closeButton.click();
				} else {
					log.warn("未找到关闭预览按钮，使用history.back()");
					window.history.back();
				}
			});
		});
	},
};

export { WeiBo };

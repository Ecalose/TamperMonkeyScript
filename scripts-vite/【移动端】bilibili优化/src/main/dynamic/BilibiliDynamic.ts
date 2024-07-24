import { BilibiliData } from "@/data/BlibiliData";
import { DOMUtils, Qmsg, log, utils } from "@/env";
import { PopsPanel } from "@/setting/setting";
import { BilibiliUrlUtils } from "@/utils/BilibiliUrlUtils";
import { BilibiliUtils } from "@/utils/BilibiliUtils";

export const BilibiliDynamic = {
	init() {
		PopsPanel.execMenuOnce("bili-dynamic-cover-topicJump", () => {
			this.coverTopicJump();
		});
		PopsPanel.execMenuOnce("bili-dynamic-cover-atJump", () => {
			this.coverAtJump();
		});
		PopsPanel.execMenuOnce("bili-dynamic-cover-referenceJump", () => {
			this.coverReferenceJump();
		});
		PopsPanel.execMenuOnce("bili-dynamic-cover-header", () => {
			this.coverHeaderJump();
		});
	},
	/**
	 * 覆盖header点击事件
	 */
	coverHeaderJump() {
		log.info("覆盖header点击事件");
		DOMUtils.on<PointerEvent | MouseEvent>(
			document,
			"click",
			BilibiliData.className.dynamic + " .launch-app-btn .dyn-header",
			function (event) {
				utils.preventEvent(event);
				let $click = event.target as HTMLDivElement;
				let vueObj = BilibiliUtils.getVue($click);
				if (!vueObj) {
					Qmsg.error("获取vue属性失败");
					return;
				}
				let url = vueObj.url;
				if (!url) {
					Qmsg.error("获取url失败");
					return;
				}
				BilibiliUtils.goToUrl(url);
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 覆盖话题跳转点击事件
	 */
	coverTopicJump() {
		log.info("覆盖话题跳转点击事件");
		DOMUtils.on<PointerEvent | MouseEvent>(
			document,
			"click",
			BilibiliData.className.dynamic + " .launch-app-btn .bili-dyn-topic",
			function (event) {
				utils.preventEvent(event);
				let $click = event.target as HTMLDivElement;
				let vueObj = BilibiliUtils.getVue($click);
				if (!vueObj) {
					Qmsg.error("获取vue属性失败");
					return;
				}
				let data = vueObj?.$props?.data;
				let jump_url = data?.jump_url;
				if (utils.isNull(jump_url)) {
					Qmsg.error("获取jump_url失败");
					return;
				}
				log.info(["话题的跳转信息: ", data]);
				BilibiliUtils.goToUrl(jump_url);
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 覆盖@ 跳转
	 */
	coverAtJump() {
		log.info("覆盖@ 跳转");
		DOMUtils.on<PointerEvent | MouseEvent>(
			document,
			"click",
			BilibiliData.className.dynamic + " .at",
			function (event) {
				utils.preventEvent(event);
				let $click = event.target as HTMLDivElement;
				let oid =
					$click.getAttribute("data-oid") ||
					BilibiliUtils.getVue($click)?.$props?.rid;
				if (utils.isNull(oid)) {
					Qmsg.error("获取data-oid或rid失败");
					return;
				}
				log.info("用户的oid: " + oid);
				BilibiliUtils.goToUrl(BilibiliUrlUtils.getUserSpaceDynamicUrl(oid));
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 覆盖引用的点击事件
	 */
	coverReferenceJump() {
		log.info("覆盖引用的点击事件");
		/* 用户 */
		DOMUtils.on<PointerEvent | MouseEvent>(
			document,
			"click",
			BilibiliData.className.dynamic +
				" .dyn-content .reference .dyn-orig-author",
			function (event) {
				utils.preventEvent(event);
				let $click = event.target as HTMLDivElement;
				let url = $click.getAttribute("data-url");
				if (!url) {
					Qmsg.error("获取data-url失败");
					return;
				}
				BilibiliUtils.goToUrl(url);
			},
			{
				capture: true,
			}
		);
		/* 引用视频 */
		DOMUtils.on<PointerEvent | MouseEvent>(
			document,
			"click",
			BilibiliData.className.dynamic + " .dyn-content .reference .dyn-archive",
			function (event) {
				utils.preventEvent(event);
				let $click = event.target as HTMLDivElement;
				let vueObj = BilibiliUtils.getVue($click);
				if (!vueObj) {
					Qmsg.error("获取vue属性失败");
					return;
				}
				let jump_url = vueObj?.data?.jump_url;
				if (utils.isNull(jump_url)) {
					Qmsg.error("获取jump_url失败");
					return;
				}
				BilibiliUtils.goToUrl(jump_url);
			},
			{
				capture: true,
			}
		);
	},
};

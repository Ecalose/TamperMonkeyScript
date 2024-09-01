import { unsafeWindow } from "ViteGM";
import { DOMUtils, log, utils } from "@/env";
import { CommonUtils } from "@/utils/CommonUtils";
import Qmsg from "qmsg";
import { VueUtils } from "@/utils/VueUtils";

interface LandlordInfo {
	id: number;
	name: string | number;
	name_show: string | number;
	portrait: string | number;
	show_nickname: string | number;
	type: number;
	userhide: number;
}
const TiebaCore = {
	/**
	 * 伪装客户端已调用
	 */
	clientCallMasquerade() {
		let originGetItem = unsafeWindow.localStorage.getItem;
		/* 劫持localStorage */
		unsafeWindow.localStorage.getItem = function (key) {
			if (
				key === "p_w_app_call" ||
				key === "p_w_launchappcall" ||
				key === "loginWakeModal"
			) {
				log.info("伪装客户端已调用 " + key);
				return JSON.stringify({
					value: 1,
					date: utils.formatTime(void 0, "yyyyMMdd"),
				});
			} else if (
				key.startsWith("p_w_new_slient") ||
				key.startsWith("f_w_slient") ||
				key.startsWith("f_w_pop_slient") ||
				key.startsWith("f_w_floor") ||
				key.startsWith("t_w_slient") ||
				key.startsWith("t_w_pop_slient") ||
				key.startsWith("auto_slient_wakeup") ||
				key.startsWith("index_home_thread_guide-") ||
				key.startsWith("search_w_pop_slient-")
			) {
				log.info("伪装客户端已调用 " + key);
				return "1";
			} else {
				return originGetItem.call(window.localStorage, key);
			}
		};
		/* 伪装localStorage已赋值 */
		let masqueradeParamsList = [
			"p_w_new_slient_",
			"f_w_slient_",
			"f_w_pop_slient_",
			"f_w_floor_",
			"t_w_slient_",
			"t_w_pop_slient_",
			"auto_slient_wakeup_",
			"index_home_thread_guide-",
			"search_w_pop_slient-",
		];
		masqueradeParamsList.forEach((masqueradeParam) => {
			window.localStorage.setItem(
				masqueradeParam + utils.formatTime(void 0, "yyyy-MM-dd"),
				"1"
			);
		});
		let masqueradeParamsList2 = ["auto_slient_wake_"];
		masqueradeParamsList2.forEach((masqueradeParam) => {
			window.localStorage.setItem(
				masqueradeParam + utils.formatTime(void 0, "yyyy-MM-dd"),
				JSON.stringify({
					type: "number",
					data: 1,
				})
			);
		});
		for (let index = 0; index < window.localStorage.length; index++) {
			let keyName = window.localStorage.key(index) as string;
			[...masqueradeParamsList, ...masqueradeParamsList2].forEach((item) => {
				if (
					keyName.startsWith(item) &&
					!keyName.endsWith(utils.formatTime(void 0, "yyyy-MM-dd"))
				) {
					log.success("删除过期键 ===> " + keyName);
					window.localStorage.removeItem(keyName);
				}
			});
		}
	},
	/**
	 * 获取本帖楼主的信息
	 */
	getLandlordInfo() {
		return (
			document.querySelector(
				".main-page-wrap .user-line-wrapper.thread-user-line"
			) as NestedObjectWithToString
		)?.__vue__?.$props?.author as LandlordInfo;
	},
	/**
	 * 获取当前的贴吧名字
	 */
	getCurrentForumName(): string {
		let tbMobileViewport = VueUtils.getVue(
			document.querySelector(".tb-mobile-viewport")
		)?.forum?.name;

		let mainPageWrap = VueUtils.getVue(
			document.querySelector(".main-page-wrap")
		)?.$children[0]?.$children[0]?.forum?.name;

		let tbForum = VueUtils.getVue(
			document.querySelector(".tb-mobile-viewport .tb-forum")
		)?.forum?.name;

		let appView = VueUtils.getVue(document.querySelector(".app-view"))?.forum
			?.name;
		return tbMobileViewport || mainPageWrap || tbForum || appView;
	},
	/**
	 * 获取当前的贴吧的id
	 */
	getCurrentForumId(): number {
		let tbMobileViewport = VueUtils.getVue(
			document.querySelector(".tb-mobile-viewport")
		)?.forum?.id;
		let appView = VueUtils.getVue(document.querySelector(".app-view"))?.forum
			?.id;
		return tbMobileViewport || appView;
	},
	/**
	 * 获取当前帖子的tid
	 */
	getCurrentForumPostTid(): string {
		let tid = null;
		let appViewVue = VueUtils.getVue(document.querySelector(".app-view"));
		if (appViewVue?.thread?.id !== "" && appViewVue?.thread?.id != null) {
			tid = appViewVue.thread.id.toString();
		} else {
			tid = window.location.pathname.match(/([0-9]+)/g)?.[0];
		}
		return tid;
	},
	/**
	 * 添加滚动到顶部按钮
	 */
	addScrollTopButton() {
		log.success("添加滚动到顶部按钮");
		let isInsertButton = false;
		let showScrollTopButton = function () {
			isInsertButton = true;
			let buttonElement = DOMUtils.parseHTML(
				/*html*/ `
				<div class="tb-totop whitesev-tb-totop">
				<style>
					.whitesev-tb-totop{
						position: fixed;
						right: .09rem;
						bottom: 1rem;
						z-index: 1000;
					}
					.whitesev-tb-totop .tb-totop__span{
						display: inline-block;
						width: .51rem;
						height: .51rem;
					}
					.whitesev-tb-totop .tb-totop__svg{
						width: 100%;
						height: 100%;
					}
					</style>
					<span class="tb-totop__span">
						<svg class="tb-totop__svg">
						<use xlink:href="#icon_frs_top_50"></use>
						</svg>
					</span>
				</div>`,
				true,
				false
			) as HTMLButtonElement;
			DOMUtils.on(buttonElement, "click", function () {
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: "smooth",
				});
			});
			document.body.appendChild(buttonElement);
		};
		let hideScrollTopButton = function () {
			isInsertButton = false;
			document.querySelector(".whitesev-tb-totop")?.remove();
		};
		let checkScroll = new utils.LockFunction(
			function () {
				let scrollTop =
					window.document.documentElement.scrollTop ||
					window.document.body.scrollTop;
				let scrollHeight =
					window.innerHeight ||
					document.documentElement.clientHeight ||
					window.document.body.clientHeight;
				if (scrollTop > scrollHeight * 2) {
					/* 页面中不存在该按钮元素才显示 */
					if (!isInsertButton) {
						showScrollTopButton();
					}
				} else {
					/* 隐藏 */
					hideScrollTopButton();
				}
			},
			this,
			50
		);
		window.addEventListener("scroll", checkScroll.run);
	},
	/**
	 * 添加顶部的楼主头像/名字的点击事件-直接进入楼主的个人主页
	 */
	addAuthorClickEvent() {
		utils
			.waitNode<HTMLDivElement>(
				"div.main-page-wrap .main-thread-content .user-line"
			)
			.then((element) => {
				log.info("添加顶部的楼主头像/名字的点击事件-直接进入楼主的个人主页");
				DOMUtils.on(element, "click", function () {
					let vueInfo =
						VueUtils.getVue(element.parentElement) ||
						VueUtils.getVue(element.closest(".user-line-wrapper"));
					let authorInfo = vueInfo?.author;
					if (!authorInfo) {
						log.error(["获取贴主信息失败", vueInfo]);
						return;
					}
					log.success(["贴主信息", authorInfo]);
					window.open(`/home/main?id=${authorInfo.portrait}`);
				});
			});
	},
	/**
	 * 检测骨架屏
	 * @time 900
	 */
	checkSkeleton() {
		setTimeout(() => {
			let appElement = document.querySelector("#app");
			if (appElement && appElement.innerHTML === "") {
				Qmsg.warning("检测到骨架屏，异常加载，刷新页面", {
					timeout: 1200,
					onClose() {
						window.location.reload();
					},
				});
			}
		}, 900);
	},
	/**
	 * 自动重定向至主域名
	 */
	autoJumpToMainHost() {
		if (unsafeWindow.top !== unsafeWindow.window) {
			return;
		}
		if (window.location.hostname === "tieba.baidu.com") {
			return;
		}
		let replacePattern = new RegExp(`^${window.location.origin}`);
		window.location.href = window.location.href.replace(
			replacePattern,
			"https://tieba.baidu.com"
		);
	},
};

export { TiebaCore };

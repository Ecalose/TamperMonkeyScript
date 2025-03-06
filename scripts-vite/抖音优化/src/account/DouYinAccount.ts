import { $, log, utils } from "@/env";
import { DouYinElement } from "../utils/DouYinElement";
import { DouYinRouter } from "@/router/DouYinRouter";
import { DouYinUtils } from "@/utils/DouYinUtils";
import { CommonUtil } from "@/utils/CommonUtil";
import { PopsPanel } from "@/setting/setting";

export const DouYinAccount = {
	/**
	 * 伪装登录
	 */
	disguiseLogin() {
		log.info("伪装登录");
		const WAIT_TIME = 20000;
		// let uid = parseInt((Math.random() * 1000000).toString());
		let uid = 114514;
		let info = {
			uid: uid,
			secUid: "",
			shortId: "",
			realName: "",
			// 昵称
			nickname: "乌萨奇",
			// 描述
			desc: "除草证3级",
			// 性别
			gender: 0,
			// 头像
			avatarUrl:
				"https://www.z4a.net/images/2025/02/28/008DOnfHgy1hxpz9zshl4g30hs0hsnpj.gif",
			avatar300Url:
				"https://www.z4a.net/images/2025/02/28/008DOnfHgy1hxpz9zshl4g30hs0hsnpj.gif",
			followStatus: 0,
			followerStatus: 0,
			// 作品数量
			awemeCount: 0,
			// 稍后再看数量
			watchLaterCount: 0,
			// 关注
			followingCount: 0,
			followerCount: 0,
			followerCountStr: "",
			// 粉丝数量
			mplatformFollowersCount: 9999999,
			// 我的喜欢的数量
			favoritingCount: 0,
			// 获赞
			totalFavorited: 9999999,
			userCollectCount: {
				logPb: {
					impr_id: "",
				},
				collectCountList: [],
				statusCode: 0,
				extra: {
					fatal_item_ids: [],
					logid: "",
					now: Date.now(),
				},
			},
			uniqueId: "",
			customVerify: "",
			// 年龄
			age: new Date().getFullYear() - 2019,
			country: "",
			province: "",
			city: "",
			district: "",
			// 学校
			school: "chiikawa",
			// 控制学校显示
			schoolVisible: 1,
			enterpriseVerifyReason: "",
			secret: 1,
			userCanceled: false,
			roomData: {},
			shareQrcodeUrl: "",
			shareInfo: void 0,
			coverAndHeadImageInfo: {
				profileCoverList: [],
			},
			roomId: 0,
			favoritePermission: 1,
			viewHistoryPermission: true,
			isGovMediaVip: false,
			isStar: false,
			hideLocation: false,
			needSpecialShowFollowerCount: false,
			continuationState: 0,
			im_role_ids: [],
			accountCertInfo: {},
			close_consecutive_chat: 0,
		};
		function getUserInfo(element: HTMLElement) {
			let userInfoList = [];
			let reactInstance = utils.getReactObj(element);
			let reactFiber = reactInstance?.reactFiber;
			let reactProps = reactInstance?.reactProps;
			if (reactFiber?.alternate?.return?.memoizedProps?.userInfo) {
				userInfoList.push(
					reactFiber?.alternate?.return?.memoizedProps?.userInfo
				);
			}
			if (reactFiber?.alternate?.return?.memoizedProps?.userInfo?.userInfo) {
				userInfoList.push(
					reactFiber?.alternate?.return?.memoizedProps?.userInfo.userInfo
				);
			}
			if (reactFiber?.alternate?.return?.return?.memoizedProps?.userInfo) {
				userInfoList.push(
					reactFiber?.alternate?.return?.return?.memoizedProps?.userInfo
				);
			}
			if (
				reactFiber?.alternate?.return?.return?.memoizedProps?.userInfo?.userInfo
			) {
				userInfoList.push(
					reactFiber?.alternate?.return?.return?.memoizedProps?.userInfo
						.userInfo
				);
			}
			return userInfoList;
		}
		/**
		 * 设置登录
		 * @param element
		 */
		function setLogin(element: HTMLElement) {
			getUserInfo(element).forEach((userInfo) => {
				if (!userInfo.isLogin) {
					userInfo.info = info;
					userInfo.isLogin = true;
					userInfo.statusCode = 0;
				}
			});
		}
		DouYinElement.watchFeedVideoListChange(($os) => {
			setLogin($os);
		});
		utils
			.waitNode<HTMLDivElement>("#root div[class*='-os']", WAIT_TIME)
			.then(() => {
				let lockFn = new utils.LockFunction(() => {
					let $os = DouYinElement.getOSElement();
					if (!$os) {
						return;
					}
					setLogin($os);
				}, 70);
				utils.mutationObserver(document.body, {
					config: {
						subtree: true,
						childList: true,
					},
					immediate: true,
					callback: () => {
						lockFn.run();
					},
				});
			})
			.catch((err) => {});
		/* 直播的顶部live */
		if (DouYinRouter.isLive()) {
			log.info("伪装登录：live");
			utils
				.waitNode<HTMLDivElement>(
					`[id^="douyin-header"] div:has(.dy-tip-container)`,
					WAIT_TIME
				)
				.then(() => {
					let lockFn = new utils.LockFunction(() => {
						setLogin($<HTMLDivElement>(`[id^="douyin-header"]`)!);
					}, 70);
					utils.mutationObserver(document.body, {
						config: {
							subtree: true,
							childList: true,
						},
						callback: () => {
							lockFn.run();
						},
					});
				});
		} else if (DouYinRouter.isSearch()) {
			log.info("伪装登录：search");
			/* 搜索 */
			function setUserInfoBySearch($ele: HTMLElement) {
				/* 搜索页面的用户信息 */
				let $react = utils.getReactObj($ele);
				let reactFiber = $react?.reactFiber;
				let reactProps = $react?.reactProps;
				if (
					typeof reactProps?.children?.[1]?.props?.userInfo?.isLogin ===
					"boolean"
				) {
					Reflect.set(reactProps.children[1].props.userInfo, "isLogin", true);
				}
				if (typeof reactProps?.children?.[1]?.props?.isClient === "boolean") {
					Reflect.set(reactProps.children[1].props, "isClient", true);
				}
			}
			utils
				.waitNode<HTMLDivElement>("#root > div", WAIT_TIME)
				.then(($rootDiv) => {
					if (!$rootDiv) {
						log.error("#root > div获取失败");
						return;
					}
					let lockFn = new utils.LockFunction(() => {
						setUserInfoBySearch($rootDiv);
					}, 70);
					utils.mutationObserver(document, {
						config: {
							subtree: true,
							childList: true,
						},
						callback: () => {
							lockFn.run();
						},
					});
				});
		}
	},
	/**
	 * 关闭登录弹窗
	 */
	watchLoginDialogToClose() {
		log.info("监听登录弹窗并关闭");
		let result: (HTMLStyleElement | undefined)[] = [
			CommonUtil.addBlockCSS('body > div[id^="login-full-panel-"]'),
		];

		utils.waitNode<HTMLBodyElement>("body").then(() => {
			utils.mutationObserver(document.body, {
				config: {
					subtree: true,
					childList: true,
				},
				callback() {
					if (!PopsPanel.getValue("watchLoginDialogToClose")) {
						return;
					}
					let $loginDialog = $<HTMLDivElement>(
						'body > div[id^="login-full-panel-"]'
					);
					if ($loginDialog) {
						let $loginDialogCloseBtn =
							$loginDialog.querySelector<HTMLDivElement>(".dy-account-close") ||
							$loginDialog.querySelector<HTMLDivElement>(
								'div:has(>svg path[d="M12.7929 22.2426C12.4024 22.6331 12.4024 23.2663 12.7929 23.6568C13.1834 24.0474 13.8166 24.0474 14.2071 23.6568L18.5 19.3639L22.7929 23.6568C23.1834 24.0474 23.8166 24.0474 24.2071 23.6568C24.5976 23.2663 24.5976 22.6331 24.2071 22.2426L19.9142 17.9497L24.1066 13.7573C24.4971 13.3668 24.4971 12.7336 24.1066 12.3431C23.7161 11.9526 23.0829 11.9526 22.6924 12.3431L18.5 16.5355L14.3076 12.3431C13.9171 11.9526 13.2839 11.9526 12.8934 12.3431C12.5029 12.7336 12.5029 13.3668 12.8934 13.7573L17.0858 17.9497L12.7929 22.2426Z"])'
							);
						if ($loginDialogCloseBtn) {
							let reactInstance = utils.getReactObj($loginDialogCloseBtn);
							let onClick = reactInstance?.reactProps?.onClick;
							if (typeof onClick === "function") {
								onClick(new Event("click"));
							} else {
								log.error("监听到登录弹窗但是关闭失败，未获取到onClick函数");
							}
						} else {
							log.error(
								"未找到登录弹出的关闭按钮，此时键盘被聚焦在登录弹窗上从而导致'快捷键'失效",
								$loginDialog
							);
						}
					}
				},
			});
		});

		return result;
	},
};

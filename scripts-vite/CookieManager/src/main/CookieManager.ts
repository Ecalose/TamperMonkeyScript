import { log, utilsCookieManager } from "@/env";
import { CookieManagerView } from "./CookieManagerView";
import { GM_cookie, unsafeWindow } from "ViteGM";
import { PopsPanel } from "@/setting/panel";
import Qmsg from "qmsg";

export type CookieManagerApiName =
	| "document.cookie"
	| "GM_cookie"
	| "cookieStore";

export const CookieManager = {
	get cookieManagerApiName() {
		let managerApi = PopsPanel.getValue(
			"cookie-manager-api",
			"document.cookie" as CookieManagerApiName
		);
		return managerApi;
	},
	get cookieManager() {
		if (this.cookieManagerApiName === "GM_cookie") {
			return GM_cookie;
		} else if (this.cookieManagerApiName === "cookieStore") {
			let cookieStore = unsafeWindow.cookieStore;
			return {
				list(
					options: {},
					callback: (cookieListResult: CookieStoreData[]) => void
				) {
					cookieStore
						.getAll()
						.then((result) => {
							callback(result);
						})
						.catch((reason) => {
							log.error(reason);
							Qmsg.error(reason.toString());
						});
				},
				set(
					cookieInfo: GMCookieInstance,
					callback: (error?: Error | undefined | null) => void
				) {
					cookieStore
						.set(cookieInfo)
						.then(() => {
							callback();
						})
						.catch((reason) => {
							callback(reason);
						});
				},
				delete(
					cookieInfo: GMCookieInstance,
					callback: (error?: Error | undefined | null) => void
				) {
					cookieStore
						.delete(cookieInfo)
						.then((result) => {
							callback();
						})
						.catch((reason) => {
							callback(reason);
						});
				},
			};
		} else {
			return utilsCookieManager;
		}
	},
	/**
	 * 查询所有Cookie
	 */
	queryAllCookie() {
		return new Promise<(GMCookieInstance | CookieStoreData)[]>((resolve) => {
			this.cookieManager.list({}, (cookieListResult) => {
				let __cookieListResult__ = cookieListResult || [];
				__cookieListResult__ = __cookieListResult__.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
				resolve(__cookieListResult__);
			});
		});
	},
	/**
	 * 清除所有Cookie
	 */
	deleteAllCookie() {
		return new Promise<{
			success: number;
			error: number;
		}>((resolve) => {
			this.cookieManager.list({}, async (cookieListResult) => {
				const __cookieListResult__ = cookieListResult || [];
				const result = {
					success: 0,
					error: 0,
				};
				for (let index = 0; index < __cookieListResult__.length; index++) {
					const cookieListItem = __cookieListResult__[index];
					let deleteError = await new Promise<
						Error | null | undefined | string
					>((deleteResolve) => {
						this.deleteCookie(cookieListItem).then((deleteResult) => {
							deleteResolve(deleteResult);
						});
					});
					if (deleteError) {
						result.error++;
					} else {
						result.success++;
					}
				}
				resolve(result);
			});
		});
	},
	/**
	 * 添加Cookie
	 */
	addCookie(cookieInfo: GMCookieInstance) {
		return new Promise<string | Error | null | undefined>((resolve) => {
			// @ts-ignore
			delete cookieInfo.hostOnly;
			// @ts-ignore
			CookieManager.cookieManager.set(cookieInfo, (error) => {
				log.info(["添加Cookie", cookieInfo]);
				resolve(error);
			});
		});
	},
	/**
	 * 删除Cookie
	 */
	deleteCookie(cookieInfo: GMCookieInstance | CookieStoreData) {
		return new Promise<string | Error | null | undefined>((resolve) => {
			// @ts-ignore
			CookieManager.cookieManager.delete(cookieInfo, (error) => {
				log.info(["删除Cookie", cookieInfo]);
				resolve(error);
			});
		});
	},
	/**
	 * 更新Cookie
	 */
	updateCookie(cookieInfo: GMCookieInstance) {
		return new Promise<string | Error | null | undefined>(async (resolve) => {
			let result: any;
			try {
				log.info(["更新Cookie", cookieInfo]);
				let deleteError = await CookieManager.deleteCookie(cookieInfo);
				log.error(deleteError);
				if (deleteError) {
					throw new TypeError(deleteError.toString());
				}
				let addError = await CookieManager.addCookie(cookieInfo);
				log.error(addError);
				if (addError) {
					throw new TypeError(addError.toString());
				}
			} catch (error: any) {
				result = error;
			} finally {
				resolve(result);
			}
		});
	},
};

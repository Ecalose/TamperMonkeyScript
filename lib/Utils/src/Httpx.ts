import { CommonUtil } from "./CommonUtil";
import { TryCatch } from "./TryCatch";
import type {
	HttpxAllowInterceptConfig,
	HttpxHookErrorData,
	HttpxMethod,
	HttpxRequestOption,
	HttpxResponse,
	HttpxResponseData,
	HttpxPromise,
	HttpxInitOption,
} from "./types/Httpx";
import { GenerateUUID } from "./UtilsCommon";

export class Httpx {
	private GM_Api = {
		xmlHttpRequest: null as any,
	};
	private HttpxRequestHook = {
		/**
		 * @private
		 */
		$config: {
			configList: <
				{
					id: string;
					fn: Function | Promise<Function>;
				}[]
			>[],
		},
		/**
		 * 发送请求前的回调
		 * 如果返回false则阻止本次返回
		 * @param details 当前的请求配置
		 * @private
		 */
		async beforeRequestCallBack(details: HttpxRequestOption) {
			if (typeof details.allowInterceptConfig === "boolean") {
				if (!details.allowInterceptConfig) {
					// 不允许拦截
					return details;
				}
			} else {
				if (details.allowInterceptConfig != null) {
					// 配置存在
					// 细分处理是否拦截
					if (
						typeof details.allowInterceptConfig.beforeRequest === "boolean" &&
						!details.allowInterceptConfig.beforeRequest
					) {
						// 设置了禁止拦截
						return details;
					}
				} else {
					// 配置不存在
					// 默认允许拦截
				}
			}
			for (let index = 0; index < this.$config.configList.length; index++) {
				let item = this.$config.configList[index];
				if (typeof item.fn === "function") {
					let result = await item.fn(details);
					if (result == null) {
						return;
					}
				}
			}
			return details;
		},
		/**
		 * 添加请求前的回调处理配置
		 */
		add(fn: Function) {
			if (typeof fn === "function") {
				let uuid = GenerateUUID();
				this.$config.configList.push({
					id: uuid,
					fn: fn,
				});
				return uuid;
			} else {
				console.warn(
					"[Httpx-HttpxRequestHook.addBeforeRequestCallBack] fn is not a function"
				);
			}
		},
		/**
		 * 删除请求前的回调处理配置
		 * @param id
		 */
		delete(id: string) {
			if (typeof id === "string") {
				let findIndex = this.$config.configList.findIndex(
					(item) => item.id === id
				);
				if (findIndex !== -1) {
					this.$config.configList.splice(findIndex, 1);
					return true;
				}
			}
			return false;
		},
		/**
		 * 清空设置的请求前的回调处理配置
		 */
		clearAll() {
			this.$config.configList = [];
		},
	};
	private HttpxResponseHook = {
		/**
		 * @private
		 */
		$config: {
			configList: <
				{
					id: string;
					successFn?: Function | Promise<Function>;
					errorFn?: Function | Promise<Function>;
				}[]
			>[],
		},
		/**
		 * 成功的回调
		 * @param response 响应
		 * @param details 请求的配置
		 */
		async successResponseCallBack(
			response: HttpxResponseData<HttpxRequestOption>,
			details: HttpxRequestOption
		) {
			if (typeof details.allowInterceptConfig === "boolean") {
				if (!details.allowInterceptConfig) {
					// 不允许拦截
					return details;
				}
			} else {
				if (details.allowInterceptConfig != null) {
					// 配置存在
					// 细分处理是否拦截
					if (
						typeof details.allowInterceptConfig.afterResponseSuccess ===
							"boolean" &&
						!details.allowInterceptConfig.afterResponseSuccess
					) {
						// 设置了禁止拦截
						return details;
					}
				} else {
					// 配置不存在
					// 默认允许拦截
				}
			}
			for (let index = 0; index < this.$config.configList.length; index++) {
				let item = this.$config.configList[index];
				if (typeof item.successFn === "function") {
					let result = await item.successFn(response, details);
					if (result == null) {
						return;
					}
				}
			}
			return response;
		},
		/**
		 * 失败的回调
		 * @param data 配置
		 * @returns
		 * 返回null|undefined就是拦截掉了
		 */
		async errorResponseCallBack<T extends HttpxHookErrorData>(data: T) {
			if (typeof data.details.allowInterceptConfig === "boolean") {
				if (!data.details.allowInterceptConfig) {
					// 不允许拦截
					return data;
				}
			} else {
				if (data.details.allowInterceptConfig != null) {
					// 配置存在
					// 细分处理是否拦截
					if (
						typeof data.details.allowInterceptConfig.afterResponseError ===
							"boolean" &&
						!data.details.allowInterceptConfig.afterResponseError
					) {
						// 设置了禁止拦截
						return data;
					}
				} else {
					// 配置不存在
					// 默认允许拦截
				}
			}
			for (let index = 0; index < this.$config.configList.length; index++) {
				let item = this.$config.configList[index];
				if (typeof item.errorFn === "function") {
					let result = await item.errorFn(data);
					if (result == null) {
						return;
					}
				}
			}
			return data;
		},
		/**
		 * 添加请求前的回调处理配置
		 */
		add(successFn?: Function, errorFn?: Function) {
			let id = GenerateUUID();
			this.$config.configList.push({
				id: id,
				successFn: successFn,
				errorFn: errorFn,
			});
			return id;
		},
		/**
		 * 删除请求前的回调处理配置
		 * @param id
		 */
		delete(id: string) {
			if (typeof id === "string") {
				let findIndex = this.$config.configList.findIndex(
					(item) => item.id === id
				);
				if (findIndex !== -1) {
					this.$config.configList.splice(findIndex, 1);
					return true;
				}
			}
			return false;
		},
		/**
		 * 清空设置的请求前的回调处理配置
		 */
		clearAll() {
			this.$config.configList = [];
		},
	};
	private HttpxRequestOption = {
		context: this,
		/**
		 * 对请求的参数进行合并处理
		 */
		handleBeforeRequestOptionArgs(...args: (HttpxRequestOption | string)[]) {
			let option: HttpxRequestOption = {
				url: void 0 as any as string,
			};
			if (typeof args[0] === "string") {
				/* 传入的是url，转为配置 */
				let url = args[0];
				option.url = url;
				if (typeof args[1] === "object") {
					/* 处理第二个参数details */
					let optionArg = args[1];
					CommonUtil.assign(option, optionArg, true);
					option.url = url;
				}
			} else {
				/* 传入的是配置 */
				let optionArg = args[0];
				CommonUtil.assign(option, optionArg, true);
			}
			return option;
		},
		/**
		 * 获取请求配置
		 * @param method 当前请求方法，默认get
		 * @param userRequestOption 用户的请求配置
		 * @param resolve promise回调
		 * @param reject promise抛出错误回调
		 */
		getRequestOption(
			method: HttpxMethod,
			userRequestOption: HttpxRequestOption,
			resolve: (...args: any[]) => void,
			reject: (...args: any[]) => void
		) {
			let that = this;
			let url = userRequestOption.url || this.context.#defaultRequestOption.url;
			if (typeof url === "string") {
				// 去除左右空格
				url = url.trim();
				if (url.startsWith("http://") || url.startsWith("https://")) {
					// 标准的http请求
				} else {
					if (typeof this.context.#defaultInitOption.baseURL === "string") {
						// 设置了基础域
						url = this.context.#defaultInitOption.baseURL + url;
					}
				}
			}
			let requestOption = <Required<HttpxRequestOption>>{
				url: url,
				method: (method || "GET").toString().toUpperCase().trim(),
				timeout:
					userRequestOption.timeout ||
					this.context.#defaultRequestOption.timeout,
				responseType:
					userRequestOption.responseType ||
					this.context.#defaultRequestOption.responseType,
				/* 对象使用深拷贝 */
				headers: CommonUtil.deepClone(
					this.context.#defaultRequestOption.headers
				),
				data: userRequestOption.data || this.context.#defaultRequestOption.data,
				redirect:
					userRequestOption.redirect ||
					this.context.#defaultRequestOption.redirect,
				cookie:
					userRequestOption.cookie || this.context.#defaultRequestOption.cookie,
				cookiePartition:
					userRequestOption.cookiePartition ||
					this.context.#defaultRequestOption.cookiePartition,
				binary:
					userRequestOption.binary || this.context.#defaultRequestOption.binary,
				nocache:
					userRequestOption.nocache ||
					this.context.#defaultRequestOption.nocache,
				revalidate:
					userRequestOption.revalidate ||
					this.context.#defaultRequestOption.revalidate,
				/* 对象使用深拷贝 */
				context: CommonUtil.deepClone(
					userRequestOption.context ||
						this.context.#defaultRequestOption.context
				),
				overrideMimeType:
					userRequestOption.overrideMimeType ||
					this.context.#defaultRequestOption.overrideMimeType,
				anonymous:
					userRequestOption.anonymous ||
					this.context.#defaultRequestOption.anonymous,
				fetch:
					userRequestOption.fetch || this.context.#defaultRequestOption.fetch,
				/* 对象使用深拷贝 */
				fetchInit: CommonUtil.deepClone(
					this.context.#defaultRequestOption.fetchInit
				),
				allowInterceptConfig: {
					beforeRequest: (
						this.context.#defaultRequestOption
							.allowInterceptConfig as HttpxAllowInterceptConfig
					).beforeRequest,
					afterResponseSuccess: (
						this.context.#defaultRequestOption
							.allowInterceptConfig as HttpxAllowInterceptConfig
					).afterResponseSuccess,
					afterResponseError: (
						this.context.#defaultRequestOption
							.allowInterceptConfig as HttpxAllowInterceptConfig
					).afterResponseError,
				},
				user: userRequestOption.user || this.context.#defaultRequestOption.user,
				password:
					userRequestOption.password ||
					this.context.#defaultRequestOption.password,
				onabort(...args) {
					that.context.HttpxResponseCallBack.onAbort(
						userRequestOption as Required<HttpxRequestOption>,
						resolve,
						reject,
						args
					);
				},
				onerror(...args) {
					that.context.HttpxResponseCallBack.onError(
						userRequestOption as Required<HttpxRequestOption>,
						resolve,
						reject,
						args
					);
				},
				onloadstart(...args) {
					that.context.HttpxResponseCallBack.onLoadStart(
						userRequestOption as Required<HttpxRequestOption>,
						args
					);
				},
				onprogress(...args) {
					that.context.HttpxResponseCallBack.onProgress(
						userRequestOption as Required<HttpxRequestOption>,
						args
					);
				},
				onreadystatechange(...args) {
					that.context.HttpxResponseCallBack.onReadyStateChange(
						userRequestOption as Required<HttpxRequestOption>,
						args
					);
				},
				ontimeout(...args) {
					that.context.HttpxResponseCallBack.onTimeout(
						userRequestOption as Required<HttpxRequestOption>,
						resolve,
						reject,
						args
					);
				},
				onload(...args) {
					that.context.HttpxResponseCallBack.onLoad(
						userRequestOption as Required<HttpxRequestOption>,
						resolve,
						reject,
						args
					);
				},
			};
			// 补全allowInterceptConfig参数
			if (typeof userRequestOption.allowInterceptConfig === "boolean") {
				Object.keys(
					requestOption.allowInterceptConfig as HttpxAllowInterceptConfig
				).forEach((keyName) => {
					Reflect.set(
						requestOption.allowInterceptConfig as HttpxAllowInterceptConfig,
						keyName,
						userRequestOption.allowInterceptConfig
					);
				});
			} else {
				if (
					typeof userRequestOption.allowInterceptConfig === "object" &&
					userRequestOption.allowInterceptConfig != null
				) {
					Object.keys(userRequestOption.allowInterceptConfig).forEach(
						(keyName) => {
							let value = Reflect.get(
								userRequestOption.allowInterceptConfig as HttpxAllowInterceptConfig,
								keyName
							) as Boolean;
							if (
								typeof value === "boolean" &&
								Reflect.has(
									requestOption.allowInterceptConfig as HttpxAllowInterceptConfig,
									keyName
								)
							) {
								Reflect.set(
									requestOption.allowInterceptConfig as HttpxAllowInterceptConfig,
									keyName,
									value
								);
							}
						}
					);
				}
			}
			if (typeof this.context.GM_Api.xmlHttpRequest !== "function") {
				// GM函数不存在，强制使用fetch
				requestOption.fetch = true;
			}
			if (typeof requestOption.headers === "object") {
				if (typeof userRequestOption.headers === "object") {
					Object.keys(userRequestOption.headers).forEach((keyName, index) => {
						if (
							keyName in requestOption.headers &&
							userRequestOption!.headers?.[keyName] == null
						) {
							/* 在默认的header中存在，且设置它新的值为空，那么就是默认的值 */
							Reflect.deleteProperty(requestOption.headers, keyName);
						} else {
							requestOption.headers[keyName] =
								userRequestOption?.headers?.[keyName];
						}
					});
				} else {
					/* details.headers为空 */
					/* 不做处理 */
				}
			} else {
				/* 默认的headers不是对象，那么就直接使用新的 */
				Reflect.set(requestOption, "headers", userRequestOption.headers);
			}
			if (typeof requestOption.fetchInit === "object") {
				/* 使用assign替换且添加 */
				if (typeof userRequestOption.fetchInit === "object") {
					Object.keys(userRequestOption.fetchInit).forEach((keyName, index) => {
						if (
							keyName in requestOption.fetchInit &&
							(userRequestOption as any).fetchInit[keyName] == null
						) {
							/* 在默认的fetchInit中存在，且设置它新的值为空，那么就是默认的值 */
							Reflect.deleteProperty(requestOption.fetchInit, keyName);
						} else {
							Reflect.set(
								requestOption.fetchInit,
								keyName,
								Reflect.get(userRequestOption.fetchInit!, keyName)
							);
						}
					});
				}
			} else {
				Reflect.set(requestOption, "fetchInit", userRequestOption.fetchInit);
			}

			// 处理新的cookiePartition
			if (
				typeof requestOption.cookiePartition === "object" &&
				requestOption.cookiePartition != null
			) {
				if (
					Reflect.has(requestOption.cookiePartition, "topLevelSite") &&
					typeof requestOption.cookiePartition.topLevelSite !== "string"
				) {
					// topLevelSite必须是字符串
					Reflect.deleteProperty(requestOption.cookiePartition, "topLevelSite");
				}
			}

			/* 完善请求的url */
			try {
				new URL(requestOption.url);
			} catch (error) {
				if (requestOption.url.startsWith("//")) {
					// 补充https:
					requestOption.url = globalThis.location.protocol + requestOption.url;
				} else if (requestOption.url.startsWith("/")) {
					// 补充origin
					requestOption.url = globalThis.location.origin + requestOption.url;
				} else {
					// 补充origin+/
					requestOption.url =
						globalThis.location.origin + "/" + requestOption.url;
				}
			}

			if (requestOption.fetchInit && !requestOption.fetch) {
				// 清空fetchInit
				Reflect.deleteProperty(requestOption, "fetchInit");
			}

			// 转换data类型
			try {
				/** 是否对数据进行处理 */
				let processData = userRequestOption.processData ?? true;
				if (requestOption.data != null && processData) {
					let method = requestOption.method;
					if (method === "GET" || method === "HEAD") {
						// GET类型，data如果有，那么需要转为searchParams
						let urlObj = new URL(requestOption.url);
						let urlSearch = "";
						let isHandler = false;
						if (typeof requestOption.data === "string") {
							isHandler = true;
							urlSearch = requestOption.data;
						} else if (typeof requestOption.data === "object") {
							isHandler = true;
							// URLSearchParams参数可以转普通的string:string，包括FormData
							let searchParams = new URLSearchParams(
								requestOption.data as Record<string, string>
							);
							urlSearch = searchParams.toString();
						}
						if (isHandler) {
							// GET/HEAD请求不支持data参数
							// 对data进行处理了才可以删除
							Reflect.deleteProperty(requestOption, "data");
						}
						if (urlSearch != "") {
							if (urlObj.search === "") {
								// url没有search参数，直接覆盖
								urlObj.search = urlSearch;
							} else {
								// 有search参数
								if (urlObj.search.endsWith("&")) {
									// xxx=xxx&
									urlObj.search = urlObj.search + urlSearch;
								} else {
									// xxx=xxx&xxx=
									urlObj.search = urlObj.search + "&" + urlSearch;
								}
							}
						}
						requestOption.url = urlObj.toString();
					} else if (method === "POST" && requestOption.headers != null) {
						// POST类型，data如果是FormData，那么需要转为string
						let headersKeyList = Object.keys(requestOption.headers);
						let ContentTypeIndex = headersKeyList.findIndex((headerKey) => {
							return (
								headerKey.trim().toLowerCase() === "content-type" &&
								typeof requestOption.headers[headerKey] === "string"
							);
						});
						if (ContentTypeIndex !== -1) {
							let ContentTypeKey = headersKeyList[ContentTypeIndex];
							let ContentType = requestOption.headers[ContentTypeKey] as string;
							// 设置了Content-Type
							if (ContentType.includes("application/json")) {
								// application/json
								if (requestOption.data instanceof FormData) {
									const entries: { [key: string]: any } = {};
									requestOption.data.forEach((value, key) => {
										entries[key] = value;
									});
									requestOption.data = JSON.stringify(entries);
								} else if (typeof requestOption.data === "object") {
									requestOption.data = JSON.stringify(requestOption.data);
								}
							} else if (
								ContentType.includes("application/x-www-form-urlencoded")
							) {
								// application/x-www-form-urlencoded
								if (typeof requestOption.data === "object") {
									requestOption.data = new URLSearchParams(
										requestOption.data as Record<string, string>
									).toString();
								}
							} else if (ContentType.includes("multipart/form-data")) {
								// multipart/form-data
								if (requestOption.data instanceof FormData) {
									Reflect.deleteProperty(requestOption.headers, ContentTypeKey);
								}
							}
						}
					}
				}
			} catch (error) {
				console.warn("Httpx ==> 转换data参数错误", error);
			}

			return requestOption;
		},
		/**
		 * 处理发送请求的配置，去除值为undefined、空function的值
		 * @param option 请求配置
		 */
		removeRequestNullOption(
			option: Required<HttpxRequestOption>
		): HttpxRequestOption {
			Object.keys(option).forEach((keyName) => {
				if (
					option[keyName as keyof HttpxRequestOption] == null ||
					(option[keyName as keyof HttpxRequestOption] instanceof Function &&
						CommonUtil.isNull(option[keyName as keyof HttpxRequestOption]))
				) {
					Reflect.deleteProperty(option, keyName);
					return;
				}
			});
			if (CommonUtil.isNull(option.url)) {
				throw new TypeError(`Utils.Httpx 参数url不能为空：${option.url}`);
			}
			return option;
		},
		/**
		 * 处理fetch的配置
		 * @param option 请求配置
		 */
		handleFetchOption(option: Required<HttpxRequestOption>) {
			/**
			 * fetch的请求配置
			 **/
			let fetchRequestOption = <RequestInit>{};
			if (
				(option.method === "GET" || option.method === "HEAD") &&
				option.data != null
			) {
				/* GET 或 HEAD 方法的请求不能包含 body 信息 */
				Reflect.deleteProperty(option, "data");
			}
			/* 中止信号控制器 */
			let abortController = new AbortController();
			let signal = abortController.signal;
			signal.onabort = () => {
				option.onabort({
					isFetch: true,
					responseText: "",
					response: null,
					readyState: 4,
					responseHeaders: "",
					status: 0,
					statusText: "",
					error: "aborted",
				});
			};
			// 设置请求
			fetchRequestOption.method = option.method ?? "GET";
			// 设置请求头
			fetchRequestOption.headers = option.headers;
			// 设置请求体
			fetchRequestOption.body = option.data as string | FormData;
			// 设置跨域
			fetchRequestOption.mode = "cors";
			// 设置包含
			fetchRequestOption.credentials = "include";
			// 设置不缓存
			fetchRequestOption.cache = "no-cache";
			// 设置始终重定向
			fetchRequestOption.redirect = "follow";
			// 设置referer跨域
			fetchRequestOption.referrerPolicy = "origin-when-cross-origin";
			// 设置信号中断
			fetchRequestOption.signal = signal;
			Object.assign(fetchRequestOption, option.fetchInit || {});
			return {
				fetchOption: option,
				fetchRequestOption: fetchRequestOption,
				abortController: abortController,
			};
		},
	};
	private HttpxResponseCallBack = {
		context: this,
		/**
		 * onabort请求被取消-触发
		 * @param details 配置
		 * @param resolve promise回调
		 * @param reject promise抛出错误回调
		 * @param argsResult 返回的参数列表
		 */
		async onAbort(
			details: Required<HttpxRequestOption>,
			resolve: (resultOption: HttpxResponse<HttpxRequestOption>) => void,
			reject: (...args: any[]) => void,
			argsResult: any
		) {
			// console.log(argsResult);
			if (typeof details?.onabort === "function") {
				details.onabort.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.onabort === "function"
			) {
				this.context.#defaultRequestOption.onabort.apply(this, argsResult);
			}
			let response = argsResult;
			if (response.length) {
				response = response[0];
			}
			if (
				(await this.context.HttpxResponseHook.errorResponseCallBack({
					type: "onabort",
					error: new Error("request canceled"),
					response: null,
					details: details,
				})) == null
			) {
				// reject(new Error("response is intercept with onabort"));
				return;
			}
			resolve({
				data: response,
				details: details,
				msg: "请求被取消",
				status: false,
				statusCode: -1,
				type: "onabort",
			});
		},
		/**
		 * ontimeout请求超时-触发
		 * @param details 配置
		 * @param resolve 回调
		 * @param reject 抛出错误
		 * @param argsResult 返回的参数列表
		 */
		async onTimeout(
			details: Required<HttpxRequestOption>,
			resolve: (resultOption: HttpxResponse<HttpxRequestOption>) => void,
			reject: (...args: any[]) => void,
			argsResult: any
		) {
			// console.log(argsResult);
			if (typeof details?.ontimeout === "function") {
				// 执行配置中的ontime回调
				details.ontimeout.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.ontimeout === "function"
			) {
				// 执行默认配置的ontime回调
				this.context.#defaultRequestOption.ontimeout.apply(this, argsResult);
			}
			// 获取响应结果
			let response = argsResult;
			if (response.length) {
				response = response[0];
			}
			// 执行错误回调的钩子
			if (
				(await this.context.HttpxResponseHook.errorResponseCallBack({
					type: "ontimeout",
					error: new Error("request timeout"),
					response: response,
					details: details,
				})) == null
			) {
				// reject(new Error("response is intercept with ontimeout"));
				return;
			}
			resolve({
				data: response,
				details: details,
				msg: "请求超时",
				status: false,
				statusCode: 0,
				type: "ontimeout",
			});
		},
		/**
		 * onerror请求异常-触发
		 * @param details 配置
		 * @param resolve 回调
		 * @param reject 抛出错误
		 * @param argsResult 返回的参数列表
		 */
		async onError(
			details: Required<HttpxRequestOption>,
			resolve: (resultOption: HttpxResponse<HttpxRequestOption>) => void,
			reject: (...args: any[]) => void,
			argsResult: any
		) {
			// console.log(argsResult);
			if (typeof details?.onerror === "function") {
				details.onerror.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.onerror === "function"
			) {
				this.context.#defaultRequestOption.onerror.apply(this, argsResult);
			}
			let response = argsResult;
			if (response.length) {
				response = response[0];
			}
			if (
				(await this.context.HttpxResponseHook.errorResponseCallBack({
					type: "onerror",
					error: new Error("request error"),
					response: response,
					details: details,
				})) == null
			) {
				// reject(new Error("response is intercept with onerror"));
				return;
			}
			resolve({
				data: response,
				details: details,
				msg: "请求异常",
				status: false,
				statusCode: response["status"],
				type: "onerror",
			});
		},
		/**
		 * onload加载完毕-触发
		 * @param details 请求的配置
		 * @param resolve 回调
		 * @param reject 抛出错误
		 * @param argsResult 返回的参数列表
		 */
		async onLoad(
			details: Required<HttpxRequestOption>,
			resolve: (resultOption: HttpxResponse<HttpxRequestOption>) => void,
			reject: (...args: any[]) => void,
			argsResult: any[]
		) {
			// console.log(argsResult);
			/* X浏览器会因为设置了responseType导致不返回responseText */
			let originResponse: HttpxResponseData<HttpxRequestOption> = argsResult[0];
			/* responseText为空，response不为空的情况 */
			if (
				CommonUtil.isNull(originResponse["responseText"]) &&
				CommonUtil.isNotNull(originResponse["response"])
			) {
				if (typeof originResponse["response"] === "object") {
					TryCatch().run(() => {
						originResponse["responseText"] = JSON.stringify(
							originResponse["response"]
						);
					});
				} else {
					originResponse["responseText"] = originResponse["response"] as string;
				}
			}

			/* response为空，responseText不为空的情况 */
			if (
				originResponse["response"] == null &&
				typeof originResponse["responseText"] === "string" &&
				originResponse["responseText"].trim() !== ""
			) {
				/** 原始的请求text */
				let httpxResponseText = originResponse.responseText;
				// 自定义个新的response
				let httpxResponse: any = httpxResponseText;
				if (details.responseType === "json") {
					httpxResponse = CommonUtil.toJSON(httpxResponseText);
				} else if (details.responseType === "document") {
					let parser = new DOMParser();
					httpxResponse = parser.parseFromString(
						httpxResponseText,
						"text/html"
					);
				} else if (details.responseType === "arraybuffer") {
					let encoder = new TextEncoder();
					let arrayBuffer = encoder.encode(httpxResponseText);
					httpxResponse = arrayBuffer;
				} else if (details.responseType === "blob") {
					let encoder = new TextEncoder();
					let arrayBuffer = encoder.encode(httpxResponseText);
					httpxResponse = new Blob([arrayBuffer]);
				}
				// 尝试覆盖原response
				try {
					let setStatus = Reflect.set(
						originResponse,
						"response",
						httpxResponse
					);
					if (!setStatus) {
						console.warn(
							"[Httpx-HttpxCallBack.oonLoad] 覆盖原始 response 失败，尝试添加新的httpxResponse"
						);
						try {
							Reflect.set(originResponse, "httpxResponse", httpxResponse);
						} catch (error) {
							console.warn(
								"[Httpx-HttpxCallBack.oonLoad] httpxResponse 无法被覆盖"
							);
						}
					}
				} catch (error) {
					console.warn(
						"[Httpx-HttpxCallBack.oonLoad] 原始 response 无法被覆盖，尝试添加新的httpxResponse"
					);
					try {
						Reflect.set(originResponse, "httpxResponse", httpxResponse);
					} catch (error) {
						console.warn(
							"[Httpx-HttpxCallBack.oonLoad] httpxResponse 无法被覆盖"
						);
					}
				}
			}
			/* Stay扩展中没有finalUrl，对应的是responseURL */
			let originResponseURL = Reflect.get(originResponse, "responseURL");
			if (originResponse["finalUrl"] == null && originResponseURL != null) {
				Reflect.set(originResponse, "finalUrl", originResponseURL);
			}

			/* 状态码2xx都是成功的 */
			if (Math.floor(originResponse.status / 100) === 2) {
				if (
					(await this.context.HttpxResponseHook.successResponseCallBack(
						originResponse,
						details
					)) == null
				) {
					// reject(new Error("response is intercept with onloada"));
					return;
				}
				resolve({
					data: originResponse,
					details: details,
					msg: "请求成功",
					status: true,
					statusCode: originResponse.status,
					type: "onload",
				});
			} else {
				this.context.HttpxResponseCallBack.onError(
					details,
					resolve,
					reject,
					argsResult
				);
			}
		},
		/**
		 * onloadstart请求开始-触发
		 * @param details 配置
		 * @param argsResult 返回的参数列表
		 */
		onLoadStart(details: Required<HttpxRequestOption>, argsResult: any[]) {
			// console.log(argsResult);
			if (typeof details?.onloadstart === "function") {
				details.onloadstart.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.onloadstart === "function"
			) {
				this.context.#defaultRequestOption.onloadstart.apply(this, argsResult);
			}
		},
		/**
		 * onreadystatechange准备状态改变-触发
		 * @param details 配置
		 * @param argsResult 返回的参数列表
		 */
		onReadyStateChange(
			details: Required<HttpxRequestOption>,
			argsResult: any[]
		) {
			// console.log(argsResult);
			if (typeof details?.onreadystatechange === "function") {
				details.onreadystatechange.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.onreadystatechange ===
				"function"
			) {
				this.context.#defaultRequestOption.onreadystatechange.apply(
					this,
					argsResult
				);
			}
		},
		/**
		 * onprogress上传进度-触发
		 * @param details 配置
		 * @param argsResult 返回的参数列表
		 */
		onProgress(details: Required<HttpxRequestOption>, argsResult: any[]) {
			// console.log(argsResult);
			if (typeof details?.onprogress === "function") {
				details.onprogress.apply(this, argsResult);
			} else if (
				typeof this.context.#defaultRequestOption?.onprogress === "function"
			) {
				this.context.#defaultRequestOption.onprogress.apply(this, argsResult);
			}
		},
	};
	private HttpxRequest = {
		context: this,
		/**
		 * 发送请求
		 * @param details
		 */
		async request(details: Required<HttpxRequestOption>) {
			if (this.context.#defaultInitOption.logDetails) {
				console.log("[Httpx-HttpxRequest.request] 请求前的配置👇", details);
			}
			if (
				typeof this.context.HttpxRequestHook.beforeRequestCallBack ===
				"function"
			) {
				let hookResult =
					await this.context.HttpxRequestHook.beforeRequestCallBack(details);
				if (hookResult == null) {
					return;
				}
			}
			if (details.fetch) {
				// 使用fetch请求
				const {
					fetchOption: fetchOption,
					fetchRequestOption: fetchRequestOption,
					abortController,
				} = this.context.HttpxRequestOption.handleFetchOption(details);
				return this.fetch(fetchOption, fetchRequestOption, abortController);
			} else {
				// 使用GM_xmlHttpRequest请求
				return this.xmlHttpRequest(details);
			}
		},
		/**
		 * 使用油猴函数GM_xmlhttpRequest发送请求
		 * @param details
		 */
		xmlHttpRequest(details: Required<HttpxRequestOption>) {
			return this.context.GM_Api.xmlHttpRequest(details) as {
				abort: () => void;
			};
		},
		/**
		 * 使用fetch发送请求
		 * @param option
		 * @param fetchRequestOption
		 * @param abortController
		 */
		fetch(
			option: Required<HttpxRequestOption>,
			fetchRequestOption: RequestInit,
			abortController: AbortController
		) {
			fetch(option.url, fetchRequestOption)
				.then(async (fetchResponse) => {
					/** 自定义的response */
					let httpxResponse: HttpxResponseData<HttpxRequestOption> = {
						isFetch: true,
						finalUrl: fetchResponse.url,
						readyState: 4,
						status: fetchResponse.status,
						statusText: fetchResponse.statusText,
						response: "",
						responseFetchHeaders: fetchResponse.headers,
						responseHeaders: "",
						responseText: "",
						responseType: option.responseType,
						responseXML: void 0,
					};
					Object.assign(httpxResponse, option.context || {});

					// 把headers转为字符串
					for (const [key, value] of (fetchResponse.headers as any).entries()) {
						httpxResponse.responseHeaders += `${key}: ${value}\n`;
					}

					/** 请求返回的类型 */
					const fetchResponseType = fetchResponse.headers.get("Content-Type");

					/* 如果需要stream，且获取到的是stream，那直接返回 */
					if (
						option.responseType === "stream" ||
						(fetchResponse.headers.has("Content-Type") &&
							fetchResponse.headers
								.get("Content-Type")!
								.includes("text/event-stream"))
					) {
						Reflect.set(httpxResponse, "isStream", true);
						Reflect.set(httpxResponse, "response", fetchResponse.body);
						Reflect.deleteProperty(httpxResponse, "responseText");
						Reflect.deleteProperty(httpxResponse, "responseXML");
						option.onload(httpxResponse);
						return;
					}

					/** 响应 */
					let response: any = "";
					/** 响应字符串 */
					let responseText: string = "";
					/** 响应xml文档 */
					let responseXML: XMLDocument | string = "";
					/** 先获取二进制数据 */
					let arrayBuffer = await fetchResponse.arrayBuffer();

					/** 数据编码 */
					let encoding = "utf-8";
					if (fetchResponse.headers.has("Content-Type")) {
						let charsetMatched = fetchResponse.headers
							.get("Content-Type")
							?.match(/charset=(.+)/);
						if (charsetMatched) {
							encoding = charsetMatched[1];
							encoding = encoding.toLowerCase();
						}
					}
					// Failed to construct 'TextDecoder': The encoding label provided ('"UTF-8"') is invalid.
					// 去除引号
					encoding = encoding.replace(/('|")/gi, "");
					// 编码
					let textDecoder = new TextDecoder(encoding);
					responseText = textDecoder.decode(arrayBuffer);
					response = responseText;

					if (option.responseType === "arraybuffer") {
						// response返回格式是二进制流
						response = arrayBuffer;
					} else if (option.responseType === "blob") {
						// response返回格式是blob
						response = new Blob([arrayBuffer]);
					} else if (
						option.responseType === "json" ||
						(typeof fetchResponseType === "string" &&
							fetchResponseType.includes("application/json"))
					) {
						// response返回格式是JSON格式
						response = CommonUtil.toJSON(responseText);
					} else if (
						option.responseType === "document" ||
						option.responseType == null
					) {
						// response返回格式是文档格式
						let parser = new DOMParser();
						response = parser.parseFromString(responseText, "text/html");
					}
					// 转为XML结构
					let parser = new DOMParser();
					responseXML = parser.parseFromString(responseText, "text/xml");

					httpxResponse.response = response;
					httpxResponse.responseText = responseText;
					httpxResponse.responseXML = responseXML;

					// 执行回调
					option.onload(httpxResponse);
				})
				.catch((error: any) => {
					if (error.name === "AbortError") {
						return;
					}
					option.onerror({
						isFetch: true,
						finalUrl: option.url,
						readyState: 4,
						status: 0,
						statusText: "",
						responseHeaders: "",
						responseText: "",
						error: error,
					});
				});
			option.onloadstart({
				isFetch: true,
				finalUrl: option.url,
				readyState: 1,
				responseHeaders: "",
				responseText: "",
				status: 0,
				statusText: "",
			});
			return {
				abort() {
					abortController.abort();
				},
			};
		},
	};
	/**
	 * 默认配置
	 */
	#defaultRequestOption = <HttpxRequestOption>{
		url: void 0 as undefined | string,
		timeout: 5000,
		async: false,
		responseType: void 0,
		headers: void 0,
		data: void 0,
		redirect: void 0,
		cookie: void 0,
		cookiePartition: void 0,
		binary: void 0,
		nocache: void 0,
		revalidate: void 0,
		context: void 0,
		overrideMimeType: void 0,
		anonymous: void 0,
		fetch: void 0,
		fetchInit: void 0,
		allowInterceptConfig: {
			beforeRequest: true,
			afterResponseSuccess: true,
			afterResponseError: true,
		},
		user: void 0,
		password: void 0,
		onabort() {},
		onerror() {},
		ontimeout() {},
		onloadstart() {},
		onreadystatechange() {},
		onprogress() {},
	};
	#defaultInitOption = {
		/**
		 * `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
		 */
		baseURL: void 0 as undefined | string,
		/**
		 * 当前使用请求时，输出请求的配置，一般用于DEBUG|DEV
		 */
		logDetails: false,
	};
	/**
	 * 实例化
	 * @param option 初始化配置
	 */
	constructor(option: Partial<HttpxInitOption> = {}) {
		if (typeof option.xmlHttpRequest !== "function") {
			console.warn(
				"[Httpx-constructor] 未传入GM_xmlhttpRequest函数或传入的GM_xmlhttpRequest不是Function，将默认使用window.fetch"
			);
		}
		CommonUtil.coverObjectFunctionThis(this);
		this.interceptors.request.context = this;
		this.interceptors.response.context = this;
		this.config(option);
	}
	/**
	 * 覆盖当前配置
	 * @param option
	 */
	config(option: Partial<HttpxInitOption> = {}) {
		if (typeof option.xmlHttpRequest === "function") {
			this.GM_Api.xmlHttpRequest = option.xmlHttpRequest;
		}
		this.#defaultRequestOption = CommonUtil.assign(
			this.#defaultRequestOption,
			option
		);
		this.#defaultInitOption = CommonUtil.assign(
			this.#defaultInitOption,
			option
		);
	}
	/**
	 * 拦截器
	 */
	interceptors = {
		/**
		 * 请求拦截器
		 */
		request: {
			context: null as any as Httpx,
			/**
			 * 添加拦截器
			 * @param fn 设置的请求前回调函数，如果返回配置，则使用返回的配置，如果返回null|undefined，则阻止请求
			 */
			use(
				fn: <T extends Required<HttpxRequestOption>>(
					details: T
				) => void | T | Promise<void | T>
			) {
				if (typeof fn !== "function") {
					console.warn("[Httpx-interceptors-request] 请传入拦截器函数");
					return;
				}
				return this.context.HttpxRequestHook.add(fn);
			},
			/**
			 * 移除拦截器
			 * @param id 通过use返回的id
			 */
			eject(id: string) {
				return this.context.HttpxRequestHook.delete(id);
			},
			/**
			 * 移除所有拦截器
			 */
			ejectAll() {
				this.context.HttpxRequestHook.clearAll();
			},
		},
		/**
		 * 响应拦截器
		 */
		response: {
			context: null as any as Httpx,
			/**
			 * 添加拦截器
			 * @param successFn 设置的响应后回调函数，如果返回响应，则使用返回的响应，如果返回null|undefined，则阻止响应
			 * + 2xx 范围内的状态码都会触发该函数
			 * @param errorFn 设置的响应后回调函数，如果返回响应，则使用返回的响应，如果返回null|undefined，则阻止响应
			 * + 超出 2xx 范围的状态码都会触发该函数
			 */
			use(
				successFn?: <T extends HttpxResponseData<HttpxRequestOption>>(
					response: T,
					details: HttpxRequestOption
				) => void | T,
				errorFn?: <T extends HttpxHookErrorData>(
					data: T
				) => void | T | Promise<void | T>
			) {
				if (typeof successFn !== "function" && typeof errorFn !== "function") {
					console.warn("[Httpx-interceptors-response] 必须传入一个拦截器函数");
					return;
				}
				return this.context.HttpxResponseHook.add(successFn!, errorFn!);
			},
			/**
			 * 移除拦截器
			 * @param id 通过use返回的id
			 */
			eject(id: string) {
				return this.context.HttpxResponseHook.delete(id);
			},
			/**
			 * 移除所有拦截器
			 */
			ejectAll() {
				this.context.HttpxResponseHook.clearAll();
			},
		},
	};
	/**
	 * 修改xmlHttpRequest
	 * @param httpRequest 网络请求函数
	 */
	setXMLHttpRequest(httpRequest: Function) {
		this.GM_Api.xmlHttpRequest = httpRequest;
	}
	/**
	 * GET 请求
	 * @param details 配置
	 */
	get<T extends HttpxRequestOption>(details: T): HttpxPromise<HttpxResponse<T>>;
	/**
	 * GET 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	get<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * GET 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	get(
		...args: (string | HttpxRequestOption)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		useRequestOption.method = "GET";
		return this.request(useRequestOption, (option) => {
			Reflect.deleteProperty(option, "onprogress");
		});
	}
	/**
	 * POST 请求
	 * @param details 配置
	 */
	post<T extends HttpxRequestOption>(
		details?: T
	): HttpxPromise<HttpxResponse<T>>;
	/**
	 * POST 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	post<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * POST 请求
	 */
	post(
		...args: (HttpxRequestOption | string)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		useRequestOption.method = "POST";
		return this.request(useRequestOption);
	}
	/**
	 * HEAD 请求
	 * @param details 配置
	 */
	head<T extends HttpxRequestOption>(
		details: T
	): HttpxPromise<HttpxResponse<T>>;
	/**
	 * HEAD 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	head<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * HEAD 请求
	 */
	head(
		...args: (HttpxRequestOption | string)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		useRequestOption.method = "HEAD";
		return this.request(useRequestOption, (option) => {
			Reflect.deleteProperty(option, "onprogress");
		});
	}
	/**
	 * OPTIONS 请求
	 * @param details 配置
	 */
	options<T extends HttpxRequestOption>(
		details: T
	): HttpxPromise<HttpxResponse<T>>;
	/**
	 * OPTIONS 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	options<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * OPTIONS 请求
	 */
	options(
		...args: (HttpxRequestOption | string)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		useRequestOption.method = "OPTIONS";
		return this.request(useRequestOption, (option) => {
			Reflect.deleteProperty(option, "onprogress");
		});
	}
	/**
	 * DELETE 请求
	 * @param details 配置
	 */
	delete<T extends HttpxRequestOption>(
		details: T
	): HttpxPromise<HttpxResponse<T>>;
	/**
	 * DELETE 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	delete<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * DELETE 请求
	 */
	delete(
		...args: (HttpxRequestOption | string)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		useRequestOption.method = "DELETE";
		return this.request(useRequestOption, (option) => {
			Reflect.deleteProperty(option, "onprogress");
		});
	}
	/**
	 * PUT 请求
	 * @param details 配置
	 */
	put<T extends HttpxRequestOption>(details: T): HttpxPromise<HttpxResponse<T>>;
	/**
	 * PUT 请求
	 * @param url 请求的url
	 * @param details 配置
	 */
	put<T extends Omit<HttpxRequestOption, "url">>(
		url: string,
		details?: T
	): HttpxPromise<
		HttpxResponse<
			T & {
				/**
				 * 请求的url
				 */
				url: string;
			}
		>
	>;
	/**
	 * PUT 请求
	 */
	put(
		...args: (HttpxRequestOption | string)[]
	): HttpxPromise<HttpxResponse<HttpxRequestOption>> {
		let userRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(...args);
		userRequestOption.method = "PUT";
		return this.request(userRequestOption);
	}
	/**
	 * 发送请求
	 * @param details 配置
	 * @param beforeRequestOption 处理请求前的配置
	 */
	request<T extends HttpxRequestOption>(
		details: T,
		beforeRequestOption?: (option: Required<T>) => void
	): HttpxPromise<HttpxResponse<T>> {
		let useRequestOption =
			this.HttpxRequestOption.handleBeforeRequestOptionArgs(details);
		/** 取消请求 */
		let abortFn: Function | null = null;
		let promise = new globalThis.Promise<HttpxResponse<HttpxRequestOption>>(
			async (resolve, reject) => {
				let requestOption = <Required<T>>(
					this.HttpxRequestOption.getRequestOption(
						useRequestOption.method!,
						useRequestOption,
						resolve,
						reject
					)
				);
				if (typeof beforeRequestOption === "function") {
					beforeRequestOption(requestOption);
				}
				requestOption = this.HttpxRequestOption.removeRequestNullOption(
					<Required<HttpxRequestOption>>requestOption
				) as Required<T>;
				const requestResult = await this.HttpxRequest.request(
					<Required<HttpxRequestOption>>requestOption
				);
				if (
					requestResult != null &&
					typeof requestResult.abort === "function"
				) {
					abortFn = requestResult.abort;
				}
			}
		) as HttpxPromise<HttpxResponse<T>>;
		promise.abort = () => {
			if (typeof abortFn === "function") {
				abortFn();
			}
		};
		return promise;
	}
}

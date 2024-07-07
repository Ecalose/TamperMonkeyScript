import { PopsPanel } from "@/setting/setting";
import "./OwnCSS.css";
import { DOMUtils, httpx, log, pops, utils } from "@/env";
import Qmsg from "qmsg";
import { GreasyforkApi } from "@/api/GreasyForkApi";
import {
	GM_addStyle,
	GM_getResourceText,
	GM_getValue,
	GM_setValue,
} from "ViteGM";
import { GreasyforkBeautify } from "./beautify/GreasyforkBeautify";
import { GreasyforkMenu } from "./GreasyforkMenu";
import { GreasyforkRouter } from "@/router/GreasyforkRouter";
import { GreasyforkCode } from "./Code/GreasyforkCode";
import { GreasyforkAccount } from "./Account/GreasyforkAccount";
import { GreasyforkShield } from "./GreasyforkShield";
import Viewer from "viewerjs";
import ViewerCSS from "viewerjs/dist/viewer.css?raw";
import { GreasyforkForum } from "./Forum/GreasyforkForum";
import i18next from "i18next";
import { GreasyforkCollection } from "./GreasyforkCollection";

const Greasyfork = {
	init() {
		PopsPanel.execMenu("checkPage", () => {
			this.checkPage();
		});
		GreasyforkBeautify.init();
		if (GreasyforkRouter.isCodeStrict()) {
			PopsPanel.execMenuOnce("fullScreenOptimization", () => {
				this.fullScreenOptimization();
			});
		}
		if (GreasyforkRouter.isCode()) {
			GreasyforkCode.init();
		}
		if (GreasyforkRouter.isDiscuessions()) {
			GreasyforkForum.init();
		}
		DOMUtils.ready(() => {
			GreasyforkMenu.initEnv();
			GreasyforkAccount.init();
			if (GreasyforkRouter.isScriptList()) {
				// 脚本页面
				PopsPanel.execMenuOnce("greasyfork-shield-enable", () => {
					GreasyforkShield.init();
				});
			}
			GreasyforkMenu.handleLocalGotoCallBack();
			PopsPanel.execMenuOnce("addFindReferenceButton", () => {
				Greasyfork.setFindCodeSearchBtn();
			});
			PopsPanel.execMenuOnce("addCollectionButton", () => {
				GreasyforkCollection.init();
			});
			PopsPanel.execMenuOnce("fixImageWidth", () => {
				Greasyfork.fixImageWidth();
			});
			PopsPanel.execMenuOnce("scriptHomepageAddedTodaySUpdate", () => {
				Greasyfork.scriptHomepageAddedTodaySUpdate();
			});
			Greasyfork.languageSelectorLocale();
			PopsPanel.execMenuOnce("optimizeImageBrowsing", () => {
				Greasyfork.optimizeImageBrowsing();
			});
			PopsPanel.execMenuOnce("overlayBedImageClickEvent", () => {
				Greasyfork.overlayBedImageClickEvent();
			});
			if (GreasyforkRouter.isCodeStrict()) {
				PopsPanel.execMenuOnce("addCopyCodeButton", () => {
					Greasyfork.addCopyCodeButton();
				});
			}
			/* 不在/code页面添加Markdown复制按钮 */
			if (!GreasyforkRouter.isCodeStrict()) {
				PopsPanel.execMenuOnce("addMarkdownCopyButton", () => {
					Greasyfork.addMarkdownCopyButton();
				});
			}
		});
	},

	/**
	 * 设置代码搜索按钮(对于库)
	 */
	setFindCodeSearchBtn() {
		log.info("设置代码搜索按钮(对于库)");
		utils
			.waitNode<HTMLSpanElement>("ul#script-links li.current span")
			.then(() => {
				let searchBtn = DOMUtils.createElement("li", {
					innerHTML: `
					<a href="javascript:;">
						<span>${i18next.t("寻找引用")}</span>
					</a>`,
				});
				DOMUtils.append(
					document.querySelector<HTMLUListElement>(
						"ul#script-links"
					) as HTMLUListElement,
					searchBtn
				);
				DOMUtils.on(searchBtn, "click", async function () {
					let scriptIdMatch =
						window.location.pathname.match(/scripts\/([\d]+)/i);
					if (!scriptIdMatch) {
						log.error([scriptIdMatch, window.location.pathname]);
						Qmsg.error(i18next.t("获取脚本id失败"));
						return;
					}
					let scriptId = scriptIdMatch[scriptIdMatch.length - 1];
					window.location.href = GreasyforkApi.getCodeSearchUrl(
						`greasyfork.org/scripts/${scriptId}`
					);
				});
			});
	},
	/**
	 * 修复图片宽度显示问题
	 */
	fixImageWidth() {
		if (window.innerWidth < window.innerHeight) {
			log.info("修复图片显示问题");
			GM_addStyle(`
            img.lum-img{
                width: 100% !important;
                height: 100% !important;
            }
          `);
		}
	},
	/**
	 * 优化图片浏览
	 */
	optimizeImageBrowsing() {
		log.info("优化图片浏览");
		if (import.meta.env.DEV) {
			GM_addStyle(ViewerCSS);
		} else {
			GM_addStyle(GM_getResourceText("ViewerCSS"));
		}
		GM_addStyle(`
        @media (max-width: 460px) {
          .lum-lightbox-image-wrapper {
              display:flex;
              overflow: auto;
              -webkit-overflow-scrolling: touch
          }
      
          .lum-lightbox-caption {
              width: 100%;
              position: absolute;
              bottom: 0
          }
      
          .lum-lightbox-position-helper {
              margin: auto
          }
      
          .lum-lightbox-inner img {
              max-width:100%;
              max-height:100%;
          }
        }
        `);
		/**
		 * 查看图片
		 * @param imgList
		 * @param _index_
		 */
		function viewIMG(imgList: string[] = [], _index_ = 0) {
			let viewerULNodeHTML = "";
			imgList.forEach((item) => {
				viewerULNodeHTML += `<li><img data-src="${item}" loading="lazy"></li>`;
			});
			let viewerULNode = DOMUtils.createElement("ul", {
				innerHTML: viewerULNodeHTML,
			});
			let viewer = new Viewer(viewerULNode, {
				inline: false,
				url: "data-src",
				zIndex: utils.getMaxZIndex() + 100,
				hidden: () => {
					viewer.destroy();
				},
			});
			_index_ = _index_ < 0 ? 0 : _index_;
			viewer.view(_index_);
			viewer.zoomTo(1);
			viewer.show();
		}
		/**
		 * 获取<img>标签上的src属性
		 * @param element
		 */
		function getImgElementSrc(element: HTMLImageElement) {
			return (
				element.getAttribute("data-src") ||
				element.getAttribute("src") ||
				element.getAttribute("alt")
			);
		}
		DOMUtils.on<MouseEvent | PointerEvent>(
			document,
			"click",
			"img",
			function (event) {
				let imgElement = event.target as HTMLImageElement;
				/* 在超链接标签里 */
				if (
					imgElement.parentElement?.localName === "a" &&
					imgElement.hasAttribute("data-screenshots")
				) {
					return;
				}
				/* Viewer的图片浏览 */
				if (imgElement.closest(".viewer-container")) {
					return;
				}
				/* GreasFork自带的图片浏览 */
				if (imgElement.closest(".lum-lightbox-position-helper")) {
					return;
				}
				/* 判断是否是user-content内的，如果是，多图片模式 */
				let userContentElement = imgElement.closest(".user-content");
				/* 图片链接数组 */
				let imgList: string[] = [];
				/* 当前图片的下标 */
				let imgIndex = 0;
				/* 图片元素数组 */
				let imgElementList: HTMLImageElement[] = [];
				/* 当前的图片的链接 */
				let currentImgSrc = getImgElementSrc(imgElement);
				if (currentImgSrc?.startsWith("https://img.shields.io")) {
					/** shields.io的图标 */
					return;
				}
				if (userContentElement) {
					userContentElement
						.querySelectorAll("img")
						.forEach((childImgElement) => {
							imgElementList.push(childImgElement);
							let imgSrc = getImgElementSrc(childImgElement);
							let $parent = childImgElement.parentElement as HTMLAnchorElement;
							if ($parent?.localName === "a") {
								imgSrc = $parent.getAttribute("data-href") || $parent.href;
							}
							imgList.push(imgSrc as string);
						});
					imgIndex = imgElementList.indexOf(imgElement);
					if (imgIndex === -1) {
						imgIndex = 0;
					}
				} else {
					imgList.push(currentImgSrc as string);
					imgIndex = 0;
				}

				log.success(["点击浏览图片👉", imgList, imgIndex]);
				viewIMG(imgList, imgIndex);
			}
		);
		/* 把上传的图片使用自定义图片预览 */
		document.querySelectorAll(".user-screenshots").forEach((element) => {
			let linkElement = element.querySelector<HTMLAnchorElement>("a");
			if (!linkElement) {
				return;
			}
			let imgSrc =
				linkElement.getAttribute("data-href") ||
				linkElement.getAttribute("href");
			let imgElement = element.querySelector<HTMLImageElement>("img");
			if (!imgElement) {
				return;
			}
			imgElement.setAttribute("data-screenshots", "true");
			imgElement.setAttribute("data-src", imgSrc as string);
			linkElement.setAttribute("href", "javascript:;");
			/* img标签添加a标签后面 */
			DOMUtils.after(linkElement, imgElement);
			/* a标签删除 */
			linkElement.remove();
		});
	},
	/**
	 * 覆盖图床图片的parentElement的a标签
	 */
	overlayBedImageClickEvent() {
		log.info("覆盖图床图片的parentElement的a标签");
		document
			.querySelectorAll<HTMLImageElement>(".user-content a>img")
			.forEach((imgElement) => {
				let linkElement = imgElement.parentElement as HTMLAnchorElement;
				let url = linkElement.getAttribute("href") as string;
				linkElement.setAttribute("data-href", url);
				linkElement.removeAttribute("href");
				DOMUtils.on(linkElement, "click", undefined, function (event) {
					Qmsg.warning(
						`<div style="overflow-wrap: anywhere;">${i18next.t(
							"拦截跳转："
						)}<a href="${url}" target="_blank">${url}</a></div>`,
						{
							html: true,
							timeout: 5000,
							zIndex: utils.getMaxZIndex(),
						}
					);
				});
			});
	},
	/**
	 * 脚本首页新增【今日检查】
	 */
	async scriptHomepageAddedTodaySUpdate() {
		if (
			!GreasyforkRouter.isScript() ||
			!document.querySelector("#install-area")
		) {
			return;
		}
		log.info("脚本首页新增【今日检查】");
		let scriptStatsJSONInfo = await GreasyforkApi.getScriptStats(
			GreasyforkApi.getScriptId() as string
		);
		if (!scriptStatsJSONInfo) {
			return;
		}
		let scriptStatsJSON = utils.toJSON(scriptStatsJSONInfo.responseText);
		log.info(["统计信息", scriptStatsJSON]);
		let todayStatsJSON =
			scriptStatsJSON[utils.formatTime(undefined, "yyyy-MM-dd")];
		if (!todayStatsJSON) {
			log.error("今日份的统计信息不存在");
			return;
		}
		let update_checks = todayStatsJSON["update_checks"];
		log.info(["今日统计信息", todayStatsJSON]);
		DOMUtils.after(
			"dd.script-show-daily-installs",
			DOMUtils.createElement("dt", {
				className: "script-show-daily-update_checks",
				innerHTML: `<span>${i18next.t("今日检查")}</span>`,
			})
		);
		DOMUtils.after(
			"dt.script-show-daily-update_checks",
			DOMUtils.createElement("dd", {
				className: "script-show-daily-update_checks",
				innerHTML: "<span>" + update_checks + "</span>",
			})
		);
	},
	/**
	 * 添加复制代码按钮
	 */
	addCopyCodeButton() {
		log.info("添加复制代码按钮");
		utils
			.waitNode<HTMLDivElement>("div#script-content div.code-container")
			.then(($codeContainer) => {
				let copyButton = DOMUtils.createElement(
					"button",
					{
						textContent: i18next.t("复制代码"),
					},
					{
						style: "margin-bottom: 1em;",
					}
				);
				DOMUtils.on(copyButton, "click", async function () {
					let loading = Qmsg.loading(i18next.t("加载文件中..."));
					let getResp = await httpx.get(
						`https://greasyfork.org/zh-CN/scripts/${GreasyforkApi.getScriptId()}.json`,
						{
							fetch: true,
							responseType: "json",
						}
					);
					if (!getResp.status) {
						loading.close();
						return;
					}
					let respJSON = utils.toJSON(getResp.data.responseText);
					let code_url = respJSON["code_url"];
					log.success(["代码地址：", code_url]);
					let scriptJS = await httpx.get(code_url);
					if (!scriptJS.status) {
						loading.close();
						return;
					}
					loading.close();
					utils.setClip(scriptJS.data.responseText);
					Qmsg.success(i18next.t("复制成功"));
				});
				DOMUtils.before($codeContainer, copyButton);
			});
	},
	/**
	 * F11全屏，F键代码全屏
	 */
	fullScreenOptimization() {
		log.info("F11全屏，F键代码全屏");
		GM_addStyle(`
        .code-wide-screen{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
          max-width: 100%;
          max-height: 100%;
          z-index: 10000;
        }
        `);
		let isFullScreen = false;
		DOMUtils.keydown(
			window,
			function (event) {
				if (event.key.toLowerCase() === "f") {
					let codeElement = document.querySelector<HTMLElement>(
						"#script-content div.code-container code"
					);
					if (event.altKey && event.shiftKey) {
						/* 宽屏 */
						utils.preventEvent(event);
						if (codeElement!.classList.contains("code-wide-screen")) {
							/* 当前处于宽屏状态，退出宽屏 */
							codeElement!.classList.remove("code-wide-screen");
						} else {
							/* 进入宽屏 */
							codeElement!.classList.add("code-wide-screen");
						}
					} else if (
						!event.altKey &&
						!event.ctrlKey &&
						!event.shiftKey &&
						!event.metaKey
					) {
						/* 全屏 */
						utils.preventEvent(event);
						if (isFullScreen) {
							/* 退出全屏 */
							utils.exitFullScreen(codeElement as HTMLElement);
							isFullScreen = false;
						} else {
							/* 进入全屏 */
							utils.enterFullScreen(codeElement as HTMLElement);
							isFullScreen = true;
						}
					}
				}
			},
			{
				capture: true,
			}
		);
	},
	/**
	 * 在Markdown右上角添加复制按钮
	 */
	addMarkdownCopyButton() {
		log.info("在Markdown右上角添加复制按钮");
		GM_addStyle(`
        pre{
          position: relative;
          margin-bottom: 0px !important;
          width: 100%;
        }
        `);
		GM_addStyle(`
        .snippet-clipboard-content{
          display: flex;
          justify-content: space-between;
          background: rgb(246, 248, 250);
          margin-bottom: 16px;
        }
        .zeroclipboard-container {
          /* right: 0;
          top: 0;
          position: absolute; */
          box-sizing: border-box;
          display: flex;
          font-size: 16px;
          line-height: 24px;
          text-size-adjust: 100%;
          overflow-wrap: break-word;
          width: fit-content;
          height: fit-content;
        }
        .zeroclipboard-container svg{
            vertical-align: text-bottom;
            display: inline-block;
            overflow: visible;
            fill: currentColor;
            margin: 8px;
        }
        .zeroclipboard-container svg[aria-hidden="true"]{
          display: none;
        }
        clipboard-copy.js-clipboard-copy {
          position: relative;
          padding: 0px;
          color: rgb(36, 41, 47);
          background-color: rgb(246, 248, 250);
          transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
          transition-property: color,background-color,box-shadow,border-color;
          display: inline-block;
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          -webkit-user-select: none;
          user-select: none;
          border: 1px solid rgba(31, 35, 40, 0.15);
          -webkit-appearance: none;
          appearance: none;
          box-shadow: rgba(31, 35, 40, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
          margin: 8px;
          overflow-wrap: break-word;
          text-wrap: nowrap;
          border-radius: 6px;
        }
        clipboard-copy.js-clipboard-copy[success]{
          border-color: rgb(31, 136, 61);
          box-shadow: 0 0 0 0.2em rgba(52,208,88,.4);
        }
        clipboard-copy.js-clipboard-copy:hover{
          background-color: rgb(243, 244, 246);
          border-color: rgba(31, 35, 40, 0.15);
          transition-duration: .1s;
        }
        clipboard-copy.js-clipboard-copy:active{
          background-color: rgb(235, 236, 240);
          border-color: rgba(31, 35, 40, 0.15);
          transition: none;
        }
        `);
		GM_addStyle(`
        .pops-tip.github-tooltip {
          border-radius: 6px;
          padding: 6px 8px;
        }
        
        .pops-tip.github-tooltip, .pops-tip.github-tooltip .pops-tip-arrow::after {
          background: rgb(36, 41, 47);
          color: #fff;
        }
        
        .pops-tip.github-tooltip .pops-tip-arrow::after {
          width: 8px;
          height: 8px;
        }
        `);
		/**
		 * 获取复制按钮元素
		 * @returns {HTMLElement}
		 */
		function getCopyElement() {
			let copyElement = DOMUtils.createElement("div", {
				className: "zeroclipboard-container",
				innerHTML: `
				<clipboard-copy class="js-clipboard-copy">
				<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon-copy">
					<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
				</svg>
				<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon-check-copy">
					<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
				</svg>
				</clipboard-copy>
            `,
			});
			let clipboardCopyElement = copyElement.querySelector<HTMLElement>(
				".js-clipboard-copy"
			) as HTMLElement;
			let octiconCopyElement = copyElement.querySelector<HTMLElement>(
				".octicon-copy"
			) as HTMLElement;
			let octiconCheckCopyElement = copyElement.querySelector<HTMLElement>(
				".octicon-check-copy"
			) as HTMLElement;
			DOMUtils.on(copyElement, "click", function () {
				let codeElement =
					copyElement.parentElement!.querySelector<HTMLElement>("code");
				if (
					!codeElement &&
					copyElement.parentElement!.className.includes("prettyprinted")
				) {
					/* 在gf的/code的复制 */
					codeElement = copyElement.parentElement;
				}
				if (!codeElement) {
					Qmsg.error(i18next.t("未找到{{selector}}元素", { selector: "code" }));
					return;
				}
				utils.setClip(codeElement.innerText || codeElement.textContent);
				clipboardCopyElement.setAttribute("success", "true");
				octiconCopyElement.setAttribute("aria-hidden", "true");
				octiconCheckCopyElement.removeAttribute("aria-hidden");
				let tooltip = pops.tooltip({
					target: clipboardCopyElement,
					content: i18next.t("✅ 复制成功!"),
					position: "left",
					className: "github-tooltip",
					alwaysShow: true,
				});
				setTimeout(() => {
					clipboardCopyElement.removeAttribute("success");
					octiconCheckCopyElement.setAttribute("aria-hidden", "true");
					octiconCopyElement.removeAttribute("aria-hidden");
					tooltip.close();
				}, 2000);
			});
			return copyElement;
		}

		document.querySelectorAll<HTMLPreElement>("pre").forEach((preElement) => {
			let zeroclipboardElement = preElement.querySelector(
				"div.zeroclipboard-container"
			);
			if (zeroclipboardElement) {
				return;
			}
			let copyElement = getCopyElement();
			let snippetClipboardContentElement = DOMUtils.createElement("div", {
				className: "snippet-clipboard-content",
			});
			DOMUtils.before(preElement, snippetClipboardContentElement);
			snippetClipboardContentElement.appendChild(preElement);
			snippetClipboardContentElement.appendChild(copyElement);
		});
	},
	/**
	 * 固定当前语言
	 */
	languageSelectorLocale() {
		let localeLanguage = PopsPanel.getValue<string>("language-selector-locale");
		let currentLocaleLanguage = window.location.pathname
			.split("/")
			.filter((item) => Boolean(item))[0];
		log.success("选择语言：" + localeLanguage);
		log.success("当前语言：" + currentLocaleLanguage);
		if (utils.isNull(localeLanguage)) {
			return;
		}
		if (localeLanguage === currentLocaleLanguage) {
			return;
		} else {
			let timer = null as any;
			let url = GreasyforkApi.getSwitchLanguageUrl(localeLanguage);
			GreasyforkApi.switchLanguage(url);
			log.success("新Url：" + url);
			Qmsg.loading(
				i18next.t(
					"当前语言：{{currentLocaleLanguage}}，，3秒后切换至：{{localeLanguage}}",
					{
						currentLocaleLanguage,
						localeLanguage,
					}
				),
				{
					timeout: 3000,
					showClose: true,
					onClose() {
						clearTimeout(timer);
					},
				}
			);
			Qmsg.info(i18next.t("导航至：") + url, {
				timeout: 3000,
			});
			timer = setTimeout(() => {
				window.location.href = url;
			}, 3000);
		}
	},
	/**
	 * 面板-脚本列表|库
	 * @param type
	 * @param event
	 * @param rightHeaderElement
	 * @param rightContainerElement
	 * @returns
	 */
	async UIScriptList(
		type: "script-list" | "script-library",
		event: Event,
		rightHeaderElement: HTMLUListElement,
		rightContainerElement: HTMLUListElement
	) {
		if (!GreasyforkMenu.isLogin) {
			Qmsg.error(i18next.t("请先登录账号！"));
			return;
		}
		let userLinkElement = GreasyforkMenu.getUserLinkElement();
		let userLink = userLinkElement!.href;
		let userId = userLink
			?.split("/")
			?.pop()
			?.match(/([0-9]+)/)?.[0] as string;
		let loading = pops.loading({
			mask: {
				enable: true,
			},
			parent: rightContainerElement,
			content: {
				text: i18next.t("获取信息中，请稍后..."),
			},
			addIndexCSS: false,
		});
		let userInfo = await GreasyforkApi.getUserInfo(userId);
		loading.close();
		if (!userInfo) {
			return;
		}
		log.info(userInfo);
		let scriptList =
			type === "script-list"
				? userInfo["scriptList"]
				: userInfo["scriptLibraryList"];
		Qmsg.success(
			i18next.t("获取成功，共 {{count}} 个", {
				count: scriptList.length,
			})
		);
		for (const scriptInfo of scriptList) {
			let liElement = DOMUtils.createElement("li", {
				className: "w-script-list-item",
				innerHTML: `
				<div class="w-script-info">
				<div class="w-script-name">
					<a href="${scriptInfo["url"]}" target="_blank">${scriptInfo["name"]}</a>
				</div>
				<div class="w-script-fan-score">
					<p>${i18next.t("评分：")}${scriptInfo["fan_score"]}</p>
				</div>
				<div class="w-script-locale">
					<p>${i18next.t("语言：")}${scriptInfo["locale"]}</p>
				</div>
				<div class="w-script-version">
					<p>${i18next.t("版本：")}${scriptInfo["version"]}</p>
				</div>
				<div class="w-script-update-time">
					<p>${i18next.t("更新：")}${utils.getDaysDifference(
					new Date(scriptInfo["code_updated_at"]).getTime(),
					void 0,
					"auto"
				)}前</p>
				</div>
				</div>
            `,
			});
			let scriptInfoElement = liElement.querySelector(
				".w-script-info"
			) as HTMLElement;
			let buttonElement = DOMUtils.createElement("div", {
				className: "pops-panel-button",
				innerHTML: `
				<button type="primary" data-icon="" data-righticon="false">
				<span>${i18next.t("同步代码")}</span>
				</button>
				`,
			});
			if (scriptInfo["deleted"]) {
				/* 该脚本已给删除 */
				liElement.classList.add("w-script-deleted");
				buttonElement
					.querySelector<HTMLButtonElement>("button")!
					.setAttribute("disabled", "true");
			}

			DOMUtils.on(buttonElement, "click", undefined, async function () {
				log.success(["同步", scriptInfo]);
				let btn = buttonElement.querySelector("button") as HTMLButtonElement;
				let span = buttonElement.querySelector(
					"button span"
				) as HTMLSpanElement;
				let iconElement = DOMUtils.createElement(
					"i",
					{
						className: "pops-bottom-icon",
						innerHTML: pops.config.iconSVG.loading,
					},
					{
						"is-loading": true,
					}
				);
				btn.setAttribute("disabled", "true");
				btn.setAttribute("data-icon", "true");
				span.innerText = i18next.t("同步中...");
				DOMUtils.before(span, iconElement);
				let scriptId = scriptInfo?.["id"];
				let codeSyncFormData = await GreasyforkApi.getSourceCodeSyncFormData(
					scriptId.toString()
				);
				if (codeSyncFormData) {
					const SCRIPT_SYNC_TYPE_ID_FORMDATA_KEY =
						"script[script_sync_type_id]";
					if (codeSyncFormData.has(SCRIPT_SYNC_TYPE_ID_FORMDATA_KEY)) {
						/* 1是手动同步、2是自动同步、3是webhook同步 */
						let syncTypeId = codeSyncFormData.get(
							SCRIPT_SYNC_TYPE_ID_FORMDATA_KEY
						) as FormDataEntryValue;
						let syncMode = "";
						if (syncTypeId.toString() === "1") {
							syncMode = i18next.t("手动");
						} else if (syncTypeId.toString() === "2") {
							syncMode = i18next.t("自动");
						} else if (syncTypeId.toString() === "3") {
							syncMode = "webhook";
						}
						let oldSyncTypeElement = liElement.querySelector(
							".w-script-sync-type"
						) as HTMLElement;
						if (oldSyncTypeElement) {
							oldSyncTypeElement.querySelector("p")!.innerText = i18next.t(
								"同步方式：{{syncMode}}",
								{ syncMode }
							);
						} else {
							DOMUtils.append(
								scriptInfoElement,
								`
								<div class="w-script-sync-type">
									<p>${i18next.t("同步方式：{{syncMode}}", {
										syncMode,
									})}
									</p>
								</div>`
							);
						}
						let syncUpdateResponse = await GreasyforkApi.sourceCodeSync(
							scriptInfo["id"].toString(),
							codeSyncFormData
						);
						if (syncUpdateResponse) {
							Qmsg.success(i18next.t("同步成功"));
						} else {
							Qmsg.error(i18next.t("同步失败"));
						}
					} else {
						Qmsg.error(i18next.t("该脚本未设置同步信息"));
					}
				}

				btn.removeAttribute("disabled");
				btn.removeAttribute("data-icon");
				span.innerText = i18next.t("同步代码");
				iconElement.remove();
			});
			liElement.appendChild(buttonElement);
			rightContainerElement.appendChild(liElement);
		}
	},
	/**
	 * 检测gf页面是否正确加载，有时候会出现
	 * We're down for maintenance. Check back again soon.
	 */
	checkPage() {
		log.info("检测gf页面是否正确加载，有时候会出现");
		DOMUtils.ready(() => {
			if (
				(document.body.firstElementChild as any) &&
				(document.body.firstElementChild as any).localName === "p" &&
				(document.body.firstElementChild as any).innerText.includes(
					"We're down for maintenance. Check back again soon."
				)
			) {
				// 先获取上一次刷新页面的时间
				let latestRefreshPageTime = parseInt(
					GM_getValue<string | number>(
						"greasyfork-check-page-time",
						0
					) as string
				);
				let checkPageTimeout = PopsPanel.getValue(
					"greasyfork-check-page-timeout",
					5
				);
				let checkPageTimeoutStamp = checkPageTimeout * 1000;
				if (
					latestRefreshPageTime &&
					Date.now() - latestRefreshPageTime < checkPageTimeoutStamp
				) {
					/* 上次重载时间在xx秒内的话就拒绝重载 */
					Qmsg.warning(
						i18next.t("上次重载时间 {{time}}，{{timeout}}秒内拒绝反复重载", {
							time: utils.formatTime(
								latestRefreshPageTime,
								"yyyy-MM-dd HH:mm:ss"
							),
							timeout: checkPageTimeout,
						})
					);
					return;
				}
				GM_setValue("greasyfork-check-page-time", Date.now());
				window.location.reload();
			}
		});
	},
};

export { Greasyfork };

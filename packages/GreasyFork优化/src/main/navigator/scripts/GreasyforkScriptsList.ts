import { httpx, log, pops, utils } from "@/env";
import { GreasyforkScriptsFilter } from "@/main/navigator/scripts/GreasyforkScriptsFilter";
import { PopsPanel } from "@/setting/setting";
import DOMUtils from "@whitesev/domutils";
import i18next from "i18next";
import { GreasyforkScriptsCollectEvent } from "./GreasyforkScripts";
import { GM_addStyle } from "ViteGM";
import beautifyCenterContentCSS from "./beautifyCenterContent.css?raw";
import Qmsg from "qmsg";
import { GreasyforkCheckVersion } from "@/utils/GreasyforkCheckVersion";
import { GreasyforkUrlUtils } from "@/utils/GreasyforkUrlUtils";

/** 解析出<li>元素上存储的脚本信息 */
export const parseScriptListInfo = ($scriptList: HTMLLIElement) => {
	let dataset = $scriptList.dataset as any as GreasyforkScriptListInfoDataset;
	const info = {
		scriptId: parseInt(dataset.scriptId),
		scriptName: dataset.scriptName,
		scriptAuthors: [],
		scriptDailyInstalls: parseInt(dataset.scriptDailyInstalls),
		scriptTotalInstalls: parseInt(dataset.scriptTotalInstalls),
		scriptRatingScore: parseFloat(dataset.scriptRatingScore),
		scriptCreatedDate: new Date(dataset.scriptCreatedDate),
		scriptUpdatedDate: new Date(dataset.scriptUpdatedDate),
		scriptType: dataset.scriptType,
		scriptVersion: dataset.scriptVersion,
		sensitive: dataset.sensitive === "true",
		scriptLanguage: dataset.scriptLanguage,
		cssAvailableAsJs: dataset.cssAvailableAsJs === "true",
		codeUrl: dataset.codeUrl,
		scriptDescription: dataset.scriptDescription,
		scriptAuthorId: parseInt(dataset.scriptAuthorId),
		scriptAuthorName: dataset.scriptAuthorName,
	} as GreasyforkScriptListInfo;

	let scriptAuthorsObj = utils.toJSON(dataset.scriptAuthors);
	Object.keys(scriptAuthorsObj).forEach((authorId) => {
		let authorName = scriptAuthorsObj[authorId];
		info.scriptAuthors.push({
			authorId: parseInt(authorId),
			authorName: authorName,
		});
	});
	return info;
};

export const GreasyforkScriptsList = {
	init() {
		PopsPanel.execMenuOnce("gf-scripts-filter-enable", () => {
			GreasyforkScriptsFilter.init();
		});
		PopsPanel.execMenuOnce("beautifyCenterContent", () => {
			return this.beautifyCenterContent();
		});
	},
	/**
	 * 美化脚本列表
	 */
	beautifyCenterContent() {
		log.info("美化脚本列表");
		let result = [];
		result.push(GM_addStyle(beautifyCenterContentCSS));
		DOMUtils.ready(async () => {
			let allScriptsList = GreasyforkScriptsFilter.getScriptElementList();

			allScriptsList.forEach(($scriptList) => {
				if ($scriptList.querySelector(".script-list-operation")) {
					return;
				}
				let scriptInfo = parseScriptListInfo($scriptList);
				let $inlineStats = $scriptList.querySelector<HTMLElement>(
					".inline-script-stats"
				)!;
				let code_url = scriptInfo.codeUrl;

				// 评分
				let $ratingScoreLeft = DOMUtils.createElement("dt", {
					className: "script-list-rating-score",
					innerHTML: `<span>${i18next.t("评分")}</span>`,
				});
				let $ratingScoreRight = DOMUtils.createElement(
					"dd",
					{
						className: "script-list-rating-score",
						innerHTML: `<span>${scriptInfo.scriptRatingScore}</span>`,
					},
					{
						"data-position": "right",
					}
				);
				if (scriptInfo.scriptRatingScore < 60) {
					$ratingScoreRight.classList.add("bad-rating-count");
				} else {
					$ratingScoreRight.classList.add("good-rating-count");
				}

				// 版本
				let $versionLeft = DOMUtils.createElement("dt", {
					className: "script-list-version",
					innerHTML: `<span>${i18next.t("版本")}</span>`,
				});
				let $versionRight = DOMUtils.createElement(
					"dd",
					{
						className: "script-list-version",
						innerHTML: `<span>${scriptInfo.scriptVersion}</span>`,
					},
					{
						"data-position": "right",
					}
				);

				// 操作
				let $operationLeft = DOMUtils.createElement("dt", {
					className: "script-list-operation",
					innerHTML: `<span>${i18next.t("操作")}</span>`,
				});
				let $operationRight = DOMUtils.createElement(
					"dd",
					{
						className: "script-list-operation",
						innerHTML: `
						<a
							target="_blank"
							class="install-link"
							data-install-format="js"
							data-script-name="${scriptInfo.scriptName}"
							data-script-namespace=""
							data-script-version="${scriptInfo.scriptVersion}"
							data-update-label="${i18next.t("更新到 {{version}} 版本", {
								version: scriptInfo.scriptVersion,
							})}"
							data-downgrade-label="${i18next.t("降级到 {{version}} 版本", {
								version: scriptInfo.scriptVersion,
							})}"
							data-reinstall-label="${i18next.t("重新安装 {{version}} 版本", {
								version: scriptInfo.scriptVersion,
							})}"
							href="${code_url}"></a>
						<button class="script-collect-btn">${i18next.t("收藏")}</button>
						`,
					},
					{
						"data-position": "right",
						style:
							"gap:10px;display: flex;flex-wrap: wrap;align-items: center;",
					}
				);
				let $collect = $operationRight.querySelector<HTMLButtonElement>(
					".script-collect-btn"
				)!;

				// 安装此脚本
				let $installLink =
					$operationRight.querySelector<HTMLAnchorElement>(".install-link")!;
				// 存储数据
				($installLink as any)["data-script-info"] = scriptInfo;
				// 添加加载脚本已安装版本号加载中的样式
				$installLink.classList.add("lum-lightbox-loader");
				if (scriptInfo.scriptType === "library") {
					// 当它是个库时，是不应该被安装的
					$installLink.remove();
				}

				// 收藏按钮点击事件
				DOMUtils.on($collect, "click", (event) => {
					utils.preventEvent(event);
					GreasyforkScriptsCollectEvent(scriptInfo.scriptId);
				});

				if (PopsPanel.getValue("gf-scripts-filter-enable")) {
					let $filter = DOMUtils.createElement("button", {
						className: "script-filter-btn",
						innerHTML: i18next.t("过滤"),
					});
					// 过滤按钮点击事件
					let attr_filter_key = "data-filter-key";
					let attr_filter_value = "data-filter-value";
					DOMUtils.on($filter, "click", (event) => {
						utils.preventEvent(event);
						let $dialog = pops.alert({
							title: {
								text: i18next.t("选择过滤的选项"),
								position: "center",
							},
							content: {
								text: `
									<button ${attr_filter_key}="scriptId" ${attr_filter_value}="^${
									scriptInfo.scriptId
								}$">${i18next.t("脚本id：{{text}}", {
									text: scriptInfo.scriptId,
								})}</button>
									<button ${attr_filter_key}="scriptName" ${attr_filter_value}="^${utils.parseStringToRegExpString(
									scriptInfo.scriptName
								)}$">${i18next.t("脚本名：{{text}}", {
									text: scriptInfo.scriptName,
								})}</button>
									`,
								html: true,
							},
							mask: {
								enable: true,
								clickEvent: {
									toClose: true,
								},
							},
							width: "350px",
							height: "300px",
							drag: true,
							dragLimit: true,
							style: `
								.pops-alert-content{
									display: flex;
									flex-direction: column;
    								gap: 20px;
								}
								.pops-alert-content button{
									text-wrap: wrap;
									padding: 8px;
									height: auto;
									text-align: left;
								}
								`,
						});
						let $content = $dialog.$shadowRoot.querySelector<HTMLDivElement>(
							".pops-alert-content"
						)!;
						scriptInfo.scriptAuthors.forEach((scriptAuthorInfo) => {
							let $authorIdButton = DOMUtils.createElement("button", {
								innerHTML: i18next.t("作者id：{{text}}", {
									text: scriptAuthorInfo.authorId,
								}),
							});
							$authorIdButton.setAttribute(attr_filter_key, "scriptAuthorId");
							$authorIdButton.setAttribute(
								attr_filter_value,
								"^" + scriptAuthorInfo.authorId + "$"
							);
							let $authorNameButton = DOMUtils.createElement("button", {
								innerHTML: i18next.t("作者名：{{text}}", {
									text: scriptAuthorInfo.authorName,
								}),
							});
							$authorNameButton.setAttribute(
								attr_filter_key,
								"scriptAuthorName"
							);
							$authorNameButton.setAttribute(
								attr_filter_value,
								"^" +
									utils.parseStringToRegExpString(scriptAuthorInfo.authorName) +
									"$"
							);

							$content.appendChild($authorIdButton);
							$content.appendChild($authorNameButton);
						});
						DOMUtils.on($dialog.$shadowRoot, "click", "button", (event) => {
							utils.preventEvent(event);
							let $click = event.target as HTMLButtonElement;
							let key = $click.getAttribute(attr_filter_key);
							let value = $click.getAttribute(attr_filter_value);
							GreasyforkScriptsFilter.addValue(`${key}##${value}`);
							$dialog.close();
							GreasyforkScriptsFilter.filter();
							Qmsg.success(i18next.t("添加成功"));
						});
					});
					$operationRight.appendChild($filter);
				}

				$inlineStats.appendChild($ratingScoreLeft);
				$inlineStats.appendChild($ratingScoreRight);
				$inlineStats.appendChild($versionLeft);
				$inlineStats.appendChild($versionRight);
				$inlineStats.appendChild($operationLeft);
				$inlineStats.appendChild($operationRight);
			});

			let $installLinkList = Array.from(
				document.querySelectorAll<HTMLElement>(
					".install-link[data-install-format=js]"
				)
			);
			let scriptContainerStatus =
				GreasyforkCheckVersion.getScriptContainerStatus();
			let hasScriptContainer = Object.values(scriptContainerStatus).filter(
				Boolean
			);
			if (!scriptContainerStatus.Tampermonkey) {
				// TamperMonkey可以不设置namespace从而获取到脚本的安装信息
				$installLinkList.forEach(async ($installLink) => {
					let result = await GreasyforkCheckVersion.checkForUpdatesJS(
						$installLink,
						true
					);
					$installLink.classList.remove("lum-lightbox-loader");
					if (!result) {
						$installLink.textContent = i18next.t("安装此脚本");
					}
				});
			} else if (hasScriptContainer.length) {
				// 其它的需要网络请求json获取namespace
				for (let index = 0; index < $installLinkList.length; index++) {
					let $installLink = $installLinkList[index];
					let scriptInfo = ($installLink as any)[
						"data-script-info"
					] as GreasyforkScriptListInfo;
					let getResp = await httpx.get(
						GreasyforkUrlUtils.getScriptInfoUrl(scriptInfo.scriptId),
						{
							fetch: true,
						}
					);
					if (!getResp.status) {
						$installLink.textContent = i18next.t("安装此脚本");
						continue;
					}
					let data = utils.toJSON<GreasyforkScriptUrlInfo>(
						getResp.data.responseText
					);
					$installLink.setAttribute("data-script-namespace", data.namespace);
					let result = await GreasyforkCheckVersion.checkForUpdatesJS(
						$installLink,
						true
					);
					$installLink.classList.remove("lum-lightbox-loader");
					if (!result) {
						$installLink.textContent = i18next.t("安装此脚本");
					}
					await utils.sleep(150);
				}
			} else {
				log.error("未知的脚本容器");
			}
		});
		return result;
	},
};

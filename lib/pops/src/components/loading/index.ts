import { PopsElementHandler } from "../../handler/PopsElementHandler";
import { PopsHandler } from "../../handler/PopsHandler";
import { pops } from "../../Pops";
import { popsDOMUtils } from "../../utils/PopsDOMUtils";
import { popsUtils } from "../../utils/PopsUtils";
import type { PopsLoadingDetails } from "./indexType";

export class PopsLoading {
	constructor(details: PopsLoadingDetails) {
		let config: Required<PopsLoadingDetails> = {
			parent: document.body,
			content: {
				text: "加载中...",
				icon: "loading",
				style: "",
			},
			class: "",
			only: false,
			zIndex: 10000,
			mask: {
				enable: false,
				clickEvent: {
					toClose: false,
					toHide: false,
				},

				clickCallBack: void 0,
			},
			animation: "pops-anim-fadein-zoom",
			forbiddenScroll: false,

			style: null,
			addIndexCSS: true,
		};
		config = popsUtils.assign(config, details);
		let guid = popsUtils.getRandomGUID();
		const PopsType = "loading";

		config = PopsHandler.handleOnly(PopsType, config);
		let maskHTML = PopsElementHandler.getMaskHTML(guid, config.zIndex);
		let { contentPStyle } = PopsElementHandler.getContentStyle(
			"loading",
			config
		);
		let animHTML = PopsElementHandler.getAnimHTML(
			guid,
			PopsType,
			config,
			`
            <div class="pops-loading-content">
                ${
									config.addIndexCSS
										? `
                <style data-model-name="index">${pops.config.cssText.index}</style>
                <style data-model-name="anim">${pops.config.cssText.anim}</style>
                <style data-model-name="common">${pops.config.cssText.common}</style>
                `
										: ""
								}
                <style data-model-name="loadingCSS">
                    ${pops.config.cssText.loadingCSS}
                </style>
            ${config.style != null ? `<style>${config.style}</style>` : ""}
            <p pops style="${contentPStyle}">${config.content.text}</p>
            </div>
            `,
			""
		);

		/**
		 * 弹窗的主元素，包括动画层
		 */

		let $anim = PopsElementHandler.parseElement<HTMLDivElement>(animHTML);

		let { popsElement: $pops } = PopsHandler.handleQueryElement(
			$anim,
			PopsType
		);
		/**
		 * 遮罩层元素
		 */
		let $mask: HTMLDivElement | null = null;
		/**
		 * 已创建的元素列表
		 */
		let elementList: HTMLElement[] = [$anim];

		if (config.mask.enable) {
			// 创建遮罩层
			let _handleMask_ = PopsHandler.handleMask({
				type: PopsType,
				guid: guid,

				config: config,
				animElement: $anim,
				maskHTML: maskHTML,
			});
			$mask = _handleMask_.maskElement;
			elementList.push($mask);
		}
		let eventDetails = PopsHandler.handleLoadingEventDetails(
			guid,
			PopsType,
			$anim,
			$pops!,
			$mask!,
			config
		);
		popsDOMUtils.append(config.parent, elementList);
		if ($mask != null) {
			$anim.after($mask);
		}
		PopsHandler.handlePush(PopsType, {
			guid: guid,
			animElement: $anim,
			popsElement: $pops!,
			maskElement: $mask!,
		} as any);

		return PopsHandler.handleResultDetails(eventDetails);
	}
}

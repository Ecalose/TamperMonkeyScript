import { DOMUtils, pops, utils } from "@/env";
import type { PopsConfirmDetails } from "@whitesev/pops/dist/types/src/components/confirm/indexType";

type RuleEditViewOption<T> = {
	/** 标题 */
	title: string;
	/** 获取当前的数据 */
	data: () => IPromise<T>;
	/** 弹窗关闭的回调 */
	dialogCloseCallBack: (isSubmit: boolean) => IPromise<void>;
	/**
	 * <form>内的html内容
	 */
	getView: (data: T) => IPromise<DocumentFragment>;
	/**
	 * 自定义的style
	 */
	style?: string;
	/**
	 * 当提交表单时触发的回调函数
	 */
	onsubmit: /**
	 * @param event
	 * @returns
	 * + true 校验通过
	 * + false 校验失败
	 */
	(
		$form: HTMLFormElement,
		data: T
	) => IPromise<{
		success: boolean;
		data: T;
	}>;
	btn?: PopsConfirmDetails["btn"];
};

export class RuleEditView<T> {
	option: RuleEditViewOption<T>;
	constructor(option: RuleEditViewOption<T>) {
		this.option = option;
	}
	/**
	 * 显示视图
	 */
	async showView() {
		let $dialog = pops.confirm({
			title: {
				text: this.option.title,
				position: "center",
			},
			content: {
				text: /*html*/ `
                    <form class="rule-form-container" onsubmit="return false">
                        <ul class="rule-form-ulist">
                            
                        </ul>
                        <input type="submit" style="display: none;" />
                    </form>
                    `,
				html: true,
			},
			btn: utils.assign(
				{
					ok: {
						callback: async () => {
							await submitSaveOption();
						},
					},
				},
				this.option.btn || {},
				true
			),
			mask: {
				enable: true,
			},
			style: /*css*/ `
                ${pops.config.cssText.panelCSS}
                
                .rule-form-container {
                    
                }
                .rule-form-container li{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px 20px;
                    gap: 10px;
                }
                .pops-panel-item-left-main-text{
                    max-width: 150px;
                }
                .pops-panel-item-right-text{
                    padding-left: 30px;
                }
                .pops-panel-item-right-text,
                .pops-panel-item-right-main-text{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }

                ${this.option?.style ?? ""}
            `,
			width: window.innerWidth > 500 ? "500px" : "88vw",
			height: window.innerHeight > 500 ? "500px" : "80vh",
		});

		let $form = $dialog.$shadowRoot.querySelector<HTMLFormElement>(
			".rule-form-container"
		)!;
		let $submit =
			$dialog.$shadowRoot.querySelector<HTMLInputElement>(
				"input[type=submit]"
			)!;
		let $ulist =
			$dialog.$shadowRoot.querySelector<HTMLUListElement>(".rule-form-ulist")!;
		let view = await this.option.getView(await this.option.data());
		$ulist.appendChild(view);
		/**
		 * 保存配置的回调
		 */
		const submitSaveOption = async () => {
			let result = await this.option.onsubmit($form, await this.option.data());
			if (!result.success) {
				return;
			}
			$dialog.close();
			await this.option.dialogCloseCallBack(true);
		};
	}
}

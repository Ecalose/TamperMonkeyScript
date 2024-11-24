import type { PopsPanelDetails } from "./indexType";

export const PopsPanelConfig = (): DeepRequired<PopsPanelDetails> => {
	return {
		title: {
			text: "默认标题",
			position: "center",
			html: false,
			style: "",
		},
		content: [
			{
				id: "whitesev-panel-config-1",
				title: "菜单配置1",
				headerTitle: "菜单配置1",
				isDefault: false,
				attributes: [
					{
						"data-test": "test",
						"data-test-2": "test2",
					},
				],
				forms: [
					{
						className: "forms-1",
						text: "区域设置",
						type: "forms",
						attributes: [],
						forms: [
							{
								className: "panel-switch",
								text: "switch",
								type: "switch",
								// @ts-ignore
								props: {},
								disabled: false,
								attributes: [],
								getValue() {
									return true;
								},
								callback(event, value) {
									console.log("按钮开启状态：", value);
								},
							},
							{
								className: "panel-slider",
								text: "slider",
								type: "slider",
								// @ts-ignore
								props: {},
								attributes: [],
								getValue() {
									return 50;
								},
								callback(event, value) {
									console.log("滑块当前数值：", value);
								},
								min: 1,
								max: 100,
							},
							{
								className: "panel-button",
								text: "button",
								type: "button",
								// @ts-ignore
								props: {},
								attributes: [],
								buttonIcon: "eleme",
								buttonIconIsLoading: true,
								buttonType: "warning",
								buttonText: "warning按钮",
								callback(event) {
									console.log("点击按钮", event);
								},
							},
							{
								className: "panel-button",
								text: "button",
								// @ts-ignore
								props: {},
								type: "button",
								attributes: [],
								buttonIcon: "chromeFilled",
								buttonIconIsLoading: true,
								buttonType: "danger",
								buttonText: "danger按钮",
								callback(event) {
									console.log("点击按钮", event);
								},
							},
							{
								className: "panel-button",
								text: "button",
								type: "button",
								attributes: [],
								// @ts-ignore
								props: {},
								buttonIcon: "upload",
								buttonIconIsLoading: false,
								buttonType: "info",
								buttonText: "info按钮",
								callback(event) {
									console.log("点击按钮", event);
								},
							},
						],
					},
				],
			},
			{
				id: "whitesev-panel-config-2",
				title: "菜单配置2",
				headerTitle: "菜单配置2",
				isDefault: true,
				attributes: [
					{
						"data-value": "value",
						"data-value-2": "value2",
					},
				],
				forms: [
					{
						className: "panel-input",
						text: "input",
						type: "input",
						// @ts-ignore
						props: {},
						attributes: [],
						getValue() {
							return "50";
						},
						callback(event, value) {
							console.log("输入框内容改变：", value);
						},
						placeholder: "请输入内容",
					},
					{
						className: "panel-input-password",
						text: "input-password",
						type: "input",
						// @ts-ignore
						props: {},
						attributes: [],
						getValue() {
							return "123456";
						},
						callback(event, value) {
							console.log("密码输入框内容改变：", value);
						},
						isPassword: true,
						placeholder: "请输入密码",
					},
					{
						className: "panel-textarea",
						text: "textarea",
						type: "textarea",
						// @ts-ignore
						props: {},
						attributes: [],
						getValue() {
							return "50";
						},
						callback(event, value) {
							console.log("textarea输入框内容改变：", value);
						},
						placeholder: "请输入内容",
					},
					{
						className: "panel-select",
						text: "select",
						type: "select",
						// @ts-ignore
						props: {},
						attributes: [],
						getValue() {
							return 50;
						},
						callback(event, isSelectedValue, isSelectedText) {
							console.log(
								`select当前选项：${isSelectedValue}，当前选项文本：${isSelectedText}`
							);
						},
						data: [
							{
								value: "all",
								text: "所有",
								disable() {
									return false;
								},
							},
							{
								value: "text",
								text: "文本",
								disable() {
									return false;
								},
							},
							{
								value: "html",
								text: "超文本",
								disable() {
									return false;
								},
							},
						],
					},
					{
						className: "panel-select-multiple",
						type: "select-multiple",
						text: "select-multiple",
						// @ts-ignore
						props: {},

						attributes: [],
						placeholder: "请至少选择一个选项",
						getValue() {
							return ["select-1", "select-2"];
						},
						callback(selectInfo) {
							console.log(`select值改变，多选信息`, selectInfo);
						},
						clickCallBack(event, isSelectedInfo) {
							console.log("点击", event, isSelectedInfo);
						},
						closeIconClickCallBack(event, data) {
							console.log("点击关闭图标的事件", data);
						},
						data: [
							{
								value: "select-1",
								text: "单选1",
								isHTML: false,
								disable() {
									return false;
								},
							},
							{
								value: "select-2",
								text: "单选2",
								isHTML: false,
								disable() {
									return false;
								},
							},
							{
								value: "select-3",
								text: "单选3",
								isHTML: false,
								disable() {
									return false;
								},
							},
							{
								value: "select-4",
								text: "单选4",
								isHTML: false,
								disable() {
									return false;
								},
							},
							{
								value: "select-5",
								text: "单选5",
								isHTML: false,
								disable() {
									return false;
								},
							},
						],
					},
					{
						type: "forms",
						text: "deep菜单",
						forms: [
							{
								type: "deepMenu",
								className: "panel-deepMenu",
								text: "deepMenu",
								description: "二级菜单",
								rightText: "自定义配置",
								arrowRightIcon: true,
								afterAddToUListCallBack(formConfig, container) {
									console.log(formConfig, container);
								},
								clickCallBack(event, formConfig) {
									console.log("进入子配置", event, formConfig);
								},
								forms: [
									{
										className: "forms-1",
										text: "区域设置",
										type: "forms",
										attributes: [],
										forms: [
											{
												className: "panel-switch",
												text: "switch",
												type: "switch",
												// @ts-ignore
												props: {},
												attributes: [],
												getValue() {
													return true;
												},
												callback(event, value) {
													console.log("按钮开启状态：", value);
												},
											},
											{
												className: "panel-slider",
												text: "slider",
												// @ts-ignore
												props: {},
												type: "slider",
												attributes: [],
												getValue() {
													return 50;
												},
												callback(event, value) {
													console.log("滑块当前数值：", value);
												},
												min: 1,
												max: 100,
											},
											{
												className: "panel-button",
												text: "button",
												// @ts-ignore
												props: {},
												type: "button",
												attributes: [],
												buttonIcon: "eleme",
												buttonIconIsLoading: true,
												buttonType: "warning",
												buttonText: "warning按钮",
												callback(event) {
													console.log("点击按钮", event);
												},
											},
											{
												className: "panel-button",
												text: "button",
												type: "button",
												// @ts-ignore
												props: {},
												attributes: [],
												buttonIcon: "chromeFilled",
												buttonIconIsLoading: true,
												buttonType: "danger",
												buttonText: "danger按钮",
												callback(event) {
													console.log("点击按钮", event);
												},
											},
											{
												className: "panel-button",
												text: "button",
												// @ts-ignore
												props: {},
												type: "button",
												attributes: [],
												buttonIcon: "upload",
												buttonIconIsLoading: false,
												buttonType: "info",
												buttonText: "info按钮",
												callback(event) {
													console.log("点击按钮", event);
												},
											},
										],
									},
								],
							},
						],
					},
					{
						type: "forms",
						isFold: true,
						text: "折叠菜单",
						afterAddToUListCallBack(formConfig, container) {
							console.log(formConfig, container);
						},
						forms: [
							{
								className: "panel-switch",
								text: "switch",
								// @ts-ignore
								props: {},
								type: "switch",
								attributes: [],
								getValue() {
									return true;
								},
								callback(event, value) {
									console.log("按钮开启状态：", value);
								},
							},
						],
					},
				],
			},
		],
		btn: {
			close: {
				enable: true,
				callback(event) {
					event.close();
				},
			},
		},
		mask: {
			enable: false,
			clickEvent: {
				toClose: false,
				toHide: false,
			},
			clickCallBack: null,
		},
		useShadowRoot: true,
		class: "",
		mobileClassName: "pops-panel-is-mobile",
		isMobile: false,
		only: false,
		width: "700px",
		height: "500px",
		position: "center",
		animation: "pops-anim-fadein-zoom",
		zIndex: 10000,
		drag: false,
		dragLimit: true,
		dragExtraDistance: 3,
		dragMoveCallBack() {},
		dragEndCallBack() {},
		forbiddenScroll: false,
		style: null,
		beforeAppendToPageCallBack() {},
	};
};

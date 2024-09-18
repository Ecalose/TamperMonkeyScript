import type { PopsAlertDetails } from "./indexType";

export const PopsAlertConfig = (): Required<PopsAlertDetails> => {
	return {
		title: {
			text: "默认标题",
			position: "left",
			html: false,
			style: "",
		},
		content: {
			text: "默认内容",
			html: false,
			style: "",
		},
		btn: {
			position: "flex-end",
			ok: {
				size: void 0,
				enable: true,
				icon: void 0,
				rightIcon: false,
				iconIsLoading: false,
				text: "确定",
				type: "primary",
				callback: function (event) {
					event.close();
				},
			},
			close: {
				enable: true,
				callback: function (event) {
					event.close();
				},
			},
		},
		class: "",
		only: false,
		width: "350px",
		height: "200px",
		position: "center",
		animation: "pops-anim-fadein-zoom",
		zIndex: 10000,
		mask: {
			enable: false,
			clickEvent: {
				toClose: false,
				toHide: false,
			},
			clickCallBack: void 0,
		},
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
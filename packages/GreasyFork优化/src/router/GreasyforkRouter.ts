const GreasyforkRouter = {
	/**
	 * 代码页面
	 */
	isCode() {
		return window.location.pathname.split("/")?.includes("code");
	},
	/**
	 * （严格比较）代码页面
	 */
	isCodeStrict() {
		return window.location.pathname.endsWith("/code");
	},
	/**
	 * 版本页面
	 */
	isVersion() {
		return window.location.pathname.endsWith("/versions");
	},
	/**
	 * 用户主页
	 */
	isUserHome() {
		return window.location.pathname.match(/\/.+\/users\/.+/gi);
	},
	/**
	 * 脚本页面
	 */
	isScript() {
		return window.location.pathname.includes("/scripts/");
	},
	/**
	 * 脚本列表页面
	 */
	isScriptList() {
		return window.location.pathname.endsWith("/scripts");
	},
	/**
	 * 讨论页面
	 */
	isDiscuessions() {
		return window.location.pathname.endsWith("/discussions");
	},
};

export { GreasyforkRouter };

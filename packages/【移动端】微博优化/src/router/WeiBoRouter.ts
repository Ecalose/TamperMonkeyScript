const WeiBoRouter = {
	/**
	 * 移动端微博
	 * @returns
	 */
	isMWeiBo() {
		return globalThis.location.hostname === "m.weibo.cn";
	},
	/**
	 * 移动端微博-帖子
	 */
	isMWeiBo_detail() {
		return (
			this.isMWeiBo() && globalThis.location.pathname.startsWith("/detail/")
		);
	},
	/**
	 * 移动端微博-主页
	 */
	isMWeiBo_u() {
		return this.isMWeiBo() && globalThis.location.pathname.startsWith("/u/");
	},
	/**
	 * 移动端微博-搜索
	 */
	isMWeiBo_search() {
		return (
			this.isMWeiBo() && globalThis.location.pathname.startsWith("/search")
		);
	},
	/**
	 * 话题
	 */
	isHuaTi() {
		return globalThis.location.hostname === "huati.weibo.cn";
	},
	/**
	 * 视频页
	 */
	isVideo() {
		return globalThis.location.hostname === "h5.video.weibo.com";
	},
	/**
	 * 头条
	 */
	isCard() {
		return globalThis.location.hostname === "card.weibo.com";
	},
	/**
	 * 头条文章
	 */
	isCardArticle() {
		return (
			this.isCard() && globalThis.location.pathname.startsWith("/article/")
		);
	},
};

export { WeiBoRouter };

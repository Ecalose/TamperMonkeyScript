import { defineConfig } from "vite";
import monkey, { cdn, util } from "vite-plugin-monkey";
import { ViteUtils, GetLib } from "../../vite.utils";
import mkcert from "vite-plugin-mkcert";

const SCRIPT_NAME = "【移动端】微博优化";
const Utils = new ViteUtils(__dirname);
let FILE_NAME = SCRIPT_NAME + ".user.js";

/* 是否压缩代码 */
let isMinify = false;
if (process.argv.includes("--minify")) {
	isMinify = true;
	FILE_NAME = SCRIPT_NAME + ".min.user.js";
}

let isEmptyOutDir = true;
if (process.argv.includes("--no-empty-outDir")) {
	isEmptyOutDir = false;
}

let VERSION =
	process.env.NODE_ENV === "development"
		? "0.0.1"
		: Utils.getScriptVersion(!isEmptyOutDir);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		mkcert({
			force: true,
		}),
		monkey({
			entry: "src/main.ts",
			userscript: {
				name: SCRIPT_NAME,
				namespace: "https://github.com/WhiteSevs/TamperMonkeyScript",
				supportURL: "https://github.com/WhiteSevs/TamperMonkeyScript/issues",
				version: VERSION,
				author: "WhiteSevs",
				"run-at": "document-start",
				license: "GPL-3.0-only",
				require: await GetLib(["CoverUMD"]),
				resource: {
					ElementPlusResourceCSS:
						"https://fastly.jsdelivr.net/npm/element-plus@2.7.2/dist/index.min.css",
				},
				icon: "https://favicon.yandex.net/favicon/v2/https://m.weibo.cn/?size=32",
				description:
					"劫持自动跳转登录，修复用户主页正确跳转，伪装客户端，可查看名人堂日程表，解锁视频清晰度(1080p、2K、2K-60、4K、4K-60)",
				match: [
					"http*://m.weibo.cn/*",
					"http*://huati.weibo.cn/*",
					"http*://h5.video.weibo.com/*",
					"http*://card.weibo.com/*",
				],
				connect: ["m.weibo.cn", "www.weibo.com", "passport.weibo.com"],
				grant: [
					"GM_addStyle",
					"GM_registerMenuCommand",
					"GM_unregisterMenuCommand",
					"GM_getValue",
					"GM_setValue",
					"GM_deleteValue",
					"GM_xmlhttpRequest",
					"GM_info",
					"unsafeWindow",
				],
			},
			clientAlias: "ViteGM",
			server: {
				mountGmApi: true,
				open: false,
			},
			build: {
				metaFileName: true,
				metaLocalFileName: true,
				autoGrant: true,
				fileName: FILE_NAME,
				externalGlobals: {
					qmsg: cdn.jsdelivrFastly("Qmsg", "dist/index.umd.js"),
					"@whitesev/utils": cdn.jsdelivrFastly("Utils", "dist/index.umd.js"),
					"@whitesev/domutils": cdn.jsdelivrFastly(
						"DOMUtils",
						"dist/index.umd.js"
					),
					"@whitesev/pops": cdn.jsdelivrFastly("pops", "dist/index.umd.js"),
				},
			},
		}),
	],
	server: {
		host: "::",
	},
	optimizeDeps: {
		force: true,
	},
	resolve: {
		alias: {
			"@": Utils.getAbsolutePath("./src"),
		},
	},
	build: {
		/* 构建的.user.js是否压缩 */
		minify: isMinify,
		emptyOutDir: isEmptyOutDir,
	},
});

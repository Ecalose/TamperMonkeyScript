import { defineConfig } from "vite";
import monkey, { cdn, util } from "vite-plugin-monkey";
import { ViteUtils, GetLib } from "../../vite.utils";
import mkcert from "vite-plugin-mkcert";

const SCRIPT_NAME = "Demo Script Name";
const Utils = new ViteUtils(__dirname);
const pkg = Utils.getPackageJSON();
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

let VERSION = "0.0.1";
if (process.argv.findIndex((i) => i.startsWith("build")) !== -1) {
	VERSION = Utils.getScriptVersion(!isEmptyOutDir);
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		mkcert({
			force: true,
		}),
		monkey({
			// 脚本入口
			entry: "./src/entrance.ts",
			userscript: {
				// 脚本名
				name: SCRIPT_NAME,
				// 命名空间
				namespace: "https://github.com/WhiteSevs/TamperMonkeyScript",
				// 反馈地址
				supportURL: "https://github.com/WhiteSevs/TamperMonkeyScript/issues",
				version: VERSION,
				// 版本号
				author: "WhiteSevs",
				// 运行时刻
				"run-at": "document-start",
				// 许可证
				license: "GPL-3.0-only",
				// 引用库
				require: await GetLib(["CoverUMD"]),
				// 图标
				icon: "",
				// 脚本描述
				description: "",
				// 脚本运行域
				match: ["*://*/*"],
				// GM_xmlhttpRequest允许访问的域
				connect: ["*"],
				// GM api权限申请
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
					"GM_getResourceText",
				],
			},
			clientAlias: "ViteGM",
			server: {
				// 把GM api 挂载到unsafeWindow上
				mountGmApi: true,
				// dev时浏览器自动访问地址从而触发脚本管理器安装本脚本
				open: false,
			},
			build: {
				// 输出.meta.js
				metaFileName: true,
				// 输出.meta.local.user.js
				metaLocalFileName: true,
				// 自动申请权限，可以不用填上面的grant
				autoGrant: true,
				// 输出文件名
				fileName: FILE_NAME,
				// 引入外部库
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
	resolve: {
		alias: {
			"@": Utils.getAbsolutePath("./src"),
			"@lib": Utils.getAbsolutePath("./../../lib"),
		},
	},
	server: {
		// 允许外部访问
		host: "::",
	},
	optimizeDeps: {
		// 无论deps是否发生变化，都要强制dep预优化。
		force: true,
	},
	build: {
		/* 构建的.user.js是否压缩 */
		minify: isMinify,
		// 构建输出目录是否清空
		emptyOutDir: isEmptyOutDir,
	},
});

/**
 * 空对象
 *
 * 类似
 * {
 *  "xxx": string,
 * }
 */
type NestedObjectWithToString = {
	[key: string]: any | NestedObjectWithToString;
	toString(): any;
};

/**
 * Promise的兼容类型
 *
 * 它是返回提供的类型或Promise包裹的类型
 */
declare type IPromise<T> = T | Promise<T>;

/**
 * 提取数组中的元素类型
 */
declare type ExtractElementType<T> = T extends Array<infer U> ? U : never;

/**
 * 修复无法识别.vue文件的问题
 */
declare module "*.vue" {
	import { defineComponent } from "vue";
	const Component: ReturnType<typeof defineComponent>;
	export default Component;
}


declare interface Window {
	comiis_recommend_key: number;
	$: any;
	uid: string;
	allowrecommend: string;
	tid: number;
	username: string;
	textarea_scrollHeight: Function;
	comiis_addsmilies?: Function;
	evalscript: Function;
	comiis_delthread:Function;
	Watermark: typeof import("@lib/js-watermark/index")
}

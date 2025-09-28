import { ElementSelector } from "./ElementSelector";
import type { WindowApiOption } from "./types/WindowApi";
import { WindowApi } from "./WindowApi";
declare class ElementWait extends ElementSelector {
    windowApi: typeof WindowApi.prototype;
    constructor(windowApiOption?: WindowApiOption);
    /**
     * 等待任意事件成立
     *
     * 运行方式为根据页面元素的改变而触发回调
     * @param checkFn 检测的函数
     * @param timeout 超时时间，默认0
     * @param parent （可选）父元素，默认document
     * @example
     * Utils.wait(()=> {
     *   let $test = document.querySelector("#test");
     *   return {
     *     success: $test !== null,
     *     data:  $test
     *   }
     * })
     */
    wait<T>(checkFn: (...args: any[]) => {
        /**
         * 是否检测成功
         */
        success: boolean;
        /**
         * 返回的值
         */
        data: T;
    }, timeout?: null | undefined, parent?: Node | Element | Document | HTMLElement): Promise<T>;
    wait<T>(checkFn: (...args: any[]) => {
        /**
         * 是否检测成功
         */
        success: boolean;
        /**
         * 返回的值
         */
        data: T;
    }, timeout?: number, parent?: Node | Element | Document | HTMLElement): Promise<T | null>;
    /**
     * 等待元素出现
     * @param selectorFn 获取元素的函数
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNode(()=>document.querySelector("div"), 1000).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement | null
     * })
     */
    waitNode<K>(selectorFn: () => K | null | undefined): Promise<K>;
    waitNode<K>(selectorFn: () => K | null | undefined, timeout: number): Promise<K | null | undefined>;
    /**
     * 等待元素出现
     * @param selector CSS选择器
     * @param parent （可选）父元素，默认document
     * @example
     * Utils.waitNode("div").then( $div =>{
     *  console.log($div); // div => HTMLDivELement
     * })
     * Utils.waitNode("div", document).then( $div =>{
     *  console.log($div); // div => HTMLDivELement
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selector: K, parent?: Node | Element | Document | HTMLElement): Promise<HTMLElementTagNameMap[K]>;
    waitNode<T extends Element>(selector: string, parent?: Node | Element | Document | HTMLElement): Promise<T>;
    /**
     * 等待元素出现
     * @param selectorList CSS选择器数组
     * @param parent （可选）父元素，默认document
     * @example
     * Utils.waitNode(["div"]).then( ([$div]) =>{
     *  console.log($div); // div => HTMLDivELement[]
     * })
     * Utils.waitNode(["div"], document).then( ([$div]) =>{
     *  console.log($div); // div => HTMLDivELement[]
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent?: Node | Element | Document | HTMLElement): Promise<HTMLElementTagNameMap[K][]>;
    waitNode<T extends Element[]>(selectorList: string[], parent?: Node | Element | Document | HTMLElement): Promise<T>;
    /**
     * 等待元素出现
     * @param selector CSS选择器
     * @param parent 父元素，默认document
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNode("div", document, 1000).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement | null
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selector: K, parent: Node | Element | Document | HTMLElement, timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitNode<T extends Element>(selector: string, parent: Node | Element | Document | HTMLElement, timeout: number): Promise<T | null>;
    /**
     * 等待元素出现
     * @param selectorList CSS选择器数组
     * @param parent 父元素，默认document
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNode(["div"], document, 1000).then( ([$div]) =>{
     *  console.log($div); // $div => HTMLDivELement[] | null
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitNode<T extends Element[]>(selectorList: string[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<T | null>;
    /**
     * 等待元素出现
     * @param selector CSS选择器
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNode("div", 1000).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement | null
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selector: K, timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitNode<T extends Element>(selector: string, timeout: number): Promise<T | null>;
    /**
     * 等待元素出现
     * @param selectorList CSS选择器数组
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNode(["div"], 1000).then( [$div] =>{
     *  console.log($div); // $div => HTMLDivELement[] | null
     * })
     */
    waitNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitNode<T extends Element[]>(selectorList: string[], timeout: number): Promise<T | null>;
    /**
     * 等待任意元素出现
     * @param selectorList CSS选择器数组
     * @param parent （可选）监听的父元素
     * @example
     * Utils.waitAnyNode(["div","div"]).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement 这里是第一个
     * })
     * Utils.waitAnyNode(["a","div"], document).then( $a =>{
     *  console.log($a); // $a => HTMLAnchorElement 这里是第一个
     * })
     */
    waitAnyNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent?: Node | Element | Document | HTMLElement): Promise<HTMLElementTagNameMap[K]>;
    waitAnyNode<T extends Element>(selectorList: string[], parent?: Node | Element | Document | HTMLElement): Promise<T>;
    /**
     * 等待任意元素出现
     * @param selectorList CSS选择器数组
     * @param parent 父元素，默认document
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitAnyNode(["div","div"], document, 10000).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement | null
     * })
     */
    waitAnyNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitAnyNode<T extends Element>(selectorList: string[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<T | null>;
    /**
     * 等待任意元素出现
     * @param selectorList CSS选择器数组
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitAnyNode(["div","div"], 10000).then( $div =>{
     *  console.log($div); // $div => HTMLDivELement | null
     * })
     */
    waitAnyNode<K extends keyof HTMLElementTagNameMap>(selectorList: K[], timeout: number): Promise<HTMLElementTagNameMap[K] | null>;
    waitAnyNode<T extends Element>(selectorList: string[], timeout: number): Promise<T | null>;
    /**
     * 等待元素数组出现
     * @param selector CSS选择器
     * @param parent （可选）监听的父元素
     * @example
     * Utils.waitNodeList("div").then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>
     * })
     * Utils.waitNodeList("div", document).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>
     * })
     */
    waitNodeList<T extends keyof HTMLElementTagNameMap>(selector: T, parent?: Node | Element | Document | HTMLElement): Promise<NodeListOf<HTMLElementTagNameMap[T]>>;
    waitNodeList<T extends NodeListOf<Element>>(selector: string, parent?: Node | Element | Document | HTMLElement): Promise<T>;
    /**
     * 等待元素数组出现
     * @param selectorList CSS选择器数组
     * @param parent （可选）监听的父元素
     * @example
     * Utils.waitNodeList(["div"]).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>[]
     * })
     * Utils.waitNodeList(["div"], document).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>[]
     * })
     */
    waitNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent?: Node | Element | Document | HTMLElement): Promise<NodeListOf<HTMLElementTagNameMap[K]>[]>;
    waitNodeList<T extends NodeListOf<Element>[]>(selectorList: string[], parent?: Node | Element | Document | HTMLElement): Promise<T>;
    /**
     * 等待元素数组出现
     * @param selector CSS选择器
     * @param parent 监听的父元素
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNodeList("div", document, 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
     * })
     */
    waitNodeList<T extends NodeListOf<Element>>(selector: string, parent: Node | Element | Document | HTMLElement, timeout: number): Promise<T | null>;
    waitNodeList<K extends keyof HTMLElementTagNameMap>(selector: K, parent: Node | Element | Document | HTMLElement, timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
    /**
     * 等待元素数组出现
     * @param selectorList CSS选择器数组
     * @param parent 监听的父元素
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNodeList(["div"], document, 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>[] | null
     * })
     */
    waitNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]>[] | null>;
    waitNodeList<T extends NodeListOf<Element>[]>(selectorList: string[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<T | null>;
    /**
     * 等待元素数组出现
     * @param selector CSS选择器数组
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNodeList("div", 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
     * })
     */
    waitNodeList<K extends keyof HTMLElementTagNameMap>(selector: K[], timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
    waitNodeList<T extends NodeListOf<Element>>(selector: string[], timeout: number): Promise<T | null>;
    /**
     * 等待元素数组出现
     * @param selectorList CSS选择器数组
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitNodeList(["div"], 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>[] | null
     * })
     */
    waitNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]>[] | null>;
    waitNodeList<T extends NodeListOf<Element>>(selectorList: string[], timeout: number): Promise<T[] | null>;
    /**
     * 等待任意元素数组出现
     * @param selectorList CSS选择器数组
     * @param parent （可选）监听的父元素
     * @example
     * Utils.waitAnyNodeList(["div","a"]).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>
     * })
     * Utils.waitAnyNodeList(["div","a"], document).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement>
     * })
     */
    waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent?: Node | Element | Document | HTMLElement): Promise<NodeListOf<HTMLElementTagNameMap[K]>>;
    waitAnyNodeList<T extends Element>(selectorList: string[], parent?: Node | Element | Document | HTMLElement): Promise<NodeListOf<T>>;
    /**
     * 等待任意元素数组出现
     * @param selectorList CSS选择器数组
     * @param parent 父元素，默认document
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitAnyNodeList(["div","a"], document, 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
     * })
     */
    waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
    waitAnyNodeList<T extends Element>(selectorList: string[], parent: Node | Element | Document | HTMLElement, timeout: number): Promise<NodeListOf<T> | null>;
    /**
     * 等待任意元素出现
     * @param selectorList CSS选择器数组
     * @param timeout 超时时间，默认0
     * @example
     * Utils.waitAnyNodeList(["div","div"], 10000).then( $result =>{
     *  console.log($result); // $result => NodeListOf<HTMLDivElement> | null
     * })
     */
    waitAnyNodeList<K extends keyof HTMLElementTagNameMap>(selectorList: K[], timeout: number): Promise<NodeListOf<HTMLElementTagNameMap[K]> | null>;
    waitAnyNodeList<T extends Element>(selectorList: string[], timeout: number): Promise<NodeListOf<T> | null>;
}
declare const elementWait: ElementWait;
export { elementWait, ElementWait };

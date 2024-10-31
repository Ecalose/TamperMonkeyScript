import type { PopsPanelCommonDetails } from "./commonType";
/**
 * pops.panel的 select
 */
export interface PopsPanelSelectDetails<T = any> extends PopsPanelCommonDetails<PopsPanelSelectDetails> {
    /**
     * （可选）className属性
     */
    className?: string;
    /**
     * （可选）自定义元素属性
     */
    attributes?: {
        [key: string]: any;
    };
    /**
     * （可选）自定义属性
     */
    props?: {
        [K in keyof HTMLElement]?: HTMLElement[K];
    };
    /**
     * 显示在左边的文字
     */
    text: string;
    /**
     * （可选）左边的文字下面的描述
     */
    description?: string;
    /**
     * 类型
     */
    type: "select";
    /**
     * （可选）是否禁用
     */
    disabled?: boolean;
    /**
     * 获取该项的值的回调函数
     */
    getValue(): T;
    /**
     * 选择器的值改变触发的回调函数
     * @param event 事件
     * @param isSelectedValue 当前选中的值，也就是元素属性上的__value__
     * @param isSelectedText 当前选中的文本
     */
    callback?(event: PointerEvent | TouchEvent, isSelectedValue: T, isSelectedText: string): void;
    /**
     * 点击select元素触发该回调
     * @param event 点击事件
     * @param selectElement 当前的select元素
     */
    clickCallBack?(event: PointerEvent | MouseEvent, selectElement: HTMLSelectElement): void;
    /**
     * 选择器内的数据组
     */
    data: {
        /**
         * 真正的值
         */
        value: T;
        /**
         * 显示的文字
         */
        text: string;
        /**
         * （可选）是否禁用项
         * 触发条件：
         * + 点击select元素
         * + select元素触发change事件
         */
        disable?(value: T): boolean;
    }[];
}

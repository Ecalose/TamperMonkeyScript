import type { PopsCommonConfig } from "../../types/components";
import type { PopsIcon } from "../../types/icon";
/**
 * pops.rightClickMenu的右键菜单配置
 */
export interface PopsRightClickMenuDataDetails {
    /**
     * svg图标
     */
    icon: PopsIcon | string;
    /**
     * 图标是否旋转
     */
    iconIsLoading: boolean;
    /**
     * 文字
     */
    text: string | (() => string);
    /**
     * 点击的回调函数
     * @param clickEvent 点击菜单的click事件
     * @param contextMenuEvent 触发的contextmenu事件
     * @param liElement <li>元素
     * @returns
     * + true(默认) 关闭菜单
     * + false 不关闭菜单
     *
     */
    callback?: (clickEvent: PointerEvent, contextMenuEvent: PointerEvent, liElement: HTMLLIElement) => boolean | void | Promise<boolean | void>;
    /**
     * 子项配置
     */
    item?: PopsRightClickMenuDataDetails[] | null;
}
/**
 * pops.rightClickMenu
 */
export interface PopsRightClickMenuDetails extends Pick<PopsCommonConfig, "useShadowRoot" | "beforeAppendToPageCallBack" | "zIndex" | "style" | "only"> {
    /**
     * 目标元素
     * @default document.documentElement
     */
    target?: HTMLElement | Window | EventTarget | Node;
    /**
     * 目标的子元素选择器，默认为空
     */
    targetSelector?: string | null;
    /**
     * 右键菜单数据
     */
    data: PopsRightClickMenuDataDetails[];
    /**
     * 自定义className，默认为空
     * @default ""
     */
    className?: string;
    /**
     * 是否启用动画，默认true
     * @default true
     */
    isAnimation?: boolean;
    /**
     * 是否阻止默认contextmenu事件
     * @default false
     */
    preventDefault?: boolean;
}

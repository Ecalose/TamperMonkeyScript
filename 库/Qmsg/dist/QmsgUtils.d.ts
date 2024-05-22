import { QmsgOption } from ".";
import { QmsgMsg } from "./QmsgMsg";
export interface QmsgItemInfo {
    config: string;
    instance: QmsgMsg;
    uuid: string;
}
export declare const QmsgUtils: {
    /**
     * 生成带插件名的名称
     * @param args
     * @returns
     */
    getNameSpacify(...args: string[]): string;
    /**
     * 获取唯一性的UUID
     * @returns
     */
    getUUID(): string;
    /**
     * 合并参数为配置信息，用于创建Msg实例
     * @param content 文本内容
     * @param config 配置
     * @private
     */
    mergeArgs(content?: string, config?: object): Required<QmsgOption>;
    /**
     * 通过配置信息 来判断是否为同一条消息,并返回消息实例
     * @param option 配置项
     * @private
     */
    judgeReMsg(option: QmsgOption): QmsgMsg;
};

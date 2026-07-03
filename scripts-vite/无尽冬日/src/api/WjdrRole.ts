import { httpx, utils } from "@/env";
import { generateSign } from "./sign";
type WjdrResponseType<T> = {
  code: 0 | 1;
  msg: string;
  data: T;
  err_code: number;
};

export type WjdrPlayerType = {
  /** 角色id */
  fid: number;
  /** 角色昵称 */
  nickname: string;
  /** 区服号 */
  kid: number;
  /** 炉子等级 */
  stove_lv: number;
  /** 炉子等级图标 */
  stove_lv_content: string;
  /** 角色头像 */
  avatar_image: string;
  /** 总充值金额（目前仅获取为0） */
  total_recharge_amount: number;
};

export const WjdrRole = {
  async player(fid: number | string) {
    const response = await httpx.post("https://wjdr-giftcode-api.campfiregames.cn/api/player", {
      data: generateSign({
        fid: fid,
        time: Date.now(),
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "https://wjdr-giftcode.wjdr.cn",
        Referer: "https://wjdr-giftcode.wjdr.cn/",
      },
    });
    if (!response.status) {
      return;
    }
    const data = utils.toJSON<WjdrResponseType<WjdrPlayerType>>(response.data.responseText);

    if (data.code !== 0) {
      return;
    }
    return data.data;
  },
};

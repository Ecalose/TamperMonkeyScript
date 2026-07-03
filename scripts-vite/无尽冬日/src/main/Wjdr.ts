import { WjdrRole } from "@/api/WjdrRole";
import { WjdrUtil } from "@/utils/WjdrUtil";
import { unsafeWindow } from "ViteGM";

export const Wjdr = {
  init() {
    Reflect.set(unsafeWindow, "WjdrRole", WjdrRole);
    Reflect.set(unsafeWindow, "WjdrUtil", WjdrUtil);
  },
};

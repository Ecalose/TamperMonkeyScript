import { GM_Menu, log, utils } from "@/env";
import { CSDNRouter } from "@/router/CSDNRouter";
import { CSDNHuaWeiCloud } from "./huaWeiCloud/CSDNHuaWeiCloud";
import { CSDNBlog } from "./blog/CSDNBlog";
import { CSDNWenKu } from "./wenku/CSDNWenKu";
import { CSDNLink } from "./link/CSDNLink";

const CSDN = {
    init() {
        if (CSDNRouter.isLink()) {
            log.info("Router: 中转链接")
            CSDNLink.init();
        } else if (CSDNRouter.isHuaWeiCloudBlog()) {
            log.info("Router: 华为云联盟")
            CSDNHuaWeiCloud.init();
        } else if (CSDNRouter.isBlog()) {
            log.info("Router: 博客")
            CSDNBlog.init();
        } else if (CSDNRouter.isWenKu()) {
            log.info("Router: 文库")
            CSDNWenKu.init();
        } else {
            log.error("暂未适配，请反馈开发者：" + globalThis.location.href);
        }
    },
}


export {
    CSDN
}
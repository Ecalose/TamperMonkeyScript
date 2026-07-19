import { $, addStyle, DOMUtils, utils } from "@/env";
import { Panel } from "@components/setting/panel";

export const DouYinVideoElementAutoHideInjectAttr = "data-is-inject-mouse-hide";

/**
 * 自动隐藏元素
 * @param delayTimeKey 延迟时间
 * @param selectors 选择器
 * @param opacityIsImportant 是否强制应用透明度
 */
export const DouYinVideoElementAutoHide = (
  delayTimeKey: string,
  selectors: string[],
  opacityIsImportant: boolean = true
) => {
  const opacityShowAttrName = "data-opacity-show";
  const opacityHideAttrName = "data-opacity-hide";
  const result: any[] = [];
  const delayTime = Panel.getDynamicValue<number>(delayTimeKey, Panel.getDefaultValue(delayTimeKey));

  const hideCSSText = (__delayTime__ = delayTime.value) => {
    const importantCSSText = opacityIsImportant ? " !important" : "";
    if (__delayTime__ === 0) {
      // 直接隐藏
      return /*css*/ `
            ${selectors.join(",")}{
                opacity: 0${importantCSSText};
                transition: ${__delayTime__ === 0 ? "none !important;" : "opacity .3s linear !important;"}

                &[${opacityHideAttrName}]{
                    opacity: 0${importantCSSText};
                }
                &[${opacityShowAttrName}],
                &:hover{
                    opacity: 1${importantCSSText};
                }
            }
            `;
    } else {
      // 主动添加隐藏属性才会隐藏
      return /*css*/ `
            ${selectors.join(",")}{
                transition: opacity .3s linear !important;

                &[${opacityHideAttrName}]{
                    opacity: 0${importantCSSText};
                }
                &[${opacityShowAttrName}]{
                    opacity: 1${importantCSSText};
                }
                &:hover{
                    opacity: 1${importantCSSText};
                }
            }
            `;
    }
  };
  const $style = addStyle(hideCSSText());
  result.push($style);
  const listenerId = Panel.addValueChangeListener(delayTimeKey, (key, newValue) => {
    DOMUtils.html($style, hideCSSText(newValue));
  });
  result.push(() => {
    Panel.removeValueChangeListener(listenerId);
  });
  const lockFn = new utils.LockFunction(() => {
    /** 视频信息列表 */
    selectors.forEach((selector) => {
      const $el = $<HTMLElement>(`${selector.trim()}:not([${DouYinVideoElementAutoHideInjectAttr}])`);
      if (!$el) return;
      if ($el.querySelector(`[${DouYinVideoElementAutoHideInjectAttr}]`)) return;
      if ($el.closest(`[${DouYinVideoElementAutoHideInjectAttr}]`)) return;
      $el.setAttribute(DouYinVideoElementAutoHideInjectAttr, "");

      let timeId: number = 0;
      /**
       * 显示
       */
      const show = () => {
        clearTimeout(timeId);
        if (delayTime.value === 0) {
          // 默认隐藏的，强制显示
          $el.setAttribute(opacityShowAttrName, "");
        } else {
          // 移除隐藏
          $el.removeAttribute(opacityHideAttrName);
          // 添加强制显示
          $el.setAttribute(opacityShowAttrName, "");
        }
      };
      /**
       * 隐藏
       */
      const hide = (isEnableDelayTime: boolean = false) => {
        if (isEnableDelayTime) {
          timeId = setTimeout(() => {
            hide(!isEnableDelayTime);
          }, delayTime.value);
          return;
        }
        if (delayTime.value === 0) {
          // 这个是默认隐藏，移除显示的
          $el.removeAttribute(opacityShowAttrName);
        } else {
          // 隐藏
          $el.setAttribute(opacityHideAttrName, "");
          // 移除强制显示
          $el.removeAttribute(opacityShowAttrName);
        }
      };
      // const showListener = DOMUtils.on($el, ["mouseenter", "touchstart"], () => {
      //   show();
      // });
      // const hideListener = DOMUtils.on($el, ["mouseleave", "touchend", "touchcancel"], () => {
      //   hide();
      // });
      const interObserver = new IntersectionObserver(
        (entries) => {
          const intersection = entries[0];
          if (intersection.isIntersecting) {
            // 进入视图 强制显示，然后延迟隐藏
            show();
            hide(true);
          } else {
            // 离开视图 直接显示吧，下次显示就不用强制过渡显示了
            // show();
          }
        },
        {
          root: null,
          rootMargin: "50px",
          threshold: 0.1,
        }
      );
      interObserver.observe($el);

      result.push(() => {
        // showListener.off();
        // hideListener.off();
        interObserver.unobserve($el);
        interObserver.disconnect();
      });
    });
  });
  const observer = utils.mutationObserver(document.body || document.documentElement, {
    config: {
      subtree: true,
      childList: true,
    },
    immediate: true,
    callback: () => {
      lockFn.run();
    },
  });

  result.push(() => {
    observer?.disconnect();
  });

  return result;
};

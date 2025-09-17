import { TryCatch } from "./TryCatch";

class CommonUtil {
  /** 
     * JSON数据从源端替换到目标端中，如果目标端存在该数据则替换，不添加，返回结果为目标端替换完毕的结果
     * @param target 目标数据
     * @param source 源数据
     * @param isAdd 是否可以追加键，默认false
     * @example
     * Utils.assign({"1":1,"2":{"3":3}}, {"2":{"3":4}});
     * > 
     * {
            "1": 1,
            "2": {
                "3": 4
            }
        }
     */
  assign<T1, T2 extends object, T3 extends boolean>(target: T1, source: T2, isAdd?: T3): T3 extends true ? T1 & T2 : T1;
  assign(target = {}, source = {}, isAdd = false) {
    const UtilsContext = this;
    if (Array.isArray(source)) {
      const canTraverse = source.filter((item) => {
        return typeof item === "object";
      });
      if (!canTraverse.length) {
        return source;
      }
    }
    if (source == null) {
      return target;
    }
    if (target == null) {
      target = {};
    }
    if (isAdd) {
      for (const sourceKeyName in source) {
        const targetKeyName = sourceKeyName;
        const targetValue = Reflect.get(target, targetKeyName);
        const sourceValue = Reflect.get(source, sourceKeyName);
        if (
          typeof sourceValue === "object" &&
          sourceValue != null &&
          sourceKeyName in target &&
          !UtilsContext.isDOM(sourceValue)
        ) {
          /* 源端的值是object类型，且不是元素节点 */
          Reflect.set(target, sourceKeyName, UtilsContext.assign(targetValue, sourceValue, isAdd));
          continue;
        }
        Reflect.set(target, sourceKeyName, sourceValue);
      }
    } else {
      for (const targetKeyName in target) {
        if (targetKeyName in source) {
          const targetValue = Reflect.get(target, targetKeyName);
          const sourceValue = Reflect.get(source, targetKeyName);
          if (
            typeof sourceValue === "object" &&
            sourceValue != null &&
            !UtilsContext.isDOM(sourceValue) &&
            Object.keys(sourceValue).length
          ) {
            /* 源端的值是object类型，且不是元素节点 */
            Reflect.set(target, targetKeyName, UtilsContext.assign(targetValue, sourceValue, isAdd));
            continue;
          }
          /* 直接赋值 */
          Reflect.set(target, targetKeyName, sourceValue);
        }
      }
    }

    return target;
  }
  /**
     * 判断对象或数据是否为空
     * + `String`判空的值，如 ""、"null"、"undefined"、"   "
     * + `Number`判空的值，如 0
     * + `Object`判空的值，如 {}、null、undefined
     * + `Array`(存在属性Symbol.iterator)判空的值，如 []
     * + `Boolean`判空的值，如false
     * + `Function`判空的值，如()=>{}、(xxx="")=>{}、function(){}、function(xxx=""){}
     * @returns
     * + true 为空
     * + false 不为空
     * @example
      Utils.isNull({});
      > true
     * @example
      Utils.isNull([]);
      > true
     * @example
      Utils.isNull(" ");
      > true
     * @example
      Utils.isNull(function(){});
      > true
     * @example
      Utils.isNull(()=>{}));
      > true
     * @example
      Utils.isNull("undefined");
      > true
     * @example
      Utils.isNull("null");
      > true
     * @example
      Utils.isNull(" ", false);
      > true
     * @example
      Utils.isNull([1],[]);
      > false
     * @example
      Utils.isNull([],[1]);
      > false
     * @example
      Utils.isNull(false,[123]);
      > false
     **/
  isNull<T>(value: T | undefined | null): value is null | undefined;
  isNull(...args: any[]): boolean;
  isNull(...args: any[]): boolean {
    let result = true;
    const checkList = [...args];
    for (const objItem of checkList) {
      let itemResult = false;
      if (objItem === null || objItem === undefined) {
        itemResult = true;
      } else {
        switch (typeof objItem) {
          case "object":
            if (typeof objItem[Symbol.iterator] === "function") {
              /* 可迭代 */
              itemResult = objItem.length === 0;
            } else {
              itemResult = Object.keys(objItem).length === 0;
            }
            break;
          case "number":
            itemResult = objItem === 0;
            break;
          case "string":
            itemResult = objItem.trim() === "" || objItem === "null" || objItem === "undefined";
            break;
          case "boolean":
            itemResult = !objItem;
            break;
          case "function": {
            const funcStr = objItem.toString().replace(/\s/g, "");
            /* 排除()=>{}、(xxx="")=>{}、function(){}、function(xxx=""){} */
            itemResult = Boolean(funcStr.match(/^\(.*?\)=>\{\}$|^function.*?\(.*?\)\{\}$/));
            break;
          }
        }
      }
      result = result && itemResult;
    }

    return result;
  }
  /**
   * 判断对象是否是元素
   * @param target
   * @returns
   * + true 是元素
   * + false 不是元素
   * @example
   * Utils.isDOM(document.querySelector("a"))
   * > true
   */
  isDOM(target: any): boolean {
    return target instanceof Node;
  }
  /**
   * 判断对象是否不为空
   * @returns {boolean}
   * + true 不为空
   * + false 为空
   * @example
   * Utils.isNotNull("123");
   * > true
   */
  isNotNull<T>(value: T | null | undefined): value is T;
  isNotNull(...args: any[]): boolean;
  isNotNull(...args: any[]): boolean {
    const UtilsContext = this;
    return !UtilsContext.isNull.apply(this, args);
  }
  /**
   * 深拷贝
   * @param obj 对象
   */
  deepClone<T extends object | undefined | null>(obj?: T): T;
  deepClone<T extends object | undefined | null>(obj?: T) {
    const UtilsContext = this;
    if (obj === void 0) return void 0;
    if (obj === null) return null;
    const clone = obj instanceof Array ? [] : {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "object") {
        Reflect.set(clone, key, UtilsContext.deepClone(value));
      } else {
        Reflect.set(clone, key, value);
      }
    }
    return clone;
  }
  /**
   * 覆盖对象中的函数this指向
   * @param target 需要覆盖的对象
   * @param [objectThis] 覆盖的this指向，如果为传入，则默认为对象本身
   */
  coverObjectFunctionThis(target: any, objectThis?: any) {
    if (typeof target !== "object" || target === null) {
      throw new Error("target must be object");
    }
    objectThis = objectThis || target;
    Object.keys(target).forEach((key) => {
      if (typeof target[key] === "function") {
        target[key] = target[key].bind(objectThis);
      }
    });
  }
  /**
   * 字符串转Object对象，类似'{"test":""}' => {"test":""}
   * @param data
   * @param errorCallBack （可选）错误回调
   * @example
   * Utils.toJSON("{123:123}")
   * > {123:123}
   */
  toJSON<T = any>(data: string | null, errorCallBack?: (error: Error) => void): T;
  toJSON<T = any>(data: string | null, errorCallBack?: (error: Error) => void): T {
    let result: any = {};
    if (typeof data === "object") {
      return data as T;
    }
    TryCatch()
      .config({ log: false })
      .error(() => {
        TryCatch()
          .error(() => {
            try {
              result = new Function(`return ${data}`)();
            } catch (error2: any) {
              if (typeof errorCallBack === "function") {
                errorCallBack(error2);
              }
            }
          })
          .run(() => {
            if (
              data &&
              /^[\],:{}\s]*$/.test(
                data
                  .replace(/\\(?:["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, "]")
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
              )
            ) {
              result = new Function(`return ${data}`)();
            } else {
              if (typeof errorCallBack === "function") {
                errorCallBack(new Error("target is not JSON object"));
              }
            }
          });
      })
      .run(() => {
        data = (data as string).trim();
        result = JSON.parse(data);
      });
    return result as T;
  }
}

const commonUtil = new CommonUtil();

export { commonUtil as CommonUtil };

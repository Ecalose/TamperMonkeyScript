import CryptoJS from "crypto-js";

export const generateSign = function (data: any) {
  const sortedKeys = Object.keys(data).sort();
  const queryStringParts = [];

  for (const key of sortedKeys) {
    let value = data[key];
    // 处理值并转换为字符串
    let strValue;
    if (typeof value === "object" && value !== null) {
      strValue = JSON.stringify(value);
    } else {
      strValue = String(value);
    }

    // 检查是否需要URL编码（包含非ASCII字符）
    if (/[^\u0000-\u007F]/.test(strValue)) {
      // 检查是否有非ASCII字符
      strValue = encodeURIComponent(strValue);
    }

    queryStringParts.push(`${key}=${strValue}`);
  }

  const queryString = queryStringParts.join("&");
  const fixedString = "Uiv#87#SPan.ECsp";
  const signString = queryString + fixedString;

  // 浏览器中的MD5实现
  const md5Hash = CryptoJS.MD5(signString);

  const result = {
    sign: md5Hash,
    ...data,
  };

  return result;
};

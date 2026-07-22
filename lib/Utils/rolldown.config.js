import { defineConfig } from "rolldown";
import fs from "fs";
import path from "path";

// 模块名
const moduleName = "Utils";
// 文件输出目录
const outDir = "./dist";

function copyFolder(src, dest) {
  // 创建目标目录如果不存在
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 读取源目录的内容
  fs.readdir(src, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      // 获取文件信息
      fs.stat(srcPath, (err, stat) => {
        if (err) throw err;

        // 如果是文件，则复制
        if (stat.isFile()) {
          fs.copyFile(srcPath, destPath, (err) => {
            if (err) throw err;
          });
        } else if (stat.isDirectory()) {
          // 如果是目录，则递归复制
          copyFolder(srcPath, destPath);
        }
      });
    });
  });
}
function customTypesPlugin() {
  return {
    name: "custom-types",
    buildEnd() {
      copyFolder("./src/types", "./dist/types/src/types");
    },
  };
}

/**
 * @type {import('rolldown').OutputOptions[]}
 */
const outputOptions = [
  {
    file: `${outDir}/index.esm.js`, // package.json 中 "module": "dist/index.esm.js"
    format: "esm", // es module 形式的包， 用来import 导入， 可以tree shaking
    sourcemap: true,
  },
  {
    file: `${outDir}/index.cjs.js`, // package.json 中 "main": "dist/index.cjs.js",
    format: "cjs", // commonjs 形式的包， require 导入
    sourcemap: true,
  },
  {
    file: `${outDir}/index.umd.js`,
    name: moduleName, // 模块名
    format: "umd", // umd 兼容形式的包， 可以直接应用于网页 script
    sourcemap: true,
  },
  // {
  //   file: `${outDir}/index.amd.js`,
  //   format: "amd", // amd 兼容形式的包， 适用于浏览器环境中使用 AMD 加载器加载模块
  //   sourcemap: true,
  // },
  {
    file: `${outDir}/index.iife.js`,
    name: moduleName, // 模块名
    format: "iife", // iife 兼容形式的包， 将模块包裹在一个立即执行的函数中。适用于直接在浏览器中使用
    sourcemap: true,
  },
  // {
  //   file: `${outDir}/index.system.js`,
  //   name: moduleName, // 模块名
  //   format: "system", // system 兼容形式的包， 可以在浏览器和 Node.js 环境下加载
  //   sourcemap: true,
  // },
];

// 添加压缩版本
outputOptions.forEach((outputItem) => {
  outputOptions.push({
    ...outputItem,
    file: outputItem.file.trim().replace(/.js$/, ".min.js"),
    minify: true,
  });
});

/** @type {import('rolldown').RolldownOptions} */
const config = {
  input: "./index.ts", // 源文件入口
  output: outputOptions,
  plugins: [customTypesPlugin()],
};

export default defineConfig(config);

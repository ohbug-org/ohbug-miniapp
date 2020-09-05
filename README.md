# `@ohbug/miniapp`

[![npm](https://img.shields.io/npm/v/@ohbug/miniapp.svg?style=flat-square)](https://www.npmjs.com/package/@ohbug/miniapp)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@ohbug/miniapp?style=flat-square)](https://bundlephobia.com/result?p=@ohbug/miniapp)
[![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Feature

- 支持 微信小程序、支付宝小程序、字节跳动小程序、QQ 小程序
- 支持 [Taro](https://taro.aotu.io/) 等第三方小程序框架
- 监听小程序 `onError`、`onUnhandledRejection`、`onPageNotFound`、`onMemoryWarning` API
- 收集小程序的设备、系统、应用信息
- 收集异常发生时的路由栈

## Usage

1. 安装依赖
```shell
yarn add @ohbug/miniapp
```
或直接下载 [releases](https://github.com/ohbug-org/ohbug-miniapp/releases)

2. 「微信开发者工具 - 工具 - 构建 npm」，更多内容可查询[文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

3. 初始化
```javascript
// 新建文件 ohbug.js
// 引入 SDK
import Ohbug from "@ohbug/miniapp";
// 或者直接引入js
import Ohbug from "./ohbug-miniapp.esm.prod.js"
// or
const Ohbug = require("./ohbug-miniapp.cjs.prod.js")

const client = Ohbug.init({ apiKey: "YOUR_API_KEY" });
export default client;
```

```javascript
// app.js
import './ohbug';

App({
  onLaunch() {
    // ...
  }
})
```

## Note

- 请开启「微信开发者工具 - 设置 - 项目设置 - 增强编译」
- 请在小程序管理后台配置 request 合法域名 `https://api.ohbug.net/report`
- 目前字节跳动小程序不支持使用 npm 形式接入 请直接引入 js 文件

## License

This project is licensed under the terms of the [Apache License 2.0](https://github.com/ohbug-org/ohbug-miniapp/blob/master/LICENSE).

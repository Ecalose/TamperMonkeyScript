# 网盘链接识别

> 注：并非所有功能都是默认开启，有些功能需要到油猴菜单中打开【设置】，手动开启功能。
> 当网页存在 CSP 策略时，会导致 Web Worker 执行失败，从而导致 CPU 占用率高，例如：`bilibili`、`Youtube`，请自行添加自定义规则将网站匹配模式修改为`Menu`或者将网站添加到脚本管理器的黑名单。

一个用于`识别`网页中的网盘链接的油猴脚本。

## 📦 特性

- [x] 内置多种网盘识别规则
- [x] 自定义弹窗的动画、拖拽、遮罩层点击事件
- [x] 自定义悬浮按钮的大小、透明度、背景轮播间隔时间、吸附边缘
- [x] 自定义小窗的宽高
- [x] 自定义匹配模式是自定执行的`观察者模式`还是手动执行的`菜单模式`
- [x] 自动填入识别到的网盘的访问码
- [x] 自定义匹配页面文本类型
- [x] 支持匹配网页 url、ShadowRoot、Input、TextArea 的内容
- [x] 支持自定义匹配间隔时间（防止间隔时间过短，导致 CPU 占用率高）
- [x] 支持点击网盘图标自动定位到链接所在位置（只有是可见的才能成功定位）
- [x] 支持保存匹配记录，可在历史匹配记录中查看
- [x] 等其它功能...

## 🚩 安装

> 注：建议使用浏览器扩展执行本脚本。
>
> - 浏览器扩展的功能和 Api 更完整
> - 非浏览器扩展使用脚本会遇到更多使用上的问题（跨域问题、脚本冲突等）

- [x] 浏览器扩展
  - [x] Chrome/Edge [TamperMonkey](https://microsoftedge.microsoft.com/addons/detail/%E7%AF%A1%E6%94%B9%E7%8C%B4/iikmkjmpaadaobahmlepeloendndfphd?hl=zh-CN)、[ViolentMonkey](https://microsoftedge.microsoft.com/addons/detail/%E6%9A%B4%E5%8A%9B%E7%8C%B4/eeagobfjdenkkddmbclomhiblgggliao?hl=zh-CN)、[ScriptCat](https://microsoftedge.microsoft.com/addons/detail/%E8%84%9A%E6%9C%AC%E7%8C%AB/liilgpjgabokdklappibcjfablkpcekh?hl=zh-CN)
  - [x] Firefox [TamperMonkey](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/)、[ViolentMonkey](https://addons.mozilla.org/zh-CN/firefox/addon/violentmonkey/)、[ScriptCat](https://addons.mozilla.org/zh-CN/firefox/addon/scriptcat/)
  - [x] Safari [Stay](https://apps.apple.com/cn/app/stay-for-safari-%E6%B5%8F%E8%A7%88%E5%99%A8%E4%BC%B4%E4%BE%A3/id1591620171)

## 🌈 使用方式

识别出链接时，页面侧边栏会出现一个悬浮按钮。

| 功能             | 设备 | 操作                                      | 备注                                       |
| ---------------- | :--: | ----------------------------------------- | ------------------------------------------ |
| 显示链接界面     |  PC  | `点击`                                    |                                            |
|                  | 手机 | `点击`                                    |                                            |
| 显示设置界面     |  PC  | `双击/右击`后点击设置                     |                                            |
|                  | 手机 | `双击`                                    |                                            |
| 显示历史匹配记录 |  PC  | 油猴菜单中打开/悬浮按钮右击菜单中选择打开 |                                            |
|                  | 手机 | 油猴菜单中打开                            |                                            |
| 显示访问码规则   |  PC  | 油猴菜单中打开/悬浮按钮右击菜单中选择打开 |                                            |
|                  | 手机 | 油猴菜单中打开                            |                                            |
| 显示网站规则     |  PC  | 油猴菜单中打开/悬浮按钮右击菜单中选择打开 |                                            |
|                  | 手机 | 油猴菜单中打开                            |                                            |
| 显示主动识别文本 |  PC  | 油猴菜单中打开/悬浮按钮右击菜单中选择打开 |                                            |
|                  | 手机 | 油猴菜单中打开                            |                                            |
| 复制链接         |  PC  | 链接界面/历史匹配记录界面`右击链接`       |                                            |
|                  | 手机 | 链接界面/历史匹配记录界面`长按链接`       |                                            |
| 访问链接         |  PC  | 链接界面/历史匹配记录界面`右击链接`       |                                            |
|                  | 手机 | 链接界面/历史匹配记录界面`长按链接`       |                                            |
| 修改访问码       |  PC  | 链接界面/历史匹配记录界面`右击链接`       | 修改后的访问码不会被新匹配到的访问码所替换 |
|                  | 手机 | 链接界面/历史匹配记录界面`长按链接`       |                                            |

## 📢 部分功能介绍

Toast

- `位置`：设置 Toast 显示的位置，如：顶部、底部、中间
- `同时显示最多数量`：设置 Toast 最多同时显示的数量
- `逆序弹出`：设置 Toast 显示的顺序

弹窗

- `动画`：设置弹窗显示/隐藏的过渡动画
- `点击弹窗遮罩层关闭弹窗`：开启后可以直接点击遮罩层关闭弹窗
- `拖拽窗口`：可以点击标题来移动弹窗窗口
- `限制拖拽距离`：当开启时，弹窗窗口将会限制它的拖拽上下左右的最大值
- `亚克力效果`：给弹窗颜色添加亚克力效果

文件弹窗

- `排序名`：一般是`多文件直链弹窗`的显示的`文件夹`和`文件`的排序，自动记忆选择的排序规则
- `排序规则`：一般是`多文件直链弹窗`的显示的`文件夹`和`文件`的排序，自动记忆选择的排序规则

悬浮按钮

- `大小`：设置悬浮按钮的大小(`15px`~`250px`)
- `透明度`：设置悬浮按钮的透明度(0.1~1)，数值越低悬浮按钮越透明
- `背景轮播时间`：当匹配到多个网盘链接时，会按本值时间进行切换已匹配到的网盘图标
- `背景显示时间`：当匹配到多个网盘链接时，会按照本值设置网盘图标显示的停留时间
- `吸附边缘`：移动悬浮按钮松开后自动吸附在浏览器的边缘
- `z-index`：`z-index`层级，如果值小于等于 0，则使用脚本根据页面最大的`z-index`来动态获取

大/小链接弹窗

- `宽度`：设置小窗宽度(px)
- `高度`：设置小窗最大高度(px)
- `z-index`：链接弹窗的`z-index`层级，如果值小于等于 0，则使用脚本根据页面最大的`z-index`来动态获取

功能

- `匹配模式`：选择 MutationObserver 是网页加载完毕后自动监听识别链接，选择 Menu 是会在油猴注册菜单用于手动点击进行识别
- `行为模式`：当匹配到网盘链接会触发 UI 显示，该选项可选择需要触发的 UI
- `自动输入访问码`：开启后可通过`右击`或`长按`出现的菜单选项`访问链接`，如果存在访问码，将自动填入访问码，目前存在部分网盘未实现自动填入(没找到这个网盘的存在链接的)

匹配设置

- `匹配规则类型`：自行选择【普通文本】规则还是【超文本】规则
- `深入ShadowRoot获取匹配文本`：对 Shadow 内的文本/超文本的内容进行获取
- `匹配剪贴板`：启用后浏览器会申请剪贴板权限用来读取剪贴板内容，并进行网盘链接匹配
- `匹配当前URL`：启用后会优先匹配当前 URL 地址，比如在 xxx 网盘内时
- `匹配input标签的内容`：启用后会对页面上所有的`<input>`标签的内容进行获取
- `匹配textarea标签的内容`：启用后会对页面上所有的`<textarea>`标签的内容进行获取
- `删除中文字符`：在进行文本匹配前，会删除掉所有中文字符
- `删除任何空白字符`：在进行文本匹配前，会删除掉所有空白字符
- `匹配间隔`：匹配文本完毕后的延迟 xxx 秒允许下一次匹配
- `添加元素时进行匹配`：当监听到页面添加元素时才进行匹配文本
- `观察器：childList`：子节点的变动（新增、删除或者更改）
- `观察器：characterData`：节点内容或节点文本的变动
- `观察器：subtree`：是否将观察器应用于该节点的所有后代节点

历史匹配记录

- `保存匹配记录`：将匹配到的链接信息进行本地存储，可点击【油猴菜单-⚙ 历史匹配记录】进行查看
- `合并相同链接`：将合并匹配到的相同链接，并更新它最后一次匹配到的更新时间、网址信息
- `排序规则`：显示出的弹窗的排序规则
- `修复存储记录`：如果【匹配记录】弹窗打不开，可能是存储的数据缺失某些字段，可尝试点击此处进行修复

网盘图标

- `点击定位分享码`：在识别的链接弹窗内，点击网盘小图标可以定位到页面中的包含该分享码的元素中的位置并且页面会滚动至元素
- `选中分享码`：光标选中包含分享码的元素，如果是#text 元素，则选中分享码文字
- `循环定位`：关闭则每个包含分享码的元素只定位一次

分享码

- `相同系数`：例如分享码: aaaaaaaabb，它的相同系数是 0.8，设置相同系数 ≥0.8 时会被排除
- `排除分享码`：启用后会根据【相同系数】排除掉匹配到的分享码

访问码

- `允许查询历史匹配记录`：当访问码为空时，访问码将从历史匹配记录中查询，优先级：页面匹配 < 历史匹配记录 < 网站规则 < 黑名单

快捷键

- `【打开】⚙ 设置`：点击右边按钮来设置快捷键打开`设置`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 历史匹配记录`：点击右边按钮来设置快捷键打开`历史匹配记录`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 访问码规则`：点击右边按钮来设置快捷键打开`自定义访问码规则`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 添加链接识别规则`：点击右边按钮来设置快捷键打开`添加链接识别规则`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 识别规则`：点击右边按钮来设置快捷键打开`识别规则`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 网站规则`：点击右边按钮来设置快捷键打开`网站规则`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 字符映射规则`：点击右边按钮来设置快捷键打开`字符映射规则`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `【打开】⚙ 识别文本`：点击右边按钮来设置快捷键打开`主动识别文本`界面，如果已存在设置的快捷键，再次点击可删除设置的快捷键
- `执行文本匹配`：点击右边按钮来设置快捷键主动进行一次页面内容匹配，如果已存在设置的快捷键，再次点击可删除设置的快捷键

| 网盘                                                                                                                                                                                                  | 新标签页打开 |          单文件解析           |          多文件解析           | Scheme 转发直链 | 提取码间隔前(Text/HTML) | 提取码间隔后(Text/HTML) | 其它功能         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: | :---------------------------: | :---------------------------: | :-------------: | :---------------------: | :---------------------: | ---------------- |
| [![https://favicon.yandex.net/favicon/v2/https://pan.baidu.com/?size=16](https://favicon.yandex.net/favicon/v2/https://pan.baidu.com/?size=16)](https://pan.baidu.com/) 百度网盘                      |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.lanzoux.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.lanzoux.com/?size=16)](https://www.lanzoux.com/) 蓝奏云                  |      √       |               √               |               √               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.ilanzou.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.ilanzou.com/?size=16)](https://www.ilanzou.com/) 蓝奏云优享              |      √       |               √               |               √               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://cloud.189.cn/?size=16](https://favicon.yandex.net/favicon/v2/https://cloud.189.cn/?size=16)](https://cloud.189.cn/) 天翼云                           |      √       |           √(需登录)           |           √(需登录)           |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://yun.139.com/?size=16](https://favicon.yandex.net/favicon/v2/https://yun.139.com/?size=16)](https://yun.139.com/) 中国移动云盘(原:和彩云)             |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.aliyundrive.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.aliyundrive.com/?size=16)](https://www.aliyundrive.com/) 阿里云      |      √       | √(需登录，限制在网盘页面解析) | √(需登录，限制在网盘页面解析) |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.wenshushu.cn/?size=16](https://favicon.yandex.net/favicon/v2/https://www.wenshushu.cn/?size=16)](https://www.wenshushu.cn/) 文叔叔               |      √       |               √               |                               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://cowtransfer.com/?size=16](https://favicon.yandex.net/favicon/v2/https://cowtransfer.com/?size=16)](https://cowtransfer.com/) 奶牛快传                |      √       |               √               |               √               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.123pan.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.123pan.com/?size=16)](https://www.123pan.com/) 123 云盘                   |      √       |    √(文件>100MB 则需登录)     |    √(文件>100MB 则需登录)     |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.weiyun.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.weiyun.com/?size=16)](https://www.weiyun.com/) 腾讯微云                   |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://pan.xunlei.com/?size=16](https://favicon.yandex.net/favicon/v2/https://pan.xunlei.com/?size=16)](https://pan.xunlei.com/) 迅雷网盘                   |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/http://www.115.com/?size=16](https://favicon.yandex.net/favicon/v2/http://www.115.com/?size=16)](http://www.115.com/) 115 网盘                               |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://www.ctfile.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.ctfile.com/?size=16)](https://www.ctfile.com/) 城通网盘                   |      √       |                               |                               |                 |         20/300          |          10/15          | 可自行配置解析站 |
| [![https://favicon.yandex.net/favicon/v2/https://pan.quark.cn/?size=16](https://favicon.yandex.net/favicon/v2/https://pan.quark.cn/?size=16)](https://pan.quark.cn/) 夸克网盘                         |      √       |                               |                               |                 |         20/300          |          10/15          |                  |
| 🚖BT 磁力                                                                                                                                                                                             |      √       |                               |                               |        √        |                         |                         | 支持 Scheme 转发 |
| [![https://favicon.yandex.net/favicon/v2/https://www.jianguoyun.com/?size=16](https://favicon.yandex.net/favicon/v2/https://www.jianguoyun.com/?size=16)](https://www.jianguoyun.com/) 坚果云(需登录) |      √       |               √               |                               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://onedrive.live.com/?size=16](https://favicon.yandex.net/favicon/v2/https://onedrive.live.com/?size=16)](https://onedrive.live.com/) OneDrive          |      √       |                               |                               |        √        |         20/300          |          10/15          |                  |
| [![https://favicon.yandex.net/favicon/v2/https://drive.uc.cn/?size=16](https://favicon.yandex.net/favicon/v2/https://drive.uc.cn/?size=16)](https://drive.uc.cn/) UC 网盘                             |      √       |           √(需登录)           |           √(需登录)           |        √        |         20/300          |          10/15          |                  |

## 🔧 帮助

### 1. Scheme 调用方式

首先开启该设置后，需要在手机上装特定的 app
<https://baiqi.lanzoul.com/b066di6gb>
密码:bzyb

该链接格式为`jumpwsv://go?package={#package#}&activity={#activity#}&intentAction={#intentAction#}&intentData=网盘链接&intentExtra={#intentExtra#}`

|       参数       |                                                值                                                |
| :--------------: | :----------------------------------------------------------------------------------------------: |
|   {#package#}    |                                             App 包名                                             |
|   {#activity#}   |                                       App 的 Activity 入口                                       |
| {#intentAction#} |                  Activity Action Intent 常量，一般是 android.intent.action.VIEW                  |
| {#intentExtra#}  | 可以为空，若使用，则为`{"参数1":"值1","参数2":"值2"}`，注意`&`换成`{-and-}`，`#`换成`{-number-}` |

下面几个是示例 scheme 链接，可以直接复制粘贴到里面去

- 使用 IDM+下载该链接

```text
jumpwsv://go?package=idm.internet.download.manager.plus&activity=idm.internet.download.manager.UrlHandlerDownloader&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

- 使用 IDM+内部浏览器访问该链接

```text
jumpwsv://go?package=idm.internet.download.manager.plus&activity=acr.browser.lightning.activity.BrowserLauncher&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

- 使用 IDM+内部浏览器隐身访问该链接

```text
jumpwsv://go?package=idm.internet.download.manager.plus&activity=acr.browser.lightning.activity.IncognitoActivity&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

- 使用 ADM 下载该链接

```text
jumpwsv://go?package=com.dv.adm&activity=com.dv.get.AEditor&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

- 使用 ADM 内部浏览器访问该链接

```text
jumpwsv://go?package=com.dv.adm&activity=com.dv.get.WebBrow&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

- 使用手机版迅雷下载该链接(可以是 magnet 格式)

```text
jumpwsv://go?package=com.xunlei.downloadprovider
&activity=com.xunlei.downloadprovider.launch.dispatch.mocklink.LinkDLBtFileExplorerActivity&intentAction=android.intent.action.VIEW&intentData={#intentAction#}&intentExtra=
```

### 2. 什么是提取码文本匹配`Text/HTML`-`间隔前`？

网盘链接分为两块，`分享码`和`提取码`，其中，由于网站的网盘链接的多样性，`分享码`和`提取码关键字`之间可能存在很长的干扰的字符串，比如：👇

```text
https://pan.baidu.com/s/xxxxxxxxxx
这个是干扰字符串
提取码：
本贴的隐藏内容
abcd
```

那么这个`这个是干扰字符串`中文就是干扰的字符串，设置间隔长度即为设置`分享码`和`提取码关键字`之间的`最大的`干扰字符串长度。
例如这个就需要设置值`＞8`才能匹配到访问码

`Text`是对应`匹配类型`为`普通文本`
`HTML`是对应`匹配类型`为`超文本`

### 3. 什么是提取码文本匹配`Text/HTML`-`间隔后`？

当匹配提取码关键字时，如`密码`、`提取码`、`访问码`时，它们后面的字母就是访问码，但是有些时候存在干扰字符串，比如：👇

```text
https://pan.baidu.com/s/xxxxxxxxxx
这个是干扰字符串
提取码：
本贴的隐藏内容
abcd
```

那么这个`：\n本贴隐藏内容`中文就是干扰的字符串，设置间隔长度即为设置`提取码关键字`和`提取码`之间的最大干扰字符串长度。
例如这个就需要设置值`＞9`才能匹配到访问码

`Text`是对应`匹配类型`为`普通文本`
`HTML`是对应`匹配类型`为`超文本`

### 4. 为什么在设置中开启`读取剪贴板`且剪贴板中存在网盘链接，但是并没有成功识别？

浏览器 Api 兼容性查看：
[https://caniuse.com/mdn-api_permissions_permission_clipboard-read](https://caniuse.com/mdn-api_permissions_permission_clipboard-read)
[https://caniuse.com/mdn-api_clipboard_readtext](https://caniuse.com/mdn-api_clipboard_readtext)

### 5. 如何配置自定义规则

- 规则定义

[点击查看如何自定义规则](https://github.com/WhiteSevs/TamperMonkeyScript/blob/master/scripts-vite/%E7%BD%91%E7%9B%98%E9%93%BE%E6%8E%A5%E8%AF%86%E5%88%AB/types/NetDiskCustomRule.d.ts)

- 只有分享码的

```js
{
    "key": "test1", // 这是需要识别的网盘的唯一key，如果和脚本里的key重复的话会覆盖，如果用户自定义中存在相同的key，将会合并，即一个key匹配多种网盘链接
    "icon": "", // （可选）用于显示的网盘图标，可以是data:image格式，或者是url图片，如果没有，会是空白图标
    "regexp": { // 匹配规则
        "link_innerText": "www.test.com/file/\\?surl=([0-9a-zA-Z])+", // 当设置中匹配类型为文本/全部，使用该规则
        "link_innerHTML": "www.test.com/file/\\?surl=([0-9a-zA-Z])+", // 当设置中匹配类型为超文本/全部，使用该规则
        "shareCode": "www.test.com/file/\\?surl=([0-9a-zA-Z])+", // 用于提取出shareCode
        "shareCodeNeedRemoveStr": "^www.test.com/file/\\?surl=", // 用于删除提取出的shareCode前面的域名、路径字符串
        "uiLinkShow": "https://www.test.com/file/?surl={#shareCode#}", // 显示出的链接
        "blank": "https://www.test.com/file/?surl={#shareCode#}", // 用于超链接打开
        "copyUrl": "https://www.test.com/file/?surl={#shareCode#}", // 用于复制到剪贴板
    },
    "setting": { // 设置
        "name": "wangpantest1", // 在设置中显示的网盘名
        "enable": true, // 是否启用
        "linkClickMode": {
            "openBlank": {
                enable: true,
                default: true
            }
        } // 是否让识别到的网盘链接改为新标签页打开
    }
}
```

- 存在提取码的

```js
{ // 存在提取码的
    "key": "test2", // 这是需要识别的网盘的唯一key，如果和脚本里的key重复的话会覆盖，如果用户自定义中存在相同的key，将会合并，即一个key匹配多种网盘链接
    "icon": "https://www.test2.com/favicon.ico", // 用于显示的网盘图标，可以是data:image格式，或者是url图片，如果没有，会是空白图标
    "regexp": { // 匹配规则
        "link_innerText": "www.test2.com/file/\\?surl=([0-9a-zA-Z])+[\\s\\S]{0,20}(密码|访问码|提取码)[\\s\\S]{0,10}[0-9a-zA-Z]{4}|)", // 当设置中匹配类型为文本/全部，使用该规则
        "link_innerHTML": "www.test2.com/file/\\?surl=([0-9a-zA-Z])+[\\s\\S]{0,100}(密码|访问码|提取码)[\\s\\S]{0,15}[0-9a-zA-Z]{4}|)", // 当设置中匹配类型为超文本/全部，使用该规则
        "shareCode": "www.test2.com/file/\\?surl=([0-9a-zA-Z])+", // 用于提取出shareCode
        "shareCodeNeedRemoveStr": "^www.test2.com/file/\\?surl=", // 用于删除提取出的shareCode前面的域名、路径字符串
        "checkAccessCode": "(密码|访问码|提取码)[\\s\\S]+", // 用于判断提取码是否存在
        "accessCode": "([0-9a-zA-Z]{4})", // 匹配提取码
        "acceesCodeNotMatch": "^(font|div|xxxx)", // 用于排除肯定不是提取码的关键字
        "uiLinkShow": "https://www.test2.com/file/?surl={#shareCode#} 提取码：{#accessCode#}", // 显示出的链接
        "blank": "https://www.test2.com/file/?surl={#shareCode#}", // 用于超链接打开，提取码会自动复制到剪贴板
        "copyUrl": "链接：https://www.test2.com/file/?surl={#shareCode#}\n密码：{#accessCode#}", // 用于复制到剪贴板

    },
    "setting": { // 设置
        "name": "wangpantest2", // 在设置中显示的网盘名
        "enable": true, // 是否启用
        "linkClickMode": {
            "openBlank": {
                enable: true,
                default: true
            }
        } // 是否让识别到的网盘链接改为新标签页打开
    }
}
```

- 多条规则(这里拿飞猫云示例)

```js
{
    "key": "feimaoyun",
    "icon": "https://www.feimaoyun.com/favicon.ico",
    "regexp": [
        {
            "link_innerText": "feimaoyun.com/s/([0-9a-zA-Z]+)",
            "link_innerHTML": "feimaoyun.com/s/([0-9a-zA-Z]+)",
            "shareCode": "feimaoyun.com/s/([0-9a-zA-Z]+)",
            "shareCodeNeedRemoveStr": "^feimaoyun.com/s/",
            "uiLinkShow": "https://www.feimaoyun.com/s/{#shareCode#}",
            "blank": "https://www.feimaoyun.com/s/{#shareCode#}",
            "copyUrl": "https://www.feimaoyun.com/s/{#shareCode#}"
        },
        {
            "link_innerText": "feimaoyun.com/#/s/([0-9a-zA-Z]+)",
            "link_innerHTML": "feimaoyun.com/#/s/([0-9a-zA-Z]+)",
            "shareCode": "feimaoyun.com/#/s/([0-9a-zA-Z]+)",
            "shareCodeNeedRemoveStr": "^feimaoyun.com/#/s/",
            "uiLinkShow": "https://www.feimaoyun.com/s/{#shareCode#}",
            "blank": "https://www.feimaoyun.com/s/{#shareCode#}",
            "copyUrl": "https://www.feimaoyun.com/s/{#shareCode#}"
        }
    ],
    "setting": {
        "name": "飞猫盘",
        "enable": true,
        "linkClickMode": {
            "openBlank": {
                enable: true,
                default: true
            }
        } // 是否让识别到的网盘链接改为新标签页打开
        "openBlankWithCopyAccessCode": true,
    },
}
```

或者单条规则

```js
{
    "key": "feimaoyun",
    "icon": "https://www.feimaoyun.com/favicon.ico",
    "regexp": {
            "link_innerText": "feimaoyun.com(/#|)/s/([0-9a-zA-Z]+)",
            "link_innerHTML": "feimaoyun.com(/#|)/s/([0-9a-zA-Z]+)",
            "shareCode": "feimaoyun.com(/#|)/s/([0-9a-zA-Z]+)",
            "shareCodeNeedRemoveStr": "^feimaoyun.com(/#|)/s/",
            "uiLinkShow": "https://www.feimaoyun.com/s/{#shareCode#}",
            "blank": "https://www.feimaoyun.com/s/{#shareCode#}",
            "copyUrl": "https://www.feimaoyun.com/s/{#shareCode#}"
        },
    "setting": {
        "name": "飞猫盘",
        "enable": true,
        "linkClickMode": {
            "openBlank": {
                enable: true,
                default: true
            }
        } // 是否让识别到的网盘链接改为新标签页打开
        "openBlankWithCopyAccessCode": true,
    },
}
```

## 🎉 赞赏支持

<img src="https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript/asset/img/wx_zsm.png" alt="微信赞赏" width="250" height="250">
<img src="https://fastly.jsdelivr.net/gh/WhiteSevs/TamperMonkeyScript/asset/img/zfb_skm.png" alt="支付宝赞赏" width="250" height="250">

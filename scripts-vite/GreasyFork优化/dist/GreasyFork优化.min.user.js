// ==UserScript==
// @name               GreasyFork优化
// @name:en-US         GreasyFork Optimization
// @namespace          https://github.com/WhiteSevs/TamperMonkeyScript
// @version            2024.7.19.14
// @author             WhiteSevs
// @description        自动登录账号、快捷寻找自己库被其他脚本引用、更新自己的脚本列表、库、优化图片浏览、美化页面、Markdown复制按钮
// @description:en-US  Automatically log in to the account, quickly find your own library referenced by other scripts, update your own script list, library, optimize image browsing, beautify the page, Markdown copy button
// @license            GPL-3.0-only
// @icon               data:image/png;base64,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
// @supportURL         https://github.com/WhiteSevs/TamperMonkeyScript/issues
// @match              *://greasyfork.org/*
// @require            https://update.greasyfork.org/scripts/494167/1413255/CoverUMD.js
// @require            https://fastly.jsdelivr.net/npm/qmsg@1.2.1/dist/index.umd.js
// @require            https://fastly.jsdelivr.net/npm/@whitesev/utils@1.7.0/dist/index.umd.js
// @require            https://fastly.jsdelivr.net/npm/@whitesev/domutils@1.1.2/dist/index.umd.js
// @require            https://fastly.jsdelivr.net/npm/@whitesev/pops@1.3.0/dist/index.umd.js
// @require            https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js
// @require            https://fastly.jsdelivr.net/npm/i18next@23.12.1/i18next.min.js
// @resource           ViewerCSS  https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css
// @connect            greasyfork.org
// @grant              GM_addStyle
// @grant              GM_deleteValue
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_info
// @grant              GM_registerMenuCommand
// @grant              GM_setValue
// @grant              GM_unregisterMenuCommand
// @grant              GM_xmlhttpRequest
// @grant              unsafeWindow
// @run-at             document-start
// ==/UserScript==

(t=>{function d(n){if(typeof n!="string")throw new TypeError("cssText must be a string");let e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=n,document.head?document.head.appendChild(e):document.body?document.body.appendChild(e):document.documentElement.childNodes.length===0?document.documentElement.appendChild(e):document.documentElement.insertBefore(e,document.documentElement.childNodes[0]),e}if(typeof GM_addStyle=="function"){GM_addStyle(t);return}d(t)})(" .whitesev-hide{display:none}.whitesev-hide-important{display:none!important} ");

(function (f, U, oe, n, ue, xe) {
	'use strict';

	var x=typeof GM_addStyle<"u"?GM_addStyle:void 0,ae=typeof GM_getResourceText<"u"?GM_getResourceText:void 0,H=typeof GM_getValue<"u"?GM_getValue:void 0,re=typeof GM_info<"u"?GM_info:void 0,we=typeof GM_registerMenuCommand<"u"?GM_registerMenuCommand:void 0,ne=typeof GM_setValue<"u"?GM_setValue:void 0,ve=typeof GM_unregisterMenuCommand<"u"?GM_unregisterMenuCommand:void 0,Se=typeof GM_xmlhttpRequest<"u"?GM_xmlhttpRequest:void 0,I=typeof unsafeWindow<"u"?unsafeWindow:void 0,ke=window;const Ce={GreasyFork优化:"GreasyFork优化",请求取消:"请求取消",请求超时:"请求超时",请求异常:"请求异常",通用:"通用",账号:"账号",密码:"密码",语言:"语言","账号/密码":"账号/密码",请输入账号:"请输入账号",请输入密码:"请输入密码",自动登录:"自动登录",自动登录当前保存的账号:"自动登录当前保存的账号","清空账号/密码":"清空账号/密码",点击清空:"点击清空","确定清空账号和密码？":"确定清空账号和密码？","已清空账号/密码":"已清空账号/密码","源代码同步【脚本列表】":"源代码同步【脚本列表】",一键同步:"一键同步",前往用户主页:"前往用户主页",获取当前已登录的用户主页失败:"获取当前已登录的用户主页失败","源代码同步【未上架的脚本】":"源代码同步【未上架的脚本】","源代码同步【库】":"源代码同步【库】",论坛:"论坛",功能:"功能",过滤重复的评论:"过滤重复的评论","过滤掉重复的评论数量(≥2)":"过滤掉重复的评论数量(≥2)","过滤脚本(id)":"过滤脚本(id)","请输入脚本id，每行一个":"请输入脚本id，每行一个","过滤发布的用户(id)":"过滤发布的用户(id)","请输入用户id，每行一个":"请输入用户id，每行一个","过滤回复的用户(id)":"过滤回复的用户(id)",优化:"优化",固定当前语言:"固定当前语言",无:"无","如button、input、textarea":"如button、input、textarea",更直观的查看版本迭代:"更直观的查看版本迭代",美化上传图片按钮:"美化上传图片按钮",放大上传区域:"放大上传区域",优化图片浏览:"优化图片浏览",使用Viewer浏览图片:"使用Viewer浏览图片",覆盖图床图片跳转:"覆盖图床图片跳转","配合上面的【优化图片浏览】更优雅浏览图片":"配合上面的【优化图片浏览】更优雅浏览图片",'需安装Greasyfork Beautify脚本，<a href="https://greasyfork.org/zh-CN/scripts/446849-greasyfork-beautify" target="_blank">🖐点我安装</a>':'需安装Greasyfork Beautify脚本，<a href="https://greasyfork.org/zh-CN/scripts/446849-greasyfork-beautify" target="_blank">🖐点我安装</a>',代码:"代码",添加复制代码按钮:"添加复制代码按钮",更优雅的复制:"更优雅的复制",快捷键:"快捷键","【F】键全屏、【Alt+Shift+F】键宽屏":"【F】键全屏、【Alt+Shift+F】键宽屏",库:"库",脚本列表:"脚本列表","请输入屏蔽规则，每行一个":"请输入屏蔽规则，每行一个",请求admin内容失败:"请求admin内容失败",解析admin的源代码同步表单失败:"解析admin的源代码同步表单失败",源代码同步失败:"源代码同步失败",获取用户信息失败:"获取用户信息失败",获取用户的收藏集失败:"获取用户的收藏集失败","解析Script Sets失败":"解析Script Sets失败","获取收藏集{{setsId}}失败":"获取收藏集{{setsId}}失败","获取表单元素#edit_script_set失败":"获取表单元素#edit_script_set失败",更新收藏集表单请求失败:"更新收藏集表单请求失败",请先在菜单中录入账号:"请先在菜单中录入账号",请先在菜单中录入密码:"请先在菜单中录入密码","获取csrf-token失败":"获取csrf-token失败","正在登录中...":"正在登录中...","登录失败，请在控制台查看原因":"登录失败，请在控制台查看原因","登录成功，1s后自动跳转":"登录成功，1s后自动跳转","登录失败，可能是账号/密码错误，请在控制台查看原因":"登录失败，可能是账号/密码错误，请在控制台查看原因","美化 历史版本 页面":"美化 历史版本 页面",未找到history_versions元素列表:"未找到history_versions元素列表","yyyy年MM月dd日 HH:mm:ss":"yyyy-MM-dd HH:mm:ss","美化 Greasyfork Beautify脚本":"美化 Greasyfork Beautify脚本","❌ 最多同时长传5张图":"❌ 最多同时长传5张图片","❌ 图片：{{name}} 大小：{{size}}":"❌ 图片：{{name}} 大小：{{size}}","已过滤：{{oldCount}}":"已过滤：{{oldCount}}",寻找引用:"寻找引用",获取脚本id失败:"获取脚本id失败",收藏:"收藏",请先登录账号:"请先登录账号",获取用户id失败:"获取用户id失败","获取收藏夹中...":"获取收藏夹中...",收藏集:"收藏集","添加中...":"添加中...","添加失败，{{selector}}元素不存在":"添加失败，{{selector}}元素不存在","未找到{{selector}}元素":"未找到{{selector}}元素",添加失败:"添加失败",添加成功:"添加成功","删除中...":"删除中...",删除成功:"删除成功",添加:"添加",刪除:"刪除","拦截跳转：":"拦截跳转：",今日检查:"今日检查",复制代码:"复制代码","加载文件中...":"加载文件中...",复制成功:"复制成功","✅ 复制成功!":"✅ 复制成功!","当前语言：{{currentLocaleLanguage}}，，3秒后切换至：{{localeLanguage}}":"当前语言：{{currentLocaleLanguage}}，，3秒后切换至：{{localeLanguage}}","导航至：":"导航至：","请先登录账号！":"请先登录账号！","获取信息中，请稍后...":"获取信息中，请稍后...","获取成功，共 {{count}} 个":"获取成功，共 {{count}} 个","评分：":"评分：","语言：":"语言：","版本：":"版本：","更新：":"更新：",同步代码:"同步代码","同步中...":"同步中...",手动:"手动",自动:"自动","同步方式：{{syncMode}}":"同步方式：{{syncMode}}",同步成功:"同步成功",同步失败:"同步失败",该脚本未设置同步信息:"该脚本未设置同步信息","上次重载时间 {{time}}，{{timeout}}秒内拒绝反复重载":"上次重载时间 {{time}}，{{timeout}}秒内拒绝反复重载","名称：":"名称：","进度：":"进度：","未获取到【脚本列表】":"未获取到【脚本列表】","源代码同步成功，3秒后更新下一个":"源代码同步成功，3秒后更新下一个",全部更新失败:"全部更新失败","全部更新完毕<br >成功：{{successNums}}<br >失败：{{failedNums}}<br >总计：{{scriptUrlListLength}}":"全部更新完毕<br >成功：{{successNums}}<br >失败：{{failedNums}}<br >总计：{{scriptUrlListLength}}","⚙ 设置":"⚙ 设置","{{SCRIPT_NAME}}-设置":"{{SCRIPT_NAME}}-设置",美化页面元素:"美化页面元素",美化历史版本页面:"美化历史版本页面","美化Greasyfork Beautify脚本":"美化Greasyfork Beautify脚本",获取表单csrfToken失败:"获取表单csrfToken失败",Toast配置:"Toast配置",Toast位置:"Toast位置",左上角:"左上角",顶部:"顶部",右上角:"右上角",左边:"左边",中间:"中间",右边:"右边",左下角:"左下角",底部:"底部",右下角:"右下角",Toast显示在页面九宫格的位置:"Toast显示在页面九宫格的位置",最多显示的数量:"最多显示的数量",限制Toast显示的数量:"限制Toast显示的数量",逆序弹出:"逆序弹出",修改Toast弹出的顺序:"修改Toast弹出的顺序",该脚本已经在该收藏集中:"该脚本已经在该收藏集中",其它错误:"其它错误",启用:"启用",开启后下面的过滤功能才会生效:"开启后下面的功能才会生效",屏蔽脚本:"屏蔽脚本",点击查看规则:"点击查看规则",过滤:"过滤",代码同步:"代码同步",美化:"美化",修复代码行号显示:"修复代码行号显示",修复代码行数超过1k行号显示不全问题:"修复代码行数超过1k行号显示不全问题","添加【寻找引用】按钮":"添加【寻找引用】按钮","在脚本栏添加按钮，一般用于搜索引用该库的相关脚本":"在脚本栏添加按钮，一般用于搜索引用该库的相关脚本","添加【收藏】按钮":"添加【收藏】按钮","在脚本栏添加按钮，一般用于快捷收藏该脚本/库":"在脚本栏添加按钮，一般用于快捷收藏该脚本/库",修复图片宽度显示问题:"修复图片宽度显示问题",修复图片在移动端宽度超出浏览器宽度问题:"修复图片在移动端宽度超出浏览器宽度问题","添加【今日检查】信息块":"添加【今日检查】信息块","在脚本信息栏添加【今日检查】信息块":"在脚本信息栏添加【今日检查】信息块","给Markdown添加【复制】按钮":"给Markdown添加【复制】按钮","在Markdown内容右上角添加【复制】按钮，点击一键复制Markdown内容":"在Markdown内容右上角添加【复制】按钮，点击一键复制Markdown内容",开启后下面的功能才会生效:"开启后下面的功能才会生效",检测页面加载:"检测页面加载","检测Greasyfork页面是否正常加载，如加载失败则自动刷新页面":"检测Greasyfork页面是否正常加载，如加载失败则自动刷新页面",检测间隔:"检测间隔","设置检测上次刷新页面的间隔时间，当距离上次刷新页面的时间超过设置的值，将不再刷新页面":"设置检测上次刷新页面的间隔时间，当距离上次刷新页面的时间超过设置的值，将不再刷新页面",美化顶部导航栏:"美化顶部导航栏","可能会跟Greasyfork Beautify脚本有冲突":"可能会跟Greasyfork Beautify脚本有冲突",美化脚本列表:"美化脚本列表","双列显示且添加脚本卡片操作项（安装、收藏）":"双列显示且添加脚本卡片操作项（安装、收藏）",操作面板:"操作面板","添加【操作面板】按钮":"添加【操作面板】按钮","在脚本列表页面时为顶部导航栏添加【操作面板】按钮":"在脚本列表页面时为顶部导航栏添加【操作面板】按钮",操作:"操作",安装此脚本:"安装此脚本",脚本:"脚本",历史版本:"历史版本",自定义已读颜色:"自定义已读颜色",在讨论内生效:"在讨论内生效",用户:"用户",控制台:"控制台","迁移【控制台】到顶部导航栏":"迁移【控制台】到顶部导航栏","将【控制台】按钮移动到顶部导航栏，节省空间":"将【控制台】按钮移动到顶部导航栏，节省空间","在版本下面添加【安装】、【查看代码】按钮":"在版本下面添加【安装】、【查看代码】按钮",查看代码:"查看代码",添加快捷操作按钮:"添加快捷操作按钮","在每一行讨论的最后面添加【过滤】按钮，需开启过滤功能才会生效":"在每一行讨论的最后面添加【过滤】按钮，需开启过滤功能才会生效",选择需要过滤的选项:"选择需要过滤的选项","确定{{type}}：{{filterId}}？":"确定{{type}}：{{filterId}}？","该收藏集未包含：{{scriptId}}":"该收藏集未包含：{{scriptId}}",帮助文档:"帮助文档","请输入规则，每行一个":"请输入规则，每行一个",选择过滤的选项:"选择过滤的选项","脚本id：{{text}}":"脚本id：{{text}}","脚本名：{{text}}":"脚本名：{{text}}","作者id：{{text}}":"作者id：{{text}}","作者名：{{text}}":"作者名：{{text}}","作用域：脚本、脚本搜索、用户主页":"作用域：脚本、脚本搜索、用户主页","更新到 {{version}} 版本":"更新到 {{version}} 版本","降级到 {{version}} 版本":"降级到 {{version}} 版本","重新安装 {{version}} 版本":"重新安装 {{version}} 版本","发布的用户id：{{text}}":"发布的用户id：{{text}}"},Ee={GreasyFork优化:"GreasyFork Optimization",请求取消:"http request cancel",请求超时:"http request timeout",请求异常:"http request error",通用:"General",账号:"Account",密码:"Password",语言:"Language","账号/密码":"Account/Password",请输入账号:"Please enter your account number",请输入密码:"Please enter password",自动登录:"Auto Login",自动登录当前保存的账号:"Automatically log in to the currently saved account","清空账号/密码":"Clear account/password",点击清空:"Clear","确定清空账号和密码？":"Are you sure to clear your account and password?","已清空账号/密码":"Account/password cleared","源代码同步【脚本列表】":"Source Code Synchronization [Script List]",一键同步:"Sync All",前往用户主页:"Go to the user's homepage",获取当前已登录的用户主页失败:"Failed to retrieve the currently logged in user's homepage","源代码同步【未上架的脚本】":"Source code synchronization [Script not listed]","源代码同步【库】":"Source code synchronization 【 Library 】",论坛:"Forum",功能:"Function",过滤重复的评论:"Filter duplicate comments","过滤掉重复的评论数量(≥2)":"Filter out duplicate comments (≥ 2)","过滤脚本(id)":"Filter script (id)","请输入脚本id，每行一个":"Please enter the script ID, one per line","过滤发布的用户(id)":"Filter published users (id)","请输入用户id，每行一个":"Please enter the user ID, one per line","过滤回复的用户(id)":"User (ID) who filters replies",优化:"Optimization",固定当前语言:"Fix current language",无:"nothing","如button、input、textarea":"For example button、input、textarea",更直观的查看版本迭代:"More intuitive viewing of version iterations",美化上传图片按钮:"Beautify upload image button",放大上传区域:"Enlarge the upload area",优化图片浏览:"Optimize image browsing",使用Viewer浏览图片:"Using Viewer to browse images",覆盖图床图片跳转:"Overlay bed image jump","配合上面的【优化图片浏览】更优雅浏览图片":"Collaborate with the optimization of image browsing above to browse images more elegantly",'需安装Greasyfork Beautify脚本，<a href="https://greasyfork.org/zh-CN/scripts/446849-greasyfork-beautify" target="_blank">🖐点我安装</a>':'Greasyfork Beauty script needs to be installed，<a href="https://greasyfork.org/zh-CN/scripts/446849-greasyfork-beautify" target="_blank">🖐 Click me to install</a>',代码:"Code",添加复制代码按钮:"Add Copy Code Button",更优雅的复制:"More elegant replication",快捷键:"Shortcut keys","【F】键全屏、【Alt+Shift+F】键宽屏":"【F】 Key full screen, [Alt+Shift+F] key wide screen",库:"Library",脚本列表:"Script List","请输入屏蔽规则，每行一个":"Please enter a blocking rule, one per line",请求admin内容失败:"Request for admin content failed",解析admin的源代码同步表单失败:"Failed to parse the source code of admin and synchronize the form",源代码同步失败:"Source code synchronization failed",获取用户信息失败:"Failed to obtain user information",获取用户的收藏集失败:"Failed to retrieve user's collection","解析Script Sets失败":"Parsing Script Sets failed","获取收藏集{{setsId}}失败":"Failed to retrieve collection {{setsId}}","获取表单元素#edit_script_set失败":"Failed to retrieve form element #edit_script_set",更新收藏集表单请求失败:"Update collection form request failed",请先在菜单中录入账号:"Please enter your account in the menu first",请先在菜单中录入密码:"Please enter your password in the menu first","获取csrf-token失败":"Failed to obtain csrf token","正在登录中...":"Logging in...","登录失败，请在控制台查看原因":"Login failed, please check the reason in the console","登录成功，1s后自动跳转":"Login successful, automatically redirect after 1 second","登录失败，可能是账号/密码错误，请在控制台查看原因":"Login failed, possibly due to incorrect account/password. Please check the reason in the console","美化 历史版本 页面":"Beautify the historical version page",未找到history_versions元素列表:"History_versions element list not found","yyyy年MM月dd日 HH:mm:ss":"yyyy-MM-dd HH:mm:ss","美化 Greasyfork Beautify脚本":"Beautify Greasyfork Beauty Script","❌ 最多同时长传5张图":"❌ Upload up to 5 images simultaneously","❌ 图片：{{name}} 大小：{{size}}":"❌ Image:{{name}} Size:{{size}}","已过滤：{{oldCount}}":"Filtered:{{oldCount}}",寻找引用:"Find references",获取脚本id失败:"Failed to obtain script ID",收藏:"Collection",请先登录账号:"Please log in to your account first",获取用户id失败:"Failed to obtain user ID","获取收藏夹中...":"Get in favorites...",收藏集:"Collection","添加中...":"Adding...","添加失败，{{selector}}元素不存在":"Add failed, {{selector}} element does not exist","未找到{{selector}}元素":"{{selector}} element not found",添加失败:"Add failed",添加成功:"Successfully added","删除中...":"Deleting...",删除成功:"Delete successful",添加:"Add in deletion",刪除:"Delete","拦截跳转：":"Intercept jump:",今日检查:"Today's inspection",复制代码:"Copy Code","加载文件中...":"Loading files...",复制成功:"Copy successful","✅ 复制成功!":"✅ Copy successful!","当前语言：{{currentLocaleLanguage}}，，3秒后切换至：{{localeLanguage}}":"Current language: {{currentLocaleLanguage}}, switch to {{localeLanguage}} in 3 seconds","导航至：":"Navigation to:","请先登录账号！":"Please log in to your account first!","获取信息中，请稍后...":"Obtaining information, please wait...","获取成功，共 {{count}} 个":"Successfully obtained, a total of {{count}}","评分：":"Rating:","语言：":"Language:","版本：":"Version:","更新：":"Update:",同步代码:"Synchronize Code","同步中...":"Synchronizing...",手动:"Manual",自动:"Automatic","同步方式：{{syncMode}}":"Synchronization method: {{syncMode}}",同步成功:"Sync successful",同步失败:"Sync failed",该脚本未设置同步信息:"The script has not set synchronization information","上次重载时间 {{time}}，{{timeout}}秒内拒绝反复重载":"Last reload time {{time}}, rejected repeated reloads within {{timeout}} seconds","名称：":"Name:","进度：":"Progress:","未获取到【脚本列表】":"Unable to obtain [Script List]","源代码同步成功，3秒后更新下一个":"Source code synchronization successful, update next one in 3 seconds",全部更新失败:"All updates failed","全部更新完毕<br >成功：{{successNums}}<br >失败：{{failedNums}}<br >总计：{{scriptUrlListLength}}":"All updates completed<br>Success: {{successNums}}<br>Failure: {{failed Nums}}<br>Total: {{scriptUrlListLength}}","⚙ 设置":"⚙  Setting","{{SCRIPT_NAME}}-设置":"{{SCRIPT_NAME}}-Setting",美化页面元素:"Beautify page elements",美化历史版本页面:"Beautify the historical version page","美化Greasyfork Beautify脚本":"Beautify Greasyfork Beauty Script",获取表单csrfToken失败:"Failed to obtain form csrfToken",Toast配置:"Toast Config",Toast位置:"Toast position",左上角:"Top left",顶部:"Top",右上角:"Top right",左边:"Left",中间:"Center",右边:"Right",左下角:"Bottom left",底部:"Bottom",右下角:"Bottom right",Toast显示在页面九宫格的位置:"Toast is displayed in the nine grid position on the page",最多显示的数量:"Maximum number of displays",限制Toast显示的数量:"Limit the number of Toast displays",逆序弹出:"Reverse pop-up",修改Toast弹出的顺序:"Modify the order in which Toast pops up",该脚本已经在该收藏集中:"The script is already in this collection",其它错误:"Ohter Error",启用:"Enable",开启后下面的过滤功能才会生效:"The following filtering function will only take effect after it is enabled",屏蔽脚本:"Block script",点击查看规则:"Click to view rules",过滤:"Filter",代码同步:"Code synchronization",美化:"Beautify",修复代码行号显示:"Fix code line number display",修复代码行数超过1k行号显示不全问题:"Fix the problem that the code line number display is not complete when the number of lines exceeds 1k","添加【寻找引用】按钮":"Add the button to find references","在脚本栏添加按钮，一般用于搜索引用该库的相关脚本":"Add a button to the script bar, generally used to search for scripts that reference this library","添加【收藏】按钮":"Add the button to collect","在脚本栏添加按钮，一般用于快捷收藏该脚本/库":"Add a button to the script bar, generally used to quickly collect this script / library",修复图片宽度显示问题:" Fix the problem that the picture width display is not complete",修复图片在移动端宽度超出浏览器宽度问题:"Fix the problem that the picture width exceeds the browser width on mobile","添加【今日检查】信息块":"Add the block of information of today's inspection","在脚本信息栏添加【今日检查】信息块":"Add the block of information of today's inspection to the script information bar","给Markdown添加【复制】按钮":"Add the button to copy to Markdown","在Markdown内容右上角添加【复制】按钮，点击一键复制Markdown内容":"Add the button to copy to the top right corner of the Markdown content, click to copy the Markdown content in one click",开启后下面的功能才会生效:"The following functions will only take effect after it is enabled",检测页面加载:"Detect page loading","检测Greasyfork页面是否正常加载，如加载失败则自动刷新页面":"Detect whether the Greasyfork page is loaded normally. If the loading fails, the page will be automatically refreshed",检测间隔:"Detection interval","设置检测上次刷新页面的间隔时间，当距离上次刷新页面的时间超过设置的值，将不再刷新页面":"Set the interval time for detecting the last refresh page. If the time since the last refresh page exceeds the set value, the page will no longer be refreshed",美化顶部导航栏:"Beautify the top navigation bar","可能会跟Greasyfork Beautify脚本有冲突":"Possible conflict with Greasymfork Beautify script",美化脚本列表:"Beautify Script List","双列显示且添加脚本卡片操作项（安装、收藏）":"Double column display and add script card operation items (installation, bookmarking)",操作面板:"Operation Panel","添加【操作面板】按钮":"Add [Operation Panel] button","在脚本列表页面时为顶部导航栏添加【操作面板】按钮":"Add an 'Operation Panel' button to the top navigation bar on the script list page",操作:"Operation",安装此脚本:"Install this script",脚本:"Scripts",历史版本:"Historical version",自定义已读颜色:"Customize read colors",在讨论内生效:"Effective within the discussion",用户:"Users",控制台:"Console","迁移【控制台】到顶部导航栏":"Migration of Console to Top Navigation Bar","将【控制台】按钮移动到顶部导航栏，节省空间":"Move the 'Console' button to the top navigation bar to save space",添加额外的标签按钮:"Add additional label button","在版本下面添加【安装】、【查看代码】按钮":"Add 【 Install 】 and 【 View Code 】 buttons under the version",查看代码:"View Code",添加快捷操作按钮:"Add shortcut operation button","在每一行讨论的最后面添加【过滤】按钮，需开启过滤功能才会生效":"Add a 'Filter' button at the end of each discussion line. The filtering function needs to be enabled for it to take effect",选择需要过滤的选项:"Select the options that need to be filtered","确定{{type}}：{{filterId}}？":"Are you sure {{type}}：{{filterId}}？","该收藏集未包含：{{scriptId}}":"This collection does not include:{{scriptId}}",帮助文档:"Help document","请输入规则，每行一个":"Please enter a rule, one per line",选择过滤的选项:"Select filtering options","脚本id：{{text}}":"Script Id: {{text}}","脚本名：{{text}}":"Script Name: {{text}}","作者id：{{text}}":"Author Id: {{text}}","作者名：{{text}}":"Author Name: {{text}}","作用域：脚本、脚本搜索、用户主页":"Scope: Script, Script Search, User Homepage","更新到 {{version}} 版本":"Update To {{version}} Version","降级到 {{version}} 版本":"Downgrade to {{version}} Version","重新安装 {{version}} 版本":"Reinstall {{version}} Version","发布的用户id：{{text}}":"Published user ID: {{text}}"},P="GM_Panel",Y="data-key",Q="data-default-value",Le=function(){let t=H(P,{})["setting-language"]||"zh-CN";n.init({lng:t,fallbackLng:"zh-CN",resources:{"zh-CN":{translation:{...Ce}},"en-US":{translation:{...Ee}}}});};Le();H(P,{});const Te=n.t("GreasyFork优化"),m=oe.noConflict(),d=U.noConflict(),N=ue,c=new m.Log(re,I.console||ke.console);var pe;const le=((pe=re==null?void 0:re.script)==null?void 0:pe.name)||Te,fe=!1;c.config({debug:fe,logMaxCount:1e3,autoClearConsole:!0,tag:!0});f.config(Object.defineProperties({html:!0,autoClose:!0,showClose:!1},{position:{get(){return p.getValue("qmsg-config-position","bottom")}},maxNums:{get(){return p.getValue("qmsg-config-maxnums",5)}},showReverse:{get(){return p.getValue("qmsg-config-showreverse",!0)}},zIndex:{get(){let e=oe.getMaxZIndex(),t=ue.config.InstanceUtils.getPopsMaxZIndex(e).zIndex;return oe.getMaxValue(e,t)+100}}}));const me=new m.GM_Menu({GM_getValue:H,GM_setValue:ne,GM_registerMenuCommand:we,GM_unregisterMenuCommand:ve}),$=new m.Httpx(Se);$.interceptors.response.use(void 0,e=>(c.error(["拦截器-请求错误",e]),e.type==="onabort"?f.warning(n.t("请求取消")):e.type==="onerror"?f.error(n.t("请求异常")):e.type==="ontimeout"?f.error(n.t("请求超时")):f.error(n.t("其它错误")),e));$.config({logDetails:fe});I.Object.defineProperty,I.Function.prototype.apply,I.Function.prototype.call,I.Element.prototype.appendChild,I.setTimeout;const ce=m.addStyle,ee=function(e,t,r,i,o,a,s,l){return {text:e,type:"button",description:t,buttonIcon:i,buttonIsRightIcon:o,buttonIconIsLoading:a,buttonType:s,buttonText:r,callback(h){typeof l=="function"&&l(h);},afterAddToUListCallBack:void 0}},de=function(e,t,r,i,o,a="",s,l){let u={text:e,type:"input",isNumber:!!s,isPassword:!!l,attributes:{},description:i,getValue(){return p.getValue(t,r)},callback(h,g){p.setValue(t,g);},placeholder:a};return u.attributes&&(u.attributes[Y]=t,u.attributes[Q]=r),u},b=function(e,t,r,i,o){let a={text:e,type:"switch",description:o,attributes:{},getValue(){return !!p.getValue(t,r)},callback(s,l){c.success(`${l?"开启":"关闭"} ${e}`),p.setValue(t,!!l);},afterAddToUListCallBack:void 0};return a.attributes&&(a.attributes[Y]=t,a.attributes[Q]=!!r),a},y={getCodeSearchUrl(e){return "https://greasyfork.org/zh-CN/scripts/code-search?c="+e},getAdminUrl(e){return e+"/admin"},getScriptId(e){var t,r;return (r=(t=e||window.location.pathname)==null?void 0:t.match(/\/scripts\/([\d]+)/i))==null?void 0:r[1]},getUserId(e){var t;return (t=(e||window.location.pathname).match(/\/users\/([\d]+)/i))==null?void 0:t[1]},getScriptName(e){let t=window.location.pathname;e!=null&&(t=new URL(e).pathname),t=decodeURIComponent(t);let r=t.split("/");for(const i of r){let o=i.match(/[\d]+/);if(o&&o.length)return o[1]}},getSwitchLanguageUrl(e="zh-CN"){let t=window.location.origin,r=window.location.pathname.split("/");return r[1]=e,t=t+r.join("/"),t+=window.location.search,window.location.search===""?t+="?locale_override=1":window.location.search.includes("locale_override=1")||(t+="&locale_override=1"),t},async getScriptStats(e){return new Promise(async t=>{let r=await $.get({url:`https://greasyfork.org/scripts/${e}/stats.json`,fetch:!0,onerror(){},ontimeout(){}});if(!r.status){t(null);return}let i=r.data;t(i);})},async getSourceCodeSyncFormData(e){let t=await $.get(`https://greasyfork.org/zh-CN/scripts/${e}/admin`,{fetch:!0});if(c.success(t),!t.status){f.error(n.t("请求admin内容失败"));return}let r=t.data.responseText,o=d.parseHTML(r,!1,!0).querySelector("form.edit_script");if(!o){f.error(n.t("解析admin的源代码同步表单失败"));return}return new FormData(o)},async sourceCodeSync(e,t){let r=await $.post(`https://greasyfork.org/zh-CN/scripts/${e}/sync_update`,{fetch:!0,data:t});if(c.success(r),!r.status){f.error(n.t("源代码同步失败"));return}return r},async getUserInfo(e){let t=await $.get(`https://greasyfork.org/zh-CN/users/${e}.json`,{fetch:!0});if(c.success(t),!t.status){f.error(n.t("获取用户信息失败"));return}let r=m.toJSON(t.data.responseText);return r.scriptList=[],r.scriptLibraryList=[],r.scripts.forEach(i=>{i.code_url.endsWith(".user.js")?r.scriptList.push(i):r.scriptLibraryList.push(i);}),r},async getUserCollection(e){let t=await $.get(`https://greasyfork.org/zh-CN/users/${e}`,{fetch:!0});if(c.info(["获取用户的收藏集",t]),!t.status){f.error(n.t("获取用户的收藏集失败"));return}let r=t.data.responseText,o=d.parseHTML(r,!0,!0).querySelector("#user-script-sets");if(!o){c.error("解析Script Sets失败");return}let a=[];return o.querySelectorAll("li").forEach(s=>{var w;let l=s.querySelector("a:last-child");if(!l)return;let u=l.href;if(u.includes("?fav=1"))return;let h=s.querySelector("a").innerText,g=(w=u.match(/\/sets\/([\d]+)\//))==null?void 0:w[1];a.push({id:g,name:h});}),a},async getUserCollectionInfo(e,t){let r=await $.get(`https://greasyfork.org/zh-CN/users/${e}/sets/${t}/edit`,{fetch:!0});if(!r.status){f.error(n.t("获取收藏集{{setsId}}失败",{setsId:t}));return}let i=r.data.responseText,o=d.parseHTML(i,!0,!0),a=o.querySelector('form[id^="edit_script_set"]');if(!a){f.error(n.t("获取表单元素#edit_script_set失败"));return}let s=new FormData(a),l=o.querySelector('meta[name="csrf-token"]');if(!l){f.error(n.t("获取表单csrfToken失败"));return}if(l.hasAttribute("content")){let u=l.getAttribute("content");u&&s.set("authenticity_token",u);}return s},async updateUserSetsInfo(e,t,r){let i=await $.post(`https://greasyfork.org/zh-CN/users/${e}/sets/${t}`,{fetch:!0,headers:{accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7","accept-language":"zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6","cache-control":"no-cache","content-type":"application/x-www-form-urlencoded",pragma:"no-cache"},fetchInit:{referrerPolicy:"strict-origin-when-cross-origin"},data:r});if(!i.status){f.error(n.t("更新收藏集表单请求失败"));return}let o=i.data.responseText;return d.parseHTML(o,!0,!0)},async switchLanguage(e){let t=await $.get(e,{fetch:!0,headers:{"Upgrade-Insecure-Requests":"1"}});t.status&&c.info(t);}},A={isCode(){var e;return (e=window.location.pathname.split("/"))==null?void 0:e.includes("code")},isCodeStrict(){return window.location.pathname.endsWith("/code")},isVersion(){return window.location.pathname.endsWith("/versions")},isUserHome(){return window.location.pathname.match(/\/.+\/users\/.+/gi)},isScript(){return window.location.pathname.includes("/scripts/")},isScriptList(){return window.location.pathname.endsWith("/scripts")},isScriptLibraryList(){return window.location.pathname.endsWith("/libraries")},isDiscuessions(){return window.location.pathname.endsWith("/discussions")}},v={menu:me,isLogin:!1,initEnv(){let e=this.getUserLinkElement();this.isLogin=!!e;},getUserLinkElement(){return document.querySelector("#nav-user-info span.user-profile-link a")},async updateScript(e){let t=function(r,i=1){return `
			<div style="display: flex;flex-direction: column;align-items: flex-start;">
				<div style="height: 30px;line-height: 30px;">${n.t("名称：")}${r}</div>
				<div style="height: 30px;line-height: 30px;">${n.t("进度：")}${i}/${e.length}</div>
			</div>`};if(m.isNull(e))f.error(n.t("未获取到【脚本列表】"));else {let r=f.loading(t(y.getScriptName(e[0])),{html:!0}),i=0,o=0;for(let a=0;a<e.length;a++){let s=e[a],l=y.getScriptId(s);c.success("更新："+s);let u=y.getScriptName(s);r.setHTML(t(u,a+1));let h=await y.getSourceCodeSyncFormData(l);h?await y.sourceCodeSync(l,h)?(f.success(n.t("源代码同步成功，3秒后更新下一个")),await m.sleep(3e3),i++):(f.error(n.t("源代码同步失败")),o++):(f.error(n.t("源代码同步失败")),o++);}r.close(),i===0?f.error(n.t("全部更新失败")):f.success(n.t("全部更新完毕<br >成功：{{successNums}}<br >失败：{{failedNums}}<br >总计：{{scriptUrlListLength}}",{successNums:i,failedNums:o,scriptUrlListLength:e.length}),{html:!0});}},handleLocalGotoCallBack(){if(p.getValue("goto_updateSettingsAndSynchronize_scriptList")){if(p.deleteValue("goto_updateSettingsAndSynchronize_scriptList"),!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_scriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let e=[];document.querySelectorAll("#user-script-list-section li a.script-link").forEach(t=>{e=e.concat(y.getAdminUrl(t.href));}),v.updateScript(e);}else if(p.getValue("goto_updateSettingsAndSynchronize_unlistedScriptList")){if(p.deleteValue("goto_updateSettingsAndSynchronize_unlistedScriptList"),!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_unlistedScriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let e=[];document.querySelectorAll("#user-unlisted-script-list li a.script-link").forEach(t=>{e=e.concat(y.getAdminUrl(t.href));}),v.updateScript(e);}else if(p.getValue("goto_updateSettingsAndSynchronize_libraryScriptList")){if(p.deleteValue("goto_updateSettingsAndSynchronize_libraryScriptList"),!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_libraryScriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let e=[];document.querySelectorAll("#user-library-script-list li a.script-link").forEach(t=>{e=e.concat(y.getAdminUrl(t.href));}),v.updateScript(e);}}},Z=function(e,t,r,i,o,a){let s=[];typeof i=="function"?s=i():s=i;let l={text:e,type:"select",description:a,attributes:{},getValue(){return p.getValue(t,r)},callback(u,h,g){p.setValue(t,h),typeof o=="function"&&o(u,h,g);},data:s};return l.attributes&&(l.attributes[Y]=t,l.attributes[Q]=r),l},Me={id:"greasy-fork-panel-config-account",title:n.t("通用"),forms:[{text:"",type:"forms",forms:[{text:n.t("Toast配置"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[Z(n.t("Toast位置"),"qmsg-config-position","bottom",[{value:"topleft",text:n.t("左上角")},{value:"top",text:n.t("顶部")},{value:"topright",text:n.t("右上角")},{value:"left",text:n.t("左边")},{value:"center",text:n.t("中间")},{value:"right",text:n.t("右边")},{value:"bottomleft",text:n.t("左下角")},{value:"bottom",text:n.t("底部")},{value:"bottomright",text:n.t("右下角")}],(e,t,r)=>{c.info("设置当前Qmsg弹出位置"+r);},n.t("Toast显示在页面九宫格的位置")),Z(n.t("最多显示的数量"),"qmsg-config-maxnums",3,[{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"}],void 0,n.t("限制Toast显示的数量")),b(n.t("逆序弹出"),"qmsg-config-showreverse",!1,void 0,n.t("修改Toast弹出的顺序"))]}]},Z(n.t("语言"),"setting-language","zh-CN",[{value:"zh-CN",text:"中文"},{value:"en-US",text:"English"}],(e,t,r)=>{c.info("改变语言："+r),n.changeLanguage(t);})]},{text:"",type:"forms",forms:[{text:n.t("账号/密码"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[de(n.t("账号"),"user","",void 0,void 0,n.t("请输入账号")),de(n.t("密码"),"pwd","",void 0,void 0,n.t("请输入密码"),!1,!0)]},{text:"",type:"forms",forms:[b(n.t("自动登录"),"autoLogin",!0,void 0,n.t("自动登录当前保存的账号")),ee(n.t("清空账号/密码"),void 0,n.t("点击清空"),void 0,void 0,!1,"default",e=>{if(confirm(n.t("确定清空账号和密码？"))){p.deleteValue("user"),p.deleteValue("pwd"),f.success(n.t("已清空账号/密码"));let t=e.target.getRootNode();t.querySelector('li[data-key="user"] .pops-panel-input input').value="",t.querySelector('li[data-key="pwd"] .pops-panel-input input').value="";}})]}]},{text:n.t("功能"),type:"deepMenu",forms:[{text:n.t("功能"),type:"forms",forms:[Z(n.t("固定当前语言"),"language-selector-locale","",function(){let e=[{value:"",text:n.t("无")}];return document.querySelectorAll("select#language-selector-locale option").forEach(t=>{let r=t.getAttribute("value");if(r==="help")return;let i=(t.innerText||t.textContent).trim();e.push({value:r,text:i});}),e}()),b(n.t("修复图片宽度显示问题"),"fixImageWidth",!0,void 0,n.t("修复图片在移动端宽度超出浏览器宽度问题")),b(n.t("优化图片浏览"),"optimizeImageBrowsing",!0,void 0,n.t("使用Viewer浏览图片")),b(n.t("覆盖图床图片跳转"),"overlayBedImageClickEvent",!0,void 0,n.t("配合上面的【优化图片浏览】更优雅浏览图片")),b(n.t("添加【操作面板】按钮"),"scripts-addOperationPanelBtnWithNavigator",!0,void 0,n.t("在脚本列表页面时为顶部导航栏添加【操作面板】按钮")),b(n.t("给Markdown添加【复制】按钮"),"addMarkdownCopyButton",!0,void 0,n.t("在Markdown内容右上角添加【复制】按钮，点击一键复制Markdown内容"))]},{text:n.t("检测页面加载"),type:"forms",forms:[b(n.t("启用"),"checkPage",!0,void 0,n.t("检测Greasyfork页面是否正常加载，如加载失败则自动刷新页面")),Z(n.t("检测间隔"),"greasyfork-check-page-timeout",5,(()=>{let e=[];for(let t=0;t<5;t++)e.push({value:t+1,text:t+1+"s"});return e})(),void 0,n.t("设置检测上次刷新页面的间隔时间，当距离上次刷新页面的时间超过设置的值，将不再刷新页面"))]},{text:n.t("代码同步"),type:"forms",forms:[ee(n.t("源代码同步【脚本列表】"),void 0,n.t("一键同步"),void 0,void 0,!1,"primary",e=>{if(!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_scriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let t=[];document.querySelectorAll("#user-script-list-section li a.script-link").forEach(r=>{t=t.concat(y.getAdminUrl(r.href));}),v.updateScript(t);}),ee(n.t("源代码同步【未上架的脚本】"),void 0,n.t("一键同步"),void 0,void 0,!1,"primary",e=>{if(!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_unlistedScriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let t=[];document.querySelectorAll("#user-unlisted-script-list li a.script-link").forEach(r=>{t=t.concat(y.getAdminUrl(r.href));}),v.updateScript(t);}),ee(n.t("源代码同步【库】"),void 0,n.t("一键同步"),void 0,void 0,!1,"primary",e=>{if(!A.isUserHome()){p.setValue("goto_updateSettingsAndSynchronize_libraryScriptList",!0),v.getUserLinkElement()?(f.success(n.t("前往用户主页")),window.location.href=v.getUserLinkElement().href):f.error(n.t("获取当前已登录的用户主页失败"));return}let t=[];document.querySelectorAll("#user-library-script-list li a.script-link").forEach(r=>{t=t.concat(y.getAdminUrl(r.href));}),v.updateScript(t);})]}]},{text:n.t("美化"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[b(n.t("美化页面元素"),"beautifyPage",!0,void 0,n.t("如button、input、textarea")),b(n.t("美化上传图片按钮"),"beautifyUploadImage",!0,void 0,n.t("放大上传区域")),b(n.t("美化顶部导航栏"),"beautifyTopNavigationBar",!0,void 0,n.t("可能会跟Greasyfork Beautify脚本有冲突")),b(n.t("美化Greasyfork Beautify脚本"),"beautifyGreasyforkBeautify",!0,void 0,n.t('需安装Greasyfork Beautify脚本，<a href="https://greasyfork.org/zh-CN/scripts/446849-greasyfork-beautify" target="_blank">🖐点我安装</a>'))]}]}]}]},Ie={init(){p.execMenuOnce("code-repairCodeLineNumber",()=>{this.repairCodeLineNumber();});},repairCodeLineNumber(){c.info("修复代码的行号显示不够问题"),p.execMenuOnce("beautifyGreasyforkBeautify",()=>{x(`
				.code-container pre code .marker{
					padding-left: 6px;
				}	
				`);}),m.waitNode("#script-content div.code-container pre.prettyprint ol").then(e=>{e.childElementCount>=1e3&&(c.success(`当前代码行数${e.childElementCount}行，超过1000行，优化行号显示问题`),x(`
                    pre.prettyprint{
                        padding-left: 26px;
                    }
					`));});}},Ae=`ul.history_versions,\r
ul.history_versions li {\r
	width: 100%;\r
}\r
ul.history_versions li {\r
	display: flex;\r
	flex-direction: column;\r
	margin: 25px 0px;\r
}\r
.diff-controls input[type="radio"]:nth-child(2) {\r
	margin-left: 5px;\r
}\r
.flex-align-item-center {\r
	display: flex;\r
	align-items: center;\r
}\r
.script-tag {\r
	margin-bottom: 8px;\r
}\r
.script-tag-version a {\r
	color: #656d76;\r
	fill: #656d76;\r
	text-decoration: none;\r
	width: fit-content;\r
	width: -moz-fit-content;\r
}\r
.script-tag-version a:hover svg {\r
	color: #00a3f5;\r
	fill: #00a3f5;\r
}\r
.script-tag-version a > span {\r
	margin-left: 0.25rem;\r
}\r
.script-note-box-body {\r
	border-radius: 0.375rem;\r
	border-style: solid;\r
	border-width: max(1px, 0.0625rem);\r
	border-color: #d0d7de;\r
	color: #1f2328;\r
	padding: 16px;\r
	overflow-wrap: anywhere;\r
}\r
.script-note-box-body p {\r
	margin-bottom: unset;\r
}\r
`,X={addBlockCSS(...e){let t=[];if(e.length!==0&&!(e.length===1&&typeof e[0]=="string"&&e[0].trim()===""))return e.forEach(r=>{Array.isArray(r)?t=t.concat(r):t.push(r);}),ce(`${t.join(`,
`)}{display: none !important;}`)},setGMResourceCSS(e){let t=typeof ae=="function"?ae(e.keyName):"";typeof t=="string"&&t?ce(t):X.addLinkNode(e.url);},async addLinkNode(e){let t=document.createElement("link");return t.rel="stylesheet",t.type="text/css",t.href=e,d.ready(()=>{document.head.appendChild(t);}),t},fixUrl(e){return e=e.trim(),e.match(/^http(s|):\/\//i)||(e.startsWith("/")||(e+="/"),e=window.location.origin+e),e}},se={getInstallUrl(e,t,r){return m.isNotNull(r)?r="/"+r:r="",`https://update.greasyfork.org/scripts/${e}/${t}${r}.user.js`},getCodeUrl(e,t){return m.isNull(t)&&(t=""),`https://greasyfork.org/scripts/${e}/code?version=${t}`},getScriptInfoUrl(e){return `https://greasyfork.org/scripts/${e}.json`}},Ue={init(){p.execMenuOnce("beautifyHistoryVersionPage",()=>this.beautifyHistoryVersionPage()),p.execMenuOnce("scripts-versions-addExtraTagButton",()=>{this.addExtraTagButton();});},beautifyHistoryVersionPage(){c.info("美化 历史版本 页面");let e=[];return e.push(x(Ae)),e.push(X.addBlockCSS(".version-number",".version-date",".version-changelog")),d.ready(function(){let t=document.querySelector("ul.history_versions");if(!t){f.error(n.t("未找到history_versions元素列表"));return}Array.from(t.children).forEach(r=>{var g,w;let i=r.querySelector(".version-number a").href,o=r.querySelector(".version-number a").innerText,a=(g=r.querySelector(".version-date"))==null?void 0:g.getAttribute("datetime"),s=((w=r.querySelector(".version-changelog"))==null?void 0:w.innerHTML)||"",l=d.createElement("span",{className:"script-version-date",innerHTML:m.formatTime(a,n.t("yyyy年MM月dd日 HH:mm:ss"))}),u=d.createElement("div",{className:"script-tag",innerHTML:`
                    <div class="script-tag-version">
                        <a href="${i}" class="flex-align-item-center">
                        <svg aria-label="Tag" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                            <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"></path>
                        </svg>
                        <span>${o}</span>
                        </a>
                    </div>`}),h=d.createElement("div",{className:"script-note-box-body",innerHTML:s});r.appendChild(l),r.appendChild(u),r.appendChild(h);});}),e},addExtraTagButton(){c.info("添加额外的标签按钮"),d.ready(()=>{document.querySelectorAll(".script-tag-version").forEach(e=>{var h,g;let t=e.querySelector("a");if(!t)return;let r=new URL(t.href),i=(h=r.pathname.match(/\/scripts\/([\d]+)/))==null?void 0:h[1],o=r.searchParams.get("version"),a=(g=r.pathname.match(/\/scripts\/[\d]+-(.+)/))==null?void 0:g[1],s=se.getInstallUrl(i,o,a),l=se.getCodeUrl(i,o),u=d.createElement("div",{className:"scripts-tag-install",innerHTML:`
						<a class="script-btn-install install-link" data-install-format="js" target="_blank" href="${s}">${n.t("安装此脚本")}</a>
						<a class="script-btn-see-code" target="_blank" href="${l}">${n.t("查看代码")}</a>
						`});d.after(e,u);});});}};let te=[];const he=async function(e){if(c.info("当前脚本id："+e),!v.isLogin){c.error("请先登录账号"),f.error(n.t("请先登录账号"));return}let t=y.getUserId(v.getUserLinkElement().href);if(t==null){c.error("获取用户id失败"),f.error(n.t("获取用户id失败"));return}if(!te.length){let o=f.loading(n.t("获取收藏夹中..."));if(te=await y.getUserCollection(t)||[],o.close(),!te.length)return}let r="";te.forEach(o=>{r+=`
		<li class="user-collect-item" data-id="${o.id}" data-name="${o.name}">
			<div class="user-collect-name">${o.name}</div>
			<div class="user-collect-btn-container">
			<div class="pops-panel-button collect-add-script-id">
				<button type="primary" data-icon="" data-righticon="">
				<span>${n.t("添加")}</span>
				</button>
			</div>
			<div class="pops-panel-button collect-delete-script-id">
				<button type="danger" data-icon="" data-righticon="">
				<span>${n.t("刪除")}</span>
				</button>
			</div>
			</div>
		</li>
		  `;});let i=N.alert({title:{text:n.t("收藏集"),position:"center"},content:{html:!0,text:`<ul>${r}</ul>`},mask:{enable:!0,clickEvent:{toClose:!0}},btn:{ok:{enable:!1}},width:N.isPhone()?"92dvw":"500px",height:"auto",drag:!0,only:!0,style:`
		.pops{
			--content-max-height: 400px;
			max-height: var(--content-max-height);
		}
		.pops[type-value=alert] .pops-alert-content {
			max-height: calc(var(--content-max-height) - var(--container-title-height) - var(--container-bottom-btn-height));
		}
		.user-collect-item{
			-webkit-user-select: none;
			user-select: none;
			padding: 5px 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px dotted #c9c9c9;
		}
		.user-collect-name{

		}
		.user-collect-item:hover{
			
		}
		.user-collect-btn-container{
			margin-left: 10px;
			display: flex;
		}
		`});d.on(i.$shadowRoot,"click",".collect-add-script-id",async function(o){let a=o.target.closest(".user-collect-item"),s=a.dataset.id;a.dataset.name;let l=f.loading(n.t("添加中...")),u=await y.getUserCollectionInfo(t,s);if(!u){l.close();return}let h=m.cloneFormData(u),g=m.cloneFormData(u),w=!1;for(const[T,C]of u.entries())if(T==="scripts-included[]"&&String(C).trim()===String(e).trim()){w=!0;break}else g.append(T,C),h.append(T,C);if(w){f.warning(n.t("该脚本已经在该收藏集中")),l.close();return}h.set("add-script",e.toString()),h.set("script-action","i"),g.append("scripts-included[]",e.toString()),g.set("save","1");let L=new URLSearchParams(h),S=new URLSearchParams(g),E=Array.from(L).map(([T,C])=>`${encodeURIComponent(T)}=${encodeURIComponent(C)}`).join("&"),V=Array.from(S).map(([T,C])=>`${encodeURIComponent(T)}=${encodeURIComponent(C)}`).join("&");c.info(["添加的数据",E]),c.info(["保存的数据",V]);let _=await y.updateUserSetsInfo(t,s,E);if(!_){l.close();return}let k=_.querySelector(".change-script-set");if(!k){f.error(n.t("添加失败，{{selector}}元素不存在",{selector:".change-script-set"})),l.close();return}let M=k.querySelector("section");if(!M){f.error(n.t("添加失败，{{selector}}元素不存在",{selector:"section"})),l.close();return}let q=M.querySelector(".alert");q?N.alert({title:{text:n.t("添加失败"),position:"center"},content:{text:q.innerHTML,html:!0},mask:{enable:!0,clickEvent:{toClose:!0}},style:`
					.pops-alert-content{
						font-style: italic;
						background-color: #ffc;
						border: none;
						border-left: 6px solid #FFEB3B;
						padding: .5em;
					}
					`,drag:!0,dragLimit:!0,width:N.isPhone()?"88vw":"400px",height:N.isPhone()?"50vh":"300px"}):(await y.updateUserSetsInfo(t,s,V),f.success(n.t("添加成功"))),l.close();}),d.on(i.$shadowRoot,"click",".collect-delete-script-id",async function(o){let a=o.target.closest(".user-collect-item"),s=a.dataset.id;a.dataset.name;let l=f.loading(n.t("删除中...")),u=await y.getUserCollectionInfo(t,s);if(!u){l.close();return}let h=new FormData,g=new FormData,w=!1;for(const[k,M]of u.entries()){if(String(k).trim()==="scripts-included[]"&&String(M).trim()===String(e).trim()){w=!0;continue}g.append(k,M),h.append(k,M);}if(!w){f.warning(n.t("该收藏集未包含：{{scriptId}}",{scriptId:e})),l.close();return}h.set("remove-scripts-included[]",e.toString()),h.set("remove-selected-scripts","i"),h.delete("script-action"),g.set("save","1");let L=new URLSearchParams(h),S=new URLSearchParams(g),E=Array.from(L).map(([k,M])=>`${encodeURIComponent(k)}=${encodeURIComponent(M)}`).join("&"),V=Array.from(S).map(([k,M])=>`${encodeURIComponent(k)}=${encodeURIComponent(M)}`).join("&");if(c.info(["删除的数据",E]),c.info(["保存的数据",V]),!await y.updateUserSetsInfo(t,s,E)){l.close();return}await y.updateUserSetsInfo(t,s,V),f.success(n.t("删除成功")),l.close();});},$e={init(){A.isCode()?Ie.init():A.isVersion()&&Ue.init(),A.isCodeStrict()&&(p.execMenuOnce("fullScreenOptimization",()=>{this.fullScreenOptimization();}),p.execMenuOnce("addCopyCodeButton",()=>{this.addCopyCodeButton();})),p.execMenuOnce("addCollectionButton",()=>{this.addCollectionButton();}),p.execMenuOnce("addFindReferenceButton",()=>{this.setFindCodeSearchBtn();}),p.execMenuOnce("scriptHomepageAddedTodaySUpdate",()=>{this.scriptHomepageAddedTodaySUpdate();});},addCollectionButton(){c.info("添加收藏按钮"),m.waitNode("ul#script-links li.current span").then(()=>{let e=d.createElement("li",{innerHTML:`
					<a href="javascript:;">
						<span>${n.t("收藏")}</span>
					</a>`});d.append(document.querySelector("ul#script-links"),e),d.on(e,"click",()=>{let t=window.location.pathname.match(/scripts\/([\d]+)/i);if(!t){c.error([t,window.location.pathname]),f.error(n.t("获取脚本id失败"));return}let r=t[t.length-1];he(r);});});},fullScreenOptimization(){c.info("F11全屏，F键代码全屏"),x(`
        .code-wide-screen{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          min-width: 100%;
          min-height: 100%;
          max-width: 100%;
          max-height: 100%;
          z-index: 10000;
        }
        `);let e=!1;d.keydown(I,function(t){if(t.key.toLowerCase()==="f"){let r=document.querySelector("#script-content div.code-container code");t.altKey&&t.shiftKey?(m.preventEvent(t),r.classList.contains("code-wide-screen")?r.classList.remove("code-wide-screen"):r.classList.add("code-wide-screen")):!t.altKey&&!t.ctrlKey&&!t.shiftKey&&!t.metaKey&&(m.preventEvent(t),e?(m.exitFullScreen(r),e=!1):(m.enterFullScreen(r),e=!0));}},{capture:!0});},setFindCodeSearchBtn(){c.info("设置代码搜索按钮(对于库)"),m.waitNode("ul#script-links li.current span").then(()=>{let e=d.createElement("li",{innerHTML:`
					<a href="javascript:;">
						<span>${n.t("寻找引用")}</span>
					</a>`});d.append(document.querySelector("ul#script-links"),e),d.on(e,"click",async function(){let t=window.location.pathname.match(/scripts\/([\d]+)/i);if(!t){c.error([t,window.location.pathname]),f.error(n.t("获取脚本id失败"));return}let r=t[t.length-1];window.location.href=y.getCodeSearchUrl(`greasyfork.org/scripts/${r}`);});});},async scriptHomepageAddedTodaySUpdate(){if(!document.querySelector("#install-area"))return;c.info("脚本首页新增【今日检查】");let e=await y.getScriptStats(y.getScriptId());if(!e)return;let t=m.toJSON(e.responseText);c.info(["统计信息",t]);let r=t[m.formatTime(void 0,"yyyy-MM-dd")];if(!r){c.error("今日份的统计信息不存在");return}let i=r.update_checks;c.info(["今日统计信息",r]),d.after("dd.script-show-daily-installs",d.createElement("dt",{className:"script-show-daily-update_checks",innerHTML:`<span>${n.t("今日检查")}</span>`})),d.after("dt.script-show-daily-update_checks",d.createElement("dd",{className:"script-show-daily-update_checks",innerHTML:"<span>"+i+"</span>"}));},addCopyCodeButton(){c.info("添加复制代码按钮"),m.waitNode("div#script-content div.code-container").then(e=>{let t=d.createElement("button",{textContent:n.t("复制代码")},{style:"margin-bottom: 1em;"});d.on(t,"click",async function(){let r=f.loading(n.t("加载文件中...")),i=await $.get(`https://greasyfork.org/zh-CN/scripts/${y.getScriptId()}.json`,{fetch:!0,responseType:"json"});if(!i.status){r.close();return}let a=m.toJSON(i.data.responseText).code_url;c.success(["代码地址：",a]);let s=await $.get(a);if(!s.status){r.close();return}r.close(),m.setClip(s.data.responseText),f.success(n.t("复制成功"));}),d.before(e,t);});}},_e=`.sidebarred-main-content {\r
	max-width: unset;\r
	flex: unset;\r
}\r
ol.script-list {\r
	display: flex;\r
	flex-wrap: wrap;\r
	border: none;\r
	gap: 20px;\r
	background: transparent;\r
	box-shadow: none;\r
}\r
ol.script-list .script-description {\r
	overflow-wrap: anywhere;\r
}\r
ol.script-list li {\r
	border: 1px solid rgb(221, 221, 221);\r
	border-radius: 5px;\r
	flex: 1 1 45%;\r
	box-shadow: rgb(221, 221, 221) 0px 0px 5px 2px;\r
}\r
/* 收藏按钮 */\r
.script-collect-btn {\r
	color: #ffffff;\r
	border-color: #409eff;\r
	background-color: #409eff;\r
}\r
/* 评分按钮 */\r
.script-list-rating-score[data-position="right"] {\r
	display: inline-block;\r
	min-width: 1em;\r
	text-align: center;\r
	padding: 0 0.25em;\r
	border: 1px solid #dddddd;\r
	border-radius: 10px;\r
	width: fit-content;\r
}\r
\r
/* 加载圆圈动画 */\r
.install-link.lum-lightbox-loader {\r
	position: relative;\r
	min-width: 4rem;\r
	min-height: 1rem;\r
}\r
.install-link.lum-lightbox-loader::before {\r
	margin-left: 1rem;\r
}\r
.install-link.lum-lightbox-loader::after {\r
	margin-right: 1rem;\r
}\r
.install-link.lum-lightbox-loader::before,\r
.install-link.lum-lightbox-loader::after {\r
	width: 1em;\r
	height: 1em;\r
	margin-top: -0.5em;\r
	border-radius: 1em;\r
	background: hsla(0, 0%, 100%, 0.5);\r
}\r
`,ie={getTampermonkey:()=>{var e;return (e=I.external)==null?void 0:e.Tampermonkey},getViolentmonkey:()=>{var e;return (e=I.external)==null?void 0:e.Violentmonkey},getScriptCat:()=>{var e;return (e=I.external)==null?void 0:e.Scriptcat},getScriptContainerStatus(){var t,r,i;let e={Tampermonkey:!1,Violentmonkey:!1,ScriptCat:!1};return (t=I.external)!=null&&t.Tampermonkey&&(e.Tampermonkey=!0),(r=I.external)!=null&&r.Violentmonkey&&(e.Violentmonkey=!0),(i=I.external)!=null&&i.Scriptcat&&(e.ScriptCat=!0),e},getInstalledVersion(e,t){return new Promise((r,i)=>{const o=this.getTampermonkey();if(o){o.isInstalled(e,t,function(l){l.installed?r(l.version):r(null);});return}const a=this.getViolentmonkey();if(a){a.isInstalled(e,t).then(r);return}const s=this.getScriptCat();if(s){s.isInstalled(e,t,function(l){l.installed?r(l.version):r(null);});return}i(new TypeError("获取脚本容器暴露的external信息失败"));})},compareVersions(e,t){if(e===t)return 0;const r=e.split("."),i=t.split(".");for(let o=0;o<r.length;o++){const a=this.compareVersionPart(r[o],i[o]);if(a!==0)return a}return 0},compareVersionPart(e,t){const r=this.parseVersionPart(e),i=this.parseVersionPart(t);for(let o=0;o<r.length;o++){if(r[o].length>0&&i[o].length===0)return -1;if(r[o].length===0&&i[o].length>0||r[o]>i[o])return 1;if(r[o]<i[o])return -1}return 0},parseVersionPart(e){if(!e)return [0,"",0,""];const t=/([0-9]*)([^0-9]*)([0-9]*)([^0-9]*)/.exec(e);return [t[1]?parseInt(t[1]):0,t[2],t[3]?parseInt(t[3]):0,t[4]]},handleInstallResult(e,t,r){if(t!=null)switch(e.removeAttribute("data-ping-url"),this.compareVersions(t,r)){case-1:e.textContent=e.getAttribute("data-update-label");break;case 1:e.textContent=e.getAttribute("data-downgrade-label");break;case 0:e.textContent=e.getAttribute("data-reinstall-label");break}},async checkForUpdatesJS(e,t){const r=e.getAttribute("data-script-name"),i=e.getAttribute("data-script-namespace"),o=e.getAttribute("data-script-version");try{let a=await this.getInstalledVersion(r,i);return a==null?!1:(this.handleInstallResult(e,a,o),!0)}catch{if(t){await m.sleep(1e3);try{return await this.checkForUpdatesJS(e,!1)}catch{}}return !1}},checkForUpdatesCSS(e){const t=e.getAttribute("data-script-name"),r=e.getAttribute("data-script-namespace");postMessage({type:"style-version-query",name:t,namespace:r,url:location.href},location.origin);}},ge=e=>{let t=e.dataset;const r={scriptId:parseInt(t.scriptId),scriptName:t.scriptName,scriptAuthors:[],scriptDailyInstalls:parseInt(t.scriptDailyInstalls),scriptTotalInstalls:parseInt(t.scriptTotalInstalls),scriptRatingScore:parseFloat(t.scriptRatingScore),scriptCreatedDate:new Date(t.scriptCreatedDate),scriptUpdatedDate:new Date(t.scriptUpdatedDate),scriptType:t.scriptType,scriptVersion:t.scriptVersion,sensitive:t.sensitive==="true",scriptLanguage:t.scriptLanguage,cssAvailableAsJs:t.cssAvailableAsJs==="true",codeUrl:t.codeUrl,scriptDescription:t.scriptDescription,scriptAuthorId:parseInt(t.scriptAuthorId),scriptAuthorName:t.scriptAuthorName};let i=m.toJSON(t.scriptAuthors);if(Object.keys(i).forEach(o=>{let a=i[o];r.scriptAuthors.push({authorId:parseInt(o),authorName:a});}),(r.scriptAuthorName==null||isNaN(r.scriptAuthorId))&&r.scriptAuthors.length&&(r.scriptAuthorName=r.scriptAuthors[0].authorName,r.scriptAuthorId=r.scriptAuthors[0].authorId),r.scriptDescription==null){let o=e.querySelector(".script-description")||e.querySelector(".description");o&&(r.scriptDescription=o.innerText||o.textContent);}return r},ye={init(){p.execMenuOnce("gf-scripts-filter-enable",()=>{j.init();}),p.execMenuOnce("beautifyCenterContent",()=>this.beautifyCenterContent());},beautifyCenterContent(){c.info("美化脚本列表");let e=[];return e.push(x(_e)),U.ready(async()=>{j.getElementList().forEach(a=>{if(a.querySelector(".script-list-operation"))return;let s=ge(a),l=a.querySelector(".inline-script-stats"),u=s.codeUrl,h=U.createElement("dt",{className:"script-list-rating-score",innerHTML:`<span>${n.t("评分")}</span>`}),g=U.createElement("dd",{className:"script-list-rating-score",innerHTML:`<span>${s.scriptRatingScore}</span>`},{"data-position":"right"}),w=a.querySelector("dd.script-list-ratings .good-rating-count"),L=a.querySelector("dd.script-list-ratings .ok-rating-count"),S=a.querySelector("dd.script-list-ratings .bad-rating-count");if(w&&L&&S){let T=parseInt(w.innerText),C=parseInt(L.innerText),B=parseInt(S.innerText),R=T+C+B;R>=10?T/R>=.6?g.classList.add("good-rating-count"):g.classList.add("bad-rating-count"):R==0||T>C+B?g.classList.add("good-rating-count"):g.classList.add("bad-rating-count");}let E=U.createElement("dt",{className:"script-list-version",innerHTML:`<span>${n.t("版本")}</span>`}),V=U.createElement("dd",{className:"script-list-version",innerHTML:`<span>${s.scriptVersion}</span>`},{"data-position":"right"}),_=U.createElement("dt",{className:"script-list-operation",innerHTML:`<span>${n.t("操作")}</span>`}),k=U.createElement("dd",{className:"script-list-operation",innerHTML:`
						<a
							target="_blank"
							class="install-link"
							data-install-format="js"
							data-script-name="${s.scriptName}"
							data-script-namespace=""
							data-script-version="${s.scriptVersion}"
							data-update-label="${n.t("更新到 {{version}} 版本",{version:s.scriptVersion})}"
							data-downgrade-label="${n.t("降级到 {{version}} 版本",{version:s.scriptVersion})}"
							data-reinstall-label="${n.t("重新安装 {{version}} 版本",{version:s.scriptVersion})}"
							href="${u}"></a>
						<button class="script-collect-btn">${n.t("收藏")}</button>
						`},{"data-position":"right",style:"gap:10px;display: flex;flex-wrap: wrap;align-items: center;"}),M=k.querySelector(".script-collect-btn"),q=k.querySelector(".install-link");if(q["data-script-info"]=s,q.classList.add("lum-lightbox-loader"),s.scriptType==="library"&&q.remove(),U.on(M,"click",T=>{m.preventEvent(T),he(s.scriptId);}),p.getValue("gf-scripts-filter-enable")){let T=U.createElement("button",{className:"script-filter-btn",innerHTML:n.t("过滤")}),C="data-filter-key",B="data-filter-value";U.on(T,"click",R=>{m.preventEvent(R);let D=N.alert({title:{text:n.t("选择需要过滤的选项"),position:"center"},content:{text:`
									<button ${C}="scriptId" ${B}="^${s.scriptId}$">${n.t("脚本id：{{text}}",{text:s.scriptId})}</button>
									<button ${C}="scriptName" ${B}="^${m.parseStringToRegExpString(s.scriptName)}$">${n.t("脚本名：{{text}}",{text:s.scriptName})}</button>
									`,html:!0},mask:{enable:!0,clickEvent:{toClose:!0}},width:"350px",height:"300px",drag:!0,dragLimit:!0,style:`
								.pops-alert-content{
									display: flex;
									flex-direction: column;
    								gap: 20px;
								}
								.pops-alert-content button{
									text-wrap: wrap;
									padding: 8px;
									height: auto;
									text-align: left;
								}
								`}),K=D.$shadowRoot.querySelector(".pops-alert-content");s.scriptAuthors.forEach(F=>{let W=U.createElement("button",{innerHTML:n.t("作者id：{{text}}",{text:F.authorId})});W.setAttribute(C,"scriptAuthorId"),W.setAttribute(B,"^"+F.authorId+"$");let J=U.createElement("button",{innerHTML:n.t("作者名：{{text}}",{text:F.authorName})});J.setAttribute(C,"scriptAuthorName"),J.setAttribute(B,"^"+m.parseStringToRegExpString(F.authorName)+"$"),K.appendChild(W),K.appendChild(J);}),U.on(D.$shadowRoot,"click",`button[${C}]`,F=>{m.preventEvent(F);let W=F.target,J=W.getAttribute(C),be=W.getAttribute(B);j.addValue(J,be),D.close(),j.filter(),f.success(n.t("添加成功"));});}),k.appendChild(T);}l.appendChild(h),l.appendChild(g),l.appendChild(E),l.appendChild(V),l.appendChild(_),l.appendChild(k);});let r=Array.from(document.querySelectorAll(".install-link[data-install-format=js]")),i=ie.getScriptContainerStatus(),o=Object.values(i).filter(Boolean);if(!i.Tampermonkey)r.forEach(async a=>{let s=await ie.checkForUpdatesJS(a,!0);a.classList.remove("lum-lightbox-loader"),s||(a.textContent=n.t("安装此脚本"));});else if(o.length)for(let a=0;a<r.length;a++){let s=r[a],l=s["data-script-info"],u=await $.get(se.getScriptInfoUrl(l.scriptId),{fetch:!0});if(!u.status){s.textContent=n.t("安装此脚本");continue}let h=m.toJSON(u.data.responseText);s.setAttribute("data-script-namespace",h.namespace);let g=await ie.checkForUpdatesJS(s,!0);s.classList.remove("lum-lightbox-loader"),g||(s.textContent=n.t("安装此脚本")),await m.sleep(150);}else c.error("未知的脚本容器");}),e}},j={key:"gf-shield-rule",init(){c.info("脚本过滤");let e=new m.LockFunction(()=>{this.filter();},50);d.ready(()=>{m.mutationObserver(document.body,{config:{subtree:!0,childList:!0},callback:()=>{e.run();}}),e.run();});},getElementList(){let e=[];return e=e.concat(Array.from(document.querySelectorAll("ol.script-list li"))),e},filter(){this.getElementList().forEach(e=>{let t=ge(e),r=this.getValue().split(`
`);for(let i=0;i<r.length;i++){let o=r[i],a=o.split("##"),s=a[0],l=a[1];if(s==="scriptRatingScore"){let u=parseFloat(l.slice(1));if(l.startsWith(">")){if(t.scriptRatingScore>u){c.info(["触发脚本过滤规则",[o,t]]),e.remove();break}}else if(l.startsWith("<")&&t.scriptRatingScore<u){c.info(["触发脚本过滤规则",[o,t]]),e.remove();break}}else if(s in t||s==="scriptDescription"){if(typeof l!="string")continue;let u=new RegExp(l,"ig");if(String(t[s]).match(u)){c.info(["触发脚本过滤规则",o,t]),e.remove();break}}}});},setValue(e){p.setValue(this.key,e);},addValue(e,t){let r=this.getValue();if(r.trim()!==""&&(r+=`
`),m.isNull(e))return;e=e.toString().trim();let i=e+"##"+t;r+=i,this.setValue(r);},getValue(){return p.getValue(this.key,"")}},Ne={id:"greasy-fork-panel-config-scripts",title:n.t("脚本"),forms:[{text:"",type:"forms",forms:[{text:n.t("代码"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[b(n.t("添加复制代码按钮"),"addCopyCodeButton",!0,void 0,n.t("更优雅的复制")),b(n.t("快捷键"),"fullScreenOptimization",!0,void 0,n.t("【F】键全屏、【Alt+Shift+F】键宽屏")),b(n.t("修复代码行号显示"),"code-repairCodeLineNumber",!0,void 0,n.t("修复代码行数超过1k行号显示不全问题"))]}]},{text:n.t("历史版本"),type:"deepMenu",forms:[{text:n.t("功能"),type:"forms",forms:[b(n.t("添加额外的标签按钮"),"scripts-versions-addExtraTagButton",!0,void 0,n.t("在版本下面添加【安装】、【查看代码】按钮"))]},{text:n.t("美化"),type:"forms",forms:[b(n.t("美化历史版本页面"),"beautifyHistoryVersionPage",!0,void 0,n.t("更直观的查看版本迭代"))]}]}]},{text:"",type:"forms",forms:[{text:n.t("功能"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[b(n.t("添加【寻找引用】按钮"),"addFindReferenceButton",!0,void 0,n.t("在脚本栏添加按钮，一般用于搜索引用该库的相关脚本")),b(n.t("添加【收藏】按钮"),"addCollectionButton",!0,void 0,n.t("在脚本栏添加按钮，一般用于快捷收藏该脚本/库")),b(n.t("添加【今日检查】信息块"),"scriptHomepageAddedTodaySUpdate",!0,void 0,n.t("在脚本信息栏添加【今日检查】信息块"))]}]},{text:n.t("美化"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[b(n.t("美化脚本列表"),"beautifyCenterContent",!0,void 0,n.t("双列显示且添加脚本卡片操作项（安装、收藏）"))]}]},{text:n.t("过滤"),type:"deepMenu",forms:[{text:`<a target="_blank" href="https://greasyfork.org/zh-CN/scripts/475722-greasyfork%E4%BC%98%E5%8C%96#:~:text=%E8%84%9A%E6%9C%AC%E8%BF%87%E6%BB%A4%E8%A7%84%E5%88%99">${n.t("帮助文档")}</a>`,type:"forms",forms:[b(n.t("启用"),"gf-scripts-filter-enable",!0,void 0,n.t("作用域：脚本、脚本搜索、用户主页")),{type:"own",getLiElementCallBack(e){let t=d.createElement("div",{className:"pops-panel-textarea",innerHTML:`
												<textarea placeholder="${n.t("请输入规则，每行一个")}" style="height:200px;"></textarea>`},{style:"width: 100%;"}),r=t.querySelector("textarea");return r.value=j.getValue(),d.on(r,["input","propertychange"],void 0,m.debounce(function(i){j.setValue(r.value);},200)),e.appendChild(t),e}}]}]}]}]},O={key:"gf-discuessions-filter-rule",$data:{FILTER_SCRIPT_KEY:"greasyfork-discussions-filter-script",FILTER_POST_USER_KEY:"greasyfork-discussions-filter-post-user",FILTER_REPLY_USER_KEY:"greasyfork-discussions-filter-reply-user"},init(){c.info("论坛-过滤"),x(`
        .discussion-list-container {
          --discusstion-repeat-color: #ffa700;
        }
        
        .discussion-list-container a.discussion-title[data-repeat-tip-show]::before {
          content: attr(data-repeat-tip-show);
          color: var(--discusstion-repeat-color);
          border-radius: 5px;
          border: 2px solid var(--discusstion-repeat-color);
          padding: 2px 5px;
          font-weight: 800;
          font-size: 14px;
        }
        `);let e=new m.LockFunction(()=>{this.filter();},50);m.mutationObserver(document.body,{config:{subtree:!0,childList:!0},callback:()=>{e.run();}}),e.run();},getElementList(){let e=[];return e=e.concat(Array.from(document.querySelectorAll(".discussion-list-container"))),e},filter(){this.transformOldRule();const e=new Map;this.getElementList().forEach((t,r)=>{const i=this.parseDiscuessionListContainerInfo(t);let o=this.getValue().split(`
`);if(e.has(i.snippet)&&p.getValue("greasyfork-discussions-filter-duplicate-comments")){let a=e.get(i.snippet).querySelector("a.discussion-title");a.setAttribute("data-repeat-tip-show","true");let s=0;a.hasAttribute("data-repeat-count")&&(s=parseInt(a.getAttribute("data-repeat-count"))),s++,a.setAttribute("data-repeat-count",s.toString()),a.setAttribute("data-repeat-tip-show",n.t("已过滤：{{oldCount}}",{oldCount:s})),c.success([`过滤重复内容：${i.snippet}`,i]),t.remove();return}e.set(i.snippet,t);for(let a=0;a<o.length;a++){let s=o[a],l=s.split("##"),u=l[0],h=l[1];if(u in i){let g=new RegExp(h,"ig");if(i[u]!=null&&String(i[u]).match(g)){c.info(["触发论坛过滤规则",s,i]),t.remove();return}}}});},parseDiscuessionListContainerInfo(e){var r,i,o,a;const t={scriptName:e.querySelector(".discussion-meta-item-script-name").innerText,scriptUrl:(r=e.querySelector(".discussion-meta-item-script-name a"))==null?void 0:r.href,scriptId:y.getScriptId((i=e.querySelector(".discussion-meta-item-script-name a"))==null?void 0:i.href),postUserName:e.querySelector("a.user-link").innerText,postUserHomeUrl:e.querySelector("a.user-link").href,postUserId:y.getUserId(e.querySelector("a.user-link").href),postTimeStamp:new Date(e.querySelector("relative-time").getAttribute("datetime")),snippetUrl:e.querySelector("a.discussion-title").href,snippet:((o=e.querySelector("span.discussion-snippet"))==null?void 0:o.innerText)||"",replyUserName:void 0,replyUserHomeUrl:void 0,replyUserId:void 0,replyTimeStamp:void 0};return e.querySelector(".discussion-meta-item .discussion-meta-item")&&(t.replyUserName=e.querySelector(".discussion-meta-item .discussion-meta-item a.user-link").innerText,t.replyUserHomeUrl=e.querySelector(".discussion-meta-item .discussion-meta-item a.user-link").href,t.replyUserId=y.getUserId(t.replyUserHomeUrl),t.replyTimeStamp=new Date((a=e.querySelector(".discussion-meta-item .discussion-meta-item relative-time"))==null?void 0:a.getAttribute("datetime"))),t},transformOldRule(){if(Date.now()>new Date("2024-8-19").getTime())return;const e="greasyfork-discussions-filter-script",t="greasyfork-discussions-filter-post-user",r="greasyfork-discussions-filter-reply-user",i=p.getValue(e,""),o=p.getValue(t,""),a=p.getValue(r,""),s=i.trim()===""?[]:i.split(`
`),l=o.trim()===""?[]:o.split(`
`),u=a.trim()===""?[]:a.split(`
`);s.forEach(h=>{this.addValue("scriptId",m.parseStringToRegExpString("^"+h+"$"));}),l.forEach(h=>{this.addValue("postUserId",m.parseStringToRegExpString("^"+h+"$"));}),u.forEach(h=>{this.addValue("replyUserId",m.parseStringToRegExpString("^"+h+"$"));}),p.deleteValue(e),p.deleteValue(t),p.deleteValue(r);},setValue(e){p.setValue(this.key,e);},addValue(e,t){let r=this.getValue();if(r.trim()!==""&&(r+=`
`),m.isNull(e))return;e=e.toString().trim();let i=e+"##"+t;r+=i,this.setValue(r);},getValue(){return p.getValue(this.key,"")}},Ve={id:"greasy-fork-panel-config-discussions",title:n.t("论坛"),forms:[{text:"",type:"forms",forms:[{text:n.t("功能"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[{type:"own",attributes:{"data-key":"discussions-readBgColor","data-default-value":"#e5e5e5"},getLiElementCallBack(e){let t="discussions-readBgColor",r=d.createElement("div",{className:"pops-panel-item-left-text",innerHTML:`
											<p class="pops-panel-item-left-main-text">${n.t("自定义已读颜色")}</p>
											<p class="pops-panel-item-left-desc-text">${n.t("在讨论内生效")}</p>
											`}),i=d.createElement("div",{className:"pops-panel-item-right",innerHTML:`
											<input type="color" class="pops-color-choose" />
											`}),o=i.querySelector(".pops-color-choose");o.value=p.getValue(t);let a=d.createElement("style");return d.append(document.head,a),d.on(o,["input","propertychange"],s=>{c.info("选择颜色："+o.value),a.innerHTML=`
												.discussion-read{
													background: ${o.value} !important;
												}
												`,p.setValue(t,o.value);}),e.appendChild(r),e.appendChild(i),e}},b(n.t("添加快捷操作按钮"),"discussions-addShortcutOperationButton",!0,void 0,n.t("在每一行讨论的最后面添加【过滤】按钮，需开启过滤功能才会生效"))]}]},{text:n.t("过滤"),type:"deepMenu",forms:[{text:`<a target="_blank" href="https://greasyfork.org/zh-CN/scripts/475722-greasyfork%E4%BC%98%E5%8C%96#:~:text=%E8%AE%BA%E5%9D%9B%E8%BF%87%E6%BB%A4%E8%A7%84%E5%88%99">${n.t("帮助文档")}</a>`,type:"forms",forms:[b(n.t("启用"),"greasyfork-discussions-filter-enable",!0,void 0,n.t("开启后下面的过滤功能才会生效")),b(n.t("过滤重复的评论"),"greasyfork-discussions-filter-duplicate-comments",!1,void 0,n.t("过滤掉重复的评论数量(≥2)")),{type:"own",getLiElementCallBack(e){let t=d.createElement("div",{className:"pops-panel-textarea",innerHTML:`
										<textarea placeholder="${n.t("请输入规则，每行一个")}" style="height:200px;"></textarea>`},{style:"width: 100%;"}),r=t.querySelector("textarea");return r.value=O.getValue(),d.on(r,["input","propertychange"],void 0,m.debounce(function(i){O.setValue(r.value);},200)),e.appendChild(t),e}}]}]}]}]},ze=`code {\r
	font-family: Menlo, Monaco, Consolas, "Courier New", monospace;\r
	font-size: 0.85em;\r
	color: #000;\r
	background-color: #f0f0f0;\r
	border-radius: 3px;\r
	padding: 0.2em 0;\r
}\r
table {\r
	text-indent: initial;\r
}\r
table {\r
	margin: 10px 0 15px 0;\r
	border-collapse: collapse;\r
	border-spacing: 0;\r
	display: block;\r
	width: 100%;\r
	overflow: auto;\r
	word-break: normal;\r
	word-break: keep-all;\r
}\r
code,\r
pre {\r
	color: #333;\r
	background: 0 0;\r
	font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;\r
	text-align: left;\r
	white-space: pre;\r
	word-spacing: normal;\r
	word-break: normal;\r
	word-wrap: normal;\r
	line-height: 1.4;\r
	-moz-tab-size: 8;\r
	-o-tab-size: 8;\r
	tab-size: 8;\r
	-webkit-hyphens: none;\r
	-moz-hyphens: none;\r
	-ms-hyphens: none;\r
	hyphens: none;\r
}\r
pre {\r
	padding: 0.8em;\r
	overflow: auto;\r
	border-radius: 3px;\r
	background: #f5f5f5;\r
}\r
:not(pre) > code {\r
	padding: 0.1em;\r
	border-radius: 0.3em;\r
	white-space: normal;\r
	background: #f5f5f5;\r
}\r
html body {\r
	font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans,\r
		sans-serif;\r
	font-size: 16px;\r
	line-height: 1.6;\r
	color: #333;\r
	background-color: #fff;\r
	overflow: initial;\r
	box-sizing: border-box;\r
	word-wrap: break-word;\r
}\r
html body > :first-child {\r
	margin-top: 0;\r
}\r
html body h1,\r
html body h2,\r
html body h3,\r
html body h4,\r
html body h5,\r
html body h6 {\r
	line-height: 1.2;\r
	margin-top: 1em;\r
	margin-bottom: 16px;\r
	color: #000;\r
}\r
html body h1 {\r
	font-size: 2.25em;\r
	font-weight: 300;\r
	padding-bottom: 0.3em;\r
}\r
html body h2 {\r
	font-size: 1.75em;\r
	font-weight: 400;\r
	padding-bottom: 0.3em;\r
}\r
html body h3 {\r
	font-size: 1.5em;\r
	font-weight: 500;\r
}\r
html body h4 {\r
	font-size: 1.25em;\r
	font-weight: 600;\r
}\r
html body h5 {\r
	font-size: 1.1em;\r
	font-weight: 600;\r
}\r
html body h6 {\r
	font-size: 1em;\r
	font-weight: 600;\r
}\r
html body h1,\r
html body h2,\r
html body h3,\r
html body h4,\r
html body h5 {\r
	font-weight: 600;\r
}\r
html body h5 {\r
	font-size: 1em;\r
}\r
html body h6 {\r
	color: #5c5c5c;\r
}\r
html body strong {\r
	color: #000;\r
}\r
html body del {\r
	color: #5c5c5c;\r
}\r
html body a:not([href]) {\r
	color: inherit;\r
}\r
html body a {\r
	text-decoration: underline;\r
	text-underline-offset: 0.2rem;\r
}\r
html body a:hover {\r
	color: #00a3f5;\r
}\r
html body img {\r
	max-width: 100%;\r
}\r
html body > p {\r
	margin-top: 0;\r
	margin-bottom: 16px;\r
	word-wrap: break-word;\r
}\r
html body > ol,\r
html body > ul {\r
	margin-bottom: 16px;\r
}\r
html body ol,\r
html body ul {\r
	padding-left: 2em;\r
}\r
html body ol.no-list,\r
html body ul.no-list {\r
	padding: 0;\r
	list-style-type: none;\r
}\r
html body ol ol,\r
html body ol ul,\r
html body ul ol,\r
html body ul ul {\r
	margin-top: 0;\r
	margin-bottom: 0;\r
}\r
html body li {\r
	margin-bottom: 0;\r
}\r
html body li.task-list-item {\r
	list-style: none;\r
}\r
html body li > p {\r
	margin-top: 0;\r
	margin-bottom: 0;\r
}\r
html body .task-list-item-checkbox {\r
	margin: 0 0.2em 0.25em -1.8em;\r
	vertical-align: middle;\r
}\r
html body .task-list-item-checkbox:hover {\r
	cursor: pointer;\r
}\r
html body blockquote {\r
	margin: 16px 0;\r
	font-size: inherit;\r
	padding: 0 15px;\r
	color: #5c5c5c;\r
	background-color: #f0f0f0;\r
	border-left: 4px solid #d6d6d6 !important;\r
}\r
html body blockquote > :first-child {\r
	margin-top: 0;\r
}\r
html body blockquote > :last-child {\r
	margin-bottom: 0;\r
}\r
html body hr {\r
	height: 4px;\r
	margin: 32px 0;\r
	background-color: #d6d6d6;\r
	border: 0 none;\r
}\r
html body table {\r
	margin: 10px 0 15px 0;\r
	border-collapse: collapse;\r
	border-spacing: 0;\r
	display: block;\r
	width: 100%;\r
	overflow: auto;\r
	word-break: normal;\r
	word-break: keep-all;\r
}\r
html body table th {\r
	font-weight: 700;\r
	color: #000;\r
}\r
html body table td,\r
html body table th {\r
	border: 1px solid #d6d6d6;\r
	padding: 6px 13px;\r
}\r
html body dl {\r
	padding: 0;\r
}\r
html body dl dt {\r
	padding: 0;\r
	margin-top: 16px;\r
	font-size: 1em;\r
	font-style: italic;\r
	font-weight: 700;\r
}\r
html body dl dd {\r
	padding: 0 16px;\r
	margin-bottom: 16px;\r
}\r
html body code {\r
	font-family: Menlo, Monaco, Consolas, "Courier New", monospace;\r
	font-size: 0.85em;\r
	color: #000;\r
	background-color: #f0f0f0;\r
	border-radius: 3px;\r
	padding: 0.2em 0;\r
}\r
html body code::after,\r
html body code::before {\r
	letter-spacing: -0.2em;\r
	content: "\\00a0";\r
}\r
html body pre > code {\r
	padding: 0;\r
	margin: 0;\r
	word-break: normal;\r
	white-space: pre;\r
	background: 0 0;\r
	border: 0;\r
}\r
html body .highlight {\r
	margin-bottom: 16px;\r
}\r
html body .highlight pre,\r
html body pre {\r
	padding: 1em;\r
	overflow: auto;\r
	line-height: 1.45;\r
	border: #d6d6d6;\r
	border-radius: 3px;\r
}\r
html body .highlight pre {\r
	margin-bottom: 0;\r
	word-break: normal;\r
}\r
html body pre code,\r
html body pre tt {\r
	display: inline;\r
	max-width: initial;\r
	padding: 0;\r
	margin: 0;\r
	overflow: initial;\r
	line-height: inherit;\r
	word-wrap: normal;\r
	background-color: transparent;\r
	border: 0;\r
}\r
html body pre code:after,\r
html body pre code:before,\r
html body pre tt:after,\r
html body pre tt:before {\r
	content: normal;\r
}\r
html body blockquote,\r
html body dl,\r
html body ol,\r
html body p,\r
html body pre,\r
html body ul {\r
	margin-top: 0;\r
	margin-bottom: 16px;\r
}\r
html body kbd {\r
	color: #000;\r
	border: 1px solid #d6d6d6;\r
	border-bottom: 2px solid #c7c7c7;\r
	padding: 2px 4px;\r
	background-color: #f0f0f0;\r
	border-radius: 3px;\r
}\r
@media print {\r
	html body {\r
		background-color: #fff;\r
	}\r
	html body h1,\r
	html body h2,\r
	html body h3,\r
	html body h4,\r
	html body h5,\r
	html body h6 {\r
		color: #000;\r
		page-break-after: avoid;\r
	}\r
	html body blockquote {\r
		color: #5c5c5c;\r
	}\r
	html body pre {\r
		page-break-inside: avoid;\r
	}\r
	html body table {\r
		display: table;\r
	}\r
	html body img {\r
		display: block;\r
		max-width: 100%;\r
		max-height: 100%;\r
	}\r
	html body code,\r
	html body pre {\r
		word-wrap: break-word;\r
		white-space: pre;\r
	}\r
}\r
/* 强制换行 */\r
code {\r
	text-wrap: wrap !important;\r
}\r
\r
.scrollbar-style::-webkit-scrollbar {\r
	width: 8px;\r
}\r
.scrollbar-style::-webkit-scrollbar-track {\r
	border-radius: 10px;\r
	background-color: transparent;\r
}\r
.scrollbar-style::-webkit-scrollbar-thumb {\r
	border-radius: 5px;\r
	background-color: rgba(150, 150, 150, 0.66);\r
	border: 4px solid rgba(150, 150, 150, 0.66);\r
	background-clip: content-box;\r
}\r
`,Be=`/* 美化按钮 */\r
input[type="submit"],\r
button {\r
	display: inline-flex;\r
	justify-content: center;\r
	align-items: center;\r
	line-height: 1;\r
	height: 32px;\r
	white-space: nowrap;\r
	cursor: pointer;\r
	/* color: #606266; */\r
	text-align: center;\r
	box-sizing: border-box;\r
	outline: none;\r
	transition: 0.1s;\r
	font-weight: 500;\r
	user-select: none;\r
	vertical-align: middle;\r
	-webkit-appearance: none;\r
	background-color: #ffffff;\r
	border: 1px solid #dcdfe6;\r
	border-color: #dcdfe6;\r
	padding: 8px 15px;\r
	font-size: 14px;\r
	border-radius: 4px;\r
}\r
\r
input[type="submit"]:hover,\r
input[type="submit"]:focus,\r
button:hover,\r
button:focus {\r
	color: #409eff;\r
	border-color: #c6e2ff;\r
	background-color: #ecf5ff;\r
	outline: none;\r
}\r
\r
input[type="url"] {\r
	position: relative;\r
	font-size: 14px;\r
	display: inline-flex;\r
	line-height: 32px;\r
	box-sizing: border-box;\r
	vertical-align: middle;\r
	-webkit-appearance: none;\r
	/* color: #606266; */\r
	padding: 0;\r
	outline: none;\r
	border: none;\r
	background: none;\r
	flex-grow: 1;\r
	align-items: center;\r
	justify-content: center;\r
	padding: 1px 11px;\r
	background-color: #ffffff;\r
	background-image: none;\r
	border-radius: 4px;\r
	cursor: text;\r
	transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\r
	transform: translateZ(0);\r
	box-shadow: 0 0 0 1px #dcdfe6 inset;\r
\r
	width: 100%;\r
	width: -moz-available;\r
	width: -webkit-fill-available;\r
	width: fill-available;\r
}\r
\r
input[type="url"]::placeholder {\r
	color: #a8abb2;\r
}\r
\r
input[type="url"]:hover {\r
	box-shadow: 0 0 0 1px #c0c4cc inset;\r
}\r
\r
input[type="url"]:focus {\r
	box-shadow: 0 0 0 1px #409eff inset;\r
}\r
`,qe=`label.radio-label {\r
	font-weight: 500;\r
	position: relative;\r
	cursor: pointer;\r
	display: inline-flex;\r
	align-items: center;\r
	white-space: normal;\r
	outline: none;\r
	font-size: 14px;\r
	user-select: none;\r
	margin-right: 32px;\r
	height: 32px;\r
	padding: 4px;\r
	border-radius: 4px;\r
	box-sizing: border-box;\r
}\r
label:has(input[type="radio"]:checked),\r
label:has(input[type="radio"]:checked) a {\r
	color: #409eff;\r
}\r
label.radio-label input[type="radio"] {\r
	margin-right: 4px;\r
	width: 14px;\r
	height: 14px;\r
}\r
label.radio-label input[type="radio"]:checked {\r
	-webkit-appearance: none;\r
	-moz-appearance: none;\r
	appearance: none;\r
	border-radius: 50%;\r
	width: 14px;\r
	height: 14px;\r
	outline: none;\r
	border: 4px solid #409eff;\r
	cursor: pointer;\r
}\r
label.radio-label input[type="radio"]:checked + span {\r
	color: #409eff;\r
}\r
`,Re=`textarea {\r
	position: relative;\r
	display: inline-block;\r
	width: 100%;\r
	vertical-align: bottom;\r
	font-size: 14px;\r
	position: relative;\r
	display: block;\r
	resize: vertical;\r
	padding: 5px 11px;\r
	line-height: 1.5;\r
	box-sizing: border-box;\r
	width: 100%;\r
	font-size: inherit;\r
	font-family: inherit;\r
	/* color: #606266; */\r
	background-color: #ffffff;\r
	background-image: none;\r
	-webkit-appearance: none;\r
	box-shadow: 0 0 0 1px #dcdfe6 inset;\r
	border-radius: 4px;\r
	transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);\r
	border: none;\r
}\r
textarea:focus {\r
	outline: none;\r
	box-shadow: 0 0 0 1px #409eff inset;\r
}\r
`,De=`/* 隐藏 添加： */\r
label[for="discussion_comments_attributes_0_attachments"],\r
label[for="comment_attachments"] {\r
	display: none;\r
}\r
input[type="file"] {\r
	width: 100%;\r
	font-size: 20px;\r
	background: #e2e2e2;\r
	padding: 40px 0px;\r
	border-radius: 10px;\r
	text-align-last: center;\r
}\r
`,Pe=`#main-header {\r
	background-color: #670000 !important;\r
	background-image: linear-gradient(#670000, #990000) !important;\r
}\r
#site-nav-vue {\r
	flex-wrap: wrap;\r
	justify-content: flex-end;\r
}\r
.open-sidebar {\r
	border-width: 1px;\r
	border-radius: 3px;\r
	margin-right: 0;\r
}\r
input.search-submit {\r
	transform: translateY(-5%) !important;\r
	margin-left: 10px;\r
}\r
#script-content code {\r
	word-wrap: break-word;\r
}\r
.code-container ::selection {\r
	background-color: #3d4556 !important;\r
}\r
`,Fe=`#language-selector {\r
	display: none;\r
}\r
@media screen and (min-width: 600px) {\r
	body {\r
		--header-height: 50px;\r
		--el-gap: 20px;\r
	}\r
\r
	header#main-header {\r
		height: var(--header-height);\r
		position: fixed;\r
		top: 0;\r
		width: 100%;\r
		z-index: 55555;\r
		padding: unset;\r
		display: flex;\r
		justify-content: space-around;\r
	}\r
\r
	header#main-header + div {\r
		margin-top: calc(var(--header-height) + 35px);\r
	}\r
\r
	header#main-header .width-constraint {\r
		display: flex;\r
		align-items: center;\r
		gap: var(--el-gap);\r
		padding: unset;\r
		margin: unset;\r
		max-width: unset;\r
	}\r
\r
	header#main-header a {\r
		text-decoration: none;\r
		text-wrap: nowrap;\r
	}\r
\r
	header#main-header .sign-out-link a {\r
		text-decoration: underline;\r
	}\r
\r
	header#main-header #site-name {\r
		display: flex;\r
		align-items: center;\r
	}\r
\r
	header#main-header #site-name img {\r
		width: calc(var(--header-height) - 5px);\r
		height: calc(var(--header-height) - 5px);\r
	}\r
\r
	/* 隐藏Greasyfork文字 */\r
	header#main-header #site-name-text {\r
		display: none;\r
	}\r
\r
	header#main-header #site-nav {\r
		display: flex;\r
		flex-direction: row-reverse;\r
		align-items: center;\r
		flex: 1;\r
		justify-content: space-between;\r
		height: 100%;\r
		gap: var(--el-gap);\r
	}\r
\r
	header#main-header #site-nav nav li {\r
		padding: 0 0.5em;\r
		display: flex;\r
		align-items: center;\r
		height: var(--header-height);\r
		min-width: 30px;\r
		justify-content: center;\r
	}\r
\r
	header#main-header #site-nav nav li:hover {\r
		background: #5f0101;\r
	}\r
\r
	header#main-header #nav-user-info {\r
		max-width: 150px;\r
	}\r
\r
	header#main-header #nav-user-info > span {\r
		flex: 1;\r
	}\r
\r
	header#main-header #nav-user-info,\r
	header#main-header #nav-user-info + nav {\r
		position: unset;\r
		width: unset;\r
		display: flex;\r
		flex-wrap: nowrap;\r
		align-items: center;\r
	}\r
}\r
`,Ge={init(){p.execMenuOnce("beautifyPage",()=>this.beautifyPageElement()),p.execMenuOnce("beautifyGreasyforkBeautify",()=>this.beautifyGreasyforkBeautify()),p.execMenuOnce("beautifyUploadImage",()=>this.beautifyUploadImage()),p.execMenuOnce("beautifyTopNavigationBar",()=>this.beautifyTopNavigationBar());},beautifyPageElement(){c.info("美化页面元素");let e=[];return e.push(x(ze)),e.push(x(Be)),e.push(x(qe)),e.push(x(Re)),e.push(x(`
			p:has(input[type="submit"][name="update-and-sync"]){
			  margin-top: 10px;
			}
			`)),d.ready(function(){let t=document.querySelector('a[target="markup_choice"][href*="daringfireball.net"]');t&&t.parentElement.replaceChild(d.createElement("span",{textContent:"Markdown"}),t),globalThis.location.pathname.endsWith("/admin")&&!document.querySelector('input[type="submit"][name="update-only"]')&&e.push(x(`
					.indented{
						padding-left: unset;
					}
					`));}),e},beautifyGreasyforkBeautify(){c.info("美化 Greasyfork Beautify脚本");let e=[];return e.push(x(Pe)),m.isPhone()?e.push(x(`
				section#script-info,
				section.text-content,
				div.width-constraint table.text-content.log-table{
					margin-top: 80px;
				}
				
				div.width-constraint div.sidebarred{
					padding-top: 80px;
				}
				div.width-constraint div.sidebarred .sidebar{
					top: 80px;
				}`)):e.push(x(`
				section#script-info{
					margin-top: 10px;
				}`)),e},beautifyUploadImage(){c.info("美化上传图片");let e=[];return e.push(x(De)),d.ready(()=>{function t(o){for(;o.nextElementSibling;)o.parentElement.removeChild(o.nextElementSibling);}let r=document.querySelectorAll('input[type="file"]');r.forEach(o=>{o.getAttribute("name")!=="code_upload"&&(o.hasAttribute("accept")&&o.getAttribute("accept").includes("javascript")||d.on(o,["propertychange","input"],function(a){t(a.target);let s=a.currentTarget.files;if(!s||s.length===0)return;c.info(["选择的图片",s]),s.length>5&&d.after(o,d.createElement("p",{textContent:n.t("❌ 最多同时长传5张图片")}));let l=[];Array.from(s).forEach(u=>{(u.size>204800||!u.type.match(/png|jpg|jpeg|gif|apng|webp/i))&&l.push(u);}),l.length!==0&&l.forEach(u=>{d.after(o,d.createElement("p",{textContent:n.t("❌ 图片：{{name}} 大小：{{size}}",{name:u.name,size:u.size})}));});}));}),["textarea#comment_text","textarea.comment-entry"].forEach(o=>{d.on(o,"paste",a=>{c.info(["触发粘贴事件",a]),setTimeout(()=>{d.trigger(r,"input");},100);});});}),e},beautifyTopNavigationBar(){c.info("美化顶部导航栏");let e=[];return e.push(x(Fe)),window.outerWidth>550&&(e.push(X.addBlockCSS(".with-submenu")),d.ready(()=>{let r=document.querySelector("#site-nav").querySelector("nav");document.querySelectorAll(".with-submenu nav li").forEach(i=>{r.appendChild(i);});})),e}},He={init(){p.execMenu("autoLogin",()=>{this.autoLogin();});},autoLogin(){m.waitNode("span.sign-in-link a[rel=nofollow]").then(async()=>{let e=p.getValue("user"),t=p.getValue("pwd");if(m.isNull(e)){f.error(n.t("请先在菜单中录入账号"));return}if(m.isNull(t)){f.error(n.t("请先在菜单中录入密码"));return}let r=document.querySelector("meta[name='csrf-token']");if(!r){f.error(n.t("获取csrf-token失败"));return}let i=f.loading(n.t("正在登录中...")),o=await $.post("https://greasyfork.org/zh-CN/users/sign_in",{fetch:!0,data:encodeURI(`authenticity_token=${r.getAttribute("content")}&user[email]=${e}&user[password]=${t}&user[remember_me]=1&commit=登录`),headers:{"Content-Type":"application/x-www-form-urlencoded"}});if(i.destroy(),!o.status){c.error(o),f.error(n.t("登录失败，请在控制台查看原因"));return}let a=o.data.responseText;d.parseHTML(a,!0,!0).querySelectorAll(".sign-out-link a[rel=nofollow][data-method='delete']").length?(f.success(n.t("登录成功，1s后自动跳转")),setTimeout(()=>{window.location.reload();},1e3)):(c.error(o),c.error(`当前账号:${e}`),c.error(`当前密码:${t}`),f.error(n.t("登录失败，可能是账号/密码错误，请在控制台查看原因")));});}},Oe={init(){this.readBgColor(),d.ready(()=>{p.execMenuOnce("greasyfork-discussions-filter-enable",()=>{this.filterEnable();}),p.execMenuOnce("discussions-addShortcutOperationButton",()=>{this.addShortcutOperationButton();});});},filterEnable(){c.info("启用Greasyfork论坛过滤器"),O.init();},readBgColor(){c.info("设置已读背景颜色");let e=p.getValue("discussions-readBgColor");x(`
        .discussion-read{
            background: ${e} !important;
        }
        `);},addShortcutOperationButton(){c.info("添加快捷操作按钮"),O.getElementList().forEach(e=>{if(e.querySelector(".discussion-filter-button"))return;let r=e.querySelector(".discussion-list-item").querySelector(".discussion-meta"),i=d.createElement("div",{className:"discussion-meta-item",innerHTML:`
					<button class="discussion-filter-button">${n.t("过滤")}</button>
					`}),o=i.querySelector(".discussion-filter-button");r.appendChild(i),d.on(o,"click",a=>{var w,L,S;m.preventEvent(a);const s=O.parseDiscuessionListContainerInfo(e);let l="data-filter-key",u="data-filter-value",h=N.alert({title:{text:n.t("选择需要过滤的选项"),position:"center",html:!1},content:{text:`
								<button ${l}="scriptId" ${u}="^${s.scriptId}$">${n.t("脚本id：{{text}}",{text:s.scriptId})}</button>
								<button ${l}="scriptName" ${u}="^${m.parseStringToRegExpString(s.scriptName)}$">${n.t("脚本名：{{text}}",{text:s.scriptName})}</button>
								<button ${l}="postUserId" ${u}="^${m.parseStringToRegExpString(s.postUserId)}$">${n.t("发布的用户id：{{text}}",{text:s.postUserId})}</button>
							`,html:!0},mask:{enable:!0,clickEvent:{toClose:!0}},drag:!0,dragLimit:!0,width:"350px",height:"300px",style:`
						.pops-alert-content{
							display: flex;
							flex-direction: column;
							gap: 20px;
						}
						.pops-alert-content button{
							text-wrap: wrap;
							padding: 8px;
							height: auto;
							text-align: left;
						}
						`}),g=h.$shadowRoot.querySelector(".pops-alert-content");if(s.scriptId==null&&((w=g.querySelector(`button[${l}="scriptId"]`))==null||w.remove()),s.scriptName==null&&((L=g.querySelector(`button[${l}="scriptName"]`))==null||L.remove()),s.postUserId==null&&((S=g.querySelector(`button[${l}="postUserId"]`))==null||S.remove()),s.replyUserId!=null){let E=d.createElement("button",{innerHTML:n.t("作者id：{{text}}",{text:s.replyUserId})});E.setAttribute(l,"scriptAuthorId"),E.setAttribute(u,"^"+s.replyUserId+"$"),g.appendChild(E);}d.on(h.$shadowRoot,"click",`button[${l}]`,E=>{m.preventEvent(E);let V=E.target,_=V.getAttribute(l),k=V.getAttribute(u);O.addValue(_,k),h.close(),O.filter(),f.success(n.t("添加成功"));});});});}},je={init(){p.execMenuOnce("users-changeConsoleToTopNavigator",()=>{this.changeConsoleToTopNavigator();}),p.execMenuOnce("gf-scripts-filter-enable",()=>{j.init();}),p.execMenuOnce("beautifyCenterContent",()=>ye.beautifyCenterContent());},changeConsoleToTopNavigator(){c.info("迁移【控制台】到顶部导航栏"),X.addBlockCSS("#about-user"),d.ready(()=>{let e=document.querySelector("#about-user"),t=document.querySelector("#site-nav nav");if(!e){c.error("#about-user元素不存在");return}if(!t){c.error("#site-nav nav元素不存在");return}e=e.cloneNode(!0);let r=d.createElement("li",{className:"scripts-console",innerHTML:`<a href="javascript:;">${n.t("控制台")}</a>`});d.on(r,"click",i=>{m.preventEvent(i),N.drawer({title:{enable:!1},content:{text:"",html:!0},size:"auto",direction:"top",zIndex:m.getMaxZIndex(100),style:`
                    .text-content{
                        list-style-type: none;
                        box-shadow: rgb(221, 221, 221) 0px 0px 5px;
                        background-color: rgb(255, 255, 255);
                        box-sizing: border-box;
                        border-width: 1px;
                        border-style: solid;
                        border-color: rgb(187, 187, 187);
                        border-image: initial;
                        border-radius: 5px;
                        margin: 14px 0px;
                        padding: 10px 40px;
                    }
                    a.report-link{
                        position: absolute;
                        right: 0px;
                        font-size: smaller;
                        margin-right: 16px;
                        margin-top: 8px;
                    }
                    `}).$shadowRoot.querySelector(".pops-drawer-content").appendChild(e);}),t.appendChild(r);});}},G={init(){p.execMenu("checkPage",()=>{this.checkPage();}),Ge.init(),A.isScript()&&$e.init(),(A.isScriptList()||A.isScriptLibraryList())&&ye.init(),A.isDiscuessions()&&Oe.init(),A.isUserHome()&&je.init(),p.execMenuOnce("scripts-addOperationPanelBtnWithNavigator",()=>{this.addOperationPanelBtnWithNavigator();}),d.ready(()=>{v.initEnv(),He.init(),v.handleLocalGotoCallBack(),p.execMenuOnce("fixImageWidth",()=>{G.fixImageWidth();}),G.languageSelectorLocale(),p.execMenuOnce("optimizeImageBrowsing",()=>{G.optimizeImageBrowsing();}),p.execMenuOnce("overlayBedImageClickEvent",()=>{G.overlayBedImageClickEvent();}),A.isCodeStrict()||p.execMenuOnce("addMarkdownCopyButton",()=>{G.addMarkdownCopyButton();});});},fixImageWidth(){window.innerWidth<window.innerHeight&&(c.info("修复图片显示问题"),x(`
            img.lum-img{
                width: 100% !important;
                height: 100% !important;
            }
          `));},optimizeImageBrowsing(){c.info("优化图片浏览"),x(ae("ViewerCSS")),x(`
        @media (max-width: 460px) {
          .lum-lightbox-image-wrapper {
              display:flex;
              overflow: auto;
              -webkit-overflow-scrolling: touch
          }
      
          .lum-lightbox-caption {
              width: 100%;
              position: absolute;
              bottom: 0
          }
      
          .lum-lightbox-position-helper {
              margin: auto
          }
      
          .lum-lightbox-inner img {
              max-width:100%;
              max-height:100%;
          }
        }
        `);function e(r=[],i=0){let o="";r.forEach(l=>{o+=`<li><img data-src="${l}" loading="lazy"></li>`;});let a=d.createElement("ul",{innerHTML:o}),s=new xe(a,{inline:!1,url:"data-src",zIndex:m.getMaxZIndex()+100,hidden:()=>{s.destroy();}});i=i<0?0:i,s.view(i),s.zoomTo(1),s.show();}function t(r){return r.getAttribute("data-src")||r.getAttribute("src")||r.getAttribute("alt")}d.on(document,"click","img",function(r){var h;let i=r.target;if(((h=i.parentElement)==null?void 0:h.localName)==="a"&&i.hasAttribute("data-screenshots")||i.closest(".viewer-container")||i.closest(".lum-lightbox-position-helper"))return;let o=i.closest(".user-content"),a=[],s=0,l=[],u=t(i);u!=null&&u.startsWith("https://img.shields.io")||(o?(o.querySelectorAll("img").forEach(g=>{l.push(g);let w=t(g),L=g.parentElement;(L==null?void 0:L.localName)==="a"&&(w=L.getAttribute("data-href")||L.href),a.push(w);}),s=l.indexOf(i),s===-1&&(s=0)):(a.push(u),s=0),c.success(["点击浏览图片👉",a,s]),e(a,s));}),document.querySelectorAll(".user-screenshots").forEach(r=>{let i=r.querySelector("a");if(!i)return;let o=i.getAttribute("data-href")||i.getAttribute("href"),a=r.querySelector("img");a&&(a.setAttribute("data-screenshots","true"),a.setAttribute("data-src",o),i.setAttribute("href","javascript:;"),d.after(i,a),i.remove());});},overlayBedImageClickEvent(){c.info("覆盖图床图片的parentElement的a标签"),document.querySelectorAll(".user-content a>img").forEach(e=>{let t=e.parentElement,r=t.getAttribute("href");t.setAttribute("data-href",r),t.removeAttribute("href"),d.on(t,"click",()=>{f.warning(`<div style="overflow-wrap: anywhere;">${n.t("拦截跳转：")}<a href="${r}" target="_blank">${r}</a></div>`,{html:!0,zIndex:m.getMaxZIndex()+105});});});},addMarkdownCopyButton(){c.info("在Markdown右上角添加复制按钮"),x(`
        pre{
          position: relative;
          margin-bottom: 0px !important;
          width: 100%;
        }
        `),x(`
        .snippet-clipboard-content{
          display: flex;
          justify-content: space-between;
          background: rgb(246, 248, 250);
          margin-bottom: 16px;
        }
        .zeroclipboard-container {
          /* right: 0;
          top: 0;
          position: absolute; */
          box-sizing: border-box;
          display: flex;
          font-size: 16px;
          line-height: 24px;
          text-size-adjust: 100%;
          overflow-wrap: break-word;
          width: fit-content;
          height: fit-content;
        }
        .zeroclipboard-container svg{
            vertical-align: text-bottom;
            display: inline-block;
            overflow: visible;
            fill: currentColor;
            margin: 8px;
        }
        .zeroclipboard-container svg[aria-hidden="true"]{
          display: none;
        }
        clipboard-copy.js-clipboard-copy {
          position: relative;
          padding: 0px;
          color: rgb(36, 41, 47);
          background-color: rgb(246, 248, 250);
          transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
          transition-property: color,background-color,box-shadow,border-color;
          display: inline-block;
          font-size: 14px;
          line-height: 20px;
          white-space: nowrap;
          vertical-align: middle;
          cursor: pointer;
          -webkit-user-select: none;
          user-select: none;
          border: 1px solid rgba(31, 35, 40, 0.15);
          -webkit-appearance: none;
          appearance: none;
          box-shadow: rgba(31, 35, 40, 0.04) 0px 1px 0px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px 0px inset;
          margin: 8px;
          overflow-wrap: break-word;
          text-wrap: nowrap;
          border-radius: 6px;
        }
        clipboard-copy.js-clipboard-copy[success]{
          border-color: rgb(31, 136, 61);
          box-shadow: 0 0 0 0.2em rgba(52,208,88,.4);
        }
        clipboard-copy.js-clipboard-copy:hover{
          background-color: rgb(243, 244, 246);
          border-color: rgba(31, 35, 40, 0.15);
          transition-duration: .1s;
        }
        clipboard-copy.js-clipboard-copy:active{
          background-color: rgb(235, 236, 240);
          border-color: rgba(31, 35, 40, 0.15);
          transition: none;
        }
        `),x(`
        .pops-tip.github-tooltip {
          border-radius: 6px;
          padding: 6px 8px;
        }
        
        .pops-tip.github-tooltip, .pops-tip.github-tooltip .pops-tip-arrow::after {
          background: rgb(36, 41, 47);
          color: #fff;
        }
        
        .pops-tip.github-tooltip .pops-tip-arrow::after {
          width: 8px;
          height: 8px;
        }
        `);function e(){let t=d.createElement("div",{className:"zeroclipboard-container",innerHTML:`
				<clipboard-copy class="js-clipboard-copy">
				<svg height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon-copy">
					<path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
				</svg>
				<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon-check-copy">
					<path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
				</svg>
				</clipboard-copy>
            `}),r=t.querySelector(".js-clipboard-copy"),i=t.querySelector(".octicon-copy"),o=t.querySelector(".octicon-check-copy");return d.on(t,"click",function(){let a=t.parentElement.querySelector("code");if(!a&&t.parentElement.className.includes("prettyprinted")&&(a=t.parentElement),!a){f.error(n.t("未找到{{selector}}元素",{selector:"code"}));return}m.setClip(a.innerText||a.textContent),r.setAttribute("success","true"),i.setAttribute("aria-hidden","true"),o.removeAttribute("aria-hidden");let s=N.tooltip({target:r,content:n.t("✅ 复制成功!"),position:"left",className:"github-tooltip",alwaysShow:!0});setTimeout(()=>{r.removeAttribute("success"),o.setAttribute("aria-hidden","true"),i.removeAttribute("aria-hidden"),s.close();},2e3);}),t}document.querySelectorAll("pre").forEach(t=>{if(t.querySelector("div.zeroclipboard-container"))return;let i=e(),o=d.createElement("div",{className:"snippet-clipboard-content"});d.before(t,o),o.appendChild(t),o.appendChild(i);});},languageSelectorLocale(){let e=p.getValue("language-selector-locale"),t=window.location.pathname.split("/").filter(r=>!!r)[0];if(c.success("选择语言："+e),c.success("当前语言："+t),!m.isNull(e)&&e!==t){let r=null,i=y.getSwitchLanguageUrl(e);y.switchLanguage(i),c.success("新Url："+i),f.loading(n.t("当前语言：{{currentLocaleLanguage}}，，3秒后切换至：{{localeLanguage}}",{currentLocaleLanguage:t,localeLanguage:e}),{timeout:3e3,showClose:!0,onClose(){clearTimeout(r);}}),f.info(n.t("导航至：")+i,{timeout:3e3}),r=setTimeout(()=>{window.location.href=i;},3e3);}},async UIScriptList(e,t,r,i){var g,w,L;if(!v.isLogin){f.error(n.t("请先登录账号！"));return}let a=v.getUserLinkElement().href,s=(L=(w=(g=a==null?void 0:a.split("/"))==null?void 0:g.pop())==null?void 0:w.match(/([0-9]+)/))==null?void 0:L[0],l=N.loading({mask:{enable:!0},parent:i,content:{text:n.t("获取信息中，请稍后...")},addIndexCSS:!1}),u=await y.getUserInfo(s);if(l.close(),!u)return;c.info(u);let h=e==="script-list"?u.scriptList:u.scriptLibraryList;f.success(n.t("获取成功，共 {{count}} 个",{count:h.length}));for(const S of h){let E=d.createElement("li",{className:"w-script-list-item",innerHTML:`
				<div class="w-script-info">
				<div class="w-script-name">
					<a href="${S.url}" target="_blank">${S.name}</a>
				</div>
				<div class="w-script-fan-score">
					<p>${n.t("评分：")}${S.fan_score}</p>
				</div>
				<div class="w-script-locale">
					<p>${n.t("语言：")}${S.locale}</p>
				</div>
				<div class="w-script-version">
					<p>${n.t("版本：")}${S.version}</p>
				</div>
				<div class="w-script-update-time">
					<p>${n.t("更新：")}${m.getDaysDifference(new Date(S.code_updated_at).getTime(),void 0,"auto")}前</p>
				</div>
				</div>
            `}),V=E.querySelector(".w-script-info"),_=d.createElement("div",{className:"pops-panel-button",innerHTML:`
				<button type="primary" data-icon="" data-righticon="false">
				<span>${n.t("同步代码")}</span>
				</button>
				`});S.deleted&&(E.classList.add("w-script-deleted"),_.querySelector("button").setAttribute("disabled","true")),d.on(_,"click",void 0,async function(){c.success(["同步",S]);let k=_.querySelector("button"),M=_.querySelector("button span"),q=d.createElement("i",{className:"pops-bottom-icon",innerHTML:N.config.iconSVG.loading},{"is-loading":!0});k.setAttribute("disabled","true"),k.setAttribute("data-icon","true"),M.innerText=n.t("同步中..."),d.before(M,q);let T=S==null?void 0:S.id,C=await y.getSourceCodeSyncFormData(T.toString());if(C){const B="script[script_sync_type_id]";if(C.has(B)){let R=C.get(B),D="";R.toString()==="1"?D=n.t("手动"):R.toString()==="2"?D=n.t("自动"):R.toString()==="3"&&(D="webhook");let K=E.querySelector(".w-script-sync-type");K?K.querySelector("p").innerText=n.t("同步方式：{{syncMode}}",{syncMode:D}):d.append(V,`
								<div class="w-script-sync-type">
									<p>${n.t("同步方式：{{syncMode}}",{syncMode:D})}
									</p>
								</div>`),await y.sourceCodeSync(S.id.toString(),C)?f.success(n.t("同步成功")):f.error(n.t("同步失败"));}else f.error(n.t("该脚本未设置同步信息"));}k.removeAttribute("disabled"),k.removeAttribute("data-icon"),M.innerText=n.t("同步代码"),q.remove();}),E.appendChild(_),i.appendChild(E);}},checkPage(){c.info("检测gf页面是否正确加载，有时候会出现"),d.ready(()=>{if(document.body.firstElementChild&&document.body.firstElementChild.localName==="p"&&document.body.firstElementChild.innerText.includes("We're down for maintenance. Check back again soon.")){let e=parseInt(H("greasyfork-check-page-time",0)),t=p.getValue("greasyfork-check-page-timeout",5),r=t*1e3;if(e&&Date.now()-e<r){f.warning(n.t("上次重载时间 {{time}}，{{timeout}}秒内拒绝反复重载",{time:m.formatTime(e,"yyyy-MM-dd HH:mm:ss"),timeout:t}));return}ne("greasyfork-check-page-time",Date.now()),window.location.reload();}});},addOperationPanelBtnWithNavigator(){c.info("添加【操作面板】按钮"),X.addBlockCSS(".sidebarred .sidebar",".sidebarred-main-content .open-sidebar"),x(`
		.sidebarred .sidebarred-main-content{
			max-width: 100%;
		}	
		`),d.ready(()=>{let e=document.querySelector("#site-nav nav"),t=document.querySelector("#site-nav .with-submenu nav"),r=document.querySelector("#script-list-option-groups")||document.querySelector(".list-option-groups");if(!r){c.warn("不存在右侧面板元素#script-list-option-groups");return}if(r=r.cloneNode(!0),r.classList.add("option-panel-groups"),!e){c.error("元素#site-nav nav不存在");return}let i=d.createElement("li",{className:"filter-scripts",innerHTML:`
                <a href="javascript:;">${n.t("操作面板")}</a>
                `});d.on(i,"click",o=>{m.preventEvent(o),N.drawer({title:{enable:!1},content:{text:"",html:!0},direction:"top",size:"80%",zIndex:m.getMaxZIndex(100),style:`
                    .pops-drawer-content div:first-child{
                        margin: 20px 0 0 0;
                    }
                    .option-panel-groups > div{
                    
                    }
                    .option-panel-groups ul{
                        margin: .5em 0 0;
                        list-style-type: none;
                        padding: 1em 0;
                        box-shadow: 0 0 5px #ddd;
                        border: 1px solid #BBBBBB;
                        border-radius: 5px;
                        background-color: #fff;
                    }
                    .option-panel-groups ul li{
                    
                    }
                    li.list-current{
                        border-left: 7px solid #800;
                        box-shadow: inset 0 1px #0000001a, inset 0 -1px #0000001a;
                        margin: 0 0 0 -4px;
                        padding: .4em 1em .4em calc(1em - 3px);
                        background: linear-gradient(#fff, #eee);
                    }
                    .list-option-group a {
                        padding: .35em 1em;
                        display: block;
                    }
                    .list-option-group {
                        margin-bottom: 1em;
                    }
                    form.sidebar-search{
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    form.sidebar-search input[type="search"]{
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        line-height: 1;
                        height: 32px;
                        white-space: nowrap;
                        cursor: text;
                        text-align: center;
                        box-sizing: border-box;
                        outline: 0;
                        transition: 0.1s;
                        font-weight: 500;
                        user-select: none;
                        -webkit-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        vertical-align: middle;
                        -webkit-appearance: none;
                        appearance: none;
                        background-color: transparent;
                        border: 0;
                        padding: 8px 8px;
                        font-size: 14px;
                        text-align: start;
                        /* width: 100%; */
                        // flex: 1;
                        display: flex;
                        align-items: center;
                        border: 1px solid #dcdfe6;
                        border-radius: 4px;
                        background-color: #ffffff;
                    }
                    form.sidebar-search input[type="submit"]{
                        width: 32px;
                        height: 32px;
                    }
                    `}).$shadowRoot.querySelector(".pops-drawer-content").appendChild(r);}),t&&t.children.length?t.appendChild(i):e.appendChild(i);});}},We={id:"greasy-fork-panel-config-script-list",title:n.t("脚本列表"),callback(e,t,r){G.UIScriptList("script-list",e,t,r);},forms:[]},Ke={id:"greasy-fork-panel-config-library",title:n.t("库"),callback(e,t,r){G.UIScriptList("script-library",e,t,r);},forms:[]},Je=`.w-script-list-item {\r
	padding: 10px 0;\r
	border-bottom: 1px solid #e5e5e5;\r
	font-size: 16px;\r
	text-align: left;\r
}\r
.w-script-version,\r
.w-script-fan-score,\r
.w-script-create-time,\r
.w-script-update-time,\r
.w-script-locale,\r
.w-script-sync-type {\r
	font-size: 14px;\r
	color: #7c7c7c;\r
}\r
.w-script-fan-score {\r
	margin-left: unset !important;\r
	text-align: unset !important;\r
	max-width: unset !important;\r
}\r
.w-script-deleted {\r
	text-decoration: line-through;\r
	font-style: italic;\r
	color: red;\r
}\r
.w-script-deleted .w-script-name::before {\r
	content: "【删除】";\r
}\r
\r
li[data-key="user"] .pops-panel-input,\r
li[data-key="pwd"] .pops-panel-input {\r
	max-width: 200px;\r
}\r
`,Ze={id:"greasy-fork-panel-config-account",title:n.t("用户"),forms:[{text:"",type:"forms",forms:[{text:n.t("功能"),type:"deepMenu",forms:[{text:"",type:"forms",forms:[b(n.t("迁移【控制台】到顶部导航栏"),"users-changeConsoleToTopNavigator",!0,void 0,n.t("将【控制台】按钮移动到顶部导航栏，节省空间"))]}]}]}]},z={data:null,oneSuccessExecMenu:null,onceExec:null,listenData:null},p={$data:{get data(){return z.data==null&&(z.data=new m.Dictionary),z.data},get oneSuccessExecMenu(){return z.oneSuccessExecMenu==null&&(z.oneSuccessExecMenu=new m.Dictionary),z.oneSuccessExecMenu},get onceExec(){return z.onceExec==null&&(z.onceExec=new m.Dictionary),z.onceExec},get scriptName(){return le},key:P,attributeKeyName:Y,attributeDefaultValueName:Q},$listener:{get listenData(){return z.listenData==null&&(z.listenData=new m.Dictionary),z.listenData}},init(){this.initPanelDefaultValue(),this.initExtensionsMenu();},initExtensionsMenu(){I.top===I.self&&me.add([{key:"show_pops_panel_setting",text:n.t("⚙ 设置"),autoReload:!1,isStoreValue:!1,showText(e){return e},callback:()=>{this.showPanel();}}]);},initPanelDefaultValue(){let e=this;function t(o){if(!o.attributes)return;let a=o.attributes[Y],s=o.attributes[Q];if(a==null){c.warn(["请先配置键",o]);return}e.$data.data.has(a)&&c.warn("请检查该key(已存在): "+a),e.$data.data.set(a,s);}function r(o){for(let a=0;a<o.length;a++){let s=o[a];t(s);let l=s.forms;l&&Array.isArray(l)&&r(l);}}let i=this.getPanelContentConfig();for(let o=0;o<i.length;o++){let a=i[o];if(!a.forms)continue;let s=a.forms;s&&Array.isArray(s)&&r(s);}},setValue(e,t){let r=H(P,{}),i=r[e];r[e]=t,ne(P,r),this.$listener.listenData.has(e)&&this.$listener.listenData.get(e).callback(e,i,t);},getValue(e,t){let i=H(P,{})[e];return i??(this.$data.data.has(e)?this.$data.data.get(e):t)},deleteValue(e){let t=H(P,{}),r=t[e];Reflect.deleteProperty(t,e),ne(P,t),this.$listener.listenData.has(e)&&this.$listener.listenData.get(e).callback(e,r,void 0);},addValueChangeListener(e,t,r){let i=Math.random();return this.$listener.listenData.set(e,{id:i,key:e,callback:t}),r&&r.immediate&&t(e,this.getValue(e),this.getValue(e)),i},removeValueChangeListener(e){let t=null;for(const[r,i]of this.$listener.listenData.entries())if(i.id===e){t=r;break}typeof t=="string"?this.$listener.listenData.delete(t):console.warn("没有找到对应的监听器");},hasKey(e){let t=H(P,{});return e in t},execMenu(e,t){if(typeof e!="string")throw new TypeError("key 必须是字符串");if(!this.$data.data.has(e)){c.warn(`${e} 键不存在`);return}let r=p.getValue(e);r&&t(r);},execMenuOnce(e,t){if(typeof e!="string")throw new TypeError("key 必须是字符串");if(!this.$data.data.has(e)){c.warn(`${e} 键不存在`);return}if(this.$data.oneSuccessExecMenu.has(e))return;this.$data.oneSuccessExecMenu.set(e,1);let r=[],i=s=>{let l=p.getValue(e);o(l,s);},o=(s,l)=>{let u=[];if(s){let h=l??t(s,i);h instanceof HTMLStyleElement?u=[h]:Array.isArray(h)&&(u=[...h.filter(g=>g!=null&&g instanceof HTMLStyleElement)]);}for(let h=0;h<r.length;h++)r[h].remove(),r.splice(h,1),h--;r=[...u];};this.addValueChangeListener(e,(s,l,u)=>{o(u);});let a=p.getValue(e);a&&o(a);},onceExec(e,t){if(typeof e!="string")throw new TypeError("key 必须是字符串");this.$data.onceExec.has(e)||(t(),this.$data.onceExec.set(e,1));},showPanel(){N.panel({title:{text:n.t("{{SCRIPT_NAME}}-设置",{SCRIPT_NAME:le}),position:"center",html:!1,style:""},content:this.getPanelContentConfig(),mask:{enable:!0,clickEvent:{toClose:!0,toHide:!1}},isMobile:this.isMobile(),width:this.getWidth(),height:this.getHeight(),drag:!0,only:!0,style:`
			${Je}
			`});},isMobile(){return window.outerWidth<550},getWidth(){return window.outerWidth<550?"92dvw":"550px"},getHeight(){return window.outerHeight>450?"80dvh":"450px"},getPanelContentConfig(){return [Me,Ne,Ve,Ze,We,Ke]}};p.init();G.init();

})(Qmsg, DOMUtils, Utils, i18next, pops, Viewer);
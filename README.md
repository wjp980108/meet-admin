# Meet-Admin

### 介绍

Meet-Admin 一款基于 Vue3.4、TypeScript、Vite5、Pinia、Element-Plus 开源的后台管理框架，使用目前最新技术栈开发。另外本项目还封装了一些常用组件、Hooks、指令、动态路由等功能。

### 在线预览

- Link：https://admin.wjp.plus

### 代码仓库

- GitHub：https://github.com/wjp980108/meet-admin

### 项目文档

- 项目更新日志：[CHANGELOG.md](./CHANGELOG.md)

- 项目文档地址：https://docs.wjp.plus

### 项目功能

- 使用 Vue3.4 + TypeScript 开发，单文件组件**＜script setup＞**
- 采用 Vite5 作为项目开发、打包工具（配置 gzip/brotli 打包、tsx 语法、跨域代理…）
- 使用 Pinia 替代 Vuex，轻量、简单、易用，集成 Pinia 持久化插件
- 使用 TypeScript 对 Axios 整个二次封装（请求拦截、取消、常用请求封装…）
- 支持 Element 组件大小切换、暗黑模式、i18n 国际化
- 使用 VueRouter 配置动态路由、路由懒加载
- 使用 KeepAlive 对页面进行缓存，支持多级嵌套路由缓存
- 使用 husky、lint-staged、commitlint、czg、cz-git 规范提交信息

### 安装使用步骤

- **Clone：**

```text
# GitHub
git clone https://github.com/wjp980108/meet-admin.git
```

- **Install：**

```text
pnpm install
```

- **Run：**

```text
# 开发环境
pnpm dev

# 测试环境
pnpm dev:test

# 生产环境
pnpm dev:prod
```

- **Build：**

```text
# 测试环境
pnpm build:test

# 生产环境
pnpm build
```

- **Lint：**

```text
# eslint 检测代码
pnpm lint

# eslint 修复代码
pnpm lint:fix
```

- **commit：**

```text
# 提交代码（提交前会自动执行 lint:lint-staged 命令）
pnpm commit
```

### 文件资源目录

```text
Meet-Admin
├─ .husky                  # husky 配置文件
├─ public                  # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                  # API 接口管理
│  ├─ assets               # 静态资源文件
│  ├─ components           # 全局组件
│  ├─ config               # 全局配置项
│  ├─ constants            # 全局常量
│  ├─ directives           # 全局指令文件
│  ├─ hooks                # 常用 Hooks 封装
│  ├─ languages            # 语言国际化 i18n
│  ├─ layouts              # 框架布局模块
│  ├─ router               # 路由管理
│  ├─ stores               # pinia store
│  ├─ styles               # 全局样式文件
│  ├─ typings              # 全局 ts 声明
│  ├─ utils                # 常用工具库
│  ├─ views                # 项目所有页面
│  ├─ App.vue              # 项目主组件
│  └─ main.ts              # 项目入口文件
├─ .env                    # vite 常用配置
├─ .env.dev                # 开发环境配置
├─ .env.prod               # 生产环境配置
├─ .env.test               # 测试环境配置
├─ .gitignore              # 忽略 git 提交
├─ .nvmdrc                 # node 版本管理配置
├─ CHANGELOG.md            # 项目更新日志
├─ commitlint.config.js    # git 提交规范配置
├─ eslint.config.js        # Eslint 校验配置文件
├─ index.html              # 入口 html
├─ LICENSE                 # 开源协议文件
├─ package.json            # 依赖包管理
├─ pnpm-lock.yaml          # pnpm 依赖管理
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
├─ uno.config.ts           # unoCss 配置文件
└─ vite.config.ts          # vite 全局配置文件
```

### 浏览器支持

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |

### 项目后台接口

项目后台接口完全采用 Mock 数据，感谢以下 Mock 平台支持：

- EasyMock：https://mock.mengxuegu.com

# webview-debugger

一款用于在 webview 中调试 h5 页面的调试工具，默认隐藏支持以彩蛋形式触发。

## 主要功能

- 一键切换 Http 协议，便于本地抓包；
- 集成 Eureda 调试工具；
- 支持自定义输入目标 URL，在第三方 webview 中调试本地页面。
- 彩蛋形式触发，不影响正常用户体验；

## 使用方法

import方式

```
```

src引入方式

``` cmd
npm run build
```
``` html
<script src="./dist/bundle.js"></script>
```

动态插入方式

```
```

## 本地开发
### 监听文件
``` cmd
yarn dev
```

### 启动服务
``` cmd
yarn example
```

### 本地预览
访问 http://127.0.0.1:8080
屏幕最左侧连续点击 5 次，唤起调试台
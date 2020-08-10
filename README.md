# 积木 - 弹层建站

用于广告弹层建站渲染

## 开发

```shell
yarn dev
```

* 预览页在 http://localhost:3000/vue

## 开发皮肤

```shell
skin=box yarn dev
```

* 预览页在 http://localhost:3000/skin
* 皮肤代码在 skin/box/index.vue

## 打包皮肤

```shell
skin=box yarn build:skin
```

* 皮肤代码在 skin/box/index.vue

## 发布

### 发布sdk

> 进入 tuia-jimu-web-node/sdk 文件夹

```shell
修改 package.json 版本号（ 遵循 semver 规范 ）

yarn build:publish

npm publish --access=public（ npm 源切换到公网 ）

# 发布测试版本

修改 package.json 版本号如 "0.8.0-beta"

npm publish --access=public --tag=beta（ npm 源切换到公网 ）

# 安装时直接 yarn add @tuia/jimu-sdk@beta
```

#### vue版本发布

> 进入 tuia-activity-node 项目 master 分支

```
安装刚发布的 @tuia/jimu-sdk 包

yarn build:vendor

cd dist/vendor

拷贝 vendor 文件的 hash 字符串
```

> 进入 tuia-ssp-manager 管理后台 > 活动管理 > 公共模块

```
修改 vendor 文件的 hash 值
确认
```

#### zepto版本发布

> 进入 tuia-h5-node 项目 develop 分支 custom_ops 文件夹

```
安装刚发布的 @tuia/jimu-sdk 包

yarn public

cd dist

拷贝 public 文件的 hash 值
```

> 进入 tuia-ssp-manager 管理后台 > 活动管理 > 公共模块

```
修改 public 文件的版本号为刚发布的版本号
确认
```

## 使用方法
### zepto引用方式
```
<script src="//yun.tuisnake.com/SDK/vue/2.6.10/vue.min.js"></script>

window.Vue = window.Vue || null
require('@tuia/jimu-sdk/dist/JimuSDK.vue.js')

window.JimuSDK && window.JimuSDK.showLayer({
  schema,   // lottery.advertLayer.code
  isShowCloseAD: true,
  st_info_dpm_btn_close: '{"dpm":"54066.4.4.0-st_info_dpm_btn_close"}',
  st_info_dpm_btn_get: '{"dpm":"54066.4.6.0-st_info_dpm_btn_get"}',
  st_info_dpm_video_start: '{"dpm":"54066.4.6.0-st_info_dpm_video_start"}',
  st_info_dpm_exposure: '{"dpm":"54066.4.1.0-st_info_dpm_exposure"}',
  st_info_encourage_showLog: {'dpm': '54066.4.1.0-st_info_encourage_showLog'},
  androidDownloadUrl: '#android',
  iosDownloadUrl: '#ios',
  beforeClose: () => {
    console.log('fn beforeClose')
  },
  afterUse: () => {
    console.log('fn afterUse')
  },
  bridgeUse: () => {
    console.log('fn bridgeUse')
  }
})
```

### vue引用方式
```
<script src="//cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>

require('@tuia/jimu-sdk/dist/JimuSDK.vue.js')
window.JimuSDK && window.JimuSDK.showLayer({
  schema,   // lottery.advertLayer.code
  isShowCloseAD: true,  // 是否显示关闭按钮的广告字样
  st_info_dpm_btn_close: '{"dpm":"54066.4.4.0-st_info_dpm_btn_close"}', // 关闭弹层按钮埋点
  st_info_dpm_btn_get: '{"dpm":"54066.4.6.0-st_info_dpm_btn_get"}', // 使用券按钮埋点
  st_info_dpm_video_start: '{"dpm":"54066.4.6.0-st_info_dpm_video_start"}', // 视频开始播放埋点
  st_info_dpm_exposure: '{"dpm":"54066.4.1.0-st_info_dpm_exposure"}', // 互动弹层券曝光埋点
  st_info_encourage_showLog: {'dpm': '54066.4.1.0-st_info_encourage_showLog'},  // 激励弹层券曝光埋点
  androidDownloadUrl: '#android', // 安卓下载地址
  iosDownloadUrl: '#ios', // 苹果下载地址
  beforeClose: () => {  // 关闭按钮点击后，触发的回调（实际弹层关闭前）
    console.log('fn beforeClose')
  },
  afterUse: () => { // 券点击后触发的回调（实际跳转逻辑之前）
    console.log('fn afterUse')
  },
  bridgeUse: () => {  // 券点击后触发的jsBridge回调（实际afterUse之后）
    console.log('fn bridgeUse')
  }
})
```

### 关闭积木弹层
```
// 不触发关闭回调
window.JimuSDK && window.JimuSDK.closeLayer()
```

### schema测试数据
```
{"version":"1.0.0","page":{"backgroundLight":1,"backgroundMask":85,"closePosition":"rightTop","closeAD":1,"autoJump":{}},"layers":[{"fadeIn":"","fadeOut":"","elements":[{"id":"e773a34e","name":"按钮1","type":"button","style":{"width":"240px","height":"38px","zIndex":20,"top":"330px","left":"67px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"4px","borderBottomRightRadius":"4px","borderTopLeftRadius":"4px","borderTopRightRadius":"4px","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent","backgroundColor":"#EA5422","color":"#fff","fontSize":"16px","textAlign":"center","whiteSpace":"nowrap","backgroundImage":"","backgroundPosition":"center","backgroundSize":"100% 100%"},"text":"立即领取","animation":{"type":"breathe","duration":1},"picValid":1,"jump":{"type":"link","android":"http://www.baidu.com/","ios":"","popupId":"","isCoversion":1,"disableType":1,"isBilling":1}},{"id":"a4ad934e","name":"图片1","type":"image","style":{"width":"246px","height":"240px","zIndex":20,"top":"57px","left":"64px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent","backgroundImage":"url(\"//yun.tuisnake.com/jimu-web/9bb79f28-timg.jpeg\")","backgroundPosition":"center","backgroundSize":"100% 100%"},"jump":{"type":"none","android":"","ios":"","popupId":"","isCoversion":1,"isBilling":0},"animation":{"type":"none","duration":1}},{"id":"fb96c987","name":"倒计时1","type":"countdown","style":{"width":"150px","height":"21px","zIndex":20,"top":"23px","left":"112px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent","backgroundColor":"rgba(255,255,255,0)","fontSize":"14px","lineHeight":"21px","letterSpacing":"2px","color":"#fff","textAlign":"left","overflow":"hidden"},"start":"","end":""},{"id":"0890dea7","name":"轮播图1","type":"carousel","style":{"width":"127px","height":"127px","zIndex":20,"top":"180px","left":"83px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent"},"sliders":[{"src":"//yun.tuisnake.com/jimu-web/d35f4e93-curry.png","id":"ac5ee194"},{"src":"//yun.tuisnake.com/jimu-web/599eb328-4ab9a451f8198618bcaaaa9f4ced2e738ad4e65b.jpg","id":"c9857079"},{"src":"//yun.tuisnake.com/jimu-web/b5677efa-f066f0ff769c0b9281d0132d4380c9f0.jpg","id":"6c09c7a2"}],"slidesPerView":3,"spaceBetween":0,"direction":"horizontal","wrapStrategy":"100% 100%","autoplay":{"enable":1,"delay":2000,"stopOnLastSlide":false,"disableOnInteraction":false},"speed":300},{"id":"00060560","name":"二维码1","type":"QRCode","style":{"width":"140px","height":"140px","zIndex":20,"top":"182px","left":"222px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent"},"jump":{"type":"none","android":"","ios":"","popupId":"","isCoversion":1},"src":"//yun.tuisnake.com/jimu-web/784785fb-1574583180.png"},{"id":"97b9d1b0","name":"视频1","type":"video","style":{"width":"180px","height":"320px","zIndex":20,"top":"376px","left":"97px","opacity":1,"transform":"rotate(0deg)","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderStyle":"solid","borderWidth":"0px","borderColor":"transparent","backgroundImage":"url(\"//yun.tuia.cn/tuia/jimo-web-pro/df_image_widget@1x.png\")","backgroundPosition":"center","backgroundSize":"100% 100%"},"srcStrong":"//yun.dui88.com/h5-mami/layer/861/861_1000k.ts","srcWeak":"//yun.dui88.com/h5-mami/layer/861/861_500k.ts","srcImage":"//yun.tuisnake.com/newactivity/assets/bg.5275c9b6d7642cb28a279a1638299945.png"}]}]}
```

## 注意事项
### 皮肤弹层点击事件 & 计费埋点
```
// 使用暴露的全局埋点方法给积木皮肤使用
window.JimuSDK.commonUse = (widgetAttrs) => {
  CommonUse(widgetAttrs, this.h5params, this)
}
```

### 关于打包体积
目前（2020-02-26）整体打包体积在 52kb
特别注意：
不要使用第三方请求包如axios，使用 `sdk/src/libs/utils.js` 中的 `Ajax` 方法
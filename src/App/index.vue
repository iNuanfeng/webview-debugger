<template>
  <div class="debugger-container">
    <Button type="primary" class="btn-toolbar" @click="isShowAction=true">工具栏</Button>
    <ActionSheet
      v-model="isShowAction"
      :actions="actions"
      @select="onSelectAction"
      close-on-click-action
    ></ActionSheet>
    <PopupJump :show.sync="isShowPopupJump"></PopupJump>
    <PopupSence :show.sync="isShowPopupSence"></PopupSence>
  </div>
</template>

<script>
import { Button } from 'vant'
import { ActionSheet } from 'vant'
import PopupJump from './popupJump'
import PopupSence from './popupSence'
import Cookies from 'js-cookie'

export default {
  components: {
    Button,
    ActionSheet,
    PopupJump,
    PopupSence
  },
  data() {
    return {
      isShowAction: false,
      isShowPopupJump: false,
      isShowPopupSence: false,
      actions: [
        {
          name: '多场景设置'
        },
        {
          name: '多场景清除'
        },
        {
          name: '跳转页面'
        },
        {
          name: 'HTTP打开'
        },
        {
          name: '调试打开'
        },
        {
          name: '隐藏工具栏'
        }
      ]
    }
  },
  methods: {
    onSelectAction(item) {
      switch (item.name) {
        case '多场景设置':
          this.isShowPopupSence = true
          break
        case '多场景清除':
          Cookies.remove('_duibaServiceGroupKey')
          window.location.reload()
          break
        case '跳转页面':
          this.isShowPopupJump = true
          break
        case 'HTTP打开':
          this.openByHttp()
          break
        case '调试打开':
          this.openByDebugger()
          break
        case '隐藏工具栏':
          this.hideDebugger()
          break
        default:
          break
      }
    },
    openByHttp() {
      window.location.protocol = 'http'
    },
    openByDebugger() {
      if (window.location.href.indexOf('?') !== -1) {
        window.location.href = window.location.href + '&debugger=true'
      } else {
        window.location.href = window.location.href + '?debugger=true'
      }
    },
    hideDebugger() {
      Cookies.remove('webview-debugger')
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.debugger-container {
  font-size: 28px;
}
.btn-toolbar {
  position: fixed;
  left: 20px;
  bottom: 0;
  height: 30px;
}
</style>
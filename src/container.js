import util from './util';
import Vue from 'vue/dist/vue.js'
import App from './App/index.vue'
import Cookies from 'js-cookie'

const container = {
  show() {
    // 工具条
    this.showToolbar()

    // vconsole
    this.showVconsole()

    // 写入cookie长久显示
    Cookies.set('webview-debugger', 'true')
  },

  showToolbar() {
    new Vue({
      el: '#app',
      render: h => h(App)
    })
  },

  showVconsole() {
    // vconsole load
    util.appendScript('//yun.tuisnake.com/h5-mami/lib/vconsole.min.js', function() {
      new VConsole();
    })
  },
}

export default container;
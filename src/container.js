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
    if (!document.querySelector('#webview-debugger')) {
      const div = document.createElement('div')
      div.id = 'webview-debugger'
      document.body.appendChild(div)
    }

    new Vue({
      el: '#webview-debugger',
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
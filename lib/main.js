import util from './util';
import Vue from 'vue/dist/vue.js'
import App from './App/index.vue'

const container = {
  show() {
    console.log(11)
    new Vue({
      el: '#app',
      render: h => h(App)
    })
  }
}

export default container;
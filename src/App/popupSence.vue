<template>
  <div class="popup-sence">
    <Popup v-model="isShow" position="top" @close="isShow=false">
      <div class="pop-container">
        <Field v-model="senceId" label-width="200" label="_duibaServiceGroupKey=miria-" placeholder="请输入场景id" ></Field>
        <Button type="primary" block class="pop-btn" @click="onClick">确定并刷新页面</Button>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Field, Button } from '@lib/vant'
import Cookies from 'js-cookie'

export default {
  components: {
    Popup,
    Field,
    Button
  },
  props: {
    show: false
  },
  data() {
    return {
      senceId: ''
    }
  },
  computed: {
    isShow: {
      get: function() {
        return this.show
      },
      set: function(newValue) {
        this.$emit('update:show', newValue)
      }
    }
  },
  methods: {
    onClick() {
      Cookies.set('_duibaServiceGroupKey', `miria-${this.senceId}`);
      this.isShow = false

      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.pop-container {
  padding: 20px;
}
.pop-btn {
  margin-top: 20px;
}
</style>
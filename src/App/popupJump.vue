<template>
  <div class="popup-jump">
    <Popup v-model="isShow" position="top" @close="isShow=false">
      <div class="pop-container">
        <Field v-model="jumpUrl" label="跳转链接" placeholder="请输入跳转链接" ></Field>
        <Button type="primary" block class="pop-btn" @click="onClick">跳转</Button>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup, Field, Button } from 'vant'

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
      jumpUrl: ''
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
      this.isShow = false
      window.location.href = this.jumpUrl
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
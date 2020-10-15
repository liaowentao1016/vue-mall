<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    // 用户传递的要跳转的路径
    path: String,
    // 用户传递的活跃状态下的文字颜色
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {}
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
  computed: {
    // 动态控制当前哪个组件处于活跃状态
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 控制处于活跃状态的文字的颜色
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 0.28rem;
}
.tab-bar-item img {
  width: 0.4rem;
  height: 0.4rem;
}
</style>

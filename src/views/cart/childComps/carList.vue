<template>
  <div class="car-list">
    <scroll class="cartScroll" ref="scroll">
      <car-list-item v-for="(item, index) in carList" :key="index" :itemInfo="item"></car-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import carListItem from './carListItem'

import scroll from 'components/common/scroll/scroll'

export default {
  computed: {
    ...mapGetters(['carList'])
  },
  components: {
    carListItem,
    scroll
  },
  // 当组件处于活跃状态时触发 与keep-alive配合使用
  activated() {
    // 重新计算可滚动高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.car-list {
  height: calc(100% - 1.86rem);
}
.cartScroll {
  height: 100%;
  overflow: hidden;
}
</style>

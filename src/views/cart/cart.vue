<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ carListLength }})</div>
    </nav-bar>
    <car-list />
    <bottom-bar />
  </div>
</template>

<script>
import navBar from 'components/common/navbar/navBar'

import carList from './childComps/carList'

import bottomBar from './childComps/BottomBar'

// 通过mapGetters函数将当前组件需要的getters，映射为当前组件的计算属性
import { mapGetters } from 'vuex'

export default {
  components: {
    navBar,
    carList,
    bottomBar
  },
  computed: {
    ...mapGetters(['carListLength'])
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
}
</style>

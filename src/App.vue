<template>
  <div id="app">
    <router-view />
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 导入组件
import MainTabBar from 'components/content/mainTabBar/mainTabBar'
export default {
  // 注册组件
  components: {
    MainTabBar
  }
}
</script>

<style  scoped>
@import url('./assets/css/base.css');
</style>

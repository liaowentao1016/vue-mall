<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="backImg" />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item, index) in title"
          :key="index"
          class="detailNavBarItem"
          :class="{ active: index === currentIndex }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 导入导航组件
import navBar from 'components/common/navbar/navBar'
export default {
  components: {
    navBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style scoped>
.center {
  display: flex;
  font-size: 0.28rem;
}
.detailNavBarItem {
  flex: 1;
}
.backImg {
  margin-top: 0.2rem;
}
.active {
  color: var(--color-high-text);
}
</style>

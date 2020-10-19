<template>
  <div>
    <!--详情页轮播-->
    <swiper class="swiper-container">
      <swiper-item v-for="(item, index) in topImg" :key="index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import swiper from 'components/common/swiper/swiper'
import swiperItem from 'components/common/swiper/swiperItem'

export default {
  props: {
    topImg: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    swiper,
    swiperItem
  }
}
</script>

<style scoped>
.swiper-container {
  height: 6rem;
}
</style>

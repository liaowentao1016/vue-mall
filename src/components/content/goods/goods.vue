<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goodsList"
      :key="index"
      :goodsItem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  props: ['goodsList'],
  data() {
    return {}
  },
  components: {
    GoodsListItem
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

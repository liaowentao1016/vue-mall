<template>
  <div class="contentdetail">
    <goods :goodsList="contentDetail" />
  </div>
</template>

<script>
import Goods from 'components/content/goods/goods'

export default {
  props: {
    contentDetail: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Goods
  }
}
</script>

<style  scoped>
</style>

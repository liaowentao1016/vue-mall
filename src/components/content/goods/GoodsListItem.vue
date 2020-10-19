<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImg" alt="" @load="itemImgLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goodsItem'],
  methods: {
    // 监听每张图片加载完成 用于重新计算Better-Scroll的可滚动高度
    itemImgLoad() {
      // 利用事件总线发射方法
      this.$bus.$emit('itemImgLoad')
    },
    goodsItemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 0.8rem;
  position: relative;
  width: 48%;
}
.goods-item img {
  width: 100%;
}

.goods-info {
  font-size: 0.24rem;
  position: absolute;
  bottom: 0.1rem;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.06rem;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 0.4rem;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -0.3rem;
  top: 0;
  width: 0.28rem;
  height: 0.28rem;
  background: url('~assets/img/common/collect.svg') 0 0/0.28rem 0.28rem;
}
</style>

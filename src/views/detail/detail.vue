<template>
  <div class="detail">
    <detail-nav-bar @itemClick="itemClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-wrapper" ref="scroll" :probeType="3" @scroll="scroll">
      <detail-swiper :topImg="topImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-params-info
        :paramInfo="paramInfo"
        ref="params"
      ></detail-params-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods :goodsList="recommend" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <!--返回顶部组件 .native监听组件的原生事件-->
    <go-top @click.native="goTopClick" v-show="isShowGoTop"></go-top>
  </div>
</template>

<script>
import detailNavBar from './childComponent/detailNavBar'
import detailSwiper from './childComponent/detailSwiper'
import detailBaseInfo from './childComponent/DetailBaseInfo'
import detailShopInfo from './childComponent/DetailShopInfo'
import detailGoodsInfo from './childComponent/DetailGoodsInfo'
import detailParamsInfo from './childComponent/DetailParamInfo'
import detailCommentInfo from './childComponent/DetailCommentInfo'
import detailBottomBar from './childComponent/DetailBottomBar'

import scroll from 'components/common/scroll/scroll'

import goods from 'components/content/goods/goods'

import {
  getDetailDataById,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail'

import { itemImgLoadMix, backTop } from 'common/mixin'

export default {
  name: 'detail',
  data() {
    return {
      id: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      navBarOffsetTop: [],
      currentIndex: 0
    }
  },
  mixins: [itemImgLoadMix, backTop],
  created() {
    this.id = this.$route.params.id
    // 发送网络请求 向服务端索要对应商品的数据
    this.getDetailData()
    // 发送网络请求 向服务端请求推荐商品的数据
    this.getRecommend()
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamsInfo,
    detailCommentInfo,
    detailBottomBar,
    scroll,
    goods
  },
  methods: {
    async getDetailData() {
      const res = await getDetailDataById(this.id)
      const data = res && res.result
      // 轮播图数据
      this.topImg = data.itemInfo && data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      // 获取商品详细信息
      this.detailInfo = data.detailInfo
      // 获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 获取评论信息
      if (data.rate.cRate > 0) {
        this.commentInfo = data.rate.list[0]
      }
      console.log(res)
      console.log(this.commentInfo)
    },
    imgLoad() {
      // 图片加载完成重新计算高度
      this.$refs.scroll.refresh()
      // 获取nav-bar正确的offsetTop值
      this.getOffsetTop()
    },
    // 获取推荐商品数据
    async getRecommend() {
      const result = await getRecommend()
      console.log(result)
      this.recommend = result.data.list
    },
    // 点击nav-bar的点击事件 滚动到对应的位置
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navBarOffsetTop[index])
    },

    // 获取navbar对应的位置
    getOffsetTop() {
      this.navBarOffsetTop = []
      this.navBarOffsetTop.push(
        ...[
          0,
          this.$refs.params.$el.offsetTop,
          this.$refs.comment.$el.offsetTop,
          this.$refs.recommend.$el.offsetTop,
          Number.MAX_VALUE
        ]
      )
    },
    // 监听滑动事件
    scroll(position) {
      const positionY = Math.abs(position.y)

      // 控制返回顶部组件的显示与隐藏
      this.isShowGoTop = positionY >= 1000

      for (let i = 0; i < this.navBarOffsetTop.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.navBarOffsetTop[i] &&
          positionY < this.navBarOffsetTop[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    // 加入购物车
    addToCart() {
      // 获取加入购物车商品的数据
      const carData = {}
      carData.image = this.topImg[0]
      carData.title = this.goods.title
      carData.desc = this.goods.desc
      carData.price = this.goods.realPrice
      carData.iid = this.id
      // 将商品添加到购物车
      this.$store.dispatch('addCar', carData).then(res => {
        // 添加购物车操作完成之后弹出提示信息
        this.$toast.show(res)
      })
    }
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-wrapper {
  height: calc(100% - 1.86rem);
  overflow: hidden;
}
</style>

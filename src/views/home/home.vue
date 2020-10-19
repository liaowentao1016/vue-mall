<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街APP</div>
    </nav-bar>

    <!--用于吸顶效果的tabControl-->
    <tab-control
      :title="['流行', '新款', '精选']"
      @tabControlClick="tabControlClick"
      ref="tabControl1"
      v-show="isShowTabControl"
      class="tabControl1"
    ></tab-control>

    <scroll
      class="wrapper"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scrollContnet"
      @pullingUp="pullingUp"
    >
      <!--轮播-->
      <swiper class="swiper-box" @swiperImgLoad="swiperImgLoad">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="swiperImgLoad" />
          </a>
        </swiper-item>
      </swiper>

      <!--推荐-->
      <recommend :recommend="recommend"></recommend>

      <!--本周流行-->
      <feature-view></feature-view>

      <!--选项卡-->
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabControlClick="tabControlClick"
        ref="tabControl2"
      ></tab-control>

      <!--商品的展示-->
      <goods :goodsList="showGoods" />
    </scroll>

    <!--返回顶部组件 .native监听组件的原生事件-->
    <go-top @click.native="goTopClick" v-show="isShowGoTop"></go-top>
  </div>
</template>

<script>
// 导入组件
import NavBar from 'components/common/navbar/navBar'
import swiper from 'components/common/swiper/swiper'
import swiperItem from 'components/common/swiper/swiperItem'
import recommend from 'views/home/childrenComponents/recommend'
import featureView from 'views/home/childrenComponents/featureView'
import goods from 'components/content/goods/goods'
import scroll from 'components/common/scroll/scroll'

import tabControl from 'components/content/tabControl/tabControl'

import { getHomeData, getHomeGoods } from 'network/home'

import { itemImgLoadMix, backTop } from 'common/mixin'

export default {
  name: 'carrousel',
  data() {
    return {
      // 首页轮播图数据
      banners: [],
      // 首页推荐数据
      recommend: [],
      // 商品数据列表
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      // 默认展示pop的数据
      currentType: 'pop',
      // 储存tabControl的offsetTop值
      tabControlOffsetTop: 0,
      // 控制吸顶效果的TabControl的显示与隐藏
      isShowTabControl: false,
      // 用于保存滑动的位置
      saveScrollY: 0
    }
  },
  mixins: [itemImgLoadMix, backTop],
  // 注册组件
  components: {
    NavBar,
    swiper,
    swiperItem,
    recommend,
    featureView,
    tabControl,
    goods,
    scroll
  },
  created() {
    this.getHomeDataComp()
    // 获取商品数据 先获取每个类型的第一页数据
    this.getHomeGoodsComp('pop')
    this.getHomeGoodsComp('new')
    this.getHomeGoodsComp('sell')
  },
  mounted() {
    // 由于该函数要被执行多次可以对其进行防抖处理
    // const refresh = debounce(this.$refs.scroll.refresh, 100)
    // // 通过事件总线监听每张图片加载完成
    // this.$bus.$on('itemImgLoad', () => {
    //   // 每一张图片加载完成都要重新计算一下Better-Scorll的可滚动高度
    //   // this.$refs.scroll.refresh()
    //   refresh()
    // })
  },
  methods: {
    // 获取轮播图数据和推荐数据
    async getHomeDataComp() {
      const result = await getHomeData()
      this.banners = result.data.banner.list
      this.recommend = result.data.recommend.list
      console.log(result)
    },
    // 获取商品数据
    async getHomeGoodsComp(type) {
      const page = this.goods[type].page
      const goods = await getHomeGoods(type, page)
      this.goods[type].list.push(...goods.data.list)
      this.goods[type].page += 1
      console.log(this.goods)
    },
    // 选项卡切换
    tabControlClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index
    },
    // 监听better-scroll的滑动事件
    scrollContnet(position) {
      // 控制返回顶部组件的显示与隐藏
      this.isShowGoTop = Math.abs(position.y) >= 1000
      // 吸顶效果(判断滑动的距离)
      this.isShowTabControl = Math.abs(position.y) >= this.tabControlOffsetTop
    },
    // 上拉加载更多
    pullingUp() {
      this.getHomeGoodsComp(this.currentType)
      // 完成了一次上拉加载确保下次上拉加载能正常实现
      this.$refs.scroll.finishPullUp()
    },
    // 吸顶效果(准确计算tabControl的offsetTop值)
    swiperImgLoad() {
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log(this.tabControlOffsetTop)
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  // 当home组件处于活跃时
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveScrollY, 0)
    this.$refs.scroll.refresh()
  },
  // 离开home组件 保存当前滑动的位置
  deactivated() {
    // 保存滑动的Y值
    this.saveScrollY = this.$refs.scroll.getScrollY()
    // 不在监听itemImgLoad事件
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style  scoped>
#home {
  height: 100vh;
}
.home-nav {
  font-size: 0.36rem;
  background-color: var(--color-tint);
  color: #fff;
}

/* .wrapper {
  overflow: hidden;
  height: calc(100% - 93px);
  margin-top: 0.88rem;
} */

.wrapper {
  position: absolute;
  top: 0.88rem;
  bottom: 0.98rem;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tabControl1 {
  position: relative;
  z-index: 9;
}
</style>

<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="tab-content">
      <tab-menu
        class="content-left"
        :tabmenu="categoryList"
        :currentIndex="currentIndex"
        @itemClick="itemClick"
      />

      <scroll class="content-right" ref="scroll">
        <tab-content-category :contentCategory="contentCategory" />
        <tab-control
          :title="['综合', '新品', '销量']"
          @tabControlClick="tabControlClick"
          ref="control"
        />
        <tab-content-detail :contentDetail="contentDetail[this.detail]" />
      </scroll>
    </div>
  </div>
</template>

<script>
// 导入公共组件
import navBar from 'components/common/navbar/navBar'
import scroll from 'components/common/scroll/scroll'
import { itemImgLoadMix } from 'common/mixin'
import TabControl from 'components/content/tabControl/tabControl'

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from 'network/category'

import TabMenu from './c-cpns/TabMenu'
import TabContentCategory from './c-cpns/TabContentCategory'
import TabContentDetail from './c-cpns/TabContentDetail'

export default {
  components: {
    navBar,
    scroll,
    TabMenu,
    TabContentCategory,
    TabContentDetail,
    TabControl
  },
  data() {
    return {
      // 当前活跃的分类下标
      currentIndex: 0,
      // 左侧TabMenu的数据
      categoryList: [],
      // 右侧上面 contentCategory数据
      contentCategory: [],
      // 右侧下面 contentDetail数据
      contentDetail: {
        pop: [],
        new: [],
        sell: []
      },
      // 当前需要显示的contentDetail的数据(默认显示综合的数据)
      detail: 'pop',
      // 获取TabControl的数据的参数类型
      typeArry: ['pop', 'new', 'sell'],
      saveScrollY: 0
    }
  },
  mixins: [itemImgLoadMix],
  async mounted() {
    // 初始化正在流行的数据
    // 调用获取tab-menu分类数据的方法
    await this.getCategoryList()
    // 调用获取TabcontentCategory数据 (默认获取的是正在流行)
    await this.getCoentCategory(this.categoryList[this.currentIndex].maitKey)
    // 调用获取contentDetail数据的方法 (默认获取的是正在流行)
    await this.getCoentDetail(this.categoryList[this.currentIndex].miniWallkey)
  },
  methods: {
    // 获取 TabMenu数据
    async getCategoryList() {
      const res = await getCategory()
      this.categoryList = res.data && res.data.category.list
    },

    // 获取当前活跃分类对应的subCategory数据
    async getCoentCategory(maitKey) {
      const res = await getSubcategory(maitKey)
      this.contentCategory = res.data && res.data.list
    },

    // 获取当前活跃分类对应的CoentDetail数据
    async getCoentDetail(miniWallkey) {
      for (const item of this.typeArry) {
        const res = await getCategoryDetail(miniWallkey, item)
        this.contentDetail[item] = res && res
      }
    },

    // 切换分类
    async itemClick(index) {
      // 回到当前分类的顶部
      this.$refs.scroll.scrollTo(0, 0, 0)
      // 默认显示分类的综合数据
      this.$refs.control.currentIndex = 0
      this.detail = 'pop'
      // 改变当前活跃分类的下标
      this.currentIndex = index
      // 获取最新的请求参数
      const maitKey = this.categoryList[this.currentIndex].maitKey
      const miniWallkey = this.categoryList[this.currentIndex].miniWallkey
      // 获取对应分类数据
      await this.getCoentCategory(maitKey)
      await this.getCoentDetail(miniWallkey)
    },

    // 切换tabControl
    tabControlClick(index) {
      this.$refs.control.currentIndex = index
      switch (index) {
        case 1:
          this.detail = 'new'
          break
        case 2:
          this.detail = 'sell'
          break
        default:
          this.detail = 'pop'
      }
    }
  },
  // 当category组件处于活跃时
  activated() {
    console.log('进入分类组件')
    this.$refs.scroll.scrollTo(0, this.saveScrollY, 0)
    this.$refs.scroll.refresh()
  },
  // 离开category组件 保存当前滑动的位置
  deactivated() {
    console.log('离开分类组件')
    // 保存滑动的Y值
    this.saveScrollY = this.$refs.scroll.getScrollY()
    // 不在监听itemImgLoad事件
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
.category {
  width: 100%;
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 16px;
  box-shadow: none;
}
.tab-content {
  display: flex;
  overflow: hidden;
  height: calc(100% - 91px);
}
.content-left {
  flex: 1;
}
.content-right {
  flex: 3;
}
</style>

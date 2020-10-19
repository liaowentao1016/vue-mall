import { debounce } from './utils'
import goTop from 'components/content/goTop/goTop'

// 导出一个混入的对象
export const itemImgLoadMix = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 监听推荐图片的加载完成事件 重新计算高度
    const newRefresh = debounce(this.$refs.scroll.refresh, 100)
    // 保存执行的函数
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log('我是混入的内容')
  }
}

// 回到顶部混入对象
export const backTop = {
  data() {
    return {
      // 控制返回顶部的显示与隐藏
      isShowGoTop: false
    }
  },
  methods: {
    goTopClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
  components: {
    goTop
  }
}

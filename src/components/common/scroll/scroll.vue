<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // $nextTick()确保DOM加载完成
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 被scroll控制的滑动区域中，开启div等Dom元素的点击功能 button按钮不需要
        click: true,
        // 值为0,1不侦测
        // 值为2:在手指滚动的过程中侦测，在手指离开的惯性滚动过程中不侦测
        // 值为3:只要是滚动都侦测
        // 实时监测滑动的位置 X,Y坐标
        probeType: this.probeType,
        // 开启上拉加载更多功能
        pullUpLoad: this.pullUpLoad
      })
      console.log(this.scroll)

      // 监听scroll的滚动事件
      this.scroll.on('scroll', position => {
        // 子组件通过自定义事件与父组件进行通信
        this.$emit('scroll', position)
      })

      // 监听上拉加载更多功能
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // 通过自定义事件将该方法的具体处理过程放到父组件去处理
          this.$emit('pullingUp')
        })
      }
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>
</style>

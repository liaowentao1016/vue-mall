<template>
  <div class="swiper-container">
    <div
      class="swiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
      :style="swiperStyle"
    >
      <div class="swiper-slide" v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="swiperImgLoad" />
        </a>
      </div>
    </div>

    <!--底部小圆点-->
    <div class="circle-box" v-if="slideCount > 1">
      <div
        class="circle"
        v-for="(item, index) in slideCount"
        :key="index"
        :class="{ circle_active: index === circleIndex }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['banners'],
  data() {
    return {
      // 底部小圆点的个数
      slideCount: 0,
      // 每次需要移动的距离也就是每个slide的宽度
      totalWidth: 0,
      // 控制当前显示哪个图片
      currentIndex: 1,
      // 控制小圆点的样式
      circleIndex: 0,
      // swiper的样式 通过transfrom控制swiper的移动
      swiperStyle: {
        transform: 'translate3d(0, 0, 0)',
        transition: 'none'
      },
      // 是否正在滚动
      scrolling: false,
      // 判断是否有一张图片加载完成
      isImgLoad: false
    }
  },
  methods: {
    // 定时器操作
    startTimer() {
      this.playTimer = window.setInterval(() => {
        this.currentIndex++
        this.circleIndex++
        this.checkCircle()
        this.scrollContent(-this.currentIndex * this.totalWidth)
      }, 3000)
    },

    stopTimer() {
      window.clearInterval(this.playTimer)
    },

    // 操作DOM 动态生成小圆点
    getCircle() {
      const swiper = document.querySelector('.swiper')
      const slide = swiper.querySelectorAll('.swiper-slide')
      this.slideCount = slide.length
      // 实现无缝轮播 在前后分别添加一个克隆的slide
      if (this.slideCount > 1) {
        // 克隆第一个元素
        const cloneFirst = slide[0].cloneNode(true)
        // 克隆最后一个元素
        const cloneLast = slide[this.slideCount - 1].cloneNode(true)
        // 将最后一个元素添加到最前面
        swiper.insertBefore(cloneLast, slide[0])
        // 将第一个元素添加到最后面
        swiper.appendChild(cloneFirst)
        this.totalWidth = slide[0].offsetWidth
      }
      // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)
      this.setTransFrom(-this.totalWidth)
      console.log(this.slideCount, this.totalWidth)
    },

    // 设置滚动的位置
    setTransFrom(position) {
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`
    },

    // 开始滚动
    scrollContent: function (currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true

      this.swiperStyle.transition = 'all .5s'

      this.setTransFrom(currentPosition)

      // 校验正确的位置
      this.checkPosition()

      // 4.滚动完成
      this.scrolling = false
    },

    // 校验正确的位置 当滚动到第一张或最后一张时 应该让它循环
    // 要等完成过渡后在进行判断
    checkPosition() {
      // 用一次性定时器模拟过度完成
      window.setTimeout(() => {
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
          this.swiperStyle.transition = 'none'
          this.setTransFrom(-this.currentIndex * this.totalWidth)
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
          this.swiperStyle.transition = 'none'
          this.setTransFrom(-this.currentIndex * this.totalWidth)
        }
      }, 500)
    },

    // 判断底部小圆点
    checkCircle() {
      if (this.circleIndex >= this.slideCount) {
        this.circleIndex = 0
      } else if (this.circleIndex < 0) {
        this.circleIndex = this.slideCount - 1
      }
    },

    // 手指触碰屏幕
    touchStart(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return
      // 停止定时器
      this.stopTimer()
      // 保存开始滚动的位置
      this.startX = e.touches[0].pageX
    },

    // 手指拖动
    touchMove(e) {
      // 计算手指移动的距离
      this.currentX = e.touches[0].pageX
      this.distance = this.currentX - this.startX
      // 当前的位置
      var currentPosition = -this.currentIndex * this.totalWidth
      // 移动后的位置
      var moveDistance = this.distance + currentPosition
      // 手指拖动时 应该让过度取消
      this.swiperStyle.transition = 'none'
      this.setTransFrom(moveDistance)
      // 阻止滚动屏幕的行为
      e.preventDefault()
    },

    // 手指离开
    touchEnd() {
      // 获取当前移动的距离
      var currentMove = Math.abs(this.distance)
      if (currentMove === 0) {
        return
      } else if (this.distance < 0 && currentMove > 100) {
        this.currentIndex++
        this.circleIndex++
        this.checkCircle()
      } else if (this.distance > 0 && currentMove > 100) {
        this.currentIndex--
        this.circleIndex--
        this.checkCircle()
      }

      // 滚动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth)

      // 将上一次移动的距离清空
      this.distance = 0

      // 重新开启定时器
      this.startTimer()
    },

    // 监听图片加载完成 用于准确计算实现吸顶效果时的offsetTop值
    swiperImgLoad() {
      if (!this.isImgLoad) {
        // 发射事件出去
        this.$emit('swiperImgLoad')
        this.isImgLoad = true
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.getCircle()
    //   this.startTimer()
    // })
    setTimeout(() => {
      this.getCircle()
      this.startTimer()
    }, 2000)
  }
}
</script>

<style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.swiper {
  display: flex;
}
.swiper-slide {
  width: 100%;
  flex-shrink: 0; /* 防止元素被挤压 */
}
.swiper-slide a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.swiper-slide img {
  width: 100%;
}

.circle-box {
  display: flex;
  position: absolute;
  left: 50%;
  bottom: 0.2rem;
  transform: translate(-50%);
}
.circle {
  margin: 0 0.1rem;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: #fff;
}
.circle_active {
  background-color: red;
}
</style>

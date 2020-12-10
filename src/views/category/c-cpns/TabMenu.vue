<template>
  <scroll ref="scroll" :bounce="false">
    <div
      class="tab-menu-item"
      :class="{ active: currentIndex === index }"
      v-for="(item, index) in tabmenu"
      :key="item.acm"
      @click="itemClick(index)"
    >
      {{ item.title }}
    </div>
  </scroll>
</template>

<script>
import scroll from 'components/common/scroll/scroll'

export default {
  components: {
    scroll
  },
  props: {
    tabmenu: {
      type: Array,
      default() {
        return []
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    tabmenu() {
      this.$nextTick(() => {
        // 重新计算可滚动高度
        this.$refs.scroll.refresh()
      })
    }
  },

  methods: {
    itemClick(index) {
      // 向外发射事件
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style scoped>
.tab-menu-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  background-color: #f6f6f6;
}
.tab-menu-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>

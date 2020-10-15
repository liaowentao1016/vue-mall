<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in title"
      :key="index"
      @click="itemClick(index)"
    >
      <span :class="{ active: currentIndex === index }">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 控制选中的状态
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.$emit('tabControlClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.28rem;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 0.1rem;
}
.active {
  color: var(--color-high-text);
  border-bottom: 0.04rem solid var(--color-high-text);
}
</style>

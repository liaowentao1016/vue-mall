<template>
  <div class="contentCategory">
    <div
      class="contentCategory-item"
      v-for="item in contentCategory"
      :key="item.acm"
    >
      <img :src="item.image" alt="" />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contentCategory: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.contentCategory {
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
}
.contentCategory-item {
  /* flex: 0 0 33.3333%; */
  flex-basis: 33.33%;
  font-size: 12px;
  color: #666;
  text-align: center;
}
.contentCategory-item img {
  width: 65px;
  height: 65px;
}
.contentCategory-item p {
  margin: 10px 0 15px;
}
</style>

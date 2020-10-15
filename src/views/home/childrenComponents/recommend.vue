<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['recommend']
}
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px;
  font-size: 0.26rem;
  border-bottom: 0.16rem solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.recommend-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.recommend-item img {
  margin-bottom: 0.16rem;
  width: 1.4rem;
  height: 1.4rem;
}
</style>

<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
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
</style>

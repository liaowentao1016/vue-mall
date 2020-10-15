<template>
  <div class="footer">
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style  scoped>
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

#tab-bar {
  display: flex;
  align-items: center;
  height: 7vh;
  background-color: #ebebeb;
  box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, 0.1);
}
</style>

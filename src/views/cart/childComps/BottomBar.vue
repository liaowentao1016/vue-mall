<template>
  <div class="bottom-menu">
    <CheckButton
      class="select-all"
      :is-active="selectAll"
      @click.native="seleteAllClick"
    ></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{ totalPrice }}</span>
    <span class="buy-product">去计算({{ cartCount }})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import { mapGetters } from 'vuex'

export default {
  name: 'BottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['carList', 'cartCount']),

    totalPrice() {
      return this.carList
        .filter(item => item.checked)
        .reduce((pro, item) => {
          return pro + item.count * item.price
        }, 0)
    },

    selectAll() {
      if (this.carList.length === 0) return false
      // 没选中的个数为0 则全选按钮选中; 没选中的个数不为0 则全选按钮不选中
      return !this.carList.find(item => !item.checked)
    }
  },
  methods: {
    seleteAllClick() {
      if (this.selectAll) {
        // 如果全部选中
        this.carList.forEach(item => {
          item.checked = false
        })
      } else {
        // 如果部分选中
        this.carList.forEach(item => {
          item.checked = true
        })
      }
    }
  }
}
</script>

<style scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
}

.bottom-menu .select-all {
  position: absolute;
  line-height: 0;
  left: 12px;
  top: 13px;
}

.bottom-menu .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.bottom-menu .buy-product {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
  float: right;
}
</style>

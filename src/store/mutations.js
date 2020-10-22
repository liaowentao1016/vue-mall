export default {
  // mutations中的每个方法尽可能完成的事件单一一点
  addCount(state, payload) {
    payload.count++
  },
  addToCar(state, payload) {
    // 默认选中商品
    payload.checked = true
    payload.count = 1
    state.carList.push(payload)
  }
}

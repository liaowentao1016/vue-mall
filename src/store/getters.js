export default {
  carListLength(state) {
    return state.carList.length
  },
  carList(state) {
    return state.carList
  },
  cartCount(state) {
    return state.carList.filter(item => item.checked).length
  }
}

export default {
  addCar(context, payload) {
    return new Promise((resolve, reject) => {
      // 判断添加的商品是不是已经在购物车里面
      const carItem = context.state.carList.find(item => item.iid === payload.iid)
      if (carItem) {
        context.commit('addCount', carItem)
        resolve('当前商品在购物车数量+1')
      } else {
        context.commit('addToCar', payload)
        resolve('添加购物车成功')
      }
    })
  }
}

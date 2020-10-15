import { request } from './request'

// 发送请求拿到首页所需的数据
export function getHomeData() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}

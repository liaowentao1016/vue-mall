import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 3000
  })

  // 响应拦截器
  instance.interceptors.response.use(
    response => {
      return response.data
    },
    err => console.log(err)
  )

  // 发送真正的网络请求 返回一个promise对象
  return instance(config)
}

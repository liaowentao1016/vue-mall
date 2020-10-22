import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import lazyload from 'vue-lazy-load'

import fastClick from 'fastclick'

import toast from 'components/common/toast'
// 注册toast插件 使用了.use方法 执行toast的install函数
Vue.use(toast)

Vue.config.productionTip = false

// 创建事件总线
Vue.prototype.$bus = new Vue()

// 解决移动端300ms的延迟问题
fastClick.attach(document.body)

// 图片懒加载
Vue.use(lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

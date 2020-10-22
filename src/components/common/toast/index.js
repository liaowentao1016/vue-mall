import Toast from './toast'

const obj = {}

obj.install = function(Vue) {
  // 1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast)
  // 2.new的方式 根据组件构造器 创建出一个新的组件对象
  const toast = new ToastConstructor()
  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是上面创建出来的div
  document.body.appendChild(toast.$el)
  // 5.再将创建出来的组件对象挂载到Vue的原型对象上
  Vue.prototype.$toast = toast
}

export default obj

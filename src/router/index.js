import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由懒加载导入组件
const Home = () => import('views/home/home')
const Cart = () => import('views/cart/cart')
const Category = () => import('views/category/category')
const Profile = () => import('views/profile/profile')

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/cart', component: Cart },
  { path: '/category', component: Category },
  { path: '/profile', component: Profile }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

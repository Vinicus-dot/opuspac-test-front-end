import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue' 
import Auth from '@/views/Auth.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/products',
      name: 'products',
      component: Products
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    }
  ],
})

export default router

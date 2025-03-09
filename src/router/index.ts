import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue' 
import Auth from '@/views/Auth.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'
import { jwtVerify } from 'jose'


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
      component: Products,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { requiresAuth: true }
    }
  ],
})

async function isAuthenticated() {
  const token = localStorage.getItem('token');
  const jwtSecret = import.meta.env.VITE_JWT_SECRET;
  
  if (!token || !jwtSecret) return false;

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;   
  }
}

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth && !await isAuthenticated()) {
    return '/auth'
  }
  return true
});

export default router

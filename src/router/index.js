import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import IndexDashboard from '@/views/dashboard/IndexDashboard.vue'
import { useAuthStore } from '@/stores/auth'
import OrderView from '@/views/dashboard/OrderView.vue'
import OrderShow from '@/views/dashboard/OrderShow.vue'
import IndexCategory from '@/views/category/IndexCategory.vue'
import ShowCategory from '@/views/category/ShowCategory.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/customer/dashboard',
      name: 'dashboard',
      component: IndexDashboard,
      meta: { auth: true }
    },
    {
      path: '/customer/order',
      name: 'order',
      component: OrderView,
      meta: { auth: true }
    },
    {
      path: '/customer/order/:snap_token',
      name: 'detail_order',
      component: OrderShow,
      meta: { auth: true }
    },
    {
      path: '/categories',
      name: 'categories',
      component: IndexCategory,
    },
    {
      path: '/categories/:slug',
      name: 'detail_category',
      component: ShowCategory,
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if(authStore.user && to.meta.guest) {
    return{ name: 'dashboard' };
  }
  if(!authStore.user && to.meta.auth) {
    return { name: 'login' }
  }
})

export default router

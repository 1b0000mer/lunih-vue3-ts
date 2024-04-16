import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import ManagementLayout from '@/layouts/management/ManagementLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/management',
      component: ManagementLayout,
      redirect: { name: 'dashboard' },
      children: [
        {
          path: '/management/dashboard',
          name: 'dashboard',
          component: () => import('../views/management/Dashboard.vue')
        }
      ]
    },
    {
      path: '/login',
      component: MainLayout,
      redirect: { name: 'login' },
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../views/Login.vue')
        }
      ]
    }
  ]
})

export default router

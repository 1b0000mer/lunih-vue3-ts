import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from '@/layouts/main/MainLayout.vue'
import ManagementLayout from '@/layouts/management/ManagementLayout.vue'
import AuthenticateService from '@/core/services/auth/authenticate.service'
import { toast } from 'vue-sonner'

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
      beforeEnter: () => {
        if (!AuthenticateService.checkRoleAdmin()) {
          toast.error('Unauthorized')
          return '/login'
        } else {
          return true
        }
      },
      redirect: { name: 'dashboard' },
      children: [
        {
          path: '/management/dashboard',
          name: 'dashboard',
          component: () => import('../views/management/Dashboard.vue')
        },
        {
          path: '/management/categories/faculty',
          name: 'faculty',
          component: () => import('../views/management/categories/faculty/FacultyList.vue')
        },
        {
          path: '/management/categories/industry',
          name: 'industry',
          component: () => import('../views/management/categories/industry/IndustryList.vue')
        },
        {
          path: '/management/categories/program',
          name: 'program',
          component: () => import('../views/management/categories/program/ProgramList.vue')
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
    },
    {
      path: '/logout',
      name: 'logout',
      component: {
        beforeRouteEnter(to, from, next) {
          AuthenticateService.doLogout()
          next('/')
        }
      }
    },
    {
      path: '/:pathMatch(.*)*',
      component: MainLayout,
      redirect: { name: '404' },
      children: [
        {
          path: '',
          name: '404',
          component: () => import('../views/Page404.vue')
        }
      ]
    }
  ],
  scrollBehavior() {
    // alway scroll on top
    return {
      top: 0
    }
  }
})

export default router

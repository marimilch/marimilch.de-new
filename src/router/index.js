import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/aboutme',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/Projects.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'home',
    component: () => import('@/views/Error404.vue')
    // how can I add exact match config here?
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

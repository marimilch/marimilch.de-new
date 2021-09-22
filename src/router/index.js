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
  // {
  //   path: '/projects',
  //   name: 'Projects',
  //   component: () => import('@/views/Projects.vue'),
  //   meta: { transition: 'Fade' },
  // },
  {
    path: '/projects/:slug?',
    name: 'Project',
    component: () => import('@/views/Projects.vue'),
    meta: { transition: 'Project' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/Error404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

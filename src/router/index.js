import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/aboutme',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsOverview.vue'),
    meta: { transition: 'Fade' },
  },
  {
    path: '/projects/:project',
    name: 'project',
    component: () => import('@/views/ProjectStory.vue'),
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

import { createRouter, createWebHistory } from 'vue-router'
import Sections from '../views/Sections.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Sections',
      component: Sections,
    },
    {
      path: '/character',
      name: 'Characters',
      component: () => import('../views/Characters.vue'),
    },
  ],
})

export default router

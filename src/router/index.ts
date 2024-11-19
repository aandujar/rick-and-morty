import { createRouter, createWebHistory } from 'vue-router'
import Sections from '@/views/Sections.vue'

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
      component: () => import('@/views/Character/Characters.vue'),
    },
    {
      path: '/character/:characterId',
      name: 'CharacterDetail',
      component: () => import('@/views/Character/CharacterDetail.vue'),
    },
  ],
})

export default router

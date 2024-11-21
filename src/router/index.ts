import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Sections',
      component: () => import('@/views/Sections.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Not found',
      component: () => import('@/views/NotFound.vue'),
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
    {
      path: '/episode',
      name: 'Episodes',
      component: () => import('@/views/Episode/Episodes.vue'),
    },
    {
      path: '/episode/:episodeId',
      name: 'EpisodeDetail',
      component: () => import('@/views/Episode/EpisodeDetail.vue'),
    },
    {
      path: '/location',
      name: 'Locations',
      component: () => import('@/views/Locations/Locations.vue'),
    },
  ],
})

export default router

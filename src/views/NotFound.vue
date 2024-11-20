<template>
  <div class="not-found">
    <img class="not-found__image" src="/src/assets/images/no-data.svg" />
    <div class="not-found__text mb-4">Requested page not exists</div>
    <v-btn density="default" @click="goSections">Go sections</v-btn>
  </div>
</template>

<script setup lang="ts">
import { SECTIONS } from '@/router/routerInterfaces'
import { useRouter } from 'vue-router'
const router = useRouter()

function goSections() {
  router.push(SECTIONS)
}
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__image {
    height: 300px;
    width: 300px;
  }

  &__text {
    font-size: 1.1rem;
    font-weight: 540;
  }
}
</style>

<template>
  <div class="character-detail">
    <Transition name="fade" mode="out-in">
      <div
        v-if="loading"
        key="loader"
        class="character-detail__loader pt-8 px-4"
      >
        <v-skeleton-loader height="400px" width="80%" type="card" />
      </div>
      <div v-else key="content" class="character-detail__content">
        <v-col cols="12" xs="12">
          <CharacterComplete
            :characterModel="characterStore.characterDetail"
            @goBack="goCharacters"
          />
        </v-col>
        <v-col cols="12" xs="12">
          <CharacterEpisodes :episodes="characterStore.characterDetail.episode"
        /></v-col>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import type { Character } from '@/classes/Character'
import CharacterComplete from '@/components/Character/CharacterComplete.vue'
import CharacterEpisodes from '@/components/Character/CharacterEpisodes.vue'
import { CHARACTERS } from '@/router/routerInterfaces'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const characterStore = useCharacterStore()

const loading = ref<boolean>(true)

onMounted(getCharacter)

onBeforeUnmount(() => characterStore.setCharacter({} as Character))

function getCharacter(): void {
  loading.value = true

  characterStore
    .getCharacterById(Number(route.params.characterId))
    .finally(() => setTimeout(() => (loading.value = false), 2000))
}

function goCharacters(): void {
  router.push(CHARACTERS)
}
</script>

<style lang="scss">
.character-detail {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  &__loader {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .v-skeleton-loader__image.v-skeleton-loader__bone {
      height: 400px;
      border-radius: 4px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>

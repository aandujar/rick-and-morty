<template>
  <div class="character-detail">
    <Transition name="fade" mode="out-in">
      <div
        v-if="loading"
        key="loader"
        class="character-detail__loader pt-8 px-4"
      >
        <v-skeleton-loader
          height="400px"
          width="80%"
          type="card"
          style="border-radius: 4px"
        />
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
import { useRoute } from 'vue-router'
import CharacterComplete from '@/components/CharacterComplete.vue'
import CharacterEpisodes from '@/components/CharacterEpisodes.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const characterStore = useCharacterStore()
const route = useRoute()

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
  router.push('/character')
}
</script>

<style lang="scss" scoped>
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
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>

<template>
  <div class="character-detail">
    <v-snackbar
      v-model="showError"
      :timeout="5000"
      location="top"
      color="red"
      height="100px"
    >
      No character found
    </v-snackbar>
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
          <CharacterEpisodes :episodes="episodeStore.episodesDetail"
        /></v-col>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useEpisodeStore } from '@/stores/episodeStore'
import { Character } from '@/classes/Character'
import CharacterComplete from '@/components/Character/CharacterComplete.vue'
import CharacterEpisodes from '@/components/Character/CharacterEpisodes.vue'
import { CHARACTERS, EPISODES } from '@/router/routerInterfaces'
import { useRouter, useRoute } from 'vue-router'
import { emitter } from '@/emitter/emitter'

const router = useRouter()
const route = useRoute()
const characterStore = useCharacterStore()
const episodeStore = useEpisodeStore()

const loading = ref<boolean>(true)
const showError = ref<boolean>(false)

emitter.on('goEpisodeDetail', goToEpisodeDetail)

onMounted(getCharacter)

onBeforeUnmount(() => characterStore.setCharacter({} as Character))

onBeforeUnmount(() => {
  characterStore.setCharacter({} as Character)
  episodeStore.setEpisodesDetail([])
  emitter.off('goEpisodeDetail')
})

function getCharacter(): void {
  loading.value = true

  characterStore
    .getCharacterById(Number(route.params.characterId))
    .then(getEpisodes)
    .catch(() => {
      showError.value = true
      setTimeout(goCharacters, 2000)
    })
    .finally(() => setTimeout(() => (loading.value = false), 2000))
}

function getEpisodes(): void {
  if (characterStore.characterDetail.episode.length > 1) {
    const episodesId: string = characterStore.characterDetail.episode
      .map((episode: string) => episode.split('/episode/')[1])
      .join(',')

    episodeStore
      .getEpisodesById(episodesId)
      .catch(() => {
        showError.value = true
        setTimeout(goCharacters, 2000)
      })
      .finally(() => setTimeout(() => (loading.value = false), 2000))
  } else {
    episodeStore
      .getEpisodeByIdForDetail(
        Number(characterStore.characterDetail.episode[0].split('/episode/')[1]),
      )
      .catch(() => {
        showError.value = true
        setTimeout(goCharacters, 2000)
      })
      .finally(() => setTimeout(() => (loading.value = false), 2000))
  }
}

function goCharacters(): void {
  router.push(CHARACTERS)
}

function goToEpisodeDetail(episodeId: number): void {
  router.push(`${EPISODES}/${episodeId}`)
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

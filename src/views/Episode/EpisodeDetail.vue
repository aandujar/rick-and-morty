<template>
  <div class="episode-detail">
    <v-snackbar
      v-model="showError"
      :timeout="5000"
      location="top"
      color="red"
      height="100px"
    >
      No episode found
    </v-snackbar>
    <Transition name="fade" mode="out-in">
      <div v-if="loading" key="loader" class="episode-detail__loader pt-8 px-4">
        <v-skeleton-loader height="400px" width="80%" type="card" />
      </div>
      <div v-else key="content" class="episode-detail__content">
        <v-col cols="12" xs="12">
          <EpisodeComplete
            :episodeModel="episodeStore.episodeDetail"
            @goBack="goEpisodes"
          />
        </v-col>
        <v-col cols="12" xs="12">
          <EpisodeCharacters :characters="characterStore.charactersDetail"
        /></v-col>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEpisodeStore } from '@/stores/episodeStore'
import { useCharacterStore } from '@/stores/characterStore'
import { Episode } from '@/classes/Episode'
import EpisodeComplete from '@/components/Episode/EpisodeComplete.vue'
import EpisodeCharacters from '@/components/Episode/EpisodeCharacters.vue'
import { EPISODES, CHARACTERS } from '@/router/routerInterfaces'
import { useRouter, useRoute } from 'vue-router'
import { emitter } from '@/emitter/emitter'

const router = useRouter()
const route = useRoute()
const episodeStore = useEpisodeStore()
const characterStore = useCharacterStore()

const loading = ref<boolean>(true)
const showError = ref<boolean>(false)

emitter.on('goCharacterDetail', goToCharacterDetail)

onMounted(getEpisode)

onBeforeUnmount(() => {
  episodeStore.setEpisode({} as Episode)
  characterStore.setCharactersDetail([])
})

function getEpisode(): void {
  loading.value = true

  episodeStore
    .getEpisodeById(Number(route.params.episodeId))
    .then(getCharacters)
    .catch(() => {
      showError.value = true
      setTimeout(goEpisodes, 2000)
    })
}

function getCharacters(): void {
  const charactersId: string = episodeStore.episodeDetail.characters
    .map((character: string) => character.split('/character/')[1])
    .join(',')

  characterStore
    .getCharactersById(charactersId)
    .catch(() => {
      showError.value = true
      setTimeout(goEpisodes, 2000)
    })
    .finally(() => setTimeout(() => (loading.value = false), 2000))
}

function goEpisodes(): void {
  router.push(EPISODES)
}

function goToCharacterDetail(characterId: number): void {
  router.push(`${CHARACTERS}/${characterId}`)
}
</script>

<style lang="scss">
.episode-detail {
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

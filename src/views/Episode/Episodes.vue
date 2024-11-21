<template>
  <div class="episodes">
    <Transition name="fade" mode="out-in">
      <div v-show="loading" key="loading" class="episodes__content">
        <div
          v-for="index in 20"
          :key="index"
          class="episodes__content__loading"
        >
          <v-skeleton-loader type="image" width="280px" height="200px" />
        </div>
      </div>
    </Transition>
    <Transition name="fade" mode="out-in">
      <div v-show="!loading" key="content" class="episodes__content">
        <div class="episodes__content__pagination text-center pa-2">
          <EpisodeFilterComponent @input="setEpisodeFilter" @goBack="goBack" />
        </div>
        <div
          v-if="!episodeStore.episodes || episodeStore.episodes.length === 0"
          class="episodes__content__no-data pa-8"
        >
          <img
            class="episodes__content__no-data__image"
            src="/src/assets/images/no-data.svg"
          />
          <div class="episodes__content__no-data__text">No episodes found</div>
        </div>
        <Episode
          v-for="episode in episodeStore.episodes"
          :key="episode.id"
          :episodeModel="episode"
          @input="goEpisodeDetail"
        />
        <div class="episodes__content__pagination text-center">
          <v-pagination
            class="cursor-pointer"
            v-model="currentPage"
            :length="totalPages"
            :total-visible="totalPages <= 8 ? totalPages : 8"
            @update:model-value="getEpisodes"
          ></v-pagination>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useEpisodeStore } from '@/stores/episodeStore'
import { InfoApi } from '@/classes/InfoApi'
import { EpisodeFilter } from '@/classes/EpisodeFilter'
import Episode from '@/components/Episode/Episode.vue'
import EpisodeFilterComponent from '@/components/Episode/EpisodeFilter.vue'
import { useRouter } from 'vue-router'
import { SECTIONS, EPISODES } from '@/router/routerInterfaces'
const router = useRouter()

const episodeStore = useEpisodeStore()

const loading = ref<boolean>(true)
const totalElements = ref<number>(0)
const totalPages = ref<number>(0)
const currentPage = ref<number>(1)

const episodeFilter: EpisodeFilter = new EpisodeFilter(0, '', '')

onMounted(getEpisodes)

onBeforeUnmount(() => episodeStore.setEpisodes([]))

function setEpisodeFilter(name: string, episode: string): void {
  episodeFilter.name = name
  episodeFilter.episode = episode
  currentPage.value = 1
  getEpisodes()
}

function getEpisodes(): void {
  loading.value = true
  episodeFilter.page = currentPage.value - 1

  episodeStore
    .getEpisodes(episodeFilter)
    .then((infoApi: InfoApi) => {
      totalElements.value = infoApi.count
      totalPages.value = infoApi.pages
    })
    .catch(() => {
      totalElements.value = 0
      totalPages.value = 0
    })
    .finally(() => {
      setTimeout(() => (loading.value = false), 2000)
    })
}

function goEpisodeDetail(episodeId: number): void {
  router.push(`${EPISODES}/${episodeId}`)
}

function goBack(): void {
  router.push(SECTIONS)
}
</script>

<style lang="scss">
.episodes {
  height: 100vh;
  width: 100vw;
  overflow-y: auto;

  &__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    padding: 20px;

    &__loading {
      margin: 10px;
      height: 200px;
      width: 280px;

      .v-skeleton-loader__image.v-skeleton-loader__bone {
        height: 200px;
        border-radius: 4px;
      }
    }

    &__pagination {
      margin: 20px;
      width: 100%;
    }

    &__no-data {
      min-height: 80%;
      width: 100%;
      display: flex;
      flex-direction: column;
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
  }

  @media (max-width: 420px) {
    &__content {
      justify-content: center;
    }
  }
}
</style>

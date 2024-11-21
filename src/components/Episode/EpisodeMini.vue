<template>
  <div>
    <v-card hover v-ripple class="episode-mini" @click="goToDetail">
      <div class="episode-mini__image">
        <img class="episode-mini__image__item" :src="episode.image" />
      </div>
      <div class="episode-mini__text pa-2">
        {{ episode.episode }}
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/classes/Episode'
import { emitter } from '@/emitter/emitter'
import { ref } from 'vue'

const props = defineProps<{
  episodeModel: Episode
}>()

const episode = ref<Episode>(
  new Episode(
    props.episodeModel.id,
    props.episodeModel.name,
    props.episodeModel.air_date,
    props.episodeModel.episode,
    props.episodeModel.characters,
  ),
)

function goToDetail(): void {
  emitter.emit('goEpisodeDetail', episode.value.id)
}
</script>

<style lang="scss" scoped>
.episode-mini {
  min-height: 250px;
  width: 250px;
  border-radius: 10px;

  &__image {
    height: 170px;
    width: 100%;

    &__item {
      object-position: center center;
      object-fit: cover;
      height: 170px;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }

  &__text {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
}
</style>

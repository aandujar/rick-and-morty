<template>
  <div>
    <v-card class="episode" hover v-ripple @click="goDetail">
      <div class="episode__img">
        <img class="episode__img__item" :src="episode.image" />
      </div>
      <div class="episode__content">
        <div class="episode__content__title">
          {{ episode.episode }}
        </div>
        <div class="episode__content__subtitle">
          {{ episode.name }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/classes/Episode'
import { ref } from 'vue'

const emit = defineEmits(['input'])

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

function goDetail(): void {
  emit('input', episode.value.id)
}
</script>

<style lang="scss" scoped>
.episode {
  height: 160px;
  width: 350px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;

  &__img {
    height: 160px;
    width: 50%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    &__item {
      object-position: center center;
      object-fit: cover;
      height: 160px;
      width: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  &__content {
    height: 100%;
    width: 50%;
    padding: 10px;

    &__title {
      font-weight: 600;
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    &__subtitle {
      font-size: 1rem;
      font-weight: 550;
      margin-bottom: 5px;
    }
  }
}

@media (max-width: 400px) {
  .episode {
    width: 280px;
  }
}
</style>

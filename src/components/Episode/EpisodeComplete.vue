<template>
  <div>
    <v-card class="episode-complete" hover>
      <div class="episode-complete__img">
        <img
          class="episode-complete__img__item"
          :src="props.episodeModel.image"
        />
      </div>
      <div class="episode-complete__content">
        <div class="episode-complete__content__title mb-4">
          <v-btn
            icon="mdi-arrow-left-thin"
            size="medium"
            class="mr-2"
            @click="goBack"
          ></v-btn>
          <div class="episode-complete__content__title__item mr-2">
            {{ props.episodeModel.episode }}
          </div>
        </div>
        <div class="episode-complete__content__title mb-4">
          <div class="episode-complete__content__title__item mr-2">
            {{ props.episodeModel.name }}
          </div>
        </div>
        <div class="episode-complete__content__subtitle mb-4">
          <span class="episode-complete__content__subitle--small mr-1"
            >Date:</span
          >
          <div class="episode-complete__content__subtitle--big">
            {{ props.episodeModel.air_date }}
          </div>
        </div>
        <div class="episode-complete__content__subtitle mb-4">
          <span class="episode-complete__content__subitle--small mr-1"
            >Characters:</span
          >
          <div class="episode-complete__content__subtitle--big">
            {{ props.episodeModel.characters.length }}
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Episode } from '@/classes/Episode'

const emit = defineEmits(['goBack'])

const props = defineProps<{
  episodeModel: Episode
}>()

function goBack() {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.episode-complete {
  height: 252px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;
  cursor: auto;

  &__img {
    height: 252px;
    width: 40%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    &__item {
      object-position: center center;
      object-fit: cover;
      height: 252px;
      width: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
  &__content {
    height: 252px;
    width: 60%;
    padding: 10px;
    display: flex;
    flex-direction: column;

    &__title {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      &__item {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }

    &__subtitle {
      display: flex;
      flex-direction: row;
      margin-bottom: 5px;

      &--big {
        font-weight: 550;
        font-size: 1.1rem;
      }

      &--small {
        font-weight: 4500;
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: 420px) {
  .episode-complete {
    min-height: 500px;
    width: 100%;
    display: flex;
    flex-direction: column;

    &__img {
      height: 200px;
      width: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      &__item {
        object-position: center center;
        object-fit: cover;
        height: 200px;
        width: 100%;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }

    &__content {
      min-height: 200px;
      width: 100%;
      padding: 10px;

      &__block {
        width: 100%;
      }
    }
  }
}
</style>

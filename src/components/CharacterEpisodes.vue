<template>
  <div>
    <v-card
      class="character-episodes pa-4"
      :class="{
        'character-episodes--opened': openPanel,
        'character-episodes--closed': !openPanel,
      }"
      hover
    >
      <div class="character-episodes__header">
        <span class="character-episodes__header__text">Episodes</span>
        <Transition name="fade" mode="out-in">
          <v-btn
            v-if="openPanel"
            icon="mdi-arrow-up"
            size="medium"
            @click="togglePanel"
          ></v-btn>
          <v-btn
            v-else
            icon="mdi-arrow-down"
            size="medium"
            @click="togglePanel"
          ></v-btn>
        </Transition>
      </div>
      <div
        class="character-episodes__content py-4"
        :class="{
          'character-episodes__content--shown': openPanel,
          'character-episodes__content--hidded': !openPanel,
        }"
      >
        <div
          v-if="!episodes || episodes.length === 0"
          class="character-episodes__content__text"
        >
          No episodes
        </div>
        <div
          v-for="(episode, index) in episodes"
          :key="index"
          class="character-episodes__content__text ma-4"
        >
          {{ `Episode ${getNumberEpisode(episode)}` }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  episodes: string[]
}>()

const openPanel = ref<boolean>(false)

function togglePanel(): void {
  openPanel.value = !openPanel.value
}

function getNumberEpisode(episode: string): string {
  return episode.split('episode/')[1]
}
</script>

<style lang="scss" scoped>
.character-episodes {
  width: 100%;
  border-radius: 10px;
  cursor: auto;

  &--opened {
    max-height: 8000px;
    transition: max-height 0.5s ease-in-out;
  }

  &--closed {
    max-height: 90px;
    transition: max-height 1s ease-in-out;
  }

  &__header {
    display: flex;
    flex-direction: row;
    height: 60px;
    justify-content: space-between;
    align-items: center;

    &__text {
      font-size: 1.2rem;
      font-weight: 550;
    }
  }

  &__content {
    min-height: 80px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &--shown {
      opacity: 1;
      transition: opacity 1s ease-in-out;
    }

    &--hidded {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    &__text {
      font-size: 1.1rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>

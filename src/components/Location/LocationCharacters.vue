<template>
  <div>
    <v-card
      class="location-characters pa-4"
      :class="{
        'location-characters--opened': openPanel,
        'location-characters--closed': !openPanel,
      }"
      hover
    >
      <div class="location-characters__header">
        <span class="location-characters__header__text">Characters</span>
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
        class="location-characters__content py-4"
        :class="{
          'location-characters__content--shown': openPanel,
          'location-characters__content--hidded': !openPanel,
        }"
      >
        <div
          v-if="!characters || characters.length === 0"
          class="location-characters__content__text"
        >
          No characters
        </div>
        <CharacterMini
          v-for="(character, index) in characters"
          :key="index"
          :character="character"
          class="ma-4"
        >
        </CharacterMini>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Character } from '@/classes/Character'
import CharacterMini from '@/components/Character/CharacterMini.vue'
import { ref } from 'vue'

const props = defineProps<{
  characters: Character[]
}>()

const openPanel = ref<boolean>(false)

function togglePanel(): void {
  openPanel.value = !openPanel.value
}
</script>

<style lang="scss" scoped>
.location-characters {
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
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;

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

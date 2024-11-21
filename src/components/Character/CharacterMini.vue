<template>
  <div>
    <v-card hover v-ripple class="character-mini" @click="goToDetail">
      <div class="character-mini__image">
        <img class="character-mini__image__item" :src="props.character.image" />
      </div>
      <div class="character-mini__text pa-2">
        {{ props.character.name }}
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Character } from '@/classes/Character'

import { emitter } from '@/emitter/emitter'

const props = defineProps<{
  character: Character
}>()

function goToDetail(): void {
  emitter.emit('goCharacterDetail', props.character.id)
}
</script>

<style lang="scss" scoped>
.character-mini {
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

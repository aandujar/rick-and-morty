<template>
  <div>
    <v-card class="character" hover v-ripple @click="goDetail">
      <div class="character__img">
        <img class="character__img__item" :src="character.image" />
      </div>
      <div class="character__content">
        <div class="character__content__title">
          {{ character.name }}
        </div>
        <CharacterStatus
          :status="character.status"
          style="margin-bottom: 10px"
        />
        <div class="character__content__subtitle">
          {{ character.species }}
        </div>
        <div class="character__content__subtitle">
          {{ character.gender }}
        </div>
        <div class="character__content__subtitle">
          {{ character.origin }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Character } from '@/classes/Character'
import { CharacterLocation } from '@/classes/CharacterLocation'
import CharacterStatus from '@/components/CharacterStatus.vue'
import { ref } from 'vue'

const emit = defineEmits(['input'])

const props = defineProps<{
  characterModel: Character
}>()

const character = ref<Character>(
  new Character(
    props.characterModel.id,
    props.characterModel.name,
    props.characterModel.status,
    props.characterModel.species,
    props.characterModel.type,
    props.characterModel.gender,
    props.characterModel.image,
    props.characterModel.origin
      ? new CharacterLocation(
          props.characterModel.origin.name,
          props.characterModel.origin.url,
        )
      : undefined,
  ),
)

function goDetail(): void {
  emit('input', character.value.id)
}
</script>

<style lang="scss" scoped>
.character {
  height: 252px;
  width: 350px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;

  &__img {
    height: 252px;
    width: 170px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    &__item {
      object-position: center center;
      object-fit: cover;
      height: 252px;
      width: 170px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  &__content {
    height: 252px;
    width: 180px;
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

@media (max-width: 420px) {
  .character {
    height: 400px;
    width: 300px;
    display: flex;
    flex-direction: column;

    &__img {
      height: 200px;
      width: 300px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;

      &__item {
        object-position: center center;
        object-fit: cover;
        height: 200px;
        width: 300px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
    }

    &__content {
      height: 200px;
      width: 300px;
      padding: 10px;
    }
  }
}
</style>

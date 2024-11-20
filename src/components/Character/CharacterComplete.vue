<template>
  <div>
    <v-card class="character-complete" hover>
      <div class="character-complete__img">
        <img
          class="character-complete__img__item"
          :src="props.characterModel.image"
        />
      </div>
      <div class="character-complete__content">
        <div class="character-complete__content__title">
          <v-btn
            icon="mdi-arrow-left-thin"
            size="medium"
            class="mr-2"
            @click="goBack"
          ></v-btn>
          <div class="character-complete__content__title__item mr-2">
            {{ props.characterModel.name }}
          </div>
          <CharacterStatus
            class="pt-4"
            :status="props.characterModel.status"
            style="margin-bottom: 10px"
          />
        </div>
        <div class="character-complete__content__block">
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Specie:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.species }}
            </div>
          </div>
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Gender:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.gender }}
            </div>
          </div>
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Type:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.type }}
            </div>
          </div>
        </div>
        <div class="character-complete__content__block">
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Origin:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.origin }}
            </div>
          </div>
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Last seen on:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.location }}
            </div>
          </div>
          <div class="character-complete__content__block__subtitle">
            <span
              class="character-complete__content__block__subitle--small mr-1"
              >Episodes:</span
            >
            <div class="character-complete__content__block__subtitle--big">
              {{ props.characterModel.episode.length }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Character } from '@/classes/Character'
import CharacterStatus from '@/components/Character/CharacterStatus.vue'

const emit = defineEmits(['goBack'])

const props = defineProps<{
  characterModel: Character
}>()

function goBack() {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.character-complete {
  height: 252px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;
  cursor: auto;

  &__img {
    height: 252px;
    width: 30%;
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
    width: 70%;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &__title {
      margin-bottom: 5px;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;

      &__item {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }

    &__block {
      width: 50%;

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
}

@media (max-width: 420px) {
  .character-complete {
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

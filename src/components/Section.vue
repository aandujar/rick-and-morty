<template>
  <div class="section">
    <Transition name="fade" mode="out-in">
      <div v-if="loading" key="loader" class="section__loader">
        <v-skeleton-loader height="260px" width="280px" type="image" />
      </div>
      <div v-else key="content">
        <v-card class="section__content" hover v-ripple>
          <div class="section__content__img">
            <v-img
              height="100%"
              width="100%"
              :src="`/src/assets/images/${getImage}`"
            />
          </div>
          <div class="section__content__text">
            {{ section.name }}
          </div>
        </v-card>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Section } from '@/classes/Section.ts'
import { SectionEnum } from '@/enum/SectionEnum.ts'

const props = defineProps<{
  section: Section
  loading: boolean
}>()

const images = import.meta.glob('@/assets/images/*', { eager: true })

const getImage = computed<string>(() => {
  let img

  switch (props.section.code) {
    case SectionEnum.CHARACTER:
      img = 'character.png'
      break
    case SectionEnum.EPISODE:
      img = 'episode.png'
      break
    default:
      img = 'location.png'
      break
  }

  return img
})
</script>

<style lang="scss">
.section {
  margin: 10px;

  &__loader {
    height: 260px;
    width: 280px;

    .v-skeleton-loader__image.v-skeleton-loader__bone {
      height: 260px;
    }
  }

  &__content {
    height: 260px;
    width: 280px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &__img {
      height: 80%;
      width: 100%;
    }

    &__text {
      height: 20%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      font-weight: 600;
      font-size: 1.1rem;
    }
  }
}
</style>

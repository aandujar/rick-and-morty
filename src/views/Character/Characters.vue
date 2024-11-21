<template>
  <div class="characters">
    <Transition name="fade" mode="out-in">
      <div v-show="loading" key="loading" class="characters__content">
        <div
          v-for="index in 20"
          :key="index"
          class="characters__content__loading"
        >
          <v-skeleton-loader type="image" width="280px" height="200px" />
        </div>
      </div>
    </Transition>
    <Transition name="fade" mode="out-in">
      <div v-show="!loading" key="content" class="characters__content">
        <div class="characters__content__pagination text-center pa-2">
          <CharacterFilterComponent
            @input="setCharacterFilter"
            @goBack="goBack"
          />
        </div>
        <div
          v-if="
            !characterStore.characters || characterStore.characters.length === 0
          "
          class="characters__content__no-data pa-8"
        >
          <img
            class="characters__content__no-data__image"
            src="/src/assets/images/no-data.svg"
          />
          <div class="characters__content__no-data__text">
            No characters found
          </div>
        </div>
        <Character
          v-for="character in characterStore.characters"
          :key="character.id"
          :characterModel="character"
          @input="goCharacterDetail"
        />
        <div class="characters__content__pagination text-center">
          <v-pagination
            class="cursor-pointer"
            v-model="currentPage"
            :length="totalPages"
            :total-visible="totalPages <= 8 ? totalPages : 8"
            @update:model-value="getCharacters"
          ></v-pagination>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { InfoApi } from '@/classes/InfoApi'
import { CharacterFilter } from '@/classes/CharacterFilter'
import Character from '@/components/Character/Character.vue'
import CharacterFilterComponent from '@/components/Character/CharacterFilter.vue'
import { useRouter } from 'vue-router'
import { SECTIONS, CHARACTERS } from '@/router/routerInterfaces'
const router = useRouter()

const characterStore = useCharacterStore()

const loading = ref<boolean>(true)
const totalElements = ref<number>(0)
const totalPages = ref<number>(0)
const currentPage = ref<number>(1)

const characterFilter: CharacterFilter = new CharacterFilter(0, '', '', '')

onMounted(getCharacters)

onBeforeUnmount(() => characterStore.setCharacters([]))

function setCharacterFilter(
  name: string,
  status: string,
  gender: string,
): void {
  characterFilter.name = name
  characterFilter.status = status
  characterFilter.gender = gender
  currentPage.value = 1
  getCharacters()
}

function getCharacters(): void {
  loading.value = true
  characterFilter.page = currentPage.value - 1

  characterStore
    .getCharacters(characterFilter)
    .then((infoApi: InfoApi) => {
      totalElements.value = infoApi.count
      totalPages.value = infoApi.pages
    })
    .catch(() => {
      totalElements.value = 0
      totalPages.value = 0
    })
    .finally(() => setTimeout(() => (loading.value = false), 2000))
}

function goCharacterDetail(characterId: number): void {
  router.push(`${CHARACTERS}/${characterId}`)
}

function goBack(): void {
  router.push(SECTIONS)
}
</script>

<style lang="scss">
.characters {
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

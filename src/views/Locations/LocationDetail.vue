<template>
  <div class="location-detail">
    <v-snackbar
      v-model="showError"
      :timeout="5000"
      location="top"
      color="red"
      height="100px"
    >
      No location found
    </v-snackbar>
    <Transition name="fade" mode="out-in">
      <div
        v-if="loading"
        key="loader"
        class="location-detail__loader pt-8 px-4"
      >
        <v-skeleton-loader height="400px" width="80%" type="card" />
      </div>
      <div v-else key="content" class="location-detail__content">
        <v-col cols="12" xs="12">
          <LocationComplete
            :locationModel="locationStore.locationDetail"
            @goBack="goLocations"
          />
        </v-col>
        <v-col cols="12" xs="12">
          <LocationCharacters :characters="characterStore.charactersDetail"
        /></v-col>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCharacterStore } from '@/stores/characterStore'
import { useLocationStore } from '@/stores/locationStore'
import LocationComplete from '@/components/Location/LocationComplete.vue'
import LocationCharacters from '@/components/Location/LocationCharacters.vue'
import { Location } from '@/classes/Location'
import { CHARACTERS, LOCATIONS } from '@/router/routerInterfaces'
import { useRouter, useRoute } from 'vue-router'
import { emitter } from '@/emitter/emitter'

const router = useRouter()
const route = useRoute()
const characterStore = useCharacterStore()
const locationStore = useLocationStore()

const loading = ref<boolean>(true)
const showError = ref<boolean>(false)

emitter.on('goCharacterDetail', goToCharacterDetail)

onMounted(getLocation)

onBeforeUnmount(() => locationStore.setLocation({} as Location))

onBeforeUnmount(() => {
  locationStore.setLocation({} as Location)
  characterStore.setCharactersDetail([])
  emitter.off('goCharacterDetail')
})

function getLocation(): void {
  loading.value = true

  locationStore
    .getLocationById(Number(route.params.locationId))
    .then(getCharacters)
    .catch(() => {
      showError.value = true
      setTimeout(goLocations, 2000)
    })
    .finally(() => setTimeout(() => (loading.value = false), 2000))
}

function getCharacters(): void {
  if (locationStore.locationDetail.residents.length > 0) {
    const charactersId: string = locationStore.locationDetail.residents
      .map((resident: string) => resident.split('/character/')[1])
      .join(',')

    characterStore
      .getCharactersById(charactersId)
      .catch(() => {
        showError.value = true
        setTimeout(goLocations, 2000)
      })
      .finally(() => setTimeout(() => (loading.value = false), 2000))
  } else {
    characterStore
      .getCharacterByIdForDetail(
        Number(
          locationStore.locationDetail.residents[0].split('/character/')[1],
        ),
      )
      .catch(() => {
        showError.value = true
        setTimeout(goLocations, 2000)
      })
      .finally(() => setTimeout(() => (loading.value = false), 2000))
  }
}

function goLocations(): void {
  router.push(LOCATIONS)
}

function goToCharacterDetail(characterId: number): void {
  router.push(`${CHARACTERS}/${characterId}`)
}
</script>

<style lang="scss">
.location-detail {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;

  &__loader {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;

    .v-skeleton-loader__image.v-skeleton-loader__bone {
      height: 400px;
      border-radius: 4px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>

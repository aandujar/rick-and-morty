<template>
  <div class="locations">
    <Transition name="fade" mode="out-in">
      <div v-show="loading" key="loading" class="locations__content">
        <div
          v-for="index in 20"
          :key="index"
          class="locations__content__loading"
        >
          <v-skeleton-loader type="image" width="280px" height="200px" />
        </div>
      </div>
    </Transition>
    <Transition name="fade" mode="out-in">
      <div v-show="!loading" key="content" class="locations__content">
        <div class="locations__content__pagination text-center pa-2">
          <LocationFilterComponent
            @input="setLocationFilter"
            @goBack="goBack"
          />
        </div>
        <div
          v-if="
            !locationStore.locations || locationStore.locations.length === 0
          "
          class="locations__content__no-data pa-8"
        >
          <img
            class="locations__content__no-data__image"
            src="/src/assets/images/no-data.svg"
          />
          <div class="locations__content__no-data__text">
            No locations found
          </div>
        </div>
        <Location
          v-for="location in locationStore.locations"
          :key="location.id"
          :locationModel="location"
          @input="goLocationDetail"
        />
        <div class="locations__content__pagination text-center">
          <v-pagination
            class="cursor-pointer"
            v-model="currentPage"
            :length="totalPages"
            :total-visible="totalPages <= 8 ? totalPages : 8"
            @update:model-value="getLocations"
          ></v-pagination>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useLocationStore } from '@/stores/locationStore'
import { InfoApi } from '@/classes/InfoApi'
import { LocationFilter } from '@/classes/LocationFilter'
import Location from '@/components/Location/Location.vue'
import LocationFilterComponent from '@/components/Location/LocationFilter.vue'
import { useRouter } from 'vue-router'
import { LOCATIONS, SECTIONS /*CHARACTERS*/ } from '@/router/routerInterfaces'
const router = useRouter()

const locationStore = useLocationStore()

const loading = ref<boolean>(true)
const totalElements = ref<number>(0)
const totalPages = ref<number>(0)
const currentPage = ref<number>(1)

const locationFilter: LocationFilter = new LocationFilter(0, '', '', '')

onMounted(getLocations)

onBeforeUnmount(() => locationStore.setLocations([]))

function setLocationFilter(
  name: string,
  type: string,
  dimension: string,
): void {
  locationFilter.name = name
  locationFilter.type = type
  locationFilter.dimension = dimension
  currentPage.value = 1
  getLocations()
}

function getLocations(): void {
  loading.value = true
  locationFilter.page = currentPage.value - 1

  locationStore
    .getLocations(locationFilter)
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

function goLocationDetail(locationId: number): void {
  router.push(`${LOCATIONS}/${locationId}`)
}

function goBack(): void {
  router.push(SECTIONS)
}
</script>

<style lang="scss">
.locations {
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

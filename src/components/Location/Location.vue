<template>
  <div>
    <v-card class="location" hover v-ripple @click="goDetail">
      <div class="location__img">
        <img class="location__img__item" :src="location.image" />
      </div>
      <div class="location__content">
        <div class="location__content__title">
          {{ location.name }}
        </div>
        <div class="location__content__subtitle">
          {{ location.type }}
        </div>
        <div class="location__content__subtitle">
          {{ location.dimension }}
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Location } from '@/classes/Location'
import { ref } from 'vue'

const emit = defineEmits(['input'])

const props = defineProps<{
  locationModel: Location
}>()

const location = ref<Location>(
  new Location(
    props.locationModel.id,
    props.locationModel.name,
    props.locationModel.type,
    props.locationModel.dimension,
    props.locationModel.residents,
  ),
)

function goDetail(): void {
  emit('input', location.value.id)
}
</script>

<style lang="scss" scoped>
.location {
  height: 160px;
  width: 350px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  background-color: white;

  &__img {
    height: 160px;
    width: 50%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    &__item {
      object-position: center center;
      object-fit: cover;
      height: 160px;
      width: 100%;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }

  &__content {
    height: 100%;
    width: 50%;
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

@media (max-width: 400px) {
  .location {
    width: 280px;
  }
}
</style>

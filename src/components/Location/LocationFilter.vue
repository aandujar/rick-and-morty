<template>
  <div>
    <v-card class="location-filter pa-2" hover>
      <v-btn
        icon="mdi-arrow-left-thin"
        size="medium"
        class="ma-1"
        @click="goBack"
      ></v-btn>
      <v-row class="pt-2">
        <v-col cols="12" xs="12" md="4" class="pa-4">
          <v-text-field
            label="Name"
            clearable
            v-model="name"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" md="4" class="pa-4">
          <v-text-field
            label="Type"
            clearable
            v-model="type"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" md="4" class="pa-4">
          <v-text-field
            label="Dimension"
            clearable
            v-model="dimension"
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'

const emit = defineEmits(['input', 'goBack'])

const name = ref<string>()
const type = ref<string>()
const dimension = ref<string>()

watch(name, debounce(sendData, 500))
watch(type, debounce(sendData, 500))
watch(dimension, debounce(sendData, 500))

function sendData(): void {
  emit('input', name.value, type.value, dimension.value)
}

function goBack(): void {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.location-filter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-height: 80px;
}
</style>

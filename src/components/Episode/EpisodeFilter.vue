<template>
  <div>
    <v-card class="episode-filter pa-2" hover>
      <v-btn
        icon="mdi-arrow-left-thin"
        size="medium"
        class="ma-1"
        @click="goBack"
      ></v-btn>
      <v-row class="pt-2">
        <v-col cols="12" xs="12" md="6" class="pa-4">
          <v-text-field
            label="Episode"
            clearable
            v-model="episode"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" md="6" class="pa-4">
          <v-text-field
            label="Name"
            clearable
            v-model="name"
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
const episode = ref<string>()

watch(name, debounce(sendData, 500))
watch(episode, debounce(sendData, 500))

function sendData(): void {
  emit('input', name.value, episode.value)
}

function goBack(): void {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.episode-filter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-height: 80px;
}
</style>

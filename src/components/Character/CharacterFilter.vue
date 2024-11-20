<template>
  <div>
    <v-card class="character-filter pa-2" hover>
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
          <v-select
            :clearable="true"
            label="Status"
            :items="statusSelector"
            v-model="status"
            @update:modelValue="sendData"
          ></v-select>
        </v-col>
        <v-col cols="12" xs="12" md="4" class="pa-4">
          <v-select
            :clearable="true"
            label="Gender"
            :items="genderSelector"
            v-model="gender"
            @update:modelValue="sendData"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import debounce from 'lodash.debounce'
import { CharacterStatusEnum } from '@/enum/CharacterStatusEnum'
import { CharacterGenderEnum } from '@/enum/CharacterGenderEnum'

const emit = defineEmits(['input', 'goBack'])

const statusSelector = ref<String[]>([
  CharacterStatusEnum.ALIVE,
  CharacterStatusEnum.DEAD,
  CharacterStatusEnum.UNKNOW,
])
const genderSelector = ref<String[]>([
  CharacterGenderEnum.FEMALE,
  CharacterGenderEnum.MALE,
  CharacterGenderEnum.GENDERLESS,
  CharacterGenderEnum.UNKNOW,
])

const name = ref<string>()
const status = ref<string>()
const gender = ref<string>()

watch(name, debounce(sendData, 500))

function sendData(): void {
  emit('input', name.value, status.value, gender.value)
}

function goBack(): void {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.character-filter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  min-height: 80px;
}
</style>

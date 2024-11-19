<template>
  <div class="character-status">
    <div
      class="character-status__circle"
      :style="`--color:${statusColor}`"
    ></div>
    <div class="character-status__text" :style="`--color:${statusColor}`">
      {{ status }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CharacterStatusEnum } from '@/enum/CharacterStatusEnum'

const props = defineProps<{
  status: String
}>()

const statusColor = computed<string>(() => {
  let color

  switch (props.status) {
    case CharacterStatusEnum.DEAD:
      color = 'red'
      break
    case CharacterStatusEnum.UNKNOW:
      color = 'orange'
      break
    default:
      color = 'green'
      break
  }

  return color
})
</script>

<style lang="scss" scoped>
.character-status {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__circle {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: var(--color);
    margin-right: 5px;
    height: 10px;
    width: 10px;
  }

  &__text {
    color: var(--color);
    font-size: 1rem;
    font-weight: 550;
  }
}
</style>

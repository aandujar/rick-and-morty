<template>
  <div class="sections">
    <SectionComponent
      v-for="(section, index) in sections"
      :key="index"
      :section="section"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Section } from '@/classes/Section'
import SectionComponent from '@/components/Section.vue'
import { SectionEnum } from '@/enum/SectionEnum'

const sections = ref<Section[]>([
  { code: SectionEnum.CHARACTER, name: 'Personajes' },
  { code: SectionEnum.EPISODE, name: 'Episodios' },
  { code: SectionEnum.LOCATION, name: 'Localizaciones' },
])
const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => (loading.value = false), 2000)
})
</script>

<style lang="scss" scoped>
.sections {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>

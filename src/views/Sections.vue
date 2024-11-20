<template>
  <div class="sections">
    <SectionComponent
      v-for="(section, index) in sections"
      :key="index"
      :section="section"
      :loading="loading"
      @goTo="goToSection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Section } from '@/classes/Section'
import { SectionEnum } from '@/enum/SectionEnum'
import SectionComponent from '@/components/Section.vue'
import { useRouter } from 'vue-router'
import { CHARACTERS, EPISODES, LOCATIONS } from '@/router/routerInterfaces'
const router = useRouter()

const sections = ref<Section[]>([
  { code: SectionEnum.CHARACTER, name: 'Characters' },
  { code: SectionEnum.EPISODE, name: 'Episodes' },
  /*{ code: SectionEnum.LOCATION, name: 'Locations' },*/
])
const loading = ref<boolean>(true)

onMounted(() => {
  setTimeout(() => (loading.value = false), 2000)
})

function goToSection(sectionCode: string) {
  let section

  switch (sectionCode) {
    case SectionEnum.CHARACTER:
      section = CHARACTERS
      break
    case SectionEnum.EPISODE:
      section = EPISODES
      break
    default:
      section = LOCATIONS
      break
  }

  router.push(section)
}
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

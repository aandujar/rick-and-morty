<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';
.app {
  height: 100vh;
  width: 100vw;
  padding: 0 !important;
  background-color: color.adjust(#bfffbf, $lightness: 5%);
}
</style>

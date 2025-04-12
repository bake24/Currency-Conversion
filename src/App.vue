<template>
  <div id="app">
    <AppHeader />
    <!-- Добавляем ключ, чтобы при навигации компоненты полностью перемонтировались -->
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

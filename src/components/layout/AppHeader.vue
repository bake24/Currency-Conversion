<template>
  <header class="app-header">
    <nav class="nav">
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертация</router-link>
    </nav>

    <div class="dropdown-container">
      <BaseCurrencySelector />
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseCurrencySelector from '@/components/features/BaseCurrencySelector.vue';
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ccc;

  .nav {
    display: flex;
    gap: 1rem;
  }

  .nav-link {
    text-decoration: none;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }

  .dropdown-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>

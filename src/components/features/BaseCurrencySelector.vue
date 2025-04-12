<template>
  <BaseDropdown
      :modelValue="currencyStore.baseCurrency"
      :options="availableCurrencies"
      @update:modelValue="onBaseCurrencyChange"
  />
</template>

<script setup lang="ts">
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import { useCurrencyStore } from '@/store/currency';

const currencyStore = useCurrencyStore();
const availableCurrencies = ['USD', 'EUR', 'RUB'];

async function onBaseCurrencyChange(newBase: string) {
  // Смена базовой валюты → загружаем новые курсы
  await currencyStore.setBaseCurrency(newBase);
}
</script>

<template>
  <section class="convert-page">
    <h1>Конвертация валют</h1>

    <div v-if="currencyStore.loading" class="loader">Загрузка курсов...</div>
    <div v-else-if="currencyStore.error" class="error-text">
      {{ currencyStore.error }}
    </div>
    <div v-else-if="!hasRates" class="loader">Загрузка курсов...</div>
    <currency-converter-form v-else />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCurrencyStore } from '@/store/currency';
import CurrencyConverterForm from '@/components/features/CurrencyConverterForm.vue';

const currencyStore = useCurrencyStore();

const availableCurrencies = ['USD', 'EUR', 'RUB'];
const filteredCurrencies = computed(() =>
    availableCurrencies.filter((cur) => cur !== currencyStore.baseCurrency)
);

const hasRates = computed(() =>
    filteredCurrencies.value.every((cur) => typeof currencyStore.rates[cur] === 'number')
);

onMounted(() => {
  if (!hasRates.value) {
    currencyStore.loadRates();
  }
});
</script>

<style lang="scss" scoped>
.convert-page {
  padding: 1rem;
}
.loader {
  margin-top: 1rem;
  font-weight: bold;
}
.error-text {
  margin-top: 1rem;
  color: red;
  font-weight: bold;
}
</style>

<template>
  <section class="home-page">
    <h1>Курсы валют относительно {{ currencyStore.baseCurrency }}</h1>

    <!-- Если идёт загрузка курсов -->
    <div v-if="currencyStore.loading" class="loader">Загрузка...</div>
    <!-- Если возникла ошибка при загрузке -->
    <div v-else-if="currencyStore.error" class="error-text">
      {{ currencyStore.error }}
    </div>
    <!-- Если курсы ещё не получены для всех валют -->
    <div v-else-if="!hasRates" class="loader">Загрузка курсов...</div>
    <!-- Если данные получены, отображаем таблицу -->
    <table v-else class="currency-table">
      <thead>
      <tr>
        <th>Валюта</th>
        <th>Курс (1 единица к {{ currencyStore.baseCurrency }})</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="cur in filteredCurrencies" :key="cur">
        <td>{{ cur }}</td>
        <td>
          {{ currencyStore.rates[cur] !== undefined
            ? currencyStore.rates[cur].toFixed(2)
            : 'N/A' }}
        </td>
      </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useCurrencyStore } from '@/store/currency';

const currencyStore = useCurrencyStore();
// Все доступные валюты
const availableCurrencies = ['USD', 'EUR', 'RUB'];

// Выводим только те валюты, которые не совпадают с базовой
const filteredCurrencies = computed(() =>
    availableCurrencies.filter((cur) => cur !== currencyStore.baseCurrency)
);

// Проверка: для каждой отображаемой валюты (например, если base = 'RUB', то для 'USD' и 'EUR')
// должны быть получены курсы (числовое значение)
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
.home-page {
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
.currency-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: #f9f9f9;
  }
}
</style>

<template>
  <div class="converter-form">
    <!-- Первая строка (верхняя) -->
    <div class="converter-row">
      <BaseDropdown
          :modelValue="topCurrency"
          :options="currencies"
          @update:modelValue="val => topCurrency = val"
      />
      <BaseInput
          :modelValue="topValueStr"
          @update:modelValue="val => onInputChange(val, 'top')"
          :error="topError"
      />
    </div>

    <!-- Вторая строка (нижняя) -->
    <div class="converter-row">
      <BaseDropdown
          :modelValue="bottomCurrency"
          :options="currencies"
          @update:modelValue="val => bottomCurrency = val"
      />
      <BaseInput
          :modelValue="bottomValueStr"
          @update:modelValue="val => onInputChange(val, 'bottom')"
          :error="bottomError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCurrencyStore } from '@/store/currency';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import BaseInput from '@/components/ui/BaseInput.vue';

/**
 * Список доступных валют.
 * Верхняя строка по умолчанию: RUB -> 1000
 * Нижняя строка по умолчанию: USD -> ?
 */
const currencies = ['USD', 'EUR', 'RUB'];
const currencyStore = useCurrencyStore();

const topCurrency = ref('RUB');
const bottomCurrency = ref('USD');

const topValueStr = ref('1000');
const bottomValueStr = ref('');

// Ошибки валидации
const topError = ref<string | null>(null);
const bottomError = ref<string | null>(null);

/**
 * Когда пользователь меняет валюту в любом Dropdown,
 * пересчитываем значения, принимая "top" за ведущую.
 */
watch([topCurrency, bottomCurrency], () => {
  recalc('top');
});

/**
 * При вводе значения в одно из полей обновляем локальное состояние
 * и вызываем пересчёт, чтобы автоматически обновить другое поле.
 */
function onInputChange(newVal: string, source: 'top' | 'bottom') {
  if (source === 'top') {
    topValueStr.value = newVal;
    recalc('top');
  } else {
    bottomValueStr.value = newVal;
    recalc('bottom');
  }
}

/**
 * Парсинг строки в число или null, если невалидно.
 */
function parseNumber(value: string): number | null {
  const num = Number(value);
  return isNaN(num) ? null : num;
}

/**
 * Форматирование числа до 2 знаков.
 */
function formatNumber(num: number) {
  return num.toFixed(2);
}

/**
 * Общий пересчёт.
 * - Если source === 'top', значит пользователь ввёл в верхнем поле,
 *   и мы хотим вычислить значение для нижнего поля.
 * - Если source === 'bottom', наоборот.
 */
function recalc(source: 'top' | 'bottom') {
  topError.value = null;
  bottomError.value = null;

  const topNum = parseNumber(topValueStr.value);
  const bottomNum = parseNumber(bottomValueStr.value);

  // Проверяем, что ввод числовой
  if (topNum === null) topError.value = 'Неверное число';
  if (bottomNum === null) bottomError.value = 'Неверное число';

  // Получаем курсы для выбранных валют.
  const topRate = currencyStore.getRate(topCurrency.value);
  const bottomRate = currencyStore.getRate(bottomCurrency.value);

  // Если обновлено верхнее поле
  if (source === 'top' && topNum !== null) {
    // Переводим topNum (в topCurrency) -> базовая валюта -> bottomCurrency.
    const baseValue = topNum * topRate;
    bottomValueStr.value =
        bottomRate !== 0 ? formatNumber(baseValue / bottomRate) : '0.00';
  }

  // Если обновлено нижнее поле
  if (source === 'bottom' && bottomNum !== null) {
    const baseValue = bottomNum * bottomRate;
    topValueStr.value =
        topRate !== 0 ? formatNumber(baseValue / topRate) : '0.00';
  }
}

// Вызов пересчёта для инициализации нижнего поля при загрузке страницы.
recalc('top');
</script>

<style lang="scss" scoped>
.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.converter-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>

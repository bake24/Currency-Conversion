<template>
  <div>
    <input
        class="base-input"
        type="text"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        aria-label="Введите число"
    />
    <div v-if="error" class="error-text" role="alert">{{ error }}</div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: string | number;
  error?: string | null;
}>();

const emits = defineEmits(['update:modelValue', 'blur']);

function onInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value);
}

function onBlur() {
  emits('blur');
}
</script>

<style lang="scss" scoped>
.base-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  &:focus {
    border-color: #999;
  }
}

.error-text {
  color: red;
  margin-top: 0.25rem;
  font-size: 0.9rem;
}
</style>

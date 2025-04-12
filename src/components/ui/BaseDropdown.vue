<template>
  <select
      class="base-dropdown"
      :value="modelValue"
      @change="onChange"
  >
    <option
        v-for="option in options"
        :key="option"
        :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: string[];
}>();

const emits = defineEmits(['update:modelValue']);

function onChange(event: Event) {
  const newValue = (event.target as HTMLSelectElement).value;
  emits('update:modelValue', newValue);
}
</script>

<style lang="scss" scoped>
.base-dropdown {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #999;
  }
}
</style>

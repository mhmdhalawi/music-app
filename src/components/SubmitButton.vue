<script setup lang="ts">
defineProps<{
  disabled: boolean;
}>();
</script>
<template>
  <button
    type="submit"
    :disabled="disabled"
    :class="{ 'opacity-50': disabled }"
    class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
  >
    <slot></slot>
  </button>
</template>

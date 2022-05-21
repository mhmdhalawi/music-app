<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  bgColor: string;
}>();
</script>

<template>
  <div :class="props.bgColor" class="text-white text-center font-bold p-5 mb-4" v-show="props.show">
    <slot></slot>
  </div>
</template>

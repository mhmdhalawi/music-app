<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  bgColor: string;
}>();
</script>

<template>
  <transition name="fade">
    <div
      :class="props.bgColor"
      class="text-white text-center font-bold p-5 mb-4 absolute top-5 right-5 rounded-md z-20"
      v-show="props.show"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.4s linear;
}
.fade-leave-to {
  transition: all 0.4s linear;
  opacity: 0;
}
</style>

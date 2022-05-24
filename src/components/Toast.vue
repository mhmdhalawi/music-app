<script setup lang="ts">
import { useStore } from '../store';
const store = useStore();
</script>

<template>
  <Teleport to="#alert">
    <transition name="fade">
      <div
        v-show="store.toast.show"
        :class="store.toast.bgColor"
        class="text-white text-center font-bold p-5 mb-4 absolute top-5 right-5 rounded-md z-20"
      >
        <p>{{ store.toast.message }}</p>
      </div>
    </transition>
  </Teleport>
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

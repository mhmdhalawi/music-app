<script setup lang="ts">
import Header from './components/Header.vue';
import AuthModal from './components/AuthModal.vue';
import Footer from './views/Footer.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <Toast />
  <Header />
  <AuthModal />
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route" />
    </transition>
  </router-view>
  <Footer />
</template>

<style lang="postcss">
.form-input {
  @apply block w-full py-1.5 px-3 text-gray-800 border border-gray-300 focus:outline-none rounded;
}
</style>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.2s linear;
}
.fade-leave-to {
  transition: all 0.2s linear;
  opacity: 0;
}
</style>

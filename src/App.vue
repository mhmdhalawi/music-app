<script setup lang="ts">
import Header from './components/Header.vue';
import AuthModal from './components/AuthModal.vue';
import Footer from './views/Footer.vue';
</script>

<template>
  <Header />
  <AuthModal />
  <router-view></router-view>
  <Footer />
</template>

<style lang="postcss">
.form-input {
  @apply block w-full py-1.5 px-3 text-gray-800 border border-gray-300 focus:outline-none rounded;
}
</style>

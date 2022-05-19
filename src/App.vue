<script setup lang="ts">
import Header from './components/Header.vue';
import AuthModal from './components/AuthModal.vue';
</script>

<template>
  <Header />
  <AuthModal />
  <router-view></router-view>
</template>

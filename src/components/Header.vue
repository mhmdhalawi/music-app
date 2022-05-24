<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
  await supabase.auth.signOut();
  store.setUser(null);
  router.push('/');
};
</script>

<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        to="/"
        class="text-white font-bold uppercase text-2xl mr-4"
        exact-active-class="no-active"
        >Music</router-link
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1 w-full">
          <!-- Navigation Links -->
          <li v-if="!(store.user?.aud === 'authenticated')">
            <a class="px-2 text-white" href="#" @click.prevent="store.toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li v-if="store.user?.aud === 'authenticated'">
            <router-link :to="{ name: 'manage' }" class="px-2 text-white">Manage</router-link>
          </li>
          <li class="ml-auto" v-if="store.user?.aud === 'authenticated'">
            <a class="px-2 text-white" href="#" @click.prevent="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

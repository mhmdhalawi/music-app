<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import Upload from '../components/Upload.vue';
import { useGetRequest } from '../hooks/useGetRequest';
import { getSongsByID } from '../utils/supabase';
import { useStore } from '../store';
import { QueryKeys } from '../utils/query-keys';
import CompositionList from '../components/CompositionList.vue';
const store = useStore();
const uploadRefParent = ref();
const id = store.user?.id || '';
const key = QueryKeys.fetch_songs;

onBeforeRouteLeave((_to, _from, next) => {
  if (uploadRefParent.value) {
    uploadRefParent.value.abortSignal();
  }
  next();
});
// supabase returns an object {data,error} for each query
const { data: supabaseData } = useGetRequest({ fn: getSongsByID, id, key });
</script>
<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <!-- Upload -->
        <Upload ref="uploadRefParent" />
        <div class="col-span-2">
          <div class="bg-white rounded border border-gray-200 relative flex flex-col">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
            </div>
            <div class="p-6">
              <!-- Composition Item -->
              <CompositionList v-for="song in supabaseData?.data" :key="song.id" :song="song" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

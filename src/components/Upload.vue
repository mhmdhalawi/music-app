<script setup lang="ts">
import { useUpload } from '../hooks/useUpload';
import { supabase } from '../lib/supabase';

const { songs, upload, is_dragover, showProgressBar, progress } = useUpload();

const abortSignal = () => {
  const ac = new AbortController();
  supabase.from('songs').select().abortSignal(ac.signal).then(console.log);
  ac.abort();
};

defineExpose({
  abortSignal,
});
</script>
<template>
  <div class="col-span-1">
    <div class="bg-white rounded border border-gray-200 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
        <span class="card-title">Upload</span>
        <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
      </div>
      <div class="p-6">
        <!-- Upload Dropbox -->
        <div
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="upload"
          class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 transition duration-500"
          :class="{
            'bg-green-400 border-green-400 border-solid text-white': is_dragover,
            'text-gray-400 ': !is_dragover,
          }"
        >
          <h5>Drop your files here</h5>
        </div>
        <hr class="my-6" v-show="showProgressBar" />
        <!-- Progess Bars -->
        <div class="mb-4" v-show="showProgressBar">
          <!-- File Name -->
          <div class="font-bold text-sm mb-4">Uploading songs</div>
          <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
            <!-- Inner Progress Bar -->
            <div
              class="transition-all progress-bar bg-blue-400"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from '@vue/reactivity';
import { ISong } from '../types/tables';
import { IEditSong } from '../types/forms';
import { editSongSchema } from '../utils/form-schema';
import { useForm, ErrorMessage, Field } from 'vee-validate';
import { supabase } from '../lib/supabase';
import { useQueryClient } from 'vue-query';
import { QueryKeys } from '../utils/query-keys';

const { handleSubmit, errors, isSubmitting } = useForm<IEditSong>({
  validationSchema: editSongSchema,
});

const queryClient = useQueryClient();

const showForm = ref(false);

const props = defineProps<{
  song: ISong;
}>();

const onSubmit = handleSubmit(async (values) => {
  const { data } = await supabase.from('songs').upsert({
    id: props.song.id,
    user_id: props.song.user_id,
    song_name: `${values.song_name}.mp3`,
    genre: values.genre,
  });
  if (data) {
    await queryClient.invalidateQueries(QueryKeys.fetch_songs);
    showForm.value = false;
  }
});

const currentSong = computed(() => {
  return props.song.song_name.replace('.mp3', '');
});
const currentGenre = computed(() => {
  return props.song.genre;
});
</script>
<template>
  <!-- Composition Items -->
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ currentSong }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <form @submit="onSubmit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <Field
            name="song_name"
            type="text"
            :value="currentSong"
            class="form-input"
            :class="{ 'border-red-500': errors.song_name }"
            placeholder="Enter Song Title"
          />
          <ErrorMessage name="song_name" class="text-red-500" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <Field
            name="genre"
            type="text"
            :value="currentGenre"
            class="form-input"
            placeholder="Enter Genre"
            :class="{ 'border-red-500': errors.genre }"
          />
          <ErrorMessage name="genre" class="text-red-500" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="isSubmitting"
          :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="showForm = !showForm"
        >
          Go Back
        </button>
      </form>
    </div>
  </div>
</template>

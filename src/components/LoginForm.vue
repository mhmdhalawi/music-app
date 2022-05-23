<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { loginSchema } from '../utils/form-schema';
import { ILogin } from '../types/forms';
import { reactive } from 'vue';
import { IAlert } from '../types/reactive';

import Alert from '../components/Alert.vue';

import { supabase } from '../lib/supabase';
import { useStore } from '../store';

const store = useStore();

const { handleSubmit, errors, isSubmitting } = useForm<ILogin>({ validationSchema: loginSchema });

const alert = reactive<IAlert>({
  show: false,
  message: 'Please wait while we log you in...',
  bgColor: 'bg-blue-400',
});

const onSubmit = handleSubmit(async (values) => {
  alert.show = true;
  alert.bgColor = 'bg-blue-400';
  const { user, error } = await supabase.auth.signIn({
    email: values.email,
    password: values.password,
  });
  if (!error) {
    alert.message = 'You have been logged in successfully!';
    alert.bgColor = 'bg-green-400';
  } else {
    alert.message = error.message;
    alert.bgColor = 'bg-red-400';
  }
  setTimeout(() => {
    alert.show = false;
    if (user) {
      store.setUser(user);
      store.closeAuthModal();
    }
  }, 700);
  console.log('user', user);
});
</script>

<template>
  <Alert :bgColor="alert.bgColor" :show="alert.show">
    {{ alert.message }}
  </Alert>
  <!-- Login Form -->
  <form @submit="onSubmit">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <Field
        name="email"
        type="email"
        class="form-input"
        placeholder="Enter Email"
        :class="{ 'border-red-500': errors.email }"
      />
      <ErrorMessage name="email" class="text-red-500" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <Field
        name="password"
        type="password"
        class="form-input"
        placeholder="Password"
        :class="{ 'border-red-500': errors.password }"
      />
      <ErrorMessage name="password" class="text-red-500" />
    </div>
    <button
      type="submit"
      :disabled="isSubmitting"
      :class="{ 'opacity-50': isSubmitting }"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </form>
</template>

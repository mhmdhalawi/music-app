<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { loginSchema } from '../utils/form-schema';
import { ILogin } from '../types/forms';
import { reactive } from 'vue';
import { IAlert } from '../types/reactive';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';

import Alert from '../components/Alert.vue';
import SubmitButton from './SubmitButton.vue';
import { computed } from '@vue/reactivity';

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
  alert.message = 'Please wait while we log you in...';
  const { user, error } = await supabase.auth.signIn({
    email: values.email,
    password: values.password,
  });
  if (!error) {
    store.closeAuthModal();
    alert.message = 'You have been logged in successfully!';
    alert.bgColor = 'bg-green-400';
    store.setUser(user);
  } else {
    alert.message = error.message;
    alert.bgColor = 'bg-red-400';
  }
  setTimeout(() => {
    alert.show = false;
  }, 1000);
  console.log('user', user);
});
</script>

<template>
  <Teleport to="#alert">
    <Alert :bgColor="alert.bgColor" :show="alert.show">
      {{ alert.message }}
    </Alert>
  </Teleport>
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
    <!-- button -->
    <SubmitButton :disabled="isSubmitting">Submit</SubmitButton>
  </form>
</template>

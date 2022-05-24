<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { loginSchema } from '../utils/form-schema';
import { ILogin } from '../types/forms';
import { supabase } from '../lib/supabase';
import { useStore } from '../store';

import SubmitButton from './SubmitButton.vue';

const store = useStore();

const { handleSubmit, errors, isSubmitting } = useForm<ILogin>({ validationSchema: loginSchema });

const onSubmit = handleSubmit(async (values) => {
  const { user, error } = await supabase.auth.signIn({
    email: values.email,
    password: values.password,
  });
  if (!error) {
    store.closeAuthModal();
    store.toggleToast('You have been logged in successfully!', 'green');
    store.setUser(user);
  } else {
    store.toggleToast(error.message, 'red');
  }
});
</script>

<template>
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

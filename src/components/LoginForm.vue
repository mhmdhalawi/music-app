<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { loginSchema } from '../utils/form-schema';
import { ILogin } from '../types/forms';
import { reactive } from 'vue';
import { IAlert } from '../types/reactive';

import Alert from '../components/Alert.vue';

const alert = reactive<IAlert>({
  show: false,
  inSubmission: false,
  message: 'Please wait while we register you...',
  bgColor: 'bg-blue-400',
});

const onSubmit = (values: Partial<ILogin>) => {
  alert.inSubmission = true;
  alert.show = true;
  alert.bgColor = 'bg-blue-400';

  setTimeout(() => {
    alert.show = false;
    alert.inSubmission = false;
  }, 3000);

  console.log(values);
};
</script>

<template>
  <Alert :bgColor="alert.bgColor" :show="alert.show">
    {{ alert.message }}
  </Alert>
  <!-- Login Form -->
  <Form @submit="onSubmit" v-slot="{ errors }" :validation-schema="loginSchema">
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
      :disabled="alert.inSubmission"
      :class="{ 'opacity-50': alert.inSubmission }"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </Form>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from 'vee-validate';
import { registerSchema } from '../utils/form-schema';
import { IRegister } from '../types/forms';
import { reactive } from 'vue';
import Alert from '../components/Alert.vue';
import { IAlert } from '../types/reactive';

const { handleSubmit, errors } = useForm<IRegister>({ validationSchema: registerSchema });

const alert = reactive<IAlert>({
  show: false,
  inSubmission: false,
  message: 'Please wait while we register you...',
  bgColor: 'bg-blue-400',
});

const onSubmit = handleSubmit((values) => {
  alert.inSubmission = true;
  alert.show = true;
  alert.bgColor = 'bg-blue-400';
  setTimeout(() => {
    alert.show = false;
    alert.inSubmission = false;
  }, 2000);
  console.log('submit', values);
});
</script>

<template>
  <Alert :bgColor="alert.bgColor" :show="alert.show">
    {{ alert.message }}
  </Alert>
  <!-- Registration Form -->
  <form @submit="onSubmit">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <Field
        name="name"
        type="text"
        class="form-input"
        placeholder="Enter Name"
        :class="{ 'border-red-500': errors.name }"
      />
      <ErrorMessage name="name" class="text-red-500" />
    </div>
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
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <Field
        name="age"
        type="number"
        class="form-input"
        placeholder="Enter Age"
        :class="{ 'border-red-500': errors.age }"
      />
      <ErrorMessage name="age" class="text-red-500" />
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
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <Field
        name="password_confirm"
        type="password"
        class="form-input"
        placeholder="Confirm Password"
        :class="{ 'border-red-500': errors.password_confirm }"
      />

      <ErrorMessage name="password_confirm" class="text-red-500" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <Field
        model-value="USA"
        as="select"
        name="country"
        class="form-input"
        :class="{ 'border-red-500': errors.country }"
      >
        <option selected value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </Field>
      <ErrorMessage name="country" class="text-red-500" />
    </div>
    <!-- TOS -->
    <div class="mb-1 pl-6">
      <Field
        name="tos"
        type="checkbox"
        value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        :class="{ 'outline-red-500': errors.tos }"
      />
      <label class="inline-block">Accept terms of service</label>
    </div>
    <ErrorMessage name="tos" class="text-red-500 block" />
    <button
      type="submit"
      :disabled="alert.inSubmission"
      :class="{ 'opacity-50': alert.inSubmission }"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 mt-4"
    >
      Submit
    </button>
  </form>
</template>

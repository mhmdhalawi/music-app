import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';

import { rules } from './utils/form-validate';

import App from './App.vue';
import './index.css';

const app = createApp(App);
app.use(router);
app.use(createPinia());

rules.forEach((rule) => {
  rule;
});

app.mount('#app');

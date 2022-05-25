import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';

import { rules } from './utils/form-validate';
import { VueQueryPlugin } from 'vue-query';

import { progress } from './lib/nprogress';
import 'nprogress/nprogress.css';

import App from './App.vue';
import './index.css';

progress(router);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

rules.forEach((rule) => {
  rule;
});

app.mount('#app');

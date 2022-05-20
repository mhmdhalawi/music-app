import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from './router';
import { plugin, defaultConfig } from '@formkit/vue';

import App from './App.vue';
import './index.css';
import { generateClasses } from '@formkit/themes';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(
  plugin,
  defaultConfig({
    config: {
      classes: generateClasses({
        text: {
          outer: 'mb-5 formkit-disabled:opacity-40',
          label: 'block mb-1 font-bold text-sm formkit-invalid:text-red-500 ',
          inner: `
          mb-1
          border border-gray-300
          rounded-md
          formkit-invalid:border-red-500
          w-full
        `,
          input:
            'w-full py-1.5 px-3  border-none text-base text-gray-700 placeholder-gray-400 focus:outline-none rounded-md',
          help: 'text-xs text-gray-500',
          messages: 'list-none p-0 mt-1 mb-0 ',
          message: 'text-red-500 mb-1 text-xs',
        },
      }),
    },
  })
);
app.mount('#app');

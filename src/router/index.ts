import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import HelloWorld from '../components/HelloWorld.vue';
import Homapage from '../views/Homepage.vue';

const routes = [
  { path: '/', component: Homapage },
  { path: '/about', component: HelloWorld },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

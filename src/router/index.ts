import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '../lib/supabase';
import Homapage from '../views/Homepage.vue';
import Manage from '../views/Manage.vue';

const routes = [
  { path: '/', component: Homapage },
  { name: 'manage', path: '/manage', component: Manage, meta: { requiresAuth: true } },
  { path: '/manage-music', redirect: { name: 'manage' } },
  { path: '/:catchAll(.*)*', redirect: '/' },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = supabase.auth.user();
    if (!user?.aud) {
      next({ path: '/' });
    }
  }
  next();
});

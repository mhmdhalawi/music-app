import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import { supabase } from '../lib/supabase';
import Homapage from '../views/Homepage.vue';
import Manage from '../views/Manage.vue';

const routes = [
  { path: '/', component: Homapage },
  { path: '/about', component: HelloWorld },
  { path: '/manage', component: Manage, meta: { requiresAuth: true } },
];

export const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
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

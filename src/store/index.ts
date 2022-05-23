import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  // initial state
  state: () => ({
    authModalShow: false,
    user: {} as User | null,
  }),
  //getters
  //   getters: {
  //     getAuthModalShow: (state) => state.authModalShow,
  //   },
  // actions
  actions: {
    toggleAuthModal() {
      this.authModalShow = !this.authModalShow;
    },
    closeAuthModal() {
      this.authModalShow = false;
    },
    setUser(user: User | null) {
      this.user = user;
    },
  },
});

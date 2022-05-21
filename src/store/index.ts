import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  // initial state
  state: () => ({
    authModalShow: false,
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
  },
});

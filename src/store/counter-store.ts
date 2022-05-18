import { defineStore } from 'pinia';

export const useStore = defineStore('counter', {
  // initial state
  state: () => ({
    count: 0,
  }),
  // actions
  actions: {
    increment(num: number) {
      this.count += num;
    },
  },
});

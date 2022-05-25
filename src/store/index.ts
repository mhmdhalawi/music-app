import { User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ISong } from '../types/tables';
import { supabase } from '../lib/supabase';

const currentUser = supabase.auth.user();

export const useStore = defineStore('store', {
  // initial state
  state: () => ({
    authModalShow: false,
    user: currentUser,
    songs: [] as ISong[],
    toast: {
      show: false,
      message: '',
      bgColor: '',
    },
  }),
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
    setSongsData(song: ISong[]) {
      this.songs.push(...song);
    },
    toggleToast(message: string, bgColor: 'green' | 'red') {
      this.toast.message = message;
      this.toast.bgColor = `bg-${bgColor}-400`;
      this.toast.show = true;

      setTimeout(() => {
        this.toast.show = false;
      }, 2000);
    },
  },
});

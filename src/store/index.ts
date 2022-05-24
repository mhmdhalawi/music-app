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
    filesData: [] as ISong[],
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
    setFilesData(filesData: ISong[]) {
      this.filesData.push(...filesData);
    },
  },
});

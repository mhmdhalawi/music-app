// fetch from supabase songs table with id = 1

import { supabase } from '../lib/supabase';

export function getSongsByID(id: string) {
  return supabase.from('songs').select('*').eq('user_id', id);
}

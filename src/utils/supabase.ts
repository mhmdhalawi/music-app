// fetch from supabase songs table with id = 1

import { supabase } from '../lib/supabase';

export async function getSongsByID(id?: string) {
  const { data, error } = await supabase.from('songs').select('*').eq('user_id', id);
  return { data, error };
}

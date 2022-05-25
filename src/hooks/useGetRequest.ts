import { useQuery } from 'vue-query';
import { QueryKeys } from '../utils/query-keys';
import { getSongsByID } from '../utils/supabase';

export function useGetRequest(id: string) {
  return useQuery(QueryKeys.fetch_songs, async () => await getSongsByID(id));
}

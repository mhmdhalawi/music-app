import { useQuery } from 'vue-query';
import { QueryKeys } from '../utils/query-keys';

interface IRequest<T> {
  fn(id?: string): Promise<T>;
  id?: string;
  key: QueryKeys;
}

export function useGetRequest<T>({ fn, id, key }: IRequest<T>) {
  if (id) return useQuery(key, () => fn(id));
  else return useQuery(key, () => fn());
}

import {
  useQueryState,
  UseQueryStateOptions,
  UseQueryStateReturn,
} from 'next-usequerystate'

export const useMyQueryState = <T = string>(
  key: string,
  options?: UseQueryStateOptions<T>
) => {
  return useQueryState(key, {
    history: 'push',
    ...options,
  }) as UseQueryStateReturn<T, undefined>
}

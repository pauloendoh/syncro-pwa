import { queryTypes, useQueryState } from 'next-usequerystate'

export function useQueryParams() {
  const genre = useQueryState('genre', queryTypes.string)

  return {
    genre,
  }
}

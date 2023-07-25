import { queryTypes, useQueryState } from 'next-usequerystate'

export function useQueryParams() {
  const genre = useQueryState('genre', queryTypes.string)
  const favoriteScene = useQueryState('favoriteScene', queryTypes.string)

  return {
    genre,
    favoriteScene,
  }
}

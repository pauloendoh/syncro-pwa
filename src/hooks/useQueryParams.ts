import { useMyQueryState } from './useMyQueryState'

export function useQueryParams() {
  const genre = useMyQueryState('genre')
  const favoriteScene = useMyQueryState('favoriteScene')
  const itemImageOpen = useMyQueryState<'true'>('itemImageOpen')

  return {
    genre,
    favoriteScene,
    itemImageOpen,
  }
}

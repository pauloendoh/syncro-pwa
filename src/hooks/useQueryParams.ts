import { SyncroItemType } from '../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useMyQueryState } from './useMyQueryState'

export function useQueryParams() {
  const genre = useMyQueryState('genre')
  const favoriteScene = useMyQueryState('favoriteScene')
  const itemImageOpen = useMyQueryState<'true'>('itemImageOpen')

  return {
    genre,
    favoriteScene,
    itemImageOpen,
    itemType: useMyQueryState<SyncroItemType | 'all'>('itemType'),
    ratingDetailsId: useMyQueryState<string>('ratingDetailsId'),
  }
}

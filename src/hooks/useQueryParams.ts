import { SyncroItemType } from '../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useMyQueryState } from './useMyQueryState'

export function useQueryParams() {
  return {
    favoriteScene: useMyQueryState('favoriteScene'),
    itemImageOpen: useMyQueryState<'true'>('itemImageOpen'),
    itemType: useMyQueryState<SyncroItemType | 'all'>('itemType'),
    ratingDetailsId: useMyQueryState<string>('ratingDetailsId'),
    profileImage: useMyQueryState<string>('profileImage'),
  }
}

import { SyncroItemType } from '../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useMyQueryState } from './useMyQueryState'

// PE 1/3 - remove this; useQueryState is better;
export function useQueryParams() {
  return {
    favoriteScene: useMyQueryState('favoriteScene'),
    itemImageOpen: useMyQueryState<'true'>('itemImageOpen'),
    itemType: useMyQueryState<SyncroItemType | 'all'>('itemType'),
    ratingDetailsId: useMyQueryState<string>('ratingDetailsId'),
    profileImage: useMyQueryState<string>('profileImage'),
  }
}

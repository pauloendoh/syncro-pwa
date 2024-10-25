import { SyncroItemType } from '../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { useMyQueryState } from './useMyQueryState'

export function useQueryParams() {
  const itemImageOpenState = useMyQueryState('itemImageOpen', {
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : 'false'),
  })

  const favoriteSceneState = useMyQueryState('favoriteScene')

  const itemTypeState = useMyQueryState('itemType', {
    parse: (value) => value as SyncroItemType | 'all',
  })

  const ratingDetailsIdState = useMyQueryState('ratingDetailsId')

  const profileImageState = useMyQueryState('profileImage')

  return {
    favoriteScene: favoriteSceneState,
    itemImageOpen: itemImageOpenState,
    itemType: itemTypeState,
    ratingDetailsId: ratingDetailsIdState,
    profileImage: profileImageState,
  }
}

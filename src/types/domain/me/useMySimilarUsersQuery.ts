import { useQuery } from '@tanstack/react-query'
import { urls } from '../../../utils/urls/urls'
import { RatingSimilarityByTypeDto } from '../rating/RatingSimilarityByTypeDto'
import { SyncroItemTypeAll } from '../syncro-item/SyncroItemType/SyncroItemType'

export const useMySimilarUsersQuery = (itemType?: SyncroItemTypeAll) => {
  return useQuery<RatingSimilarityByTypeDto[]>([
    urls.api.mySimilarUsers(itemType),
  ])
}

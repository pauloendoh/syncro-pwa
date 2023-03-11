import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { urls } from '../../../utils/urls'
import { ItemToRecommendDto } from './types/ItemToRecommendDto'

export const useItemsToRecommendQuery = (
  recommendToUserId: string | null,
  itemType: SyncroItemType
) => {
  return useQuery<ItemToRecommendDto[], AxiosError>(
    [urls.api.itemsToRecommendToUser(recommendToUserId!, itemType)],
    {
      enabled: !!recommendToUserId,
    }
  )
}

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'
import { ItemRecommendationForMeDto } from './types/ItemRecommendationForMeDto'

export const useItemRecommendationsForMeQuery = (itemType: SyncroItemType) => {
  const { authUser } = useAuthStore()
  return useQuery<ItemRecommendationForMeDto[], AxiosError>(
    [urls.api.itemRecommendationsForMe(itemType)],
    {
      enabled: !!authUser,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}

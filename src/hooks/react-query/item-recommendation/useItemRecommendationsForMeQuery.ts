import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useItemRecommendationsForMeQuery = (itemType: SyncroItemType) => {
  const { authUser } = useAuthStore()
  return useQuery<SyncroItemDto[], AxiosError>(
    [urls.api.itemRecommendationsForMe(itemType)],
    {
      enabled: !!authUser,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}

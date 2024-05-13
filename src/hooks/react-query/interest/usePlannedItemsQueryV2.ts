import { useQuery } from '@tanstack/react-query'

import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const usePlannedItemsQueryV2 = (userId?: string) => {
  const { getAuthUserId } = useAuthStore()
  return useQuery<RatingDto[], Error>(
    [urls.api.plannedItemsV2(userId ?? getAuthUserId())],
    {
      enabled: !!userId || !!getAuthUserId(),
    }
  )
}

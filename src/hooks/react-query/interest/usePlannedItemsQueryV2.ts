import { useQuery } from '@tanstack/react-query'

import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { urls } from '../../../utils/urls'

export const usePlannedItemsQueryV2 = (userId?: string) => {
  return useQuery<RatingDto[], Error>([urls.api.plannedItemsV2(userId!)], {
    enabled: !!userId,
  })
}

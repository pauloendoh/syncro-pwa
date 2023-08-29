import { useQuery } from '@tanstack/react-query'

import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { urls } from '../../../utils/urls/urls'

export const useItemReviewQuery = (itemId: string) => {
  return useQuery<RatingDto[], Error>([urls.api.reviewsByItemId(itemId)], {
    enabled: !!itemId,
  })
}

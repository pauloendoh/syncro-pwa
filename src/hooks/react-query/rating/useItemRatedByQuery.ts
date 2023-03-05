import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls'

export const useItemRatedByQuery = (itemId: string) => {
  return useQuery<RatingDto[], Error>(
    [urls.api.ratingByItemAndFollowingUsers(itemId)],
    {
      enabled: !!itemId,
    }
  )
}

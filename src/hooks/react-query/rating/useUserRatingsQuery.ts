import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls/urls'

export const useUserRatingsQuery = (userId: string) => {
  return useQuery<RatingDto[], Error>([urls.api.userRatings(userId)], {
    enabled: !!userId,
  })
}

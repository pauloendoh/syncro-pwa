import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domains/rating/RatingDto'

import { urls } from '../../../utils/urls'

export const useUserRatingsQuery = (userId: string) => {
  return useQuery<RatingDto[], Error>([urls.api.userRatings(userId)])
}

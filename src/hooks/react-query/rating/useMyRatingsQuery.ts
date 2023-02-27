import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domains/rating/RatingDto'

import { urls } from '../../../utils/urls'

export const useMyRatingsQuery = () => {
  return useQuery<RatingDto[], Error>([urls.api.myRatings])
}

export const useMyRatingQueryUtils = (itemId?: string | null) => {
  const { data } = useQuery<RatingDto[], Error>([urls.api.myRatings])

  return data?.find((rating) => rating.syncroItemId === itemId)
}

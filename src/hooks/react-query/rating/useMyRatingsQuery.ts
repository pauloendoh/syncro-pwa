import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useMyRatingsQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<RatingDto[], Error>([urls.api.myRatings], {
    enabled: !!authUser,
  })
}

// PE 1/3 - remove; use useMyRatingQueryUtils instead
export const useMyRatingQU = (itemId?: string | null) => {
  const { authUser } = useAuthStore()
  const { data } = useQuery<RatingDto[], Error>([urls.api.myRatings], {
    enabled: !!authUser,
  })

  return data?.find((rating) => rating.syncroItemId === itemId)
}

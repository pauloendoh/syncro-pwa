import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useItemRatedByQuery = (itemId: string) => {
  const { authUser } = useAuthStore()
  return useQuery<RatingDto[], Error>(
    [urls.api.ratingByItemAndFollowingUsers(itemId)],
    {
      enabled: !!itemId && !!authUser,
    }
  )
}

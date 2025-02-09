import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useMyInterestsQueryV2 = () => {
  const { authUser } = useAuthStore()
  return useQuery<RatingDto[], Error>([urls.api.myInterestsV2], {
    enabled: !!authUser,
  })
}

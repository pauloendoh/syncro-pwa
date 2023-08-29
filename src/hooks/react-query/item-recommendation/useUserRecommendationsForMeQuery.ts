import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { RatingSimilarityByTypeDto } from '../../../types/domain/rating/RatingSimilarityByTypeDto'
import { urls } from '../../../utils/urls/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useUserRecommendationsForMeQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<RatingSimilarityByTypeDto[], AxiosError>(
    [urls.api.userRecommendationsForMe],
    {
      enabled: !!authUser,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
}

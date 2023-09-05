import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../../utils/urls/urls'
import useAuthStore from '../../../zustand/useAuthStore'
import { OverallUserSimilarityDto } from './types/UserSimilarityDto'

export const useUserSimilarityQuery = (userId: string) => {
  const { authUser } = useAuthStore()
  return useQuery<OverallUserSimilarityDto, Error>(
    [urls.api.userSimilarity(userId)],
    {
      enabled:
        !!authUser && userId !== authUser.id && userId !== '' && !!userId,
    }
  )
}

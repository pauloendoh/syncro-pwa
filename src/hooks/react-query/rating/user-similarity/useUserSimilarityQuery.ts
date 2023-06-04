import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../../utils/urls'
import useAuthStore from '../../../zustand/useAuthStore'
import { UserSimilarityDto } from './types/UserSimilarityDto'

export const useUserSimilarityQuery = (userId: string) => {
  const { authUser } = useAuthStore()
  return useQuery<UserSimilarityDto, Error>([urls.api.userSimilarity(userId)], {
    enabled: !!authUser && userId !== authUser.id && userId !== '',
  })
}

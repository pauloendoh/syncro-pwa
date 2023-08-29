import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

import { urls } from '../../../utils/urls/urls'

export const useUserInterestsQuery = (userId: string) => {
  return useQuery<InterestDto[], Error>([urls.api.userInterests(userId)])
}

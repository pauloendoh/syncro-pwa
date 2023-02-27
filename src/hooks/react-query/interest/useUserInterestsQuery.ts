import { useQuery } from '@tanstack/react-query'

import { urls } from '../../../utils/urls'
import { InterestDto } from './InterestDto'

export const useUserInterestsQuery = (userId: string) => {
  return useQuery<InterestDto[], Error>([urls.api.userInterests(userId)])
}

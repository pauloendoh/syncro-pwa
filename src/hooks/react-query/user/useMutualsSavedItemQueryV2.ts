import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls'
import { MutualSavedItemDto } from './types/MutualSavedItemDto'

// PE 1/3 keep only this one
export const useUsersToRecommendQueryV2 = (itemId?: string) => {
  return useQuery<MutualSavedItemDto[], AxiosError>(
    [urls.api.usersToRecommendV2(itemId!)],
    {
      enabled: !!itemId,
    }
  )
}

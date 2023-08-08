import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls'
import { MutualSavedItemDto } from './types/MutualSavedItemDto'

export const useUsersToRecommendQueryV2 = (itemId?: string) => {
  return useQuery<MutualSavedItemDto[], AxiosError>(
    [urls.api.usersToRecommendV2(itemId!)],
    {
      enabled: !!itemId,
    }
  )
}

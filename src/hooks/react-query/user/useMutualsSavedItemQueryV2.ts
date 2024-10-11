import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls/urls'
import { MutualSavedItemDto } from './types/MutualSavedItemDto'

export const useUsersToRecommendItemQuery = (itemId?: string) => {
  return useQuery<MutualSavedItemDto[], AxiosError>(
    [urls.api.usersToRecommendItem(itemId!)],
    {
      enabled: !!itemId,
    }
  )
}

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls'
import { MutualSavedItemDto } from './types/MutualSavedItemDto'

export const useMutualsSavedItemQuery = (itemId?: string) => {
  return useQuery<MutualSavedItemDto[], AxiosError>(
    [urls.api.mutualsSavedItem(itemId!)],
    {
      enabled: !!itemId,
    }
  )
}

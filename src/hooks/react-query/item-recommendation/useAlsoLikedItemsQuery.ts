import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

import { urls } from '../../../utils/urls/urls'

export const useAlsoLikedItemsQuery = (itemId: string) => {
  return useQuery<SyncroItemDto[], AxiosError>(
    [urls.api.usersAlsoLiked(itemId)],
    {
      enabled: !!itemId,
    }
  )
}

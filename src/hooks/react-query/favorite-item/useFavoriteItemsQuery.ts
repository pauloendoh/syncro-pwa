import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls'
import { FavoriteItemDto } from './types/FavoriteItemDto'

export const useFavoriteItemsQuery = (userId?: string) => {
  return useQuery<FavoriteItemDto[], AxiosError>(
    [urls.api.favoriteItems(userId!)],
    {
      enabled: !!userId,
    }
  )
}

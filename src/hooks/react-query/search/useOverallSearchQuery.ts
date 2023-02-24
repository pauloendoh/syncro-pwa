import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../domains/syncro-item/SyncroItemType'
import { IImdbResultItem } from '../../../types/domains/imdb/IImdbResultItem'

import { urls } from '../../../utils/urls'
import { SyncroItemDto } from '../syncro-item/SyncroItemDto'

export const useOverallSearchQuery = (query: string, type: SyncroItemType) => {
  return useQuery<IImdbResultItem[] | SyncroItemDto[], AxiosError>(
    [urls.api.search({ q: query, type })],
    {
      retry: false,
      enabled: !!type && query.length > 0,
    }
  )
}

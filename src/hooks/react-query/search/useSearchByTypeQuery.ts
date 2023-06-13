import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { isSyncroItemType } from '../../../components/SearchPageContent/isSyncroItemType/isSyncroItemType'
import { urls } from '../../../utils/urls'

export const useSearchByTypeQuery = (
  query: string,
  type: SyncroItemType,
  options?: {
    refetchOnWindowFocus?: boolean
  }
) => {
  return useQuery<SyncroItemDto[], AxiosError>(
    [urls.api.search({ q: query, type })],
    {
      retry: false,
      enabled: isSyncroItemType(type) && query.length > 0,
      refetchOnWindowFocus: options?.refetchOnWindowFocus,
    }
  )
}

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { isSyncroItemType } from '../../../components/SearchPageContent/isSyncroItemType/isSyncroItemType'
import { SearchResultByTypeDto } from '../../../types/domain/search/SearchByTypeDto'
import { urls } from '../../../utils/urls/urls'

export const useSearchByTypeQuery = (
  query: string,
  type: SyncroItemType,
  options?: {
    refetchOnWindowFocus?: boolean
  }
) => {
  return useQuery<SearchResultByTypeDto[], AxiosError>(
    [urls.api.search({ q: query, type })],
    {
      retry: false,
      enabled: isSyncroItemType(type) && query.length > 0,
      refetchOnWindowFocus: options?.refetchOnWindowFocus,
    }
  )
}

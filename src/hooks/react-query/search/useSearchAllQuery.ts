import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls/urls'
import { SearchAllDto } from './types/SeachAllDto'

export const useSearchAllQuery = (
  query: string,
  options?: {
    refetchOnWindowFocus?: boolean
  }
) => {
  return useQuery<SearchAllDto, AxiosError>([urls.api.searchAll(query)], {
    retry: false,
    enabled: query.length > 0,
    refetchOnWindowFocus: options?.refetchOnWindowFocus,
  })
}

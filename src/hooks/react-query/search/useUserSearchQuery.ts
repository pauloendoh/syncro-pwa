import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserSimpleDto } from '../../../types/domain/user/UserSimpleDto'

import { urls } from '../../../utils/urls/urls'

export const useUserSearchQuery = (query: string) => {
  return useQuery<UserSimpleDto[], AxiosError>([
    urls.api.search({ q: query, type: 'users' }),
  ])
}

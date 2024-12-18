import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls/urls'
import { useAuthUser } from '../../domains/auth/useAuthUser'
import { ParsedSharedListItemDto } from './types/ParsedSharedListItemDto'

export const useSharedListItemsQuery = (listId: string) => {
  const authUser = useAuthUser()
  return useQuery<ParsedSharedListItemDto[], AxiosError>(
    [urls.api.sharedList.sharedListItems(listId)],
    {
      enabled: !!authUser,
    }
  )
}

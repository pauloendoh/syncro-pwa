import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls/urls'
import { useAuthUser } from '../../domains/auth/useAuthUser'
import { SharedListDto } from './types/SharedListDto'

export const useSharedListsIncludingUsersQuery = (userIds: string[]) => {
  const authUser = useAuthUser()
  return useQuery<SharedListDto[], AxiosError>(
    [urls.api.sharedList.sharedListsIncludingUsers(userIds)],
    {
      enabled: !!authUser,
    }
  )
}

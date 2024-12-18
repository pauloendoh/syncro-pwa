import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { urls } from '../../../utils/urls/urls'
import { useAuthUser } from '../../domains/auth/useAuthUser'
import { SharedListDto } from './types/SharedListDto'

export const useMySharedListsQuery = () => {
  const authUser = useAuthUser()
  return useQuery<SharedListDto[], AxiosError>(
    [urls.api.sharedList.mySharedLists()],
    {
      enabled: !!authUser,
    }
  )
}

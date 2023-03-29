import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { FollowDto } from '../../../types/domain/follow/FollowDto'

import { urls } from '../../../utils/urls'
import useAuthStore from '../../zustand/useAuthStore'

export const useMyFollowingUsersQuery = () => {
  const { authUser } = useAuthStore()
  return useQuery<FollowDto[], AxiosError>([urls.api.myFollowingUsers], {
    enabled: !!authUser,
  })
}

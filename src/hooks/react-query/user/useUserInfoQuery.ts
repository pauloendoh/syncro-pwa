import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserSimpleDto } from '../../../types/domains/user/UserSimpleDto'

import { urls } from '../../../utils/urls'

export const useUserInfoQuery = (userId: string) => {
  return useQuery<UserSimpleDto, AxiosError>([urls.api.userInfo(userId)], {
    enabled: !!userId,
  })
}
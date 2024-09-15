import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UserSimpleDto } from '../../../types/domain/user/UserSimpleDto'

import { urls } from '../../../utils/urls/urls'

type NewUserDto = UserSimpleDto & {
  entryCount: number
}

export const useNewUsersQuery = () => {
  return useQuery<NewUserDto[], AxiosError>([urls.api.newUsers])
}

import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { urls } from '../../../utils/urls/urls'

export const useUserItemsCountQuery = (userId: string) => {
  return useQuery<number, AxiosError>([urls.api.userItemsCount(userId)])
}

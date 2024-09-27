import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { PartialRecord } from '../../../types/utils/PartialRecord'
import { urls } from '../../../utils/urls/urls'

export const useUserItemsCountDetailsQuery = (userId?: string) => {
  return useQuery<PartialRecord<SyncroItemType, number>, AxiosError>(
    [urls.api.userItemsCountDetails(userId!)],
    {
      enabled: !!userId,
    }
  )
}

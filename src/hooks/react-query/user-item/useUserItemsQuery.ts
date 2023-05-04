import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { UserItemDto } from '../../../types/domain/syncro-item/UserItemDto'

import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

export const useUserItemsQuery = (
  userId: string,
  itemType?: SyncroItemType
) => {
  const axios = useAxios()
  return useQuery<UserItemDto[], AxiosError>(
    [urls.api.userItems(userId, itemType)],
    async () => {
      const res = await axios.get<UserItemDto[]>(urls.api.userItems(userId))

      if (itemType) return res.data?.filter((d) => d.type === itemType) || []

      return res?.data || []
    },
    {
      enabled: !!userId,
    }
  )
}

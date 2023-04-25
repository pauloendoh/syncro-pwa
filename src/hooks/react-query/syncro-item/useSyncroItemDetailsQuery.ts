import { useQuery } from '@tanstack/react-query'
import {
  SyncroItemDto,
  buildSyncroItemDto,
} from '../../../types/domain/syncro-item/SyncroItemDto'

import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

export const useSyncroItemDetailsQuery = (
  id?: string | null,
  options?: {
    initialData?: SyncroItemDto
  }
) => {
  const axios = useAxios()
  return useQuery<SyncroItemDto, Error>(
    [urls.api.syncroItemDetails(id)],
    async () => {
      if (id)
        return axios.get(urls.api.syncroItemDetails(id)).then((res) => res.data)

      return buildSyncroItemDto()
    },
    {
      enabled: !!id,
      initialData: options?.initialData,
    }
  )
}

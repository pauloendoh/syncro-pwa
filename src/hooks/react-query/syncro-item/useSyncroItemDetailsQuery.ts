import { useQuery } from '@tanstack/react-query'
import {
  SyncroItemDto,
  buildSyncroItemDto,
} from '../../../types/domain/syncro-item/SyncroItemDto'

import { isAxiosError } from 'axios'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { useSnackbar } from '../../../utils/mantine/useSnackbar'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

export const useSyncroItemDetailsQuery = (
  id?: string | null,
  options?: {
    initialData?: SyncroItemDto
  }
) => {
  const axios = useAxios(false)
  const {} = useSnackbar()
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
      onError: (err) => {
        if (isAxiosError(err)) {
          if (err.response?.data?.code === 429) return

          myNotifications.error(err.response?.data?.message || err.message)
        }
      },
    }
  )
}

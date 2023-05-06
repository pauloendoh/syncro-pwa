import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useEditItemMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()
  return useMutation(
    async (payload: SyncroItemDto) => {
      const { mangaExtraInfo, ...cleanPayload } = payload
      return axios
        .put<SyncroItemDto>(urls.api.syncroItem, cleanPayload)
        .then((res) => res.data)
    },
    {
      onSuccess: (saved) => {
        myNotifications.success('Item saved!')
        qc.setQueryData<SyncroItemDto>(
          [urls.api.syncroItemDetails(saved.id)],
          saved
        )
      },
    }
  )
}

export default useEditItemMutation

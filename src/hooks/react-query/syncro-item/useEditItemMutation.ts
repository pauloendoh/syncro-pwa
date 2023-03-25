import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsert } from 'endoh-utils'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { ItemRecommendationDto } from '../notification/types/ItemRecommendationDto'

const useEditItemMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()
  return useMutation(
    (payload: SyncroItemDto) =>
      axios
        .put<SyncroItemDto>(urls.api.syncroItem, payload)
        .then((res) => res.data),
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

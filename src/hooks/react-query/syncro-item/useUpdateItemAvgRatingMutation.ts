import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

// PE 1/3 - does not use the type anymore
const useUpdateItemAvgRatingMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (itemId: string) =>
      axios
        .put<SyncroItemDto>(urls.api.updateItemAvgRating(itemId))
        .then((res) => res.data),
    {
      onSuccess: (updatedItem) => {
        queryClient.setQueryData<SyncroItemDto>(
          [urls.api.syncroItemDetails(updatedItem.id)],
          updatedItem
        )
        myNotifications.success('Average rating updated!')
      },
    }
  )
}

export default useUpdateItemAvgRatingMutation

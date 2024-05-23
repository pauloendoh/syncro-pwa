import { useMutation, useQueryClient } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

const useRemoveQueuePositionMutation = () => {
  const queryClient = useQueryClient()
  const { getAuthUserId } = useAuthStore()
  const axios = useAxios()

  return useMutation(
    (input: { ratingId: string }) =>
      axios
        .post(urls.api.removeQueuePosition, {
          ratingId: input.ratingId,
        })
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          urls.api.plannedItemsV2(getAuthUserId()),
        ])

        myNotifications.success('Removed from queue!')
      },
    }
  )
}

export default useRemoveQueuePositionMutation

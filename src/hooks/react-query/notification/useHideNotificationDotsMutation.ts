import { useMutation, useQueryClient } from '@tanstack/react-query'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import { NotificationDto } from './types/NotificationDto'

const useHideNotificationDotsMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    () =>
      axios
        .delete<NotificationDto[]>(urls.api.hideNotificationDots)
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<NotificationDto[]>(
          [urls.api.notifications],
          data
        )
      },
    }
  )
}

export default useHideNotificationDotsMutation

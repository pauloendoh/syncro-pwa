import { useMutation, useQueryClient } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useUpdateSavedPositionMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    (payload: { interestId: string; newPosition: number }) =>
      axios.post(urls.api.updateSavedPosition, payload).then((res) => res.data),
    {
      onSuccess: async (_) => {
        await queryClient.invalidateQueries([urls.api.findSavedItems])

        myNotifications.success('Position changed!')
      },
    }
  )
}

export default useUpdateSavedPositionMutation

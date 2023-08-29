import { useMutation, useQueryClient } from '@tanstack/react-query'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { ImportConnectorsDto } from './types/UserFeedbackDto'

const useUpdateConnectorsMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()
  return useMutation(
    (payload: { connector: string; url: string }) =>
      axios
        .put<ImportConnectorsDto>(urls.api.importConnectors, payload)
        .then((res) => res.data),
    {
      onSuccess: (saved) => {
        queryClient.setQueryData([urls.api.importConnectors], saved)
        myNotifications.success('Connector updated!')
      },
    }
  )
}

export default useUpdateConnectorsMutation

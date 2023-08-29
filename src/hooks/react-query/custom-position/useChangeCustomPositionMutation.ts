import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomPositionDto } from '../../../types/domain/custom-position/CustomPositionDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

type Payload = {
  dto: CustomPositionDto
  itemType: SyncroItemType
}

const useChangeCustomPositionMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()
  return useMutation(
    ({ dto }: Payload) =>
      axios
        .put<CustomPositionDto[]>(urls.api.customPosition, dto)
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        queryClient
          .invalidateQueries([
            urls.api.customPositionsByItemType(payload.itemType),
          ])
          .then(() => {
            myNotifications.success('Position changed!')
          })
      },
    }
  )
}

export default useChangeCustomPositionMutation

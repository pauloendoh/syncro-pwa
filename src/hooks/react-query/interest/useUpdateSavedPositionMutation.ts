import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useUpdateSavedPositionMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  return useMutation(
    async (payload: { interestId: string; newPosition: number }) => {
      queryClient.setQueryData<InterestDto[]>(
        [urls.api.findSavedItems],
        (curr) => {
          if (!curr) return []

          const interest = curr.find((x) => x.id === payload.interestId)
          if (!interest) return curr

          const newInterests = curr.map((i) => ({
            ...i,
            position:
              i.position >= payload.newPosition ? i.position + 1 : i.position,
          }))

          newInterests.find((x) => x.id === payload.interestId)!.position =
            payload.newPosition

          return newInterests
        }
      )
      return axios
        .post(urls.api.updateSavedPosition, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: async (_) => {
        // await queryClient.invalidateQueries([urls.api.findSavedItems])
        // myNotifications.success('Position changed!')
      },
    }
  )
}

export default useUpdateSavedPositionMutation

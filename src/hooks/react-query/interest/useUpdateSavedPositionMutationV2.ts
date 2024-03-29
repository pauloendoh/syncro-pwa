import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

const useUpdateSavedPositionMutationV2 = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()

  const { authUser } = useAuthStore()

  return useMutation(
    async (payload: { ratingId: string; newPosition: number }) => {
      if (authUser) {
        queryClient.setQueryData<RatingDto[]>(
          [urls.api.plannedItemsV2(authUser?.id)],
          (curr) => {
            if (!curr) return []

            // reorder using position and splice
            const ratingToMove = curr.find(
              (rating) => rating.id === payload.ratingId
            )
            if (!ratingToMove) return curr

            const itemType = ratingToMove.syncroItem?.type
            const selectedRatings = curr.filter(
              (rating) => rating.syncroItem?.type === itemType
            )

            const otherRatings = curr.filter(
              (rating) => rating.syncroItem?.type !== itemType
            )

            const updatedRatings = selectedRatings.filter(
              (rating) => rating.id !== payload.ratingId
            )

            updatedRatings.splice(payload.newPosition - 1, 0, ratingToMove)

            return [
              ...updatedRatings.map((n, index) => ({
                ...n,
                position: index + 1,
              })),
              ...otherRatings,
            ]
          }
        )
      }
      return axios
        .post(urls.api.updateSavedPositionV2, payload)
        .then((res) => res.data)
    },
    {
      onSuccess: async (_) => {
        await queryClient.invalidateQueries([
          urls.api.plannedItemsV2(authUser!.id),
        ])

        myNotifications.success('Position updated!')
      },
    }
  )
}

export default useUpdateSavedPositionMutationV2

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray } from 'endoh-utils/dist/array'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

const useDeleteRatingMutation = () => {
  const queryClient = useQueryClient()
  const { getAuthUserId } = useAuthStore()

  const axios = useAxios()
  return useMutation(
    (entry: RatingDto) =>
      axios.delete(urls.api.myRatingId(entry.id)).then((res) => res.data),
    {
      onSuccess: (_, prevEntry) => {
        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return deleteFromArray(curr, (i) => i.id === prevEntry.id)
        })

        queryClient.setQueryData<RatingDto[]>(
          [urls.api.plannedItemsV2(getAuthUserId(), prevEntry.status)],
          (curr) => {
            return deleteFromArray(curr, (i) => i.id === prevEntry.id)
          }
        )

        myNotifications.success('Rating deleted!')
      },
    }
  )
}

export default useDeleteRatingMutation

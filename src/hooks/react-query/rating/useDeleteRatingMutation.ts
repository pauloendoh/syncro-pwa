import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray } from 'endoh-utils/dist/array'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useDeleteRatingMutation = () => {
  const queryClient = useQueryClient()

  const axios = useAxios()
  return useMutation(
    (ratingId: string) =>
      axios.delete(urls.api.myRatingId(ratingId)).then((res) => res.data),
    {
      onSuccess: (_, ratingId) => {
        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return deleteFromArray(curr, (i) => i.id === ratingId)
        })

        myNotifications.success('Rating deleted!')
      },
    }
  )
}

export default useDeleteRatingMutation

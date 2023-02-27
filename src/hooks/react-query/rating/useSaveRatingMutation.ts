import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { deleteFromArray, upsert } from 'endoh-utils/dist/array'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'

const useSaveRatingMutation = () => {
  const queryClient = useQueryClient()
  // const { setSuccessMessage, setErrorMessage } = useSnackbarStore()

  const axios = useAxios()
  return useMutation(
    (payload: RatingDto) =>
      axios
        .post<RatingDto | null>(urls.api.myRatings, payload)
        .then((res) => res.data),
    {
      onSuccess: (savedRating, payload) => {
        if (!savedRating) {
          if (payload.id) {
            queryClient.setQueryData<RatingDto[]>(
              [urls.api.myRatings],
              (curr) => deleteFromArray(curr, (i) => i.id === payload.id)
            )
          }

          myNotifications.success('Rating removed!')

          return
        }

        queryClient.setQueryData<RatingDto[]>([urls.api.myRatings], (curr) => {
          return upsert(curr, savedRating, (i) => i.id === savedRating.id)
        })

        myNotifications.success('Rating saved!')
      },
      onError: (err: AxiosError<any>) => {
        alert(err?.response?.data?.message || 'Error saving idea')
        // setErrorMessage(err?.response?.data?.message || "Error saving idea")
      },
    }
  )
}

export default useSaveRatingMutation

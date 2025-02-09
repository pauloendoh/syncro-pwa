import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

export const useUpdateInterestMutationV2 = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (input: { ratingId: string; interestLevel: number | null }) =>
      axios
        .patch<true>(urls.api.entryInterest(input.ratingId), {
          interestLevel: input.interestLevel,
        })
        .then((res) => res.data),
    {
      onSuccess: (saved, input) => {
        myNotifications.success('Feedback saved!')

        const queryKey = [urls.api.myInterestsV2]
        qc.cancelQueries(queryKey)
        qc.setQueryData<RatingDto[]>(queryKey, (curr) => {
          if (!curr) return []
          const rating = curr.find((r) => r.id === input.ratingId)
          if (rating) {
            rating.interestLevel = input.interestLevel
          }

          return [...curr]
        })
      },
    }
  )
}

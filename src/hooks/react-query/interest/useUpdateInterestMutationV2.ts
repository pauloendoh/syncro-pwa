import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

export const useUpdateInterestMutationV2 = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (input: {
      ratingId: string
      interestLevel?: number | null
      myHoursLeft?: number | null
    }) =>
      axios
        .patch<true>(urls.api.entryInterest(input.ratingId), {
          interestLevel: input.interestLevel,
          myHoursLeft: input.myHoursLeft,
        })
        .then((res) => res.data),
    {
      onSuccess: (saved, input) => {
        const queryKey = [urls.api.myInterestsV2]
        qc.cancelQueries(queryKey)
        qc.setQueryData<RatingDto[]>(queryKey, (curr) => {
          if (!curr) return []
          const copy = [...curr]
          const rating = copy.find((r) => r.id === input.ratingId)
          if (rating && input.interestLevel !== undefined) {
            rating.interestLevel = input.interestLevel
          }
          if (rating && input.myHoursLeft !== undefined) {
            rating.myHoursLeft = input.myHoursLeft
          }

          return copy
        })
      },
    }
  )
}

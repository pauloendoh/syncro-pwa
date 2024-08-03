import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteFromArray } from 'endoh-utils'
import { RatingSimilarityByTypeDto } from '../../../types/domain/rating/RatingSimilarityByTypeDto'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'

const useIgnoreFollowRecommendationMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: { ignoreUserId: string }) =>
      axios
        .post(urls.api.ignoreFollowRecommendation, payload)
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        qc.setQueryData<RatingSimilarityByTypeDto[]>(
          [urls.api.userRecommendationsForMe],
          (oldData) => {
            return deleteFromArray(
              oldData,
              (item) => item.userB.id === payload.ignoreUserId
            )
          }
        )
      },
    }
  )
}

export default useIgnoreFollowRecommendationMutation

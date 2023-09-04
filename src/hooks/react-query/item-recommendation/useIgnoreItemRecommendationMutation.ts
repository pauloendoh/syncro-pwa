import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { UserFeedbackDto } from '../feedback/types/UserFeedbackDto'

const useIgnoreItemRecommendationMutation = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: { itemId: string; itemType: SyncroItemType }) =>
      axios
        .post<UserFeedbackDto>(urls.api.ignoreItemRecommendation, {
          itemId: payload.itemId,
        })
        .then((res) => res.data),
    {
      onSuccess: (saved, payload) => {
        qc.setQueryData<SyncroItemDto[]>(
          [urls.api.itemRecommendationsForMe(payload.itemType)],
          (curr) => {
            return curr?.filter((item) => item.id !== payload.itemId)
          }
        )
        // qc.setQueryData<UserFeedbackDto>([urls.api.feedback], saved)
      },
    }
  )
}

export default useIgnoreItemRecommendationMutation

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { UserFeedbackDto } from '../feedback/types/UserFeedbackDto'
import { ItemRecommendationForMeDto } from './types/ItemRecommendationForMeDto'

const useIgnoreItemRecommendations = () => {
  const axios = useAxios()
  const qc = useQueryClient()

  return useMutation(
    (payload: { itemIds: string[]; itemType: SyncroItemType }) =>
      axios
        .post<UserFeedbackDto>(urls.api.ignoreItemRecommendation, {
          itemIds: payload.itemIds,
        })
        .then((res) => res.data),
    {
      onSuccess: (_, payload) => {
        qc.setQueryData<ItemRecommendationForMeDto[]>(
          [urls.api.itemRecommendationsForMe(payload.itemType)],
          (curr) => {
            return curr?.filter(
              ({ item }) => !payload.itemIds.includes(item.id)
            )
          }
        )
      },
    }
  )
}

export default useIgnoreItemRecommendations

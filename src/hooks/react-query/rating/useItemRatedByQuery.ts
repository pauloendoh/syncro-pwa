import { useQuery } from '@tanstack/react-query'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

import { urls } from '../../../utils/urls/urls'
import { ItemRatedByModalType } from '../../zustand/modals/useItemRatedByModalStore'
import useAuthStore from '../../zustand/useAuthStore'

export const useItemRatedByQuery = (
  itemId: string,
  type: ItemRatedByModalType
) => {
  const { authUser } = useAuthStore()
  return useQuery<RatingDto[], Error>([urls.api.ratingsByItem(itemId, type)], {
    enabled: !!itemId && !!authUser,
  })
}

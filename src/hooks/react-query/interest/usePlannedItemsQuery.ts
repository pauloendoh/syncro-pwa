import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'

import { urls } from '../../../utils/urls/urls'

export const usePlannedItemsQuery = (userId?: string) => {
  return useQuery<InterestDto[], Error>([urls.api.plannedItems(userId!)], {
    enabled: !!userId,
  })
}

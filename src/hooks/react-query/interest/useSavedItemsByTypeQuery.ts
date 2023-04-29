import { useQuery } from '@tanstack/react-query'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

import { urls } from '../../../utils/urls'

// PE 1/3 - remove?
export const useSavedItemsByTypeQuery = (type: SyncroItemType) => {
  return useQuery<InterestDto[], Error>([urls.api.findSavedItemsByType(type)])
}

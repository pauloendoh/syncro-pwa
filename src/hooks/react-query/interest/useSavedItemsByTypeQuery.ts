import { useQuery } from '@tanstack/react-query'
import { SyncroItemType } from '../../../domains/syncro-item/SyncroItemType'

import { urls } from '../../../utils/urls'
import { InterestDto } from './InterestDto'

export const useSavedItemsByTypeQuery = (type: SyncroItemType) => {
  return useQuery<InterestDto[], Error>([urls.api.findSavedItemsByType(type)])
}

import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export const useRatingStatusLabel = (params: {
  status: RatingStatusType
  type: SyncroItemType
  hasRated?: boolean
  isMobile?: boolean
}) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: params.type,
  })

  if (params.hasRated) {
    return 'rated'
  }

  switch (params.status) {
    case 'COMPLETED':
      return 'completed:'

    case 'IN_PROGRESS':
      return 'is ' + typeMap.getVerb() + 'ing:'

    case 'DROPPED':
      return 'dropped:'

    case 'ON_HOLD':
      return 'put on hold:'
    case 'PLANNED':
      return params.isMobile ? 'planned:' : typeMap.plansTo + ':'
  }
}

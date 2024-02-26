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

  const mapped: {
    [key in RatingStatusType]: string
  } = {
    COMPLETED: 'completed',
    IN_PROGRESS: 'is ' + typeMap.getVerb() + 'ing',
    DROPPED: 'dropped',
    ON_HOLD: params.isMobile ? 'paused' : 'put on hold',
    PLANNED: params.isMobile ? 'planned' : typeMap.plansTo,
  }

  return mapped[params.status]
}

import { syncroItemOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatus'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export const getRatingStatusLabel = (params: {
  status: RatingStatusType
  type: SyncroItemType
}) => {
  const { status, type } = params

  if (status === 'COMPLETED') {
    return `completed and rated`
  }

  if (status === 'DROPPED') {
    return `dropped and rated`
  }

  if (status === 'ON_HOLD') {
    // user is holding the item
    return `holding and rated`
  }

  if (status === 'IN_PROGRESS') {
    return (
      syncroItemOptions.find((o) => o.itemType === type)?.inProgressLabel || ''
    )
  }

  return ''
}

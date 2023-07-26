import { upToNDecimals } from 'endoh-utils'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

export const useGetFinalRatingCountAvgSite = (item: SyncroItemDto) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: item.type,
  })

  const ratingCount = useMemo(() => {
    if (item.syncroRatingCount >= item.ratingCount)
      return item.syncroRatingCount
    return item.ratingCount
  }, [item])

  const avgRating = useMemo(() => {
    if (item.syncroRatingCount >= item.ratingCount) return item.syncroAvgRating
    return item.avgRating
  }, [item])

  const site = useMemo(() => {
    if (item.syncroRatingCount >= item.ratingCount) return 'Syncro'
    return typeMap.site
  }, [item, typeMap])

  return {
    ratingCount,
    avgRating: upToNDecimals(avgRating, 1),
    finalSource: site,
  }
}

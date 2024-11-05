import { useMemo } from 'react'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { syncroItemTypeOptions } from './syncroItemOptions/syncroItemOptions'

/**
 * Get syncro item type map by item type
 */
// PE 2/3 - make conditional typing
export const useSyncroItemTypeMap = (by: {
  tabIndex?: number
  itemType?: SyncroItemType
}) => {
  const item = useMemo(() => {
    let result = syncroItemTypeOptions
    if (by.itemType) result = result.filter((r) => r.itemType === by.itemType)
    if (by.tabIndex) result = result.filter((r) => r.tabIndex === by.tabIndex)

    return result[0]
  }, [syncroItemTypeOptions, by])

  return item
}

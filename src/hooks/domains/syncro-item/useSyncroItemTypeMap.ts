import { useMemo } from 'react'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { syncroItemOptions } from './syncroItemOptions/syncroItemOptions'

// PE 1/3 -  ?
export const useSyncroItemTypeMap = (by: {
  tabIndex?: number
  itemType?: SyncroItemType
}) => {
  const item = useMemo(() => {
    let result = syncroItemOptions
    if (by.itemType) result = result.filter((r) => r.itemType === by.itemType)
    if (by.tabIndex) result = result.filter((r) => r.tabIndex === by.tabIndex)

    return result[0]
  }, [syncroItemOptions, by])

  return item
}

import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export function isSyncroItemType(type: string): type is SyncroItemType {
  return Object.values(syncroItemTypes).includes(type as SyncroItemType)
}

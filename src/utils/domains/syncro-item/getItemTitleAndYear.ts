import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

export function getItemTitleAndYear(syncroItem: SyncroItemDto) {
  if (syncroItem?.year) {
    return `${syncroItem?.title} [${syncroItem.year}]`
  }

  return syncroItem?.title
}

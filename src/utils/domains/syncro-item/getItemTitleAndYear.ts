import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

export function getItemTitleAndYear(syncroItem: SyncroItemDto) {
  return `${syncroItem?.title} ${syncroItem?.year && `[${syncroItem.year}]`}`
}

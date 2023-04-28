import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

export interface FavoriteItemDto {
  id: string
  userId: string
  syncroItem?: SyncroItemDto
  syncroItemId: string
  position: number
}

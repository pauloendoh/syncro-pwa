import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

export interface ItemToRecommendDto {
  item: SyncroItemDto
  myRating: number
  theySaved: boolean
  theirRating: number | null
}

import { RatingDto } from '../rating/RatingDto'
import { SyncroItemDto } from '../syncro-item/SyncroItemDto'

export type SearchResultByTypeDto = {
  item: SyncroItemDto
  ratingsByFollowingUsers: RatingDto[]
}

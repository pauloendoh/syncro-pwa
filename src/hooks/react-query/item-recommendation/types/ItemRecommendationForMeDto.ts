import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

export type ItemRecommendationForMeDto = {
  item: SyncroItemDto
  ratingsByFollowingUsers: RatingDto[]
}

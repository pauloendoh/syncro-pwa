import { FollowDto } from '../../../../types/domain/follow/FollowDto'
import { RatingImportRequestDto } from '../../../../types/domain/rating-import-request/RatingImportRequestDto'
import { ItemRecommendationDto } from './ItemRecommendationDto'

export interface NotificationDto {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  showDot: boolean
  followId?: string
  follow?: FollowDto

  itemRecommendationId?: string
  itemRecommendation?: ItemRecommendationDto
  ratingsImportRequest?: RatingImportRequestDto
}

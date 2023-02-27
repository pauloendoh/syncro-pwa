import { SyncroItemDto } from "../../../../types/domain/syncro-item/SyncroItemDto"
import { UserSimpleDto } from "../../../../types/domain/user/UserSimpleDto"

export interface ItemRecommendationDto {
  id: string
  item?: SyncroItemDto
  itemId: string
  fromUser?: UserSimpleDto
  fromUserId: string
  toUser?: UserSimpleDto
  toUserId: string
  createdAt: string
}

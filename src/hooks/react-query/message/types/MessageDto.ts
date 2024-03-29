import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import {
  UserSimpleDto,
  buildUserSimpleDto,
} from '../../../../types/domain/user/UserSimpleDto'

export interface MessageDto {
  id: string
  createdAt: string
  updatedAt: string
  roomId: string
  userId: string
  text: string
  user: UserSimpleDto
  isRead: boolean

  repliedToRating?: RatingDto
  repliedToRatingId: string | null

  replyToMessage: MessageDto | null

  recommendedItem: SyncroItemDto | null
}

export const buildMessageDto = (p?: Partial<MessageDto>): MessageDto => ({
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  roomId: '',
  userId: '',
  text: '',
  user: buildUserSimpleDto(),
  isRead: false,

  repliedToRatingId: null,
  replyToMessage: null,
  recommendedItem: null,
  ...p,
})

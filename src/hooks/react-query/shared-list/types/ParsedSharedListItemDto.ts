import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

export type ParsedSharedListItemDto = {
  item: SyncroItemDto
  ratings: RatingDto[]
  interests: {
    userId: string
    interest: number
    id: string
  }[]
}

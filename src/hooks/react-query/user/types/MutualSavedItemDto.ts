import { RatingSimilarityDto } from '../../../../types/domain/rating/RatingSimilarityDto'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export type MutualSavedItemDto = {
  user: UserSimpleDto
  isSaved: boolean
  theirRating: number
  similarity: RatingSimilarityDto
}

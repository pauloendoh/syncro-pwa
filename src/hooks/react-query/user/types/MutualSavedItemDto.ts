import { RatingSimilarityByTypeDto } from '../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export type MutualSavedItemDto = {
  user: UserSimpleDto
  isSaved: boolean
  theirRating: number
  similarity?: RatingSimilarityByTypeDto
}

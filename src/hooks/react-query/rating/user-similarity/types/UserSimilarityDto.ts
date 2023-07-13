import { RatingSimilarityDto } from '../../../../../types/domain/rating/RatingSimilarityDto'
import { UserSimpleDto } from '../../../../../types/domain/user/UserSimpleDto'

// PE 1/3 - what's the difference with RatingsSimilarityDto?
export interface UserSimilarityDto {
  userB: UserSimpleDto
  allSimilarity: RatingSimilarityDto
  typeSimilarity: TypeSimilarity[]
}

interface TypeSimilarity {
  itemType: string
  similarityInfo: RatingSimilarityDto
}

import { RatingSimilarityByTypeDto } from '../../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { UserSimpleDto } from '../../../../../types/domain/user/UserSimpleDto'

// PE 1/3 - what's the difference with RatingsSimilarityDto?
export interface OverallUserSimilarityDto {
  userB: UserSimpleDto
  allSimilarity: RatingSimilarityByTypeDto
  typeSimilarity: TypeSimilarity[]
}

interface TypeSimilarity {
  itemType: string
  similarityInfo: RatingSimilarityByTypeDto
}

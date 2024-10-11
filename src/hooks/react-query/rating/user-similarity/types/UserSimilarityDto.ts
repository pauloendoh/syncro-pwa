import { RatingSimilarityByTypeDto } from '../../../../../types/domain/rating/RatingSimilarityByTypeDto'
import { UserSimpleDto } from '../../../../../types/domain/user/UserSimpleDto'

export interface OverallUserSimilarityDto {
  userB: UserSimpleDto
  allSimilarity: RatingSimilarityByTypeDto
  typeSimilarity: TypeSimilarity[]
}

interface TypeSimilarity {
  itemType: string
  similarityInfo: RatingSimilarityByTypeDto
}

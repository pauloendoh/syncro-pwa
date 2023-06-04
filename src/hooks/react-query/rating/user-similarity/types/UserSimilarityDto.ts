import { RatingSimilarityDto } from '../../../../../types/domain/rating/RatingSimilarityDto'
import { UserSimpleDto } from '../../../../../types/domain/user/UserSimpleDto'

export interface UserSimilarityDto {
  userB: UserSimpleDto
  allSimilarity: RatingSimilarityDto
  typeSimilarity: TypeSimilarity[]
}

interface TypeSimilarity {
  itemType: string
  similarityInfo: RatingSimilarityDto
}

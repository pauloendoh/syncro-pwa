import { UserSimpleDto } from '../../../../../types/domain/user/UserSimpleDto'

export interface UserSimilarityDto {
  userB: UserSimpleDto
  allSimilarity: AllSimilarity
  typeSimilarity: TypeSimilarity[]
}

interface TypeSimilarity {
  itemType: string
  similarityInfo: SimilarityInfo
}

interface SimilarityInfo {
  userB: UserSimpleDto
  userARatedCount: number
  ratingsSimilarityAvgPercentage?: number
  ratedSameItemsCount: number
  percentageQuantityFromUserA: number
  overallPercentage?: number
  highInterestCount: number
}

interface AllSimilarity {
  userB: UserSimpleDto
  userARatedCount: number
  ratingsSimilarityAvgPercentage: number
  ratedSameItemsCount: number
  percentageQuantityFromUserA: number
  overallPercentage: number
  highInterestCount: number
}

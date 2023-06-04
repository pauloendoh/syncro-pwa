import { UserSimpleDto } from '../user/UserSimpleDto'

export interface RatingSimilarityDto {
  userB: UserSimpleDto
  ratingsSimilarityAvgPercentage: number
  ratedSameItemsCount: number
  overallPercentage: number
}

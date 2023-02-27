import { UserSimpleDto } from "../user/UserSimpleDto"

export interface RatingSimilarityDto {
  userB: UserSimpleDto
  userARatedCount: number
  ratingsSimilarityAvgPercentage: number
  ratedSameItemsCount: number
  percentageQuantityFromUserA: number
  overallPercentage: number
  highInterestCount: number
}

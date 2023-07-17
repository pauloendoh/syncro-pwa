import { UserSimpleDto } from '../user/UserSimpleDto'

export interface RatingSimilarityByTypeDto {
  userB: UserSimpleDto
  ratedSameItemsCount: number
  overallPercentage: number
}

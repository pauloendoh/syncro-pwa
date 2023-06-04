import { UserSimpleDto } from '../user/UserSimpleDto'

export interface RatingSimilarityDto {
  userB: UserSimpleDto
  ratedSameItemsCount: number
  overallPercentage: number
}

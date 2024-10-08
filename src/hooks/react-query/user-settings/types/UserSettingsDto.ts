import { ScoringSystem } from '../../../../types/domain/rating/ScoringSystem'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export const emailFrequencyTypes = [
  'realTime',
  'daily',
  'weekly',
  'monthly',
  'off',
] as const

export type EmailFrequencyType = (typeof emailFrequencyTypes)[number]

export type UserSettingsDto = {
  userId?: string
  createdAt: string
  updatedAt: string
  emailUserIsFollowingYou: boolean
  emailDirectMessage: boolean
  emailUserRecommendedItem: EmailFrequencyType

  feedMinimumRating: number
  feedExcludeItemTypes: SyncroItemType[]
  feedExcludeRatedOrPlanned: boolean

  onboardingStatus: 'started' | 'searching' | 'finished'
  onboardingFavoriteGenre: SyncroItemType

  scoringSystem: ScoringSystem

  minRatingForSharing: number | null

  showDefaultStatusIsInProgressNow: boolean
}

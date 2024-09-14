import { ProfileDto } from '../profile/ProfileDto'
import { SyncroItemDto } from '../syncro-item/SyncroItemDto'
import { RatingProgressDto, buildRatingProgressDto } from './RatingProgressDto'
import { RatingStatusType } from './ratingStatusArray'
import { FavoriteSceneDto } from './types/FavoriteSceneDto'
import { RatingChangeType } from './types/RatingChangeType'

export type RatingDto = {
  id: string
  syncroItemId: string | null
  userId: string
  ratingValue: number | null
  review: string
  createdAt: string
  timelineDate: string

  updatedAt: string
  status: RatingStatusType
  changeType: RatingChangeType

  syncroItem?: SyncroItemDto
  user?: {
    username: string
    profile?: ProfileDto
  }

  ratingProgress?: RatingProgressDto
  scenes: FavoriteSceneDto[]
  consumedOn: string
  isPrivate: boolean

  importedFromUrl: string | null
  plannedPosition: number
  queuePosition: number | null

  completedDates: string[]
}

export const buildRatingDto = (p?: Partial<RatingDto>): RatingDto => ({
  id: '',
  syncroItemId: '',
  userId: '',
  ratingValue: null,
  review: '',
  status: 'COMPLETED',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  timelineDate: new Date().toISOString(),
  ratingProgress: buildRatingProgressDto(),
  changeType: 'RATED',
  scenes: [],
  consumedOn: '',
  isPrivate: false,
  importedFromUrl: null,
  plannedPosition: 9999,
  queuePosition: null,

  completedDates: [],

  ...p,
})

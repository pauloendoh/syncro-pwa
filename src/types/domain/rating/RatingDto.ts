import { ProfileDto } from '../profile/ProfileDto'
import { SyncroItemDto } from '../syncro-item/SyncroItemDto'

export type RatingDto = {
  id: string
  syncroItemId: string | null
  userId: string
  ratingValue: number | null
  review: string
  createdAt: string
  updatedAt: string

  syncroItem?: SyncroItemDto
  user?: {
    username: string
    profile?: ProfileDto
  }
}

export const buildRatingDto = (p?: Partial<RatingDto>): RatingDto => ({
  id: '',
  syncroItemId: '',
  userId: '',
  ratingValue: null,
  review: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})

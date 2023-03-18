import { SyncroItemType } from '../syncro-item/SyncroItemType/SyncroItemType'

export type ProfileDto = {
  userId: string
  pictureUrl: string
  fullName: string
  bio: string
  websiteUrl: string
  lookingForRecommendationTypes: SyncroItemType[]
  updatedAt: string
}

export const buildProfileDto = (p?: Partial<ProfileDto>): ProfileDto => ({
  userId: '',
  pictureUrl: '',
  fullName: '',
  bio: '',
  websiteUrl: '',
  lookingForRecommendationTypes: [],
  updatedAt: '',
  ...p,
})

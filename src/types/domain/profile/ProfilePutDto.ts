import { IsIn, IsString, MinLength } from 'class-validator'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../syncro-item/SyncroItemType/SyncroItemType'

export class ProfilePutDto {
  @IsString()
  name: string

  @IsString({ message: 'Username is required.' })
  @MinLength(6, { message: 'Username must have at least 6 characters.' })
  username: string

  @IsString()
  bio: string

  @IsString()
  website: string

  @IsIn(syncroItemTypes, {
    each: true,
  })
  lookingForRecommendationTypes: SyncroItemType[]
}

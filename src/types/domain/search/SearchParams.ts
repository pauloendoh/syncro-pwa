import { IsString } from 'class-validator'
import { SyncroItemType } from '../syncro-item/SyncroItemType/SyncroItemType'

export class SearchParams {
  @IsString()
  q: string

  @IsString()
  type: SyncroItemType | 'users' | 'all'
}

export type SearchType = SyncroItemType | 'users' | 'all'

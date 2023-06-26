import { IsDateString, IsIn } from 'class-validator'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export class MostRatedItemsQueryParams {
  @IsIn([...syncroItemTypes, 'all'])
  type: SyncroItemType | 'all'

  @IsDateString()
  createdAtGte: string
}

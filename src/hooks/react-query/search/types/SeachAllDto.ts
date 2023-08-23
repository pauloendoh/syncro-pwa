import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'

export interface SearchAllDto {
  movie: SyncroItemDto[]
  tvSeries: SyncroItemDto[]
  game: SyncroItemDto[]
  manga: SyncroItemDto[]
  book: SyncroItemDto[]
  users: UserSimpleDto[]
}

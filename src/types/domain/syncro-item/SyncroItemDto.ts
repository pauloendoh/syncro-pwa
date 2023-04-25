import { InterestDto } from '../interest/InterestDto'
import { RatingDto } from '../rating/RatingDto'
import { MangaExtraInfoDto } from './MangaExtraInfoDto/MangaExtraInfoDto'
import { SyncroItemType } from './SyncroItemType/SyncroItemType'

export interface SyncroItemDto {
  id: string
  title: string
  type: SyncroItemType
  imageUrl: string
  year: number
  avgRating: number
  ratingCount: number

  syncroAvgRating: number
  syncroRatingCount: number

  plotSummary: string
  genres: string[]

  imdbUrl: string | null
  igdbUrl: string | null
  mangaMalUrl: string | null
  openLibraryUrl: string | null
  ratings?: RatingDto[]
  interests?: InterestDto[]

  mangaExtraInfo?: MangaExtraInfoDto

  updatedAt: string
  createdAt: string
}

export const buildSyncroItemDto = (
  p?: Partial<SyncroItemDto>
): SyncroItemDto => ({
  id: '',
  title: '',
  type: 'tvSeries',
  imageUrl: '',
  year: 0,
  genres: [],

  imdbUrl: null,
  igdbUrl: null,
  mangaMalUrl: null,
  openLibraryUrl: null,

  avgRating: 0,
  ratingCount: 0,

  syncroAvgRating: 0,
  syncroRatingCount: 0,

  plotSummary: '',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  ...p,
})

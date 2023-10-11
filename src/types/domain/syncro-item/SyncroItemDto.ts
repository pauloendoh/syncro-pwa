import { InterestDto } from '../interest/InterestDto'
import { RatingDto } from '../rating/RatingDto'
import { BookExtraInfoDto } from './BookExtraInfoDto/BookExtraInfoDto'
import { GameExtraInfoDto } from './GameExtraInfoDto/GameExtraInfoDto'
import { ImdbExtraInfoDto } from './ImdbExtraInfoDto/ImdbExtraInfoDto'
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
  ratingUpdatedAt: string

  syncroAvgRating: number
  syncroRatingCount: number

  plotSummary: string
  genres: string[]

  imdbUrl: string | null
  igdbUrl: string | null
  mangaMalUrl: string | null
  openLibraryUrl: string | null
  youtubeMusicUrl: string | null
  tmdbUrl: string | null

  youtubeVideoUrl: string | null

  ratings?: Omit<RatingDto, 'syncroItem'>[]
  interests?: Omit<InterestDto, 'syncroItem'>[]

  mangaExtraInfo?: MangaExtraInfoDto
  gameExtraInfo?: GameExtraInfoDto
  imdbExtraInfo?: ImdbExtraInfoDto
  bookExtraInfo?: BookExtraInfoDto

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
  youtubeMusicUrl: null,
  youtubeVideoUrl: null,
  tmdbUrl: null,

  avgRating: 0,
  ratingCount: 0,
  ratingUpdatedAt: new Date().toISOString(),

  syncroAvgRating: 0,
  syncroRatingCount: 0,

  plotSummary: '',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  ...p,
})

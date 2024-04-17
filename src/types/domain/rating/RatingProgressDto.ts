export type RatingProgressDto = {
  id: string | null
  currentSeason: number
  currentEpisode: number
  currentChapter: number
  currentPage: number

  hoursToBeatGame: number

  createdAt: string
  updatedAt: string
}

export function buildRatingProgressDto(
  p?: Partial<RatingProgressDto>
): RatingProgressDto {
  return {
    id: null,
    currentSeason: 0,
    currentEpisode: 0,
    currentChapter: 0,
    currentPage: 0,
    hoursToBeatGame: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...p,
  }
}

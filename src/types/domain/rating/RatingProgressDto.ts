export type RatingProgressDto = {
  id: string | null
  currentSeason: number
  currentEpisode: number
  currentChapter: number
  currentPage: number
  createdAt: string
  updatedAt: string
}

export function buildRatingProgressDto(
  p?: Partial<RatingProgressDto>
): RatingProgressDto {
  return {
    id: null,
    currentSeason: 1,
    currentEpisode: 1,
    currentChapter: 1,
    currentPage: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...p,
  }
}

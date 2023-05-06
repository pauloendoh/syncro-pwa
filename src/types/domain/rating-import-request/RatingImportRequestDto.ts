export interface RatingImportRequestDto {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  importFrom: 'MAL-Anime'
  status: 'started' | 'finishedSuccessfully' | 'errorWhileInitialScraping'
  remainingItemsQty: number
}

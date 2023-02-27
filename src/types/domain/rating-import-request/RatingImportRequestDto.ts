export interface RatingImportRequestDto {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  importFrom: "MyAnimeList"
  status: "started" | "finishedSuccessfully" | "errorWhileInitialScraping"
  remainingItemsQty: number
}

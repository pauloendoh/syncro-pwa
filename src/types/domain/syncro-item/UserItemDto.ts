import { SyncroItemDto } from "./SyncroItemDto"

export type UserItemDto = SyncroItemDto & {
  myRating: number | null
  myInterest: number | null
}

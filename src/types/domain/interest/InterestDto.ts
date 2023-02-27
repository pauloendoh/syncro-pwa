import { SyncroItemDto } from "../syncro-item/SyncroItemDto"

export type InterestDto = {
  id: string
  syncroItemId: string | null
  userId: string
  interestLevel: number | null
  position: number

  createdAt: string
  updatedAt: string

  syncroItem?: SyncroItemDto
  user?: {
    username: string
  }
}

export const buildInterestDto = (p?: Partial<InterestDto>): InterestDto => ({
  id: "",
  syncroItemId: "",
  userId: "",
  interestLevel: null,
  position: 1,

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...p,
})

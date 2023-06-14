export const syncroItemTypes = [
  'movie',
  'tvSeries',
  'game',
  'manga',
  'book',
  'music',
] as const

export type SyncroItemType = (typeof syncroItemTypes)[number]

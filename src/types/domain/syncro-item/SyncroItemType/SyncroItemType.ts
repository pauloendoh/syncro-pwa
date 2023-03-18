export const syncroItemTypes = [
  'movie',
  'tvSeries',
  'game',
  'manga',
  'book',
] as const

export type SyncroItemType = typeof syncroItemTypes[number]

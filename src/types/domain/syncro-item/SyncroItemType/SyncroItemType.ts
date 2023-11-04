export const syncroItemTypes = [
  'movie',
  'tvSeries',
  'game',
  'manga',
  'book',
  'goodreadsBook',
  'music',
] as const

export type SyncroItemType = (typeof syncroItemTypes)[number]

export type SyncroItemTypeAll = SyncroItemType | 'all'

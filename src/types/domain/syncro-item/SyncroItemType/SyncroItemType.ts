export const syncroItemTypes = [
  'movie',
  'tvSeries',
  'game',
  'manga',
  'book',
  'goodreadsBook',
  'music',
] as const

export const validSyncroItemTypes = syncroItemTypes.filter(
  (t) => t !== 'book' && t !== 'music'
)

export type SyncroItemType = (typeof syncroItemTypes)[number]

export type SyncroItemTypeAll = SyncroItemType | 'all'

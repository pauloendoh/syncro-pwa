export const syncroItemTypes = ['movie', 'tvSeries', 'game', 'manga'] as const

export type SyncroItemType = typeof syncroItemTypes[number]

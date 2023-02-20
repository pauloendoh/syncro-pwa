export const syncroItemTypes = ["tvSeries", "movie", "game", "manga"] as const;

export type SyncroItemType = typeof syncroItemTypes[number];

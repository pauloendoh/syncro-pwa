import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export type SyncroItemTypeMapOption = {
  itemType: SyncroItemType
  labelPlural: string
  site: string
  tabIndex: number
  getTypeLabel: (isPlural?: boolean) => string
  getTypeLabelLowerCase: (isPlural?: boolean) => string
  planTo: string
  removeFromPlanTo: string
  inProgressLabel: string
}

// PE 1/3 - remove ? use useSyncroItemTypeMap ?
export const syncroItemOptions: SyncroItemTypeMapOption[] = [
  {
    itemType: 'movie',
    labelPlural: 'Movies',
    site: 'IMDb',
    tabIndex: 1,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Movies' : 'Movie'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'movies' : 'movie',
    planTo: 'Plan to watch',
    removeFromPlanTo: 'Remove from planned movies',
    inProgressLabel: 'watching',
  },

  {
    itemType: 'tvSeries',
    labelPlural: 'TV Series',

    site: 'IMDb',
    tabIndex: 0,
    getTypeLabel: (isPlural = false) => (isPlural ? 'TV Series' : 'TV Series'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'TV series' : 'TV series',
    planTo: 'Plan to watch',
    removeFromPlanTo: 'Remove from planned TV series',
    inProgressLabel: 'watching',
  },

  {
    itemType: 'game',
    labelPlural: 'Games',
    site: 'IGDB',
    tabIndex: 3,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Games' : 'Game'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'games' : 'game'),
    planTo: 'Plan to play',
    removeFromPlanTo: 'Remove from planned games',
    inProgressLabel: 'playing',
  },
  {
    itemType: 'manga',
    labelPlural: 'Manga',
    site: 'MAL',
    tabIndex: 4,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Manga' : 'Manga'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'manga' : 'manga'),
    planTo: 'Plan to read',
    removeFromPlanTo: 'Remove from planned manga',
    inProgressLabel: 'reading',
  },
  {
    itemType: 'book',
    labelPlural: 'Books',
    site: 'OpenLibrary',
    tabIndex: 2,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Books' : 'Book'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'books' : 'book'),
    planTo: 'Plan to read',
    removeFromPlanTo: 'Remove from planned books',
    inProgressLabel: 'reading',
  },
]

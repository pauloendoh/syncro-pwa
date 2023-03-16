import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

export const syncroItemOptions: {
  itemType: SyncroItemType
  labelPlural: string
  site: string
  tabIndex: number
  getTypeLabel: (isPlural?: boolean) => string
  getTypeLabelLowerCase: (isPlural?: boolean) => string
}[] = [
  {
    itemType: 'tvSeries',
    labelPlural: 'TV Series',

    site: 'IMDb',
    tabIndex: 0,
    getTypeLabel: (isPlural = false) => (isPlural ? 'TV Series' : 'TV Series'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'TV series' : 'TV series',
  },
  {
    itemType: 'movie',
    labelPlural: 'Movies',
    site: 'IMDb',
    tabIndex: 1,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Movies' : 'Movie'),
    getTypeLabelLowerCase: (isPlural = false) =>
      isPlural ? 'movies' : 'movie',
  },
  {
    itemType: 'game',
    labelPlural: 'Games',
    site: 'IGDb',
    tabIndex: 2,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Games' : 'Game'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'games' : 'game'),
  },
  {
    itemType: 'manga',
    labelPlural: 'Manga',
    site: 'MAL',
    tabIndex: 3,
    getTypeLabel: (isPlural = false) => (isPlural ? 'Manga' : 'Manga'),
    getTypeLabelLowerCase: (isPlural = false) => (isPlural ? 'manga' : 'manga'),
  },
]

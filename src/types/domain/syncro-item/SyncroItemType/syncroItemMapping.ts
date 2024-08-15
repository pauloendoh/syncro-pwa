import { SyncroItemType } from './SyncroItemType'

// PE 1/3 - remover isso?.. usar o useSyncroItemTypeMap ?
export const syncroItemMapping: {
  [key in SyncroItemType]: {
    labelPlural: string
    site: string
    tabIndex: number
  }
} = {
  tvSeries: {
    labelPlural: 'TV Series',
    site: 'IMDb',
    tabIndex: 0,
  },
  movie: {
    labelPlural: 'Movies',
    site: 'IMDb',
    tabIndex: 1,
  },
  book: {
    labelPlural: 'Books (old)',
    site: 'OpenLibrary',
    tabIndex: 2,
  },
  goodreadsBook: {
    labelPlural: 'Books',
    site: 'Goodreads',
    tabIndex: 3,
  },

  game: {
    labelPlural: 'Games',
    site: 'IGDB',
    tabIndex: 4,
  },
  manga: {
    labelPlural: 'Manga',
    site: 'MAL',
    tabIndex: 5,
  },
  music: {
    labelPlural: 'Music',
    site: 'Youtube',
    tabIndex: 6,
  },
}

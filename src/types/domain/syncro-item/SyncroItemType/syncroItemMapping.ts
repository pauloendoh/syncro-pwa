import { SyncroItemType } from './SyncroItemType'

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
    labelPlural: 'Books',
    site: 'OpenLibrary',
    tabIndex: 2,
  },
  goodreadsBook: {
    labelPlural: 'Goodreads Books',
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

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
    site: 'IMDB',
    tabIndex: 0,
  },
  movie: {
    labelPlural: 'Movies',
    site: 'IMDB',
    tabIndex: 1,
  },
  game: {
    labelPlural: 'Games',
    site: 'IGDB',
    tabIndex: 2,
  },
  manga: {
    labelPlural: 'Manga',
    site: 'MAL',
    tabIndex: 3,
  },
}

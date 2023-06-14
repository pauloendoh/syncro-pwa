import { SearchParams } from '../../../types/domain/search/SearchParams'

export const searchTabOptions: {
  key: SearchParams['type']
  label: string
}[] = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'movie',
    label: 'Movies',
  },
  {
    key: 'tvSeries',
    label: 'TV Series',
  },

  {
    key: 'game',
    label: 'Games',
  },
  {
    key: 'manga',
    label: 'Manga',
  },
  {
    key: 'book',
    label: 'Books',
  },
  {
    key: 'music',
    label: 'Music',
  },

  {
    key: 'users',
    label: 'Users',
  },
]

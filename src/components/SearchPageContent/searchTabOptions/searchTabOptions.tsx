import { SearchParams } from '../../../types/domain/search/SearchParams'

export const searchTabOptions: {
  key: SearchParams['type']
  label: string
}[] = [
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
    key: 'users',
    label: 'Users',
  },
]
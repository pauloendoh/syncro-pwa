import { SearchParams } from '../../../domains/search/types/SearchParams'

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
    key: 'users',
    label: 'Users',
  },
]

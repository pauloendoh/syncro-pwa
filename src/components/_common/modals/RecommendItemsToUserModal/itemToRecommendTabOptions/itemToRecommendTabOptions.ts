import { SearchParams } from '../../../../../types/domain/search/SearchParams'

export const itemToRecommendTabOptions: {
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
    key: 'goodreadsBook',
    label: 'Books',
  },
]

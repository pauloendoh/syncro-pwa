import { ExploreSlug } from '../../../hooks/useMyRouterQuery'

export const exploreTabOptions: {
  key: ExploreSlug
  label: string
}[] = [
  {
    key: 'most-rated',
    label: 'Most Rated',
  },
  {
    key: 'popular-users',
    label: 'Popular Users',
  },
  {
    key: 'rating-similarity',
    label: 'Rating Similarity',
  },
  {
    key: 'new-users',
    label: 'New Users',
  },
]

import { ExploreSlug } from '../../../hooks/useMyRouterQuery'

export const exploreTabOptions: {
  key: ExploreSlug
  label: string
}[] = [
  {
    key: 'browse',
    label: 'Browse items',
  },
  {
    key: 'for-you',
    label: 'Recommended for you',
  },

  {
    key: 'rating-similarity',
    label: 'Similar Users',
  },
  {
    key: 'new-users',
    label: 'New Users',
  },
]

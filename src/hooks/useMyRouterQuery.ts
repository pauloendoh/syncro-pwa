import { useRouter } from 'next/router'
import { SearchParams } from '../types/domain/search/SearchParams'

export const useMyRouterQuery = () => {
  const router = useRouter()
  const query = router.query
  return query as {
    syncroItemId: string
    userId: string

    q: string
    type: SearchParams['type']
    exploreSlug: ExploreSlug
    roomId: string
  }
}

export type ExploreSlug = 'popular-users' | 'rating-similarity' | 'new-users'

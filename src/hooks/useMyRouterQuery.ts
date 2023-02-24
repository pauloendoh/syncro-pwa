import { useRouter } from 'next/router'
import { SearchParams } from '../domains/search/types/SearchParams'

export const useMyRouterQuery = () => {
  const router = useRouter()
  const query = router.query
  return query as {
    syncroItemId?: string
    userId?: string

    q?: string
    type?: SearchParams['type']
  }
}

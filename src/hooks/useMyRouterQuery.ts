import { useRouter } from 'next/router'

export const useMyRouterQuery = () => {
  const router = useRouter()
  const query = router.query
  return query as {
    syncroItemId?: string
    userId?: string
  }
}

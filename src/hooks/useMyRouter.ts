import Router from 'next/router'

export function useMyRouter() {
  if (typeof window === 'undefined') {
    return null
  }

  const router = Router
  return router
}

import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export const usePreviousRoute = () => {
  const router = useRouter()

  const ref = useRef<string | null>(null)

  useEffect(() => {
    ref.current = router.asPath
  }, [router.asPath])

  return ref.current
}

// components/RouterTransition.tsx
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'

export function RouterTransition() {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && nprogress.start()
    const handleComplete = () => nprogress.complete()

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.asPath])

  const { isMobile } = useMyMediaQuery()

  return <NavigationProgress autoReset={true} size={isMobile ? 6 : undefined} />
}

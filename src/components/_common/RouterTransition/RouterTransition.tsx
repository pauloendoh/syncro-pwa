// components/RouterTransition.tsx
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'

export function RouterTransition() {
  const router = useRouter()

  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        // if same path, don't do anything
        const isSamePath = url.split('?')[0] === router.asPath.split('?')[0]
        if (isSamePath) {
          setShouldAnimate(false)
          return
        }

        setShouldAnimate(true)
        nprogress.start()
      }
    }

    const handleComplete = () => {
      if (shouldAnimate) nprogress.complete()
    }

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

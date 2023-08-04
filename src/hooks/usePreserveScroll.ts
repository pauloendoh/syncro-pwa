import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import useVirtuosoStore from './useVirtuosoStore'

export const usePreserveScroll = () => {
  const router = useRouter()

  const [scrollPositions, setScrollPositions] = useState<{
    [url: string]: number
  }>({})
  useRef<{ [url: string]: number }>({})

  const isBack = useRef(false)

  const { virtuosoStates, clearVirtuosoState } = useVirtuosoStore()

  useEffect(() => {
    router.beforePopState(() => {
      isBack.current = true
      return true
    })

    const onRouteChangeStart = (nextUrl: string) => {
      console.log('router change scroll')
      const prevUrl = router.asPath
      setScrollPositions((prev) => ({ ...prev, [prevUrl]: window.scrollY }))

      if (virtuosoStates[nextUrl] && !isBack.current) {
        console.log({
          isBack: isBack.current,
        })
        console.log('clearing virtuoso state: ' + nextUrl)
        clearVirtuosoState(nextUrl)
      }
    }

    const onRouteChangeComplete = (url: any) => {
      if (isBack.current && scrollPositions[url]) {
        window.scroll({
          top: scrollPositions[url],
          behavior: 'auto',
        })
      }

      isBack.current = false
    }

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])
}

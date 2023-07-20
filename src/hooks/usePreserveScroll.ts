import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

export const usePreserveScroll = () => {
  const router = useRouter()

  const [scrollPositions, setScrollPositions] = useState<{
    [url: string]: number
  }>({})
  useRef<{ [url: string]: number }>({})
  const [isBack, setIsBack] = useState(false)

  useEffect(() => {
    router.beforePopState(() => {
      setIsBack(true)
      return true
    })

    const onRouteChangeStart = () => {
      const url = router.asPath
      setScrollPositions((prev) => ({ ...prev, [url]: window.scrollY }))
    }

    const onRouteChangeComplete = (url: any) => {
      if (isBack && scrollPositions[url]) {
        window.scroll({
          top: scrollPositions[url],
          behavior: 'auto',
        })
      }

      setIsBack(false)
    }

    router.events.on('routeChangeStart', onRouteChangeStart)
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router])
}

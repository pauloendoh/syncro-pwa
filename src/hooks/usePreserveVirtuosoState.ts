import { useRouter } from 'next/router'
import { RefObject, useEffect, useMemo } from 'react'
import { VirtuosoHandle } from 'react-virtuoso'
import useVirtuosoStore from './useVirtuosoStore'

export const usePreserveVirtuosoState = (ref: RefObject<VirtuosoHandle>) => {
  const router = useRouter()

  const [virtuosoStates, setVirtuosoState] = useVirtuosoStore((s) => [
    s.virtuosoStates,
    s.setVirtuosoState,
  ])

  useEffect(() => {
    const onRouteChangeStart = () => {
      console.log('router change virtuoso')
      const url = router.asPath
      if (ref.current) {
        ref.current.getState((state) => {
          setVirtuosoState(url, state)
        })
      }
    }

    router.events.on('routeChangeStart', onRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', onRouteChangeStart)
    }
  }, [router])

  const state = useMemo(() => {
    return virtuosoStates[router.asPath]
  }, [router.asPath, virtuosoStates[router.asPath]])

  return state
}

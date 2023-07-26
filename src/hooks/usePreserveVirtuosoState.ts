import { useRouter } from 'next/router'
import { RefObject, useEffect, useMemo, useRef } from 'react'
import { VirtuosoHandle } from 'react-virtuoso'
import useVirtuosoStore from './useVirtuosoStore'

export const usePreserveVirtuosoState = (ref: RefObject<VirtuosoHandle>) => {
  const router = useRouter()

  const { virtuosoStates, setVirtuosoState } = useVirtuosoStore()
  useRef<{ [url: string]: number }>({})

  useEffect(() => {
    const onRouteChangeStart = () => {
      const url = router.asPath
      if (ref.current) {
        console.log(virtuosoStates[url])
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
    console.log('state', virtuosoStates[router.asPath])
    return virtuosoStates[router.asPath]
  }, [router.asPath])

  return state
}

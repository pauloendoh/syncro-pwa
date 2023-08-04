import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useMyRouterBack } from '../utils/router/routerBackIfSameDomain'
import { getSessionStorage } from '../utils/sessionStorageKeys'

export function useMyQueryState<T extends string>(param: string) {
  const [localValue, setLocalValue] = useState<T | undefined>(undefined)
  const router = useRouter()

  const myRouterBack = useMyRouterBack(param)

  const updateUrlValue = useCallback(
    (
      newValue: T,
      options?: {
        replace?: boolean
        scroll?: boolean
        shallow?: boolean
      }
    ) => {
      const { replace = false, scroll = false, shallow = false } = options || {}

      setLocalValue(newValue)
      router.query[param] = newValue

      if (replace) {
        router.replace(router, undefined, { scroll, shallow })
        return
      }

      router.push(router, undefined, {
        scroll,
        shallow,
      })
    },
    []
  )

  const removeUrlValue = useCallback((options?: { backTwice?: boolean }) => {
    setLocalValue(undefined)
    myRouterBack()

    const historyLength = window.history.length
    const initialHistoryLength = Number(
      getSessionStorage('initialHistoryLength')
    )

    if (options?.backTwice && historyLength > initialHistoryLength) {
      router.back()
    }
  }, [])

  useEffect(() => {
    if (!router.query[param] && !!localValue) {
      removeUrlValue()
      return
    }

    if (router.query[param] && !localValue) {
      setLocalValue(router.query[param] as T)
    }
  }, [router.query[param]])

  return {
    queryValue: localValue,
    setQuery: updateUrlValue,
    removeQuery: removeUrlValue,
  }
}

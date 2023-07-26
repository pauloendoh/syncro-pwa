import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { routerBackIfSameDomainOrClearQueryParam } from '../utils/router/routerBackIfSameDomain'
import { getSessionStorage } from '../utils/sessionStorageKeys'

export function useMyQueryState<T extends string>(key: string) {
  const [localValue, setLocalValue] = useState<T | undefined>(undefined)
  const router = useRouter()

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
      router.query[key] = newValue

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
    routerBackIfSameDomainOrClearQueryParam(key)

    const historyLength = window.history.length
    const initialHistoryLength = Number(
      getSessionStorage('initialHistoryLength')
    )

    if (options?.backTwice && historyLength > initialHistoryLength) {
      router.back()
    }
  }, [])

  useEffect(() => {
    if (!router.query[key] && !!localValue) {
      removeUrlValue()
      return
    }

    if (router.query[key] && !localValue) {
      setLocalValue(router.query[key] as T)
    }
  }, [router.query[key]])

  return {
    queryValue: localValue,
    setQuery: updateUrlValue,
    removeQuery: removeUrlValue,
  }
}

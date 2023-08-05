import { useCallback, useEffect, useState } from 'react'
import { routerBackIfSameDomainOrClearQueryParam } from '../utils/router/routerBackIfSameDomain'
import { getSessionStorage } from '../utils/sessionStorageKeys'
import { useMyRouter } from './useMyRouter'

export function useMyQueryState<T extends string>(param: string) {
  const [localValue, setLocalValue] = useState<T | undefined>(undefined)
  const router = useMyRouter()

  const setQuery = useCallback(
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
      if (router) {
        router.query[param] = newValue
      }

      if (replace) {
        router?.replace(router, undefined, { scroll, shallow })
        return
      }

      router?.push(router, undefined, {
        scroll,
        shallow,
      })
    },
    []
  )

  const removeQuery = useCallback((options?: { backTwice?: boolean }) => {
    setLocalValue(undefined)
    routerBackIfSameDomainOrClearQueryParam(param)

    const historyLength = window.history.length
    const initialHistoryLength = Number(
      getSessionStorage('initialHistoryLength')
    )

    if (options?.backTwice && historyLength > initialHistoryLength) {
      router?.back()
    }
  }, [])

  useEffect(() => {
    if (!router?.query[param] && !!localValue) {
      removeQuery()
      return
    }

    if (router?.query[param] && !localValue) {
      setLocalValue(router?.query[param] as T)
    }
  }, [router?.query[param]])

  return {
    queryValue: localValue,
    setQuery,
    removeQuery,
  }
}

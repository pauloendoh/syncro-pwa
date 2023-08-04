import Router from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { routerBackIfSameDomainOrClearQueryParam } from '../utils/router/routerBackIfSameDomain'
import { getSessionStorage } from '../utils/sessionStorageKeys'

export function useMyQueryState<T extends string>(param: string) {
  const [localValue, setLocalValue] = useState<T | undefined>(undefined)

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
      Router.query[param] = newValue

      if (replace) {
        Router.replace(Router, undefined, { scroll, shallow })
        return
      }

      Router.push(Router, undefined, {
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
      Router.back()
    }
  }, [])

  useEffect(() => {
    if (!Router.query[param] && !!localValue) {
      removeQuery()
      return
    }

    if (Router.query[param] && !localValue) {
      setLocalValue(Router.query[param] as T)
    }
  }, [Router.query[param]])

  return {
    queryValue: localValue,
    setQuery,
    removeQuery,
  }
}

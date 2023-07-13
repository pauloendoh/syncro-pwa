import Router from 'next/router'
import { sessionStorageKeys } from '../sessionStorageKeys'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionStorageKeys.previousPath)
  const currentPath = Router.asPath

  const canGoBack = window.history.length > 2

  console.log({
    previousPath,
    currentPath,
    canGoBack,
    cameFromSomewhere: document.referrer,
    history: window.history.length,
  })

  if (previousPath) {
    if (previousPath !== currentPath && canGoBack) {
      Router.back()
      return
    }
  }

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

import Router from 'next/router'
import { sessionKeys } from '../sessionStorageKeys'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionKeys.previousPath)
  const currentPath = Router.asPath

  const canGoBack = window.history.length > 2

  const cameFromDomain = sessionStorage.getItem(sessionKeys.cameFromDomain)
  const cameFromDifferentDomain =
    cameFromDomain && !cameFromDomain.includes(window.location.hostname)

  console.log({
    previousPath,
    currentPath,
    canGoBack,
    cameFromSomewhere: document.referrer,
    history: window.history.length,
  })

  if (previousPath) {
    if (previousPath !== currentPath && !cameFromDifferentDomain) {
      Router.back()
      return
    }
  }

  sessionStorage.removeItem(sessionKeys.cameFromDomain)
  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

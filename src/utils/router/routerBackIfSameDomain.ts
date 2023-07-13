import Router from 'next/router'
import { sessionStorageKeys } from '../sessionStorageKeys'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionStorageKeys.previousPath)
  const currentPath = Router.asPath

  const cameFromSomewhere = !!document.referrer

  console.log({
    previousPath,
    currentPath,
    cameFromSomewhere,
  })

  if (previousPath) {
    if (previousPath !== currentPath && cameFromSomewhere) {
      Router.back()
      return
    }
  }

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

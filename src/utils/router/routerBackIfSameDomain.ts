import Router from 'next/router'
import { sessionKeys } from '../sessionStorageKeys'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionKeys.previousPath)
  const currentPath = Router.asPath

  if (previousPath) {
    if (previousPath !== currentPath) {
      Router.back()
      if (Router.asPath !== currentPath) {
        return
      }
    }
  }

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

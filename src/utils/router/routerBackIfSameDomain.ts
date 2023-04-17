import Router from 'next/router'
import { sessionStorageKeys } from '../sessionStorageKeys'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionStorageKeys.previousPath)
  const currentPath = Router.asPath

  if (previousPath) {
    if (previousPath !== currentPath) {
      Router.back()
      return
    }
  }

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

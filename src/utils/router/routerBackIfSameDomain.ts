import Router from 'next/router'
import { sessionKeys } from '../sessionStorageKeys'

/**
 * This solution is still not perfect.
 * If I go from twitter -> syncro modal -> close modal (should work ok) -> back to last page (opens modal) -> close modal goes to twitter
 * I want to replicate https://twitter.com/compose/tweet
 */
export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousPath = sessionStorage.getItem(sessionKeys.previousPath)
  const intermediaryPath = Router.asPath

  if (previousPath) {
    if (previousPath !== intermediaryPath) {
      Router.back()

      // if path didn't change, that means we are currently in the first URL of window.history
      if (Router.asPath !== intermediaryPath) {
        return
      }
    }
  }

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
  return
}

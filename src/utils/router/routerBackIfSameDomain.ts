import Router, { useRouter } from 'next/router'

/**
 * This solution is still not perfect.
 * If I go from twitter -> syncro modal -> close modal (should work ok) -> back to last page (opens modal) -> close modal goes to twitter
 * I want to replicate https://twitter.com/compose/tweet
 */
export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const closeRedirect = () => {
    delete Router.query[queryParam]
    Router.replace(Router, undefined, { scroll: false, shallow: true })
  }

  closeRedirect()
}

export const useMyRouterBack = (queryParam: string) => {
  const router = useRouter()
  const closeRedirect = () => {
    router.query[queryParam] = undefined

    router.replace(router, undefined, { scroll: false, shallow: true })
  }

  return closeRedirect
}

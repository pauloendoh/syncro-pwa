import Router, { useRouter } from 'next/router'

/**
 * This solution is still not perfect.
 * If I go from twitter -> syncro modal -> close modal (should work ok) -> back to last page (opens modal) -> close modal goes to twitter
 * I want to replicate https://twitter.com/compose/tweet
 */
export const routerBackIfSameDomainOrClearQueryParam = (
  queryParam: string,
  options?: {
    backTwice: boolean
  }
) => {
  const closeRedirect = () => {
    delete Router.query[queryParam]
    Router.replace(Router, undefined, { scroll: false, shallow: true })
  }

  closeRedirect()

  // make an array of urls for useHistory ... beforeHistoryChange
  // if (options?.backTwice) {
  // Router.back()
  // }
}

export const useMyRouterBack = (queryParam: string) => {
  const router = useRouter()
  const closeRedirect = () => {
    console.log('router.query', router.query)
    delete router.query[queryParam]

    router.replace(router, undefined, {
      scroll: false,
      shallow: true,
    })
  }

  return closeRedirect
}

import Router from 'next/router'

export const routerBackIfSameDomainOrClearQueryParam = (queryParam: string) => {
  const previousUrl = document.referrer

  if (previousUrl) {
    const previousDomain = new URL(previousUrl).origin
    const currentDomain = new URL(window.location.href).origin

    if (previousDomain === currentDomain) {
      Router.back()
      return
    }
  }

  // 20230411 - testing Router.back for every scenario
  Router.back()

  // console.log(Router.route)
  // delete Router.query[queryParam]
  // Router.push(Router, undefined, { scroll: false })
}

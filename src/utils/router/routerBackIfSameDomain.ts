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

  delete Router.query[queryParam]
  Router.push(Router, undefined, { scroll: false })
}

export const getAuthUrl = (type: 'login' | 'signup') => {
  if (type === 'login') return getSignIn()

  return getSignUp()
}

const getSignIn = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const redirectTo = urlParams.get('redirectTo')

    if (redirectTo) {
      return `/auth?redirectTo=${redirectTo}`
    }

    const currentUrl = window.location.pathname

    if (currentUrl === '/auth') {
      return '/auth'
    }

    return '/auth?redirectTo=' + currentUrl
  }

  return '/auth'
}

const getSignUp = () => {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const redirectTo = urlParams.get('redirectTo')

    if (redirectTo) {
      return `/auth?initialPage=signUp&redirectTo=${redirectTo}`
    }

    const currentUrl = window.location.pathname

    if (currentUrl === '/auth') {
      return '/auth?initialPage=signUp'
    }

    return '/auth?initialPage=signUp&redirectTo=' + currentUrl
  }

  return '/auth?initialPage=signUp'
}

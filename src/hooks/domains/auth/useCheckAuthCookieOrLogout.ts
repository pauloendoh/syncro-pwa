import { create } from 'zustand'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { cookieKeys } from '../../../utils/consts/cookieKeys'
import nookies from '../../../utils/nookies'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { useMyRouterQuery } from '../../useMyRouterQuery'
import useAuthStore from '../../zustand/useAuthStore'
import { useLogoutAndPushIndex } from './useLogoutAndPushIndex'

interface IStore {
  loadingCheckAuthCookie: boolean
  setLoadingCheckAuthCookie: (loadingCheckAuthCookie: boolean) => void
}

const useStore = create<IStore>((set) => ({
  loadingCheckAuthCookie: true,
  setLoadingCheckAuthCookie: (loadingCheckAuthCookie) =>
    set({ loadingCheckAuthCookie }),
}))

const useCheckAuthCookieOrLogout = () => {
  const logout = useLogoutAndPushIndex()

  const { oauthToken, userId } = useMyRouterQuery()
  const axios = useAxios(false)
  const { setAuthUser } = useAuthStore()

  const { loadingCheckAuthCookie, setLoadingCheckAuthCookie } = useStore()

  const checkAuthCookieOrLogout = () => {
    const userCookieStr = nookies.get(null)[cookieKeys.user]

    if (!userCookieStr) {
      if (oauthToken && userId) {
        axios
          .post<AuthUserGetDto>(urls.api.authGoogleLogin, {
            userId,
            token: oauthToken,
          })
          .then((res) => {
            const user = res.data
            setAuthUser(user)
          })
      }
      setLoadingCheckAuthCookie(false)
      return
    }

    // Regular login
    const user: AuthUserGetDto = JSON.parse(userCookieStr)
    if (new Date(user.tokenExpiresAt) <= new Date()) {
      logout()
      setLoadingCheckAuthCookie(false)
      return
    }

    axios
      .get<AuthUserGetDto>(urls.api.me)
      .then((res) => {
        setAuthUser(res.data)
      })
      .catch((e) => {
        logout()
      })
      .finally(() => {
        setLoadingCheckAuthCookie(false)
      })
  }

  return {
    checkAuthCookieOrLogout,
    loadingCheckAuthCookie,
  }
}

export default useCheckAuthCookieOrLogout

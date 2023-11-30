import { useState } from 'react'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import { cookieKeys } from '../../../utils/consts/cookieKeys'
import nookies from '../../../utils/nookies'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import { useMyRouterQuery } from '../../useMyRouterQuery'
import useAuthStore from '../../zustand/useAuthStore'
import { useLogoutAndPushIndex } from './useLogoutAndPushIndex'

const useCheckAuthOrLogout = () => {
  const logout = useLogoutAndPushIndex()

  const [loading, setLoading] = useState(true)

  const { oauthToken, userId } = useMyRouterQuery()
  const axios = useAxios(false)
  const { setAuthUser } = useAuthStore()

  const checkAuthOrLogout = () => {
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
      return setLoading(false)
    }

    // Regular login
    const user: AuthUserGetDto = JSON.parse(userCookieStr)
    if (new Date(user.tokenExpiresAt) <= new Date()) {
      logout()
      return setLoading(false)
    }

    axios
      .get<AuthUserGetDto>(urls.api.me)
      .then((res) => {
        setAuthUser(res.data)
      })
      .catch((e) => {
        logout()
      })
      .finally(() => setLoading(false))
  }

  return { checkAuthOrLogout, loading }
}

export default useCheckAuthOrLogout

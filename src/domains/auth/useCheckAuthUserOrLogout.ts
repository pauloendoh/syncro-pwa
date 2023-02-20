import nookies from 'nookies'
import { useState } from 'react'
import { useLogoutAndPushIndex } from '../../hooks/domains/auth/useLogoutAndPushIndex'
import { urls } from '../../utils/urls'
import { useAxios } from '../../utils/useAxios'
import { AuthUserGetDto } from './types/AuthUserGetDto'
import useAuthStore from './useAuthStore'

const useCheckAuthOrLogout = () => {
  const logout = useLogoutAndPushIndex()

  const [loading, setLoading] = useState(true)

  const axios = useAxios(false)
  const { setAuthUser } = useAuthStore()

  const checkAuthOrLogout = () => {
    const userCookieStr = nookies.get(null).user
    if (!userCookieStr) {
      return setLoading(false)
    }

    // Regular login
    const user: AuthUserGetDto = JSON.parse(userCookieStr)
    if (new Date(user.expiresAt) <= new Date()) {
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

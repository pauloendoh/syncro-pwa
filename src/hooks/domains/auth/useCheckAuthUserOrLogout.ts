import { useState } from 'react'
import { AuthUserGetDto } from '../../../types/domain/auth/AuthUserGetDto'
import nookies from '../../../utils/nookies'
import { urls } from '../../../utils/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'
import { useLogoutAndPushIndex } from './useLogoutAndPushIndex'

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

import { useEffect } from 'react'
import { urls } from '../../../utils/urls/urls'
import { useAxios } from '../../../utils/useAxios'
import useAuthStore from '../../zustand/useAuthStore'

export const useLogUserInfo = () => {
  const { getAuthUserId } = useAuthStore()

  const axios = useAxios()

  useEffect(() => {
    if (getAuthUserId()) {
      axios.post(urls.api.dashboard.addUserDailyLog)
    }
  }, [getAuthUserId()])
}

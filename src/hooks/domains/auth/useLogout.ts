import { useRouter } from 'next/router'
import { urls } from '../../../utils/urls'
import { resetAuthStore } from '../../zustand/useAuthStore'

export const useLogout = () => {
  // const { showSuccessToast } = useMyToast()
  // const axios = useAxios()

  const router = useRouter()
  const logout = async () => {
    resetAuthStore()
    router.push(urls.pages.indexAndRedirectTo(router.asPath))
    // showSuccessToast("Logged out!")
  }

  return logout
}

import { useRouter } from 'next/router'
import { urls } from '../../../utils/urls'
import { resetAuthStore } from '../../zustand/useAuthStore'

export const useLogoutAndPushIndex = () => {
  const router = useRouter()

  const logout = () => {
    resetAuthStore()
    router.push(urls.pages.indexAndRedirectTo(router.asPath))
  }
  return logout
}

import { useRouter } from 'next/router'
import { resetAuthStore } from '../../../domains/auth/useAuthStore'
import { urls } from '../../../utils/urls'

export const useLogoutAndPushIndex = () => {
  const router = useRouter()

  const logout = () => {
    resetAuthStore()
    router.push(urls.pages.index)
  }
  return logout
}

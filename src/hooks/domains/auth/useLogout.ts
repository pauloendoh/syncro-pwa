import { resetAuthStore } from '../../../domains/auth/useAuthStore'

export const useLogout = () => {
  // const { showSuccessToast } = useMyToast()
  // const axios = useAxios()

  const logout = async () => {
    resetAuthStore()
    // showSuccessToast("Logged out!")
  }
  return logout
}

import { useAuthStoreV2 } from '../../zustand/useAuthStore'

export const useAuthUser = () => {
  const { authUser } = useAuthStoreV2({ authUser: true })

  return authUser
}

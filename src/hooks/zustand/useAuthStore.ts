import { create } from 'zustand'
import { AuthUserGetDto } from '../../types/domain/auth/AuthUserGetDto'
import nookies from '../../utils/nookies'

interface IAuthStore {
  authUser: AuthUserGetDto | null
  setAuthUser: (authUser: AuthUserGetDto) => void
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  setAuthUser: async (authUser) => {
    const expiresAt = new Date(authUser.expiresAt)
    set({ authUser })

    await nookies.set(null, 'user', JSON.stringify(authUser))

    // Refresh logout timeout
    setTimeout(() => {
      return resetAuthStore()
    }, expiresAt.getTime() - new Date().getTime())
  },
}))
const initialState = useAuthStore.getState()
export const resetAuthStore = async () => {
  nookies.destroy(null, 'user')
  useAuthStore.setState(initialState, true)
}

export default useAuthStore

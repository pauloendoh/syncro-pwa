import { create } from 'zustand'
import nookies from '../../utils/nookies'
import { AuthUserGetDto } from './types/AuthUserGetDto'

interface IAuthStore {
  authUser: AuthUserGetDto | null
  setAuthUser: (authUser: AuthUserGetDto) => void
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  setAuthUser: async (authUser) => {
    const expiresAt = new Date(authUser.expiresAt)
    set({ authUser })

    nookies.set(null, 'user', JSON.stringify(authUser))

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

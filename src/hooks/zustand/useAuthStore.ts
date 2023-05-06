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
    set({ authUser })

    nookies.set(null, 'user', JSON.stringify(authUser), {
      secure: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 1 year
    })
  },
}))
const initialState = useAuthStore.getState()
export const resetAuthStore = async () => {
  nookies.destroy(null, 'user', {
    secure: true,
    path: '/',
  })
  useAuthStore.setState(initialState, true)
}

export default useAuthStore

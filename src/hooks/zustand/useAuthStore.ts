import { create } from 'zustand'
import { AuthUserGetDto } from '../../types/domain/auth/AuthUserGetDto'
import { cookieKeys } from '../../utils/consts/cookieKeys'
import nookies from '../../utils/nookies'
import { buildShallowStoreHookV2 } from './utils/useShallowStore'

interface IAuthStore {
  authUser: AuthUserGetDto | null
  setAuthUser: (authUser: AuthUserGetDto) => void
  getAuthUserId: () => string
  test: string
  setTest: (test: string) => void
  test2: string
  setTest2: (test2: string) => void
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  authUser: null,
  setAuthUser: async (authUser) => {
    set({ authUser })

    nookies.set(null, cookieKeys.user, JSON.stringify(authUser), {
      secure: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 1 year
    })
  },
  getAuthUserId: () => {
    const { authUser } = get()
    return authUser?.id || ''
  },
  test: 'casca de bala',
  setTest: (test) => set({ test }),
  test2: 'casca de bala 2',
  setTest2: (test2) => set({ test2 }),
}))

export const useAuthStoreV2 = buildShallowStoreHookV2(useAuthStore)

const initialState = useAuthStore.getState()
export const resetAuthStore = async () => {
  nookies.destroy(null, cookieKeys.user, {
    secure: true,
    path: '/',
  })
  useAuthStore.setState(initialState, true)
}

export default useAuthStore

import { create } from 'zustand'

interface IStore {
  email: string
  setEmail: (email: string) => void
  code: string
  setCode: (code: string) => void
}

const usePasswordResetStore = create<IStore>((set, get) => ({
  email: '',
  setEmail: (email: string) => {
    set({ email })
  },

  code: '',
  setCode: (code: string) => {
    set({ code })
  },
}))

const initialState = usePasswordResetStore.getState()
export const resetPasswordResetStore = async () => {
  usePasswordResetStore.setState(initialState, true)
}

export default usePasswordResetStore

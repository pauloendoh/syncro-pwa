import { create } from 'zustand'
import { buildShallowStoreHookV2 } from './utils/useShallowStore'

interface IStore {
  identificator: string
  setIdentificator: (value: string) => void
  code: string
  setCode: (code: string) => void
}

const usePasswordResetStore = create<IStore>((set, get) => ({
  identificator: '',
  setIdentificator: (value: string) => {
    set({ identificator: value })
  },

  code: '',
  setCode: (code: string) => {
    set({ code })
  },
}))

export const usePasswordResetStoreV2 = buildShallowStoreHookV2(
  usePasswordResetStore
)

const initialState = usePasswordResetStore.getState()
export const resetPasswordResetStore = async () => {
  usePasswordResetStore.setState(initialState, true)
}

export default usePasswordResetStore

import { create } from 'zustand'

interface IStore {
  isReady: boolean
  setIsReady: (isReady: boolean) => void
}

const useNavigationStore = create<IStore>((set, get) => ({
  isReady: false,
  setIsReady: (isReady) => set({ isReady }),
}))

export default useNavigationStore

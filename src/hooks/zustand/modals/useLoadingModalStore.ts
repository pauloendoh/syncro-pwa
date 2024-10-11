import { create } from 'zustand'

interface IStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

// PE 1/3 - not being used... yet
const useLoadingModalStore = create<IStore>((set, get) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useLoadingModalStore

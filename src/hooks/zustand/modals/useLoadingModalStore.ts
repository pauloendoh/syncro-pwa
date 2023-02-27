import { create } from 'zustand'

interface IStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useLoadingModalStore = create<IStore>((set, get) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useLoadingModalStore

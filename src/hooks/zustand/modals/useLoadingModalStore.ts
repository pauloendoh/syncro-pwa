import { create } from 'zustand'
import useModalZIndexStore from './useModalZIndexStore'

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

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useLoadingModalStore

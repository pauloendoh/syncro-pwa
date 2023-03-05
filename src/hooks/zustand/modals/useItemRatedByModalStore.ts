import { create } from 'zustand'

interface IStore {
  itemId: string | null // item id
  isOpen: boolean
  openModal: (itemId: string) => void
  closeModal: () => void
}

const useItemRatedByModalStore = create<IStore>((set, get) => ({
  itemId: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ itemId: initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useItemRatedByModalStore

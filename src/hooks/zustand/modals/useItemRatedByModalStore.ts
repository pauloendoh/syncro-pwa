import { create } from 'zustand'
import useModalZIndexStore from './useModalZIndexStore'

export type ItemRatedByModalType = 'you-follow' | 'all-users'

interface IStore {
  itemId: string | null
  type: ItemRatedByModalType
  isOpen: boolean
  openModal: (itemId: string, type: ItemRatedByModalType) => void
  closeModal: () => void
}

const useItemRatedByModalStore = create<IStore>((set, get) => ({
  itemId: null,
  type: 'you-follow',
  isOpen: false,
  openModal: (itemId, type) => {
    set({ itemId, isOpen: true, type })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useItemRatedByModalStore

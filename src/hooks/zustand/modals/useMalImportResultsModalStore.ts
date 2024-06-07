import { create } from 'zustand'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  requestId: string
  isOpen: boolean
  openModal: (requestId: string) => void
  closeModal: () => void
}

const useMalImportResultsModalStore = create<IStore>((set, get) => ({
  requestId: '',
  isOpen: false,
  openModal: (requestId) => {
    set({ requestId, isOpen: true })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useMalImportResultsModalStore

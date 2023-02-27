import { create } from 'zustand'

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
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useMalImportResultsModalStore

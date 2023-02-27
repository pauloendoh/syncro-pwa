import { create } from 'zustand'

interface IStore {
  initialValue: IConfirmDialog
  isOpen: boolean
  openConfirmDialog: (confirmDialog: IConfirmDialog) => void
  closeModal: () => void
}

const useConfirmationModalStore = create<IStore>((set, get) => ({
  initialValue: { title: '', onConfirm: () => {} },
  isOpen: false,
  openConfirmDialog: (val) => {
    set({ initialValue: val, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

interface IConfirmDialog {
  title: string
  description?: string
  confirmText?: string
  onConfirm: () => void
}

export default useConfirmationModalStore

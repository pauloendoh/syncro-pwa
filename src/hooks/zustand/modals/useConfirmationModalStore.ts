import { ReactNode } from 'react'
import { create } from 'zustand'
import useModalZIndexStore from './useModalZIndexStore'

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

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => set({ isOpen: false }),
}))

interface IConfirmDialog {
  title: string
  description?: ReactNode
  confirmText?: string
  onConfirm: () => void
}

export default useConfirmationModalStore

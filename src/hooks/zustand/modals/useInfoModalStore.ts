import { ReactNode } from 'react'
import { create } from 'zustand'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  isOpen: boolean
  text: ReactNode
  openModal: (text: ReactNode) => void
  closeModal: () => void
}

const useInfoModalStore = create<IStore>((set, get) => ({
  isOpen: false,
  text: '',
  openModal: (text) => {
    set({ isOpen: true, text })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useInfoModalStore

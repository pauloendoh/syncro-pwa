import { create } from 'zustand'

interface IStore {
  isOpen: boolean
  userId: string
  openModal: (params: { userId: string }) => void
  closeModal: () => void
}

export const useUserSharedListsWithYouModalStore = create<IStore>(
  (set, get) => ({
    isOpen: false,
    userId: '',
    openModal: (params) => {
      set({
        isOpen: true,
        userId: params.userId,
      })
    },
    closeModal: () => set({ isOpen: false }),
  })
)

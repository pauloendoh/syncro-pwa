import { create } from 'zustand'

type InitialValue = {
  userId: string
  type: 'followers' | 'following'
}

interface IStore {
  initialValue: InitialValue | null
  isOpen: boolean
  openModal: (ratingDto: InitialValue) => void
  closeModal: () => void
}

const useFollowersModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue, isOpen: true })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useFollowersModalStore

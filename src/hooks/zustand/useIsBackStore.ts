import { create } from 'zustand'

interface IStore {
  isBack: boolean
  setIsBack: (isBack: boolean) => void

  // STATES THAT YOU WANT TO MANTAIN AFTER GOING BACK
  userItemsGridPage: number
  setItemsGridPage: (page: number) => void
}

const useIsBackStore = create<IStore>((set, get) => ({
  isBack: false,
  setIsBack: async (isBack) => {
    set({ isBack: isBack })
  },

  // STATES THAT YOU WANT TO MANTAIN AFTER GOING BACK
  userItemsGridPage: 1,
  setItemsGridPage: (page: number) => {
    set({ userItemsGridPage: page })
  },
}))

export default useIsBackStore

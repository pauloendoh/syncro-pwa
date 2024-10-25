import { create } from 'zustand'
import { buildShallowStoreHookV2 } from './utils/useShallowStore'

interface IStore {
  isBack: boolean // unreliable, sometimes it works too late
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
export const useIsBackStoreV2 = buildShallowStoreHookV2(useIsBackStore)

export default useIsBackStore

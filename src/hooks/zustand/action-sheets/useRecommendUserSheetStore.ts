import Router from 'next/router'
import { create } from 'zustand'

export const recommendItemsToUser = 'recommendItemsToUser'

interface Store {
  userId: string | null
  openActionSheet: (itemId: string) => void
  closeActionSheet: () => void
}

const useRecommendItemsToUserModalStore = create<Store>((set, get) => ({
  userId: null,
  isOpen: false,
  openActionSheet: (userId) => {
    set({ userId })
    Router.query[recommendItemsToUser] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeActionSheet: () => {
    Router.back()
  },
}))

export default useRecommendItemsToUserModalStore

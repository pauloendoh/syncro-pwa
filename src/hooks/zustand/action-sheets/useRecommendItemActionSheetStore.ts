import Router from 'next/router'
import { create } from 'zustand'

const queryString = 'recommendItemIsOpen'

interface IStore {
  itemId: string | null
  openActionSheet: (itemId: string) => void
  closeActionSheet: () => void
}

// PE 1/3 - rename to modal
const useRecommendItemActionSheetStore = create<IStore>((set, get) => {
  return {
    itemId: null,
    openActionSheet: (itemId) => {
      set({ itemId })
      Router.query[queryString] = '1'
      Router.push(Router, undefined, { scroll: false })
    },
    closeActionSheet: () => {
      Router.back()
    },
  }
})

export default useRecommendItemActionSheetStore

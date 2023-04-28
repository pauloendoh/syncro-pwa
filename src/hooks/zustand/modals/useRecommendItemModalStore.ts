import Router from 'next/router'
import { create } from 'zustand'

const queryString = 'recommendItemIsOpen'

interface IStore {
  itemId: string | null
  openModal: (itemId: string) => void
  closeModal: () => void
}

// PE 1/3 - rename to modal
const useRecommendItemModalStore = create<IStore>((set, get) => {
  return {
    itemId: null,
    openModal: (itemId) => {
      set({ itemId })
      Router.query[queryString] = '1'
      Router.push(Router, undefined, { scroll: false })
    },
    closeModal: () => {
      Router.back()
    },
  }
})

export default useRecommendItemModalStore

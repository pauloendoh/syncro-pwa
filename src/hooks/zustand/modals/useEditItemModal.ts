import Router from 'next/router'
import { create } from 'zustand'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'

export const useEditItemModal = 'editingItem'

interface IStore {
  initialValue: SyncroItemDto | null
  openModal: (ratingDto: SyncroItemDto) => void
  closeModal: () => void
}

export const useEditItemModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[useEditItemModal] = initialValue.id
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    // PE 1/3 - this will be reused
    const previousUrl = document.referrer

    if (previousUrl) {
      const previousDomain = new URL(previousUrl).origin
      const currentDomain = new URL(window.location.href).origin

      if (previousDomain === currentDomain) Router.back()
      return
    }
    Router.query[useEditItemModal] = undefined
    Router.push(Router, undefined, { scroll: false })
  },
}))

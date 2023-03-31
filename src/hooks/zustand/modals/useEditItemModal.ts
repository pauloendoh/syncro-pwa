import Router from 'next/router'
import { create } from 'zustand'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

export const editingItem = 'editingItem'

interface IStore {
  initialValue: SyncroItemDto | null
  openModal: (ratingDto: SyncroItemDto) => void
  closeModal: () => void
}

export const useEditItemModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[editingItem] = initialValue.id
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(editingItem)
  },
}))

import Router from 'next/router'
import { create } from 'zustand'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface IStore {
  initialValue: SyncroItemDto | null
  openModal: (ratingDto: SyncroItemDto) => void
  closeModal: () => void
}

export const useEditItemModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[QueryParams.editingItem] = initialValue.id
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.editingItem)
  },
}))

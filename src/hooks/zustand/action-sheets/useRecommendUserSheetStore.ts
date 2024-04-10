import Router from 'next/router'
import { create } from 'zustand'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

interface Store {
  userId: string | null
  initialType: SyncroItemType
  openModal: (userId: string, initialType?: SyncroItemType) => void
  closeModal: () => void
}

const useRecommendItemsToUserModalStore = create<Store>((set, get) => ({
  userId: null,
  initialType: 'movie',
  isOpen: false,
  openModal: (userId, initialType = 'movie') => {
    set({ userId, initialType })
    Router.query[QueryParams.recommendItemsToUser] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.recommendItemsToUser)
  },
}))

export default useRecommendItemsToUserModalStore

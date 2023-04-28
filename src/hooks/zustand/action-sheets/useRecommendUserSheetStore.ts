import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

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
    Router.query[QueryParams.recommendItemsToUser] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeActionSheet: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.recommendItemsToUser)
  },
}))

export default useRecommendItemsToUserModalStore

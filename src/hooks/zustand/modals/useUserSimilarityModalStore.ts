import Router from 'next/router'
import { create } from 'zustand'
import { QueryParams } from '../../../utils/queryParams'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'
import useModalZIndexStore from './useModalZIndexStore'

interface IStore {
  userId: string
  openModal: (userId: string) => void
  closeModal: () => void
}

const useUserSimilarityModalStore = create<IStore>((set, get) => ({
  userId: '',
  openModal: (userId) => {
    set({ userId })
    Router.query[QueryParams.userSimilarity] = userId
    Router.push(Router, undefined, { scroll: false })

    useModalZIndexStore.getState().incrementZIndex()
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(QueryParams.userSimilarity)
  },
}))

export default useUserSimilarityModalStore

import Router from 'next/router'
import { create } from 'zustand'
import { routerBackIfSameDomainOrClearQueryParam } from '../../../utils/router/routerBackIfSameDomain'

type InitialValue = {
  userId: string
  type: 'followers' | 'following'
}

export const followModal = 'followModal'

interface IStore {
  initialValue: InitialValue | null
  openModal: (ratingDto: InitialValue) => void
  closeModal: () => void
}

const useFollowersModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  isOpen: false,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[followModal] = 'true'
    Router.push(Router, undefined, { scroll: false })
  },
  closeModal: () => {
    routerBackIfSameDomainOrClearQueryParam(followModal)
  },
}))

export default useFollowersModalStore

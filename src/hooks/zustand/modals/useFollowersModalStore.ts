import Router from 'next/router'
import { create } from 'zustand'

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
    const previousUrl = document.referrer

    if (previousUrl) {
      const previousDomain = new URL(previousUrl).origin
      const currentDomain = new URL(window.location.href).origin

      if (previousDomain === currentDomain) Router.back()
      return
    }
    Router.query[followModal] = undefined
    Router.push(Router, undefined, { scroll: false })
  },
}))

export default useFollowersModalStore

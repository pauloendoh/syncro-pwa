import Router from 'next/router'
import { create } from 'zustand'
import { UserFeedbackDto } from '../../react-query/feedback/types/UserFeedbackDto'

export const feedbackModal = 'feedbackModal'

interface IStore {
  initialValue: UserFeedbackDto | null
  openModal: (userFeedbackDto: UserFeedbackDto) => void
  closeModal: () => void
}

const useFeedbackModalStore = create<IStore>((set, get) => ({
  initialValue: null,
  openModal: (initialValue) => {
    set({ initialValue })
    Router.query[feedbackModal] = initialValue.id || 'new'
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
    Router.query[feedbackModal] = undefined
    Router.push(Router, undefined, { scroll: false })
  },
}))

export default useFeedbackModalStore

import { create } from 'zustand'

import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SharedListDto } from '../../react-query/shared-list/types/SharedListDto'
import { SharedListInterestItemDto } from '../../react-query/shared-list/types/SharedListInterestItemDto'

type InitialValues = {
  previousInterest: SharedListInterestItemDto | undefined
  sharedList: SharedListDto
  syncroItem: SyncroItemDto
}

interface IStore {
  isOpen: boolean
  initialValues: InitialValues | null
  openModal: (initialValues: InitialValues) => void
  closeModal: () => void
}

export const useEditSharedListItemInterestModalStore = create<IStore>(
  (set, get) => ({
    isOpen: false,
    initialValues: null,
    openModal: (initialValue) => {
      set({
        isOpen: true,
        initialValues: initialValue,
      })
    },
    closeModal: () => set({ isOpen: false }),
  })
)

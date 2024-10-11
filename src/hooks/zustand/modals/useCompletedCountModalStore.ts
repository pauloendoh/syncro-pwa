import { create } from 'zustand'
import {
  buildSyncroItemDto,
  SyncroItemDto,
} from '../../../types/domain/syncro-item/SyncroItemDto'

interface IStore {
  isOpen: boolean
  item: SyncroItemDto
  initialCompletedDates: string[]
  automaticallyAddedDate: string | null

  onSave: (completedDates: string[]) => void
  openModal: (params: {
    item: SyncroItemDto
    initialCompletedDates: string[]
    onSave: (completedDates: string[]) => void
    automaticallyAddedDate: string | null
  }) => void
  closeModal: () => void
}

const useCompletedCountModalStore = create<IStore>((set, get) => ({
  isOpen: false,
  item: buildSyncroItemDto(),
  initialCompletedDates: [],
  onSave: () => {},
  text: '',
  automaticallyAddedDate: null,
  openModal: (params) => {
    set({
      isOpen: true,
      item: params.item,
      initialCompletedDates: params.initialCompletedDates,
      automaticallyAddedDate: params.automaticallyAddedDate,
      onSave: params.onSave,
    })
  },
  closeModal: () => set({ isOpen: false }),
}))

export default useCompletedCountModalStore

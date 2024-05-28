import { create } from 'zustand'
import { RatingStatusType } from '../../types/domain/rating/ratingStatusArray'

interface IStore {
  title: string
  setTitle: (title: string) => void

  byStatus: RatingStatusType | null
  setByStatus: (status: RatingStatusType | null) => void

  getFilterCount: () => number
}

const useUserItemsFilterStore = create<IStore>((set, get) => ({
  title: '',
  setTitle: (title) => set({ title }),

  byStatus: null,
  setByStatus: (status) => set({ byStatus: status }),

  getFilterCount: () => {
    const { byStatus } = get()
    return byStatus ? 1 : 0
  },
}))

const initialState = useUserItemsFilterStore.getState()
export const resetUserItemsFilterStore = () =>
  useUserItemsFilterStore.setState(initialState, true)

export default useUserItemsFilterStore

import { useQueryState } from 'next-usequerystate'
import { useCallback, useMemo } from 'react'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'

interface IStore {
  initialValue: RatingDto | null
  setInitialValue: (ratingDto: RatingDto) => void
}

const useActualStore = create<IStore>((set, get) => ({
  initialValue: null,
  setInitialValue: (initialValue) => {
    set({ initialValue })
  },
}))

export const useRatingDetailsModalStore = () => {
  const { initialValue, setInitialValue } = useActualStore()
  const [queryValue, setQuery] = useQueryState('ratingDetailsId')

  const openModal = useCallback((ratingDto: RatingDto) => {
    setInitialValue(ratingDto)
    setQuery(ratingDto.id, { scroll: false })
  }, [])

  const isOpen = useMemo(() => {
    return !!queryValue
  }, [queryValue])

  const closeModal = useCallback(() => {
    setQuery(null, { scroll: false })
  }, [])

  return {
    initialValue,
    closeModal,
    openModal,
    isOpen,
  }
}

import { useCallback, useMemo } from 'react'
import { create } from 'zustand'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { useQueryParams } from '../../useQueryParams'

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
  const { queryValue, removeQuery, setQuery } = useQueryParams().ratingDetailsId

  const openModal = useCallback((ratingDto: RatingDto) => {
    setInitialValue(ratingDto)
    setQuery(ratingDto.id)
  }, [])

  const isOpen = useMemo(() => {
    return !!queryValue
  }, [queryValue])

  const closeModal = useCallback(() => {
    removeQuery()
  }, [])

  return {
    initialValue,
    closeModal,
    openModal,
    isOpen,
  }
}

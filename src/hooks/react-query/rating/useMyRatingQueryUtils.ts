import { useMemo } from 'react'
import { useMyRatingsQuery } from './useMyRatingsQuery'

export const useMyRatingQueryUtils = (itemId: string) => {
  const { data: myRatings } = useMyRatingsQuery()
  const myRating = useMemo(
    () => myRatings?.find((r) => r.syncroItemId === itemId) || null,
    [myRatings, itemId]
  )

  return myRating
}

import { useMemo } from 'react'
import { RatingStatusType, ratingStatusArray } from '../ratingStatusArray'

export function useRatingStatusIcon(status: RatingStatusType) {
  const Icon = useMemo(() => {
    const found = ratingStatusArray.find((r) => r.value === status)
    return found?.IconWithProps || ratingStatusArray[0].IconWithProps
  }, [status])
  return Icon
}

import { useMemo } from 'react'
import { CustomPositionDto } from '../../../../types/domain/custom-position/CustomPositionDto'
import { SortingByTypes } from '../../../../types/domain/others/SortingByTypes'
import { UserItemDto } from '../../../../types/domain/syncro-item/UserItemDto'

type Params = {
  items?: UserItemDto[]
  sortingBy: SortingByTypes
  customPositions?: CustomPositionDto[]
}

export const useSortedItems = ({
  items,
  sortingBy,
  customPositions,
}: Params) => {
  const sortedItems = useMemo(() => {
    if (!items) return []
    if (sortingBy === 'theirInterestDesc')
      return items.sort((a, b) => {
        const interestA = a.interests?.[0]?.interestLevel
        const interestB = b.interests?.[0]?.interestLevel
        if (interestB && !interestA) return 1
        if (!interestA || !interestB) return -1
        if (interestB > interestA) return 1
        return -1
      })

    if (sortingBy === 'customOrdering') {
      return items
        .sort((a, b) => {
          const positionA =
            customPositions?.find((p) => p.syncroItemId === a.id)?.position ||
            Number.POSITIVE_INFINITY
          const positionB =
            customPositions?.find((p) => p.syncroItemId === b.id)?.position ||
            Number.POSITIVE_INFINITY

          if (positionA < positionB) return -1
          return 1
        })
        .filter((i) => i.myInterest === 3)
    }

    if (sortingBy === 'avgInterest')
      return items.sort((a, b) => {
        const avgInterestA =
          ((a.interests?.[0]?.interestLevel || 0) + (a.myInterest || 0)) / 2
        const avgInterestB =
          ((b.interests?.[0]?.interestLevel || 0) + (b.myInterest || 0)) / 2
        return avgInterestB >= avgInterestA ? 1 : -1
      })

    return items.sort((a, b) => {
      const ratingA = a.ratings?.[0]?.ratingValue
      const ratingB = b.ratings?.[0]?.ratingValue

      if (ratingA && ratingB) {
        if (ratingA === ratingB) {
          const createdAtA = a.ratings?.[0]?.createdAt
          const createdAtB = b.ratings?.[0]?.createdAt

          if (createdAtA && createdAtB) {
            // A is newer, return B (older)
            if (createdAtA > createdAtB) return 1
            return -1
          }

          if (createdAtB) return 1

          return -1
        }
      }

      if (ratingB && !ratingA) return 1
      if (!ratingA || !ratingB) return -1
      if (ratingB > ratingA) return 1
      return -1
    })
  }, [items, sortingBy, customPositions])

  return sortedItems
}

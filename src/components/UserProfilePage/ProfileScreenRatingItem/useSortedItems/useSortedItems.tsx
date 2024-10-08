import { useMemo } from 'react'
import { useMyRatingsQuery } from '../../../../hooks/react-query/rating/useMyRatingsQuery'
import { CustomPositionDto } from '../../../../types/domain/custom-position/CustomPositionDto'
import { SortingByType } from '../../../../types/domain/others/SortingByTypes'
import { UserItemDto } from '../../../../types/domain/syncro-item/UserItemDto'

type Params = {
  items?: UserItemDto[]
  sortingBy: SortingByType
  customPositions?: CustomPositionDto[]
}

export const useSortedItems = ({
  items,
  sortingBy,
  customPositions,
}: Params) => {
  const { data: myRatings } = useMyRatingsQuery()
  const sortedItems = useMemo(() => {
    if (!items) return []

    const copiedItems = [...items]

    if (sortingBy === 'bothPlannedDesc') {
      return copiedItems.filter((item) => {
        const iPlanned =
          myRatings?.find((r) => r.syncroItemId === item.id)?.status ===
          'PLANNED'
        const theyPlanned = item.ratings?.[0]?.status === 'PLANNED'

        return iPlanned && theyPlanned
      })
    }

    if (sortingBy === 'theirInterestDesc')
      return copiedItems.sort((a, b) => {
        const interestA = a.interests?.[0]?.interestLevel
        const interestB = b.interests?.[0]?.interestLevel
        if (interestB && !interestA) return 1
        if (!interestA || !interestB) return -1
        if (interestB > interestA) return 1
        return -1
      })

    if (sortingBy === 'customOrdering') {
      return copiedItems
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
      return copiedItems.sort((next, prev) => {
        const avgInterestA =
          ((next.interests?.[0]?.interestLevel || 0) + (next.myInterest || 0)) /
          2
        const avgInterestB =
          ((prev.interests?.[0]?.interestLevel || 0) + (prev.myInterest || 0)) /
          2
        return avgInterestB >= avgInterestA ? 1 : -1
      })

    if (sortingBy === 'theirLastUpdatedAt') {
      const x = copiedItems.sort((a, b) => {
        const updatedAtA = a.ratings?.[0]?.updatedAt
        const updatedAtB = b.ratings?.[0]?.updatedAt

        // newest first
        if (updatedAtA && updatedAtB) {
          if (updatedAtA > updatedAtB) return -1
          return 1
        }

        if (updatedAtA) return -1
        if (updatedAtB) return 1
        return 0
      })

      return x
    }

    if (sortingBy === 'sourceRating') {
      return copiedItems.sort((a, b) => {
        const ratingA = a.avgRating
        const ratingB = b.avgRating

        return ratingB - ratingA
      })
    }

    return copiedItems.sort((a, b) => {
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

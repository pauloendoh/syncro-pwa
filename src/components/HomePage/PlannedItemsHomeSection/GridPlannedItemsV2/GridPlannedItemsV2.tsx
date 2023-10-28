import { Flex } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { useMemo } from 'react'
import useUpdateSavedPositionMutationV2 from '../../../../hooks/react-query/interest/useUpdateSavedPositionMutationV2'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import GridPlannedItem from '../DragDropPlannedItems/GridPlannedItems/GridPlannedItem/GridPlannedItem'

type Props = {
  ratings: RatingDto[]
  selectedType: SyncroItemType
}

// PE 1/3 - clear V1
const GridPlannedItemsV2 = ({ ratings, selectedType, ...props }: Props) => {
  const { mutate: submitUpdateSavedPosition } =
    useUpdateSavedPositionMutationV2()

  const filteredRatings = useMemo(() => {
    if (!ratings) return []

    return ratings
      .filter((rating) => rating.syncroItem?.type === selectedType)
      .sort((a, b) => {
        if (a.plannedPosition === b.plannedPosition) return 0
        if (a.plannedPosition === null) return 1
        if (b.plannedPosition === null) return -1
        return a.plannedPosition - b.plannedPosition
      })
  }, [ratings, selectedType])

  const handleMoveToFirst = (ratingId: string) => {
    submitUpdateSavedPosition({
      ratingId,
      newPosition: 1,
    })
  }

  const handleMoveToLast = (ratingId: string) => {
    submitUpdateSavedPosition({
      ratingId,
      newPosition: filteredRatings.length,
    })
  }

  const { width: containerWidth, ref: containerRef } = useElementSize()

  const imageWidth = useMemo(() => {
    const availableWidth = containerWidth - 44
    return availableWidth / 3
  }, [containerWidth])

  return (
    <Flex
      wrap="wrap"
      gap={16}
      className="container"
      ref={containerRef}
      w="100%"
    >
      {filteredRatings.map((rating, index) => (
        <GridPlannedItem
          rating={rating}
          key={rating.id}
          index={index}
          onMoveToFirst={handleMoveToFirst}
          onMoveToLast={handleMoveToLast}
          imageWidth={imageWidth}
        />
      ))}
    </Flex>
  )
}

export default GridPlannedItemsV2

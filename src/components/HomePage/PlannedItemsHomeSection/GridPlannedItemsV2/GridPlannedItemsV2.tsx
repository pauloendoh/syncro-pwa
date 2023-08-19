import { Flex } from '@mantine/core'
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

    return ratings.filter((rating) => rating.syncroItem?.type === selectedType)
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

  return (
    <Flex wrap="wrap" gap={16}>
      {filteredRatings.map((rating) => (
        <GridPlannedItem
          rating={rating}
          key={rating.id}
          onMoveToFirst={handleMoveToFirst}
          onMoveToLast={handleMoveToLast}
        />
      ))}
    </Flex>
  )
}

export default GridPlannedItemsV2

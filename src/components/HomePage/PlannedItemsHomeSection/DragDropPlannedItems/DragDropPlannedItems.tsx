import { Box } from '@mantine/core'
import { useMemo, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { usePlannedItemsQueryV2 } from '../../../../hooks/react-query/interest/usePlannedItemsQueryV2'
import useUpdateSavedPositionMutationV2 from '../../../../hooks/react-query/interest/useUpdateSavedPositionMutationV2'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../../_common/flex/FlexCol'
import PlannedItem from '../PlannedItem/PlannedItem'
import GridPlannedItems from './GridPlannedItems/GridPlannedItems'

type Props = {
  userId: string
  itemType: SyncroItemType
  maxHeight?: string
}

const DragDropPlannedItems = (props: Props) => {
  const { authUser } = useAuthStore()

  const { mutate: submitUpdateSavedPosition, isLoading } =
    useUpdateSavedPositionMutationV2()

  const onDragEnd = (result: DropResult) => {
    const ratingId = result.draggableId
    const newPosition =
      result.destination?.index === undefined
        ? 1
        : result.destination?.index + 1

    submitUpdateSavedPosition({
      ratingId: ratingId,
      newPosition,
    })
  }

  const { data: savedItems } = usePlannedItemsQueryV2(props.userId)

  const sortedPlanned = useMemo(() => {
    return (
      savedItems
        ?.filter((d) => d.syncroItem?.type === props.itemType)
        ?.sort((a, b) => a.plannedPosition - b.plannedPosition) || []
    )
  }, [props.itemType, savedItems])

  const [view, setView] = useState<'grid' | 'list'>('grid')
  if (view === 'grid') {
    return (
      <GridPlannedItems
        disableDrag={props.userId !== authUser?.id}
        items={sortedPlanned}
        onDragChange={(ratingId, newPosition) => {
          submitUpdateSavedPosition({ ratingId, newPosition })
        }}
      />
    )
  }

  return (
    <Box
      sx={{
        maxHeight: props.maxHeight || `calc(100vh - 300px)`,
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <FlexCol
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                position: 'relative',
              }}
            >
              {sortedPlanned.map((planned, index) => (
                <PlannedItem
                  key={planned.syncroItem?.id}
                  item={planned}
                  index={index}
                />
              ))}
            </FlexCol>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default DragDropPlannedItems

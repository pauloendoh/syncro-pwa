import { Box } from '@mantine/core'
import { useMemo, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { usePlannedItemsQuery } from '../../../../hooks/react-query/interest/usePlannedItemsQuery'
import useUpdateSavedPositionMutation from '../../../../hooks/react-query/interest/useUpdateSavedPositionMutation'
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
    useUpdateSavedPositionMutation()

  const onDragEnd = (result: DropResult) => {
    const interestId = result.draggableId
    const newPosition =
      result.destination?.index === undefined
        ? 1
        : result.destination?.index + 1

    submitUpdateSavedPosition({
      interestId,
      newPosition,
    })
  }

  const { data: savedItems } = usePlannedItemsQuery(props.userId)

  const sortedPlanned = useMemo(() => {
    return (
      savedItems
        ?.filter((d) => d.syncroItem?.type === props.itemType)
        ?.sort((a, b) => a.position - b.position) || []
    )
  }, [props.itemType, savedItems])

  const [view, setView] = useState<'grid' | 'list'>('grid')
  if (view === 'grid') {
    return (
      <GridPlannedItems
        disableDrag={props.userId !== authUser?.id}
        plannedItems={sortedPlanned}
        onDragChange={(interestId, newPosition) => {
          submitUpdateSavedPosition({ interestId, newPosition })
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
                  planned={planned}
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
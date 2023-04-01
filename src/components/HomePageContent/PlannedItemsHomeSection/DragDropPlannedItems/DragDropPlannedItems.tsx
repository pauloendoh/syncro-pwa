import { useMemo } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useSavedItemsQuery } from '../../../../hooks/react-query/interest/useSavedItemsQuery'
import useUpdateSavedPositionMutation from '../../../../hooks/react-query/interest/useUpdateSavedPositionMutation'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../../../_common/flex/FlexCol'
import PlannedItem from '../PlannedItem/PlannedItem'

type Props = {
  itemType: SyncroItemType
  maxHeight?: string
}

const DragDropPlannedItems = (props: Props) => {
  const { mutate: submitUpdateSavedPosition } = useUpdateSavedPositionMutation()

  const onDragEnd = (result: DropResult) => {
    const interestId = result.draggableId
    const newPosition =
      result.destination?.index === undefined
        ? 1
        : result.destination?.index + 1

    submitUpdateSavedPosition({ interestId, newPosition })
  }

  const { data: savedItems } = useSavedItemsQuery()

  const sortedPlanned = useMemo(() => {
    return (
      savedItems
        ?.filter((d) => d.syncroItem?.type === props.itemType)
        ?.sort((a, b) => a.position - b.position) || []
    )
  }, [props.itemType, savedItems])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <FlexCol
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              maxHeight: props.maxHeight || `calc(100vh - 300px)`,
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
  )
}

export default DragDropPlannedItems

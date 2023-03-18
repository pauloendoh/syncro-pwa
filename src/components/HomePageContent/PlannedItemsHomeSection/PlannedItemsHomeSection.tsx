import { ScrollArea, Title } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useMemo } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { useSavedItemsQuery } from '../../../hooks/react-query/interest/useSavedItemsQuery'
import useUpdateSavedPositionMutation from '../../../hooks/react-query/interest/useUpdateSavedPositionMutation'
import {
  SyncroItemType,
  syncroItemTypes,
} from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import FlexVCenter from '../../_common/flex/FlexVCenter'
import MyNextLink from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import PlannedItem from './PlannedItem/PlannedItem'
import PlannedItemButton from './PlannedItemButton/PlannedItemButton'

type Props = {}

const PlannedItemsHomeSection = (props: Props) => {
  const [selectedType, setSelectedType] = useLocalStorage<SyncroItemType>({
    key: 'planned-items-home-section-selected-type',
    defaultValue: 'movie',
  })
  const { data: savedItems } = useSavedItemsQuery()

  const sortedPlanned = useMemo(() => {
    return (
      savedItems
        ?.filter((d) => d.syncroItem?.type === selectedType)
        ?.sort((a, b) => a.position - b.position) || []
    )
  }, [selectedType, savedItems])

  const { mutate: submitUpdateSavedPosition } = useUpdateSavedPositionMutation()

  const onDragEnd = (result: DropResult) => {
    const interestId = result.draggableId
    const newPosition =
      result.destination?.index === undefined
        ? 1
        : result.destination?.index + 1

    submitUpdateSavedPosition({ interestId, newPosition })
  }

  if (!savedItems || savedItems.length === 0) return null

  return (
    <FlexCol gap={16}>
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={4}>
          <Title order={5}>Planned items</Title>
        </FlexVCenter>

        <MyNextLink href={urls.pages.savedItems('all')}>
          <Title order={5} underline>
            See all
          </Title>
        </MyNextLink>
      </FlexVCenter>

      <MyPaper
        sx={{
          padding: 0,
        }}
      >
        <FlexCol>
          <ScrollArea
            sx={{
              padding: 16,
            }}
            scrollbarSize={6}
          >
            <FlexVCenter gap={16}>
              {syncroItemTypes.map((type) => (
                <PlannedItemButton
                  key={type}
                  type={type}
                  isSelected={type === selectedType}
                  onClick={() => setSelectedType(type)}
                />
              ))}
            </FlexVCenter>
          </ScrollArea>

          <ScrollArea
            sx={{ paddingRight: 16, paddingLeft: 8, paddingBottom: 8 }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                  <FlexCol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      maxHeight: `calc(100vh - 300px)`,
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
          </ScrollArea>
        </FlexCol>
      </MyPaper>
    </FlexCol>
  )
}

export default PlannedItemsHomeSection

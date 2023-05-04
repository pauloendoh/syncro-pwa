import { GridContextProvider, GridDropZone, GridItem } from 'react-grid-dnd'
import useSavedPositionSheetStore from '../../../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import { InterestDto } from '../../../../../types/domain/interest/InterestDto'
import FavoriteItem from '../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  plannedItems: InterestDto[]
  onDragChange: (interestId: string, newPosition: number) => void
}

const GridPlannedItems = ({ plannedItems, ...props }: Props) => {
  const { openSheet } = useSavedPositionSheetStore()

  function onChange(
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    _targetId?: string | undefined
  ) {
    const interestId = plannedItems[sourceIndex].id
    const newPosition = targetIndex + 1

    props.onDragChange(interestId, newPosition)
  }

  const rowHeight = (100 * 4) / 3 + 16

  return (
    <div style={{ width: '100%' }}>
      <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={3}
          rowHeight={rowHeight}
          style={{ height: rowHeight * Math.ceil(plannedItems.length / 3) - 8 }}
        >
          {plannedItems.map((plannedItem) => (
            <GridItem key={plannedItem.id}>
              <FavoriteItem item={plannedItem.syncroItem!} draggable />
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider>
    </div>
  )
}

export default GridPlannedItems

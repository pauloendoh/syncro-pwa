import { GridContextProvider, GridDropZone, GridItem } from 'react-grid-dnd'
import useSavedPositionSheetStore from '../../../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import { InterestDto } from '../../../../../types/domain/interest/InterestDto'
import FavoriteItem from '../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  plannedItems: InterestDto[]
  onDragChange: (interestId: string, newPosition: number) => void
  disableDrag?: boolean
}

const GridPlannedItems = ({ plannedItems, ...props }: Props) => {
  const { openSheet } = useSavedPositionSheetStore()

  function onChange(
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    _targetId?: string | undefined
  ) {
    const plannedItem = plannedItems[sourceIndex]
    const newPosition = targetIndex + 1

    if (plannedItem?.position === newPosition) return

    props.onDragChange(plannedItem.id, newPosition)
  }

  const rowHeight = (100 * 4) / 3 + 16

  return (
    <GridContextProvider onChange={onChange}>
      <GridDropZone
        disableDrag={props.disableDrag}
        id="items"
        boxesPerRow={3}
        rowHeight={rowHeight}
        style={{ height: rowHeight * Math.ceil(plannedItems.length / 3) - 8 }}
      >
        {plannedItems.map((plannedItem) => (
          <GridItem
            key={plannedItem.id}
            style={{
              touchAction: 'none', // disable touch scroll
            }}
          >
            <FavoriteItem
              item={plannedItem.syncroItem!}
              draggable={!props.disableDrag}
            />
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  )
}

export default GridPlannedItems

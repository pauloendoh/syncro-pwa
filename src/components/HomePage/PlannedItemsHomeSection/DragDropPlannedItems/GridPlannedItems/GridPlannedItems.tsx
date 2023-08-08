import { useMemo } from 'react'
import { GridContextProvider, GridDropZone, GridItem } from 'react-grid-dnd'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import FavoriteItem from '../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  items: RatingDto[]
  onDragChange: (interestId: string, newPosition: number) => void
  disableDrag?: boolean
}

const GridPlannedItems = ({ items: plannedItems, ...props }: Props) => {
  function onChange(
    _sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    _targetId?: string | undefined
  ) {
    const plannedItem = plannedItems[sourceIndex]
    const newPosition = targetIndex + 1

    if (plannedItem?.plannedPosition === newPosition) return

    props.onDragChange(plannedItem.id, newPosition)
  }

  const isBook = useMemo(
    () => plannedItems[0]?.syncroItem?.type === 'book',
    [plannedItems]
  )

  const rowHeight = useMemo(
    () => (isBook ? (100 * 3) / 2 + 16 : (100 * 4) / 3 + 16),
    [isBook]
  )

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
              previewPosition="left"
            />
          </GridItem>
        ))}
      </GridDropZone>
    </GridContextProvider>
  )
}

export default GridPlannedItems

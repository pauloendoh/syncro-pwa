import { Title } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useSavedPositionSheetStore from '../../../hooks/zustand/action-sheets/useSavedPositionSheetStore'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../../utils/urls'
import DragDropPlannedItems from '../../HomePageContent/PlannedItemsHomeSection/DragDropPlannedItems/DragDropPlannedItems'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'

interface Props {
  itemType: SyncroItemType
  savedItems: InterestDto[]
}

const SavedItemsByType = ({ savedItems, ...props }: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const { openSheet } = useSavedPositionSheetStore()

  const queryClient = useQueryClient()
  const handleClick = (interest: InterestDto) => {
    if (interest.syncroItem) {
      queryClient.setQueryData<SyncroItemDto>(
        [urls.api.syncroItemDetails(interest.syncroItem.id)],
        interest.syncroItem
      )
    }
  }

  if (!savedItems || savedItems.length === 0) return null

  return (
    <div>
      <MyPaper
        sx={{
          width: 300,
        }}
      >
        <div>
          <FlexCol mb={8}>
            <Title order={4}>
              {savedItems?.length} {type.getTypeLabel(savedItems.length > 1)}
            </Title>

            <DragDropPlannedItems
              itemType={props.itemType}
              maxHeight={'unset'}
            />
          </FlexCol>
        </div>
      </MyPaper>
    </div>
  )
}

export default SavedItemsByType

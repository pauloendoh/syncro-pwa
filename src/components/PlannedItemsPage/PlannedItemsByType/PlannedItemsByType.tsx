import { Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import DragDropPlannedItems from '../../HomePageContent/PlannedItemsHomeSection/DragDropPlannedItems/DragDropPlannedItems'
import FlexCol from '../../_common/flex/FlexCol'

interface Props {
  itemType: SyncroItemType
  savedItems: InterestDto[]
}

const PlannedItemsByType = ({ savedItems, ...props }: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  if (!savedItems || savedItems.length === 0) return null

  return (
    <FlexCol mb={8} w="100%">
      <Title order={4}>
        {savedItems?.length} {type.getTypeLabel(savedItems.length > 1)}
      </Title>

      <DragDropPlannedItems itemType={props.itemType} maxHeight={'unset'} />
    </FlexCol>
  )
}

export default PlannedItemsByType

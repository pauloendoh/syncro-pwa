import { Title } from '@mantine/core'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { InterestDto } from '../../../types/domain/interest/InterestDto'
import { SyncroItemType } from '../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import DragDropPlannedItems from '../../HomePage/PlannedItemsHomeSection/DragDropPlannedItems/DragDropPlannedItems'
import FlexCol from '../../_common/flex/FlexCol'

interface Props {
  itemType: SyncroItemType
  savedItems: InterestDto[]
}

const PlannedItemsByType = ({ savedItems, ...props }: Props) => {
  const type = useSyncroItemTypeMap({
    itemType: props.itemType,
  })

  const { authUser } = useAuthStore()

  if (!savedItems || savedItems.length === 0 || !authUser) return null

  return (
    <FlexCol mb={8} w={'calc(100% - 24px)'}>
      <Title order={4}>
        {savedItems?.length} {type.getTypeLabel(savedItems.length > 1)}
      </Title>

      <DragDropPlannedItems
        userId={authUser.id}
        itemType={props.itemType}
        maxHeight={'unset'}
      />
    </FlexCol>
  )
}

export default PlannedItemsByType

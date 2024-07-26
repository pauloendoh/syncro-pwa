import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { usePlannedItemsQueryV2 } from '../../../../hooks/react-query/interest/usePlannedItemsQueryV2'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  userId: string
  isSelected: boolean
  type: SyncroItemType
  onClick: () => void
  selectedStatus: RatingStatusType
}

const PlannedItemTypeButton = (props: Props) => {
  const { data } = usePlannedItemsQueryV2(props.userId, props.selectedStatus)

  const typeMap = useSyncroItemTypeMap({
    itemType: props.type,
  })

  const items = useMemo(
    () => data?.filter((d) => d.syncroItem?.type === props.type) || [],

    [props.type, data]
  )

  if (items.length === 0) return null
  return (
    <Button
      color={props.isSelected ? 'primary' : 'dark'}
      onClick={props.onClick}
      size="xs"
    >
      {items.length} {typeMap.getTypeLabelLowerCase(items.length > 1)}
    </Button>
  )
}

export default PlannedItemTypeButton

import { Button } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { usePlannedItemsQuery } from '../../../../hooks/react-query/interest/usePlannedItemsQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  userId: string
  isSelected: boolean
  type: SyncroItemType
  onClick: () => void
}

const PlannedItemButton = (props: Props) => {
  const { data } = usePlannedItemsQuery(props.userId)

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

export default PlannedItemButton

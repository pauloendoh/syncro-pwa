import { Select } from '@mantine/core'
import { syncroItemOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  value: SyncroItemType
  onChange: (newItemType: SyncroItemType) => void
  width?: number
}

const ItemTypeSelector = ({ ...props }: Props) => {
  return (
    <Select
      w={props.width}
      data={syncroItemOptions.map((option) => ({
        value: option.itemType,
        label: option.getTypeLabel(),
      }))}
      value={props.value}
      onChange={(newItemType: SyncroItemType) => {
        props.onChange(newItemType)
      }}
      maxDropdownHeight={400}
    />
  )
}

export default ItemTypeSelector

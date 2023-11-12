import { Select } from '@mantine/core'
import { useMemo } from 'react'
import { syncroItemTypeOptions } from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  width?: number
  label?: string
  required?: boolean
} & (
  | {
      includeAll: true
      value: SyncroItemType | 'all'
      onChange: (newItemType: SyncroItemType | 'all') => void
    }
  | {
      includeAll?: false
      value: SyncroItemType
      onChange: (newItemType: SyncroItemType) => void
    }
)

const ItemTypeSelector = ({ ...props }: Props) => {
  const data = useMemo(() => {
    if (props.includeAll) {
      return [
        { value: 'all', label: 'All' },
        ...syncroItemTypeOptions.map((option) => ({
          value: option.itemType,
          label: option.getTypeLabel(),
        })),
      ]
    }

    return syncroItemTypeOptions.map((option) => ({
      value: option.itemType,
      label: option.getTypeLabel(),
    }))
  }, [props.includeAll])
  return (
    <Select
      label={props.label}
      w={props.width}
      data={data}
      value={props.value}
      onChange={(newItemType: SyncroItemType | 'all') => {
        if (props.includeAll) {
          props.onChange(newItemType)
          return
        }
        props.onChange(newItemType as SyncroItemType)
      }}
      maxDropdownHeight={400}
      required={props.required}
    />
  )
}

export default ItemTypeSelector

import { Select } from '@mantine/core'
import { useMemo } from 'react'
import {
  syncroItemTypeOptions,
  validSyncroItemTypeOptions,
} from '../../../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useUserItemsCountDetailsQuery } from '../../../../hooks/react-query/syncro-item/useUserItemsCountDetailsQuery'
import { SyncroItemType } from '../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'

type Props = {
  width?: number
  label?: string
  required?: boolean
  entriesCountFromUserId?: string
  onlyValidItemTypes?: boolean
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
  const { data: itemsCount } = useUserItemsCountDetailsQuery(
    props.entriesCountFromUserId
  )

  const options = useMemo(() => {
    if (props.onlyValidItemTypes) {
      return validSyncroItemTypeOptions
    }

    return syncroItemTypeOptions
  }, [props.onlyValidItemTypes])

  const data = useMemo(() => {
    if (itemsCount) {
      const result = []
      for (const itemType in itemsCount) {
        const count = itemsCount[itemType as SyncroItemType] ?? 0
        if (count > 0) {
          const typeLabel = options
            .find((option) => option.itemType === itemType)
            ?.getTypeLabel()

          result.push({
            value: itemType,
            label: `${typeLabel} (${count})`,
          })
        }
      }
      return result
    }
    if (props.includeAll) {
      return [
        { value: 'all', label: 'All' },
        ...options.map((option) => ({
          value: option.itemType,
          label: option.getTypeLabel(),
        })),
      ]
    }

    return options.map((option) => ({
      value: option.itemType,
      label: option.getTypeLabel(),
    }))
  }, [itemsCount, props.includeAll])
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

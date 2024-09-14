import { Select, Text } from '@mantine/core'
import { forwardRef, useMemo } from 'react'
import {
  RatingStatusType,
  useRatingStatusMap,
} from '../../../../../types/domain/rating/ratingStatusArray'
import { SyncroItemType } from '../../../../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexVCenter from '../../../flex/FlexVCenter'

type Props = {
  value: RatingStatusType
  onChange: (values: {
    prevValue: RatingStatusType
    newValue: RatingStatusType
  }) => void
  itemType: SyncroItemType
  width?: number | string
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string
  icon: React.ReactNode
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, icon, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <FlexVCenter gap={4}>
        <div
          style={{
            position: 'relative',
            top: 2,
          }}
        >
          {icon}
        </div>
        <Text>{label}</Text>
      </FlexVCenter>
    </div>
  )
)

const RatingStatusSelector = (props: Props) => {
  const statusMap = useRatingStatusMap(props.itemType)

  const data = useMemo(() => {
    return Object.entries(statusMap).map(([key, value]) => ({
      value: key,
      label: value.titleLabel,
      icon: value.icon,
    }))
  }, [statusMap])

  return (
    <Select
      w={props.width ?? 140}
      label="Your status"
      value={props.value}
      onChange={(value) => {
        if (value) {
          props.onChange({
            prevValue: props.value,
            newValue: value as RatingStatusType,
          })
        }
      }}
      itemComponent={SelectItem}
      data={data}
    />
  )
}

export default RatingStatusSelector

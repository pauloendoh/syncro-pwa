import { Select, Text } from '@mantine/core'
import { forwardRef } from 'react'
import {
  RatingStatusType,
  ratingStatusArrayMap,
} from '../../../../../types/domain/rating/ratingStatus'
import FlexVCenter from '../../../flex/FlexVCenter'

type Props = {
  value: RatingStatusType
  onChange: (value: RatingStatusType) => void
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
  return (
    <Select
      w={140}
      label="Your status"
      value={props.value}
      onChange={(value) => {
        if (value) {
          props.onChange(value as RatingStatusType)
        }
      }}
      itemComponent={SelectItem}
      data={ratingStatusArrayMap}
    />
  )
}

export default RatingStatusSelector

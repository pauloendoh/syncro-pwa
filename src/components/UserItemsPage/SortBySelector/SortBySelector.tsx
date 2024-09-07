import { Select } from '@mantine/core'
import { SortingByType } from '../../../types/domain/others/SortingByTypes'

type Props = {
  value: SortingByType
  onChange: (value: SortingByType) => void
  highestRatingLabel: string
}

const SortBySelector = (props: Props) => {
  return (
    <Select
      data={[
        {
          value: 'theirRatingDesc' as SortingByType,
          label: props.highestRatingLabel,
        },

        {
          value: 'theirLastUpdatedAt' as SortingByType,
          label: 'Last updated',
        },
        {
          value: 'sourceRating' as SortingByType,
          label: 'Source rating',
        },
      ]}
      value={props.value}
      onChange={(value) => props.onChange(value as SortingByType)}
      label="Sort by"
      styles={{
        dropdown: {
          minWidth: 170,
        },
      }}
    />
  )
}

export default SortBySelector

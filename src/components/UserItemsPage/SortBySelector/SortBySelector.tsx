import { Select } from '@mantine/core'
import { SortingByType } from '../../../types/domain/others/SortingByTypes'

type Props = {
  value: SortingByType
  onChange: (value: SortingByType) => void
}

const SortBySelector = (props: Props) => {
  return (
    <Select
      data={[
        {
          value: 'theirRatingDesc' as SortingByType,
          label: 'Their rating (highest)',
        },
        {
          value: 'bothPlannedDesc' as SortingByType,
          label: 'Both planned',
        },
      ]}
      value={props.value}
      onChange={(value) => props.onChange(value as SortingByType)}
    />
  )
}

export default SortBySelector
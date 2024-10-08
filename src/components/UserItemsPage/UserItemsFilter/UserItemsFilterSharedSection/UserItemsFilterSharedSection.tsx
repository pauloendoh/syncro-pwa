import { Select } from '@mantine/core'
import useUserItemsFilterStore from '../../../../hooks/zustand/useUserItemsFilterStore'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { MantineSelectData } from '../../../../utils/mantine/types/MantineSelectData'

type Props = {}

const UserItemsFilterSharedSection = ({ ...props }: Props) => {
  const filterStore = useUserItemsFilterStore()

  return (
    <Select
      maxDropdownHeight={240}
      label="Status"
      data={
        [
          { value: '', label: 'All' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'DROPPED', label: 'Dropped' },
          { value: 'ON_HOLD', label: 'On hold' },
          { value: 'PLANNED', label: 'Planned' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
        ] as MantineSelectData<RatingStatusType>
      }
      value={filterStore.byStatus ?? ''}
      onChange={(status) =>
        filterStore.setByStatus(
          status === '' ? null : (status as RatingStatusType)
        )
      }
      withinPortal
    />
  )
}

export default UserItemsFilterSharedSection

import { Select } from '@mantine/core'
import useUserItemsFilterStore from '../../../../hooks/zustand/useUserItemsFilterStore'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { MantineSelectData } from '../../../../utils/mantine/types/MantineSelectData'

type Props = {}

const UserItemsFilterSharedSection = ({ ...props }: Props) => {
  const filterStore = useUserItemsFilterStore()

  return (
    <Select
      label="By status"
      data={
        [
          { value: '', label: 'All' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'DROPPED', label: 'Dropped' },
          { value: 'ON_HOLD', label: 'On hold' },
          { value: 'PLANNED', label: 'Plan to watch' },
          { value: 'IN_PROGRESS', label: 'Watching' },
        ] as MantineSelectData<RatingStatusType>
      }
      value={filterStore.byStatus ?? ''}
      onChange={(status) =>
        filterStore.setByStatus(
          status === '' ? null : (status as RatingStatusType)
        )
      }
      placeholder="By status"
      withinPortal
    />
  )
}

export default UserItemsFilterSharedSection

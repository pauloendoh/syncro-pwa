import { ActionIcon, Menu } from '@mantine/core'
import { MdMoreHoriz } from 'react-icons/md'
import { RatingStatusType } from '../../../../types/domain/rating/ratingStatusArray'
import { urls } from '../../../../utils/urls/urls'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {
  selectedStatus: RatingStatusType
  onChangeStatus: (status: RatingStatusType) => void
}

const PlannedItemsMoreMenu = ({ ...props }: Props) => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <MyNextLink href={urls.pages.allPlanned()}>
          <Menu.Item>See All Planned</Menu.Item>
        </MyNextLink>
        <Menu.Divider />

        <Menu.Label>Rating Status</Menu.Label>
        <Menu.Item onClick={() => props.onChangeStatus('PLANNED')}>
          Planned {props.selectedStatus === 'PLANNED' && '✓'}
        </Menu.Item>
        <Menu.Item onClick={() => props.onChangeStatus('IN_PROGRESS')}>
          In Progress {props.selectedStatus === 'IN_PROGRESS' && '✓'}
        </Menu.Item>
        <Menu.Item onClick={() => props.onChangeStatus('ON_HOLD')}>
          On Hold {props.selectedStatus === 'ON_HOLD' && '✓'}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default PlannedItemsMoreMenu

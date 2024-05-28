import { ActionIcon, Menu } from '@mantine/core'
import { MdMoreHoriz } from 'react-icons/md'
import { urls } from '../../../../utils/urls/urls'
import MyNextLink from '../../../_common/overrides/MyNextLink'

type Props = {}

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
      </Menu.Dropdown>
    </Menu>
  )
}

export default PlannedItemsMoreMenu

import { ActionIcon, Menu } from '@mantine/core'
import { MdLogout, MdMoreHoriz, MdSettings } from 'react-icons/md'
import { useLogout } from '../../../hooks/domains/auth/useLogout'
import { urls } from '../../../utils/urls/urls'
import MyNextLink from '../../_common/overrides/MyNextLink'

type Props = {}

const UserMoreMenu = (props: Props) => {
  const logout = useLogout()
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <MyNextLink href={urls.pages.settings()}>
          <Menu.Item icon={<MdSettings size={14} />}>Settings</Menu.Item>
        </MyNextLink>
        <Menu.Item
          color="red"
          onClick={() => logout()}
          icon={<MdLogout size={14} />}
        >
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMoreMenu

import { ActionIcon, Menu } from '@mantine/core'
import { MdLogout, MdMoreHoriz } from 'react-icons/md'
import { useLogout } from '../../../hooks/domains/auth/useLogout'

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

import { ActionIcon, Menu } from '@mantine/core'
import React, { useState } from 'react'
import { MdLogout, MdMore, MdMoreHoriz } from 'react-icons/md'

type Props = {}

const UserMoreMenu = (props: Props) => {
  const [opened, setOpened] = useState(false)
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item color="red" icon={<MdLogout size={14} />}>
          Log out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMoreMenu

import { ActionIcon, Menu } from '@mantine/core'
import { FaUsers } from 'react-icons/fa'
import { MdMoreHoriz } from 'react-icons/md'
import { useUserSharedListsWithYouModalStore } from '../../../hooks/zustand/modals/useUserSharedListsWithYouModalStore '

type Props = {
  userId: string
}

const UserItemsPageMoreMenu = (props: Props) => {
  const { openModal } = useUserSharedListsWithYouModalStore()

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<FaUsers size={14} />}
          onClick={() => {
            openModal({
              userId: props.userId,
            })
          }}
        >
          Shared lists with you
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserItemsPageMoreMenu

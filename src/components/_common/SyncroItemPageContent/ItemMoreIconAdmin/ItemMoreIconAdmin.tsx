import { Menu, ActionIcon } from '@mantine/core'
import React from 'react'
import { MdMoreHoriz, MdLogout, MdEdit } from 'react-icons/md'
import { useEditItemModalStore } from '../../../../hooks/zustand/modals/useEditItemModal'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'

type Props = {
  item: SyncroItemDto
}

const ItemMoreIconAdmin = (props: Props) => {
  const { openModal } = useEditItemModalStore()
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz size={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<MdEdit />}
          onClick={() => {
            openModal(props.item)
          }}
        >
          Edit (admin)
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ItemMoreIconAdmin

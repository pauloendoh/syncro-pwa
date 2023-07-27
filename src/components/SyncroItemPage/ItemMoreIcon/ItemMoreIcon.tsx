import { ActionIcon, Menu } from '@mantine/core'
import { useMemo } from 'react'
import { MdEdit, MdMoreHoriz, MdShare, MdStarOutline } from 'react-icons/md'
import { useMyRatingsQuery } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import { useEditItemModalStore } from '../../../hooks/zustand/modals/useEditItemModal'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import useShareRatingModalStore from '../../../hooks/zustand/modals/useShareRatingModalStore'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import { myNotifications } from '../../../utils/mantine/myNotifications'

type Props = {
  item: SyncroItemDto
}

const ItemMoreIcon = (props: Props) => {
  const { authUser } = useAuthStore()
  const { openModal } = useEditItemModalStore()
  const { data: myRatings } = useMyRatingsQuery()

  const youRated = useMemo(() => {
    return myRatings?.find((r) => r.syncroItemId === props.item.id)
  }, [myRatings])

  const { openModal: openShareRatingModal } = useShareRatingModalStore()

  const { openModal: openItemRatedByModal } = useItemRatedByModalStore()

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz size={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {authUser?.isAdmin && (
          <Menu.Item
            icon={<MdEdit />}
            onClick={() => {
              openModal(props.item)
            }}
          >
            Edit (admin)
          </Menu.Item>
        )}
        <Menu.Item
          icon={<MdShare />}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            myNotifications.success("Item's url copied to clipboard!")
          }}
        >
          Share item
        </Menu.Item>
        {youRated && (
          <Menu.Item
            icon={<MdShare />}
            onClick={() => {
              openShareRatingModal(youRated)
            }}
          >
            Share your rating
          </Menu.Item>
        )}
        <Menu.Item
          icon={<MdStarOutline />}
          onClick={() => {
            openItemRatedByModal(props.item.id!, 'all-users')
          }}
        >
          Syncro ratings
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ItemMoreIcon

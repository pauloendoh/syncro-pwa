import { ActionIcon, Menu } from '@mantine/core'
import { MdMoreHoriz, MdShare } from 'react-icons/md'
import { useMyRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyRatingQueryUtils'
import useShareRatingModalStore from '../../../../../hooks/zustand/modals/useShareRatingModalStore'

type Props = {
  itemId: string
}

const HomeRatingMoreMenu = (props: Props) => {
  const myRating = useMyRatingQueryUtils(props.itemId)

  const { openModal } = useShareRatingModalStore()

  if (!myRating) return null

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {myRating && (
          <Menu.Item
            icon={<MdShare size={14} />}
            onClick={() => openModal(myRating)}
          >
            Share your rating
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export default HomeRatingMoreMenu

import { ActionIcon, Menu } from '@mantine/core'
import { MdMoreHoriz, MdOutlineInfo, MdShare } from 'react-icons/md'
import { useMyRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyRatingQueryUtils'
import useRatingDetailsModalStore from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useShareRatingModalStore from '../../../../../hooks/zustand/modals/useShareRatingModalStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'

type Props = {
  itemId: string
  rating?: RatingDto
}

const HomeRatingMoreMenu = (props: Props) => {
  const myRating = useMyRatingQueryUtils(props.itemId)

  const { openModal } = useShareRatingModalStore()

  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()

  return (
    <Menu shadow="md">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {props.rating && (
          <Menu.Item
            icon={<MdOutlineInfo size={14} />}
            // @ts-ignore
            onClick={() => openRatingDetailsModal(props.rating)}
          >
            Rating details
          </Menu.Item>
        )}

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

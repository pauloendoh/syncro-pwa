import { ActionIcon, Menu } from '@mantine/core'
import { MdEdit, MdMoreHoriz, MdOutlineInfo, MdShare } from 'react-icons/md'
import { useMyRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyRatingQueryUtils'
import useRatingDetailsModalStore from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
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
  const { openModal: openSaveRatingModal } = useSaveRatingModalStore()

  const containsNothing = !props.rating && !myRating

  if (containsNothing) return null

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
            See details
          </Menu.Item>
        )}

        {myRating && (
          <Menu.Item
            icon={<MdEdit size={14} />}
            onClick={() => openSaveRatingModal(myRating)}
          >
            Edit your rating
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
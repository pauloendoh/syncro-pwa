import { ActionIcon, Menu } from '@mantine/core'
import {
  MdEdit,
  MdList,
  MdMoreHoriz,
  MdOutlineInfo,
  MdShare,
} from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyItemRatingQueryUtils } from '../../../../../hooks/react-query/rating/useMyItemRatingQueryUtils'
import { useRatingDetailsModalStore } from '../../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import useShareRatingModalStore from '../../../../../hooks/zustand/modals/useShareRatingModalStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import { urls } from '../../../../../utils/urls/urls'
import MyNextLink from '../../../../_common/overrides/MyNextLink'

type Props = {
  itemId: string
  rating?: RatingDto
}

const HomeRatingMoreMenu = (props: Props) => {
  const myRating = useMyItemRatingQueryUtils(props.itemId)

  const { openModal } = useShareRatingModalStore()

  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()
  const { openModal: openSaveRatingModal } = useSaveRatingModalStore()

  const typeMap = useSyncroItemTypeMap({
    itemType: props.rating?.syncroItem?.type,
  })
  const containsNothing = !props.rating && !myRating

  if (containsNothing) return null

  return (
    <Menu shadow="md" withinPortal>
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {props.rating && (
          <Menu.Item
            icon={<MdOutlineInfo size={14} />}
            onClick={() => {
              if (props.rating) openRatingDetailsModal(props.rating)
            }}
          >
            See entry details
          </Menu.Item>
        )}
        <MyNextLink
          href={urls.pages.userItems(
            props.rating?.userId || '',
            props.rating?.syncroItem?.type || 'movie'
          )}
        >
          <Menu.Item icon={<MdList size={14} />}>
            {props.rating?.user?.username}'s{' '}
            {typeMap?.getTypeLabelLowerCase(true)}
          </Menu.Item>
        </MyNextLink>

        {myRating && (
          <Menu.Item
            icon={<MdEdit size={14} />}
            onClick={() => openSaveRatingModal(myRating)}
          >
            Edit your entry
          </Menu.Item>
        )}

        {myRating && (
          <Menu.Item
            icon={<MdShare size={14} />}
            onClick={() => openModal(myRating)}
          >
            Share your entry
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}

export default HomeRatingMoreMenu

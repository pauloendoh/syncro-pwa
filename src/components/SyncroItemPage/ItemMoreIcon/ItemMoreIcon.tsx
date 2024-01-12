import { ActionIcon, Menu, Tooltip } from '@mantine/core'
import { useMemo } from 'react'
import {
  MdEdit,
  MdMoreHoriz,
  MdOutlineInfo,
  MdShare,
  MdStarOutline,
} from 'react-icons/md'
import { RxUpdate } from 'react-icons/rx'
import { useMyRatingsQuery } from '../../../hooks/react-query/rating/useMyRatingsQuery'
import useUpdateItemAvgRatingMutation from '../../../hooks/react-query/syncro-item/useUpdateItemAvgRatingMutation'
import { useEditItemModalStore } from '../../../hooks/zustand/modals/useEditItemModal'
import useItemRatedByModalStore from '../../../hooks/zustand/modals/useItemRatedByModalStore'
import { useRatingDetailsModalStore } from '../../../hooks/zustand/modals/useRatingDetailsModalStore'
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

  const { mutate: submitRefreshAvgRating } = useUpdateItemAvgRatingMutation()
  const { openModal: openRatingDetailsModal } = useRatingDetailsModalStore()
  const canRefreshRating = useMemo(() => {
    const isMovieOrSeries =
      props.item.type === 'movie' || props.item.type === 'tvSeries'
    if (!isMovieOrSeries)
      return {
        ok: false,
        message: 'Only movies and series can be updated for now',
      }

    const isOver7days =
      Date.now() - new Date(props.item.ratingUpdatedAt).getTime() > 604800000
    if (!isOver7days)
      return {
        ok: false,
        message: 'The rating for this item was updated less than 7 days ago',
      }

    return {
      ok: true,
    }
  }, [props.item.ratingUpdatedAt])

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz size={24} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Info</Menu.Label>
        <Menu.Item
          icon={<MdShare />}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            myNotifications.success("Item's url copied to clipboard!")
          }}
        >
          Copy item URL
        </Menu.Item>
        <Menu.Item
          icon={<MdStarOutline />}
          onClick={() => {
            openItemRatedByModal(props.item.id!, 'all-users')
          }}
        >
          Syncro entries
        </Menu.Item>

        {youRated && (
          <>
            <Menu.Divider />
            <Menu.Label>Your entry</Menu.Label>
            <Menu.Item
              icon={<MdOutlineInfo />}
              onClick={() => openRatingDetailsModal(youRated)}
            >
              See your entry
            </Menu.Item>
            <Menu.Item
              icon={<MdShare />}
              onClick={() => {
                openShareRatingModal(youRated)
              }}
            >
              Share your entry
            </Menu.Item>
          </>
        )}

        <Menu.Divider />

        <Menu.Label>Edit</Menu.Label>
        <Tooltip
          label={canRefreshRating.message}
          position="bottom"
          disabled={!canRefreshRating.message}
        >
          <div>
            <Menu.Item
              icon={<RxUpdate />}
              disabled={!canRefreshRating.ok}
              onClick={() => {
                submitRefreshAvgRating(props.item.id!)
              }}
            >
              Update rating
            </Menu.Item>
          </div>
        </Tooltip>
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
      </Menu.Dropdown>
    </Menu>
  )
}

export default ItemMoreIcon

import { ActionIcon, Box, Divider, Menu } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import {
  AiOutlineDrag,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignTop,
} from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import useUpdateSavedPositionMutationV2 from '../../../../../hooks/react-query/interest/useUpdateSavedPositionMutationV2'
import useSaveRatingModalStore from '../../../../../hooks/zustand/modals/useSaveRatingModalStore'
import useAuthStore from '../../../../../hooks/zustand/useAuthStore'
import { RatingDto } from '../../../../../types/domain/rating/RatingDto'
import FavoriteItem from '../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import Span from '../../../../_common/text/Span'

type Props = {
  rating: RatingDto
  index: number
  onMoveToFirst: (ratingId: string) => void
  onMoveToLast: (ratingId: string) => void
  imageWidth: number
}

const GridPlannedItem = ({ rating, ...props }: Props) => {
  const { authUser } = useAuthStore()
  const { mutate: submitUpdatePosition } = useUpdateSavedPositionMutationV2()

  const { openModal: openSaveRatingModal } = useSaveRatingModalStore()

  const { ref: hoverRef, hovered } = useHover<HTMLButtonElement>()

  return (
    <Box
      sx={{
        position: 'relative',
        opacity: rating.isPrivate ? 0.5 : 1,
      }}
    >
      <FavoriteItem
        item={rating.syncroItem!}
        previewPosition="left"
        width={props.imageWidth}
        alwaysShowTitle
        // disablePreview={authUser?.id === rating.userId}
      />
      {authUser?.id === rating.userId && (
        <Box
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
          }}
        >
          <Menu shadow="md" withinPortal>
            <Menu.Target>
              <ActionIcon
                sx={{
                  opacity: 0.8,
                }}
                size="sm"
                variant="filled"
                ref={hoverRef}
              >
                <Span size="sm">{hovered ? '...' : props.index + 1}</Span>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                icon={<AiOutlineDrag size={14} />}
                onClick={() => {
                  const position = Number(prompt('Enter new position'))
                  if (position && position > 0) {
                    submitUpdatePosition({
                      newPosition: position,
                      ratingId: rating.id,
                    })
                    return
                  }

                  alert('Invalid position')
                }}
              >
                Move to position
              </Menu.Item>

              <Menu.Item
                icon={<AiOutlineVerticalAlignTop size={14} />}
                onClick={() => props.onMoveToFirst(rating.id)}
              >
                Move to first
              </Menu.Item>

              <Menu.Item
                icon={<AiOutlineVerticalAlignBottom size={14} />}
                onClick={() => props.onMoveToLast(rating.id)}
              >
                Move to last
              </Menu.Item>

              <Divider />

              <Menu.Item
                icon={<MdEdit size={14} />}
                onClick={() => openSaveRatingModal(rating)}
              >
                Edit your entry
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Box>
      )}
    </Box>
  )
}

export default GridPlannedItem

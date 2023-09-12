import { ActionIcon, Box, Menu } from '@mantine/core'
import {
  AiOutlineDrag,
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignTop,
} from 'react-icons/ai'
import useUpdateSavedPositionMutationV2 from '../../../../../../hooks/react-query/interest/useUpdateSavedPositionMutationV2'
import useAuthStore from '../../../../../../hooks/zustand/useAuthStore'
import { RatingDto } from '../../../../../../types/domain/rating/RatingDto'
import FavoriteItem from '../../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'
import FlexCol from '../../../../../_common/flex/FlexCol'
import Span from '../../../../../_common/text/Span'

type Props = {
  rating: RatingDto
  index: number
  onMoveToFirst: (ratingId: string) => void
  onMoveToLast: (ratingId: string) => void
}

const GridPlannedItem = ({ rating, ...props }: Props) => {
  const { authUser } = useAuthStore()
  const { mutate: submitUpdatePosition } = useUpdateSavedPositionMutationV2()
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <FavoriteItem
        item={rating.syncroItem!}
        previewPosition="left"
        disablePreview={authUser?.id === rating.userId}
      />
      {authUser?.id === rating.userId && (
        <FlexCol
          gap={2}
          sx={{
            position: 'absolute',
            top: 2,
            right: 2,
          }}
        >
          <Menu shadow="md" withArrow>
            <Menu.Target>
              <ActionIcon
                sx={{
                  opacity: 0.8,
                }}
                size="sm"
                variant="filled"
              >
                <Span size="sm">{props.index + 1}</Span>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
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
            </Menu.Dropdown>
          </Menu>
        </FlexCol>
      )}
    </Box>
  )
}

export default GridPlannedItem

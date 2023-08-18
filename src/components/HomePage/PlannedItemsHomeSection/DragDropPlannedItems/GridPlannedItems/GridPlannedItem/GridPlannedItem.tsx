import { ActionIcon, Box, Menu, useMantineTheme } from '@mantine/core'
import {
  AiOutlineVerticalAlignBottom,
  AiOutlineVerticalAlignTop,
} from 'react-icons/ai'
import { MdMoreHoriz } from 'react-icons/md'
import useAuthStore from '../../../../../../hooks/zustand/useAuthStore'
import { RatingDto } from '../../../../../../types/domain/rating/RatingDto'
import FavoriteItem from '../../../../../UserProfilePage/FavoritesSection/FavoritesByType/FavoritesByType/FavoriteItem/FavoriteItem'

type Props = {
  rating: RatingDto
  onMoveToFirst: (ratingId: string) => void
  onMoveToLast: (ratingId: string) => void
}

const GridPlannedItem = ({ rating, ...props }: Props) => {
  const theme = useMantineTheme()
  const { authUser } = useAuthStore()
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
        <Box
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
                <MdMoreHoriz />
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
            </Menu.Dropdown>
          </Menu>
        </Box>
      )}
    </Box>
  )
}

export default GridPlannedItem

import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { ItemRecommendationDto } from '../../../hooks/react-query/notification/types/ItemRecommendationDto'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'

interface Props {
  itemRecommendation: ItemRecommendationDto
  showDot: boolean
}

const ItemRecommendationNotificationItem = ({
  itemRecommendation: itemRecommendation,
  ...props
}: Props) => {
  // const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useMantineTheme()

  // copy of UserSearchItem
  return (
    <Flex justify="space-between" p={4}>
      <Flex>
        <Box
          onClick={() => {
            // push("Profile", {
            //   userId: itemRecommendation.fromUserId,
            // })
          }}
        >
          <UserProfilePicture
            userId={itemRecommendation.fromUserId}
            widthHeigth={36}
          />
        </Box>

        <Flex ml={16} pr={40}>
          <Text maw={200}>
            <Text weight={500}>{itemRecommendation.fromUser?.username}</Text>{' '}
            recommended you:
            {props.showDot && (
              <Box>
                <Box
                  style={{
                    backgroundColor: theme.colors.primary[9],
                    minWidth: 8,
                    minHeight: 8,
                    borderRadius: 8,
                    marginLeft: 8,
                  }}
                />
              </Box>
            )}
          </Text>
          <Text style={{ fontWeight: '500' }}>
            {itemRecommendation.item?.title}{' '}
            {itemRecommendation.item?.year &&
              `(${itemRecommendation.item?.year})`}
          </Text>

          <Text size="sm">{format(itemRecommendation.createdAt)}</Text>
        </Flex>
      </Flex>
      <Box
        onClick={() => {
          // push("SyncroItem", { itemId: itemRecommendation.itemId })
        }}
      >
        <SyncroItemImage
          item={itemRecommendation.item}
          width={100}
          height={100}
        />
      </Box>
    </Flex>
  )
}

export default ItemRecommendationNotificationItem

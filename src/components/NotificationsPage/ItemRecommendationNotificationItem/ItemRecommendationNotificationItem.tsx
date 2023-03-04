import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { ItemRecommendationDto } from '../../../hooks/react-query/notification/types/ItemRecommendationDto'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { urls } from '../../../utils/urls'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'
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
          <MyNextLink href={urls.pages.user(itemRecommendation.fromUserId)}>
            <UserProfilePicture
              userId={itemRecommendation.fromUserId}
              widthHeigth={36}
            />
          </MyNextLink>
        </Box>

        <FlexCol ml={16} pr={40}>
          <span>
            <b>{itemRecommendation.fromUser?.username}</b> recommended you:
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
          </span>
          <MyNextLink
            href={urls.pages.syncroItem(itemRecommendation.item?.id!)}
          >
            <span style={{ fontWeight: '500' }}>
              {itemRecommendation.item?.title}{' '}
              {itemRecommendation.item?.year &&
                `(${itemRecommendation.item?.year})`}
            </span>
          </MyNextLink>

          <Text size="sm">{format(itemRecommendation.createdAt)}</Text>
        </FlexCol>
      </Flex>

      <MyNextLink href={urls.pages.syncroItem(itemRecommendation.item?.id!)}>
        <SyncroItemImage
          item={itemRecommendation.item}
          width={100}
          height={100}
        />
      </MyNextLink>
    </Flex>
  )
}

export default ItemRecommendationNotificationItem

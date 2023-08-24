import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { ItemRecommendationDto } from '../../../hooks/react-query/notification/types/ItemRecommendationDto'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { urls } from '../../../utils/urls'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../_common/overrides/MyNextLink'

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
          <MyNextLink
            href={urls.pages.userProfile(itemRecommendation.fromUserId)}
          >
            <UserProfilePicture
              userId={itemRecommendation.fromUserId}
              widthHeigth={36}
            />
          </MyNextLink>
        </Box>

        <FlexCol ml={16} pr={40}>
          <span>
            <span>
              <MyNextLink
                href={urls.pages.userProfile(itemRecommendation.fromUserId)}
                style={{
                  fontWeight: 500,
                }}
              >
                {itemRecommendation.fromUser?.username}
              </MyNextLink>
              &nbsp;recommended you:&nbsp;
            </span>
            <SyncroItemLink item={itemRecommendation.item!}>
              <span style={{ fontWeight: '500' }}>
                {itemRecommendation.item?.title}{' '}
                {itemRecommendation.item?.year &&
                  `[${itemRecommendation.item?.year}]`}
                <span
                  style={{
                    display: 'inline-flex',
                  }}
                >
                  &nbsp;
                  {props.showDot && (
                    <div>
                      <div
                        style={{
                          backgroundColor: theme.colors.primary[9],
                          width: 8,
                          height: 8,
                          borderRadius: 8,
                        }}
                      />
                    </div>
                  )}
                </span>
              </span>
            </SyncroItemLink>
          </span>

          <Text size="sm">{format(itemRecommendation.createdAt)}</Text>
        </FlexCol>
      </Flex>

      <SyncroItemLink item={itemRecommendation.item!}>
        <SyncroItemImage
          item={itemRecommendation.item}
          width={100}
          height={100}
        />
      </SyncroItemLink>
    </Flex>
  )
}

export default ItemRecommendationNotificationItem

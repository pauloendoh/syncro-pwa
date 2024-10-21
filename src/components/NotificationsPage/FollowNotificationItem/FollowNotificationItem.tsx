import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { format } from 'timeago.js'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { useAuthStoreV2 } from '../../../hooks/zustand/useAuthStore'
import { FollowDto } from '../../../types/domain/follow/FollowDto'
import { urls } from '../../../utils/urls/urls'
import FollowUnfollowButton from '../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../_common/flex/FlexCol'
import MyNextLink from '../../_common/overrides/MyNextLink'

interface Props {
  follow: FollowDto
  showDot: boolean
}

const FollowNotificationItem = ({ follow, ...props }: Props) => {
  // const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const { authUser } = useAuthStoreV2({
    authUser: true,
  })

  const theme = useMantineTheme()

  const { isMobile } = useMyMediaQuery()

  return (
    <Box
      key={follow.followerId}
      onClick={() => {
        // push("Profile", { userId: follow.followerId })
      }}
    >
      <Flex justify="space-between" p={4}>
        <Flex>
          <MyNextLink href={urls.pages.userProfile(follow.follower?.id!)}>
            <UserProfilePicture userId={follow.followerId} widthHeigth={36} />
          </MyNextLink>

          <FlexCol
            ml={16}
            sx={{
              width: isMobile ? 188 : undefined,
            }}
          >
            <Text
              component="span"
              sx={{
                display: 'inline',
                position: 'relative',
              }}
            >
              <MyNextLink
                href={urls.pages.userProfile(follow.follower?.id!)}
                style={{
                  color: 'inherit',
                }}
              >
                <Text component="span" weight={500}>
                  {follow.follower?.username}{' '}
                </Text>
              </MyNextLink>

              <Text component="span">is following you.</Text>

              {props.showDot && (
                <Box
                  style={{
                    position: 'absolute',
                    backgroundColor: theme.colors.primary[9],
                    width: 8,
                    height: 8,
                    borderRadius: 8,
                    top: 0,
                    right: -8,
                  }}
                />
              )}
            </Text>

            <Text size="sm">{format(follow.createdAt)}</Text>
          </FlexCol>
        </Flex>
        <Flex w={100}>
          <Box>
            <Box>
              {
                <FollowUnfollowButton
                  profileUserId={follow.followerId}
                  width={100}
                />
              }
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default FollowNotificationItem

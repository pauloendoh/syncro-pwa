import { Box, Flex, Text, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { format } from 'timeago.js'
import useAuthStore from '../../../hooks/zustand/useAuthStore'
import { FollowDto } from '../../../types/domain/follow/FollowDto'
import { urls } from '../../../utils/urls'
import FollowUnfollowButton from '../../UserPageContent/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import FlexCol from '../../_common/flex/FlexCol'
import MyNextLink from '../../_common/overrides/MyNextLink'
import UserProfilePicture from '../../_common/UserProfilePicture/UserProfilePicture'

interface Props {
  follow: FollowDto
  showDot: boolean
}

const FollowNotificationItem = ({ follow, ...props }: Props) => {
  // const { push } = useNavigation<NativeStackNavigationProp<HomeScreenTypes>>()
  const authUser = useAuthStore((s) => s.authUser)

  const theme = useMantineTheme()

  const router = useRouter()

  return (
    <Box
      key={follow.followerId}
      onClick={() => {
        // push("Profile", { userId: follow.followerId })
      }}
    >
      <Flex justify="space-between" p={4}>
        <Flex>
          <MyNextLink href={urls.pages.user(follow.follower?.id!)}>
            <UserProfilePicture userId={follow.followerId} widthHeigth={36} />
          </MyNextLink>

          <FlexCol ml={16}>
            <Text
              sx={{
                display: 'inline-flex',
              }}
            >
              <MyNextLink
                href={urls.pages.user(follow.follower?.id!)}
                style={{
                  color: 'inherit',
                }}
              >
                <Text weight={500}>{follow.follower?.username} </Text>
              </MyNextLink>

              <Text>&nbsp;is following you.</Text>

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

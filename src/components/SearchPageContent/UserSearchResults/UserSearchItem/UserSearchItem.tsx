import { Box, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls'
import FollowUnfollowButton from '../../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import UserProfilePicture from '../../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'

interface Props {
  user: UserSimpleDto
}

const UserSearchItem = ({ user }: Props) => {
  const authUser = useAuthStore((s) => s.authUser)
  const itsAuthUser = useMemo(() => authUser?.id === user.id, [authUser, user])

  const visibleUsername = useMemo(() => {
    if (user.username.length > 16) {
      return user.username.slice(0, 16) + '...'
    }
    return user.username
  }, [user.username])

  return (
    <Box>
      <Flex justify={'space-between'}>
        <Flex gap={8}>
          <MyNextLink href={urls.pages.userProfile(user.id)}>
            <UserProfilePicture userId={user.id} widthHeigth={36} />
          </MyNextLink>

          <FlexCol ml={4}>
            <MyNextLink
              href={urls.pages.userProfile(user.id)}
              style={{
                color: 'inherit',
              }}
            >
              <Text
                sx={{
                  fontWeight: 500,
                }}
              >
                {visibleUsername}
              </Text>
            </MyNextLink>
            <Text></Text>
          </FlexCol>
        </Flex>
        <Flex w={100}>
          {!itsAuthUser && (
            <FollowUnfollowButton profileUserId={user.id} width={100} />
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default UserSearchItem

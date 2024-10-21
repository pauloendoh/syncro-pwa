import { Box, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import { useAuthStoreV2 } from '../../../../hooks/zustand/useAuthStore'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls/urls'
import FollowUnfollowButton from '../../../UserProfilePage/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import UserProfilePicture from '../../../_common/UserProfilePicture/UserProfilePicture'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import MyNextLink from '../../../_common/overrides/MyNextLink'

interface Props {
  user: UserSimpleDto & { entryCount?: number }
}

const UserSearchItem = ({ user }: Props) => {
  const { authUser } = useAuthStoreV2({
    authUser: true,
  })
  const itsAuthUser = useMemo(() => authUser?.id === user.id, [authUser, user])

  const visibleUsername = useMemo(() => {
    if (user.username.length > 16) {
      return user.username.slice(0, 16) + '...'
    }
    return user.username
  }, [user.username])

  const entriesLabel = useMemo(() => {
    if (user.entryCount === 0) {
      return 'No entries'
    }
    if (user.entryCount === 1) {
      return '1 entry'
    }
    return `${user.entryCount} entries`
  }, [user.entryCount])

  return (
    <Box>
      <FlexVCenter justify={'space-between'}>
        <FlexVCenter gap={8}>
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
            <Text size="sm" opacity={0.7}>
              {entriesLabel}
            </Text>
          </FlexCol>
        </FlexVCenter>
        <Flex w={100}>
          {!itsAuthUser && (
            <FollowUnfollowButton profileUserId={user.id} width={100} />
          )}
        </Flex>
      </FlexVCenter>
    </Box>
  )
}

export default UserSearchItem

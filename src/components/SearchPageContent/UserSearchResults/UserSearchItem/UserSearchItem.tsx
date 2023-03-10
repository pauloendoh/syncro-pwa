import { Box, Flex, Text } from '@mantine/core'
import { useMemo } from 'react'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { UserSimpleDto } from '../../../../types/domain/user/UserSimpleDto'
import { urls } from '../../../../utils/urls'
import FollowUnfollowButton from '../../../UserPageContent/ProfileScreenButtons/FollowUnfollowButton/FollowUnfollowButton'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import UserProfilePicture from '../../../_common/UserProfilePicture/UserProfilePicture'

interface Props {
  user: UserSimpleDto
}

const UserSearchItem = ({ user }: Props) => {
  const authUser = useAuthStore((s) => s.authUser)
  const itsAuthUser = useMemo(() => authUser?.id === user.id, [authUser, user])

  return (
    <Box>
      <Flex justify={'space-between'}>
        <Flex gap={8}>
          <MyNextLink href={urls.pages.user(user.id)}>
            <UserProfilePicture userId={user.id} widthHeigth={36} />
          </MyNextLink>

          <FlexCol ml={4}>
            <MyNextLink
              href={urls.pages.user(user.id)}
              style={{
                color: 'inherit',
              }}
            >
              <Text
                sx={{
                  fontWeight: 500,
                }}
              >
                {user.username}
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

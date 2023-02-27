import {
  Anchor,
  Center,
  Container,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import { useMemo, useState } from 'react'
import { useUserRatingsQuery } from '../../hooks/react-query/rating/useUserRatingsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import FlexCol from '../_common/flex/FlexCol'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyPaper from '../_common/overrides/MyPaper'
import NoRatingsUserProfile from './NoRatingsUserProfile/NoRatingsUserProfile'
import ProfileScreenRatingItem from './ProfileScreenRatingItem/ProfileScreenRatingItem'

type Props = {}

const UserPageContent = (props: Props) => {
  const { userId } = useMyRouterQuery()
  const { data: userInfo, isLoading } = useUserInfoQuery(userId!)

  const { data: userRatings } = useUserRatingsQuery(userId!)

  const noRatings = useMemo(() => userRatings?.length === 0, [userRatings])
  const [refreshedAt, setRefreshedAt] = useState(new Date().toISOString())

  return (
    <LoggedLayout>
      <Container size="xs">
        <MyPaper sx={{ width: '100%' }}>
          {isLoading && (
            <Center sx={{ height: 96 }}>
              <Loader />
            </Center>
          )}
          {userInfo && (
            <FlexCol gap={16}>
              <Flex gap={24}>
                <UserImage
                  pictureUrl={userInfo.profile.pictureUrl}
                  username={userInfo.username}
                  widthHeight={96}
                />
                <Title order={4} weight={500}>
                  {userInfo.username}
                </Title>
              </Flex>

              {userInfo.profile.fullName.length > 0 && (
                <Text>
                  <b>{userInfo.profile.fullName}</b>
                </Text>
              )}

              {userInfo.profile.bio.length > 0 && (
                <Text
                  sx={{
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {userInfo.profile.bio}
                </Text>
              )}

              {userInfo.profile.websiteUrl.length > 0 && (
                <Anchor
                  href={userInfo.profile.websiteUrl}
                  target="_blank"
                  color="primary"
                >
                  {userInfo.profile.websiteUrl}
                </Anchor>
              )}
            </FlexCol>
          )}
        </MyPaper>

        <Flex mt={16}>
          {noRatings ? (
            <NoRatingsUserProfile userId={userId!} />
          ) : (
            <Flex gap={16} wrap="wrap">
              {syncroItemTypes.map((itemType) => (
                <ProfileScreenRatingItem
                  key={itemType}
                  itemType={itemType}
                  userId={userId!}
                  refreshedAt={refreshedAt}
                  // onClick={() =>
                  //   navigation.push('UserItems', {
                  //     userId: route.params.userId,
                  //     itemType,
                  //   })
                  // }
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Container>
    </LoggedLayout>
  )
}

export default UserPageContent

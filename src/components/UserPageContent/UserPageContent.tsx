import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import { useUserRatingsQuery } from '../../hooks/react-query/rating/useUserRatingsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../utils/urls'
import RatingsTimeline from '../HomePageContent/RatingsTimeline/RatingsTimeline'
import FlexCol from '../_common/flex/FlexCol'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import MyPaper from '../_common/overrides/MyPaper'
import ItemsCountUserProfile from './ItemsCountUserProfile/ItemsCountUserProfile'
import NoRatingsUserProfile from './NoRatingsUserProfile/NoRatingsUserProfile'
import ProfileScreenButtons from './ProfileScreenButtons/ProfileScreenButtons'
import ProfileScreenRatingItem from './ProfileScreenRatingItem/ProfileScreenRatingItem'

type Props = {}

const UserPageContent = (props: Props) => {
  const { userId } = useMyRouterQuery()
  const { data: userInfo, isLoading } = useUserInfoQuery(userId!)

  const { data: userRatings } = useUserRatingsQuery(userId!)

  const noRatings = useMemo(() => userRatings?.length === 0, [userRatings])
  const [refreshedAt, setRefreshedAt] = useState(new Date().toISOString())

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsMyProfile = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const { isSmallScreen } = useMyMediaQuery()

  return (
    <LoggedLayout>
      <Head>
        <title>{userInfo?.username} - Syncro</title>
      </Head>
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
                  widthHeight={isSmallScreen ? 80 : 96}
                />

                <FlexCol>
                  <Title order={4} weight={500}>
                    {userInfo.username}
                  </Title>

                  <Box mt={16}>
                    <ItemsCountUserProfile userId={userId} />
                  </Box>
                </FlexCol>
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

              {thisIsMyProfile ? (
                <MyNextLink href={urls.pages.editProfile}>
                  <Button color="gray" fullWidth>
                    <Text>Edit profile</Text>
                  </Button>
                </MyNextLink>
              ) : (
                <ProfileScreenButtons userId={userId!} />
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
                />
              ))}
            </Flex>
          )}
        </Flex>

        <FlexCol mt={64}>
          <RatingsTimeline userId={userId} />
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default UserPageContent

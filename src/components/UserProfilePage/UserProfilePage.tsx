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
import { useMemo } from 'react'
import { syncroItemOptions } from '../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useFavoriteItemsQuery } from '../../hooks/react-query/favorite-item/useFavoriteItemsQuery'
import { useUserRatingsQuery } from '../../hooks/react-query/rating/useUserRatingsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { urls } from '../../utils/urls'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import UserImage from '../_common/image/SyncroItemImage/UserImage/UserImage'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import MyPaper from '../_common/overrides/MyPaper'
import FavoritesSection from './FavoritesSection/FavoritesSection'
import ItemsCountUserProfile from './ItemsCountUserProfile/ItemsCountUserProfile'
import NoRatingsUserProfile from './NoRatingsUserProfile/NoRatingsUserProfile'
import ProfileScreenButtons from './ProfileScreenButtons/ProfileScreenButtons'
import ProfileScreenRatingItem from './ProfileScreenRatingItem/ProfileScreenRatingItem'
import UserMoreMenu from './UserMoreMenu/UserMoreMenu'
import UserPageRatingsSection from './UserPageRatingsSection/UserPageRatingsSection'

const UserProfilePage = () => {
  const { userId } = useMyRouterQuery()
  const { data: userInfo, isLoading } = useUserInfoQuery(userId!)

  const { data: userRatings } = useUserRatingsQuery(userId!)

  const noRatings = useMemo(() => userRatings?.length === 0, [userRatings])

  const authUser = useAuthStore((s) => s.authUser)

  const thisIsMyProfile = useMemo(
    () => authUser?.id === userId,
    [authUser, userId]
  )

  const { isSmallScreen, isMobile } = useMyMediaQuery()

  const { data: favorites } = useFavoriteItemsQuery({ userId })
  const typesWithoutFavorites = useMemo(() => {
    return syncroItemTypes.filter((type) => {
      const typeFavorites = favorites?.filter(
        (fav) => fav.syncroItem?.type === type
      )
      return typeFavorites?.length === 0
    })
  }, [favorites, syncroItemTypes])

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

                <FlexCol sx={{ flexGrow: 1 }}>
                  <FlexVCenter justify={'space-between'}>
                    <Title order={4} weight={500}>
                      {userInfo.username}
                    </Title>
                    {thisIsMyProfile && isMobile && <UserMoreMenu />}
                  </FlexVCenter>

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

              {userInfo.profile.lookingForRecommendationTypes.length > 0 && (
                <FlexVCenter>
                  <Text component="span" color="yellow" weight={500}>
                    Looking for recommendations:{' '}
                    {
                      // split by ","
                      userInfo.profile.lookingForRecommendationTypes
                        .map((type) =>
                          syncroItemOptions
                            .find((o) => o.itemType === type)
                            ?.getTypeLabelLowerCase(true)
                        )
                        .join(', ')
                        .replace(/,(?=[^,]*$)/, ' and')
                    }
                    .
                  </Text>
                </FlexVCenter>
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

        <Box mt={32}>
          <FavoritesSection userId={userId!} />
        </Box>

        <Flex mt={16}>
          {noRatings ? (
            <NoRatingsUserProfile userId={userId!} />
          ) : (
            <FlexCol gap={8}>
              {typesWithoutFavorites.length > 0 && (
                <>
                  <Title order={4}>Other ratings</Title>
                  <Flex gap={16} wrap="wrap">
                    {typesWithoutFavorites.map((itemType) => (
                      <ProfileScreenRatingItem
                        key={itemType}
                        itemType={itemType}
                        userId={userId!}
                      />
                    ))}
                  </Flex>
                </>
              )}
            </FlexCol>
          )}
        </Flex>

        <Box mt={40}>
          <UserPageRatingsSection userId={userId} />
        </Box>
      </Container>
    </LoggedLayout>
  )
}

export default UserProfilePage

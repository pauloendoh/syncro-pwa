import {
  Anchor,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Loader,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import Head from 'next/head'
import { useMemo } from 'react'
import { syncroItemTypeOptions } from '../../hooks/domains/syncro-item/syncroItemOptions/syncroItemOptions'
import { useFavoriteItemsQuery } from '../../hooks/react-query/favorite-item/useFavoriteItemsQuery'
import { useUserRatingsQuery } from '../../hooks/react-query/rating/useUserRatingsQuery'
import { useUserItemsQuery } from '../../hooks/react-query/user-item/useUserItemsQuery'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import useRecommendItemsToUserModalStore from '../../hooks/zustand/action-sheets/useRecommendUserSheetStore'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { syncroItemTypes } from '../../types/domain/syncro-item/SyncroItemType/SyncroItemType'
import { htmlTitles } from '../../utils/consts/htmlTitles'
import UserPlannedItemsSection from '../HomePage/PlannedItemsHomeSection/UserPlannedItemsSection'
import UsersSuggestedForYouSidebar from '../HomePage/UsersSuggestedForYouSidebar/UsersSuggestedForYouSidebar'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import Span from '../_common/text/Span'
import EditProfileButton from './EditProfileButton/EditProfileButton'
import FavoritesSection from './FavoritesSection/FavoritesSection'
import FollowersCountRowProfile from './FollowersCountRowProfile/FollowersCountRowProfile'
import NoRatingsUserProfile from './NoRatingsUserProfile/NoRatingsUserProfile'
import ProfileScreenButtons from './ProfileScreenButtons/ProfileScreenButtons'
import ProfileScreenRatingItem from './ProfileScreenRatingItem/ProfileScreenRatingItem'
import UserMoreMenu from './UserMoreMenu/UserMoreMenu'
import UserPageRatingsSection from './UserPageRatingsSection/UserPageRatingsSection'
import UserSimilaritySection from './UserSimilaritySection/UserSimilaritySection'
import ZoomableUserImage from './ZoomableUserImage/ZoomableUserImage'

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

  const { data: favoriteItems } = useFavoriteItemsQuery({ userId })
  const typesWithoutFavorites = useMemo(() => {
    return syncroItemTypes.filter((type) => {
      const typeFavorites = favoriteItems?.filter(
        (fav) => fav.syncroItem?.type === type
      )
      return typeFavorites?.length === 0
    })
  }, [favoriteItems, syncroItemTypes])

  const { data: userItems } = useUserItemsQuery(userId)

  const showOtherRatingsLabel = useMemo(() => {
    if (!favoriteItems?.length) return false
    for (const type of typesWithoutFavorites) {
      const typeItems = userItems?.filter((item) => item?.type === type)
      if (!!typeItems?.length) {
        return true
      }
    }
    return false
  }, [favoriteItems, typesWithoutFavorites, userItems])

  const theme = useMantineTheme()

  const { openModal: openRecommendItemsModal } =
    useRecommendItemsToUserModalStore()

  return (
    <LoggedLayout>
      <Head>
        <title>
          {userInfo ? htmlTitles.userPage(userInfo.username) : htmlTitles.index}
        </title>
      </Head>
      <Grid w="100%" mr={isMobile ? 0 : undefined}>
        <Grid.Col span={0} xs={0} sm={0} md={1} lg={1} xl={2} />
        <Grid.Col
          span={12}
          xs={12}
          sm={7}
          md={7}
          lg={6}
          xl={5}
          pr={isMobile ? 0 : undefined}
        >
          <Container
            size="xs"
            fluid={isSmallScreen}
            pr={isSmallScreen ? 8 : undefined}
          >
            <Paper
              sx={{
                width: '100%',
                padding: isMobile ? 0 : 16,
                background: isMobile ? 'none' : theme.colors.dark[5],
              }}
            >
              {isLoading && (
                <Center sx={{ height: 96 }}>
                  <Loader />
                </Center>
              )}
              {userInfo && (
                <FlexCol gap={16}>
                  <Flex gap={24}>
                    <ZoomableUserImage userInfo={userInfo} />

                    <FlexCol sx={{ flexGrow: 1 }}>
                      <FlexVCenter justify={'space-between'}>
                        <Title order={4} weight={500}>
                          {userInfo.username}
                        </Title>
                        <UserMoreMenu thisIsMyProfile={thisIsMyProfile} />
                      </FlexVCenter>

                      <Box mt={16}>
                        <FollowersCountRowProfile userId={userId} />
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

                  {userInfo.profile.lookingForRecommendationTypes.length >
                    0 && (
                    <FlexVCenter>
                      <Text component="span" color="yellow" weight={500}>
                        Looking for recommendations:{' '}
                        {
                          // split by ","
                          userInfo.profile.lookingForRecommendationTypes.map(
                            (type, index) => {
                              const typeLabel = syncroItemTypeOptions
                                .find((o) => o.itemType === type)
                                ?.getTypeLabelLowerCase(true)

                              let suffix = ', '
                              // penultimate is "and"
                              if (
                                index ===
                                userInfo.profile.lookingForRecommendationTypes
                                  .length -
                                  2
                              ) {
                                suffix = ' and '
                              }
                              // last is "."
                              if (
                                index ===
                                userInfo.profile.lookingForRecommendationTypes
                                  .length -
                                  1
                              ) {
                                suffix = '.'
                              }

                              return (
                                <span key={typeLabel}>
                                  <button
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: 'inherit',
                                      padding: 0,
                                      textDecoration: thisIsMyProfile
                                        ? 'none'
                                        : 'underline',
                                      cursor: thisIsMyProfile
                                        ? 'default'
                                        : 'pointer',
                                    }}
                                    onClick={() => {
                                      if (!thisIsMyProfile) {
                                        openRecommendItemsModal(userId, type)
                                      }
                                    }}
                                  >
                                    <Span>{typeLabel}</Span>
                                  </button>
                                  {suffix}
                                </span>
                              )
                            }
                          )
                        }
                      </Text>
                    </FlexVCenter>
                  )}

                  {thisIsMyProfile ? (
                    <EditProfileButton />
                  ) : (
                    <FlexCol gap={16}>
                      <UserSimilaritySection userId={userId!} />
                      <ProfileScreenButtons userId={userId!} />
                    </FlexCol>
                  )}
                </FlexCol>
              )}
            </Paper>

            <Box mt={32}>
              <FavoritesSection userId={userId!} />
            </Box>

            <Flex mt={16}>
              {noRatings ? (
                <NoRatingsUserProfile userId={userId!} />
              ) : (
                <FlexCol gap={8}>
                  {!!typesWithoutFavorites.length && (
                    <>
                      <Title order={4}>
                        {showOtherRatingsLabel && 'Other items'}
                      </Title>
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
        </Grid.Col>
        <Grid.Col span={0} xs={0} sm={5} md={4} lg={5} xl={5}>
          {!isSmallScreen && (
            <FlexCol gap={16}>
              <UserPlannedItemsSection userId={userId} />
              <UsersSuggestedForYouSidebar />
            </FlexCol>
          )}
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default UserProfilePage

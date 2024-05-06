import {
  Box,
  Container,
  Grid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { useTimelineRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../hooks/react-query/feed/useTimelineHasNewsQuery'
import { useSettingsQuery } from '../../hooks/react-query/user-settings/useSettingsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import useOnboardingModalStore from '../../hooks/zustand/modals/useOnboardingModalStore'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { urls } from '../../utils/urls/urls'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import DefaultLayout from '../_common/layout/DefaultLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import FeedSettingsIcon from './FeedSettingsIconButton/FeedSettingsIconButton'
import MobileHomeNavbar from './MobileHomeNavbar/MobileHomeNavbar'
import UserPlannedItemsSection from './PlannedItemsHomeSection/UserPlannedItemsSection'
import RatingsTimeline from './RatingsTimeline/RatingsTimeline'
import UsersSuggestedForYouSidebar from './UsersSuggestedForYouSidebar/UsersSuggestedForYouSidebar'

const HomePage = () => {
  const { data: homeRatings, isLoading } = useTimelineRatingsQuery()

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  useTimelineHasNewsQuery(undefined, flatRatings[0]?.createdAt)

  const { isSmallScreen, isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()

  const { data: settings } = useSettingsQuery()
  const { openModal: openOnboardingModal } = useOnboardingModalStore()

  useEffect(() => {
    if (settings && settings.onboardingStatus !== 'finished') {
      openOnboardingModal()
    }
  }, [settings])

  const { authUser } = useAuthStore()

  return (
    <DefaultLayout>
      {isMobile && (
        <>
          <MobileHomeNavbar />
        </>
      )}
      <Grid w="100%" mr={isMobile ? 0 : undefined}>
        <Grid.Col span={0} xs={0} sm={0} md={1} lg={1} xl={2} />
        <Grid.Col span={12} xs={12} sm={7} md={7} lg={6} xl={6}>
          <Container
            w="100%"
            size="xs"
            fluid={isSmallScreen}
            px={isSmallScreen ? 0 : undefined}
            ml={isMobile ? 8 : undefined}
          >
            <FlexCol gap={8}>
              <FlexVCenter justify={'space-between'} w="100%">
                <Title order={4} ml={isSmallScreen ? 8 : undefined}>
                  Feed
                </Title>
                <FeedSettingsIcon />
              </FlexVCenter>

              <Box pl={8}>
                <RatingsTimeline />
              </Box>
            </FlexCol>

            {!isLoading && flatRatings.length === 0 && (
              <Box sx={{ height: 400 }}>
                <Text>
                  Your feed is empty. Check some
                  <MyNextLink
                    href={urls.pages.explore('new-users')}
                    style={{
                      color: theme.colors.primary[9],
                    }}
                  >
                    {' '}
                    users{' '}
                  </MyNextLink>
                  to follow.
                </Text>
              </Box>
            )}
          </Container>
        </Grid.Col>
        <Grid.Col span={0} xs={0} sm={5} md={4} lg={5} xl={4}>
          {!isSmallScreen && authUser && (
            <FlexCol gap={16}>
              <UserPlannedItemsSection userId={authUser.id} titleIsOutside />
              <UsersSuggestedForYouSidebar />
            </FlexCol>
          )}
        </Grid.Col>

        {/* <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}>
          {!isSmallScreen && <PlanUpdatesSection />}
        </Grid.Col> */}
      </Grid>
    </DefaultLayout>
  )
}

export default HomePage

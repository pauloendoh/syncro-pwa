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
import useFeedSettingsModal from '../../hooks/zustand/modals/useFeedSettingsModal'
import useOnboardingModalStore from '../../hooks/zustand/modals/useOnboardingModalStore'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import FeedSettingsIcon from './FeedSettingsIconButton/FeedSettingsIconButton'
import MobileHomeNavbar from './MobileHomeNavbar/MobileHomeNavbar'
import PlanUpdatesSection from './PlanUpdatesSection/PlanUpdatesSection'
import RatingsTimeline from './RatingsTimeline/RatingsTimeline'

const HomePage = () => {
  const { data: homeRatings, isLoading } = useTimelineRatingsQuery()

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  useTimelineHasNewsQuery(undefined, flatRatings[0]?.createdAt)

  const { isSmallScreen, isMobile } = useMyMediaQuery()
  const theme = useMantineTheme()

  const { openModal: openFeedSettingsModal } = useFeedSettingsModal()

  const { data: settings } = useSettingsQuery()
  const { openModal: openOnboardingModal } = useOnboardingModalStore()

  useEffect(() => {
    if (settings && settings.onboardingStatus !== 'finished') {
      openOnboardingModal()
    }
  }, [settings])

  return (
    <LoggedLayout>
      {isMobile && (
        <>
          <MobileHomeNavbar />
          <Box mt={24} />
        </>
      )}
      <Grid w="100%" mr={isMobile ? 0 : undefined}>
        <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} />
        <Grid.Col span={12} xs={12} sm={8} md={8} lg={6} xl={4}>
          <Container
            w="100%"
            size="xs"
            fluid={isSmallScreen}
            px={isSmallScreen ? 0 : undefined}
            pt={isSmallScreen ? 40 : undefined}
            ml={isMobile ? 8 : undefined}
          >
            <FlexVCenter justify={'space-between'} w="100%">
              <Title order={4} ml={isSmallScreen ? 8 : undefined}>
                Feed
              </Title>
              <FeedSettingsIcon />
            </FlexVCenter>

            <Box pl={isSmallScreen ? 8 : undefined}>
              <RatingsTimeline />
            </Box>

            {!isLoading && flatRatings.length === 0 && (
              <Box sx={{ height: 400 }}>
                <Text>
                  Your feed is empty. Check some
                  <MyNextLink
                    href={urls.pages.explore()}
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
        <Grid.Col span={0} xs={0} sm={4} md={3} lg={4} xl={4}>
          {!isSmallScreen && <PlanUpdatesSection />}
        </Grid.Col>
      </Grid>
    </LoggedLayout>
  )
}

export default HomePage

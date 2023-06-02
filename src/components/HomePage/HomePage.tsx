import {
  ActionIcon,
  Box,
  Container,
  Grid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { MdSettings } from 'react-icons/md'
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
import MobileHomeNavbar from './MobileHomeNavbar/MobileHomeNavbar'
import RatingsTimeline from './RatingsTimeline/RatingsTimeline'

const HomePage = () => {
  const { data: homeRatings, isLoading } = useTimelineRatingsQuery()

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  useTimelineHasNewsQuery(undefined, flatRatings[0]?.createdAt)

  const { isSmallScreen, isMobile: isXsScreen } = useMyMediaQuery()
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
      {isXsScreen && (
        <>
          <MobileHomeNavbar />
          <Box mt={40} />
        </>
      )}
      <Container fluid>
        <Grid>
          {/* <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} />
          <Grid.Col span={12} xs={12} sm={7} md={7} lg={5} xl={4}> */}
          <Container
            w="100%"
            size="xs"
            fluid={isSmallScreen}
            px={isSmallScreen ? 0 : undefined}
            pt={isSmallScreen ? 40 : undefined}
          >
            <FlexVCenter justify={'space-between'} w="100%">
              <Title order={4}>Feed</Title>
              <ActionIcon onClick={openFeedSettingsModal}>
                <MdSettings />
              </ActionIcon>
            </FlexVCenter>

            <Box pl={isSmallScreen ? 8 : undefined}>
              <RatingsTimeline />
            </Box>

            {!isLoading && flatRatings.length === 0 && (
              <Box sx={{ height: 400 }}>
                <Text>
                  Your feed is empty. Check some
                  <MyNextLink
                    href={urls.pages.explore('popular-users')}
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
          {/* </Grid.Col>
          <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}></Grid.Col> */}
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default HomePage

import {
  ActionIcon,
  Box,
  Container,
  Grid,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useMemo } from 'react'
import { MdSettings } from 'react-icons/md'
import { useTimelineRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../hooks/react-query/feed/useTimelineHasNewsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import useFeedSettingsModal from '../../hooks/zustand/modals/useFeedSettingsModal'
import { urls } from '../../utils/urls'
import FlexVCenter from '../_common/flex/FlexVCenter'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyNextLink from '../_common/overrides/MyNextLink'
import MobileHomeHeader from './MobileHomeHeader/MobileHomeHeader'
import PlannedItemsHomeSection from './PlannedItemsHomeSection/PlannedItemsHomeSection'
import RatingsTimeline from './RatingsTimeline/RatingsTimeline'

const HomePageContent = () => {
  const { data: homeRatings, isLoading } = useTimelineRatingsQuery()

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  useTimelineHasNewsQuery(undefined, flatRatings[0]?.createdAt)

  const { isSmallScreen, isMobile: isXsScreen } = useMyMediaQuery()
  const theme = useMantineTheme()

  const { openModal: openFeedSettingsModal } = useFeedSettingsModal()

  return (
    <LoggedLayout>
      {isXsScreen && (
        <>
          <MobileHomeHeader />
          <Box mt={40} />
        </>
      )}
      <Container fluid>
        <Grid>
          <Grid.Col span={0} xs={0} sm={0} md={1} lg={2} xl={4} />
          <Grid.Col span={12} xs={12} sm={7} md={7} lg={5} xl={4}>
            <Container
              size="xs"
              fluid={isSmallScreen}
              px={isSmallScreen ? 0 : undefined}
              pt={isSmallScreen ? 24 : undefined}
            >
              <FlexVCenter justify={'space-between'}>
                <Title order={4}>Feed</Title>
                <ActionIcon onClick={openFeedSettingsModal}>
                  <MdSettings />
                </ActionIcon>
              </FlexVCenter>

              <RatingsTimeline />

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
          </Grid.Col>
          <Grid.Col span={0} xs={0} sm={5} md={4} lg={4} xl={4}>
            {!isSmallScreen && <PlannedItemsHomeSection />}
          </Grid.Col>
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default HomePageContent

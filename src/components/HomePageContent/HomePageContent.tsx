import { Box, Container, Grid, Text, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useTimelineRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { urls } from '../../utils/urls'
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

  const { isSmallScreen, isXsScreen } = useMyMediaQuery()
  const theme = useMantineTheme()
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
          <Grid.Col span={0} xs={0} sm={0} md={3} p={0} />
          <Grid.Col span={12} xs={12} sm={8} md={6}>
            <Container
              size="xs"
              fluid={isSmallScreen}
              px={isSmallScreen ? 0 : undefined}
            >
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
                      popular users{' '}
                    </MyNextLink>
                    to follow.
                  </Text>
                </Box>
              )}
            </Container>
          </Grid.Col>
          <Grid.Col span={0} xs={12} sm={4} md={2}>
            {!isSmallScreen && <PlannedItemsHomeSection />}
          </Grid.Col>
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default HomePageContent

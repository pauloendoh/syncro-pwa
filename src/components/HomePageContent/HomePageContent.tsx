import { Box, Container, Grid, Text, useMantineTheme } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { useTimelineRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import { urls } from '../../utils/urls'
import LoggedLayout from '../_common/layout/LoggedLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../_common/overrides/MyNextLink'
import RatingsTimeline from './RatingsTimeline/RatingsTimeline'

const HomePageContent = () => {
  const {
    data: homeRatings,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useTimelineRatingsQuery()

  const containerRef = useRef()

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.5,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && homeRatings?.pages?.length) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, homeRatings])

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  const { isSmallScreen } = useMyMediaQuery()
  const theme = useMantineTheme()
  return (
    <LoggedLayout>
      <Container fluid>
        <Grid>
          <Grid.Col span={'auto'} xs="auto" sm={'auto'} md={'auto'} p={0} />
          <Grid.Col span={12} xs={12} sm={6} md={6}>
            <Container
              size="xs"
              fluid={isSmallScreen}
              px={isSmallScreen ? 0 : undefined}
            >
              {isLoading && <CenterLoader />}

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

              <RatingsTimeline />
            </Container>
          </Grid.Col>
          <Grid.Col span={'auto'} xs={12} sm="auto" md={'auto'} />
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default HomePageContent

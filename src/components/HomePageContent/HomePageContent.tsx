import {
  Box,
  Center,
  Container,
  Grid,
  Loader,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { useHomeRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { urls } from '../../utils/urls'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'
import CenterLoader from '../_common/overrides/CenterLoader/CenterLoader'
import MyNextLink from '../_common/overrides/MyNextLink'
import HomeRatingItem from './HomeRatingItem/HomeRatingItem'

const HomePageContent = () => {
  const {
    data: homeRatings,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useHomeRatingsQuery()

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

  const theme = useMantineTheme()
  return (
    <LoggedLayout>
      <Container fluid>
        <Grid>
          <Grid.Col md={'auto'} />
          <Grid.Col md={6}>
            <Container size="xs">
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

              {!isLoading && flatRatings.length > 0 && (
                <>
                  <Title order={4}>Home</Title>
                  <FlexCol gap={16} mt={16}>
                    {homeRatings?.pages.map((page) =>
                      page.map((rating) => (
                        <HomeRatingItem rating={rating} key={rating.id} />
                      ))
                    )}

                    {hasNextPage && (
                      <Center sx={{ height: 80 }} ref={ref}>
                        <Loader />
                      </Center>
                    )}
                  </FlexCol>
                </>
              )}
            </Container>
          </Grid.Col>
          <Grid.Col md={'auto'} />
        </Grid>
      </Container>
    </LoggedLayout>
  )
}

export default HomePageContent

import { Box, Center, Container, Loader, Title } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useRef } from 'react'
import { useHomeRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import FlexCol from '../_common/flex/FlexCol'
import LoggedLayout from '../_common/layout/LoggedLayout'
import HomeRatingItem from './HomeRatingItem/HomeRatingItem'

const HomePageContent = () => {
  const {
    data: homeRatings,
    fetchNextPage,
    hasNextPage,
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

  return (
    <LoggedLayout>
      <Container size="xs">
        <Title order={4} mt={24}>
          Home
        </Title>
        <FlexCol gap={16} mt={24}>
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

        <Box mt={40} />
      </Container>
    </LoggedLayout>
  )
}

export default HomePageContent

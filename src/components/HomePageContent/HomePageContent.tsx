import { Box, Button, Center, Container, Loader, Title } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef, useState } from 'react'
import useAuthStore from '../../domains/auth/useAuthStore'
import { useLogout } from '../../hooks/domains/auth/useLogout'
import { useHomeRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { buildRatingDto, RatingDto } from '../../types/domains/rating/RatingDto'
import FlexCol from '../_common/flex/FlexCol'
import HomeRatingItem from './HomeRatingItem/HomeRatingItem'

const HomePageContent = () => {
  const logout = useLogout()
  const { authUser } = useAuthStore()

  const {
    data: homeRatings,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useHomeRatingsQuery()

  const [lastRatings, setLastRatings] = useState<RatingDto[]>([])

  const uniqueRatings = useMemo(() => {
    if (!homeRatings) return []
    const flattened = homeRatings.pages.flatMap((pageData) => pageData)
    const flattenedWithLoading = [
      ...flattened,
      buildRatingDto({
        id: hasNextPage ? 'loading' : 'end',
      }),
    ]

    const all = [...lastRatings, ...flattenedWithLoading]

    const uniqueRatings = [
      ...new Map(all.map((item) => [item.id, item])).values(),
    ]

    return uniqueRatings
  }, [homeRatings, hasNextPage, lastRatings])

  const containerRef = useRef()

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && homeRatings?.pages?.length) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, hasNextPage, homeRatings])

  return (
    <div>
      hello {authUser?.username}
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
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
    </div>
  )
}

export default HomePageContent

import { Button, Container, Title } from '@mantine/core'
import { useMemo, useState } from 'react'
import useAuthStore from '../../domains/auth/useAuthStore'
import { useLogout } from '../../hooks/domains/auth/useLogout'
import { useHomeRatingsQuery } from '../../hooks/react-query/feed/useHomeRatingsQuery'
import { buildRatingDto, RatingDto } from '../../types/domains/rating/RatingDto'
import FlexCol from '../_common/flex/FlexCol'
import HomeRatingItem from './HomeRatingItem/HomeRatingItem'

const HomePageContent = () => {
  const logout = useLogout()
  const { authUser } = useAuthStore()
  const [page, setPage] = useState(1)

  const {
    data: homeRatings,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useHomeRatingsQuery(page)

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
        </FlexCol>
      </Container>
    </div>
  )
}

export default HomePageContent

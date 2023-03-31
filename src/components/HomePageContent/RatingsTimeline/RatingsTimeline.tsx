import { Center, Loader, Title } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { useTimelineRatingsQuery } from '../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import FlexCol from '../../_common/flex/FlexCol'
import HomeRatingItem from '../HomeRatingItem/HomeRatingItem'

type Props = {
  userId?: string
}

const RatingsTimeline = (props: Props) => {
  const {
    data: homeRatings,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useTimelineRatingsQuery(props.userId)

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

  const title = useMemo(() => {
    if (flatRatings.length === 0) return null
    if (props.userId) return 'Last ratings'
    return 'Your feed'
  }, [props.userId, flatRatings])

  const { isMobile } = useMyMediaQuery()

  return (
    <>
      {!isMobile && <Title order={4}>{title}</Title>}

      <FlexCol gap={16} mt={16}>
        {flatRatings.map((rating) => (
          <HomeRatingItem rating={rating} key={rating.id} />
        ))}

        {hasNextPage && (
          <Center sx={{ height: 80 }} ref={ref}>
            <Loader />
          </Center>
        )}
      </FlexCol>
    </>
  )
}

export default RatingsTimeline

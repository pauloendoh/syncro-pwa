import { Center, Loader } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { useTimelineRatingsQuery } from '../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../../hooks/react-query/feed/useTimelineHasNewsQuery'
import FlexCol from '../../_common/flex/FlexCol'
import CenterLoader from '../../_common/overrides/CenterLoader/CenterLoader'
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

  useTimelineHasNewsQuery(props.userId, flatRatings[0]?.createdAt)

  return (
    <>
      {isLoading && <CenterLoader />}

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

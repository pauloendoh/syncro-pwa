import { Box, Center, Loader } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { useTimelineRatingsQuery } from '../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../../hooks/react-query/feed/useTimelineHasNewsQuery'
import { usePreserveVirtuosoState } from '../../../hooks/usePreserveVirtuosoState'
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

  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const virtuosoState = usePreserveVirtuosoState(virtuosoRef)

  return (
    <>
      {isLoading && <CenterLoader />}

      <Virtuoso
        useWindowScroll
        totalCount={flatRatings.length}
        ref={virtuosoRef}
        restoreStateFrom={virtuosoState}
        overscan={1000}
        endReached={() => {
          if (hasNextPage) {
            fetchNextPage()
          }
        }}
        itemContent={(index) => (
          <div>
            <HomeRatingItem
              rating={flatRatings[index]}
              key={flatRatings[index].id}
            />
            <Box mt={16} />
          </div>
        )}
      />

      {hasNextPage && (
        <Center mt={40} sx={{ height: 80 }}>
          <Loader />
        </Center>
      )}

      {/* <FlexCol gap={16} mt={16}>
        {flatRatings.map((rating) => (
          <HomeRatingItem rating={rating} key={rating.id} />
        ))}

        
      </FlexCol> */}
    </>
  )
}

export default RatingsTimeline

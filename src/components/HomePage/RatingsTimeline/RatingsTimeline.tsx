import { Box, Center, Loader } from '@mantine/core'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
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

  const flatRatings = useMemo(() => {
    return homeRatings?.pages.flat() || []
  }, [homeRatings])

  useTimelineHasNewsQuery(props.userId, flatRatings[0]?.createdAt)

  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const virtuosoState = usePreserveVirtuosoState(virtuosoRef)

  const [isVisible, setIsVisible] = useState(false)
  const [hasPreviousState, setHasPreviousState] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (!!virtuosoState) {
        setHasPreviousState(true)
      }
      setIsVisible(true)
    }, 100)
  }, [])

  const virtuosoKey = useMemo(() => {
    if (hasPreviousState) {
      return `with-state-${isVisible ? 'visible' : 'hidden'}`
    }
    return `without-state-${isVisible ? 'visible' : 'hidden'}`
  }, [isVisible, hasPreviousState])

  return (
    <>
      {isLoading && <CenterLoader />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Virtuoso
          key={virtuosoKey}
          useWindowScroll
          totalCount={flatRatings.length}
          ref={virtuosoRef}
          restoreStateFrom={virtuosoState}
          endReached={() => {
            if (hasNextPage) {
              fetchNextPage()
            }
          }}
          itemContent={(index) => (
            <>
              <HomeRatingItem
                rating={flatRatings[index]}
                key={flatRatings[index].id}
              />
              <Box mt={16} />
            </>
          )}
        />
      </motion.div>
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

import { Box, Center, Loader } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { GrTextAlignFull } from 'react-icons/gr'
import { useTimelineRatingsQuery } from '../../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../../../hooks/react-query/feed/useTimelineHasNewsQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useRatingDetailsModalStore from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { urls } from '../../../../utils/urls'
import FlexCol from '../../../_common/flex/FlexCol'
import FlexVCenter from '../../../_common/flex/FlexVCenter'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import MyNextLink from '../../../_common/overrides/MyNextLink'
import SemiBold from '../../../_common/text/SemiBold'

type Props = {
  userId?: string
}

const UserRatingsGridView = (props: Props) => {
  // PE 1/3 - use isLoading
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

  const ratingsByMonth = useMemo(() => {
    return flatRatings.reduce<Record<string, typeof flatRatings>>(
      (acc, rating) => {
        const month = new Date(rating.createdAt).toLocaleString('en-US', {
          month: 'long',
        })
        const year = new Date(rating.createdAt).getFullYear()

        const key = `${month} ${year}`

        if (!acc[key]) {
          acc[key] = []
        }

        acc[key].push(rating)

        return acc
      },
      {}
    )
  }, [flatRatings])

  useTimelineHasNewsQuery(props.userId, flatRatings[0]?.createdAt)

  const { isMobile } = useMyMediaQuery()

  const { getVariantRatingYellow } = useMyColors()

  const { openModal } = useRatingDetailsModalStore()

  return (
    <>
      <FlexCol gap={16} mt={16}>
        {Object.entries(ratingsByMonth).map(([month, ratings]) => (
          <FlexCol key={month} gap={8}>
            <SemiBold>{month}</SemiBold>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridRowGap: 16,
              }}
            >
              {ratings.map((rating) => (
                <FlexCol
                  key={rating.id}
                  align="center"
                  gap={4}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <MyNextLink
                    href={urls.pages.syncroItem(rating?.syncroItem?.id || '')}
                  >
                    <SyncroItemImage
                      item={rating.syncroItem}
                      width={isMobile ? 80 : 104}
                      height={isMobile ? 80 : 104}
                      showItemType={rating.syncroItem?.type}
                    />
                  </MyNextLink>
                  <FlexVCenter
                    sx={{
                      color: getVariantRatingYellow(rating.ratingValue || 1),
                    }}
                    gap={8}
                    onClick={() => openModal(rating)}
                  >
                    <SemiBold>{rating.ratingValue}</SemiBold>
                    {rating.review.length > 0 && <GrTextAlignFull />}
                  </FlexVCenter>
                </FlexCol>
              ))}
            </Box>
          </FlexCol>
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

export default UserRatingsGridView

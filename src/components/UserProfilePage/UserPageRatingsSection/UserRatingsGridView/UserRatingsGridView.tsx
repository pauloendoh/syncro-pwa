import { Box, Center, Loader, useMantineTheme } from '@mantine/core'
import { useIntersection } from '@mantine/hooks'
import { useEffect, useMemo, useRef } from 'react'
import { useTimelineRatingsQuery } from '../../../../hooks/react-query/feed/useHomeRatingsQuery'
import { useTimelineHasNewsQuery } from '../../../../hooks/react-query/feed/useTimelineHasNewsQuery'
import { useMyColors } from '../../../../hooks/useMyColors'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import useAuthStore from '../../../../hooks/zustand/useAuthStore'
import { RatingCellInfo } from '../../../UserItemsPage/UserItemsMdTable/UserItemsMdTableRow/RatingCellInfo/RatingCellInfo'
import SyncroItemLink from '../../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../../_common/flex/FlexCol'
import SyncroItemImage from '../../../_common/image/SyncroItemImage/SyncroItemImage'
import SemiBold from '../../../_common/text/SemiBold'

type Props = {
  userId?: string
}

const UserRatingsGridView = (props: Props) => {
  const {
    data: homeRatings,
    fetchNextPage,
    hasNextPage,
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
        const month = new Date(rating.timelineDate).toLocaleString('en-US', {
          month: 'long',
        })
        const year = new Date(rating.timelineDate).getFullYear()

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

  useTimelineHasNewsQuery(props.userId, flatRatings[0]?.timelineDate)

  const { isMobile } = useMyMediaQuery()

  const { ratingYellow } = useMyColors()

  const { authUser } = useAuthStore()
  const thisIsYourList = useMemo(() => {
    return props.userId === authUser?.id
  }, [authUser, props.userId])

  const theme = useMantineTheme()

  return (
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
                  img: {
                    height: isMobile ? 80 * 1.33 : 104 * 1.33,
                  },
                }}
              >
                <SyncroItemLink item={rating.syncroItem!}>
                  <SyncroItemImage
                    item={rating.syncroItem}
                    width={isMobile ? 80 : 104}
                    showItemType={rating.syncroItem?.type}
                  />
                </SyncroItemLink>

                {rating.syncroItem && (
                  <RatingCellInfo
                    iconColor={
                      thisIsYourList ? theme.colors.secondary[9] : ratingYellow
                    }
                    itemId={rating.syncroItem.id}
                    ratingStatus={rating.status}
                    rating={rating}
                    thisIsYourRating={thisIsYourList}
                    ratingSpanWidth={28}
                  />
                )}
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
  )
}

export default UserRatingsGridView

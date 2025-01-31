import { Box, Center, Flex, Text, useMantineTheme } from '@mantine/core'

import { useMemo } from 'react'
import { format } from 'timeago.js'
import { useSyncroItemTypeMap } from '../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { RatingDto } from '../../../types/domain/rating/RatingDto'
import { useRatingStatusMap } from '../../../types/domain/rating/useRatingStatusMap'
import ItemTitleAndYear from '../../../utils/domains/syncro-item/ItemTitleAndYear'
import { urls } from '../../../utils/urls/urls'
import SyncroItemLink from '../../_common/SyncroItemLink/SyncroItemLink'
import FlexCol from '../../_common/flex/FlexCol'
import SyncroItemImage from '../../_common/image/SyncroItemImage/SyncroItemImage'
import UserImage from '../../_common/image/SyncroItemImage/UserImage/UserImage'
import { default as MyNextLink } from '../../_common/overrides/MyNextLink'
import MyPaper from '../../_common/overrides/MyPaper'
import Span from '../../_common/text/Span'
import FavoriteScenesSection from './FavoriteScenesSection/FavoriteScenesSection'
import HomeRatingItemButtons from './HomeRatingItemButtons/HomeRatingItemButtons'
import HomeRatingItemReview from './HomeRatingItemReview/HomeRatingItemReview'
import SyncroItemIcon from './SyncroItemIcon/SyncroItemIcon'
import UsernameRatedRow from './UsernameRatedRow/UsernameRatedRow'

type Props = {
  rating: RatingDto
}

const HomeRatingItem = (props: Props) => {
  const theme = useMantineTheme()

  const { isSmallScreen } = useMyMediaQuery()

  const typeMap = useSyncroItemTypeMap({
    itemType: props.rating.syncroItem?.type,
  })

  const isLookingForRecommendation = useMemo(() => {
    if (!props.rating.user?.profile?.lookingForRecommendationTypes) {
      return false
    }

    return props.rating.user?.profile?.lookingForRecommendationTypes.length > 0
  }, [props.rating.user?.profile?.lookingForRecommendationTypes])

  const statusMap = useRatingStatusMap(props.rating.status)

  const progressLabel = useMemo(() => {
    if (!props.rating.syncroItem) return ''
    if (!props.rating.ratingProgress) return ''
    if (
      props.rating.status === 'PLANNED' ||
      props.rating.status === 'COMPLETED'
    ) {
      return ''
    }

    if (
      props.rating.syncroItem.type === 'manga' &&
      props.rating.ratingProgress.currentChapter > 0
    ) {
      return `ch. ${props.rating.ratingProgress.currentChapter}`
    }

    if (props.rating.syncroItem.type === 'tvSeries') {
      const season = props.rating.ratingProgress.currentSeason
      const episode = props.rating.ratingProgress.currentEpisode

      if (season > 0 && episode > 0) {
        return `S${season}E${episode}`
      }
      if (season > 0) {
        return `S${season}`
      }
      if (episode > 0) {
        return `E${episode}`
      }
    }

    return ''
  }, [
    props.rating.syncroItem?.type,
    props.rating.status,
    props.rating.ratingProgress,
  ])

  if (!props.rating.syncroItem) return null

  return (
    <MyPaper
      key={props.rating.id}
      sx={{ position: 'relative', opacity: props.rating.isPrivate ? 0.5 : 1 }}
    >
      <MyNextLink href={urls.pages.userProfile(props.rating.userId)}>
        <div
          style={{
            position: 'absolute',
            left: isSmallScreen ? -12 : -24,
            top: 24,
          }}
        >
          <UserImage
            pictureUrl={props.rating.user?.profile?.pictureUrl}
            username={props.rating.user?.username}
            showLookingForRecommendationIcon={false}
          />
        </div>
      </MyNextLink>
      <Flex ml={isSmallScreen ? 20 : 16} justify="space-between" gap={16}>
        <FlexCol
          sx={{
            justifyContent: 'space-between',
            flexGrow: 1,
            width: 'fill-available',
          }}
        >
          <FlexCol sx={{ flexGrow: 1 }}>
            <UsernameRatedRow rating={props.rating} />
            <Text>
              {props.rating.syncroItem && (
                <SyncroItemLink item={props.rating.syncroItem!}>
                  <Text
                    span
                    weight={600}
                    sx={(theme) => ({
                      color: theme.colors.gray[0],
                    })}
                  >
                    <ItemTitleAndYear
                      item={props.rating.syncroItem}
                      showIcon={true}
                    />
                  </Text>
                </SyncroItemLink>
              )}
            </Text>

            <Text size={'xs'}>
              {format(props.rating.timelineDate)}
              {props.rating.consumedOn && ` on ${props.rating.consumedOn}`}

              {' · '}

              <Span
                sx={{
                  color: statusMap?.color,
                }}
              >
                {statusMap?.label}
                {props.rating.completedCount > 1 &&
                  props.rating.status === 'COMPLETED' &&
                  ` ${props.rating.completedCount}x`}
                {progressLabel && ` (${progressLabel})`}
              </Span>
            </Text>

            {!!props.rating.review.length && (
              <HomeRatingItemReview rating={props.rating} />
            )}

            {!props.rating.review && <Box mt={8} />}
            <FavoriteScenesSection scenes={props.rating.scenes} />
          </FlexCol>

          <HomeRatingItemButtons
            syncroItemId={props.rating.syncroItemId!}
            itemType={props.rating.syncroItem?.type}
            rating={props.rating}
          />
        </FlexCol>

        <div>
          <SyncroItemLink item={props.rating.syncroItem}>
            <Box pos="relative">
              <SyncroItemImage
                item={props.rating.syncroItem}
                width={isSmallScreen ? 100 : 120}
              />

              <Center
                pos="absolute"
                right={2}
                bottom={2}
                title={typeMap?.getTypeLabel() || 'Unknown type'}
                sx={{
                  backgroundColor: theme.colors.gray[9],
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                }}
              >
                <SyncroItemIcon
                  type={props.rating.syncroItem!.type}
                  size={16}
                />
              </Center>
            </Box>
          </SyncroItemLink>
        </div>
      </Flex>
    </MyPaper>
  )
}

export default HomeRatingItem
